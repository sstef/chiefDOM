/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(1);

const _docReadyCallbacks = [];
let _docReady = false;

window.$l = (arg) => {
  switch (typeof dataStructure){
    case "function":
      return registerDocReadyCallback(dataStructure);
    case "string":
      return getDomNodes(dataStructure);
    case "object":
      if (dataStructure instanceof HTMLElement) {
        return new DomNodeCollection([dataStructure]);
      }
  }
};

getDomNodes = (selector) => {
  const nodes = document.querySelectorAll(selector);
  const nodesArray = Array.from(nodes);
  return new DomNodeCollection(nodesArray);
};

registerDocReadyCallback = (func) => {
  if (!_docReady) {
    _docReadyCallbacks.push(func);
  } else {
    func();
  }
};

$l.extend = function(arg1,...args) {
  return Object.assign(arg1, ...args);
};

$l.ajax = function(options) {
  const defaults = {
    url: window.location.href,
    method: "GET",
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: () => {},
    error: () => {}
  };

  const params = $l.extend(defaults, options);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(params.method, params.url);
    xhr.setRequestHeader('Content-Type', params.contentType);

    xhr.onload = function(data) {
      params.success(JSON.parse(data.currentTarget.response));
      resolve(JSON.parse(data.currentTarget.response));
    };
    xhr.onerror = () => {
      params.error();
      reject();
    };
    xhr.send(params.data);
  });

};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DomNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(html) {
    if (typeof html === 'string') {
      this.nodes.forEach(node => {
        node.innerHTML = html;
      });
    } else if (this.nodes.length > 0) {
      return this.nodes[0].innerHTML;
    }
  }

  empty (){
    this.html('')
  }

  append (children) {
    if (this.nodes.length === 0) return;

    if (typeof children === 'object' && !(children instanceof DomNodeCollection)) {
      children = $l(children);
    }

    if (typeof children === "string") {
      this.node.forEach(node => {
        node.innerHTML += children;
      });
    } else if (children instanceof DomNodeCollection) {
      this.nodes.forEach(node => {
        children.forEach(childNode => {
          node.innerHTML += childNode;
        });
      });
    }
  }

  attr (atr, val) {
    if (val){
      this.nodes.forEach(node => {
        node.setAtribute(atr, val);
      });
    } else {
      return this.nodes[0].getAttribute(atr);
    }
  }

  addClass(newClass) {
    this.nodes.forEach(node => node.classList.add(...newClass));
  }

  removeClass(oldClass) {
    this.nodes.forEach(node => node.classList.remove(...oldClass));
  }

  children (){
    const childNodes = [];
    this.nodes.forEach(node => {
      childNodes.push(...node.children);
    });
    return new DomNodeCollection(childNodes);
  }

  parent () {
    const parentNodes = [];
    this.nodes.forEach(node => {
      parentNodes.push(node.parentNode);
    });
    return new DomNodeCollection(parentNodes);
  }

  find(arg) {
    const foundNodes = [];
    this.nodes.forEach(node => {
      foundNodes.push(...node.querySelectorAll(arg));
    });
    return new DOMNodeCollection(foundElements);
  }

  remove () {
    this.empty();
    this.nodes = [];
  }

  on (listener, callback) {
    this.nodes.each(node => {
      node.addEventListener(listener, callback);
      const listenKey = `chiefDOMEvents-${listener}`;
      if (typeof node[listenKey] === "undefined") {
        node[listenKey] = [];
      }
        node[listenKey].push(callback);
    });
  }

  off (listener) {
    this.nodes.forEach (node => {
      const listenKey = `chiefDOMEvents-${listener}`;
      if (node[listenKey]){
        node[listenKey].forEach(callback => {
          node.removeEventListener(listener,callback);
        });
      }
      node[listenKey] = [];
    });
  }


}

module.exports = DomNodeCollection;


/***/ })
/******/ ]);
//# sourceMappingURL=chiefdom.js.map