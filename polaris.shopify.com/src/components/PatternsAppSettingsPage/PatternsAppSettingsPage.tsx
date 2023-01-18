import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageMeta from '../PageMeta';
import {Stack, Row} from '../Stack';
import {Lede} from '../Lede';
import {Heading} from '../Heading';
import {TableContainer, Table, Tbody, TableCaption, Tr, Td} from '../Table';
import PatternsExample, {type PatternExample} from '../PatternsExample';
import Page from '../Page';
import styles from './PatternsAppSettingsPage.module.scss';
import PatternsRelatedResources from '../PatternsRelatedResources';
type MarkdownString = string;
type Pattern = {
  index: number;
  description?: string;
  relatedResources: MarkdownString;
  title: string;
  slug: string;
  designDecisionListItems?: string[];
  designDecisions?: {
    listItems?: string[];
    image?: boolean;
  };
  example: PatternExample;
};

const title = 'App settings';

const newDiscussionLink = `https://github.com/Shopify/polaris/discussions/7852`;
const pattern: Pattern = {
  index: 0,
  title: 'App settings layout',
  slug: 'app-settings-layout',
  description: 'This enables merchants to select a date range.',
  relatedResources: `* See another two-column layout in use in the [Resource detail layout](/patterns/resource-details-layout) pattern.
* See a single-column layout in use in the [Resource index layout](/patterns/resource-index-layout) pattern.
* Learn more about [Layout](https://shopify.dev/apps/design-guidelines/layout) in the app design guidelines.
* Check out the Polaris [Spacing](/design/space) guidelines to understand Polaris grid and spacing scale.`,
  example: {
    context: `
      <div style={{ paddingBottom: '2rem' }}>
        ____CODE____
      </div>`,
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
      <AlphaStack gap="16" align="center">
        <Columns columns={{ xs: "1fr", md: "2fr 5fr" }}>
          <Box as="section" paddingInlineStart={{ xs: 4, sm: 0 }} paddingInlineEnd={{ xs: 2, sm: 0 }}>
            <AlphaStack>
              <Text as="h3" variant="headingMd">
                InterJambs
              </Text>
              <Text as="p" variant="bodyMd">
                Interjambs are the rounded protruding bits of your puzzlie piece
              </Text>
            </AlphaStack>
          </Box>
          <AlphaCard roundedAbove="sm">
            <AlphaStack fullWidth>
              <TextField label="Interjamb style" />
              <TextField label="Interjamb ratio" />
            </AlphaStack>
          </AlphaCard>
        </Columns>
        <Columns columns={{ xs: "1fr", md: "2fr 5fr" }}>
        <Box as="section" paddingInlineStart={{ xs: 2, sm: 0 }} paddingInlineEnd={{ xs: 2, sm: 0 }}>
            <AlphaStack>
              <Text as="h3" variant="headingMd">
                Dimensions
              </Text>
              <Text as="p" variant="bodyMd">
                Interjambs are the rounded protruding bits of your puzzlie piece
              </Text>
            </AlphaStack>
          </Box>
          <AlphaCard roundedAbove="sm">
            <AlphaStack fullWidth>
              <TextField label="Horizontal" />
              <TextField label="Interjamb ratio" />
            </AlphaStack>
          </AlphaCard>
        </Columns>
      </AlphaStack>
    </Page>`,
  },
};

export default function PatternsDatePickingPage() {
  const description =
    'Lets merchants easily scan many groups of settings and find the ones they want to change.';
  return (
    <>
      <PageMeta title={title} description={description} />

      <Page showTOC>
        <Stack gap="4" className={styles.Header}>
          <Heading as="h1">
            <Row wrap gap="2" className={styles.Heading}>
              {title}{' '}
            </Row>
          </Heading>
          <Lede>{description}</Lede>
          <p className={styles.InfoLine}>
            <Link className={styles.InfoLineLink} href={newDiscussionLink}>
              Discuss on GitHub
            </Link>{' '}
          </p>
        </Stack>
        <Stack gap="4">
          <Stack gap="8">
            <Stack as="section" gap="4" className={styles.MerchantGoal}>
              <Heading as="h2" id="how-it-helps-merchants">
                How it helps merchants
              </Heading>
              <div className={styles.ImageWrapper}>
                <Image
                  alt=""
                  fill
                  src="/images/patterns/app-settings-cover-image.png"
                />
              </div>
              <div>
                <Stack gap="4" as="ol">
                  <li>
                    In the left column, glanceable labels and descriptions are
                    listed to make it easier for merchants to scan the page and
                    quickly find what they are looking for.
                  </li>
                  <li>
                    {`In the right column, settings are grouped in cards to make
                    it easier for merchants to configure a setting after it's
                    been found, or to configure multiple settings that might
                    belong together.`}
                  </li>
                </Stack>
              </div>
              <TableContainer>
                <Table>
                  <TableCaption className={styles.WhenToUseCaption}>
                    Use when merchants need to:
                  </TableCaption>
                  <Tbody>
                    <Tr>
                      <Td className={styles.UseCase} shrink>
                        Find and change app settings
                      </Td>
                      <Td>
                        This pattern is used specifically for finding and
                        updating individual app settings within the Shopify
                        admin.
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Stack>
            <Stack as="section" gap="4">
              <Heading as="h2" id="using-this-pattern">
                Using this pattern
              </Heading>
              <PatternsExample
                example={pattern.example}
                patternName={`${title} > ${pattern.title}`}
                relatedComponents={[
                  {label: 'Page', url: '/components/page'},
                  {label: 'Layout', url: '/components/layout'},
                  {label: 'Card', url: '/components/card'},
                  {label: 'FormLayout', url: '/components/form-layout'},
                ]}
              />
            </Stack>

            <Stack as="section" gap="4">
              <Heading as="h3" id="useful-to-know">
                Useful to know
              </Heading>
              <Stack as="ul" className={styles.UsageGuidelinesWrapper} gap="4">
                <Row as="li" className={styles.UsageGuidelinesEl} gap="4">
                  <div className={styles.UsageGuidelineTxt}>
                    <p>{"Don't include a description unless it's helpful"}</p>
                  </div>
                  <div className={styles.ImageWrapper}>
                    <Image
                      alt=""
                      fill
                      src="/images/patterns/app-settings-usage-1.png"
                    />
                  </div>
                </Row>
                <Row as="li" className={styles.UsageGuidelinesEl} gap="4">
                  <div className={styles.UsageGuidelineTxt}>
                    <p>Place grouped settings within cards</p>
                  </div>
                  <div className={styles.ImageWrapper}>
                    <Image
                      alt=""
                      fill
                      src="/images/patterns/app-settings-usage-2.png"
                    />
                  </div>
                </Row>
                <Row as="li" className={styles.UsageGuidelinesEl} gap="4">
                  <div className={styles.UsageGuidelineTxt}>
                    <p>Stack all setting groups vertically on the page</p>
                  </div>
                  <div className={styles.ImageWrapper}>
                    <Image
                      alt=""
                      fill
                      src="/images/patterns/app-settings-usage-3.png"
                    />
                  </div>
                </Row>
              </Stack>
            </Stack>
          </Stack>
          <PatternsRelatedResources>
            {pattern.relatedResources}
          </PatternsRelatedResources>
        </Stack>
      </Page>
    </>
  );
}
