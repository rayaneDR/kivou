const {app,BrowserWindow,ipcMain,dialog,globalShortcut,Tray,Menu,nativeImage,screen,safeStorage}=require('electron');
const path=require('node:path');
let workspace,island,engine,tray,quitting=false,expanded=false,connection={ready:false,message:'Check your Codex connection to begin.'};
app.setName('Kivou');
app.setPath('userData',process.env.KIVOU_DATA_ROOT||path.join(app.getPath('appData'),'Kivou Independent'));
if(!app.requestSingleInstanceLock()) app.quit();
else {
 app.on('second-instance',()=>{workspace?.show();workspace?.focus();});
 app.whenReady().then(async()=>{
  const {Engine}=await import('../core/engine.mjs');
  engine=new Engine(path.join(app.getPath('userData'),'work'));
  const {ProviderSettings}=await import('../core/provider-settings.mjs');
  const codex=engine.provider;const settings=new ProviderSettings(path.join(app.getPath('userData'),'work'),{available:()=>safeStorage.isEncryptionAvailable(),encrypt:value=>safeStorage.encryptString(value),decrypt:value=>safeStorage.decryptString(value)});
  engine.provider=settings.adapter(codex);
  const security={preload:path.join(__dirname,'preload.cjs'),contextIsolation:true,nodeIntegration:false,sandbox:true};
  workspace=new BrowserWindow({title:'Kivou',width:1180,height:820,minWidth:380,minHeight:600,backgroundColor:'#f6f5f0',autoHideMenuBar:true,webPreferences:security});
  island=new BrowserWindow({title:'Kivou Island',width:264,height:48,frame:false,transparent:true,hasShadow:false,alwaysOnTop:true,skipTaskbar:true,resizable:false,show:false,webPreferences:security});
  const broadcast=()=>{for(const window of [workspace,island])if(!window.isDestroyed())window.webContents.send('kivou:state',snapshot());};
  function snapshot(){return {...engine.state(),connection,provider:settings.public(),version:app.getVersion()};}
  function sizeIsland(value){expanded=value;const area=screen.getDisplayNearestPoint(screen.getCursorScreenPoint()).workArea;const width=Math.min(value?380:264,area.width);const height=Math.min(value?320:48,area.height-20);island.setBounds({x:Math.round(area.x+(area.width-width)/2),y:area.y+8,width,height});island.webContents.send('kivou:island',value);}
  ipcMain.handle('kivou:request',async(event,method,value)=>{
   const sender=[workspace,island].find(window=>event.sender===window.webContents&&event.senderFrame===window.webContents.mainFrame);
   if(!sender)throw new Error('Unknown application window.');
   if(method==='state')return snapshot();
   if(method==='open'){workspace.show();workspace.focus();sizeIsland(false);return;}
   if(method==='expand'){sizeIsland(value===true);return;}
   if(method==='show-island'){sizeIsland(false);island.showInactive();return;}
   if(method==='cancel')return engine.cancel();
   if(method==='quick'){
    if(sender!==island||!value||value.consent!==true)throw new Error('Allow this message before sending.');
    if(engine.active)throw new Error('A mission is already running.');
    const {text}=await import('../core/store.mjs');const prompt=text(value.message,'Message',12000);
    const mission=engine.create(prompt.slice(0,80));return engine.send({id:mission.id,message:prompt,consent:true,includeMemory:false});
   }
   if(sender!==workspace)throw new Error('Use the workspace for this action.');
   if(method==='provider'){
    if(engine.active)throw new Error('Wait for the active mission before switching providers.');
    settings.save(value);engine.provider=settings.adapter(codex);connection={ready:false,message:'Provider saved. Check the configuration before running a mission.'};broadcast();return settings.public();
   }
   if(method==='create')return engine.create(value);
   if(method==='send')return engine.send(value);
   if(method==='memory'){engine.memory(value);return;}
   if(method==='probe'){connection={ready:false,message:'Checking your local Codex login…'};broadcast();connection=await engine.provider.probe();broadcast();return connection;}
   if(method==='export'){const selected=await dialog.showOpenDialog(workspace,{title:'Choose a parent folder for a new Kivou export',properties:['openDirectory','createDirectory']});if(selected.canceled)return null;return engine.export(value,selected.filePaths[0]);}
   throw new Error('Unknown action.');
  });
  for(const window of [workspace,island]){
   window.webContents.setWindowOpenHandler(()=>({action:'deny'}));window.webContents.on('will-navigate',event=>event.preventDefault());
   window.on('close',event=>{if(!quitting){event.preventDefault();window.hide();}});
  }
  engine.subscribe(broadcast);
  tray=new Tray(nativeImage.createFromPath(path.join(__dirname,'../app/icon.png')));tray.setToolTip('Kivou');
  tray.setContextMenu(Menu.buildFromTemplate([{label:'Open Kivou',click:()=>workspace.show()},{label:'Show island',click:()=>{sizeIsland(false);island.showInactive();}},{type:'separator'},{label:'Quit Kivou',click:()=>app.quit()}]));
  globalShortcut.register('CommandOrControl+Alt+K',()=>{sizeIsland(!expanded);island.show();if(expanded)island.focus();});
  await workspace.loadFile(path.join(__dirname,'../app/index.html'));await island.loadFile(path.join(__dirname,'../app/island.html'));sizeIsland(false);island.showInactive();
 }).catch(error=>{dialog.showErrorBox('Kivou could not open',error.message);quitting=true;app.quit();});
 app.on('before-quit',event=>{if(!quitting&&engine?.active){event.preventDefault();quitting=true;engine.cancel().finally(()=>app.quit());}else quitting=true;});
 app.on('will-quit',()=>globalShortcut.unregisterAll());
}
