import * as React from 'react';
import {shallow, mount} from 'enzyme';
import RadioButton from '..';

describe('<RadioButton />', () => {
  describe('onChange()', () => {
    it('is called with the new checked value of the input on change', () => {
      const spy = jest.fn();
      const element = mount(<RadioButton label="RadioButton" onChange={spy} />);
      (element.find('input') as any).node.checked = true;
      element.find('input').simulate('change');
      expect(spy).toHaveBeenCalledWith(true);
    });
  });

  describe('onFocus()', () => {
    it('is called when the input is focused', () => {
      const spy = jest.fn();
      const element = mount(<RadioButton label="RadioButton" onFocus={spy} />);
      element.find('input').simulate('focus');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onBlur()', () => {
    it('is called when the input is focused', () => {
      const spy = jest.fn();
      const element = mount(<RadioButton label="RadioButton" onBlur={spy} />);
      element.find('input').simulate('blur');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('checked', () => {
    it('sets the checked attribute on the input', () => {
      const button = shallow(<RadioButton label="RadioButton" checked />);
      expect(button.find('input').prop('checked')).toBe(true);
    });

    it('is only checked when checked is explicitly set to true', () => {
      let element = shallow(<RadioButton label="RadioButton" />);
      expect(element.find('input').prop('checked')).toBeFalsy();

      element = shallow(<RadioButton label="RadioButton" checked={false} />);
      expect(element.find('input').prop('checked')).toBeFalsy();
    });
  });

  describe('id', () => {
    it('sets the id on the input', () => {
      const id = shallow(<RadioButton id="MyRadioButton" label="RadioButton" />).find('input').prop('id');
      expect(id).toBe('MyRadioButton');
    });

    it('sets a random id on the input when none is passed', () => {
      const id = shallow(<RadioButton label="RadioButton" />).find('input').prop('id');
      expect(typeof id).toBe('string');
      expect(id).toBeTruthy();
    });
  });

  describe('value', () => {
    it('sets the value on the input', () => {
      const value = shallow(<RadioButton value="MyRadioButton" label="RadioButton" />).find('input').prop('value');
      expect(value).toBe('MyRadioButton');
    });
  });

  describe('name', () => {
    it('sets the name on the input', () => {
      const name = shallow(<RadioButton name="MyRadioButton" label="RadioButton" />).find('input').prop('name');
      expect(name).toBe('MyRadioButton');
    });

    it('sets a default name on the input equal to its ID', () => {
      const element = shallow(<RadioButton label="RadioButton" />);
      const name = element.find('input').prop('name');

      expect(name).toBeTruthy();
      expect(name).toEqual(element.find('input').prop('id'));
    });
  });

  describe('disabled', () => {
    it('sets the disabled attribute on the input', () => {
      const button = shallow(<RadioButton label="RadioButton" disabled />);
      expect(button.find('input').prop('disabled')).toBe(true);
    });

    it('is only disabled when disabled is explicitly set to true', () => {
      let element = shallow(<RadioButton label="RadioButton" />);
      expect(element.find('input').prop('disabled')).toBeFalsy();

      element = shallow(<RadioButton label="RadioButton" disabled={false} />);
      expect(element.find('input').prop('disabled')).toBeFalsy();
    });
  });
});
