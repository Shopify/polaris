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
    valueLower: this.props.value[0],
    valueUpper: this.props.value[1],
    trackWidth: 0,
  };

  private track = React.createRef<HTMLDivElement>();
  private thumbLower = React.createRef<HTMLButtonElement>();
  private thumbUpper = React.createRef<HTMLButtonElement>();

  componentDidMount() {
    const {valueLower, valueUpper} = this.state;
    const {step, min, max} = this.props;
    const valueWithinBoundsLower = keepValueWithinBoundsLower(
      roundToNearestStepValue(valueLower, step),
      valueUpper,
      min,
      step,
    );

    const valueWithinBoundsUpper = keepValueWithinBoundsUpper(
      roundToNearestStepValue(valueUpper, step),
      valueLower,
      max,
      step,
    );

    this.setState({
      valueLower: valueWithinBoundsLower,
      valueUpper: valueWithinBoundsUpper,
    });

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
    if (this.thumbLower.current) {
      addEventListener(document, 'mousemove', this.handleMouseMoveThumbLower);
      addEventListener(
        document,
        'mouseup',
        () => {
          removeEventListener(
            document,
            'mousemove',
            this.handleMouseMoveThumbLower,
          );
        },
        {once: true},
      );
    }
  }

  @autobind
  private handleMouseMoveThumbLower(event: MouseEvent) {
    if (this.track.current) {
      const {valueUpper} = this.state;
      const {min, max, step} = this.props;
      const clientRect = this.track.current.getBoundingClientRect();

      const relativeX = event.clientX - clientRect.left;

      const percentageOfTrack = relativeX / (clientRect.width - THUMB_SIZE);
      const percentageOfRange = percentageOfTrack * (max - min);

      const steppedPercentageOfRange = roundToNearestStepValue(
        percentageOfRange,
        step,
      );

      const valueWithinBoundsLower = keepValueWithinBoundsLower(
        steppedPercentageOfRange,
        valueUpper,
        min,
        step,
      );
      this.setState(
        {
          valueLower: valueWithinBoundsLower,
        },
        () => {
          this.handleChange();
        },
      );
    }
  }

  @autobind
  private handleMouseDownThumbUpper() {
    if (this.thumbUpper.current) {
      addEventListener(document, 'mousemove', this.handleMouseMoveThumbUpper);
      addEventListener(
        document,
        'mouseup',
        () => {
          removeEventListener(
            document,
            'mousemove',
            this.handleMouseMoveThumbUpper,
          );
        },
        {once: true},
      );
    }
  }

  @autobind
  private handleMouseMoveThumbUpper(event: MouseEvent) {
    if (this.track.current) {
      const {valueLower} = this.state;
      const {min, max, step} = this.props;
      const clientRect = this.track.current.getBoundingClientRect();

      const relativeX = event.clientX - clientRect.left;

      const percentageOfTrack = relativeX / (clientRect.width - THUMB_SIZE);
      const percentageOfRange = percentageOfTrack * (max - min);

      const steppedPercentageOfRange = roundToNearestStepValue(
        percentageOfRange,
        step,
      );

      const valueWithinBoundsUpper = keepValueWithinBoundsUpper(
        steppedPercentageOfRange,
        valueLower,
        max,
        step,
      );
      this.setState(
        {
          valueUpper: valueWithinBoundsUpper,
        },
        () => {
          this.handleChange();
        },
      );
    }
  }

  @autobind
  private handleChange() {
    const {onChange, id} = this.props;
    const {valueLower, valueUpper} = this.state;

    return onChange([valueLower, valueUpper], id);
  }

  @autobind
  private handleKeypressLower(event: KeyboardEvent) {
    const {valueLower, valueUpper} = this.state;
    const {step, min} = this.props;
    event.preventDefault();
    event.stopPropagation();

    let newValue = valueLower;

    if (event.keyCode === Key.DownArrow || event.keyCode === Key.LeftArrow) {
      newValue = valueLower - step;
    } else if (
      event.keyCode === Key.UpArrow ||
      event.keyCode === Key.RightArrow
    ) {
      newValue = valueLower + step;
    }

    const valueWithinBoundsLower = keepValueWithinBoundsLower(
      newValue,
      valueUpper,
      min,
      step,
    );

    this.setState(
      {
        valueLower: valueWithinBoundsLower,
      },
      () => {
        this.handleChange();
      },
    );
  }

  @autobind
  private handleKeypressUpper(event: KeyboardEvent) {
    const {valueLower, valueUpper} = this.state;
    const {max, step} = this.props;
    event.preventDefault();
    event.stopPropagation();

    let newValue = valueUpper;

    if (event.keyCode === Key.DownArrow || event.keyCode === Key.LeftArrow) {
      newValue = valueUpper - step;
    } else if (
      event.keyCode === Key.UpArrow ||
      event.keyCode === Key.RightArrow
    ) {
      newValue = valueUpper + step;
    }

    const valueWithinBoundsUpper = keepValueWithinBoundsUpper(
      newValue,
      valueLower,
      max,
      step,
    );

    this.setState(
      {
        valueUpper: valueWithinBoundsUpper,
      },
      () => {
        this.handleChange();
      },
    );

    event.preventDefault();
    event.stopPropagation();
  }
}

function keepValueWithinBoundsLower(
  steppedValue: number,
  valueUpper: number,
  min: number,
  step: number,
) {
  if (steppedValue <= min) {
    return min;
  } else if (steppedValue >= valueUpper) {
    return valueUpper - step;
  } else {
    return steppedValue;
  }
}

function keepValueWithinBoundsUpper(
  steppedValue: number,
  valueLower: number,
  max: number,
  step: number,
) {
  if (steppedValue >= max) {
    return max;
  } else if (steppedValue <= valueLower) {
    return valueLower + step;
  } else {
    return steppedValue;
  }
}

function roundToNearestStepValue(value: number, step: number) {
  const intermediateValue = value / step;
  const roundedValue = Math.round(intermediateValue);
  return roundedValue * step;
}
