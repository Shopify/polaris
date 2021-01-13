import React from 'react';

import {useFeatures} from '../../utilities/features';
import {classNames} from '../../utilities/css';

import {AnnotatedSection, Section} from './components';
import styles from './Layout.scss';

export interface LayoutProps {
  /** Automatically adds sections to layout. */
  sectioned?: boolean;
  /** The content to display inside the layout. */
  children?: React.ReactNode;
}

export const Layout: React.FunctionComponent<LayoutProps> & {
  AnnotatedSection: typeof AnnotatedSection;
  Section: typeof Section;
} = function Layout({sectioned, children}: LayoutProps) {
  const {newDesignLanguage} = useFeatures();
  const content = sectioned ? <Section>{children}</Section> : children;
  const className = classNames(
    styles.Layout,
    newDesignLanguage && styles.newDesignLanguage,
  );

  return <div className={className}>{content}</div>;
};

Layout.AnnotatedSection = AnnotatedSection;
Layout.Section = Section;
