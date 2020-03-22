/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"dashboard": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./react/dashboard.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./react/add-note-modal.js":
/*!*********************************!*\
  !*** ./react/add-note-modal.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return AddNoteModal; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\nvar AddNoteModal =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(AddNoteModal, _React$Component);\n\n  function AddNoteModal(props) {\n    var _this;\n\n    _classCallCheck(this, AddNoteModal);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(AddNoteModal).call(this, props));\n\n    _this.onChange = function (e) {\n      var _this$setState;\n\n      _this.setState((_this$setState = {}, _defineProperty(_this$setState, e.target.name, e.target.value), _defineProperty(_this$setState, \"message\", null), _this$setState));\n    };\n\n    _this.onSubmit = function (e) {\n      e.preventDefault();\n      var _this$state = _this.state,\n          minutes = _this$state.minutes,\n          content = _this$state.content;\n\n      _this.props.onSave({\n        minutes: minutes,\n        content: content\n      });\n    };\n\n    _this.state = {\n      minutes: 0,\n      content: ''\n    };\n    return _this;\n  }\n\n  _createClass(AddNoteModal, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n        className: \"ui mini modal add transition form\",\n        onSubmit: this.onSubmit\n      }, \" \", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"header\"\n      }, \"Add Note\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"content\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"field\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", null, \"Content\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"textarea\", {\n        rows: \"2\",\n        name: \"content\",\n        onChange: this.onChange,\n        value: this.state.content\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"field\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", null, \"Time Spent (minutes)\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n        type: \"number\",\n        name: \"minutes\",\n        onChange: this.onChange,\n        value: this.state.minutes\n      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"actions\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"ui secondary deny basic button\",\n        tabIndex: \"0\"\n      }, \"Cancel\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        type: \"submit\",\n        className: \"ui basic positive right button\",\n        onClick: this.props.onAdd,\n        tabIndex: \"0\"\n      }, \"Save\")));\n    }\n  }]);\n\n  return AddNoteModal;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n\n\n//# sourceURL=webpack:///./react/add-note-modal.js?");

/***/ }),

/***/ "./react/button-group.js":
/*!*******************************!*\
  !*** ./react/button-group.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\nvar ButtonGroup =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(ButtonGroup, _React$Component);\n\n  function ButtonGroup(props) {\n    var _this;\n\n    _classCallCheck(this, ButtonGroup);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(ButtonGroup).call(this, props));\n\n    _this.onChange = function (item, e) {\n      _this.setState({\n        selected: item\n      });\n\n      localStorage.setItem(_this.props.id, item.id);\n\n      _this.props.onChange(item);\n    };\n\n    _this.state = {\n      selected: null\n    };\n    return _this;\n  }\n\n  _createClass(ButtonGroup, [{\n    key: \"componentDidUpdate\",\n    value: function componentDidUpdate(prevPros) {\n      //To avoid infinite rendering, update state only when new items are set\n      if (this.props.items != prevPros.items) {\n        var items = this.props.items;\n        var previousSelected = localStorage.getItem(this.props.id);\n        var selected = items[0];\n\n        if (previousSelected) {\n          selected = items.find(function (i) {\n            return i.id == previousSelected;\n          });\n        }\n\n        this.onChange(selected);\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var items = this.props.items;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"ui mini buttons\"\n      }, items.map(function (i) {\n        var _this2$state$selected;\n\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n          key: i.id,\n          onClick: _this2.onChange.bind(_this2, i),\n          className: \"ui button \" + (((_this2$state$selected = _this2.state.selected) === null || _this2$state$selected === void 0 ? void 0 : _this2$state$selected.id) == i.id ? \"active\" : \"\")\n        }, i.name);\n      }));\n    }\n  }]);\n\n  return ButtonGroup;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ButtonGroup);\n\n//# sourceURL=webpack:///./react/button-group.js?");

/***/ }),

/***/ "./react/dashboard.js":
/*!****************************!*\
  !*** ./react/dashboard.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _button_group_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./button-group.js */ \"./react/button-group.js\");\n/* harmony import */ var _add_note_modal_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./add-note-modal.js */ \"./react/add-note-modal.js\");\n/* harmony import */ var _delete_modal_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./delete-modal.js */ \"./react/delete-modal.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\n\nvar DATE_FORMAT = \"MMMM Do YYYY, h:mm:ss a\";\nvar source = {\n  campus: {\n    api: '/api/campus'\n  },\n  project: {\n    api: '/api/project/bycampus/'\n  },\n  note: {\n    api: '/api/note/'\n  }\n};\n\nvar Dashboard =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(Dashboard, _React$Component);\n\n  function Dashboard(props) {\n    var _this;\n\n    _classCallCheck(this, Dashboard);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dashboard).call(this, props));\n\n    _this.loadItems = function () {\n      axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(source.campus.api).then(function (res) {\n        _this.setState({\n          campuses: res.data\n        });\n      });\n    };\n\n    _this.addNote = function (p, e) {\n      _this.project = p;\n      $('.ui.modal.add').modal('show');\n    };\n\n    _this.onSaveNote = function (note) {\n      note.timestamp = moment().format();\n      note.projectId = _this.project.id;\n      axios__WEBPACK_IMPORTED_MODULE_2___default.a.post(source.note.api, note).then(function (res) {\n        //TODO: update UI, total time, last notes\n        // this.setState({ campuses: res.data });\n        console.log('replied');\n      });\n    };\n\n    _this.deleteNote = function (p, e) {\n      _this.project = p;\n      $('.ui.modal.delete').modal('show');\n    };\n\n    _this.onConfirmDelete = function () {\n      axios__WEBPACK_IMPORTED_MODULE_2___default.a[\"delete\"](source.note.api + _this.project.id).then(function (res) {\n        //TODO: update UI, total time, last notes\n        // this.setState({ campuses: res.data });\n        console.log('replied deleted');\n      });\n    };\n\n    _this.changeCampus = function (e) {\n      _this.setState({\n        loading: true\n      });\n\n      axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(source.project.api + e.id).then(function (res) {\n        _this.setState({\n          projects: res.data,\n          loading: false\n        });\n      });\n    };\n\n    _this.state = {\n      campuses: [],\n      projects: [],\n      loading: true\n    };\n    return _this;\n  }\n\n  _createClass(Dashboard, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      this.loadItems();\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"ui middle center aligned grid\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_button_group_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        id: \"dashboardButtons\",\n        items: this.state.campuses,\n        onChange: this.changeCampus\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"ui middle center aligned grid\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: this.state.loading ? \"ui active centered inline loader\" : \"\"\n      }), this.state.projects.length == 0 && !this.state.loading && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"ui info compact message\"\n      }, \" No active projects were found for this campus \")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"ui middle center aligned grid\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"content\"\n      }, this.state.projects.map(function (project) {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {\n          key: project.id\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"article\", {\n          className: \"project ui two column doubling stackable grid\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"column\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n          className: \"title\"\n        }, project.partner), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n          className: \"grayed\"\n        }, project.category.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n          className: \"time\"\n        }, \"Total time: \", formatTime(project.totalTime)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"status\"\n        }, \"Status: \", project.status.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"ui green progress\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"bar\",\n          style: {\n            width: '33%'\n          }\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"progress\"\n        }, \"33%\"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"section\"\n        }, \"Current checkpoint:\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, \"Stage 2 - Scoping\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n          className: \"check\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n          type: \"checkbox\",\n          value: \"\"\n        }), \"Dean Approval\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n          className: \"due-date\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n          className: \"icon calendar alternate outline\"\n        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, \"Due: 2020-03-12\")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"column\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"section\"\n        }, \"Latest Notes\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n          className: \"ui basic mini button\",\n          onClick: _this2.addNote.bind(_this2, project)\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n          className: \"plus icon\"\n        }), \" Add note\")), project.notes.map(function (note) {\n          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n            key: note.id,\n            className: \"note\"\n          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n            className: \"icon calendar alternate outline\"\n          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n            className: \"grayed\"\n          }, moment(note.timestamp).format(DATE_FORMAT), \" \"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n            className: \"icon clock outline\"\n          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n            className: \"grayed\"\n          }, \"Time spent: \", note.minutes, \" minutes.\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, note.content, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n            className: \"grayed icon trash alternate\",\n            onClick: _this2.deleteNote.bind(_this2, project),\n            title: \"Delete this note\"\n          })));\n        }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"ui divider\"\n        }));\n      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_add_note_modal_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n        onSave: this.onSaveNote\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_delete_modal_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n        onYes: this.onConfirmDelete,\n        title: \"note\"\n      }));\n    }\n  }]);\n\n  return Dashboard;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nvar formatTime = function formatTime(minutes) {\n  var hours = Math.floor(minutes / 60);\n  var remainder = minutes % 60;\n\n  if (hours > 0 && remainder > 0) {\n    return hours + 'H ' + remainder + 'M';\n  } else if (hours > 0) {\n    return hours + 'H';\n  }\n\n  return remainder + 'M';\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Dashboard);\nvar domContainer = document.querySelector('#dashboard');\nreact_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dashboard, {}), domContainer);\n\n//# sourceURL=webpack:///./react/dashboard.js?");

/***/ }),

/***/ "./react/delete-modal.js":
/*!*******************************!*\
  !*** ./react/delete-modal.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DeleteModal; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\nvar DeleteModal =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(DeleteModal, _React$Component);\n\n  function DeleteModal() {\n    _classCallCheck(this, DeleteModal);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(DeleteModal).apply(this, arguments));\n  }\n\n  _createClass(DeleteModal, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"ui mini delete modal transition\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"header\"\n      }, \" Delete \", this.props.title, \" \"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"content\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"Are you sure you want to delete \\xA0\", this.props.content ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        className: \"ui label\"\n      }, this.props.content) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, \"this \", this.props.title), \"?\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"actions\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"ui basic positive button\",\n        tabIndex: \"0\"\n      }, \"No\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"ui negative right labeled icon button\",\n        onClick: this.props.onYes,\n        tabIndex: \"0\"\n      }, \"Yes\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n        className: \"trash icon\"\n      }))));\n    }\n  }]);\n\n  return DeleteModal;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n\n\n//# sourceURL=webpack:///./react/delete-modal.js?");

/***/ })

/******/ });