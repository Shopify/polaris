import React, {useState, useEffect, useRef, useCallback} from 'react';
import {XSmallIcon, ChevronDownIcon} from '@shopify/polaris-icons';

import {useI18n} from '../../../../utilities/i18n';
import {useToggle} from '../../../../utilities/use-toggle';
import {Box} from '../../../Box';
import {Popover} from '../../../Popover';
import {Button} from '../../../Button';
import {BlockStack} from '../../../BlockStack';
import {Icon} from '../../../Icon';
import {Text} from '../../../Text';
import {InlineStack} from '../../../InlineStack';
import {UnstyledButton} from '../../../UnstyledButton';
import {classNames} from '../../../../utilities/css';
import type {FilterInterface} from '../../../../types';

import styles from './FilterPill.module.css';

export interface FilterPillProps extends FilterInterface {
  /** Whether the filter is newly applied or updated and hasn't been saved */
  unsavedChanges?: boolean;
  /** A unique identifier for the filter */
  filterKey: string;
  /** Whether the filter is selected or not */
  selected?: boolean;
  /** Whether the Popover will be initially open or not */
  initialActive: boolean;
  /** Whether filtering is disabled */
  disabled?: boolean;
  /** Override z-index of popovers and tooltips */
  disclosureZIndexOverride?: number;
  /** Whether the filter should close when clicking inside another Popover. */
  closeOnChildOverlayClick?: boolean;
  /** Callback invoked when the filter is removed */
  onRemove?(key: string): void;
  /** Callback invoked when the filter is clicked */
  onClick?(key: string): void;
}

export function FilterPill({
  unsavedChanges = false,
  filterKey,
  label,
  filter,
  disabled,
  hideClearButton,
  selected,
  initialActive,
  disclosureZIndexOverride,
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

  const togglePopoverActive = useCallback(() => {
    if (filter) {
      setPopoverActive((popoverActive) => !popoverActive);
    }

    if (onClick) {
      onClick(filterKey);
    }
  }, [filter, filterKey, onClick]);

  const handlePopoverClose = useCallback(() => {
    togglePopoverActive();
    if (!selected) {
      onRemove?.(filterKey);
    }
  }, [onRemove, selected, filterKey, togglePopoverActive]);

  const handleClear = () => {
    if (onRemove) onRemove(filterKey);
    setPopoverActive(false);
  };

  const buttonClasses = classNames(
    styles.FilterButton,
    selected && styles.ActiveFilterButton,
    popoverActive && styles.FocusFilterButton,
    focused && styles.focusedFilterButton,
  );

  const clearButtonClassNames = classNames(
    styles.PlainButton,
    styles.clearButton,
  );

  const toggleButtonClassNames = classNames(
    styles.PlainButton,
    styles.ToggleButton,
    onRemove === undefined && styles.locked,
  );

  const disclosureMarkup = !selected ? (
    <div className={styles.IconWrapper}>
      <Icon source={ChevronDownIcon} tone="base" />
    </div>
  ) : null;

  const labelMarkup = (
    <Box paddingInlineStart={unsavedChanges ? '0' : '050'}>
      <InlineStack>
        <Text variant="bodySm" as="span">
          {label}
        </Text>
      </InlineStack>
    </Box>
  );

  const unsavedPip = unsavedChanges ? (
    <Box paddingInlineEnd="150">
      <Box
        background="bg-fill-emphasis"
        borderRadius="050"
        width="6px"
        minHeight="6px"
      />
    </Box>
  ) : null;

  const removeFilterButtonMarkup =
    selected && onRemove !== undefined ? (
      <UnstyledButton
        onClick={handleClear}
        className={clearButtonClassNames}
        type="button"
        aria-label={i18n.translate('Polaris.FilterPill.clear')}
      >
        <div className={styles.IconWrapper}>
          <Icon source={XSmallIcon} tone="base" />
        </div>
      </UnstyledButton>
    ) : null;

  const activator = (
    <div className={buttonClasses}>
      <InlineStack gap="0" wrap={false}>
        <UnstyledButton
          onFocus={setFocusedTrue}
          onBlur={setFocusedFalse}
          onClick={togglePopoverActive}
          className={toggleButtonClassNames}
          type="button"
          accessibilityLabel={
            unsavedChanges
              ? i18n.translate('Polaris.FilterPill.unsavedChanges', {label})
              : label
          }
        >
          <InlineStack wrap={false} align="center" blockAlign="center" gap="0">
            {unsavedPip}
            {labelMarkup}
            {disclosureMarkup}
          </InlineStack>
        </UnstyledButton>

        {removeFilterButtonMarkup}
      </InlineStack>
    </div>
  );

  const clearButtonMarkup = !hideClearButton && (
    <div className={styles.ClearButtonWrapper}>
      <Button
        onClick={handleClear}
        variant="plain"
        disabled={!selected}
        textAlign="left"
      >
        {i18n.translate('Polaris.FilterPill.clear')}
      </Button>
    </div>
  );

  if (disabled) {
    return null;
  }

  return (
    <div ref={elementRef}>
      <Popover
        active={popoverActive}
        activator={activator}
        key={filterKey}
        onClose={handlePopoverClose}
        preferredAlignment="left"
        zIndexOverride={disclosureZIndexOverride}
        preventCloseOnChildOverlayClick={!closeOnChildOverlayClick}
      >
        <div className={styles.PopoverWrapper}>
          <Popover.Section>
            <BlockStack gap="100">
              {filter}
              {clearButtonMarkup}
            </BlockStack>
          </Popover.Section>
        </div>
      </Popover>
    </div>
  );
}
