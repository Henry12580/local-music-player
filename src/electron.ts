import { GlobalVarForm, openPath, addPath, deletePaths, clearPaths, readPaths } from "./fileUtil";
const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path');

const createWindow = () => {
  // Every instance of BrowserWindow creates an application window
  const win = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // 将node环境集成到渲染进程中，即关闭沙盒功能，渲染进程可访问任意node模块
      // nodeIntegration: true,
    }
  })
  win.webContents.openDevTools();
  win.loadFile('index.html');
  win.setFullScreen(true);
};

var global_var: GlobalVarForm = {
  filePaths: [],
}
ipcMain.handle('add_path', (newPath: string) => Buffer.from(JSON.stringify(addPath(global_var, newPath))));
ipcMain.handle('delete_path', (paths: string[]) => Buffer.from(JSON.stringify(deletePaths(global_var, paths))));
ipcMain.handle('read_paths', () => Buffer.from(JSON.stringify(readPaths(global_var))));
ipcMain.handle('open_path', (path: string) => Buffer.from(JSON.stringify(openPath(path))));
ipcMain.handle('clear_paths', () => Buffer.from(JSON.stringify(clearPaths(global_var))));

app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', () => {
    // Make sure the app does not quit on MacOS
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });

});

app.on('window-all-closed', () => {
  // if platform isn't MacOS
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
