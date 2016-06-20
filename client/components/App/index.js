import React, {Component} from 'react';
import styles from './index.css';

import {Status, Spacing} from '../shared';

import Card from '../Card';
import Stack from '../Stack';
import ButtonGroup from '../ButtonGroup';
import Button from '../Button';
import Badge from '../Badge';
import Banner from '../Banner';
import Layout from '../Layout';
import Field from '../Field';
import Form from '../Form';
import Frame from '../Frame';

export default class App extends Component {
  state = {fieldValue: ''};

  renderFormCard() {
    return (
      <Card title="Fields">
        <Card.Section>
          <Form>
            <Field
              label="One"
              placeholder="0.00"
              leftAddon="$"
              rightAddon="USD"
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
          </Form>
        </Card.Section>

        <Card.Section title="Condensed">
          <Form condensed>
            <Field
              sideAction={<Button link>What?</Button>}
              label="One"
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
        <Card.Section>
          <ButtonGroup>
            <Button>Default button</Button>
            <Button primary>Primary button</Button>
            <Button destructive>Destructive button</Button>
            <Button disabled>Disabled button</Button>
          </ButtonGroup>
        </Card.Section>

        <Card.Section>
          <ButtonGroup>
            <Button slim>Default button</Button>
            <Button slim primary>Primary button</Button>
            <Button slim destructive>Destructive button</Button>
            <Button slim disabled>Disabled button</Button>
          </ButtonGroup>
        </Card.Section>
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
            {this.renderButtonCard({secondary: true})}
            {this.renderBadgeCard({secondary: true})}
          </Layout.Section>
        </Layout>
      </Frame>
    );
  }
}
