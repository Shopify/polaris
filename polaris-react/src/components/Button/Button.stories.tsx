import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Button, ButtonGroup} from '@shopify/polaris';
import {CalendarMinor} from '@shopify/polaris-icons';

export default {
  component: Button,
} as ComponentMeta<typeof Button>;

export function Default() {
  return <Button>Add product</Button>;
}

export function Outline() {
  return <Button outline>Add product</Button>;
}

export function OutlineMonochrome() {
  return (
    <div style={{color: '#bf0711'}}>
      <Button monochrome outline>
        Retry
      </Button>
    </div>
  );
}

export function Plain() {
  return <Button plain>View shipping settings</Button>;
}

export function PlainMonochrome() {
  return (
    <div>
      Could not retrieve data.{' '}
      <Button plain monochrome>
        Try again
      </Button>
    </div>
  );
}

export function PlainDestructive() {
  return (
    <Button plain destructive>
      Remove
    </Button>
  );
}

export function Primary() {
  return <Button primary>Save theme</Button>;
}

export function Destructive() {
  return <Button destructive>Delete theme</Button>;
}

export function Slim() {
  return <Button size="slim">Save variant</Button>;
}

export function Large() {
  return <Button size="large">Create store</Button>;
}

export function FullWidth() {
  return <Button fullWidth>Add customer</Button>;
}

export function TextAligned() {
  return (
    <Button plain textAlign="left">
      This is a really long string of text that overflows onto the next line we
      need to put in a lot of words now you can see the alignment. It is very
      long but a customer could potentially name something this long.
    </Button>
  );
}

export function Pressed() {
  const [isFirstButtonActive, setIsFirstButtonActive] = useState(true);

  const handleFirstButtonClick = useCallback(() => {
    if (isFirstButtonActive) return;
    setIsFirstButtonActive(true);
  }, [isFirstButtonActive]);

  const handleSecondButtonClick = useCallback(() => {
    if (!isFirstButtonActive) return;
    setIsFirstButtonActive(false);
  }, [isFirstButtonActive]);

  return (
    <ButtonGroup segmented>
      <Button pressed={isFirstButtonActive} onClick={handleFirstButtonClick}>
        First button
      </Button>
      <Button pressed={!isFirstButtonActive} onClick={handleSecondButtonClick}>
        Second button
      </Button>
    </ButtonGroup>
  );
}

export function PlainDisclosure() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Button
      plain
      disclosure={expanded ? 'up' : 'down'}
      onClick={() => {
        setExpanded(!expanded);
      }}
    >
      {expanded ? 'Show less' : 'Show more'}
    </Button>
  );
}

export function RightAlignedDisclosure() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{width: '200px'}}>
      <Button
        fullWidth
        textAlign="left"
        disclosure={expanded ? 'up' : 'down'}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show less' : 'Show more'}
      </Button>
    </div>
  );
}

export function SelectDisclosure() {
  return (
    <div style={{height: '100px'}}>
      <Button disclosure="select" onClick={() => console.log('Open Popover')}>
        Select options
      </Button>
    </div>
  );
}

export function WithIcon() {
  return <Button icon={CalendarMinor}>Choose date range</Button>;
}

export function WithIconAndDisclosure() {
  return (
    <Button icon={CalendarMinor} disclosure>
      Choose date range
    </Button>
  );
}

export function Split() {
  return (
    <div style={{height: '100px'}}>
      <Button
        primary
        connectedDisclosure={{
          accessibilityLabel: 'Other save actions',
          actions: [{content: 'Save as draft'}],
        }}
      >
        Save
      </Button>
    </div>
  );
}

export function DisabledState() {
  return (
    <ButtonGroup>
      <Button disabled>Buy shipping label</Button>
      <Button primary disabled>
        Buy shipping label
      </Button>
      <Button destructive disabled>
        Buy shipping label
      </Button>
      <Button outline disabled>
        Buy shipping label
      </Button>
      <span style={{color: '#bf0711'}}>
        <Button outline monochrome disabled>
          Buy shipping label
        </Button>
      </span>
      <Button plain disabled>
        Buy shipping label
      </Button>
      <Button plain destructive disabled>
        Buy shipping label
      </Button>
    </ButtonGroup>
  );
}

export function LoadingState() {
  return <Button loading>Save product</Button>;
}
