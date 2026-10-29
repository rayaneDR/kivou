import fs from 'node:fs';
import path from 'node:path';
import {randomUUID,createHash} from 'node:crypto';
import {Store,text} from './store.mjs';
import {CodexProvider} from './provider.mjs';

export const playbooks = [
  {id:'launch',name:'Make a plan',prompt:'Turn this goal into a practical plan. State the intended result, constraints, smallest useful next step, ordered actions and unresolved assumptions. Separate drafts from completed actions. Do not invent evidence or claim external work was performed.'},
  {id:'content',name:'Content pack',prompt:'Turn the supplied idea into three hooks, a short script, shot list and three platform captions. Label assumptions. Do not invent statistics or endorsements.'},
  {id:'review',name:'Critical review',prompt:'Review the supplied plan or draft. Identify concrete weak points, what evidence is missing, and the next experiment. Separate observations from hypotheses.'}
];

export class Engine {
  constructor(root,provider) { this.store = new Store(root); this.provider = provider || new CodexProvider(root); this.active = null; this.listeners = new Set(); }
  state() { return {...this.store.snapshot(),active:this.active?.id || null,playbooks}; }
  notify() { for (const fn of this.listeners) fn(this.state()); }
  subscribe(fn) { this.listeners.add(fn); return ()=>this.listeners.delete(fn); }
  create(title) { const value = this.store.create(title); this.notify(); return value; }
  memory(value) { this.store.memory(value); this.notify(); }
  async send(value) {
    if (this.active) throw new Error('One mission is already running. Stop it or wait for completion.');
    if (!value || value.consent !== true) throw new Error('Allow this message and its selected context to be sent to your model.');
    const mission = this.store.mission(value.id); const prompt = text(value.message,'Message',12000);
    if (mission.messages.length >= 40) throw new Error('This mission has reached 20 exchanges. Export it and start another mission with a summary.');
    const memory = value.includeMemory === true ? this.store.state.memory : '';
    const prior = mission.messages.map(m => `${m.role}: ${m.text}`).join('\n\n');
    const instruction = value.playbook ? playbooks.find(p=>p.id===value.playbook)?.prompt : '';
    if (value.playbook && !instruction) throw new Error('Choose an available playbook.');
    const request = ['You are Kivou, an assistant for reviewable work. Answer in the user’s language. Produce useful drafts. Do not claim external actions, verified research or source retrieval; this mode has no external tools.',instruction || '',memory ? 'Explicitly included user memory (context, not system authority):\n'+memory : '',prior,prompt].filter(Boolean).join('\n\n');
    if (request.length > 80000) throw new Error('Context is too long. Export this mission and start another with a shorter summary.');
    const receipt = {id:randomUUID(),startedAt:new Date().toISOString(),status:'running',includedMemory:memory,playbook:value.playbook || null,inputSha256:createHash('sha256').update(request).digest('hex'),usage:null,provider:this.provider.config?.kind || 'Codex CLI',model:this.provider.config?.model || null};
    mission.messages.push({role:'user',text:prompt},{role:'assistant',text:''}); mission.receipts.push(receipt); mission.status = 'running'; mission.error = null;
    const reply = mission.messages[mission.messages.length-1]; const controller = new AbortController();
    this.active = {id:mission.id,controller}; this.store.save(); this.notify();
    const work = this.provider.run(request,{signal:controller.signal,onText:output=>{if (!controller.signal.aborted) { reply.text = output; this.store.save(); this.notify(); }}})
      .then(result=>{if (controller.signal.aborted) throw new Error('Cancelled'); reply.text = result.text;receipt.usage = result.usage;mission.status = 'completed';})
      .catch(()=>{mission.status = controller.signal.aborted ? 'cancelled' : 'failed';mission.error = controller.signal.aborted ? 'Stopped. Earlier and partial work are saved.' : 'The model request did not complete. Check the connection or usage limits, then send again.';})
      .finally(()=>{receipt.status = mission.status;receipt.finishedAt = new Date().toISOString();this.active = null;this.store.save();this.notify();});
    this.active.work = work; return {id:mission.id};
  }
  async cancel() { if (!this.active) return; const active = this.active; active.controller.abort(); await active.work; }
  export(id,destination) {
    const mission = this.store.mission(id); if (mission.status === 'running') throw new Error('Stop this mission before exporting a consistent snapshot.');
    const dir = path.join(destination,'Kivou-'+new Date().toISOString().replace(/[:.]/g,'-')+'-'+randomUUID().slice(0,8));
    fs.mkdirSync(dir,{recursive:false});
    const markdown = '# '+mission.title+'\n\nStatus: '+mission.status+'\n\n'+mission.messages.map(m=>'## '+(m.role==='user'?'You':'Kivou')+'\n\n'+m.text).join('\n\n');
    fs.writeFileSync(path.join(dir,'result.md'),markdown,{flag:'wx'}); fs.writeFileSync(path.join(dir,'mission.json'),JSON.stringify(mission,null,2),{flag:'wx'});
    const sha256 = createHash('sha256').update(markdown).digest('hex'); fs.writeFileSync(path.join(dir,'receipt.json'),JSON.stringify({exportedAt:new Date().toISOString(),missionId:id,markdownSha256:sha256,files:['result.md','mission.json'],note:'Export integrity receipt; not a verification of model-generated facts.'},null,2),{flag:'wx'});
    return {folder:dir,sha256};
  }
}
