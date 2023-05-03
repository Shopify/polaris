import {Link} from '@shopify/polaris';
import React from 'react';

export function App() {
  const condition = false;

  return (
    <>
      <Link href="https://help.shopify.com/">Click Me</Link>
      <Link href={condition || `https://help.shopify.com/`}>Click Me</Link>
      <Link tone="inherit">Click Me</Link>
      <Link>Click Me</Link>
      <Link target="_blank">Click Me</Link>
    </>
  );
}
