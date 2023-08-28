import React from 'react';
import {Button} from '@shopify/polaris';
import {PhoneMajor} from '@shopify/polaris-icons';

export function App() {
  return (
    <>
      <Button destructive disabled>
        Delete App
      </Button>
      <Button icon={PhoneMajor} size="large" monochrome>
        Call
      </Button>
      <Button plain monochrome>
        Edit
      </Button>
      <Button plain>Edit</Button>
    </>
  );
}
