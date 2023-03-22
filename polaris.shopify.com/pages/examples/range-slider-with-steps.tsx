import {LegacyCard, RangeSlider} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function RangeSliderWithPreciseRangeControlExample() {
  const [rangeValue, setRangeValue] = useState(4);

  const handleRangeSliderChange = useCallback(
    (value: number) => setRangeValue(value),
    [],
  );

  return (
    <LegacyCard sectioned title="Navigation branding">
      <RangeSlider
        output
        label="Logo offset"
        min={-20}
        max={20}
        step={4}
        value={rangeValue}
        onChange={handleRangeSliderChange}
      />
    </LegacyCard>
  );
}

export default withPolarisExample(RangeSliderWithPreciseRangeControlExample);
