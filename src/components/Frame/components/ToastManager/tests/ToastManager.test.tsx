import React from 'react';
import {timer} from '@shopify/jest-dom-mocks';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {Toast} from '../../Toast';
import {Frame} from '../../../Frame';
import {ToastManager} from '..';

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

describe('<ToastManager />', () => {
  it('updates toast safely', () => {
    const toastManager = mountWithAppProvider(
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

  it('has and aria-live attribute of polite', () => {
    const toastManager = mountWithAppProvider(
      <ToastManager
        toastMessages={[{id: '1', content: 'Hello', onDismiss: noop}]}
      />,
    );

    expect(
      toastManager
        .find('div')
        .at(0)
        .prop('aria-live'),
    ).toBe('polite');
  });
});

describe('<Toast />', () => {
  it('renders and updates multiple toasts', () => {
    const multipleMessages = mountWithAppProvider(
      <Frame>
        <Toast content="Image uploaded" onDismiss={noop} />
        <Toast content="Product saved" onDismiss={noop} />
      </Frame>,
    );

    expect(multipleMessages.find(Toast)).toHaveLength(2);
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

    mountWithAppProvider(
      <Frame>
        <Toast content="Product saved" onDismiss={spy1} duration={duration1} />
      </Frame>,
    );
    mountWithAppProvider(
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
