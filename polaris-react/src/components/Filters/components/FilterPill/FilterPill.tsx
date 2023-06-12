import React, {useState, useEffect, useRef} from 'react';
import {CancelSmallMinor, CaretDownMinor} from '@shopify/polaris-icons';

import {useI18n} from '../../../../utilities/i18n';
import {useToggle} from '../../../../utilities/use-toggle';
import {Popover} from '../../../Popover';
import {Button} from '../../../Button';
import {VerticalStack} from '../../../VerticalStack';
import {Icon} from '../../../Icon';
import {Text} from '../../../Text';
import {HorizontalStack} from '../../../HorizontalStack';
import {UnstyledButton} from '../../../UnstyledButton';
import {useBreakpoints} from '../../../../utilities/breakpoints';
import {useFeatures} from '../../../../utilities/features';
import {classNames} from '../../../../utilities/css';
import type {FilterInterface} from '../../../../types';

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
  disabled?: boolean;
  /** Whether the filter should close when clicking inside another Popover. */
  closeOnChildOverlayClick?: boolean;
}

export function FilterPill({
  filterKey,
  label,
  filter,
  disabled,
  hideClearButton,
  selected,
  initialActive,
  closeOnChildOverlayClick,
  onRemove,
  onClick,
}: FilterPillProps) {
  const i18n = useI18n();
  const {mdDown} = useBreakpoints();
  const {polarisSummerEditions2023: se23} = useFeatures();

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

  const se23LabelVariant = mdDown && se23 ? 'bodyLg' : 'bodySm';
  const labelVariant = mdDown ? 'bodyMd' : 'bodySm';

  const wrappedLabel = (
    <div className={styles.Label}>
      <Text variant={se23 ? se23LabelVariant : labelVariant} as="span">
        {label}
      </Text>
    </div>
  );

  const activator = (
    <div className={buttonClasses}>
      <HorizontalStack gap="0" wrap={false}>
        <UnstyledButton
          onFocus={setFocusedTrue}
          onBlur={setFocusedFalse}
          onClick={togglePopoverActive}
          className={toggleButtonClassNames}
          type="button"
          disabled={disabled}
        >
          <HorizontalStack
            wrap={false}
            align="center"
            blockAlign="center"
            gap="0"
          >
            {selected ? (
              <>{wrappedLabel}</>
            ) : (
              <>
                {wrappedLabel}
                <div className={styles.IconWrapper}>
                  <Icon source={CaretDownMinor} color="base" />
                </div>
              </>
            )}
          </HorizontalStack>
        </UnstyledButton>

        {selected ? (
          <UnstyledButton
            onClick={handleClear}
            className={clearButtonClassNames}
            type="button"
            aria-label={i18n.translate('Polaris.FilterPill.clear')}
            disabled={disabled}
          >
            <div className={styles.IconWrapper}>
              <Icon source={CancelSmallMinor} color="base" />
            </div>
          </UnstyledButton>
        ) : null}
      </HorizontalStack>
    </div>
  );

  const clearButtonMarkup = !hideClearButton && (
    <Button onClick={handleClear} plain disabled={!selected} textAlign="left">
      {i18n.translate('Polaris.FilterPill.clear')}
    </Button>
  );

  if (disabled) {
    return null;
  }

  return (
    <div ref={elementRef}>
      <Popover
        active={popoverActive && !disabled}
        activator={activator}
        key={filterKey}
        onClose={togglePopoverActive}
        preferredAlignment="left"
        preventCloseOnChildOverlayClick={!closeOnChildOverlayClick}
      >
        <div className={styles.PopoverWrapper}>
          <Popover.Section>
            <VerticalStack gap="1">
              {filter}
              {clearButtonMarkup}
            </VerticalStack>
          </Popover.Section>
        </div>
      </Popover>
    </div>
  );
}
