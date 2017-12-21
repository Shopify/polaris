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
Resource pickers are overlays that allow the merchant to select one or more products or collections. They provide a very powerful search-based UI to help merchants find the appropriate resources, and then provide that information to you through the callbacks the component accepts.

This component only works within embedded apps. Read the [Embedded App SDK (EASDK) getting started guide](https://github.com/Shopify/polaris/blob/master/documentation/Embedded%20apps.md) for more details on how to use the EASDK with Polaris.

---

## Properties

| Prop | Type | Description |
| ---- | ---- | ----------- |
| open* | boolean | Whether the picker is open or not |
| title | string | The title of the picker |
| products | boolean | Whether to allow the merchant to select products |
| collections | boolean | Whether to allow the merchant to select collections |
| allowMultiple | boolean | Whether multiple selections are allowed |
| showHidden | boolean | Whether to display resources that are not published (hidden) in the context of a channel. Defaults to true. |
| onSelection | function() | Callback after a selection was made |
| onCancel | function() | Callback when the picker is closed without selection |

---

## Examples

### Product picker

When you ask for products, the `onSelection` callback is called with an object that has a `products` key, which will have an array of objects detailing the selected products (even if `allowMultiple` is not set to `true`).

```jsx
<ResourcePicker
  products
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
  allowMultiple
  open={this.state.open}
  onSelection={(resources) => {
    console.log('Selected products: ', resources.products);
    console.log('Selected collections: ', resources.collections);
    this.setState({open: false});
  }}
  onCancel={() => this.setState({open: false})}
/>
```
