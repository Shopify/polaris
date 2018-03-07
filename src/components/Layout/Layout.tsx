import * as React from 'react';
import Section from './Section';
import AnnotatedSection from './AnnotatedSection';
import * as styles from './Layout.scss';

export interface Props {
  /** Automatically adds sections to layout. */
  sectioned?: boolean,
  /** The content to display inside the layout. */
  children?: React.ReactNode,
}

export default class Layout extends React.Component<Props, never> {
  static AnnotatedSection = AnnotatedSection;
  static Section = Section;

  render() {
    const {children, sectioned} = this.props;

    const content = sectioned
      ? <Section>{children}</Section>
      : children;

    return (
      <div className={styles.Layout}>
        {content}
      </div>
    );
  }
}
