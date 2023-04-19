/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst { app, BrowserWindow, ipcMain } = __webpack_require__(/*! electron */ \"electron\");\nconst { access, constants } = __webpack_require__(/*! node:fs/promises */ \"node:fs/promises\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst createWindow = () => {\n    // Every instance of BrowserWindow creates an application window\n    const win = new BrowserWindow({\n        width: 600,\n        height: 600,\n        webPreferences: {\n            preload: path.join(__dirname, 'preload.js'),\n            // 将node环境集成到渲染进程中，即关闭沙盒功能，渲染进程可访问任意node模块\n            // nodeIntegration: true,\n        }\n    });\n    win.webContents.openDevTools();\n    win.loadFile('src/index.html');\n    win.setFullScreen(true);\n};\nlet musicPaths = [];\nipcMain.handle('add_path', (path) => musicPaths.push(path));\nipcMain.handle('delete_path', (path) => musicPaths = musicPaths.filter(p => p != path));\nipcMain.handle('read_paths', () => Buffer.from(JSON.stringify(musicPaths)));\nipcMain.handle('open_path', (path) => { });\napp.whenReady().then(() => {\n    createWindow();\n    app.on('activate', () => {\n        // Make sure the app does not quit on MacOS\n        if (BrowserWindow.getAllWindows().length === 0)\n            createWindow();\n    });\n});\napp.on('window-all-closed', () => {\n    // if platform isn't MacOS\n    if (process.platform !== 'darwin') {\n        app.quit();\n    }\n});\n\n\n//# sourceURL=webpack://my-electron-app/./src/main.ts?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "node:fs/promises":
/*!***********************************!*\
  !*** external "node:fs/promises" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("node:fs/promises");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;