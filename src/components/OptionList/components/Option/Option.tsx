import React, {useCallback} from 'react';

import {useToggle} from '../../../../utilities/use-toggle';
import {classNames} from '../../../../utilities/css';
import {useFeatures} from '../../../../utilities/features';
import type {IconProps} from '../../../../types';
import type {ThumbnailProps} from '../../../Thumbnail';
import type {AvatarProps} from '../../../Avatar';
import {Scrollable} from '../../../Scrollable';
import {Checkbox} from '../Checkbox';

import styles from './Option.scss';

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
  role?: string;
  onClick(section: number, option: number): void;
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
}: OptionProps) {
  const {value: focused, toggle: toggleFocused} = useToggle(false);
  const {newDesignLanguage} = useFeatures();

  const handleClick = useCallback(() => {
    if (disabled) {
      return;
    }

    onClick(section, index);
  }, [disabled, index, onClick, section]);

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
    disabled && styles.disabled,
    active && styles.active,
    newDesignLanguage && select && styles.select,
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
      onFocus={toggleFocused}
      onBlur={toggleFocused}
    >
      {mediaMarkup}
      {label}
    </button>
  );

  const scrollMarkup = active ? <Scrollable.ScrollTo /> : null;

  const optionClassName = classNames(
    styles.Option,
    newDesignLanguage && styles.newDesignLanguage,
  );

  return (
    <li
      key={id}
      className={optionClassName}
      tabIndex={-1}
      aria-selected={active}
      role={role}
    >
      {scrollMarkup}
      {optionMarkup}
    </li>
  );
}
