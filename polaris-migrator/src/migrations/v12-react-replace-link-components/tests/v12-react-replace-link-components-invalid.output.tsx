import {Link} from '@shopify/polaris';
import React from 'react';

export function App() {
  const condition = false;

  return (
    <>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Link monochrome={false}>Click Me</Link>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Link monochrome={condition ? 'true' : 'false'}>Click Me</Link>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Link external={false}>Click Me</Link>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Link external={condition ? 'true' : 'false'}>Click Me</Link>
    </>
  );
}
