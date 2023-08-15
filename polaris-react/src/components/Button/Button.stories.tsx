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
        <VerticalStack gap="4">
          <Text as="h2">destructive</Text>
          <Box padding="4">
            <HorizontalStack gap="5" blockAlign="end">
              <Button tone="critical">Label</Button>
              <Button tone="critical" disabled>
                Label
              </Button>
              <Button tone="critical" icon={PlusMinor}>
                Label
              </Button>
              <Button tone="critical" disabled icon={PlusMinor}>
                Label
              </Button>
              <Button tone="critical" disclosure>
                Label
              </Button>
              <Button
                tone="critical"
                icon={CancelSmallMinor}
                onClick={() => {}}
                accessibilityLabel="Dismiss"
              />
              <Button
                tone="critical"
                icon={EditMajor}
                onClick={() => {}}
                accessibilityLabel="Dismiss"
              />
              <Button
                tone="critical"
                disabled
                icon={PlusMinor}
                onClick={() => {}}
                accessibilityLabel="Dismiss"
              />
              <Button
                tone="critical"
                icon={DeleteMinor}
                onClick={() => {}}
                accessibilityLabel="Dismiss"
              />
            </HorizontalStack>
          </Box>
          <Card>
            <HorizontalStack gap="5" blockAlign="end">
              <Button tone="critical">Label</Button>
              <Button tone="critical" disabled>
                Label
              </Button>
              <Button tone="critical" icon={PlusMinor}>
                Label
              </Button>
              <Button tone="critical" disabled icon={PlusMinor}>
                Label
              </Button>
              <Button tone="critical" disclosure>
                Label
              </Button>
              <Button
                tone="critical"
                icon={CancelSmallMinor}
                onClick={() => {}}
                accessibilityLabel="Dismiss"
              />
              <Button
                tone="critical"
                disabled
                icon={EditMajor}
                onClick={() => {}}
                accessibilityLabel="Dismiss"
              />
            </HorizontalStack>
          </Card>
        </VerticalStack>
        <VerticalStack gap="4">
          <Text as="h2">primary</Text>
          <Primary />
        </VerticalStack>

        <VerticalStack gap="2">
          <Text as="h2">primary destructive</Text>
          <HorizontalStack gap="5" blockAlign="end">
            <Button variant="primary" tone="critical">
              Label
            </Button>
            <Button variant="primary" tone="critical" disabled>
              Label
            </Button>
            <Button variant="primary" tone="critical" icon={DeleteMinor}>
              Label
            </Button>
            <Button
              variant="primary"
              tone="critical"
              disabled
              icon={DeleteMinor}
            >
              Label
            </Button>
            <Button variant="primary" tone="critical" disclosure>
              Label
            </Button>
            <Button
              variant="primary"
              tone="critical"
              icon={CancelSmallMinor}
              onClick={() => {}}
              accessibilityLabel="Dismiss"
            />
          </HorizontalStack>
        </VerticalStack>

        <VerticalStack gap="2">
          <Text as="h2">primary sucess</Text>
          <HorizontalStack gap="5" blockAlign="end">
            <Button variant="primary" tone="success">
              Label
            </Button>
            <Button variant="primary" tone="success" disabled>
              Label
            </Button>
            <Button variant="primary" tone="success" icon={DeleteMinor}>
              Label
            </Button>
            <Button
              variant="primary"
              tone="success"
              disabled
              icon={DeleteMinor}
            >
              Label
            </Button>
            <Button variant="primary" tone="success" disclosure>
              Label
            </Button>
            <Button
              variant="primary"
              tone="success"
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
          <PlainDestructive />
        </VerticalStack>

        <VerticalStack gap="2">
          <Text as="h2">primary plain</Text>
          <PlainPrimary />
        </VerticalStack>

        <VerticalStack gap="2">
          <Text as="h2">primary plain destructive</Text>
          <HorizontalStack gap="5" blockAlign="end">
            <Button variant="primaryPlain" tone="critical">
              Label
            </Button>
            <Button variant="primaryPlain" tone="critical" disabled>
              Label
            </Button>
            <Button variant="primaryPlain" tone="critical" icon={PlusMinor}>
              Label
            </Button>
            <Button
              variant="primaryPlain"
              tone="critical"
              disabled
              icon={PlusMinor}
            >
              Label
            </Button>
            <Button variant="primaryPlain" tone="critical" disclosure>
              Label
            </Button>
            <Button
              variant="primaryPlain"
              tone="critical"
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

export function Plain() {
  return (
    <Box padding="4">
      <HorizontalStack gap="5" blockAlign="end">
        <Button variant="plain">Label</Button>
        <Button variant="plain" disabled>
          Label
        </Button>
        <Button variant="plain" icon={PlusMinor}>
          Label
        </Button>
        <Button variant="plain" disabled icon={PlusMinor}>
          Label
        </Button>
        <Button variant="plain" disclosure>
          Label
        </Button>
        <Button variant="plain" disclosure disabled>
          Label
        </Button>
        <Button
          variant="plain"
          icon={CancelSmallMinor}
          onClick={() => {}}
          accessibilityLabel="Dismiss"
        />
        <Button
          variant="plain"
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
          <Button variant="primaryPlain">Label</Button>
          <Button variant="primaryPlain" disabled>
            Label
          </Button>
          <Button variant="primaryPlain" icon={PlusMinor}>
            Label
          </Button>
          <Button variant="primaryPlain" disabled icon={PlusMinor}>
            Label
          </Button>
          <Button variant="primaryPlain" disclosure>
            Label
          </Button>
        </HorizontalStack>
      </Box>
      <Card>
        <HorizontalStack gap="5" blockAlign="end">
          <Button variant="primaryPlain">Label</Button>
          <Button variant="primaryPlain" disabled>
            Label
          </Button>
          <Button variant="primaryPlain" icon={PlusMinor}>
            Label
          </Button>
          <Button variant="primaryPlain" disabled icon={PlusMinor}>
            Label
          </Button>
          <Button variant="primaryPlain" disclosure>
            Label
          </Button>
        </HorizontalStack>
      </Card>
      <Card>
        <HorizontalStack gap="5" blockAlign="end">
          <Button
            variant="primaryPlain"
            icon={CancelSmallMinor}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
          <Button
            disabled
            variant="primaryPlain"
            icon={EditMajor}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
        </HorizontalStack>
      </Card>
    </VerticalStack>
  );
}

export function PlainDestructive() {
  return (
    <HorizontalStack gap="5" blockAlign="end">
      <Button variant="plain" tone="critical">
        Label
      </Button>
      <Button variant="plain" tone="critical" disabled>
        Label
      </Button>
      <Button variant="plain" tone="critical" icon={PlusMinor}>
        Label
      </Button>
      <Button variant="plain" tone="critical" disabled icon={PlusMinor}>
        Label
      </Button>
      <Button variant="plain" tone="critical" disclosure>
        Label
      </Button>
      <Button variant="plain" tone="critical" disclosure disabled>
        Label
      </Button>
      <Button
        variant="plain"
        tone="critical"
        icon={CancelSmallMinor}
        onClick={() => {}}
        accessibilityLabel="Dismiss"
      />
      <Button
        variant="plain"
        tone="critical"
        disabled
        icon={CancelSmallMinor}
        onClick={() => {}}
        accessibilityLabel="Dismiss"
      />
    </HorizontalStack>
  );
}

export function Primary() {
  return (
    <VerticalStack gap="4">
      <Box padding="4">
        <HorizontalStack gap="5" blockAlign="end">
          <Button variant="primary">Label</Button>
          <Button variant="primary" disabled>
            Label
          </Button>
          <Button variant="primary" icon={PlusMinor}>
            Label
          </Button>
          <Button variant="primary" disabled icon={PlusMinor}>
            Label
          </Button>
          <Button variant="primary" disclosure>
            Label
          </Button>
          <Button
            variant="primary"
            icon={CancelSmallMinor}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
          <Button
            disabled
            variant="primary"
            icon={EditMajor}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
        </HorizontalStack>
      </Box>
      <Card>
        <HorizontalStack gap="5" blockAlign="end">
          <Button variant="primary">Label</Button>
          <Button variant="primary" disabled>
            Label
          </Button>
          <Button variant="primary" icon={PlusMinor}>
            Label
          </Button>
          <Button variant="primary" disabled icon={PlusMinor}>
            Label
          </Button>
          <Button variant="primary" disclosure>
            Label
          </Button>
          <Button
            variant="primary"
            icon={CancelSmallMinor}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
          <Button
            disabled
            variant="primary"
            icon={EditMajor}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
        </HorizontalStack>
      </Card>
    </VerticalStack>
  );
}

export function Destructive() {
  return <Button tone="critical">Delete theme</Button>;
}

export function Micro() {
  return (
    <HorizontalStack gap="5">
      <Button size="micro">Label</Button>
      <Button variant="primary" size="micro">
        Label
      </Button>
      <Button tone="critical" size="micro">
        Label
      </Button>
      <Button variant="plain" size="micro">
        Label
      </Button>
      <Button size="micro" accessibilityLabel="Edit" icon={EditMajor} />
    </HorizontalStack>
  );
}

export function Slim() {
  return (
    <HorizontalStack gap="5">
      <Button size="slim">Label</Button>
      <Button variant="primary" size="slim">
        Label
      </Button>
      <Button tone="critical" size="slim">
        Label
      </Button>
      <Button variant="plain" size="slim">
        Label
      </Button>
      <Button size="slim" accessibilityLabel="Edit" icon={EditMajor} />
    </HorizontalStack>
  );
}

export function Large() {
  return (
    <VerticalStack gap="4">
      <HorizontalStack gap="5" blockAlign="end">
        <Button size="large">Create store</Button>
        <Button size="large" accessibilityLabel="Edit" icon={EditMajor} />
        <Button size="large" icon={PlusMinor} variant="primary">
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
    <Button variant="plain" textAlign="left">
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
      variant="plain"
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
        variant="primary"
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
      <Button variant="primary" disabled>
        Buy shipping label
      </Button>
      <Button tone="critical" disabled>
        Buy shipping label
      </Button>
      <span style={{color: '#bf0711'}}>
        <Button disabled>Buy shipping label</Button>
      </span>
      <Button variant="plain" disabled>
        Buy shipping label
      </Button>
      <Button variant="plain" tone="critical" disabled>
        Buy shipping label
      </Button>
    </ButtonGroup>
  );
}

export function LoadingState() {
  return (
    <HorizontalStack gap="5">
      <Button loading>Save product</Button>
      <Button variant="primary" loading>
        Save product
      </Button>
      <Button variant="plain" loading>
        Save product
      </Button>
    </HorizontalStack>
  );
}
