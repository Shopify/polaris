import type {ReactNode} from 'react';

import type {LabelledProps} from '../Labelled';
import type {Error} from '../../types';

export type DualValue = [number, number];

export type RangeSliderValue = number | DualValue;

export interface RangeSliderProps {
  /** Label for the range input */
  label: ReactNode;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
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
  helpText?: ReactNode;
  /** Display an error message */
  error?: Error;
  /** Disable input */
  disabled?: boolean;
  /** Element to display before the input */
  prefix?: ReactNode;
  /** Element to display after the input */
  suffix?: ReactNode;
  /** Callback when the range input is changed */
  onChange(value: RangeSliderValue, id: string): void;
  /** Callback when range input is focused */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
}
