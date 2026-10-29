import {chromium} from 'playwright';
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY='1';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
try{await page.goto('https://x.ai/bot/guides/grok-bot-101',{waitUntil:'domcontentloaded',timeout:30000});const image=page.getByAltText("Grok Bot's cloud computer",{exact:true});await image.scrollIntoViewIfNeeded();await image.screenshot({path:'research/screens/grok-cloud-computer.png',timeout:12000});console.log('Captured official Grok Bot cloud computer reference.');}catch(e){console.log(e.message);}
try{await page.goto('https://www.perplexity.ai/en-GB/products/computer',{waitUntil:'domcontentloaded',timeout:30000});console.log('Perplexity page: '+await page.title());await page.screenshot({path:'research/screens/perplexity-computer.png',timeout:10000,animations:'disabled'});console.log('Public page capture saved; inspect before using as UI evidence.');}catch(e){console.log('Perplexity reference unavailable: '+e.message);}
await browser.close();
