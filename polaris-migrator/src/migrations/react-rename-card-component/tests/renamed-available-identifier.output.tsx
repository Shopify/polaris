import React from 'react';
import {Card as PolarisCard} from '@shopify/polaris';

const MyCard = PolarisCard;
export const /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  CardLegacy = () => null;

export function App() {
  return (
    <>
      <PolarisCard>hello</PolarisCard>
      <MyCard>hello</MyCard>
    </>
  );
}
