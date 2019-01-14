import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import {Props, RangeSliderValue, DualValue} from './types';
import {RangeSliderDefault} from './utilities';

import {SingleThumb, DualThumb} from './components';

type CombinedProps = Props & WithAppProviderProps;

const getUniqueID = createUniqueIDFactory('RangeSlider');

export function RangeSlider(props: CombinedProps) {
  const {
    id = getUniqueID(),
    min = RangeSliderDefault.Min,
    max = RangeSliderDefault.Max,
    step = RangeSliderDefault.Step,
    value,
    ...rest
  } = props;

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

export default withAppProvider<Props>()(RangeSlider);
