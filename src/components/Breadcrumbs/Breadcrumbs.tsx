import React from 'react';
import {ChevronLeftMinor} from '@shopify/polaris-icons';

import {Icon} from '../Icon';
import {UnstyledLink} from '../UnstyledLink';
import {CallbackAction, LinkAction} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';

import styles from './Breadcrumbs.scss';

export interface BreadcrumbsProps {
  /** Collection of breadcrumbs */
  breadcrumbs: (CallbackAction | LinkAction)[];
}

export class Breadcrumbs extends React.PureComponent<BreadcrumbsProps, never> {
  render() {
    const {breadcrumbs} = this.props;
    const breadcrumb = breadcrumbs[breadcrumbs.length - 1];
    if (breadcrumb == null) {
      return null;
    }

    const {content} = breadcrumb;

    const contentMarkup = (
      <span className={styles.ContentWrapper}>
        <span className={styles.Icon}>
          <Icon source={ChevronLeftMinor} />
        </span>
        <span className={styles.Content}>{content}</span>
      </span>
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
}
