import React from 'react';
import {Box} from '../../../../../../polaris-react/src/components/Box';

import classNames from 'classnames';
import styles2 from './compound-class.input.module.scss?2';

declare function MyComponent(props: any): JSX.Element;
export function App() {
  return (
    <>
      <Box display="block" color="green" fontWeight="bold" borderRadius="4px">
        One
      </Box>
      <MyComponent className={classNames(styles2.Foo, 'zip')}>Two</MyComponent>
    </>
  );
}
