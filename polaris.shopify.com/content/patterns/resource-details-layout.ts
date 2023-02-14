import type {SingleVariantPattern} from '../../src/types';

const pattern: SingleVariantPattern = {
  title: 'Resource details layout',
  description:
    'Lets merchants effectively create, view, and edit any resource object.',
  howItHelps: `![Product details page](/images/patterns/resource-detail-cover-image.png)

1. The page header provides easy access to actions and navigation. It spans the full width of the page to show merchants that these actions represent the page as a whole.
2. The main content is split in two columns, primary content to the left and secondary content to the right. The primary content occupies two thirds of the page to give more space to what’s most important most of the time.
3. Content is placed in cards, and similar content is grouped in the same card. This helps merchant find and focus on specific subtasks.

:::customtable

### **Use when merchants need to**

**View and edit resource objects**
:   This pattern is typically paired with the [resource index layout](/patterns/resource-index-layout) pattern. Together they create one of the Shopify admin’s strongest patterns. Merchants start learning how to use it when they create their first product, and then continue to use it for other essential resource objects such as orders and customers. Use it when merchants need to manage any individual resource object, including niched ones such as discounts, shipping labels, and newsletters.

**Create resource objects**
:   Using the resource detail layout when merchants create new resources teaches them both what a resource page looks like and how edit one later.

:::
`,
  usefulToKnow: `
  | | |
  |-|-|
  |Always use the default width. Full width tends to waste space and make the page harder to parse.|![Details page with margins on either side of the main content.](/images/patterns/resource-detail-usage-1.png)|
  |Group similar content in the same card.|![Diagram showing multiple cards compared to a single card that groups the same content.](/images/patterns/resource-detail-usage-2.png)|
  |Put information that defines the resource object in the primary column.|![Product detail example](/images/patterns/resource-detail-usage-3.png)|,
  |Put supporting information such as status, metadata, and summaries in the secondary column.|![Product details page with the secondary column outlined.](/images/patterns/resource-detail-usage-4.png)|
  |Arrange content in order of importance.|![Product details page with “Very important section” card placed above “Somewhat important section” card.](/images/patterns/resource-detail-usage-5.png)|`,
  relatedResources: `* The [Resource index layout](/patterns/resource-index-layout) pattern is a complement to the resource detail layout pattern.
* Learn about the meaning of “resources” on the [Resource list](/components/resource-list) component page
* Learn more about [Layout](https://shopify.dev/apps/design-guidelines/layout) in the app design guidelines.
* Check out the Polaris [Spacing](/design/space) guidelines to understand Polaris grid and spacing scale.`,
  example: {
    relatedComponents: [
      {
        label: 'AlphaCard',
        url: '/components/alpha-card',
      },
      {
        label: 'AlphaStack',
        url: '/components/alpha-stack',
      },
      {
        label: 'Columns',
        url: '/components/columns',
      },
      {
        label: 'Page',
        url: '/components/page',
      },
    ],
    snippetCode: `
    function ResourceDetailsLayout() {
      const SkeletonLabel = (props) => {
        return (
          <Box
            background="surface-neutral"
            minHeight="1rem"
            maxWidth="5rem"
            borderRadius="base"
            {...props}
          />
        );
      };
      return (
        <Page
          breadcrumbs={[{ content: "Products", url: "/products" }]}
          title="Product"
          actionGroups={[
            {
              title: "More actions",
              accessibilityLabel: "More actions",
              actions: [
                {
                  content: "Share on Mastodon",
                  accessibilityLabel: "Individual action label",
                  onAction: () => alert("Share on Mastodon action"),
                },
              ],
            },
          ]}
          pagination={{
            hasPrevious: true,
            hasNext: true,
          }}
        >
          <Columns columns={{ xs: 1, md: "2fr 1fr" }}>
            <AlphaStack fullWidth>
              <AlphaCard roundedAbove="sm">
                <AlphaStack fullWidth>
                  <SkeletonLabel />
                  <Box border="divider" borderRadius="base" minHeight="2rem" />
                  <SkeletonLabel maxWidth="8rem" />
                  <Box border="divider" borderRadius="base" minHeight="20rem" />
                </AlphaStack>
              </AlphaCard>
              <AlphaCard roundedAbove="sm">
                <AlphaStack fullWidth>
                  <SkeletonDisplayText size="small" />
                  <Columns columns={{ xs: 1, md: 2 }}>
                    <Box border="divider" borderRadius="base" minHeight="10rem" />
                    <Box border="divider" borderRadius="base" minHeight="10rem" />
                  </Columns>
                </AlphaStack>
              </AlphaCard>
            </AlphaStack>
            <AlphaStack fullWidth>
              <AlphaCard roundedAbove="sm">
                <AlphaStack fullWidth>
                  <SkeletonDisplayText size="small" />
                  <Box border="divider" borderRadius="base" minHeight="2rem" />
                  <Box>
                    <Bleed marginInline={{ xs: 4, sm: 5 }}>
                      <Divider borderStyle="divider" />
                    </Bleed>
                  </Box>
                  <SkeletonLabel />
                  <Divider borderStyle="divider" />
                  <SkeletonBodyText />
                </AlphaStack>
              </AlphaCard>
              <AlphaCard roundedAbove="sm">
                <AlphaStack fullWidth>
                  <SkeletonLabel />
                  <Box border="divider" borderRadius="base" minHeight="2rem" />
                  <SkeletonLabel maxWidth="4rem" />
                  <Box border="divider" borderRadius="base" minHeight="2rem" />
                  <SkeletonLabel />
                  <SkeletonBodyText />
                </AlphaStack>
              </AlphaCard>
            </AlphaStack>
          </Columns>
        </Page>
      );
    }`,
    context: `
      <div style={{ paddingBottom: '2rem' }}>
        ____CODE____
      </div>`,
    code: `{(function ResourceDetailsLayout() {
      const SkeletonLabel = (props) => {
        return (
          <Box
            background="surface-neutral"
            minHeight="1rem"
            maxWidth="5rem"
            borderRadius="base"
            {...props}
          />
        );
      };
      return (
        <Page
          breadcrumbs={[{ content: "Products", url: "/products" }]}
          title="Product"
          actionGroups={[
            {
              title: "More actions",
              accessibilityLabel: "More actions",
              actions: [
                {
                  content: "Share on Mastodon",
                  accessibilityLabel: "Individual action label",
                  onAction: () => alert("Share on Mastodon action"),
                },
              ],
            },
          ]}
          pagination={{
            hasPrevious: true,
            hasNext: true,
          }}
        >
          <Columns columns={{ xs: 1, md: "2fr 1fr" }}>
            <AlphaStack fullWidth>
              <AlphaCard roundedAbove="sm">
                <AlphaStack fullWidth>
                  <SkeletonLabel />
                  <Box border="divider" borderRadius="base" minHeight="2rem" />
                  <SkeletonLabel maxWidth="8rem" />
                  <Box border="divider" borderRadius="base" minHeight="20rem" />
                </AlphaStack>
              </AlphaCard>
              <AlphaCard roundedAbove="sm">
                <AlphaStack fullWidth>
                  <SkeletonDisplayText size="small" />
                  <Columns columns={{ xs: 1, md: 2 }}>
                    <Box border="divider" borderRadius="base" minHeight="10rem" />
                    <Box border="divider" borderRadius="base" minHeight="10rem" />
                  </Columns>
                </AlphaStack>
              </AlphaCard>
            </AlphaStack>
            <AlphaStack fullWidth>
              <AlphaCard roundedAbove="sm">
                <AlphaStack fullWidth>
                  <SkeletonDisplayText size="small" />
                  <Box border="divider" borderRadius="base" minHeight="2rem" />
                  <Box>
                    <Bleed marginInline={{ xs: 4, sm: 5 }}>
                      <Divider borderStyle="divider" />
                    </Bleed>
                  </Box>
                  <SkeletonLabel />
                  <Divider borderStyle="divider" />
                  <SkeletonBodyText />
                </AlphaStack>
              </AlphaCard>
              <AlphaCard roundedAbove="sm">
                <AlphaStack fullWidth>
                  <SkeletonLabel />
                  <Box border="divider" borderRadius="base" minHeight="2rem" />
                  <SkeletonLabel maxWidth="4rem" />
                  <Box border="divider" borderRadius="base" minHeight="2rem" />
                  <SkeletonLabel />
                  <SkeletonBodyText />
                </AlphaStack>
              </AlphaCard>
            </AlphaStack>
          </Columns>
        </Page>
      );
    })()}`,
  },
};

export default pattern;
