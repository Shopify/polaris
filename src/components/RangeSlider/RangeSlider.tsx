import React from 'react';
import {useUniqueId} from '../../utilities/unique-id';
import {RangeSliderProps, RangeSliderValue, DualValue} from './types';
import {RangeSliderDefault} from './utilities';

import {SingleThumb, DualThumb} from './components';

// The script in the styleguide that generates the Props Explorer data expects
// that the interface defining the props is defined in this file, not imported
// from elsewhere. This silly workaround ensures that the Props Explorer table
// is generated correctly.
interface Props extends RangeSliderProps {}

export function RangeSlider({
  min = RangeSliderDefault.Min,
  max = RangeSliderDefault.Max,
  step = RangeSliderDefault.Step,
  value,
  ...rest
}: Props) {
  const id = useUniqueId('RangeSlider');

  const sharedProps = {
    id,
    min,
    max,
    step,
    ...rest,
  };

  return isDualThumb(value) ? (
    <DualThumb value={value} {...sharedProps} />
  ) : (
    <SingleThumb value={value} {...sharedProps} />
  );
}

function isDualThumb(value: RangeSliderValue): value is DualValue {
  return Array.isArray(value);
}
