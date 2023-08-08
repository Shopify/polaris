import React from 'react';
import {ArrowLeftMinor} from '@shopify/polaris-icons';

import {Icon} from '../Icon';
import {UnstyledLink} from '../UnstyledLink';
import type {CallbackAction, LinkAction} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import {Text} from '../Text';
import {Button} from '../Button';
import {useFeatures} from '../../utilities/features';

import styles from './Breadcrumbs.scss';

export interface BreadcrumbsProps {
  /** Back action link */
  backAction: CallbackAction | LinkAction;
}

export function Breadcrumbs({backAction}: BreadcrumbsProps) {
  const {content} = backAction;
  const {polarisSummerEditions2023} = useFeatures();

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

  const summerEditionsBreadcrumbMarkup = (
    <Button
      key={content}
      url={'url' in backAction ? backAction.url : undefined}
      onClick={'onAction' in backAction ? backAction.onAction : undefined}
      onPointerDown={handleMouseUpByBlurring}
      icon={ArrowLeftMinor}
      accessibilityLabel={backAction.accessibilityLabel ?? content}
    />
  );

  return (
    <nav role="navigation">
      {polarisSummerEditions2023
        ? summerEditionsBreadcrumbMarkup
        : breadcrumbMarkup}
    </nav>
  );
}
