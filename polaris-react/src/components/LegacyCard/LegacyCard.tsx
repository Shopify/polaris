import React, {useEffect, useRef, useState} from 'react';
import type {SpaceScale} from '@shopify/polaris-tokens';

import {useI18n} from '../../utilities/i18n';
import {classNames} from '../../utilities/css';
import {useToggle} from '../../utilities/use-toggle';
import {WithinContentContext} from '../../utilities/within-content-context';
import {ButtonGroup} from '../ButtonGroup';
import type {DisableableAction, ComplexAction} from '../../types';
import {ActionList} from '../ActionList';
import {Button, buttonFrom} from '../Button';
import {Popover} from '../Popover';

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
  const legacyCardNode = useRef<HTMLDivElement>(null);
  const [firstSectionElement, setFirstSectionElement] =
    useState<Element | null>(null);
  const [lastSectionElement, setLastSectionElement] = useState<Element | null>(
    null,
  );

  useEffect(() => {
    if (legacyCardNode.current) {
      const updateFirstAndLastSectionPadding = () => {
        // Reset old first and last section padding
        updatePadding(firstSectionElement, '2', 'top');
        updatePadding(lastSectionElement, '2', 'bottom');

        // Get current first and last sections
        const currentElements = legacyCardNode.current?.querySelectorAll(
          `.${styles.Section}, .${styles.Header}, .${styles.Footer}`,
        );

        if (currentElements?.length) {
          const firstSection = currentElements[0];
          const lastSection = currentElements[currentElements.length - 1];

          // Update current element padding
          updatePadding(firstSection, '4', 'top');
          updatePadding(lastSection, '4', 'bottom');

          // Update state with current elements
          setFirstSectionElement(firstSection);
          setLastSectionElement(lastSection);
        }
      };

      // First initial render
      updateFirstAndLastSectionPadding();

      // Re-run when descendants are changed
      const observer = new MutationObserver(updateFirstAndLastSectionPadding);
      observer.observe(legacyCardNode.current, {
        childList: true,
        subtree: true,
      });

      return () => observer.disconnect();
    }
  }, [firstSectionElement, lastSectionElement]);

  return legacyCardNode;
}

function updatePadding(
  element: Element | null,
  space: SpaceScale,
  area: 'top' | 'bottom',
) {
  if (!element || element.className.includes('flush')) return;

  switch (area) {
    case 'top':
      (element as HTMLElement).style.paddingTop = `var(--p-space-${space})`;
      return;
    case 'bottom':
      (element as HTMLElement).style.paddingBottom = `var(--p-space-${space})`;
  }
}
