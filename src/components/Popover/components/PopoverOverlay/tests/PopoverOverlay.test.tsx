import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider} from 'tests/utilities';
import {TextContainer} from 'components';
import {Keys} from '../../../../../types';
import PositionedOverlay from '../../../../PositionedOverlay';
import PopoverOverlay from '../PopoverOverlay';

interface HandlerMap {
  [eventName: string]: (event: any) => void;
}

const listenerMap: HandlerMap = {};

describe('<PopoverOverlay />', () => {
  let addEventListener: jest.SpyInstance;
  let removeEventListener: jest.SpyInstance;

  beforeEach(() => {
    addEventListener = jest.spyOn(document, 'addEventListener');
    addEventListener.mockImplementation((event, callback) => {
      listenerMap[event] = callback;
    });

    removeEventListener = jest.spyOn(document, 'removeEventListener');
    removeEventListener.mockImplementation((event) => {
      listenerMap[event] = noop;
    });
  });

  afterEach(() => {
    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }

    addEventListener.mockRestore();
    removeEventListener.mockRestore();
  });

  const activator = document.createElement('button');
  const activatorContent = document.createTextNode('Activator text');
  activator.appendChild(activatorContent);
  const children = (
    <TextContainer>
      <p>Text</p>
    </TextContainer>
  );

  it('passes activator to PositionedOverlay when active', () => {
    const popoverOverlay = mountWithAppProvider(
      <PopoverOverlay
        active
        id="PopoverOverlay-1"
        activator={activator}
        onClose={noop}
        fullWidth
      >
        {children}
      </PopoverOverlay>,
    );

    expect(popoverOverlay.find(PositionedOverlay).prop('activator')).toBe(
      activator,
    );
  });

  it('passes fullWidth to PositionedOverlay when active', () => {
    const popoverOverlay = mountWithAppProvider(
      <PopoverOverlay
        active
        id="PopoverOverlay-1"
        activator={activator}
        onClose={noop}
        fullWidth
      >
        {children}
      </PopoverOverlay>,
    );

    expect(popoverOverlay.find(PositionedOverlay).prop('fullWidth')).toBe(true);
  });

  it('passes fixed to PositionedOverlay when active', () => {
    const popoverOverlay = mountWithAppProvider(
      <PopoverOverlay
        active
        id="PopoverOverlay-1"
        activator={activator}
        onClose={noop}
        fixed
      >
        {children}
      </PopoverOverlay>,
    );

    expect(popoverOverlay.find(PositionedOverlay).prop('fixed')).toBe(true);
  });

  it('passes preferredPosition and preferredAlignment to PositionedOverlay when active', () => {
    const popoverOverlay = mountWithAppProvider(
      <PopoverOverlay
        active
        id="PopoverOverlay-1"
        activator={activator}
        onClose={noop}
        preferredPosition="above"
        preferredAlignment="right"
      >
        {children}
      </PopoverOverlay>,
    );

    expect(
      popoverOverlay.find(PositionedOverlay).prop('preferredPosition'),
    ).toBe('above');
    expect(
      popoverOverlay.find(PositionedOverlay).prop('preferredAlignment'),
    ).toBe('right');
  });

  it('passes default preferredPosition and preferredAlignment to PositionedOverlay when active', () => {
    const popoverOverlay = mountWithAppProvider(
      <PopoverOverlay
        active
        id="PopoverOverlay-1"
        activator={activator}
        onClose={noop}
      >
        {children}
      </PopoverOverlay>,
    );

    expect(
      popoverOverlay.find(PositionedOverlay).prop('preferredPosition'),
    ).toBe('below');
    expect(
      popoverOverlay.find(PositionedOverlay).prop('preferredAlignment'),
    ).toBe('center');
  });

  it('calls the onClose callback when the escape key is pressed', () => {
    const spy = jest.fn();

    mountWithAppProvider(
      <PopoverOverlay
        active
        id="PopoverOverlay-1"
        activator={activator}
        onClose={spy}
      >
        {children}
      </PopoverOverlay>,
    );

    listenerMap.keyup({keyCode: Keys.ESCAPE});
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
