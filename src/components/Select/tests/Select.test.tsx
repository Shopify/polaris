import * as React from 'react';
import {shallow, mount} from 'enzyme';
import Select from '..';

describe('<Select />', () => {
  describe('onChange()', () => {
    it('is called with the value of the newly-selected option', () => {
      const spy = jest.fn();
      const element = mount(<Select options={['one', 'two']} onChange={spy} />);
      (element.find('select') as any).node.value = 'two';
      element.find('select').simulate('change');
      expect(spy).toHaveBeenCalledWith('two');
    });
  });

  describe('onFocus()', () => {
    it('is called when the select is focused', () => {
      const spy = jest.fn();
      shallow(<Select options={[]} onFocus={spy} />).find('select').simulate('focus');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onBlur()', () => {
    it('is called when the select is blurred', () => {
      const spy = jest.fn();
      const element = shallow(<Select options={[]} onBlur={spy} />);
      element.find('select').simulate('focus').simulate('blur');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('options', () => {
    it('translates an array of strings into options', () => {
      const options = ['one', 'two'];
      const optionElements = shallow(<Select options={options} />).find('option');

      options.forEach((option, index) => {
        const optionElement = optionElements.at(index);
        expect(optionElement.key()).toBe(option);
        expect(optionElement.prop('value')).toBe(option);
        expect(optionElement.text()).toBe(option);
      });
    });

    it('translates an array of option descriptions into options', () => {
      const options = [
        {value: 'one', label: 'One'},
        {value: 'two', label: 'Two'},
      ];
      const optionElements = shallow(<Select options={options} />).find('option');

      options.forEach(({value, label}, index) => {
        const optionElement = optionElements.at(index);
        expect(optionElement.key()).toBe(value);
        expect(optionElement.prop('value')).toBe(value);
        expect(optionElement.text()).toBe(label);
      });
    });
  });

  describe('value', () => {
    it('uses the passed value for the select', () => {
      const value = shallow(<Select value="Some value" options={[]} />).find('select').prop('value');
      expect(value).toBe('Some value');
    });
  });

  describe('id', () => {
    it('sets the id on the input', () => {
      const id = shallow(<Select id="MySelect" options={[]} />).find('select').prop('id');
      expect(id).toBe('MySelect');
    });

    it('sets a random id on the input when none is passed', () => {
      const id = shallow(<Select options={[]} />).find('select').prop('id');
      expect(typeof id).toBe('string');
      expect(id).toBeTruthy();
    });
  });

  describe('disabled', () => {
    it('sets the disabled attribute on the select', () => {
      const select = shallow(<Select disabled options={[]} />);
      expect(select.find('select').prop('disabled')).toBe(true);
    });

    it('is only disabled when disabled is explicitly set to true', () => {
      let select = shallow(<Select options={[]} />);
      expect(select.find('select').prop('disabled')).toBeFalsy();

      select = shallow(<Select disabled={false} options={[]} />);
      expect(select.find('select').prop('disabled')).toBeFalsy();
    });
  });
});
