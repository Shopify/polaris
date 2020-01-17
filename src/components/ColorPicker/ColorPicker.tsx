import React from 'react';
import {clamp} from '@shopify/javascript-utilities/math';

import {hsbToRgb} from '../../utilities/color-transformers';
import {HSBColor, HSBAColor} from '../../utilities/color-types';
import {AlphaPicker, HuePicker, Slidable, Position} from './components';
import styles from './ColorPicker.scss';

interface State {
  pickerSize: number;
}

interface Color extends HSBColor {
  /** Level of transparency */
  alpha?: HSBAColor['alpha'];
}

export interface ColorPickerProps {
  /** ID for the element */
  id?: string;
  /** The currently selected color */
  color: Color;
  /** Allow user to select an alpha value */
  allowAlpha?: boolean;
  /** Callback when color is selected */
  onChange(color: HSBAColor): void;
}

export class ColorPicker extends React.PureComponent<ColorPickerProps, State> {
  state: State = {
    pickerSize: 0,
  };

  private colorNode: HTMLElement | null = null;

  componentDidMount() {
    const {colorNode} = this;
    if (colorNode == null) {
      return;
    }

    this.setState({pickerSize: colorNode.clientWidth});

    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        this.setState({pickerSize: colorNode.clientWidth});
      }, 0);
    }
  }

  render() {
    const {id, color, allowAlpha} = this.props;
    const {hue, saturation, brightness, alpha: providedAlpha} = color;
    const {pickerSize} = this.state;

    const alpha = providedAlpha != null && allowAlpha ? providedAlpha : 1;
    const {red, green, blue} = hsbToRgb({hue, saturation: 1, brightness: 1});
    const colorString = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    const draggerX = clamp(saturation * pickerSize, 0, pickerSize);
    const draggerY = clamp(pickerSize - brightness * pickerSize, 0, pickerSize);

    const alphaSliderMarkup = allowAlpha ? (
      <AlphaPicker
        alpha={alpha}
        color={color}
        onChange={this.handleAlphaChange}
      />
    ) : null;

    return (
      <div
        className={styles.ColorPicker}
        id={id}
        onMouseDown={this.handlePickerDrag}
      >
        <div ref={this.setColorNode} className={styles.MainColor}>
          <div
            className={styles.ColorLayer}
            style={{backgroundColor: colorString}}
          />
          <Slidable
            onChange={this.handleDraggerMove}
            draggerX={draggerX}
            draggerY={draggerY}
          />
        </div>
        <HuePicker hue={hue} onChange={this.handleHueChange} />
        {alphaSliderMarkup}
      </div>
    );
  }

  private setColorNode = (node: HTMLElement | null) => {
    this.colorNode = node;
  };

  private handleHueChange = (hue: number) => {
    const {
      color: {brightness, saturation, alpha = 1},
      onChange,
    } = this.props;
    onChange({hue, brightness, saturation, alpha});
  };

  private handleAlphaChange = (alpha: number) => {
    const {
      color: {hue, brightness, saturation},
      onChange,
    } = this.props;
    onChange({hue, brightness, saturation, alpha});
  };

  private handleDraggerMove = ({x, y}: Position) => {
    const {pickerSize} = this.state;
    const {
      color: {hue, alpha = 1},
      onChange,
    } = this.props;

    const saturation = clamp(x / pickerSize, 0, 1);
    const brightness = clamp(1 - y / pickerSize, 0, 1);

    onChange({hue, saturation, brightness, alpha});
  };

  private handlePickerDrag = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    // prevents external elements from being selected
    event.preventDefault();
  };
}
