import {DropZone} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function DropZoneExample() {
  return (
    <DropZone label="Theme files">
      <DropZone.FileUpload />
    </DropZone>
  );
}

export default withPolarisExample(DropZoneExample);
