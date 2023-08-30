import React from 'react';
import {Button} from '@shopify/polaris';
import {PhoneMajor} from '@shopify/polaris-icons';

export function App() {
  return (
    <>
      <Button disabled tone="critical">
        Delete App
      </Button>
      <Button icon={PhoneMajor} size="large">
        Call
      </Button>
      <Button variant="plain">Edit</Button>
      <Button>Monochrome</Button>
      <Button>Outline</Button>
      <Button tone="critical" variant="primary">
        Destructive
      </Button>
      <Button tone="critical">Destructive outline</Button>
      <Button tone="critical" variant="plain">
        Destructive plain
      </Button>
    </>
  );
}
