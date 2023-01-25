import type {SingleVariantPattern} from '../../src/types';

const pattern: SingleVariantPattern = {
  title: 'Resource detail layout',
  description:
    'Lets merchants effectively create, view, and edit any resource object.',
  howItHelps: `![A labeled diagram of an app settings page layout. The left column is labeled "1" it contains glanceable labels and descriptions. The right column is labeled "2" and contains a list of cards.](/images/patterns/resource-index-cover-image.png)

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
  |Always use the default width. Full width tends to waste space and make the page harder to parse.|![](/images/patterns/resource-index-pattern-usage-1.png)|
  |Group similar content in the same card.|![](/images/patterns/resource-index-pattern-usage-2.png)|
  |Put information that defines the resource object in the primary column.|![](/images/patterns/resource-index-pattern-usage-2.png)|,
  |Put supporting information such as status, metadata, and summaries in the secondary column.|![](/images/patterns/resource-index-pattern-usage-2.png)|
  |Arrange content in order of importance.|![](/images/patterns/resource-index-pattern-usage-2.png)|`,
  relatedResources: `* The [Resource detail layout](/patterns/resource-details-layout) pattern is a complement to the resource index layout pattern.
* Use the [Empty state component](/components/empty-state) when the resource index is empty.
* Learn about the meaning of “resources” on the [Resource list](/components/resource-list) component page
* Learn more about [Layout](https://shopify.dev/apps/design-guidelines/layout) the app design guidelines.
* Check out the Polaris [Spacing](/design/space) guidelines to understand Polaris grid and spacing scale.`,
  example: {
    relatedComponents: [
      {
        label: 'Page',
        url: '/components/page',
      },
      {
        label: 'Layout',
        url: '/components/layout',
      },
      {
        label: 'Card',
        url: '/components/card',
      },
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
      <AlphaCard>Coming Soon</AlphaCard>
    </Page>`,
  },
};

export default pattern;
