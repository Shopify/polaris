import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Checkbox, CheckboxProps} from '../Checkbox';

describe('<Checkbox />', () => {
  const defaultProps: CheckboxProps = {
    checked: true,
    disabled: false,
    id: 'checkboxId',
    name: 'Checkbox',
    value: 'checkbox',
    onChange: noop,
  };

  it('sets pass through props for input', () => {
    const input = mountWithApp(<Checkbox {...defaultProps} />);

    expect(input).toContainReactComponent('input', defaultProps);
  });

  it('calls onChange', () => {
    const spy = jest.fn();

    const input = mountWithApp(
      <Checkbox {...defaultProps} onChange={spy} />,
    ).find('input');

    input!.trigger('onChange');

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

function noop() {}
