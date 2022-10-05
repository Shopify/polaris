import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Button, Columns, Page} from '@shopify/polaris';
import {ChevronLeftMinor, ChevronRightMinor} from '@shopify/polaris-icons';

export default {
  component: Columns,
} as ComponentMeta<typeof Columns>;

export function BasicColumns() {
  return (
    <Page fullWidth>
      <Columns columns={{xs: 1, sm: 2, md: 3, lg: 6}} spacing={{xs: '2'}}>
        <div style={{background: 'aquamarine'}}>one</div>
        <div style={{background: 'aquamarine'}}>two</div>
        <div style={{background: 'aquamarine'}}>three</div>
        <div style={{background: 'aquamarine'}}>four</div>
        <div style={{background: 'aquamarine'}}>five</div>
        <div style={{background: 'aquamarine'}}>six</div>
      </Columns>
    </Page>
  );
}

export function ColumnsWithTemplateColumns() {
  return (
    <Page fullWidth>
      <Columns
        columns={{
          xs: '1.5fr 0.5fr',
          sm: '2fr 1fr',
          md: '1fr 3fr auto 1fr',
          lg: '1fr 4fr auto 2fr 3fr auto',
        }}
        spacing={{xs: '4'}}
      >
        <div style={{background: 'aquamarine'}}>Column one</div>
        <div style={{background: 'aquamarine'}}>Column two</div>
        <div style={{background: 'aquamarine'}}>Column three</div>
        <div style={{background: 'aquamarine'}}>Column four</div>
        <div style={{background: 'aquamarine'}}>Column five</div>
        <div style={{background: 'aquamarine'}}>Column six</div>
      </Columns>
    </Page>
  );
}

export function ColumnsWithMixedPropTypes() {
  return (
    <Page fullWidth>
      <Columns
        columns={{xs: 2, sm: '2fr 1fr', md: '2fr 1fr 1fr', lg: 6}}
        spacing={{xs: '2'}}
      >
        <div style={{background: 'aquamarine'}}>one</div>
        <div style={{background: 'aquamarine'}}>two</div>
        <div style={{background: 'aquamarine'}}>three</div>
        <div style={{background: 'aquamarine'}}>four</div>
        <div style={{background: 'aquamarine'}}>five</div>
        <div style={{background: 'aquamarine'}}>six</div>
      </Columns>
    </Page>
  );
}

export function ColumnsWithVaryingGap() {
  return (
    <Page fullWidth>
      <Columns
        columns={{xs: 3}}
        spacing={{xs: '025', sm: '05', md: '1', lg: '2', xl: '4'}}
      >
        <div style={{background: 'aquamarine'}}>Column one</div>
        <div style={{background: 'aquamarine'}}>Column two</div>
        <div style={{background: 'aquamarine'}}>Column three</div>
      </Columns>
    </Page>
  );
}

export function ColumnsWithFreeAndFixedWidths() {
  return (
    <Page fullWidth>
      <Columns columns={{xs: '1fr auto auto'}} spacing={{xs: '05'}}>
        <div style={{background: 'aquamarine'}}>Column one</div>
        <div style={{background: 'aquamarine'}}>
          <Button icon={ChevronLeftMinor} accessibilityLabel="Previous" />
        </div>
        <div style={{background: 'aquamarine'}}>
          <Button icon={ChevronRightMinor} accessibilityLabel="Next" />
        </div>
      </Columns>
    </Page>
  );
}
