---
name: Grid
category: Structure
keywords:
  - one column
  - two column
  - three column
  - column
  - row
  - column layouts
  - grid layouts
  - containers
  - full width containers
  - css grid
status:
  value: Alpha
  message: This component is in development. There could be breaking changes made to it in a non-major release of Polaris. Please use with caution.
---

# Grid

Create complex layouts based on [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid).

---

## Examples

### Two column

Use to create a two column layout that wraps at a breakpoint and aligns to a twelve column grid.

```jsx
<Page fullWidth>
  <Grid>
    <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
      <Card title="Sales" sectioned>
        <p>View a summary of your online store’s sales.</p>
      </Card>
    </Grid.Cell>
    <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
      <Card title="Orders" sectioned>
        <p>View a summary of your online store’s orders.</p>
      </Card>
    </Grid.Cell>
  </Grid>
</Page>
```

### Two-thirds and one-third column

Use to create a two-thirds, one-third column layout that wraps at a breakpoint and aligns to a twelve column grid.

```jsx
<Page fullWidth>
  <Grid columns={{sm: 3}}>
    <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 8, xl: 8}}>
      <Card title="Sales" sectioned>
        <p>View a summary of your online store’s sales.</p>
      </Card>
    </Grid.Cell>
    <Grid.Cell columnSpan={{xs: 6, sm: 2, md: 2, lg: 4, xl: 4}}>
      <Card title="Orders" sectioned>
        <p>View a summary of your online store’s orders.</p>
      </Card>
    </Grid.Cell>
  </Grid>
</Page>
```

### Three one-third column

Use to create a three column layout that wrap at a breakpoint and aligns to a twelve column grid.

```jsx
<Page fullWidth>
  <Grid>
    <Grid.Cell columnSpan={{xs: 6, sm: 2, md: 2, lg: 4, xl: 4}}>
      <Card title="Sales" sectioned>
        <p>View a summary of your online store’s sales.</p>
      </Card>
    </Grid.Cell>
    <Grid.Cell columnSpan={{xs: 6, sm: 2, md: 2, lg: 4, xl: 4}}>
      <Card title="Orders" sectioned>
        <p>View a summary of your online store’s orders.</p>
      </Card>
    </Grid.Cell>
    <Grid.Cell columnSpan={{xs: 6, sm: 2, md: 2, lg: 4, xl: 4}}>
      <Card title="Orders" sectioned>
        <p>View a summary of your online store’s orders.</p>
      </Card>
    </Grid.Cell>
  </Grid>
</Page>
```

### Custom layout

Use to create a layout that can be customized at specific breakpoints.

```jsx
<Page fullWidth>
  <Card sectioned>
    <Grid
      columns={{xs: 1, sm: 4, md: 4, lg: 6, xl: 6}}
      areas={{
        xs: ['product', 'sales', 'orders'],
        sm: ['product product product product', 'sales sales orders orders'],
        md: ['sales product product orders'],
        lg: ['product product product product sales orders'],
        xl: ['product product sales sales orders orders'],
      }}
    >
      <Grid.Cell area="product">
        <div
          style={{
            height: '60px',
            background: 'aquamarine',
          }}
        />
      </Grid.Cell>
      <Grid.Cell area="sales">
        <div
          style={{
            height: '60px',
            background: 'aquamarine',
          }}
        />
      </Grid.Cell>
      <Grid.Cell area="orders">
        <div
          style={{
            height: '60px',
            background: 'aquamarine',
          }}
        />
      </Grid.Cell>
    </Grid>
  </Card>
</Page>
```

---

## Related components

- To lay out a set of smaller components in a row, [use the stack component](https://polaris.shopify.com/components/stack)
- To lay out form fields, [use the form layout component](https://polaris.shopify.com/components/form-layout)
