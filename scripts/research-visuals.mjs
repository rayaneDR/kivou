import {chromium} from 'playwright';
import fs from 'node:fs';
fs.mkdirSync('research/screens',{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
for(const [name,url] of [['grok-bot-guide','https://x.ai/bot/guides/grok-bot-101'],['perplexity-computer','https://www.perplexity.ai/en-GB/products/computer']]){
 try{await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});await page.waitForTimeout(1500);await page.screenshot({path:'research/screens/'+name+'.png'});console.log(JSON.stringify({name,url:page.url(),images:await page.locator('img').evaluateAll(items=>items.filter(i=>i.width>250).map(i=>({alt:i.alt,src:i.currentSrc,width:i.width,height:i.height})).slice(0,8))}));}catch(e){console.log(name+': '+e.message);}
}
await browser.close();
