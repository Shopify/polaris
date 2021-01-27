import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {Checkbox} from 'components';

import {CheckableButton} from '../CheckableButton';
import {Key} from '../../../types';

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
      const element = mountWithAppProvider(
        <CheckableButton {...CheckableButtonProps} />,
      );
      expect(element.find(Checkbox).prop('checked')).toStrictEqual(selected);
    });
  });

  describe('label', () => {
    it('is passed down to span', () => {
      const {label} = CheckableButtonProps;
      const element = mountWithAppProvider(
        <CheckableButton {...CheckableButtonProps} />,
      );
      expect(element.find('span').last().text()).toStrictEqual(label);
    });
  });

  describe('accessibilityLabel', () => {
    it('sets the label on the Checkbox', () => {
      const {accessibilityLabel} = CheckableButtonProps;
      const element = mountWithAppProvider(
        <CheckableButton {...CheckableButtonProps} />,
      );
      expect(element.find(Checkbox).first().prop('label')).toStrictEqual(
        accessibilityLabel,
      );
    });

    describe('disabled', () => {
      it('is passed down to checkbox', () => {
        const {disabled} = CheckableButtonProps;
        const element = mountWithAppProvider(
          <CheckableButton {...CheckableButtonProps} />,
        );
        expect(element.find(Checkbox).first().prop('disabled')).toStrictEqual(
          disabled,
        );
      });
    });
  });

  describe('onToggleAll', () => {
    it('is called when the CheckableButton is clicked', () => {
      const spy = jest.fn();
      const element = mountWithAppProvider(
        <CheckableButton {...CheckableButtonProps} onToggleAll={spy} />,
      );
      element.find('div').first().simulate('click');
      expect(spy).toHaveBeenCalled();
    });

    it('is called when the CheckableButton pressed with spacebar', () => {
      const spy = jest.fn();
      const element = mountWithAppProvider(
        <CheckableButton {...CheckableButtonProps} onToggleAll={spy} />,
      );
      element.find(Checkbox).first().simulate('click', {
        keyCode: Key.Space,
      });
      expect(spy).toHaveBeenCalled();
    });
  });
});
