import React from 'react';
import {LegacyCard} from '@shopify/polaris';

const MyCard = LegacyCard;

export function App() {
  return (
    <>
      <LegacyCard>hello</LegacyCard>
      <MyCard>hello</MyCard>
    </>
  );
}
