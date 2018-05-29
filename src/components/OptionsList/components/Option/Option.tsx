import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';

import {Checkbox} from '..';

import * as styles from './Option.scss';

export interface Props {
  id: string;
  label: string;
  value: string;
  section: number;
  index: number;
  disabled?: boolean;
  select?: boolean;
  allowMultiple?: boolean;
  onClick(section: number, option: number): void;
}

export default class Option extends React.Component<Props, never> {
  render() {
    const {label, value, id, select, allowMultiple, disabled} = this.props;

    const optionMarkup = allowMultiple ? (
      <label htmlFor={id} className={styles.Label}>
        <div className={styles.Checkbox}>
          <Checkbox
            id={id}
            value={value}
            checked={select}
            disabled={disabled}
            onChange={this.handleClick}
          />
        </div>
        {label}
      </label>
    ) : (
      // We should have different styles for this if this is disabled
      <button
        type="button"
        className={styles.SingleSelectOption}
        onClick={this.handleClick}
      >
        {label}
      </button>
    );

    return (
      <li
        key={id}
        className={styles.Option}
        aria-selected={select}
        role="option"
        tabIndex={-1}
      >
        {optionMarkup}
      </li>
    );
  }

  @autobind
  private handleClick() {
    const {onClick, section, index, disabled} = this.props;

    if (!disabled) {
      onClick(section, index);
    }
  }
}
