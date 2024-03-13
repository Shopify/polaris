import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import type {TextProps} from '@shopify/polaris';
import {
  Button,
  ButtonGroup,
  Card,
  InlineStack,
  BlockStack,
  Text,
  Box,
  Popover,
  ActionList,
} from '@shopify/polaris';
import {
  PlusIcon,
  XSmallIcon,
  ChevronDownIcon,
  EditIcon,
  MagicIcon,
  DeleteIcon,
} from '@shopify/polaris-icons';

export default {
  component: Button,
} as ComponentMeta<typeof Button>;

export function All() {
  const textProps: Pick<TextProps, 'as' | 'fontWeight'> = {
    as: 'span',
    fontWeight: 'bold',
  };
  return (
    <BlockStack gap="400">
      <Text {...textProps}>Default</Text>
      <Default />
      <Text {...textProps}>Critical</Text>
      <Critical />
      <Text {...textProps}>Primary</Text>
      <Primary />
      <Text {...textProps}>Primary success</Text>
      <PrimarySuccess />
      <Text {...textProps}>Primary critical</Text>
      <PrimaryCritical />
      <Text {...textProps}>Tertiary</Text>
      <Tertiary />
      <Text {...textProps}>Tertiary critical</Text>
      <TertiaryCritical />
      <Text {...textProps}>Plain</Text>
      <Plain />
      <Text {...textProps}>Plain Critical</Text>
      <PlainCritical />
      <Text {...textProps}>Monochrome Plain</Text>
      <MonochromePlain />
      <Text {...textProps}>Micro</Text>
      <Micro />
      <Text {...textProps}>Slim</Text>
      <Slim />
      <Text {...textProps}>Large</Text>
      <Large />
      <Text {...textProps}>Full width</Text>
      <FullWidth />
      <Text {...textProps}>Text aligned</Text>
      <TextAligned />
      <Text {...textProps}>Pressed</Text>
      <Pressed />
      <Text {...textProps}>Disclosure</Text>
      <PlainDisclosure />
      <Text {...textProps}>Right aligned disclosure</Text>
      <RightAlignedDisclosure />
      <Text {...textProps}>Select disclosure</Text>
      <SelectDisclosure />
      <Text {...textProps}>Split</Text>
      <Split />
      <Text {...textProps}>Disabled state</Text>
      <DisabledState />
      <Text {...textProps}>Loading state</Text>
      <LoadingState />
    </BlockStack>
  );
}

export function Default() {
  return (
    <>
      <Box padding="400">
        <InlineStack gap="400" blockAlign="end">
          <Button>Label</Button>
          <Button disabled>Label</Button>
          <Button icon={PlusIcon}>Label</Button>
          <Button disabled icon={PlusIcon}>
            Label
          </Button>
          <Button disclosure>Label</Button>
          <Button
            icon={XSmallIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
          <Button
            disabled
            icon={EditIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
        </InlineStack>
      </Box>
      <Card>
        <InlineStack gap="400" blockAlign="end">
          <Button>Label</Button>
          <Button disabled>Label</Button>
          <Button icon={PlusIcon}>Label</Button>
          <Button disabled icon={PlusIcon}>
            Label
          </Button>
          <Button disclosure>Label</Button>
          <Button
            icon={XSmallIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
          <Button
            disabled
            icon={EditIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
        </InlineStack>
      </Card>
    </>
  );
}

export function Critical() {
  return (
    <>
      <Box padding="400">
        <InlineStack gap="400" blockAlign="end">
          <Button tone="critical">Label</Button>
          <Button tone="critical" disabled>
            Label
          </Button>
          <Button tone="critical" icon={DeleteIcon}>
            Label
          </Button>
          <Button tone="critical" disabled icon={DeleteIcon}>
            Label
          </Button>
          <Button tone="critical" disclosure>
            Label
          </Button>
          <Button
            tone="critical"
            icon={DeleteIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
          <Button
            disabled
            tone="critical"
            icon={DeleteIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
        </InlineStack>
      </Box>
      <Card>
        <InlineStack gap="400" blockAlign="end">
          <Button tone="critical">Label</Button>
          <Button tone="critical" disabled>
            Label
          </Button>
          <Button tone="critical" icon={DeleteIcon}>
            Label
          </Button>
          <Button tone="critical" disabled icon={DeleteIcon}>
            Label
          </Button>
          <Button tone="critical" disclosure>
            Label
          </Button>
          <Button
            tone="critical"
            icon={DeleteIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
          <Button
            tone="critical"
            disabled
            icon={DeleteIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
        </InlineStack>
      </Card>
    </>
  );
}

export function Plain() {
  return (
    <Box padding="400">
      <InlineStack gap="400" blockAlign="end">
        <Button variant="plain">Label</Button>
        <Button variant="plain" disabled>
          Label
        </Button>
        <Button variant="plain" icon={PlusIcon}>
          Label
        </Button>
        <Button variant="plain" disabled icon={PlusIcon}>
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
          icon={XSmallIcon}
          onClick={() => {}}
          accessibilityLabel="Dismiss"
        />
        <Button
          variant="plain"
          disabled
          icon={XSmallIcon}
          onClick={() => {}}
          accessibilityLabel="Dismiss"
        />
      </InlineStack>
    </Box>
  );
}

export function MonochromePlain() {
  return (
    <Box padding="400">
      <InlineStack gap="400" blockAlign="center">
        <Button variant="monochromePlain">Default</Button>
        <Button variant="monochromePlain" icon={PlusIcon}>
          With icon
        </Button>
        <Button variant="monochromePlain" disabled icon={PlusIcon}>
          Disabled with icon
        </Button>
        <Button variant="monochromePlain" disclosure>
          Disclosure
        </Button>
        <Box color="text-success">
          <Button variant="monochromePlain" disclosure>
            Inherited color
          </Button>
        </Box>
        <Box color="text-magic">
          <Button
            variant="monochromePlain"
            icon={MagicIcon}
            accessibilityLabel="Apply suggestion"
          />
        </Box>
      </InlineStack>
    </Box>
  );
}

export function Tertiary() {
  return (
    <BlockStack gap="400">
      <Box padding="400">
        <InlineStack gap="400" blockAlign="end">
          <Button variant="tertiary">Label</Button>
          <Button variant="tertiary" disabled>
            Label
          </Button>
          <Button variant="tertiary" icon={PlusIcon}>
            Label
          </Button>
          <Button variant="tertiary" disabled icon={PlusIcon}>
            Label
          </Button>
          <Button variant="tertiary" disclosure>
            Label
          </Button>
          <Button
            variant="tertiary"
            icon={XSmallIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
          <Button
            disabled
            variant="tertiary"
            icon={EditIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
        </InlineStack>
      </Box>
      <Card>
        <InlineStack gap="400" blockAlign="end">
          <Button variant="tertiary">Label</Button>
          <Button variant="tertiary" disabled>
            Label
          </Button>
          <Button variant="tertiary" icon={PlusIcon}>
            Label
          </Button>
          <Button variant="tertiary" disabled icon={PlusIcon}>
            Label
          </Button>
          <Button variant="tertiary" disclosure>
            Label
          </Button>
          <Button
            variant="tertiary"
            icon={XSmallIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
          <Button
            disabled
            variant="tertiary"
            icon={EditIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
        </InlineStack>
      </Card>
    </BlockStack>
  );
}

export function TertiaryCritical() {
  return (
    <BlockStack gap="400">
      <Box padding="400">
        <InlineStack gap="400" blockAlign="end">
          <Button variant="tertiary" tone="critical">
            Label
          </Button>
          <Button variant="tertiary" tone="critical" disabled>
            Label
          </Button>
          <Button variant="tertiary" tone="critical" icon={DeleteIcon}>
            Label
          </Button>
          <Button variant="tertiary" tone="critical" disabled icon={DeleteIcon}>
            Label
          </Button>
          <Button variant="tertiary" tone="critical" disclosure>
            Label
          </Button>
          <Button
            variant="tertiary"
            tone="critical"
            icon={DeleteIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
          <Button
            disabled
            variant="tertiary"
            tone="critical"
            icon={DeleteIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
        </InlineStack>
      </Box>
      <Card>
        <InlineStack gap="400" blockAlign="end">
          <Button variant="tertiary" tone="critical">
            Label
          </Button>
          <Button variant="tertiary" tone="critical" disabled>
            Label
          </Button>
          <Button variant="tertiary" tone="critical" icon={DeleteIcon}>
            Label
          </Button>
          <Button variant="tertiary" tone="critical" disabled icon={DeleteIcon}>
            Label
          </Button>
          <Button variant="tertiary" tone="critical" disclosure>
            Label
          </Button>
          <Button
            variant="tertiary"
            tone="critical"
            icon={DeleteIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
          <Button
            disabled
            variant="tertiary"
            tone="critical"
            icon={DeleteIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
        </InlineStack>
      </Card>
    </BlockStack>
  );
}

export function PlainCritical() {
  return (
    <InlineStack gap="400" blockAlign="end">
      <Button variant="plain" tone="critical">
        Label
      </Button>
      <Button variant="plain" tone="critical" disabled>
        Label
      </Button>
      <Button variant="plain" tone="critical" icon={DeleteIcon}>
        Label
      </Button>
      <Button variant="plain" tone="critical" disabled icon={DeleteIcon}>
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
        icon={DeleteIcon}
        onClick={() => {}}
        accessibilityLabel="Dismiss"
      />
      <Button
        variant="plain"
        tone="critical"
        disabled
        icon={DeleteIcon}
        onClick={() => {}}
        accessibilityLabel="Dismiss"
      />
    </InlineStack>
  );
}

export function Primary() {
  return (
    <BlockStack gap="400">
      <Box padding="400">
        <InlineStack gap="400" blockAlign="end">
          <Button variant="primary">Label</Button>
          <Button variant="primary" disabled>
            Label
          </Button>
          <Button variant="primary" icon={PlusIcon}>
            Label
          </Button>
          <Button variant="primary" disabled icon={PlusIcon}>
            Label
          </Button>
          <Button variant="primary" disclosure>
            Label
          </Button>
          <Button
            variant="primary"
            icon={XSmallIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
          <Button
            disabled
            variant="primary"
            icon={EditIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
        </InlineStack>
      </Box>
      <Card>
        <InlineStack gap="400" blockAlign="end">
          <Button variant="primary">Label</Button>
          <Button variant="primary" disabled>
            Label
          </Button>
          <Button variant="primary" icon={PlusIcon}>
            Label
          </Button>
          <Button variant="primary" disabled icon={PlusIcon}>
            Label
          </Button>
          <Button variant="primary" disclosure>
            Label
          </Button>
          <Button
            variant="primary"
            icon={XSmallIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
          <Button
            disabled
            variant="primary"
            icon={EditIcon}
            onClick={() => {}}
            accessibilityLabel="Dismiss"
          />
        </InlineStack>
      </Card>
    </BlockStack>
  );
}

export function PrimarySuccess() {
  return (
    <Box padding="400">
      <InlineStack gap="400" blockAlign="end">
        <Button variant="primary" tone="success">
          Label
        </Button>
        <Button variant="primary" tone="success" disabled>
          Label
        </Button>
        <Button variant="primary" tone="success" icon={PlusIcon}>
          Label
        </Button>
        <Button variant="primary" tone="success" disabled icon={PlusIcon}>
          Label
        </Button>
        <Button variant="primary" tone="success" disclosure>
          Label
        </Button>
        <Button
          variant="primary"
          tone="success"
          icon={XSmallIcon}
          onClick={() => {}}
          accessibilityLabel="Dismiss"
        />
        <Button
          disabled
          variant="primary"
          tone="success"
          icon={EditIcon}
          onClick={() => {}}
          accessibilityLabel="Dismiss"
        />
      </InlineStack>
    </Box>
  );
}

export function PrimaryCritical() {
  return (
    <Box padding="400">
      <InlineStack gap="400" blockAlign="end">
        <Button variant="primary" tone="critical">
          Label
        </Button>
        <Button variant="primary" tone="critical" disabled>
          Label
        </Button>
        <Button variant="primary" tone="critical" icon={DeleteIcon}>
          Label
        </Button>
        <Button variant="primary" tone="critical" disabled icon={DeleteIcon}>
          Label
        </Button>
        <Button variant="primary" tone="critical" disclosure>
          Label
        </Button>
        <Button
          variant="primary"
          tone="critical"
          icon={DeleteIcon}
          onClick={() => {}}
          accessibilityLabel="Dismiss"
        />
        <Button
          disabled
          variant="primary"
          tone="critical"
          icon={DeleteIcon}
          onClick={() => {}}
          accessibilityLabel="Dismiss"
        />
      </InlineStack>
    </Box>
  );
}

export function Micro() {
  return (
    <InlineStack gap="400">
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
      <Button size="micro" accessibilityLabel="Edit" icon={EditIcon} />
    </InlineStack>
  );
}

export function Slim() {
  return (
    <InlineStack gap="400">
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
      <Button size="slim" accessibilityLabel="Edit" icon={EditIcon} />
    </InlineStack>
  );
}

export function Large() {
  return (
    <InlineStack gap="400">
      <Button size="large">Label</Button>
      <Button size="large" variant="primary">
        Label
      </Button>
      <Button size="large" tone="critical">
        Label
      </Button>
      <Button size="large" variant="plain">
        Label
      </Button>
      <Button size="large" accessibilityLabel="Edit" icon={EditIcon} />
    </InlineStack>
  );
}

export function FullWidth() {
  return <Button fullWidth>Add customer</Button>;
}

export function TextAligned() {
  return (
    <Box maxWidth="200px">
      <Button variant="plain" textAlign="right">
        This is a really long string of text that overflows onto the next line.
      </Button>
    </Box>
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
    <ButtonGroup variant="segmented">
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
    <div>
      <Button disclosure="select" onClick={() => console.log('Open Popover')}>
        Select options
      </Button>
    </div>
  );
}

export function Split() {
  const [active, setActive] = React.useState<string | null>(null);

  const toggleActive = (id: string) => () => {
    setActive((activeId) => (activeId !== id ? id : null));
  };
  return (
    <div>
      <InlineStack gap="400">
        <ButtonGroup variant="segmented">
          <Button variant="primary">Save</Button>

          <Popover
            active={active === 'popover1'}
            preferredAlignment="right"
            activator={
              <Button
                variant="primary"
                onClick={toggleActive('popover1')}
                icon={ChevronDownIcon}
                accessibilityLabel="Other save actions"
              />
            }
            autofocusTarget="first-node"
            onClose={toggleActive('popover1')}
          >
            <ActionList
              actionRole="menuitem"
              items={[{content: 'Save as draft'}]}
            />
          </Popover>
        </ButtonGroup>

        <ButtonGroup variant="segmented">
          <Button>Save</Button>

          <Popover
            active={active === 'popover2'}
            preferredAlignment="right"
            activator={
              <Button
                onClick={toggleActive('popover2')}
                icon={ChevronDownIcon}
                accessibilityLabel="Other save actions"
              />
            }
            autofocusTarget="first-node"
            onClose={toggleActive('popover2')}
          >
            <ActionList
              actionRole="menuitem"
              items={[{content: 'Save as draft'}]}
            />
          </Popover>
        </ButtonGroup>
      </InlineStack>
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
      {/* Visual check to ensure the button color is not inherited from the parent */}
      <Box color="text-critical">
        <Button variant="monochromePlain" disabled icon={XSmallIcon}>
          Buy shipping label
        </Button>
      </Box>
    </ButtonGroup>
  );
}

export function LoadingState() {
  return (
    <InlineStack gap="400">
      <Button loading>Save product</Button>
      <Button variant="primary" loading>
        Save product
      </Button>
      <Button variant="plain" loading>
        Save product
      </Button>
    </InlineStack>
  );
}
