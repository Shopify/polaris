import React from 'react';
import type {ComponentMeta} from '@storybook/react';

import {BlockStack} from '../BlockStack';
import {Text} from '../Text';

import {SkeletonAppCard} from './SkeletonAppCard';

export default {
  component: SkeletonAppCard,
} as ComponentMeta<typeof SkeletonAppCard>;

export function Default() {
  return (
    <BlockStack gap="400">
      <BlockStack gap="200">
        <SkeletonAppCard />
      </BlockStack>
    </BlockStack>
  );
}

export function Sizes() {
  return (
    <BlockStack gap="400">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Small
        </Text>
        <div style={{maxWidth: '400px'}}>
          <SkeletonAppCard size="sm" />
        </div>

        <Text as="h2" variant="headingSm">
          Medium
        </Text>
        <div style={{maxWidth: '400px'}}>
          <SkeletonAppCard size="md" />
        </div>

        <Text as="h2" variant="headingSm">
          Large
        </Text>
        <div style={{maxWidth: '400px'}}>
          <SkeletonAppCard size="lg" />
        </div>
      </BlockStack>
    </BlockStack>
  );
}

export function Variants() {
  return (
    <BlockStack gap="400">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Primary
        </Text>
        <div style={{maxWidth: '400px'}}>
          <SkeletonAppCard variant="primary" />
        </div>

        <Text as="h2" variant="headingSm">
          Secondary
        </Text>
        <div style={{maxWidth: '400px'}}>
          <SkeletonAppCard variant="secondary" />
        </div>

        <Text as="h2" variant="headingSm">
          No Background
        </Text>
        <div style={{maxWidth: '400px'}}>
          <SkeletonAppCard variant="noBackground" />
        </div>
      </BlockStack>
    </BlockStack>
  );
}
