import { TextField } from "@shopify/polaris";
import { useState, useCallback } from "react";

function EmailFieldExample() {
  const [value, setValue] = useState("bernadette.lapresse@jadedpixel.com");

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  return (
    <TextField
      label="Email"
      type="email"
      value={value}
      onChange={handleChange}
      autoComplete="email"
    />
  );
}

import { withPolarisExample } from "../../components/PolarisExamplePage";
export default withPolarisExample(() => <p>tk</p>);
