import type {LinkProps} from '@shopify/polaris';
import {Link} from '@shopify/polaris';
import React from 'react';

export function App() {
  const condition = false;

  const linkProps: /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  LinkProps = {
    external: true,
  };

  const MyLink =
    /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
    Link;

  return (
    <>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Link external={false}>Click Me</Link>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Link external={condition}>Click Me</Link>
      <MyLink external>My link</MyLink>
    </>
  );
}
