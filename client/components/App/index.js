import React, {Component} from 'react';
import styles from './index.css';

import * as Statuses from '../shared/statuses';

import Stack from '../Stack';
import ButtonGroup from '../ButtonGroup';
import Button from '../Button';
import Badge from '../Badge';
import Banner from '../Banner';

export default class App extends Component {
  render() {
    return (
      <div className={styles.Frame}>
        <div className={styles.Header}>
          Components
        </div>

        <div className={styles.Content}>
          <Stack vertical>
            <ButtonGroup>
              <Button>Default button</Button>
              <Button primary>Primary button</Button>
              <Button destructive>Destructive button</Button>
              <Button disabled>Disabled button</Button>
            </ButtonGroup>

            <ButtonGroup>
              <Button slim>Default button</Button>
              <Button slim primary>Primary button</Button>
              <Button slim destructive>Destructive button</Button>
              <Button slim disabled>Disabled button</Button>
            </ButtonGroup>

            <Stack>
              <Badge>Regular</Badge>
              <Badge status={Statuses.subdued}>Subdued</Badge>
              <Badge status={Statuses.info}>Info</Badge>
              <Badge status={Statuses.success}>Success</Badge>
              <Badge status={Statuses.attention}>Attention</Badge>
              <Badge status={Statuses.warning}>Warning</Badge>
              <Badge status={Statuses.critical}>Error</Badge>
            </Stack>

            <Banner title="A banner">
              <p>This order was marked as archived on September 26, 2015 21:33 EST.</p>
            </Banner>

            <Banner title="A success banner" status={Statuses.success}>
              <p>This order was marked as archived on September 26, 2015 21:33 EST.</p>
            </Banner>

            <Banner title="An info banner" status={Statuses.info}>
              <p>This order was marked as archived on September 26, 2015 21:33 EST.</p>
            </Banner>

            <Banner title="A warning banner" status={Statuses.warning}>
              <p>This order was marked as archived on September 26, 2015 21:33 EST.</p>
            </Banner>

            <Banner title="A critical banner" status={Statuses.critical}>
              <p>This order was marked as archived on September 26, 2015 21:33 EST.</p>
            </Banner>
          </Stack>
        </div>
      </div>
    );
  }
}
