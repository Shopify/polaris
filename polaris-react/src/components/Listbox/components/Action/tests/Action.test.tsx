import React from 'react';
import {CirclePlusIcon, AddIcon} from '@shopify/polaris-icons';
import {mountWithListboxProvider} from 'tests/utilities/listbox';

import {Action} from '../Action';
import {Option} from '../../Option';
import {TextOption} from '../../TextOption';
import {Icon} from '../../../../Icon';

describe('Action', () => {
  const defaultProps = {
    value: 'value',
    selected: false,
    disabled: false,
    accessibilityLabel: 'accessibility label',
  };

  it('passes props to Option', () => {
    const action = mountWithListboxProvider(<Action {...defaultProps} />);

    expect(action).toContainReactComponent(Option, defaultProps);
  });

  it('passes select, disabled from props to text option', () => {
    const action = mountWithListboxProvider(
      <Action {...defaultProps} selected disabled />,
    );

    expect(action).toContainReactComponent(TextOption, {
      selected: true,
      disabled: true,
    });
  });

  it('does not renders a default Icon', () => {
    const action = mountWithListboxProvider(<Action {...defaultProps} />);

    expect(action).not.toContainReactComponent(Icon, {
      source: CirclePlusIcon,
    });
  });

  it('renders the Icon from the prop', () => {
    const action = mountWithListboxProvider(
      <Action {...defaultProps} icon={AddIcon} />,
    );

    expect(action).toContainReactComponent(Icon, {
      source: AddIcon,
    });
  });

  it('renders the children', () => {
    const label = 'test label';
    const action = mountWithListboxProvider(
      <Action {...defaultProps}>{label}</Action>,
    );

    expect(action).toContainReactText(label);
  });
});
