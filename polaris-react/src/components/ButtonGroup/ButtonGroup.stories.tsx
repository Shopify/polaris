import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Button, ButtonGroup, Icon} from '@shopify/polaris';
import {DeleteMinor} from '@shopify/polaris-icons';

export default {
  component: ButtonGroup,
} as ComponentMeta<typeof ButtonGroup>;

export function Default() {
  return (
    <ButtonGroup>
      <Button>Cancel</Button>
      <Button primary>Save</Button>
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
      <ButtonGroup segmented>
        <Button size="slim">Bold</Button>
        <Button size="slim" pressed>
          Italic
        </Button>
        <Button size="slim">Underline</Button>
        <Button
          size="slim"
          icon={<Icon source={DeleteMinor} />}
          accessibilityLabel="Delete"
        />
      </ButtonGroup>
      <br />
      <ButtonGroup segmented>
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
    </div>
  );
}

export function OutlineWithSegmentedButtons() {
  return (
    <ButtonGroup segmented>
      <Button outline>Bold</Button>
      <Button outline>Italic</Button>
      <Button outline>Underline</Button>
    </ButtonGroup>
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
          <Button primary>First</Button>
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
          <Button primary>First</Button>
        </ButtonGroup>
      </div>
    </>
  );
}
