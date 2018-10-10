import * as React from 'react';
import {shallowWithAppProvider, mountWithAppProvider} from 'tests/utilities';
import {Checkbox} from 'components';
import CheckableButton from '../CheckableButton';

const CheckableButtonProps = {
  label: 'Test-Label',
  accessibilityLabel: 'Accessibility-Label',
  selected: true,
  selectMode: false,
  disabled: false,
};

describe('<CheckableButton />', () => {
  describe('select', () => {
    it('correctly passes down to Checkbox', () => {
      const {selected} = CheckableButtonProps;
      const element = shallowWithAppProvider(
        <CheckableButton {...CheckableButtonProps} />,
      );
      expect(element.find(Checkbox).prop('checked')).toEqual(selected);
    });
  });

  describe('label', () => {
    it('is correctly passed down to span', () => {
      const {label} = CheckableButtonProps;
      const element = shallowWithAppProvider(
        <CheckableButton {...CheckableButtonProps} />,
      );
      expect(element.find('span').text()).toEqual(label);
    });
  });

  describe('accessibilityLabel', () => {
    it('sets the label on the Checkbox', () => {
      const {accessibilityLabel} = CheckableButtonProps;
      const element = shallowWithAppProvider(
        <CheckableButton {...CheckableButtonProps} />,
      );
      expect(
        element
          .find(Checkbox)
          .first()
          .prop('label'),
      ).toEqual(accessibilityLabel);
    });

    describe('disabled', () => {
      it('is correctly passed down to checkbox', () => {
        const {disabled} = CheckableButtonProps;
        const element = shallowWithAppProvider(
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
  });

  describe('onToggleAll', () => {
    it('is called when the CheckableButton is clicked', () => {
      const spy = jest.fn();
      const element = mountWithAppProvider(
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
