'use client';

import {ExceptionList} from '@shopify/polaris';
import {NoteMinor} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function ExceptionListExample() {
  return (
    <ExceptionList
      items={[
        {
          icon: NoteMinor,
          description:
            'This customer is awesome. Make sure to treat them right!',
        },
      ]}
    />
  );
}

export default withPolarisExample(ExceptionListExample);
