import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import {Props, RangeSliderValue} from './types';
import {DEFAULT_RANGE_SLIDER_PROPS} from './utilities';

import {SingleThumb, DualThumb} from './components';

type CombinedProps = Props & WithAppProviderProps;

const getUniqueID = createUniqueIDFactory('RangeSlider');

export function RangeSlider(props: CombinedProps) {
  const {
    id = getUniqueID(),
    min = DEFAULT_RANGE_SLIDER_PROPS.min,
    max = DEFAULT_RANGE_SLIDER_PROPS.max,
    step = DEFAULT_RANGE_SLIDER_PROPS.step,
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
