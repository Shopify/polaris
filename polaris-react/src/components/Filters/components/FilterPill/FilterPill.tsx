import React, {useState, useEffect, useRef} from 'react';
import {CancelSmallMinor, CaretDownMinor} from '@shopify/polaris-icons';

import {useI18n} from '../../../../utilities/i18n';
import {useToggle} from '../../../../utilities/use-toggle';
import {Popover} from '../../../Popover';
import {Button} from '../../../Button';
import {Stack} from '../../../Stack';
import {Icon} from '../../../Icon';
import {UnstyledButton} from '../../../UnstyledButton';
import {classNames} from '../../../../utilities/css';
import type {FilterInterface} from '../../../../types';
import {DisabledTooltipWrapper} from '../../../DisabledTooltipWrapper';
import type {DisabledInfo} from '../../../DisabledTooltipWrapper';

import styles from './FilterPill.scss';

export interface FilterPillProps extends FilterInterface {
  /** A unique identifier for the filter */
  filterKey: string;
  /** Whether the filter is selected or not */
  selected?: boolean;
  /** Whether the Popover will be initially open or not */
  initialActive: boolean;
  /** Callback invoked when the filter is removed */
  onRemove?(key: string): void;
  /** Callback invoked when the filter is clicked */
  onClick?(key: string): void;
  /** Whether filtering is disabled */
  disableFiltering?: DisabledInfo;
  /** Whether the filter should close when clicking inside another Popover. */
  closeOnChildOverlayClick?: boolean;
}

export function FilterPill({
  filterKey,
  label,
  filter,
  disableFiltering,
  disabled = disableFiltering?.isDisabled || false,
  hideClearButton,
  selected,
  initialActive,
  closeOnChildOverlayClick,
  onRemove,
  onClick,
}: FilterPillProps) {
  const i18n = useI18n();
  const elementRef = useRef<HTMLDivElement>(null);
  const {
    value: focused,
    setTrue: setFocusedTrue,
    setFalse: setFocusedFalse,
  } = useToggle(false);
  const [popoverActive, setPopoverActive] = useState(initialActive);

  useEffect(() => {
    const node = elementRef.current;

    if (!node || !popoverActive) {
      return;
    }

    const parent = node.parentElement?.parentElement;

    if (!parent) {
      return;
    }

    parent.scroll?.({
      left: node.offsetLeft,
    });
  }, [elementRef, popoverActive]);

  const togglePopoverActive = () => {
    if (filter) {
      setPopoverActive((popoverActive) => !popoverActive);
    }

    if (onClick) {
      onClick(filterKey);
    }
  };

  const handleClear = () => {
    if (onRemove) onRemove(filterKey);
    setPopoverActive(false);
  };

  const buttonClasses = classNames(
    styles.FilterButton,
    selected && styles.ActiveFilterButton,
    popoverActive && styles.FocusFilterButton,
    focused && styles.focusedFilterButton,
    disabled && styles.disabledFilterButton,
  );

  const clearButtonClassNames = classNames(
    styles.PlainButton,
    styles.clearButton,
  );

  const toggleButtonClassNames = classNames(
    styles.PlainButton,
    styles.ToggleButton,
  );

  const activator = (
    <span className={buttonClasses}>
      <UnstyledButton
        onFocus={setFocusedTrue}
        onBlur={setFocusedFalse}
        onClick={togglePopoverActive}
        className={toggleButtonClassNames}
        type="button"
        disabled={disabled}
      >
        {selected ? (
          <>{label}</>
        ) : (
          <>
            {label}
            <Icon source={CaretDownMinor} color="base" />
          </>
        )}
      </UnstyledButton>

      {selected ? (
        <UnstyledButton
          onClick={handleClear}
          className={clearButtonClassNames}
          type="button"
          aria-label={i18n.translate('Polaris.FilterPill.clear')}
          disabled={disabled}
        >
          <Icon source={CancelSmallMinor} color="base" />
        </UnstyledButton>
      ) : null}
    </span>
  );

  const clearButtonMarkup = !hideClearButton && (
    <Button onClick={handleClear} plain disabled={!selected}>
      {i18n.translate('FilterPill.clear')}
    </Button>
  );

  return (
    <div ref={elementRef}>
      <DisabledTooltipWrapper key={filterKey} disabled={disableFiltering}>
        <Popover
          active={popoverActive && !disableFiltering?.isDisabled}
          activator={activator}
          onClose={togglePopoverActive}
          fluidContent
          preferredAlignment="left"
          preventCloseOnChildOverlayClick={!closeOnChildOverlayClick}
        >
          <div className={styles.PopoverWrapper}>
            <Popover.Section>
              <Stack vertical spacing="tight">
                {filter}
                {clearButtonMarkup}
              </Stack>
            </Popover.Section>
          </div>
        </Popover>
      </DisabledTooltipWrapper>
    </div>
  );
}
