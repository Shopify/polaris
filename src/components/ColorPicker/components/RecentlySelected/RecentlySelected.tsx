import React, {useCallback} from 'react';

import {classNames} from '../../../../utilities/css';
import {useI18n} from '../../../../utilities/i18n';
import {hsbToString} from '../../../../utilities/color-transformers';
import {TextStyle} from '../../../TextStyle';
import {Color} from '../../ColorPicker';
import styles from '../../ColorPicker.scss';

export interface RecentlySelectedProps {
  colors: Color[];
  currentColor: Color;
  allowAlpha?: boolean;
  onChange(color: Color): void;
}

export function RecentlySelected({
  colors,
  currentColor,
  allowAlpha,
  onChange,
}: RecentlySelectedProps) {
  const i18n = useI18n();

  const label = i18n.translate(
    'Polaris.ColorPicker.RecentlySelectedAccessibilityLabel',
  );

  const renderPalette = (color: Color, index: number) => {
    const className = classNames(
      styles.RecentlySelectedPalette,
      allowAlpha && styles.AlphaAllowed,
    );
    const paletteItemStyle = {
      backgroundColor: hsbToString(color),
    };
    return (
      <div className={className}>
        <button
          key={index}
          type="button"
          className={styles.SwatchBackground}
          aria-label={label}
          style={paletteItemStyle}
          onClick={() => handlePaletteClick(color)}
        />
      </div>
    );
  };

  const palettesMarkup = colors.map((color: Color, index: number) =>
    renderPalette(color, index),
  );

  const handlePaletteClick = useCallback(
    (color) => {
      const colorHasChanged =
        color.alpha !== currentColor.alpha ||
        color.brightness !== currentColor.brightness ||
        color.hue !== currentColor.hue ||
        color.saturation !== currentColor.saturation;

      if (colorHasChanged) {
        onChange(color);
      }
    },
    [currentColor, onChange],
  );

  return (
    <div className={styles.RecentlySelected}>
      <p className={styles.RecentlySelectedTitle}>{label}</p>
      <div className={styles.RecentlySelectedPalettes}>{palettesMarkup}</div>
    </div>
  );
}
