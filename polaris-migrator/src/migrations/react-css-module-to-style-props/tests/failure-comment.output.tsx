import React from 'react';
import classNames from 'classnames';

import styles from './compound-class.input.module.scss';

declare function MyComponent(props: any): JSX.Element;
export function App() {
  return (
    <>
      {/* Couldn't merge all styles:
    <Box className="foo">Hello world</Box> */}
      <MyComponent className="foo">Hello world</MyComponent>
      {/* Couldn't merge all styles:
    <Box
      className={classNames({
        display: "flex",
        color: "red",
        fontWeight: "bold"
      }, 'zip')}>Two</Box> */}
      <MyComponent className={classNames(styles.Foo, 'zip')}>Two</MyComponent>
    </>
  );
}
