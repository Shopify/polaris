import React, {useEffect, useState} from 'react';
import {Tab} from '@headlessui/react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import StatusBadge from '../StatusBadge';
import {StatusName} from '../../types';
import PageMeta from '../PageMeta';
import {Stack, Row} from '../Stack';
import {Lede} from '../Lede';
import {Heading} from '../Heading';
import {TableContainer, Table, Tbody, TableCaption, Tr, Td} from '../Table';
import PatternsExample, {type PatternExample} from '../PatternsExample';
import Page from '../Page';
import styles from './PatternsDatePickingPage.module.scss';
import {Grid, GridItem} from '../Grid';

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
const title = 'Date picking';

const newDiscussionLink = `https://github.com/Shopify/polaris/discussions/new?category=pattern-documentation&title=[${encodeURIComponent(
  title,
)}]`;
const knownIssuesLink = `https://github.com/Shopify/polaris/issues?q=is%3Aopen+is%3Aissue+label%3APattern+${encodeURIComponent(
  title,
)}`;
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

const Preview = () => {
  return (
    <div className={styles.Preview}>
      <div className={styles.PreviewInner} />
    </div>
  );
};

export default function PatternsDatePickingPage() {
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
  const description =
    'This layout pattern makes it easy for merchants to scan groups of settings and make desired changes';

  useEffect(() => {
    setExampleIndex(0);
  }, []);

  return (
    <>
      <PageMeta title={title} description={description} />

      <Page showTOC={false}>
        <Stack gap="4">
          <Heading as="h1">
            <Row wrap gap="2" className={styles.Heading}>
              {title}{' '}
              <StatusBadge status={{value: StatusName.Beta, message: ''}} />
            </Row>
          </Heading>
          <Lede>{description}</Lede>
          <p className={styles.InfoLine}>
            Maintainer: Core Optimize •{' '}
            <Link className={styles.InfoLineLink} href={newDiscussionLink}>
              Discuss on GitHub
            </Link>{' '}
            •{' '}
            <Link className={styles.InfoLineLink} href={knownIssuesLink}>
              {' '}
              Known issues
            </Link>
          </p>
        </Stack>
        <Tab.Group
          defaultIndex={0}
          selectedIndex={exampleIndex}
          onChange={onTabChange}
        >
          <div className={styles.TabGroup}>
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
              <Tab.Panel className={styles.Panel}>
                <Stack gap="8">
                  <Stack as="section" gap="4">
                    <PatternsExample
                      example={patterns['single-date-picker'].example}
                      patternName={`${title} > ${patterns['single-date-picker'].title}`}
                      relatedComponents={[
                        {label: 'Button', url: '/components/button'},
                        {label: 'TextFields', url: '/components/text-field'},
                      ]}
                    />
                  </Stack>
                  <Stack as="section" gap="4">
                    <Heading as="h2">
                      How the {`${patterns['single-date-picker'].title}`} helps
                      merchants
                    </Heading>
                    <div className={styles.MerchantGoal}>
                      <div>
                        <ol className={styles.MerchantGoalOL}>
                          <li>
                            The text input gives merchants the option to use the
                            keyboard to enter a date.
                          </li>
                          <li>
                            A single month calendar is previewed after selecting
                            the date input to provide visual affordance of the
                            single date picked. The calendar can then be used to
                            select a new date.
                          </li>
                        </ol>
                      </div>
                      <div className={styles.ImageWrapper}></div>
                    </div>
                  </Stack>
                  <Stack gap="4">
                    <Heading as="h2">When to use</Heading>
                    <TableContainer>
                      <Table>
                        <TableCaption className={styles.WhenToUseCaption}>
                          When merchants need to:
                        </TableCaption>
                        <Tbody>
                          <Tr>
                            <Td className={styles.UseCase} shrink>
                              Find and change app settings
                            </Td>
                            <Td>This is a description of the use case.</Td>
                          </Tr>
                          <Tr>
                            <Td className={styles.UseCase} shrink>
                              Another merchant objective
                            </Td>
                            <Td>This is a description of the use case.</Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Stack>
                  <Stack as="section" gap="4">
                    <Heading as="h2">
                      Useful to know about the{' '}
                      {patterns['single-date-picker'].title}
                    </Heading>
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
                            Labels need to simply depict the task at hand.
                            Whether that be a start date, end date, start time
                            etc.
                          </p>
                        </div>
                      </li>
                      <li className={styles.UsageGuidelinesEl}>
                        <div className={styles.ImageWrapper} />
                        <div className={styles.UsageGuidelineTxt}>
                          <p>
                            This pattern can be duplicated to allow users to add
                            an end date or time.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </Stack>
                </Stack>
              </Tab.Panel>
              <Tab.Panel className={styles.Panel}>
                <Stack as="section" gap="4">
                  <PatternsExample
                    example={patterns['date-range-picker'].example}
                    patternName={`${title} > ${patterns['date-range-picker'].title}`}
                    relatedComponents={[
                      {label: 'Button', url: '/components/button'},
                      {label: 'TextFields', url: '/components/text-field'},
                    ]}
                  />
                </Stack>
              </Tab.Panel>
              <Tab.Panel className={styles.Panel}>
                <Stack as="section" gap="4">
                  <PatternsExample
                    example={patterns['minimal'].example}
                    patternName={`${title} > ${patterns['minimal'].title}`}
                    relatedComponents={[
                      {label: 'Button', url: '/components/button'},
                      {label: 'TextFields', url: '/components/text-field'},
                    ]}
                  />
                </Stack>
              </Tab.Panel>
            </Tab.Panels>
            <Stack as="section" gap="4">
              <Heading as="h2">Related resources</Heading>
              <Grid>
                <GridItem
                  title="App settings layout"
                  description="Makes it easy for merchants to scan and find setting groups."
                  url="/TODO"
                  renderPreview={() => <Preview />}
                  status={{value: StatusName.Beta, message: ''}}
                />
                <GridItem
                  title="Resource index layout"
                  description="Makes it easy for merchants to view and manage resources."
                  url="/TODO"
                  renderPreview={() => <Preview />}
                />
                <GridItem
                  title="Resource detail layout"
                  description="Makes it easy for merchants to create, view and edit resources."
                  url="/TODO"
                  renderPreview={() => <Preview />}
                />
                <GridItem
                  title="Date picking"
                  description="Makes it easy for merchants to select and input dates and date ranges."
                  url="/TODO"
                  renderPreview={() => <Preview />}
                  status={{value: StatusName.Beta, message: ''}}
                />
              </Grid>
            </Stack>
          </div>
        </Tab.Group>
      </Page>
    </>
  );
}
