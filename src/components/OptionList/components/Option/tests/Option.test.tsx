import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider} from 'tests/utilities';
import Checkbox from '../../Checkbox';
import Option, {Props} from '../Option';

describe('<Option />', () => {
  const defaultProps: Props = {
    id: 'itemId',
    label: 'Option Item',
    value: 'option_item',
    section: 0,
    index: 0,
    onClick: noop,
  };

  it('renders a checkbox if allowMultiple is true', () => {
    const checkbox = mountWithAppProvider(
      <Option {...defaultProps} allowMultiple />,
    ).find(Checkbox);
    expect(checkbox.exists()).toBe(true);
  });

  it('renders a button if allowMultiple is false or undefined', () => {
    const button = mountWithAppProvider(<Option {...defaultProps} />).find(
      'button',
    );
    expect(button.exists()).toBe(true);
  });

  it('calls onClick with correct section and index if option is not disabled', () => {
    const spy = jest.fn();
    const {section, index} = defaultProps;

    const button = mountWithAppProvider(
      <Option {...defaultProps} onClick={spy} />,
    ).find('button');
    button.simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(section, index);
  });

  it('doesn’t call onClick if option is disabled', () => {
    const spy = jest.fn();

    const button = mountWithAppProvider(
      <Option {...defaultProps} onClick={spy} disabled />,
    ).find('button');
    button.simulate('click');

    expect(spy).not.toHaveBeenCalled();
  });

  it('calls onClick with correct section and index if option is not disabled and multiple options are allowed', () => {
    const spy = jest.fn();
    const {section, index} = defaultProps;

    const input = mountWithAppProvider(
      <Option {...defaultProps} onClick={spy} allowMultiple />,
    ).find('input');
    input.simulate('change');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(section, index);
  });

  it('doesn’t call onClick if option is disabled and multiple options are allowed', () => {
    const spy = jest.fn();

    const input = mountWithAppProvider(
      <Option {...defaultProps} onClick={spy} disabled allowMultiple />,
    ).find('input');
    input.simulate('change');

    expect(spy).not.toHaveBeenCalled();
  });

  it('correctly sets the pass through props for Checkbox if multiple items are allowed', () => {
    const {id, value, select, disabled} = defaultProps;
    const checkbox = mountWithAppProvider(
      <Option {...defaultProps} allowMultiple />,
    ).find(Checkbox);

    expect(checkbox.prop('id')).toBe(id);
    expect(checkbox.prop('value')).toBe(value);
    expect(checkbox.prop('checked')).toBe(select);
    expect(checkbox.prop('disabled')).toBe(disabled);
  });
});
