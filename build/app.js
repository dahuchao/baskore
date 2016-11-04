/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactRedux = __webpack_require__(3);
	
	var _store = __webpack_require__(4);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _router = __webpack_require__(8);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _reactTapEventPlugin = __webpack_require__(33);
	
	var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _reactTapEventPlugin2.default)();
	
	_reactDom2.default.render(_react2.default.createElement(
	  _reactRedux.Provider,
	  { store: _store2.default },
	  _router2.default
	), document.getElementById("content"));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _redux = __webpack_require__(5);
	
	var _actionsTypes = __webpack_require__(6);
	
	var types = _interopRequireWildcard(_actionsTypes);
	
	var _immutable = __webpack_require__(7);
	
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
/* 5 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(9);
	
	var _history = __webpack_require__(10);
	
	var _accueilConteneur = __webpack_require__(11);
	
	var _accueilConteneur2 = _interopRequireDefault(_accueilConteneur);
	
	var _rencontresConteneur = __webpack_require__(12);
	
	var _rencontresConteneur2 = _interopRequireDefault(_rencontresConteneur);
	
	var _rencontreConteneur = __webpack_require__(23);
	
	var _rencontreConteneur2 = _interopRequireDefault(_rencontreConteneur);
	
	var _MuiThemeProvider = __webpack_require__(32);
	
	var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var appHistory = (0, _reactRouter.useRouterHistory)(_history.createHashHistory)({ queryKey: false });
	
	exports.default = _react2.default.createElement(
	  _MuiThemeProvider2.default,
	  null,
	  _react2.default.createElement(
	    _reactRouter.Router,
	    { history: appHistory },
	    _react2.default.createElement(
	      _reactRouter.Route,
	      { path: "/", component: _accueilConteneur2.default },
	      _react2.default.createElement(_reactRouter.IndexRedirect, { to: "/rencontres" }),
	      _react2.default.createElement(_reactRouter.Route, { path: "/rencontres/:idRencontre", component: _rencontreConteneur2.default }),
	      _react2.default.createElement(_reactRouter.Route, { path: "/rencontres", component: _rencontresConteneur2.default })
	    )
	  )
	);

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("history");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AccueilConteneur = function (_React$Component) {
	  _inherits(AccueilConteneur, _React$Component);
	
	  function AccueilConteneur() {
	    _classCallCheck(this, AccueilConteneur);
	
	    return _possibleConstructorReturn(this, (AccueilConteneur.__proto__ || Object.getPrototypeOf(AccueilConteneur)).apply(this, arguments));
	  }
	
	  _createClass(AccueilConteneur, [{
	    key: "render",
	    value: function render() {
	      var date = new Date();
	      var strDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
	      var strHeure = date.getHours() + ":" + date.getMinutes();
	      return _react2.default.createElement(
	        "div",
	        null,
	        this.props.children,
	        _react2.default.createElement(
	          "footer",
	          null,
	          _react2.default.createElement(
	            "div",
	            { id: "info" },
	            _react2.default.createElement(
	              "span",
	              { className: "date" },
	              strDate,
	              " ",
	              strHeure
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return AccueilConteneur;
	}(_react2.default.Component);
	
	exports.default = AccueilConteneur;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(3);
	
	var _store = __webpack_require__(4);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _actionsTypes = __webpack_require__(6);
	
	var types = _interopRequireWildcard(_actionsTypes);
	
	var _request = __webpack_require__(13);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _rencontres = __webpack_require__(14);
	
	var _rencontres2 = _interopRequireDefault(_rencontres);
	
	var _rencontresAjout = __webpack_require__(20);
	
	var _rencontresAjout2 = _interopRequireDefault(_rencontresAjout);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var RencontresConteneur = _react2.default.createClass({
	  displayName: "RencontresConteneur",
	  componentDidMount: function componentDidMount() {
	    var adresse = location.protocol + "//" + location.host + "/api/rencontres";
	    console.info("Requete de l'API web: " + adresse);
	    (0, _request2.default)(adresse, function (error, response, rencontres) {
	      if (!error && response.statusCode == 200) {
	        var oRencontres = JSON.parse(rencontres);
	        _store2.default.dispatch({
	          type: types.GET_RENCONTRES_SUCCESS,
	          rencontres: oRencontres
	        });
	      }
	    });
	  },
	  ajouterRencontre: function ajouterRencontre() {
	    console.log("Ajouter rencontre.");
	    _store2.default.dispatch({
	      type: types.AJOUTER_RENCONTRE
	    });
	  },
	  supprimeRencontre: function supprimeRencontre(idRencontre) {
	    console.info("Suppression: " + idRencontre);
	    var adresse = location.protocol + "//" + location.host + "/api/rencontres/" + idRencontre;
	    console.info("Requete de l'API web: " + adresse);
	    (0, _request2.default)({ url: adresse, method: "DELETE" }, function (error, response) {
	      if (!error && response.statusCode == 204) {
	        _store2.default.dispatch({
	          type: types.DELETE_RENCONTRE_SUCCESS,
	          idRencontre: idRencontre
	        });
	      }
	    });
	  },
	  ajoutRencontre: function ajoutRencontre(infos) {
	    if (infos == null) {
	      _store2.default.dispatch({
	        type: types.ANNULER_RENCONTRE,
	        rencontre: rencontre
	      });
	      return;
	    }
	    var rencontre = this.props.rencontre;
	    console.info("Info: " + JSON.stringify(infos));
	    rencontre.date = infos.date;
	    rencontre.periode = infos.periode;
	    rencontre.hote.nom = infos.hote;
	    rencontre.visiteur.nom = infos.visiteur;
	    console.log("Ajout rencontre : " + JSON.stringify(rencontre));
	    var adresse = location.protocol + "//" + location.host + "/api/rencontres";
	    console.info("Requete de l'API web: " + adresse);
	    (0, _request2.default)({ url: adresse, method: "POST", json: rencontre }, function (error, response, rencontres) {
	      if (!error && response.statusCode == 201) {
	        // Calcul de l'identifiant de la nouvelle rencontre
	        var _$exec = /^\/api\/rencontres\/(.*)$/.exec(response.headers.location),
	            _$exec2 = _slicedToArray(_$exec, 2),
	            id = _$exec2[1];
	        // let id = response.headers.location.replace(new RegExp("/api\/rencontre\/(.*)"), "$1")
	
	
	        console.info("id: " + id);
	        rencontre.id = id;
	        console.info("Rencontre: " + JSON.stringify(rencontre));
	        _store2.default.dispatch({
	          type: types.POST_RENCONTRE_SUCCESS,
	          rencontre: rencontre
	        });
	      }
	    });
	  },
	  render: function render() {
	    return this.props.modeAjout ? _react2.default.createElement(_rencontresAjout2.default, {
	      rencontre: this.props.rencontre,
	      ajoutRencontre: this.ajoutRencontre }) : _react2.default.createElement(_rencontres2.default, { rencontres: this.props.rencontres,
	      supprimeRencontre: this.supprimeRencontre,
	      ajouterRencontre: this.ajouterRencontre });
	  }
	});
	
	var mapStateToProps = function mapStateToProps(store) {
	  return {
	    rencontres: store.rencontreState.rencontres,
	    rencontre: store.rencontreState.rencontre,
	    modeAjout: store.rencontreState.modeAjout
	  };
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(RencontresConteneur);

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(9);
	
	var _materialUi = __webpack_require__(15);
	
	var _info = __webpack_require__(16);
	
	var _info2 = _interopRequireDefault(_info);
	
	var _folder = __webpack_require__(17);
	
	var _folder2 = _interopRequireDefault(_folder);
	
	var _add = __webpack_require__(18);
	
	var _add2 = _interopRequireDefault(_add);
	
	var _delete = __webpack_require__(19);
	
	var _delete2 = _interopRequireDefault(_delete);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Rencontres = _react2.default.createClass({
	  displayName: "Rencontres",
	
	  contextTypes: {
	    router: _react2.default.PropTypes.func.isRequired
	  },
	  preparationDate: function preparationDate(date) {
	    var dateRencontre = new Date(date);
	    console.debug("date Rencontres: " + JSON.stringify(dateRencontre));
	    var jour = new Date();
	    var strdate = !dateRencontre ? "date à préciser" : dateRencontre < jour ? "" + jour.toLocaleDateString() : dateRencontre.toLocaleDateString() + " " + dateRencontre.getHours() + ":" + dateRencontre.getMinutes();
	    return strdate;
	  },
	  zoom: function zoom(idRencontre) {
	    console.debug("Ouverture de la rencontre: " + idRencontre);
	    this.context.router.push("/rencontres/" + idRencontre);
	  },
	  render: function render() {
	    var _this = this;
	
	    var poubelle = {
	      style: {
	        width: 72,
	        height: 72,
	        padding: 20,
	        top: 0,
	        right: 0
	      },
	      icon: {
	        width: 36,
	        height: 36,
	        color: "rgb(0, 188, 212)"
	      }
	    };
	    var style = {
	      marginRight: 20
	    };
	    var styleRencontre = {
	      textDecoration: 'none'
	    };
	    return _react2.default.createElement(
	      "div",
	      null,
	      _react2.default.createElement(
	        _materialUi.AppBar,
	        { title: "BASKORE",
	          onClick: this.props.listerRencontres,
	          iconClassNameRight: "muidocs-icon-navigation-expand-more" },
	        _react2.default.createElement(
	          "div",
	          { className: "flottant" },
	          _react2.default.createElement(
	            _materialUi.FloatingActionButton,
	            { style: style,
	              onMouseDown: this.props.ajouterRencontre },
	            _react2.default.createElement(_add2.default, null)
	          )
	        )
	      ),
	      _react2.default.createElement(
	        _materialUi.Card,
	        null,
	        _react2.default.createElement(
	          _materialUi.List,
	          { id: "rencontres" },
	          this.props.rencontres.map(function (rencontre) {
	            var strdate = _this.preparationDate(rencontre.date);
	            return _react2.default.createElement(
	              _materialUi.ListItem,
	              {
	                key: rencontre.id,
	                primaryText: rencontre.hote.nom + '-' + rencontre.visiteur.nom,
	                secondaryText: strdate,
	                onTouchTap: _this.zoom.bind(_this, rencontre.id),
	                rightIconButton: _react2.default.createElement(
	                  _materialUi.IconButton,
	                  {
	                    style: poubelle.style,
	                    iconStyle: poubelle.icon,
	                    onClick: _this.props.supprimeRencontre.bind(null, rencontre.id) },
	                  _react2.default.createElement(_delete2.default, null)
	                )
	              },
	              _react2.default.createElement(_reactRouter.Link, { to: "/rencontres/" + rencontre.id })
	            );
	          })
	        )
	      )
	    );
	  }
	});
	exports.default = Rencontres;

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("material-ui");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/action/info");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/file/folder");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/content/add");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/action/delete");

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _materialUi = __webpack_require__(15);
	
	var _arrowBack = __webpack_require__(21);
	
	var _arrowBack2 = _interopRequireDefault(_arrowBack);
	
	var _close = __webpack_require__(22);
	
	var _close2 = _interopRequireDefault(_close);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var RencontreAjout = _react2.default.createClass({
	  displayName: "RencontreAjout",
	  getInitialState: function getInitialState() {
	    var rencontre = this.props.rencontre;
	    return { date: new Date(), periode: 1, hote: rencontre.hote.nom, visiteur: rencontre.visiteur.nom };
	  },
	  majDate: function majDate(x, date) {
	    var dateState = this.state.date;
	    dateState.setDate(date.getDate());
	    dateState.setMonth(date.getMonth());
	    dateState.setFullYear(date.getFullYear());
	    this.setState({ date: dateState });
	    console.debug("Ajout date: " + JSON.stringify(this.state));
	  },
	  majHeure: function majHeure(x, heure) {
	    var dateState = this.state.date;
	    dateState.setHours(heure.getHours());
	    dateState.setMinutes(heure.getMinutes());
	    this.setState({ date: dateState });
	    console.debug("Ajout heure: " + JSON.stringify(this.state));
	  },
	  majHote: function majHote(e) {
	    this.setState({ hote: e.target.value });
	    console.debug("Ajout hote: " + JSON.stringify(this.state));
	  },
	  majVisiteur: function majVisiteur(e) {
	    this.setState({ visiteur: e.target.value });
	    console.debug("Ajout visiteur: " + JSON.stringify(this.state));
	  },
	  sauver: function sauver() {
	    // let date = this.state.date
	    // let strdate = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
	    // this.state.date = strdate
	    this.props.ajoutRencontre(this.state);
	  },
	  annuler: function annuler() {
	    this.props.ajoutRencontre(null);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      null,
	      _react2.default.createElement(_materialUi.AppBar, { title: "Ajouter rencontre",
	        iconElementLeft: _react2.default.createElement(
	          _materialUi.IconButton,
	          { onClick: this.sauver },
	          _react2.default.createElement(_arrowBack2.default, null)
	        ),
	        iconElementRight: _react2.default.createElement(
	          _materialUi.IconButton,
	          { onClick: this.annuler },
	          _react2.default.createElement(_close2.default, null)
	        )
	      }),
	      _react2.default.createElement(
	        _materialUi.Card,
	        null,
	        _react2.default.createElement(
	          _materialUi.CardText,
	          null,
	          _react2.default.createElement(_materialUi.DatePicker, { floatingLabelText: "Date de la rencontre",
	            onChange: this.majDate }),
	          _react2.default.createElement(_materialUi.TimePicker, { floatingLabelText: "Heure de la rencontre",
	            format: "24hr",
	            onChange: this.majHeure }),
	          _react2.default.createElement(_materialUi.TextField, { floatingLabelText: "Club hote",
	            defaultValue: this.props.rencontre.hote.nom,
	            onChange: this.majHote }),
	          _react2.default.createElement(_materialUi.TextField, { floatingLabelText: "Club visiteur",
	            defaultValue: this.props.rencontre.visiteur.nom,
	            onChange: this.majVisiteur })
	        )
	      )
	    );
	  }
	});
	
	exports.default = RencontreAjout;

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/navigation/arrow-back");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/navigation/close");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _immutable = __webpack_require__(7);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _reactRedux = __webpack_require__(3);
	
	var _store = __webpack_require__(4);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _actionsTypes = __webpack_require__(6);
	
	var types = _interopRequireWildcard(_actionsTypes);
	
	var _request = __webpack_require__(13);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _socket = __webpack_require__(24);
	
	var _socket2 = _interopRequireDefault(_socket);
	
	var _rencontre = __webpack_require__(25);
	
	var _rencontre2 = _interopRequireDefault(_rencontre);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var RencontreConteneur = _react2.default.createClass({
	  displayName: "RencontreConteneur",
	  componentWillMount: function componentWillMount() {
	    var adresse = location.href;
	    console.info("Adresse web socket: " + adresse);
	    this.socket = (0, _socket2.default)(adresse);
	    this.socket.on("connect", this.connexionTableMarque);
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    var idRencontre = this.props.rencontre.id;
	    console.info("Fermeture tableau rencontre " + idRencontre);
	    this.socket.emit("fermerRencontre", idRencontre);
	  },
	  componentDidMount: function componentDidMount() {
	    var idRencontre = this.props.params.idRencontre;
	    this.socket.emit("ouvrirRencontre", idRencontre);
	    var adresse = location.protocol + "//" + location.host + "/api/rencontres/" + idRencontre;
	    console.info("Requete de l'API web: " + adresse);
	    (0, _request2.default)(adresse, function (error, response, rencontre) {
	      if (!error && response.statusCode == 200) {
	        var oRencontre = JSON.parse(rencontre);
	        _store2.default.dispatch({
	          type: types.GET_RENCONTRE_SUCCESS,
	          rencontre: oRencontre
	        });
	      }
	    });
	  },
	  connexionTableMarque: function connexionTableMarque() {
	    console.info("Connecté avec la table de marque");
	    var idRencontre = this.props.params.idRencontre;
	    // console.info("Identifiant rencontre: " + idRencontre)
	    this.socket.emit("ouvrirRencontre", idRencontre);
	    this.socket.on("nouvelleInfo", this.surReceptionNouvelleInfo);
	  },
	  surReceptionNouvelleInfo: function surReceptionNouvelleInfo(rencontre) {
	    // console.debug("Reception d'une nouvelle info provenant du serveur: " + JSON.stringify(rencontre))
	    _store2.default.dispatch({
	      type: types.NOUVELLE_INFO,
	      rencontre: rencontre
	    });
	  },
	  surNouvelleMarque: function surNouvelleMarque(rencontre) {
	    this.socket.emit('panierMarque', this.props.rencontre);
	  },
	  surNouveauCommentaire: function surNouveauCommentaire(commentaire) {
	    console.debug("Commentaire: " + commentaire);
	    this.socket.emit("nouveauCommentaire", {
	      "idRencontre": this.props.params.idRencontre,
	      "commentaire": commentaire
	    });
	    _store2.default.dispatch({
	      type: types.COMMENTAIRE_POST,
	      commentaire: commentaire
	    });
	    this.socket.on("nouveauCommentaire", function () {
	      return _store2.default.dispatch({
	        type: types.COMMENTAIRE_NOUVEAU,
	        commentaire: commentaire
	      });
	    });
	  },
	  surPeriode: function surPeriode(periode) {
	    // let rencontre = this.props.rencontre
	    // rencontre.periode = periode
	    console.debug("Nouvelle periode: " + JSON.stringify(periode));
	    _store2.default.dispatch({
	      type: types.NOUVELLE,
	      periode: periode
	    });
	  },
	  sauver: function sauver(infos) {
	    var strInfo = JSON.stringify(infos);
	    console.debug("Rencontre cont(sauver): " + strInfo);
	    var rencontre = _immutable2.default.fromJS(this.props.rencontre).set("date", infos.date).set("periode", infos.periode).set("hote.nom", infos.hote).set("visiteur.nom", infos.visiteur);
	    // rencontre.hote.nom = infos.hote
	    var adresse = location.protocol + "//" + location.host + "/api/rencontres/" + this.props.rencontre.id;
	    console.debug("rencontre.date: " + rencontre.date);
	    console.info("Requete de l'API web: " + adresse);
	    (0, _request2.default)({ url: adresse, method: "PUT", json: rencontre }, function (error, response, rencontre) {
	      if (!error && response.statusCode == 200) {
	        console.info("Rencontre modifiée :" + JSON.stringify(rencontre));
	        _store2.default.dispatch({
	          type: types.PUT_RENCONTRE_SUCCESS,
	          rencontre: rencontre
	        });
	      }
	    });
	  },
	  editer: function editer() {
	    _store2.default.dispatch({
	      type: types.EDITER_RENCONTRE
	    });
	  },
	  surVerrouillage: function surVerrouillage() {
	    _store2.default.dispatch({
	      type: types.VERROUILLAGE
	    });
	  },
	  render: function render() {
	    // console.debug(`Nouvelle rencontre` + Immutable.fromJS(this.props.rencontre))
	    return !this.props.rencontre ? null : _react2.default.createElement(_rencontre2.default, {
	      rencontre: this.props.rencontre,
	      surNouvelleMarque: this.surNouvelleMarque,
	      surPeriode: this.surPeriode,
	      editer: this.editer,
	      sauver: this.sauver,
	      surNouveauCommentaire: this.surNouveauCommentaire,
	      modeEdition: this.props.modeEdition,
	      modeVerrouille: this.props.modeVerrouille,
	      surVerrouillage: this.surVerrouillage });
	  }
	});
	var mapStateToProps = function mapStateToProps(store) {
	  console.debug("Modification des propriétés.");
	  return {
	    rencontre: store.rencontreState.rencontre,
	    modeEdition: store.rencontreState.modeEdition,
	    modeVerrouille: store.rencontreState.modeVerrouille
	  };
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(RencontreConteneur);

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("socket.io-client");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _immutable = __webpack_require__(7);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _reactRouter = __webpack_require__(9);
	
	var _materialUi = __webpack_require__(15);
	
	var _arrowBack = __webpack_require__(21);
	
	var _arrowBack2 = _interopRequireDefault(_arrowBack);
	
	var _modeEdit = __webpack_require__(26);
	
	var _modeEdit2 = _interopRequireDefault(_modeEdit);
	
	var _tableau = __webpack_require__(27);
	
	var _tableau2 = _interopRequireDefault(_tableau);
	
	var _commentaires = __webpack_require__(30);
	
	var _commentaires2 = _interopRequireDefault(_commentaires);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Rencontre = _react2.default.createClass({
	  displayName: "Rencontre",
	  getInitialState: function getInitialState() {
	    var rencontre = this.props.rencontre;
	    var date = rencontre.date ? rencontre.date : new Date();
	    return { date: date, hote: rencontre.hote.nom, visiteur: rencontre.visiteur.nom };
	  },
	  majDate: function majDate(x, date) {
	    var dateState = this.state.date;
	    dateState.setDate(date.getDate());
	    dateState.setMonth(date.getMonth());
	    dateState.setFullYear(date.getFullYear());
	    this.setState({ date: dateState });
	    console.debug("MAJ date: " + JSON.stringify(this.state));
	  },
	  majHeure: function majHeure(x, heure) {
	    var dateState = new Date(this.props.rencontre.date);
	    dateState.setHours(heure.getHours() + 2);
	    dateState.setMinutes(heure.getMinutes());
	    this.setState({ date: dateState });
	    console.debug("MAJ heure: " + JSON.stringify(dateState));
	  },
	  majHote: function majHote(e) {
	    this.setState({ hote: e.target.value });
	    // console.debug("MAJ Hote: " + JSON.stringify(this.state))
	  },
	  majVisiteur: function majVisiteur(e) {
	    this.setState({ visiteur: e.target.value });
	    // console.debug("MAJ visiteur: " + JSON.stringify(this.state))
	  },
	  sauver: function sauver() {
	    console.debug("Rencontre(sauver).");
	    this.props.sauver(this.state);
	  },
	  render: function render() {
	    // console.debug(`Nouvelle rencontre` + Immutable.fromJS(this.props.rencontre))
	    var style = {
	      color: "white"
	    };
	    var labelBouton = this.props.modeEdition ? "Sauver" : "Edition";
	    var date = this.props.rencontre.date ? new Date(this.props.rencontre.date) : new Date();
	    console.debug("test: " + date);
	    return this.props.modeEdition ? _react2.default.createElement(
	      "div",
	      null,
	      _react2.default.createElement(_materialUi.AppBar, {
	        title: "Edition rencontre",
	        iconElementLeft: _react2.default.createElement(
	          _materialUi.IconButton,
	          { onClick: this.sauver },
	          _react2.default.createElement(_arrowBack2.default, null)
	        )
	      }),
	      _react2.default.createElement(
	        _materialUi.Card,
	        null,
	        _react2.default.createElement(
	          _materialUi.CardText,
	          null,
	          _react2.default.createElement(_materialUi.DatePicker, { floatingLabelText: "Date de la rencontre",
	            defaultDate: date,
	            onChange: this.majDate }),
	          _react2.default.createElement(_materialUi.TimePicker, { floatingLabelText: "Heure de la rencontre",
	            defaultTime: date,
	            format: "24hr",
	            onChange: this.majHeure }),
	          _react2.default.createElement(_materialUi.TextField, { floatingLabelText: "Club Hote",
	            defaultValue: this.props.rencontre.hote.nom,
	            onChange: this.majHote }),
	          _react2.default.createElement("br", null),
	          _react2.default.createElement(_materialUi.TextField, { floatingLabelText: "Club Visiteur",
	            defaultValue: this.props.rencontre.visiteur.nom,
	            onChange: this.majVisiteur }),
	          _react2.default.createElement(_materialUi.Toggle, {
	            defaultToggled: this.props.modeVerrouille,
	            onToggle: this.props.surVerrouillage,
	            label: "Verrouill\xE9" })
	        )
	      )
	    ) : _react2.default.createElement(
	      "div",
	      null,
	      _react2.default.createElement(_materialUi.AppBar, { title: "Rencontre",
	        iconElementLeft: _react2.default.createElement(
	          _reactRouter.Link,
	          { to: "/rencontres" },
	          _react2.default.createElement(
	            _materialUi.IconButton,
	            {
	              iconStyle: style },
	            _react2.default.createElement(_arrowBack2.default, null)
	          )
	        ),
	        iconElementRight: _react2.default.createElement(
	          _materialUi.IconButton,
	          {
	            onClick: this.props.editer,
	            iconStyle: style },
	          _react2.default.createElement(_modeEdit2.default, null)
	        ) }),
	      _react2.default.createElement(_tableau2.default, {
	        rencontre: this.props.rencontre,
	        surNouvelleMarque: this.props.surNouvelleMarque,
	        surPeriode: this.props.surPeriode,
	        modeVerrouille: this.props.modeVerrouille }),
	      _react2.default.createElement(_commentaires2.default, {
	        rencontre: this.props.rencontre,
	        surNouveauCommentaire: this.props.surNouveauCommentaire,
	        modeVerrouille: this.props.modeVerrouille })
	    );
	  }
	});
	
	exports.default = Rencontre;

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/editor/mode-edit");

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _tableauMarque = __webpack_require__(28);
	
	var _tableauMarque2 = _interopRequireDefault(_tableauMarque);
	
	var _tableauEquipe = __webpack_require__(29);
	
	var _tableauEquipe2 = _interopRequireDefault(_tableauEquipe);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _react2.default.createClass({
	  displayName: "tableau",
	  surPanierHote: function surPanierHote() {
	    // console.info("Panier marque: " + JSON.stringify(this.props.rencontre.hote.marque))
	    var marque = this.props.rencontre.hote.marque;
	    this.props.rencontre.hote.marque = marque + 1;
	    // this.socket.emit('panierMarque', this.props.rencontre)
	    this.props.surNouvelleMarque();
	  },
	  surPanierVisiteur: function surPanierVisiteur() {
	    // console.info("Panier marque: " + JSON.stringify(this.props.rencontre.visiteur.marque))
	    var marque = this.props.rencontre.visiteur.marque;
	    this.props.rencontre.visiteur.marque = marque + 1;
	    // this.socket.emit('panierMarque', this.props.rencontre)
	    this.props.surNouvelleMarque();
	  },
	  surCorrectionHote: function surCorrectionHote() {
	    // console.info("Correction de la marque");
	    var marque = this.props.rencontre.hote.marque;
	    this.props.rencontre.hote.marque = marque - 1;
	    // this.socket.emit('panierMarque', this.props.rencontre)
	    this.props.surNouvelleMarque();
	  },
	  surCorrectionVisiteur: function surCorrectionVisiteur() {
	    // console.info("Correction de la marque")
	    var marque = this.props.rencontre.visiteur.marque;
	    this.props.rencontre.visiteur.marque = marque - 1;
	    // this.socket.emit('panierMarque', this.props.rencontre)
	    this.props.surNouvelleMarque();
	  },
	  render: function render() {
	    // this.ouvertureRencontre(this.props.rencontre.id)
	    return _react2.default.createElement(
	      "div",
	      { id: "tableau" },
	      _react2.default.createElement(_tableauEquipe2.default, {
	        nom: this.props.rencontre.hote.nom,
	        surPanier: this.surPanierHote,
	        modeVerrouille: this.props.modeVerrouille }),
	      _react2.default.createElement(_tableauMarque2.default, {
	        rencontre: this.props.rencontre,
	        surPeriode: this.props.surPeriode,
	        surCorrectionHote: this.surCorrectionHote,
	        surCorrectionVisiteur: this.surCorrectionVisiteur,
	        modeVerrouille: this.props.modeVerrouille }),
	      _react2.default.createElement(_tableauEquipe2.default, {
	        nom: this.props.rencontre.visiteur.nom,
	        surPanier: this.surPanierVisiteur,
	        modeVerrouille: this.props.modeVerrouille })
	    );
	  }
	});

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _materialUi = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Marque = function (_React$Component) {
	  _inherits(Marque, _React$Component);
	
	  function Marque() {
	    _classCallCheck(this, Marque);
	
	    return _possibleConstructorReturn(this, (Marque.__proto__ || Object.getPrototypeOf(Marque)).apply(this, arguments));
	  }
	
	  _createClass(Marque, [{
	    key: "surPeriode",
	    value: function surPeriode(periode) {
	      this.props.surPeriode(periode);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;
	
	      var style = {
	        minWidth: "2em",
	        height: "1.5em"
	      };
	      var labelStyle = {
	        fontSize: "1.3em",
	        paddingLeft: "0",
	        paddingRight: "0"
	      };
	      // console.debug("Conteneur4.")
	      // console.debug("Rencontre: " + JSON.stringify(this.props.rencontre))
	      return _react2.default.createElement(
	        "div",
	        { id: "marque" },
	        _react2.default.createElement(
	          "div",
	          { id: "periodes" },
	          [1, 2, 3, 4].map(function (periode) {
	            var stylePeriode = {
	              minWidth: "0",
	              lineHeight: "1.3em",
	              height: "1.3em"
	            };
	            var styleLabelPeriode = {
	              fontSize: "1em",
	              paddingLeft: "0.5em",
	              paddingRight: "0.5em"
	            };
	            periode == _this2.props.rencontre.periode ? styleLabelPeriode.color = "red" : styleLabelPeriode.color = "white";
	            console.log("Couleur: " + JSON.stringify(style));
	            return _react2.default.createElement(_materialUi.FlatButton, {
	              className: "periode",
	              style: stylePeriode,
	              labelStyle: styleLabelPeriode,
	              key: periode,
	              onClick: _this2.surPeriode.bind(_this2, periode),
	              label: "P" + periode
	            });
	          })
	        ),
	        _react2.default.createElement(
	          "div",
	          { id: "compteurs" },
	          _react2.default.createElement(_materialUi.FlatButton, {
	            className: "hote",
	            style: style,
	            labelStyle: labelStyle,
	            onClick: this.props.surCorrectionHote,
	            label: this.props.rencontre.hote.marque.toString()
	          }),
	          _react2.default.createElement(_materialUi.FlatButton, {
	            className: "visiteur",
	            style: style,
	            labelStyle: labelStyle,
	            onClick: this.props.surCorrectionVisiteur,
	            label: this.props.rencontre.visiteur.marque.toString()
	          })
	        )
	      );
	    }
	  }]);
	
	  return Marque;
	}(_react2.default.Component);
	
	exports.default = Marque;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _immutable = __webpack_require__(7);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _materialUi = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Equipe = function (_React$Component) {
	  _inherits(Equipe, _React$Component);
	
	  function Equipe() {
	    _classCallCheck(this, Equipe);
	
	    return _possibleConstructorReturn(this, (Equipe.__proto__ || Object.getPrototypeOf(Equipe)).apply(this, arguments));
	  }
	
	  _createClass(Equipe, [{
	    key: "render",
	    value: function render() {
	      var styleJoueuses = {
	        display: "flex",
	        flexDirection: "row",
	        flexWrap: "wrap",
	        justifyContent: "center",
	        borderColor: "red"
	      };
	      var id = 1;
	      var joueuses = _immutable2.default.List.of(4, 10, 14, 6, 11);
	      return _react2.default.createElement(
	        "div",
	        { className: "equipe" },
	        _react2.default.createElement(
	          "div",
	          { className: "nom" },
	          this.props.nom
	        ),
	        this.props.modeVerrouille ? _react2.default.createElement("img", { className: "blason", src: "img/ballon6.png" }) : _react2.default.createElement("img", { onClick: this.props.surPanier, className: "blason", src: "img/ballon6.png" }),
	        _react2.default.createElement(
	          "div",
	          { style: styleJoueuses },
	          joueuses.map(function (joueuse) {
	            return _react2.default.createElement(Joueuse, { key: id++, numero: joueuse });
	          })
	        )
	      );
	    }
	  }]);
	
	  return Equipe;
	}(_react2.default.Component);
	
	exports.default = Equipe;
	
	var Joueuse = function (_React$Component2) {
	  _inherits(Joueuse, _React$Component2);
	
	  function Joueuse() {
	    _classCallCheck(this, Joueuse);
	
	    return _possibleConstructorReturn(this, (Joueuse.__proto__ || Object.getPrototypeOf(Joueuse)).apply(this, arguments));
	  }
	
	  _createClass(Joueuse, [{
	    key: "surChangement",
	    value: function surChangement(sor, ent) {
	      console.debug("Changement " + sor + " pour " + ent);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this3 = this;
	
	      var num = this.props.numero;
	      var etoile = "/joueuses/joueuse-" + num + ".png";
	      var style = {
	        width: "2em",
	        height: "2em",
	        maxWidth: "40px",
	        maxHeigth: "40px"
	      };
	      var id = 1;
	      return _react2.default.createElement(
	        _materialUi.IconMenu,
	        {
	          listStyle: { backgroundColor: "bleu" },
	          style: { backgroundColor: "bleu" },
	          iconButtonElement: _react2.default.createElement("img", { style: style, src: etoile }) },
	        _immutable2.default.List.of(4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14).map(function (entrant) {
	          return _react2.default.createElement(_materialUi.MenuItem, {
	            onClick: _this3.surChangement.bind(_this3, num, entrant),
	            key: id++,
	            innerDivStyle: { color: "red", backgroundColor: "bleu", width: "2em" },
	            nestedListStyle: { backgroundColor: "bleu", width: "2em" },
	            style: { backgroundColor: "bleu" },
	            value: entrant,
	            primaryText: entrant });
	        })
	      );
	    }
	  }]);
	
	  return Joueuse;
	}(_react2.default.Component);
	
	var Etoile = function (_React$Component3) {
	  _inherits(Etoile, _React$Component3);
	
	  function Etoile() {
	    _classCallCheck(this, Etoile);
	
	    return _possibleConstructorReturn(this, (Etoile.__proto__ || Object.getPrototypeOf(Etoile)).apply(this, arguments));
	  }
	
	  _createClass(Etoile, [{
	    key: "render",
	    value: function render() {
	      var num = this.props.numero;
	      var etoile = "/joueuses/joueuse-" + num + ".png";
	      var style = {
	        width: "2em",
	        height: "2em"
	      };
	      return _react2.default.createElement("img", { style: style, src: etoile });
	    }
	  }]);
	
	  return Etoile;
	}(_react2.default.Component);
	
	var Joueur = function (_React$Component4) {
	  _inherits(Joueur, _React$Component4);
	
	  function Joueur() {
	    _classCallCheck(this, Joueur);
	
	    return _possibleConstructorReturn(this, (Joueur.__proto__ || Object.getPrototypeOf(Joueur)).apply(this, arguments));
	  }
	
	  _createClass(Joueur, [{
	    key: "render",
	    value: function render() {
	      var styleJoueuse = {
	        width: "2em",
	        borderColor: "white"
	      };
	      return _react2.default.createElement(
	        _materialUi.SelectField,
	        {
	          className: "joueuse",
	          style: styleJoueuse,
	          autoWidth: "true",
	          value: "4" },
	        _react2.default.createElement(_materialUi.MenuItem, { value: "4", primaryText: "4" }),
	        _react2.default.createElement(_materialUi.MenuItem, { value: "5", primaryText: "5" }),
	        _react2.default.createElement(_materialUi.MenuItem, { value: "6", primaryText: "6" }),
	        _react2.default.createElement(_materialUi.MenuItem, { value: "7", primaryText: "7" }),
	        _react2.default.createElement(_materialUi.MenuItem, { value: "8", primaryText: "8" }),
	        _react2.default.createElement(_materialUi.MenuItem, { value: "9", primaryText: "9" }),
	        _react2.default.createElement(_materialUi.MenuItem, { value: "10", primaryText: "10" }),
	        _react2.default.createElement(_materialUi.MenuItem, { value: "11", primaryText: "11" }),
	        _react2.default.createElement(_materialUi.MenuItem, { value: "12", primaryText: "12" }),
	        _react2.default.createElement(_materialUi.MenuItem, { value: "13", primaryText: "13" }),
	        _react2.default.createElement(_materialUi.MenuItem, { value: "14", primaryText: "14" })
	      );
	    }
	  }]);
	
	  return Joueur;
	}(_react2.default.Component);

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _immutable = __webpack_require__(7);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _materialUi = __webpack_require__(15);
	
	var _done = __webpack_require__(31);
	
	var _done2 = _interopRequireDefault(_done);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _react2.default.createClass({
	  displayName: "commentaires",
	  nouveauC: function nouveauC(e) {
	    // console.debug("Commentaire: " + e.target.value)
	    this.setState({ commentaire: e.target.value });
	  },
	  surNouveauCommentaire: function surNouveauCommentaire() {
	    // console.debug("Commentaire: " + this.state.commentaire)
	    this.props.surNouveauCommentaire(this.state.commentaire);
	  },
	  render: function render() {
	    console.debug("Commentaires: " + _immutable2.default.List(this.props.rencontre.commentaires).toJSON());
	    var id = 0;
	    var styleFlex = {
	      display: "flex"
	    };
	    var styleElement = {
	      fontSize: "0.8em",
	      paddingLeft: "0.8em",
	      paddingRight: "0.8em",
	      paddingTop: "0.3em",
	      paddingBottom: "0.3em"
	    };
	    return _react2.default.createElement(
	      _materialUi.Card,
	      null,
	      this.props.modeVerrouille ? null : _react2.default.createElement(
	        "div",
	        { style: styleFlex },
	        _react2.default.createElement(_materialUi.TextField, {
	          hintText: "Ajouter un commentaire",
	          multiLine: true,
	          rowsMax: 2,
	          fullWidth: true,
	          maxLength: "140",
	          onChange: this.nouveauC }),
	        _react2.default.createElement(_materialUi.FlatButton, { onClick: this.surNouveauCommentaire, icon: _react2.default.createElement(_done2.default, null) })
	      ),
	      _react2.default.createElement(
	        _materialUi.List,
	        { style: {
	            padding: "0px"
	          } },
	        _immutable2.default.List(this.props.rencontre.commentaires).reverse().map(function (commentaire) {
	          var element = commentaire.valide ? _react2.default.createElement(_materialUi.ListItem, {
	            key: id++,
	            primaryText: commentaire.commentaire,
	            innerDivStyle: styleElement }) : _react2.default.createElement(_materialUi.ListItem, {
	            key: id++,
	            primaryText: commentaire.commentaire,
	            secondaryText: "Enregistrement en cours...",
	            innerDivStyle: styleElement });
	          return element;
	        })
	      )
	    );
	  }
	});

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/action/done");

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("material-ui/styles/MuiThemeProvider");

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("react-tap-event-plugin");

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzk2MjA5MDYzYzZkZmNiOTVkYjAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FjdGlvbnMvYWN0aW9ucy10eXBlcy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJpbW11dGFibGVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhpc3RvcnlcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9zYW50cy9hY2N1ZWlsLWNvbnRlbmV1ci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9zYW50cy9yZW5jb250cmVzLWNvbnRlbmV1ci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZXF1ZXN0XCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvc2FudHMvcmVuY29udHJlcy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vaW5mb1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZvbGRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L2FkZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZGVsZXRlXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvc2FudHMvcmVuY29udHJlcy1ham91dC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9hcnJvdy1iYWNrXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vY2xvc2VcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9zYW50cy9yZW5jb250cmUtY29udGVuZXVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pby1jbGllbnRcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9zYW50cy9yZW5jb250cmUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9tb2RlLWVkaXRcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9zYW50cy90YWJsZWF1LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb3NhbnRzL3RhYmxlYXUtbWFycXVlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb3NhbnRzL3RhYmxlYXUtZXF1aXBlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb3NhbnRzL2NvbW1lbnRhaXJlcy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2RvbmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9zdHlsZXMvTXVpVGhlbWVQcm92aWRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXRhcC1ldmVudC1wbHVnaW5cIiJdLCJuYW1lcyI6WyJyZW5kZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwidHlwZXMiLCJpbml0U3RhdGUiLCJyZW5jb250cmVzIiwibW9kZUVkaXRpb24iLCJtb2RlQWpvdXQiLCJtb2RlVmVycm91aWxsZSIsInJlbmNvbnRyZVJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5IiwidHlwZSIsImFjdGlvbnMiLCJmcm9tSlMiLCJWRVJST1VJTExBR0UiLCJzZXQiLCJHRVRfUkVOQ09OVFJFU19TVUNDRVNTIiwiR0VUX1JFTkNPTlRSRV9TVUNDRVNTIiwicmVuY29udHJlIiwiY29tbWVudGFpcmVzIiwiTGlzdCIsInB1c2giLCJjb21tZW50YWlyZSIsInZhbGlkZSIsInJlbmNvbnRyZUF2ZWNDb21tZW50YWlyZSIsIlBPU1RfUkVOQ09OVFJFX1NVQ0NFU1MiLCJnZXQiLCJERUxFVEVfUkVOQ09OVFJFX1NVQ0NFU1MiLCJpZFJlbmNvbnRyZSIsImZpbHRlciIsImlkIiwiRURJVEVSX1JFTkNPTlRSRSIsIlBVVF9SRU5DT05UUkVfU1VDQ0VTUyIsImRhdGUiLCJwZXJpb2RlIiwiaG90ZSIsIm5vbSIsInZpc2l0ZXVyIiwiTk9VVkVMTEVfSU5GTyIsIkFKT1VURVJfUkVOQ09OVFJFIiwiRGF0ZSIsIm1hcnF1ZSIsIkFOTlVMRVJfUkVOQ09OVFJFIiwiTk9VVkVMTEUiLCJDT01NRU5UQUlSRV9QT1NUIiwiQ09NTUVOVEFJUkVfTk9VVkVBVSIsIm1hcCIsIm5vdXZlYXVTdGF0ZSIsInRvSlMiLCJyZWR1Y2VycyIsInJlbmNvbnRyZVN0YXRlIiwic3RvcmUiLCJBSk9VVF9SRU5DT05UUkUiLCJQT1NUX1JFTkNPTlRSRSIsIk5PVVZFTExFX1BFUklPREUiLCJhcHBIaXN0b3J5IiwicXVlcnlLZXkiLCJBY2N1ZWlsQ29udGVuZXVyIiwic3RyRGF0ZSIsImdldERhdGUiLCJnZXRNb250aCIsImdldEZ1bGxZZWFyIiwic3RySGV1cmUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJwcm9wcyIsImNoaWxkcmVuIiwiQ29tcG9uZW50IiwiUmVuY29udHJlc0NvbnRlbmV1ciIsImNyZWF0ZUNsYXNzIiwiY29tcG9uZW50RGlkTW91bnQiLCJhZHJlc3NlIiwibG9jYXRpb24iLCJwcm90b2NvbCIsImhvc3QiLCJpbmZvIiwiZXJyb3IiLCJyZXNwb25zZSIsInN0YXR1c0NvZGUiLCJvUmVuY29udHJlcyIsInBhcnNlIiwiZGlzcGF0Y2giLCJham91dGVyUmVuY29udHJlIiwic3VwcHJpbWVSZW5jb250cmUiLCJ1cmwiLCJtZXRob2QiLCJham91dFJlbmNvbnRyZSIsImluZm9zIiwianNvbiIsImV4ZWMiLCJoZWFkZXJzIiwibWFwU3RhdGVUb1Byb3BzIiwiUmVuY29udHJlcyIsImNvbnRleHRUeXBlcyIsInJvdXRlciIsIlByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwicHJlcGFyYXRpb25EYXRlIiwiZGF0ZVJlbmNvbnRyZSIsImRlYnVnIiwiam91ciIsInN0cmRhdGUiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJ6b29tIiwiY29udGV4dCIsInBvdWJlbGxlIiwic3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsInBhZGRpbmciLCJ0b3AiLCJyaWdodCIsImljb24iLCJjb2xvciIsIm1hcmdpblJpZ2h0Iiwic3R5bGVSZW5jb250cmUiLCJ0ZXh0RGVjb3JhdGlvbiIsImxpc3RlclJlbmNvbnRyZXMiLCJiaW5kIiwiUmVuY29udHJlQWpvdXQiLCJnZXRJbml0aWFsU3RhdGUiLCJtYWpEYXRlIiwieCIsImRhdGVTdGF0ZSIsInNldERhdGUiLCJzZXRNb250aCIsInNldEZ1bGxZZWFyIiwic2V0U3RhdGUiLCJtYWpIZXVyZSIsImhldXJlIiwic2V0SG91cnMiLCJzZXRNaW51dGVzIiwibWFqSG90ZSIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsIm1halZpc2l0ZXVyIiwic2F1dmVyIiwiYW5udWxlciIsIlJlbmNvbnRyZUNvbnRlbmV1ciIsImNvbXBvbmVudFdpbGxNb3VudCIsImhyZWYiLCJzb2NrZXQiLCJvbiIsImNvbm5leGlvblRhYmxlTWFycXVlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJlbWl0IiwicGFyYW1zIiwib1JlbmNvbnRyZSIsInN1clJlY2VwdGlvbk5vdXZlbGxlSW5mbyIsInN1ck5vdXZlbGxlTWFycXVlIiwic3VyTm91dmVhdUNvbW1lbnRhaXJlIiwic3VyUGVyaW9kZSIsInN0ckluZm8iLCJlZGl0ZXIiLCJzdXJWZXJyb3VpbGxhZ2UiLCJSZW5jb250cmUiLCJsYWJlbEJvdXRvbiIsInN1clBhbmllckhvdGUiLCJzdXJQYW5pZXJWaXNpdGV1ciIsInN1ckNvcnJlY3Rpb25Ib3RlIiwic3VyQ29ycmVjdGlvblZpc2l0ZXVyIiwiTWFycXVlIiwibWluV2lkdGgiLCJsYWJlbFN0eWxlIiwiZm9udFNpemUiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsInN0eWxlUGVyaW9kZSIsImxpbmVIZWlnaHQiLCJzdHlsZUxhYmVsUGVyaW9kZSIsInRvU3RyaW5nIiwiRXF1aXBlIiwic3R5bGVKb3VldXNlcyIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwiZmxleFdyYXAiLCJqdXN0aWZ5Q29udGVudCIsImJvcmRlckNvbG9yIiwiam91ZXVzZXMiLCJvZiIsInN1clBhbmllciIsImpvdWV1c2UiLCJKb3VldXNlIiwic29yIiwiZW50IiwibnVtIiwibnVtZXJvIiwiZXRvaWxlIiwibWF4V2lkdGgiLCJtYXhIZWlndGgiLCJiYWNrZ3JvdW5kQ29sb3IiLCJzdXJDaGFuZ2VtZW50IiwiZW50cmFudCIsIkV0b2lsZSIsIkpvdWV1ciIsInN0eWxlSm91ZXVzZSIsIm5vdXZlYXVDIiwidG9KU09OIiwic3R5bGVGbGV4Iiwic3R5bGVFbGVtZW50IiwicGFkZGluZ1RvcCIsInBhZGRpbmdCb3R0b20iLCJyZXZlcnNlIiwiZWxlbWVudCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFDQTs7QUFFQSxvQkFBU0EsTUFBVCxDQUNFO0FBQUE7QUFBQSxLQUFVLHNCQUFWO0FBQUE7QUFBQSxFQURGLEVBRUVDLFNBQVNDLGNBQVQsQ0FBd0IsU0FBeEIsQ0FGRixFOzs7Ozs7QUNSQSxtQzs7Ozs7O0FDQUEsdUM7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7Ozs7QUNBQTs7QUFDQTs7S0FBWUMsSzs7QUFDWjs7Ozs7Ozs7QUFFQSxLQUFNQyxZQUFZO0FBQ2RDLGlCQUFZLEVBREU7QUFFZEMsa0JBQWEsS0FGQztBQUdkQyxnQkFBVyxLQUhHO0FBSWRDLHFCQUFnQjtBQUpGLEVBQWxCOztBQU9BLFVBQVNDLGdCQUFULEdBQXFEO0FBQUEsU0FBM0JDLEtBQTJCLHVFQUFuQk4sU0FBbUI7QUFBQSxTQUFSTyxNQUFROztBQUNqREMsYUFBUUMsR0FBUixDQUFZLGdDQUFaO0FBQ0FELGFBQVFDLEdBQVIsQ0FBWSxlQUFlQyxLQUFLQyxTQUFMLENBQWVKLE9BQU9LLElBQXRCLENBQTNCO0FBQ0EsU0FBSUMsVUFBVTtBQUNWLG1CQUFVLGtCQUFZO0FBQ2xCLG9CQUFPLG9CQUFVQyxNQUFWLENBQWlCUixLQUFqQixDQUFQO0FBQ0g7QUFIUyxNQUFkO0FBS0FPLGFBQVFkLE1BQU1nQixZQUFkLElBQThCLFlBQVk7QUFDdENQLGlCQUFRQyxHQUFSLENBQVksaUJBQVo7QUFDQSxnQkFBTyxvQkFDRkssTUFERSxDQUNLUixLQURMLEVBRUZVLEdBRkUsQ0FFRSxnQkFGRixFQUVvQixDQUFDVixNQUFNRixjQUYzQixDQUFQO0FBR0gsTUFMRDtBQU1BUyxhQUFRZCxNQUFNa0Isc0JBQWQsSUFBd0MsWUFBWTtBQUNoRFQsaUJBQVFDLEdBQVIsQ0FBWSxtQkFBbUJDLEtBQUtDLFNBQUwsQ0FBZUosT0FBT04sVUFBdEIsQ0FBL0I7QUFDQSxnQkFBTyxvQkFDRmEsTUFERSxDQUNLUixLQURMLEVBRUZVLEdBRkUsQ0FFRSxZQUZGLEVBRWdCVCxPQUFPTixVQUZ2QixDQUFQO0FBR0gsTUFMRDtBQU1BWSxhQUFRZCxNQUFNbUIscUJBQWQsSUFBdUMsWUFBWTtBQUMvQ1YsaUJBQVFDLEdBQVIsQ0FBWSxrQkFBa0JDLEtBQUtDLFNBQUwsQ0FBZUosT0FBT1ksU0FBdEIsQ0FBOUI7QUFDQSxhQUFJQyxlQUFlLG9CQUNkQyxJQURjLEdBRWRDLElBRmMsQ0FFVCxFQUFDQyxhQUFhLHVEQUFkLEVBQXVFQyxRQUFRLElBQS9FLEVBRlMsRUFHZEYsSUFIYyxDQUdULEVBQUNDLGFBQWEsOEJBQWQsRUFBOENDLFFBQVEsSUFBdEQsRUFIUyxFQUlkRixJQUpjLENBSVQsRUFBQ0MsYUFBYSxrQ0FBZCxFQUFrREMsUUFBUSxJQUExRCxFQUpTLEVBS2RGLElBTGMsQ0FLVCxFQUFDQyxhQUFhLHVEQUFkLEVBQXVFQyxRQUFRLElBQS9FLEVBTFMsRUFNZEYsSUFOYyxDQU1ULEVBQUNDLGFBQWEsa0VBQWQsRUFBa0ZDLFFBQVEsSUFBMUYsRUFOUyxDQUFuQjtBQU9BLGFBQUlDLDJCQUEyQixvQkFDMUJYLE1BRDBCLENBQ25CUCxPQUFPWSxTQURZLEVBRTFCSCxHQUYwQixDQUV0QixjQUZzQixFQUVOSSxZQUZNLENBQS9CO0FBR0EsZ0JBQU8sb0JBQ0ZOLE1BREUsQ0FDS1IsS0FETCxFQUVGVSxHQUZFLENBRUUsV0FGRixFQUVlUyx3QkFGZixDQUFQO0FBR0gsTUFmRDtBQWdCQVosYUFBUWQsTUFBTTJCLHNCQUFkLElBQXdDLFlBQVk7QUFDaERsQixpQkFBUUMsR0FBUixDQUFZLDZCQUE2QkMsS0FBS0MsU0FBTCxDQUFlSixPQUFPWSxTQUF0QixDQUF6QztBQUNBLGFBQUlsQixhQUFhLG9CQUNaYSxNQURZLENBQ0xSLEtBREssRUFFWnFCLEdBRlksQ0FFUixZQUZRLEVBR1pMLElBSFksQ0FHUGYsT0FBT1ksU0FIQSxDQUFqQjtBQUlBLGdCQUFPLG9CQUNGTCxNQURFLENBQ0tSLEtBREwsRUFFRlUsR0FGRSxDQUVFLFlBRkYsRUFFZ0JmLFVBRmhCLEVBR0ZlLEdBSEUsQ0FHRSxXQUhGLEVBR2UsS0FIZixDQUFQO0FBSUgsTUFWRDtBQVdBSCxhQUFRZCxNQUFNNkIsd0JBQWQsSUFBMEMsWUFBWTtBQUNsRHBCLGlCQUFRQyxHQUFSLENBQVksOEJBQThCRixPQUFPc0IsV0FBakQ7QUFDQSxhQUFJNUIsYUFBYUssTUFDWkwsVUFEWSxDQUVaNkIsTUFGWSxDQUVMO0FBQUEsb0JBQWFYLFVBQVVZLEVBQVYsSUFBZ0J4QixPQUFPc0IsV0FBcEM7QUFBQSxVQUZLLENBQWpCO0FBR0EsZ0JBQU8sb0JBQ0ZmLE1BREUsQ0FDS1IsS0FETCxFQUVGVSxHQUZFLENBRUUsWUFGRixFQUVnQmYsVUFGaEIsQ0FBUDtBQUdILE1BUkQ7QUFTQVksYUFBUWQsTUFBTWlDLGdCQUFkLElBQWtDLFlBQVk7QUFDMUN4QixpQkFBUUMsR0FBUixDQUFZLHFCQUFxQkMsS0FBS0MsU0FBTCxDQUFlTCxNQUFNSixXQUFyQixDQUFqQztBQUNBLGdCQUFPLG9CQUNGWSxNQURFLENBQ0tSLEtBREwsRUFFRlUsR0FGRSxDQUVFLGFBRkYsRUFFaUIsQ0FBQ1YsTUFBTUosV0FGeEIsQ0FBUDtBQUdILE1BTEQ7QUFNQVcsYUFBUWQsTUFBTWtDLHFCQUFkLElBQXVDLFlBQVk7QUFDL0N6QixpQkFBUUMsR0FBUixDQUFZLGtCQUFrQkMsS0FBS0MsU0FBTCxDQUFlSixPQUFPWSxTQUF0QixDQUE5QjtBQUNBLGFBQUlBLFlBQVksb0JBQ1hMLE1BRFcsQ0FDSlIsS0FESSxFQUVYcUIsR0FGVyxDQUVQLFdBRk8sRUFHWFgsR0FIVyxDQUdQLE1BSE8sRUFHQVQsT0FBT1ksU0FBUCxDQUFpQmUsSUFIakIsRUFJWGxCLEdBSlcsQ0FJUCxTQUpPLEVBSUdULE9BQU9ZLFNBQVAsQ0FBaUJnQixPQUpwQixFQUtYbkIsR0FMVyxDQUtQLFVBTE8sRUFLSVQsT0FBT1ksU0FBUCxDQUFpQmlCLElBQWpCLENBQXNCQyxHQUwxQixFQU1YckIsR0FOVyxDQU1QLGNBTk8sRUFNUVQsT0FBT1ksU0FBUCxDQUFpQm1CLFFBQWpCLENBQTBCRCxHQU5sQyxDQUFoQjtBQU9BLGdCQUFPLG9CQUNGdkIsTUFERSxDQUNLUixLQURMLEVBRUZVLEdBRkUsQ0FFRSxXQUZGLEVBRWVHLFNBRmYsRUFHRkgsR0FIRSxDQUdFLGFBSEYsRUFHaUIsS0FIakIsQ0FBUDtBQUlILE1BYkQ7QUFjQUgsYUFBUWQsTUFBTXdDLGFBQWQsSUFBK0IsWUFBWTtBQUN2Qy9CLGlCQUFRQyxHQUFSLENBQVksa0JBQWtCQyxLQUFLQyxTQUFMLENBQWVKLE9BQU9ZLFNBQXRCLENBQTlCO0FBQ0EsZ0JBQU8sb0JBQ0ZMLE1BREUsQ0FDS1IsS0FETCxFQUVGVSxHQUZFLENBRUUsV0FGRixFQUVlVCxPQUFPWSxTQUZ0QixDQUFQO0FBR0gsTUFMRDtBQU1BTixhQUFRZCxNQUFNeUMsaUJBQWQsSUFBbUMsWUFBWTtBQUMzQyxhQUFJckIsWUFBWTtBQUNaWSxpQkFBSSxDQURRO0FBRVpHLG1CQUFNLElBQUlPLElBQUosRUFGTTtBQUdaTCxtQkFBTTtBQUNGQyxzQkFBSyxFQURIO0FBRUZLLHlCQUFRO0FBRk4sY0FITTtBQU9aSix1QkFBVTtBQUNORCxzQkFBSyxFQURDO0FBRU5LLHlCQUFRO0FBRkY7QUFQRSxVQUFoQjtBQVlBbEMsaUJBQVFDLEdBQVIsQ0FBWSxtQkFBbUJDLEtBQUtDLFNBQUwsQ0FBZUwsTUFBTUgsU0FBckIsQ0FBL0I7QUFDQSxnQkFBTyxvQkFDRlcsTUFERSxDQUNLUixLQURMLEVBRUZVLEdBRkUsQ0FFRSxXQUZGLEVBRWVHLFNBRmYsRUFHRkgsR0FIRSxDQUdFLFdBSEYsRUFHZSxDQUFDVixNQUFNSCxTQUh0QixDQUFQO0FBSUgsTUFsQkQ7QUFtQkFVLGFBQVFkLE1BQU00QyxpQkFBZCxJQUFtQyxZQUFZO0FBQzNDbkMsaUJBQVFDLEdBQVIsQ0FBWSwwQ0FBWjtBQUNBLGdCQUFPLG9CQUNGSyxNQURFLENBQ0tSLEtBREwsRUFFRlUsR0FGRSxDQUVFLFdBRkYsRUFFZSxDQUFDVixNQUFNSCxTQUZ0QixDQUFQO0FBR0gsTUFMRDtBQU1BVSxhQUFRZCxNQUFNNkMsUUFBZCxJQUEwQixZQUFZO0FBQ2xDcEMsaUJBQVFDLEdBQVIsQ0FBWSx5QkFBeUJDLEtBQUtDLFNBQUwsQ0FBZUosT0FBTzRCLE9BQXRCLENBQXJDO0FBQ0EzQixpQkFBUUMsR0FBUixDQUFZLHFDQUFxQ0MsS0FBS0MsU0FBTCxDQUFlTCxNQUFNYSxTQUFyQixDQUFqRDtBQUNBLGFBQUlBLFlBQVksb0JBQ1hMLE1BRFcsQ0FDSlIsS0FESSxFQUVYcUIsR0FGVyxDQUVQLFdBRk8sRUFHWFgsR0FIVyxDQUdQLFNBSE8sRUFHSVQsT0FBTzRCLE9BSFgsQ0FBaEI7QUFJQTNCLGlCQUFRQyxHQUFSLENBQVksOENBQThDQyxLQUFLQyxTQUFMLENBQWVRLFNBQWYsQ0FBMUQ7QUFDQSxnQkFBTyxvQkFDRkwsTUFERSxDQUNLUixLQURMLEVBRUZVLEdBRkUsQ0FFRSxXQUZGLEVBRWVHLFNBRmYsQ0FBUDtBQUdILE1BWEQ7QUFZQU4sYUFBUWQsTUFBTThDLGdCQUFkLElBQWtDLFlBQVk7QUFDMUMsYUFBSXRCLGNBQWNoQixPQUFPZ0IsV0FBekI7QUFDQWYsaUJBQVFDLEdBQVIsNkNBQXNEYyxXQUF0RDtBQUNBLGFBQUlKLFlBQVksb0JBQ1hMLE1BRFcsQ0FDSlIsS0FESSxFQUVYcUIsR0FGVyxDQUVQLFdBRk8sQ0FBaEI7QUFHQSxhQUFJUCxlQUFlRCxVQUNkUSxHQURjLENBQ1YsY0FEVSxFQUVkTCxJQUZjLENBRVQsRUFBQ0MsYUFBYUEsV0FBZCxFQUEyQkMsUUFBUSxLQUFuQyxFQUZTLENBQW5CO0FBR0FMLHFCQUFZQSxVQUFVSCxHQUFWLENBQWMsY0FBZCxFQUE4QkksWUFBOUIsQ0FBWjtBQUNBLGdCQUFPLG9CQUNGTixNQURFLENBQ0tSLEtBREwsRUFFRlUsR0FGRSxDQUVFLFdBRkYsRUFFZUcsU0FGZixDQUFQO0FBR0gsTUFiRDtBQWNBTixhQUFRZCxNQUFNK0MsbUJBQWQsSUFBcUMsWUFBWTtBQUM3QyxhQUFJdkIsY0FBY2hCLE9BQU9nQixXQUF6QjtBQUNBZixpQkFBUUMsR0FBUiw2Q0FBc0RjLFdBQXREO0FBQ0EsYUFBSUosWUFBWSxvQkFDWEwsTUFEVyxDQUNKUixLQURJLEVBRVhxQixHQUZXLENBRVAsV0FGTyxDQUFoQjtBQUdBLGFBQUlQLGVBQWVELFVBQ2RRLEdBRGMsQ0FDVixjQURVLEVBRWRvQixHQUZjLENBRVYsdUJBQWU7QUFDaEIsb0JBQU94QixZQUFZUCxHQUFaLENBQWdCLFFBQWhCLEVBQTBCLElBQTFCLENBQVA7QUFDQTtBQUNILFVBTGMsQ0FBbkI7QUFNQUcscUJBQVlBLFVBQVVILEdBQVYsQ0FBYyxjQUFkLEVBQThCSSxZQUE5QixDQUFaO0FBQ0EsZ0JBQU8sb0JBQ0ZOLE1BREUsQ0FDS1IsS0FETCxFQUVGVSxHQUZFLENBRUUsV0FGRixFQUVlRyxTQUZmLENBQVA7QUFHSCxNQWhCRDtBQWlCQSxTQUFJNkIsZUFBZSxDQUFDbkMsUUFBUU4sT0FBT0ssSUFBZixLQUF3QkMsUUFBUSxRQUFSLENBQXpCLEdBQW5CO0FBQ0FMLGFBQVFDLEdBQVIsQ0FBWSxrQkFBa0J1QyxZQUE5QjtBQUNBeEMsYUFBUUMsR0FBUixDQUFZLHFCQUFaO0FBQ0EsWUFBT3VDLGFBQWFDLElBQWIsRUFBUDtBQUNIOztBQUVELEtBQUlDLFdBQVcsNEJBQWdCLEVBQUNDLGdCQUFnQjlDLGdCQUFqQixFQUFoQixDQUFmO0FBQ0EsS0FBTStDLFFBQVEsd0JBQVlGLFFBQVosQ0FBZDttQkFDZUUsSzs7Ozs7O0FDektmLG1DOzs7Ozs7Ozs7OztBQ0FBO0FBQ08sS0FBTW5DLDBEQUF5Qix3QkFBL0I7QUFDUDtBQUNPLEtBQU1vQyw0Q0FBa0IsaUJBQXhCO0FBQ0EsS0FBTUMsMENBQWlCLGdCQUF2QjtBQUNBLEtBQU01QiwwREFBeUIsd0JBQS9CO0FBQ0EsS0FBTVIsd0RBQXdCLHVCQUE5QjtBQUNBLEtBQU1lLHdEQUF3Qix1QkFBOUI7QUFDQSxLQUFNTCw4REFBMkIsMEJBQWpDO0FBQ0EsS0FBTVcsd0NBQWdCLGlCQUF0QjtBQUNBLEtBQU1QLDhDQUFtQixrQkFBekI7QUFDQSxLQUFNWSw4QkFBVyxVQUFqQjtBQUNBLEtBQU1KLGdEQUFvQixtQkFBMUI7QUFDQSxLQUFNRyxnREFBb0IsbUJBQTFCO0FBQ0EsS0FBTVksOENBQW1CLGtCQUF6QjtBQUNBLEtBQU1WLDhDQUFtQixrQkFBekI7QUFDQSxLQUFNQyxvREFBc0IscUJBQTVCO0FBQ0EsS0FBTS9CLHNDQUFhLGNBQW5CLEM7Ozs7OztBQ2pCUCx1Qzs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsS0FBTXlDLGFBQWEsK0RBQW9DLEVBQUVDLFVBQVUsS0FBWixFQUFwQyxDQUFuQjs7bUJBR0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLE9BQVEsU0FBU0QsVUFBakI7QUFDRTtBQUFBO0FBQUEsU0FBTyxNQUFLLEdBQVosRUFBZ0IscUNBQWhCO0FBQ0UsbUVBQWUsSUFBRyxhQUFsQixHQURGO0FBRUUsMkRBQU8sTUFBSywwQkFBWixFQUF1Qyx1Q0FBdkMsR0FGRjtBQUdFLDJEQUFPLE1BQUssYUFBWixFQUEwQix3Q0FBMUI7QUFIRjtBQURGO0FBREYsRTs7Ozs7O0FDWEYsMEM7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7S0FFcUJFLGdCOzs7Ozs7Ozs7Ozs4QkFDWDtBQUNOLFdBQUl4QixPQUFPLElBQUlPLElBQUosRUFBWDtBQUNBLFdBQUlrQixVQUFVekIsS0FBSzBCLE9BQUwsS0FBaUIsR0FBakIsSUFBd0IxQixLQUFLMkIsUUFBTCxLQUFrQixDQUExQyxJQUErQyxHQUEvQyxHQUFxRDNCLEtBQUs0QixXQUFMLEVBQW5FO0FBQ0EsV0FBSUMsV0FBVzdCLEtBQUs4QixRQUFMLEtBQWtCLEdBQWxCLEdBQXdCOUIsS0FBSytCLFVBQUwsRUFBdkM7QUFDQSxjQUNJO0FBQUE7QUFBQTtBQUNHLGNBQUtDLEtBQUwsQ0FBV0MsUUFEZDtBQUVFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxlQUFLLElBQUcsTUFBUjtBQUNFO0FBQUE7QUFBQSxpQkFBTSxXQUFVLE1BQWhCO0FBQ0dSLHNCQURIO0FBQUE7QUFDYUk7QUFEYjtBQURGO0FBREY7QUFGRixRQURKO0FBWUQ7Ozs7R0FqQjJDLGdCQUFNSyxTOzttQkFBL0JWLGdCOzs7Ozs7Ozs7Ozs7OztBQ0ZyQjs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0tBQVkzRCxLOztBQUNaOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxLQUFNc0Usc0JBQXNCLGdCQUFNQyxXQUFOLENBQWtCO0FBQUE7QUFDNUNDLG9CQUQ0QywrQkFDeEI7QUFDbEIsU0FBSUMsVUFBVUMsU0FBU0MsUUFBVCxHQUFvQixJQUFwQixHQUEyQkQsU0FBU0UsSUFBcEMsR0FBMkMsaUJBQXpEO0FBQ0FuRSxhQUFRb0UsSUFBUixDQUFhLDJCQUEyQkosT0FBeEM7QUFDQSw0QkFBUUEsT0FBUixFQUFpQixVQUFVSyxLQUFWLEVBQWlCQyxRQUFqQixFQUEyQjdFLFVBQTNCLEVBQXVDO0FBQ3RELFdBQUksQ0FBQzRFLEtBQUQsSUFBVUMsU0FBU0MsVUFBVCxJQUF1QixHQUFyQyxFQUEwQztBQUN4QyxhQUFJQyxjQUFjdEUsS0FBS3VFLEtBQUwsQ0FBV2hGLFVBQVgsQ0FBbEI7QUFDQSx5QkFBTWlGLFFBQU4sQ0FBZTtBQUNidEUsaUJBQU1iLE1BQU1rQixzQkFEQztBQUViaEIsdUJBQVkrRTtBQUZDLFVBQWY7QUFJRDtBQUNGLE1BUkQ7QUFTRCxJQWIyQztBQWM1Q0csbUJBZDRDLDhCQWN6QjtBQUNqQjNFLGFBQVFDLEdBQVIsQ0FBWSxvQkFBWjtBQUNBLHFCQUFNeUUsUUFBTixDQUFlO0FBQ2J0RSxhQUFNYixNQUFNeUM7QUFEQyxNQUFmO0FBR0QsSUFuQjJDO0FBb0I1QzRDLG9CQXBCNEMsNkJBb0IxQnZELFdBcEIwQixFQW9CYjtBQUM3QnJCLGFBQVFvRSxJQUFSLENBQWEsa0JBQWtCL0MsV0FBL0I7QUFDQSxTQUFJMkMsVUFBVUMsU0FBU0MsUUFBVCxHQUFvQixJQUFwQixHQUEyQkQsU0FBU0UsSUFBcEMsR0FBMkMsa0JBQTNDLEdBQWdFOUMsV0FBOUU7QUFDQXJCLGFBQVFvRSxJQUFSLENBQWEsMkJBQTJCSixPQUF4QztBQUNBLDRCQUFRLEVBQUVhLEtBQUtiLE9BQVAsRUFBZ0JjLFFBQVEsUUFBeEIsRUFBUixFQUE0QyxVQUFVVCxLQUFWLEVBQWlCQyxRQUFqQixFQUEyQjtBQUNyRSxXQUFJLENBQUNELEtBQUQsSUFBVUMsU0FBU0MsVUFBVCxJQUF1QixHQUFyQyxFQUEwQztBQUN4Qyx5QkFBTUcsUUFBTixDQUFlO0FBQ2J0RSxpQkFBTWIsTUFBTTZCLHdCQURDO0FBRWJDLHdCQUFhQTtBQUZBLFVBQWY7QUFJRDtBQUNGLE1BUEQ7QUFRRCxJQWhDMkM7QUFpQzVDMEQsaUJBakM0QywwQkFpQzdCQyxLQWpDNkIsRUFpQ3RCO0FBQ3BCLFNBQUlBLFNBQVMsSUFBYixFQUFtQjtBQUNqQix1QkFBTU4sUUFBTixDQUFlO0FBQ2J0RSxlQUFNYixNQUFNNEMsaUJBREM7QUFFYnhCLG9CQUFXQTtBQUZFLFFBQWY7QUFJQTtBQUNEO0FBQ0QsU0FBSUEsWUFBWSxLQUFLK0MsS0FBTCxDQUFXL0MsU0FBM0I7QUFDQVgsYUFBUW9FLElBQVIsQ0FBYSxXQUFXbEUsS0FBS0MsU0FBTCxDQUFlNkUsS0FBZixDQUF4QjtBQUNBckUsZUFBVWUsSUFBVixHQUFpQnNELE1BQU10RCxJQUF2QjtBQUNBZixlQUFVZ0IsT0FBVixHQUFvQnFELE1BQU1yRCxPQUExQjtBQUNBaEIsZUFBVWlCLElBQVYsQ0FBZUMsR0FBZixHQUFxQm1ELE1BQU1wRCxJQUEzQjtBQUNBakIsZUFBVW1CLFFBQVYsQ0FBbUJELEdBQW5CLEdBQXlCbUQsTUFBTWxELFFBQS9CO0FBQ0E5QixhQUFRQyxHQUFSLENBQVksdUJBQXVCQyxLQUFLQyxTQUFMLENBQWVRLFNBQWYsQ0FBbkM7QUFDQSxTQUFJcUQsVUFBVUMsU0FBU0MsUUFBVCxHQUFvQixJQUFwQixHQUEyQkQsU0FBU0UsSUFBcEMsR0FBMkMsaUJBQXpEO0FBQ0FuRSxhQUFRb0UsSUFBUixDQUFhLDJCQUEyQkosT0FBeEM7QUFDQSw0QkFBUSxFQUFFYSxLQUFLYixPQUFQLEVBQWdCYyxRQUFRLE1BQXhCLEVBQWdDRyxNQUFNdEUsU0FBdEMsRUFBUixFQUEyRCxVQUFVMEQsS0FBVixFQUFpQkMsUUFBakIsRUFBMkI3RSxVQUEzQixFQUF1QztBQUNoRyxXQUFJLENBQUM0RSxLQUFELElBQVVDLFNBQVNDLFVBQVQsSUFBdUIsR0FBckMsRUFBMEM7QUFDeEM7QUFEd0Msc0JBRTNCLDRCQUE0QlcsSUFBNUIsQ0FBaUNaLFNBQVNhLE9BQVQsQ0FBaUJsQixRQUFsRCxDQUYyQjtBQUFBO0FBQUEsYUFFakMxQyxFQUZpQztBQUd4Qzs7O0FBQ0F2QixpQkFBUW9FLElBQVIsQ0FBYSxTQUFTN0MsRUFBdEI7QUFDQVosbUJBQVVZLEVBQVYsR0FBZUEsRUFBZjtBQUNBdkIsaUJBQVFvRSxJQUFSLENBQWEsZ0JBQWdCbEUsS0FBS0MsU0FBTCxDQUFlUSxTQUFmLENBQTdCO0FBQ0EseUJBQU0rRCxRQUFOLENBQWU7QUFDYnRFLGlCQUFNYixNQUFNMkIsc0JBREM7QUFFYlAsc0JBQVdBO0FBRkUsVUFBZjtBQUlEO0FBQ0YsTUFiRDtBQWNELElBaEUyQztBQWlFNUN2QixTQWpFNEMsb0JBaUVuQztBQUNQLFlBQ0UsS0FBS3NFLEtBQUwsQ0FBVy9ELFNBQVgsR0FDRTtBQUNFLGtCQUFXLEtBQUsrRCxLQUFMLENBQVcvQyxTQUR4QjtBQUVFLHVCQUFnQixLQUFLb0UsY0FGdkIsR0FERixHQUtFLHNEQUFZLFlBQVksS0FBS3JCLEtBQUwsQ0FBV2pFLFVBQW5DO0FBQ0UsMEJBQW1CLEtBQUttRixpQkFEMUI7QUFFRSx5QkFBa0IsS0FBS0QsZ0JBRnpCLEdBTko7QUFVRDtBQTVFMkMsRUFBbEIsQ0FBNUI7O0FBK0VBLEtBQU1TLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBVXhDLEtBQVYsRUFBaUI7QUFDdkMsVUFBTztBQUNMbkQsaUJBQVltRCxNQUFNRCxjQUFOLENBQXFCbEQsVUFENUI7QUFFTGtCLGdCQUFXaUMsTUFBTUQsY0FBTixDQUFxQmhDLFNBRjNCO0FBR0xoQixnQkFBV2lELE1BQU1ELGNBQU4sQ0FBcUJoRDtBQUgzQixJQUFQO0FBS0QsRUFORDs7bUJBUWUseUJBQVF5RixlQUFSLEVBQXlCdkIsbUJBQXpCLEM7Ozs7OztBQy9GZixxQzs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7QUFDQTs7QUFVQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsS0FBTXdCLGFBQWEsZ0JBQU12QixXQUFOLENBQWtCO0FBQUE7O0FBQ25Dd0IsaUJBQWM7QUFDWkMsYUFBUSxnQkFBTUMsU0FBTixDQUFnQkMsSUFBaEIsQ0FBcUJDO0FBRGpCLElBRHFCO0FBSW5DQyxrQkFKbUMsMkJBSW5CakUsSUFKbUIsRUFJYjtBQUNwQixTQUFJa0UsZ0JBQWdCLElBQUkzRCxJQUFKLENBQVNQLElBQVQsQ0FBcEI7QUFDQTFCLGFBQVE2RixLQUFSLENBQWMsc0JBQXNCM0YsS0FBS0MsU0FBTCxDQUFleUYsYUFBZixDQUFwQztBQUNBLFNBQUlFLE9BQU8sSUFBSTdELElBQUosRUFBWDtBQUNBLFNBQUk4RCxVQUFVLENBQUNILGFBQUQsR0FDWixpQkFEWSxHQUVaQSxnQkFBZ0JFLElBQWhCLFFBQ0tBLEtBQUtFLGtCQUFMLEVBREwsR0FFS0osY0FBY0ksa0JBQWQsRUFGTCxTQUUyQ0osY0FBY3BDLFFBQWQsRUFGM0MsU0FFdUVvQyxjQUFjbkMsVUFBZCxFQUp6RTtBQUtBLFlBQU9zQyxPQUFQO0FBQ0QsSUFka0M7QUFlbkNFLE9BZm1DLGdCQWU5QjVFLFdBZjhCLEVBZWpCO0FBQ2hCckIsYUFBUTZGLEtBQVIsaUNBQTRDeEUsV0FBNUM7QUFDQSxVQUFLNkUsT0FBTCxDQUFhWCxNQUFiLENBQW9CekUsSUFBcEIsa0JBQXdDTyxXQUF4QztBQUNELElBbEJrQztBQW1CbkNqQyxTQW5CbUMsb0JBbUIxQjtBQUFBOztBQUNQLFNBQU0rRyxXQUFXO0FBQ2ZDLGNBQU87QUFDTEMsZ0JBQU8sRUFERjtBQUVMQyxpQkFBUSxFQUZIO0FBR0xDLGtCQUFTLEVBSEo7QUFJTEMsY0FBSyxDQUpBO0FBS0xDLGdCQUFPO0FBTEYsUUFEUTtBQVFmQyxhQUFNO0FBQ0pMLGdCQUFPLEVBREg7QUFFSkMsaUJBQVEsRUFGSjtBQUdKSyxnQkFBTztBQUhIO0FBUlMsTUFBakI7QUFjQSxTQUFNUCxRQUFRO0FBQ1pRLG9CQUFhO0FBREQsTUFBZDtBQUdBLFNBQU1DLGlCQUFpQjtBQUNyQkMsdUJBQWdCO0FBREssTUFBdkI7QUFHQSxZQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxXQUFRLE9BQU0sU0FBZDtBQUNFLG9CQUFTLEtBQUtwRCxLQUFMLENBQVdxRCxnQkFEdEI7QUFFRSwrQkFBbUIscUNBRnJCO0FBR0U7QUFBQTtBQUFBLGFBQUssV0FBVSxVQUFmO0FBQ0U7QUFBQTtBQUFBLGVBQXNCLE9BQU9YLEtBQTdCO0FBQ0UsNEJBQWEsS0FBSzFDLEtBQUwsQ0FBV2lCLGdCQUQxQjtBQUVFO0FBRkY7QUFERjtBQUhGLFFBREY7QUFXRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsYUFBTSxJQUFHLFlBQVQ7QUFDRyxnQkFBS2pCLEtBQUwsQ0FBV2pFLFVBQVgsQ0FBc0I4QyxHQUF0QixDQUEwQixxQkFBYTtBQUN0QyxpQkFBSXdELFVBQVUsTUFBS0osZUFBTCxDQUFxQmhGLFVBQVVlLElBQS9CLENBQWQ7QUFDQSxvQkFDRTtBQUFBO0FBQUE7QUFDRSxzQkFBS2YsVUFBVVksRUFEakI7QUFFRSw4QkFBYVosVUFBVWlCLElBQVYsQ0FBZUMsR0FBZixHQUFxQixHQUFyQixHQUEyQmxCLFVBQVVtQixRQUFWLENBQW1CRCxHQUY3RDtBQUdFLGdDQUFla0UsT0FIakI7QUFJRSw2QkFBWSxNQUFLRSxJQUFMLENBQVVlLElBQVYsUUFBcUJyRyxVQUFVWSxFQUEvQixDQUpkO0FBS0Usa0NBQ0U7QUFBQTtBQUFBO0FBQ0UsNEJBQU80RSxTQUFTQyxLQURsQjtBQUVFLGdDQUFXRCxTQUFTTyxJQUZ0QjtBQUdFLDhCQUFTLE1BQUtoRCxLQUFMLENBQVdrQixpQkFBWCxDQUE2Qm9DLElBQTdCLENBQWtDLElBQWxDLEVBQXdDckcsVUFBVVksRUFBbEQsQ0FIWDtBQUlFO0FBSkY7QUFOSjtBQWFFLGtFQUFNLElBQUksaUJBQWlCWixVQUFVWSxFQUFyQztBQWJGLGNBREY7QUFpQkQsWUFuQkE7QUFESDtBQURGO0FBWEYsTUFERjtBQXNDRDtBQTlFa0MsRUFBbEIsQ0FBbkI7bUJBZ0ZlOEQsVTs7Ozs7O0FDakdmLHlDOzs7Ozs7QUNBQSwrRDs7Ozs7O0FDQUEsK0Q7Ozs7OztBQ0FBLCtEOzs7Ozs7QUNBQSxpRTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7QUFTQTs7OztBQUNBOzs7Ozs7QUFFQSxLQUFNNEIsaUJBQWlCLGdCQUFNbkQsV0FBTixDQUFrQjtBQUFBO0FBQ3ZDb0Qsa0JBRHVDLDZCQUNyQjtBQUNoQixTQUFJdkcsWUFBWSxLQUFLK0MsS0FBTCxDQUFXL0MsU0FBM0I7QUFDQSxZQUFPLEVBQUVlLE1BQU0sSUFBSU8sSUFBSixFQUFSLEVBQW9CTixTQUFTLENBQTdCLEVBQWdDQyxNQUFNakIsVUFBVWlCLElBQVYsQ0FBZUMsR0FBckQsRUFBMERDLFVBQVVuQixVQUFVbUIsUUFBVixDQUFtQkQsR0FBdkYsRUFBUDtBQUNELElBSnNDO0FBS3ZDc0YsVUFMdUMsbUJBSy9CQyxDQUwrQixFQUs1QjFGLElBTDRCLEVBS3RCO0FBQ2YsU0FBSTJGLFlBQVksS0FBS3ZILEtBQUwsQ0FBVzRCLElBQTNCO0FBQ0EyRixlQUFVQyxPQUFWLENBQWtCNUYsS0FBSzBCLE9BQUwsRUFBbEI7QUFDQWlFLGVBQVVFLFFBQVYsQ0FBbUI3RixLQUFLMkIsUUFBTCxFQUFuQjtBQUNBZ0UsZUFBVUcsV0FBVixDQUFzQjlGLEtBQUs0QixXQUFMLEVBQXRCO0FBQ0EsVUFBS21FLFFBQUwsQ0FBYyxFQUFFL0YsTUFBTTJGLFNBQVIsRUFBZDtBQUNBckgsYUFBUTZGLEtBQVIsQ0FBYyxpQkFBaUIzRixLQUFLQyxTQUFMLENBQWUsS0FBS0wsS0FBcEIsQ0FBL0I7QUFDRCxJQVpzQztBQWF2QzRILFdBYnVDLG9CQWE5Qk4sQ0FiOEIsRUFhM0JPLEtBYjJCLEVBYXBCO0FBQ2pCLFNBQUlOLFlBQVksS0FBS3ZILEtBQUwsQ0FBVzRCLElBQTNCO0FBQ0EyRixlQUFVTyxRQUFWLENBQW1CRCxNQUFNbkUsUUFBTixFQUFuQjtBQUNBNkQsZUFBVVEsVUFBVixDQUFxQkYsTUFBTWxFLFVBQU4sRUFBckI7QUFDQSxVQUFLZ0UsUUFBTCxDQUFjLEVBQUUvRixNQUFNMkYsU0FBUixFQUFkO0FBQ0FySCxhQUFRNkYsS0FBUixDQUFjLGtCQUFrQjNGLEtBQUtDLFNBQUwsQ0FBZSxLQUFLTCxLQUFwQixDQUFoQztBQUNELElBbkJzQztBQW9CdkNnSSxVQXBCdUMsbUJBb0IvQkMsQ0FwQitCLEVBb0I1QjtBQUNULFVBQUtOLFFBQUwsQ0FBYyxFQUFFN0YsTUFBTW1HLEVBQUVDLE1BQUYsQ0FBU0MsS0FBakIsRUFBZDtBQUNBakksYUFBUTZGLEtBQVIsQ0FBYyxpQkFBaUIzRixLQUFLQyxTQUFMLENBQWUsS0FBS0wsS0FBcEIsQ0FBL0I7QUFDRCxJQXZCc0M7QUF3QnZDb0ksY0F4QnVDLHVCQXdCM0JILENBeEIyQixFQXdCeEI7QUFDYixVQUFLTixRQUFMLENBQWMsRUFBRTNGLFVBQVVpRyxFQUFFQyxNQUFGLENBQVNDLEtBQXJCLEVBQWQ7QUFDQWpJLGFBQVE2RixLQUFSLENBQWMscUJBQXFCM0YsS0FBS0MsU0FBTCxDQUFlLEtBQUtMLEtBQXBCLENBQW5DO0FBQ0QsSUEzQnNDO0FBNEJ2Q3FJLFNBNUJ1QyxvQkE0QjlCO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsVUFBS3pFLEtBQUwsQ0FBV3FCLGNBQVgsQ0FBMEIsS0FBS2pGLEtBQS9CO0FBQ0QsSUFqQ3NDO0FBa0N2Q3NJLFVBbEN1QyxxQkFrQzdCO0FBQ1IsVUFBSzFFLEtBQUwsQ0FBV3FCLGNBQVgsQ0FBMEIsSUFBMUI7QUFDRCxJQXBDc0M7QUFxQ3ZDM0YsU0FyQ3VDLG9CQXFDOUI7QUFDUCxZQUNFO0FBQUE7QUFBQTtBQUNFLDJEQUFRLE9BQU0sbUJBQWQ7QUFDRSwwQkFBaUI7QUFBQTtBQUFBLGFBQVksU0FBUyxLQUFLK0ksTUFBMUI7QUFBa0M7QUFBbEMsVUFEbkI7QUFFRSwyQkFBa0I7QUFBQTtBQUFBLGFBQVksU0FBUyxLQUFLQyxPQUExQjtBQUFtQztBQUFuQztBQUZwQixTQURGO0FBS0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQ0UsbUVBQVksbUJBQWtCLHNCQUE5QjtBQUNFLHVCQUFVLEtBQUtqQixPQURqQixHQURGO0FBR0UsbUVBQVksbUJBQWtCLHVCQUE5QjtBQUNFLHFCQUFPLE1BRFQ7QUFFRSx1QkFBVSxLQUFLTyxRQUZqQixHQUhGO0FBTUUsa0VBQVcsbUJBQWtCLFdBQTdCO0FBQ0UsMkJBQWMsS0FBS2hFLEtBQUwsQ0FBVy9DLFNBQVgsQ0FBcUJpQixJQUFyQixDQUEwQkMsR0FEMUM7QUFFRSx1QkFBVSxLQUFLaUcsT0FGakIsR0FORjtBQVNFLGtFQUFXLG1CQUFrQixlQUE3QjtBQUNFLDJCQUFjLEtBQUtwRSxLQUFMLENBQVcvQyxTQUFYLENBQXFCbUIsUUFBckIsQ0FBOEJELEdBRDlDO0FBRUUsdUJBQVUsS0FBS3FHLFdBRmpCO0FBVEY7QUFERjtBQUxGLE1BREY7QUF1QkQ7QUE3RHNDLEVBQWxCLENBQXZCOzttQkFnRWVqQixjOzs7Ozs7QUM3RWYseUU7Ozs7OztBQ0FBLG9FOzs7Ozs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7S0FBWTFILEs7O0FBQ1o7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLEtBQUk4SSxxQkFBcUIsZ0JBQU12RSxXQUFOLENBQWtCO0FBQUE7QUFDekN3RSxxQkFEeUMsZ0NBQ3BCO0FBQ25CLFNBQUl0RSxVQUFVQyxTQUFTc0UsSUFBdkI7QUFDQXZJLGFBQVFvRSxJQUFSLENBQWEseUJBQXlCSixPQUF0QztBQUNBLFVBQUt3RSxNQUFMLEdBQWMsc0JBQUd4RSxPQUFILENBQWQ7QUFDQSxVQUFLd0UsTUFBTCxDQUFZQyxFQUFaLENBQWUsU0FBZixFQUEwQixLQUFLQyxvQkFBL0I7QUFDRCxJQU53QztBQU96Q0MsdUJBUHlDLGtDQU9sQjtBQUNyQixTQUFNdEgsY0FBYyxLQUFLcUMsS0FBTCxDQUFXL0MsU0FBWCxDQUFxQlksRUFBekM7QUFDQXZCLGFBQVFvRSxJQUFSLENBQWEsaUNBQWlDL0MsV0FBOUM7QUFDQSxVQUFLbUgsTUFBTCxDQUFZSSxJQUFaLENBQWlCLGlCQUFqQixFQUFvQ3ZILFdBQXBDO0FBQ0QsSUFYd0M7QUFZekMwQyxvQkFaeUMsK0JBWXJCO0FBQ2xCLFNBQU0xQyxjQUFjLEtBQUtxQyxLQUFMLENBQVdtRixNQUFYLENBQWtCeEgsV0FBdEM7QUFDQSxVQUFLbUgsTUFBTCxDQUFZSSxJQUFaLENBQWlCLGlCQUFqQixFQUFvQ3ZILFdBQXBDO0FBQ0EsU0FBSTJDLFVBQVVDLFNBQVNDLFFBQVQsR0FBb0IsSUFBcEIsR0FBMkJELFNBQVNFLElBQXBDLEdBQTJDLGtCQUEzQyxHQUFnRTlDLFdBQTlFO0FBQ0FyQixhQUFRb0UsSUFBUixDQUFhLDJCQUEyQkosT0FBeEM7QUFDQSw0QkFBUUEsT0FBUixFQUFpQixVQUFVSyxLQUFWLEVBQWlCQyxRQUFqQixFQUEyQjNELFNBQTNCLEVBQXNDO0FBQ3JELFdBQUksQ0FBQzBELEtBQUQsSUFBVUMsU0FBU0MsVUFBVCxJQUF1QixHQUFyQyxFQUEwQztBQUN4QyxhQUFJdUUsYUFBYTVJLEtBQUt1RSxLQUFMLENBQVc5RCxTQUFYLENBQWpCO0FBQ0EseUJBQU0rRCxRQUFOLENBQWU7QUFDYnRFLGlCQUFNYixNQUFNbUIscUJBREM7QUFFYkMsc0JBQVdtSTtBQUZFLFVBQWY7QUFJRDtBQUNGLE1BUkQ7QUFTRCxJQTFCd0M7QUEyQnpDSix1QkEzQnlDLGtDQTJCbEI7QUFDckIxSSxhQUFRb0UsSUFBUixDQUFhLGtDQUFiO0FBQ0EsU0FBTS9DLGNBQWMsS0FBS3FDLEtBQUwsQ0FBV21GLE1BQVgsQ0FBa0J4SCxXQUF0QztBQUNBO0FBQ0EsVUFBS21ILE1BQUwsQ0FBWUksSUFBWixDQUFpQixpQkFBakIsRUFBb0N2SCxXQUFwQztBQUNBLFVBQUttSCxNQUFMLENBQVlDLEVBQVosQ0FBZSxjQUFmLEVBQStCLEtBQUtNLHdCQUFwQztBQUNELElBakN3QztBQWtDekNBLDJCQWxDeUMsb0NBa0NoQnBJLFNBbENnQixFQWtDTDtBQUNsQztBQUNBLHFCQUFNK0QsUUFBTixDQUFlO0FBQ2J0RSxhQUFNYixNQUFNd0MsYUFEQztBQUVicEIsa0JBQVdBO0FBRkUsTUFBZjtBQUlELElBeEN3QztBQXlDekNxSSxvQkF6Q3lDLDZCQXlDdkJySSxTQXpDdUIsRUF5Q1o7QUFDM0IsVUFBSzZILE1BQUwsQ0FBWUksSUFBWixDQUFpQixjQUFqQixFQUFpQyxLQUFLbEYsS0FBTCxDQUFXL0MsU0FBNUM7QUFDRCxJQTNDd0M7QUE0Q3pDc0ksd0JBNUN5QyxpQ0E0Q25CbEksV0E1Q21CLEVBNENOO0FBQ2pDZixhQUFRNkYsS0FBUixtQkFBOEI5RSxXQUE5QjtBQUNBLFVBQUt5SCxNQUFMLENBQVlJLElBQVosQ0FBaUIsb0JBQWpCLEVBQXVDO0FBQ3JDLHNCQUFlLEtBQUtsRixLQUFMLENBQVdtRixNQUFYLENBQWtCeEgsV0FESTtBQUVyQyxzQkFBZU47QUFGc0IsTUFBdkM7QUFJQSxxQkFBTTJELFFBQU4sQ0FBZTtBQUNidEUsYUFBTWIsTUFBTThDLGdCQURDO0FBRWJ0QixvQkFBYUE7QUFGQSxNQUFmO0FBSUEsVUFBS3lILE1BQUwsQ0FBWUMsRUFBWixDQUFlLG9CQUFmLEVBQXFDO0FBQUEsY0FDckMsZ0JBQU0vRCxRQUFOLENBQWU7QUFDYnRFLGVBQU1iLE1BQU0rQyxtQkFEQztBQUVidkIsc0JBQWFBO0FBRkEsUUFBZixDQURxQztBQUFBLE1BQXJDO0FBS0QsSUEzRHdDO0FBNER6Q21JLGFBNUR5QyxzQkE0RDlCdkgsT0E1RDhCLEVBNERyQjtBQUNsQjtBQUNBO0FBQ0EzQixhQUFRNkYsS0FBUixDQUFjLHVCQUF1QjNGLEtBQUtDLFNBQUwsQ0FBZXdCLE9BQWYsQ0FBckM7QUFDQSxxQkFBTStDLFFBQU4sQ0FBZTtBQUNidEUsYUFBTWIsTUFBTTZDLFFBREM7QUFFYlQsZ0JBQVNBO0FBRkksTUFBZjtBQUlELElBcEV3QztBQXFFekN3RyxTQXJFeUMsa0JBcUVsQ25ELEtBckVrQyxFQXFFM0I7QUFDWixTQUFJbUUsVUFBVWpKLEtBQUtDLFNBQUwsQ0FBZTZFLEtBQWYsQ0FBZDtBQUNBaEYsYUFBUTZGLEtBQVIsOEJBQXlDc0QsT0FBekM7QUFDQSxTQUFJeEksWUFBWSxvQkFBVUwsTUFBVixDQUFpQixLQUFLb0QsS0FBTCxDQUFXL0MsU0FBNUIsRUFDYkgsR0FEYSxDQUNULE1BRFMsRUFDRndFLE1BQU10RCxJQURKLEVBRWJsQixHQUZhLENBRVQsU0FGUyxFQUVDd0UsTUFBTXJELE9BRlAsRUFHYm5CLEdBSGEsQ0FHVCxVQUhTLEVBR0V3RSxNQUFNcEQsSUFIUixFQUlicEIsR0FKYSxDQUlULGNBSlMsRUFJTXdFLE1BQU1sRCxRQUpaLENBQWhCO0FBS0E7QUFDQSxTQUFJa0MsVUFBVUMsU0FBU0MsUUFBVCxHQUFvQixJQUFwQixHQUEyQkQsU0FBU0UsSUFBcEMsR0FBMkMsa0JBQTNDLEdBQWdFLEtBQUtULEtBQUwsQ0FBVy9DLFNBQVgsQ0FBcUJZLEVBQW5HO0FBQ0F2QixhQUFRNkYsS0FBUixzQkFBaUNsRixVQUFVZSxJQUEzQztBQUNBMUIsYUFBUW9FLElBQVIsQ0FBYSwyQkFBMkJKLE9BQXhDO0FBQ0EsNEJBQVEsRUFBRWEsS0FBS2IsT0FBUCxFQUFnQmMsUUFBUSxLQUF4QixFQUErQkcsTUFBTXRFLFNBQXJDLEVBQVIsRUFBMEQsVUFBVTBELEtBQVYsRUFBaUJDLFFBQWpCLEVBQTJCM0QsU0FBM0IsRUFBc0M7QUFDOUYsV0FBSSxDQUFDMEQsS0FBRCxJQUFVQyxTQUFTQyxVQUFULElBQXVCLEdBQXJDLEVBQTBDO0FBQ3hDdkUsaUJBQVFvRSxJQUFSLENBQWEseUJBQXlCbEUsS0FBS0MsU0FBTCxDQUFlUSxTQUFmLENBQXRDO0FBQ0EseUJBQU0rRCxRQUFOLENBQWU7QUFDYnRFLGlCQUFNYixNQUFNa0MscUJBREM7QUFFYmQsc0JBQVdBO0FBRkUsVUFBZjtBQUlEO0FBQ0YsTUFSRDtBQVNELElBMUZ3QztBQTJGekN5SSxTQTNGeUMsb0JBMkZoQztBQUNQLHFCQUFNMUUsUUFBTixDQUFlO0FBQ2J0RSxhQUFNYixNQUFNaUM7QUFEQyxNQUFmO0FBR0QsSUEvRndDO0FBZ0d6QzZILGtCQWhHeUMsNkJBZ0d2QjtBQUNoQixxQkFBTTNFLFFBQU4sQ0FBZTtBQUNidEUsYUFBTWIsTUFBTWdCO0FBREMsTUFBZjtBQUdELElBcEd3QztBQXFHekNuQixTQXJHeUMsb0JBcUdoQztBQUNQO0FBQ0EsWUFDRSxDQUFDLEtBQUtzRSxLQUFMLENBQVcvQyxTQUFaLEdBQXdCLElBQXhCLEdBQ0U7QUFDRSxrQkFBVyxLQUFLK0MsS0FBTCxDQUFXL0MsU0FEeEI7QUFFRSwwQkFBbUIsS0FBS3FJLGlCQUYxQjtBQUdFLG1CQUFZLEtBQUtFLFVBSG5CO0FBSUUsZUFBUSxLQUFLRSxNQUpmO0FBS0UsZUFBUSxLQUFLakIsTUFMZjtBQU1FLDhCQUF1QixLQUFLYyxxQkFOOUI7QUFPRSxvQkFBYSxLQUFLdkYsS0FBTCxDQUFXaEUsV0FQMUI7QUFRRSx1QkFBZ0IsS0FBS2dFLEtBQUwsQ0FBVzlELGNBUjdCO0FBU0Usd0JBQWlCLEtBQUt5SixlQVR4QixHQUZKO0FBYUQ7QUFwSHdDLEVBQWxCLENBQXpCO0FBc0hBLEtBQU1qRSxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQVV4QyxLQUFWLEVBQWlCO0FBQ3ZDNUMsV0FBUTZGLEtBQVIsQ0FBYyw4QkFBZDtBQUNBLFVBQU87QUFDTGxGLGdCQUFXaUMsTUFBTUQsY0FBTixDQUFxQmhDLFNBRDNCO0FBRUxqQixrQkFBYWtELE1BQU1ELGNBQU4sQ0FBcUJqRCxXQUY3QjtBQUdMRSxxQkFBZ0JnRCxNQUFNRCxjQUFOLENBQXFCL0M7QUFIaEMsSUFBUDtBQUtELEVBUEQ7O21CQVNlLHlCQUFRd0YsZUFBUixFQUF5QmlELGtCQUF6QixDOzs7Ozs7QUN4SWYsOEM7Ozs7Ozs7Ozs7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFVQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsS0FBTWlCLFlBQVksZ0JBQU14RixXQUFOLENBQWtCO0FBQUE7QUFDbENvRCxrQkFEa0MsNkJBQ2hCO0FBQ2hCLFNBQUl2RyxZQUFZLEtBQUsrQyxLQUFMLENBQVcvQyxTQUEzQjtBQUNBLFNBQUllLE9BQU9mLFVBQVVlLElBQVYsR0FBaUJmLFVBQVVlLElBQTNCLEdBQWtDLElBQUlPLElBQUosRUFBN0M7QUFDQSxZQUFPLEVBQUVQLE1BQU1BLElBQVIsRUFBY0UsTUFBTWpCLFVBQVVpQixJQUFWLENBQWVDLEdBQW5DLEVBQXdDQyxVQUFVbkIsVUFBVW1CLFFBQVYsQ0FBbUJELEdBQXJFLEVBQVA7QUFDRCxJQUxpQztBQU1sQ3NGLFVBTmtDLG1CQU0xQkMsQ0FOMEIsRUFNdkIxRixJQU51QixFQU1qQjtBQUNmLFNBQUkyRixZQUFZLEtBQUt2SCxLQUFMLENBQVc0QixJQUEzQjtBQUNBMkYsZUFBVUMsT0FBVixDQUFrQjVGLEtBQUswQixPQUFMLEVBQWxCO0FBQ0FpRSxlQUFVRSxRQUFWLENBQW1CN0YsS0FBSzJCLFFBQUwsRUFBbkI7QUFDQWdFLGVBQVVHLFdBQVYsQ0FBc0I5RixLQUFLNEIsV0FBTCxFQUF0QjtBQUNBLFVBQUttRSxRQUFMLENBQWMsRUFBRS9GLE1BQU0yRixTQUFSLEVBQWQ7QUFDQXJILGFBQVE2RixLQUFSLENBQWMsZUFBZTNGLEtBQUtDLFNBQUwsQ0FBZSxLQUFLTCxLQUFwQixDQUE3QjtBQUNELElBYmlDO0FBY2xDNEgsV0Fka0Msb0JBY3pCTixDQWR5QixFQWN0Qk8sS0Fkc0IsRUFjZjtBQUNqQixTQUFJTixZQUFZLElBQUlwRixJQUFKLENBQVMsS0FBS3lCLEtBQUwsQ0FBVy9DLFNBQVgsQ0FBcUJlLElBQTlCLENBQWhCO0FBQ0EyRixlQUFVTyxRQUFWLENBQW1CRCxNQUFNbkUsUUFBTixLQUFtQixDQUF0QztBQUNBNkQsZUFBVVEsVUFBVixDQUFxQkYsTUFBTWxFLFVBQU4sRUFBckI7QUFDQSxVQUFLZ0UsUUFBTCxDQUFjLEVBQUUvRixNQUFNMkYsU0FBUixFQUFkO0FBQ0FySCxhQUFRNkYsS0FBUixDQUFjLGdCQUFnQjNGLEtBQUtDLFNBQUwsQ0FBZWtILFNBQWYsQ0FBOUI7QUFDRCxJQXBCaUM7QUFxQmxDUyxVQXJCa0MsbUJBcUIxQkMsQ0FyQjBCLEVBcUJ2QjtBQUNULFVBQUtOLFFBQUwsQ0FBYyxFQUFFN0YsTUFBTW1HLEVBQUVDLE1BQUYsQ0FBU0MsS0FBakIsRUFBZDtBQUNBO0FBQ0QsSUF4QmlDO0FBeUJsQ0MsY0F6QmtDLHVCQXlCdEJILENBekJzQixFQXlCbkI7QUFDYixVQUFLTixRQUFMLENBQWMsRUFBRTNGLFVBQVVpRyxFQUFFQyxNQUFGLENBQVNDLEtBQXJCLEVBQWQ7QUFDQTtBQUNELElBNUJpQztBQTZCbENFLFNBN0JrQyxvQkE2QnpCO0FBQ1BuSSxhQUFRNkYsS0FBUjtBQUNBLFVBQUtuQyxLQUFMLENBQVd5RSxNQUFYLENBQWtCLEtBQUtySSxLQUF2QjtBQUNELElBaENpQztBQWlDbENWLFNBakNrQyxvQkFpQ3pCO0FBQ1A7QUFDQSxTQUFNZ0gsUUFBUTtBQUNaTyxjQUFPO0FBREssTUFBZDtBQUdBLFNBQUk0QyxjQUFjLEtBQUs3RixLQUFMLENBQVdoRSxXQUFYLEdBQXlCLFFBQXpCLEdBQW9DLFNBQXREO0FBQ0EsU0FBSWdDLE9BQU8sS0FBS2dDLEtBQUwsQ0FBVy9DLFNBQVgsQ0FBcUJlLElBQXJCLEdBQTRCLElBQUlPLElBQUosQ0FBUyxLQUFLeUIsS0FBTCxDQUFXL0MsU0FBWCxDQUFxQmUsSUFBOUIsQ0FBNUIsR0FBa0UsSUFBSU8sSUFBSixFQUE3RTtBQUNBakMsYUFBUTZGLEtBQVIsWUFBdUJuRSxJQUF2QjtBQUNBLFlBQU8sS0FBS2dDLEtBQUwsQ0FBV2hFLFdBQVgsR0FDTDtBQUFBO0FBQUE7QUFDRTtBQUNFLGdCQUFNLG1CQURSO0FBRUUsMEJBQ0U7QUFBQTtBQUFBLGFBQVksU0FBUyxLQUFLeUksTUFBMUI7QUFDRTtBQURGO0FBSEosU0FERjtBQVNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFLG1FQUFZLG1CQUFrQixzQkFBOUI7QUFDRSwwQkFBYXpHLElBRGY7QUFFRSx1QkFBVSxLQUFLeUYsT0FGakIsR0FERjtBQUlFLG1FQUFZLG1CQUFrQix1QkFBOUI7QUFDRSwwQkFBYXpGLElBRGY7QUFFRSxxQkFBTyxNQUZUO0FBR0UsdUJBQVUsS0FBS2dHLFFBSGpCLEdBSkY7QUFRRSxrRUFBVyxtQkFBa0IsV0FBN0I7QUFDRSwyQkFBYyxLQUFLaEUsS0FBTCxDQUFXL0MsU0FBWCxDQUFxQmlCLElBQXJCLENBQTBCQyxHQUQxQztBQUVFLHVCQUFVLEtBQUtpRyxPQUZqQixHQVJGO0FBVThCLG9EQVY5QjtBQVdFLGtFQUFXLG1CQUFrQixlQUE3QjtBQUNFLDJCQUFjLEtBQUtwRSxLQUFMLENBQVcvQyxTQUFYLENBQXFCbUIsUUFBckIsQ0FBOEJELEdBRDlDO0FBRUUsdUJBQVUsS0FBS3FHLFdBRmpCLEdBWEY7QUFjRTtBQUNFLDZCQUFnQixLQUFLeEUsS0FBTCxDQUFXOUQsY0FEN0I7QUFFRSx1QkFBVSxLQUFLOEQsS0FBTCxDQUFXMkYsZUFGdkI7QUFHRSxvQkFBTSxlQUhSO0FBZEY7QUFERjtBQVRGLE1BREssR0FpQ0g7QUFBQTtBQUFBO0FBQ0UsMkRBQVEsT0FBTSxXQUFkO0FBQ0UsMEJBQ0U7QUFBQTtBQUFBLGFBQU0sSUFBRyxhQUFUO0FBQ0U7QUFBQTtBQUFBO0FBQ0UsMEJBQVdqRCxLQURiO0FBRUU7QUFGRjtBQURGLFVBRko7QUFRRSwyQkFDRTtBQUFBO0FBQUE7QUFDRSxzQkFBUyxLQUFLMUMsS0FBTCxDQUFXMEYsTUFEdEI7QUFFRSx3QkFBV2hELEtBRmI7QUFHRTtBQUhGLFVBVEosR0FERjtBQWdCRTtBQUNFLG9CQUFXLEtBQUsxQyxLQUFMLENBQVcvQyxTQUR4QjtBQUVFLDRCQUFtQixLQUFLK0MsS0FBTCxDQUFXc0YsaUJBRmhDO0FBR0UscUJBQVksS0FBS3RGLEtBQUwsQ0FBV3dGLFVBSHpCO0FBSUUseUJBQWdCLEtBQUt4RixLQUFMLENBQVc5RCxjQUo3QixHQWhCRjtBQXFCRTtBQUNFLG9CQUFXLEtBQUs4RCxLQUFMLENBQVcvQyxTQUR4QjtBQUVFLGdDQUF1QixLQUFLK0MsS0FBTCxDQUFXdUYscUJBRnBDO0FBR0UseUJBQWdCLEtBQUt2RixLQUFMLENBQVc5RCxjQUg3QjtBQXJCRixNQWpDSjtBQTRERDtBQXJHaUMsRUFBbEIsQ0FBbEI7O21CQXdHZTBKLFM7Ozs7OztBQzFIZixvRTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7bUJBRWUsZ0JBQU14RixXQUFOLENBQWtCO0FBQUE7QUFDL0IwRixnQkFEK0IsMkJBQ2Y7QUFDZDtBQUNBLFNBQUl0SCxTQUFTLEtBQUt3QixLQUFMLENBQVcvQyxTQUFYLENBQXFCaUIsSUFBckIsQ0FBMEJNLE1BQXZDO0FBQ0EsVUFBS3dCLEtBQUwsQ0FBVy9DLFNBQVgsQ0FBcUJpQixJQUFyQixDQUEwQk0sTUFBMUIsR0FBbUNBLFNBQVMsQ0FBNUM7QUFDQTtBQUNBLFVBQUt3QixLQUFMLENBQVdzRixpQkFBWDtBQUNELElBUDhCO0FBUS9CUyxvQkFSK0IsK0JBUVg7QUFDbEI7QUFDQSxTQUFJdkgsU0FBUyxLQUFLd0IsS0FBTCxDQUFXL0MsU0FBWCxDQUFxQm1CLFFBQXJCLENBQThCSSxNQUEzQztBQUNBLFVBQUt3QixLQUFMLENBQVcvQyxTQUFYLENBQXFCbUIsUUFBckIsQ0FBOEJJLE1BQTlCLEdBQXVDQSxTQUFTLENBQWhEO0FBQ0E7QUFDQSxVQUFLd0IsS0FBTCxDQUFXc0YsaUJBQVg7QUFDRCxJQWQ4QjtBQWUvQlUsb0JBZitCLCtCQWVYO0FBQ2xCO0FBQ0EsU0FBSXhILFNBQVMsS0FBS3dCLEtBQUwsQ0FBVy9DLFNBQVgsQ0FBcUJpQixJQUFyQixDQUEwQk0sTUFBdkM7QUFDQSxVQUFLd0IsS0FBTCxDQUFXL0MsU0FBWCxDQUFxQmlCLElBQXJCLENBQTBCTSxNQUExQixHQUFtQ0EsU0FBUyxDQUE1QztBQUNBO0FBQ0EsVUFBS3dCLEtBQUwsQ0FBV3NGLGlCQUFYO0FBQ0QsSUFyQjhCO0FBc0IvQlcsd0JBdEIrQixtQ0FzQlA7QUFDdEI7QUFDQSxTQUFJekgsU0FBUyxLQUFLd0IsS0FBTCxDQUFXL0MsU0FBWCxDQUFxQm1CLFFBQXJCLENBQThCSSxNQUEzQztBQUNBLFVBQUt3QixLQUFMLENBQVcvQyxTQUFYLENBQXFCbUIsUUFBckIsQ0FBOEJJLE1BQTlCLEdBQXVDQSxTQUFTLENBQWhEO0FBQ0E7QUFDQSxVQUFLd0IsS0FBTCxDQUFXc0YsaUJBQVg7QUFDRCxJQTVCOEI7QUE2Qi9CNUosU0E3QitCLG9CQTZCdEI7QUFDUDtBQUNBLFlBQ0U7QUFBQTtBQUFBLFNBQUssSUFBRyxTQUFSO0FBQ0U7QUFDRSxjQUFLLEtBQUtzRSxLQUFMLENBQVcvQyxTQUFYLENBQXFCaUIsSUFBckIsQ0FBMEJDLEdBRGpDO0FBRUUsb0JBQVcsS0FBSzJILGFBRmxCO0FBR0UseUJBQWdCLEtBQUs5RixLQUFMLENBQVc5RCxjQUg3QixHQURGO0FBS0U7QUFDRSxvQkFBVyxLQUFLOEQsS0FBTCxDQUFXL0MsU0FEeEI7QUFFRSxxQkFBWSxLQUFLK0MsS0FBTCxDQUFXd0YsVUFGekI7QUFHRSw0QkFBbUIsS0FBS1EsaUJBSDFCO0FBSUUsZ0NBQXVCLEtBQUtDLHFCQUo5QjtBQUtFLHlCQUFnQixLQUFLakcsS0FBTCxDQUFXOUQsY0FMN0IsR0FMRjtBQVdFO0FBQ0UsY0FBSyxLQUFLOEQsS0FBTCxDQUFXL0MsU0FBWCxDQUFxQm1CLFFBQXJCLENBQThCRCxHQURyQztBQUVFLG9CQUFXLEtBQUs0SCxpQkFGbEI7QUFHRSx5QkFBZ0IsS0FBSy9GLEtBQUwsQ0FBVzlELGNBSDdCO0FBWEYsTUFERjtBQWtCRDtBQWpEOEIsRUFBbEIsQzs7Ozs7Ozs7Ozs7Ozs7QUNKZjs7OztBQUNBOzs7Ozs7Ozs7O0tBSXFCZ0ssTTs7Ozs7Ozs7Ozs7Z0NBQ1JqSSxPLEVBQVM7QUFDbEIsWUFBSytCLEtBQUwsQ0FBV3dGLFVBQVgsQ0FBc0J2SCxPQUF0QjtBQUNEOzs7OEJBQ1E7QUFBQTs7QUFDUCxXQUFNeUUsUUFBUTtBQUNaeUQsbUJBQVUsS0FERTtBQUVadkQsaUJBQVE7QUFGSSxRQUFkO0FBSUEsV0FBTXdELGFBQWE7QUFDakJDLG1CQUFVLE9BRE87QUFFakJDLHNCQUFhLEdBRkk7QUFHakJDLHVCQUFjO0FBSEcsUUFBbkI7QUFLQTtBQUNBO0FBQ0EsY0FDRTtBQUFBO0FBQUEsV0FBSyxJQUFHLFFBQVI7QUFDRTtBQUFBO0FBQUEsYUFBSyxJQUFHLFVBQVI7QUFDRSxZQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYTFILEdBQWIsQ0FBaUIsbUJBQVc7QUFDMUIsaUJBQUkySCxlQUFlO0FBQ2pCTCx5QkFBVSxHQURPO0FBRWpCTSwyQkFBWSxPQUZLO0FBR2pCN0QsdUJBQVE7QUFIUyxjQUFuQjtBQUtBLGlCQUFJOEQsb0JBQW9CO0FBQ3RCTCx5QkFBVSxLQURZO0FBRXRCQyw0QkFBYSxPQUZTO0FBR3RCQyw2QkFBYztBQUhRLGNBQXhCO0FBS0F0SSx3QkFBVyxPQUFLK0IsS0FBTCxDQUFXL0MsU0FBWCxDQUFxQmdCLE9BQWhDLEdBQ0V5SSxrQkFBa0J6RCxLQUFsQixHQUEwQixLQUQ1QixHQUVFeUQsa0JBQWtCekQsS0FBbEIsR0FBMEIsT0FGNUI7QUFHQTNHLHFCQUFRQyxHQUFSLENBQVksY0FBY0MsS0FBS0MsU0FBTCxDQUFlaUcsS0FBZixDQUExQjtBQUNBLG9CQUNFO0FBQ0UsMEJBQVUsU0FEWjtBQUVFLHNCQUFPOEQsWUFGVDtBQUdFLDJCQUFZRSxpQkFIZDtBQUlFLG9CQUFLekksT0FKUDtBQUtFLHdCQUFTLE9BQUt1SCxVQUFMLENBQWdCbEMsSUFBaEIsU0FBMkJyRixPQUEzQixDQUxYO0FBTUUsc0JBQU8sTUFBTUE7QUFOZixlQURGO0FBVUQsWUF6QkQ7QUFERixVQURGO0FBOEJFO0FBQUE7QUFBQSxhQUFLLElBQUcsV0FBUjtBQUNFO0FBQ0Usd0JBQVUsTUFEWjtBQUVFLG9CQUFPeUUsS0FGVDtBQUdFLHlCQUFZMEQsVUFIZDtBQUlFLHNCQUFTLEtBQUtwRyxLQUFMLENBQVdnRyxpQkFKdEI7QUFLRSxvQkFBTyxLQUFLaEcsS0FBTCxDQUFXL0MsU0FBWCxDQUFxQmlCLElBQXJCLENBQTBCTSxNQUExQixDQUFpQ21JLFFBQWpDO0FBTFQsYUFERjtBQVFFO0FBQ0Usd0JBQVUsVUFEWjtBQUVFLG9CQUFPakUsS0FGVDtBQUdFLHlCQUFZMEQsVUFIZDtBQUlFLHNCQUFTLEtBQUtwRyxLQUFMLENBQVdpRyxxQkFKdEI7QUFLRSxvQkFBTyxLQUFLakcsS0FBTCxDQUFXL0MsU0FBWCxDQUFxQm1CLFFBQXJCLENBQThCSSxNQUE5QixDQUFxQ21JLFFBQXJDO0FBTFQ7QUFSRjtBQTlCRixRQURGO0FBaUREOzs7O0dBakVpQyxnQkFBTXpHLFM7O21CQUFyQmdHLE07Ozs7Ozs7Ozs7Ozs7O0FDTHJCOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztLQUVxQlUsTTs7Ozs7Ozs7Ozs7OEJBQ1Y7QUFDUCxXQUFNQyxnQkFBZ0I7QUFDcEJDLGtCQUFTLE1BRFc7QUFFcEJDLHdCQUFlLEtBRks7QUFHcEJDLG1CQUFVLE1BSFU7QUFJcEJDLHlCQUFnQixRQUpJO0FBS3BCQyxzQkFBYTtBQUxPLFFBQXRCO0FBT0EsV0FBSXJKLEtBQUcsQ0FBUDtBQUNBLFdBQU1zSixXQUFXLG9CQUNkaEssSUFEYyxDQUVkaUssRUFGYyxDQUVYLENBRlcsRUFFUixFQUZRLEVBRUosRUFGSSxFQUVBLENBRkEsRUFFRyxFQUZILENBQWpCO0FBR0EsY0FDRTtBQUFBO0FBQUEsV0FBSyxXQUFVLFFBQWY7QUFDRTtBQUFBO0FBQUEsYUFBSyxXQUFVLEtBQWY7QUFBc0IsZ0JBQUtwSCxLQUFMLENBQVc3QjtBQUFqQyxVQURGO0FBR0ksY0FBSzZCLEtBQUwsQ0FBVzlELGNBQVgsR0FDRSx1Q0FBSyxXQUFVLFFBQWYsRUFBd0IsS0FBSSxpQkFBNUIsR0FERixHQUVFLHVDQUFLLFNBQVMsS0FBSzhELEtBQUwsQ0FBV3FILFNBQXpCLEVBQW9DLFdBQVUsUUFBOUMsRUFBdUQsS0FBSSxpQkFBM0QsR0FMTjtBQU9FO0FBQUE7QUFBQSxhQUFLLE9BQU9SLGFBQVo7QUFBNEJNLG9CQUFTdEksR0FBVCxDQUFhLG1CQUFXO0FBQ2hELG9CQUFRLDhCQUFDLE9BQUQsSUFBUyxLQUFLaEIsSUFBZCxFQUFvQixRQUFReUosT0FBNUIsR0FBUjtBQUNELFlBRnlCO0FBQTVCO0FBUEYsUUFERjtBQWNEOzs7O0dBM0JpQyxnQkFBTXBILFM7O21CQUFyQjBHLE07O0tBOEJmVyxPOzs7Ozs7Ozs7OzttQ0FDVUMsRyxFQUFLQyxHLEVBQUs7QUFDdEJuTCxlQUFRNkYsS0FBUixpQkFBNEJxRixHQUE1QixjQUF3Q0MsR0FBeEM7QUFDRDs7OzhCQUNRO0FBQUE7O0FBQ1AsV0FBTUMsTUFBTSxLQUFLMUgsS0FBTCxDQUFXMkgsTUFBdkI7QUFDQSxXQUFNQyxnQ0FBOEJGLEdBQTlCLFNBQU47QUFDQSxXQUFNaEYsUUFBUTtBQUNaQyxnQkFBTyxLQURLO0FBRVpDLGlCQUFRLEtBRkk7QUFHWmlGLG1CQUFVLE1BSEU7QUFJWkMsb0JBQVc7QUFKQyxRQUFkO0FBTUEsV0FBSWpLLEtBQUcsQ0FBUDtBQUNBLGNBQ0U7QUFBQTtBQUFBO0FBQ0Usc0JBQVcsRUFBQ2tLLGlCQUFnQixNQUFqQixFQURiO0FBRUUsa0JBQU8sRUFBQ0EsaUJBQWdCLE1BQWpCLEVBRlQ7QUFHRSw4QkFBbUIsdUNBQUssT0FBT3JGLEtBQVosRUFBbUIsS0FBS2tGLE1BQXhCLEdBSHJCO0FBSUssNkJBQ0V6SyxJQURGLENBRUVpSyxFQUZGLENBRUssQ0FGTCxFQUVRLENBRlIsRUFFVyxDQUZYLEVBRWMsQ0FGZCxFQUVpQixDQUZqQixFQUVvQixDQUZwQixFQUV1QixFQUZ2QixFQUUyQixFQUYzQixFQUUrQixFQUYvQixFQUVtQyxFQUZuQyxFQUV1QyxFQUZ2QyxFQUdFdkksR0FIRixDQUdNLG1CQUFXO0FBQ2Qsa0JBQVE7QUFDTixzQkFBUyxPQUNObUosYUFETSxDQUVOMUUsSUFGTSxTQUVLb0UsR0FGTCxFQUVVTyxPQUZWLENBREg7QUFJTixrQkFBS3BLLElBSkM7QUFLTiw0QkFBZSxFQUFDb0YsT0FBTSxLQUFQLEVBQWE4RSxpQkFBZ0IsTUFBN0IsRUFBcUNwRixPQUFNLEtBQTNDLEVBTFQ7QUFNTiw4QkFBaUIsRUFBQ29GLGlCQUFnQixNQUFqQixFQUF5QnBGLE9BQU0sS0FBL0IsRUFOWDtBQU9OLG9CQUFPLEVBQUNvRixpQkFBZ0IsTUFBakIsRUFQRDtBQVFOLG9CQUFPRSxPQVJEO0FBU04sMEJBQWFBLE9BVFAsR0FBUjtBQVVELFVBZEY7QUFKTCxRQURGO0FBc0JEOzs7O0dBcENtQixnQkFBTS9ILFM7O0tBdUN0QmdJLE07Ozs7Ozs7Ozs7OzhCQUNLO0FBQ1AsV0FBTVIsTUFBTSxLQUFLMUgsS0FBTCxDQUFXMkgsTUFBdkI7QUFDQSxXQUFNQyxnQ0FBOEJGLEdBQTlCLFNBQU47QUFDQSxXQUFNaEYsUUFBUTtBQUNaQyxnQkFBTyxLQURLO0FBRVpDLGlCQUFRO0FBRkksUUFBZDtBQUlBLGNBQVEsdUNBQUssT0FBT0YsS0FBWixFQUFtQixLQUFLa0YsTUFBeEIsR0FBUjtBQUNEOzs7O0dBVGtCLGdCQUFNMUgsUzs7S0FZckJpSSxNOzs7Ozs7Ozs7Ozs4QkFDSztBQUNQLFdBQU1DLGVBQWU7QUFDbkJ6RixnQkFBTyxLQURZO0FBRW5CdUUsc0JBQWE7QUFGTSxRQUFyQjtBQUlBLGNBQ0U7QUFBQTtBQUFBO0FBQ0Usc0JBQVUsU0FEWjtBQUVFLGtCQUFPa0IsWUFGVDtBQUdFLHNCQUFVLE1BSFo7QUFJRSxrQkFBTSxHQUpSO0FBS0UsK0RBQVUsT0FBTSxHQUFoQixFQUFvQixhQUFZLEdBQWhDLEdBTEY7QUFNRSwrREFBVSxPQUFNLEdBQWhCLEVBQW9CLGFBQVksR0FBaEMsR0FORjtBQU9FLCtEQUFVLE9BQU0sR0FBaEIsRUFBb0IsYUFBWSxHQUFoQyxHQVBGO0FBUUUsK0RBQVUsT0FBTSxHQUFoQixFQUFvQixhQUFZLEdBQWhDLEdBUkY7QUFTRSwrREFBVSxPQUFNLEdBQWhCLEVBQW9CLGFBQVksR0FBaEMsR0FURjtBQVVFLCtEQUFVLE9BQU0sR0FBaEIsRUFBb0IsYUFBWSxHQUFoQyxHQVZGO0FBV0UsK0RBQVUsT0FBTSxJQUFoQixFQUFxQixhQUFZLElBQWpDLEdBWEY7QUFZRSwrREFBVSxPQUFNLElBQWhCLEVBQXFCLGFBQVksSUFBakMsR0FaRjtBQWFFLCtEQUFVLE9BQU0sSUFBaEIsRUFBcUIsYUFBWSxJQUFqQyxHQWJGO0FBY0UsK0RBQVUsT0FBTSxJQUFoQixFQUFxQixhQUFZLElBQWpDLEdBZEY7QUFlRSwrREFBVSxPQUFNLElBQWhCLEVBQXFCLGFBQVksSUFBakM7QUFmRixRQURGO0FBbUJEOzs7O0dBekJrQixnQkFBTWxJLFM7Ozs7Ozs7Ozs7OztBQ3JGM0I7Ozs7QUFDQTs7OztBQUNBOztBQVdBOzs7Ozs7bUJBRWUsZ0JBQU1FLFdBQU4sQ0FBa0I7QUFBQTtBQUMvQmlJLFdBRCtCLG9CQUN0QmhFLENBRHNCLEVBQ25CO0FBQ1Y7QUFDQSxVQUFLTixRQUFMLENBQWMsRUFBQzFHLGFBQWFnSCxFQUFFQyxNQUFGLENBQVNDLEtBQXZCLEVBQWQ7QUFDRCxJQUo4QjtBQUsvQmdCLHdCQUwrQixtQ0FLUDtBQUN0QjtBQUNBLFVBQ0d2RixLQURILENBRUd1RixxQkFGSCxDQUV5QixLQUFLbkosS0FBTCxDQUFXaUIsV0FGcEM7QUFHRCxJQVY4QjtBQVcvQjNCLFNBWCtCLG9CQVd0QjtBQUNQWSxhQUFRNkYsS0FBUixDQUFjLG1CQUFtQixvQkFBVWhGLElBQVYsQ0FBZSxLQUFLNkMsS0FBTCxDQUFXL0MsU0FBWCxDQUFxQkMsWUFBcEMsRUFBa0RvTCxNQUFsRCxFQUFqQztBQUNBLFNBQUl6SyxLQUFLLENBQVQ7QUFDQSxTQUFNMEssWUFBWTtBQUNoQnpCLGdCQUFTO0FBRE8sTUFBbEI7QUFHQSxTQUFNMEIsZUFBZTtBQUNuQm5DLGlCQUFVLE9BRFM7QUFFbkJDLG9CQUFhLE9BRk07QUFHbkJDLHFCQUFjLE9BSEs7QUFJbkJrQyxtQkFBWSxPQUpPO0FBS25CQyxzQkFBZTtBQUxJLE1BQXJCO0FBT0EsWUFDRTtBQUFBO0FBQUE7QUFDRyxZQUFLMUksS0FBTCxDQUFXOUQsY0FBWCxHQUNHLElBREgsR0FFRztBQUFBO0FBQUEsV0FBSyxPQUFPcU0sU0FBWjtBQUNBO0FBQ0UscUJBQVMsd0JBRFg7QUFFRSxzQkFBVyxJQUZiO0FBR0Usb0JBQVMsQ0FIWDtBQUlFLHNCQUFXLElBSmI7QUFLRSxzQkFBVSxLQUxaO0FBTUUscUJBQVUsS0FBS0YsUUFOakIsR0FEQTtBQVFBLGlFQUFZLFNBQVMsS0FBSzlDLHFCQUExQixFQUFpRCxNQUFNLG1EQUF2RDtBQVJBLFFBSE47QUFjRTtBQUFBO0FBQUEsV0FBTSxPQUFPO0FBQ1gxQyxzQkFBUztBQURFLFlBQWI7QUFHRyw2QkFDRTFGLElBREYsQ0FDTyxLQUFLNkMsS0FBTCxDQUFXL0MsU0FBWCxDQUFxQkMsWUFENUIsRUFFRXlMLE9BRkYsR0FHRTlKLEdBSEYsQ0FHTSx1QkFBZTtBQUNsQixlQUFNK0osVUFBVXZMLFlBQVlDLE1BQVosR0FDWDtBQUNELGtCQUFLTyxJQURKO0FBRUQsMEJBQWFSLFlBQVlBLFdBRnhCO0FBR0QsNEJBQWVtTCxZQUhkLEdBRFcsR0FLWDtBQUNELGtCQUFLM0ssSUFESjtBQUVELDBCQUFhUixZQUFZQSxXQUZ4QjtBQUdELDRCQUFjLDRCQUhiO0FBSUQsNEJBQWVtTCxZQUpkLEdBTEw7QUFVQSxrQkFBT0ksT0FBUDtBQUNELFVBZkY7QUFISDtBQWRGLE1BREY7QUFzQ0Q7QUE5RDhCLEVBQWxCLEM7Ozs7OztBQ2ZmLCtEOzs7Ozs7QUNBQSxpRTs7Ozs7O0FDQUEsb0QiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzk2MjA5MDYzYzZkZmNiOTVkYjAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nXHJcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnXHJcbmltcG9ydCBzdG9yZSBmcm9tICcuL3N0b3JlJ1xyXG5pbXBvcnQgUm91dGV1ciBmcm9tICcuL3JvdXRlcidcclxuaW1wb3J0IGluamVjdFRhcEV2ZW50UGx1Z2luIGZyb20gJ3JlYWN0LXRhcC1ldmVudC1wbHVnaW4nXHJcbmluamVjdFRhcEV2ZW50UGx1Z2luKCk7XHJcblxyXG5SZWFjdERPTS5yZW5kZXIoXHJcbiAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+e1JvdXRldXJ9PC9Qcm92aWRlcj4sXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpXHJcbilcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdFwiXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWRvbVwiXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJlZHV4XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtcmVkdXhcIlxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge2NyZWF0ZVN0b3JlLCBjb21iaW5lUmVkdWNlcnN9IGZyb20gXCJyZWR1eFwiXHJcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuL2FjdGlvbnMvYWN0aW9ucy10eXBlc1wiXHJcbmltcG9ydCBJbW11dGFibGUgZnJvbSBcImltbXV0YWJsZVwiXHJcblxyXG5jb25zdCBpbml0U3RhdGUgPSB7XHJcbiAgICByZW5jb250cmVzOiBbXSxcclxuICAgIG1vZGVFZGl0aW9uOiBmYWxzZSxcclxuICAgIG1vZGVBam91dDogZmFsc2UsXHJcbiAgICBtb2RlVmVycm91aWxsZTogdHJ1ZVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5jb250cmVSZWR1Y2VyKHN0YXRlID0gaW5pdFN0YXRlLCBhY3Rpb24pIHtcclxuICAgIGNvbnNvbGUubG9nKFwiIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXCIpXHJcbiAgICBjb25zb2xlLmxvZyhcInwgQUNUSU9OOiBcIiArIEpTT04uc3RyaW5naWZ5KGFjdGlvbi50eXBlKSlcclxuICAgIGxldCBhY3Rpb25zID0ge1xyXG4gICAgICAgIFwiREVGQVVUXCI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEltbXV0YWJsZS5mcm9tSlMoc3RhdGUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWN0aW9uc1t0eXBlcy5WRVJST1VJTExBR0VdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwifCB2ZXJyb3VpbGxhZ2UuXCIpXHJcbiAgICAgICAgcmV0dXJuIEltbXV0YWJsZVxyXG4gICAgICAgICAgICAuZnJvbUpTKHN0YXRlKVxyXG4gICAgICAgICAgICAuc2V0KFwibW9kZVZlcnJvdWlsbGVcIiwgIXN0YXRlLm1vZGVWZXJyb3VpbGxlKVxyXG4gICAgfVxyXG4gICAgYWN0aW9uc1t0eXBlcy5HRVRfUkVOQ09OVFJFU19TVUNDRVNTXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInwgcmVuY29udHJlczogXCIgKyBKU09OLnN0cmluZ2lmeShhY3Rpb24ucmVuY29udHJlcykpXHJcbiAgICAgICAgcmV0dXJuIEltbXV0YWJsZVxyXG4gICAgICAgICAgICAuZnJvbUpTKHN0YXRlKVxyXG4gICAgICAgICAgICAuc2V0KFwicmVuY29udHJlc1wiLCBhY3Rpb24ucmVuY29udHJlcylcclxuICAgIH1cclxuICAgIGFjdGlvbnNbdHlwZXMuR0VUX1JFTkNPTlRSRV9TVUNDRVNTXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInwgcmVuY29udHJlOiBcIiArIEpTT04uc3RyaW5naWZ5KGFjdGlvbi5yZW5jb250cmUpKVxyXG4gICAgICAgIGxldCBjb21tZW50YWlyZXMgPSBJbW11dGFibGVcclxuICAgICAgICAgICAgLkxpc3QoKVxyXG4gICAgICAgICAgICAucHVzaCh7Y29tbWVudGFpcmU6IFwiTW9yZ2FuZSBlbnRyZSBzdXIgbGUgdGVycmFpbiDDoCBsYSBwbGFjZSBkZSBKYWNxdWVsaW5lXCIsIHZhbGlkZTogdHJ1ZX0pXHJcbiAgICAgICAgICAgIC5wdXNoKHtjb21tZW50YWlyZTogXCJQYW5pZXIgbWFnbmlmaXF1ZSBkZSBUaWZhbmllXCIsIHZhbGlkZTogdHJ1ZX0pXHJcbiAgICAgICAgICAgIC5wdXNoKHtjb21tZW50YWlyZTogXCJMZXMgdmlzaXRldXJzIGRvbWluZW50IGxhIHBhcnRpZVwiLCB2YWxpZGU6IHRydWV9KVxyXG4gICAgICAgICAgICAucHVzaCh7Y29tbWVudGFpcmU6IFwiRGFucyBsYSByYXF1ZXR0ZSBsZXMgaW50ZXJpZXVycyBkb21pbmVudCBzYW5zIHBhcnRhZ2VcIiwgdmFsaWRlOiB0cnVlfSlcclxuICAgICAgICAgICAgLnB1c2goe2NvbW1lbnRhaXJlOiBcIlN1cGVyYmUgYWN0aW9uIGRlcyBOYW50YWlzZXMgcXVpIG1hbGhldXJldXNlbWVudCBuZSBkb25uZXJhIHJpZW5cIiwgdmFsaWRlOiB0cnVlfSlcclxuICAgICAgICBsZXQgcmVuY29udHJlQXZlY0NvbW1lbnRhaXJlID0gSW1tdXRhYmxlXHJcbiAgICAgICAgICAgIC5mcm9tSlMoYWN0aW9uLnJlbmNvbnRyZSlcclxuICAgICAgICAgICAgLnNldChcImNvbW1lbnRhaXJlc1wiLCBjb21tZW50YWlyZXMpXHJcbiAgICAgICAgcmV0dXJuIEltbXV0YWJsZVxyXG4gICAgICAgICAgICAuZnJvbUpTKHN0YXRlKVxyXG4gICAgICAgICAgICAuc2V0KFwicmVuY29udHJlXCIsIHJlbmNvbnRyZUF2ZWNDb21tZW50YWlyZSlcclxuICAgIH1cclxuICAgIGFjdGlvbnNbdHlwZXMuUE9TVF9SRU5DT05UUkVfU1VDQ0VTU10gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ8IHJlbmNvbnRyZSAobm91dmVsbGUpOiBcIiArIEpTT04uc3RyaW5naWZ5KGFjdGlvbi5yZW5jb250cmUpKVxyXG4gICAgICAgIGxldCByZW5jb250cmVzID0gSW1tdXRhYmxlXHJcbiAgICAgICAgICAgIC5mcm9tSlMoc3RhdGUpXHJcbiAgICAgICAgICAgIC5nZXQoXCJyZW5jb250cmVzXCIpXHJcbiAgICAgICAgICAgIC5wdXNoKGFjdGlvbi5yZW5jb250cmUpXHJcbiAgICAgICAgcmV0dXJuIEltbXV0YWJsZVxyXG4gICAgICAgICAgICAuZnJvbUpTKHN0YXRlKVxyXG4gICAgICAgICAgICAuc2V0KFwicmVuY29udHJlc1wiLCByZW5jb250cmVzKVxyXG4gICAgICAgICAgICAuc2V0KFwibW9kZUFqb3V0XCIsIGZhbHNlKVxyXG4gICAgfVxyXG4gICAgYWN0aW9uc1t0eXBlcy5ERUxFVEVfUkVOQ09OVFJFX1NVQ0NFU1NdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwifCByZW5jb250cmUgKHN1cHByaW3DqWUpOiBcIiArIGFjdGlvbi5pZFJlbmNvbnRyZSlcclxuICAgICAgICBsZXQgcmVuY29udHJlcyA9IHN0YXRlXHJcbiAgICAgICAgICAgIC5yZW5jb250cmVzXHJcbiAgICAgICAgICAgIC5maWx0ZXIocmVuY29udHJlID0+IHJlbmNvbnRyZS5pZCAhPSBhY3Rpb24uaWRSZW5jb250cmUpXHJcbiAgICAgICAgcmV0dXJuIEltbXV0YWJsZVxyXG4gICAgICAgICAgICAuZnJvbUpTKHN0YXRlKVxyXG4gICAgICAgICAgICAuc2V0KFwicmVuY29udHJlc1wiLCByZW5jb250cmVzKVxyXG4gICAgfVxyXG4gICAgYWN0aW9uc1t0eXBlcy5FRElURVJfUkVOQ09OVFJFXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInwgTW9kZSDDqWRpdGlvbjogXCIgKyBKU09OLnN0cmluZ2lmeShzdGF0ZS5tb2RlRWRpdGlvbikpXHJcbiAgICAgICAgcmV0dXJuIEltbXV0YWJsZVxyXG4gICAgICAgICAgICAuZnJvbUpTKHN0YXRlKVxyXG4gICAgICAgICAgICAuc2V0KFwibW9kZUVkaXRpb25cIiwgIXN0YXRlLm1vZGVFZGl0aW9uKVxyXG4gICAgfVxyXG4gICAgYWN0aW9uc1t0eXBlcy5QVVRfUkVOQ09OVFJFX1NVQ0NFU1NdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwifCByZW5jb250cmU6IFwiICsgSlNPTi5zdHJpbmdpZnkoYWN0aW9uLnJlbmNvbnRyZSkpXHJcbiAgICAgICAgbGV0IHJlbmNvbnRyZSA9IEltbXV0YWJsZVxyXG4gICAgICAgICAgICAuZnJvbUpTKHN0YXRlKVxyXG4gICAgICAgICAgICAuZ2V0KFwicmVuY29udHJlXCIpXHJcbiAgICAgICAgICAgIC5zZXQoXCJkYXRlXCIsYWN0aW9uLnJlbmNvbnRyZS5kYXRlKVxyXG4gICAgICAgICAgICAuc2V0KFwicGVyaW9kZVwiLGFjdGlvbi5yZW5jb250cmUucGVyaW9kZSlcclxuICAgICAgICAgICAgLnNldChcImhvdGUubm9tXCIsYWN0aW9uLnJlbmNvbnRyZS5ob3RlLm5vbSlcclxuICAgICAgICAgICAgLnNldChcInZpc2l0ZXVyLm5vbVwiLGFjdGlvbi5yZW5jb250cmUudmlzaXRldXIubm9tKVxyXG4gICAgICAgIHJldHVybiBJbW11dGFibGVcclxuICAgICAgICAgICAgLmZyb21KUyhzdGF0ZSlcclxuICAgICAgICAgICAgLnNldChcInJlbmNvbnRyZVwiLCByZW5jb250cmUpXHJcbiAgICAgICAgICAgIC5zZXQoXCJtb2RlRWRpdGlvblwiLCBmYWxzZSlcclxuICAgIH1cclxuICAgIGFjdGlvbnNbdHlwZXMuTk9VVkVMTEVfSU5GT10gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ8IHJlbmNvbnRyZTogXCIgKyBKU09OLnN0cmluZ2lmeShhY3Rpb24ucmVuY29udHJlKSlcclxuICAgICAgICByZXR1cm4gSW1tdXRhYmxlXHJcbiAgICAgICAgICAgIC5mcm9tSlMoc3RhdGUpXHJcbiAgICAgICAgICAgIC5zZXQoXCJyZW5jb250cmVcIiwgYWN0aW9uLnJlbmNvbnRyZSlcclxuICAgIH1cclxuICAgIGFjdGlvbnNbdHlwZXMuQUpPVVRFUl9SRU5DT05UUkVdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCByZW5jb250cmUgPSB7XHJcbiAgICAgICAgICAgIGlkOiAwLFxyXG4gICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICBob3RlOiB7XHJcbiAgICAgICAgICAgICAgICBub206IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBtYXJxdWU6IDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdmlzaXRldXI6IHtcclxuICAgICAgICAgICAgICAgIG5vbTogXCJcIixcclxuICAgICAgICAgICAgICAgIG1hcnF1ZTogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwifCBNb2RlIGFqb3V0OiBcIiArIEpTT04uc3RyaW5naWZ5KHN0YXRlLm1vZGVBam91dCkpXHJcbiAgICAgICAgcmV0dXJuIEltbXV0YWJsZVxyXG4gICAgICAgICAgICAuZnJvbUpTKHN0YXRlKVxyXG4gICAgICAgICAgICAuc2V0KFwicmVuY29udHJlXCIsIHJlbmNvbnRyZSlcclxuICAgICAgICAgICAgLnNldChcIm1vZGVBam91dFwiLCAhc3RhdGUubW9kZUFqb3V0KVxyXG4gICAgfVxyXG4gICAgYWN0aW9uc1t0eXBlcy5BTk5VTEVSX1JFTkNPTlRSRV0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ8IEFubnVsYXRpb24gZGUgbCdham91dCBkJ3VuZSByZW5jb250cmUuXCIpXHJcbiAgICAgICAgcmV0dXJuIEltbXV0YWJsZVxyXG4gICAgICAgICAgICAuZnJvbUpTKHN0YXRlKVxyXG4gICAgICAgICAgICAuc2V0KFwibW9kZUFqb3V0XCIsICFzdGF0ZS5tb2RlQWpvdXQpXHJcbiAgICB9XHJcbiAgICBhY3Rpb25zW3R5cGVzLk5PVVZFTExFXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInwgTm91dmVsbGUgcMOpcmlvZGU6IFwiICsgSlNPTi5zdHJpbmdpZnkoYWN0aW9uLnBlcmlvZGUpKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwifCBOb3V2ZWxsZSBww6lyaW9kZSAocmVuY29udHJlKTogXCIgKyBKU09OLnN0cmluZ2lmeShzdGF0ZS5yZW5jb250cmUpKVxyXG4gICAgICAgIGxldCByZW5jb250cmUgPSBJbW11dGFibGVcclxuICAgICAgICAgICAgLmZyb21KUyhzdGF0ZSlcclxuICAgICAgICAgICAgLmdldChcInJlbmNvbnRyZVwiKVxyXG4gICAgICAgICAgICAuc2V0KFwicGVyaW9kZVwiLCBhY3Rpb24ucGVyaW9kZSlcclxuICAgICAgICBjb25zb2xlLmxvZyhcInwgTm91dmVsbGUgcMOpcmlvZGUgKG5vdXZlbGxlIHJlbmNvbnRyZSk6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVuY29udHJlKSlcclxuICAgICAgICByZXR1cm4gSW1tdXRhYmxlXHJcbiAgICAgICAgICAgIC5mcm9tSlMoc3RhdGUpXHJcbiAgICAgICAgICAgIC5zZXQoXCJyZW5jb250cmVcIiwgcmVuY29udHJlKVxyXG4gICAgfVxyXG4gICAgYWN0aW9uc1t0eXBlcy5DT01NRU5UQUlSRV9QT1NUXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgY29tbWVudGFpcmUgPSBhY3Rpb24uY29tbWVudGFpcmVcclxuICAgICAgICBjb25zb2xlLmxvZyhgIE5vdXZlYXUgY29tbWVudGFpcmUgc3VyIGxhIHJlbmNvbnRyZTogJHtjb21tZW50YWlyZX1gKVxyXG4gICAgICAgIGxldCByZW5jb250cmUgPSBJbW11dGFibGVcclxuICAgICAgICAgICAgLmZyb21KUyhzdGF0ZSlcclxuICAgICAgICAgICAgLmdldChcInJlbmNvbnRyZVwiKVxyXG4gICAgICAgIGxldCBjb21tZW50YWlyZXMgPSByZW5jb250cmVcclxuICAgICAgICAgICAgLmdldChcImNvbW1lbnRhaXJlc1wiKVxyXG4gICAgICAgICAgICAucHVzaCh7Y29tbWVudGFpcmU6IGNvbW1lbnRhaXJlLCB2YWxpZGU6IGZhbHNlfSlcclxuICAgICAgICByZW5jb250cmUgPSByZW5jb250cmUuc2V0KFwiY29tbWVudGFpcmVzXCIsIGNvbW1lbnRhaXJlcylcclxuICAgICAgICByZXR1cm4gSW1tdXRhYmxlXHJcbiAgICAgICAgICAgIC5mcm9tSlMoc3RhdGUpXHJcbiAgICAgICAgICAgIC5zZXQoXCJyZW5jb250cmVcIiwgcmVuY29udHJlKVxyXG4gICAgfVxyXG4gICAgYWN0aW9uc1t0eXBlcy5DT01NRU5UQUlSRV9OT1VWRUFVXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgY29tbWVudGFpcmUgPSBhY3Rpb24uY29tbWVudGFpcmVcclxuICAgICAgICBjb25zb2xlLmxvZyhgIE5vdXZlYXUgY29tbWVudGFpcmUgc3VyIGxhIHJlbmNvbnRyZTogJHtjb21tZW50YWlyZX1gKVxyXG4gICAgICAgIGxldCByZW5jb250cmUgPSBJbW11dGFibGVcclxuICAgICAgICAgICAgLmZyb21KUyhzdGF0ZSlcclxuICAgICAgICAgICAgLmdldChcInJlbmNvbnRyZVwiKVxyXG4gICAgICAgIGxldCBjb21tZW50YWlyZXMgPSByZW5jb250cmVcclxuICAgICAgICAgICAgLmdldChcImNvbW1lbnRhaXJlc1wiKVxyXG4gICAgICAgICAgICAubWFwKGNvbW1lbnRhaXJlID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21tZW50YWlyZS5zZXQoXCJ2YWxpZGVcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBjb21tZW50YWlyZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIHJlbmNvbnRyZSA9IHJlbmNvbnRyZS5zZXQoXCJjb21tZW50YWlyZXNcIiwgY29tbWVudGFpcmVzKVxyXG4gICAgICAgIHJldHVybiBJbW11dGFibGVcclxuICAgICAgICAgICAgLmZyb21KUyhzdGF0ZSlcclxuICAgICAgICAgICAgLnNldChcInJlbmNvbnRyZVwiLCByZW5jb250cmUpXHJcbiAgICB9XHJcbiAgICBsZXQgbm91dmVhdVN0YXRlID0gKGFjdGlvbnNbYWN0aW9uLnR5cGVdIHx8IGFjdGlvbnNbJ0RFRkFVVCddKSgpO1xyXG4gICAgY29uc29sZS5sb2coXCJOb3V2ZWwgw6l0YXQ6IFwiICsgbm91dmVhdVN0YXRlKVxyXG4gICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tXCIpXHJcbiAgICByZXR1cm4gbm91dmVhdVN0YXRlLnRvSlMoKTtcclxufVxyXG5cclxudmFyIHJlZHVjZXJzID0gY29tYmluZVJlZHVjZXJzKHtyZW5jb250cmVTdGF0ZTogcmVuY29udHJlUmVkdWNlcn0pXHJcbmNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlcnMpXHJcbmV4cG9ydCBkZWZhdWx0IHN0b3JlXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zdG9yZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVkdXhcIlxuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBSZWNvbnRyZXNcclxuZXhwb3J0IGNvbnN0IEdFVF9SRU5DT05UUkVTX1NVQ0NFU1MgPSBcIkdFVF9SRU5DT05UUkVTX1NVQ0NFU1NcIlxyXG4vLyBSZWNvbnRyZVxyXG5leHBvcnQgY29uc3QgQUpPVVRfUkVOQ09OVFJFID0gXCJBSk9VVF9SRU5DT05UUkVcIlxyXG5leHBvcnQgY29uc3QgUE9TVF9SRU5DT05UUkUgPSBcIlBPU1RfUkVOQ09OVFJFXCJcclxuZXhwb3J0IGNvbnN0IFBPU1RfUkVOQ09OVFJFX1NVQ0NFU1MgPSBcIlBPU1RfUkVOQ09OVFJFX1NVQ0NFU1NcIlxyXG5leHBvcnQgY29uc3QgR0VUX1JFTkNPTlRSRV9TVUNDRVNTID0gXCJHRVRfUkVOQ09OVFJFX1NVQ0NFU1NcIlxyXG5leHBvcnQgY29uc3QgUFVUX1JFTkNPTlRSRV9TVUNDRVNTID0gXCJQVVRfUkVOQ09OVFJFX1NVQ0NFU1NcIlxyXG5leHBvcnQgY29uc3QgREVMRVRFX1JFTkNPTlRSRV9TVUNDRVNTID0gXCJERUxFVEVfUkVOQ09OVFJFX1NVQ0NFU1NcIlxyXG5leHBvcnQgY29uc3QgTk9VVkVMTEVfSU5GTyA9IFwiTk9VVkVMTEVfTUFSUVVFXCJcclxuZXhwb3J0IGNvbnN0IEVESVRFUl9SRU5DT05UUkUgPSBcIkVESVRFUl9SRU5DT05UUkVcIlxyXG5leHBvcnQgY29uc3QgTk9VVkVMTEUgPSBcIk5PVVZFTExFXCJcclxuZXhwb3J0IGNvbnN0IEFKT1VURVJfUkVOQ09OVFJFID0gXCJBSk9VVEVSX1JFTkNPTlRSRVwiXHJcbmV4cG9ydCBjb25zdCBBTk5VTEVSX1JFTkNPTlRSRSA9IFwiQU5OVUxFUl9SRU5DT05UUkVcIlxyXG5leHBvcnQgY29uc3QgTk9VVkVMTEVfUEVSSU9ERSA9IFwiTk9VVkVMTEVfUEVSSU9ERVwiXHJcbmV4cG9ydCBjb25zdCBDT01NRU5UQUlSRV9QT1NUID0gXCJDT01NRU5UQUlSRV9QT1NUXCJcclxuZXhwb3J0IGNvbnN0IENPTU1FTlRBSVJFX05PVVZFQVUgPSBcIkNPTU1FTlRBSVJFX05PVVZFQVVcIlxyXG5leHBvcnQgY29uc3QgVkVSUk9VSUxMQUdFPVwiVkVSUk9VSUxMQUdFXCJcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FjdGlvbnMvYWN0aW9ucy10eXBlcy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImltbXV0YWJsZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImltbXV0YWJsZVwiXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgeyBSb3V0ZXIsIEluZGV4UmVkaXJlY3QsIFJvdXRlLCB1c2VSb3V0ZXJIaXN0b3J5IH0gZnJvbSBcInJlYWN0LXJvdXRlclwiXHJcbmltcG9ydCB7IGNyZWF0ZUhhc2hIaXN0b3J5IH0gZnJvbSBcImhpc3RvcnlcIlxyXG5pbXBvcnQgQWNjdWVpbENvbnRlbmV1ciBmcm9tIFwiLi9jb21wb3NhbnRzL2FjY3VlaWwtY29udGVuZXVyLmpzXCJcclxuaW1wb3J0IFJlbmNvbnRyZXNDb250ZW5ldXIgZnJvbSBcIi4vY29tcG9zYW50cy9yZW5jb250cmVzLWNvbnRlbmV1ci5qc1wiXHJcbmltcG9ydCBSZW5jb250cmVDb250ZW5ldXIgZnJvbSBcIi4vY29tcG9zYW50cy9yZW5jb250cmUtY29udGVuZXVyLmpzXCJcclxuaW1wb3J0IE11aVRoZW1lUHJvdmlkZXIgZnJvbSBcIm1hdGVyaWFsLXVpL3N0eWxlcy9NdWlUaGVtZVByb3ZpZGVyXCJcclxuXHJcbmNvbnN0IGFwcEhpc3RvcnkgPSB1c2VSb3V0ZXJIaXN0b3J5KGNyZWF0ZUhhc2hIaXN0b3J5KSh7IHF1ZXJ5S2V5OiBmYWxzZSB9KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgKFxyXG4gIDxNdWlUaGVtZVByb3ZpZGVyPlxyXG4gICAgPFJvdXRlciBoaXN0b3J5PXthcHBIaXN0b3J5fT5cclxuICAgICAgPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtBY2N1ZWlsQ29udGVuZXVyfSA+XHJcbiAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89XCIvcmVuY29udHJlc1wiIC8+XHJcbiAgICAgICAgPFJvdXRlIHBhdGg9XCIvcmVuY29udHJlcy86aWRSZW5jb250cmVcIiBjb21wb25lbnQ9e1JlbmNvbnRyZUNvbnRlbmV1cn0gLz5cclxuICAgICAgICA8Um91dGUgcGF0aD1cIi9yZW5jb250cmVzXCIgY29tcG9uZW50PXtSZW5jb250cmVzQ29udGVuZXVyfS8+XHJcbiAgICAgIDwvUm91dGU+XHJcbiAgICA8L1JvdXRlcj5cclxuICA8L011aVRoZW1lUHJvdmlkZXI+XHJcbilcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JvdXRlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LXJvdXRlclwiXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhpc3RvcnlcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJoaXN0b3J5XCJcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNjdWVpbENvbnRlbmV1ciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgcmVuZGVyKCl7XHJcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcclxuICAgIGxldCBzdHJEYXRlID0gZGF0ZS5nZXREYXRlKCkgKyBcIi9cIiArIChkYXRlLmdldE1vbnRoKCkgKyAxKSArIFwiL1wiICsgZGF0ZS5nZXRGdWxsWWVhcigpXHJcbiAgICBsZXQgc3RySGV1cmUgPSBkYXRlLmdldEhvdXJzKCkgKyBcIjpcIiArIGRhdGUuZ2V0TWludXRlcygpXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgIDxmb290ZXI+XHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJpbmZvXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAge3N0ckRhdGV9IHtzdHJIZXVyZX1cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9mb290ZXI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIClcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvc2FudHMvYWNjdWVpbC1jb250ZW5ldXIuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcbmltcG9ydCBzdG9yZSBmcm9tIFwiLi4vc3RvcmVcIlxyXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vYWN0aW9ucy9hY3Rpb25zLXR5cGVzXCJcclxuaW1wb3J0IHJlcXVlc3QgZnJvbSBcInJlcXVlc3RcIlxyXG5pbXBvcnQgUmVuY29udHJlcyBmcm9tIFwiLi9yZW5jb250cmVzXCJcclxuaW1wb3J0IFJlbmNvbnRyZUFqb3V0IGZyb20gXCIuL3JlbmNvbnRyZXMtYWpvdXRcIlxyXG5cclxuY29uc3QgUmVuY29udHJlc0NvbnRlbmV1ciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIHZhciBhZHJlc3NlID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0ICsgXCIvYXBpL3JlbmNvbnRyZXNcIlxyXG4gICAgY29uc29sZS5pbmZvKFwiUmVxdWV0ZSBkZSBsJ0FQSSB3ZWI6IFwiICsgYWRyZXNzZSlcclxuICAgIHJlcXVlc3QoYWRyZXNzZSwgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSwgcmVuY29udHJlcykge1xyXG4gICAgICBpZiAoIWVycm9yICYmIHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgbGV0IG9SZW5jb250cmVzID0gSlNPTi5wYXJzZShyZW5jb250cmVzKVxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcclxuICAgICAgICAgIHR5cGU6IHR5cGVzLkdFVF9SRU5DT05UUkVTX1NVQ0NFU1MsXHJcbiAgICAgICAgICByZW5jb250cmVzOiBvUmVuY29udHJlc1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBham91dGVyUmVuY29udHJlKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJBam91dGVyIHJlbmNvbnRyZS5cIilcclxuICAgIHN0b3JlLmRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogdHlwZXMuQUpPVVRFUl9SRU5DT05UUkVcclxuICAgIH0pXHJcbiAgfSxcclxuICBzdXBwcmltZVJlbmNvbnRyZShpZFJlbmNvbnRyZSkge1xyXG4gICAgY29uc29sZS5pbmZvKFwiU3VwcHJlc3Npb246IFwiICsgaWRSZW5jb250cmUpXHJcbiAgICB2YXIgYWRyZXNzZSA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdCArIFwiL2FwaS9yZW5jb250cmVzL1wiICsgaWRSZW5jb250cmVcclxuICAgIGNvbnNvbGUuaW5mbyhcIlJlcXVldGUgZGUgbCdBUEkgd2ViOiBcIiArIGFkcmVzc2UpXHJcbiAgICByZXF1ZXN0KHsgdXJsOiBhZHJlc3NlLCBtZXRob2Q6IFwiREVMRVRFXCIgfSwgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSkge1xyXG4gICAgICBpZiAoIWVycm9yICYmIHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gMjA0KSB7XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goe1xyXG4gICAgICAgICAgdHlwZTogdHlwZXMuREVMRVRFX1JFTkNPTlRSRV9TVUNDRVNTLFxyXG4gICAgICAgICAgaWRSZW5jb250cmU6IGlkUmVuY29udHJlXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGFqb3V0UmVuY29udHJlKGluZm9zKSB7XHJcbiAgICBpZiAoaW5mb3MgPT0gbnVsbCkge1xyXG4gICAgICBzdG9yZS5kaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogdHlwZXMuQU5OVUxFUl9SRU5DT05UUkUsXHJcbiAgICAgICAgcmVuY29udHJlOiByZW5jb250cmVcclxuICAgICAgfSlcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBsZXQgcmVuY29udHJlID0gdGhpcy5wcm9wcy5yZW5jb250cmVcclxuICAgIGNvbnNvbGUuaW5mbyhcIkluZm86IFwiICsgSlNPTi5zdHJpbmdpZnkoaW5mb3MpKVxyXG4gICAgcmVuY29udHJlLmRhdGUgPSBpbmZvcy5kYXRlXHJcbiAgICByZW5jb250cmUucGVyaW9kZSA9IGluZm9zLnBlcmlvZGVcclxuICAgIHJlbmNvbnRyZS5ob3RlLm5vbSA9IGluZm9zLmhvdGVcclxuICAgIHJlbmNvbnRyZS52aXNpdGV1ci5ub20gPSBpbmZvcy52aXNpdGV1clxyXG4gICAgY29uc29sZS5sb2coXCJBam91dCByZW5jb250cmUgOiBcIiArIEpTT04uc3RyaW5naWZ5KHJlbmNvbnRyZSkpXHJcbiAgICB2YXIgYWRyZXNzZSA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdCArIFwiL2FwaS9yZW5jb250cmVzXCJcclxuICAgIGNvbnNvbGUuaW5mbyhcIlJlcXVldGUgZGUgbCdBUEkgd2ViOiBcIiArIGFkcmVzc2UpXHJcbiAgICByZXF1ZXN0KHsgdXJsOiBhZHJlc3NlLCBtZXRob2Q6IFwiUE9TVFwiLCBqc29uOiByZW5jb250cmUgfSwgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSwgcmVuY29udHJlcykge1xyXG4gICAgICBpZiAoIWVycm9yICYmIHJlc3BvbnNlLnN0YXR1c0NvZGUgPT0gMjAxKSB7XHJcbiAgICAgICAgLy8gQ2FsY3VsIGRlIGwnaWRlbnRpZmlhbnQgZGUgbGEgbm91dmVsbGUgcmVuY29udHJlXHJcbiAgICAgICAgbGV0IFssIGlkXSA9IC9eXFwvYXBpXFwvcmVuY29udHJlc1xcLyguKikkLy5leGVjKHJlc3BvbnNlLmhlYWRlcnMubG9jYXRpb24pO1xyXG4gICAgICAgIC8vIGxldCBpZCA9IHJlc3BvbnNlLmhlYWRlcnMubG9jYXRpb24ucmVwbGFjZShuZXcgUmVnRXhwKFwiL2FwaVxcL3JlbmNvbnRyZVxcLyguKilcIiksIFwiJDFcIilcclxuICAgICAgICBjb25zb2xlLmluZm8oXCJpZDogXCIgKyBpZClcclxuICAgICAgICByZW5jb250cmUuaWQgPSBpZFxyXG4gICAgICAgIGNvbnNvbGUuaW5mbyhcIlJlbmNvbnRyZTogXCIgKyBKU09OLnN0cmluZ2lmeShyZW5jb250cmUpKVxyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcclxuICAgICAgICAgIHR5cGU6IHR5cGVzLlBPU1RfUkVOQ09OVFJFX1NVQ0NFU1MsXHJcbiAgICAgICAgICByZW5jb250cmU6IHJlbmNvbnRyZVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLnByb3BzLm1vZGVBam91dCA/XHJcbiAgICAgICAgPFJlbmNvbnRyZUFqb3V0XHJcbiAgICAgICAgICByZW5jb250cmU9e3RoaXMucHJvcHMucmVuY29udHJlfVxyXG4gICAgICAgICAgYWpvdXRSZW5jb250cmU9e3RoaXMuYWpvdXRSZW5jb250cmV9IC8+XHJcbiAgICAgICAgOlxyXG4gICAgICAgIDxSZW5jb250cmVzIHJlbmNvbnRyZXM9e3RoaXMucHJvcHMucmVuY29udHJlc31cclxuICAgICAgICAgIHN1cHByaW1lUmVuY29udHJlPXt0aGlzLnN1cHByaW1lUmVuY29udHJlfVxyXG4gICAgICAgICAgYWpvdXRlclJlbmNvbnRyZT17dGhpcy5ham91dGVyUmVuY29udHJlfSAvPlxyXG4gICAgKVxyXG4gIH1cclxufSlcclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IGZ1bmN0aW9uIChzdG9yZSkge1xyXG4gIHJldHVybiB7XHJcbiAgICByZW5jb250cmVzOiBzdG9yZS5yZW5jb250cmVTdGF0ZS5yZW5jb250cmVzLFxyXG4gICAgcmVuY29udHJlOiBzdG9yZS5yZW5jb250cmVTdGF0ZS5yZW5jb250cmUsXHJcbiAgICBtb2RlQWpvdXQ6IHN0b3JlLnJlbmNvbnRyZVN0YXRlLm1vZGVBam91dFxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMpKFJlbmNvbnRyZXNDb250ZW5ldXIpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9zYW50cy9yZW5jb250cmVzLWNvbnRlbmV1ci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlcXVlc3RcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZXF1ZXN0XCJcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSBcInJlYWN0LXJvdXRlclwiXHJcbmltcG9ydCB7XHJcbiAgQXBwQmFyLFxyXG4gIENhcmQsXHJcbiAgSWNvbkJ1dHRvbixcclxuICBMaXN0LFxyXG4gIExpc3RJdGVtLFxyXG4gIEZsb2F0aW5nQWN0aW9uQnV0dG9uLFxyXG4gIFRleHRGaWVsZCxcclxuICBEYXRlUGlja2VyXHJcbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IEFjdGlvbkluZm8gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vaW5mb1wiXHJcbmltcG9ydCBGaWxlRm9sZGVyIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9mb2xkZXJcIlxyXG5pbXBvcnQgQ29udGVudEFkZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvYWRkXCJcclxuaW1wb3J0IEFjdGlvbkRlbGV0ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9kZWxldGVcIlxyXG5cclxuY29uc3QgUmVuY29udHJlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBjb250ZXh0VHlwZXM6IHtcclxuICAgIHJvdXRlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG4gIH0sXHJcbiAgcHJlcGFyYXRpb25EYXRlKGRhdGUpIHtcclxuICAgIGxldCBkYXRlUmVuY29udHJlID0gbmV3IERhdGUoZGF0ZSlcclxuICAgIGNvbnNvbGUuZGVidWcoXCJkYXRlIFJlbmNvbnRyZXM6IFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0ZVJlbmNvbnRyZSkpXHJcbiAgICBsZXQgam91ciA9IG5ldyBEYXRlKClcclxuICAgIGxldCBzdHJkYXRlID0gIWRhdGVSZW5jb250cmUgP1xyXG4gICAgICBcImRhdGUgw6AgcHLDqWNpc2VyXCIgOlxyXG4gICAgICBkYXRlUmVuY29udHJlIDwgam91ciA/XHJcbiAgICAgICAgYCR7am91ci50b0xvY2FsZURhdGVTdHJpbmcoKX1gIDpcclxuICAgICAgICBgJHtkYXRlUmVuY29udHJlLnRvTG9jYWxlRGF0ZVN0cmluZygpfSAke2RhdGVSZW5jb250cmUuZ2V0SG91cnMoKX06JHtkYXRlUmVuY29udHJlLmdldE1pbnV0ZXMoKX1gXHJcbiAgICByZXR1cm4gc3RyZGF0ZVxyXG4gIH0sXHJcbiAgem9vbShpZFJlbmNvbnRyZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZyhgT3V2ZXJ0dXJlIGRlIGxhIHJlbmNvbnRyZTogJHtpZFJlbmNvbnRyZX1gKVxyXG4gICAgdGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGAvcmVuY29udHJlcy8ke2lkUmVuY29udHJlfWApXHJcbiAgfSxcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCBwb3ViZWxsZSA9IHtcclxuICAgICAgc3R5bGU6IHtcclxuICAgICAgICB3aWR0aDogNzIsXHJcbiAgICAgICAgaGVpZ2h0OiA3MixcclxuICAgICAgICBwYWRkaW5nOiAyMCxcclxuICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgcmlnaHQ6IDBcclxuICAgICAgfSxcclxuICAgICAgaWNvbjoge1xyXG4gICAgICAgIHdpZHRoOiAzNixcclxuICAgICAgICBoZWlnaHQ6IDM2LFxyXG4gICAgICAgIGNvbG9yOiBcInJnYigwLCAxODgsIDIxMilcIlxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBzdHlsZSA9IHtcclxuICAgICAgbWFyZ2luUmlnaHQ6IDIwXHJcbiAgICB9XHJcbiAgICBjb25zdCBzdHlsZVJlbmNvbnRyZSA9IHtcclxuICAgICAgdGV4dERlY29yYXRpb246ICdub25lJ1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8QXBwQmFyIHRpdGxlPVwiQkFTS09SRVwiXHJcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLmxpc3RlclJlbmNvbnRyZXN9XHJcbiAgICAgICAgICBpY29uQ2xhc3NOYW1lUmlnaHQ9XCJtdWlkb2NzLWljb24tbmF2aWdhdGlvbi1leHBhbmQtbW9yZVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbG90dGFudFwiPlxyXG4gICAgICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b24gc3R5bGU9e3N0eWxlfVxyXG4gICAgICAgICAgICAgIG9uTW91c2VEb3duPXt0aGlzLnByb3BzLmFqb3V0ZXJSZW5jb250cmV9PlxyXG4gICAgICAgICAgICAgIDxDb250ZW50QWRkIC8+XHJcbiAgICAgICAgICAgIDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L0FwcEJhcj5cclxuICAgICAgICA8Q2FyZD5cclxuICAgICAgICAgIDxMaXN0IGlkPVwicmVuY29udHJlc1wiID5cclxuICAgICAgICAgICAge3RoaXMucHJvcHMucmVuY29udHJlcy5tYXAocmVuY29udHJlID0+IHtcclxuICAgICAgICAgICAgICBsZXQgc3RyZGF0ZSA9IHRoaXMucHJlcGFyYXRpb25EYXRlKHJlbmNvbnRyZS5kYXRlKVxyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8TGlzdEl0ZW1cclxuICAgICAgICAgICAgICAgICAga2V5PXtyZW5jb250cmUuaWR9XHJcbiAgICAgICAgICAgICAgICAgIHByaW1hcnlUZXh0PXtyZW5jb250cmUuaG90ZS5ub20gKyAnLScgKyByZW5jb250cmUudmlzaXRldXIubm9tfVxyXG4gICAgICAgICAgICAgICAgICBzZWNvbmRhcnlUZXh0PXtzdHJkYXRlfVxyXG4gICAgICAgICAgICAgICAgICBvblRvdWNoVGFwPXt0aGlzLnpvb20uYmluZCh0aGlzLCByZW5jb250cmUuaWQpfVxyXG4gICAgICAgICAgICAgICAgICByaWdodEljb25CdXR0b249e1xyXG4gICAgICAgICAgICAgICAgICAgIDxJY29uQnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17cG91YmVsbGUuc3R5bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICBpY29uU3R5bGU9e3BvdWJlbGxlLmljb259XHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLnN1cHByaW1lUmVuY29udHJlLmJpbmQobnVsbCwgcmVuY29udHJlLmlkKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8QWN0aW9uRGVsZXRlIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9JY29uQnV0dG9uPn1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8TGluayB0bz17XCIvcmVuY29udHJlcy9cIiArIHJlbmNvbnRyZS5pZH0gLz5cclxuICAgICAgICAgICAgICAgIDwvTGlzdEl0ZW0+XHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICAgIDwvTGlzdD5cclxuICAgICAgICA8L0NhcmQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufSlcclxuZXhwb3J0IGRlZmF1bHQgUmVuY29udHJlcztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvc2FudHMvcmVuY29udHJlcy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibWF0ZXJpYWwtdWlcIlxuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9pbmZvXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9pbmZvXCJcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZvbGRlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZvbGRlclwiXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGRcIlxuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9kZWxldGVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2RlbGV0ZVwiXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtcclxuICBBcHBCYXIsXHJcbiAgQ2FyZCxcclxuICBJY29uQnV0dG9uLFxyXG4gIENhcmRUZXh0LFxyXG4gIFRpbWVQaWNrZXIsXHJcbiAgVGV4dEZpZWxkLFxyXG4gIERhdGVQaWNrZXJcclxufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQgTmF2aWdhdGlvbkFycm93QmFjayBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vYXJyb3ctYmFja1wiXHJcbmltcG9ydCBDbG9zZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vY2xvc2VcIlxyXG5cclxuY29uc3QgUmVuY29udHJlQWpvdXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgbGV0IHJlbmNvbnRyZSA9IHRoaXMucHJvcHMucmVuY29udHJlXHJcbiAgICByZXR1cm4geyBkYXRlOiBuZXcgRGF0ZSgpLCBwZXJpb2RlOiAxLCBob3RlOiByZW5jb250cmUuaG90ZS5ub20sIHZpc2l0ZXVyOiByZW5jb250cmUudmlzaXRldXIubm9tIH1cclxuICB9LFxyXG4gIG1hakRhdGUoeCwgZGF0ZSkge1xyXG4gICAgbGV0IGRhdGVTdGF0ZSA9IHRoaXMuc3RhdGUuZGF0ZVxyXG4gICAgZGF0ZVN0YXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkpXHJcbiAgICBkYXRlU3RhdGUuc2V0TW9udGgoZGF0ZS5nZXRNb250aCgpKVxyXG4gICAgZGF0ZVN0YXRlLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSlcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBkYXRlOiBkYXRlU3RhdGUgfSlcclxuICAgIGNvbnNvbGUuZGVidWcoXCJBam91dCBkYXRlOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUpKVxyXG4gIH0sXHJcbiAgbWFqSGV1cmUoeCwgaGV1cmUpIHtcclxuICAgIGxldCBkYXRlU3RhdGUgPSB0aGlzLnN0YXRlLmRhdGVcclxuICAgIGRhdGVTdGF0ZS5zZXRIb3VycyhoZXVyZS5nZXRIb3VycygpKVxyXG4gICAgZGF0ZVN0YXRlLnNldE1pbnV0ZXMoaGV1cmUuZ2V0TWludXRlcygpKVxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGRhdGU6IGRhdGVTdGF0ZSB9KVxyXG4gICAgY29uc29sZS5kZWJ1ZyhcIkFqb3V0IGhldXJlOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUpKVxyXG4gIH0sXHJcbiAgbWFqSG90ZShlKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgaG90ZTogZS50YXJnZXQudmFsdWUgfSlcclxuICAgIGNvbnNvbGUuZGVidWcoXCJBam91dCBob3RlOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUpKVxyXG4gIH0sXHJcbiAgbWFqVmlzaXRldXIoZSkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHZpc2l0ZXVyOiBlLnRhcmdldC52YWx1ZSB9KVxyXG4gICAgY29uc29sZS5kZWJ1ZyhcIkFqb3V0IHZpc2l0ZXVyOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUpKVxyXG4gIH0sXHJcbiAgc2F1dmVyKCkge1xyXG4gICAgLy8gbGV0IGRhdGUgPSB0aGlzLnN0YXRlLmRhdGVcclxuICAgIC8vIGxldCBzdHJkYXRlID0gZGF0ZS5nZXREYXRlKCkgKyBcIi1cIiArIGRhdGUuZ2V0TW9udGgoKSArIFwiLVwiICsgZGF0ZS5nZXRGdWxsWWVhcigpXHJcbiAgICAvLyB0aGlzLnN0YXRlLmRhdGUgPSBzdHJkYXRlXHJcbiAgICB0aGlzLnByb3BzLmFqb3V0UmVuY29udHJlKHRoaXMuc3RhdGUpXHJcbiAgfSxcclxuICBhbm51bGVyKCkge1xyXG4gICAgdGhpcy5wcm9wcy5ham91dFJlbmNvbnRyZShudWxsKVxyXG4gIH0sXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8QXBwQmFyIHRpdGxlPVwiQWpvdXRlciByZW5jb250cmVcIlxyXG4gICAgICAgICAgaWNvbkVsZW1lbnRMZWZ0PXs8SWNvbkJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNhdXZlcn0+PE5hdmlnYXRpb25BcnJvd0JhY2sgLz48L0ljb25CdXR0b24+fVxyXG4gICAgICAgICAgaWNvbkVsZW1lbnRSaWdodD17PEljb25CdXR0b24gb25DbGljaz17dGhpcy5hbm51bGVyfT48Q2xvc2UgLz48L0ljb25CdXR0b24+fVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8Q2FyZD5cclxuICAgICAgICAgIDxDYXJkVGV4dD5cclxuICAgICAgICAgICAgPERhdGVQaWNrZXIgZmxvYXRpbmdMYWJlbFRleHQ9XCJEYXRlIGRlIGxhIHJlbmNvbnRyZVwiXHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMubWFqRGF0ZX0gLz5cclxuICAgICAgICAgICAgPFRpbWVQaWNrZXIgZmxvYXRpbmdMYWJlbFRleHQ9XCJIZXVyZSBkZSBsYSByZW5jb250cmVcIlxyXG4gICAgICAgICAgICAgIGZvcm1hdD1cIjI0aHJcIlxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm1hakhldXJlfSAvPlxyXG4gICAgICAgICAgICA8VGV4dEZpZWxkIGZsb2F0aW5nTGFiZWxUZXh0PVwiQ2x1YiBob3RlXCJcclxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMucmVuY29udHJlLmhvdGUubm9tfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm1hakhvdGV9IC8+XHJcbiAgICAgICAgICAgIDxUZXh0RmllbGQgZmxvYXRpbmdMYWJlbFRleHQ9XCJDbHViIHZpc2l0ZXVyXCJcclxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMucmVuY29udHJlLnZpc2l0ZXVyLm5vbX1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5tYWpWaXNpdGV1cn0gLz5cclxuICAgICAgICAgIDwvQ2FyZFRleHQ+XHJcbiAgICAgICAgPC9DYXJkPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZW5jb250cmVBam91dFxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9zYW50cy9yZW5jb250cmVzLWFqb3V0LmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vYXJyb3ctYmFja1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL2Fycm93LWJhY2tcIlxuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vY2xvc2VcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9jbG9zZVwiXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEltbXV0YWJsZSBmcm9tIFwiaW1tdXRhYmxlXCJcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcbmltcG9ydCBzdG9yZSBmcm9tIFwiLi4vc3RvcmVcIlxyXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vYWN0aW9ucy9hY3Rpb25zLXR5cGVzXCJcclxuaW1wb3J0IHJlcXVlc3QgZnJvbSBcInJlcXVlc3RcIlxyXG5pbXBvcnQgaW8gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIlxyXG5pbXBvcnQgUmVuY29udHJlIGZyb20gXCIuL3JlbmNvbnRyZVwiXHJcblxyXG5sZXQgUmVuY29udHJlQ29udGVuZXVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgIHZhciBhZHJlc3NlID0gbG9jYXRpb24uaHJlZlxyXG4gICAgY29uc29sZS5pbmZvKFwiQWRyZXNzZSB3ZWIgc29ja2V0OiBcIiArIGFkcmVzc2UpXHJcbiAgICB0aGlzLnNvY2tldCA9IGlvKGFkcmVzc2UpXHJcbiAgICB0aGlzLnNvY2tldC5vbihcImNvbm5lY3RcIiwgdGhpcy5jb25uZXhpb25UYWJsZU1hcnF1ZSlcclxuICB9LFxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgY29uc3QgaWRSZW5jb250cmUgPSB0aGlzLnByb3BzLnJlbmNvbnRyZS5pZFxyXG4gICAgY29uc29sZS5pbmZvKFwiRmVybWV0dXJlIHRhYmxlYXUgcmVuY29udHJlIFwiICsgaWRSZW5jb250cmUpXHJcbiAgICB0aGlzLnNvY2tldC5lbWl0KFwiZmVybWVyUmVuY29udHJlXCIsIGlkUmVuY29udHJlKVxyXG4gIH0sXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICBjb25zdCBpZFJlbmNvbnRyZSA9IHRoaXMucHJvcHMucGFyYW1zLmlkUmVuY29udHJlXHJcbiAgICB0aGlzLnNvY2tldC5lbWl0KFwib3V2cmlyUmVuY29udHJlXCIsIGlkUmVuY29udHJlKVxyXG4gICAgbGV0IGFkcmVzc2UgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3QgKyBcIi9hcGkvcmVuY29udHJlcy9cIiArIGlkUmVuY29udHJlXHJcbiAgICBjb25zb2xlLmluZm8oXCJSZXF1ZXRlIGRlIGwnQVBJIHdlYjogXCIgKyBhZHJlc3NlKVxyXG4gICAgcmVxdWVzdChhZHJlc3NlLCBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlLCByZW5jb250cmUpIHtcclxuICAgICAgaWYgKCFlcnJvciAmJiByZXNwb25zZS5zdGF0dXNDb2RlID09IDIwMCkge1xyXG4gICAgICAgIGxldCBvUmVuY29udHJlID0gSlNPTi5wYXJzZShyZW5jb250cmUpXHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goe1xyXG4gICAgICAgICAgdHlwZTogdHlwZXMuR0VUX1JFTkNPTlRSRV9TVUNDRVNTLFxyXG4gICAgICAgICAgcmVuY29udHJlOiBvUmVuY29udHJlXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGNvbm5leGlvblRhYmxlTWFycXVlKCkge1xyXG4gICAgY29uc29sZS5pbmZvKFwiQ29ubmVjdMOpIGF2ZWMgbGEgdGFibGUgZGUgbWFycXVlXCIpXHJcbiAgICBjb25zdCBpZFJlbmNvbnRyZSA9IHRoaXMucHJvcHMucGFyYW1zLmlkUmVuY29udHJlXHJcbiAgICAvLyBjb25zb2xlLmluZm8oXCJJZGVudGlmaWFudCByZW5jb250cmU6IFwiICsgaWRSZW5jb250cmUpXHJcbiAgICB0aGlzLnNvY2tldC5lbWl0KFwib3V2cmlyUmVuY29udHJlXCIsIGlkUmVuY29udHJlKVxyXG4gICAgdGhpcy5zb2NrZXQub24oXCJub3V2ZWxsZUluZm9cIiwgdGhpcy5zdXJSZWNlcHRpb25Ob3V2ZWxsZUluZm8pXHJcbiAgfSxcclxuICBzdXJSZWNlcHRpb25Ob3V2ZWxsZUluZm8ocmVuY29udHJlKSB7XHJcbiAgICAvLyBjb25zb2xlLmRlYnVnKFwiUmVjZXB0aW9uIGQndW5lIG5vdXZlbGxlIGluZm8gcHJvdmVuYW50IGR1IHNlcnZldXI6IFwiICsgSlNPTi5zdHJpbmdpZnkocmVuY29udHJlKSlcclxuICAgIHN0b3JlLmRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogdHlwZXMuTk9VVkVMTEVfSU5GTyxcclxuICAgICAgcmVuY29udHJlOiByZW5jb250cmVcclxuICAgIH0pXHJcbiAgfSxcclxuICBzdXJOb3V2ZWxsZU1hcnF1ZShyZW5jb250cmUpIHtcclxuICAgIHRoaXMuc29ja2V0LmVtaXQoJ3Bhbmllck1hcnF1ZScsIHRoaXMucHJvcHMucmVuY29udHJlKVxyXG4gIH0sXHJcbiAgc3VyTm91dmVhdUNvbW1lbnRhaXJlKGNvbW1lbnRhaXJlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKGBDb21tZW50YWlyZTogJHtjb21tZW50YWlyZX1gKVxyXG4gICAgdGhpcy5zb2NrZXQuZW1pdChcIm5vdXZlYXVDb21tZW50YWlyZVwiLCB7XHJcbiAgICAgIFwiaWRSZW5jb250cmVcIjogdGhpcy5wcm9wcy5wYXJhbXMuaWRSZW5jb250cmUsXHJcbiAgICAgIFwiY29tbWVudGFpcmVcIjogY29tbWVudGFpcmVcclxuICAgIH0pXHJcbiAgICBzdG9yZS5kaXNwYXRjaCh7XHJcbiAgICAgIHR5cGU6IHR5cGVzLkNPTU1FTlRBSVJFX1BPU1QsXHJcbiAgICAgIGNvbW1lbnRhaXJlOiBjb21tZW50YWlyZVxyXG4gICAgfSlcclxuICAgIHRoaXMuc29ja2V0Lm9uKFwibm91dmVhdUNvbW1lbnRhaXJlXCIsICgpPT5cclxuICAgIHN0b3JlLmRpc3BhdGNoKHtcclxuICAgICAgdHlwZTogdHlwZXMuQ09NTUVOVEFJUkVfTk9VVkVBVSxcclxuICAgICAgY29tbWVudGFpcmU6IGNvbW1lbnRhaXJlXHJcbiAgICB9KSlcclxuICB9LFxyXG4gIHN1clBlcmlvZGUocGVyaW9kZSkge1xyXG4gICAgLy8gbGV0IHJlbmNvbnRyZSA9IHRoaXMucHJvcHMucmVuY29udHJlXHJcbiAgICAvLyByZW5jb250cmUucGVyaW9kZSA9IHBlcmlvZGVcclxuICAgIGNvbnNvbGUuZGVidWcoXCJOb3V2ZWxsZSBwZXJpb2RlOiBcIiArIEpTT04uc3RyaW5naWZ5KHBlcmlvZGUpKVxyXG4gICAgc3RvcmUuZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiB0eXBlcy5OT1VWRUxMRSxcclxuICAgICAgcGVyaW9kZTogcGVyaW9kZVxyXG4gICAgfSlcclxuICB9LFxyXG4gIHNhdXZlcihpbmZvcykge1xyXG4gICAgbGV0IHN0ckluZm8gPSBKU09OLnN0cmluZ2lmeShpbmZvcylcclxuICAgIGNvbnNvbGUuZGVidWcoYFJlbmNvbnRyZSBjb250KHNhdXZlcik6ICR7c3RySW5mb31gKVxyXG4gICAgbGV0IHJlbmNvbnRyZSA9IEltbXV0YWJsZS5mcm9tSlModGhpcy5wcm9wcy5yZW5jb250cmUpXHJcbiAgICAgIC5zZXQoXCJkYXRlXCIsaW5mb3MuZGF0ZSlcclxuICAgICAgLnNldChcInBlcmlvZGVcIixpbmZvcy5wZXJpb2RlKVxyXG4gICAgICAuc2V0KFwiaG90ZS5ub21cIixpbmZvcy5ob3RlKVxyXG4gICAgICAuc2V0KFwidmlzaXRldXIubm9tXCIsaW5mb3MudmlzaXRldXIpXHJcbiAgICAvLyByZW5jb250cmUuaG90ZS5ub20gPSBpbmZvcy5ob3RlXHJcbiAgICB2YXIgYWRyZXNzZSA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdCArIFwiL2FwaS9yZW5jb250cmVzL1wiICsgdGhpcy5wcm9wcy5yZW5jb250cmUuaWRcclxuICAgIGNvbnNvbGUuZGVidWcoYHJlbmNvbnRyZS5kYXRlOiAke3JlbmNvbnRyZS5kYXRlfWApXHJcbiAgICBjb25zb2xlLmluZm8oXCJSZXF1ZXRlIGRlIGwnQVBJIHdlYjogXCIgKyBhZHJlc3NlKVxyXG4gICAgcmVxdWVzdCh7IHVybDogYWRyZXNzZSwgbWV0aG9kOiBcIlBVVFwiLCBqc29uOiByZW5jb250cmUgfSwgZnVuY3Rpb24gKGVycm9yLCByZXNwb25zZSwgcmVuY29udHJlKSB7XHJcbiAgICAgIGlmICghZXJyb3IgJiYgcmVzcG9uc2Uuc3RhdHVzQ29kZSA9PSAyMDApIHtcclxuICAgICAgICBjb25zb2xlLmluZm8oXCJSZW5jb250cmUgbW9kaWZpw6llIDpcIiArIEpTT04uc3RyaW5naWZ5KHJlbmNvbnRyZSkpXHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goe1xyXG4gICAgICAgICAgdHlwZTogdHlwZXMuUFVUX1JFTkNPTlRSRV9TVUNDRVNTLFxyXG4gICAgICAgICAgcmVuY29udHJlOiByZW5jb250cmVcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgZWRpdGVyKCkge1xyXG4gICAgc3RvcmUuZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiB0eXBlcy5FRElURVJfUkVOQ09OVFJFXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgc3VyVmVycm91aWxsYWdlKCkge1xyXG4gICAgc3RvcmUuZGlzcGF0Y2goe1xyXG4gICAgICB0eXBlOiB0eXBlcy5WRVJST1VJTExBR0VcclxuICAgIH0pXHJcbiAgfSxcclxuICByZW5kZXIoKSB7XHJcbiAgICAvLyBjb25zb2xlLmRlYnVnKGBOb3V2ZWxsZSByZW5jb250cmVgICsgSW1tdXRhYmxlLmZyb21KUyh0aGlzLnByb3BzLnJlbmNvbnRyZSkpXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAhdGhpcy5wcm9wcy5yZW5jb250cmUgPyBudWxsIDpcclxuICAgICAgICA8UmVuY29udHJlXHJcbiAgICAgICAgICByZW5jb250cmU9e3RoaXMucHJvcHMucmVuY29udHJlfVxyXG4gICAgICAgICAgc3VyTm91dmVsbGVNYXJxdWU9e3RoaXMuc3VyTm91dmVsbGVNYXJxdWV9XHJcbiAgICAgICAgICBzdXJQZXJpb2RlPXt0aGlzLnN1clBlcmlvZGV9XHJcbiAgICAgICAgICBlZGl0ZXI9e3RoaXMuZWRpdGVyfVxyXG4gICAgICAgICAgc2F1dmVyPXt0aGlzLnNhdXZlcn1cclxuICAgICAgICAgIHN1ck5vdXZlYXVDb21tZW50YWlyZT17dGhpcy5zdXJOb3V2ZWF1Q29tbWVudGFpcmV9XHJcbiAgICAgICAgICBtb2RlRWRpdGlvbj17dGhpcy5wcm9wcy5tb2RlRWRpdGlvbn1cclxuICAgICAgICAgIG1vZGVWZXJyb3VpbGxlPXt0aGlzLnByb3BzLm1vZGVWZXJyb3VpbGxlfVxyXG4gICAgICAgICAgc3VyVmVycm91aWxsYWdlPXt0aGlzLnN1clZlcnJvdWlsbGFnZX0gLz5cclxuICAgIClcclxuICB9XHJcbn0pXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IGZ1bmN0aW9uIChzdG9yZSkge1xyXG4gIGNvbnNvbGUuZGVidWcoXCJNb2RpZmljYXRpb24gZGVzIHByb3ByacOpdMOpcy5cIilcclxuICByZXR1cm4ge1xyXG4gICAgcmVuY29udHJlOiBzdG9yZS5yZW5jb250cmVTdGF0ZS5yZW5jb250cmUsXHJcbiAgICBtb2RlRWRpdGlvbjogc3RvcmUucmVuY29udHJlU3RhdGUubW9kZUVkaXRpb24sXHJcbiAgICBtb2RlVmVycm91aWxsZTogc3RvcmUucmVuY29udHJlU3RhdGUubW9kZVZlcnJvdWlsbGVcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShSZW5jb250cmVDb250ZW5ldXIpXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb3NhbnRzL3JlbmNvbnRyZS1jb250ZW5ldXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW8tY2xpZW50XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwic29ja2V0LmlvLWNsaWVudFwiXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEltbXV0YWJsZSBmcm9tIFwiaW1tdXRhYmxlXCJcclxuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlcidcclxuaW1wb3J0IHtcclxuICBBcHBCYXIsXHJcbiAgQ2FyZCxcclxuICBJY29uQnV0dG9uLFxyXG4gIFRvZ2dsZSxcclxuICBDYXJkVGV4dCxcclxuICBUaW1lUGlja2VyLFxyXG4gIFRleHRGaWVsZCxcclxuICBEYXRlUGlja2VyXHJcbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IE5hdmlnYXRpb25BcnJvd0JhY2sgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL2Fycm93LWJhY2tcIlxyXG5pbXBvcnQgTW9kZUVkaXQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvbW9kZS1lZGl0XCJcclxuaW1wb3J0IFRhYmxlYXUgZnJvbSBcIi4vdGFibGVhdVwiXHJcbmltcG9ydCBDb21tZW50YWlyZXMgZnJvbSBcIi4vY29tbWVudGFpcmVzXCJcclxuXHJcbmNvbnN0IFJlbmNvbnRyZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICBsZXQgcmVuY29udHJlID0gdGhpcy5wcm9wcy5yZW5jb250cmVcclxuICAgIGxldCBkYXRlID0gcmVuY29udHJlLmRhdGUgPyByZW5jb250cmUuZGF0ZSA6IG5ldyBEYXRlKClcclxuICAgIHJldHVybiB7IGRhdGU6IGRhdGUsIGhvdGU6IHJlbmNvbnRyZS5ob3RlLm5vbSwgdmlzaXRldXI6IHJlbmNvbnRyZS52aXNpdGV1ci5ub20gfVxyXG4gIH0sXHJcbiAgbWFqRGF0ZSh4LCBkYXRlKSB7XHJcbiAgICBsZXQgZGF0ZVN0YXRlID0gdGhpcy5zdGF0ZS5kYXRlXHJcbiAgICBkYXRlU3RhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSlcclxuICAgIGRhdGVTdGF0ZS5zZXRNb250aChkYXRlLmdldE1vbnRoKCkpXHJcbiAgICBkYXRlU3RhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpKVxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGRhdGU6IGRhdGVTdGF0ZSB9KVxyXG4gICAgY29uc29sZS5kZWJ1ZyhcIk1BSiBkYXRlOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUpKVxyXG4gIH0sXHJcbiAgbWFqSGV1cmUoeCwgaGV1cmUpIHtcclxuICAgIGxldCBkYXRlU3RhdGUgPSBuZXcgRGF0ZSh0aGlzLnByb3BzLnJlbmNvbnRyZS5kYXRlKVxyXG4gICAgZGF0ZVN0YXRlLnNldEhvdXJzKGhldXJlLmdldEhvdXJzKCkgKyAyKVxyXG4gICAgZGF0ZVN0YXRlLnNldE1pbnV0ZXMoaGV1cmUuZ2V0TWludXRlcygpKVxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGRhdGU6IGRhdGVTdGF0ZSB9KVxyXG4gICAgY29uc29sZS5kZWJ1ZyhcIk1BSiBoZXVyZTogXCIgKyBKU09OLnN0cmluZ2lmeShkYXRlU3RhdGUpKVxyXG4gIH0sXHJcbiAgbWFqSG90ZShlKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgaG90ZTogZS50YXJnZXQudmFsdWUgfSlcclxuICAgIC8vIGNvbnNvbGUuZGVidWcoXCJNQUogSG90ZTogXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKSlcclxuICB9LFxyXG4gIG1halZpc2l0ZXVyKGUpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyB2aXNpdGV1cjogZS50YXJnZXQudmFsdWUgfSlcclxuICAgIC8vIGNvbnNvbGUuZGVidWcoXCJNQUogdmlzaXRldXI6IFwiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZSkpXHJcbiAgfSxcclxuICBzYXV2ZXIoKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKGBSZW5jb250cmUoc2F1dmVyKS5gKVxyXG4gICAgdGhpcy5wcm9wcy5zYXV2ZXIodGhpcy5zdGF0ZSlcclxuICB9LFxyXG4gIHJlbmRlcigpIHtcclxuICAgIC8vIGNvbnNvbGUuZGVidWcoYE5vdXZlbGxlIHJlbmNvbnRyZWAgKyBJbW11dGFibGUuZnJvbUpTKHRoaXMucHJvcHMucmVuY29udHJlKSlcclxuICAgIGNvbnN0IHN0eWxlID0ge1xyXG4gICAgICBjb2xvcjogXCJ3aGl0ZVwiXHJcbiAgICB9XHJcbiAgICBsZXQgbGFiZWxCb3V0b24gPSB0aGlzLnByb3BzLm1vZGVFZGl0aW9uID8gXCJTYXV2ZXJcIiA6IFwiRWRpdGlvblwiXHJcbiAgICBsZXQgZGF0ZSA9IHRoaXMucHJvcHMucmVuY29udHJlLmRhdGUgPyBuZXcgRGF0ZSh0aGlzLnByb3BzLnJlbmNvbnRyZS5kYXRlKSA6IG5ldyBEYXRlKClcclxuICAgIGNvbnNvbGUuZGVidWcoYHRlc3Q6ICR7ZGF0ZX1gKVxyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMubW9kZUVkaXRpb24gPyAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPEFwcEJhclxyXG4gICAgICAgICAgdGl0bGU9XCJFZGl0aW9uIHJlbmNvbnRyZVwiXHJcbiAgICAgICAgICBpY29uRWxlbWVudExlZnQ9e1xyXG4gICAgICAgICAgICA8SWNvbkJ1dHRvbiBvbkNsaWNrPXt0aGlzLnNhdXZlcn0+XHJcbiAgICAgICAgICAgICAgPE5hdmlnYXRpb25BcnJvd0JhY2sgLz5cclxuICAgICAgICAgICAgPC9JY29uQnV0dG9uPlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8Q2FyZD5cclxuICAgICAgICAgIDxDYXJkVGV4dD5cclxuICAgICAgICAgICAgPERhdGVQaWNrZXIgZmxvYXRpbmdMYWJlbFRleHQ9XCJEYXRlIGRlIGxhIHJlbmNvbnRyZVwiXHJcbiAgICAgICAgICAgICAgZGVmYXVsdERhdGU9e2RhdGV9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMubWFqRGF0ZX0gLz5cclxuICAgICAgICAgICAgPFRpbWVQaWNrZXIgZmxvYXRpbmdMYWJlbFRleHQ9XCJIZXVyZSBkZSBsYSByZW5jb250cmVcIlxyXG4gICAgICAgICAgICAgIGRlZmF1bHRUaW1lPXtkYXRlfVxyXG4gICAgICAgICAgICAgIGZvcm1hdD1cIjI0aHJcIlxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm1hakhldXJlfSAvPlxyXG4gICAgICAgICAgICA8VGV4dEZpZWxkIGZsb2F0aW5nTGFiZWxUZXh0PVwiQ2x1YiBIb3RlXCJcclxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMucmVuY29udHJlLmhvdGUubm9tfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm1hakhvdGV9IC8+PGJyIC8+XHJcbiAgICAgICAgICAgIDxUZXh0RmllbGQgZmxvYXRpbmdMYWJlbFRleHQ9XCJDbHViIFZpc2l0ZXVyXCJcclxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMucmVuY29udHJlLnZpc2l0ZXVyLm5vbX1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5tYWpWaXNpdGV1cn0gLz5cclxuICAgICAgICAgICAgPFRvZ2dsZVxyXG4gICAgICAgICAgICAgIGRlZmF1bHRUb2dnbGVkPXt0aGlzLnByb3BzLm1vZGVWZXJyb3VpbGxlfSBcclxuICAgICAgICAgICAgICBvblRvZ2dsZT17dGhpcy5wcm9wcy5zdXJWZXJyb3VpbGxhZ2V9XHJcbiAgICAgICAgICAgICAgbGFiZWw9XCJWZXJyb3VpbGzDqVwiIC8+XHJcbiAgICAgICAgICA8L0NhcmRUZXh0PlxyXG4gICAgICAgIDwvQ2FyZD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApIDogKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8QXBwQmFyIHRpdGxlPVwiUmVuY29udHJlXCJcclxuICAgICAgICAgICAgaWNvbkVsZW1lbnRMZWZ0PXtcclxuICAgICAgICAgICAgICA8TGluayB0bz1cIi9yZW5jb250cmVzXCI+XHJcbiAgICAgICAgICAgICAgICA8SWNvbkJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBpY29uU3R5bGU9e3N0eWxlfT5cclxuICAgICAgICAgICAgICAgICAgPE5hdmlnYXRpb25BcnJvd0JhY2sgLz5cclxuICAgICAgICAgICAgICAgIDwvSWNvbkJ1dHRvbj5cclxuICAgICAgICAgICAgICA8L0xpbms+fVxyXG4gICAgICAgICAgICBpY29uRWxlbWVudFJpZ2h0PXtcclxuICAgICAgICAgICAgICA8SWNvbkJ1dHRvblxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5lZGl0ZXJ9XHJcbiAgICAgICAgICAgICAgICBpY29uU3R5bGU9e3N0eWxlfT5cclxuICAgICAgICAgICAgICAgIDxNb2RlRWRpdCAvPlxyXG4gICAgICAgICAgICAgIDwvSWNvbkJ1dHRvbj5cclxuICAgICAgICAgICAgfSAvPlxyXG4gICAgICAgICAgPFRhYmxlYXVcclxuICAgICAgICAgICAgcmVuY29udHJlPXt0aGlzLnByb3BzLnJlbmNvbnRyZX1cclxuICAgICAgICAgICAgc3VyTm91dmVsbGVNYXJxdWU9e3RoaXMucHJvcHMuc3VyTm91dmVsbGVNYXJxdWV9XHJcbiAgICAgICAgICAgIHN1clBlcmlvZGU9e3RoaXMucHJvcHMuc3VyUGVyaW9kZX1cclxuICAgICAgICAgICAgbW9kZVZlcnJvdWlsbGU9e3RoaXMucHJvcHMubW9kZVZlcnJvdWlsbGV9IC8+XHJcbiAgICAgICAgICA8Q29tbWVudGFpcmVzXHJcbiAgICAgICAgICAgIHJlbmNvbnRyZT17dGhpcy5wcm9wcy5yZW5jb250cmV9XHJcbiAgICAgICAgICAgIHN1ck5vdXZlYXVDb21tZW50YWlyZT17dGhpcy5wcm9wcy5zdXJOb3V2ZWF1Q29tbWVudGFpcmV9XHJcbiAgICAgICAgICAgIG1vZGVWZXJyb3VpbGxlPXt0aGlzLnByb3BzLm1vZGVWZXJyb3VpbGxlfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApXHJcbiAgfVxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVuY29udHJlXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb3NhbnRzL3JlbmNvbnRyZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvbW9kZS1lZGl0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9tb2RlLWVkaXRcIlxuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBNYXJxdWUgZnJvbSBcIi4vdGFibGVhdS1tYXJxdWUuanNcIlxyXG5pbXBvcnQgRXF1aXBlIGZyb20gXCIuL3RhYmxlYXUtZXF1aXBlLmpzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBzdXJQYW5pZXJIb3RlKCkge1xyXG4gICAgLy8gY29uc29sZS5pbmZvKFwiUGFuaWVyIG1hcnF1ZTogXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BzLnJlbmNvbnRyZS5ob3RlLm1hcnF1ZSkpXHJcbiAgICBsZXQgbWFycXVlID0gdGhpcy5wcm9wcy5yZW5jb250cmUuaG90ZS5tYXJxdWVcclxuICAgIHRoaXMucHJvcHMucmVuY29udHJlLmhvdGUubWFycXVlID0gbWFycXVlICsgMVxyXG4gICAgLy8gdGhpcy5zb2NrZXQuZW1pdCgncGFuaWVyTWFycXVlJywgdGhpcy5wcm9wcy5yZW5jb250cmUpXHJcbiAgICB0aGlzLnByb3BzLnN1ck5vdXZlbGxlTWFycXVlKClcclxuICB9LFxyXG4gIHN1clBhbmllclZpc2l0ZXVyKCkge1xyXG4gICAgLy8gY29uc29sZS5pbmZvKFwiUGFuaWVyIG1hcnF1ZTogXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BzLnJlbmNvbnRyZS52aXNpdGV1ci5tYXJxdWUpKVxyXG4gICAgbGV0IG1hcnF1ZSA9IHRoaXMucHJvcHMucmVuY29udHJlLnZpc2l0ZXVyLm1hcnF1ZVxyXG4gICAgdGhpcy5wcm9wcy5yZW5jb250cmUudmlzaXRldXIubWFycXVlID0gbWFycXVlICsgMVxyXG4gICAgLy8gdGhpcy5zb2NrZXQuZW1pdCgncGFuaWVyTWFycXVlJywgdGhpcy5wcm9wcy5yZW5jb250cmUpXHJcbiAgICB0aGlzLnByb3BzLnN1ck5vdXZlbGxlTWFycXVlKClcclxuICB9LFxyXG4gIHN1ckNvcnJlY3Rpb25Ib3RlKCkge1xyXG4gICAgLy8gY29uc29sZS5pbmZvKFwiQ29ycmVjdGlvbiBkZSBsYSBtYXJxdWVcIik7XHJcbiAgICBsZXQgbWFycXVlID0gdGhpcy5wcm9wcy5yZW5jb250cmUuaG90ZS5tYXJxdWVcclxuICAgIHRoaXMucHJvcHMucmVuY29udHJlLmhvdGUubWFycXVlID0gbWFycXVlIC0gMVxyXG4gICAgLy8gdGhpcy5zb2NrZXQuZW1pdCgncGFuaWVyTWFycXVlJywgdGhpcy5wcm9wcy5yZW5jb250cmUpXHJcbiAgICB0aGlzLnByb3BzLnN1ck5vdXZlbGxlTWFycXVlKClcclxuICB9LFxyXG4gIHN1ckNvcnJlY3Rpb25WaXNpdGV1cigpIHtcclxuICAgIC8vIGNvbnNvbGUuaW5mbyhcIkNvcnJlY3Rpb24gZGUgbGEgbWFycXVlXCIpXHJcbiAgICBsZXQgbWFycXVlID0gdGhpcy5wcm9wcy5yZW5jb250cmUudmlzaXRldXIubWFycXVlXHJcbiAgICB0aGlzLnByb3BzLnJlbmNvbnRyZS52aXNpdGV1ci5tYXJxdWUgPSBtYXJxdWUgLSAxXHJcbiAgICAvLyB0aGlzLnNvY2tldC5lbWl0KCdwYW5pZXJNYXJxdWUnLCB0aGlzLnByb3BzLnJlbmNvbnRyZSlcclxuICAgIHRoaXMucHJvcHMuc3VyTm91dmVsbGVNYXJxdWUoKVxyXG4gIH0sXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgLy8gdGhpcy5vdXZlcnR1cmVSZW5jb250cmUodGhpcy5wcm9wcy5yZW5jb250cmUuaWQpXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGlkPVwidGFibGVhdVwiPlxyXG4gICAgICAgIDxFcXVpcGVcclxuICAgICAgICAgIG5vbT17dGhpcy5wcm9wcy5yZW5jb250cmUuaG90ZS5ub219XHJcbiAgICAgICAgICBzdXJQYW5pZXI9e3RoaXMuc3VyUGFuaWVySG90ZX1cclxuICAgICAgICAgIG1vZGVWZXJyb3VpbGxlPXt0aGlzLnByb3BzLm1vZGVWZXJyb3VpbGxlfSAvPlxyXG4gICAgICAgIDxNYXJxdWVcclxuICAgICAgICAgIHJlbmNvbnRyZT17dGhpcy5wcm9wcy5yZW5jb250cmV9XHJcbiAgICAgICAgICBzdXJQZXJpb2RlPXt0aGlzLnByb3BzLnN1clBlcmlvZGV9XHJcbiAgICAgICAgICBzdXJDb3JyZWN0aW9uSG90ZT17dGhpcy5zdXJDb3JyZWN0aW9uSG90ZX1cclxuICAgICAgICAgIHN1ckNvcnJlY3Rpb25WaXNpdGV1cj17dGhpcy5zdXJDb3JyZWN0aW9uVmlzaXRldXJ9XHJcbiAgICAgICAgICBtb2RlVmVycm91aWxsZT17dGhpcy5wcm9wcy5tb2RlVmVycm91aWxsZX0gLz5cclxuICAgICAgICA8RXF1aXBlXHJcbiAgICAgICAgICBub209e3RoaXMucHJvcHMucmVuY29udHJlLnZpc2l0ZXVyLm5vbX1cclxuICAgICAgICAgIHN1clBhbmllcj17dGhpcy5zdXJQYW5pZXJWaXNpdGV1cn1cclxuICAgICAgICAgIG1vZGVWZXJyb3VpbGxlPXt0aGlzLnByb3BzLm1vZGVWZXJyb3VpbGxlfSAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn0pXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9zYW50cy90YWJsZWF1LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7XHJcbiAgRmxhdEJ1dHRvblxyXG59IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXJxdWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHN1clBlcmlvZGUocGVyaW9kZSkge1xyXG4gICAgdGhpcy5wcm9wcy5zdXJQZXJpb2RlKHBlcmlvZGUpXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHN0eWxlID0ge1xyXG4gICAgICBtaW5XaWR0aDogXCIyZW1cIixcclxuICAgICAgaGVpZ2h0OiBcIjEuNWVtXCJcclxuICAgIH1cclxuICAgIGNvbnN0IGxhYmVsU3R5bGUgPSB7XHJcbiAgICAgIGZvbnRTaXplOiBcIjEuM2VtXCIsXHJcbiAgICAgIHBhZGRpbmdMZWZ0OiBcIjBcIixcclxuICAgICAgcGFkZGluZ1JpZ2h0OiBcIjBcIlxyXG4gICAgfVxyXG4gICAgLy8gY29uc29sZS5kZWJ1ZyhcIkNvbnRlbmV1cjQuXCIpXHJcbiAgICAvLyBjb25zb2xlLmRlYnVnKFwiUmVuY29udHJlOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMucHJvcHMucmVuY29udHJlKSlcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgaWQ9XCJtYXJxdWVcIj5cclxuICAgICAgICA8ZGl2IGlkPVwicGVyaW9kZXNcIj57XHJcbiAgICAgICAgICBbMSwgMiwgMywgNF0ubWFwKHBlcmlvZGUgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc3R5bGVQZXJpb2RlID0ge1xyXG4gICAgICAgICAgICAgIG1pbldpZHRoOiBcIjBcIixcclxuICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiBcIjEuM2VtXCIsXHJcbiAgICAgICAgICAgICAgaGVpZ2h0OiBcIjEuM2VtXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgc3R5bGVMYWJlbFBlcmlvZGUgPSB7XHJcbiAgICAgICAgICAgICAgZm9udFNpemU6IFwiMWVtXCIsXHJcbiAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IFwiMC41ZW1cIixcclxuICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IFwiMC41ZW1cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBlcmlvZGUgPT0gdGhpcy5wcm9wcy5yZW5jb250cmUucGVyaW9kZSA/XHJcbiAgICAgICAgICAgICAgc3R5bGVMYWJlbFBlcmlvZGUuY29sb3IgPSBcInJlZFwiIDpcclxuICAgICAgICAgICAgICBzdHlsZUxhYmVsUGVyaW9kZS5jb2xvciA9IFwid2hpdGVcIlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvdWxldXI6IFwiICsgSlNPTi5zdHJpbmdpZnkoc3R5bGUpKVxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxGbGF0QnV0dG9uXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwZXJpb2RlXCJcclxuICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZVBlcmlvZGV9XHJcbiAgICAgICAgICAgICAgICBsYWJlbFN0eWxlPXtzdHlsZUxhYmVsUGVyaW9kZX1cclxuICAgICAgICAgICAgICAgIGtleT17cGVyaW9kZX1cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc3VyUGVyaW9kZS5iaW5kKHRoaXMsIHBlcmlvZGUpfVxyXG4gICAgICAgICAgICAgICAgbGFiZWw9e1wiUFwiICsgcGVyaW9kZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgaWQ9XCJjb21wdGV1cnNcIj5cclxuICAgICAgICAgIDxGbGF0QnV0dG9uXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImhvdGVcIlxyXG4gICAgICAgICAgICBzdHlsZT17c3R5bGV9XHJcbiAgICAgICAgICAgIGxhYmVsU3R5bGU9e2xhYmVsU3R5bGV9XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMuc3VyQ29ycmVjdGlvbkhvdGV9XHJcbiAgICAgICAgICAgIGxhYmVsPXt0aGlzLnByb3BzLnJlbmNvbnRyZS5ob3RlLm1hcnF1ZS50b1N0cmluZygpfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPEZsYXRCdXR0b25cclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidmlzaXRldXJcIlxyXG4gICAgICAgICAgICBzdHlsZT17c3R5bGV9XHJcbiAgICAgICAgICAgIGxhYmVsU3R5bGU9e2xhYmVsU3R5bGV9XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMuc3VyQ29ycmVjdGlvblZpc2l0ZXVyfVxyXG4gICAgICAgICAgICBsYWJlbD17dGhpcy5wcm9wcy5yZW5jb250cmUudmlzaXRldXIubWFycXVlLnRvU3RyaW5nKCl9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvc2FudHMvdGFibGVhdS1tYXJxdWUuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEltbXV0YWJsZSBmcm9tIFwiaW1tdXRhYmxlXCJcclxuaW1wb3J0IHtJY29uTWVudSwgU2VsZWN0RmllbGQsIE1lbnVJdGVtfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXF1aXBlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCBzdHlsZUpvdWV1c2VzID0ge1xyXG4gICAgICBkaXNwbGF5OiBcImZsZXhcIixcclxuICAgICAgZmxleERpcmVjdGlvbjogXCJyb3dcIixcclxuICAgICAgZmxleFdyYXA6IFwid3JhcFwiLFxyXG4gICAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcclxuICAgICAgYm9yZGVyQ29sb3I6IFwicmVkXCJcclxuICAgIH1cclxuICAgIGxldCBpZD0xXHJcbiAgICBjb25zdCBqb3VldXNlcyA9IEltbXV0YWJsZVxyXG4gICAgICAuTGlzdFxyXG4gICAgICAub2YoNCwgMTAsIDE0LCA2LCAxMSlcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXF1aXBlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub21cIj57dGhpcy5wcm9wcy5ub219PC9kaXY+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGhpcy5wcm9wcy5tb2RlVmVycm91aWxsZVxyXG4gICAgICAgICAgPyA8aW1nIGNsYXNzTmFtZT1cImJsYXNvblwiIHNyYz1cImltZy9iYWxsb242LnBuZ1wiPjwvaW1nPlxyXG4gICAgICAgICAgOiA8aW1nIG9uQ2xpY2s9e3RoaXMucHJvcHMuc3VyUGFuaWVyfSBjbGFzc05hbWU9XCJibGFzb25cIiBzcmM9XCJpbWcvYmFsbG9uNi5wbmdcIj48L2ltZz5cclxuICAgICAgICB9XHJcbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVKb3VldXNlc30+e2pvdWV1c2VzLm1hcChqb3VldXNlID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuICg8Sm91ZXVzZSBrZXk9e2lkKyt9IG51bWVybz17am91ZXVzZX0vPilcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2RpdiA+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBKb3VldXNlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBzdXJDaGFuZ2VtZW50KHNvciwgZW50KSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKGBDaGFuZ2VtZW50ICR7c29yfSBwb3VyICR7ZW50fWApXHJcbiAgfVxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IG51bSA9IHRoaXMucHJvcHMubnVtZXJvXHJcbiAgICBjb25zdCBldG9pbGUgPSBgL2pvdWV1c2VzL2pvdWV1c2UtJHtudW19LnBuZ2BcclxuICAgIGNvbnN0IHN0eWxlID0ge1xyXG4gICAgICB3aWR0aDogXCIyZW1cIixcclxuICAgICAgaGVpZ2h0OiBcIjJlbVwiLFxyXG4gICAgICBtYXhXaWR0aDogXCI0MHB4XCIsXHJcbiAgICAgIG1heEhlaWd0aDogXCI0MHB4XCJcclxuICAgIH1cclxuICAgIGxldCBpZD0xXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8SWNvbk1lbnVcclxuICAgICAgICBsaXN0U3R5bGU9e3tiYWNrZ3JvdW5kQ29sb3I6XCJibGV1XCJ9fVxyXG4gICAgICAgIHN0eWxlPXt7YmFja2dyb3VuZENvbG9yOlwiYmxldVwifX1cclxuICAgICAgICBpY29uQnV0dG9uRWxlbWVudD17PGltZyBzdHlsZT17c3R5bGV9IHNyYz17ZXRvaWxlfSAvPn0gPlxyXG4gICAgICAgICAge0ltbXV0YWJsZVxyXG4gICAgICAgICAgICAuTGlzdFxyXG4gICAgICAgICAgICAub2YoNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0KVxyXG4gICAgICAgICAgICAubWFwKGVudHJhbnQgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiAoPE1lbnVJdGVtXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzXHJcbiAgICAgICAgICAgICAgICAgIC5zdXJDaGFuZ2VtZW50XHJcbiAgICAgICAgICAgICAgICAgIC5iaW5kKHRoaXMsIG51bSwgZW50cmFudCl9XHJcbiAgICAgICAgICAgICAgICBrZXk9e2lkKyt9XHJcbiAgICAgICAgICAgICAgICBpbm5lckRpdlN0eWxlPXt7Y29sb3I6XCJyZWRcIixiYWNrZ3JvdW5kQ29sb3I6XCJibGV1XCIsIHdpZHRoOlwiMmVtXCJ9fVxyXG4gICAgICAgICAgICAgICAgbmVzdGVkTGlzdFN0eWxlPXt7YmFja2dyb3VuZENvbG9yOlwiYmxldVwiLCB3aWR0aDpcIjJlbVwifX1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7YmFja2dyb3VuZENvbG9yOlwiYmxldVwifX1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXtlbnRyYW50fVxyXG4gICAgICAgICAgICAgICAgcHJpbWFyeVRleHQ9e2VudHJhbnR9Lz4pXHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICA8L0ljb25NZW51PlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgRXRvaWxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCBudW0gPSB0aGlzLnByb3BzLm51bWVyb1xyXG4gICAgY29uc3QgZXRvaWxlID0gYC9qb3VldXNlcy9qb3VldXNlLSR7bnVtfS5wbmdgXHJcbiAgICBjb25zdCBzdHlsZSA9IHtcclxuICAgICAgd2lkdGg6IFwiMmVtXCIsXHJcbiAgICAgIGhlaWdodDogXCIyZW1cIlxyXG4gICAgfVxyXG4gICAgcmV0dXJuICg8aW1nIHN0eWxlPXtzdHlsZX0gc3JjPXtldG9pbGV9Lz4pXHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBKb3VldXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHN0eWxlSm91ZXVzZSA9IHtcclxuICAgICAgd2lkdGg6IFwiMmVtXCIsXHJcbiAgICAgIGJvcmRlckNvbG9yOiBcIndoaXRlXCJcclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxTZWxlY3RGaWVsZFxyXG4gICAgICAgIGNsYXNzTmFtZT1cImpvdWV1c2VcIlxyXG4gICAgICAgIHN0eWxlPXtzdHlsZUpvdWV1c2V9XHJcbiAgICAgICAgYXV0b1dpZHRoPVwidHJ1ZVwiXHJcbiAgICAgICAgdmFsdWU9XCI0XCI+XHJcbiAgICAgICAgPE1lbnVJdGVtIHZhbHVlPVwiNFwiIHByaW1hcnlUZXh0PVwiNFwiLz5cclxuICAgICAgICA8TWVudUl0ZW0gdmFsdWU9XCI1XCIgcHJpbWFyeVRleHQ9XCI1XCIvPlxyXG4gICAgICAgIDxNZW51SXRlbSB2YWx1ZT1cIjZcIiBwcmltYXJ5VGV4dD1cIjZcIi8+XHJcbiAgICAgICAgPE1lbnVJdGVtIHZhbHVlPVwiN1wiIHByaW1hcnlUZXh0PVwiN1wiLz5cclxuICAgICAgICA8TWVudUl0ZW0gdmFsdWU9XCI4XCIgcHJpbWFyeVRleHQ9XCI4XCIvPlxyXG4gICAgICAgIDxNZW51SXRlbSB2YWx1ZT1cIjlcIiBwcmltYXJ5VGV4dD1cIjlcIi8+XHJcbiAgICAgICAgPE1lbnVJdGVtIHZhbHVlPVwiMTBcIiBwcmltYXJ5VGV4dD1cIjEwXCIvPlxyXG4gICAgICAgIDxNZW51SXRlbSB2YWx1ZT1cIjExXCIgcHJpbWFyeVRleHQ9XCIxMVwiLz5cclxuICAgICAgICA8TWVudUl0ZW0gdmFsdWU9XCIxMlwiIHByaW1hcnlUZXh0PVwiMTJcIi8+XHJcbiAgICAgICAgPE1lbnVJdGVtIHZhbHVlPVwiMTNcIiBwcmltYXJ5VGV4dD1cIjEzXCIvPlxyXG4gICAgICAgIDxNZW51SXRlbSB2YWx1ZT1cIjE0XCIgcHJpbWFyeVRleHQ9XCIxNFwiLz5cclxuICAgICAgPC9TZWxlY3RGaWVsZD5cclxuICAgIClcclxuICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9zYW50cy90YWJsZWF1LWVxdWlwZS5qcyIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgSW1tdXRhYmxlIGZyb20gXCJpbW11dGFibGVcIlxyXG5pbXBvcnQge1xyXG4gIENhcmQsXHJcbiAgQ2FyZFRleHQsXHJcbiAgVGV4dEZpZWxkLFxyXG4gIExpc3QsXHJcbiAgTGlzdEl0ZW0sXHJcbiAgSWNvbkJzdXR0b24sXHJcbiAgRmxhdEJ1dHRvbixcclxuICBUaW1lUGlja2VyLFxyXG4gIERhdGVQaWNrZXJcclxufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQgRG9uZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9kb25lXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBub3V2ZWF1QyhlKSB7XHJcbiAgICAvLyBjb25zb2xlLmRlYnVnKFwiQ29tbWVudGFpcmU6IFwiICsgZS50YXJnZXQudmFsdWUpXHJcbiAgICB0aGlzLnNldFN0YXRlKHtjb21tZW50YWlyZTogZS50YXJnZXQudmFsdWV9KVxyXG4gIH0sXHJcbiAgc3VyTm91dmVhdUNvbW1lbnRhaXJlKCkge1xyXG4gICAgLy8gY29uc29sZS5kZWJ1ZyhcIkNvbW1lbnRhaXJlOiBcIiArIHRoaXMuc3RhdGUuY29tbWVudGFpcmUpXHJcbiAgICB0aGlzXHJcbiAgICAgIC5wcm9wc1xyXG4gICAgICAuc3VyTm91dmVhdUNvbW1lbnRhaXJlKHRoaXMuc3RhdGUuY29tbWVudGFpcmUpXHJcbiAgfSxcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKGBDb21tZW50YWlyZXM6IGAgKyBJbW11dGFibGUuTGlzdCh0aGlzLnByb3BzLnJlbmNvbnRyZS5jb21tZW50YWlyZXMpLnRvSlNPTigpKVxyXG4gICAgbGV0IGlkID0gMFxyXG4gICAgY29uc3Qgc3R5bGVGbGV4ID0ge1xyXG4gICAgICBkaXNwbGF5OiBcImZsZXhcIlxyXG4gICAgfVxyXG4gICAgY29uc3Qgc3R5bGVFbGVtZW50ID0ge1xyXG4gICAgICBmb250U2l6ZTogXCIwLjhlbVwiLFxyXG4gICAgICBwYWRkaW5nTGVmdDogXCIwLjhlbVwiLFxyXG4gICAgICBwYWRkaW5nUmlnaHQ6IFwiMC44ZW1cIixcclxuICAgICAgcGFkZGluZ1RvcDogXCIwLjNlbVwiLFxyXG4gICAgICBwYWRkaW5nQm90dG9tOiBcIjAuM2VtXCJcclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxDYXJkPlxyXG4gICAgICAgIHt0aGlzLnByb3BzLm1vZGVWZXJyb3VpbGxlXHJcbiAgICAgICAgICA/IG51bGxcclxuICAgICAgICAgIDogPGRpdiBzdHlsZT17c3R5bGVGbGV4fT5cclxuICAgICAgICAgICAgPFRleHRGaWVsZFxyXG4gICAgICAgICAgICAgIGhpbnRUZXh0PVwiQWpvdXRlciB1biBjb21tZW50YWlyZVwiXHJcbiAgICAgICAgICAgICAgbXVsdGlMaW5lPXt0cnVlfVxyXG4gICAgICAgICAgICAgIHJvd3NNYXg9ezJ9XHJcbiAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxyXG4gICAgICAgICAgICAgIG1heExlbmd0aD1cIjE0MFwiXHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMubm91dmVhdUN9Lz5cclxuICAgICAgICAgICAgPEZsYXRCdXR0b24gb25DbGljaz17dGhpcy5zdXJOb3V2ZWF1Q29tbWVudGFpcmV9IGljb249ezwgRG9uZSAvPn0vPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbn1cclxuICAgICAgICA8TGlzdCBzdHlsZT17e1xyXG4gICAgICAgICAgcGFkZGluZzogXCIwcHhcIlxyXG4gICAgICAgIH19PlxyXG4gICAgICAgICAge0ltbXV0YWJsZVxyXG4gICAgICAgICAgICAuTGlzdCh0aGlzLnByb3BzLnJlbmNvbnRyZS5jb21tZW50YWlyZXMpXHJcbiAgICAgICAgICAgIC5yZXZlcnNlKClcclxuICAgICAgICAgICAgLm1hcChjb21tZW50YWlyZSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGNvbW1lbnRhaXJlLnZhbGlkZVxyXG4gICAgICAgICAgICAgICAgPyAoPExpc3RJdGVtXHJcbiAgICAgICAgICAgICAgICAgIGtleT17aWQrK31cclxuICAgICAgICAgICAgICAgICAgcHJpbWFyeVRleHQ9e2NvbW1lbnRhaXJlLmNvbW1lbnRhaXJlfVxyXG4gICAgICAgICAgICAgICAgICBpbm5lckRpdlN0eWxlPXtzdHlsZUVsZW1lbnR9Lz4pXHJcbiAgICAgICAgICAgICAgICA6ICg8TGlzdEl0ZW1cclxuICAgICAgICAgICAgICAgICAga2V5PXtpZCsrfVxyXG4gICAgICAgICAgICAgICAgICBwcmltYXJ5VGV4dD17Y29tbWVudGFpcmUuY29tbWVudGFpcmV9XHJcbiAgICAgICAgICAgICAgICAgIHNlY29uZGFyeVRleHQ9XCJFbnJlZ2lzdHJlbWVudCBlbiBjb3Vycy4uLlwiXHJcbiAgICAgICAgICAgICAgICAgIGlubmVyRGl2U3R5bGU9e3N0eWxlRWxlbWVudH0vPilcclxuICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudFxyXG4gICAgICAgICAgICB9KVxyXG59XHJcbiAgICAgICAgPC9MaXN0PlxyXG4gICAgICA8L0NhcmQ+XHJcbiAgICApXHJcbiAgfVxyXG59KVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9zYW50cy9jb21tZW50YWlyZXMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2RvbmVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2RvbmVcIlxuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWF0ZXJpYWwtdWkvc3R5bGVzL011aVRoZW1lUHJvdmlkZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJtYXRlcmlhbC11aS9zdHlsZXMvTXVpVGhlbWVQcm92aWRlclwiXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC10YXAtZXZlbnQtcGx1Z2luXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtdGFwLWV2ZW50LXBsdWdpblwiXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9