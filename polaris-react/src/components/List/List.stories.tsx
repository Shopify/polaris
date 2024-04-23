import React from 'react';
import type {Meta} from '@storybook/react';
import {List} from '@shopify/polaris';

export default {
  component: List,
} as Meta<typeof List>;

export const Bulleted = {
  render() {
    return (
      <List type="bullet">
        <List.Item>Yellow shirt</List.Item>
        <List.Item>Red shirt</List.Item>
        <List.Item>Green shirt</List.Item>
      </List>
    );
  },
};

export const Numbered = {
  render() {
    return (
      <List type="number">
        <List.Item>First item</List.Item>
        <List.Item>Second item</List.Item>
        <List.Item>Third Item</List.Item>
      </List>
    );
  },
};

export const ExtraTight = {
  render() {
    return (
      <List gap="extraTight">
        <List.Item>Yellow shirt</List.Item>
        <List.Item>Red shirt</List.Item>
        <List.Item>Green shirt</List.Item>
      </List>
    );
  },
};
