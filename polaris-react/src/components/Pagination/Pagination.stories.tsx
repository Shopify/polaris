import type {ComponentMeta} from '@storybook/react';
import {Pagination} from '@shopify/polaris';

export default {
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

export function Default() {
  return (
    <Pagination
      hasPrevious
      onPrevious={() => {
        console.log('Previous');
      }}
      hasNext
      onNext={() => {
        console.log('Next');
      }}
    />
  );
}

export function WithKeyboardNavigation() {
  return (
    <div style={{height: '100px'}}>
      <Pagination
        hasPrevious
        previousKeys={[74]}
        previousTooltip="j"
        onPrevious={() => {
          console.log('Previous');
        }}
        hasNext
        nextKeys={[75]}
        nextTooltip="k"
        onNext={() => {
          console.log('Next');
        }}
      />
    </div>
  );
}

export function WithLabel() {
  return (
    <Pagination
      label="Results"
      hasPrevious
      onPrevious={() => {
        console.log('Previous');
      }}
      hasNext
      onNext={() => {
        console.log('Next');
      }}
    />
  );
}
