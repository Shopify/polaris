import React from 'react';
import classNames from 'classnames';

import styles from './compound-class.input.module.scss';

declare function MyComponent(props: any): JSX.Element;
export function App() {
  return (
    <>
      <MyComponent className="foo">Hello world</MyComponent>
      <MyComponent className={classNames(styles.Foo, 'zip')}>Two</MyComponent>
    </>
  );
}
