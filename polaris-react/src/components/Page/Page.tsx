import React from 'react';

import {isInterface} from '../../utilities/is-interface';
import {isReactElement} from '../../utilities/is-react-element';
import {Box} from '../Box';
import {Divider} from '../Divider';
import {Inline} from '../Inline';

import {Header} from './components';
import type {HeaderProps} from './components';

export interface PageProps extends HeaderProps {
  /** The contents of the page */
  children?: React.ReactNode;
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
  /** Decreases the maximum layout width. Intended for single-column layouts */
  narrowWidth?: boolean;
  /** Displays a divider between the page header and the page content */
  divider?: boolean;
  /** Aria role */
  role?: React.AriaRole;
}

export function Page({
  children,
  fullWidth,
  narrowWidth,
  divider,
  ...rest
}: PageProps) {
  const hasHeaderContent =
    (rest.title != null && rest.title !== '') ||
    (rest.subtitle != null && rest.subtitle !== '') ||
    rest.primaryAction != null ||
    (rest.secondaryActions != null &&
      ((isInterface(rest.secondaryActions) &&
        rest.secondaryActions.length > 0) ||
        isReactElement(rest.secondaryActions))) ||
    (rest.actionGroups != null && rest.actionGroups.length > 0) ||
    (rest.breadcrumbs != null &&
      Array.isArray(rest.breadcrumbs) &&
      rest.breadcrumbs.length > 0) ||
    rest.breadcrumbs != null ||
    rest.backAction != null;

  const headerMarkup = hasHeaderContent ? <Header {...rest} /> : null;
  let pageWidth = '62.375rem';
  if (fullWidth) pageWidth = '100%';
  if (narrowWidth) pageWidth = '41.375rem';
  return (
    <Inline align="center">
      <Box
        padding={{xs: '0'}}
        paddingInlineStart={{sm: '6'}}
        paddingInlineEnd={{sm: '6'}}
        maxWidth={pageWidth}
        width="100%"
      >
        {headerMarkup}
        {divider && hasHeaderContent && (
          <Box paddingBlockEnd="8">
            <Divider />
          </Box>
        )}
        <Box
          paddingBlockEnd={hasHeaderContent ? undefined : '2'}
          paddingBlockStart={hasHeaderContent ? undefined : {xs: '2', md: '5'}}
        >
          {children}
        </Box>
      </Box>
    </Inline>
  );
}
