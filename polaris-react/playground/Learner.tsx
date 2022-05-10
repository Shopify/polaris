import React from 'react';

import {Layout, Page, Card, List, InContextLearning, Stack} from '../src';

import styles from './Learner.scss';

const LEARNING_STEPS = [
  {
    selector: '[data-learning-step-one]',
    content: <span>Step 1: Testing React</span>,
  },
  {
    selector: '[data-learning-step-two]',
    content: <span>Step 2: Testing React</span>,
  },
  {
    selector: '[data-learning-step-three]',
    content: <span>Step 3: Testing React</span>,
  },
];

export function Learner() {
  return (
    <div className={styles.Root}>
      <Page narrowWidth>
        <Layout>
          <Layout.Section>
            <InContextLearning steps={LEARNING_STEPS} onDismiss={() => {}} />
            <Card
              title="Shipment 1234"
              secondaryFooterActions={[
                {content: 'Cancel shipment', destructive: true},
              ]}
              primaryFooterAction={{content: 'Add tracking number'}}
            >
              <Card.Section title="Items">
                <List>
                  <List.Item>
                    <span data-learning-step-one>1 × Oasis Glass, 4-Pack</span>
                  </List.Item>
                  <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
                </List>
              </Card.Section>
            </Card>
            <Card>
              <Card.Section title="Collections">
                <span data-learning-step-two>another piece of content</span>
              </Card.Section>
              <Card.Section title="Tags" />
            </Card>

            <Stack distribution="trailing">
              <span data-learning-step-three>
                Yet another piece of content!
              </span>
            </Stack>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
}
