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

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nconst { contextBridge, ipcRenderer } = __webpack_require__(/*! electron */ \"electron\");\ncontextBridge.exposeInMainWorld(\"fileUtil\", {\n    read: (path) => __awaiter(void 0, void 0, void 0, function* () {\n        try {\n            const fileContent = yield ipcRenderer.invoke('read_file', path);\n            const blob = new Blob([fileContent]);\n            return {\n                success: true,\n                payload: blob\n            };\n        }\n        catch (err) {\n            return {\n                success: false,\n                message: String(err),\n                payload: new Blob(),\n            };\n        }\n    })\n});\nlet filePaths = [];\ncontextBridge.exposeInMainWorld(\"pathsUtil\", {\n    add: (path) => __awaiter(void 0, void 0, void 0, function* () {\n        if (filePaths.includes(path)) {\n            return {\n                success: false,\n                payload: filePaths.length,\n                message: 'Path already exists!'\n            };\n        }\n        filePaths.push(path);\n        localStorage.setItem('filePaths', JSON.stringify(filePaths));\n        return {\n            success: true,\n            payload: filePaths.length\n        };\n    }),\n    delete: (paths) => __awaiter(void 0, void 0, void 0, function* () {\n        try {\n            filePaths = filePaths.filter(e => {\n                for (const path of paths) {\n                    if (e === path) {\n                        return false;\n                    }\n                }\n                return true;\n            });\n            localStorage.setItem('filePaths', JSON.stringify(filePaths));\n            return {\n                success: true,\n                payload: filePaths.length,\n            };\n        }\n        catch (err) {\n            return {\n                success: false,\n                payload: filePaths.length,\n            };\n        }\n    }),\n    read: () => __awaiter(void 0, void 0, void 0, function* () {\n        // const buf: Buffer = await ipcRenderer.invoke('read_paths')\n        // return JSON.parse(buffer2String(buf));\n        try {\n            if (filePaths.length) {\n                return {\n                    success: true,\n                    payload: filePaths\n                };\n            }\n            else {\n                const filePathsStorageItem = localStorage.getItem('filePaths');\n                filePaths = filePathsStorageItem ? JSON.parse(filePathsStorageItem) : [];\n                return {\n                    success: true,\n                    payload: filePaths\n                };\n            }\n        }\n        catch (err) {\n            return {\n                success: false,\n                message: String(err),\n                payload: []\n            };\n        }\n    }),\n    open: (path) => __awaiter(void 0, void 0, void 0, function* () {\n        const jsonString = yield ipcRenderer.invoke('open_path', path);\n        return JSON.parse(jsonString);\n    }),\n    clear: () => __awaiter(void 0, void 0, void 0, function* () {\n        // const buf: Buffer = await ipcRenderer.invoke('clear_paths');\n        // return JSON.parse(buffer2String(buf));\n        try {\n            filePaths = [];\n            localStorage.removeItem('filePaths');\n            return {\n                success: true,\n                payload: undefined\n            };\n        }\n        catch (err) {\n            return {\n                success: false,\n                message: String(err),\n                payload: undefined\n            };\n        }\n    })\n});\n\n\n//# sourceURL=webpack://local-music-player/./src/preload.ts?");

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