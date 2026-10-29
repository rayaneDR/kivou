import {text} from './store.mjs';
export const providerKinds=['codex','openai-compatible','anthropic','gemini','ollama'];
export function validateProvider(value){
 if(!value||!providerKinds.includes(value.kind))throw new Error('Choose a supported provider protocol.');
 if(value.kind==='codex')return {kind:'codex',model:'',base:''};
 const model=text(value.model,'Model name',150);const base=text(value.base,'API base URL',500).replace(/\/+$/,'');let url;
 try{url=new URL(base);}catch{throw new Error('Enter a valid provider base URL.');}
 if(url.username||url.password||url.search||url.hash)throw new Error('Use a base URL without credentials, query parameters or fragments.');
 const loopback=['localhost','127.0.0.1','[::1]'].includes(url.hostname);
 if(url.protocol!=='https:'&&!(url.protocol==='http:'&&loopback))throw new Error('Use HTTPS; plain HTTP is allowed only for a local loopback model server.');
 return {kind:value.kind,model,base};
}
export function requestFor(config,key,prompt){
 const {kind,base,model}=validateProvider(config);const headers={'content-type':'application/json'};
 if(kind==='anthropic')return {url:base+'/messages',headers:{...headers,'x-api-key':key,'anthropic-version':'2023-06-01'},body:{model,max_tokens:4096,messages:[{role:'user',content:prompt}]}};
 if(kind==='gemini')return {url:base+'/models/'+encodeURIComponent(model)+':generateContent',headers:{...headers,'x-goog-api-key':key},body:{contents:[{role:'user',parts:[{text:prompt}]}]}};
 if(kind==='ollama')return {url:base+'/api/chat',headers,body:{model,messages:[{role:'user',content:prompt}],stream:false}};
 if(kind==='openai-compatible')return {url:base+'/chat/completions',headers:{...headers,...(key?{authorization:'Bearer '+key}:{})},body:{model,messages:[{role:'user',content:prompt}],stream:false}};
 throw new Error('This provider uses a separate local adapter.');
}
export function responseFor(kind,data){
 let output,usage;
 if(kind==='anthropic'){output=data.content?.filter(item=>item.type==='text').map(item=>item.text).join('\n\n');usage=data.usage;}
 else if(kind==='gemini'){output=data.candidates?.[0]?.content?.parts?.filter(part=>!part.thought).map(part=>part.text||'').join('');usage=data.usageMetadata;}
 else if(kind==='ollama'){output=data.message?.content;usage={input_tokens:data.prompt_eval_count,output_tokens:data.eval_count};}
 else{output=data.choices?.[0]?.message?.content;usage=data.usage;}
 if(typeof output!=='string'||!output.trim())throw new Error('The provider returned no usable text. Check model compatibility, output limits or content restrictions.');
 return {text:output,usage:usage||null};
}
export class ApiProvider{
 constructor(config,key,transport=fetch){this.config=validateProvider(config);this.key=key;this.transport=transport;}
 async probe(){return {ready:true,message:'Provider settings are saved. Credentials and model access are verified only by a real request. The provider may bill API usage.'};}
 async run(prompt,{signal,onText}){
  const request=requestFor(this.config,this.key,prompt);const response=await this.transport(request.url,{method:'POST',headers:request.headers,body:JSON.stringify(request.body),signal:AbortSignal.any([signal,AbortSignal.timeout(300000)]),redirect:'error'});
  if(!response.ok){await response.body?.cancel();throw new Error('Provider request failed (HTTP '+response.status+'). Check the key, model, endpoint and usage allowance.');}
  const reader=response.body.getReader();let length=0;const parts=[];
  while(true){const chunk=await reader.read();if(chunk.done)break;length+=chunk.value.byteLength;if(length>4_000_000){await reader.cancel();throw new Error('Provider output exceeded the preview size limit.');}parts.push(Buffer.from(chunk.value));}
  let data;try{data=JSON.parse(Buffer.concat(parts).toString('utf8'));}catch{throw new Error('The endpoint returned an invalid JSON response. Check the provider protocol and base URL.');}
  const result=responseFor(this.config.kind,data);if(signal.aborted)throw new Error('Cancelled');onText(result.text);return result;
 }
}
