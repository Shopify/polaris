import {Link} from '@shopify/polaris';
import React from 'react';

export function App() {
  const condition = false;

  return (
    <>
      <Link monochrome={false}>Click Me</Link>
      <Link monochrome={condition ? 'true' : 'false'}>Click Me</Link>
      <Link external={false}>Click Me</Link>
      <Link external={condition ? 'true' : 'false'}>Click Me</Link>
    </>
  );
}
