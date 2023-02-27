import {Tooltip, ButtonGroup, Button} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TooltipExample() {
  return (
    <div style={{padding: '75px 0'}}>
      <ButtonGroup segmented fullWidth>
        <Tooltip content="Bold" suffix="⌘B">
          <Button>B</Button>
        </Tooltip>
        <Tooltip content="Italic" suffix="⌘I">
          <Button>I</Button>
        </Tooltip>
        <Tooltip content="Underline" suffix="⌘U">
          <Button>U</Button>
        </Tooltip>
        <Tooltip content="Strikethrough" suffix="⌘S">
          <Button>S</Button>
        </Tooltip>
        <Tooltip content="Bold" preferredPosition="above" suffix="⌘B">
          <Button>B</Button>
        </Tooltip>
        <Tooltip content="Italic" preferredPosition="above" suffix="⌘U">
          <Button>I</Button>
        </Tooltip>
        <Tooltip content="Underline" preferredPosition="above" suffix="⌘U">
          <Button>U</Button>
        </Tooltip>
        <Tooltip content="Strikethrough" preferredPosition="above" suffix="⌘S">
          <Button>S</Button>
        </Tooltip>
      </ButtonGroup>
    </div>
  );
}

export default withPolarisExample(TooltipExample);
