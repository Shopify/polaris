import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import Slidable, {Position} from '../Slidable';
import {HSBColor} from '../../types';
import {hsbToRgb} from '../../../../utilities/color-transformers';
import * as styles from '../../ColorPicker.scss';
import {calculateDraggerY, alphaForDraggerY} from './utilities';

export interface State {
  sliderHeight: number;
  draggerHeight: number;
}

export interface Props {
  color: HSBColor;
  alpha: number;
  onChange(hue: number): void;
}

export default class AlphaPicker extends React.PureComponent<Props, State> {
  state: State = {
    sliderHeight: 0,
    draggerHeight: 0,
  };

  render() {
    const {color, alpha} = this.props;
    const {sliderHeight, draggerHeight} = this.state;

    const draggerY = calculateDraggerY(alpha, sliderHeight, draggerHeight);
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
    const alpha = alphaForDraggerY(y, sliderHeight);
    onChange(alpha);
  }
}

function alphaGradientForColor(color: HSBColor) {
  const {red, green, blue} = hsbToRgb(color);
  const rgb = `${red}, ${green}, ${blue}`;
  return `linear-gradient(to top, rgba(${rgb}, 0) 18px, rgba(${rgb}, 1) calc(100% - 18px))`;
}
