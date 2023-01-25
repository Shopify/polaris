---

hideFromNav: true
---


<div as="HowItHelps">

## How it helps merchants

![Products index page](/images/patterns/resource-index-cover-image.png)

1. The resource index layout is based on a single column to create a clear top-to-bottom hierarchy of tasks and to provide horizontal space for resource data.
2. At the top of the page, merchants find the page title and actions that affect the index as a whole.
3. At the top of the index, merchants can use filters, sorting, and multi-select actions that affect the list below.
4. In the main body of the index, merchants find the individual resource objects that they want to view or manage.

<div as="DefinitionTable">

### Use when merchants need to:

**Overview and manage resources**
:   Resource objects, such as products, orders and customers, are at the heart of merchants’ businesses. While resource types can be very different, they typically share many general activities, such as adding, finding, or taking action. Use the resource index layout pattern when merchants need to organize objects and carry out such activities. An example can be found in Products.

</div>
</div>
<div as="Usage">

## Using this pattern

This pattern uses the [`Layout`](/components/layout-and-structure/layout), [`Page`](/components/layout-and-structure/page) and [`Card`](/components/layout-and-structure/alpha-card) components.

```javascript {"type":"previewContext","for":"example"}
<div style={{ paddingBottom: '2rem' }}>
  {(____CODE____)()}
</div>
```

```javascript {"type":"sandboxContext","for":"example"}
{(____CODE____)()}
```

```javascript {"type":"livePreview","id":"example"}
<Page
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
</Page>
```

</div>
<div as="UsefulToKnow">

### Useful to know

| | |
|-|-|
|Use the resource type as page title.|![“Orders” and “Gift cards” pages](/images/patterns/resource-index-usage-1.png)|
|Always use the primary action in the top right corner for resource creation. Remove the button if there is no such functionality.|![“Add product” primary action button on a resource index page](/images/patterns/resource-index-usage-2.png)|
|Set the page width to normal if the index doesn’t need full width.|![Index page with margins on either side of the main content](/images/patterns/resource-index-usage-3.png)|

</div>
