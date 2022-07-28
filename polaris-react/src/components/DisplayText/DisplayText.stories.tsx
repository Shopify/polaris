import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {DisplayText} from '@shopify/polaris';

export default {
  component: DisplayText,
} as ComponentMeta<typeof DisplayText>;

export function ExtraLarge() {
  return <DisplayText size="extraLarge">Good evening, Dominic.</DisplayText>;
}

export function Large() {
  return <DisplayText size="large">Good evening, Dominic.</DisplayText>;
}

export function Medium() {
  return <DisplayText size="medium">Good evening, Dominic.</DisplayText>;
}

export function Small() {
  return <DisplayText size="small">Good evening, Dominic.</DisplayText>;
}
