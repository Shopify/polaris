// @flow

/* eslint class-methods-use-this: off */
/* eslint import/no-extraneous-dependencies: off */
/* eslint import/no-unresolved: off */

import React, {Component} from 'react';

import {
  Badge,
  Banner,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  ChoiceList,
  Content,
  Field,
  FormLayout,
  Frame,
  Layout,
  Popover,
  Select,
  Stack,
  Tablist,
} from '@shopify/quilt/components';

type State = {
  fieldValue: ?string,
  checked: boolean,
  selected: string[],
};

export default class App extends Component {
  state: State = {
    fieldValue: '',
    checked: false,
    selected: [],
  };

  handleChoiceListChange = this.handleChoiceListChange.bind(this);
  handleCheckboxChange = this.handleCheckboxChange.bind(this);
  handleFieldChange = this.handleFieldChange.bind(this);

  handleChoiceListChange(selected: string[]) {
    this.setState({selected});
  }

  handleCheckboxChange() {
    this.setState({checked: !this.state.checked});
  }

  handleFieldChange(value?: string) {
    this.setState({fieldValue: value});
  }

  renderPopoverCard(cardProperties?: Object) {
    return (
      <Card title="Popover" {...cardProperties}>
        <Stack distribution="equalSpacing">
          <Popover activator={<Button>Hello</Button>}>
            <span>lots and lots and lots and lots and lots and lots of content</span>
          </Popover>

          <Popover activator={<Button>Goodbye</Button>}>
            <span>Not much content</span>
          </Popover>
        </Stack>
      </Card>
    );
  }

  renderFormCard() {
    return (
      <Card
        title="Fields"
        tablist={<Tablist tabs={['Open', 'Unfulfilled', 'Fulfilled']} />}
      >
        <Card.Section>
          <FormLayout>
            <FormLayout.Group>
              <ChoiceList
                selected={this.state.selected}
                onChange={this.handleChoiceListChange}
                options={[
                  'Radio one',
                  'Radio two',
                  {label: 'Radio three', disabled: true},
                ]}
              />

              <ChoiceList
                allowMultiple
                selected={[]}
                options={[
                  'Multichoice one',
                  'Multichoice two',
                  'Multichoice three',
                ]}
              />
            </FormLayout.Group>

            <Checkbox
              label="Checkbox"
              checked={this.state.checked}
              onClick={this.handleCheckboxChange}
            />

            <Checkbox label="Disabled checkbox" disabled checked />

            <Checkbox label="Radio button with a really long label that might stretch multiple lines" />

            <FormLayout.Group>
              <Field
                label="One"
                placeholder="0.00"
                leftAddon="$"
                rightAddon="USD"
                type="number"
                value={this.state.fieldValue}
                helpText="Help text"
                onChange={this.handleFieldChange}
              />

              <Field
                label="Two"
                labelNote="(optional)"
                placeholder="placeholder"
                value="Foo"
                readonly
              />

              <Field disabled label="Three" placeholder="placeholder" />
              <Field hasError label="Four" placeholder="placeholder" />

              <Field
                label="Five"
                placeholder="Five"
                connectedRight={<Button>Submit</Button>}
              />

              <Select label="Six" options={['foo', 'bar', 'baz']} />

              <Field
                label="Seven"
                placeholder="Seven"
                connectedLeft={<Select label="Eight" options={['foo', 'bar', 'baz']} />}
              />
            </FormLayout.Group>
          </FormLayout>
        </Card.Section>

        <Card.Section title="Condensed">
          <FormLayout condensed>
            <FormLayout.Group>
              <Field
                label="One"
                labelAction={<Button link>What?</Button>}
                placeholder="placeholder"
              />

              <Field label="Two" placeholder="placeholder" />
              <Field label="Three" placeholder="placeholder" />
              <Field label="Four" placeholder="placeholder" />
            </FormLayout.Group>
          </FormLayout>
        </Card.Section>
      </Card>
    );
  }

  renderBannerCard() {
    return (
      <Card title="Banners">
        <Stack vertical>
          <Banner title="A banner">
            <p>This order was marked as archived on September 26, 2015 21:33 EST.</p>
          </Banner>

          <Banner title="A success banner" status="success">
            <p>This order was marked as archived on September 26, 2015 21:33 EST.</p>
          </Banner>

          <Banner title="An info banner" status="info">
            <p>This order was marked as archived on September 26, 2015 21:33 EST.</p>
          </Banner>

          <Banner title="A warning banner" status="warning">
            <p>This order was marked as archived on September 26, 2015 21:33 EST.</p>
          </Banner>

          <Banner title="A critical banner" status="critical">
            <p>This order was marked as archived on September 26, 2015 21:33 EST.</p>
          </Banner>
        </Stack>
      </Card>
    );
  }

  renderButtonCard(cardProperties?: Object) {
    return (
      <Card title="Buttons" {...cardProperties}>
        <ButtonGroup>
          <Button>Default button</Button>
          <Button primary>Primary button</Button>
          <Button destructive>Destructive button</Button>
          <Button disabled>Disabled button</Button>
        </ButtonGroup>
      </Card>
    );
  }

  renderBadgeCard(cardProperties?: Object) {
    return (
      <Card title="Badges" {...cardProperties}>
        <Stack spacing="tight">
          <Badge>Regular</Badge>
          <Badge status="subdued">Subdued</Badge>
          <Badge status="info">Info</Badge>
          <Badge status="success">Success</Badge>
          <Badge status="attention">Attention</Badge>
          <Badge status="warning">Warning</Badge>
          <Badge status="critical">Error</Badge>
        </Stack>
      </Card>
    );
  }

  render() {
    return (
      <Frame>
        <Content>
          <Layout>
            <Layout.AnnotatedSection
              title="Annotated section"
              description="This is a description for an annotated section!"
            >
              <Card title="Card">
                Here is some content!
              </Card>
            </Layout.AnnotatedSection>

            <Layout.Section>
              {this.renderFormCard()}
              {this.renderBannerCard()}
            </Layout.Section>

            <Layout.Section secondary>
              {this.renderPopoverCard({secondary: true})}
              {this.renderButtonCard({secondary: true})}
              {this.renderBadgeCard({secondary: true})}
            </Layout.Section>
          </Layout>
        </Content>
      </Frame>
    );
  }
}
