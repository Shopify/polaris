import * as React from 'react';
import autobind from '@shopify/javascript-utilities/autobind';

import {HSBColor} from './types';
import {hsbToRgb} from './color-utilities';
import {clamp} from './math';
import HuePicker from './HuePicker';
import Slidable, {Position} from './Slidable';
import * as styles from './ColorPicker.scss';

export interface State {
  pickerSize: number,
}

export interface Props {
  color: HSBColor,
  onChange(color: HSBColor): void,
}

export default class ColorPicker extends React.PureComponent<Props, State> {
  state: State = {
    pickerSize: 0,
  };

  render() {
    const {hue, saturation, brightness} = this.props.color;
    const {pickerSize} = this.state;
    const colorString = `rgb(${hsbToRgb(hue, 1, 1)})`;
    const draggerX = clamp(saturation * pickerSize, 0, pickerSize);
    const draggerY = clamp(pickerSize - (brightness * pickerSize), 0, pickerSize);

    return (
      <div className={styles.ColorPicker}>
        <div
          ref={this.setSize}
          style={{backgroundColor: colorString}}
          className={styles.MainColor}
        >
          <Slidable
            onChange={this.handleDraggerMove}
            draggerX={draggerX}
            draggerY={draggerY}
          />
        </div>
        <HuePicker
          hue={hue}
          onChange={this.handleHuePick}
        />
      </div>
    );
  }

  @autobind
  private setSize(node: HTMLElement) {
    this.setState({pickerSize: node.clientWidth});

    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        this.setState({pickerSize: node.clientWidth});
      }, 0);
    }
  }

  @autobind
  private handleHuePick(hue: number) {
    const {color: {brightness, saturation}, onChange} = this.props;
    onChange({hue, brightness, saturation});
  }

  @autobind
  private handleDraggerMove({x, y}: Position) {
    const {pickerSize} = this.state;
    const {color: {hue}, onChange} = this.props;

    const saturation = clamp(x / pickerSize, 0, 1);
    const brightness = clamp(1 - y / pickerSize, 0, 1);

    onChange({hue, saturation, brightness});
  }
}
