import React from 'react';

import {MinusIcon, PlusIcon} from '@shopify/polaris-icons';

import {TextField} from '../../TextField';
import {StepperButton} from './StepperButton';
import {useStepper} from './useStepper';

interface Props {
  value: number;
  label?: string;
  minValue?: number;
  maxValue?: number;
  disabled?: boolean;
  valueChanged: (newValue: number) => void;
}

export function Stepper({
  value,
  label,
  minValue,
  maxValue,
  valueChanged,
  disabled,
}: Props) {
  const {
    formattedValue,
    canDecrement,
    canIncrement,
    decrement,
    increment,
    handleValueChanged,
  } = useStepper({
    value,
    minValue,
    maxValue,
    valueChanged,
    disabled,
  });

  const minusButtonMarkup = (
    <StepperButton
      disabled={!canDecrement}
      onPress={decrement}
      source={MinusIcon}
    />
  );

  const plusButtonMarkup = (
    <StepperButton
      disabled={!canIncrement}
      onPress={increment}
      source={PlusIcon}
    />
  );
  return (
    <TextField
      label={label}
      type="integer"
      value={formattedValue}
      onChange={handleValueChanged}
      autoComplete="off"
      connectedLeft={minusButtonMarkup}
      connectedRight={plusButtonMarkup}
    />
  );
}
