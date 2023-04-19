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

/***/ "./src/preload.ts":
/*!************************!*\
  !*** ./src/preload.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nconst { contextBridge, ipcRenderer } = __webpack_require__(/*! electron */ \"electron\");\nfunction buffer2String(buf) {\n    return String.fromCharCode(...new Uint8Array(buf));\n}\n;\ncontextBridge.exposeInMainWorld(\"pathsUtil\", {\n    add: (path) => __awaiter(void 0, void 0, void 0, function* () {\n        const buf = yield ipcRenderer.invoke('add_path', path);\n        return JSON.parse(buffer2String(buf));\n    }),\n    delete: (paths) => __awaiter(void 0, void 0, void 0, function* () {\n        const buf = yield ipcRenderer.invoke('delete_path', paths);\n        return JSON.parse(buffer2String(buf));\n    }),\n    read: () => __awaiter(void 0, void 0, void 0, function* () {\n        const buf = yield ipcRenderer.invoke('read_paths');\n        return JSON.parse(buffer2String(buf));\n    }),\n    open: (path) => __awaiter(void 0, void 0, void 0, function* () {\n        const buf = ipcRenderer.invoke('open_path', path);\n        return JSON.parse(buffer2String(buf));\n    }),\n    clear: () => __awaiter(void 0, void 0, void 0, function* () {\n        const buf = ipcRenderer.invoke('clear_paths');\n        return JSON.parse(buffer2String(buf));\n    })\n});\n\n\n//# sourceURL=webpack://local-music-player/./src/preload.ts?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/preload.ts");
/******/ 	
/******/ })()
;