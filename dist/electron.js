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

/***/ "./src/electron.ts":
/*!*************************!*\
  !*** ./src/electron.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fileUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fileUtil */ \"./src/fileUtil.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\nconst { app, BrowserWindow, ipcMain } = __webpack_require__(/*! electron */ \"electron\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst createWindow = () => {\n    // Every instance of BrowserWindow creates an application window\n    const win = new BrowserWindow({\n        width: 1000,\n        height: 600,\n        webPreferences: {\n            // webSecurity: false,\n            preload: path.join(__dirname, 'preload.js'),\n            // 将node环境集成到渲染进程中，即关闭沙盒功能，渲染进程可访问任意node模块\n            // nodeIntegration: true,\n        }\n    });\n    win.webContents.openDevTools();\n    win.loadURL('http://localhost:8080');\n    // win.loadFile('index.html');\n    win.setFullScreen(true);\n};\nvar global_var = {\n    filePaths: [],\n};\nipcMain.handle('add_path', (event, newPath) => Buffer.from(JSON.stringify((0,_fileUtil__WEBPACK_IMPORTED_MODULE_0__.addPath)(global_var, newPath))));\nipcMain.handle('delete_path', (event, paths) => Buffer.from(JSON.stringify((0,_fileUtil__WEBPACK_IMPORTED_MODULE_0__.deletePaths)(global_var, paths))));\nipcMain.handle('read_paths', () => Buffer.from(JSON.stringify((0,_fileUtil__WEBPACK_IMPORTED_MODULE_0__.readPaths)(global_var))));\nipcMain.handle('open_path', (event, path) => __awaiter(void 0, void 0, void 0, function* () {\n    const pathContent = yield (0,_fileUtil__WEBPACK_IMPORTED_MODULE_0__.openPath)(path);\n    return JSON.stringify(pathContent);\n}));\nipcMain.handle('clear_paths', () => Buffer.from(JSON.stringify((0,_fileUtil__WEBPACK_IMPORTED_MODULE_0__.clearPaths)(global_var))));\nipcMain.handle('read_file', (event, filePath) => (0,_fileUtil__WEBPACK_IMPORTED_MODULE_0__.readMusicFile)(filePath));\napp.whenReady().then(() => {\n    createWindow();\n    app.on('activate', () => {\n        // Make sure the app does not quit on MacOS\n        if (BrowserWindow.getAllWindows().length === 0)\n            createWindow();\n    });\n});\napp.on('window-all-closed', () => {\n    // if platform isn't MacOS\n    if (process.platform !== 'darwin') {\n        app.quit();\n    }\n});\n\n\n//# sourceURL=webpack://local-music-player/./src/electron.ts?");

/***/ }),

/***/ "./src/fileUtil.ts":
/*!*************************!*\
  !*** ./src/fileUtil.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addPath: () => (/* binding */ addPath),\n/* harmony export */   clearPaths: () => (/* binding */ clearPaths),\n/* harmony export */   deletePaths: () => (/* binding */ deletePaths),\n/* harmony export */   openPath: () => (/* binding */ openPath),\n/* harmony export */   readMusicFile: () => (/* binding */ readMusicFile),\n/* harmony export */   readPaths: () => (/* binding */ readPaths)\n/* harmony export */ });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __asyncValues = (undefined && undefined.__asyncValues) || function (o) {\n    if (!Symbol.asyncIterator) throw new TypeError(\"Symbol.asyncIterator is not defined.\");\n    var m = o[Symbol.asyncIterator], i;\n    return m ? m.call(o) : (o = typeof __values === \"function\" ? __values(o) : o[Symbol.iterator](), i = {}, verb(\"next\"), verb(\"throw\"), verb(\"return\"), i[Symbol.asyncIterator] = function () { return this; }, i);\n    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }\n    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }\n};\nconst { opendir, readFile } = __webpack_require__(/*! node:fs/promises */ \"node:fs/promises\");\nfunction readMusicFile(filePath) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            const fileContent = yield readFile(filePath);\n            return fileContent;\n        }\n        catch (err) {\n            console.error(err);\n            return Buffer.from([]);\n        }\n    });\n}\nfunction openPath(path) {\n    var _a, e_1, _b, _c;\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            const filenames = [];\n            const dir = yield opendir(path);\n            try {\n                for (var _d = true, dir_1 = __asyncValues(dir), dir_1_1; dir_1_1 = yield dir_1.next(), _a = dir_1_1.done, !_a;) {\n                    _c = dir_1_1.value;\n                    _d = false;\n                    try {\n                        const file = _c;\n                        filenames.push(file.name);\n                    }\n                    finally {\n                        _d = true;\n                    }\n                }\n            }\n            catch (e_1_1) { e_1 = { error: e_1_1 }; }\n            finally {\n                try {\n                    if (!_d && !_a && (_b = dir_1.return)) yield _b.call(dir_1);\n                }\n                finally { if (e_1) throw e_1.error; }\n            }\n            return {\n                success: true,\n                payload: filenames,\n            };\n        }\n        catch (err) {\n            return {\n                success: false,\n                message: String(err),\n            };\n        }\n    });\n}\nfunction addPath(global_var, newpath) {\n    const { filePaths } = global_var;\n    if (filePaths.find(path => path === newpath)) {\n        return {\n            success: false,\n            message: 'Path already exists',\n            payload: filePaths.length,\n        };\n    }\n    else {\n        return {\n            success: true,\n            payload: filePaths.push(newpath),\n        };\n    }\n}\nfunction deletePaths(global_var, paths) {\n    try {\n        global_var.filePaths = global_var.filePaths.filter(e => {\n            for (const path of paths) {\n                if (e === path) {\n                    return false;\n                }\n            }\n            return true;\n        });\n        return {\n            success: true,\n            payload: global_var.filePaths.length,\n        };\n    }\n    catch (err) {\n        return {\n            success: false,\n            payload: global_var.filePaths.length,\n        };\n    }\n}\nfunction clearPaths(global_var) {\n    try {\n        global_var.filePaths = [];\n        return {\n            success: true,\n        };\n    }\n    catch (err) {\n        return {\n            success: false,\n            message: String(err),\n        };\n    }\n}\nfunction readPaths(global_var) {\n    return {\n        success: true,\n        payload: global_var.filePaths.slice()\n    };\n}\n\n\n//# sourceURL=webpack://local-music-player/./src/fileUtil.ts?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/electron.ts");
/******/ 	
/******/ })()
;