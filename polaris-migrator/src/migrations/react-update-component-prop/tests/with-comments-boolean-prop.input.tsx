import React from 'react';

declare function MyComponent(props: any): JSX.Element;
declare const mySpreadProps: {[key: string]: any};
declare const myProp: boolean;

export function App() {
  return (
    <>
      <MyComponent foo="bar" booleanProp>
        Hello world
      </MyComponent>
      <MyComponent foo="bar" booleanProp {...mySpreadProps}>
        Hello world
      </MyComponent>
      <MyComponent foo="bar" booleanProp={myProp}>
        Hello world
      </MyComponent>
    </>
  );
}
