import React from 'react';
import {
  // @ts-expect-error
  MyComponentA,
  // @ts-expect-error
  MyComponentB as MyComponentBAlias,
} from '@shopify/polaris';

declare function Child(props: any): JSX.Element;

const MyComponentAWrapper = MyComponentA;

export function App() {
  return (
    <>
      <MyComponentA prop1="value-1" prop2 foo="bar">
        Hello
        <Child prop1="value-1" prop2 />
        <MyComponentAWrapper />
      </MyComponentA>
      <MyComponentBAlias prop3="value-3" foo="bar">
        Hello
        <Child prop3="value-3" />
        <MyComponentAWrapper />
      </MyComponentBAlias>
    </>
  );
}
