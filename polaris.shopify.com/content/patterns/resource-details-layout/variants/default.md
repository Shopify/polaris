---
hideFromNav: true
---

<div as="HowItHelps">

## How it helps merchants

![Product details page](/images/patterns/resource-details-layout/resource-detail-cover-image.png)

1. The page header provides easy access to actions and navigation. It spans the full width of the page to show merchants that these actions represent the page as a whole.
2. The main content is split in two columns, primary content to the left and secondary content to the right. The primary content occupies two thirds of the page to give more space to what’s most important most of the time.
3. Content is placed in cards, and similar content is grouped in the same card. This helps merchant find and focus on specific subtasks.

<div as="DefinitionTable">

### Use when merchants need to:

**View and edit resource objects**
: This pattern is typically paired with the [resource index layout](/patterns/resource-index-layout) pattern. Together they create one of the Shopify admin’s strongest patterns. Merchants start learning how to use it when they create their first product, and then continue to use it for other essential resource objects such as orders and customers. Use it when merchants need to manage any individual resource object, including niched ones such as discounts, shipping labels, and newsletters.

**Create resource objects**
: Using the resource detail layout when merchants create new resources teaches them both what a resource page looks like and how edit one later.

</div>
</div>
<div as="Usage">

## Using this pattern

This pattern uses the [`Card`](/components/layout-and-structure/alpha-card), [`Stack`](/components/layout-and-structure/stack), [`Columns`](/components/layout-and-structure/columns) and [`Page`](/components/layout-and-structure/page) components.

<!-- prettier-ignore -->
```javascript {"type":"previewContext","for":"example"}
<div style={{ paddingBottom: '2rem' }}>
  {(____CODE____)()}
</div>
```

<!-- prettier-ignore -->
```javascript {"type":"sandboxContext","for":"example"}
{(____CODE____)()}
```

```javascript {"type":"livePreview","id":"example"}
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
      backAction={{content: 'Products', url: '/products'}}
      title="Product"
      secondaryActions={[
        {
          content: 'Duplicate',
          icon: DuplicateMinor,
          accessibilityLabel: 'Secondary action label',
          onAction: () => alert('Duplicate action'),
        },
        {
          content: 'Archive',
          icon: ArchiveMinor,
          accessibilityLabel: 'Secondary action label',
          onAction: () => alert('Archive action'),
        },
        {
          content: 'Delete',
          icon: DeleteMinor,
          destructive: true,
          accessibilityLabel: 'Secondary action label',
          onAction: () => alert('Delete action'),
        },
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <Columns columns={{xs: 1, md: '2fr 1fr'}} gap="4">
        <Stack gap="4">
          <Card roundedAbove="sm">
            <Stack gap="4">
              <SkeletonLabel />
              <Box border="divider" borderRadius="base" minHeight="2rem" />
              <SkeletonLabel maxWidth="8rem" />
              <Box border="divider" borderRadius="base" minHeight="20rem" />
            </Stack>
          </Card>
          <Card roundedAbove="sm">
            <Stack gap="4">
              <SkeletonDisplayText size="small" />
              <Columns columns={{xs: 1, md: 2}}>
                <Box border="divider" borderRadius="base" minHeight="10rem" />
                <Box border="divider" borderRadius="base" minHeight="10rem" />
              </Columns>
            </Stack>
          </Card>
        </Stack>
        <Stack gap={{xs: '4', md: '2'}}>
          <Card roundedAbove="sm">
            <Stack gap="4">
              <SkeletonDisplayText size="small" />
              <Box border="divider" borderRadius="base" minHeight="2rem" />
              <Box>
                <Bleed marginInline={{xs: 4, sm: 5}}>
                  <Divider borderStyle="divider" />
                </Bleed>
              </Box>
              <SkeletonLabel />
              <Divider borderStyle="divider" />
              <SkeletonBodyText />
            </Stack>
          </Card>
          <Card roundedAbove="sm">
            <Stack gap="4">
              <SkeletonLabel />
              <Box border="divider" borderRadius="base" minHeight="2rem" />
              <SkeletonLabel maxWidth="4rem" />
              <Box border="divider" borderRadius="base" minHeight="2rem" />
              <SkeletonLabel />
              <SkeletonBodyText />
            </Stack>
          </Card>
        </Stack>
      </Columns>
    </Page>
  );
}
```

</div>
<div as="UsefulToKnow">

### Useful to know

- <span>Always use the default width. Full width tends to waste space and make the page harder to parse.</span> ![Details page with margins on either side of the main content](/images/patterns/resource-details-layout/resource-detail-usage-1.png)
- <span>Group similar content in the same card.</span> ![Diagram showing multiple cards compared to a single card that groups the same content](/images/patterns/resource-details-layout/resource-detail-usage-2.png)
- <span>Put information that defines the resource object in the primary column.</span> ![Product detail example](/images/patterns/resource-details-layout/resource-detail-usage-3.png)
- <span>Put supporting information such as status, metadata, and summaries in the secondary column.</span> ![Product details page with the secondary column outlined](/images/patterns/resource-details-layout/resource-detail-usage-4.png)
- <span>Arrange content in order of importance.</span> ![Product details page with “Very important section” card placed above “Somewhat important section” card](/images/patterns/resource-details-layout/resource-detail-usage-5.png)
- <span>Place unique page actions at the top of the actions list and typical object actions at the bottom.</span> ![Popover with unique page actions placed at the top, and typical object actions placed at the bottom](/images/patterns/resource-details-layout/resource-detail-usage-6.png)

</div>
