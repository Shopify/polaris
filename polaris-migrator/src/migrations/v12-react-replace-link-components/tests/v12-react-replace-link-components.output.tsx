import {Link} from '@shopify/polaris';
import React from 'react';

export function App() {
  const x = false;

  return (
    <>
      <Link href="https://help.shopify.com/">Click Me</Link>
      <Link href={x || `https://help.shopify.com/`}>Click Me</Link>
      <Link tone="inherit">Click Me</Link>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Link monochrome={false}>Click Me</Link>
      <Link underline="none">Click Me</Link>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Link removeUnderline={false}>Click Me</Link>
    </>
  );
}
