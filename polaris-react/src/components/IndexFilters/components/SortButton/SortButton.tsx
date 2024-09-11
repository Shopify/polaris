import React, {useState, useMemo} from 'react';
import {SortIcon} from '@shopify/polaris-icons';

import {useI18n} from '../../../../utilities/i18n';
import {Popover} from '../../../Popover';
import {ChoiceList} from '../../../ChoiceList';
import type {ChoiceListProps} from '../../../ChoiceList';
import {Tooltip} from '../../../Tooltip';
import {Box} from '../../../Box';
import type {SortButtonChoice} from '../../types';
import {Button} from '../../../Button';
import {classNames} from '../../../../utilities/css';

import {DirectionButton} from './components';
import styles from './SortButton.module.css';

export enum SortButtonDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export interface SortButtonProps {
  choices: SortButtonChoice[];
  selected: ChoiceListProps['selected'];
  disabled?: boolean;
  disclosureZIndexOverride?: number;
  hasUnsavedChanges?: boolean;
  onClick(): void;
  onChange: (selected: string[]) => void;
  onChangeKey?: (key: string) => void;
  onChangeDirection?: (direction: string) => void;
}

export function SortButton({
  choices,
  selected,
  disabled,
  disclosureZIndexOverride,
  hasUnsavedChanges,
  onClick,
  onChange,
  onChangeKey,
  onChangeDirection,
}: SortButtonProps) {
  const i18n = useI18n();

  const [active, setActive] = useState(false);
  const [selectedValueKey, selectedDirection] = selected[0].split(' ');

  function handleClick() {
    if (!active) onClick();
    setActive((pastActive) => !pastActive);
  }

  function handleClose() {
    setActive(false);
  }

  function handleChangeChoiceList(sel: string[]) {
    if (onChangeKey) {
      const [key] = sel[0].split(' ');
      onChangeKey(key);
    } else {
      onChange(sel);
    }
  }

  function handleChangeDirection(sel: string[]) {
    if (onChangeDirection) {
      const [, direction] = sel[0].split(' ');
      onChangeDirection(direction);
    } else {
      onChange(sel);
    }
  }

  const choiceListChoices = useMemo(() => {
    const choiceCategories = choices.reduce(
      (acc: ChoiceListProps['choices'], curr) => {
        const alreadyExists = acc.some((option) => option.label === curr.label);
        const [, currentValueDirection] = curr.value.split(' ');
        const isSameDirection = currentValueDirection === selectedDirection;
        if (!alreadyExists) {
          return [...acc, curr];
        }
        if (isSameDirection) {
          return acc.map((option) => {
            if (option.label === curr.label) {
              return curr;
            }
            return option;
          });
        }
        return acc;
      },
      [],
    );
    return choiceCategories;
  }, [choices, selectedDirection]);

  const selectedChoices = choices.filter((choice) => {
    const [currentKey] = choice.value.split(' ');
    return currentKey === selectedValueKey;
  });

  const className = classNames(styles.SortButton);

  const unsavedChangeIndicator = hasUnsavedChanges ? (
    <div className={styles.AppliedFilterIndicator} />
  ) : null;

  const sortButton = (
    <Tooltip
      content={i18n.translate('Polaris.IndexFilters.SortButton.tooltip')}
      preferredPosition="above"
      hoverDelay={400}
      zIndexOverride={disclosureZIndexOverride}
    >
      <div className={className}>
        <Button
          size="slim"
          icon={SortIcon}
          onClick={handleClick}
          disabled={disabled}
          accessibilityLabel={i18n.translate(
            'Polaris.IndexFilters.SortButton.ariaLabel',
          )}
        />
        {unsavedChangeIndicator}
      </div>
    </Tooltip>
  );

  return (
    <Popover
      fluidContent
      active={active && !disabled}
      activator={sortButton}
      autofocusTarget="first-node"
      onClose={handleClose}
      preferredAlignment="right"
      zIndexOverride={disclosureZIndexOverride}
    >
      <Box
        minWidth="148px"
        paddingInlineStart="300"
        paddingInlineEnd="300"
        paddingBlockStart="200"
        paddingBlockEnd="200"
        borderBlockEndWidth="025"
        borderColor="border-secondary"
      >
        <ChoiceList
          title={i18n.translate('Polaris.IndexFilters.SortButton.title')}
          choices={choiceListChoices}
          selected={selected}
          onChange={handleChangeChoiceList}
        />
      </Box>
      <Box
        paddingInlineStart="150"
        paddingInlineEnd="150"
        paddingBlockStart="200"
        paddingBlockEnd="200"
      >
        <DirectionButton
          direction="asc"
          active={selectedDirection === SortButtonDirection.Asc}
          onClick={handleChangeDirection}
          value={selectedChoices?.[0]?.value}
        >
          {selectedChoices?.[0]?.directionLabel}
        </DirectionButton>
        <DirectionButton
          direction="desc"
          active={selectedDirection === SortButtonDirection.Desc}
          onClick={handleChangeDirection}
          value={selectedChoices?.[1]?.value}
        >
          {selectedChoices?.[1]?.directionLabel}
        </DirectionButton>
      </Box>
    </Popover>
  );
}
