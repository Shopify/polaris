import {timer} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'tests/utilities';

import {Toast} from '../../Toast';
import {Frame} from '../../../Frame';
import {ToastManager} from '../ToastManager';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

describe('<ToastManager />', () => {
  it('updates toast safely', () => {
    const toastManager = mountWithApp(
      <ToastManager
        toastMessages={[{id: '1', content: 'Hello', onDismiss: noop}]}
      />,
    );

    expect(() => {
      toastManager.setProps({
        toastMessages: [{id: '1', content: 'World!', onDismiss: noop}],
      });
    }).not.toThrow();
  });

  it('has and aria-live attribute of assertive', () => {
    const toastManager = mountWithApp(
      <ToastManager
        toastMessages={[{id: '1', content: 'Hello', onDismiss: noop}]}
      />,
    );

    expect(toastManager).toContainReactComponent('div', {
      'aria-live': 'assertive',
    });
  });
});

describe('<Toast />', () => {
  it('renders and updates multiple toasts', () => {
    const multipleMessages = mountWithApp(
      <Frame>
        <Toast content="Image uploaded" onDismiss={noop} />
        <Toast content="Product saved" onDismiss={noop} />
      </Frame>,
    );

    expect(multipleMessages).toContainReactComponentTimes(Toast, 2);
  });
});

describe('onDismiss()', () => {
  beforeEach(() => {
    timer.mock();
  });

  afterEach(() => {
    timer.restore();
  });

  it('is called twice with different durations', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const duration1 = 3000;
    const duration2 = 10000;

    mountWithApp(
      <Frame>
        <Toast content="Product saved" onDismiss={spy1} duration={duration1} />
      </Frame>,
    );
    mountWithApp(
      <Frame>
        <Toast content="Product saved" onDismiss={spy2} duration={duration2} />
      </Frame>,
    );

    timer.runTimersToTime(duration1);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).not.toHaveBeenCalled();
    timer.runTimersToTime(duration2);
    expect(spy2).toHaveBeenCalledTimes(1);
  });
});

function noop() {}
