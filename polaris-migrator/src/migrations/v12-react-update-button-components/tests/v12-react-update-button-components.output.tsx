import React from 'react';
import {Button} from '@shopify/polaris';
import {PhoneMajor} from '@shopify/polaris-icons';

const MyButton = Button;

export function App() {
  return (
    <>
      <MyButton destructive>hello</MyButton>
      <Button destructive disabled={true}>
        Delete App
      </Button>
      <Button icon={PhoneMajor} size="large" monochrome>
        Call
      </Button>
    </>
  );
}
