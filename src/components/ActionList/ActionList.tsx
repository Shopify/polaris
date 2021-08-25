import React, {useContext, useRef} from 'react';

import {KeypressListener} from '../KeypressListener';
import {PopoverContext} from '../../utilities/popover-context';
import {ActionListItemDescriptor, ActionListSection, Key} from '../../types';
import {classNames} from '../../utilities/css';
import {
  findFirstFocusableNodeIncludingDisabled,
  focusFirstFocusableNode,
  focusNextFocusableNode,
} from '../../utilities/focus';

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
  const isWithinPopover = useContext(PopoverContext);
  const elementRef = useRef<any>(null);

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

  const handleKeyPress = () => {
    if (elementRef.current.contains(document.activeElement)) {
      if (document.activeElement) {
        focusNextFocusableNode(document.activeElement as HTMLElement);
      }
    } else {
      focusFirstFocusableNode(elementRef.current);
    }
  };

  return (
    <Element ref={elementRef} className={className}>
      {isWithinPopover ? (
        <KeypressListener keyCode={Key.DownArrow} handler={handleKeyPress} />
      ) : null}
      {sectionMarkup}
    </Element>
  );
}
