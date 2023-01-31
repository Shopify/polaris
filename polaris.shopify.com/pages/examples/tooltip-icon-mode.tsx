import {Tooltip, ButtonGroup, Button} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TooltipExample() {
  return (
    <div style={{padding: '75px 0'}}>
      <ButtonGroup segmented fullWidth>
        <Tooltip
          content="Bold"
          mode="icon"
          keyboardShortcut="⌘B"
          activatorWrapper="div"
        >
          <Button>B</Button>
        </Tooltip>
        <Tooltip content="Italic" mode="icon" keyboardShortcut="⌘I">
          <Button>I</Button>
        </Tooltip>
        <Tooltip content="Underline" mode="icon" keyboardShortcut="⌘U">
          <Button>U</Button>
        </Tooltip>
        <Tooltip content="Strikethrough" mode="icon" keyboardShortcut="⌘S">
          <Button>S</Button>
        </Tooltip>
        <Tooltip
          content="Bold"
          preferredPosition="above"
          mode="icon"
          keyboardShortcut="⌘B"
        >
          <Button>B</Button>
        </Tooltip>
        <Tooltip
          content="Italic"
          preferredPosition="above"
          mode="icon"
          keyboardShortcut="⌘U"
        >
          <Button>I</Button>
        </Tooltip>
        <Tooltip
          content="Underline"
          preferredPosition="above"
          mode="icon"
          keyboardShortcut="⌘U"
        >
          <Button>U</Button>
        </Tooltip>
        <Tooltip
          content="Strikethrough"
          preferredPosition="above"
          mode="icon"
          keyboardShortcut="⌘S"
        >
          <Button>S</Button>
        </Tooltip>
      </ButtonGroup>
    </div>
  );
}

export default withPolarisExample(TooltipExample);
