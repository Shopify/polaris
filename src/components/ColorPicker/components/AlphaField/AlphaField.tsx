import React from 'react';

import {HSBColor} from '../../../../utilities/color-types';
import {TextField} from '../../../TextField';
import styles from '../../ColorPicker.scss';

export interface AlphaFieldProps {
  color: HSBColor;
  alpha: number;
  onChange(hue: number): void;
}

interface State {
  alpha: AlphaFieldProps['alpha'];
  percentage: number;
  inputError: boolean;
}

export class AlphaField extends React.PureComponent<AlphaFieldProps, State> {
  static getDerivedStateFromProps(
    {alpha: alphaProp}: AlphaFieldProps,
    {alpha}: State,
  ) {
    if (alphaProp === alpha) {
      return null;
    }

    return {
      percentage: alphaProp * 100,
      inputError: false,
      alpha: alphaProp,
    };
  }

  state: State = {
    alpha: this.props.alpha,
    percentage: this.props.alpha * 100,
    inputError: false,
  };

  render() {
    const {alpha, percentage, inputError} = this.state;
    const error = inputError ? 'Input error' : undefined;
    const percentageToDisplay = Math.round(percentage).toString();

    return (
      <div className={styles.AlphaField}>
        <TextField
          label="Opacity"
          type="number"
          value={percentageToDisplay}
          onBlur={this.handleBlur}
          error={error}
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

    const roundedValue = Math.round(percentage);

    const validUserInput =
      roundedValue >= 0 && roundedValue <= 100 ? roundedValue : null;
    if (validUserInput !== null) {
      this.setState({
        percentage: roundedValue,
        inputError: false,
      });

      const alphaHasChanged = validUserInput !== alpha;

      if (alphaHasChanged) {
        onChange(validUserInput / 100);
      }

      return;
    }

    this.setState({
      inputError: true,
    });
  };

  private handleTextChange = (value: string) => {
    this.setState({percentage: parseInt(value, 10)});
  };
}
