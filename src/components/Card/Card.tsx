import * as React from 'react';
import {classNames} from '@shopify/css-utilities';

import {
  DisableableAction,
  ComplexAction,
  contentContextTypes,
} from '../../types';
import ActionList from '../ActionList';
import Button, {buttonFrom} from '../Button';
import ButtonGroup from '../ButtonGroup';
import Popover from '../Popover';

import {withAppProvider, WithAppProviderProps} from '../AppProvider';

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
  /** @deprecated Secondary action in the card footer */
  secondaryFooterAction?: ComplexAction;
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
  static childContextTypes = contentContextTypes;

  state: State = {
    secondaryFooterActionsPopoverOpen: false,
  };

  getChildContext() {
    return {
      withinContentContainer: true,
    };
  }

  render() {
    const {
      children,
      title,
      subdued,
      sectioned,
      actions,
      primaryFooterAction,
      secondaryFooterAction,
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

    if (secondaryFooterAction) {
      // eslint-disable-next-line no-console
      console.warn(
        'Deprecation: The secondaryFooterAction prop on Card has been deprecated. Pass an array of secondary actions to the secondaryFooterActions prop instead.',
      );
    }

    const secondaryFooterActionMarkup = secondaryFooterAction
      ? buttonFrom(secondaryFooterAction)
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
      primaryFooterActionMarkup ||
      secondaryFooterActionMarkup ||
      secondaryFooterActionsMarkup ? (
        <div className={styles.Footer}>
          <ButtonGroup>
            {secondaryFooterActionsMarkup || secondaryFooterActionMarkup}
            {primaryFooterActionMarkup}
          </ButtonGroup>
        </div>
      ) : null;

    return (
      <div className={className}>
        {headerMarkup}
        {content}
        {footerMarkup}
      </div>
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
