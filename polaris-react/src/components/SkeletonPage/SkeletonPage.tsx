import React from 'react';

import {useI18n} from '../../utilities/i18n';
import {Box} from '../Box';
import {Page} from '../Page';
import type {PageProps} from '../Page';

export interface SkeletonPageProps {
  /** Page title, in large type */
  title?: string;
  /** Page subtitle, in regular type*/
  subtitle?: string | boolean;
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
  /** Decreases the maximum layout width. Intended for single-column layouts */
  narrowWidth?: boolean;
  /** Shows static conent or skeleton over the primary action */
  primaryAction?: PageProps['primaryAction'] | true;
  /** @deprecated Use backAction instead */
  breadcrumbs?: boolean;
  /** Shows a skeleton over the backAction */
  backAction?: PageProps['backAction'] | true;
  /** Shows a skeleton over the pagination */
  pagination?: PageProps['pagination'] | true;
  /** The child elements to render in the skeleton page. */
  children?: React.ReactNode;
}

export function SkeletonPage({
  children,
  fullWidth,
  narrowWidth,
  primaryAction,
  title = '',
  subtitle,
  backAction,
  pagination,
  breadcrumbs,
}: SkeletonPageProps) {
  const i18n = useI18n();

  const primaryActionMarkup =
    typeof primaryAction === 'boolean' ? (
      <Box
        id="SkeletonPage-PrimaryAction"
        borderRadius="1"
        background="bg-strong"
        minHeight="2.25rem"
        minWidth="6.25rem"
      />
    ) : null;

  return (
    <Page
      role="status"
      title={title || 'loading'}
      subtitle={typeof subtitle === 'boolean' ? 'loading' : subtitle}
      narrowWidth={narrowWidth}
      fullWidth={fullWidth}
      primaryAction={primaryActionMarkup || primaryAction}
      backAction={
        backAction === true || breadcrumbs === true ? 'loading' : backAction
      }
      aria-label={i18n.translate('Polaris.SkeletonPage.loadingLabel')}
      pagination={pagination === true ? {loading: true} : pagination}
    >
      {children}
    </Page>
  );
}
