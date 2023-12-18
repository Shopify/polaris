import React from 'react';

import styles from './compound-array-class.input.module.scss';
import styles2 from './compound-array-class.input-2.module.scss';

declare function MyComponent(props: any): JSX.Element;
export function App() {
  const useFoo = true;
  return (
    <MyComponent
      className={useFoo ? classNames(styles.Foo, styles.Zip) : styles2.Bar}
    >
      Hello world
    </MyComponent>
  );
}
