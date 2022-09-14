import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Badge, Heading, Icon, Inline} from '@shopify/polaris';
import {CapitalMajor} from '@shopify/polaris-icons';

export default {
  component: Inline,
} as ComponentMeta<typeof Inline>;

export function Default() {
  return (
    <Inline>
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
      <Icon source={CapitalMajor} color="primary" />
    </Inline>
  );
}

export function AlignYCenter() {
  return (
    <Inline alignY="center" spacing="1">
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
      <Icon source={CapitalMajor} color="primary" />
    </Inline>
  );
}

export function AlignYTop() {
  return (
    <Inline alignY="top">
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
      <Icon source={CapitalMajor} color="primary" />
    </Inline>
  );
}

export function AlignYBottom() {
  return (
    <Inline alignY="bottom">
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
      <Icon source={CapitalMajor} color="primary" />
    </Inline>
  );
}

export function AlignYBaseline() {
  return (
    <Inline alignY="baseline">
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
      <Icon source={CapitalMajor} color="primary" />
    </Inline>
  );
}

export function AlignStart() {
  return (
    <Inline align="start">
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
      <Icon source={CapitalMajor} color="primary" />
    </Inline>
  );
}

export function AlignCenter() {
  return (
    <Inline align="center">
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
      <Icon source={CapitalMajor} color="primary" />
    </Inline>
  );
}

export function AlignEnd() {
  return (
    <Inline align="end">
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
      <Icon source={CapitalMajor} color="primary" />
    </Inline>
  );
}

export function AlignCenterAlignYCenter() {
  return (
    <Inline align="center" alignY="center">
      <Badge>One</Badge>
      <Badge>Two</Badge>
      <Badge>Three</Badge>
      <Icon source={CapitalMajor} color="primary" />
    </Inline>
  );
}

export function NonWrapping() {
  return (
    <Inline wrap={false}>
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </Inline>
  );
}

export function Spacing() {
  return (
    <Inline spacing="8">
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </Inline>
  );
}

export function VerticalCentering() {
  return (
    <Inline alignY="center">
      <Heading>
        Order
        <br />
        #1136
        <br />
        was paid
      </Heading>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </Inline>
  );
}
