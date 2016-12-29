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
	var __webpackManifest__ = ['../src/rencontres', './rx-mongo.spec.js', './Rencontres.spec.js'];

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
		"./Rencontres.spec.js": 8,
		"./double.spec.js": 2,
		"./rx-mongo.spec.js": 12,
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

	describe("Tests avec mocha-chai", function () {
	    it("La vérité véritable", function () {
	        assert.equal(true, true);
	    });
	    it("Test d'une chaine de caractère", function () {
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

/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	module.exports = require("rxmongo");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("mongodb");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _chai = __webpack_require__(3);

	var _chai2 = _interopRequireDefault(_chai);

	var _rxmongo = __webpack_require__(6);

	var _mongodb = __webpack_require__(7);

	var _rencontres = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var assert = _chai2.default.assert;
	var expect = _chai2.default.expect;
	_chai2.default.should();

	describe("Gestion des rencontres délégué", function () {
	  var rencontre = void 0;
	  before(function () {
	    rencontre = new _rencontres.Rencontres("mongodb://@localhost:27017/baskoredb");
	  });
	  it("Lit une rencontre", function () {
	    rencontre.lecture(2).subscribe(function (rencontre) {
	      expect(rencontre).to.exist;
	    }, function (err) {
	      expect(err).to.not.exist;
	    });
	  });
	});

/***/ },
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Rencontres = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _rxmongo = __webpack_require__(6);

	var _mongodb = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Rencontres = exports.Rencontres = function () {
	  function Rencontres(url) {
	    _classCallCheck(this, Rencontres);

	    _rxmongo.RxMongo.connect(url).subscribe(function (db) {}, function (err) {
	      console.log('Err: ' + err);
	    });
	  }

	  _createClass(Rencontres, [{
	    key: 'lecture',
	    value: function lecture(id) {
	      return new _rxmongo.RxCollection("rencontres").find({}).first();
	    }
	  }]);

	  return Rencontres;
	}();

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _chai = __webpack_require__(3);

	var _chai2 = _interopRequireDefault(_chai);

	var _rxmongo = __webpack_require__(6);

	var _mongodb = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var assert = _chai2.default.assert;
	var expect = _chai2.default.expect;
	_chai2.default.should();

	describe("Gestion des rencontres", function () {
	  before(function () {
	    var mongoUrl = "mongodb://@localhost:27017/baskoredb";
	    _rxmongo.RxMongo.connect(mongoUrl).subscribe(function (db) {}, function (err) {
	      console.log('Err: ' + err);
	    });
	  });
	  after(function () {});
	  it("Lit une rencontre", function () {
	    new _rxmongo.RxCollection("rencontres").find({}).first().subscribe(function (rencontre) {
	      expect(rencontre).to.exist;
	    }, function (err) {
	      expect(err).to.not.exist;
	    });
	  });
	});

/***/ }
/******/ ]);