import React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import {Props, RangeSliderValue, DualValue} from './types';
import {RangeSliderDefault} from './utilities';

import {SingleThumb, DualThumb} from './components';

type CombinedProps = Props & WithAppProviderProps;

const getUniqueID = createUniqueIDFactory('RangeSlider');

class RangeSlider extends React.Component<CombinedProps> {
  private id = getUniqueID();

  render() {
    const {
      min = RangeSliderDefault.Min,
      max = RangeSliderDefault.Max,
      step = RangeSliderDefault.Step,
      value,
      ...rest
    } = this.props;

    const sharedProps = {
      id: this.id,
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
}

function isDualThumb(value: RangeSliderValue): value is DualValue {
  return Array.isArray(value);
}

export default withAppProvider<Props>()(RangeSlider);
