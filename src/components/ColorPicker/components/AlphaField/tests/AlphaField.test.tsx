import React from 'react';
import {mountWithAppProvider} from 'test-utilities/legacy';
import {AlphaField} from '../AlphaField';
import {TextField} from '../../../../TextField';

describe('<AlphaField />', () => {
  const mockProps = {
    alpha: 0,
    onChange: noop,
  };

  describe('alpha', () => {
    it('converts alpha to percentage in the TextField', () => {
      const alpha = 0.5;
      const alphaField = mountWithAppProvider(
        <AlphaField {...mockProps} alpha={alpha} />,
      );
      const textField = alphaField.find(TextField);
      const expectedPercentage = Math.round(alpha * 100).toString();

      expect(textField.prop('value')).toBe(expectedPercentage);
    });
  });

  describe('onChange()', () => {
    it('calls onChange with the alpha value when percentage is set', () => {
      const onChangeSpy = jest.fn();
      const alphaField = mountWithAppProvider(
        <AlphaField {...mockProps} onChange={onChangeSpy} />,
      );
      const textField = alphaField.find(TextField);
      const percentageValue = 70;
      const expectedAlpha = percentageValue / 100;

      (textField.find('input') as any).instance().value = percentageValue;
      textField
        .find('input')
        .simulate('change')
        .simulate('blur');

      expect(onChangeSpy).toHaveBeenCalledWith(expectedAlpha);
    });

    it('calls onChange with the 1 when percentage value over 100 is set', () => {
      const onChangeSpy = jest.fn();
      const alphaField = mountWithAppProvider(
        <AlphaField {...mockProps} onChange={onChangeSpy} />,
      );
      const textField = alphaField.find(TextField);
      const percentageValue = 150;
      const expectedAlpha = 1;

      (textField.find('input') as any).instance().value = percentageValue;
      textField
        .find('input')
        .simulate('change')
        .simulate('blur');

      expect(onChangeSpy).toHaveBeenCalledWith(expectedAlpha);
    });
  });
});

function noop() {}
