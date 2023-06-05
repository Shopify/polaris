import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Badge,
  HorizontalStack,
  LegacyCard,
  VerticalStack,
  Text,
} from '@shopify/polaris';
import {ClockMajor} from '@shopify/polaris-icons';

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

export function All() {
  return (
    <LegacyCard sectioned>
      <VerticalStack gap="5">
        <VerticalStack gap="2">
          <Text as="h2" variant="headingXs">
            Default by status
          </Text>
          <HorizontalStack gap="4">
            <Badge>Fulfilled</Badge>
            <Badge status="info">Informational</Badge>
            <Badge status="success">Success</Badge>
            <Badge status="warning">Warning</Badge>
            <Badge status="attention">Attention</Badge>
            <Badge status="critical">Critical</Badge>
            <Badge status="new">New</Badge>
          </HorizontalStack>
        </VerticalStack>
        <VerticalStack gap="2">
          <Text as="h2" variant="headingXs">
            Complete
          </Text>
          <HorizontalStack gap="4">
            <Badge progress="complete">Fulfilled</Badge>
            <Badge progress="complete" status="info">
              Informational
            </Badge>
            <Badge progress="complete" status="success">
              Success
            </Badge>
            <Badge progress="complete" status="warning">
              Warning
            </Badge>
            <Badge progress="complete" status="attention">
              Attention
            </Badge>
            <Badge progress="complete" status="critical">
              Critical
            </Badge>
            <Badge progress="complete" status="new">
              New
            </Badge>
          </HorizontalStack>
        </VerticalStack>
        <VerticalStack gap="2">
          <Text as="h2" variant="headingXs">
            Partially complete
          </Text>
          <HorizontalStack gap="4">
            <Badge progress="partiallyComplete">Fulfilled</Badge>
            <Badge progress="partiallyComplete" status="info">
              Informational
            </Badge>
            <Badge progress="partiallyComplete" status="success">
              Success
            </Badge>
            <Badge progress="partiallyComplete" status="warning">
              Warning
            </Badge>
            <Badge progress="partiallyComplete" status="attention">
              Attention
            </Badge>
            <Badge progress="partiallyComplete" status="critical">
              Critical
            </Badge>
            <Badge progress="partiallyComplete" status="new">
              New
            </Badge>
          </HorizontalStack>
        </VerticalStack>
        <VerticalStack gap="2">
          <Text as="h2" variant="headingXs">
            Incomplete
          </Text>
          <HorizontalStack gap="4">
            <Badge progress="incomplete">Fulfilled</Badge>
            <Badge progress="incomplete" status="info">
              Informational
            </Badge>
            <Badge progress="incomplete" status="success">
              Success
            </Badge>
            <Badge progress="incomplete" status="warning">
              Warning
            </Badge>
            <Badge progress="incomplete" status="attention">
              Attention
            </Badge>
            <Badge progress="incomplete" status="critical">
              Critical
            </Badge>
            <Badge progress="incomplete" status="new">
              New
            </Badge>
          </HorizontalStack>
        </VerticalStack>
        <VerticalStack gap="2">
          <Text as="h2" variant="headingXs">
            Custom icon
          </Text>
          <HorizontalStack gap="4">
            <Badge icon={ClockMajor}>Fulfilled</Badge>
            <Badge icon={ClockMajor} status="info">
              Informational
            </Badge>
            <Badge icon={ClockMajor} status="success">
              Success
            </Badge>
            <Badge icon={ClockMajor} status="warning">
              Warning
            </Badge>
            <Badge icon={ClockMajor} status="attention">
              Attention
            </Badge>
            <Badge icon={ClockMajor} status="critical">
              Critical
            </Badge>
            <Badge icon={ClockMajor} status="new">
              New
            </Badge>
          </HorizontalStack>
        </VerticalStack>
      </VerticalStack>
    </LegacyCard>
  );
}
