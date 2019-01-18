import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {autobind} from '@shopify/javascript-utilities/decorators';

import {Action, DisableableAction} from '../../types';
import {buttonFrom} from '../Button';
import ButtonGroup from '../ButtonGroup';
import {Provider, WithinContentContext} from '../WithinContentContext';

import {Header, Section} from './components';
import * as styles from './Card.scss';

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
  primaryFooterAction?: Action;
  /** Secondary action in the card footer */
  secondaryFooterAction?: Action;
}

export default class Card extends React.PureComponent<Props, never> {
  static Section = Section;
  static Header = Header;

  render() {
    const {
      children,
      title,
      subdued,
      sectioned,
      actions,
      primaryFooterAction,
      secondaryFooterAction,
    } = this.props;

    const className = classNames(styles.Card, subdued && styles.subdued);

    const headerMarkup = title ? (
      <Header actions={actions} title={title} />
    ) : null;

    const content = sectioned ? <Section>{children}</Section> : children;

    const primaryFooterActionMarkup = primaryFooterAction
      ? buttonFrom(primaryFooterAction, {primary: true})
      : null;

    const secondaryFooterActionMarkup = secondaryFooterAction
      ? buttonFrom(secondaryFooterAction)
      : null;

    const footerMarkup =
      primaryFooterActionMarkup || secondaryFooterActionMarkup ? (
        <div className={styles.Footer}>
          <ButtonGroup>
            {secondaryFooterActionMarkup}
            {primaryFooterActionMarkup}
          </ButtonGroup>
        </div>
      ) : null;

    return (
      <Provider value={this.getContext}>
        <div className={className}>
          {headerMarkup}
          {content}
          {footerMarkup}
        </div>
      </Provider>
    );
  }

  @autobind
  get getContext(): WithinContentContext {
    return {
      withinContentContainer: true,
    };
  }
}
