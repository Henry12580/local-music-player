const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("fileUtil", {
  read: async (path: string): Promise<ResponseFormat<Blob>> => {
    try {
      const fileContent: Buffer = await ipcRenderer.invoke('read_file', path);
      const blob = new Blob([fileContent]);
      return {
        success: true,
        payload: blob
      }
    } catch (err) {
      return {
        success: false,
        message: String(err),
        payload: new Blob(),
      }
    }
  }
})

let filePaths: string[] = [];
contextBridge.exposeInMainWorld("pathsUtil", {
  add: async (path: string): Promise<ResponseFormat<number>> => {
    if (filePaths.includes(path)) {
      return {
        success: false,
        payload: filePaths.length,
        message: 'Path already exists!'
      }
    }
    filePaths.push(path);
    localStorage.setItem('filePaths', JSON.stringify(filePaths));
    return {
      success: true,
      payload: filePaths.length
    }
  },
  delete: async (paths: string[]): Promise<ResponseFormat<number>> => {
    try {
      filePaths = filePaths.filter( e => {
        for (const path of paths) {
          if (e === path) {
            return false;
          }
        }
        return true;
      });
      localStorage.setItem('filePaths', JSON.stringify(filePaths));
      return {
        success: true,
        payload: filePaths.length,
      }
    } catch(err) {
      return {
        success: false,
        payload: filePaths.length,
      }
    }
  },
  read: async (): Promise<ResponseFormat<string[]>> => {
    // const buf: Buffer = await ipcRenderer.invoke('read_paths')
    // return JSON.parse(buffer2String(buf));
    try {
      if (filePaths.length) {
        return {
          success: true,
          payload: filePaths
        }
      } else {
        const filePathsStorageItem = localStorage.getItem('filePaths');
        filePaths = filePathsStorageItem ? JSON.parse(filePathsStorageItem) : [];
        return {
          success: true,
          payload: filePaths
        }
      }
    } catch(err) {
      return {
        success: false,
        message: String(err),
        payload: []
      }
    }
  },
  open: async (path: string) => {
    const jsonString = await ipcRenderer.invoke('open_path', path);
    return JSON.parse(jsonString);
  },
  clear: async (): Promise<ResponseFormat<undefined>> => {
    // const buf: Buffer = await ipcRenderer.invoke('clear_paths');
    // return JSON.parse(buffer2String(buf));
    try {
      filePaths = [];
      localStorage.removeItem('filePaths');
      return {
        success: true,
        payload: undefined
      }
    } catch (err) {
      return {
        success: false,
        message: String(err),
        payload: undefined
      }
    }
  }
})