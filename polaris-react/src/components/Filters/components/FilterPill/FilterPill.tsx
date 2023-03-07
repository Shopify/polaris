import React, {useState, useEffect, useRef} from 'react';
import {CancelSmallMinor, CaretDownMinor} from '@shopify/polaris-icons';

import {useI18n} from '../../../../utilities/i18n';
import {useToggle} from '../../../../utilities/use-toggle';
import {Popover} from '../../../Popover';
import {Button} from '../../../Button';
import {AlphaStack} from '../../../AlphaStack';
import {Icon} from '../../../Icon';
import {Text} from '../../../Text';
import {Inline} from '../../../Inline';
import {UnstyledButton} from '../../../UnstyledButton';
import {useBreakpoints} from '../../../../utilities/breakpoints';
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

  const wrappedLabel = (
    <Text variant={mdDown ? 'bodyMd' : 'bodySm'} as="span">
      {label}
    </Text>
  );

  const activator = (
    <div className={buttonClasses}>
      <Inline gap="0" wrap={false}>
        <UnstyledButton
          onFocus={setFocusedTrue}
          onBlur={setFocusedFalse}
          onClick={togglePopoverActive}
          className={toggleButtonClassNames}
          type="button"
          disabled={disabled}
        >
          <Inline wrap={false} align="center" blockAlign="center" gap="0">
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
          </Inline>
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
      </Inline>
    </div>
  );

  const clearButtonMarkup = !hideClearButton && (
    <Button onClick={handleClear} plain disabled={!selected}>
      {i18n.translate('Polaris.FilterPill.clear')}
    </Button>
  );

  return (
    <div ref={elementRef}>
      <Popover
        active={popoverActive && !disabled}
        activator={activator}
        key={filterKey}
        onClose={togglePopoverActive}
        fluidContent
        preferredAlignment="left"
        preventCloseOnChildOverlayClick={!closeOnChildOverlayClick}
      >
        <div className={styles.PopoverWrapper}>
          <Popover.Section>
            <AlphaStack gap="1">
              {filter}
              {clearButtonMarkup}
            </AlphaStack>
          </Popover.Section>
        </div>
      </Popover>
    </div>
  );
}
