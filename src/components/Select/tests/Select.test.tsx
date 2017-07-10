import * as React from 'react';
import {shallow, mount} from 'enzyme';
import Select from '..';

describe('<Select />', () => {
  describe('onChange()', () => {
    it('is called with the value of the newly-selected option', () => {
      const spy = jest.fn();
      const element = mount(<Select id="MySelect" label="Select" options={['one', 'two']} onChange={spy} />);
      (element.find('select') as any).node.value = 'two';
      element.find('select').simulate('change');
      expect(spy).toHaveBeenCalledWith('two', 'MySelect');
    });
  });

  describe('onFocus()', () => {
    it('is called when the select is focused', () => {
      const spy = jest.fn();
      shallow(<Select label="Select" options={[]} onFocus={spy} />).find('select').simulate('focus');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onBlur()', () => {
    it('is called when the select is blurred', () => {
      const spy = jest.fn();
      const element = shallow(<Select label="Select" options={[]} onBlur={spy} />);
      element.find('select').simulate('focus').simulate('blur');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('options', () => {
    it('translates an array of strings into options', () => {
      const options = ['one', 'two'];
      const optionElements = shallow(<Select label="Select" options={options} />).find('option');

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
      const optionElements = shallow(<Select label="Select" options={options} />).find('option');

      options.forEach(({value, label}, index) => {
        const optionElement = optionElements.at(index);
        expect(optionElement.key()).toBe(value);
        expect(optionElement.prop('value')).toBe(value);
        expect(optionElement.text()).toBe(label);
      });
    });

    it('sets disabled options as indicated in the option descriptor', () => {
      const options = [
        {value: 'one', label: 'One'},
        {value: 'two', label: 'Two', disabled: true},
        {value: 'three', label: 'Three', disabled: false},
      ];
      const optionElements = shallow(<Select label="Select" options={options} />).find('option');

      options.forEach(({disabled}: {disabled?: boolean}, index) => {
        const optionElement = optionElements.at(index);
        expect(optionElement.prop('disabled')).toBe(disabled);
      });
    });
  });

  describe('groups', () => {
    it('translates groups into optgroup tags', () => {
      const optionsAndGroups = [
        {title: 'Group one', options: ['one.1', 'one.2']},
        'one',
        'two',
        {title: 'Group two', options: ['two.1', 'two.2']},
      ];
      const optionOrOptgroupElements = shallow(<Select label="Select" groups={optionsAndGroups} />).find('select').children();

      optionsAndGroups.forEach((optionOrGroup, index) => {
        const optionOrOptgroupElement = optionOrOptgroupElements.at(index);

        if (typeof optionOrGroup === 'string') {
          expect(optionOrOptgroupElement.type()).toBe('option');
          expect(optionOrOptgroupElement.key()).toBe(optionOrGroup);
          expect(optionOrOptgroupElement.prop('value')).toBe(optionOrGroup);
          expect(optionOrOptgroupElement.text()).toBe(optionOrGroup);
        } else {
          expect(optionOrOptgroupElement.type()).toBe('optgroup');
          expect(optionOrOptgroupElement.prop('label')).toBe(optionOrGroup.title);
          const options = optionOrOptgroupElement.children();

          optionOrGroup.options.forEach((option, optionIndex) => {
            const optionElement = options.at(optionIndex);
            expect(optionElement.type()).toBe('option');
            expect(optionElement.key()).toBe(option);
            expect(optionElement.prop('value')).toBe(option);
            expect(optionElement.text()).toBe(option);
          });
        }
      });
    });
  });

  describe('value', () => {
    it('uses the passed value for the select', () => {
      const value = shallow(<Select label="Select" value="Some value" options={[]} onChange={jest.fn()} />).find('select').prop('value');
      expect(value).toBe('Some value');
    });
  });

  describe('id', () => {
    it('sets the id on the input', () => {
      const id = shallow(<Select label="Select" id="MySelect" options={[]} />).find('select').prop('id');
      expect(id).toBe('MySelect');
    });

    it('sets a random id on the input when none is passed', () => {
      const id = shallow(<Select label="Select" options={[]} />).find('select').prop('id');
      expect(typeof id).toBe('string');
      expect(id).toBeTruthy();
    });
  });

  describe('disabled', () => {
    it('sets the disabled attribute on the select', () => {
      const select = shallow(<Select label="Select" disabled options={[]} />);
      expect(select.find('select').prop('disabled')).toBe(true);
    });

    it('is only disabled when disabled is explicitly set to true', () => {
      let select = shallow(<Select label="Select" options={[]} />);
      expect(select.find('select').prop('disabled')).toBeFalsy();

      select = shallow(<Select label="Select" disabled={false} options={[]} />);
      expect(select.find('select').prop('disabled')).toBeFalsy();
    });
  });

  describe('helpText', () => {
    it('connects the select to the help text', () => {
      const select = mount(<Select label="Select" options={[]} helpText="Some help" />);
      const helpTextID = select.find('select').prop<string>('aria-describedby');
      expect(typeof helpTextID).toBe('string');
      expect(select.find(`#${helpTextID}`).text()).toBe('Some help');
    });
  });

  describe('placeholder', () => {
    it('renders an unselectable option for the placeholder', () => {
      const select = shallow(<Select label="Select" placeholder="Choose something" options={[]} />).find('select');
      const placeholderOption = select.find('option').first();

      expect(select.prop('defaultValue')).toBe(placeholderOption.prop('value'));
      expect(placeholderOption.prop('disabled')).toBe(true);
      expect(placeholderOption.prop('hidden')).toBe(true);
    });

    it('sets the placeholder value as the select value when there is an onChange handler', () => {
      const select = shallow(<Select label="Select" placeholder="Choose something" options={[]} onChange={jest.fn()} />).find('select');
      const placeholderOption = select.find('option').first();

      expect(select.prop('value')).toBe(placeholderOption.prop('value'));
      expect(select.prop('defaultValue')).toBeUndefined();
    });

    it('does not render the placeholder when there is an existing value', () => {
      const select = shallow(<Select label="Select" placeholder="Choose something" options={['one']} value="one" />);
      const placeholderOption = select.find('option');
      expect(placeholderOption.length).toBe(1);
      expect(placeholderOption.prop('disabled')).toBeFalsy();
    });
  });
});
