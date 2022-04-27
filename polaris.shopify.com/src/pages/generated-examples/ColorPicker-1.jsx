import { AppProvider, ColorPicker } from "@shopify/polaris";
import { useState } from "react";
import translations from '@shopify/polaris/locales/en.json';
function ColorPickerExample() {
  const [color, setColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  return <ColorPicker onChange={setColor} color={color} />;
}

function Example() {
  return (
    <AppProvider i18n={translations}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/@shopify/polaris@latest/build/esm/styles.css"
      />
      <div
        style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 50px",
  }}
      >
        <ColorPickerExample />
      </div>
    </AppProvider>
  );
}

export default Example;
    