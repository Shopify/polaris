'use client';

import {Pagination} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function PaginationExample() {
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

export default withPolarisExample(PaginationExample);
