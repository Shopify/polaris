import type {PropsWithChildren} from 'react';
import React from 'react';
import {VerticalStack, HorizontalGrid, AlphaCard} from '@shopify/polaris';

export const ResourceDetailsLayout: React.FunctionComponent<PropsWithChildren> & {
  PrimarySection: typeof PrimarySection;
  SecondarySection: typeof SecondarySection;
  Card: typeof Card;
} = function ResourceDetailsLayout({children}: PropsWithChildren) {
  return (
    <HorizontalGrid columns={{xs: 1, md: '2fr 1fr'}} gap="4">
      {children}
    </HorizontalGrid>
  );
};

function PrimarySection({children}: PropsWithChildren) {
  return <VerticalStack gap="4">{children}</VerticalStack>;
}

function SecondarySection({children}: PropsWithChildren) {
  return <VerticalStack gap={{xs: '4', md: '2'}}>{children}</VerticalStack>;
}

function Card({children}: PropsWithChildren) {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="4">{children}</VerticalStack>
    </AlphaCard>
  );
}

ResourceDetailsLayout.PrimarySection = PrimarySection;
ResourceDetailsLayout.SecondarySection = SecondarySection;
ResourceDetailsLayout.Card = Card;
