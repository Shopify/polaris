import React, {useEffect, useRef} from 'react';

import {useI18n} from '../../utilities/i18n';
import {classNames} from '../../utilities/css';
import {useToggle} from '../../utilities/use-toggle';
import {WithinContentContext} from '../../utilities/within-content-context';
import {ButtonGroup} from '../ButtonGroup';
import type {DisableableAction, ComplexAction} from '../../types';
import {ActionList} from '../ActionList';
import {Button, buttonFrom} from '../Button';
import {Popover} from '../Popover';
import {useFeatures} from '../../utilities/features';

import {Header, Section, Subsection} from './components';
import styles from './LegacyCard.scss';

export type {
  LegacyCardSectionProps,
  LegacyCardHeaderProps,
  LegacyCardSubsectionProps,
} from './components';

export interface LegacyCardProps {
  /** Title content for the card */
  title?: React.ReactNode;
  /** Inner content of the card */
  children?: React.ReactNode;
  /** A less prominent card */
  subdued?: boolean;
  /** Auto wrap content in section */
  sectioned?: boolean;
  /** Card header actions */
  actions?: DisableableAction[];
  /** Primary action in the card footer */
  primaryFooterAction?: ComplexAction;
  /** Secondary actions in the card footer */
  secondaryFooterActions?: ComplexAction[];
  /** The content of the disclosure button rendered when there is more than one secondary footer action */
  secondaryFooterActionsDisclosureText?: string;
  /** Alignment of the footer actions on the card, defaults to right */
  footerActionAlignment?: 'right' | 'left';
  /** Allow the card to be hidden when printing */
  hideOnPrint?: boolean;
}

// TypeScript can't generate types that correctly infer the typing of
// subcomponents so explicitly state the subcomponents in the type definition.
// Letting this be implicit works in this project but fails in projects that use
// generated *.d.ts files.

export const LegacyCard: React.FunctionComponent<LegacyCardProps> & {
  Header: typeof Header;
  Section: typeof Section;
  Subsection: typeof Subsection;
} = function LegacyCard({
  children,
  hideOnPrint,
  title,
  subdued,
  sectioned,
  actions,
  primaryFooterAction,
  secondaryFooterActions,
  secondaryFooterActionsDisclosureText,
  footerActionAlignment = 'right',
}: LegacyCardProps) {
  const i18n = useI18n();
  const {
    value: secondaryActionsPopoverOpen,
    toggle: toggleSecondaryActionsPopoverOpen,
  } = useToggle(false);
  const legacyCardNode = useLegacyCardPaddingObserverRef();

  const className = classNames(
    styles.LegacyCard,
    subdued && styles.subdued,
    hideOnPrint && styles.hideOnPrint,
  );

  const headerMarkup =
    title || actions ? <Header actions={actions} title={title} /> : null;

  const content = sectioned ? <Section>{children}</Section> : children;

  const primaryFooterActionMarkup = primaryFooterAction
    ? buttonFrom(primaryFooterAction, {primary: true})
    : null;

  let secondaryFooterActionsMarkup = null;
  if (secondaryFooterActions && secondaryFooterActions.length) {
    if (secondaryFooterActions.length === 1) {
      secondaryFooterActionsMarkup = buttonFrom(secondaryFooterActions[0]);
    } else {
      secondaryFooterActionsMarkup = (
        <>
          <Popover
            active={secondaryActionsPopoverOpen}
            activator={
              <Button disclosure onClick={toggleSecondaryActionsPopoverOpen}>
                {secondaryFooterActionsDisclosureText ||
                  i18n.translate('Polaris.Common.more')}
              </Button>
            }
            onClose={toggleSecondaryActionsPopoverOpen}
          >
            <ActionList items={secondaryFooterActions} />
          </Popover>
        </>
      );
    }
  }

  const footerMarkup =
    primaryFooterActionMarkup || secondaryFooterActionsMarkup ? (
      <div
        className={classNames(
          styles.Footer,
          footerActionAlignment === 'left' && styles.LeftJustified,
        )}
      >
        {footerActionAlignment === 'right' ? (
          <ButtonGroup>
            {secondaryFooterActionsMarkup}
            {primaryFooterActionMarkup}
          </ButtonGroup>
        ) : (
          <ButtonGroup>
            {primaryFooterActionMarkup}
            {secondaryFooterActionsMarkup}
          </ButtonGroup>
        )}
      </div>
    ) : null;

  return (
    <WithinContentContext.Provider value>
      <div className={className} ref={legacyCardNode}>
        {headerMarkup}
        {content}
        {footerMarkup}
      </div>
    </WithinContentContext.Provider>
  );
};

LegacyCard.Header = Header;
LegacyCard.Section = Section;
LegacyCard.Subsection = Subsection;

function useLegacyCardPaddingObserverRef() {
  const {polarisSummerEditions2023} = useFeatures();
  const legacyCard = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!polarisSummerEditions2023) {
      return;
    }

    const legacyCardNode = legacyCard.current;
    let firstSection: Element | undefined;
    let lastSection: Element | undefined;

    if (legacyCardNode) {
      const updateFirstAndLastSectionPadding = () => {
        // Reset old first and last section padding
        updatePadding(firstSection, 'top', false);
        updatePadding(lastSection, 'bottom', false);

        // Get current first and last sections, return if they don't exist
        const currentElements = legacyCardNode.querySelectorAll(
          `.${styles.Section}, .${styles.Header}, .${styles.Footer}`,
        );
        if (!currentElements?.length) return;

        const firstElement = currentElements[0];
        const lastElement = currentElements[currentElements.length - 1];

        // Update padding for first element if it is the first child or
        // a descendant of the first child
        if (legacyCardNode.firstChild?.contains(firstElement)) {
          firstSection = firstElement;
          updatePadding(firstSection, 'top', true);
        }

        // Update padding for last element if it is the last child or
        // a descendant of the last child
        if (legacyCardNode.lastChild?.contains(lastElement)) {
          lastSection = lastElement;
          updatePadding(lastSection, 'bottom', true);
        }
      };

      // First initial render
      updateFirstAndLastSectionPadding();

      // Re-run when descendants are changed
      const observer = new MutationObserver(updateFirstAndLastSectionPadding);
      observer.observe(legacyCardNode, {
        childList: true,
        subtree: true,
      });

      return () => {
        updatePadding(firstSection, 'top', false);
        updatePadding(lastSection, 'bottom', false);
        observer.disconnect();
      };
    }
  }, [polarisSummerEditions2023]);

  return legacyCard;
}

function updatePadding(
  element: Element | undefined,
  area: 'top' | 'bottom',
  add: boolean,
) {
  if (!element || element.className.includes(styles['Section-flush'])) return;

  switch (area) {
    case 'top':
      (element as HTMLElement).classList.toggle(
        styles.FirstSectionPadding,
        add,
      );
      return;
    case 'bottom':
      (element as HTMLElement).classList.toggle(styles.LastSectionPadding, add);
  }
}
