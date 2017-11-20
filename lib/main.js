const DomNodeCollection = require("./dom_node_collection");

const docReadyCallbacks = [];
let docReady = false;

window.$c = (arg) => {
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
  if (!docReady) {
    docReadyCallbacks.push(func);
  } else {
    func();
  }
};

$c.extend = function(arg1,...args) {
  return Object.assign(arg1, ...args);
};

$c.ajax = function(options) {
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
    const req = new XMLHttpRequest();
    req.open(params.method, params.url);
    req.setRequestHeader('Content-Type', params.contentType);

    req.onload = function(data) {
      params.success(JSON.parse(data.currentTarget.response));
      resolve(JSON.parse(data.currentTarget.response));
    };
    req.onerror = () => {
      params.error();
      reject();
    };
    req.send(params.data);
  });

};

const makeQueryString = (obj) => {
  let query = "";
  for (const prop in obj){
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      query += `${prop}=${obj[prop]}&`;
    }
  }
  return query.substring(0, query.length - 1);
};

const queueFunction = (fn) => {
  if(docReady) {
    docReadyFunctions.push(fn);
  } else{
    fn();
  }
};

document.addEventListener("DOMContentLoaded", (e) =>{
  docReady = true;
  docReadyFunctions.forEach((fn) => {
    fn();
  });
});
