import React from 'react';

import styles, {Bar} from './simple-class.input.module.scss';

declare function MyComponent(props: any): JSX.Element;
export function App() {
  return <MyComponent className={[styles.Foo, Bar]}>Hello world</MyComponent>;
}
