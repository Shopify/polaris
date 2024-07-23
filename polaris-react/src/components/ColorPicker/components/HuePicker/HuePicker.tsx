import React, {PureComponent} from 'react';

import {Slidable} from '../Slidable';
import type {SlidableProps} from '../Slidable';
import styles from '../../ColorPicker.module.css';

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

  private node: HTMLElement | null = null;
  private observer?: ResizeObserver;

  componentWillUnmount() {
    this.observer?.disconnect();
  }

  componentDidMount() {
    if (!this.node) {
      return;
    }

    this.observer = new ResizeObserver(this.setSliderHeight);
    this.observer.observe(this.node);

    this.setSliderHeight();
  }

  render() {
    const {hue} = this.props;
    const {sliderHeight, draggerHeight} = this.state;
    const draggerY = calculateDraggerY(hue, sliderHeight, draggerHeight);

    return (
      <div className={styles.HuePicker} ref={this.setNode}>
        <Slidable
          draggerY={draggerY}
          draggerX={0}
          onChange={this.handleChange}
          onDraggerHeight={this.setDraggerHeight}
        />
      </div>
    );
  }

  private setNode = (node: HTMLElement | null) => {
    if (!node) {
      return;
    }

    this.node = node;
  };

  private setSliderHeight = () => {
    const {node} = this;

    if (!node) {
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
