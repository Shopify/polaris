import React from 'react';

import {Grid} from '../Grid';

import {Section} from './components';

export interface LayoutProps {
  /** The content to display inside the layout. */
  children?: React.ReactNode;
}

export const Layout: React.FunctionComponent<LayoutProps> & {
  Section: typeof Section;
} = function Layout({children}: LayoutProps) {
  return <Grid>{children}</Grid>;
};
Layout.Section = Section;
