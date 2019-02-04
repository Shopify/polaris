import * as React from 'react';
import createApp from '@shopify/app-bridge';
import {noop} from '@shopify/javascript-utilities/other';
import * as targets from '@shopify/react-utilities/target';
import createAppProviderContext from '../createAppProviderContext';
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

  it('initializes a noop app bridge if server side rendering', () => {
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
        appBridge: {
          dispatch: expect.any(Function),
          error: expect.any(Function),
          featuresAvailable: expect.any(Function),
          getState: expect.any(Function),
          localOrigin: '',
          subscribe: expect.any(Function),
        },
      },
    };

    expect(context).toEqual(mockContext);
  });
});
