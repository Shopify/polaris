---
name: Resource picking
keywords:
  - breakpoint
  - locations
  - location picker
  - segment picker
  - picker
  - segments
  - segementation
  - customer segments
  - searchable list
  - single select
  - multiselect
  - multi-select
  - multi select
---

# Resource picking

Resource picking experiences let merchants browse, find, and select items in a list to perform an action. The picking feature can help them navigate to a new page, filter an index table, or input one or more values in a form.

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

#### Popover list

The location picker popover allows a merchant to select any location they have added in the admin.

![1 location](/images/foundations/patterns/resource-picking/1-location@2x.png)

#### 1 location

When a merchant only has one location, the button that opens the location picker should be hidden. There’s no need to access the experience when they can’t switch locations.

![2–10 locations](/images/foundations/patterns/resource-picking/2-10-locations@2x.png)

#### 2–10 locations

When a merchant has 2–10 locations, show the button that accesses the location picker. The button always shows the current location.

In the location picker:

- Make “All locations” the default selected location.
- Show “All locations” at the top of the list.
- List all other locations in alphabetical order. Each location item shows the location name only.

![11 or more locations](/images/foundations/patterns/resource-picking/11-or-more-locations-picker@2x.png)

#### 11 or more locations

When a merchant has 11 or more locations:

- Apply the same features as 2–10 locations.
- Add text search at the top of the location picker. This allows merchants to search for locations by specific criteria (location name, city, province, postal code, address, etc.).
- Directly below the search, show a section with the 5 most recently used locations. If there are none, show the first 5 locations from the full list.
- Below recently used locations, show an option to view all locations. Clicking this will show the inactive search state, displaying the full list of locations.

#### Location list

The location list allows merchants to view all locations they have added in the admin.

![1–10 locations list](/images/foundations/patterns/resource-picking/1-10-locations@2x.png)

##### 1–10 locations

When a merchant has 1–10 locations, show all locations in a simple list. As notated in the image above:

1. Each list item should include the location name and address
2. The indicator at the bottom shows the total number of locations

![11 or more locations list](/images/foundations/patterns/resource-picking/11-or-more-locations-list@2x.png)

##### 11 or more locations

When a merchant has 11 or more locations:

- Apply the same features as 1–10 locations
- Show text search, filters, and sorting at the top of the list

Notated in the image above, location list functionality at this level includes:

1. **Search**. Allow merchants to find locations via specific criteria (location name, city, province, postal code, address, etc.).
2. **Sort**. This will be contextual to the use case (alphabetical sort, date created, date edited, etc.).
3. **Filter**. This is also contextual to the use case. For example, merchants could filter by subscription type.
4. **Pagination**. Allow the merchant to load and view additional sets of locations. Trigger loading with a “Load more” button.

### Customer segments

The number of locations a merchant has can range dramatically, and the location experience should adapt to that number. Using progressive disclosure, we can introduce features as merchants need them.

#### Popover list

The location picker popover allows a merchant to select any location they have added in the admin.

![1 location](/images/foundations/patterns/resource-picking/1-location@2x.png)

#### 1 - 10 segments

When a merchant only has one location, the button that opens the location picker should be hidden. There’s no need to access the experience when they can’t switch locations.

![2–10 locations](/images/foundations/patterns/resource-picking/2-10-locations@2x.png)

#### 11 or more segments

When a merchant has 11 or more locations:

- Apply the same features as 2–10 locations.
- Add text search at the top of the location picker. This allows merchants to search for locations by specific criteria (location name, city, province, postal code, address, etc.).
- Directly below the search, show a section with the 5 most recently used locations. If there are none, show the first 5 locations from the full list.
- Below recently used locations, show an option to view all locations. Clicking this will show the inactive search state, displaying the full list of locations.

## Implementation

Something something searchable listbox.

Something something segment picking for example

Tabbed code examples
