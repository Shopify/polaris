import React from 'react';
import {Button} from '@shopify/polaris';
import {PhoneMajor} from '@shopify/polaris-icons';

const MyButton = Button;

export function App() {
  return (
    <>
      <MyButton outline destructive>
        hello
      </MyButton>
      <Button destructive outline disabled={true}>
        Delete App
      </Button>
      <Button icon={PhoneMajor} size="large" monochrome outline>
        Call
      </Button>
    </>
  );
}
