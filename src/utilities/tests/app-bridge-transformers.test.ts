import {ClientApplication} from '@shopify/app-bridge';
import {Button, ButtonGroup, Redirect} from '@shopify/app-bridge/actions';
import {noop} from '../other';
import {generateRedirect, transformActions} from '../app-bridge-transformers';

describe('app bridge transformers', () => {
  const appBridge = {} as ClientApplication<{}>;
  const dispatch = jest.fn();
  Redirect.create = jest.fn().mockReturnValue({dispatch});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateRedirect', () => {
    it('returns undefined if no url is provided', () => {
      expect(generateRedirect(appBridge)).toBeUndefined();
    });

    it('action is APP by default', () => {
      const callback = generateRedirect(appBridge, '/path');
      if (callback != null) {
        callback.call(this);
      }
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(Redirect.Action.APP, '/path');
    });

    it('action is APP when target is APP', () => {
      const callback = generateRedirect(appBridge, '/path', 'APP');
      if (callback != null) {
        callback.call(this);
      }
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(Redirect.Action.APP, '/path');
    });

    it('action is REMOTE with newContext when external is true', () => {
      const callback = generateRedirect(appBridge, '/path', undefined, true);
      if (callback != null) {
        callback.call(this);
      }
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(Redirect.Action.REMOTE, {
        url: '/path',
        newContext: true,
      });
    });

    it('action is REMOTE when target is REMOTE', () => {
      const callback = generateRedirect(appBridge, '/path', 'REMOTE');
      if (callback != null) {
        callback.call(this);
      }
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(Redirect.Action.REMOTE, '/path');
    });

    it('action is ADMIN_PATH when target is ADMIN_PATH', () => {
      const callback = generateRedirect(appBridge, '/path', 'ADMIN_PATH');
      if (callback != null) {
        callback.call(this);
      }
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(
        Redirect.Action.ADMIN_PATH,
        '/path',
      );
    });
  });

  describe('transformActions', () => {
    const action = {
      content: 'Foo',
      url: '/foo',
      onAction: noop,
    };

    const buttonMock = {
      set: jest.fn(),
      subscribe: jest.fn(),
    };

    Button.create = jest.fn().mockReturnValue(buttonMock);
    ButtonGroup.create = jest.fn((...args) => args);

    it('accepts undefined actions', () => {
      const buttons = transformActions(appBridge, {});

      expect(buttons).toEqual({
        primary: undefined,
        secondary: [],
      });
    });

    it('transforms primary and secondary actions', () => {
      const buttons = transformActions(appBridge, {
        primaryAction: action,
        secondaryActions: [action],
      });

      expect(buttons).toEqual({primary: buttonMock, secondary: [buttonMock]});
    });

    it('transforms action groups', () => {
      const buttons = transformActions(appBridge, {
        secondaryActions: [action],
        actionGroups: [{title: 'Bar', actions: [action]}],
      });

      expect(buttons).toEqual({
        primary: undefined,
        secondary: [
          buttonMock,
          [appBridge, {label: 'Bar', buttons: [buttonMock]}],
        ],
      });
    });

    it('creates a button', () => {
      transformActions(appBridge, {
        primaryAction: action,
      });

      expect(Button.create).toHaveBeenCalledTimes(1);
      expect(Button.create).toHaveBeenCalledWith(appBridge, {
        label: 'Foo',
        disabled: undefined,
      });
    });

    it('creates a danger button', () => {
      transformActions(appBridge, {
        primaryAction: {
          content: 'Foo',
          url: '/foo',
          onAction: noop,
          destructive: true,
        },
      });

      expect(Button.create).toHaveBeenCalledTimes(1);
      expect(Button.create).toHaveBeenCalledWith(appBridge, {
        label: 'Foo',
        style: Button.Style.Danger,
      });
    });

    it('subscribes to the action and redirect callbacks', () => {
      transformActions(appBridge, {
        primaryAction: action,
      });

      expect(buttonMock.subscribe).toHaveBeenCalledTimes(2);
      expect(buttonMock.subscribe).toHaveBeenCalledWith(
        Button.Action.CLICK,
        noop,
      );

      const [firstArg, secondArg] = buttonMock.subscribe.mock.calls[1];

      expect(firstArg).toBe(Button.Action.CLICK);
      secondArg();
      expect(dispatch).toHaveBeenCalledTimes(1);
    });

    it('only subscribes to the action callback', () => {
      transformActions(appBridge, {primaryAction: {onAction: noop}});

      expect(buttonMock.subscribe).toHaveBeenCalledTimes(1);
      expect(buttonMock.subscribe).toHaveBeenCalledWith(
        Button.Action.CLICK,
        noop,
      );
    });

    it('only subscribes to the redirect callback', () => {
      transformActions(appBridge, {primaryAction: {url: '/foo'}});

      expect(buttonMock.subscribe).toHaveBeenCalledTimes(1);
      const [firstArg, secondArg] = buttonMock.subscribe.mock.calls[0];
      expect(firstArg).toBe(Button.Action.CLICK);
      secondArg();
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
