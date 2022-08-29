import React, {useCallback, useEffect, useState, useRef} from 'react';

import {
  hsbToHex,
  expandHex,
  hexToRgb,
  rgbToHsb,
} from '../../../../utilities/color-transformers';
import {isHexString} from '../../../../utilities/color-validation';
import type {HSBColor, HSBAColor} from '../../../../utilities/color-types';
import {classNames} from '../../../../utilities/css';
import {TextField as PolarisTextField} from '../../../TextField';

import styles from './TextField.scss';

interface Color extends HSBColor {
  /** Level of transparency */
  alpha?: HSBAColor['alpha'];
}

export interface TextFieldProps {
  /** The currently selected color */
  color: Color;
  /** Allow user to select an alpha value */
  allowAlpha?: boolean;
  /** Allow HuePicker to take the full width */
  fullWidth?: boolean;
  /** Callback when color is selected */
  onChange(color: HSBAColor): void;
}

function TextField({color, allowAlpha, fullWidth, onChange}: TextFieldProps) {
  const [internalValue, setInternalValue] = useState<string | null>(
    hsbToHex(color),
  );
  const ignoreChangeRef = useRef(false);
  const value = internalValue ?? hsbToHex(color);

  const valueForDisplay = value.replace('#', '').toUpperCase();

  const className = classNames(
    styles.ColorPickerTextFieldSize,
    allowAlpha && styles.withAlpha,
    fullWidth && styles.fullWidth,
  );

  const handleUpdate = useCallback(() => {
    const validUserInput = coerceToValidUserInput(value);

    if (!validUserInput) {
      return;
    }

    setInternalValue(null);

    const colorHasChanged = validUserInput !== hsbToHex(color);

    if (colorHasChanged) {
      ignoreChangeRef.current = true;
      onChange({...rgbToHsb(hexToRgb(validUserInput)), alpha: 1});
    }
  }, [value, onChange, color]);

  useEffect(() => {
    if (internalValue !== null) {
      handleUpdate();
    }
  }, [internalValue, handleUpdate]);

  return (
    <div className={className}>
      <PolarisTextField
        label=""
        labelHidden
        prefix="#"
        placeholder={valueForDisplay}
        value={valueForDisplay}
        onChange={setInternalValue}
        autoComplete="off"
      />
    </div>
  );
}

function coerceToValidUserInput(value: string) {
  const coercedValue = !value.startsWith('#') ? `#${value}` : value;
  return isHexString(coercedValue) ? expandHex(coercedValue) : null;
}

export {TextField};
