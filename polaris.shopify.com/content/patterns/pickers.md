---
title: Pickers
description: Picker experiences help merchants browse, find, and select from multiple options. Use them for selecting locations, customer segments, and more.
icon: LocationMajor
keywords:
  - customer segments
  - locations
  - location picker
  - multiselect
  - multi-select
  - multi select
  - picker
  - resource picker
  - searchable listbox
  - searchable list
  - segment picker
  - segments
  - segementation
  - single select
---

## Best practices

### Use progressive disclosure

Introduce advanced features only when needed. Scale picker experiences consistently by establishing specific points for introducing functionality when merchants need them. Pickers should gradually offer more features as the number of options increases:

- If there is only 1 option, there's no need to present it with a picker. The option value should be displayed directly in context, or not at all if it's not editable or relevant to completing an action merchants need to take on the page.
- If there are only a small number of options, display all options in the picker. Sorting and filtering functionality is not needed for merchants to use the picker to complete an action on the page.
- If there are a large number of options, merchants need filtering or sorting features in order to use the picker to complete an action. This is especially important if the action is repetitive, like tagging resources.

### Sort with intention

The order the options are sorted in should help merchants find and pick from the options quickly so they can focus on the action they need to take on the page.

- Sort in the unique logical order relevant to the options the picker contains. [Date pickers](/components/selection-and-input/date-picker) present options by month. [Color pickers](/components/selection-and-input/color-picker) present options by hue.
- Sort alphabetically if the picker contains text options that are most scannable by the content they contain, like customer names or locations.
- Sort by most recently or frequently created, updated, or used if the picker contains options that were created in the context in which they are being picked, or are accessed or used repetitively. Products and collections benefit from being sorted by creation date, while customer segments are best sorted by date last edited.

### Pin relevant options

Pinning the most relevant options to the top of the picker helps merchants work through tasks quickly. Which and how many options are pinned depends on the action the picker helps merchants take.

- If the picker presents merchants with navigation or filtering options, pin the main or most important option to the top.
- If the purpose of the picker is to complete form input, pin the most frequently or recently used options to the top.

## Picking resources

### Searchable listbox

![Searchable listbox pattern disected to illustrate how it's composed using the text field, listbox, listbox option, and listbox action components.](/images/foundations/patterns/pickers/searchable-listbox.png)

The primary building block of resource picking experiences is the searchable listbox pattern. Searchable listboxes are composed of the [listbox](/components/lists/listbox) and [text field](/components/selection-and-input/text-field) components and can be displayed differently depending on what merchant problem you’re solving.

The components are used directly inside of a container on the page if picking is part of the primary action merchants need to take, such as completing a form. The components may instead be hidden or revealed with an overlay, such as a [popover](/components/overlays/popover) or [modal](/components/overlays/modal), to progressively disclose the list when merchants take an action on the page. Use progressive disclosure if the purpose of the picker is secondary to the action merchants are taking on the page, such as navigation or list filtering. We'll look at customer segment and location picking patterns for examples of context specific implementation.

### Locations

The location picker popover allows a merchant to select any location they have added in the Admin. Location pickers are used as a filter on the orders list and as a form input in logistics related features, like inventory transfers.

The number of locations a merchant has can range dramatically, and the location experience should adapt to that number. Using progressive disclosure, we can introduce features as merchants need them.

![1 location](/images/foundations/patterns/pickers/locations-1.png)

#### 1 location

When a merchant only has one location, the button that opens the location picker should be hidden. There’s no need to access the experience when they can’t switch locations.

![2–10 locations](/images/foundations/patterns/pickers/locations-2-to-10.png)

#### 2–10 locations

When a merchant has 2–10 locations, show the button that accesses the location picker. The button always shows the current location.

In the location picker:

- Show “All locations” at the top of the list.
- Make “All locations” the default selected location.
- List all other locations in alphabetical order. Each location item shows the location name only.

![11 or more locations](/images/foundations/patterns/pickers/locations-11-or-more.png)

#### 11 or more locations

When a merchant has 11 or more locations:

- Apply the same features as 2–10 locations.
- Add text search at the top of the location picker. This allows merchants to search for locations by specific criteria (location name, city, province, postal code, address, etc.).
- Directly below the search, show a section with the 5 most recently used locations. If there are none, show the first 5 locations from the full list.
- Below recently used locations, show an option to view all locations. Clicking this will show the inactive search state, displaying the full list of locations.

#### Implementation

Location data can be fetched, created, or updated using the Shopify Admin [GraphQL API](https://shopify.dev/api/admin-graphql/2022-07/queries/locations) or the [Rest API](https://shopify.dev/api/admin-rest/2022-07/resources/location).

Location pickers are composed using the [button](/components/actions/button), [icon](/components/images-and-icons/icon), [listbox](/components/lists/listbox), [popover](/components/overlays/popover), and [text field](/components/selection-and-input/text-field) components. Reference the `Listbox` "With search" and `Popover` "With searchable listbox" composition examples for React component code snippets.

### Customer segments

Segment pickers allow merchants to select from or navigate to all of the customer segments they've created. Merchants start with one default customer segment: "All customers". From the query builder at the top of the segment detail page, merchants can add filters and conditions to create new segments.

![Illustration of segment picker best practices](/images/foundations/patterns/pickers/segment-picker-best-practices.png)

Similar to the location picker, customer segment pickers introduce features only as merchants need them. All segment picking experiences should:

- Pin the "All customers" segment to the top of the list so merchants can easily navigate to or select their entire customer base
- Pin the active or selected segment below the "All customers" segment so merchants know what segment they're viewing or have picked
- Sort segments by "Last edited date" so merchants can easily find and pick from the most relevant segments in the list

![10 or less segments ](/images/foundations/patterns/pickers/customer-segments-1-to-10.png)

#### 1 - 10 segments

When a merchant has 10 customer segments or less, all segments should be visible in the list.

![More than 10 customer segments](/images/foundations/patterns/pickers/customer-segments-11-or-more.png)

#### 11 or more segments

When a merchant has 11 or more customer segments:

- Add text search above the segment list. This allows merchants to search for segments by name.
- Below the pinned "All customers" and active or selected segments, display the 4 most recently edited segments. If there are none, show the first 4 segments from the full list.
- Below the recently edited segments, display a listbox action to "Show all {total number} segments". Clicking the action should show the inactive search state, displaying the full list of segments.
- Segments should be paginated and load more when merchants scroll to the bottom of the list.

#### Flow automations

![Customer segment picker with more than 10 segments inside the Flow app workflow automation builder](/images/foundations/patterns/pickers/sheet-with-customer-segments-11-or-more.png)

Shopify Flow is an automation app that helps merchants build workflows to automate marketing campaigns and other common tasks. When presenting the segment picker for merchants to build a customer related workflow automation, the list of segments is displayed directly in the action builder using the same progressive disclosure points as the customer segment picking popover.

#### Implementation

Customer segment data can be fetched, created, or updated using the Shopify Admin [GraphQL API](https://shopify.dev/api/admin-graphql/2022-07/objects/Segment). Customer segments replace saved search in the customers section of the Admin. Check out the [Segmentation guide](https://shopify.dev/api/examples/customer-segments) for an overview of how to query segment members.

Segment pickers are composed using the [listbox](/components/lists/listbox) and [text field](/components/selection-and-input/text-field) components to implement a searchable listbox. The searchable listbox is displayed inside of a [popover](/components/overlays/popover) component activated by a [button](/components/actions/button) component, or inside of a [sheet](/components/deprecated/sheet) component triggered by selecting a segment workflow template or by creating a custom workflow action. Get started by referencing the `Listbox` "With search", `Popover` "With searchable listbox", and `Sheet` "With searchable listbox" composition examples for React component code snippets.
