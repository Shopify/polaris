import React, {useCallback, useState} from 'react';
import type {Meta} from '@storybook/react';
import {
  Box,
  LegacyCard,
  RangeSlider,
  LegacyStack,
  Text,
  TextField,
} from '@shopify/polaris';

export default {
  component: RangeSlider,
} as Meta<typeof RangeSlider>;

export const Default = {
  render() {
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
  },
};

export const WithMinAndMax = {
  render() {
    const [rangeValue, setRangeValue] = useState(0);

    const handleRangeSliderChange = useCallback(
      (value) => setRangeValue(value),
      [],
    );

    return (
      <LegacyCard sectioned title="Navigation branding">
        <RangeSlider
          output
          label="Logo offset"
          min={-20}
          max={20}
          value={rangeValue}
          onChange={handleRangeSliderChange}
        />
      </LegacyCard>
    );
  },
};

export const WithSteps = {
  render() {
    const [rangeValue, setRangeValue] = useState(4);

    const handleRangeSliderChange = useCallback(
      (value) => setRangeValue(value),
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
  },
};

export const WithPrefixAndSuffix = {
  render() {
    const [rangeValue, setRangeValue] = useState(100);

    const handleRangeSliderChange = useCallback(
      (value) => setRangeValue(value),
      [],
    );

    return (
      <LegacyCard sectioned title="Text color">
        <RangeSlider
          output
          label="Hue color mix"
          min={0}
          max={360}
          value={rangeValue}
          onChange={handleRangeSliderChange}
          prefix={
            <Text as="p" variant="bodyMd">
              Hue
            </Text>
          }
          suffix={
            <Box minWidth="24px">
              <Text as="span" variant="bodyMd">
                {rangeValue}
              </Text>
            </Box>
          }
        />
      </LegacyCard>
    );
  },
};

export const WithDualThumb = {
  render() {
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
  },
};
