/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	// This gets replaced by webpack with the updated files on rebuild
	var __webpackManifest__ = ['./simple.spec.js'];

	var testsContext = __webpack_require__(1);

	function inManifest(path) {
	  return __webpackManifest__.indexOf(path) >= 0;
	}

	var runnable = testsContext.keys().filter(inManifest);

	runnable.forEach(testsContext);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./double.spec.js": 2,
		"./simple.spec.js": 4
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _chai2 = _interopRequireDefault(_chai);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var assert = _chai2.default.assert;
	var expect = _chai2.default.expect;
	_chai2.default.should();

	describe("Vrai2", function () {
	    it("doit etre vrai", function () {
	        assert.equal(true, true);
	    });
	    it("doit etre une chaine", function () {
	        var vrai = "vraie";
	        vrai.should.be.a("string");
	    });
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("chai");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _chai2 = _interopRequireDefault(_chai);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var assert = _chai2.default.assert;
	var expect = _chai2.default.expect;
	_chai2.default.should();

	describe("Vrai", function () {
	    it("doit etre vrai", function () {
	        assert.equal(true, true);
	    });
	    it("doit etre une chaine", function () {
	        var vrai = "vraie";
	        vrai.should.be.a("string");
	    });
	});

/***/ }
/******/ ]);