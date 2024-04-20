import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Checkbox} from '../../Checkbox';
import {CheckableButton} from '../CheckableButton';

const CheckableButtonProps = {
  label: 'Test-Label',
  accessibilityLabel: 'Accessibility-Label',
  selected: true,
  selectMode: false,
  disabled: false,
};

describe('<CheckableButton />', () => {
  describe('select', () => {
    it('is passed down to Checkbox', () => {
      const {selected} = CheckableButtonProps;
      const element = mountWithApp(
        <CheckableButton {...CheckableButtonProps} />,
      );
      expect(element).toContainReactComponent(Checkbox, {
        checked: selected,
      });
      expect(element).toContainReactComponentTimes(Checkbox, 1);
    });
  });

  describe('label', () => {
    it('is passed down to span', () => {
      const {label} = CheckableButtonProps;
      const element = mountWithApp(
        <CheckableButton {...CheckableButtonProps} />,
      );
      expect(element).toContainReactText(label);
    });
  });

  describe('accessibilityLabel', () => {
    it('sets the label on the Checkbox', () => {
      const {accessibilityLabel} = CheckableButtonProps;
      const element = mountWithApp(
        <CheckableButton {...CheckableButtonProps} />,
      );
      expect(element).toContainReactComponent(Checkbox, {
        label: accessibilityLabel,
      });
    });

    describe('disabled', () => {
      it('is passed down to checkbox', () => {
        const {disabled} = CheckableButtonProps;
        const element = mountWithApp(
          <CheckableButton {...CheckableButtonProps} />,
        );
        expect(element).toContainReactComponent(Checkbox, {
          disabled,
        });
      });
    });
  });

  describe('onToggleAll', () => {
    it('is called when the CheckableButton is clicked', () => {
      const spy = jest.fn();
      const element = mountWithApp(
        <CheckableButton {...CheckableButtonProps} onToggleAll={spy} />,
      );
      element.find('div')!.trigger('onClick');
      expect(spy).toHaveBeenCalled();
    });
  });
});
