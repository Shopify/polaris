import {mount, ReactWrapper, CommonWrapper} from 'enzyme';
import type {ReactElement} from 'react';
import {act} from 'react-dom/test-utils';

import {get} from '../utilities/get';
import translations from '../../locales/en.json';
import {
  PolarisTestProvider,
  WithPolarisTestProviderOptions,
} from '../components';

export {ReactWrapper, act};

type AnyWrapper = ReactWrapper<any, any> | CommonWrapper<any, any>;

export function findByTestID(root: ReactWrapper<any, any>, id: string) {
  function hasTestID(wrapper: ReactWrapper<any, any>) {
    return wrapper.length > 0 && wrapper.prop('testID') === id;
  }

  return root.findWhere(hasTestID).first();
}

const reactAct = act as (func: () => void | Promise<void>) => Promise<void>;

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

  let returnValue: any;

  const promise = reactAct(() => {
    // eslint-disable-next-line node/callback-return, node/no-callback-literal
    returnValue = callback(...args);

    // The return type of non-async `act()`, DebugPromiseLike, contains a `then` method
    // This condition checks the returned value is an actual Promise and returns it
    // to React’s `act()` call, otherwise we just want to return `undefined`
    if (isPromise(returnValue)) {
      return (returnValue as unknown) as Promise<void>;
    }
  });

  if (isPromise(returnValue)) {
    return Promise.resolve(promise as Promise<any>).then((ret) => {
      updateRoot(wrapper);
      return ret;
    });
  }

  updateRoot(wrapper);

  return returnValue;
}

function isPromise<T>(promise: T | Promise<T>): promise is Promise<T> {
  return (
    promise != null && typeof promise === 'object' && 'then' in (promise as any)
  );
}

function updateRoot(wrapper: AnyWrapper) {
  (wrapper as any).root().update();
}

export function mountWithAppProvider<P>(
  node: ReactElement<P>,
  context: WithPolarisTestProviderOptions = {},
) {
  return mount<P>(node, {
    wrappingComponent: PolarisTestProvider,
    wrappingComponentProps: {i18n: translations, ...context},
  });
}
