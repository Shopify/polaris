import React, {useState} from 'react';

import {
  Layout,
  Page,
  Card,
  List,
  InContextLearning,
  InContextLearningContextProvider,
  Stack,
} from '../src';

import styles from './Learner.scss';

function StepOne() {
  // const [count, setCount] = useState(0);
  return (
    <span>
      {/* <button onClick={() => setCount(count + 1)}>Plus</button> */}
      <p>Step 1: Testing React</p>
      {/* {count} */}
    </span>
  );
}

function StepTwo() {
  return <span>Step 2: Testing React</span>;
}

function StepThree() {
  return <span>Step 3: Testing React</span>;
}

function LearnerApp() {
  return (
    <div className={styles.Root}>
      <Page narrowWidth>
        <Layout>
          <Layout.Section>
            <InContextLearning onDismiss={() => {}} />
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
                    <InContextLearning.Step
                      direction="top-left"
                      stepIndex={0}
                      title="Title step 1"
                    >
                      <span>1 × Oasis Glass, 4-Pack</span>
                    </InContextLearning.Step>
                  </List.Item>
                  <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
                </List>
              </Card.Section>
            </Card>
            <Card>
              <Card.Section title="Collections">
                <InContextLearning.Step
                  direction="top-right"
                  stepIndex={1}
                  title="Title step 2"
                >
                  <span>another piece of content</span>
                </InContextLearning.Step>
              </Card.Section>
              <Card.Section title="Tags" />
            </Card>

            <Stack distribution="trailing">
              <InContextLearning.Step direction="none" stepIndex={2}>
                <span data-learning-step-three>
                  Yet another piece of content!
                </span>
              </InContextLearning.Step>
            </Stack>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
}

export function Learner() {
  return (
    <InContextLearningContextProvider
      stepComponents={[
        <StepOne key={0} />,
        <StepTwo key={1} />,
        <StepThree key={2} />,
      ]}
    >
      <LearnerApp />
    </InContextLearningContextProvider>
  );
}
