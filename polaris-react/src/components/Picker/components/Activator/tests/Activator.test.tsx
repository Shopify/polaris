import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Activator} from '../Activator';

describe('<Activator />', () => {
  it('renders a label', () => {
    const activator = mountWithApp(<Activator label="label" />);

    expect(activator).toContainReactText('label');
  });

  it('renders a placeholder', () => {
    const activator = mountWithApp(<Activator placeholder="placeholder" />);

    expect(activator).toContainReactText('placeholder');
  });

  it('renders a disabled activator', () => {
    const activator = mountWithApp(<Activator disabled />);

    expect(activator).toContainReactComponent('button', {disabled: true});
  });
});
