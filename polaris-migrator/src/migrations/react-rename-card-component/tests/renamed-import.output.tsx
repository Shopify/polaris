import React from 'react';
import {CardLegacy} from '@shopify/polaris';

const MyCard = CardLegacy;

export function App() {
  return (
    <>
      <CardLegacy>hello</CardLegacy>
      <MyCard>hello</MyCard>
    </>
  );
}
