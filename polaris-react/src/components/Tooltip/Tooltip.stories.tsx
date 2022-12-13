import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Button, ButtonGroup, TextField, Text, Tooltip} from '@shopify/polaris';

export default {
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

export function Default() {
  return (
    <div style={{padding: '75px 0'}}>
      <Tooltip active content="This order has shipping labels.">
        <Text variant="bodyMd" fontWeight="bold" as="span">
          Order #1001
        </Text>
      </Tooltip>
    </div>
  );
}

export function VisibleOnlyWithChildInteraction() {
  return (
    <div style={{width: '200px'}}>
      <ButtonGroup segmented fullWidth>
        <Tooltip content="Bold" dismissOnMouseOut>
          <Button>B</Button>
        </Tooltip>
        <Tooltip content="Italic" dismissOnMouseOut>
          <Button>I</Button>
        </Tooltip>
        <Tooltip content="Underline" dismissOnMouseOut>
          <Button>U</Button>
        </Tooltip>
        <Tooltip content="Strikethrough" dismissOnMouseOut>
          <Button>S</Button>
        </Tooltip>
      </ButtonGroup>
      <TextField
        label="Product title"
        autoComplete="off"
        labelHidden
        multiline
      />
    </div>
  );
}

export function WithHoverDelay() {
  return (
    <div style={{padding: '75px 0'}}>
      <div style={{margin: '10px 0'}}>
        <Tooltip content="This should appear right away.">
          <Text variant="bodyMd" fontWeight="bold" as="span">
            No delay
          </Text>
        </Tooltip>
      </div>
      <div style={{margin: '10px 0'}}>
        <Tooltip hoverDelay={1000} content="This should appear after 1 second.">
          <Text variant="bodyMd" fontWeight="bold" as="span">
            1 second hover delay
          </Text>
        </Tooltip>
      </div>
      <div style={{margin: '10px 0'}}>
        <Tooltip content="This should appear right away.">
          <Button>No delay</Button>
        </Tooltip>
      </div>
      <div style={{margin: '10px 0'}}>
        <Tooltip
          hoverDelay={2000}
          content="This should appear after 2 seconds."
        >
          <Button>2 seconds hover delay</Button>
        </Tooltip>
      </div>
    </div>
  );
}
