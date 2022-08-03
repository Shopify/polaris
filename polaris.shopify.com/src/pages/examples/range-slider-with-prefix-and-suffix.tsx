import { Card, RangeSlider } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function RangeSliderWithPrefixAndSuffixExample() {
  const [rangeValue, setRangeValue] = useState(100);

  const handleRangeSliderChange = useCallback(
    (value) => setRangeValue(value),
    []
  );

  const suffixStyles = {
    minWidth: "24px",
    textAlign: "right",
  };

  return (
    <Card sectioned title="Text color">
      <RangeSlider
        output
        label="Hue color mix"
        min={0}
        max={360}
        value={rangeValue}
        onChange={handleRangeSliderChange}
        prefix={<p>Hue</p>}
        suffix={<p style={suffixStyles}>{rangeValue}</p>}
      />
    </Card>
  );
}

export default withPolarisExample(RangeSliderWithPrefixAndSuffixExample);
