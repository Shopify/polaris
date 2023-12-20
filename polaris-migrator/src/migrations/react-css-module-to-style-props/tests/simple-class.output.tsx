import React from 'react';

import {Box} from '../../../../../polaris-react/src/component/Box';

declare function MyComponent(props: any): JSX.Element;
export function App() {
  return (
    <Box display="flex" color="red" fontWeight="bold">
      <div>Hello world</div>
    </Box>
  );
}
