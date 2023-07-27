import React, {useRef, useState} from 'react';

import {debounce} from '../../utilities/debounce';
import {clamp} from '../../utilities/clamp';
import {classNames} from '../../utilities/css';
import {
  hsbToRgb,
  hsbToString,
  hexToHsb,
} from '../../utilities/color-transformers';
import type {HSBAColor} from '../../utilities/color-types';
import {useEventListener} from '../../utilities/use-event-listener';

import type {SlidableProps} from './components';
import {
  AlphaField,
  AlphaPicker,
  HuePicker,
  Slidable,
  TextPicker,
} from './components';
import styles from './ColorPicker.scss';

export interface ColorPickerProps {
  /** ID for the element */
  id?: string;
  /** The currently selected color */
  color: Color;
  /** Allow user to select an alpha value */
  allowAlpha?: boolean;
  /** Allow HuePicker to take the full width */
  fullWidth?: boolean;
  /** Show text fields for entering color and alpha values */
  textEditor?: boolean;
  /** Callback when color is selected */
  onChange(color: HSBAColor): void;
}

const RESIZE_DEBOUNCE_TIME_MS = 200;

function ColorPicker({
  id,
  color,
  allowAlpha,
  fullWidth,
  textEditor,
  onChange,
}: ColorPickerProps) {
  const colorNodeRef = useRef<HTMLDivElement | null>(null);
  const [pickerSize, setPickerSize] = useState({
    width: 0,
    height: 0,
  });

  const {hue, saturation, brightness, alpha: providedAlpha} = color;
  const alpha = providedAlpha != null && allowAlpha ? providedAlpha : 1;
  const {red, green, blue} = hsbToRgb({hue, saturation: 1, brightness: 1});
  const colorString = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  const draggerX = clamp(saturation * pickerSize.width, 0, pickerSize.width);
  const draggerY = clamp(
    pickerSize.height - brightness * pickerSize.height,
    0,
    pickerSize.height,
  );

  const handleAlphaChange = (alpha: number) => {
    onChange({hue, brightness, saturation, alpha});
  };

  const handleHexChange = (hex: string) => {
    const newColor = hexToHsb(hex);
    onChange({...newColor, alpha});
  };

  const alphaSliderMarkup = allowAlpha ? (
    <AlphaPicker alpha={alpha} color={color} onChange={handleAlphaChange} />
  ) : null;

  const swatchClassNames = classNames(
    styles.TextFieldSwatch,
    allowAlpha && styles.AlphaAllowed,
  );

  const backgroundColor = hsbToString(color);

  const swatchMarkup = (
    <div className={swatchClassNames}>
      <div style={{backgroundColor}} className={styles.SwatchBackground} />
    </div>
  );

  const hexPickerMarkup = (
    <TextPicker
      color={color}
      allowAlpha={allowAlpha}
      onChange={handleHexChange}
    />
  );

  const alphaFieldMarkup = allowAlpha ? (
    <AlphaField alpha={alpha} onChange={handleAlphaChange} />
  ) : null;

  const textFieldsMarkup = textEditor ? (
    <div className={styles.TextFields}>
      {swatchMarkup}
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

  const handlePickerDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    // prevents external elements from being selected
    event.preventDefault();
  };

  const handleDraggerMove: SlidableProps['onChange'] = ({x, y}) => {
    const saturation = clamp(x / pickerSize.width, 0, 1);
    const brightness = clamp(1 - y / pickerSize.height, 0, 1);

    onChange({hue, saturation, brightness, alpha});
  };

  const handleHueChange = (hue: number) => {
    onChange({hue, brightness, saturation, alpha});
  };

  const handleResize = debounce(
    () => {
      if (colorNodeRef.current == null) {
        return;
      }

      setPickerSize({
        width: colorNodeRef.current.clientWidth,
        height: colorNodeRef.current.clientHeight,
      });
    },
    RESIZE_DEBOUNCE_TIME_MS,
    {leading: true, trailing: true, maxWait: RESIZE_DEBOUNCE_TIME_MS},
  );

  useEventListener('resize', handleResize);

  return (
    <div className={wrapperClassName}>
      <div
        className={styles.ColorPicker}
        id={id}
        onMouseDown={handlePickerDrag}
      >
        <div ref={colorNodeRef} className={colorNodeClassName}>
          <div
            className={styles.ColorLayer}
            style={{backgroundColor: colorString}}
          />
          <Slidable
            onChange={handleDraggerMove}
            draggerX={draggerX}
            draggerY={draggerY}
          />
        </div>
        <HuePicker hue={hue} onChange={handleHueChange} />
        {alphaSliderMarkup}
      </div>
      {textFieldsMarkup}
    </div>
  );
}

export {ColorPicker};
