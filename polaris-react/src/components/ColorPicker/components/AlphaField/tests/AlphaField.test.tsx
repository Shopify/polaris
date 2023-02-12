import React from 'react';
import {mountWithApp} from 'tests/utilities';

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
      const alphaField = mountWithApp(
        <AlphaField {...mockProps} alpha={alpha} />,
      );
      const textField = alphaField.find(TextField);
      const expectedPercentage = Math.round(alpha * 100).toString();

      expect(textField!.prop('value')).toBe(expectedPercentage);
    });
  });

  describe('onChange()', () => {
    it('calls onChange with the alpha value when percentage is set', () => {
      const onChangeSpy = jest.fn();
      const alphaField = mountWithApp(
        <AlphaField {...mockProps} onChange={onChangeSpy} />,
      );
      const percentageValue = 70;
      const expectedAlpha = percentageValue / 100;

      alphaField
        .find(TextField)!
        .find('input')!
        .trigger('onChange', {
          currentTarget: {
            value: percentageValue.toString(),
          },
        });
      alphaField.find(TextField)!.trigger('onBlur');

      expect(onChangeSpy).toHaveBeenCalledWith(expectedAlpha);
    });

    it('calls onChange with alpha value of 1 when percentage value over 100 is set', () => {
      const onChangeSpy = jest.fn();
      const alphaField = mountWithApp(
        <AlphaField {...mockProps} onChange={onChangeSpy} />,
      );
      const percentageValue = 150;
      const expectedAlpha = 1;

      alphaField
        .find(TextField)!
        .find('input')!
        .trigger('onChange', {
          currentTarget: {
            value: percentageValue.toString(),
          },
        });
      alphaField.find(TextField)!.trigger('onBlur');

      expect(onChangeSpy).toHaveBeenCalledWith(expectedAlpha);
    });
  });

  describe('<Spinner />', () => {
    describe('up and down buttons', () => {
      it('calls onChange with 0.01 when the TextField Spinner up button is clicked', () => {
        const onChangeSpy = jest.fn();
        const alphaField = mountWithApp(
          <AlphaField {...mockProps} onChange={onChangeSpy} />,
        );
        const textFieldButtons = alphaField!.findAll('div', {role: 'button'});
        const upButton = textFieldButtons[0];

        upButton!.trigger('onClick');
        alphaField.find(TextField)!.trigger('onBlur');

        expect(onChangeSpy).toHaveBeenCalledWith(0.01);
      });

      it('calls onChange with 0.99 when the TextField Spinner down button is clicked', () => {
        const onChangeSpy = jest.fn();
        const alphaField = mountWithApp(
          <AlphaField alpha={1} onChange={onChangeSpy} />,
        );
        const textFieldButtons = alphaField!.findAll('div', {role: 'button'});
        const downButton = textFieldButtons[textFieldButtons.length - 1];

        downButton!.trigger('onClick');
        alphaField.find(TextField)!.find('input')!.trigger('onBlur');

        expect(onChangeSpy).toHaveBeenCalledWith(0.99);
      });
    });

    describe('up and down keys', () => {
      it('calls onChange with 0.01 when the TextField ArrowUp key is pressed and alpha is 0', () => {
        const onChangeSpy = jest.fn();
        const alphaField = mountWithApp(
          <AlphaField {...mockProps} onChange={onChangeSpy} />,
        );

        const wrapper = alphaField.find('div', {
          id: 'AlphaFieldWrapper',
        });
        const event = new KeyboardEvent('keydown', {
          key: 'ArrowUp',
        });

        wrapper?.trigger('onKeyDown', event);

        expect(onChangeSpy).toHaveBeenCalledWith(0.01);
      });

      it('calls onChange with 0.99 when the TextField ArrowUp key is pressed and alpha is 1', () => {
        const onChangeSpy = jest.fn();
        const alphaField = mountWithApp(
          <AlphaField {...mockProps} alpha={1} onChange={onChangeSpy} />,
        );

        const wrapper = alphaField.find('div', {
          id: 'AlphaFieldWrapper',
        });
        const event = new KeyboardEvent('keydown', {
          key: 'ArrowDown',
        });

        wrapper?.trigger('onKeyDown', event);

        expect(onChangeSpy).toHaveBeenCalledWith(0.99);
      });

      describe('shift keys', () => {
        it('calls onChange with 0.05 when the TextField ArrowUp key is pressed, the shiftKey is held and alpha is 0', () => {
          const onChangeSpy = jest.fn();
          const alphaField = mountWithApp(
            <AlphaField {...mockProps} onChange={onChangeSpy} />,
          );

          const wrapper = alphaField.find('div', {
            id: 'AlphaFieldWrapper',
          });
          const event = new KeyboardEvent('keydown', {
            key: 'ArrowUp',
            shiftKey: true,
          });

          wrapper?.trigger('onKeyDown', event);

          expect(onChangeSpy).toHaveBeenCalledWith(0.05);
        });

        it('calls onChange with 0.95 when the TextField ArrowUp key is pressed, the shiftKey is held and alpha is 1', () => {
          const onChangeSpy = jest.fn();
          const alphaField = mountWithApp(
            <AlphaField {...mockProps} alpha={1} onChange={onChangeSpy} />,
          );

          const wrapper = alphaField.find('div', {
            id: 'AlphaFieldWrapper',
          });
          const event = new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            shiftKey: true,
          });

          wrapper?.trigger('onKeyDown', event);

          expect(onChangeSpy).toHaveBeenCalledWith(0.95);
        });
      });
    });
  });
});

function noop() {}
