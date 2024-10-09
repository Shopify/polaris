import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {AppCardMeasurer} from '../AppCardMeasurer';

let triggerEventListener: jest.Mock;
jest.mock('../../../../../utilities/use-event-listener', () => {
  return {
    useEventListener: (_: string, cb: () => void) => {
      triggerEventListener = jest.fn().mockImplementation(() => {
        cb();
      });
    },
  };
});

describe('<AppCardMeasurer />', () => {
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetWidth',
  );

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 200,
    });
  });

  afterAll(() => {
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetWidth',
      originalOffsetWidth ?? 0,
    );

    triggerEventListener.mockRestore();
    jest.clearAllMocks();
  });

  it('renders children and triggers handleMeasurement', () => {
    const onHandleMeasurement = jest.fn();
    const measurer = mountWithApp(
      <AppCardMeasurer handleMeasurement={onHandleMeasurement}>
        <div>Test</div>
      </AppCardMeasurer>,
    );

    expect(measurer).toContainReactComponent('div', {children: 'Test'});
    expect(onHandleMeasurement).toHaveBeenCalledTimes(1);
    expect(onHandleMeasurement).toHaveBeenCalledWith({containerWidth: 200});

    onHandleMeasurement.mockRestore();
  });

  it('triggers handleMeasurement on resize event', () => {
    const onHandleMeasurement = jest.fn();
    mountWithApp(
      <AppCardMeasurer handleMeasurement={onHandleMeasurement}>
        <></>
      </AppCardMeasurer>,
    );

    onHandleMeasurement.mockReset();

    expect(onHandleMeasurement).not.toHaveBeenCalled();

    triggerEventListener();

    expect(onHandleMeasurement).toHaveBeenCalledTimes(1);

    triggerEventListener();

    expect(onHandleMeasurement).toHaveBeenCalledTimes(2);

    onHandleMeasurement.mockRestore();
  });
});
