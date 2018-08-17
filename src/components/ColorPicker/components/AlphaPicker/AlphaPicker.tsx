import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {clamp} from '@shopify/javascript-utilities/math';

import Slidable, {Position} from '../Slidable';
import {HSBColor} from '../../types';
import {hsbToRgb} from '../../utilities/color-utilities';
import * as styles from '../../ColorPicker.scss';

export interface State {
  dragging: boolean;
  sliderHeight: number;
  draggerHeight: number;
}

export interface Props {
  color: HSBColor;
  alpha: number;
  onChange(hue: number): void;
}

const VERTICAL_PADDING = 13;

export default class AlphaPicker extends React.PureComponent<Props, State> {
  state: State = {
    dragging: false,
    sliderHeight: 0,
    draggerHeight: 0,
  };

  render() {
    const {color, alpha} = this.props;
    const {sliderHeight, draggerHeight} = this.state;

    const offset = offsetForAlpha(alpha, sliderHeight, draggerHeight);
    const draggerY = clamp(offset, 0, sliderHeight);
    const background = alphaGradientForColor(color);

    return (
      <div className={styles.AlphaPicker} ref={this.setSliderHeight}>
        <div className={styles.ColorLayer} style={{background}} />
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
    const alpha = alphaForOffset(offsetY, sliderHeight);
    onChange(alpha);
  }
}

function alphaForOffset(offset: number, sliderHeight: number): number {
  const selectionHeight = offset - VERTICAL_PADDING;
  const slidableArea = sliderHeight - VERTICAL_PADDING * 2;
  return clamp(1 - selectionHeight / slidableArea, 0, 1);
}

function offsetForAlpha(
  alpha: number,
  sliderHeight: number,
  draggerHeight: number,
) {
  const slidableArea = sliderHeight - (draggerHeight + VERTICAL_PADDING);
  return clamp(
    (1 - alpha) * slidableArea + VERTICAL_PADDING,
    0,
    sliderHeight - draggerHeight,
  );
}

function alphaGradientForColor(color: HSBColor) {
  const {red, green, blue} = hsbToRgb(color);
  const rgb = `${red}, ${green}, ${blue}`;
  return `linear-gradient(to top, rgba(${rgb}, 0) 18px, rgba(${rgb}, 1) calc(100% - 18px))`;
}
