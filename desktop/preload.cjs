const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('kivou',{
 request:(method,value)=>ipcRenderer.invoke('kivou:request',method,value),
 onState:callback=>{const listener=(_,value)=>callback(value);ipcRenderer.on('kivou:state',listener);return()=>ipcRenderer.removeListener('kivou:state',listener);},
 onIsland:callback=>{const listener=(_,value)=>callback(value);ipcRenderer.on('kivou:island',listener);return()=>ipcRenderer.removeListener('kivou:island',listener);}
});
