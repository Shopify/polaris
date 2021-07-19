import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';

import {Key} from '../../../../../types';
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

  describe('Focus className', () => {
    it('on keyUp adds a keyFocused class to the input', () => {
      const checkbox = mountWithApp(<Checkbox onChange={noop} />);

      const event: KeyboardEventInit & {keyCode: Key} = {
        keyCode: Key.Space,
      };
      checkbox.find('input')!.trigger('onKeyUp', event);
      expect(checkbox).toContainReactComponent('input', {
        className: 'Input keyFocused',
      });
    });

    it('removes the keyFocused class on blur', () => {
      const checkbox = mountWithApp(<Checkbox onChange={noop} />);

      const event: KeyboardEventInit & {keyCode: Key} = {
        keyCode: Key.Space,
      };

      checkbox.find('input')!.trigger('onKeyUp', event);
      checkbox.find('input')!.trigger('onBlur');

      expect(checkbox).toContainReactComponent('input', {
        className: 'Input',
      });
    });

    it('on change does not add a keyFocused class to the input', () => {
      const checkbox = mountWithApp(<Checkbox onChange={noop} />);
      const checkboxInput = checkbox.find('input');
      checkboxInput!.trigger('onChange', {
        currentTarget: checkboxInput!.domNode as HTMLInputElement,
      });
      expect(checkbox).not.toContainReactComponent('input', {
        className: 'Input keyFocused',
      });
    });
  });
});

function noop() {}
