import React, {useMemo, useRef, useState} from 'react';
import {SearchMinor} from '@shopify/polaris-icons';

import type {ActionListItemDescriptor, ActionListSection} from '../../types';
import {Key} from '../../types';
import {
  wrapFocusNextFocusableMenuItem,
  wrapFocusPreviousFocusableMenuItem,
} from '../../utilities/focus';
import {Box} from '../Box';
import {KeypressListener} from '../KeypressListener';
import {useI18n} from '../../utilities/i18n';
import {TextField} from '../TextField';
import {Icon} from '../Icon';

import {Item, Section} from './components';
import type {ItemProps} from './components';

export interface ActionListProps {
  /** Collection of actions for list */
  items?: readonly ActionListItemDescriptor[];
  /** Collection of sectioned action items */
  sections?: readonly ActionListSection[];
  /** Defines a specific role attribute for each action in the list */
  actionRole?: 'menuitem' | string;
  /** Callback when any item is clicked or keypressed */
  onActionAnyItem?: ActionListItemDescriptor['onAction'];
}

export type ActionListItemProps = ItemProps;

export function ActionList({
  items,
  sections = [],
  actionRole,
  onActionAnyItem,
}: ActionListProps) {
  const i18n = useI18n();

  let finalSections: readonly ActionListSection[] = [];
  const actionListRef = useRef<HTMLDivElement & HTMLUListElement>(null);
  const [searchText, setSeachText] = useState('');

  if (items) {
    finalSections = [{items}, ...sections];
  } else if (sections) {
    finalSections = sections;
  }

  // const isFilterable = finalSections?.some((section) =>
  //   section.items.some((item) => typeof item.content === 'string'),
  // );

  const hasMultipleSections = finalSections.length > 1;
  const elementRole =
    hasMultipleSections && actionRole === 'menuitem' ? 'menu' : undefined;
  const elementTabIndex =
    hasMultipleSections && actionRole === 'menuitem' ? -1 : undefined;

  const filteredSections = finalSections?.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.content?.toLowerCase().includes(searchText.toLowerCase()),
    ),
  }));

  const sectionMarkup = filteredSections.map((section, index) => {
    return section.items.length > 0 ? (
      <Section
        key={typeof section.title === 'string' ? section.title : index}
        section={section}
        hasMultipleSections={hasMultipleSections}
        actionRole={actionRole}
        onActionAnyItem={onActionAnyItem}
        isFirst={index === 0}
      />
    ) : null;
  });

  const handleFocusPreviousItem = (evt: KeyboardEvent) => {
    evt.preventDefault();
    if (actionListRef.current && evt.target) {
      if (actionListRef.current.contains(evt.target as HTMLElement)) {
        wrapFocusPreviousFocusableMenuItem(
          actionListRef.current,
          evt.target as HTMLElement,
        );
      }
    }
  };

  const handleFocusNextItem = (evt: KeyboardEvent) => {
    evt.preventDefault();
    if (actionListRef.current && evt.target) {
      if (actionListRef.current.contains(evt.target as HTMLElement)) {
        wrapFocusNextFocusableMenuItem(
          actionListRef.current,
          evt.target as HTMLElement,
        );
      }
    }
  };

  const listeners =
    actionRole === 'menuitem' ? (
      <>
        <KeypressListener
          keyEvent="keydown"
          keyCode={Key.DownArrow}
          handler={handleFocusNextItem}
        />
        <KeypressListener
          keyEvent="keydown"
          keyCode={Key.UpArrow}
          handler={handleFocusPreviousItem}
        />
      </>
    ) : null;

  const totalActions =
    finalSections?.reduce(
      (acc: number, section) => acc + section.items.length,
      0,
    ) || 0;

  const totalFilteredActions = useMemo(() => {
    const totalSectionItems =
      filteredSections?.reduce(
        (acc: number, section) => acc + section.items.length,
        0,
      ) || 0;

    return totalSectionItems;
  }, [filteredSections]);

  const showSearch = totalActions >= 8;

  return (
    <>
      {showSearch && (
        <Box padding="2" paddingBlockEnd={totalFilteredActions > 0 ? '0' : '2'}>
          <TextField
            clearButton
            labelHidden
            label={i18n.translate('Polaris.ActionList.SearchField.placeholder')}
            placeholder={i18n.translate(
              'Polaris.ActionList.SearchField.placeholder',
            )}
            autoComplete="off"
            value={searchText}
            onChange={(value) => setSeachText(value)}
            prefix={<Icon source={SearchMinor} />}
            onClearButtonClick={() => setSeachText('')}
          />
        </Box>
      )}
      <Box
        as={hasMultipleSections ? 'ul' : 'div'}
        ref={actionListRef}
        role={elementRole}
        tabIndex={elementTabIndex}
      >
        {listeners}
        {sectionMarkup}
      </Box>
    </>
  );
}

ActionList.Item = Item;
