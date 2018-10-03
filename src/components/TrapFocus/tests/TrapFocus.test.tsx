import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';
import {Focus} from '../../../components';
import TrapFocus from '../TrapFocus';

describe('<TrapFocus />', () => {
  it('mounts', () => {
    const trapFocus = mountWithAppProvider(
      <TrapFocus>
        <div />
      </TrapFocus>,
    );
    expect(trapFocus.exists()).toBe(true);
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
