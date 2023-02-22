import {LegacyCard, RangeSlider} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function RangeSliderWithPrefixAndSuffixExample() {
  const [rangeValue, setRangeValue] = useState(100);

  const handleRangeSliderChange = useCallback(
    (value) => setRangeValue(value),
    [],
  );

  const suffixStyles = {
    minWidth: '24px',
    textAlign: 'right',
  };

  return (
    <LegacyCard sectioned title="Text color">
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
    </LegacyCard>
  );
}

export default withPolarisExample(RangeSliderWithPrefixAndSuffixExample);
