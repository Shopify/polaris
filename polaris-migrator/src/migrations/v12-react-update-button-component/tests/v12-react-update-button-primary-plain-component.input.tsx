import React from 'react';
import {Button} from '@shopify/polaris';
import {Phone} from '@shopify/polaris-icons';

export function App() {
  const isPolarisUplift = true;
  return (
    <>
      <Button plain primary>
        Edit
      </Button>
      <Button primary plain>
        Edit
      </Button>
      <Button plain primary={isPolarisUplift}>
        Edit
      </Button>
      <Button plain={isPolarisUplift} primary>
        Edit
      </Button>
      <Button icon={Phone} plain primary />
    </>
  );
}
