import React from 'react';
import {useI18n} from '../../utilities/i18n';
import {classNames} from '../../utilities/css';
import {useToggle} from '../../utilities/use-toggle';
import {WithinContentContext} from '../../utilities/within-content-context';
import {ButtonGroup} from '../ButtonGroup';
import {DisableableAction, ComplexAction} from '../../types';
import {ActionList} from '../ActionList';
import {Button, buttonFrom} from '../Button';
import {Popover} from '../Popover';

import {Header, Section, Subsection} from './components';
import styles from './Card.scss';

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
}

// TypeScript can't generate types that correctly infer the typing of
// subcomponents so explicitly state the subcomponents in the type definition.
// Letting this be implicit works in this project but fails in projects that use
// generated *.d.ts files.

export const Card: React.FunctionComponent<CardProps> & {
  Header: typeof Header;
  Section: typeof Section;
  Subsection: typeof Subsection;
} = function Card({
  children,
  title,
  subdued,
  sectioned,
  actions,
  primaryFooterAction,
  secondaryFooterActions,
  secondaryFooterActionsDisclosureText,
}: CardProps) {
  const i18n = useI18n();

  const [
    secondaryActionsPopoverOpen,
    toggleSecondaryActionsPopoverOpen,
  ] = useToggle(false);

  const className = classNames(styles.Card, subdued && styles.subdued);

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
        <React.Fragment>
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
        </React.Fragment>
      );
    }
  }

  const footerMarkup =
    primaryFooterActionMarkup || secondaryFooterActionsMarkup ? (
      <div className={styles.Footer}>
        <ButtonGroup>
          {secondaryFooterActionsMarkup}
          {primaryFooterActionMarkup}
        </ButtonGroup>
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

Card.Header = Header;
Card.Section = Section;
Card.Subsection = Subsection;
