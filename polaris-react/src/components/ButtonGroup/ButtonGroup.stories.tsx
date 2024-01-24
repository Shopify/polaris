import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Button, ButtonGroup, Icon, BlockStack} from '@shopify/polaris';
import {DeleteIcon} from '@shopify/polaris-icons';

export default {
  component: ButtonGroup,
} as ComponentMeta<typeof ButtonGroup>;

export function Default() {
  return (
    <ButtonGroup>
      <Button>Cancel</Button>
      <Button variant="primary">Save</Button>
    </ButtonGroup>
  );
}

export function WithSegmentedButtons() {
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
        <Button>Bold</Button>
        <Button>Italic</Button>
        <Button>Underline</Button>
      </ButtonGroup>
    </div>
  );
}

export function OutlineWithSegmentedButtons() {
  return (
    <ButtonGroup variant="segmented">
      <Button>Bold</Button>
      <Button>Italic</Button>
      <Button>Underline</Button>
    </ButtonGroup>
  );
}

export function WithAllGaps() {
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
}

export function NoWrapButtons() {
  return (
    <>
      <p>Default</p>
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
      <p>With noWrap</p>
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
}
