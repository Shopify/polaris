import React, {useState} from 'react';
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
  InlineStack,
  BlockStack,
  Popover,
} from '@shopify/polaris';
import type {TooltipProps} from '@shopify/polaris';

export default {
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

export function All() {
  return (
    <BlockStack gap="1600">
      <Default />
      <PreferredPosition />
      <Width />
      <Padding />
      <BorderRadius />
      <VisibleOnlyWithChildInteraction />
      <WithHoverDelay />
      <ActivatorAsDiv />
      <WithSuffix />
      <Alignment />
      <HasUnderline />
      <PersistOnClick />
      <ActiveStates />
    </BlockStack>
  );
}

export function Default() {
  return (
    <Box paddingBlockStart="2400">
      <Tooltip active content="This order has shipping labels.">
        <Text variant="bodyLg" fontWeight="bold" as="span">
          Order #1001
        </Text>
      </Tooltip>
    </Box>
  );
}

export function PreferredPosition() {
  return (
    <Box paddingBlockStart="2400">
      <InlineStack gap="800">
        <Tooltip
          active
          content="This content is positioned above the activator"
          preferredPosition="above"
        >
          <InlineStack gap="100">
            <Text variant="bodyLg" fontWeight="medium" as="span">
              Tooltip positioned
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="bold" as="span" tone="success">
              above
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="medium" as="span">
              the activator
            </Text>
            <Icon source={QuestionMarkMinor} tone="base" />
          </InlineStack>
        </Tooltip>
        <Tooltip
          active
          content="This content is positioned above the activator"
          preferredPosition="below"
        >
          <InlineStack gap="100">
            <Text variant="bodyLg" fontWeight="medium" as="span">
              Tooltip positioned
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="bold" as="span" tone="success">
              below
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="medium" as="span">
              the activator
            </Text>
            <Icon source={QuestionMarkMinor} tone="base" />
          </InlineStack>
        </Tooltip>
      </InlineStack>
    </Box>
  );
}

export function Width() {
  return (
    <Box paddingBlockStart="2400">
      <InlineStack gap="800">
        <Tooltip
          active
          content="This content has the default width and will break into a new line at 200px width"
        >
          <InlineStack gap="100">
            <Text variant="bodyLg" fontWeight="medium" as="span">
              Tooltip with
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="bold" as="span" tone="success">
              default
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="medium" as="span">
              content width
            </Text>
            <Icon source={QuestionMarkMinor} tone="base" />
          </InlineStack>
        </Tooltip>
        <Tooltip
          active
          content="This content has the wide width and will break into a new line at 275px width"
          width="wide"
        >
          <InlineStack gap="100">
            <Text variant="bodyLg" fontWeight="medium" as="span">
              Tooltip with
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="bold" as="span" tone="success">
              wide
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="medium" as="span">
              content width
            </Text>
            <Icon source={QuestionMarkMinor} tone="base" />
          </InlineStack>
        </Tooltip>
      </InlineStack>
    </Box>
  );
}

export function Padding() {
  return (
    <Box paddingBlockStart="2400">
      <InlineStack gap="800">
        <Tooltip active content="This content has default padding">
          <InlineStack gap="100">
            <Text variant="bodyLg" fontWeight="medium" as="span">
              Tooltip with
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="bold" as="span" tone="success">
              default
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="medium" as="span">
              content padding
            </Text>
            <Icon source={QuestionMarkMinor} tone="base" />
          </InlineStack>
        </Tooltip>
        <Tooltip
          active
          content="This content has padding of 4 (space-400 / 16px)"
          padding="400"
        >
          <InlineStack gap="100">
            <Text variant="bodyLg" fontWeight="medium" as="span">
              Tooltip with
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="bold" as="span" tone="success">
              4
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="medium" as="span">
              content padding
            </Text>
            <Icon source={QuestionMarkMinor} tone="base" />
          </InlineStack>
        </Tooltip>
      </InlineStack>
    </Box>
  );
}

export function BorderRadius() {
  return (
    <Box paddingBlockStart="2400">
      <InlineStack gap="800">
        <Tooltip
          active
          content="This content has the default (radius-100) border radius"
        >
          <InlineStack gap="100">
            <Text variant="bodyLg" fontWeight="medium" as="span">
              Tooltip with
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="bold" as="span" tone="success">
              default
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="medium" as="span">
              border radius
            </Text>
            <Icon source={QuestionMarkMinor} tone="base" />
          </InlineStack>
        </Tooltip>
        <Tooltip
          active
          content="This content has a border radius of 200 (radius-200)"
          borderRadius="200"
        >
          <InlineStack gap="100">
            <Text variant="bodyLg" fontWeight="medium" as="span">
              Tooltip with
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="bold" as="span" tone="success">
              2
            </Text>{' '}
            <Text variant="bodyLg" fontWeight="medium" as="span">
              border radius
            </Text>
            <Icon source={QuestionMarkMinor} tone="base" />
          </InlineStack>
        </Tooltip>
      </InlineStack>
    </Box>
  );
}

export function VisibleOnlyWithChildInteraction() {
  return (
    <Box paddingBlockStart="2400">
      <div style={{width: '200px'}}>
        <ButtonGroup variant="segmented" fullWidth>
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
    <BlockStack gap="400">
      <BlockStack gap="200">
        <Text variant="headingMd" fontWeight="bold" as="h1">
          TEXT EXAMPLE
        </Text>
        <InlineStack>
          <Tooltip content="This should appear right away.">
            <Text variant="bodyMd" fontWeight="semibold" as="span">
              No delay
            </Text>
          </Tooltip>
        </InlineStack>
        <InlineStack>
          <Tooltip
            hoverDelay={1000}
            content="This should appear after 1 second."
          >
            <Text variant="bodyMd" fontWeight="semibold" as="span">
              1 second hover delay
            </Text>
          </Tooltip>
        </InlineStack>
      </BlockStack>

      <BlockStack gap="200">
        <Text variant="headingMd" fontWeight="bold" as="h1">
          BUTTON EXAMPLE
        </Text>
        <InlineStack>
          <Tooltip content="This should appear right away.">
            <Button>No delay</Button>
          </Tooltip>
        </InlineStack>
        <InlineStack>
          <Tooltip
            hoverDelay={2000}
            content="This should appear after 2 seconds."
          >
            <Button>2 seconds hover delay</Button>
          </Tooltip>
        </InlineStack>
      </BlockStack>
    </BlockStack>
  );
}

export function ActivatorAsDiv() {
  return (
    <Box paddingBlockStart="2400">
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
    <Box padding="1600" background="bg-surface">
      <InlineStack>
        <ButtonGroup variant="segmented" fullWidth>
          <Tooltip
            content={
              <InlineStack gap="200">
                Bold
                <Text as="span" variant="bodyMd" tone="subdued">
                  ⌘B
                </Text>
              </InlineStack>
            }
            activatorWrapper="div"
          >
            <Button>B</Button>
          </Tooltip>
          <Tooltip
            content={
              <InlineStack gap="200">
                Italic
                <Text as="span" variant="bodyMd" tone="subdued">
                  ⌘I
                </Text>
              </InlineStack>
            }
          >
            <Button>I</Button>
          </Tooltip>
          <Tooltip
            content={
              <InlineStack gap="200">
                Underline
                <Text as="span" variant="bodyMd" tone="subdued">
                  ⌘U
                </Text>
              </InlineStack>
            }
          >
            <Button>U</Button>
          </Tooltip>
          <Tooltip
            content={
              <InlineStack gap="200">
                Strikethrough
                <Text as="span" variant="bodyMd" tone="subdued">
                  ⌘S
                </Text>
              </InlineStack>
            }
          >
            <Button>S</Button>
          </Tooltip>
          <Tooltip
            content={
              <InlineStack gap="200">
                Bold
                <Text as="span" variant="bodyMd" tone="subdued">
                  ⌘B
                </Text>
              </InlineStack>
            }
            preferredPosition="below"
          >
            <Button>B</Button>
          </Tooltip>
          <Tooltip
            content={
              <InlineStack gap="200">
                Italic
                <Text as="span" variant="bodyMd" tone="subdued">
                  ⌘I
                </Text>
              </InlineStack>
            }
            preferredPosition="below"
          >
            <Button>I</Button>
          </Tooltip>
          <Tooltip
            content={
              <InlineStack gap="200">
                Underline
                <Text as="span" variant="bodyMd" tone="subdued">
                  ⌘U
                </Text>
              </InlineStack>
            }
            preferredPosition="below"
          >
            <Button>U</Button>
          </Tooltip>
          <Tooltip
            content={
              <InlineStack gap="200">
                Strikethrough
                <Text as="span" variant="bodyMd" tone="subdued">
                  ⌘S
                </Text>
              </InlineStack>
            }
            preferredPosition="below"
          >
            <Button>S</Button>
          </Tooltip>
        </ButtonGroup>
      </InlineStack>
    </Box>
  );
}

export function Alignment() {
  return (
    <Box paddingBlockStart="2400">
      <InlineStack>
        <ButtonGroup variant="segmented" fullWidth>
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
      </InlineStack>
    </Box>
  );
}

export function HasUnderline() {
  return (
    <Box paddingBlockStart="2400">
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
    <Box paddingBlockStart="2400">
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
  const [popoverActive, setPopoverActive] = useState(false);
  const [tooltipActive, setTooltipActive] =
    useState<TooltipProps['active']>(true);

  return (
    <Box paddingBlockStart="2400">
      <InlineStack gap="2400">
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
        <Tooltip
          content="This tooltip should hide when popover is active"
          active={tooltipActive}
        >
          <Text variant="bodyLg" fontWeight="bold" as="span">
            <Popover
              active={popoverActive}
              activator={
                <button
                  onClick={() => {
                    setPopoverActive(true);
                    setTooltipActive(false);
                  }}
                >
                  Popover Activator
                </button>
              }
              autofocusTarget="first-node"
              preferredPosition="below"
              preferredAlignment="left"
              onClose={() => {
                setPopoverActive(false);
                setTooltipActive(true);
              }}
            >
              <div style={{padding: '12px'}}>
                <BlockStack>
                  <Text variant="bodyMd" fontWeight="bold" as="span">
                    popoverActive: {popoverActive.toString()}
                  </Text>
                  <Text variant="bodyMd" fontWeight="bold" as="span">
                    tooltipActive: {tooltipActive?.toString()}
                  </Text>
                </BlockStack>
              </div>
            </Popover>
          </Text>
        </Tooltip>
      </InlineStack>
    </Box>
  );
}
