import {Button} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ButtonExample() {
  return <Button icon={PlusIcon} accessibilityLabel="Add theme" />;
}

export default withPolarisExample(ButtonExample);
