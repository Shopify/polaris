import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import clamp from '../../../../utilities/clamp';
import Labelled, {helpTextID} from '../../../Labelled';

import {invertNumber, CSS_VAR_PREFIX} from '../../utilities';
import {Props as RangeSliderProps} from '../../types';

import * as styles from './SingleThumb.scss';

export interface Props extends RangeSliderProps {
  value: number;
  id: string;
  min: number;
  max: number;
  step: number;
}

export default function SingleThumb(props: Props) {
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
    [`${CSS_VAR_PREFIX}min`]: min,
    [`${CSS_VAR_PREFIX}max`]: max,
    [`${CSS_VAR_PREFIX}current`]: clampedValue,
    [`${CSS_VAR_PREFIX}progress`]: `${sliderProgress}%`,
    [`${CSS_VAR_PREFIX}output-factor`]: `${outputFactor}`,
  };

  const outputMarkup = !disabled &&
    output && (
      <output htmlFor={id} className={styles.Output}>
        <div className={styles.OutputBubble}>
          <span className={styles.OutputText}>{clampedValue}</span>
        </div>
      </output>
    );

  const prefixMarkup = prefix && <div className={styles.Prefix}>{prefix}</div>;

  const suffixMarkup = suffix && <div className={styles.Suffix}>{suffix}</div>;

  const className = classNames(
    styles.SingleThumb,
    error && styles.error,
    disabled && styles.disabled,
  );

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
        <div className={styles.InputWrapper}>
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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {onChange} = props;

    if (onChange == null) {
      return;
    }

    onChange(parseFloat(event.currentTarget.value), id);
  }
}
