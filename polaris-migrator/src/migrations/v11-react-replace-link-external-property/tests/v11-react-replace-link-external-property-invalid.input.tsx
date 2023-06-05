import {Link} from '@shopify/polaris';
import React from 'react';

export function App() {
  const condition = false;

  return (
    <>
      <Link external={false}>Click Me</Link>
      <Link external={condition}>Click Me</Link>
    </>
  );
}
