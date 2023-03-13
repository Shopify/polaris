import React from 'react';

import {useI18n} from '../../utilities/i18n';
import {Box} from '../Box';
import {Page} from '../Page';

export interface SkeletonPageProps {
  /** Page title, in large type */
  title?: string;
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
  /** Decreases the maximum layout width. Intended for single-column layouts */
  narrowWidth?: boolean;
  /** Shows a skeleton over the primary action */
  primaryAction?: boolean;
  /** @deprecated Use backAction instead */
  breadcrumbs?: boolean;
  /** Shows a skeleton over the backAction */
  backAction?: boolean;
  /** The child elements to render in the skeleton page. */
  children?: React.ReactNode;
}

export function SkeletonPage({
  children,
  fullWidth,
  narrowWidth,
  primaryAction,
  title = '',
  backAction,
  breadcrumbs,
}: SkeletonPageProps) {
  const i18n = useI18n();

  const primaryActionMarkup = primaryAction ? (
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
      aria-label={i18n.translate('Polaris.SkeletonPage.loadingLabel')}
      title={title || 'placeholder'}
      narrowWidth={narrowWidth}
      fullWidth={fullWidth}
      primaryAction={primaryActionMarkup}
      backAction={backAction ? 'placeholder' : undefined}
      breadcrumbs={breadcrumbs ? 'placeholder' : undefined}
    >
      {children}
    </Page>
  );
}
