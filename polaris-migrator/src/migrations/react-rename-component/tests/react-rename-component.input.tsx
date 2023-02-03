import React from 'react';
import {Card} from '@shopify/polaris';

const MyCard = Card;

export function App() {
  return (
    <>
      <div className={styles.Card}>hello</div>
      <Card>hello</Card>
      <MyCard>hello</MyCard>
      <Card>
        <Card.Header>hello</Card.Header>
        <Card.Section>hello</Card.Section>
        <Card.Subsection>world</Card.Subsection>
      </Card>
    </>
  );
}
