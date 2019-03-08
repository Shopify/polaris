import * as React from 'react';
import {Checkbox} from '@shopify/polaris';
import {mountWithPolarisContext} from 'tests/utilities';
import {shallowWithAppProvider} from '../../../tests/utilities';
import CheckableButton from '../CheckableButton';

const CheckableButtonProps = {
  label: 'Test-Label',
  accessibilityLabel: 'Accessibility-Label',
  selected: true,
  selectMode: false,
  disabled: false,
};

describe('<CheckableButton />', () => {
  describe('selected prop', () => {
    it('is passed down to Checkbox', async () => {
      const {selected} = CheckableButtonProps;
      const element = await shallowWithAppProvider(
        <CheckableButton {...CheckableButtonProps} />,
      );
      expect(element.find(Checkbox).prop('checked')).toEqual(selected);
    });
  });

  describe('label', () => {
    it('is passed down to span', async () => {
      const {label} = CheckableButtonProps;
      const element = await shallowWithAppProvider(
        <CheckableButton {...CheckableButtonProps} />,
      );
      expect(element.find('span').text()).toEqual(label);
    });
  });

  describe('accessibilityLabel', () => {
    it('sets the label on the Checkbox', async () => {
      const {accessibilityLabel} = CheckableButtonProps;
      const element = await shallowWithAppProvider(
        <CheckableButton {...CheckableButtonProps} />,
      );
      expect(
        element
          .find(Checkbox)
          .first()
          .prop('label'),
      ).toEqual(accessibilityLabel);
    });
  });

  describe('disabled prop', () => {
    it('is passed down to checkbox', async () => {
      const {disabled} = CheckableButtonProps;
      const element = await shallowWithAppProvider(
        <CheckableButton {...CheckableButtonProps} />,
      );
      expect(
        element
          .find(Checkbox)
          .first()
          .prop('disabled'),
      ).toEqual(disabled);
    });
  });

  describe('onToggleAll', () => {
    it('is called when the CheckableButton is clicked', async () => {
      const spy = jest.fn();
      const element = await mountWithPolarisContext(
        <CheckableButton {...CheckableButtonProps} onToggleAll={spy} />,
      );
      element
        .find('div')
        .first()
        .simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });
});
