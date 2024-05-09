import type {InlineStackProps} from '@shopify/polaris';
import {
  BlockStack,
  Button,
  ButtonGroup,
  Icon,
  InlineStack,
  Text,
} from '@shopify/polaris';
import {DeleteIcon} from '@shopify/polaris-icons';
import type {Meta} from '@storybook/react';
import React, {useCallback, useState} from 'react';
s;
export default {
  component: ButtonGroup,
} as Meta<typeof ButtonGroup>;

export const Default = {
  render() {
    return (
      <ButtonGroup>
        <Button>Cancel</Button>
        <Button variant="primary">Save</Button>
      </ButtonGroup>
    );
  },
};

export const WithSegmentedButtons = {
  render() {
    const [activeButtonIndex, setActiveButtonIndex] = useState(0);

    const handleButtonClick = useCallback(
      (index: number) => {
        if (activeButtonIndex === index) return;
        setActiveButtonIndex(index);
      },
      [activeButtonIndex],
    );
    return (
      <div>
        <ButtonGroup variant="segmented">
          <Button size="slim">Bold</Button>
          <Button size="slim" pressed>
            Italic
          </Button>
          <Button size="slim">Underline</Button>
          <Button
            size="slim"
            tone="critical"
            icon={<Icon source={DeleteIcon} />}
            accessibilityLabel="Delete"
          />
        </ButtonGroup>
        <br />
        <ButtonGroup variant="segmented">
          <Button
            pressed={activeButtonIndex === 0}
            onClick={() => handleButtonClick(0)}
          >
            Mercury
          </Button>
          <Button
            pressed={activeButtonIndex === 1}
            onClick={() => handleButtonClick(1)}
          >
            Venus
          </Button>
          <Button
            pressed={activeButtonIndex === 2}
            onClick={() => handleButtonClick(2)}
          >
            Earth
          </Button>
          <Button
            pressed={activeButtonIndex === 3}
            onClick={() => handleButtonClick(3)}
          >
            Mars
          </Button>
          <Button
            pressed={activeButtonIndex === 4}
            onClick={() => handleButtonClick(4)}
          >
            Jupiter
          </Button>
          <Button
            pressed={activeButtonIndex === 5}
            onClick={() => handleButtonClick(5)}
          >
            Saturn
          </Button>
          <Button
            pressed={activeButtonIndex === 6}
            onClick={() => handleButtonClick(6)}
          >
            Uranus
          </Button>
          <Button
            pressed={activeButtonIndex === 7}
            onClick={() => handleButtonClick(7)}
          >
            Neptune
          </Button>
        </ButtonGroup>
        <br />
        <ButtonGroup variant="segmented" fullWidth>
          <Button
            pressed={activeButtonIndex === 8}
            onClick={() => handleButtonClick(8)}
          >
            Bold
          </Button>
          <Button
            pressed={activeButtonIndex === 9}
            onClick={() => handleButtonClick(9)}
          >
            Italic
          </Button>
          <Button
            pressed={activeButtonIndex === 10}
            onClick={() => handleButtonClick(10)}
          >
            Underline
          </Button>
        </ButtonGroup>
      </div>
    );
  },
};

export const OutlineWithSegmentedButtons = {
  render() {
    return (
      <ButtonGroup variant="segmented">
        <Button>Bold</Button>
        <Button>Italic</Button>
        <Button>Underline</Button>
      </ButtonGroup>
    );
  },
};

export const WithAllGaps = {
  render() {
    return (
      <BlockStack gap="400">
        <ButtonGroup gap="extraTight" connectedTop>
          <Button>Bold</Button>
          <Button>Italic</Button>
          <Button>Underline</Button>
        </ButtonGroup>
        <ButtonGroup gap="tight">
          <Button>Bold</Button>
          <Button>Italic</Button>
          <Button>Underline</Button>
        </ButtonGroup>
        <ButtonGroup gap="loose">
          <Button>Bold</Button>
          <Button>Italic</Button>
          <Button>Underline</Button>
        </ButtonGroup>
      </BlockStack>
    );
  },
};

export const WithStack = {
  render() {
    return (
      <BlockStack gap="400">
        <ResponsiveStack align="space-between">
          <Text>Some start text</Text>
          <ResponsiveButtonStack>
            <Button>Bold</Button>
            <Button>Italic</Button>
            <Button>Underline</Button>
          </ResponsiveButtonStack>
        </ResponsiveStack>
        <ResponsiveStack gap={{xs: 800, md: 100}}>
          <Button>Bold</Button>
          <Button>Italic</Button>
          <Button>Underline</Button>
        </ResponsiveStack>
        <ResponsiveStack align="start">
          <Button>Bold</Button>
          <Button>Italic</Button>
          <Button>Underline</Button>
        </ResponsiveStack>
        <ResponsiveStack gap="800">
          <Button>Bold</Button>
          <Button>Italic</Button>
          <Button>Underline</Button>
        </ResponsiveStack>
      </BlockStack>
    );
  },
};

export const NoWrapButtons = {
  render() {
    return (
      <>
        <Text as="p" variant="bodyMd">
          Default
        </Text>
        <div
          style={{
            width: '300px',
            border: '2px solid blue',
            padding: '10px',
            overflowX: 'scroll',
          }}
        >
          <ButtonGroup>
            <Button>Fifth</Button>
            <Button>Fourth</Button>
            <Button>Third</Button>
            <Button>Second</Button>
            <Button variant="primary">First</Button>
          </ButtonGroup>
        </div>
        <br />
        <Text as="p" variant="bodyMd">
          With noWrap
        </Text>
        <div
          style={{
            width: '300px',
            border: '2px solid blue',
            padding: '10px',
            overflowX: 'scroll',
          }}
        >
          <ButtonGroup noWrap>
            <Button>Fifth</Button>
            <Button>Fourth</Button>
            <Button>Third</Button>
            <Button>Second</Button>
            <Button variant="primary">First</Button>
          </ButtonGroup>
        </div>
      </>
    );
  },
};

function ResponsiveStack({
  children,
  align = 'end',
  blockAlign = 'center',
  gap = {xs: '200', md: '100'},
  ...rest
}: InlineStackProps) {
  return (
    <InlineStack
      direction={{xs: 'column', sm: 'row'}}
      align={align}
      gap={gap}
      blockAlign={{md: blockAlign}}
      {...rest}
    >
      {children}
    </InlineStack>
  );
}

function ResponsiveButtonStack({...rest}: InlineStackProps) {
  return (
    <ResponsiveButtonStack
      {...rest}
      direction={{xs: 'column-reverse', sm: 'row'}}
    />
  );
}
