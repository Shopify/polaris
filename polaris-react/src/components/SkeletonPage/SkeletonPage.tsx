import React from 'react';

import {useI18n} from '../../utilities/i18n';
import {SkeletonDisplayText} from '../SkeletonDisplayText';
import {SkeletonBodyText} from '../SkeletonBodyText';
import {Box} from '../Box';
import {Inline} from '../Inline';
import {AlphaStack} from '../AlphaStack';

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
  title = '',
  breadcrumbs,
}: SkeletonPageProps) {
  const i18n = useI18n();

  const titleContent = title ? (
    <h1 className={styles.Title}>{title}</h1>
  ) : (
    <div className={styles.SkeletonTitle}>
      <Box
        background="surface-neutral"
        minWidth="120px"
        minHeight="28px"
        borderRadius="base"
      />
    </div>
  );

  const primaryActionMarkup = primaryAction ? (
    <div className={styles.PrimaryAction}>
      <SkeletonDisplayText size="large" />
    </div>
  ) : null;

  const breadcrumbMarkup = breadcrumbs ? (
    <Box maxWidth="60px" paddingBlockStart="4" paddingBlockEnd="4">
      <SkeletonBodyText lines={1} />
    </Box>
  ) : null;

  return (
    <AlphaStack align="center" fullWidth>
      <Box
        padding="0"
        paddingInlineStart={{sm: '6'}}
        paddingInlineEnd={{sm: '6'}}
        maxWidth="var(--pc-skeleton-page-max-width)"
        aria-label={i18n.translate('Polaris.SkeletonPage.loadingLabel')}
        role="status"
        {...(narrowWidth && {
          maxWidth: 'var(--pc-skeleton-page-max-width-narrow)',
        })}
        {...(fullWidth && {
          maxWidth: 'none',
        })}
      >
        <AlphaStack gap="0" fullWidth>
          <Box
            padding={{xs: '4', md: '5'}}
            paddingBlockEnd={{xs: '2', md: '5'}}
            paddingInlineStart={{sm: '0'}}
            paddingInlineEnd={{sm: '0'}}
          >
            {breadcrumbMarkup}
            <Inline align="space-between" blockAlign="start">
              {titleContent}
              {primaryActionMarkup}
            </Inline>
          </Box>
          <Box
            paddingBlockStart={{xs: '2', md: '5'}}
            paddingBlockEnd="2"
            paddingInlineStart="0"
            paddingInlineEnd="0"
          >
            {children}
          </Box>
        </AlphaStack>
      </Box>
    </AlphaStack>
  );
}
