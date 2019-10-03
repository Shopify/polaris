import React from 'react';

import {classNames} from '../../../../utilities/css';
import {HSBColor} from '../../../../utilities/color-types';
import {
  normalizeValue,
  expandHex,
  hsbToHex,
  rgbStringToHex,
  nameToHex,
  hexToHsb,
} from '../../../../utilities/color-transformers';
import {
  isColorName,
  isHexString,
  isHashlessHex,
  isRgbString,
} from '../../../../utilities/color-validation';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../../../utilities/with-app-provider';
import {TextField} from '../../../TextField';
import {SwatchBackground} from '../SwatchBackground';
import styles from '../../ColorPicker.scss';

export interface TextPickerProps {
  color: HSBColor;
  allowAlpha?: boolean;
  onChange(hex: string): void;
}

type CombinedProps = TextPickerProps & WithAppProviderProps;

interface State {
  valueHasBeenUpdatedOnce: boolean;
  value: string;
  lastValidValue: string;
  color: TextPickerProps['color'];
}

class TextPicker extends React.PureComponent<CombinedProps, State> {
  static getDerivedStateFromProps(
    {color: colorProp}: TextPickerProps,
    {color, value: currentValue}: State,
  ) {
    if (colorProp === color) {
      return null;
    }

    const newValue = hsbToHex(colorProp);
    const isNewHex = newValue !== hsbToHex(hexToHsb(currentValue));
    return {
      value: isNewHex ? newValue : currentValue,
      color: colorProp,
    };
  }

  state: State = {
    valueHasBeenUpdatedOnce: false,
    value: hsbToHex(this.props.color),
    lastValidValue: hsbToHex(this.props.color),
    color: this.props.color,
  };

  render() {
    const {value} = this.state;
    const {
      allowAlpha,
      polaris: {intl},
    } = this.props;
    const className = classNames(
      styles.TextPicker,
      allowAlpha && styles.AlphaAllowed,
    );
    const label = intl.translate(
      'Polaris.ColorPicker.textPickerAccessibilityLabel',
    );
    const valueForDisplay = isHexString(value) ? value.toUpperCase() : value;

    return (
      <div className={className}>
        <TextField
          label={label}
          labelHidden
          value={valueForDisplay}
          onBlur={this.handleBlur}
          onChange={this.handleTextChange}
          prefix={this.renderSelectedColorSwatch()}
          autoComplete={false}
        />
      </div>
    );
  }

  private handleBlur = () => {
    const {onChange, color} = this.props;
    const {value, lastValidValue, valueHasBeenUpdatedOnce} = this.state;

    if (!valueHasBeenUpdatedOnce) {
      return;
    }

    const validUserInput = this.coerceToValidUserInput(value);
    if (validUserInput) {
      this.setState({
        value: validUserInput,
        lastValidValue: validUserInput,
      });

      const colorHasChanged = validUserInput !== hsbToHex(color);

      if (colorHasChanged) {
        onChange(validUserInput);
      }

      return;
    }

    this.setState({
      value: lastValidValue,
    });
  };

  private handleTextChange = (value: string) => {
    this.setState({value, valueHasBeenUpdatedOnce: true});
  };

  private coerceToValidUserInput(value: string) {
    const normalizedValue = normalizeValue(value);
    switch (true) {
      case isHexString(normalizedValue):
        return expandHex(normalizedValue);
      case isHashlessHex(normalizedValue):
        return expandHex(`#${normalizedValue}`);
      case isRgbString(normalizedValue):
        return rgbStringToHex(normalizedValue);
      case isColorName(normalizedValue):
        return nameToHex(normalizedValue);
      default:
        return null;
    }
  }

  private renderSelectedColorSwatch = () => {
    const {color} = this.state;
    const {allowAlpha} = this.props;
    const className = classNames(
      styles.TextFieldSwatch,
      allowAlpha && styles.AlphaAllowed,
    );

    return (
      <div className={className}>
        <SwatchBackground color={color} />
      </div>
    );
  };
}

// Use named export once withAppProvider is refactored away
// eslint-disable-next-line import/no-default-export
export default withAppProvider<TextPickerProps>()(TextPicker);
