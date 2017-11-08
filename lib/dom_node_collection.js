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
