import React, {useCallback} from 'react';

import {useToggle} from '../../../../utilities/use-toggle';
import type {IconProps} from '../../../Icon';
import type {ThumbnailProps} from '../../../Thumbnail';
import type {AvatarProps} from '../../../Avatar';
import {Scrollable} from '../../../Scrollable';
import {Checkbox} from '../Checkbox';
import {classNames, variationName} from '../../../../utilities/css';

import styles from './Option.scss';

type Alignment = 'top' | 'center' | 'bottom';

export interface OptionProps {
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
  verticalAlign?: Alignment;
  role?: string;
  onClick(section: number, option: number): void;
  /** Callback when pointer enters the option */
  onPointerEnter(section: number, option: number): void;
  /** Callback when option is focused */
  onFocus(section: number, option: number): void;
}

export function Option({
  label,
  value,
  id,
  select,
  active,
  allowMultiple,
  disabled,
  role,
  media,
  onClick,
  section,
  index,
  verticalAlign,
  onPointerEnter,
  onFocus,
}: OptionProps) {
  const {value: focused, toggle: toggleFocused} = useToggle(false);

  const handleClick = useCallback(() => {
    if (disabled) {
      return;
    }

    onClick(section, index);
  }, [disabled, index, onClick, section]);

  const handlePointerEnter = useCallback(() => {
    if (disabled) {
      return;
    }

    onPointerEnter(section, index);
  }, [disabled, onPointerEnter, section, index]);

  const handleFocus = useCallback(() => {
    toggleFocused();

    onFocus(section, index);
  }, [toggleFocused, onFocus, section, index]);

  const mediaMarkup = media ? (
    <div className={styles.Media}>{media}</div>
  ) : null;

  const singleSelectClassName = classNames(
    styles.SingleSelectOption,
    focused && styles.focused,
    disabled && styles.disabled,
    select && styles.select,
    active && styles.active,
    verticalAlign && styles[variationName('verticalAlign', verticalAlign)],
  );

  const multiSelectClassName = classNames(
    styles.Label,
    disabled && styles.disabled,
    active && styles.active,
    select && styles.select,
    verticalAlign && styles[variationName('verticalAlign', verticalAlign)],
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
          onChange={handleClick}
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
      onClick={handleClick}
      disabled={disabled}
      onFocus={handleFocus}
      onBlur={toggleFocused}
      aria-pressed={active}
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
      onPointerEnter={handlePointerEnter}
    >
      {scrollMarkup}
      {optionMarkup}
    </li>
  );
}
