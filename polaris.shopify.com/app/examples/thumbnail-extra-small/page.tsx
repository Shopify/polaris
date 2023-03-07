'use client';

import {Thumbnail} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function ThumbnailExample() {
  return (
    <Thumbnail
      source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
      size="extraSmall"
      alt="Black choker necklace"
    />
  );
}

export default withPolarisExample(ThumbnailExample);
