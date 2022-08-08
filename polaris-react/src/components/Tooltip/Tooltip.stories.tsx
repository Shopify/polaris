import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Button,
  ButtonGroup,
  TextField,
  TextStyle,
  Tooltip,
} from '@shopify/polaris';

export default {
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

export function Default() {
  return (
    <div style={{padding: '75px 0'}}>
      <Tooltip active content="This order has shipping labels.">
        <TextStyle variation="strong">Order #1001</TextStyle>
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
