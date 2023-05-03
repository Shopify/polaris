import {Link} from '@shopify/polaris';
import React from 'react';

export function App() {
  const condition = false;

  return (
    <>
      <Link url="https://help.shopify.com/">Click Me</Link>
      <Link href={condition || `https://help.shopify.com/`}>Click Me</Link>
      <Link monochrome>Click Me</Link>
      <Link removeUnderline>Click Me</Link>
      <Link external>Click Me</Link>
    </>
  );
}
