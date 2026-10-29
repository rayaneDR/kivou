import {chromium} from 'playwright';
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY='1';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
try{await page.goto('https://www.apple.com/newsroom/2025/06/apple-elevates-the-iphone-experience-with-ios-26/',{waitUntil:'domcontentloaded',timeout:30000});const reference=page.getByAltText('Live Translation in Messages is shown on iPhone 16 Pro.',{exact:true}).first();await reference.scrollIntoViewIfNeeded();await reference.screenshot({path:'research/screens/apple-ios-messages.png',timeout:12000});console.log('Official Apple Messages reference captured.');}catch(error){console.log('Reference capture unavailable: '+error.message);}
await browser.close();
