import { useRef } from 'react';

import {
  wrapFocusNextFocusableMenuItem,
  wrapFocusPreviousFocusableMenuItem,
} from '../../utilities/focus';
import {KeypressListener} from '../KeypressListener';
import {ActionListItemDescriptor, ActionListSection, Key} from '../../types';
import {Box} from '../Box';

import {Section, Item} from './components';
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
  let finalSections: readonly ActionListSection[] = [];
  const actionListRef = useRef<HTMLDivElement & HTMLUListElement>(null);

  if (items) {
    finalSections = [{items}, ...sections];
  } else if (sections) {
    finalSections = sections;
  }

  const hasMultipleSections = finalSections.length > 1;
  const elementRole =
    hasMultipleSections && actionRole === 'menuitem' ? 'menu' : undefined;
  const elementTabIndex =
    hasMultipleSections && actionRole === 'menuitem' ? -1 : undefined;

  const sectionMarkup = finalSections.map((section, index) => {
    return section.items.length > 0 ? (
      <Section
        key={section.title || index}
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

  return (
    <Box
      as={hasMultipleSections ? 'ul' : 'div'}
      ref={actionListRef}
      role={elementRole}
      tabIndex={elementTabIndex}
    >
      {listeners}
      {sectionMarkup}
    </Box>
  );
}

ActionList.Item = Item;
