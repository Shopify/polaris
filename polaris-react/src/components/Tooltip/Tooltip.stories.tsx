import React from 'react';
import {QuestionMarkMinor} from '@shopify/polaris-icons';
import type {ComponentMeta} from '@storybook/react';
import {
  Button,
  ButtonGroup,
  Icon,
  Stack,
  TextField,
  Text,
  Tooltip,
} from '@shopify/polaris';

export default {
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

export function Default() {
  return (
    <Tooltip active content="This order has shipping labels.">
      <Text variant="bodyLg" fontWeight="bold" as="span">
        Order #1001
      </Text>
    </Tooltip>
  );
}

export function Width() {
  return (
    <Stack spacing="extraLoose" distribution="fill">
      <Tooltip active content="This content has the default width">
        <Stack spacing="extraTight">
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
        </Stack>
      </Tooltip>

      <Tooltip active content="This content has the wide width" width="wide">
        <Stack spacing="extraTight">
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
        </Stack>
      </Tooltip>
    </Stack>
  );
}

export function Padding() {
  return (
    <Stack spacing="extraLoose" distribution="fill">
      <Tooltip active content="This content has default padding">
        <Stack spacing="extraTight">
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
        </Stack>
      </Tooltip>

      <Tooltip
        active
        content="This content has padding of 4 (space-4 / 16px)"
        padding="4"
      >
        <Stack spacing="extraTight">
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
        </Stack>
      </Tooltip>
    </Stack>
  );
}

export function BorderRadius() {
  return (
    <Stack spacing="extraLoose" distribution="fill">
      <Tooltip
        active
        content="This content has the default (radius-1) border radius"
      >
        <Stack spacing="extraTight">
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
        </Stack>
      </Tooltip>

      <Tooltip
        active
        content="This content has a border radius of 2 (radius-2)"
        borderRadius="2"
      >
        <Stack spacing="extraTight">
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
        </Stack>
      </Tooltip>
    </Stack>
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

export function WithHoverDelay() {
  return (
    <Stack vertical>
      <Stack vertical>
        <Text variant="headingMd" fontWeight="bold" as="h1">
          TEXT EXAMPLE
        </Text>
        <Stack>
          <Tooltip content="This should appear right away.">
            <Text variant="bodyMd" fontWeight="semibold" as="span">
              No delay
            </Text>
          </Tooltip>
        </Stack>
        <Stack>
          <Tooltip
            hoverDelay={1000}
            content="This should appear after 1 second."
          >
            <Text variant="bodyMd" fontWeight="semibold" as="span">
              1 second hover delay
            </Text>
          </Tooltip>
        </Stack>
      </Stack>

      <Stack vertical>
        <Text variant="headingMd" fontWeight="bold" as="h1">
          BUTTON EXAMPLE
        </Text>
        <Stack>
          <Tooltip content="This should appear right away.">
            <Button>No delay</Button>
          </Tooltip>
        </Stack>
        <Stack>
          <Tooltip
            hoverDelay={2000}
            content="This should appear after 2 seconds."
          >
            <Button>2 seconds hover delay</Button>
          </Tooltip>
        </Stack>
      </Stack>
    </Stack>
  );
}

export function ActivatorAsDiv() {
  return (
    <Tooltip
      active
      content="This tooltip is rendered as a div"
      activatorWrapper="div"
    >
      <Text variant="bodyLg" fontWeight="bold" as="span">
        Order #1001
      </Text>
    </Tooltip>
  );
}

export function IconTooltips() {
  return (
    <Stack>
      <Tooltip mode="icon" content="Bold">
        <Text variant="bodyMd" fontWeight="semibold" as="span">
          1 second hover delay
        </Text>
      </Tooltip>
      <Tooltip mode="icon" content="Italic">
        <Text variant="bodyMd" fontWeight="semibold" as="span">
          1 second hover delay
        </Text>
      </Tooltip>
    </Stack>
  );
}

export function HasUnderline() {
  return (
    <Tooltip active content="This tooltip has an underline" hasUnderline>
      <Text variant="bodyLg" fontWeight="bold" as="span">
        Order #1001
      </Text>
    </Tooltip>
  );
}

export function PersistOnClick() {
  return (
    <Tooltip content="This tooltip can be clicked to stay open" persistOnClick>
      <Text variant="bodyLg" fontWeight="bold" as="span">
        Order #1001
      </Text>
    </Tooltip>
  );
}
