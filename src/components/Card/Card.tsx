import React from 'react';
import {classNames} from '../../utilities/css';

import ButtonGroup from '../ButtonGroup';
import {WithinContentContext} from '../../utilities/within-content-context';
import {DisableableAction, ComplexAction} from '../../types';
import ActionList from '../ActionList';
import Button, {buttonFrom} from '../Button';
import Popover from '../Popover';

import {
  withAppProvider,
  WithAppProviderProps,
} from '../../utilities/with-app-provider';

import {Header, Section, Subsection} from './components';
import styles from './Card.scss';

export interface Props {
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

export type CombinedProps = Props & WithAppProviderProps;

export interface State {
  secondaryFooterActionsPopoverOpen: boolean;
}

class Card extends React.PureComponent<CombinedProps, State> {
  static Section = Section;
  static Header = Header;
  static Subsection = Subsection;

  state: State = {
    secondaryFooterActionsPopoverOpen: false,
  };

  render() {
    const {
      children,
      title,
      subdued,
      sectioned,
      actions,
      primaryFooterAction,
      secondaryFooterActions,
      secondaryFooterActionsDisclosureText,
      polaris: {intl},
    } = this.props;

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
              active={this.state.secondaryFooterActionsPopoverOpen}
              activator={
                <Button disclosure onClick={this.toggleSecondaryActionsPopover}>
                  {secondaryFooterActionsDisclosureText ||
                    intl.translate('Polaris.Common.more')}
                </Button>
              }
              onClose={this.toggleSecondaryActionsPopover}
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
  }

  private toggleSecondaryActionsPopover = () => {
    this.setState(({secondaryFooterActionsPopoverOpen}) => {
      return {
        secondaryFooterActionsPopoverOpen: !secondaryFooterActionsPopoverOpen,
      };
    });
  };
}

export default withAppProvider<Props>()(Card);
