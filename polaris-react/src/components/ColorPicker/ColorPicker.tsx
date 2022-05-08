import React, {PureComponent} from 'react';

import {debounce} from '../../utilities/debounce';
import {clamp} from '../../utilities/clamp';
import {classNames} from '../../utilities/css';
import {hsbToRgb, rgbToHsb} from '../../utilities/color-transformers';
import type {HSBColor, HSBAColor} from '../../utilities/color-types';
import {EventListener} from '../EventListener';
import {tokens} from '../../tokens';

import {AlphaPicker, HuePicker, Slidable, SlidableProps} from './components';
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
  /** Callback when color is selected */
  onChange(color: HSBAColor): void;
}

const rgbaRe = /^rgba\((\d+), (\d+), (\d+), 1\)$/;
const schemeColors: HSBColor[] = [];

for (const [_name, rgbaStr] of Object.entries(tokens.colorSchemes.light)) {
  const matches = rgbaRe.exec(rgbaStr);

  if (matches) {
    const [red, green, blue] = matches.slice(1).map(Number);
    schemeColors.push(rgbToHsb({red, green, blue}));
  }
}

function findClosestHsb(color: HSBColor): HSBColor | null {
  let closestDistance = Infinity;
  let closestHsb: HSBColor | null = null;

  for (const comparison of schemeColors) {
    const distance = Math.hypot(
      color.hue - comparison.hue,
      color.saturation - comparison.saturation,
      color.brightness - comparison.brightness,
    );
    if (distance < closestDistance) {
      closestDistance = distance;
      closestHsb = comparison;
    }
  }

  return closestHsb;
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
  private gamutNode: HTMLCanvasElement | null = null;

  private renderGamut() {
    const {gamutNode} = this;

    if (gamutNode == null) {
      console.log('nope');
      return;
    }

    const {color, allowAlpha} = this.props;
    const {hue, alpha: providedAlpha} = color;

    const alpha = providedAlpha != null && allowAlpha ? providedAlpha : 1;

    const {width, height} = gamutNode;

    const ctx = gamutNode.getContext('2d')!;
    const imageData = new ImageData(width, height);
    const {data} = imageData;

    let offset = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const currentSaturation = x / width;
        const currentBrightness = 1 - y / height;

        const mappedHsb = findClosestHsb({
          hue,
          saturation: currentSaturation,
          brightness: currentBrightness,
        });
        const {red, green, blue} = mappedHsb
          ? hsbToRgb(mappedHsb)
          : {
              red: 255,
              green: 255,
              blue: 255,
            };

        data[offset++] = red;
        data[offset++] = green;
        data[offset++] = blue;
        data[offset++] = alpha * 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  private handleResize = debounce(
    () => {
      const {colorNode, gamutNode} = this;

      if (colorNode == null || gamutNode == null) {
        return;
      }

      gamutNode.width = gamutNode.clientWidth;
      gamutNode.height = gamutNode.clientHeight;

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
    const {colorNode, gamutNode} = this;
    if (colorNode == null || gamutNode == null) {
      return;
    }

    gamutNode.width = gamutNode.clientWidth;
    gamutNode.height = gamutNode.clientHeight;

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

  componentDidUpdate() {
    this.renderGamut();
  }

  render() {
    const {id, color, allowAlpha, fullWidth} = this.props;
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

    const className = classNames(
      styles.ColorPicker,
      fullWidth && styles.fullWidth,
    );

    return (
      <div className={className} id={id} onMouseDown={this.handlePickerDrag}>
        <div ref={this.setColorNode} className={styles.MainColor}>
          <div
            className={styles.ColorLayer}
            style={{backgroundColor: colorString}}
          />
          <canvas ref={this.setGamutNode} className={styles.Gamut}></canvas>
          <Slidable
            onChange={this.handleDraggerMove}
            draggerX={draggerX}
            draggerY={draggerY}
          />
        </div>
        <HuePicker hue={hue} onChange={this.handleHueChange} />
        {alphaSliderMarkup}
        <EventListener event="resize" handler={this.handleResize} />
      </div>
    );
  }

  private setColorNode = (node: HTMLElement | null) => {
    this.colorNode = node;
  };

  private setGamutNode = (node: HTMLCanvasElement | null) => {
    this.gamutNode = node;
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
