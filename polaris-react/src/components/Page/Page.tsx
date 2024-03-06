import React from 'react';

import {classNames} from '../../utilities/css';
import {isInterface} from '../../utilities/is-interface';
import {isReactElement} from '../../utilities/is-react-element';

import {Header} from './components';
import type {HeaderProps} from './components';
import styles from './Page.module.css';

export interface PageProps extends HeaderProps {
  /** The contents of the page */
  children?: React.ReactNode;
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
  /** Decreases the maximum layout width. Intended for single-column layouts */
  narrowWidth?: boolean;
}

export function Page({children, fullWidth, narrowWidth, ...rest}: PageProps) {
  const pageClassName = classNames(
    styles.Page,
    fullWidth && styles.fullWidth,
    narrowWidth && styles.narrowWidth,
  );

  const hasHeaderContent =
    (rest.title != null && rest.title !== '') ||
    (rest.subtitle != null && rest.subtitle !== '') ||
    rest.primaryAction != null ||
    (rest.secondaryActions != null &&
      ((isInterface(rest.secondaryActions) &&
        rest.secondaryActions.length > 0) ||
        isReactElement(rest.secondaryActions))) ||
    (rest.actionGroups != null && rest.actionGroups.length > 0) ||
    rest.backAction != null;

  const contentClassName = classNames(!hasHeaderContent && styles.Content);

  const headerMarkup = hasHeaderContent ? (
    <Header filterActions {...rest} />
  ) : null;

  return (
    <div className={pageClassName}>
      {headerMarkup}
      <div className={contentClassName}>{children}</div>
    </div>
  );
}
