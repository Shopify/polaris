import React from 'react';

import {useI18n} from '../../utilities/i18n';
import {SkeletonDisplayText} from '../SkeletonDisplayText';
import {SkeletonBodyText} from '../SkeletonBodyText';
import {Box} from '../Box';
import {Inline} from '../Inline';
import {Text} from '../Text';
import {AlphaStack} from '../AlphaStack';
import {Bleed} from '../Bleed';

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
  const titleContent = title ? (
    <Text variant="headingLg" as="h1">
      {title}
    </Text>
  ) : (
    <Box
      background="surface-neutral"
      minWidth="120px"
      minHeight="28px"
      borderRadius="base"
    />
  );

  const primaryActionMarkup = primaryAction ? (
    <Box minWidth="100px" minHeight="36px">
      <SkeletonDisplayText size="large" />
    </Box>
  ) : null;

  const breadcrumbMarkup = breadcrumbs ? (
    <Box maxWidth="60px" paddingBlockStart="4" paddingBlockEnd="4">
      <SkeletonBodyText lines={1} />
    </Box>
  ) : null;

  const narrowWidthProps = narrowWidth
    ? {
        maxWidth: '662px',
      }
    : {};

  const fullWidthProps = fullWidth
    ? {
        maxWidth: 'none',
      }
    : {};

  return (
    <Box
      paddingInlineStart="6"
      paddingInlineEnd="6"
      maxWidth="998px"
      {...narrowWidthProps}
      {...fullWidthProps}
    >
      <AlphaStack fullWidth>
        <Box paddingBlockStart="5" paddingBlockEnd="5">
          {breadcrumbMarkup}
          <Inline align="space-between" blockAlign="start">
            {titleContent}
            {primaryActionMarkup}
          </Inline>
        </Box>
        <Bleed left="0" right="5">
          {children}
        </Bleed>
      </AlphaStack>
    </Box>
  );
}
