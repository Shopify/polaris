import React from 'react';
import {Avatar} from '@shopify/polaris';

export function App() {
  return (
    <>
      <Avatar customer size={undefined} />
      <Avatar customer size="extraSmall" />
      <Avatar customer size="small" />
      <Avatar customer size="medium" />
      <Avatar customer size="large" />
      <Avatar size="xl-experimental" />
      <Avatar size="2xl-experimental" />
    </>
  );
}
