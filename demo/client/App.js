import React, {Component} from 'react';

import 'components/index.scss';
import {Status, Spacing} from 'components/shared';

import Card from 'components/Card';
import Stack from 'components/Stack';
import ButtonGroup from 'components/ButtonGroup';
import Button from 'components/Button';
import Badge from 'components/Badge';
import Banner from 'components/Banner';
import Layout from 'components/Layout';
import Field from 'components/Field';
import Form from 'components/Form';
import Frame from 'components/Frame';
import Select from 'components/Select';
import Popover from 'components/Popover';
import Tablist from 'components/Tablist';

const Foo = {};
export {Foo};

export default class App extends Component {
  state = {fieldValue: ''};

  renderPopoverCard(cardProperties) {
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
          <Form>
            <Field
              label="One"
              placeholder="0.00"
              leftAddon="$"
              rightAddon="USD"
              type="number"
              value={this.state.fieldValue}
              helpText="Help text"
              onChange={(event) => this.setState({fieldValue: event.target.value})}
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
          </Form>
        </Card.Section>

        <Card.Section title="Condensed">
          <Form condensed>
            <Field
              label="One"
              labelAction={<Button link>What?</Button>}
              placeholder="placeholder"
            />

            <Field label="Two" placeholder="placeholder" />
            <Field label="Three" placeholder="placeholder" />
            <Field label="Four" placeholder="placeholder" />
          </Form>
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

          <Banner title="A success banner" status={Status.success}>
            <p>This order was marked as archived on September 26, 2015 21:33 EST.</p>
          </Banner>

          <Banner title="An info banner" status={Status.info}>
            <p>This order was marked as archived on September 26, 2015 21:33 EST.</p>
          </Banner>

          <Banner title="A warning banner" status={Status.warning}>
            <p>This order was marked as archived on September 26, 2015 21:33 EST.</p>
          </Banner>

          <Banner title="A critical banner" status={Status.critical}>
            <p>This order was marked as archived on September 26, 2015 21:33 EST.</p>
          </Banner>
        </Stack>
      </Card>
    );
  }

  renderButtonCard(cardProperties) {
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

  renderBadgeCard(cardProperties) {
    return (
      <Card title="Badges" {...cardProperties}>
        <Stack spacing={Spacing.tight}>
          <Badge>Regular</Badge>
          <Badge status={Status.subdued}>Subdued</Badge>
          <Badge status={Status.info}>Info</Badge>
          <Badge status={Status.success}>Success</Badge>
          <Badge status={Status.attention}>Attention</Badge>
          <Badge status={Status.warning}>Warning</Badge>
          <Badge status={Status.critical}>Error</Badge>
        </Stack>
      </Card>
    );
  }

  render() {
    return (
      <Frame>
        <Layout>
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
      </Frame>
    );
  }
}
