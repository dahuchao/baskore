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
	var __webpackManifest__ = ['./store.spec.js'];

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
		"./simple.spec.js": 4,
		"./store.spec.js": 5
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _chai2 = _interopRequireDefault(_chai);

	var _store = __webpack_require__(6);

	var _store2 = _interopRequireDefault(_store);

	var _actionsTypes = __webpack_require__(8);

	var types = _interopRequireWildcard(_actionsTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var assert = _chai2.default.assert;
	var expect = _chai2.default.expect;
	var should = _chai2.default.should();

	describe("Etant donné que le Store créé", function () {
	    it("alors l'état doit être initialise", function () {
	        var etat = _store2.default.getState().rencontreState;
	        assert.isNotNull(etat, "L'état n'est pas bien initialisé");
	    });
	    it("alors la liste des rencontres est vide", function () {
	        var rencontres = _store2.default.getState().rencontreState.rencontres;
	        assert.isNotNull(rencontres, "L'état n'est pas bien initialisé");
	        expect(rencontres).to.be.empty;
	        rencontres.should.have.lengthOf(0);
	    });
	    describe("Lorsque le mode ajout est demandé", function () {
	        before(function () {
	            _store2.default.dispatch({ type: types.AJOUTER_RENCONTRE });
	        });
	        it("alors le mode ajout doit être actif", function () {
	            var etat = _store2.default.getState().rencontreState;
	            console.log("*****" + etat);
	            should.exist(etat.modeAjout);
	            etat.modeAjout.should.to.be.true;
	        });
	        describe("Lorsqu'une rencontre est ajoutée", function () {
	            before(function () {
	                _store2.default.dispatch({
	                    type: types.POST_RENCONTRE_SUCCESS,
	                    rencontre: {
	                        date: new Date(),
	                        hote: {
	                            nom: "host-test",
	                            marque: 0
	                        },
	                        visiteur: {
	                            nom: "visiteur-test",
	                            marque: 0
	                        }
	                    }
	                });
	            });
	            it("alors le nombre de rencontre est de 1", function () {
	                var etat = _store2.default.getState().rencontreState;
	                etat.rencontres.should.have.lengthOf(1);
	            });
	            it("alors le mode ajout est désactivé", function () {
	                var etat = _store2.default.getState().rencontreState;
	                etat.modeAjout.should.to.be.false;
	            });
	        });
	    });
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(7);

	var _actionsTypes = __webpack_require__(8);

	var types = _interopRequireWildcard(_actionsTypes);

	var _immutable = __webpack_require__(9);

	var _immutable2 = _interopRequireDefault(_immutable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var initState = {
	    rencontres: [],
	    modeEdition: false,
	    modeAjout: false,
	    modeVerrouille: true
	};

	function rencontreReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
	    var action = arguments[1];

	    console.log("##############################");
	    console.log("| ACTION: " + JSON.stringify(action.type));
	    var actions = {
	        "DEFAUT": function DEFAUT() {
	            return _immutable2.default.fromJS(state);
	        }
	    };
	    actions[types.VERROUILLAGE] = function () {
	        console.log("| verrouillage.");
	        return _immutable2.default.fromJS(state).set("modeVerrouille", !state.modeVerrouille);
	    };
	    actions[types.GET_RENCONTRES_SUCCESS] = function () {
	        console.log("| rencontres: " + JSON.stringify(action.rencontres));
	        return _immutable2.default.fromJS(state).set("rencontres", action.rencontres);
	    };
	    actions[types.GET_RENCONTRE_SUCCESS] = function () {
	        console.log("| rencontre: " + JSON.stringify(action.rencontre));
	        var commentaires = _immutable2.default.List().push({ commentaire: "Morgane entre sur le terrain à la place de Jacqueline", valide: true }).push({ commentaire: "Panier magnifique de Tifanie", valide: true }).push({ commentaire: "Les visiteurs dominent la partie", valide: true }).push({ commentaire: "Dans la raquette les interieurs dominent sans partage", valide: true }).push({ commentaire: "Superbe action des Nantaises qui malheureusement ne donnera rien", valide: true });
	        var rencontreAvecCommentaire = _immutable2.default.fromJS(action.rencontre).set("commentaires", commentaires);
	        return _immutable2.default.fromJS(state).set("rencontre", rencontreAvecCommentaire);
	    };
	    actions[types.POST_RENCONTRE_SUCCESS] = function () {
	        console.log("| rencontre (nouvelle): " + JSON.stringify(action.rencontre));
	        var rencontres = _immutable2.default.fromJS(state).get("rencontres").push(action.rencontre);
	        return _immutable2.default.fromJS(state).set("rencontres", rencontres).set("modeAjout", false);
	    };
	    actions[types.DELETE_RENCONTRE_SUCCESS] = function () {
	        console.log("| rencontre (supprimée): " + action.idRencontre);
	        var rencontres = state.rencontres.filter(function (rencontre) {
	            return rencontre.id != action.idRencontre;
	        });
	        return _immutable2.default.fromJS(state).set("rencontres", rencontres);
	    };
	    actions[types.EDITER_RENCONTRE] = function () {
	        console.log("| Mode édition: " + JSON.stringify(state.modeEdition));
	        return _immutable2.default.fromJS(state).set("modeEdition", !state.modeEdition);
	    };
	    actions[types.PUT_RENCONTRE_SUCCESS] = function () {
	        console.log("| rencontre: " + JSON.stringify(action.rencontre));
	        var rencontre = _immutable2.default.fromJS(state).get("rencontre").set("date", action.rencontre.date).set("periode", action.rencontre.periode).set("hote.nom", action.rencontre.hote.nom).set("visiteur.nom", action.rencontre.visiteur.nom);
	        return _immutable2.default.fromJS(state).set("rencontre", rencontre).set("modeEdition", false);
	    };
	    actions[types.NOUVELLE_INFO] = function () {
	        console.log("| rencontre: " + JSON.stringify(action.rencontre));
	        return _immutable2.default.fromJS(state).set("rencontre", action.rencontre);
	    };
	    actions[types.AJOUTER_RENCONTRE] = function () {
	        var rencontre = {
	            id: 0,
	            date: new Date(),
	            hote: {
	                nom: "",
	                marque: 0
	            },
	            visiteur: {
	                nom: "",
	                marque: 0
	            }
	        };
	        console.log("| Mode ajout: " + JSON.stringify(state.modeAjout));
	        return _immutable2.default.fromJS(state).set("rencontre", rencontre).set("modeAjout", !state.modeAjout);
	    };
	    actions[types.ANNULER_RENCONTRE] = function () {
	        console.log("| Annulation de l'ajout d'une rencontre.");
	        return _immutable2.default.fromJS(state).set("modeAjout", !state.modeAjout);
	    };
	    actions[types.NOUVELLE] = function () {
	        console.log("| Nouvelle période: " + JSON.stringify(action.periode));
	        console.log("| Nouvelle période (rencontre): " + JSON.stringify(state.rencontre));
	        var rencontre = _immutable2.default.fromJS(state).get("rencontre").set("periode", action.periode);
	        console.log("| Nouvelle période (nouvelle rencontre): " + JSON.stringify(rencontre));
	        return _immutable2.default.fromJS(state).set("rencontre", rencontre);
	    };
	    actions[types.COMMENTAIRE_POST] = function () {
	        var commentaire = action.commentaire;
	        console.log(" Nouveau commentaire sur la rencontre: " + commentaire);
	        var rencontre = _immutable2.default.fromJS(state).get("rencontre");
	        var commentaires = rencontre.get("commentaires").push({ commentaire: commentaire, valide: false });
	        rencontre = rencontre.set("commentaires", commentaires);
	        return _immutable2.default.fromJS(state).set("rencontre", rencontre);
	    };
	    actions[types.COMMENTAIRE_NOUVEAU] = function () {
	        var commentaire = action.commentaire;
	        console.log(" Nouveau commentaire sur la rencontre: " + commentaire);
	        var rencontre = _immutable2.default.fromJS(state).get("rencontre");
	        var commentaires = rencontre.get("commentaires").map(function (commentaire) {
	            return commentaire.set("valide", true);
	            // return commentaire
	        });
	        rencontre = rencontre.set("commentaires", commentaires);
	        return _immutable2.default.fromJS(state).set("rencontre", rencontre);
	    };
	    var nouveauState = (actions[action.type] || actions['DEFAUT'])();
	    console.log("Nouvel état: " + nouveauState);
	    console.log("-------------------");
	    return nouveauState.toJS();
	}

	var reducers = (0, _redux.combineReducers)({ rencontreState: rencontreReducer });
	var store = (0, _redux.createStore)(reducers);
	exports.default = store;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// Recontres
	var GET_RENCONTRES_SUCCESS = exports.GET_RENCONTRES_SUCCESS = "GET_RENCONTRES_SUCCESS";
	// Recontre
	var AJOUT_RENCONTRE = exports.AJOUT_RENCONTRE = "AJOUT_RENCONTRE";
	var POST_RENCONTRE = exports.POST_RENCONTRE = "POST_RENCONTRE";
	var POST_RENCONTRE_SUCCESS = exports.POST_RENCONTRE_SUCCESS = "POST_RENCONTRE_SUCCESS";
	var GET_RENCONTRE_SUCCESS = exports.GET_RENCONTRE_SUCCESS = "GET_RENCONTRE_SUCCESS";
	var PUT_RENCONTRE_SUCCESS = exports.PUT_RENCONTRE_SUCCESS = "PUT_RENCONTRE_SUCCESS";
	var DELETE_RENCONTRE_SUCCESS = exports.DELETE_RENCONTRE_SUCCESS = "DELETE_RENCONTRE_SUCCESS";
	var NOUVELLE_INFO = exports.NOUVELLE_INFO = "NOUVELLE_MARQUE";
	var EDITER_RENCONTRE = exports.EDITER_RENCONTRE = "EDITER_RENCONTRE";
	var NOUVELLE = exports.NOUVELLE = "NOUVELLE";
	var AJOUTER_RENCONTRE = exports.AJOUTER_RENCONTRE = "AJOUTER_RENCONTRE";
	var ANNULER_RENCONTRE = exports.ANNULER_RENCONTRE = "ANNULER_RENCONTRE";
	var NOUVELLE_PERIODE = exports.NOUVELLE_PERIODE = "NOUVELLE_PERIODE";
	var COMMENTAIRE_POST = exports.COMMENTAIRE_POST = "COMMENTAIRE_POST";
	var COMMENTAIRE_NOUVEAU = exports.COMMENTAIRE_NOUVEAU = "COMMENTAIRE_NOUVEAU";
	var VERROUILLAGE = exports.VERROUILLAGE = "VERROUILLAGE";

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ }
/******/ ]);