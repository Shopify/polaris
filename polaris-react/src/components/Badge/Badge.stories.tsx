import React from 'react';
import type {Meta} from '@storybook/react';
import type {BadgeProps} from '@shopify/polaris';
import {
  Badge,
  InlineStack,
  LegacyCard,
  BlockStack,
  Text,
  Box,
} from '@shopify/polaris';

import type {Entries} from '../../types';

export default {
  component: Badge,
} as Meta<typeof Badge>;

export const Default = {
  render() {
    return <Badge>Fulfilled</Badge>;
  },
};

export const Informational = {
  render() {
    return <Badge tone="info">Draft</Badge>;
  },
};

export const Success = {
  render() {
    return <Badge tone="success">Active</Badge>;
  },
};

export const Attention = {
  render() {
    return <Badge tone="attention">Open</Badge>;
  },
};

export const Warning = {
  render() {
    return <Badge tone="warning">On hold</Badge>;
  },
};

export const Critical = {
  render() {
    return <Badge tone="critical">Action required</Badge>;
  },
};

export const New = {
  render() {
    return <Badge tone="new">Fulfilled</Badge>;
  },
};

export const Magic = {
  render() {
    return <Badge tone="magic">Magic</Badge>;
  },
};

export const Incomplete = {
  render() {
    return (
      <Badge progress="incomplete" tone="attention">
        Unfulfilled
      </Badge>
    );
  },
};

export const PartiallyComplete = {
  render() {
    return (
      <Badge progress="partiallyComplete" tone="warning">
        Partially fulfilled
      </Badge>
    );
  },
};

export const Complete = {
  render() {
    return <Badge progress="complete">Fulfilled</Badge>;
  },
};

export const WithToneAndProgressLabelOverride = {
  render() {
    return (
      <Badge
        tone="success"
        progress="complete"
        toneAndProgressLabelOverride="Tone: Published. Your online store is visible."
      >
        Published
      </Badge>
    );
  },
};

const TempIcon = () => (
  <svg viewBox="0 0 20 20">
    <path d="M11 13.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <path d="M10.75 6.25a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0v-4Z" />
    <path
      fill-rule="evenodd"
      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-1.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"
    />
  </svg>
);

const tones: {
  [S in 'default' | NonNullable<BadgeProps['tone']>]: string;
} = {
  default: 'Neutral',
  info: 'Info',
  success: 'Success',
  warning: 'Warning',
  attention: 'Attention',
  critical: 'Critical',
  new: 'New',
  magic: 'Magic',
  'read-only': 'Read-only',
  enabled: 'Enabled',
  'info-strong': 'Info',
  'success-strong': 'Success',
  'warning-strong': 'Warning',
  'attention-strong': 'Attention',
  'critical-strong': 'Critical',
};

const toneEntries = Object.entries(tones) as Entries<typeof tones>;

const progresses: {
  [P in NonNullable<BadgeProps['progress']>]: string;
} = {
  complete: 'Complete',
  partiallyComplete: 'Partially complete',
  incomplete: 'Incomplete',
};

const progressEntries = Object.entries(progresses) as Entries<
  typeof progresses
>;

const sizes: {
  [P in Exclude<NonNullable<BadgeProps['size']>, 'small'>]: string;
} = {
  medium: 'Medium',
  large: 'Large',
};

const sizeEntries = Object.entries(sizes) as Entries<typeof sizes>;

export const All = {
  render() {
    return (
      <LegacyCard sectioned>
        {sizeEntries.map(([size, sizeLabel]) => (
          <Box key={size} paddingBlockEnd="200">
            <BlockStack gap="300">
              <Text as="h2" variant="headingXl">
                Size: {sizeLabel}
              </Text>
              <BlockStack gap="200">
                <Text as="h2" variant="headingSm">
                  Tone only
                </Text>
                <InlineStack gap="200">
                  {toneEntries.map(([tone, toneLabel]) => (
                    <Badge
                      key={tone}
                      size={size}
                      tone={tone === 'default' ? undefined : tone}
                    >
                      {toneLabel}
                    </Badge>
                  ))}
                </InlineStack>
              </BlockStack>
              <BlockStack gap="200">
                <Text as="h2" variant="headingSm">
                  Tone with progress
                </Text>
                {progressEntries.map(([progress]) => (
                  <InlineStack key={progress} gap="200">
                    {toneEntries.map(([tone, toneLabel]) => (
                      <Badge
                        key={tone}
                        size={size}
                        progress={progress}
                        tone={tone === 'default' ? undefined : tone}
                      >
                        {toneLabel}
                      </Badge>
                    ))}
                  </InlineStack>
                ))}
              </BlockStack>
              {/* Remove `size` condition when micro icons are available */}
              {size === 'large' && (
                <BlockStack gap="200">
                  <Text as="h2" variant="headingSm">
                    Tone with icon
                  </Text>
                  <InlineStack gap="200">
                    {toneEntries.map(([tone, toneLabel]) => (
                      <Badge
                        key={tone}
                        size={size}
                        icon={TempIcon}
                        tone={tone === 'default' ? undefined : tone}
                      >
                        {toneLabel}
                      </Badge>
                    ))}
                  </InlineStack>
                </BlockStack>
              )}
              {/* TODO: Re-enable the following examples when designs are available (see https://github.com/Shopify/polaris-internal/issues/1411) */}
              {/* <BlockStack gap="200">
                <Text as="h2" variant="headingSm">
                  Tone with icon only
                </Text>
                <InlineStack gap="200">
                  {toneEntries.map(([tone]) => (
                    <Badge
                      key={tone}
                      size={size}
                      icon={TempIcon}
                      tone={tone === 'default' ? undefined : tone}
                    />
                  ))}
                </InlineStack>
              </BlockStack> */}
            </BlockStack>
          </Box>
        ))}
      </LegacyCard>
    );
  },
};
