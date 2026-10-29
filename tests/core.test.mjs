import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {Engine} from '../core/engine.mjs';
import {Store} from '../core/store.mjs';
import {providerEnv,argumentsFor} from '../core/provider.mjs';
const root=()=>fs.mkdtempSync(path.join(os.tmpdir(),'kivou-independent-'));
const done=engine=>new Promise(resolve=>{if(!engine.active)return resolve();const off=engine.subscribe(()=>{if(!engine.active){off();resolve();}});});
test('independent mission persists Unicode and explicit context; exporting never overwrites',async()=>{
 const dir=root();let received='';const engine=new Engine(dir,{run:async(prompt,{onText})=>{received=prompt;onText('A partial draft');return {text:'A complete original draft',usage:{input_tokens:12,output_tokens:8}};}});
 engine.memory('الدارجة · French · a careful voice');const mission=engine.create('فكرة جديدة');await engine.send({id:mission.id,message:'Shape this original idea.',consent:true,includeMemory:true});await done(engine);
 assert.match(received,/الدارجة/);assert.equal(engine.state().missions[0].status,'completed');assert.equal(new Engine(dir,{}).state().missions[0].messages[1].text,'A complete original draft');
 const destination=root();const first=engine.export(mission.id,destination);const second=engine.export(mission.id,destination);assert.notEqual(first.folder,second.folder);assert.equal(first.sha256,second.sha256);assert.equal(fs.readdirSync(first.folder).length,3);
});
test('memory inclusion is off by default and bounded inputs do not launch a model',async()=>{
 let count=0;let received='';const engine=new Engine(root(),{run:async prompt=>{count++;received=prompt;return {text:'Draft'};}});engine.memory('PRIVATE-MEMORY-SAMPLE');const mission=engine.create('A project');
 await assert.rejects(engine.send({id:mission.id,message:'Hello'}),/Allow/);await assert.rejects(engine.send({id:mission.id,message:'x'.repeat(12001),consent:true}),/Message/);assert.equal(count,0);
 await engine.send({id:mission.id,message:'Hello',consent:true});await done(engine);assert.equal(received.includes('PRIVATE-MEMORY-SAMPLE'),false);
});
test('cancellation wins over a late success and only one mission runs',async()=>{
 let finish;const engine=new Engine(root(),{run:()=>new Promise(resolve=>{finish=resolve;})});const mission=engine.create('Stop test');await engine.send({id:mission.id,message:'Wait',consent:true});await assert.rejects(engine.send({id:mission.id,message:'Duplicate',consent:true}),/already running/);
 const cancellation=engine.cancel();finish({text:'Too late'});await cancellation;assert.equal(engine.state().missions[0].status,'cancelled');assert.equal(engine.state().missions[0].messages[1].text,'');assert.equal(engine.state().active,null);
});
test('restart marks unfinished work interrupted while keeping partial text',()=>{
 const dir=root();const store=new Store(dir);const mission=store.create('Recovery');const mutable=store.mission(mission.id);mutable.status='running';mutable.messages.push({role:'assistant',text:'Partial work'});store.save();const reopened=new Store(dir);assert.equal(reopened.snapshot().missions[0].status,'interrupted');assert.equal(reopened.snapshot().missions[0].messages[0].text,'Partial work');
});
test('corrupt workspace is preserved instead of silently reset',()=>{
 const dir=root();fs.writeFileSync(path.join(dir,'workspace.json'),'invalid saved original');assert.throws(()=>new Store(dir),/preserved/);assert.equal(fs.readFileSync(path.join(dir,'workspace.json'),'utf8'),'invalid saved original');
});
test('model failure is explicit and keeps partial output',async()=>{
 const engine=new Engine(root(),{run:async(prompt,{onText})=>{onText('Keep this');throw new Error('Synthetic disconnect');}});const mission=engine.create('Failure');await engine.send({id:mission.id,message:'Try',consent:true});await done(engine);assert.equal(engine.state().missions[0].status,'failed');assert.equal(engine.state().missions[0].messages[1].text,'Keep this');
});
test('provider does not inherit API keys, chat IDs, model overrides or plugins',()=>{
 const env=providerEnv({PATH:'bin',USERPROFILE:'user',OPENAI_API_KEY:'fake',CODEX_API_KEY:'fake',GH_TOKEN:'fake',CODEX_THREAD_ID:'fake'});assert.deepEqual(Object.keys(env).sort(),['PATH','USERPROFILE']);const args=argumentsFor('scratch');assert.ok(args.includes('--ignore-user-config'));assert.ok(args.includes('read-only'));assert.ok(args.includes('plugins'));assert.ok(args.includes('hooks'));assert.ok(args.includes('shell_tool'));
});
