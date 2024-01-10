import React from 'react';
import classNames from 'classnames';

import styles from './compound-class.input.module.scss';
import styles2 from './compound-class.input.module.scss?2';

declare function MyComponent(props: any): JSX.Element;
export function App() {
  return (
    <>
      <MyComponent className={classNames(styles.Foo, styles.Bar)}>
        One
      </MyComponent>
      <MyComponent className={classNames(styles2.Foo, 'zip')}>Two</MyComponent>
    </>
  );
}
