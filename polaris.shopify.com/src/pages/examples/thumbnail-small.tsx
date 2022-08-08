import {Thumbnail} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function ThumbnailExample() {
  return (
    <Thumbnail
      source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
      size="small"
      alt="Black choker necklace"
    />
  );
}

export default withPolarisExample(ThumbnailExample);
