import React from 'react';

import {classNames} from '../../../../utilities/css';
import {HSBColor} from '../../../../utilities/color-types';
import {
  normalizeValue,
  expandHex,
  hsbToHex,
  rgbStringToHex,
  nameToHex,
  TRANSPARENT,
  hexToHsb,
} from '../../../../utilities/color-transformers';
import {
  isColorName,
  isTransparentUserInput,
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
  color: TextPickerProps['color'];
  inputError: boolean;
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
      inputError: false,
      color: colorProp,
    };
  }

  state: State = {
    valueHasBeenUpdatedOnce: false,
    value: hsbToHex(this.props.color),
    color: this.props.color,
    inputError: false,
  };

  render() {
    const {value, inputError} = this.state;
    const {
      allowAlpha,
      polaris: {intl},
    } = this.props;
    const className = classNames(
      styles.TextPicker,
      allowAlpha && styles.AlphaAllowed,
    );
    const error = inputError
      ? intl.translate('Polaris.ColorPicker.invalidColor')
      : undefined;
    const valueForDisplay = isHexString(value) ? value.toUpperCase() : value;

    return (
      <div className={className}>
        <TextField
          label="HEX color"
          value={valueForDisplay}
          onBlur={this.handleBlur}
          error={error}
          onChange={this.handleTextChange}
          prefix={this.renderSelectedColorSwatch()}
          autoComplete={false}
        />
      </div>
    );
  }

  private handleBlur = () => {
    const {onChange, color} = this.props;
    const {value, valueHasBeenUpdatedOnce} = this.state;

    if (!valueHasBeenUpdatedOnce) {
      return;
    }

    const validUserInput = this.coerceToValidUserInput(value);
    if (validUserInput) {
      this.setState({
        value: isTransparentUserInput(validUserInput) ? '' : validUserInput,
        inputError: false,
      });

      const colorHasChanged = validUserInput !== hsbToHex(color);

      if (colorHasChanged) {
        onChange(validUserInput);
      }

      return;
    }

    this.setState({
      inputError: true,
    });
  };

  private handleTextChange = (value: string) => {
    this.setState({value, valueHasBeenUpdatedOnce: true});
  };

  private coerceToValidUserInput(value: string) {
    const normalizedValue = normalizeValue(value);
    switch (true) {
      case isTransparentUserInput(normalizedValue):
        return TRANSPARENT;
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
