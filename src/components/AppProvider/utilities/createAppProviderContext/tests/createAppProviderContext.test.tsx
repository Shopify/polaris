import * as React from 'react';
import createApp, {LifecycleHook} from '@shopify/app-bridge';
import {noop} from '@shopify/javascript-utilities/other';
import * as targets from '@shopify/react-utilities/target';
import createAppProviderContext, {
  setClientInterfaceHook,
} from '../createAppProviderContext';
import Intl from '../../Intl';
import Link from '../../Link';
import {StickyManager} from '../../withSticky';
import ScrollLockManager from '../../ScrollLockManager';

jest.mock('@shopify/app-bridge');
(createApp as jest.Mock<{}>).mockImplementation((args) => args);

const actualIsServer = targets.isServer;

function mockIsServer(value: boolean) {
  (targets as any).isServer = value;
}

describe('createAppProviderContext()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    mockIsServer(actualIsServer);
  });

  it('returns the right context without properties', () => {
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
        },
      },
    };

    expect(context).toEqual(mockContext);
  });

  it('does not instantiate app bridge if server side rendering', () => {
    mockIsServer(true);
    const apiKey = '4p1k3y';
    const context = createAppProviderContext({apiKey});
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

  it('adds an app bridge hook to set clientInterface data', () => {
    const set = jest.fn();
    (createApp as jest.Mock<{}>).mockImplementation((args) => {
      return {...args, hooks: {set}};
    });

    const apiKey = '4p1k3y';
    createAppProviderContext({apiKey});

    expect(set).toHaveBeenCalledWith(
      LifecycleHook.DispatchAction,
      setClientInterfaceHook,
    );
  });

  it('setClientInterfaceHook augments app bridge actions with clientInterface property', () => {
    window.Polaris = {VERSION: '9000'};

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
