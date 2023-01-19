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
import PatternsExample, {type PatternExample} from '../PatternsExample';
import Page from '../Page';
import styles from './PatternsDatePickingPage.module.scss';
import Markdown from '../Markdown';

import remarkUnwrapImages from 'remark-unwrap-images';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import PatternsRelatedResources from '../PatternsRelatedResources';
import {
  remarkDefinitionList,
  defListHastHandlers,
} from 'remark-definition-list';

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
  relatedResources: MarkdownString;
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
  relatedResources: `* Programming timezones can be finicky. Get great tips in the article [UTC is for everyone right](https://zachholman.com/talk/utc-is-enough-for-everyone-right)?
* Learn about date formatting in the [Grammar and mechanics](/content/grammar-and-mechanics#date) guidelines.
* See how to craft effective button labels in the [Actionable language](/content/actionable-language) guidelines.`,
  variants: [
    {
      title: 'Single date',
      slug: 'single-date',
      description:
        'This enables merchants to type a specific date or pick it from a calendar.',
      howItHelps: `![A labeled diagram of an active input field displaying a calendar beneath it. The input field is labeled "1". The calendar is labeled "2".](/images/patterns/single-list-cover-image.png)

1. The text input gives merchants the option to use the keyboard to enter a date.
2. A single month calendar allows merchants to select a date while seeing its relationship to other days.

:::customtable

### **Use when merchants need to:**

**Schedule an event on a specific day**
:   Some examples of this are setting a visibility date for a new online store page, or an estimated arrival date for a shipment. Found in: Product / transfers

**Input memorable dates to forms**
:   An example of this is entering a birthdate.

:::
`,
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

:::customtable

### **Use when merchants need to**

**Analyze trends and data**
:   When a merchant needs to view their business metrics so that they can learn and make decisions, they use the date range picker to frame data to certain time periods. Found in: Analytics

**Schedule an event**
:   When a merchant needs to schedule an event that spans multiple days, a date range picker is necessary.

:::`,
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

:::customtable

### **Use when merchants need to**

**Select from templated dates**
:   When a templated list of dates is sufficient for the merchant task, use the date list because it is a task that does not require in-depth filtering of historical information. Found in: Inbox app / Overview

:::`,
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
    remarkPlugins={[
      remarkUnwrapImages,
      remarkDefinitionList,
      remarkDirective,
      remarkDirectiveRehype,
    ]}
    // @ts-expect-error incompatible type to remark-rehype in remark-definition-list package.
    remarkRehypeOptions={{handlers: defListHastHandlers}}
    components={{
      img: ({src, alt}) =>
        src ? (
          <div className={styles.ImageWrapper}>
            <Image fill src={src} alt={alt ?? ''} />
          </div>
        ) : null,
      ol: (props) => <Stack as="ol" gap="2" {...props} />,
      li: (props) => <li {...props} />,
      dl: (props) => (
        <Box as="dl" className={styles.DefinitionList}>
          {props.children}
        </Box>
      ),
      dt: (props) => <dt>{props.children}</dt>,
      dd: (props) => <dd>{props.children}</dd>,
      // @ts-expect-error react-markdown doesn't know about the extra data
      customtable: ({children, ...props}) => {
        return <div className={styles.CustomTable}>{children}</div>;
      },
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
    remarkPlugins={[
      remarkUnwrapImages,
      remarkDirective,
      remarkDirectiveRehype,
      remarkDefinitionList,
    ]}
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
              <Tab.List
                className={styles.ExamplesList}
                id="examples"
                ref={tabListRef}
              >
                {pattern.variants.map((variant) => (
                  <Tab
                    key={`${variant.slug}-tab`}
                    className={styles.Tab}
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
                      <Stack
                        as="section"
                        gap="4"
                        className={styles.UsefulToKnow}
                      >
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
          <PatternsRelatedResources>
            {pattern.relatedResources}
          </PatternsRelatedResources>
        </Stack>
      </Page>
    </>
  );
}
