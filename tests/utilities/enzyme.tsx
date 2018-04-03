import {ReactWrapper, CommonWrapper, shallow, mount, ShallowWrapper, MountRendererProps, ShallowRendererProps} from 'enzyme';
import * as React from 'react';
import get from 'lodash/get';
import merge from 'lodash/merge';

import {createPolarisContext} from '../../src/components/AppProvider';

export type AnyWrapper = ReactWrapper<any, any> | CommonWrapper<any, any>;

export function findByTestID(root: ReactWrapper<any, any>, id: string) {
  function hasTestID(wrapper: ReactWrapper<any, any>) {
    return wrapper.length > 0 && wrapper.prop('testID') === id;
  }

  const rootResult = root.findWhere(hasTestID).first();

  return rootResult.length > 0
    ? rootResult
    : layeredContent(root)
        .findWhere(hasTestID)
        .first();
}

export function matchByTestID(root: ReactWrapper<any, any>, regexp: RegExp) {
  function matchesTestID(wrapper: ReactWrapper<any, any>) {
    const id = wrapper.prop('testID');
    return typeof id === 'string' && regexp.test(id);
  }

  return root.findWhere(matchesTestID);
}

export function trigger(wrapper: AnyWrapper, keypath: string, ...args: any[]) {
  if (wrapper.length === 0) {
    throw new Error(
      [
        `You tried to trigger ${keypath} on a React wrapper with no matching nodes.`,
        'This generally happens because you have either filtered your React components incorrectly,',
        'or the component you are looking for is not rendered because of the props on your component,',
        'or there is some error during one of your component’s render methods.',
      ].join(' '),
    );
  }

  const props = wrapper.props();
  const callback = get(props, keypath);

  if (callback == null) {
    throw new Error(
      `No callback found at keypath '${keypath}'. Available props: ${Object.keys(
        props,
      ).join(', ')}`,
    );
  }

  const returnValue = callback(...args);
  updateRoot(wrapper);

  if (returnValue instanceof Promise) {
    return returnValue.then((ret) => {
      updateRoot(wrapper);
      return ret;
    });
  }

  return returnValue;
}

/**
 * This is needed for updating the enzyme wrapper and react instance when we deeply change the context.
 * root.update() should work, but it doesn't currently (see https://github.com/airbnb/enzyme/issues/1329).
 */
export function forceUpdate(root: AnyWrapper) {
  getInstance(root).forceUpdate();
  root.update();
}

export function layeredContent(root: ReactWrapper<any, any>) {
  const node = getInstance(root);
  if (!node) {
    return new ReactWrapper<any, any>([]);
  }

  const environment = {
    childContextTypes: node.constructor.childContextTypes,
    context: root.prop('context'),
  };

  const layeredChildren = root.findWhere((wrapper: ReactWrapper<any, any>) => {
    if (wrapper.length === 0) {
      return false;
    }
    const wrapperNode = getInstance(wrapper);
    return Boolean(wrapperNode && wrapperNode.renderLayer != null);
  }) as any;

  return layeredChildren.flatMap((wrapper: ReactWrapper<any, any>) => {
    let nodeJSX = getInstance(wrapper).renderLayer();

    if (Array.isArray(nodeJSX)) {
      // We need this wrapping div because Enzyme expects a single node, not an array.
      nodeJSX = <div>{nodeJSX}</div>;
    }

    return nodeJSX
      ? new ReactWrapper<any, any>(nodeJSX, undefined, environment)
      : wrapper;
  });
}

export interface ReactWrapperPredicate {
  (wrapper: ReactWrapper<any, any>): boolean,
}

export function findWhereInLayeredContent(
  root: ReactWrapper<any, any>,
  predicate: ReactWrapperPredicate,
) {
  return layeredContent(root).findWhere(predicate);
}

function getInstance(wrapper: AnyWrapper) {
  const enzymeInstance = wrapper.instance() as any;
  const adaptorInstance = enzymeInstance && enzymeInstance._reactInternalFiber;
  return adaptorInstance && adaptorInstance.stateNode;
}

function updateRoot(wrapper: AnyWrapper) {
  (wrapper as any).root().update();
}

function mergeProviderOptions(options: any = {}): any {
  const context = createPolarisContext();

  return merge(merge({}, {context}, options));
}

export function mountWithProvider<P>(node: React.ReactElement<P>, options?: MountRendererProps): ReactWrapper<P, any> {
  return mount(
    node,
    mergeProviderOptions(options),
  );
}

export function shallowWithProvider<P>(node: React.ReactElement<P>, options?: ShallowRendererProps): ShallowWrapper<P, any> {
  return shallow(
    node,
    mergeProviderOptions(options),
  ).dive(options);
}
