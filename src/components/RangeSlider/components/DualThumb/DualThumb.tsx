import * as React from 'react';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';
import {classNames} from '@shopify/css-utilities';
import {CSS_VAR_PREFIX} from '../../utilities';
import {Props as RangeSliderProps, DualValue} from '../../types';
import Labelled, {labelID} from '../../../Labelled';
import EventListener from '../../../EventListener';
import {Key} from '../../../../types';

import styles from './DualThumb.scss';

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

export default class DualThumb extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
    const {min, step, max, value, onChange, id} = props;
    const {prevValue} = state;

    if (isEqual(prevValue, value)) {
      return null;
    }

    const sanitizedValue = sanitizeValue(value, min, max, step);

    if (!isEqual(value, sanitizedValue)) {
      onChange(sanitizedValue, id);
    }

    return {
      prevValue: value,
      value: sanitizedValue,
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
  private trackWrapper = React.createRef<HTMLDivElement>();
  private thumbLower = React.createRef<HTMLButtonElement>();
  private thumbUpper = React.createRef<HTMLButtonElement>();

  private setTrackPosition = debounce(
    () => {
      if (this.track.current) {
        const {width, left} = this.track.current.getBoundingClientRect();
        const adjustedTrackWidth = width - THUMB_SIZE;
        const adjustedTrackLeft = left + THUMB_SIZE / 2;
        this.setState({
          trackWidth: adjustedTrackWidth,
          trackLeft: adjustedTrackLeft,
        });
      }
    },
    40,
    {leading: true, trailing: true, maxWait: 40},
  );

  componentDidMount() {
    this.setTrackPosition();

    if (this.trackWrapper.current != null) {
      addEventListener(
        this.trackWrapper.current,
        'touchstart',
        this.handleTouchStartTrack,
        {passive: false},
      );
    }
  }

  componentWillUnmount() {
    if (this.trackWrapper.current != null) {
      removeEventListener(
        this.trackWrapper.current,
        'touchstart',
        this.handleTouchStartTrack,
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
    const {value} = this.state;

    const idLower = id;
    const idUpper = `${id}Upper`;

    const describedBy: string[] = [];

    if (error) {
      describedBy.push(`${id}Error`);
    }

    const ariaDescribedBy = describedBy.length
      ? describedBy.join(' ')
      : undefined;

    const trackWrapperClassName = classNames(
      styles.TrackWrapper,
      error && styles.error,
      disabled && styles.disabled,
    );

    const thumbLowerClassName = classNames(
      styles.Thumbs,
      styles.ThumbLower,
      disabled && styles.disabled,
    );
    const thumbUpperClassName = classNames(
      styles.Thumbs,
      styles.ThumbUpper,
      disabled && styles.disabled,
    );

    const trackWidth = this.state.trackWidth;
    const range = max - min;

    const leftPositionThumbLower = (value[0] / range) * trackWidth;
    const leftPositionThumbUpper = (value[1] / range) * trackWidth;

    const outputLowerClassName = classNames(styles.Output, styles.OutputLower);
    const outputMarkupLower =
      !disabled && output ? (
        <output
          htmlFor={idLower}
          className={outputLowerClassName}
          style={{
            left: `${leftPositionThumbLower}px`,
          }}
        >
          <div className={styles.OutputBubble}>
            <span className={styles.OutputText}>{value[0]}</span>
          </div>
        </output>
      ) : null;

    const outputUpperClassName = classNames(styles.Output, styles.OutputUpper);
    const outputMarkupUpper =
      !disabled && output ? (
        <output
          htmlFor={idUpper}
          className={outputUpperClassName}
          style={{
            left: `${leftPositionThumbUpper}px`,
          }}
        >
          <div className={styles.OutputBubble}>
            <span className={styles.OutputText}>{value[1]}</span>
          </div>
        </output>
      ) : null;

    const cssVars = {
      [`${CSS_VAR_PREFIX}progress-lower`]: `${leftPositionThumbLower}px`,
      [`${CSS_VAR_PREFIX}progress-upper`]: `${leftPositionThumbUpper}px`,
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
          <div className={styles.Wrapper}>
            {prefixMarkup}
            <div
              className={trackWrapperClassName}
              onMouseDown={this.handleMouseDownTrack}
              testID="trackWrapper"
              ref={this.trackWrapper}
            >
              <div
                className={styles.Track}
                style={cssVars}
                ref={this.track}
                testID="track"
              />
              <button
                id={idLower}
                className={thumbLowerClassName}
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
                aria-labelledby={labelID(id)}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={this.handleKeypressLower}
                onMouseDown={this.handleMouseDownThumbLower}
                onTouchStart={this.handleTouchStartThumbLower}
                ref={this.thumbLower}
              />
              {outputMarkupLower}
              <button
                id={idUpper}
                className={thumbUpperClassName}
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
                aria-labelledby={labelID(id)}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={this.handleKeypressUpper}
                onMouseDown={this.handleMouseDownThumbUpper}
                onTouchStart={this.handleTouchStartThumbUpper}
                ref={this.thumbUpper}
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

  private handleMouseDownThumbLower = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (event.button !== 0 || this.props.disabled) return;
    registerMouseMoveHandler(this.handleMouseMoveThumbLower);
    event.stopPropagation();
  };

  private handleMouseMoveThumbLower = (event: MouseEvent) => {
    const valueUpper = this.state.value[1];
    this.setValue(
      [this.actualXPosition(event.clientX), valueUpper],
      Control.Upper,
    );
  };

  private handleTouchStartThumbLower = (
    event: React.TouchEvent<HTMLButtonElement>,
  ) => {
    if (this.props.disabled) return;
    registerTouchMoveHandler(this.handleTouchMoveThumbLower);
    event.stopPropagation();
  };

  private handleTouchMoveThumbLower = (event: TouchEvent) => {
    event.preventDefault();
    const valueUpper = this.state.value[1];
    this.setValue(
      [this.actualXPosition(event.touches[0].clientX), valueUpper],
      Control.Upper,
    );
  };

  private handleMouseDownThumbUpper = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (event.button !== 0 || this.props.disabled) return;
    registerMouseMoveHandler(this.handleMouseMoveThumbUpper);
    event.stopPropagation();
  };

  private handleMouseMoveThumbUpper = (event: MouseEvent) => {
    const valueLower = this.state.value[0];
    this.setValue(
      [valueLower, this.actualXPosition(event.clientX)],
      Control.Lower,
    );
  };

  private handleTouchStartThumbUpper = (
    event: React.TouchEvent<HTMLButtonElement>,
  ) => {
    if (this.props.disabled) return;
    registerTouchMoveHandler(this.handleTouchMoveThumbUpper);
    event.stopPropagation();
  };

  private handleTouchMoveThumbUpper = (event: TouchEvent) => {
    event.preventDefault();
    const valueLower = this.state.value[0];
    this.setValue(
      [valueLower, this.actualXPosition(event.touches[0].clientX)],
      Control.Lower,
    );
  };

  private handleKeypressLower = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (this.props.disabled) return;
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
  };

  private handleKeypressUpper = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (this.props.disabled) return;
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
  };

  private incrementValueLower = () => {
    this.setValue(
      [this.state.value[0] + this.props.step, this.state.value[1]],
      Control.Upper,
    );
  };

  private decrementValueLower = () => {
    this.setValue(
      [this.state.value[0] - this.props.step, this.state.value[1]],
      Control.Upper,
    );
  };

  private incrementValueUpper = () => {
    this.setValue(
      [this.state.value[0], this.state.value[1] + this.props.step],
      Control.Lower,
    );
  };

  private decrementValueUpper = () => {
    this.setValue(
      [this.state.value[0], this.state.value[1] - this.props.step],
      Control.Lower,
    );
  };

  private dispatchValue = () => {
    const {onChange, id} = this.props;
    const {value} = this.state;

    onChange(value, id);
  };

  private setValue = (dirtyValue: DualValue, control: Control) => {
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
  };

  private handleMouseDownTrack = (event: React.MouseEvent) => {
    if (event.button !== 0 || this.props.disabled) return;
    event.preventDefault();
    const clickXPosition = this.actualXPosition(event.clientX);
    const {value} = this.state;
    const distanceFromLowerThumb = Math.abs(value[0] - clickXPosition);
    const distanceFromUpperThumb = Math.abs(value[1] - clickXPosition);

    if (distanceFromLowerThumb <= distanceFromUpperThumb) {
      this.setValue([clickXPosition, value[1]], Control.Upper);
      registerMouseMoveHandler(this.handleMouseMoveThumbLower);

      if (this.thumbLower.current != null) {
        this.thumbLower.current.focus();
      }
    } else {
      this.setValue([value[0], clickXPosition], Control.Lower);
      registerMouseMoveHandler(this.handleMouseMoveThumbUpper);

      if (this.thumbUpper.current != null) {
        this.thumbUpper.current.focus();
      }
    }
  };

  private handleTouchStartTrack = (event: TouchEvent) => {
    if (this.props.disabled) return;
    event.preventDefault();
    const clickXPosition = this.actualXPosition(event.touches[0].clientX);
    const {value} = this.state;
    const distanceFromLowerThumb = Math.abs(value[0] - clickXPosition);
    const distanceFromUpperThumb = Math.abs(value[1] - clickXPosition);

    if (distanceFromLowerThumb <= distanceFromUpperThumb) {
      this.setValue([clickXPosition, value[1]], Control.Upper);
      registerTouchMoveHandler(this.handleTouchMoveThumbLower);

      if (this.thumbLower.current != null) {
        this.thumbLower.current.focus();
      }
    } else {
      this.setValue([value[0], clickXPosition], Control.Lower);
      registerTouchMoveHandler(this.handleTouchMoveThumbUpper);

      if (this.thumbUpper.current != null) {
        this.thumbUpper.current.focus();
      }
    }
  };

  private actualXPosition = (dirtyXPosition: number): number => {
    if (this.track.current) {
      const {min, max} = this.props;
      const {trackLeft, trackWidth} = this.state;

      const relativeX = dirtyXPosition - trackLeft;
      const percentageOfTrack = relativeX / trackWidth;
      return percentageOfTrack * (max - min);
    } else {
      return 0;
    }
  };
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

function registerTouchMoveHandler(handler: (event: TouchEvent) => void) {
  const removeHandler = () => {
    removeEventListener(document, 'touchmove', handler);
    removeEventListener(document, 'touchend', removeHandler);
    removeEventListener(document, 'touchcancel', removeHandler);
  };

  addEventListener(document, 'touchmove', handler, {passive: false});
  addEventListener(document, 'touchend', removeHandler, {once: true});
  addEventListener(document, 'touchcancel', removeHandler, {once: true});
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
