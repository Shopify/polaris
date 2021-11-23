import type {ReactNode, FunctionComponent} from 'react';

import {AnnotatedSection, Section} from './components';
import styles from './Layout.scss';

export interface LayoutProps {
  /** Automatically adds sections to layout. */
  sectioned?: boolean;
  /** The content to display inside the layout. */
  children?: ReactNode;
}

export const Layout: FunctionComponent<LayoutProps> & {
  AnnotatedSection: typeof AnnotatedSection;
  Section: typeof Section;
} = function Layout({sectioned, children}: LayoutProps) {
  const content = sectioned ? <Section>{children}</Section> : children;
  return <div className={styles.Layout}>{content}</div>;
};

Layout.AnnotatedSection = AnnotatedSection;
Layout.Section = Section;
