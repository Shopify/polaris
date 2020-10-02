import React, {PureComponent} from 'react';
import {ChevronLeftMinor, ArrowLeftMinor} from '@shopify/polaris-icons';

import {Icon} from '../Icon';
import {UnstyledLink} from '../UnstyledLink';
import type {CallbackAction, LinkAction} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import {FeaturesContext} from '../../utilities/features';
import {classNames} from '../../utilities/css';
import {VisuallyHidden} from '../VisuallyHidden';

import styles from './Breadcrumbs.scss';

export interface BreadcrumbsProps {
  /** Collection of breadcrumbs */
  breadcrumbs: (CallbackAction | LinkAction)[];
}

export class Breadcrumbs extends PureComponent<BreadcrumbsProps, never> {
  static contextType = FeaturesContext;
  context!: React.ContextType<typeof FeaturesContext>;

  render() {
    const {newDesignLanguage} = this.context || {};
    const {breadcrumbs} = this.props;
    const breadcrumb = breadcrumbs[breadcrumbs.length - 1];
    if (breadcrumb == null) {
      return null;
    }

    const {content} = breadcrumb;

    const contentMarkup = (
      <span className={styles.ContentWrapper}>
        <span className={styles.Icon}>
          <Icon
            source={newDesignLanguage ? ArrowLeftMinor : ChevronLeftMinor}
          />
        </span>
        {newDesignLanguage ? (
          <VisuallyHidden>{content}</VisuallyHidden>
        ) : (
          <span className={styles.Content}>{content}</span>
        )}
      </span>
    );

    const breadcrumbClassNames = classNames(
      styles.Breadcrumb,
      newDesignLanguage && styles.newDesignLanguage,
    );

    const breadcrumbMarkup =
      'url' in breadcrumb ? (
        <UnstyledLink
          key={content}
          url={breadcrumb.url}
          className={breadcrumbClassNames}
          onMouseUp={handleMouseUpByBlurring}
          aria-label={breadcrumb.accessibilityLabel}
        >
          {contentMarkup}
        </UnstyledLink>
      ) : (
        <button
          key={content}
          className={breadcrumbClassNames}
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
