import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {
  expandHex,
  rgbStringToHex,
  nameToHex,
  normalizeColorString,
} from '../../../../../utilities/color-transformers';
import {TextPicker} from '../TextPicker';
import {TextField} from '../../../../TextField';

const red = {
  hue: 0,
  saturation: 1,
  brightness: 1,
};

describe('<TextPicker />', () => {
  const mockProps = {
    color: red,
    allowAlpha: false,
    onChange: noop,
  };

  describe('color', () => {
    it("displays #FF0000 when 'red' color is passed as prop", () => {
      const textPicker = mountWithApp(<TextPicker {...mockProps} />);
      const textField = textPicker.find(TextField);
      const expectedHex = '#FF0000';

      expect(textField!.prop('value')).toBe(expectedHex);
    });
  });

  describe('allowAlpha', () => {
    it('renders color swatch', () => {
      const textPicker = mountWithApp(<TextPicker {...mockProps} />);

      expect(textPicker).toContainReactComponent(TextField, {
        prefix: expect.objectContaining({
          props: expect.objectContaining({className: 'TextFieldSwatch'}),
        }),
      });
    });
  });

  describe('onChange()', () => {
    it("calls onChange with #FFFFFF when 'white' is entered", () => {
      const onChangeSpy = jest.fn();
      const textPicker = mountWithApp(
        <TextPicker {...mockProps} onChange={onChangeSpy} />,
      );
      const colorValue = 'white';
      const expectedHex = nameToHex(normalizeColorString(colorValue));

      textPicker
        .find(TextField)!
        .find('input')!
        .trigger('onChange', {
          currentTarget: {
            value: colorValue,
          },
        });
      textPicker.find(TextField)!.trigger('onBlur');

      expect(onChangeSpy).toHaveBeenCalledWith(expectedHex);
    });

    it('calls onChange with #ff00ff when rgb(255, 0, 255) is entered', () => {
      const onChangeSpy = jest.fn();
      const textPicker = mountWithApp(
        <TextPicker {...mockProps} onChange={onChangeSpy} />,
      );
      const colorValue = 'rgb(255, 0, 255)';
      const expectedHex = rgbStringToHex(normalizeColorString(colorValue));

      textPicker
        .find(TextField)!
        .find('input')!
        .trigger('onChange', {
          currentTarget: {
            value: colorValue,
          },
        });
      textPicker.find(TextField)!.trigger('onBlur');

      expect(onChangeSpy).toHaveBeenCalledWith(expectedHex);
    });

    it('calls onChange with #ffffff when ffffff is entered', () => {
      const onChangeSpy = jest.fn();
      const textPicker = mountWithApp(
        <TextPicker {...mockProps} onChange={onChangeSpy} />,
      );
      const colorValue = 'ffffff';
      const expectedHex = expandHex(`#${normalizeColorString(colorValue)}`);

      textPicker
        .find(TextField)!
        .find('input')!
        .trigger('onChange', {
          currentTarget: {
            value: colorValue,
          },
        });
      textPicker.find(TextField)!.trigger('onBlur');

      expect(onChangeSpy).toHaveBeenCalledWith(expectedHex);
    });

    it('calls onChange with #ffffff when #fff is entered', () => {
      const onChangeSpy = jest.fn();
      const textPicker = mountWithApp(
        <TextPicker {...mockProps} onChange={onChangeSpy} />,
      );
      const colorValue = '#fff';
      const expectedHex = expandHex(normalizeColorString(colorValue));

      textPicker
        .find(TextField)!
        .find('input')!
        .trigger('onChange', {
          currentTarget: {
            value: colorValue,
          },
        });
      textPicker.find(TextField)!.trigger('onBlur');

      expect(onChangeSpy).toHaveBeenCalledWith(expectedHex);
    });

    it('calls onChange with #00ffff when 0ff is entered', () => {
      const onChangeSpy = jest.fn();
      const textPicker = mountWithApp(
        <TextPicker {...mockProps} onChange={onChangeSpy} />,
      );
      const colorValue = '0ff';
      const expectedHex = expandHex(`#${normalizeColorString(colorValue)}`);

      textPicker
        .find(TextField)!
        .find('input')!
        .trigger('onChange', {
          currentTarget: {
            value: colorValue,
          },
        });
      textPicker.find(TextField)!.trigger('onBlur');

      expect(onChangeSpy).toHaveBeenCalledWith(expectedHex);
    });

    it('does not call onChange when invalid value is entered', () => {
      const onChangeSpy = jest.fn();
      const textPicker = mountWithApp(
        <TextPicker {...mockProps} onChange={onChangeSpy} />,
      );
      const colorValue = '#00000z';

      textPicker
        .find(TextField)!
        .find('input')!
        .trigger('onChange', {
          currentTarget: {
            value: colorValue,
          },
        });
      textPicker.find(TextField)!.trigger('onBlur');

      expect(onChangeSpy).not.toHaveBeenCalled();
    });
  });
});

function noop() {}
