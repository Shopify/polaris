import * as React from 'react';
import {clamp} from '@shopify/javascript-utilities/math';
import {autobind} from '@shopify/javascript-utilities/decorators';

import Slidable, {Position} from '../Slidable';
import * as styles from '../../ColorPicker.scss';

export interface State {
  sliderHeight: number;
  draggerHeight: number;
}

export interface Props {
  hue: number;
  onChange(hue: number): void;
}

const VERTICAL_PADDING = 13;

export default class HuePicker extends React.PureComponent<Props, State> {
  state: State = {
    sliderHeight: 0,
    draggerHeight: 0,
  };

  render() {
    const {hue} = this.props;
    const {sliderHeight, draggerHeight} = this.state;

    const offset = offsetForHue(hue, sliderHeight, draggerHeight);
    const draggerY = clamp(offset, 0, sliderHeight);

    return (
      <div className={styles.HuePicker} ref={this.setSliderHeight}>
        <Slidable
          draggerY={draggerY}
          draggerX={0}
          onChange={this.handleChange}
          onDraggerHeight={this.setDraggerHeight}
        />
      </div>
    );
  }

  @autobind
  private setSliderHeight(node: HTMLElement | null) {
    if (node == null) {
      return;
    }

    this.setState({sliderHeight: node.clientHeight});

    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        this.setState({sliderHeight: node.clientHeight});
      }, 0);
    }
  }

  @autobind
  private setDraggerHeight(height: number) {
    this.setState({
      draggerHeight: height,
    });
  }

  @autobind
  private handleChange({y}: Position) {
    const {onChange} = this.props;
    const {sliderHeight} = this.state;
    const offsetY = clamp(y, 0, sliderHeight);

    const hue = hueForOffset(offsetY, sliderHeight);

    onChange(hue);
  }
}

function offsetForHue(
  hue: number,
  sliderHeight: number,
  draggerHeight: number,
): number {
  const slidableArea = sliderHeight - (draggerHeight + VERTICAL_PADDING);
  return clamp(
    (hue / 360) * slidableArea + VERTICAL_PADDING,
    0,
    sliderHeight - draggerHeight,
  );
}

function hueForOffset(offset: number, sliderHeight: number): number {
  const selectionHeight = offset - VERTICAL_PADDING;
  const slidableArea = sliderHeight - VERTICAL_PADDING * 2;
  return clamp((selectionHeight / slidableArea) * 360, 0, 360);
}
