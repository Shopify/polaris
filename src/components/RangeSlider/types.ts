import {Action} from '../Labelled';

import {Error} from '../../types';

export type RangeSliderValue = number | [number, number];

export interface Props {
  /** Label for the range input */
  label: string;
  /** Adds an action to the label */
  labelAction?: Action;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** ID for range input */
  id?: string;
  /** Initial value for range input */
  value: RangeSliderValue;
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
  onChange(value: RangeSliderValue, id: string): void;
  /** Callback when range input is focused */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
}
