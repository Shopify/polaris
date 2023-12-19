import React from 'react';
import classNames from 'classnames';

import styles from './ternary.input.module.scss';
import styles2 from './ternary.input.module.scss?2';

declare function MyComponent(props: any): JSX.Element;
export function App() {
  const useFoo = true;
  return (
    /* Couldn't merge all styles:
    <MyComponent
      className={useFoo ? {
        display: "block",
        color: "red",
        fontWeight: "bold"
      } : {
        display: "block"
      }}
    >
      Hello world
    </MyComponent> */
    <MyComponent
      className={useFoo ? classNames(styles.Foo, styles.Bar) : styles2.Bar}
    >
      Hello world
    </MyComponent>
  );
}
