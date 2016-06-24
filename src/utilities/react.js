import {isValidElement, Children} from 'react';
import {render, unmountComponentAtNode} from 'react-dom';

export function elementChildren(children, predicate = () => true) {
  return Children.toArray(children).filter((child) => isValidElement(child) && predicate(child));
}

export function augmentComponent(Component, methods) {
  for (const [name, method] of Object.entries(methods)) {
    const currentMethod = Component.prototype[name];

    Component.prototype[name] = function(...args) {
      if (typeof currentMethod === 'function') { currentMethod.apply(this, ...args); }
      method.apply(this, ...args);
    };
  }

  return Component;
}

let layerIndex = 1;
export function layeredComponent({idPrefix = 'Layer'}) {
  function uniqueID() {
    return `${idPrefix}${layerIndex++}`;
  }

  return function createLayeredComponent(Component) {
    return augmentComponent(Component, {
      componentWillMount() {
        const node = document.createElement('div');
        node.id = uniqueID();
        this.layerNode = node;
      },

      componentDidMount() {
        document.body.appendChild(this.layerNode);
        this.renderLayerToNode();
      },

      componentDidUpdate() {
        this.renderLayerToNode();
      },

      renderLayerToNode() {
        render(this.renderLayer(), this.layerNode);
      },

      componentWillUnmount() {
        const {layerNode} = this;
        const {parent} = layerNode;

        unmountComponentAtNode(layerNode);
        if (parent) { parent.removeChild(layerNode); }
      },
    });
  };
}
