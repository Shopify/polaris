import React from 'react';
import {Button} from '@shopify/polaris';
import {PhoneMajor} from '@shopify/polaris-icons';

export function App() {
  return (
    <>
      <Button destructive outline disabled>
        Delete App
      </Button>
      <Button icon={PhoneMajor} size="large" monochrome outline>
        Call
      </Button>
      <Button plain>Edit</Button>
      <Button monochrome>Monochrome</Button>
      <Button outline>Outline</Button>
    </>
  );
}
