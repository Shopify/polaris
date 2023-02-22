# Decision log

## [2022-08-10](https://github.com/Shopify/web/pull/70535)

The Filtering aspect of the component has been added. This completes the IndexFilters component. The filters are dumb components, as is the rest of the IndexFilters component, so it will be up to the consumer of this component to implement the logic to handle which filters are applicable and applied, but the component now provides a consistent and predictable way to present the filter data.

### Context and problem statement

This was a planned update to the component in order to keep PRs as small as possible.

### Considered options

We had thought about bringing in a basic set of filter controls as templates as well for this PR, but decided against it. This was due to the fact that the existing filter controls already exist for each index, and as we are not redesigning any of the filter controls it felt like redundant work to reproduce those and re-implement them for each index.

### Decision outcome

We have added a Filters component, based off the work that the Orders team have done for their Workspace filtering experience.

### Decision makers

Admin quality.

### Resources

N/A

## [2022-08-01](https://github.com/Shopify/shopify/issues/311131)

### Purpose of component

The IndexFilters component allows for an IndexTable to be filtered and searched in a concise, easy-to-understand way.

### Architectural decisions

#### Scoping

This component only controls the UI of the sorting and searching. It is up to the consumer to create the logic which actually controls the index. All key information is passed down as props on the root component to allow for full control from the consumer. Any internal state is kept to a minimum, for things such as controlling the state of the Popovers when clicking on a Tab or the Sort button.

This component will be extended with the Filters bar underneath in a separate PR, which will add the ability to control the filters on a particular index.

#### UX and styling

Designed and vetted by the Admin Quality team.

#### Naming

The idea behind the name is to give it a very clear-to-understand name which acts as a sort of self-documentation.

### Implementation

This component is intentionally dumb, as it is to be reused across multiple areas of the admin. It is up to the consumer to control all logic regarding the actual sorting, filtering, and searching.
