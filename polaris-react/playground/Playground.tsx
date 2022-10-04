import React from 'react';

import {
  Page,
  Button,
  ButtonGroup,
  ButtonGroupAlpha,
  Stack,
  TextContainer,
  Card,
} from '../src';

interface Props {
  new?: boolean;
}

export function Playground() {
  return (
    <Page title="Playground" fullWidth>
      <Stack>
        <Stack vertical>
          <Stack.Item fill>
            <Default />
            <WithSegmentedButtons />
            <OutlineWithSegmentedButtons />
            <WithFullWidthButtons />
            <OutlineWithFullWidthButtons />
            <WithConnectedTopButtons />
            <PracticalConnectedTop />
          </Stack.Item>
        </Stack>
        <Stack vertical>
          <Stack.Item fill>
            <Default new />
            <WithSegmentedButtons new />
            <OutlineWithSegmentedButtons new />
            <WithFullWidthButtons new />
            <OutlineWithFullWidthButtons new />
            <WithConnectedTopButtons new />
            <PracticalConnectedTop new />
          </Stack.Item>
        </Stack>
      </Stack>
    </Page>
  );
}

function getElement(isNew?: boolean) {
  return isNew ? ButtonGroupAlpha : ButtonGroup;
}

function Default({new: isNew}: Props) {
  const Element = getElement(isNew);

  return (
    <Element>
      <Button>Cancel</Button>
      <Button primary>Save</Button>
    </Element>
  );
}

function WithSegmentedButtons({new: isNew}: Props) {
  const Element = getElement(isNew);
  return (
    <Element segmented>
      <Button>Bold</Button>
      <Button>Italic</Button>
      <Button>Underline</Button>
    </Element>
  );
}

function OutlineWithSegmentedButtons({new: isNew}: Props) {
  const Element = getElement(isNew);
  return (
    <Element segmented>
      <Button outline>Bold</Button>
      <Button outline>Italic</Button>
      <Button outline>Underline</Button>
    </Element>
  );
}

function WithFullWidthButtons({new: isNew}: Props) {
  const Element = getElement(isNew);
  return (
    <Element fullWidth>
      <Button>Bold</Button>
      <Button>Italic</Button>
      <Button>Underline</Button>
    </Element>
  );
}

function OutlineWithFullWidthButtons({new: isNew}: Props) {
  const Element = getElement(isNew);
  return (
    <Element fullWidth>
      <Button outline>Bold</Button>
      <Button outline>Italic</Button>
      <Button outline>Underline</Button>
    </Element>
  );
}

function WithConnectedTopButtons({new: isNew}: Props) {
  const Element = getElement(isNew);
  return (
    <Element connectedTop>
      <Button>Bold</Button>
      <Button>Italic</Button>
      <Button>Underline</Button>
    </Element>
  );
}

function PracticalConnectedTop({new: isNew}: Props) {
  const Element = getElement(isNew);
  return (
    <Stack vertical>
      <div className={styles.Wrapper}>
        <Card>
          <Card.Section>
            <div className={styles.Card}>
              <TextContainer spacing="loose">
                <h2 className={styles.Card__Title}>card title</h2>
                <p className={styles.Card__Subtitle}>subtitle</p>
              </TextContainer>
              <div className={styles.Rates}>displayRates</div>
              some currency markup
            </div>
          </Card.Section>
          <Element connectedTop fullWidth>
            <Button primary onClick={() => {}}>
              content
            </Button>
          </Element>
        </Card>
      </div>
    </Stack>
  );
}

const styles = {
  Wrapper: 'Polaris-Card__Wrapper',
  Card: 'Polaris-Card',
  Card__Title: 'Polaris-Card__Title',
  Card__Subtitle: 'Polaris-Card__Subtitle',
  Rates: 'Polaris-Card__Rates',
};
