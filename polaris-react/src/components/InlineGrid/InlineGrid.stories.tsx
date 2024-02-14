import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Button, InlineGrid, Page} from '@shopify/polaris';
import {ChevronLeftIcon, ChevronRightIcon} from '@shopify/polaris-icons';

export default {
  component: InlineGrid,
} as ComponentMeta<typeof InlineGrid>;

export function Default() {
  return (
    <Page fullWidth>
      <InlineGrid>
        <div style={{background: 'aquamarine'}}>one</div>
        <div style={{background: 'aquamarine'}}>two</div>
        <div style={{background: 'aquamarine'}}>three</div>
        <div style={{background: 'aquamarine'}}>four</div>
        <div style={{background: 'aquamarine'}}>five</div>
        <div style={{background: 'aquamarine'}}>six</div>
      </InlineGrid>
    </Page>
  );
}

export function WithTemplateInlineGrid() {
  return (
    <Page fullWidth>
      <InlineGrid
        columns={{
          xs: '1.5fr 0.5fr',
          sm: '2fr 1fr',
          md: '1fr 3fr auto 1fr',
          lg: '1fr 4fr auto 2fr 3fr auto',
        }}
      >
        <div style={{background: 'aquamarine'}}>Column one</div>
        <div style={{background: 'aquamarine'}}>Column two</div>
        <div style={{background: 'aquamarine'}}>Column three</div>
        <div style={{background: 'aquamarine'}}>Column four</div>
        <div style={{background: 'aquamarine'}}>Column five</div>
        <div style={{background: 'aquamarine'}}>Column six</div>
      </InlineGrid>
    </Page>
  );
}

export function WithMixedPropTypes() {
  return (
    <Page fullWidth>
      <InlineGrid
        columns={{xs: 2, sm: '2fr 1fr', md: '2fr 1fr 1fr', lg: 6}}
        gap={{xs: '200'}}
      >
        <div style={{background: 'aquamarine'}}>one</div>
        <div style={{background: 'aquamarine'}}>two</div>
        <div style={{background: 'aquamarine'}}>three</div>
        <div style={{background: 'aquamarine'}}>four</div>
        <div style={{background: 'aquamarine'}}>five</div>
        <div style={{background: 'aquamarine'}}>six</div>
      </InlineGrid>
    </Page>
  );
}

export function WithGap() {
  return (
    <Page fullWidth>
      <InlineGrid columns={{xs: 3}} gap="500">
        <div style={{background: 'aquamarine'}}>Column one</div>
        <div style={{background: 'aquamarine'}}>Column two</div>
        <div style={{background: 'aquamarine'}}>Column three</div>
      </InlineGrid>
    </Page>
  );
}

export function WithResponsiveGap() {
  return (
    <Page fullWidth>
      <InlineGrid
        columns={{xs: 3}}
        gap={{xs: '025', sm: '400', md: '600', lg: '800', xl: '1000'}}
      >
        <div style={{background: 'aquamarine'}}>Column one</div>
        <div style={{background: 'aquamarine'}}>Column two</div>
        <div style={{background: 'aquamarine'}}>Column three</div>
      </InlineGrid>
    </Page>
  );
}

export function WithFreeAndFixedWidths() {
  return (
    <Page fullWidth>
      <InlineGrid columns={{xs: '1fr auto auto'}} gap={{xs: '050'}}>
        <div style={{background: 'aquamarine'}}>Column one</div>
        <div style={{background: 'aquamarine'}}>
          <Button icon={ChevronLeftIcon} accessibilityLabel="Previous" />
        </div>
        <div style={{background: 'aquamarine'}}>
          <Button icon={ChevronRightIcon} accessibilityLabel="Next" />
        </div>
      </InlineGrid>
    </Page>
  );
}

export function WithResponsiveInlineGrid() {
  return (
    <Page fullWidth>
      <InlineGrid columns={{xs: 1, sm: 3}} gap="400">
        <div style={{background: 'aquamarine'}}>Column one</div>
        <div style={{background: 'aquamarine'}}>Column two</div>
        <div style={{background: 'aquamarine'}}>Column three</div>
      </InlineGrid>
    </Page>
  );
}

export function WithResponsiveColumnAlisases() {
  return (
    <Page fullWidth>
      <InlineGrid columns={['oneThird', 'twoThirds']} gap="400">
        <div style={{background: 'aquamarine'}}>Column one</div>
        <div style={{background: 'aquamarine'}}>Column two</div>
      </InlineGrid>
    </Page>
  );
}
