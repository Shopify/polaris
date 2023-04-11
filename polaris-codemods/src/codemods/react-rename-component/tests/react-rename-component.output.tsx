import React from 'react';
import {LegacyCard} from '@shopify/polaris';

const MyCard = LegacyCard;

export function App() {
  return (
    <>
      <div className={styles.Card}>hello</div>
      <LegacyCard>hello</LegacyCard>
      <MyCard>hello</MyCard>
      <LegacyCard content="hello" />
      <LegacyCard>
        <LegacyCard.Header title="hello" />
        <LegacyCard.Header>hello</LegacyCard.Header>
        <LegacyCard.Section>hello</LegacyCard.Section>
        <LegacyCard.Subsection>world</LegacyCard.Subsection>
      </LegacyCard>
    </>
  );
}
