import React from 'react';
import {Card} from '@shopify/polaris';

const MyCard = Card;

export function App() {
  return (
    <>
      <Card>hello</Card>
      <MyCard>hello</MyCard>
    </>
  );
}
