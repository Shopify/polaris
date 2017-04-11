import * as React from 'react';
import autobind from '@shopify/javascript-utilities/autobind';
import {read} from '@shopify/javascript-utilities/fastdom';

import Slidable, {Position} from './Slidable';
import * as styles from './ColorPicker.scss';
import {clamp} from './math';

export interface State {
  dragging: boolean,
  sliderHeight: number,
  draggerHeight: number,
}

export interface Props {
  hue: number,
  onChange(hue: number): void,
}

const VERTICAL_PADDING = 13;

export default class HuePicker extends React.PureComponent<Props, State> {
  state: State = {
    dragging: false,
    sliderHeight: 0,
    draggerHeight: 0,
  };

  render() {
    const {hue} = this.props;
    const {sliderHeight, draggerHeight} = this.state;

    const offset = offsetForHue(hue, sliderHeight, draggerHeight);
    const draggerY = clamp(offset, 0, sliderHeight);

    return(
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
  private setSliderHeight(node: HTMLElement) {
    setTimeout(() => {
      read(() => this.setState({
        sliderHeight: node.clientHeight,
      }));
    }, 20);
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

function offsetForHue(hue: number, sliderHeight: number, draggerHeight: number): number {
  const slidableArea = sliderHeight - (draggerHeight + VERTICAL_PADDING);
  return clamp((hue / 360 * slidableArea) + VERTICAL_PADDING, 0, sliderHeight - draggerHeight);
}

function hueForOffset(offset: number, sliderHeight: number): number {
  const selectionHeight = (offset - VERTICAL_PADDING);
  const slidableArea = sliderHeight - (2 * VERTICAL_PADDING);
  return clamp((selectionHeight / slidableArea) * 360, 0, 360);
}
