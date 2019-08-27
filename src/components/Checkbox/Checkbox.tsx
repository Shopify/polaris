import React from 'react';
import {MinusMinor, TickSmallMinor} from '@shopify/polaris-icons';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';

import {classNames} from '../../utilities/css';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../utilities/with-app-provider';
import {Choice, helpTextID} from '../Choice';
import {errorTextID} from '../InlineError';
import {Icon} from '../Icon';
import {Error, Key} from '../../types';

import styles from './Checkbox.scss';

export interface BaseProps {
  /** Indicates the ID of the element that describes the checkbox*/
  ariaDescribedBy?: string;
  /** Label for the checkbox */
  label: React.ReactNode;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Checkbox is selected. `indeterminate` shows a horizontal line in the checkbox */
  checked?: boolean | 'indeterminate';
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
  /** Disable input */
  disabled?: boolean;
  /** ID for form input */
  id?: string;
  /** Name for form input */
  name?: string;
  /** Value for form input */
  value?: string;
  /** Display an error message */
  error?: Error | boolean;
  /** Callback when checkbox is toggled */
  onChange?(newChecked: boolean, id: string): void;
  /** Callback when checkbox is focussed */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
}

export interface CheckboxProps extends BaseProps {}
type CombinedProps = CheckboxProps & WithAppProviderProps;

const getUniqueID = createUniqueIDFactory('Checkbox');

class Checkbox extends React.PureComponent<CombinedProps, never> {
  private inputNode = React.createRef<HTMLInputElement>();

  handleInput = () => {
    const {onChange, id, disabled} = this.props;

    if (onChange == null || this.inputNode.current == null || disabled) {
      return;
    }

    onChange(!this.inputNode.current.checked, id as any);
    this.inputNode.current.focus();
  };

  handleKeyUp = (event: React.KeyboardEvent) => {
    const {keyCode} = event;

    if (keyCode !== Key.Space) return;
    this.handleInput();
  };

  render() {
    const {
      ariaDescribedBy: ariaDescribedByProp,
      id = getUniqueID(),
      label,
      labelHidden,
      helpText,
      checked = false,
      error,
      disabled,
      onFocus,
      onBlur,
      name,
      value,
    } = this.props;
    const describedBy: string[] = [];
    if (error && typeof error !== 'boolean') {
      describedBy.push(errorTextID(id));
    }
    if (helpText) {
      describedBy.push(helpTextID(id));
    }
    if (ariaDescribedByProp) {
      describedBy.push(ariaDescribedByProp);
    }
    const ariaDescribedBy = describedBy.length
      ? describedBy.join(' ')
      : undefined;

    const wrapperClassName = classNames(styles.Checkbox, error && styles.error);

    const isIndeterminate = checked === 'indeterminate';
    const isChecked = !isIndeterminate && Boolean(checked);

    const indeterminateAttributes = isIndeterminate
      ? {indeterminate: 'true', 'aria-checked': 'mixed' as 'mixed'}
      : {'aria-checked': isChecked};

    const iconSource = isIndeterminate ? MinusMinor : TickSmallMinor;

    const inputClassName = classNames(
      styles.Input,
      isIndeterminate && styles['Input-indeterminate'],
    );

    return (
      /* eslint-disable jsx-a11y/no-redundant-roles */
      <Choice
        id={id}
        label={label}
        labelHidden={labelHidden}
        helpText={helpText}
        error={error}
        disabled={disabled}
        onClick={this.handleInput}
      >
        <span className={wrapperClassName}>
          <input
            onKeyUp={this.handleKeyUp}
            ref={this.inputNode}
            id={id}
            name={name}
            value={value}
            type="checkbox"
            checked={isChecked}
            disabled={disabled}
            className={inputClassName}
            onFocus={onFocus}
            onBlur={onBlur}
            onClick={stopPropagation}
            onChange={noop}
            aria-invalid={error != null}
            aria-describedby={ariaDescribedBy}
            role="checkbox"
            {...indeterminateAttributes}
          />
          <span className={styles.Backdrop} />
          <span className={styles.Icon}>
            <Icon source={iconSource} />
          </span>
        </span>
      </Choice>
      /* eslint-enable jsx-a11y/no-redundant-roles */
    );
  }
}

function noop() {}

function stopPropagation<E>(event: React.MouseEvent<E>) {
  event.stopPropagation();
}

export default withAppProvider<CheckboxProps>()(Checkbox);
