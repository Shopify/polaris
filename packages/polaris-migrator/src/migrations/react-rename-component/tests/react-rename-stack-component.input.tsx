import React from 'react';
import {Stack} from '@shopify/polaris';

const MyStack = Stack;

export function App() {
  return (
    <>
      <div className={styles.Stack}>hello</div>
      <Stack>hello</Stack>
      <MyStack>hello</MyStack>
      <Stack>
        <Stack.Header>hello</Stack.Header>
        <Stack.Section>hello</Stack.Section>
        <Stack.Subsection>world</Stack.Subsection>
      </Stack>
    </>
  );
}
