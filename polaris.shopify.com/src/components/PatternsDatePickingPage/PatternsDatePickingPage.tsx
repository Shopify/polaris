import React, {useEffect, useState} from 'react';
import {Tab} from '@headlessui/react';
import {Stack, Text} from '@shopify/polaris';
import {useRouter} from 'next/router';
import PatternsExample, {type PatternExample} from '../PatternsExample';
import Longform from '../Longform';
import Page from '../Page';
import styles from './PatternsDatePickingPage.module.scss';
type Pattern = {
  index: number;
  title: string;
  slug: string;
  designDecisionListItems?: string[];
  designDecisions?: {
    listItems?: string[];
    image?: boolean;
  };
  example: PatternExample;
};
const patternsIndex = ['single-date-selector', 'without-frame', 'minimal'];
const patterns: Record<string, Pattern> = {
  'single-date-selector': {
    index: 0,
    title: 'Calendar with single date selector',
    slug: 'single-date-selector',
    example: {
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
  },
  'without-frame': {
    index: 1,
    title: 'Without Frame',
    slug: 'without-frame',
    example: {
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
  },
  minimal: {
    index: 2,
    title: 'Minimal',
    slug: 'minimal',
    example: {
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
  },
};

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
          tab: patternsIndex[index],
        },
      },
      undefined,
      {shallow: true},
    );
  };

  useEffect(() => {
    // We don't expect query.tab to ever be an array of values
    // However this is supported by the spec
    // So we exclude this case in our check.
    if (query.tab && typeof query.tab === 'string' && isReady) {
      console.log(query.tab);
      const index = patterns[query.tab as string]?.index;
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
              <Tab>
                <span>{patterns['single-date-selector'].title}</span>
              </Tab>
              <Tab>
                <span>{patterns['without-frame'].title}</span>
              </Tab>
              <Tab>
                <span>{patterns['minimal'].title}</span>
              </Tab>
            </div>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <PatternsExample
                example={patterns['single-date-selector'].example}
                patternName={`${patternName} > ${patterns['single-date-selector'].title}`}
                relatedComponents={[
                  {label: 'Button', url: '/components/button'},
                  {label: 'TextFields', url: '/components/text-field'},
                ]}
              />
              <h2>Design decisions</h2>
              <section className={styles.MerchantGoal}>
                <div>
                  <ol className={styles.MerchantGoalOL}>
                    <li>
                      {
                        'The date range selector makes it easy to configure therange and clear what range is selected.'
                      }
                    </li>
                    <li>
                      {
                        'The text inputs provide a convenient way to input dates with keyboard.'
                      }
                    </li>
                    <li>
                      {
                        'The buttons in the footer let merchants review the selection and explicitly confirm or discard it.'
                      }
                    </li>
                  </ol>
                </div>
                <div className={styles.ImageWrapper}></div>
              </section>
            </Tab.Panel>
            <Tab.Panel>
              <PatternsExample
                example={patterns['without-frame'].example}
                patternName={`${patternName} > ${patterns['without-frame'].title}`}
                relatedComponents={[
                  {label: 'Button', url: '/components/button'},
                  {label: 'TextFields', url: '/components/text-field'},
                ]}
              />
            </Tab.Panel>
            <Tab.Panel>
              <PatternsExample
                example={patterns['minimal'].example}
                patternName={`${patternName} > ${patterns['minimal'].title}`}
                relatedComponents={[
                  {label: 'Button', url: '/components/button'},
                  {label: 'TextFields', url: '/components/text-field'},
                ]}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </Longform>
    </Page>
  );
}
