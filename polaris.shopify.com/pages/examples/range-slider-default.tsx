import {LegacyCard, RangeSlider} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function RangeSliderExample() {
  const [rangeValue, setRangeValue] = useState(32);

  const handleRangeSliderChange = useCallback(
    (value) => setRangeValue(value),
    [],
  );

  return (
    <LegacyCard sectioned title="Background color">
      <RangeSlider
        label="Opacity percentage"
        value={rangeValue}
        onChange={handleRangeSliderChange}
        output
      />
    </LegacyCard>
  );
}

export default withPolarisExample(RangeSliderExample);
