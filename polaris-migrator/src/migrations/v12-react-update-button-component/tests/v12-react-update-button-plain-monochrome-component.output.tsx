import React from 'react';
import {Button} from '@shopify/polaris';
import {PhoneMajor} from '@shopify/polaris-icons';

export function App() {
  const isPolarisUplift = true;
  return (
    <>
      <Button variant="monochromePlain">Edit</Button>
      <Button variant="monochromePlain">Edit</Button>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Button monochrome plain primary>
        Edit
      </Button>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Button plain monochrome={isPolarisUplift}>
        Edit
      </Button>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Button plain={isPolarisUplift} monochrome>
        Edit
      </Button>
      <Button icon={PhoneMajor} variant="monochromePlain" />
    </>
  );
}
