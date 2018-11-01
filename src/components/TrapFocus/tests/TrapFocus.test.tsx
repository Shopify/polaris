import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import {EventListener, Focus, TextContainer} from 'components';
import TrapFocus from '../TrapFocus';

describe('<TrapFocus />', () => {
  it('mounts', () => {
    const trapFocus = mountWithAppProvider(
      <TrapFocus>
        <TextContainer>Test</TextContainer>
      </TrapFocus>,
    );

    expect(trapFocus.exists()).toBe(true);

    // Render children
    expect(trapFocus.find(TextContainer).length).toBe(1);

    // Renders Focus
    expect(trapFocus.find(Focus).length).toBe(1);

    // Renders an event listener
    expect(trapFocus.find(EventListener).length).toBe(1);
    expect(trapFocus.find(EventListener).prop('event')).toBe('focusout');
  });

  it('renders a Focus component with a `disabled` prop set to false by default', () => {
    const focus = mountWithAppProvider(
      <TrapFocus>
        <div />
      </TrapFocus>,
    ).find(Focus);

    expect(focus.prop('disabled')).toBe(false);
  });

  it('renders a Focus component with a `disabled` prop set to true when `trapping` is false', () => {
    const focus = mountWithAppProvider(
      <TrapFocus trapping={false}>
        <div />
      </TrapFocus>,
    ).find(Focus);

    expect(focus.prop('disabled')).toBe(true);
  });

  it('renders a Focus component with a `disabled` prop set to false when `trapping` is true', () => {
    const focus = mountWithAppProvider(
      <TrapFocus trapping>
        <div />
      </TrapFocus>,
    ).find(Focus);

    expect(focus.prop('disabled')).toBe(false);
  });
});
