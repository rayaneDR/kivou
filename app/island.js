const $=id=>document.getElementById(id);let expanded=false,ready=false,busy=false;
const request=(method,value)=>window.kivou.request(method,value);
$('toggle').onclick=event=>{$('pill').dataset.motion=event.detail?'pointer':'instant';request('expand',!expanded);};
window.kivou.onIsland(value=>{expanded=value;$('panel').hidden=!value;$('toggle').setAttribute('aria-expanded',String(value));if(!value){$('pill').dataset.motion='instant';$('toggle').focus();}});
document.addEventListener('keydown',event=>{if(event.key==='Escape')request('expand',false);});
$('open').onclick=()=>request('open');
function render(state){ready=state.connection.ready;busy=!!state.active;$('label').textContent=busy?'Kivou is working':ready?'Ready when you are':'Kivou is here';$('light').className=busy?'working':'';$('quick-send').disabled=!ready||busy;$('stop').hidden=!busy;$('connection-help').textContent=busy?'A mission is running. Stop it here or follow it in your workspace.':ready?'Your selected model is ready. Quick messages exclude saved memory.':'Connect your model in the workspace to ask a question.';}
$('stop').onclick=async()=>{try{await request('cancel');}catch(error){$('error').textContent=error.message;$('error').hidden=false;}};
window.kivou.onState(render);request('state').then(render);
$('quick').onsubmit=async event=>{event.preventDefault();$('quick-send').disabled=true;try{await request('quick',{message:$('quick-message').value,consent:$('quick-consent').checked});$('quick-message').value='';$('quick-consent').checked=false;$('error').hidden=true;}catch(error){$('error').textContent=error.message;$('error').hidden=false;$('quick-send').disabled=!ready||busy;}};
