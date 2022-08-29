import React, {useCallback} from 'react';

import {hsbToHex} from '../../../../utilities/color-transformers';
import type {HSBColor, HSBAColor} from '../../../../utilities/color-types';
import {classNames} from '../../../../utilities/css';
import {TextField as PolarisTextField} from '../../../TextField';

import styles from './TextField.scss';

interface Color extends HSBColor {
  /** Level of transparency */
  alpha?: HSBAColor['alpha'];
}

interface TextFieldProps {
  /** The currently selected color (coming from parent) */
  color: Color;
  /** Allow user to select an alpha value (coming from parent) */
  allowAlpha?: boolean;
  /** Allow HuePicker to take the full width (coming from parent) */
  fullWidth?: boolean;
}

function TextField({color, allowAlpha, fullWidth}: TextFieldProps) {
  const hexColor = hsbToHex(color);

  const handleTextChange = useCallback(() => {
    console.log('text changed');
  }, []);

  const handleBlur = useCallback(() => {
    console.log('text changed');
  }, []);

  const className = classNames(
    styles.ColorPickerTextFieldSize,
    allowAlpha && styles.withAlpha,
    fullWidth && styles.fullWidth,
  );

  return (
    <div className={className}>
      <PolarisTextField
        label=""
        prefix="#"
        value={hexColor.replace('#', '').toUpperCase()}
        onChange={handleTextChange}
        onBlur={handleBlur}
        autoComplete="off"
      />
    </div>
  );
}

export {TextField};
