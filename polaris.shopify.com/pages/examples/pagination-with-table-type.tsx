import {Pagination} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PaginationExample() {
  return (
    <div
      style={{
        maxWidth: '700px',
        margin: 'auto',
        border: '1px solid var(--p-color-border)'
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

export default withPolarisExample(PaginationExample);
