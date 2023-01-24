import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {RadioButton} from '../RadioButton';

describe('<RadioButton />', () => {
  describe('checked', () => {
    it('gets passed to the input', () => {
      const input = mountWithApp(
        <RadioButton
          label="RadioButton"
          checked
          name="RadioButton"
          value="Some value"
        />,
      ).find('input');

      expect(input).toHaveReactProps({checked: true});
    });
  });

  describe('name', () => {
    it('gets passed to the input', () => {
      const name = 'RadioButton';
      const input = mountWithApp(
        <RadioButton
          label="RadioButton"
          checked
          name={name}
          value="Some value"
        />,
      ).find('input');

      expect(input).toHaveReactProps({name});
    });
  });

  describe('value', () => {
    it('gets passed to the input', () => {
      const value = 'Some value';
      const input = mountWithApp(
        <RadioButton
          label="RadioButton"
          checked
          name="RadioButton"
          value={value}
        />,
      ).find('input');

      expect(input).toHaveReactProps({value});
    });
  });

  describe('onChange()', () => {
    it('is called with the new checked value of the input on change', () => {
      const spy = jest.fn();
      const element = mountWithApp(
        <RadioButton id="MyRadioButton" label="RadioButton" onChange={spy} />,
      );
      (element.find('input')!.domNode as HTMLInputElement).checked = true;
      element
        .find('input')!
        .trigger('onChange', {currentTarget: {checked: true}});
      expect(spy).toHaveBeenCalledWith(true, 'MyRadioButton');
    });
  });

  describe('onFocus()', () => {
    it('is called when the input is focused', () => {
      const spy = jest.fn();
      const element = mountWithApp(
        <RadioButton label="RadioButton" onFocus={spy} />,
      );
      element.find('input')!.trigger('onFocus');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onBlur()', () => {
    it('is called when the input is focused', () => {
      const spy = jest.fn();
      const element = mountWithApp(
        <RadioButton label="RadioButton" onBlur={spy} />,
      );
      element.find('input')!.trigger('onBlur');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('id', () => {
    it('sets the id on the input', () => {
      const id = 'MyRadioButton';
      const button = mountWithApp(
        <RadioButton id={id} label="RadioButton" />,
      ).find('input');
      expect(button).toHaveReactProps({id});
    });

    it('sets a random id on the input when none is passed', () => {
      const id = mountWithApp(<RadioButton label="RadioButton" />)
        .find('input')!
        .prop('id');
      expect(typeof id).toBe('string');
      expect(id).toBeDefined();
    });
  });

  describe('disabled', () => {
    it('sets the disabled attribute on the input', () => {
      const button = mountWithApp(<RadioButton label="RadioButton" disabled />);
      expect(button.find('input')).toBeDisabled();
    });

    it('is only disabled when disabled is explicitly set to true', () => {
      let element = mountWithApp(<RadioButton label="RadioButton" />);
      expect(element.find('input')).not.toBeDisabled();

      element = mountWithApp(
        <RadioButton label="RadioButton" disabled={false} />,
      );
      expect(element.find('input')).not.toBeDisabled();
    });
  });

  describe('helpText', () => {
    it('connects the input to the help text', () => {
      const textField = mountWithApp(
        <RadioButton label="RadioButton" helpText="Some help" />,
      );
      expect(typeof textField.find('input')!.prop('aria-describedby')).toBe(
        'string',
      );
      expect(
        textField.findAllWhere((element) => {
          const describedby = (element as any).prop('aria-describedby');
          return describedby && describedby.includes('HelpText');
        }),
      ).toHaveLength(1);
    });
  });

  describe('ariaDescribedBy', () => {
    it('sets the aria-describedBy attribute on the input', () => {
      const radioButton = mountWithApp(
        <RadioButton label="RadioButton" ariaDescribedBy="SomeId" />,
      );
      const ariaDescribedBy = radioButton.find('input');

      expect(ariaDescribedBy).toHaveReactProps({
        'aria-describedby': 'SomeId',
      });
    });
  });

  describe('Hovering the label', () => {
    it('adds the hover class to the Backdrop onMouseOver the label', () => {
      const radioButton = mountWithApp(<RadioButton label="radioButton" />);

      const label = radioButton.find('label');
      label!.trigger('onMouseOver');

      expect(radioButton).toContainReactComponent('span', {
        className: 'Backdrop hover',
      });
    });

    it('removes the hover class from the Backdrop onMouseOut the label', () => {
      const radioButton = mountWithApp(<RadioButton label="radioButton" />);

      const label = radioButton.find('label');
      label!.trigger('onMouseOver');
      label!.trigger('onMouseOut');

      expect(radioButton).toContainReactComponent('span', {
        className: 'Backdrop',
      });
    });
  });
});
