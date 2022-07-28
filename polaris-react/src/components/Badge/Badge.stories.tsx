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
  return <Badge status="info">Published</Badge>;
}

export function Success() {
  return <Badge status="success">Funds recovered</Badge>;
}

export function Attention() {
  return <Badge status="attention">Inactive</Badge>;
}

export function Warning() {
  return <Badge status="warning">Expired</Badge>;
}

export function Critical() {
  return <Badge status="critical">Action required</Badge>;
}

export function Incomplete() {
  return (
    <Badge progress="incomplete" status="warning">
      Unfulfilled
    </Badge>
  );
}

export function PartiallyComplete() {
  return (
    <Badge progress="partiallyComplete" status="attention">
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
