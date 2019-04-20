import * as React from 'react';
import * as appBridge from '@shopify/app-bridge';
import {noop} from '@shopify/javascript-utilities/other';
import * as targets from '@shopify/react-utilities/target';
import createAppProviderContext, {
  setClientInterfaceHook,
} from '../createAppProviderContext';
import {StickyManager} from '../../withSticky';
import ScrollLockManager from '../../ScrollLockManager';

jest.mock('../../Intl', () => ({
  default: jest.fn(),
  __esModule: true,
}));

jest.mock('../../Link', () => ({
  default: jest.fn(),
  __esModule: true,
}));

const actualIsServer = targets.isServer;

function mockIsServer(value: boolean) {
  (targets as any).isServer = value;
}

describe('createAppProviderContext()', () => {
  const createAppSpy: jest.SpyInstance<any> = jest.spyOn(appBridge, 'default');
  const Intl: jest.Mock<{}> = require.requireMock('../../Intl').default;
  const Link: jest.Mock<{}> = require.requireMock('../../Link').default;

  afterEach(() => {
    mockIsServer(actualIsServer);
    createAppSpy.mockReset();
    Intl.mockReset();
    Link.mockReset();
  });

  it('returns the right context without properties', () => {
    createAppSpy.mockImplementationOnce((args) => args);
    const context = createAppProviderContext();

    expect(context).toMatchObject({
      polaris: {
        intl: expect.any(Intl),
        link: expect.any(Link),
        stickyManager: expect.any(StickyManager),
        scrollLockManager: expect.any(ScrollLockManager),
        subscribe: noop,
        unsubscribe: noop,
        appBridge: undefined,
      },
    });
  });

  it('returns the right context with properties', () => {
    createAppSpy.mockImplementationOnce((args) => ({
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

    expect(context).toMatchObject({
      polaris: {
        intl: expect.any(Intl),
        link: expect.any(Link),
        stickyManager: expect.any(StickyManager),
        scrollLockManager: expect.any(ScrollLockManager),
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
    });

    expect(Intl).toBeCalledWith(i18n);
    expect(Link).toBeCalledWith(CustomLinkComponent);
  });

  it('adds an app bridge hook to set clientInterface data', () => {
    const set = jest.fn();
    createAppSpy.mockImplementationOnce((args) => {
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
