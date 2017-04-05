import * as React from 'react';
import {shallow, mount} from 'enzyme';
import Field from '..';

describe('<Field />', () => {
  describe('onChange()', () => {
    it('is called with the new value', () => {
      const spy = jest.fn();
      const element = mount(<Field onChange={spy} />);
      (element.find('input') as any).node.value = 'two';
      element.find('input').simulate('change');
      expect(spy).toHaveBeenCalledWith('two');
    });
  });

  describe('onFocus()', () => {
    it('is called when the input is focused', () => {
      const spy = jest.fn();
      shallow(<Field onFocus={spy} />).find('input').simulate('focus');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onBlur()', () => {
    it('is called when the input is blurred', () => {
      const spy = jest.fn();
      const element = shallow(<Field onBlur={spy} />);
      element.find('input').simulate('focus').simulate('blur');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('value', () => {
    it('sets the input’s value', () => {
      const element = shallow(<Field value="some value" />);
      expect(element.find('input').prop('value')).toBe('some value');
    });
  });

  describe('id', () => {
    it('sets the id on the input', () => {
      const id = shallow(<Field id="MyField" />).find('input').prop('id');
      expect(id).toBe('MyField');
    });

    it('sets a random id on the input when none is passed', () => {
      const id = shallow(<Field />).find('input').prop('id');
      expect(typeof id).toBe('string');
      expect(id).toBeTruthy();
    });
  });

  describe('disabled', () => {
    it('sets the disabled attribute on the select', () => {
      const field = shallow(<Field disabled />);
      expect(field.find('input').prop('disabled')).toBe(true);
    });

    it('is only disabled when disabled is explicitly set to true', () => {
      let field = shallow(<Field />);
      expect(field.find('input').prop('disabled')).toBeFalsy();

      field = shallow(<Field disabled={false} />);
      expect(field.find('input').prop('disabled')).toBeFalsy();
    });
  });

  describe('readOnly', () => {
    it('sets the readOnly attribute on the select', () => {
      const field = shallow(<Field readOnly />);
      expect(field.find('input').prop('readOnly')).toBe(true);
    });

    it('is only readOnly when readOnly is explicitly set to true', () => {
      let field = shallow(<Field />);
      expect(field.find('input').prop('readOnly')).toBeFalsy();

      field = shallow(<Field readOnly={false} />);
      expect(field.find('input').prop('readOnly')).toBeFalsy();
    });
  });

  describe('autoFocus', () => {
    it('sets the autoFocus attribute on the select', () => {
      const field = shallow(<Field autoFocus />);
      expect(field.find('input').prop('autoFocus')).toBe(true);
    });

    it('is only autoFocus when autoFocus is explicitly set to true', () => {
      let field = shallow(<Field />);
      expect(field.find('input').prop('autoFocus')).toBeFalsy();

      field = shallow(<Field autoFocus={false} />);
      expect(field.find('input').prop('autoFocus')).toBeFalsy();
    });
  });

  describe('name', () => {
    it('sets the name on the input', () => {
      const name = shallow(<Field name="MyField" />).find('input').prop('name');
      expect(name).toBe('MyField');
    });
  });

  describe('placeholder', () => {
    it('sets the placeholder on the input', () => {
      const placeholder = shallow(<Field placeholder="MyField" />).find('input').prop('placeholder');
      expect(placeholder).toBe('MyField');
    });
  });

  describe('type', () => {
    it('sets the type on the input', () => {
      const type = shallow(<Field type="email" />).find('input').prop('type');
      expect(type).toBe('email');
    });

    describe('number', () => {
      it('adds an increment button that increases the value', () => {
        const spy = jest.fn();
        const element = shallow(<Field type="number" value="3" onChange={spy} />);
        element.find('[role="button"]').first().simulate('click');
        expect(spy).toHaveBeenCalledWith('4');
      });

      it('adds a decrement button that increases the value', () => {
        const spy = jest.fn();
        const element = shallow(<Field type="number" value="3" onChange={spy} />);
        element.find('[role="button"]').last().simulate('click');
        expect(spy).toHaveBeenCalledWith('2');
      });

      it('handles incrementing from no value', () => {
        const spy = jest.fn();
        const element = shallow(<Field type="number" onChange={spy} />);
        element.find('[role="button"]').first().simulate('click');
        expect(spy).toHaveBeenCalledWith('1');
      });

      it('uses the step prop when incrementing', () => {
        const spy = jest.fn();
        const element = shallow(<Field type="number" step={0.5} value="1.25" onChange={spy} />);
        element.find('[role="button"]').first().simulate('click');
        expect(spy).toHaveBeenCalledWith('1.75');
      });
    });
  });
});
