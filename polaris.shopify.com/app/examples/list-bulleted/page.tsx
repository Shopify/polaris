'use client';

import {List} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function ListExample() {
  return (
    <List type="bullet">
      <List.Item>Yellow shirt</List.Item>
      <List.Item>Red shirt</List.Item>
      <List.Item>Green shirt</List.Item>
    </List>
  );
}

export default withPolarisExample(ListExample);
