import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {classNames} from '@shopify/react-utilities/styles';

import {
  withAppProvider,
  WithAppProviderProps,
} from '../../components/AppProvider';
import {Error} from '../../types';
import Labelled, {Action, helpTextID, errorID} from '../Labelled';

import * as styles from './RangeSlider.scss';

export interface State {
  id: string;
}

export interface BaseProps {
  /** Label for the range input */
  label: string;
  /** Adds an action to the label */
  labelAction?: Action;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** ID for range input */
  id?: string;
  /** Initial value for range input */
  value: number;
  /** Minimum possible value for range input */
  min?: number;
  /** Maximum possible value for range input */
  max?: number;
  /** Increment value for range input changes */
  step?: number;
  /** Provide a tooltip while sliding, indicating the current value */
  output?: boolean;
  /** Additional text to aid in use */
  helpText?: React.ReactNode;
  /** Display an error message */
  error?: Error;
  /** Disable input */
  disabled?: boolean;
  /** Element to display before the input */
  prefix?: React.ReactNode;
  /** Element to display after the input */
  suffix?: React.ReactNode;
  /** Callback when the range input is changed */
  onChange(value: number, id: string): void;
  /** Callback when range input is focused */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
}

export interface Props extends BaseProps {}
export type CombinedProps = Props & WithAppProviderProps;

const getUniqueID = createUniqueIDFactory('RangeSlider');
const cssVarPrefix = '--Polaris-RangeSlider-';

export class RangeSlider extends React.PureComponent<CombinedProps, State> {
  static getDerivedStateFromProps(props: CombinedProps, state: State) {
    return {
      id: props.id || state.id,
    };
  }

  constructor(props: CombinedProps) {
    super(props);

    this.state = {
      id: props.id || getUniqueID(),
    };
  }

  render() {
    const {id} = this.state;
    const min = this.props.min || 0;
    const max = this.props.max || 100;
    const {
      label,
      labelAction,
      labelHidden,
      step,
      value,
      output,
      helpText,
      error,
      disabled,
      prefix,
      suffix,
      onFocus,
      onBlur,
    } = this.props;

    const describedBy: string[] = [];

    if (error) {
      describedBy.push(errorID(id));
    }

    if (helpText) {
      describedBy.push(helpTextID(id));
    }

    const ariaDescribedBy = describedBy.length
      ? describedBy.join(' ')
      : undefined;

    const sliderProgress = ((value - min) * 100) / (max - min);

    const cssVars = {
      [`${cssVarPrefix}min`]: min,
      [`${cssVarPrefix}max`]: max,
      [`${cssVarPrefix}current`]: value,
      [`${cssVarPrefix}progress`]: `${sliderProgress}%`,
      [`${cssVarPrefix}output-factor`]: invertNumber(
        (sliderProgress - 50) / 100,
      ),
    };

    const outputMarkup = !disabled &&
      output && (
        <output htmlFor={id} className={styles.Output}>
          <div className={styles.OutputBubble}>
            <span className={styles.OutputText}>{value}</span>
          </div>
        </output>
      );

    const prefixMarkup = prefix && (
      <div className={styles.Prefix}>{prefix}</div>
    );

    const suffixMarkup = suffix && (
      <div className={styles.Suffix}>{suffix}</div>
    );

    const className = classNames(
      styles.RangeSlider,
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
              value={value}
              disabled={disabled}
              onChange={this.handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={value}
              aria-invalid={Boolean(error)}
              aria-describedby={ariaDescribedBy}
            />
            {outputMarkup}
          </div>
          {suffixMarkup}
        </div>
      </Labelled>
    );
  }

  @autobind
  private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {onChange} = this.props;

    if (onChange == null) {
      return;
    }

    onChange(parseFloat(event.currentTarget.value), this.state.id);
  }
}

export function invertNumber(number: number) {
  if (Math.sign(number) === 1) {
    return -Math.abs(number);
  } else if (Math.sign(number) === -1) {
    return Math.abs(number);
  } else {
    return 0;
  }
}

export default withAppProvider<Props>()(RangeSlider);
