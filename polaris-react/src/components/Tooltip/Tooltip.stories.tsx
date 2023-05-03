import React from 'react';
import {QuestionMarkMinor} from '@shopify/polaris-icons';
import type {ComponentMeta} from '@storybook/react';
import {
  Button,
  ButtonGroup,
  Icon,
  LegacyStack,
  TextField,
  Text,
  Tooltip,
  Box,
  HorizontalStack,
} from '@shopify/polaris';

export default {
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

export function Default() {
  return (
    <Box paddingBlockStart="24">
      <Tooltip active content="This order has shipping labels.">
        <Text variant="bodyLg" fontWeight="bold" as="span">
          Order #1001
        </Text>
      </Tooltip>
    </Box>
  );
}

export function Width() {
  return (
    <Box paddingBlockStart="24">
      <HorizontalStack gap="8">
        <Tooltip
          active
          content="This content has the default width and will break into a new line at 200px width"
        >
          <LegacyStack spacing="extraTight">
            <Text variant="bodyLg" fontWeight="medium" as="span">
              Tooltip with
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="bold" as="span" color="success">
              default
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="medium" as="span">
              content width
            </Text>
            <Icon source={QuestionMarkMinor} color="base" />
          </LegacyStack>
        </Tooltip>
        <Tooltip
          active
          content="This content has the wide width and will break into a new line at 275px width"
          width="wide"
        >
          <LegacyStack spacing="extraTight">
            <Text variant="bodyLg" fontWeight="medium" as="span">
              Tooltip with
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="bold" as="span" color="success">
              wide
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="medium" as="span">
              content width
            </Text>
            <Icon source={QuestionMarkMinor} color="base" />
          </LegacyStack>
        </Tooltip>
      </HorizontalStack>
    </Box>
  );
}

export function Padding() {
  return (
    <Box paddingBlockStart="24">
      <HorizontalStack gap="8">
        <Tooltip active content="This content has default padding">
          <LegacyStack spacing="extraTight">
            <Text variant="bodyLg" fontWeight="medium" as="span">
              Tooltip with
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="bold" as="span" color="success">
              default
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="medium" as="span">
              content padding
            </Text>
            <Icon source={QuestionMarkMinor} color="base" />
          </LegacyStack>
        </Tooltip>
        <Tooltip
          active
          content="This content has padding of 4 (space-4 / 16px)"
          padding="4"
        >
          <LegacyStack spacing="extraTight">
            <Text variant="bodyLg" fontWeight="medium" as="span">
              Tooltip with
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="bold" as="span" color="success">
              4
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="medium" as="span">
              content padding
            </Text>
            <Icon source={QuestionMarkMinor} color="base" />
          </LegacyStack>
        </Tooltip>
      </HorizontalStack>
    </Box>
  );
}

export function BorderRadius() {
  return (
    <Box paddingBlockStart="24">
      <HorizontalStack gap="8">
        <Tooltip
          active
          content="This content has the default (radius-1) border radius"
        >
          <LegacyStack spacing="extraTight">
            <Text variant="bodyLg" fontWeight="medium" as="span">
              Tooltip with
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="bold" as="span" color="success">
              default
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="medium" as="span">
              border radius
            </Text>
            <Icon source={QuestionMarkMinor} color="base" />
          </LegacyStack>
        </Tooltip>
        <Tooltip
          active
          content="This content has a border radius of 2 (radius-2)"
          borderRadius="2"
        >
          <LegacyStack spacing="extraTight">
            <Text variant="bodyLg" fontWeight="medium" as="span">
              Tooltip with
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="bold" as="span" color="success">
              2
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="medium" as="span">
              border radius
            </Text>
            <Icon source={QuestionMarkMinor} color="base" />
          </LegacyStack>
        </Tooltip>
      </HorizontalStack>
    </Box>
  );
}

export function VisibleOnlyWithChildInteraction() {
  return (
    <Box paddingBlockStart="24">
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
    </Box>
  );
}

export function WithHoverDelay() {
  return (
    <LegacyStack vertical>
      <LegacyStack vertical>
        <Text variant="headingMd" fontWeight="bold" as="h1">
          TEXT EXAMPLE
        </Text>
        <LegacyStack>
          <Tooltip content="This should appear right away.">
            <Text variant="bodyMd" fontWeight="semibold" as="span">
              No delay
            </Text>
          </Tooltip>
        </LegacyStack>
        <LegacyStack>
          <Tooltip
            hoverDelay={1000}
            content="This should appear after 1 second."
          >
            <Text variant="bodyMd" fontWeight="semibold" as="span">
              1 second hover delay
            </Text>
          </Tooltip>
        </LegacyStack>
      </LegacyStack>
      <LegacyStack vertical>
        <Text variant="headingMd" fontWeight="bold" as="h1">
          BUTTON EXAMPLE
        </Text>
        <LegacyStack>
          <Tooltip content="This should appear right away.">
            <Button>No delay</Button>
          </Tooltip>
        </LegacyStack>
        <LegacyStack>
          <Tooltip
            hoverDelay={2000}
            content="This should appear after 2 seconds."
          >
            <Button>2 seconds hover delay</Button>
          </Tooltip>
        </LegacyStack>
      </LegacyStack>
    </LegacyStack>
  );
}

export function ActivatorAsDiv() {
  return (
    <Box paddingBlockStart="24">
      <Tooltip
        active
        content="This tooltip is rendered as a div"
        activatorWrapper="div"
      >
        <Text variant="bodyLg" fontWeight="bold" as="span">
          Order #1001
        </Text>
      </Tooltip>
    </Box>
  );
}

export function WithSuffix() {
  return (
    <Box padding="16" background="bg">
      <LegacyStack>
        <ButtonGroup segmented fullWidth>
          <Tooltip
            content={
              <HorizontalStack gap="2">
                Bold
                <Text as="span" variant="bodyMd" color="subdued">
                  ⌘B
                </Text>
              </HorizontalStack>
            }
            activatorWrapper="div"
          >
            <Button>B</Button>
          </Tooltip>
          <Tooltip
            content={
              <HorizontalStack gap="2">
                Italic
                <Text as="span" variant="bodyMd" color="subdued">
                  ⌘I
                </Text>
              </HorizontalStack>
            }
          >
            <Button>I</Button>
          </Tooltip>
          <Tooltip
            content={
              <HorizontalStack gap="2">
                Underline
                <Text as="span" variant="bodyMd" color="subdued">
                  ⌘U
                </Text>
              </HorizontalStack>
            }
          >
            <Button>U</Button>
          </Tooltip>
          <Tooltip
            content={
              <HorizontalStack gap="2">
                Strikethrough
                <Text as="span" variant="bodyMd" color="subdued">
                  ⌘S
                </Text>
              </HorizontalStack>
            }
          >
            <Button>S</Button>
          </Tooltip>
          <Tooltip
            content={
              <HorizontalStack gap="2">
                Bold
                <Text as="span" variant="bodyMd" color="subdued">
                  ⌘B
                </Text>
              </HorizontalStack>
            }
            preferredPosition="below"
          >
            <Button>B</Button>
          </Tooltip>
          <Tooltip
            content={
              <HorizontalStack gap="2">
                Italic
                <Text as="span" variant="bodyMd" color="subdued">
                  ⌘I
                </Text>
              </HorizontalStack>
            }
            preferredPosition="below"
          >
            <Button>I</Button>
          </Tooltip>
          <Tooltip
            content={
              <HorizontalStack gap="2">
                Underline
                <Text as="span" variant="bodyMd" color="subdued">
                  ⌘U
                </Text>
              </HorizontalStack>
            }
            preferredPosition="below"
          >
            <Button>U</Button>
          </Tooltip>
          <Tooltip
            content={
              <HorizontalStack gap="2">
                Strikethrough
                <Text as="span" variant="bodyMd" color="subdued">
                  ⌘S
                </Text>
              </HorizontalStack>
            }
            preferredPosition="below"
          >
            <Button>S</Button>
          </Tooltip>
        </ButtonGroup>
      </LegacyStack>
    </Box>
  );
}

export function Alignment() {
  return (
    <Box paddingBlockStart="24">
      <LegacyStack>
        <ButtonGroup segmented fullWidth>
          <Tooltip content="Content is longer than the activator">
            <Button>Bold</Button>
          </Tooltip>
          <Tooltip content="Italic">
            <Button>Italic</Button>
          </Tooltip>
          <Tooltip content="Underline">
            <Button>Activator is longer than the Tooltip</Button>
          </Tooltip>
          <Tooltip content="Content is longer than the activator">
            <Button>Strikethrough</Button>
          </Tooltip>
          <Tooltip content="Content is longer than the activator">
            <Button>Strikethrough</Button>
          </Tooltip>
          <Tooltip content="Content is longer than the activator">
            <Button>Strikethrough</Button>
          </Tooltip>
        </ButtonGroup>
      </LegacyStack>
    </Box>
  );
}

export function HasUnderline() {
  return (
    <Box paddingBlockStart="24">
      <Tooltip active content="This tooltip has an underline" hasUnderline>
        <Text variant="bodyLg" fontWeight="bold" as="span">
          Order #1001
        </Text>
      </Tooltip>
    </Box>
  );
}

export function PersistOnClick() {
  return (
    <Box paddingBlockStart="24">
      <Tooltip
        content="This tooltip can be clicked to stay open"
        persistOnClick
      >
        <Text variant="bodyLg" fontWeight="bold" as="span">
          Order #1001
        </Text>
      </Tooltip>
    </Box>
  );
}
