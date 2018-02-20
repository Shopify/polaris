import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import {Action, DisableableAction} from '../../types';
import {buttonFrom} from '../Button';
import ButtonGroup from '../ButtonGroup';

import Header from './Header';
import Section from './Section';
import * as styles from './Card.scss';

export interface Props {
  title?: string,
  children?: React.ReactNode,
  subdued?: boolean,
  sectioned?: boolean,
  actions?: DisableableAction[],
  primaryFooterAction?: Action,
  secondaryFooterAction?: Action,
}

export default class Card extends React.PureComponent<Props, never> {
  static Section = Section;

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

    const headerMarkup = title
      ? <Header actions={actions}>{title}</Header>
      : null;

    const content = sectioned
      ? <Section>{children}</Section>
      : children;

    const primaryFooterActionMarkup = primaryFooterAction
      ? buttonFrom(primaryFooterAction, {primary: true})
      : null;

    const secondaryFooterActionMarkup = secondaryFooterAction
      ? buttonFrom(secondaryFooterAction)
      : null;

    const footerMarkup = primaryFooterActionMarkup || secondaryFooterActionMarkup
      ? (
        <div className={styles.Footer}>
          <ButtonGroup>
            {primaryFooterActionMarkup}
            {secondaryFooterActionMarkup}
          </ButtonGroup>
        </div>
      )
      : null;

    return (
      <div className={className}>
        {headerMarkup}
        {content}
        {footerMarkup}
      </div>
    );
  }
}
