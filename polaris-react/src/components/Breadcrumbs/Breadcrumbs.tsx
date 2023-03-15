import {ArrowLeftMinor} from '@shopify/polaris-icons';

import {Icon} from '../Icon';
import {UnstyledLink} from '../UnstyledLink';
import type {CallbackAction, LinkAction} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import {Text} from '../Text';

import styles from './Breadcrumbs.scss';

export interface BreadcrumbsProps {
  /** Back action link */
  backAction: CallbackAction | LinkAction;
}

export function Breadcrumbs({backAction}: BreadcrumbsProps) {
  const {content} = backAction;

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
    'url' in backAction ? (
      <UnstyledLink
        key={content}
        url={backAction.url}
        className={styles.Breadcrumb}
        onMouseUp={handleMouseUpByBlurring}
        aria-label={backAction.accessibilityLabel}
      >
        {contentMarkup}
      </UnstyledLink>
    ) : (
      <button
        key={content}
        className={styles.Breadcrumb}
        onClick={backAction.onAction}
        onMouseUp={handleMouseUpByBlurring}
        type="button"
        aria-label={backAction.accessibilityLabel}
      >
        {contentMarkup}
      </button>
    );

  return <nav role="navigation">{breadcrumbMarkup}</nav>;
}
