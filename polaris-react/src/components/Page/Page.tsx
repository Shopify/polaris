import React from 'react';

import {classNames} from '../../utilities/css';
import {isInterface} from '../../utilities/is-interface';
import {isReactElement} from '../../utilities/is-react-element';

import {Header} from './components';
import type {HeaderProps} from './components';
import styles from './Page.scss';

export interface ViewTransition {
  /** Whether the view transition is enabled */
  enabled?: boolean;
  /** The view transition name for the page header */
  headerName?: string;
  /** The view transition name for the page contents */
  contentName?: string;
}

export interface PageProps extends HeaderProps {
  /** The contents of the page */
  children?: React.ReactNode;
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
  /** Decreases the maximum layout width. Intended for single-column layouts */
  narrowWidth?: boolean;
  /** Enables view transitions when navigating */
  viewTransition?: ViewTransition;
}

export function Page({
  children,
  fullWidth,
  narrowWidth,
  viewTransition = {
    enabled: false,
    headerName: undefined,
    contentName: undefined,
  },
  ...rest
}: PageProps) {
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

  const contentStyle = viewTransition.enabled
    ? ({viewTransitionName: viewTransition.contentName} as React.CSSProperties)
    : undefined;

  const headerMarkup = hasHeaderContent ? (
    <Header filterActions viewTransition={viewTransition} {...rest} />
  ) : null;

  return (
    <div className={pageClassName}>
      {headerMarkup}
      <div className={contentClassName} style={contentStyle}>
        {children}
      </div>
    </div>
  );
}
