import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Button,
  ButtonGroup,
  Card,
  HorizontalStack,
  VerticalStack,
  Text,
  Box,
} from '@shopify/polaris';
import {
  PlusMinor,
  DeleteMinor,
  CancelSmallMinor,
  EditMajor,
} from '@shopify/polaris-icons';

export default {
  component: Button,
} as ComponentMeta<typeof Button>;

export function All() {
  return (
    <div>
      <VerticalStack gap="8">
        <VerticalStack gap="4">
          <Text as="h2">default</Text>
          <Box padding="4">
            <HorizontalStack gap="5" blockAlign="end">
              <Button>Label</Button>
              <Button disabled>Label</Button>
              <Button icon={PlusMinor}>Label</Button>
              <Button disabled icon={PlusMinor}>
                Label
              </Button>
              <Button disclosure>Label</Button>
              <Button
                icon={CancelSmallMinor}
                onClick={() => {}}
                accessibilityLabel="Dismiss"
              />
              <Button
                icon={EditMajor}
                onClick={() => {}}
                accessibilityLabel="Dismiss"
              />
              <Button
                disabled
                icon={PlusMinor}
                onClick={() => {}}
                accessibilityLabel="Dismiss"
              />
              <Button
                icon={DeleteMinor}
                onClick={() => {}}
                accessibilityLabel="Dismiss"
              />
            </HorizontalStack>
          </Box>
          <Card>
            <HorizontalStack gap="5" blockAlign="end">
              <Button>Label</Button>
              <Button disabled>Label</Button>
              <Button icon={PlusMinor}>Label</Button>
              <Button disabled icon={PlusMinor}>
                Label
              </Button>
              <Button disclosure>Label</Button>
              <Button
                icon={CancelSmallMinor}
                onClick={() => {}}
                accessibilityLabel="Dismiss"
              />
              <Button
                disabled
                icon={EditMajor}
                onClick={() => {}}
                accessibilityLabel="Dismiss"
              />
            </HorizontalStack>
          </Card>
        </VerticalStack>
        <VerticalStack gap="2">
          <Text as="h2">destructive</Text>
          <Box padding="4">
            <HorizontalStack gap="5" blockAlign="end">
              <Button destructive>Label</Button>
              <Button destructive disabled>
                Label
              </Button>
              <Button destructive icon={DeleteMinor}>
                Label
              </Button>
              <Button destructive disabled icon={DeleteMinor}>
                Label
              </Button>
              <Button destructive disclosure>
                Label
              </Button>
              <Button
                destructive
                icon={CancelSmallMinor}
                onClick={() => {}}
                accessibilityLabel="Dismiss"
              />
              <Button
                disabled
                destructive
                icon={EditMajor}
                onClick={() => {}}
                accessibilityLabel="Dismiss"
              />
            </HorizontalStack>
          </Box>
          <Card>
            <HorizontalStack gap="5" blockAlign="end">
              <Button destructive>Label</Button>
              <Button destructive disabled>
                Label
              </Button>
              <Button destructive icon={DeleteMinor}>
                Label
              </Button>
              <Button destructive disabled icon={DeleteMinor}>
                Label
              </Button>
              <Button destructive disclosure>
                Label
              </Button>
              <Button
                destructive
                icon={CancelSmallMinor}
                onClick={() => {}}
                accessibilityLabel="Dismiss"
              />
              <Button
                disabled
                destructive
                icon={EditMajor}
                onClick={() => {}}
                accessibilityLabel="Dismiss"
              />
            </HorizontalStack>
          </Card>
        </VerticalStack>
        <VerticalStack gap="4">
          <Text as="h2">primary</Text>
          <HorizontalStack gap="5" blockAlign="end">
            <Button primary>Label</Button>
            <Button primary disabled>
              Label
            </Button>
            <Button primary icon={PlusMinor}>
              Label
            </Button>
            <Button primary disabled icon={PlusMinor}>
              Label
            </Button>
            <Button primary disclosure>
              Label
            </Button>
            <Button
              primary
              icon={CancelSmallMinor}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
            <Button
              disabled
              primary
              icon={EditMajor}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
          </HorizontalStack>
        </VerticalStack>

        <VerticalStack gap="2">
          <Text as="h2">primary destructive</Text>
          <HorizontalStack gap="5" blockAlign="end">
            <Button primary destructive>
              Label
            </Button>
            <Button primary destructive disabled>
              Label
            </Button>
            <Button primary destructive icon={DeleteMinor}>
              Label
            </Button>
            <Button primary destructive disabled icon={DeleteMinor}>
              Label
            </Button>
            <Button primary destructive disclosure>
              Label
            </Button>
            <Button
              primary
              destructive
              icon={CancelSmallMinor}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
          </HorizontalStack>
        </VerticalStack>

        <VerticalStack gap="2">
          <Text as="h2">primary sucess</Text>
          <HorizontalStack gap="5" blockAlign="end">
            <Button primarySuccess>Label</Button>
            <Button primarySuccess disabled>
              Label
            </Button>
            <Button primarySuccess icon={DeleteMinor}>
              Label
            </Button>
            <Button primarySuccess disabled icon={DeleteMinor}>
              Label
            </Button>
            <Button primarySuccess disclosure>
              Label
            </Button>
            <Button
              primarySuccess
              icon={CancelSmallMinor}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
          </HorizontalStack>
        </VerticalStack>

        <VerticalStack gap="2">
          <Text as="h2">plain</Text>
          <Plain />
        </VerticalStack>

        <VerticalStack gap="2">
          <Text as="h2">plain destructive</Text>
          <HorizontalStack gap="5" blockAlign="end">
            <Button plain destructive>
              Label
            </Button>
            <Button plain destructive disabled>
              Label
            </Button>
            <Button plain destructive icon={PlusMinor}>
              Label
            </Button>
            <Button plain destructive disabled icon={PlusMinor}>
              Label
            </Button>
            <Button plain destructive disclosure>
              Label
            </Button>
            <Button plain destructive disclosure disabled>
              Label
            </Button>
            <Button
              plain
              destructive
              icon={CancelSmallMinor}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
            <Button
              plain
              destructive
              disabled
              icon={CancelSmallMinor}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
          </HorizontalStack>
        </VerticalStack>

        <VerticalStack gap="2">
          <Text as="h2">primary plain</Text>
          <PlainPrimary />
        </VerticalStack>

        <VerticalStack gap="2">
          <Text as="h2">primary plain destructive</Text>
          <HorizontalStack gap="5" blockAlign="end">
            <Button primary plain destructive>
              Label
            </Button>
            <Button primary plain destructive disabled>
              Label
            </Button>
            <Button primary plain destructive icon={PlusMinor}>
              Label
            </Button>
            <Button primary plain destructive disabled icon={PlusMinor}>
              Label
            </Button>
            <Button primary plain destructive disclosure>
              Label
            </Button>
            <Button
              primary
              plain
              destructive
              icon={CancelSmallMinor}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
          </HorizontalStack>
        </VerticalStack>
      </VerticalStack>
    </div>
  );
}

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
  return (
    <Box padding="4">
      <HorizontalStack gap="5" blockAlign="end">
        <Button plain>Label</Button>
        <Button plain disabled>
          Label
        </Button>
        <Button plain icon={PlusMinor}>
          Label
        </Button>
        <Button plain disabled icon={PlusMinor}>
          Label
        </Button>
        <Button plain disclosure>
          Label
        </Button>
        <Button plain disclosure disabled>
          Label
        </Button>
        <Button
          plain
          icon={CancelSmallMinor}
          onClick={() => {}}
          accessibilityLabel="Dismiss"
        />
        <Button
          plain
          disabled
          icon={CancelSmallMinor}
          onClick={() => {}}
          accessibilityLabel="Dismiss"
        />
      </HorizontalStack>
    </Box>
  );
}

export function PlainPrimary() {
  return (
    <VerticalStack gap="4">
      <Box padding="4">
        <HorizontalStack gap="5" blockAlign="end">
          <Button primary plain>
            Label
          </Button>
          <Button primary plain disabled>
            Label
          </Button>
          <Button primary plain icon={PlusMinor}>
            Label
          </Button>
          <Button primary plain disabled icon={PlusMinor}>
            Label
          </Button>
          <Button primary plain disclosure>
            Label
          </Button>
        </HorizontalStack>
      </Box>
      <Card>
        <HorizontalStack gap="5" blockAlign="end">
          <Button primary plain>
            Label
          </Button>
          <Button primary plain disabled>
            Label
          </Button>
          <Button primary plain icon={PlusMinor}>
            Label
          </Button>
          <Button primary plain disabled icon={PlusMinor}>
            Label
          </Button>
          <Button primary plain disclosure>
            Label
          </Button>
        </HorizontalStack>
      </Card>
      <Card>
        <HorizontalStack gap="5" blockAlign="end">
          <Button
            primary
            plain
            icon={CancelSmallMinor}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
          <Button
            disabled
            primary
            plain
            icon={EditMajor}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
        </HorizontalStack>
      </Card>
    </VerticalStack>
  );
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

export function Micro() {
  return (
    <>
      <Button size="micro">Save</Button>
    </>
  );
}

export function Slim() {
  return <Button size="slim">Save variant</Button>;
}

export function Large() {
  return (
    <VerticalStack gap="4">
      <HorizontalStack gap="5" blockAlign="end">
        <Button size="large">Create store</Button>
        <Button size="large" accessibilityLabel="Edit" icon={EditMajor} />
        <Button size="large" icon={PlusMinor} primary>
          Create store
        </Button>
      </HorizontalStack>
      <HorizontalStack gap="5" blockAlign="end">
        <Button size="large" fullWidth>
          Create store
        </Button>
      </HorizontalStack>
    </VerticalStack>
  );
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
