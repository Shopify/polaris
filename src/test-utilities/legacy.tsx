import {ReactWrapper, CommonWrapper, mount} from 'enzyme';
import React from 'react';
import {get} from '../utilities/get';
import translations from '../../locales/en.json';

import {
  PolarisTestProvider,
  WithPolarisTestProviderOptions,
} from './PolarisTestProvider';

export type AnyWrapper = ReactWrapper<any, any> | CommonWrapper<any, any>;

export function findByTestID(root: ReactWrapper<any, any>, id: string) {
  function hasTestID(wrapper: ReactWrapper<any, any>) {
    return wrapper.length > 0 && wrapper.prop('testID') === id;
  }

  return root.findWhere(hasTestID).first();
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

  // eslint-disable-next-line callback-return
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

function updateRoot(wrapper: AnyWrapper) {
  (wrapper as any).root().update();
}

export function mountWithAppProvider<P>(
  node: React.ReactElement<P>,
  context: WithPolarisTestProviderOptions = {},
) {
  return mount<P>(node, {
    wrappingComponent: PolarisTestProvider,
    wrappingComponentProps: {i18n: translations, ...context},
  });
}
