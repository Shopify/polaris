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
        previousTooltip="Previous (J)"
        onPrevious={() => {
          console.log('Previous');
        }}
        hasNext
        nextKeys={[75]}
        nextTooltip="Next (K)"
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
        maxWidth: 'calc(700px + (2 * var(--p-space-400)))',
        margin: '0 auto',
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

export function WithTableTypeAndNoLabel() {
  return (
    <div
      style={{
        maxWidth: 'calc(700px + (2 * var(--p-space-400)))',
        margin: '0 auto',
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
        hasPrevious
      />
    </div>
  );
}
