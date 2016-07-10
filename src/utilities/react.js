// @flow
/* eslint shopify/require-flow: 0 */

import React, {isValidElement, Children} from 'react';
import {render, unmountComponentAtNode} from 'react-dom';

export function wrapWithComponent(element: ?React.Element, Component: ReactClass, props?: Object) {
  if (element == null) { return element; }
  return element.type === Component ? element : <Component {...props}>{element}</Component>;
}

export function elementChildren(
  children: mixed,
  predicate: (() => boolean) = () => true
): React.Element[] {
  return Children.toArray(children).filter((child) => isValidElement(child) && predicate(child));
}

export function augmentComponent(
  Component: ReactClass,
  methods: {[key: string]: Function}
): ReactClass {
  for (const [name, method] of Object.entries(methods)) {
    if (typeof method !== 'function') { continue; }

    const currentMethod = Component.prototype[name];

    Component.prototype[name] = function(...args) {
      if (typeof currentMethod === 'function') { currentMethod.apply(this, ...args); }
      method.call(this, ...args);
    };
  }

  return Component;
}

let layerIndex = 1;
export function layeredComponent({idPrefix = 'Layer'}: {idPrefix?: string}) {
  function uniqueID() {
    return `${idPrefix}${layerIndex++}`;
  }

  return function createLayeredComponent(Component: ReactClass) {
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
