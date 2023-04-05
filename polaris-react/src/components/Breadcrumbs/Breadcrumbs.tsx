import React from 'react';
import {ArrowLeftMinor} from '@shopify/polaris-icons';

import {Icon} from '../Icon';
import {UnstyledLink} from '../UnstyledLink';
import type {CallbackAction, LinkAction} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import {Text} from '../Text';

import styles from './Breadcrumbs.module.scss';

export interface BreadcrumbsProps {
  /** @deprecated Collection of breadcrumbs */
  breadcrumbs?: (CallbackAction | LinkAction) | (CallbackAction | LinkAction)[];
  /** Back action link */
  backAction?: CallbackAction | LinkAction;
}

export function Breadcrumbs({breadcrumbs, backAction}: BreadcrumbsProps) {
  const breadcrumb =
    backAction ??
    (Array.isArray(breadcrumbs)
      ? breadcrumbs[breadcrumbs.length - 1]
      : breadcrumbs);
  if (breadcrumb == null) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(
        'Please provide a value to backAction, it will become required in the next major release.',
      );
    }
    return null;
  }

  const {content} = breadcrumb;

  const contentMarkup = (
    <>
      <span className={styles.Icon}>
        <Icon source={ArrowLeftMinor} />
      </span>
      <Text as="span" visuallyHidden>
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
