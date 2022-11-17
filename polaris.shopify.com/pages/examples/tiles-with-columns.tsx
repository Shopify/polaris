import React from 'react';
import {Tiles, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TilesWithColumnsExample() {
  return (
    <Tiles columns={{xs: 3}} gap={{xs: '4'}}>
      <Placeholder label="01" />
      <Placeholder label="02" />
      <Placeholder label="03" />
      <Placeholder label="04" />
      <Placeholder label="05" />
      <Placeholder label="06" />
      <Placeholder label="07" />
    </Tiles>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: '#7B47F1',
        padding: 'var(--p-space-2)',
        height: height,
        width: width,
      }}
    >
      <div
        style={{
          color: '#FFFFFF',
        }}
      >
        <Text as="h2" variant="bodyMd" fontWeight="medium">
          {label}
        </Text>
      </div>
    </div>
  );
};

export default withPolarisExample(TilesWithColumnsExample);
