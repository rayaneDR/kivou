import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {validateProvider,requestFor,ApiProvider} from '../core/api-provider.mjs';
import {ProviderSettings} from '../core/provider-settings.mjs';
const root=()=>fs.mkdtempSync(path.join(os.tmpdir(),'kivou-provider-'));
test('API base validation rejects embedded credentials and insecure remote endpoints',()=>{
 for(const base of ['http://example.com/v1','https://secret@example.com/v1','https://example.com?key=fake'])assert.throws(()=>validateProvider({kind:'openai-compatible',base,model:'model'}));
 assert.equal(validateProvider({kind:'ollama',base:'http://127.0.0.1:11434',model:'local-model'}).kind,'ollama');
});
for(const [kind,fixture,expectedPath]of [
 ['openai-compatible',{choices:[{message:{content:'A useful answer'}}],usage:{prompt_tokens:8}},'/chat/completions'],
 ['anthropic',{content:[{type:'text',text:'A useful answer'}],usage:{input_tokens:8}},'/messages'],
 ['gemini',{candidates:[{content:{parts:[{thought:true,text:'not the answer'},{text:'A useful answer'}]}}],usageMetadata:{promptTokenCount:8}},'/models/example:generateContent'],
 ['ollama',{message:{content:'A useful answer'},prompt_eval_count:8,eval_count:4},'/api/chat']]){
 test(kind+' adapter serializes and parses its documented protocol (synthetic)',async()=>{
  let request;const config={kind,base:'https://provider.example/v1',model:'example'};const adapter=new ApiProvider(config,'synthetic-key',async(url,options)=>{request={url,options};return new Response(JSON.stringify(fixture),{status:200});});let shown='';const result=await adapter.run('An original prompt',{signal:new AbortController().signal,onText:value=>shown=value});assert.equal(result.text,'A useful answer');assert.equal(shown,result.text);assert.ok(request.url.endsWith(expectedPath));assert.equal(request.options.redirect,'error');assert.ok(!request.url.includes('synthetic-key'));assert.ok(!JSON.stringify(JSON.parse(request.options.body)).includes('synthetic-key'));
 });
}
test('vault persists encrypted bytes and never sends a saved key to the renderer snapshot',()=>{
 const dir=root();const vault={available:()=>true,encrypt:value=>Buffer.from(value).reverse(),decrypt:value=>Buffer.from(value).reverse().toString()};const settings=new ProviderSettings(dir,vault);settings.save({kind:'anthropic',model:'example',base:'https://provider.example/v1',key:'synthetic-secret'});assert.equal(JSON.stringify(settings.public()).includes('synthetic-secret'),false);assert.equal(fs.readFileSync(path.join(dir,'provider.json'),'utf8').includes('synthetic-secret'),false);
 settings.save({kind:'openai-compatible',model:'another',base:'https://another.example/v1',key:''});assert.equal(settings.public().hasKey,false,'A different endpoint must never inherit another endpoint’s key');
});
test('no plaintext key fallback when secure storage is unavailable',()=>{
 const dir=root();const settings=new ProviderSettings(dir,{available:()=>false});assert.throws(()=>settings.save({kind:'gemini',model:'example',base:'https://provider.example/v1',key:'synthetic-secret'}),/No key was saved/);assert.equal(fs.existsSync(path.join(dir,'provider.json')),false);
});
test('provider HTTP failure exposes status without echoing provider secrets',async()=>{
 const adapter=new ApiProvider({kind:'anthropic',model:'example',base:'https://provider.example/v1'},'secret',async()=>new Response('secret',{status:401}));await assert.rejects(adapter.run('Hello',{signal:new AbortController().signal,onText:()=>{}}),error=>error.message.includes('401')&&!error.message.includes('secret'));
});
