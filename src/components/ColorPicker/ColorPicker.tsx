import * as React from 'react';
import {clamp} from '@shopify/javascript-utilities/math';
import autobind from '@shopify/javascript-utilities/autobind';

import {HSBColor, HSBAColor} from './types';
import {hsbToRgb} from './color-utilities';
import HuePicker from './HuePicker';
import AlphaPicker from './AlphaPicker';
import Slidable, {Position} from './Slidable';
import * as styles from './ColorPicker.scss';

export interface State {
  pickerSize: number,
}

export interface Color extends HSBColor {
  alpha?: HSBAColor['alpha'],
}

export interface Props {
  color: Color,
  allowAlpha?: boolean,
  onChange(color: HSBAColor): void,
}

export default class ColorPicker extends React.PureComponent<Props, State> {
  state: State = {
    pickerSize: 0,
  };

  private colorNode: HTMLElement;

  componentDidMount() {
    this.setState({pickerSize: this.colorNode.clientWidth});

    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        this.setState({pickerSize: this.colorNode.clientWidth});
      }, 0);
    }
  }

  render() {
    const {color, allowAlpha} = this.props;
    const {hue, saturation, brightness, alpha: providedAlpha} = color;
    const {pickerSize} = this.state;

    const alpha = providedAlpha != null && allowAlpha ? providedAlpha : 1;
    const {red, green, blue} = hsbToRgb({hue, saturation: 1, brightness: 1});
    const colorString = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    const draggerX = clamp(saturation * pickerSize, 0, pickerSize);
    const draggerY = clamp(pickerSize - (brightness * pickerSize), 0, pickerSize);

    const alphaSliderMarkup = allowAlpha
      ? (
        <AlphaPicker
          alpha={alpha}
          color={color}
          onChange={this.handleAlphaChange}
        />
      )
      : null;

    return (
      <div className={styles.ColorPicker}>
        <div
          ref={this.setColorNode}
          className={styles.MainColor}
        >
          <div className={styles.ColorLayer} style={{backgroundColor: colorString}} />
          <Slidable
            onChange={this.handleDraggerMove}
            draggerX={draggerX}
            draggerY={draggerY}
          />
        </div>
        <HuePicker
          hue={hue}
          onChange={this.handleHueChange}
        />
        {alphaSliderMarkup}
      </div>
    );
  }

  @autobind
  private setColorNode(node: HTMLElement) {
    this.colorNode = node;
  }

  @autobind
  private handleHueChange(hue: number) {
    const {color: {brightness, saturation, alpha = 1}, onChange} = this.props;
    onChange({hue, brightness, saturation, alpha});
  }

  @autobind
  private handleAlphaChange(alpha: number) {
    const {color: {hue, brightness, saturation}, onChange} = this.props;
    onChange({hue, brightness, saturation, alpha});
  }

  @autobind
  private handleDraggerMove({x, y}: Position) {
    const {pickerSize} = this.state;
    const {color: {hue, alpha = 1}, onChange} = this.props;

    const saturation = clamp(x / pickerSize, 0, 1);
    const brightness = clamp(1 - y / pickerSize, 0, 1);

    onChange({hue, saturation, brightness, alpha});
  }
}
