import React, {useEffect, useState} from 'react';
import {Tab} from '@headlessui/react';
import {Icon, Stack, Text} from '@shopify/polaris';
import {useRouter} from 'next/router';
import PatternsExample, {type PatternExample} from '../PatternsExample';
import Longform from '../Longform';
import Page from '../Page';
import styles from './PatternsDatePickingPage.module.scss';
import {CircleTickMajor} from '@shopify/polaris-icons';
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
const patternsIndex = ['single-date-picker', 'date-range-picker', 'minimal'];
const patterns: Record<string, Pattern> = {
  'single-date-picker': {
    index: 0,
    title: 'Single date picker',
    slug: 'single-date-picker',
    example: {
      description:
        "The date range picker gives merchants multiple options for selecting a date range. The list has preset dates for efficient picking, and the inputs + calendar work together to verify the merchant's selection. The benefit is how the different options work together for flexilibity with complex date picking tasks.",
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
  'date-range-picker': {
    index: 1,
    title: 'Date range picker',
    slug: 'date-range-picker',
    example: {
      description:
        'The single date picker enables merchants to type a specific date or pick it from a calendar. Having a single input is useful when merchants need to confidently confirm a date without being overwhelmed by other picking options.',
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
    <Page title={patternName} showTOC={false}>
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
                <span>{patterns['single-date-picker'].title}</span>
              </Tab>
              <Tab>
                <span>{patterns['date-range-picker'].title}</span>
              </Tab>
              <Tab>
                <span>{patterns['minimal'].title}</span>
              </Tab>
            </div>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <PatternsExample
                example={patterns['single-date-picker'].example}
                patternName={`${patternName} > ${patterns['single-date-picker'].title}`}
                relatedComponents={[
                  {label: 'Button', url: '/components/button'},
                  {label: 'TextFields', url: '/components/text-field'},
                ]}
              />
              <h2>
                How the {`${patterns['single-date-picker'].title}`} helps
                merchants
              </h2>
              <section className={styles.MerchantGoal}>
                <div>
                  <ol className={styles.MerchantGoalOL}>
                    <li>
                      The text input gives merchants the option to use the
                      keyboard to enter a date.
                    </li>
                    <li>
                      A single month calendar is previewed after selecting the
                      date input to provide visual affordance of the single date
                      picked. The calendar can then be used to select a new
                      date.
                    </li>
                  </ol>
                </div>
                <div className={styles.ImageWrapper}></div>
              </section>
              <h2>
                Useful to know about the {patterns['single-date-picker'].title}
              </h2>
              <section>
                <ul className={styles.UsageGuidelinesWrapper}>
                  <li className={styles.UsageGuidelinesEl}>
                    <div className={styles.ImageWrapper} />
                    <div className={styles.UsageGuidelineTxt}>
                      <p>
                        {`For text inputs, display the contextual date so that the
                        format is easily understood and familiar. On focus,
                        present the date in the proper format to edit
                        (YYYY-MM-DD)`}
                      </p>
                    </div>
                  </li>
                  <li className={styles.UsageGuidelinesEl}>
                    <div className={styles.ImageWrapper} />
                    <div className={styles.UsageGuidelineTxt}>
                      <p>
                        Labels need to simply depict the task at hand. Whether
                        that be a start date, end date, start time etc.
                      </p>
                    </div>
                  </li>
                  <li className={styles.UsageGuidelinesEl}>
                    <div className={styles.ImageWrapper} />
                    <div className={styles.UsageGuidelineTxt}>
                      <p>
                        This pattern can be duplicated to allow users to add an
                        end date or time.
                      </p>
                    </div>
                  </li>
                </ul>
              </section>
            </Tab.Panel>
            <Tab.Panel>
              <PatternsExample
                example={patterns['date-range-picker'].example}
                patternName={`${patternName} > ${patterns['date-range-picker'].title}`}
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
