import React from 'react';

import {useI18n} from '../../utilities/i18n';
import {classNames} from '../../utilities/css';
import {useToggle} from '../../utilities/use-toggle';
import {WithinContentContext} from '../../utilities/within-content-context';
import {ButtonGroup} from '../ButtonGroup';
import type {DisableableAction, ComplexAction} from '../../types';
import {ActionList} from '../ActionList';
import {Button, buttonFrom} from '../Button';
import {Popover} from '../Popover';

// eslint-disable-next-line import/no-deprecated
import {Header, Section, Subsection} from './components';
import styles from './Card.scss';

export type {
  CardSectionProps,
  CardHeaderProps,
  CardSubsectionProps,
} from './components';

export interface CardProps {
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
/** @deprecated Use AlphaCard instead. */
export const Card: React.FunctionComponent<CardProps> & {
  // eslint-disable-next-line import/no-deprecated
  Header: typeof Header;
  // eslint-disable-next-line import/no-deprecated
  Section: typeof Section;
  // eslint-disable-next-line import/no-deprecated
  Subsection: typeof Subsection;
} = function Card({
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
}: CardProps) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: <Card /> is deprecated. This component will be removed in a future major version of Polaris. Use <LegacyCard /> or <AlphaCard /> instead.',
    );
  }

  const i18n = useI18n();
  const {
    value: secondaryActionsPopoverOpen,
    toggle: toggleSecondaryActionsPopoverOpen,
  } = useToggle(false);

  const className = classNames(
    styles.Card,
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
      <div className={className}>
        {headerMarkup}
        {content}
        {footerMarkup}
      </div>
    </WithinContentContext.Provider>
  );
};

// eslint-disable-next-line import/no-deprecated
Card.Header = Header;
// eslint-disable-next-line import/no-deprecated
Card.Section = Section;
// eslint-disable-next-line import/no-deprecated
Card.Subsection = Subsection;
