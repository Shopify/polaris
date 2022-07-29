import type {ReactNode, FunctionComponent} from 'react';

// eslint-disable-next-line import/no-deprecated
import {AnnotatedSection, Section} from './components';
import styles from './Layout.scss';

export interface LayoutProps {
  /** Automatically adds sections to layout. */
  sectioned?: boolean;
  /** The content to display inside the layout. */
  children?: ReactNode;
}

export const Layout: FunctionComponent<LayoutProps> & {
  // eslint-disable-next-line import/no-deprecated
  AnnotatedSection: typeof AnnotatedSection;
  Section: typeof Section;
} = function Layout({sectioned, children}: LayoutProps) {
  const content = sectioned ? <Section>{children}</Section> : children;
  return <div className={styles.Layout}>{content}</div>;
};
// eslint-disable-next-line import/no-deprecated
Layout.AnnotatedSection = AnnotatedSection;
Layout.Section = Section;
