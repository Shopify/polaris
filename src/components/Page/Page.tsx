import React from 'react';

import {classNames} from '../../utilities/css';
import {useFeatures} from '../../utilities/features';

import {Header, HeaderProps} from './components';
import styles from './Page.scss';

export interface PageProps extends HeaderProps {
  /** The contents of the page */
  children?: React.ReactNode;
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
  /** Decreases the maximum layout width. Intended for single-column layouts */
  narrowWidth?: boolean;
}

export function Page({children, fullWidth, narrowWidth, ...rest}: PageProps) {
  const {newDesignLanguage} = useFeatures();
  const className = classNames(
    styles.Page,
    fullWidth && styles.fullWidth,
    narrowWidth && styles.narrowWidth,
    newDesignLanguage && styles.newDesignLanguage,
  );

  const hasHeaderContent =
    (rest.title != null && rest.title !== '') ||
    rest.primaryAction != null ||
    (rest.secondaryActions != null && rest.secondaryActions.length > 0) ||
    (rest.actionGroups != null && rest.actionGroups.length > 0) ||
    (rest.breadcrumbs != null && rest.breadcrumbs.length > 0);

  const headerMarkup = hasHeaderContent ? <Header {...rest} /> : null;

  return (
    <div className={className}>
      {headerMarkup}
      <div className={styles.Content}>{children}</div>
    </div>
  );
}
