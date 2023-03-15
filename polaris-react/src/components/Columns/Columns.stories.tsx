import type {ComponentMeta} from '@storybook/react';
import {Button, Columns, Page} from '@shopify/polaris';
import {ChevronLeftMinor, ChevronRightMinor} from '@shopify/polaris-icons';

export default {
  component: Columns,
} as ComponentMeta<typeof Columns>;

export function Default() {
  return (
    <Page fullWidth>
      <Columns>
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

export function WithTemplateColumns() {
  return (
    <Page fullWidth>
      <Columns
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
      </Columns>
    </Page>
  );
}

export function WithMixedPropTypes() {
  return (
    <Page fullWidth>
      <Columns
        columns={{xs: 2, sm: '2fr 1fr', md: '2fr 1fr 1fr', lg: 6}}
        gap={{xs: '2'}}
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

export function WithGap() {
  return (
    <Page fullWidth>
      <Columns columns={{xs: 3}} gap="5">
        <div style={{background: 'aquamarine'}}>Column one</div>
        <div style={{background: 'aquamarine'}}>Column two</div>
        <div style={{background: 'aquamarine'}}>Column three</div>
      </Columns>
    </Page>
  );
}

export function WithResponsiveGap() {
  return (
    <Page fullWidth>
      <Columns
        columns={{xs: 3}}
        gap={{xs: '025', sm: '4', md: '6', lg: '8', xl: '10'}}
      >
        <div style={{background: 'aquamarine'}}>Column one</div>
        <div style={{background: 'aquamarine'}}>Column two</div>
        <div style={{background: 'aquamarine'}}>Column three</div>
      </Columns>
    </Page>
  );
}

export function WithFreeAndFixedWidths() {
  return (
    <Page fullWidth>
      <Columns columns={{xs: '1fr auto auto'}} gap={{xs: '05'}}>
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

export function WithResponsiveColumns() {
  return (
    <Page fullWidth>
      <Columns columns={{xs: 1, sm: 3}} gap="4">
        <div style={{background: 'aquamarine'}}>Column one</div>
        <div style={{background: 'aquamarine'}}>Column two</div>
        <div style={{background: 'aquamarine'}}>Column three</div>
      </Columns>
    </Page>
  );
}

export function WithResponsiveColumnAlisases() {
  return (
    <Page fullWidth>
      <Columns columns={['oneThird', 'twoThirds']} gap="4">
        <div style={{background: 'aquamarine'}}>Column one</div>
        <div style={{background: 'aquamarine'}}>Column two</div>
      </Columns>
    </Page>
  );
}
