import React from 'react';
import {Button} from '@shopify/polaris';
import {PhoneMajor} from '@shopify/polaris-icons';

export function App() {
  const isPolarisUplift = true;
  return (
    <>
      <Button variant="tertiary">Edit</Button>
      <Button variant="tertiary">Edit</Button>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Button plain primary={isPolarisUplift}>
        Edit
      </Button>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Button plain={isPolarisUplift} primary>
        Edit
      </Button>
      <Button icon={PhoneMajor} variant="tertiary" />
    </>
  );
}
