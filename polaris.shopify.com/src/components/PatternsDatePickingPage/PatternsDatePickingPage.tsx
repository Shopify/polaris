import React, {useEffect, useState} from 'react';
import {Tab} from '@headlessui/react';
import {Stack, Text} from '@shopify/polaris';
import {useRouter} from 'next/router';
import PatternsExample, {type PatternExample} from '../PatternsExample';
import Longform from '../Longform';
import Page from '../Page';
import styles from './PatternsDatePickingPage.module.scss';

const codeExamples: PatternExample[] = [
  {
    title: 'Calendar with single date selector',
    slug: 'single-date-selector',
    code: `
{(function DatePickerPattern () {
  const [{month, year}, setDate] = useState({month: 1, year: 2018});
  const [selectedDates, setSelectedDates] = useState({
    start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    end: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
  });
  const handleMonthChange = useCallback(
    (month, year) => setDate({month, year}),
    [],
  );
  return (
    <DatePicker
      month={month}
      year={year}
      onChange={setSelectedDates}
      onMonthChange={handleMonthChange}
      selected={selectedDates}
    />
  );
})()}`,
    context: `
<div style={{
  display: 'flex',
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: '32px',
  paddingRight: '32px',
}}>
  <div style={{ width: '100%' }}>
    ____CODE____
  </div>
</div>
`,
    snippetCode: `
function DatePickerPattern () {
  const [{month, year}, setDate] = useState({month: 1, year: 2018});
  const [selectedDates, setSelectedDates] = useState({
    start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    end: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
  });
  const handleMonthChange = useCallback(
    (month, year) => setDate({month, year}),
    [],
  );
  return (
    <DatePicker
      month={month}
      year={year}
      onChange={setSelectedDates}
      onMonthChange={handleMonthChange}
      selected={selectedDates}
    />
  );
}
    `,
  },
  {
    title: 'Without Frame',
    slug: 'with-frame',
    code: ` <Page
    divider
    primaryAction={{ content: "View on your store", disabled: true }}
    secondaryActions={[
      {
        content: "Duplicate",
        accessibilityLabel: "Secondary action label",
        onAction: () => alert("Duplicate action"),
      },
    ]}
  >
    <AlphaStack gap="16">
      <Columns columns={{ xs: "1fr", md: "2fr 5fr" }}>
        <Box as="section">
          <AlphaStack>
            <Text as="h3" variant="headingMd">
              InterJambs
            </Text>
            <Text as="p" variant="bodyMd">
              Interjambs are the rounded protruding bits of your puzzlie piece
            </Text>
          </AlphaStack>
        </Box>
        <AlphaCard>
          <AlphaStack fullWidth>
            <TextField label="Interjamb style" />
            <TextField label="Interjamb ratio" />
          </AlphaStack>
        </AlphaCard>
      </Columns>
      <Columns columns={{ xs: "1fr", md: "2fr 5fr" }}>
        <Box as="section">
          <AlphaStack>
            <Text as="h3" variant="headingMd">
              Dimensions
            </Text>
            <Text as="p" variant="bodyMd">
              Interjambs are the rounded protruding bits of your puzzlie piece
            </Text>
          </AlphaStack>
        </Box>
        <AlphaCard>
          <AlphaStack fullWidth>
            <TextField label="Horizontal" />
            <TextField label="Interjamb ratio" />
          </AlphaStack>
        </AlphaCard>
      </Columns>
    </AlphaStack>
  </Page>`,
  },
  {
    title: 'Minimal',
    slug: 'minimal',
    context: `<div style={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: '32px',
      paddingRight: '32px',
    }}>
      <div style={{ width: '100%' }}>
        ____CODE____
      </div>
    </div>`,
    code: `
    <Columns columns={{ xs: "1fr", md: "2fr 5fr" }}>
    <Box as="section">
      <AlphaStack>
        <Text as="h3" variant="headingMd">
          InterJambs
        </Text>
        <Text as="p" variant="bodyMd">
          Interjambs are the rounded protruding bits of your puzzlie piece
        </Text>
      </AlphaStack>
    </Box>
    <AlphaCard>
      <AlphaStack fullWidth>
        <TextField label="Interjamb style" />
        <TextField label="Interjamb ratio" />
      </AlphaStack>
    </AlphaCard>
  </Columns>
    `,
  },
];

export default function PatternsDatePickingPage() {
  const patternName = 'Date picking';
  const [exampleIndex, setExampleIndex] = useState(0);
  const {query, replace, isReady} = useRouter();
  const onTabChange = (index: number) => {
    setExampleIndex(index);
    replace(
      {
        query: {
          ...query,
          tab: codeExamples[index].slug,
        },
      },
      undefined,
      {shallow: true},
    );
  };

  useEffect(() => {
    if (query.tab && isReady) {
      const index = codeExamples.findIndex((el) => el.slug === query.tab);
      setExampleIndex(index);
    }
  }, [query.tab, isReady]);

  useEffect(() => {
    setExampleIndex(0);
  }, []);

  return (
    <Page title={patternName}>
      <Stack vertical>
        <Text as="p" variant="bodyLg">
          This layout pattern makes it easy for merchants to scan groups of
          <br />
          settings and make desired changes
        </Text>
        <Text as="p" variant="bodySm">
          Maintainer: Polaris * <a href="#">Discuss on Github</a>
        </Text>
      </Stack>
      <Longform>
        <Tab.Group
          defaultIndex={0}
          selectedIndex={exampleIndex}
          onChange={onTabChange}
        >
          <Tab.List>
            <div className={styles.ExamplesList} id="examples">
              {codeExamples.map((example, i) => {
                return (
                  <Tab key={i}>
                    <span>{example.title}</span>
                  </Tab>
                );
              })}
            </div>
          </Tab.List>

          <Tab.Panels>
            {codeExamples.map((example, i) => (
              <Tab.Panel key={i}>
                <PatternsExample
                  example={example}
                  patternName={patternName}
                  relatedComponents={[
                    {label: 'Button', url: '/components/button'},
                    {label: 'TextFields', url: '/components/text-field'},
                  ]}
                />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
        <h2>Merchant Goal</h2>
        <p>
          This layout has two columnns, with guidance to the left and settings
          in cards to the right
        </p>
        <ol>
          <li>
            The left columns make it easy for merchants to glance the group
            names and scan the page
          </li>
          <li>
            When the desired group is found, merchants move their gaze to the
            right and complete their task.
          </li>
        </ol>
        <Text as="h2" variant="heading2xl">
          Usage Guidance
        </Text>
        <details className={styles.Accordion}>
          <summary>Common pattern tweaks</summary>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </details>
        <details className={styles.Accordion}>
          <summary>Platform considerations</summary>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </details>
        <details className={styles.Accordion}>
          <summary>Using App Bridge</summary>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </details>
      </Longform>
    </Page>
  );
}
