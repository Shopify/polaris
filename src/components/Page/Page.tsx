import React from 'react';

import {classNames} from '../../utilities/css';

import {Header, HeaderProps} from './components';
import styles from './Page.scss';

export interface PageProps extends HeaderProps {
  /** The contents of the page */
  children?: React.ReactNode;
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
  /** Decreases the maximum layout width. Intended for single-column layouts */
  narrowWidth?: boolean;
  /** Displays a divider between the page header and the page content */
  divider?: boolean;
}

export function Page({
  children,
  fullWidth,
  narrowWidth,
  divider,
  ...rest
}: PageProps) {
  const pageClassName = classNames(
    styles.Page,
    fullWidth && styles.fullWidth,
    narrowWidth && styles.narrowWidth,
  );

  const hasHeaderContent =
    (rest.title != null && rest.title !== '') ||
    rest.primaryAction != null ||
    (rest.secondaryActions != null && rest.secondaryActions.length > 0) ||
    (rest.actionGroups != null && rest.actionGroups.length > 0) ||
    (rest.breadcrumbs != null && rest.breadcrumbs.length > 0);

  const contentClassName = classNames(
    styles.Content,
    divider && hasHeaderContent && styles.divider,
  );

  const headerMarkup = hasHeaderContent ? <Header {...rest} /> : null;

  return (
    <div className={pageClassName}>
      {headerMarkup}
      <div className={contentClassName}>{children}</div>
    </div>
  );
}
