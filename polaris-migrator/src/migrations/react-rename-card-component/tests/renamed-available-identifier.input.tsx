import React from 'react';
import {Card as PolarisCard} from '@shopify/polaris';

const MyCard = PolarisCard;
export const CardLegacy = () => null;

export function App() {
  return (
    <>
      <PolarisCard>hello</PolarisCard>
      <MyCard>hello</MyCard>
    </>
  );
}
