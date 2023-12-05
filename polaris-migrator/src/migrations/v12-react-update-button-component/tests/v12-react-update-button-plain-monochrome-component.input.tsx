import React from 'react';
import {Button} from '@shopify/polaris';
import {PhoneMajor} from '@shopify/polaris-icons';

export function App() {
  const isPolarisUplift = true;
  return (
    <>
      <Button plain monochrome>
        Edit
      </Button>
      <Button monochrome plain>
        Edit
      </Button>
      <Button monochrome plain primary>
        Edit
      </Button>
      <Button plain monochrome={isPolarisUplift}>
        Edit
      </Button>
      <Button plain={isPolarisUplift} monochrome>
        Edit
      </Button>
      <Button icon={PhoneMajor} plain monochrome />
    </>
  );
}
