import * as React from 'react';
import {classNames} from '@shopify/css-utilities';

import {
  DisableableAction,
  ComplexAction,
  contentContextTypes,
} from '../../types';
import {buttonFrom} from '../Button';
import ButtonGroup from '../ButtonGroup';

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
  /** Secondary action in the card footer */
  secondaryFooterAction?: ComplexAction;
}

export default class Card extends React.PureComponent<Props, never> {
  static Section = Section;
  static Header = Header;
  static Subsection = Subsection;
  static childContextTypes = contentContextTypes;

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
    } = this.props;

    const className = classNames(styles.Card, subdued && styles.subdued);

    const headerMarkup =
      title || actions ? <Header actions={actions} title={title} /> : null;

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
      <div className={className}>
        {headerMarkup}
        {content}
        {footerMarkup}
      </div>
    );
  }
}
