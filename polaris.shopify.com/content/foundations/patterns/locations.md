---
name: Locations
keywords:
  - breakpoint
  - locations
  - location picker
  - location list
---

# Locations

The number of locations a merchant has can range dramatically, and the location experience should adapt to that number. Using progressive disclosure, we can introduce features as merchants need them.

---

## Principles

- **Leverage shared foundations.** By starting with available components and patterns, we keep design and development simple. Shared foundations also help guarantee familiar experiences for our merchants.
- **Use progressive disclosure.** This is at the core of designing location experiences. As merchants add locations, patterns should gradually offer more features. For example:
  - A small number of locations (1–10) doesn’t need text search, sorting, and filtering.
  - A larger number of locations (11 or more) requires patterns like text search, sorting, filtering, and pagination.

---

## Foundational patterns

When building a location experience, leverage components and patterns that offer:

- Easy access to known complex data (text search by location name, city, province, etc.)
- Access to incomplete or unfamiliar data (filter contextual to the surface area)
- The ability to organize and browse data (sort contextual to the surface area)
- Pagination (load additional locations via infinite scrolling)

Sometimes existing solutions don’t fit your use case. They are a great place to start, but don’t be afraid to create a new solution for your merchant’s unique situation. If you do create something new, it’s important to document that solution and share it back to the system.

---

## Progressive disclosure

Progressive disclosure means we introduce advanced features only when needed. This keeps things simple, and merchants get the right features at the right moment.

To scale the experience consistently, we want to establish specific points for introducing new functionality.

While there are many ways to treat locations, two common patterns that use progressive disclosure are the location picker and the location list.

### Location picker

The location picker allows a merchant to select any location they have added in the admin.

![1 location](/images/foundations/patterns/locations/1-location@2x.png)

#### 1 location

When a merchant only has one location, the button that opens the location picker should be hidden. There’s no need to access the experience when they can’t switch locations.

![2–10 locations](/images/foundations/patterns/locations/2-10-locations@2x.png)

#### 2–10 locations

When a merchant has 2–10 locations, show the button that accesses the location picker. The button always shows the current location.

In the location picker:

- Make “All locations” the default selected location.
- Show “All locations” at the top of the list.
- List all other locations in alphabetical order. Each location item shows the location name only.

![11 or more locations](/images/foundations/patterns/locations/11-or-more-locations-picker@2x.png)

#### 11 or more locations

When a merchant has 11 or more locations:

- Apply the same features as 2–10 locations.
- Add text search at the top of the location picker. This allows merchants to search for locations by specific criteria (location name, city, province, postal code, address, etc.).
- Directly below the search, show a section with the 5 most recently used locations. If there are none, show the first 5 locations from the full list.
- Below recently used locations, show an option to view all locations. Clicking this will show the inactive search state, displaying the full list of locations.

### Location list

The location list allows merchants to view all locations they have added in the admin.

![1–10 locations list](/images/foundations/patterns/locations/1-10-locations@2x.png)

#### 1–10 locations

When a merchant has 1–10 locations, show all locations in a simple list. As notated in the image above:

1. Each list item should include the location name and address
2. The indicator at the bottom shows the total number of locations

![11 or more locations list](/images/foundations/patterns/locations/11-or-more-locations-list@2x.png)

#### 11 or more locations

When a merchant has 11 or more locations:

- Apply the same features as 1–10 locations
- Show text search, filters, and sorting at the top of the list

Notated in the image above, location list functionality at this level includes:

1. **Search**. Allow merchants to find locations via specific criteria (location name, city, province, postal code, address, etc.).
2. **Sort**. This will be contextual to the use case (alphabetical sort, date created, date edited, etc.).
3. **Filter**. This is also contextual to the use case. For example, merchants could filter by subscription type.
4. **Pagination**. Allow the merchant to load and view additional sets of locations. Trigger loading with a “Load more” button.
