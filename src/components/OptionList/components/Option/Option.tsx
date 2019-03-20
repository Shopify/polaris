import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import {Props as IconProps} from '../../../Icon';
import {Props as ThumbnailProps} from '../../../Thumbnail';
import {Props as AvatarProps} from '../../../Avatar';
import Scrollable from '../../../Scrollable';
import Checkbox from '../Checkbox';

import styles from './Option.scss';

export interface Props {
  id: string;
  label: React.ReactNode;
  value: string;
  section: number;
  index: number;
  media?: React.ReactElement<IconProps | AvatarProps | ThumbnailProps>;
  disabled?: boolean;
  active?: boolean;
  select?: boolean;
  allowMultiple?: boolean;
  role?: string;
  onClick(section: number, option: number): void;
}

export interface State {
  focused: boolean;
}

export default class Option extends React.Component<Props, State> {
  state: State = {
    focused: false,
  };

  render() {
    const {
      label,
      value,
      id,
      select,
      active,
      allowMultiple,
      disabled,
      role,
      media,
    } = this.props;
    const {focused} = this.state;

    const mediaMarkup = media ? (
      <div className={styles.Media}>{media}</div>
    ) : null;

    const singleSelectClassName = classNames(
      styles.SingleSelectOption,
      focused && styles.focused,
      disabled && styles.disabled,
      select && styles.select,
      active && styles.active,
    );

    const multiSelectClassName = classNames(
      styles.Label,
      active && styles.active,
    );

    const checkBoxRole = role === 'option' ? 'presentation' : undefined;

    const optionMarkup = allowMultiple ? (
      <label htmlFor={id} className={multiSelectClassName}>
        <div className={styles.Checkbox}>
          <Checkbox
            id={id}
            value={value}
            checked={select}
            active={active}
            disabled={disabled}
            onChange={this.handleClick}
            role={checkBoxRole}
          />
        </div>
        {mediaMarkup}
        {label}
      </label>
    ) : (
      <button
        id={id}
        type="button"
        className={singleSelectClassName}
        onClick={this.handleClick}
        disabled={disabled}
        onFocus={this.toggleFocus}
        onBlur={this.toggleFocus}
      >
        {mediaMarkup}
        {label}
      </button>
    );

    const scrollMarkup = active ? <Scrollable.ScrollTo /> : null;

    return (
      <li
        key={id}
        className={styles.Option}
        tabIndex={-1}
        aria-selected={active}
        role={role}
      >
        {scrollMarkup}
        {optionMarkup}
      </li>
    );
  }

  private handleClick = () => {
    const {onClick, section, index, disabled} = this.props;

    if (disabled) {
      return;
    }

    onClick(section, index);
  };

  private toggleFocus = () => {
    this.setState((prevState) => ({focused: !prevState.focused}));
  };
}
