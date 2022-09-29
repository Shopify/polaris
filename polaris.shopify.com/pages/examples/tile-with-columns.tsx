import React from 'react';
import {Tile, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

const styles = {
  background: 'var(--p-surface)',
  border: 'var(--p-border-base)',
  borderRadius: 'var(--p-border-radius-2)',
  padding: 'var(--p-space-4)',
};

const children = Array.from(Array(8)).map((ele, index) => (
  <div key={index} style={styles}>
    <Text as="h2" variant="headingMd">
      Sales
    </Text>
    <Text as="p" variant="bodyMd">
      View a summary of your online store’s sales.
    </Text>
  </div>
));

function TileWithColumnsExample() {
  return (
    <div style={{width: '500px'}}>
      <Tile columns={{xs: 4}} gap={{xs: '2'}}>
        {children}
      </Tile>
    </div>
  );
}

export default withPolarisExample(TileWithColumnsExample);
