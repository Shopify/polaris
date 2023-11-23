import React from 'react';

import {BlockStack, Button, InlineStack, Page} from '../src';

import styles from './DetailsPage.scss';

export function Playground() {
  return (
    <Page title="Playground">
      {/* Add the code you want to test in here */}
      <BlockStack gap="200">
        <InlineStack gap="200">
          <button className={styles.SimpleButton}>Save</button>
          <Button variant="primary">Save</Button>
        </InlineStack>
        <div>
          <Button variant="primary">Save</Button>
        </div>
      </BlockStack>
    </Page>
  );
}
