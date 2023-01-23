import React from 'react';
import {ArrowLeftMinor} from '@shopify/polaris-icons';

import {Icon} from '../Icon';
import {UnstyledLink} from '../UnstyledLink';
import type {CallbackAction, LinkAction} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import {Text} from '../Text';

import styles from './Breadcrumbs.scss';

export interface BreadcrumbsProps {
  /** @deprecated Collection of breadcrumbs */
  breadcrumbs?: (CallbackAction | LinkAction) | (CallbackAction | LinkAction)[];
  /** Breadcrumb link */
  breadcrumb?: CallbackAction | LinkAction;
}

export function Breadcrumbs({
  breadcrumbs,
  breadcrumb: breadcrumbProp,
}: BreadcrumbsProps) {
  const breadcrumb =
    breadcrumbProp ??
    (Array.isArray(breadcrumbs)
      ? breadcrumbs[breadcrumbs.length - 1]
      : breadcrumbs);
  if (breadcrumb == null) {
    return null;
  }

  const {content} = breadcrumb;

  const contentMarkup = (
    <>
      <span className={styles.Icon}>
        <Icon source={ArrowLeftMinor} />
      </span>
      <Text variant="bodySm" as="span" visuallyHidden color="subdued">
        {content}
      </Text>
    </>
  );

  const breadcrumbMarkup =
    'url' in breadcrumb ? (
      <UnstyledLink
        key={content}
        url={breadcrumb.url}
        className={styles.Breadcrumb}
        onMouseUp={handleMouseUpByBlurring}
        aria-label={breadcrumb.accessibilityLabel}
      >
        {contentMarkup}
      </UnstyledLink>
    ) : (
      <button
        key={content}
        className={styles.Breadcrumb}
        onClick={breadcrumb.onAction}
        onMouseUp={handleMouseUpByBlurring}
        type="button"
        aria-label={breadcrumb.accessibilityLabel}
      >
        {contentMarkup}
      </button>
    );

  return <nav role="navigation">{breadcrumbMarkup}</nav>;
}
