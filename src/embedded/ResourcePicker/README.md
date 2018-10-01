---
name: Embedded resource picker
category: Embedded
hidePlayground: true
keywords:
  - ResourcePicker
  - pop up
  - overlays
  - disruptive
  - disruptor
  - select products
  - select collections
  - products selector
  - resource selector
  - colletions selector
  - search resources
  - search
---

# Embedded resource picker

Resource pickers are overlays that allow merchants to select one or more products or collections. They provide a very powerful search-based UI to help merchants find the appropriate resources, and then provide that information to you through the callbacks the component accepts.

This component only works within embedded apps. Read the [Embedded App SDK (EASDK) getting started guide](https://github.com/Shopify/polaris/blob/master/documentation/Embedded%20apps.md) for more details on how to use the EASDK with Polaris.

---

## Screenshot examples

These static images are provided to help visualize the interface since embedded components can only be rendered inside the Shopify admin.

### Product picker - multiple product selection

![Screenshot product picker - multiple product selection component](embedded/resource-picker/product-picker-multiple.jpg)

### Collection and product picker - single product selection

![Screenshot collection picker - single product selection component](embedded/resource-picker/collection-picker-single.jpg)

---

## Examples

### Product picker

When you ask for products, the `onSelection` callback is called with an object that has a `products` key, which will have an array of objects detailing the selected products (even if `allowMultiple` is not set to `true`).

```jsx
<ResourcePicker
  products
  allowMultiple
  open={this.state.open}
  onSelection={(resources) => {
    console.log('Selected products: ', resources.products);
    this.setState({open: false});
  }}
  onCancel={() => this.setState({open: false})}
/>
```

### Collection and product picker

Passing both `products` and `collections` allows the user to select from one or the other. The object returned to `onSelection` has `products` and `collections` keys, which are either `undefined` or an array of objects describing the selected resources.

```jsx
<ResourcePicker
  products
  collections
  open={this.state.open}
  onSelection={(resources) => {
    console.log('Selected products: ', resources.products);
    console.log('Selected collections: ', resources.collections);
    this.setState({open: false});
  }}
  onCancel={() => this.setState({open: false})}
/>
```
