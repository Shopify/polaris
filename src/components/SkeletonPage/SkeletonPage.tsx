import React, {useMemo} from 'react';

import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {SkeletonDisplayText} from '../SkeletonDisplayText';
import {SkeletonBodyText} from '../SkeletonBodyText';

import styles from './SkeletonPage.scss';

export interface SkeletonPageProps {
  /** Page title, in large type */
  title?: string;
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
  /** Decreases the maximum layout width. Intended for single-column layouts */
  narrowWidth?: boolean;
  /** Shows a skeleton over the primary action */
  primaryAction?: boolean;
  /** Number of secondary page-level actions to display */
  secondaryActions?: number;
  /** Shows a skeleton over the breadcrumb */
  breadcrumbs?: boolean;
  /** The child elements to render in the skeleton page. */
  children?: React.ReactNode;
}

export function SkeletonPage({
  children,
  fullWidth,
  narrowWidth,
  primaryAction,
  secondaryActions,
  title = '',
  breadcrumbs,
}: SkeletonPageProps) {
  const i18n = useI18n();

  const className = classNames(
    styles.Page,
    fullWidth && styles.fullWidth,
    narrowWidth && styles.narrowWidth,
  );

  const titleContent = title ? (
    <h1 className={styles.Title}>{title}</h1>
  ) : (
    <div className={styles.SkeletonTitle} />
  );

  const titleMarkup = <div className={styles.TitleWrapper}>{titleContent}</div>;

  const primaryActionMarkup = primaryAction ? (
    <div className={styles.PrimaryAction}>
      <SkeletonDisplayText size="large" />
    </div>
  ) : null;

  const secondaryActionsMarkup = useMemo(
    () => (secondaryActions ? renderSecondaryActions(secondaryActions) : null),
    [secondaryActions],
  );

  const breadcrumbMarkup = breadcrumbs ? (
    <div className={styles.BreadcrumbAction} style={{width: 60}}>
      <SkeletonBodyText lines={1} />
    </div>
  ) : null;

  return (
    <div
      className={className}
      role="status"
      aria-label={i18n.translate('Polaris.SkeletonPage.loadingLabel')}
    >
      <div className={styles.Header}>
        {breadcrumbMarkup}
        <div className={styles.TitleAndPrimaryAction}>
          {titleMarkup}
          {primaryActionMarkup}
        </div>
        {secondaryActionsMarkup}
      </div>
      <div className={styles.Content}>{children}</div>
    </div>
  );
}

function renderSecondaryActions(actionCount: number) {
  const actions = [];
  for (let i = 0; i < actionCount; i++) {
    const width = Math.round(Math.random() * 40 + 60);
    actions.push(
      <div className={styles.Action} style={{width}} key={i}>
        <SkeletonBodyText lines={1} />
      </div>,
    );
  }
  return <div className={styles.Actions}>{actions}</div>;
}
