---
name: Filters
category: Lists and tables
keywords:
  - filters
  - filtering
  - filter control
  - resource list
  - index
  - list filter
  - table
---

# Filters

Filters is a composite component that filters the items of a list or table.

Merchants use filters to:

- view different subsets of items in a list or table
- filter by typing into a text field
- filter by selecting filters or promoted filters

The way that merchants interact with filters depends on the components that you decide to incorporate. In its simplest form, filters includes a text field and a set of filters, which can be displayed in different ways. For example, you could show promoted filters and a More button that opens a [sheet](https://polaris.shopify.com/components/overlays/sheet) containing more filters. What the filters are and how they’re exposed to merchants is flexible.

---

## Accessibility

The filters component relies on the accessibility features of multiple other components:

- [Text field](https://polaris.shopify.com/components/forms/text-field)
- [Button](https://polaris.shopify.com/components/actions/button)
- [Popover](https://polaris.shopify.com/components/overlays/popover)
- [Sheet](https://polaris.shopify.com/components/overlays/sheet)
- [Collapsible](https://polaris.shopify.com/components/behavior/collapsible)

### Maintain accessibility with custom features

Since custom HTML can be passed to the component for additional actions, ensure that the filtering system you build is accessible as a whole.

All merchants must:

- be able to identify and understand labels for all controls
- be notified of state changes
- be able to complete all actions with the keyboard

---

## Best practices

The filters component should:

- help reduce merchant effort by promoting the filtering categories that are most commonly used
- include no more than 2 or 3 promoted filters
- consider small screen sizes when designing the interface for each filter and the total number filters to include
- use children only for content that’s related or relevant to filtering

---

## Content guidelines

### Text field

The text field should be clearly labeled so it’s obvious to merchants what they should enter into the field.

<!-- usagelist -->

#### Do

- Filter orders

#### Don’t

- Enter text here

<!-- end -->

### Filter badges

Use the name of the filter if the purpose of the name is clear on its own. For example, when you see a filter badge that reads **Fulfilled**, it’s intuitive that it falls under the Fulfillment status category.

<!-- usagelist -->

#### Do

- Fulfilled, Unfulfilled

#### Don’t

- Fulfillment: Fulfilled, Unfulfilled

<!-- end -->

If the filter name is ambiguous on its own, add a descriptive word related to the status. For example, **Low** doesn’t make sense out of context. Add the word “risk” so that merchants know it’s from the Risk category.

<!-- usagelist -->

#### Do

- High risk, Low risk

#### Don’t

- High, Low

<!-- end -->

Group tags from the same category together.

<!-- usagelist -->

#### Do

- (Unfulfilled, Fulfilled)

#### Don’t

- (Unfulfilled) (fulfilled)

<!-- end -->

If all tag pills selected: truncate in the middle

<!-- usagelist -->

#### Do

- Paid, par… unpaid

#### Don’t

- All payment status filters selected, Paid, unpa…

<!-- end -->

---

## Examples

### Filtering with a resource list

```jsx
class FiltersExample extends React.Component {
  state = {
    accountStatus: null,
    moneySpent: null,
    taggedWith: null,
    queryValue: null,
  };

  render() {
    const {accountStatus, moneySpent, taggedWith, queryValue} = this.state;

    const filters = [
      {
        key: 'accountStatus',
        label: 'Account status',
        filter: (
          <ChoiceList
            title={'Account status'}
            titleHidden
            choices={[
              {label: 'Enabled', value: 'enabled'},
              {label: 'Not invited', value: 'not invited'},
              {label: 'Invited', value: 'invited'},
              {label: 'Declined', value: 'declined'},
            ]}
            selected={accountStatus || []}
            onChange={this.handleChange('accountStatus')}
            allowMultiple
          />
        ),
        shortcut: true,
      },
      {
        key: 'taggedWith',
        label: 'Tagged with',
        filter: (
          <TextField
            label="Tagged with"
            value={taggedWith}
            onChange={this.handleChange('taggedWith')}
            labelHidden
          />
        ),
        shortcut: true,
      },
      {
        key: 'moneySpent',
        label: 'Money spent',
        filter: (
          <RangeSlider
            label="Money spent is between"
            labelHidden
            value={moneySpent || [0, 500]}
            prefix="$"
            output
            min={0}
            max={2000}
            step={1}
            onChange={this.handleChange('moneySpent')}
          />
        ),
      },
    ];

    const appliedFilters = Object.keys(this.state)
      .filter((key) => !isEmpty(this.state[key]) && key !== 'queryValue')
      .map((key) => {
        return {
          key,
          label: disambiguateLabel(key, this.state[key]),
          onRemove: this.handleRemove,
        };
      });

    return (
      <div style={{height: '568px'}}>
        <Card>
          <ResourceList
            resourceName={{singular: 'customer', plural: 'customers'}}
            filterControl={
              <Filters
                queryValue={queryValue}
                filters={filters}
                appliedFilters={appliedFilters}
                onQueryChange={this.handleChange('queryValue')}
                onQueryClear={this.handleQueryClear}
                onClearAll={this.handleClearAll}
              />
            }
            items={[
              {
                id: 341,
                url: 'customers/341',
                name: 'Mae Jemison',
                location: 'Decatur, USA',
              },
              {
                id: 256,
                url: 'customers/256',
                name: 'Ellen Ochoa',
                location: 'Los Angeles, USA',
              },
            ]}
            renderItem={(item) => {
              const {id, url, name, location} = item;
              const media = <Avatar customer size="medium" name={name} />;

              return (
                <ResourceList.Item
                  id={id}
                  url={url}
                  media={media}
                  accessibilityLabel={`View details for ${name}`}
                >
                  <h3>
                    <TextStyle variation="strong">{name}</TextStyle>
                  </h3>
                  <div>{location}</div>
                </ResourceList.Item>
              );
            }}
          />
        </Card>
      </div>
    );
  }

  handleChange = (key) => (value) => {
    this.setState({[key]: value});
  };

  handleRemove = (key) => {
    this.setState({[key]: null});
  };

  handleQueryClear = () => {
    this.setState({queryValue: null});
  };

  handleClearAll = () => {
    this.setState({
      accountStatus: null,
      moneySpent: null,
      taggedWith: null,
      queryValue: null,
    });
  };
}

function disambiguateLabel(key, value) {
  switch (key) {
    case 'moneySpent':
      return `Money spent is between $${value[0]} and $${value[1]}`;
    case 'taggedWith':
      return `Tagged with ${value}`;
    case 'accountStatus':
      return value.map((val) => `Customer ${val}`).join(', ');
    default:
      return value;
  }
}

function isEmpty(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else {
    return value === '' || value == null;
  }
}
```

### Filtering with a data table

```jsx
class FiltersExample extends React.Component {
  state = {
    availability: null,
    productType: null,
    taggedWith: null,
    queryValue: null,
  };

  render() {
    const {availability, productType, taggedWith, queryValue} = this.state;

    const filters = [
      {
        key: 'availability',
        label: 'Availability',
        filter: (
          <ChoiceList
            title={'Availability'}
            titleHidden
            choices={[
              {label: 'Online Store', value: 'Online Store'},
              {label: 'Point of Sale', value: 'Point of Sale'},
              {label: 'Buy Button', value: 'Buy Button'},
            ]}
            selected={availability || []}
            onChange={this.handleChange('availability')}
            allowMultiple
          />
        ),
        shortcut: true,
      },
      {
        key: 'productType',
        label: 'Product type',
        filter: (
          <ChoiceList
            title={'Product type'}
            titleHidden
            choices={[
              {label: 'T-Shirt', value: 'T-Shirt'},
              {label: 'Accessory', value: 'Accessory'},
              {label: 'Gift card', value: 'Gift card'},
            ]}
            selected={productType || []}
            onChange={this.handleChange('productType')}
            allowMultiple
          />
        ),
      },
      {
        key: 'taggedWith',
        label: 'Tagged with',
        filter: (
          <TextField
            label="Tagged with"
            value={taggedWith}
            onChange={this.handleChange('taggedWith')}
            labelHidden
          />
        ),
      },
    ];

    const appliedFilters = Object.keys(this.state)
      .filter((key) => !isEmpty(this.state[key]) && key !== 'queryValue')
      .map((key) => {
        return {
          key,
          label: disambiguateLabel(key, this.state[key]),
          onRemove: this.handleRemove,
        };
      });

    return (
      <div style={{height: '568px'}}>
        <Card sectioned>
          <Card.Subsection>
            <Filters
              queryValue={queryValue}
              filters={filters}
              appliedFilters={appliedFilters}
              onQueryChange={this.handleChange('queryValue')}
              onQueryClear={this.handleQueryClear}
              onClearAll={this.handleClearAll}
            />
          </Card.Subsection>
          <Card.Subsection>
            <DataTable
              columnContentTypes={[
                'text',
                'numeric',
                'numeric',
                'numeric',
                'numeric',
              ]}
              headings={[
                'Product',
                'Price',
                'SKU Number',
                'Net quantity',
                'Net sales',
              ]}
              rows={[
                ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
                ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
                [
                  'Navy Merino Wool Blazer with khaki chinos and yellow belt',
                  '$445.00',
                  124518,
                  32,
                  '$14,240.00',
                ],
              ]}
              totals={['', '', '', 255, '$155,830.00']}
            />
          </Card.Subsection>
        </Card>
      </div>
    );
  }

  handleChange = (key) => (value) => {
    this.setState({[key]: value});
  };

  handleRemove = (key) => {
    this.setState({[key]: null});
  };

  handleQueryClear = () => {
    this.setState({queryValue: null});
  };

  handleClearAll = () => {
    this.setState({
      availability: null,
      productType: null,
      taggedWith: null,
      queryValue: null,
    });
  };
}

function disambiguateLabel(key, value) {
  switch (key) {
    case 'taggedWith':
      return `Tagged with ${value}`;
    case 'availability':
      return value.map((val) => `Available on ${val}`).join(', ');
    case 'productType':
      return value.join(', ');
    default:
      return value;
  }
}

function isEmpty(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else {
    return value === '' || value == null;
  }
}
```

### Filters with children content

```jsx
class FiltersExample extends React.Component {
  state = {
    taggedWith: null,
    queryValue: null,
  };

  render() {
    const {taggedWith, queryValue} = this.state;

    const filters = [
      {
        key: 'taggedWith',
        label: 'Tagged with',
        filter: (
          <TextField
            label="Tagged with"
            value={taggedWith}
            onChange={this.handleChange('taggedWith')}
            labelHidden
          />
        ),
        shortcut: true,
      },
    ];

    const appliedFilters = Object.keys(this.state)
      .filter((key) => !isEmpty(this.state[key]) && key !== 'queryValue')
      .map((key) => {
        return {
          key,
          label: disambiguateLabel(key, this.state[key]),
          onRemove: this.handleRemove,
        };
      });

    return (
      <div style={{height: '568px'}}>
        <Card>
          <ResourceList
            resourceName={{singular: 'customer', plural: 'customers'}}
            filterControl={
              <Filters
                queryValue={queryValue}
                filters={filters}
                appliedFilters={appliedFilters}
                onQueryChange={this.handleChange('queryValue')}
                onQueryClear={this.handleQueryClear}
                onClearAll={this.handleClearAll}
              >
                <div style={{paddingLeft: '8px'}}>
                  <Button onClick={() => console.log('New filter saved')}>
                    Save
                  </Button>
                </div>
              </Filters>
            }
            items={[
              {
                id: 341,
                url: 'customers/341',
                name: 'Mae Jemison',
                location: 'Decatur, USA',
              },
              {
                id: 256,
                url: 'customers/256',
                name: 'Ellen Ochoa',
                location: 'Los Angeles, USA',
              },
            ]}
            renderItem={(item) => {
              const {id, url, name, location} = item;
              const media = <Avatar customer size="medium" name={name} />;

              return (
                <ResourceList.Item
                  id={id}
                  url={url}
                  media={media}
                  accessibilityLabel={`View details for ${name}`}
                >
                  <h3>
                    <TextStyle variation="strong">{name}</TextStyle>
                  </h3>
                  <div>{location}</div>
                </ResourceList.Item>
              );
            }}
          />
        </Card>
      </div>
    );
  }

  handleChange = (key) => (value) => {
    this.setState({[key]: value});
  };

  handleRemove = (key) => {
    this.setState({[key]: null});
  };

  handleQueryClear = () => {
    this.setState({queryValue: null});
  };

  handleClearAll = () => {
    this.setState({
      taggedWith: null,
      queryValue: null,
    });
  };
}

function disambiguateLabel(key, value) {
  switch (key) {
    case 'taggedWith':
      return `Tagged with ${value}`;
    default:
      return value;
  }
}

function isEmpty(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else {
    return value === '' || value == null;
  }
}
```
