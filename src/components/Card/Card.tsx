import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import Header, {Action} from './Header';
import Section from './Section';
import Footer from './Footer';

import * as styles from './Card.scss';

export interface Props {
  title?: React.ReactNode,
  children?: React.ReactNode,
  subdued?: boolean,
  actions?: Action[],
  sectioned?: boolean,
}

export default class Card extends React.PureComponent<Props, {}> {
  static Section = Section;
  static Footer = Footer;

  render() {
    const {children, title, subdued, sectioned, actions} = this.props;
    const className = classNames(styles.Card, subdued && styles.subdued);

    const headerContent = title
      ? <Header actions={actions}>{title}</Header>
      : null;

    const content = sectioned
      ? <Section>{children}</Section>
      : children;

    return (
      <div className={className} data-quilt-container>
        {headerContent}
        {content}
      </div>
    );
  }
}
