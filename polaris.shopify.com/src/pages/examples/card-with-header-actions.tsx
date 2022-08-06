import {Card} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function CardExample() {
  return (
    <Card sectioned title="Variants" actions={[{content: 'Add variant'}]}>
      <p>
        Add variants if this product comes in multiple versions, like different
        sizes or colors.
      </p>
    </Card>
  );
}

export default withPolarisExample(CardExample);
