import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import type {BadgeProps} from '@shopify/polaris';
import {
  Badge,
  HorizontalStack,
  LegacyCard,
  VerticalStack,
  Text,
  Box,
} from '@shopify/polaris';

export default {
  component: Badge,
} as ComponentMeta<typeof Badge>;

export function Default() {
  return <Badge>Fulfilled</Badge>;
}

export function Informational() {
  return <Badge status="info">Draft</Badge>;
}

export function Success() {
  return <Badge status="success">Active</Badge>;
}

export function Attention() {
  return <Badge status="attention">Open</Badge>;
}

export function Warning() {
  return <Badge status="warning">On hold</Badge>;
}

export function Critical() {
  return <Badge status="critical">Action required</Badge>;
}

export function New() {
  return <Badge status="new">Fulfilled</Badge>;
}

export function Incomplete() {
  return (
    <Badge progress="incomplete" status="attention">
      Unfulfilled
    </Badge>
  );
}

export function PartiallyComplete() {
  return (
    <Badge progress="partiallyComplete" status="warning">
      Partially fulfilled
    </Badge>
  );
}

export function Complete() {
  return <Badge progress="complete">Fulfilled</Badge>;
}

export function WithStatusAndProgressLabelOverride() {
  return (
    <Badge
      status="success"
      progress="complete"
      statusAndProgressLabelOverride="Status: Published. Your online store is visible."
    >
      Published
    </Badge>
  );
}

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

type Entry<T> = [keyof T, T[keyof T]];
type Entries<T> = Entry<T>[];

const statuses: {
  [S in 'default' | NonNullable<BadgeProps['status']>]: string;
} = {
  default: 'Neutral',
  info: 'Info',
  success: 'Success',
  warning: 'Warning',
  attention: 'Attention',
  critical: 'Critical',
  new: 'New',
  'read-only-experimental': 'Read-only',
  'enabled-experimental': 'Enabled',
  'info-strong-experimental': 'Info',
  'success-strong-experimental': 'Success',
  'warning-strong-experimental': 'Warning',
  'attention-strong-experimental': 'Attention',
  'critical-strong-experimental': 'Critical',
};

const statusEntries = Object.entries(statuses) as Entries<typeof statuses>;

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
  'large-experimental': 'Large',
};

const sizeEntries = Object.entries(sizes) as Entries<typeof sizes>;

export function All() {
  return (
    <LegacyCard sectioned>
      {sizeEntries.map(([size, sizeLabel]) => (
        <Box key={size} paddingBlockEnd="2">
          <VerticalStack gap="3">
            <Text as="h2" variant="headingXl">
              Size: {sizeLabel}
            </Text>
            <VerticalStack gap="2">
              <Text as="h2" variant="headingXs">
                Status only
              </Text>
              <HorizontalStack gap="2">
                {statusEntries.map(([status, statusLabel]) => (
                  <Badge
                    key={status}
                    size={size}
                    status={status === 'default' ? undefined : status}
                  >
                    {statusLabel}
                  </Badge>
                ))}
              </HorizontalStack>
            </VerticalStack>
            <VerticalStack gap="2">
              <Text as="h2" variant="headingXs">
                Status with progress
              </Text>
              {progressEntries.map(([progress]) => (
                <HorizontalStack key={progress} gap="2">
                  {statusEntries.map(([status, statusLabel]) => (
                    <Badge
                      key={status}
                      size={size}
                      progress={progress}
                      status={status === 'default' ? undefined : status}
                    >
                      {statusLabel}
                    </Badge>
                  ))}
                </HorizontalStack>
              ))}
            </VerticalStack>
            <VerticalStack gap="2">
              <Text as="h2" variant="headingXs">
                Status with icon
              </Text>
              <HorizontalStack gap="2">
                {statusEntries.map(([status, statusLabel]) => (
                  <Badge
                    key={status}
                    size={size}
                    icon={TempIcon}
                    status={status === 'default' ? undefined : status}
                  >
                    {statusLabel}
                  </Badge>
                ))}
              </HorizontalStack>
            </VerticalStack>
            <VerticalStack gap="2">
              <Text as="h2" variant="headingXs">
                Status with icon only
              </Text>
              <HorizontalStack gap="2">
                {statusEntries.map(([status]) => (
                  <Badge
                    key={status}
                    size={size}
                    icon={TempIcon}
                    status={status === 'default' ? undefined : status}
                  />
                ))}
              </HorizontalStack>
            </VerticalStack>
          </VerticalStack>
        </Box>
      ))}
    </LegacyCard>
  );
}
