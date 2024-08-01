import React from 'react';
import {
  // @ts-expect-error
  MyComponentA,
  // @ts-expect-error
  MyComponentB as MyComponentBAlias,
} from '@shopify/polaris';

declare function Child(props: any): JSX.Element;

const MyComponentAWrapper =
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  MyComponentA;

export function App() {
  return (
    <>
      <MyComponentA newProp1="new-value-1" newProp2="new-value-2" foo="bar">
        Hello
        <Child prop1="value-1" prop2 />
        <MyComponentAWrapper />
      </MyComponentA>
      <MyComponentBAlias newProp3="new-value-3" foo="bar">
        Hello
        <Child prop3="value-3" />
        <MyComponentAWrapper />
      </MyComponentBAlias>
    </>
  );
}
