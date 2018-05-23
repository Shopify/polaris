import * as React from 'react';
import {
  animationFrame,
  mountWithAppProvider,
} from '../../../../tests/utilities';
import {TrapFocus} from '../../';
import Frame from '../Frame';

describe('<Frame />', () => {
  beforeEach(() => {
    animationFrame.fake();
  });

  afterEach(() => {
    animationFrame.restore();
  });

  it('renders TrapFocus with trapping prop true when showMobileNav is true', () => {
    const trapFocus = mountWithAppProvider(<Frame showMobileNav />).find(
      TrapFocus,
    );

    expect(trapFocus.exists()).toBe(true);
    expect(trapFocus.prop('trapping')).toBe(true);
  });

  it('renders TrapFocus with trapping prop false when showMobileNav is false', () => {
    const trapFocus = mountWithAppProvider(
      <Frame showMobileNav={false} />,
    ).find(TrapFocus);

    expect(trapFocus.exists()).toBe(true);
    expect(trapFocus.prop('trapping')).toBe(false);
  });
});
