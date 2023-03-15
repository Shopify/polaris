import type {ComponentMeta} from '@storybook/react';
import {Button, ButtonGroup} from '@shopify/polaris';

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
  return (
    <ButtonGroup segmented>
      <Button>Bold</Button>
      <Button>Italic</Button>
      <Button>Underline</Button>
    </ButtonGroup>
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
          <Button>Fourth</Button>
          <Button>Third</Button>
          <Button>Second</Button>
          <Button primary>First</Button>
        </ButtonGroup>
      </div>
    </>
  );
}
