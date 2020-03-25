import * as appBridge from '@shopify/app-bridge';

import {createAppBridge, setClientInterfaceHook} from '../app-bridge';

describe('createAppBridge()', () => {
  const createAppSpy: jest.SpyInstance = jest.spyOn(appBridge, 'default');

  afterEach(() => {
    createAppSpy.mockReset();
  });

  it('returns null without an apiKey', () => {
    expect(createAppBridge({})).toBeUndefined();
  });

  it('returns a app bridge instance', () => {
    createAppSpy.mockImplementationOnce((args) => ({
      ...args,
      dispatch: () => {},
      localOrigin: '',
      featuresAvailable: () => {},
      getState: () => {},
      subscribe: () => {},
      error: () => {},
    }));

    const apiKey = '4p1k3y';
    const shopOrigin = '*';
    const context = createAppBridge({
      apiKey,
      shopOrigin,
    });

    expect(context).toMatchObject({
      apiKey,
      forceRedirect: undefined,
      shopOrigin,
      dispatch: expect.any(Function),
      localOrigin: '',
      featuresAvailable: expect.any(Function),
      getState: expect.any(Function),
      subscribe: expect.any(Function),
      error: expect.any(Function),
    });
  });

  it('adds an app bridge hook to set clientInterface data', () => {
    const set = jest.fn();
    createAppSpy.mockImplementationOnce((args) => {
      return {...args, hooks: {set}};
    });

    const apiKey = '4p1k3y';
    const shopOrigin = '*';
    createAppBridge({apiKey, shopOrigin});

    expect(set).toHaveBeenCalledWith(
      appBridge.LifecycleHook.DispatchAction,
      setClientInterfaceHook,
    );
  });

  it('setClientInterfaceHook augments app bridge actions with clientInterface property', () => {
    const next = jest.fn((args) => args);
    const baseAction = {type: 'actionType'};

    const hookResult = setClientInterfaceHook.call({}, next) as any;
    expect(hookResult(baseAction)).toStrictEqual({
      type: 'actionType',
      clientInterface: {
        name: '@shopify/polaris',
        version: '{{POLARIS_VERSION}}',
      },
    });
  });
});
