import * as React from 'react';
import {shallow, mount} from 'enzyme';
import Checkbox from '..';

describe('<Checkbox />', () => {
  describe('onChange()', () => {
    it('is called with the new checked value of the input on change', () => {
      const spy = jest.fn();
      const element = mount(<Checkbox label="Checkbox" onChange={spy} />);
      (element.find('input') as any).node.checked = true;
      element.find('input').simulate('change');
      expect(spy).toHaveBeenCalledWith(true);
    });
  });

  describe('onFocus()', () => {
    it('is called when the input is focused', () => {
      const spy = jest.fn();
      const element = mount(<Checkbox label="Checkbox" onFocus={spy} />);
      element.find('input').simulate('focus');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onBlur()', () => {
    it('is called when the input is focused', () => {
      const spy = jest.fn();
      const element = mount(<Checkbox label="Checkbox" onBlur={spy} />);
      element.find('input').simulate('blur');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('checked', () => {
    it('sets the checked attribute on the input', () => {
      const button = shallow(<Checkbox label="Checkbox" checked />);
      expect(button.find('input').prop('checked')).toBe(true);
    });

    it('is only checked when checked is explicitly set to true', () => {
      let element = shallow(<Checkbox label="Checkbox" />);
      expect(element.find('input').prop('checked')).toBeFalsy();

      element = shallow(<Checkbox label="Checkbox" checked={false} />);
      expect(element.find('input').prop('checked')).toBeFalsy();
    });
  });

  describe('id', () => {
    it('sets the id on the input', () => {
      const id = shallow(<Checkbox id="MyCheckbox" label="Checkbox" />).find('input').prop('id');
      expect(id).toBe('MyCheckbox');
    });

    it('sets a random id on the input when none is passed', () => {
      const id = shallow(<Checkbox label="Checkbox" />).find('input').prop('id');
      expect(typeof id).toBe('string');
      expect(id).toBeTruthy();
    });
  });

  describe('value', () => {
    it('sets the value on the input', () => {
      const value = shallow(<Checkbox value="MyCheckbox" label="Checkbox" />).find('input').prop('value');
      expect(value).toBe('MyCheckbox');
    });
  });

  describe('name', () => {
    it('sets the name on the input', () => {
      const name = shallow(<Checkbox name="MyCheckbox" label="Checkbox" />).find('input').prop('name');
      expect(name).toBe('MyCheckbox');
    });
  });

  describe('disabled', () => {
    it('sets the disabled attribute on the input', () => {
      const button = shallow(<Checkbox label="Checkbox" disabled />);
      expect(button.find('input').prop('disabled')).toBe(true);
    });

    it('is only disabled when disabled is explicitly set to true', () => {
      let element = shallow(<Checkbox label="Checkbox" />);
      expect(element.find('input').prop('disabled')).toBeFalsy();

      element = shallow(<Checkbox label="Checkbox" disabled={false} />);
      expect(element.find('input').prop('disabled')).toBeFalsy();
    });
  });
});
