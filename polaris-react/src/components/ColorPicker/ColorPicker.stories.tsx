import React, {useCallback, useEffect, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  ColorPicker,
  TextField,
  hsbToHex,
  rgbToHsb,
  hexToRgb,
} from '@shopify/polaris';

export default {
  component: ColorPicker,
} as ComponentMeta<typeof ColorPicker>;

export function Default() {
  const [color, setColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  return <ColorPicker onChange={setColor} color={color} />;
}

export function WithTransparentValue() {
  const [color, setColor] = useState({
    hue: 300,
    brightness: 1,
    saturation: 0.7,
    alpha: 0.7,
  });

  return <ColorPicker onChange={setColor} color={color} allowAlpha />;
}

export function WithTransparentValueFullWidth() {
  const [color, setColor] = useState({
    hue: 300,
    brightness: 1,
    saturation: 0.7,
    alpha: 0.7,
  });

  return <ColorPicker fullWidth onChange={setColor} color={color} allowAlpha />;
}

export function WithHexTextField() {
  const [color, setColor] = useState({
    hue: 300,
    saturation: 0.7,
    brightness: 1,
  });

  const [hex, setHex] = useState(hsbToHex(color));

  const handleBlur = useCallback(() => {
    setColor(rgbToHsb(hexToRgb(hex)));
  }, [hex]);

  useEffect(() => {
    setHex(hsbToHex(color));
  }, [color]);

  const styles = {
    Wrapper: {
      display: 'grid',
      gap: 'var(--p-space-200)',
      gridTemplateColumns: 'auto 1fr',
      maxWidth: 'fit-content',
    },
    Picker: {
      gridColumn: '1 / 3',
    },
    Tile: {
      minHeight: 'calc(100% - 0.125rem)',
      aspectRatio: '1 / 1',
      borderRadius: 'var(--p-border-radius-100)',
      border: 'var(--p-border-width-025) solid var(--p-color-border-secondary)',
      backgroundColor: hsbToHex(color),
    },
    TextField: {
      maxWidth: 'fit-content',
    },
  };

  return (
    <div style={styles.Wrapper}>
      <div style={styles.Picker}>
        <ColorPicker onChange={setColor} color={color} />
      </div>

      <div style={styles.Tile} />

      <div style={styles.TextField}>
        <TextField
          label=""
          prefix="#"
          value={hex.replace('#', '')}
          onChange={setHex}
          onBlur={handleBlur}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
