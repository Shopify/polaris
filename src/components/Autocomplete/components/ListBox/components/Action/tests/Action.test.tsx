import React from 'react';
import {Icon} from 'components';
import {CirclePlusMinor, AddMajor} from '@shopify/polaris-icons';

import {Action} from '../Action';
import {Option} from '../../Option';
import {TextOption} from '../../TextOption';
import {mountWithListBoxProvider} from '../../../tests/utilities';

describe('Action', () => {
  const defaultProps = {
    value: 'value',
    selected: false,
    disabled: false,
    accessibilityLabel: 'accessibility label',
  };

  it('passes props to Option', () => {
    const action = mountWithListBoxProvider(<Action {...defaultProps} />);

    expect(action).toContainReactComponent(Option, defaultProps);
  });

  it('passes select, disabled from props to text option', () => {
    const action = mountWithListBoxProvider(
      <Action {...defaultProps} selected disabled />,
    );

    expect(action).toContainReactComponent(TextOption, {
      selected: true,
      disabled: true,
    });
  });

  it('renders a default Icon', () => {
    const action = mountWithListBoxProvider(<Action {...defaultProps} />);

    expect(action).toContainReactComponent(Icon, {
      source: CirclePlusMinor,
    });
  });

  it('renders the Icon from the prop', () => {
    const action = mountWithListBoxProvider(
      <Action {...defaultProps} icon={AddMajor} />,
    );

    expect(action).toContainReactComponent(Icon, {
      source: AddMajor,
    });
  });

  it('renders the children', () => {
    const label = 'test label';
    const action = mountWithListBoxProvider(
      <Action {...defaultProps}>{label}</Action>,
    );

    expect(action).toContainReactText(label);
  });
});
