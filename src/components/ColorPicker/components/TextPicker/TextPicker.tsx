import React, {useCallback, useEffect, useState} from 'react';

import {classNames} from '../../../../utilities/css';
import {HSBColor} from '../../../../utilities/color-types';
import {
  normalizeColorString,
  expandHex,
  hsbToHex,
  hsbToString,
  rgbStringToHex,
  nameToHex,
  hexToHsb,
} from '../../../../utilities/color-transformers';
import {
  isColorName,
  isHexString,
  isHashlessHex,
  isRgbString,
} from '../../../../utilities/color-validation';
import {useI18n} from '../../../../utilities/i18n';
import {TextField} from '../../../TextField';
import styles from '../../ColorPicker.scss';

export interface TextPickerProps {
  /** The currently selected color */
  color: HSBColor;
  /** Allow user to select an alpha value */
  allowAlpha?: boolean;
  /** Callback when value is changed */
  onChange(hex: string): void;
}

export function TextPicker({color, allowAlpha, onChange}: TextPickerProps) {
  const i18n = useI18n();

  const [text, setText] = useState('');
  const [lastValidValue, setLastValidValue] = useState('');

  const handleTextChange = useCallback((value) => {
    setText(value);
  }, []);

  const handleBlur = useCallback(() => {
    const validUserInput = coerceToValidUserInput(text);
    if (validUserInput) {
      setText(validUserInput);
      setLastValidValue(validUserInput);

      const colorHasChanged = validUserInput !== hsbToHex(color);

      if (colorHasChanged) {
        onChange(validUserInput);
      }

      return;
    }

    setText(lastValidValue);
  }, [color, lastValidValue, onChange, text]);

  useEffect(() => {
    const newValue = hsbToHex(color);
    if (newValue !== hsbToHex(hexToHsb(lastValidValue))) setText(newValue);
    if (lastValidValue === '') setLastValidValue(newValue);
  }, [color, lastValidValue]);

  const className = classNames(
    styles.TextPicker,
    allowAlpha && styles.AlphaAllowed,
  );
  const label = i18n.translate(
    'Polaris.ColorPicker.textPickerAccessibilityLabel',
  );
  const valueForDisplay = isHexString(text) ? text.toUpperCase() : text;

  const renderSelectedColorSwatch = () => {
    const className = classNames(
      styles.TextFieldSwatch,
      allowAlpha && styles.AlphaAllowed,
    );
    const style = {backgroundColor: hsbToString(color)};

    return (
      <div className={className}>
        <div style={style} className={styles.SwatchBackground} />
      </div>
    );
  };

  const coerceToValidUserInput = (value: string) => {
    const normalizedValue = normalizeColorString(value);
    switch (true) {
      case isHexString(normalizedValue):
        return expandHex(normalizedValue);
      case isHashlessHex(normalizedValue):
        return expandHex(`#${normalizedValue}`);
      case isRgbString(normalizedValue):
        return rgbStringToHex(normalizedValue);
      case isColorName(normalizedValue):
        return nameToHex(normalizedValue);
      default:
        return null;
    }
  };

  return (
    <div className={className}>
      <TextField
        label={label}
        labelHidden
        value={valueForDisplay}
        onBlur={handleBlur}
        onChange={handleTextChange}
        prefix={renderSelectedColorSwatch()}
        autoComplete={false}
      />
    </div>
  );
}
