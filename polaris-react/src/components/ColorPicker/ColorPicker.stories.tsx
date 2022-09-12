import React, {useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  ColorPicker,
  Stack,
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
    brightness: 1,
    saturation: 0.7,
  });
  const [hex, setHex] = useState(hsbToHex(color));

  const handleBlur = React.useCallback(() => {
    setColor(rgbToHsb(hexToRgb(hex)));
  }, [hex]);

  React.useEffect(() => {
    setHex(hsbToHex(color));
  }, [color]);

  return (
    <>
      <ColorPicker onChange={setColor} color={color} />
      <div style={{paddingTop: 8}}>
        <Stack>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.2)',
              backgroundColor: hsbToHex(color),
            }}
          />
          <div style={{width: 143}}>
            <TextField
              label=""
              prefix="#"
              value={hex.replace('#', '')}
              onChange={setHex}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </div>
        </Stack>
      </div>
    </>
  );
}
