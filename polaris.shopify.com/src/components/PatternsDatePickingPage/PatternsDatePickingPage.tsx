import React, {Fragment, useEffect, useState, useRef} from 'react';
import {Tab} from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import StatusBadge from '../StatusBadge';
import {StatusName} from '../../types';
import PageMeta from '../PageMeta';
import {Stack, Row} from '../Stack';
import {Box} from '../Box';
import {Lede} from '../Lede';
import {Heading} from '../Heading';
import Preview from '../PatternThumbnailPreview';
import {TableContainer, Table, Tbody, TableCaption, Tr, Td} from '../Table';
import PatternsExample, {type PatternExample} from '../PatternsExample';
import Page from '../Page';
import styles from './PatternsDatePickingPage.module.scss';
import {Grid, GridItem} from '../Grid';
import Markdown from '../Markdown';

import remarkUnwrapImages from 'remark-unwrap-images';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';

type MarkdownString = string;

type PatternVariant = {
  description?: string;
  title: string;
  slug: string;
  howItHelps: MarkdownString;
  usefulToKnow: MarkdownString;
  example: PatternExample;
};
type MultiVariantPattern = {
  type: 'multi-variant-pattern';
  title: string;
  githubDiscussionsLink: string;
  variants: PatternVariant[];
  relatedResources: {
    href: string;
    description: string;
    title: string;
    image: {
      alt: string;
      src: string;
    };
  }[];
};

// @ts-expect-error Can't extract the special types out of react-markdown for
// some reason.
const isEmptyTr = ({node}) =>
  !Array.isArray(node.children) ||
  node.children.every(
    // @ts-expect-error Can't extract the special types out of react-markdown
    // for some reason.
    (child) => !Array.isArray(child.children) || child.children.length === 0,
  );

const pattern: MultiVariantPattern = {
  type: 'multi-variant-pattern',
  title: 'Date picking',
  githubDiscussionsLink: `https://github.com/Shopify/polaris/discussions/7852`,
  relatedResources: [
    {
      title: 'Date picker',
      description:
        'Date pickers let merchants choose dates from a visual calendar that’s consistently applied wherever dates need to be selected across Shopify.',
      href: '/components/date-picker',
      image: {
        alt: '',
        src: '/images/components/date-picker.png',
      },
    },
    {
      title: 'UTC is for everyone right?',
      description:
        "Programming with dates, times, and timezones is hard. But here's some help.",
      href: 'https://zachholman.com/talk/utc-is-enough-for-everyone-right',
      image: {
        alt: '',
        src: '/images/patterns/UTC4e1.jpeg',
      },
    },
    {
      title: 'Grammar and mechanics',
      description:
        'This guide is to help designers, developers, recruiters, UX-ers, product managers, support advisors, or anyone who writes public-facing text for Shopify.',
      href: '/content/grammar-and-mechanics#date',
      image: {
        alt: '',
        src: '/og-images/content/grammar-and-mechanics.png',
      },
    },
    {
      title: 'Actionable language',
      description:
        'Merchants use Shopify to get things done. Content should be written and structured to help them understand and take the most important actions.',
      href: '/content/actionable-language',
      image: {
        alt: '',
        src: '/og-images/content/actionable-language.png',
      },
    },
  ],
  variants: [
    {
      title: 'Single date',
      slug: 'single-date',
      description:
        'This enables merchants to type a specific date or pick it from a calendar.',
      howItHelps: `![A labeled diagram of an active input field displaying a calendar beneath it. The input field is labeled "1". The calendar is labeled "2".](/images/patterns/single-list-cover-image.png)

1. The text input gives merchants the option to use the keyboard to enter a date.
2. A single month calendar allows merchants to select a date while seeing its relationship to other days.

| | |
|-|-|
|**Schedule an event on a specific day**|Some examples of this are setting a visibility date for a new online store page, or an estimated arrival date for a shipment. Found in: Product / transfers|
|**Input memorable dates to forms**|An example of this is entering a birthdate.|
:caption[**Use when merchants need to:**]{side=top}`,
      usefulToKnow: `
| | |
|-|-|
|Labels need to simply depict the task at hand. Whether that be a start date, end date, start time etc.|![](/images/patterns/single-list-usage-1.png)|
|This pattern can be duplicated to allow users to add an end date or time.|![](/images/patterns/single-list-usage-2.png)|
`,
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
    {
      title: 'Date range',
      slug: 'date-range',
      description: 'This enables merchants to select a date range.',
      howItHelps: `![](/images/patterns/date-range-cover-image.png)

1. Providing multiple ways to select a date range gives merchants full flexibility. The list provides quick access to common options, the text input makes it easier to set large custom ranges, and the calendar is an intuitive way to set a more narrow scope.
2. Displaying two months makes it easier for merchants to select date ranges that span across both.
3. Selecting a date range may require multiple steps, so merchants prefer to explicitly confirm their selection, unlike the single date picker which closes on selection.

| | |
|-|-|
|**Analyze trends and data**|When a merchant needs to view their business metrics so that they can learn and make decisions, they use the date range picker to frame data to certain time periods. Found in: Analytics|
|**Schedule an event**|When a merchant needs to schedule an event that spans multiple days, a date range picker is necessary.|
:caption[**Use when merchants need to:**]{side=top}`,
      usefulToKnow: `
| | |
|-|-|
|Pin any relevant, merchant-specific dates to the top of the option list.|![](/images/patterns/date-range-usage-1.png)|
|If a date cannot be selected, indicate it with the [disabled text color token](/tokens/colors)|![](/images/patterns/date-range-usage-2.png)|
|If a merchant enters a nonexistent date, revert to the previously selected date.|![](/images/patterns/date-range-usage-3.png)|
`,
      example: {
        code: ` <Page
        divider
      >
        <AlphaStack gap="16">
          Coming Soon
        </AlphaStack>
      </Page>`,
      },
    },
    {
      title: 'Date list',
      slug: 'date-list',
      description:
        'This enables merchants to select a date or a date range from a list of preset dates.',
      howItHelps: `![](/images/patterns/date-list-cover-image.png)

1. The date list provides merchants with suggested dates. This makes date picking simpler when useful dates are predictable and custom dates aren’t necessary.

| | |
|-|-|
|**Select from templated dates**|When a templated list of dates is sufficient for the merchant task, use the date list because it is a task that does not require in-depth filtering of historical information. Found in: Inbox app / Overview|
:caption[**Use when merchants need to:**]{side=top}`,
      usefulToKnow: `
| | |
|-|-|
|In the button preview, set a default date range that a merchant will most likely use.|![](/images/patterns/date-list-usage-1.png)|
|Single dates should be at the top of the list, followed by date ranges from smallest to largest ranges.|![](/images/patterns/date-list-usage-2.png)|
|A date list can be modified to serve unique situations, like providing suggested search queries in the customer segment editor.|![](/images/patterns/date-list-usage-3.png)|
`,
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
        <Page
        divider
      >
        <AlphaStack gap="16">
          Coming Soon
        </AlphaStack>
      </Page>
        `,
      },
    },
  ],
};

const HowItHelps = ({children}: {children: string}) => (
  <Markdown
    remarkPlugins={[remarkUnwrapImages, remarkDirective, remarkDirectiveRehype]}
    components={{
      img: ({src, alt}) =>
        src ? (
          <div className={styles.ImageWrapper}>
            <Image fill src={src} alt={alt ?? ''} />
          </div>
        ) : null,
      ol: (props) => <Stack as="ol" gap="2" {...props} />,
      li: (props) => <li {...props} />,
      table: ({children}) => (
        <TableContainer>
          <Table className={styles.UsageTable}>{children}</Table>
        </TableContainer>
      ),
      tbody: (props) => <Tbody {...props} />,
      // We don't use theads here
      thead: () => null,
      // remark-directive is inserting extra, blank trs for some reason
      tr: (props) => (isEmptyTr(props) ? null : <Tr {...props} />),
      // @ts-expect-error Something inside react-markdown is incorrectly typing
      // the `onCopy` callback as accepting a `table` event. Different react
      // versions perhaps?
      td: (props) => <Td {...props} />,
      // @ts-expect-error react-markdown doesn't know about the extra data
      // remark-directive is returning for us
      caption: ({children, side}) => (
        <TableCaption side={side}>{children}</TableCaption>
      ),
      strong: ({children}) => (
        <Box as="strong" style={{fontWeight: 'var(--font-weight-700)'}}>
          {children}
        </Box>
      ),
    }}
  >
    {children}
  </Markdown>
);

const UsefulToKnow = ({children}: {children: string}) => (
  <Markdown
    remarkPlugins={[remarkUnwrapImages, remarkDirective, remarkDirectiveRehype]}
    components={{
      img: ({src, alt}) =>
        src ? (
          <div className={styles.ImageWrapper}>
            <Image fill src={src} alt={alt ?? ''} />
          </div>
        ) : null,
      ol: (props) => <Stack as="ol" gap="2" {...props} />,
      li: (props) => <li {...props} />,
      // We're using table as a handy shortcut for rendering a CSS grid
      // But that grid is actually rendered as an unordered list of items!
      // Should probably just be MDX at this point...
      table: ({children}) => (
        <Box as="ul" className={styles.UsageGuidelinesGrid}>
          {children}
        </Box>
      ),
      // don't need this extra wrapping element, so pass it through
      tbody: ({children}) => <Fragment>{children}</Fragment>,
      // We don't use theads here
      thead: () => null,
      tr: (props) =>
        // remark-directive is inserting extra, blank trs for some reason
        isEmptyTr(props) ? null : (
          <Box as="li" className={styles.UsageGuidelinesRow}>
            {props.children}
          </Box>
        ),
      td: ({children, node}) =>
        node?.children?.[0].type === 'text' ? (
          <p>{children}</p>
        ) : (
          <Fragment>{children}</Fragment>
        ),
      strong: ({children}) => (
        <Box as="strong" style={{fontWeight: 'var(--font-weight-700)'}}>
          {children}
        </Box>
      ),
    }}
  >
    {children}
  </Markdown>
);

// TODO: Pull this from the markdown file
const isBeta = false;

export default function PatternsDatePickingPage() {
  const [exampleIndex, setExampleIndex] = useState(0);
  const {query, replace, isReady} = useRouter();
  const [showCode, toggleCode] = useState(false);
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const onTabChange = (index: number) => {
    setExampleIndex(index);
    replace(
      {
        query: {
          ...query,
          tab: pattern.variants[index].slug,
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
      const index = pattern.variants.findIndex(
        (variant) => variant.slug === query.tab,
      );
      setExampleIndex(index);
    }
  }, [query.tab, isReady]);
  const description =
    'Lets merchants select a date or date range to help them filter information or objects and schedule events or actions.';

  useEffect(() => {
    setExampleIndex(0);
  }, []);

  return (
    <>
      <PageMeta title={pattern.title} description={description} />

      <Page showTOC={true}>
        <Stack gap="8">
          <Stack gap="4">
            <Heading as="h1">
              <Row wrap gap="2" className={styles.Heading}>
                {pattern.title}{' '}
                {isBeta ? (
                  <StatusBadge status={{value: StatusName.Beta, message: ''}} />
                ) : null}
              </Row>
            </Heading>
            <Lede>{description}</Lede>
            <p className={styles.InfoLine}>
              <Link
                className={styles.InfoLineLink}
                href={pattern.githubDiscussionsLink}
              >
                Discuss on GitHub
              </Link>
            </p>
          </Stack>
          <Tab.Group
            defaultIndex={0}
            selectedIndex={exampleIndex}
            onChange={onTabChange}
          >
            <div className={styles.TabGroup} data-selected={exampleIndex}>
              <Tab.List ref={tabListRef}>
                <div className={styles.ExamplesList} id="examples">
                  {pattern.variants.map((variant) => (
                    <Tab
                      key={`${variant.slug}-tab`}
                      onFocus={() => {
                        if (!tabListRef.current) return;
                        tabListRef.current.scrollIntoView({
                          block: 'end',
                          inline: 'nearest',
                          behavior: 'smooth',
                        });
                      }}
                    >
                      <span>{variant.title}</span>
                    </Tab>
                  ))}
                </div>
              </Tab.List>

              <Tab.Panels>
                {pattern.variants.map((variant) => (
                  <Tab.Panel
                    key={`${variant.slug}-panel`}
                    className={styles.Panel}
                  >
                    <Stack gap="8">
                      {variant.description ? (
                        <Markdown
                          components={{
                            p: (props) => (
                              <Box
                                as="p"
                                className={styles.VariantDescription}
                                {...props}
                              />
                            ),
                          }}
                        >
                          {variant.description}
                        </Markdown>
                      ) : null}
                      <Stack
                        as="section"
                        gap="4"
                        className={styles.MerchantGoal}
                      >
                        <Heading as="h2" id="how-it-helps-merchants">
                          How it helps merchants
                        </Heading>
                        <HowItHelps>{variant.howItHelps}</HowItHelps>
                      </Stack>
                      <Stack as="section" gap="4">
                        <Heading as="h2" id="using-this-pattern">
                          Using this pattern
                        </Heading>
                        <PatternsExample
                          example={variant.example}
                          showCode={showCode}
                          onCodeToggle={() =>
                            toggleCode((showCode) => !showCode)
                          }
                          patternName={`${pattern.title} > ${variant.title}`}
                          relatedComponents={[
                            {
                              label: 'Date picker',
                              url: '/components/date-picker',
                            },
                            {label: 'Text', url: '/components/text-field'},
                          ]}
                        />
                      </Stack>
                      <Stack as="section" gap="4">
                        <Heading
                          as="h3"
                          className={styles.UsefulHeading}
                          id="useful-to-know"
                        >
                          Useful to know
                        </Heading>
                        <UsefulToKnow>{variant.usefulToKnow}</UsefulToKnow>
                      </Stack>
                    </Stack>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </div>
          </Tab.Group>
          <Stack as="section" gap="4">
            <Heading as="h2" id="related-resources">
              Related resources
            </Heading>
            <Grid gapX="4" gapY="6" itemMinWidth="16rem">
              {pattern.relatedResources.map((resource, i) => (
                <GridItem
                  key={`date-picking-related-resource-${i}`}
                  title={resource.title}
                  description={resource.description}
                  url={resource.href}
                  renderPreview={() => (
                    <Preview
                      renderInner={false}
                      alt={resource.image.alt}
                      src={resource.image.src}
                    />
                  )}
                />
              ))}
            </Grid>
          </Stack>
        </Stack>
      </Page>
    </>
  );
}
