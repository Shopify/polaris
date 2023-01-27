import React, {AllHTMLAttributes} from 'react';
import {mountWithApp} from 'tests/utilities';

import {Checkbox} from '../Checkbox';

describe('<Checkbox />', () => {
  it('sets pass through properties on the input', () => {
    const input = mountWithApp(
      <Checkbox label="Checkbox" checked name="Checkbox" value="Some value" />,
    );

    expect(input).toContainReactComponent('input', {
      checked: true,
      name: 'Checkbox',
      value: 'Some value',
    });
  });

  it('does not change checked states when onChange is not provided', () => {
    const element = mountWithApp(
      <Checkbox id="MyCheckbox" label="Checkbox" checked />,
    );

    element.find('input')!.trigger('onClick', {
      stopPropagation: () => {},
    });

    expect(element).toContainReactComponent('input', {
      checked: true,
    });
  });

  describe('onChange()', () => {
    it('is called with the updated checked value of the input on click', () => {
      const spy = jest.fn();
      const element = mountWithApp(
        <Checkbox id="MyCheckbox" label="Checkbox" onChange={spy} />,
      );

      (element.find('input')!.domNode as HTMLInputElement).checked = true;
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      element.find('input')!.domNode?.dispatchEvent(event);

      expect(spy).toHaveBeenCalledWith(false, 'MyCheckbox');
    });

    it('sets focus on the input when checkbox is toggled off', () => {
      const checkbox = mountWithApp(
        <Checkbox checked id="checkboxId" label="Checkbox" onChange={noop} />,
      );
      checkbox.find('input')!.trigger('onClick');

      expect(document.activeElement).toBe(checkbox.find('input')!.domNode);
    });

    it('is not called from click events when disabled', () => {
      const spy = jest.fn();
      const checkbox = mountWithApp(
        <Checkbox label="label" disabled onChange={spy} />,
      );
      checkbox.find('input')!.trigger('onClick', {
        stopPropagation: () => {},
      });
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onFocus()', () => {
    it('is called when the input is focused', () => {
      const spy = jest.fn();
      const element = mountWithApp(<Checkbox label="Checkbox" onFocus={spy} />);
      element.find('input')!.trigger('onFocus');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onBlur()', () => {
    it('is called when the input is focused', () => {
      const spy = jest.fn();
      const element = mountWithApp(<Checkbox label="Checkbox" onBlur={spy} />);
      element.find('input')!.trigger('onBlur');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('id', () => {
    it('sets the id on the input', () => {
      const element = mountWithApp(
        <Checkbox id="MyCheckbox" label="Checkbox" />,
      );

      expect(element).toContainReactComponent('input', {
        id: 'MyCheckbox',
      });
    });

    it('sets a random id on the input when none is passed', () => {
      const element = mountWithApp(<Checkbox label="Checkbox" />);

      expect(element).toContainReactComponent('input', {
        id: 'PolarisCheckbox1',
      });
    });
  });

  describe('disabled', () => {
    it('sets the disabled attribute on the input', () => {
      const element = mountWithApp(<Checkbox label="Checkbox" disabled />);

      expect(element).toContainReactComponent('input', {
        disabled: true,
      });
    });

    it('is only disabled when disabled is explicitly set to true', () => {
      let element = mountWithApp(<Checkbox label="Checkbox" />);

      expect(element).toContainReactComponent('input', {
        disabled: undefined,
      });

      element = mountWithApp(<Checkbox label="Checkbox" disabled={false} />);

      expect(element).toContainReactComponent('input', {
        disabled: false,
      });
    });
  });

  describe('helpText', () => {
    it('connects the input to the help text', () => {
      const checkbox = mountWithApp(
        <Checkbox label="Checkbox" helpText="Some help" />,
      );

      expect(checkbox).toContainReactComponent('input', {
        'aria-describedby': 'PolarisCheckbox1HelpText',
      });

      expect(checkbox.find('div')).toContainReactText('Some help');
    });
  });

  describe('error', () => {
    it('marks the input as invalid', () => {
      const checkbox = mountWithApp(
        <Checkbox error={<span>Error</span>} label="Checkbox" />,
      );

      expect(checkbox).toContainReactComponent('input', {
        'aria-invalid': true,
      });

      checkbox.setProps({error: 'Some error'});

      expect(checkbox).toContainReactComponent('input', {
        'aria-invalid': true,
      });
    });

    it('connects the input to the error if the error is not boolean', () => {
      const checkbox = mountWithApp(
        <Checkbox label="Checkbox" error="Some error" />,
      );

      expect(checkbox).toContainReactComponent('input', {
        'aria-describedby': 'PolarisCheckbox1Error',
      });

      expect(checkbox.find('div')).toContainReactText('Some error');
    });

    it('does not connect the input to the error if the error is boolean', () => {
      const checkbox = mountWithApp(<Checkbox label="Checkbox" error />);

      expect(checkbox).toContainReactComponent('input', {
        'aria-describedby': undefined,
      });
    });

    it('connects the input to both an error and help text', () => {
      const checkbox = mountWithApp(
        <Checkbox label="Checkbox" error="Some error" helpText="Some help" />,
      );

      expect(checkbox).toContainReactComponent('input', {
        'aria-describedby': 'PolarisCheckbox1Error PolarisCheckbox1HelpText',
      });
      expect(checkbox.find('div')).toContainReactText('Some error');
      expect(checkbox.find('div')).toContainReactText('Some help');
    });
  });

  describe('indeterminate', () => {
    it('sets the indeterminate attribute to be true on the input when checked is "indeterminate"', () => {
      const checkbox = mountWithApp(
        <Checkbox label="Checkbox" checked="indeterminate" />,
      );

      expect(checkbox).toContainReactComponent('input', {
        indeterminate: 'true',
      } as AllHTMLAttributes<HTMLInputElement>);
    });

    it('sets the aria-checked attribute on the input as mixed when checked is "indeterminate"', () => {
      const checkbox = mountWithApp(
        <Checkbox label="Checkbox" checked="indeterminate" />,
      );

      expect(checkbox).toContainReactComponent('input', {
        'aria-checked': 'mixed',
      });
    });

    it('sets the checked attribute on the input to false when checked is "indeterminate"', () => {
      const checkbox = mountWithApp(
        <Checkbox label="Checkbox" checked="indeterminate" />,
      );

      expect(checkbox).toContainReactComponent('input', {
        checked: false,
      });
    });
  });

  describe('ariaDescribedBy', () => {
    it('sets the aria-describedBy attribute on the input', () => {
      const checkBox = mountWithApp(
        <Checkbox label="checkbox" ariaDescribedBy="SomeId" />,
      );

      expect(checkBox).toContainReactComponent('input', {
        'aria-describedby': 'SomeId',
      });
    });
  });

  describe('ariaControls', () => {
    it('sets the aria-controls attribute on the input', () => {
      const checkBox = mountWithApp(
        <Checkbox label="checkbox" ariaControls="SomeId" />,
      );

      expect(checkBox).toContainReactComponent('input', {
        'aria-controls': 'SomeId',
      });
    });
  });

  describe('Hovering the label', () => {
    it('adds the hover class to the Backdrop onMouseOver the label', () => {
      const checkBox = mountWithApp(<Checkbox label="checkbox" />);

      const label = checkBox.find('label');
      label!.trigger('onMouseOver');

      expect(checkBox).toContainReactComponent('span', {
        className: 'Backdrop hover',
      });
    });

    it('removes the hover class from the Backdrop onMouseOut the label', () => {
      const checkBox = mountWithApp(<Checkbox label="checkbox" />);

      const label = checkBox.find('label');
      label!.trigger('onMouseOver');
      label!.trigger('onMouseOut');

      expect(checkBox).toContainReactComponent('span', {
        className: 'Backdrop',
      });
    });
  });
});

function noop() {}
