import React, {useState, useMemo} from 'react';
import {SortMinor} from '@shopify/polaris-icons';

import {useI18n} from '../../../../utilities/i18n';
import {Icon} from '../../../Icon';
import {Popover} from '../../../Popover';
import {ChoiceList} from '../../../ChoiceList';
import type {ChoiceListProps} from '../../../ChoiceList';
import {Tooltip} from '../../../Tooltip';
import {Box} from '../../../Box';
import type {SortButtonChoice} from '../../types';
import {FilterButton} from '../FilterButton';

import {DirectionButton} from './components';

export enum SortButtonDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export interface SortButtonProps {
  choices: SortButtonChoice[];
  selected: ChoiceListProps['selected'];
  onChange: (selected: string[]) => void;
  disabled?: boolean;
  onChangeKey?: (key: string) => void;
  onChangeDirection?: (direction: string) => void;
}

export function SortButton({
  choices,
  selected,
  onChange,
  disabled,
  onChangeKey,
  onChangeDirection,
}: SortButtonProps) {
  const i18n = useI18n();
  const [active, setActive] = useState(false);
  const [selectedValueKey, selectedDirection] = selected[0].split(' ');

  function handleClick() {
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

  const sortButton = (
    <Tooltip
      content={i18n.translate('Polaris.IndexFilters.SortButton.tooltip')}
      preferredPosition="above"
      hoverDelay={400}
    >
      <FilterButton
        icon={SortMinor}
        onClick={handleClick}
        label={i18n.translate('Polaris.IndexFilters.SortButton.ariaLabel')}
        disabled={disabled}
      />
    </Tooltip>
  );

  return (
    <Popover
      active={active && !disabled}
      activator={sortButton}
      autofocusTarget="first-node"
      onClose={handleClose}
      fluidContent
    >
      <Box
        minWidth="148px"
        padding="4"
        borderBlockEndWidth="1"
        borderColor="border-subdued"
      >
        <ChoiceList
          title={i18n.translate('Polaris.IndexFilters.SortButton.title')}
          choices={choiceListChoices}
          selected={selected}
          onChange={handleChangeChoiceList}
        />
      </Box>
      <Box padding="4">
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
