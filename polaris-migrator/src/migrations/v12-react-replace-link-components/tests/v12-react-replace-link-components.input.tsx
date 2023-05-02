import {Link} from '@shopify/polaris';
import React from 'react';

export function App() {
  const x = false;

  return (
    <>
      <Link url="https://help.shopify.com/">Click Me</Link>
      <Link url={x || `https://help.shopify.com/`}>Click Me</Link>
      <Link monochrome>Click Me</Link>
      <Link monochrome={false}>Click Me</Link>
      <Link removeUnderline>Click Me</Link>
      <Link removeUnderline={false}>Click Me</Link>
    </>
  );
}
