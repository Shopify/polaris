import React from 'react';
import {Card as PolarisCard} from '@shopify/polaris';

const MyCard = PolarisCard;
const Card = () => null;
const LegacyCard = () => null;

export function App() {
  return (
    <>
      <PolarisCard>hello</PolarisCard>
      <MyCard>hello</MyCard>
      <Card>local</Card>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <LegacyCard>legacy</LegacyCard>
    </>
  );
}
