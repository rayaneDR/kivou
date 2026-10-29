import fs from 'node:fs';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {validateProvider,ApiProvider} from './api-provider.mjs';
export class ProviderSettings{
 constructor(root,vault){this.root=root;this.vault=vault;this.file=path.join(root,'provider.json');this.config={kind:'codex',model:'',base:''};this.encrypted=null;
  if(fs.existsSync(this.file)){const stat=fs.lstatSync(this.file);if(stat.isSymbolicLink()||stat.size>20000)throw new Error('Provider settings are linked or too large. Preserve the file and restore a backup.');let value;try{value=JSON.parse(fs.readFileSync(this.file,'utf8'));this.config=validateProvider(value.config);this.encrypted=value.encrypted||null;}catch{throw new Error('Provider settings could not be read. The existing file was preserved.');}}
 }
 public(){return {...this.config,hasKey:!!this.encrypted};}
 save(value){
  const config=validateProvider(value);if(typeof value.key!=='string'||value.key.length>4096)throw new Error('Enter a valid key or leave the field empty.');
  let encrypted=config.kind===this.config.kind&&config.base===this.config.base?this.encrypted:null;
  if(value.clearKey===true||config.kind==='codex'||config.kind==='ollama')encrypted=null;
  if(value.key&&config.kind!=='codex'&&config.kind!=='ollama'){if(!this.vault.available())throw new Error('Windows secure storage is unavailable. No key was saved; restore secure storage first.');encrypted=this.vault.encrypt(value.key).toString('base64');}
  if(['anthropic','gemini'].includes(config.kind)&&!encrypted)throw new Error('This provider requires an API key.');
  const temp=path.join(this.root,'.provider-'+randomUUID()+'.tmp');try{fs.writeFileSync(temp,JSON.stringify({config,encrypted}),{flag:'wx'});fs.renameSync(temp,this.file);}finally{if(fs.existsSync(temp))fs.unlinkSync(temp);}
  this.config=config;this.encrypted=encrypted;
 }
 adapter(codex){if(this.config.kind==='codex')return codex;const key=this.encrypted?this.vault.decrypt(Buffer.from(this.encrypted,'base64')):'';return new ApiProvider(this.config,key);}
}
