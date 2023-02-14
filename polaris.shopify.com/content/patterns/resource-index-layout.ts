import type {SingleVariantPattern} from '../../src/types';

const pattern: SingleVariantPattern = {
  title: 'Resource index layout',
  description:
    'Lets merchants effectively view, manage, and take action on resource objects.',
  howItHelps: `![A labeled diagram of an app settings page layout. The left column is labeled "1" it contains glanceable labels and descriptions. The right column is labeled "2" and contains a list of cards.](/images/patterns/resource-index-cover-image.png)

1. The resource index layout is based on a single column to create a clear top-to-bottom hierarchy of tasks and to provide horizontal space for resource data.
2. At the top of the page, merchants find the page title and actions that affect the index as a whole.
3. At the top of the index, merchants can use filters, sorting, and multi-select actions that affect the list below.
4. In the main body of the index, merchants find the individual resource objects that they want to view or manage.

:::customtable

### **Use when merchants need to**

**Overview and manage resources**
:   Resource objects, such as products, orders and customers, are at the heart of merchants’ businesses. While resource types can be very different, they typically share many general activities, such as adding, finding, or taking action. Use the resource index layout pattern when merchants need to organize objects and carry out such activities. An example can be found in Products.

:::`,
  usefulToKnow: `
  | | |
  |-|-|
  |Use the resource type as page title.|![](/images/patterns/resource-index-usage-1.png)|
  |Always use the primary action in the top right corner for resource creation. Remove the button if there is no such functionality.|![](/images/patterns/resource-index-usage-2.png)|
  |Set the page width to normal if the index doesn’t need full width.|![](/images/patterns/resource-index-usage-3.png)|`,
  relatedResources: `* The [Resource detail layout](/patterns/resource-details-layout) pattern is a complement to the resource index layout pattern.
* Use the [Empty state component](/components/empty-state) when the resource index is empty.
* Learn about the meaning of “resources” on the [Resource list](/components/resource-list) component page
* Learn more about [Layout](https://shopify.dev/apps/design-guidelines/layout) in the app design guidelines.
* Check out the Polaris [Spacing](/design/space) guidelines to understand Polaris grid and spacing scale.`,
  example: {
    relatedComponents: [
      {
        label: 'Layout',
        url: '/components/layout',
      },
      {
        label: 'Page',
        url: '/components/page',
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
