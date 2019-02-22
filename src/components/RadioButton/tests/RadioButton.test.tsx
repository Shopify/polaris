import * as React from 'react';
import {shallowWithAppProvider, mountWithAppProvider} from 'test-utilities';
import RadioButton from '../RadioButton';

describe('<RadioButton />', () => {
  describe('checked', () => {
    it('gets passed to the input', () => {
      const input = shallowWithAppProvider(
        <RadioButton
          label="RadioButton"
          checked
          name="RadioButton"
          value="Some value"
        />,
      ).find('input');

      expect(input.prop('checked')).toBe(true);
    });
  });

  describe('name', () => {
    it('gets passed to the input', () => {
      const input = shallowWithAppProvider(
        <RadioButton
          label="RadioButton"
          checked
          name="RadioButton"
          value="Some value"
        />,
      ).find('input');

      expect(input.prop('name')).toBe('RadioButton');
    });
  });

  describe('value', () => {
    it('gets passed to the input', () => {
      const input = shallowWithAppProvider(
        <RadioButton
          label="RadioButton"
          checked
          name="RadioButton"
          value="Some value"
        />,
      ).find('input');

      expect(input.prop('value')).toBe('Some value');
    });
  });

  describe('onChange()', () => {
    it('is called with the new checked value of the input on change', () => {
      const spy = jest.fn();
      const element = mountWithAppProvider(
        <RadioButton id="MyRadioButton" label="RadioButton" onChange={spy} />,
      );
      (element.find('input') as any).instance().checked = true;
      element.find('input').simulate('change');
      expect(spy).toHaveBeenCalledWith(true, 'MyRadioButton');
    });
  });

  describe('onFocus()', () => {
    it('is called when the input is focused', () => {
      const spy = jest.fn();
      const element = mountWithAppProvider(
        <RadioButton label="RadioButton" onFocus={spy} />,
      );
      element.find('input').simulate('focus');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onBlur()', () => {
    it('is called when the input is focused', () => {
      const spy = jest.fn();
      const element = mountWithAppProvider(
        <RadioButton label="RadioButton" onBlur={spy} />,
      );
      element.find('input').simulate('blur');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('id', () => {
    it('sets the id on the input', () => {
      const id = shallowWithAppProvider(
        <RadioButton id="MyRadioButton" label="RadioButton" />,
      )
        .find('input')
        .prop('id');
      expect(id).toBe('MyRadioButton');
    });

    it('sets a random id on the input when none is passed', () => {
      const id = shallowWithAppProvider(<RadioButton label="RadioButton" />)
        .find('input')
        .prop('id');
      expect(typeof id).toBe('string');
      expect(id).toBeTruthy();
    });
  });

  describe('disabled', () => {
    it('sets the disabled attribute on the input', () => {
      const button = shallowWithAppProvider(
        <RadioButton label="RadioButton" disabled />,
      );
      expect(button.find('input').prop('disabled')).toBe(true);
    });

    it('is only disabled when disabled is explicitly set to true', () => {
      let element = shallowWithAppProvider(<RadioButton label="RadioButton" />);
      expect(element.find('input').prop('disabled')).toBeFalsy();

      element = shallowWithAppProvider(
        <RadioButton label="RadioButton" disabled={false} />,
      );
      expect(element.find('input').prop('disabled')).toBeFalsy();
    });
  });

  describe('helpText', () => {
    it('connects the input to the help text', () => {
      const textField = mountWithAppProvider(
        <RadioButton label="RadioButton" helpText="Some help" />,
      );
      const helpTextID = textField
        .find('input')
        .prop<string>('aria-describedby');
      expect(typeof helpTextID).toBe('string');
      expect(textField.find(`#${helpTextID}`).text()).toBe('Some help');
    });
  });
});
