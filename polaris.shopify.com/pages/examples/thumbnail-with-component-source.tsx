import {Thumbnail} from '@shopify/polaris';
import {Note} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ThumbnailExample() {
  return <Thumbnail source={Note} size="large" alt="Small document" />;
}

export default withPolarisExample(ThumbnailExample);
