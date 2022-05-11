import React, {useState} from 'react';
import {
  Layout,
  Page,
  Card,
  List,
  InContextLearning,
  InContextLearningContextProvider,
  Stack,
  Image,
} from '../src';
import ImageOne from './learner-assets/5.png';
import ImageTwo from './learner-assets/Rectangle2464.png';
import styles from './Learner.scss';

function StepOne() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
      <p>
        Body of rich tooltip, where the text can be longer to explain content of
        a specific feature where the tooltip is pointing at. Learn more.
      </p>
      <Image source={ImageOne} alt="image one" />
    </div>
  );
}

function StepTwo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
      <Image source={ImageTwo} alt="image one" />
      <p>
        Body of rich tooltip, where the text can be longer to explain content of
        a specific feature where the tooltip is pointing at. Learn more.
      </p>
    </div>
  );
}

function StepThree() {
  return 'Body of rich tooltip, where the text can be longer to explain content of a  specific feature where the tooltip is pointing at. Learn more.';
}

function LearnerApp() {
  const [inContextLearningVisible, setInContextLearningVisible] =
    useState(true);
  return (
    <div className={styles.Root}>
      <Page narrowWidth>
        <Layout>
          <Layout.Section>
            {inContextLearningVisible && (
              <InContextLearning
                onDismiss={() => setInContextLearningVisible(false)}
                title="Shipping Tracking"
              />
            )}
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
                    <InContextLearning.Step direction="top-left" stepIndex={0}>
                      <span>1 × Oasis Glass, 4-Pack</span>
                    </InContextLearning.Step>
                  </List.Item>
                  <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
                </List>
              </Card.Section>
            </Card>
            <Card>
              <Card.Section title="Collections">
                <InContextLearning.Step direction="top-right" stepIndex={1}>
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
