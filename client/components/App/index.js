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

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Layout.Section>
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
        </Layout.Section>

        <Layout.Section secondary>
          <Card title="Buttons" secondary>
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

          <Card title="Badges" secondary>
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
        </Layout.Section>
      </Layout>
    );
  }
}
