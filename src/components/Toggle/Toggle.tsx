import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import Labelled from '../Labelled';
import Icon from '../Icon';
import {Key} from '../../types';

import * as styles from './Toggle.scss';

export interface Props {
  /** Toggles between enabled and disabled */
  checked?: boolean;
  /** Disables the toggle, disallowing interaction */
  disabled?: boolean;
  /** A unique identifier for the toggle */
  id?: string;
  /** Label for the toggle */
  label: string;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Element to display before the input */
  prefix?: React.ReactNode;
  /** Element to display after the input */
  suffix?: React.ReactNode;
  /** Callback when the toggle value is changed */
  onChange(newChecked: boolean): void;
}

const getUniqueID = createUniqueIDFactory('Toggle');

export default class Toggle extends React.Component<Props, never> {
  private toggleRef: React.RefObject<HTMLDivElement> = React.createRef();

  render() {
    const {
      checked,
      disabled,
      id = getUniqueID(),
      label,
      labelHidden,
      prefix,
      suffix,
    } = this.props;

    const toggleWrapperClassName = classNames(
      styles.Toggle,
      checked && styles.ToggleChecked,
      disabled && styles.ToggleDisabled,
    );

    const inputClassName = classNames(
      styles.Input,
      checked && styles.ToggleChecked,
      disabled && styles.ToggleDisabled,
    );

    const prefixMarkup = prefix ? (
      <Prefix onClickHandler={this.disableToggle}>{prefix}</Prefix>
    ) : null;

    const suffixMarkup = suffix ? (
      <Suffix onClickHandler={this.enableToggle}>{suffix}</Suffix>
    ) : null;

    const iconClassName = classNames(
      styles.Icon,
      checked && styles.IconEnabled,
      !checked && styles.IconDisabled,
    );

    const iconMarkup = checked ? (
      <IconWrapper className={iconClassName}>
        <Icon source="checkmark" color="indigo" />
      </IconWrapper>
    ) : (
      <IconWrapper className={iconClassName}>
        <Icon source="cancelSmall" color="inkLighter" />
      </IconWrapper>
    );

    return (
      <Labelled id={id} label={label} labelHidden={labelHidden}>
        <div className={toggleWrapperClassName}>
          {prefixMarkup}
          <div
            ref={this.toggleRef}
            id={id}
            testID="ToggleInput"
            tabIndex={0}
            className={inputClassName}
            onClick={this.handleChange}
            aria-checked={checked}
            aria-disabled={disabled}
            aria-label={label}
            role="checkbox"
            onKeyDown={this.handleKeyDown}
          >
            <div className={styles.ToggleTrack} />
            <div className={styles.ToggleThumb} />
            {iconMarkup}
          </div>
          {suffixMarkup}
        </div>
      </Labelled>
    );
  }

  @autobind
  private handleChange() {
    const {disabled, checked, onChange} = this.props;
    if (disabled) {
      return;
    }

    const newCheckedValue = !checked;
    onChange(newCheckedValue);
  }

  @autobind
  private handleKeyDown(event: React.KeyboardEvent<Element>) {
    const {disabled} = this.props;

    if (disabled) {
      return;
    }

    if (event.target === this.toggleRef.current) {
      if (event.keyCode === Key.Space) {
        event.preventDefault();
        this.handleChange();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.enableToggle();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.disableToggle();
      }
    }
  }

  @autobind
  private disableToggle() {
    this.props.onChange(false);
  }

  @autobind
  private enableToggle() {
    this.props.onChange(true);
  }
}

function IconWrapper({children, className}: any) {
  return <span className={className}>{children}</span>;
}

export function Prefix({children, onClickHandler}: any) {
  return (
    <div className={styles.Prefix} onClick={onClickHandler}>
      {children}
    </div>
  );
}

export function Suffix({children, onClickHandler}: any) {
  return (
    <div className={styles.Suffix} onClick={onClickHandler}>
      {children}
    </div>
  );
}
