import * as React from 'react';
import autobind from '@shopify/javascript-utilities/autobind';
import {classNames} from '@shopify/react-utilities/styles';

import {Keys} from '../types';

import * as styles from './UnstyledButton.scss';

export interface Props extends React.HTMLProps<HTMLSpanElement> {
  children?: React.ReactNode,
  accessibilityLabel?: string,
}

export default class UnstyledButton extends React.PureComponent<Props, {}> {
  render() {
    const {
      className,
      accessibilityLabel,
      disabled,
      ...rest,
    } = this.props;
    const finalClassName = classNames(styles.UnstyledButton, className);
    const tabindex = disabled ? undefined : 0;

    return (
      <span
        {...rest}
        className={finalClassName}
        role="button"
        tabIndex={tabindex}
        aria-disabled={disabled}
        aria-label={accessibilityLabel}
        onKeyPress={this.handleKeyPress}
        onClick={this.handleClick}
      />
    );
  }

  @autobind
  private handleClick(event: React.MouseEvent<HTMLSpanElement>) {
    const {onClick, disabled} = this.props;

    if (disabled) {
      event.preventDefault();
      return;
    }

    if (onClick != null) { onClick(event); }
  }

  @autobind
  private handleKeyPress(event: React.KeyboardEvent<HTMLSpanElement>) {
    const {onClick, onKeyPress, disabled} = this.props;
    const {which: key} = event;

    if (onKeyPress != null) { onKeyPress(event); }

    if (key !== Keys.ENTER && key !== Keys.SPACE) { return; }
    event.preventDefault();

    if (onClick != null && !disabled) { onClick(event as any); }
  }
}
