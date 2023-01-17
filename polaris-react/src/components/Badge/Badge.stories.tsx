import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Badge} from '@shopify/polaris';

export default {
  component: Badge,
} as ComponentMeta<typeof Badge>;

export function Default() {
  return <Badge>Fulfilled</Badge>;
}

export function Small() {
  return <Badge size="small">Fulfilled</Badge>;
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
