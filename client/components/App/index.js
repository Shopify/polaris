import React, {Component} from 'react';
import styles from './index.css';

import Stack from '../Stack';
import ButtonGroup from '../ButtonGroup';
import Button from '../Button';
import Badge from '../Badge';

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

            <Badge>Regular</Badge>
            <Badge status="subdued">Subdued</Badge>
            <Badge status="info">Info</Badge>
            <Badge status="success">Success</Badge>
            <Badge status="attention">Attention</Badge>
            <Badge status="warning">Warning</Badge>
            <Badge status="critical">Error</Badge>
          </Stack>
        </div>
      </div>
    );
  }
}
