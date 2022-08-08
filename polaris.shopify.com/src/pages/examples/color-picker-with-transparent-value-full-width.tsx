import {ColorPicker} from '@shopify/polaris';
import {useState} from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function ColorPickerWithTransparentValueExample() {
  const [color, setColor] = useState({
    hue: 300,
    brightness: 1,
    saturation: 0.7,
    alpha: 0.7,
  });

  return (
    <div style={{width: '500px'}}>
      <ColorPicker fullWidth onChange={setColor} color={color} allowAlpha />
    </div>
  );
}

export default withPolarisExample(ColorPickerWithTransparentValueExample);
