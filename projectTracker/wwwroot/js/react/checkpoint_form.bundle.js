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
/******/ 		"checkpoint_form": 0
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
/******/ 	deferredModules.push(["./react/checkpoint-form.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./react/checkpoint-form.js":
/*!**********************************!*\
  !*** ./react/checkpoint-form.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _checkpoint_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./checkpoint-table */ \"./react/checkpoint-table.js\");\n/* harmony import */ var _delete_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./delete-modal */ \"./react/delete-modal.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dropdown */ \"./react/dropdown.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\n\n\nvar CheckpointForm =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(CheckpointForm, _React$Component);\n\n  function CheckpointForm(props) {\n    var _this;\n\n    _classCallCheck(this, CheckpointForm);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(CheckpointForm).call(this, props));\n\n    _this.loadItems = function () {\n      _this.setState({\n        loading: true\n      });\n\n      axios__WEBPACK_IMPORTED_MODULE_4___default.a.get(sources.checkpoints.api).then(function (res) {\n        _this.setState({\n          loading: false,\n          items: res.data\n        });\n      });\n    };\n\n    _this.loadDropdown = function () {\n      axios__WEBPACK_IMPORTED_MODULE_4___default.a.get(sources.stages.api).then(function (res) {\n        var stages = res.data.map(function (s) {\n          return {\n            id: s.id,\n            name: s.title + ' - ' + s.description\n          };\n        });\n\n        _this.setState({\n          stages: stages\n        });\n      });\n    };\n\n    _this.onSubmit = function (e) {\n      e.preventDefault();\n\n      _this.setState({\n        loading: true\n      }); //Change the http method depending if the operation is edit or save\n\n\n      var method = _this.state.editingItem == null ? 'post' : 'put';\n      var id = _this.state.editingItem !== null ? _this.state.editingItem.id : 0; //Remove object related entities\n\n      _this.state.checkpoint.stage = null;\n      axios__WEBPACK_IMPORTED_MODULE_4___default()({\n        method: method,\n        url: sources.checkpoints.api,\n        data: _this.state.checkpoint\n      }).then(function (res) {\n        _this.setState({\n          displayForm: false,\n          checkpoint: _this.emptyEntity(),\n          message: {\n            bad: false,\n            content: 'Item saved successfully'\n          }\n        });\n\n        _this.loadItems();\n      })[\"catch\"](function (err) {\n        _this.setState({\n          loading: false,\n          message: {\n            bad: true,\n            content: err.response.data\n          }\n        });\n      });\n    };\n\n    _this.onAddNew = function (e) {\n      _this.setState({\n        displayForm: true,\n        checkpoint: _this.emptyEntity(),\n        editingItem: null,\n        message: null\n      });\n    };\n\n    _this.onCancel = function (e) {\n      _this.setState({\n        displayForm: false,\n        message: null\n      });\n    };\n\n    _this.onChange = function (e) {\n      var checkpoint = _this.state.checkpoint;\n      checkpoint[e.target.name] = e.target.value;\n\n      _this.setState({\n        checkpoint: checkpoint,\n        message: null\n      });\n    };\n\n    _this.onEdit = function (item) {\n      var checkpointCopy = Object.assign({}, item);\n\n      _this.setState({\n        displayForm: true,\n        checkpoint: checkpointCopy,\n        editingItem: item,\n        message: null\n      });\n    };\n\n    _this.onDelete = function (item) {\n      _this.onCancel();\n\n      _this.deleteItem = item;\n      $('.mini.modal').modal('show');\n    };\n\n    _this.onConfirmDelete = function () {\n      _this.setState({\n        loading: true\n      });\n\n      axios__WEBPACK_IMPORTED_MODULE_4___default.a[\"delete\"](sources.checkpoints.api + '/' + _this.deleteItem.id).then(function (res) {\n        return _this.loadItems();\n      })[\"catch\"](function (err) {\n        _this.setState({\n          loading: false,\n          message: {\n            bad: true,\n            content: err.response.data\n          }\n        });\n      });\n    };\n\n    _this.state = {\n      displayForm: false,\n      items: [],\n      checkpoint: _this.emptyEntity(),\n      editingItem: null,\n      message: null,\n      stages: []\n    };\n    return _this;\n  }\n\n  _createClass(CheckpointForm, [{\n    key: \"emptyEntity\",\n    value: function emptyEntity() {\n      return {\n        description: \"\",\n        stageId: \"\"\n      };\n    }\n  }, {\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      this.loadItems();\n      this.loadDropdown();\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var showForm = this.state.displayForm;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"name-form-container\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        onClick: this.onAddNew,\n        className: \"ui positive basic button \" + (showForm ? \"hid\" : \"\")\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n        className: \"plus icon\"\n      }), \" Add new\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: this.state.loading ? \"ui active centered inline loader\" : \"\"\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n        className: showForm ? \"ui form scale-in-ver-top\" : \"ui form hid\",\n        method: \"post\",\n        onSubmit: this.onSubmit\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"field\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", null, \"Stage\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dropdown__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n        value: this.state.checkpoint.stageId,\n        name: \"stageId\",\n        placeholder: \"Select stage...\",\n        data: this.state.stages,\n        onChange: this.onChange\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"field\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", null, \"Description\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n        type: \"text\",\n        name: \"description\",\n        value: this.state.checkpoint.description,\n        onChange: this.onChange,\n        maxLength: \"200\",\n        placeholder: \"Descripion\"\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        className: \"ui positive basic button \" + (this.state.loading ? \"disabled\" : \"\"),\n        type: \"submit\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n        className: \"save icon\"\n      }), \"Save\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        className: \"ui secondary basic button\",\n        type: \"button\",\n        onClick: this.onCancel\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n        className: \"close icon\"\n      }), \"Cancel\")), this.state.message !== null ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"ui message transition \" + (this.state.message.bad ? \"negative\" : \"positive\")\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"header\"\n      }, this.state.message.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, this.state.message.content)) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_checkpoint_table__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n        items: this.state.items,\n        onEdit: this.onEdit,\n        onDelete: this.onDelete\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_delete_modal__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        onYes: this.onConfirmDelete,\n        title: \"checkpoint\",\n        content: this.deleteItem && this.deleteItem.description\n      }));\n    }\n  }]);\n\n  return CheckpointForm;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nvar sources = {\n  checkpoints: {\n    api: \"/api/checkpoint\"\n  },\n  stages: {\n    api: \"/api/stage\"\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (CheckpointForm);\nvar domContainer = document.querySelector('#checkpoint-form');\nreact_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CheckpointForm, {}), domContainer);\n\n//# sourceURL=webpack:///./react/checkpoint-form.js?");

/***/ }),

/***/ "./react/checkpoint-table.js":
/*!***********************************!*\
  !*** ./react/checkpoint-table.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\nvar CheckpointTable =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(CheckpointTable, _React$Component);\n\n  function CheckpointTable() {\n    _classCallCheck(this, CheckpointTable);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(CheckpointTable).apply(this, arguments));\n  }\n\n  _createClass(CheckpointTable, [{\n    key: \"render\",\n    value: function render() {\n      var _this = this;\n\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"table\", {\n        className: \"ui celled table\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"thead\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"tr\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"th\", null, \"Stage\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"th\", null, \"Description\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"th\", null, \"Actions\"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"tbody\", null, this.props.items.map(function (item) {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"tr\", {\n          key: item.id\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", {\n          \"data-label\": \"Stage\"\n        }, item.stage && item.stage.title + ' - ' + item.stage.description || item.stageId), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", {\n          \"data-label\": \"Description\"\n        }, item.description), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", {\n          \"data-label\": \"Actions\",\n          className: \"right collapsing aligned\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n          className: \"ui vertical primary basic animated mini button\",\n          onClick: _this.props.onEdit.bind(_this, item)\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n          className: \"hidden content\"\n        }, \"Edit\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"visible content\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n          className: \"pencil alternate icon\"\n        }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n          className: \"ui vertical negative basic animated mini button\",\n          onClick: _this.props.onDelete.bind(_this, item)\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"hidden content\"\n        }, \"Delete\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"visible content\"\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n          className: \"trash alternate icon\"\n        })))));\n      })));\n    }\n  }]);\n\n  return CheckpointTable;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (CheckpointTable);\n\n//# sourceURL=webpack:///./react/checkpoint-table.js?");

/***/ }),

/***/ "./react/delete-modal.js":
/*!*******************************!*\
  !*** ./react/delete-modal.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DeleteModal; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\nvar DeleteModal =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(DeleteModal, _React$Component);\n\n  function DeleteModal() {\n    _classCallCheck(this, DeleteModal);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(DeleteModal).apply(this, arguments));\n  }\n\n  _createClass(DeleteModal, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"ui mini delete modal transition\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"header\"\n      }, \" Delete \", this.props.title, \" \"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"content\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"Are you sure you want to delete \\xA0\", this.props.content ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        className: \"ui label\"\n      }, this.props.content) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, \"this \", this.props.title), \"?\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"actions\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"ui basic positive button\",\n        tabIndex: \"0\"\n      }, \"No\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"ui negative right labeled icon button\",\n        onClick: this.props.onYes,\n        tabIndex: \"0\"\n      }, \"Yes\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n        className: \"trash icon\"\n      }))));\n    }\n  }]);\n\n  return DeleteModal;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n\n\n//# sourceURL=webpack:///./react/delete-modal.js?");

/***/ }),

/***/ "./react/dropdown.js":
/*!***************************!*\
  !*** ./react/dropdown.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\nvar DropDown =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(DropDown, _React$Component);\n\n  function DropDown() {\n    _classCallCheck(this, DropDown);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(DropDown).apply(this, arguments));\n  }\n\n  _createClass(DropDown, [{\n    key: \"render\",\n    value: function render() {\n      var _this$props = this.props,\n          data = _this$props.data,\n          value = _this$props.value;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"select\", {\n        required: true,\n        className: \"ui search dropdown\",\n        onChange: this.props.onChange,\n        name: this.props.name,\n        value: value\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", null, this.props.placeholder), data.map(function (item) {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n          key: item.id,\n          value: item.id\n        }, item.name);\n      }));\n    }\n  }]);\n\n  return DropDown;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (DropDown);\n\n//# sourceURL=webpack:///./react/dropdown.js?");

/***/ })

/******/ });