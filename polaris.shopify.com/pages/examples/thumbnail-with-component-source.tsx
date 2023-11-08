import {Thumbnail} from '@shopify/polaris';
import {NoteIcon} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ThumbnailExample() {
  return <Thumbnail source={NoteIcon} size="large" alt="Small document" />;
}

export default withPolarisExample(ThumbnailExample);
