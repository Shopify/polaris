import React from 'react';
import {QuestionMarkMinor} from '@shopify/polaris-icons';
import type {ComponentMeta} from '@storybook/react';
import {
  Button,
  ButtonGroup,
  Icon,
  TextField,
  Text,
  Tooltip,
  Box,
  HorizontalStack,
  VerticalStack,
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
          <HorizontalStack gap="1">
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
          </HorizontalStack>
        </Tooltip>
        <Tooltip
          active
          content="This content has the wide width and will break into a new line at 275px width"
          width="wide"
        >
          <HorizontalStack gap="1">
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
          </HorizontalStack>
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
          <HorizontalStack gap="1">
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
          </HorizontalStack>
        </Tooltip>
        <Tooltip
          active
          content="This content has padding of 4 (space-4 / 16px)"
          padding="4"
        >
          <HorizontalStack gap="1">
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
          </HorizontalStack>
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
          <HorizontalStack gap="1">
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
          </HorizontalStack>
        </Tooltip>
        <Tooltip
          active
          content="This content has a border radius of 2 (radius-2)"
          borderRadius="2"
        >
          <HorizontalStack gap="1">
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
          </HorizontalStack>
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
    <VerticalStack gap="4">
      <VerticalStack gap="2">
        <Text variant="headingMd" fontWeight="bold" as="h1">
          TEXT EXAMPLE
        </Text>
        <HorizontalStack>
          <Tooltip content="This should appear right away.">
            <Text variant="bodyMd" fontWeight="semibold" as="span">
              No delay
            </Text>
          </Tooltip>
        </HorizontalStack>
        <HorizontalStack>
          <Tooltip
            hoverDelay={1000}
            content="This should appear after 1 second."
          >
            <Text variant="bodyMd" fontWeight="semibold" as="span">
              1 second hover delay
            </Text>
          </Tooltip>
        </HorizontalStack>
      </VerticalStack>

      <VerticalStack gap="2">
        <Text variant="headingMd" fontWeight="bold" as="h1">
          BUTTON EXAMPLE
        </Text>
        <HorizontalStack>
          <Tooltip content="This should appear right away.">
            <Button>No delay</Button>
          </Tooltip>
        </HorizontalStack>
        <HorizontalStack>
          <Tooltip
            hoverDelay={2000}
            content="This should appear after 2 seconds."
          >
            <Button>2 seconds hover delay</Button>
          </Tooltip>
        </HorizontalStack>
      </VerticalStack>
    </VerticalStack>
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
      <HorizontalStack>
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
      </HorizontalStack>
    </Box>
  );
}

export function Alignment() {
  return (
    <Box paddingBlockStart="24">
      <HorizontalStack>
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
      </HorizontalStack>
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

export function ActiveStates() {
  return (
    <Box paddingBlockStart="24">
      <HorizontalStack gap="24">
        <Tooltip content="This tooltip should never render" active={false}>
          <Text variant="bodyLg" fontWeight="bold" as="span">
            Active false
          </Text>
        </Tooltip>
        <Tooltip content="This tooltip should render on load and hover" active>
          <Text variant="bodyLg" fontWeight="bold" as="span">
            Active true
          </Text>
        </Tooltip>
        <Tooltip
          content="This tooltip should render on hover"
          active={undefined}
        >
          <Text variant="bodyLg" fontWeight="bold" as="span">
            Active undefined
          </Text>
        </Tooltip>
      </HorizontalStack>
    </Box>
  );
}
