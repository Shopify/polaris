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
