import type {SingleVariantPattern} from '../../src/types';

const pattern: SingleVariantPattern = {
  title: 'App settings layout',
  description:
    'Lets merchants easily scan many groups of settings and find the ones they want to change.',
  howItHelps: `![App settings page with two columns](/images/patterns/app-settings-cover-image.png)

  1. In the left column, glanceable labels and descriptions are listed to make it easier for merchants to scan the page and quickly find what they are looking for.
  2. In the right column, settings are grouped in cards to make it easier for merchants to configure a setting after it's been found, or to configure multiple settings that might belong together.

  :::customtable

  ### **Use when merchants need to**

  **Find and change app settings**
  :   This pattern is used specifically for finding and updating individual app settings within the Shopify admin.

  :::
  `,
  usefulToKnow: `
  | | |
  |-|-|
  |Don't include a description unless it's helpful.|![Section header with no description on an app settings page](/images/patterns/app-settings-usage-1.png)|
  |Place grouped settings within cards.|![App settings page with section headings and grouped settings](/images/patterns/app-settings-usage-2.png)|
  |Stack all setting groups vertically on the page.|![App settings page with two vertically stacked sections](/images/patterns/app-settings-usage-3.png)|`,
  relatedResources: `* See another two-column layout in use in the [Resource detail layout](/patterns/resource-details-layout) pattern.
* See a single-column layout in use in the [Resource index layout](/patterns/resource-index-layout) pattern.
* Learn more about [Layout](https://shopify.dev/apps/design-guidelines/layout) in the app design guidelines.
* Check out the Polaris [Spacing](/design/space) guidelines to understand Polaris grid and spacing scale.`,
  example: {
    relatedComponents: [
      {
        label: 'AlphaStack',
        url: '/components/layout-and-structure/alpha-stack',
      },
      {label: 'AlphaCard', url: '/components/layout-and-structure/alpha-card'},
      {label: 'Columns', url: '/components/layout-and-structure/columns'},
      {label: 'Box', url: '/components/layout-and-structure/box'},
    ],
    context: `
      <div style={{ paddingBottom: '2rem' }}>
        ____CODE____
      </div>`,
    code: `<Page
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
            <AlphaStack gap="4">
              <Text as="h3" variant="headingMd">
                InterJambs
              </Text>
              <Text as="p" variant="bodyMd">
                Interjambs are the rounded protruding bits of your puzzlie piece
              </Text>
            </AlphaStack>
          </Box>
          <AlphaCard roundedAbove="sm">
            <AlphaStack gap="4" fullWidth>
              <TextField label="Interjamb style" />
              <TextField label="Interjamb ratio" />
            </AlphaStack>
          </AlphaCard>
        </Columns>
        <Columns columns={{ xs: "1fr", md: "2fr 5fr" }}>
        <Box as="section" paddingInlineStart={{ xs: 2, sm: 0 }} paddingInlineEnd={{ xs: 2, sm: 0 }}>
            <AlphaStack gap="4">
              <Text as="h3" variant="headingMd">
                Dimensions
              </Text>
              <Text as="p" variant="bodyMd">
                Interjambs are the rounded protruding bits of your puzzlie piece
              </Text>
            </AlphaStack>
          </Box>
          <AlphaCard roundedAbove="sm">
            <AlphaStack gap="4" fullWidth>
              <TextField label="Horizontal" />
              <TextField label="Interjamb ratio" />
            </AlphaStack>
          </AlphaCard>
        </Columns>
      </AlphaStack>
    </Page>`,
  },
};

export default pattern;
