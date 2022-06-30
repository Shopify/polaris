import React from 'react';

import {Grid} from '../Grid';

import {AnnotatedSection, Section} from './components';

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
  const content = sectioned ? <Section>{children}</Section> : children;
  return <Grid>{content}</Grid>;
};

Layout.AnnotatedSection = AnnotatedSection;
Layout.Section = Section;
