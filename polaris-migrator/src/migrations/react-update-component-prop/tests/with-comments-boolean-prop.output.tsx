import React from 'react';

declare function MyComponent(props: any): JSX.Element;
declare const mySpreadProps: {[key: string]: any};
declare const myProp: boolean;

export function App() {
  return (
    <>
      <MyComponent foo="bar" newProp="new-value">
        Hello world
      </MyComponent>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <MyComponent foo="bar" booleanProp {...mySpreadProps}>
        Hello world
      </MyComponent>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <MyComponent foo="bar" booleanProp={myProp}>
        Hello world
      </MyComponent>
    </>
  );
}
