import * as React from 'react';
import throttle from 'lodash-decorators/throttle';
import isEqual from 'lodash/isEqual';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';
import {classNames} from '@shopify/react-utilities/styles';
import {CSS_VAR_PREFIX} from '../../utilities';
import {Props as RangeSliderProps, DualValue} from '../../types';
import Labelled from '../../../Labelled';
import EventListener from '../../../EventListener';
import {Key} from '../../../../types';

import * as styles from './DualThumb.scss';

export interface State {
  value: DualValue;
  trackWidth: number;
  trackLeft: number;
  prevValue?: DualValue;
}

export interface Props extends RangeSliderProps {
  value: DualValue;
  id: string;
  min: number;
  max: number;
  step: number;
}

interface KeyHandlers {
  [key: string]: () => void;
}

enum Control {
  Lower,
  Upper,
}

const THUMB_SIZE = 24;
const OUTPUT_TIP_SIZE = 8;

export default class DualThumb extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
    const {min, step, max, value, onChange, id} = props;
    const {prevValue} = state;

    if (isEqual(prevValue, value)) {
      return null;
    }

    const sanitizedValue: DualValue = sanitizeValue(value, min, max, step);

    if (!isEqual(value, sanitizedValue)) {
      onChange(sanitizedValue, id);
    }

    return {
      prevValue: value,
      valueLower: sanitizedValue[0],
      valueUpper: sanitizedValue[1],
    };
  }

  state: State = {
    value: sanitizeValue(
      this.props.value,
      this.props.min,
      this.props.max,
      this.props.step,
    ),
    trackWidth: 0,
    trackLeft: 0,
  };

  private track = React.createRef<HTMLDivElement>();
  private thumbLower = React.createRef<HTMLButtonElement>();
  private thumbUpper = React.createRef<HTMLButtonElement>();

  componentDidMount() {
    this.setTrackPosition();
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
    const {value} = this.state;

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
    const range = max - min;

    const leftPositionThumbLower = (value[0] / range) * trackWidth;
    const leftPositionThumbUpper = (value[1] / range) * trackWidth;

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
            <span className={styles.OutputText}>{value[0]}</span>
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
            <span className={styles.OutputText}>{value[1]}</span>
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
      <React.Fragment>
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
                aria-valuenow={value[0]}
                aria-invalid={Boolean(error)}
                aria-describedby={ariaDescribedBy}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={this.handleKeypressLower}
                onMouseDown={this.handleMouseDownThumbLower}
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
                aria-valuenow={value[1]}
                aria-invalid={Boolean(error)}
                aria-describedby={ariaDescribedBy}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={this.handleKeypressUpper}
                onMouseDown={this.handleMouseDownThumbUpper}
              />
              {outputMarkupUpper}
            </div>
            {suffixMarkup}
          </div>
        </Labelled>
        <EventListener event="resize" handler={this.setTrackPosition} />
      </React.Fragment>
    );
  }

  @throttle(40)
  @autobind
  private setTrackPosition() {
    if (this.track.current) {
      const {width, left} = this.track.current.getBoundingClientRect();
      const adjustedTrackWidth = width - THUMB_SIZE;
      this.setState({
        trackWidth: adjustedTrackWidth,
        trackLeft: left,
      });
    }
  }

  @autobind
  private handleMouseDownThumbLower(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    if (event.button !== 0) return;
    registerMouseMoveHandler(this.handleMouseMoveThumbLower);
  }

  @autobind
  private handleMouseMoveThumbLower(event: MouseEvent) {
    const valueUpper = this.state.value[1];
    this.setValue(
      [this.actualXPosition(event.clientX), valueUpper],
      Control.Upper,
    );
  }

  @autobind
  private handleMouseDownThumbUpper(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    if (event.button !== 0) return;
    registerMouseMoveHandler(this.handleMouseMoveThumbUpper);
  }

  @autobind
  private handleMouseMoveThumbUpper(event: MouseEvent) {
    const valueLower = this.state.value[0];
    this.setValue(
      [valueLower, this.actualXPosition(event.clientX)],
      Control.Lower,
    );
  }

  @autobind
  private handleKeypressLower(event: React.KeyboardEvent<HTMLButtonElement>) {
    const {incrementValueLower, decrementValueLower} = this;

    const handlerMap: KeyHandlers = {
      [Key.UpArrow]: incrementValueLower,
      [Key.RightArrow]: incrementValueLower,
      [Key.DownArrow]: decrementValueLower,
      [Key.LeftArrow]: decrementValueLower,
    };

    const handler = handlerMap[event.keyCode];

    if (handler != null) {
      event.preventDefault();
      event.stopPropagation();
      handler();
    }
  }

  @autobind
  private handleKeypressUpper(event: React.KeyboardEvent<HTMLButtonElement>) {
    const {incrementValueUpper, decrementValueUpper} = this;

    const handlerMap: KeyHandlers = {
      [Key.UpArrow]: incrementValueUpper,
      [Key.RightArrow]: incrementValueUpper,
      [Key.DownArrow]: decrementValueUpper,
      [Key.LeftArrow]: decrementValueUpper,
    };

    const handler = handlerMap[event.keyCode];

    if (handler != null) {
      event.preventDefault();
      event.stopPropagation();
      handler();
    }
  }

  @autobind
  private incrementValueLower() {
    this.setValue(
      [this.state.value[0] + this.props.step, this.state.value[1]],
      Control.Upper,
    );
  }

  @autobind
  private decrementValueLower() {
    this.setValue(
      [this.state.value[0] - this.props.step, this.state.value[1]],
      Control.Upper,
    );
  }

  @autobind
  private incrementValueUpper() {
    this.setValue(
      [this.state.value[1] + this.props.step, this.state.value[0]],
      Control.Lower,
    );
  }

  @autobind
  private decrementValueUpper() {
    this.setValue(
      [this.state.value[0], this.state.value[1] - this.props.step],
      Control.Lower,
    );
  }

  @autobind
  private dispatchValue() {
    const {onChange, id} = this.props;
    const {value} = this.state;

    onChange(value, id);
  }

  @autobind
  private setValue(dirtyValue: DualValue, control: Control) {
    const {
      props: {min, max, step},
      state: {value},
    } = this;

    const sanitizedValue = sanitizeValue(dirtyValue, min, max, step, control);

    if (isEqual(sanitizedValue, value) === false) {
      this.setState(
        {
          value: sanitizedValue,
        },
        this.dispatchValue,
      );
    }
  }

  @autobind
  private actualXPosition(dirtyXPosition: number): number {
    if (this.track.current) {
      const {min, max} = this.props;
      const {trackLeft, trackWidth} = this.state;

      const relativeX = dirtyXPosition - trackLeft;
      const percentageOfTrack = relativeX / trackWidth;
      return percentageOfTrack * (max - min);
    } else {
      return 0;
    }
  }
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

function sanitizeValue(
  value: DualValue,
  min: number,
  max: number,
  step: number,
  control = Control.Upper,
): DualValue {
  let upperValue = inBoundsUpper(roundedToStep(value[1]));
  let lowerValue = inBoundsLower(roundedToStep(value[0]));

  const maxLowerValue = upperValue - step;
  const minUpperValue = lowerValue + step;

  if (control === Control.Upper && lowerValue > maxLowerValue) {
    lowerValue = maxLowerValue;
  } else if (control === Control.Lower && upperValue < minUpperValue) {
    upperValue = minUpperValue;
  }

  return [lowerValue, upperValue];

  function inBoundsUpper(value: number): number {
    const lowerMin = min + step;

    if (value < lowerMin) {
      return lowerMin;
    } else if (value > max) {
      return max;
    } else {
      return value;
    }
  }

  function inBoundsLower(value: number): number {
    const upperMax = max - step;

    if (value < min) {
      return min;
    } else if (value > upperMax) {
      return upperMax;
    } else {
      return value;
    }
  }

  function roundedToStep(value: number) {
    return Math.round(value / step) * step;
  }
}
