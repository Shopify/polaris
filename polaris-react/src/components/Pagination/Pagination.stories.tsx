import React from 'react';
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

export function WithTableType() {
  return (
    <div
      style={{
        maxWidth: 'calc(700px + (2 * var(--p-space-4)))',
        margin: '0 auto',
        border: '1px solid var(--p-color-border)',
      }}
    >
      <Pagination
        onPrevious={() => {
          console.log('Previous');
        }}
        onNext={() => {
          console.log('Next');
        }}
        type="table"
        hasNext
        label="1-50 of 8,450 orders"
      />
    </div>
  );
}
