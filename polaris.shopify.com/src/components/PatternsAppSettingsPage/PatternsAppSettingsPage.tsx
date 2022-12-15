import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageMeta from '../PageMeta';
import {Stack, Row} from '../Stack';
import {Lede} from '../Lede';
import {Heading} from '../Heading';
import Preview from '../PatternThumbnailPreview';
import {TableContainer, Table, Tbody, TableCaption, Tr, Td} from '../Table';
import PatternsExample, {type PatternExample} from '../PatternsExample';
import Page from '../Page';
import styles from './PatternsAppSettingsPage.module.scss';
import {Grid, GridItem} from '../Grid';

type Pattern = {
  index: number;
  description?: string;
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
  title: 'App settings',
  slug: 'app-settings',
  description: 'This enables merchants to select a date range.',
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
};

export default function PatternsDatePickingPage() {
  const description =
    'Lets merchants easily scan many groups of settings and find the ones they want to change.';
  return (
    <>
      <PageMeta title={title} description={description} />

      <Page showTOC={false}>
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
              <Heading as="h2">How it helps merchants</Heading>
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
              <Heading as="h2">Using this pattern</Heading>
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
              <Heading as="h3">Useful to know</Heading>
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
          <Stack as="section" gap="4" className={styles.RelatedResources}>
            <Heading as="h2">Related resources</Heading>
            <Grid gapX="4" gapY="6" itemMinWidth="24rem">
              <GridItem
                title="Information architecture"
                description="Everything we create at Shopify has an underlying foundation of information architecture. If you’re a designer, a content strategist, or a UX developer, you’re already doing IA work."
                url="/foundations/information-architecture"
                renderPreview={() => (
                  <Preview
                    renderInner={false}
                    src="/og-images/foundations/information-architecture.png"
                  />
                )}
              />
              <GridItem
                title="Space"
                description="Space is the distance between objects in your design. It should be used to complement the purpose of a page, by creating hierarchy and helping the content become more useful and understandable."
                url="/design/space"
                renderPreview={() => (
                  <Preview
                    renderInner={false}
                    src="/og-images/design/space.png"
                  />
                )}
              />
              <GridItem
                title="ADG Layout"
                description="Layout design is the process of arranging visual elements such as text, images, and shapes on a page. Apps have a variety of available layouts. These layouts adapt the app body content to every screen size and device type. Selecting the proper layout for the task at hand will benefit the merchant’s experience when using your app."
                url="https://shopify.dev/apps/design-guidelines/layout"
                renderPreview={() => (
                  <Preview
                    renderInner={false}
                    src="/images/patterns/adg-layout-thumbnail.webp"
                  />
                )}
              />
              <GridItem
                title="Actionable language"
                description="Merchants use Shopify to get things done. Content should be written and structured to help them understand and take the most important actions."
                url="/content/actionable-language"
                renderPreview={() => (
                  <Preview
                    renderInner={false}
                    src="/og-images/content/actionable-language.png"
                  />
                )}
              />
            </Grid>
          </Stack>
        </Stack>
      </Page>
    </>
  );
}
