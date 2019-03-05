import * as React from 'react';
import * as appBridge from '@shopify/app-bridge';
import * as redirect from '@shopify/app-bridge/client/redirect';
import {noop} from '@shopify/javascript-utilities/other';
import * as targets from '@shopify/react-utilities/target';
import createAppProviderContext, {
  setClientInterfaceHook,
} from '../createAppProviderContext';
import Intl from '../../Intl';
import Link from '../../Link';
import {StickyManager} from '../../withSticky';
import ScrollLockManager from '../../ScrollLockManager';

const actualIsServer = targets.isServer;

function mockIsServer(value: boolean) {
  (targets as any).isServer = value;
}

describe('createAppProviderContext()', () => {
  let createAppSpy: jest.SpyInstance<any>;

  beforeEach(() => {
    createAppSpy = jest
      .spyOn(appBridge, 'default');
  });

  afterEach(() => {
    mockIsServer(actualIsServer);
    createAppSpy.mockRestore();
  });

  it('returns the right context without properties', () => {
    createAppSpy.mockImplementation((args) => args);
    const context = createAppProviderContext();
    const mockContext = {
      polaris: {
        intl: new Intl(undefined),
        link: new Link(),
        stickyManager: new StickyManager(),
        scrollLockManager: new ScrollLockManager(),
        subscribe: noop,
        unsubscribe: noop,
        appBridge: undefined,
      },
    };

    expect(context).toEqual(mockContext);
  });

  it('returns the right context with properties', () => {
    createAppSpy.mockImplementation((args) => ({
      ...args,
      dispatch: () => {},
      localOrigin: '',
      featuresAvailable: () => {},
      getState: () => {},
      subscribe: () => {},
      error: () => {},
    }));

    const i18n = {
      Polaris: {
        Common: {
          undo: 'Custom Undo',
        },
      },
    };
    const CustomLinkComponent = () => {
      return <a href="test">Custom Link Component</a>;
    };
    const stickyManager = new StickyManager();
    const scrollLockManager = new ScrollLockManager();
    const apiKey = '4p1k3y';
    const context = createAppProviderContext({
      i18n,
      linkComponent: CustomLinkComponent,
      stickyManager,
      scrollLockManager,
      apiKey,
    });
    const mockContext = {
      polaris: {
        intl: new Intl(i18n),
        link: new Link(CustomLinkComponent),
        stickyManager,
        scrollLockManager,
        subscribe: noop,
        unsubscribe: noop,
        appBridge: {
          apiKey,
          forceRedirect: undefined,
          shopOrigin: undefined,
          dispatch: expect.any(Function),
          localOrigin: '',
          featuresAvailable: expect.any(Function),
          getState: expect.any(Function),
          subscribe: expect.any(Function),
          error: expect.any(Function),
        },
      },
    };

    expect(context).toEqual(mockContext);
  });

  it('adds an app bridge hook to set clientInterface data', () => {
    const set = jest.fn();
    createAppSpy.mockImplementation((args) => {
      return {...args, hooks: {set}};
    });

    const apiKey = '4p1k3y';
    createAppProviderContext({apiKey});

    expect(set).toHaveBeenCalledWith(
      appBridge.LifecycleHook.DispatchAction,
      setClientInterfaceHook,
    );
  });

  it('setClientInterfaceHook augments app bridge actions with clientInterface property', () => {
    const next = jest.fn((args) => args);
    const baseAction = {type: 'actionType'};

    expect(setClientInterfaceHook.call({}, next)(baseAction)).toEqual({
      type: 'actionType',
      clientInterface: {
        name: '@shopify/polaris',
        version: '{{POLARIS_VERSION}}',
      },
    });
  });
});
