import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {List} from '@shopify/polaris';

export default {
  component: List,
} as ComponentMeta<typeof List>;

export function Bulleted() {
  return (
    <List type="bullet">
      <List.Item>Yellow shirt</List.Item>
      <List.Item>Red shirt</List.Item>
      <List.Item>Green shirt</List.Item>
    </List>
  );
}

export function Numbered() {
  return (
    <List type="number">
      <List.Item>First item</List.Item>
      <List.Item>Second item</List.Item>
      <List.Item>Third Item</List.Item>
    </List>
  );
}

export function ExtraTight() {
  return (
    <List spacing="extraTight">
      <List.Item>Yellow shirt</List.Item>
      <List.Item>Red shirt</List.Item>
      <List.Item>Green shirt</List.Item>
    </List>
  );
}
