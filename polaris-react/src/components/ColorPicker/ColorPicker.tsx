import React, {PureComponent} from 'react';

import {debounce} from '../../utilities/debounce';
import {clamp} from '../../utilities/clamp';
import {classNames} from '../../utilities/css';
import {hsbToRgb, hexToHsb} from '../../utilities/color-transformers';
import type {HSBColor, HSBAColor} from '../../utilities/color-types';
// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../EventListener';

import {
  AlphaField,
  AlphaPicker,
  HuePicker,
  Slidable,
  SlidableProps,
  TextPicker,
} from './components';
import styles from './ColorPicker.scss';

interface State {
  pickerSize: {
    width: number;
    height: number;
  };
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
  /** Allow HuePicker to take the full width */
  fullWidth?: boolean;
  /** Show text fields for entering values for color and alpha */
  textEditor?: boolean;
  /** Callback when color is selected */
  onChange(color: HSBAColor): void;
}

const RESIZE_DEBOUNCE_TIME_MS = 200;
export class ColorPicker extends PureComponent<ColorPickerProps, State> {
  state: State = {
    pickerSize: {
      width: 0,
      height: 0,
    },
  };

  private colorNode: HTMLElement | null = null;

  private handleResize = debounce(
    () => {
      const {colorNode} = this;

      if (colorNode == null) {
        return;
      }

      this.setState({
        pickerSize: {
          width: colorNode.clientWidth,
          height: colorNode.clientHeight,
        },
      });
    },
    RESIZE_DEBOUNCE_TIME_MS,
    {leading: true, trailing: true, maxWait: RESIZE_DEBOUNCE_TIME_MS},
  );

  componentDidMount() {
    const {colorNode} = this;
    if (colorNode == null) {
      return;
    }

    this.setState({
      pickerSize: {
        width: colorNode.clientWidth,
        height: colorNode.clientHeight,
      },
    });

    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        this.setState({
          pickerSize: {
            width: colorNode.clientWidth,
            height: colorNode.clientHeight,
          },
        });
      }, 0);
    }
  }

  render() {
    const {id, color, allowAlpha, fullWidth, textEditor} = this.props;
    const {hue, saturation, brightness, alpha: providedAlpha} = color;
    const {pickerSize} = this.state;

    const alpha = providedAlpha != null && allowAlpha ? providedAlpha : 1;
    const {red, green, blue} = hsbToRgb({hue, saturation: 1, brightness: 1});
    const colorString = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    const draggerX = clamp(saturation * pickerSize.width, 0, pickerSize.width);
    const draggerY = clamp(
      pickerSize.height - brightness * pickerSize.height,
      0,
      pickerSize.height,
    );

    const alphaSliderMarkup = allowAlpha ? (
      <AlphaPicker
        alpha={alpha}
        color={color}
        onChange={this.handleAlphaChange}
      />
    ) : null;

    const hexPickerMarkup = (
      <TextPicker
        color={color}
        allowAlpha={allowAlpha}
        onChange={this.handleHexChange}
      />
    );

    const alphaFieldMarkup = allowAlpha ? (
      <AlphaField alpha={alpha} onChange={this.handleAlphaChange} />
    ) : null;

    const textFieldsMarkup = textEditor ? (
      <div className={styles.TextFields}>
        {hexPickerMarkup}
        {alphaFieldMarkup}
      </div>
    ) : null;

    const wrapperClassName = classNames(
      allowAlpha && styles.AlphaAllowed,
      fullWidth && styles.fullWidth,
      textEditor && styles.TextAllowed,
    );

    const colorNodeClassName = classNames(
      styles.MainColor,
      allowAlpha && styles.AlphaAllowed,
    );

    return (
      <div className={wrapperClassName}>
        <div
          className={styles.ColorPicker}
          id={id}
          onMouseDown={this.handlePickerDrag}
        >
          <div ref={this.setColorNode} className={colorNodeClassName}>
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
        {textFieldsMarkup}
        <EventListener event="resize" handler={this.handleResize} />
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

  private handleHexChange = (hex: string) => {
    const {
      color: {alpha = 1},
      onChange,
    } = this.props;
    const newColor = hexToHsb(hex);
    onChange({...newColor, alpha});
  };

  private handleDraggerMove: SlidableProps['onChange'] = ({x, y}) => {
    const {pickerSize} = this.state;
    const {
      color: {hue, alpha = 1},
      onChange,
    } = this.props;

    const saturation = clamp(x / pickerSize.width, 0, 1);
    const brightness = clamp(1 - y / pickerSize.height, 0, 1);

    onChange({hue, saturation, brightness, alpha});
  };

  private handlePickerDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    // prevents external elements from being selected
    event.preventDefault();
  };
}
