---
name: Resource picking
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
examples:
  - fileName: listbox-with-search.tsx
    title: Searchable listbox
    description: Use to help merchants browse, filter, and choose from a list of options.
  - fileName: popover-with-segment-picker.tsx
    title: Popover with segment picker
    description: Use to help merchants quickly browse, find, and navigate from a list of customer segments.
  - fileName: sheet-with-segment-picker.tsx
    title: Sheet with segment picker
    description: Use to help merchants quickly find and select from a list of customer segments.
---

# Resource picking

Resource picking experiences let merchants browse, find, and select items in a list to perform an action. The picking feature can help them navigate to a new page, filter an index table, or input one or more values in a form.

![Searchable listbox pattern disected to illustrate how it's composed](/images/foundations/patterns/resource-picking/searchable-listbox.png)

The primary building blocks of a picker experience are the listbox and text field components. Depending on what merchant problem you’re solving, the components may be hidden and revealed with an overlay, such as a popover or modal, or used directly inside of a container on the page. See the [customer segment picker](#customer-segments) and [location picker](#locations) examples for resource specific implementation details.

CODE SAMPLE

Include guidance about how to pick what container: The searchable listbox should be rendered directly.

---

## Principles

- **Leverage shared foundations.** By starting with available components and patterns, we keep design and development simple. Shared foundations also help guarantee familiar experiences for our merchants.
- **Use progressive disclosure.** This is at the core of designing resource picking experiences. As merchants add resources, patterns should gradually offer more features. For example:
  - Lists with a small number of resources (1–10) doesn’t need text search, sorting, and filtering.
  - Lists with a larger number of resources (11 or more) require patterns like text search, sorting, filtering, and pagination.

---

## Foundational patterns

When building a resource picking experience, leverage components and patterns that offer:

- Easy access to known complex data (text search by location name, city, province, etc.)
- Access to incomplete or unfamiliar data (filter contextual to the surface area)
- The ability to organize and browse data (sort contextual to the surface area)
- Pagination (load additional resources via infinite scrolling)

Sometimes existing solutions don’t fit your use case. They are a great place to start, but don’t be afraid to create a new solution for your merchant’s unique situation. If you do create something new, it’s important to document that solution and share it back to the system.

---

## Progressive disclosure

Progressive disclosure means we introduce advanced features only when needed. This keeps things simple, and merchants get the right features at the right moment.

To scale the experience consistently, we want to establish specific points for introducing new functionality.

While there are many ways to treat a resource depending on the use case, two common resources that use progressive disclosure across their picking experiences are locations and customer segments.

## Case studies

### Locations

The number of locations a merchant has can range dramatically, and the location experience should adapt to that number. Using progressive disclosure, we can introduce features as merchants need them.

The location picker popover allows a merchant to select any location they have added in the admin.

![1 location](/images/foundations/patterns/resource-picking/locations-1.png)

#### 1 location

When a merchant only has one location, the button that opens the location picker should be hidden. There’s no need to access the experience when they can’t switch locations.

![2–10 locations](/images/foundations/patterns/resource-picking/locations-2-to-10.png)

#### 2–10 locations

When a merchant has 2–10 locations, show the button that accesses the location picker. The button always shows the current location.

In the location picker:

- Make “All locations” the default selected location.
- Show “All locations” at the top of the list.
- List all other locations in alphabetical order. Each location item shows the location name only.

![11 or more locations](/images/foundations/patterns/resource-picking/locations-11-or-more.png)

#### 11 or more locations

When a merchant has 11 or more locations:

- Apply the same features as 2–10 locations.
- Add text search at the top of the location picker. This allows merchants to search for locations by specific criteria (location name, city, province, postal code, address, etc.).
- Directly below the search, show a section with the 5 most recently used locations. If there are none, show the first 5 locations from the full list.
- Below recently used locations, show an option to view all locations. Clicking this will show the inactive search state, displaying the full list of locations.
-

### Customer segments

The number of locations a merchant has can range dramatically, and the location experience should adapt to that number. Using progressive disclosure, we can introduce features as merchants need them.

The location picker popover allows a merchant to select any location they have added in the admin.

![1 location](/images/foundations/patterns/resource-picking/customer-segments-1-to-10.png)

#### 1 - 10 segments

When a merchant less than 11 segments, ...

![2–10 locations](/images/foundations/patterns/resource-picking/customer-segments-11-or-more.png)

#### 11 or more segments

When a merchant has 11 or more customer segments:

- Apply the same features as 2–10 locations.
- Add text search at the top of the location picker. This allows merchants to search for locations by specific criteria (location name, city, province, postal code, address, etc.).
- Directly below the search, show a section with the 5 most recently used locations. If there are none, show the first 5 locations from the full list.
- Below recently used locations, show an option to view all locations. Clicking this will show the inactive search state, displaying the full list of locations.

## Implementation

Something something searchable listbox.

Something something segment picking for example

Tabbed code examples
