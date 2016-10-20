// @flow

import React, {isValidElement, Children} from 'react';
import {render, unmountComponentAtNode} from 'react-dom';

export function wrapWithComponent<T>(element: ?React$Element<*>, Component: ReactClass<T>, props?: T) {
  if (element == null) { return element; }
  return isElementOfType(element, Component)
    ? element
    : <Component {...props}>{element}</Component>;
}

export function isElementOfType(element: ?React$Element<*>, Components: ReactClass<*> | ReactClass<*>[]) {
  if (element == null || !isValidElement(element) || typeof element.type === 'string') { return false; }

  const {type} = element;
  const componentArray = Array.isArray(Components) ? Components : [Components];

  return componentArray.some((Component) => Component === type);
}

export function elementChildren(
  children: mixed,
  predicate: (() => boolean) = () => true,
): React$Element<*>[] {
  return Children.toArray(children).filter((child) => isValidElement(child) && predicate(child));
}

export function augmentComponent<T>(
  Component: ReactClass<T>,
  methods: {[key: string]: (...args: any[]) => any},
): ReactClass<T> {
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
export function layeredComponent({idPrefix = 'Layer'}: {idPrefix?: string}): ReactClass<*> {
  function uniqueID() {
    return `${idPrefix}${layerIndex++}`;
  }

  return function createLayeredComponent(Component: ReactClass<*>) {
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
