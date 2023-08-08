import React, {useCallback} from 'react';
import {TickMinor} from '@shopify/polaris-icons';

import {useToggle} from '../../../../utilities/use-toggle';
import type {IconProps} from '../../../Icon';
import {Icon} from '../../../Icon';
import type {ThumbnailProps} from '../../../Thumbnail';
import type {AvatarProps} from '../../../Avatar';
import {Scrollable} from '../../../Scrollable';
import {Checkbox} from '../Checkbox';
import {classNames, variationName} from '../../../../utilities/css';
import {useFeatures} from '../../../../utilities/features';
import type {HorizontalStackProps} from '../../../HorizontalStack';
import {HorizontalStack} from '../../../HorizontalStack';
import {Checkbox as PolarisCheckbox} from '../../../Checkbox';

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
  const {polarisSummerEditions2023} = useFeatures();

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
    polarisSummerEditions2023 && allowMultiple && styles.CheckboxLabel,
    polarisSummerEditions2023 && allowMultiple && styles.MultiSelectOption,
  );

  const checkBoxRole = role === 'option' ? 'presentation' : undefined;

  const optionMarkup = allowMultiple ? (
    <label htmlFor={id} className={multiSelectClassName}>
      <div className={styles.Checkbox}>
        {polarisSummerEditions2023 ? (
          <PolarisCheckbox
            id={id}
            label=""
            ariaDescribedBy={`${id}-label`}
            value={value}
            checked={select}
            disabled={disabled}
            onChange={handleClick}
          />
        ) : (
          <Checkbox
            id={id}
            value={value}
            checked={select}
            active={active}
            disabled={disabled}
            onChange={handleClick}
            role={checkBoxRole}
          />
        )}
      </div>
      {mediaMarkup}
      {polarisSummerEditions2023 ? (
        <span id={`${id}-label`}>{label}</span>
      ) : (
        label
      )}
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
      aria-pressed={polarisSummerEditions2023 ? active || select : active}
    >
      {polarisSummerEditions2023 ? (
        <>
          <HorizontalStack
            wrap={false}
            blockAlign={verticalAlignToBlockAlign(verticalAlign)}
          >
            {mediaMarkup}
            {label}
          </HorizontalStack>
          {(select || active) && (
            <span className={styles.Icon}>
              <Icon source={TickMinor} />
            </span>
          )}
        </>
      ) : (
        <>
          {mediaMarkup}
          {label}
        </>
      )}
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

function verticalAlignToBlockAlign(
  verticalAlign?: Alignment,
): HorizontalStackProps['blockAlign'] {
  switch (verticalAlign) {
    case 'top':
      return 'start';
    case 'center':
      return 'center';
    case 'bottom':
      return 'end';
    default:
      return 'start';
  }
}
