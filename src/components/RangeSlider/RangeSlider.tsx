import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import {Props, RangeSliderValue} from './types';

import {SingleThumb, DualThumb} from './components';

type CombinedProps = Props & WithAppProviderProps;

const getUniqueID = createUniqueIDFactory('RangeSlider');

export function RangeSlider(props: CombinedProps) {
  const {
    id = getUniqueID(),
    min = 0,
    max = 100,
    step = 1,
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

function isDualThumb(value: RangeSliderValue): value is [number, number] {
  return Array.isArray(value);
}

export default withAppProvider<Props>()(RangeSlider);
