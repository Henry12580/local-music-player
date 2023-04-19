const { contextBridge, ipcRenderer } = require('electron');

function buffer2String(buf: Buffer) {
  return String.fromCharCode(...new Uint8Array(buf));
};

contextBridge.exposeInMainWorld("pathsUtil", {
  add: async (path: string) => {
    const buf = await ipcRenderer.invoke('add_path', path);
    return JSON.parse(buffer2String(buf));
  },
  delete: async (paths: string[]) => {
    const buf: Buffer = await ipcRenderer.invoke('delete_path', paths);
    return JSON.parse(buffer2String(buf));
  },
  read: async () => {
    const buf: Buffer = await ipcRenderer.invoke('read_paths')
    return JSON.parse(buffer2String(buf));
  },
  open: async (path: string) => {
    const buf = ipcRenderer.invoke('open_path', path);
    return JSON.parse(buffer2String(buf));
  },
  clear: async () => {
    const buf = ipcRenderer.invoke('clear_paths');
    return JSON.parse(buffer2String(buf));
  }
})