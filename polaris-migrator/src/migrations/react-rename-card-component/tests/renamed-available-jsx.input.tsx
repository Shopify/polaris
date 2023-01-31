import React from 'react';
import {Card as PolarisCard} from '@shopify/polaris';

const MyCard = PolarisCard;
const Card = () => null;
const CardLegacy = () => null;

export function App() {
  return (
    <>
      <PolarisCard>hello</PolarisCard>
      <MyCard>hello</MyCard>
      <Card>local</Card>
      <CardLegacy>legacy</CardLegacy>
    </>
  );
}
