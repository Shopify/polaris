import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';
import {classNames} from '@shopify/react-utilities/styles';
import {CSS_VAR_PREFIX} from '../../utilities';
import {Props as RangeSliderProps} from '../../types';
import Labelled from '../../../Labelled';

import {Key} from '../../../../types';

import * as styles from './DualThumb.scss';

export interface State {
  valueLower: number;
  valueUpper: number;
  trackWidth: number;
}

export interface Props extends RangeSliderProps {
  value: [number, number];
  id: string;
  min: number;
  max: number;
  step: number;
}

const THUMB_SIZE = 24;
const OUTPUT_TIP_SIZE = 8;

export default class DualThumb extends React.Component<Props, State> {
  state: State = {
    valueLower: this.sanitizeValueLower(this.props.value[0]),
    valueUpper: this.sanitizeValueUpper(this.props.value[1]),
    trackWidth: 0,
  };

  private track = React.createRef<HTMLDivElement>();
  private thumbLower = React.createRef<HTMLButtonElement>();
  private thumbUpper = React.createRef<HTMLButtonElement>();

  componentDidMount() {
    if (this.track.current) {
      this.setState({
        trackWidth: this.track.current.getBoundingClientRect().width,
      });
    }

    if (this.thumbLower.current && !this.props.disabled) {
      addEventListener(
        this.thumbLower.current,
        'mousedown',
        this.handleMouseDownThumbLower,
      );
      addEventListener(
        this.thumbLower.current,
        'keyup',
        this.handleKeypressLower,
      );
    }

    if (this.thumbUpper.current && !this.props.disabled) {
      addEventListener(
        this.thumbUpper.current,
        'mousedown',
        this.handleMouseDownThumbUpper,
      );
      addEventListener(
        this.thumbUpper.current,
        'keyup',
        this.handleKeypressUpper,
      );
    }
  }

  render() {
    const {
      id,
      min,
      max,
      prefix,
      suffix,
      disabled,
      output,
      error,
      onFocus,
      onBlur,
      label,
      labelAction,
      labelHidden,
      helpText,
    } = this.props;
    const {valueLower, valueUpper} = this.state;

    const idLower = `${id}Lower`;
    const idUpper = `${id}Upper`;

    const describedBy: string[] = [];

    if (error) {
      describedBy.push(`${id}Error`);
    }

    const ariaDescribedBy = describedBy.length
      ? describedBy.join(' ')
      : undefined;

    const classNameTrackWrapper = classNames(
      styles.TrackWrapper,
      error && styles.error,
      disabled && styles.disabled,
    );

    const classNameThumbLower = classNames(
      styles.Thumbs,
      styles.ThumbLower,
      disabled && styles.disabled,
    );
    const classNameThumbUpper = classNames(
      styles.Thumbs,
      styles.ThumbUpper,
      disabled && styles.disabled,
    );

    const trackWidth = this.state.trackWidth;
    const adjustedTrackWidth = trackWidth - THUMB_SIZE;
    const range = max - min;

    const leftPositionThumbLower = (valueLower / range) * adjustedTrackWidth;
    const leftPositionThumbUpper = (valueUpper / range) * adjustedTrackWidth;

    const classNameOutputLower = classNames(styles.Output, styles.OutputLower);
    const outputMarkupLower =
      !disabled && output ? (
        <output
          htmlFor={idLower}
          className={classNameOutputLower}
          style={{
            left: `calc(${leftPositionThumbLower}px - ${OUTPUT_TIP_SIZE}px)`,
          }}
        >
          <div className={styles.OutputBubble}>
            <span className={styles.OutputText}>{valueLower}</span>
          </div>
        </output>
      ) : null;

    const classNameOutputUpper = classNames(styles.Output, styles.OutputUpper);
    const outputMarkupUpper =
      !disabled && output ? (
        <output
          htmlFor={idUpper}
          className={classNameOutputUpper}
          style={{
            left: `calc(${leftPositionThumbUpper}px - ${OUTPUT_TIP_SIZE}px)`,
          }}
        >
          <div className={styles.OutputBubble}>
            <span className={styles.OutputText}>{valueUpper}</span>
          </div>
        </output>
      ) : null;

    const progressLower = leftPositionThumbLower + THUMB_SIZE / 2;
    const progressUpper = leftPositionThumbUpper + THUMB_SIZE / 2;

    const cssVars = {
      [`${CSS_VAR_PREFIX}progress-lower`]: `${progressLower}px`,
      [`${CSS_VAR_PREFIX}progress-upper`]: `${progressUpper}px`,
    };

    const prefixMarkup = prefix && (
      <div className={styles.Prefix}>{prefix}</div>
    );

    const suffixMarkup = suffix && (
      <div className={styles.Suffix}>{suffix}</div>
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
        <div className={styles.Wrapper} id={id}>
          {prefixMarkup}
          <div className={classNameTrackWrapper}>
            <div
              className={styles.Track}
              style={cssVars}
              ref={this.track}
              testID="track"
            />
            <button
              id={idLower}
              testID="thumbLower"
              className={classNameThumbLower}
              ref={this.thumbLower}
              style={{
                left: `${leftPositionThumbLower}px`,
              }}
              role="slider"
              aria-disabled={disabled}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={valueLower}
              aria-invalid={Boolean(error)}
              aria-describedby={ariaDescribedBy}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            {outputMarkupLower}
            <button
              id={idUpper}
              testID="thumbUpper"
              className={classNameThumbUpper}
              ref={this.thumbUpper}
              style={{
                left: `${leftPositionThumbUpper}px`,
              }}
              role="slider"
              aria-disabled={disabled}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={valueUpper}
              aria-invalid={Boolean(error)}
              aria-describedby={ariaDescribedBy}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            {outputMarkupUpper}
          </div>
          {suffixMarkup}
        </div>
      </Labelled>
    );
  }

  @autobind
  private handleMouseDownThumbLower() {
    registerMouseMoveHandler(this.handleMouseMoveThumbLower);
  }

  @autobind
  private handleMouseMoveThumbLower(event: MouseEvent) {
    this.setValueLower(this.actualXPosition(event.clientX));
  }

  @autobind
  private handleMouseDownThumbUpper() {
    registerMouseMoveHandler(this.handleMouseMoveThumbUpper);
  }

  @autobind
  private handleMouseMoveThumbUpper(event: MouseEvent) {
    this.setValueUpper(this.actualXPosition(event.clientX));
  }

  @autobind
  private handleKeypressLower(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (shouldDecrement(event)) {
      this.decrementValueLower();
    } else if (shouldIncrement(event)) {
      this.incrementValueLower();
    }
  }

  @autobind
  private handleKeypressUpper(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (shouldDecrement(event)) {
      this.decrementValueUpper();
    } else if (shouldIncrement(event)) {
      this.incrementValueUpper();
    }
  }

  @autobind
  private incrementValueLower() {
    this.setValueLower(this.state.valueLower + this.props.step);
  }

  @autobind
  private decrementValueLower() {
    this.setValueLower(this.state.valueLower - this.props.step);
  }

  @autobind
  private incrementValueUpper() {
    this.setValueUpper(this.state.valueUpper + this.props.step);
  }

  @autobind
  private decrementValueUpper() {
    this.setValueUpper(this.state.valueUpper - this.props.step);
  }

  @autobind
  private dispatchValue() {
    const {onChange, id} = this.props;
    const {valueLower, valueUpper} = this.state;

    onChange([valueLower, valueUpper], id);
  }

  @autobind
  private setValueLower(value: number) {
    this.setState(
      {
        valueLower: this.sanitizeValueLower(value),
      },
      this.dispatchValue,
    );
  }

  @autobind
  private setValueUpper(value: number) {
    this.setState(
      {
        valueUpper: this.sanitizeValueUpper(value),
      },
      this.dispatchValue,
    );
  }

  @autobind
  private sanitizeValueLower(dirtyValue: number): number {
    const {min, step, value} = this.props;

    const guardedValueUpper =
      this.state && this.state.valueUpper ? this.state.valueUpper : value[1];

    const roundedValue = roundToNearestStepValue(dirtyValue, step);

    if (roundedValue <= min) {
      return min;
    } else if (roundedValue >= guardedValueUpper) {
      return guardedValueUpper - step;
    } else {
      return roundedValue;
    }
  }

  @autobind
  private sanitizeValueUpper(dirtyValue: number): number {
    const {max, step, value} = this.props;

    const guardedValueLower =
      this.state && this.state.valueLower ? this.state.valueLower : value[0];

    const roundedValue = roundToNearestStepValue(dirtyValue, step);

    if (roundedValue >= max) {
      return max;
    } else if (roundedValue <= guardedValueLower) {
      return guardedValueLower + step;
    } else {
      return roundedValue;
    }
  }

  @autobind
  private actualXPosition(dirtyXPosition: number): number {
    if (this.track.current) {
      const {min, max} = this.props;
      const clientRect = this.track.current.getBoundingClientRect();

      const relativeX = dirtyXPosition - clientRect.left;

      const percentageOfTrack = relativeX / (clientRect.width - THUMB_SIZE);
      return percentageOfTrack * (max - min);
    } else {
      return 0;
    }
  }
}

function roundToNearestStepValue(value: number, step: number) {
  const intermediateValue = value / step;
  const roundedValue = Math.round(intermediateValue);
  return roundedValue * step;
}

function registerMouseMoveHandler(handler: (event: MouseEvent) => void) {
  addEventListener(document, 'mousemove', handler);
  addEventListener(
    document,
    'mouseup',
    () => {
      removeEventListener(document, 'mousemove', handler);
    },
    {once: true},
  );
}

function shouldIncrement(event: KeyboardEvent) {
  return event.keyCode === Key.UpArrow || event.keyCode === Key.RightArrow;
}

function shouldDecrement(event: KeyboardEvent) {
  return event.keyCode === Key.DownArrow || event.keyCode === Key.LeftArrow;
}
