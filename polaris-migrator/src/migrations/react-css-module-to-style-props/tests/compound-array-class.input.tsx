import React from 'react';

import styles from './compound-array-class.input.module.scss';

declare function MyComponent(props: any): JSX.Element;
export function App() {
  return (
    <MyComponent className={[styles.Foo, styles.Bar]}>Hello world</MyComponent>
  );
}
