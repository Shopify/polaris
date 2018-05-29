import * as React from 'react';
import {
  shallowWithAppProvider,
  mountWithAppProvider,
} from '../../../../../../tests/utilities';
import {noop} from '@shopify/javascript-utilities/other';

import Checkbox, {Props} from '..';

describe('<Checkbox />', () => {
  const defaultProps: Props = {
    checked: true,
    disabled: false,
    id: 'some id',
    name: 'R2D2',
    value: 'r2d2',
    onChange: noop,
  };

  it('sets all pass through props for input', () => {
    const input = mountWithAppProvider(<Checkbox {...defaultProps} />).find(
      'input',
    );
    const {checked, disabled, id, name, value} = defaultProps;

    expect(input.prop('checked')).toBe(checked);
    expect(input.prop('disabled')).toBe(disabled);
    expect(input.prop('id')).toBe(id);
    expect(input.prop('name')).toBe(name);
    expect(input.prop('value')).toBe(value);
  });

  it('calls onChange', () => {
    const spy = jest.fn();

    mountWithAppProvider(<Checkbox {...defaultProps} onChange={spy} />)
      .find('input')
      .simulate('change');

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
