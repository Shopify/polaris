import * as React from 'react';
import {
  animationFrame,
  mountWithAppProvider,
} from '../../../../tests/utilities';
import TrapFocus from '../../Focus/TrapFocus';
import Frame from '../Frame';
import Button from '../../Button';

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: window.innerWidth <= 769,
      addListener() {},
      removeListener() {},
    };
  };

const defaultWindowWidth = window.innerWidth;

describe('<Frame />', () => {
  beforeEach(() => {
    animationFrame.fake();
  });

  afterEach(() => {
    animationFrame.restore();
    Object.defineProperty(window, 'innerWidth', {
      configurable: false,
      writable: false,
      value: defaultWindowWidth,
    });
  });

  it('renders TrapFocus with trapping prop true when showMobileNavigation is true', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 500,
    });
    const frame = mountWithAppProvider(<Frame showMobileNavigation />).find(
      Frame,
    );
    const trapFocus = frame.find(TrapFocus);

    expect(trapFocus.exists()).toBe(true);
    expect(trapFocus.prop('trapping')).toBe(true);
  });

  it('renders TrapFocus with trapping prop false when showMobileNavigation is false', () => {
    const trapFocus = mountWithAppProvider(
      <Frame showMobileNavigation={false} />,
    ).find(TrapFocus);

    expect(trapFocus.exists()).toBe(true);
    expect(trapFocus.prop('trapping')).toBe(false);
  });

  it('renders a skip to content link with the proper text', () => {
    const skipToContentButtonText = mountWithAppProvider(<Frame />)
      .find(Button)
      .text();

    expect(skipToContentButtonText).toEqual('Skip to content');
  });

  it('renders with a has nav data attribute when nav is passed', () => {
    const navigation = <div />;
    const frame = mountWithAppProvider(<Frame navigation={navigation} />);
    expect(frame.find('[data-has-navigation]')).toHaveLength(1);
  });

  it('does not render with a has nav data attribute when nav is not passed', () => {
    const frame = mountWithAppProvider(<Frame />);
    expect(frame.find('[data-has-navigation]')).toHaveLength(0);
  });
});
