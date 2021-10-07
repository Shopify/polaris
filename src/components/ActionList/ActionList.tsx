import React from 'react';

import {KeypressListener} from '../KeypressListener';
import {
  focusNextFocusableNode,
  focusPreviousFocusableNode,
} from '../../utilities/focus';
import {ActionListItemDescriptor, ActionListSection, Key} from '../../types';
import {classNames} from '../../utilities/css';

import {Section} from './components';
import styles from './ActionList.scss';

export interface ActionListProps {
  /** Collection of actions for list */
  items?: ActionListItemDescriptor[];
  /** Collection of sectioned action items */
  sections?: ActionListSection[];
  /** Defines a specific role attribute for each action in the list */
  actionRole?: string;
  /** Callback when any item is clicked or keypressed */
  onActionAnyItem?: ActionListItemDescriptor['onAction'];
}

export function ActionList({
  items,
  sections = [],
  actionRole,
  onActionAnyItem,
}: ActionListProps) {
  let finalSections: ActionListSection[] = [];

  if (items) {
    finalSections = [{items}, ...sections];
  } else if (sections) {
    finalSections = sections;
  }

  const className = classNames(styles.ActionList);

  const hasMultipleSections = finalSections.length > 1;
  const Element = hasMultipleSections ? 'ul' : 'div';
  const sectionMarkup = finalSections.map((section, index) => {
    return section.items.length > 0 ? (
      <Section
        key={section.title || index}
        firstSection={index === 0}
        section={section}
        hasMultipleSections={hasMultipleSections}
        actionRole={actionRole}
        onActionAnyItem={onActionAnyItem}
      />
    ) : null;
  });

  const handleFocusPreviousItem = (evt: KeyboardEvent) => {
    evt.preventDefault();
    focusPreviousFocusableNode(document.activeElement as HTMLElement);
  };

  const handleFocusNextItem = (evt: KeyboardEvent) => {
    evt.preventDefault();
    focusNextFocusableNode(document.activeElement as HTMLElement);
  };

  const listeners =
    actionRole === 'menu' ? (
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
    <Element className={className}>
      {listeners}
      {sectionMarkup}
    </Element>
  );
}
