import {ColorPicker} from '@shopify/polaris';
import {useState} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ColorPickerWithTextFieldsExample() {
  const [color, setColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  return <ColorPicker onChange={setColor} color={color} textEditor />;
}

export default withPolarisExample(ColorPickerWithTextFieldsExample);
