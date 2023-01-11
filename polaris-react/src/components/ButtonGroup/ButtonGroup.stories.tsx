import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Button, ButtonGroup} from '@shopify/polaris';

export default {
  component: ButtonGroup,
} as ComponentMeta<typeof ButtonGroup>;

export function Default() {
  return (
    <ButtonGroup>
      <Button>Cancel</Button>
      <Button primary>Save</Button>
    </ButtonGroup>
  );
}

export function WithSegmentedButtons() {
  return (
    <ButtonGroup segmented>
      <Button>Bold</Button>
      <Button>Italic</Button>
      <Button>Underline</Button>
    </ButtonGroup>
  );
}

export function OutlineWithSegmentedButtons() {
  return (
    <ButtonGroup segmented>
      <Button outline>Bold</Button>
      <Button outline>Italic</Button>
      <Button outline>Underline</Button>
    </ButtonGroup>
  );
}

export function NoWrapButtons() {
  return (
    <ButtonGroup noWrap>
      <Button>Bold</Button>
      <Button>Italic</Button>
      <Button>Underline</Button>
      <Button primary>Primary</Button>
    </ButtonGroup>
  );
}
