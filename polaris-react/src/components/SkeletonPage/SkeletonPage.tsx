import React from 'react';

import {useI18n} from '../../utilities/i18n';
import {Box} from '../Box';
import {BlockStack} from '../BlockStack';
import {InlineStack} from '../InlineStack';
import {Text} from '../Text';

import styles from './SkeletonPage.module.css';

export interface SkeletonPageProps {
  /** Page title, in large type */
  title?: string;
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
  /** Decreases the maximum layout width. Intended for single-column layouts */
  narrowWidth?: boolean;
  /** Shows a skeleton over the primary action */
  primaryAction?: boolean;
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
}: SkeletonPageProps) {
  const i18n = useI18n();

  const titleContent = title ? (
    <Text as="h1" variant="headingLg" fontWeight="bold">
      {title}
    </Text>
  ) : (
    <div className={styles.SkeletonTitle}>
      <Box
        background="bg-fill-tertiary"
        minWidth="120px"
        minHeight="28px"
        borderRadius="100"
      />
    </div>
  );

  const primaryActionMarkup = primaryAction ? (
    <Box
      id="SkeletonPage-PrimaryAction"
      borderRadius="100"
      background="bg-fill-tertiary"
      minHeight="2.25rem"
      minWidth="6.25rem"
    />
  ) : null;

  const backActionMarkup = backAction ? (
    <Box
      borderRadius="100"
      background="bg-fill-tertiary"
      minHeight="2.25rem"
      minWidth="2.25rem"
      maxWidth="2.25rem"
    />
  ) : null;

  return (
    <BlockStack gap="400" inlineAlign="center">
      <Box
        width="100%"
        padding="0"
        paddingInlineStart={{sm: '600'}}
        paddingInlineEnd={{sm: '600'}}
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
        <BlockStack>
          <Box
            paddingBlockStart={{xs: '400', md: '500'}}
            paddingBlockEnd={{xs: '400', md: '500'}}
            paddingInlineStart={{xs: '400', sm: '0'}}
            paddingInlineEnd={{xs: '400', sm: '0'}}
            width="100%"
          >
            <InlineStack gap="400" align="space-between" blockAlign="center">
              <InlineStack gap="400">
                {backActionMarkup}
                <Box paddingBlockStart="100" paddingBlockEnd="100">
                  {titleContent}
                </Box>
              </InlineStack>
              {primaryActionMarkup}
            </InlineStack>
          </Box>
          <Box paddingBlockEnd="200" width="100%">
            {children}
          </Box>
        </BlockStack>
      </Box>
    </BlockStack>
  );
}
