import React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../utilities/with-app-provider';
import {RangeSliderProps, RangeSliderValue, DualValue} from './types';
import {RangeSliderDefault} from './utilities';

import {SingleThumb, DualThumb} from './components';
import styles from './RangeSlider.scss';

// The script in the styleguide that generates the Props Explorer data expects
// a component's props to be found in the Props interface. This silly workaround
// ensures that the Props Explorer table is generated correctly, instead of
// crashing if we write `RangeSlider extends React.Component<RangeSliderProps>`
interface Props extends RangeSliderProps {}
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

    const sliderType = isDualThumb(value) ? (
      <DualThumb value={value} {...sharedProps} />
    ) : (
      <SingleThumb value={value} {...sharedProps} />
    );

    return <div className={styles.RangeSliderContainer}>{sliderType}</div>;
  }
}

function isDualThumb(value: RangeSliderValue): value is DualValue {
  return Array.isArray(value);
}

export default withAppProvider<Props>()(RangeSlider);
