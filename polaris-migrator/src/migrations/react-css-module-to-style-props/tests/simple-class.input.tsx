import React from 'react';

import styles, {Bar, Bar as Zip} from './simple-class.input.module.scss';

declare function MyComponent(props: any): JSX.Element;
export function App() {
  return (
    <MyComponent className={[styles.Foo, Zip, Bar]}>Hello world</MyComponent>
  );
}
