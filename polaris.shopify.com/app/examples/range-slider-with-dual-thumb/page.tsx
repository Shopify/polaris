'use client';

import {
  LegacyCard,
  RangeSlider,
  LegacyStack,
  TextField,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function DualThumbRangeSliderExample() {
  const initialValue = [900, 1000];
  const prefix = '$';
  const min = 0;
  const max = 2000;
  const step = 10;

  const [intermediateTextFieldValue, setIntermediateTextFieldValue] =
    useState(initialValue);
  const [rangeValue, setRangeValue] = useState(initialValue);

  const handleRangeSliderChange = useCallback((value) => {
    setRangeValue(value);
    setIntermediateTextFieldValue(value);
  }, []);

  const handleLowerTextFieldChange = useCallback(
    (value) => {
      const upperValue = rangeValue[1];
      setIntermediateTextFieldValue([parseInt(value, 10), upperValue]);
    },
    [rangeValue],
  );

  const handleUpperTextFieldChange = useCallback(
    (value) => {
      const lowerValue = rangeValue[0];
      setIntermediateTextFieldValue([lowerValue, parseInt(value, 10)]);
    },
    [rangeValue],
  );

  const handleLowerTextFieldBlur = useCallback(() => {
    const upperValue = rangeValue[1];
    const value = intermediateTextFieldValue[0];

    setRangeValue([parseInt(value, 10), upperValue]);
  }, [intermediateTextFieldValue, rangeValue]);

  const handleUpperTextFieldBlur = useCallback(() => {
    const lowerValue = rangeValue[0];
    const value = intermediateTextFieldValue[1];

    setRangeValue([lowerValue, parseInt(value, 10)]);
  }, [intermediateTextFieldValue, rangeValue]);

  const handleEnterKeyPress = useCallback(
    (event) => {
      const newValue = intermediateTextFieldValue;
      const oldValue = rangeValue;

      if (event.keyCode === Key.Enter && newValue !== oldValue) {
        setRangeValue(newValue);
      }
    },
    [intermediateTextFieldValue, rangeValue],
  );

  const lowerTextFieldValue =
    intermediateTextFieldValue[0] === rangeValue[0]
      ? rangeValue[0]
      : intermediateTextFieldValue[0];

  const upperTextFieldValue =
    intermediateTextFieldValue[1] === rangeValue[1]
      ? rangeValue[1]
      : intermediateTextFieldValue[1];

  return (
    <LegacyCard sectioned title="Minimum requirements">
      <div onKeyDown={handleEnterKeyPress}>
        <RangeSlider
          output
          label="Money spent is between"
          value={rangeValue}
          prefix={prefix}
          min={min}
          max={max}
          step={step}
          onChange={handleRangeSliderChange}
        />
        <LegacyStack distribution="equalSpacing" spacing="extraLoose">
          <TextField
            label="Min money spent"
            type="number"
            value={`${lowerTextFieldValue}`}
            prefix={prefix}
            min={min}
            max={max}
            step={step}
            onChange={handleLowerTextFieldChange}
            onBlur={handleLowerTextFieldBlur}
            autoComplete="off"
          />
          <TextField
            label="Max money spent"
            type="number"
            value={`${upperTextFieldValue}`}
            prefix={prefix}
            min={min}
            max={max}
            step={step}
            onChange={handleUpperTextFieldChange}
            onBlur={handleUpperTextFieldBlur}
            autoComplete="off"
          />
        </LegacyStack>
      </div>
    </LegacyCard>
  );
}

export default withPolarisExample(DualThumbRangeSliderExample);
