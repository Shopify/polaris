import React from 'react';

import {classNames} from '../../../../utilities/css';
import {clamp} from '../../../../utilities/clamp';
import {Labelled, helpTextID} from '../../../Labelled';
import {Text} from '../../../Text';
import {invertNumber} from '../../utilities';
import type {RangeSliderProps} from '../../types';
import sharedStyles from '../../RangeSlider.module.scss';

import styles from './SingleThumb.module.scss';

export interface SingleThumbProps extends RangeSliderProps {
  value: number;
  id: string;
  min: number;
  max: number;
  step: number;
}

export function SingleThumb(props: SingleThumbProps) {
  const {
    id,
    error,
    helpText,
    value,
    min,
    max,
    disabled,
    output,
    prefix,
    suffix,
    label,
    labelAction,
    labelHidden,
    step,
    onBlur,
    onFocus,
  } = props;
  const clampedValue = clamp(value, min, max);
  const describedBy: string[] = [];

  if (error) {
    describedBy.push(`${id}Error`);
  }

  if (helpText) {
    describedBy.push(helpTextID(id));
  }

  const ariaDescribedBy = describedBy.length
    ? describedBy.join(' ')
    : undefined;

  const sliderProgress = ((clampedValue - min) * 100) / (max - min);
  const outputFactor = invertNumber((sliderProgress - 50) / 100);

  const cssVars = {
    '--pc-range-slider-min': min,
    '--pc-range-slider-max': max,
    '--pc-range-slider-current': clampedValue,
    '--pc-range-slider-progress': `${sliderProgress}%`,
    '--pc-range-slider-output-factor': `${outputFactor}`,
  } as React.CSSProperties;

  const outputMarkup = !disabled && output && (
    <output htmlFor={id} className={styles.Output}>
      <div className={styles.OutputBubble}>
        <Text as="span" variant="headingSm" alignment="center">
          {clampedValue}
        </Text>
      </div>
    </output>
  );

  const prefixMarkup = prefix && <div className={styles.Prefix}>{prefix}</div>;

  const suffixMarkup = suffix && <div className={styles.Suffix}>{suffix}</div>;

  const className = classNames(
    styles.SingleThumb,
    sharedStyles.RangeSlider,
    error && styles.error,
    disabled && styles.disabled,
  );

  /* eslint-disable @shopify/react-require-autocomplete */
  return (
    <Labelled
      id={id}
      label={label}
      error={error}
      action={labelAction}
      labelHidden={labelHidden}
      helpText={helpText}
    >
      <div className={className} style={cssVars}>
        {prefixMarkup}
        <div
          className={classNames(
            styles.InputWrapper,
            sharedStyles['Track--dashed-after'],
          )}
        >
          <input
            type="range"
            className={styles.Input}
            id={id}
            name={id}
            min={min}
            max={max}
            step={step}
            value={clampedValue}
            disabled={disabled}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={clampedValue}
            aria-invalid={Boolean(error)}
            aria-describedby={ariaDescribedBy}
          />
          {outputMarkup}
        </div>
        {suffixMarkup}
      </div>
    </Labelled>
  );
  /* eslint-enable @shopify/react-require-autocomplete */

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {onChange} = props;

    onChange && onChange(parseFloat(event.currentTarget.value), id);
  }
}
