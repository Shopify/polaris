import React from 'react';
import {AnnotatedSection, Section} from './components';
import styles from './Layout.scss';

export interface LayoutProps {
  /** Automatically adds sections to layout. */
  sectioned?: boolean;
  /** The content to display inside the layout. */
  children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, never> {
  static AnnotatedSection = AnnotatedSection;
  static Section = Section;

  render() {
    const {children, sectioned} = this.props;

    const content = sectioned ? <Section>{children}</Section> : children;

    return <div className={styles.Layout}>{content}</div>;
  }
}
