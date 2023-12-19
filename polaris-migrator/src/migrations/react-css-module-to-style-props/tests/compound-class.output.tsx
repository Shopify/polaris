import React from 'react';
import classNames from 'classnames';

import styles2 from './compound-class.input.module.scss?2';

declare function MyComponent(props: any): JSX.Element;
export function App() {
  return (
    <>
      <MyComponent
        display="block"
        color="green"
        fontWeight="bold"
        borderRadius="4px"
      >
        One
      </MyComponent>
      {/* Couldn't merge all styles:
    <MyComponent className={classNames({
      display: "flex",
      color: "red",
      fontWeight: "bold"
    }, 'zip')}>Two</MyComponent> */}
      <MyComponent className={classNames(styles2.Foo, 'zip')}>Two</MyComponent>
    </>
  );
}
