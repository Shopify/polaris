import React from 'react';
import {Card} from '@shopify/polaris';

const MyCard = Card;

export function App() {
  return (
    <>
      <div className={styles.Card}>hello</div>
      <Card>hello</Card>
      <MyCard>hello</MyCard>
      <Card content="hello" />
      <Card>
        <Card.Header title="hello" />
        <Card.Header>hello</Card.Header>
        <Card.Section>hello</Card.Section>
        <Card.Subsection>world</Card.Subsection>
      </Card>
    </>
  );
}
