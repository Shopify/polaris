import React from 'react';
import {clamp} from '@shopify/javascript-utilities/math';

import {HSBColor} from '../../../../utilities/color-types';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../../../utilities/with-app-provider';
import {TextField} from '../../../TextField';
import styles from '../../ColorPicker.scss';

export interface AlphaFieldProps {
  color: HSBColor;
  alpha: number;
  onChange(hue: number): void;
}

type CombinedProps = AlphaFieldProps & WithAppProviderProps;

interface State {
  alpha: AlphaFieldProps['alpha'];
  percentage: number;
}

class AlphaField extends React.PureComponent<CombinedProps, State> {
  static getDerivedStateFromProps(
    {alpha: alphaProp}: AlphaFieldProps,
    {alpha}: State,
  ) {
    if (alphaProp === alpha) {
      return null;
    }

    return {
      percentage: alphaProp * 100,
      alpha: alphaProp,
    };
  }

  state: State = {
    alpha: this.props.alpha,
    percentage: this.props.alpha * 100,
  };

  render() {
    const {percentage} = this.state;
    const {
      polaris: {intl},
    } = this.props;

    const label = intl.translate(
      'Polaris.ColorPicker.alphaFieldAccessibilityLabel',
    );
    const percentageToDisplay = Math.round(percentage).toString();

    return (
      <div className={styles.AlphaField}>
        <TextField
          label={label}
          labelHidden
          type="number"
          value={percentageToDisplay}
          onBlur={this.handleBlur}
          min={0}
          max={100}
          suffix="%"
          onChange={this.handleTextChange}
          autoComplete={false}
        />
      </div>
    );
  }

  private handleBlur = () => {
    const {onChange, alpha} = this.props;
    const {percentage} = this.state;

    const roundedValue = clamp(Math.round(percentage), 0, 100);

    if (roundedValue !== null) {
      this.setState({
        percentage: roundedValue,
      });

      const alphaHasChanged = roundedValue !== alpha * 100;

      if (alphaHasChanged) {
        onChange(roundedValue / 100);
      }
    }
  };

  private handleTextChange = (value: string) => {
    this.setState({percentage: parseInt(value, 10)});
  };
}

// Use named export once withAppProvider is refactored away
// eslint-disable-next-line import/no-default-export
export default withAppProvider<AlphaFieldProps>()(AlphaField);
