import fs from 'node:fs';
import path from 'node:path';
import {spawn, execFile} from 'node:child_process';
import {promisify} from 'node:util';
const exec = promisify(execFile);

export function command(env = process.env) {
  for (const dir of (env.PATH || env.Path || '').split(path.delimiter).filter(Boolean)) {
    const binary = path.join(dir, process.platform === 'win32' ? 'codex.exe' : 'codex');
    if (fs.existsSync(binary)) return {file:binary, prefix:[]};
    const script = path.join(dir, 'node_modules', '@openai', 'codex', 'bin', 'codex.js');
    if (process.platform === 'win32' && fs.existsSync(script)) return {file:'node.exe', prefix:[script]};
  }
  throw new Error('Codex CLI was not found. Install it, sign in with codex login, then reopen Kivou.');
}

export function providerEnv(source = process.env) {
  const result = {};
  for (const key of ['PATH','Path','SYSTEMROOT','SystemRoot','WINDIR','TEMP','TMP','USERPROFILE','HOME','LOCALAPPDATA','APPDATA','PATHEXT','COMSPEC','CODEX_HOME']) if (source[key]) result[key] = source[key];
  return result;
}

export const disabledFeatures = ['apps','plugins','hooks','shell_tool','unified_exec','computer_use','browser_use','browser_use_external','in_app_browser','image_generation','multi_agent','skill_search','skill_mcp_dependency_install'];
export function argumentsFor(cwd) {
  return ['exec','--ignore-user-config','--ephemeral','--skip-git-repo-check','--sandbox','read-only','--json','--color','never','--cd',cwd,
    '-c','approval_policy="never"','-c','web_search="disabled"','-c','project_doc_max_bytes=0','-c','features.skip_host_skill_discovery=true',
    ...disabledFeatures.flatMap(name => ['--disable',name]), '-'];
}

export class CodexProvider {
  constructor(root) { this.cwd = path.join(root,'provider-scratch'); fs.mkdirSync(this.cwd,{recursive:true}); }
  async probe() {
    try {
      const cmd = command(); const options = {env:providerEnv(), windowsHide:true, timeout:20000, maxBuffer:100000};
      const version = await exec(cmd.file, [...cmd.prefix,'--version'],options);
      const login = await exec(cmd.file, [...cmd.prefix,'login','status'],options);
      if (!/ChatGPT/i.test(login.stdout + login.stderr)) throw new Error('Sign in to Codex with ChatGPT. API-key-only access is not enabled here.');
      return {ready:true, version:version.stdout.trim(), message:'Codex login is available. A real request still depends on your account limits.'};
    } catch (error) { return {ready:false,message:error.message.includes('ChatGPT') ? error.message : 'Codex is unavailable. Install a current Codex CLI, run codex login, then check again.'}; }
  }
  async run(prompt, {signal, onText}) {
    const cmd = command();
    return await new Promise((resolve,reject) => {
      const child = spawn(cmd.file,[...cmd.prefix,...argumentsFor(this.cwd)],{cwd:this.cwd,env:providerEnv(),windowsHide:true,stdio:['pipe','pipe','pipe']});
      let buffer = '', answer = '', usage = null, bytes = 0, providerError = '', settled = false;
      const stop = () => {
        if (process.platform === 'win32' && child.pid) execFile('taskkill.exe',['/PID',String(child.pid),'/T','/F'],{windowsHide:true},()=>{});
        else child.kill('SIGTERM');
      };
      const timer = setTimeout(() => { providerError = 'The model exceeded the five-minute run limit. Partial work is saved; try a smaller task.'; stop(); },300000);
      const finish = error => {
        if (settled) return; settled = true; clearTimeout(timer); signal.removeEventListener('abort',stop);
        if (signal.aborted) reject(new Error('Run cancelled.'));
        else if (error || providerError) reject(new Error(providerError || 'The model connection failed. Check your Codex login and usage allowance.'));
        else if (!answer.trim()) reject(new Error('The model returned no final answer. Saved partial work remains available.'));
        else resolve({text:answer,usage});
      };
      signal.addEventListener('abort',stop,{once:true}); if (signal.aborted) stop();
      child.stdout.setEncoding('utf8');
      child.stdout.on('data', chunk => {
        bytes += Buffer.byteLength(chunk);
        if (bytes > 4_000_000) { providerError = 'Model output exceeded this preview’s size limit.'; stop(); return; }
        buffer += chunk.toString('utf8');
        const lines = buffer.split('\n'); buffer = lines.pop();
        for (const line of lines) {
          let event; try { event = JSON.parse(line); } catch { continue; }
          if (event.type === 'item.completed' && event.item?.type === 'agent_message' && typeof event.item.text === 'string') { answer += (answer ? '\n\n' : '') + event.item.text; onText(answer); }
          if (event.type === 'turn.completed') usage = event.usage || null;
          if (event.type === 'turn.failed' || event.type === 'error') providerError = 'The provider reported a failed request. Check account limits or retry explicitly.';
        }
      });
      child.stderr.on('data',()=>{});
      child.on('error',finish); child.on('close',code=>finish(code === 0 ? null : new Error('Provider exited.')));
      child.stdin.on('error',()=>{}); child.stdin.end(prompt);
    });
  }
}
