import React from 'react';
import {Avatar} from '@shopify/polaris';

export function App() {
  return (
    <>
      <Avatar customer size={undefined} />
      <Avatar customer size="xs" />
      <Avatar customer size="sm" />
      <Avatar customer size="md" />
      <Avatar customer size="lg" />
      <Avatar size="xl" />
      <Avatar size="xl" />
    </>
  );
}
