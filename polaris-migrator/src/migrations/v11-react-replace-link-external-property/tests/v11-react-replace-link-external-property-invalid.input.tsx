import type {LinkProps} from '@shopify/polaris';
import {Link} from '@shopify/polaris';
import React from 'react';

export function App() {
  const condition = false;

  const linkProps: LinkProps = {
    external: true,
  };

  const MyLink = Link;

  return (
    <>
      <Link external={false}>Click Me</Link>
      <Link external={condition}>Click Me</Link>
      <MyLink external>My link</MyLink>
    </>
  );
}
