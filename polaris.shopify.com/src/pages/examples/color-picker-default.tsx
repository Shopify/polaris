import { ColorPicker } from "@shopify/polaris";
import { useState } from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function ColorPickerExample() {
  const [color, setColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  return <ColorPicker onChange={setColor} color={color} />;
}

export default withPolarisExample(ColorPickerExample);
