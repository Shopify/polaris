import {PureComponent} from 'react';

import {Slidable, SlidableProps} from '../Slidable';
import styles from '../../ColorPicker.scss';

import {calculateDraggerY, hueForDraggerY} from './utilities';

interface State {
  sliderHeight: number;
  draggerHeight: number;
}

export interface HuePickerProps {
  hue: number;
  onChange(hue: number): void;
}

export class HuePicker extends PureComponent<HuePickerProps, State> {
  state: State = {
    sliderHeight: 0,
    draggerHeight: 0,
  };

  render() {
    const {hue} = this.props;
    const {sliderHeight, draggerHeight} = this.state;
    const draggerY = calculateDraggerY(hue, sliderHeight, draggerHeight);

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

  private setSliderHeight = (node: HTMLElement | null) => {
    if (node == null) {
      return;
    }

    this.setState({sliderHeight: node.clientHeight});

    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        this.setState({sliderHeight: node.clientHeight});
      }, 0);
    }
  };

  private setDraggerHeight = (height: number) => {
    this.setState({
      draggerHeight: height,
    });
  };

  private handleChange: SlidableProps['onChange'] = ({y}) => {
    const {onChange} = this.props;
    const {sliderHeight} = this.state;
    const hue = hueForDraggerY(y, sliderHeight);
    onChange(hue);
  };
}
