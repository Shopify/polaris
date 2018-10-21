---
name: Resource picker
category: Overlays
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
  - collections selector
  - variants selector
  - search resources
  - search
  - embedded app
  - app bridge
---

# Resource picker

**For use with embedded apps only.** Resource pickers are overlays that allow merchants to select one or more products or collections. They provide a very powerful search-based UI to help merchants find the appropriate resources, and then provide that information to you through the callbacks the component accepts.

Read the [initializing the Shopify App Bridge guide](https://polaris.shopify.com/components/structure/app-provider#initializing-the-shopify-app-bridge) for more details on how build embedded apps with Polaris.

---

## Screenshot examples

These static images are provided to help visualize the interface since embedded components can only be rendered inside the Shopify admin.

### Product picker - multiple product selection

![Screenshot product picker - multiple product selection component](embedded/resource-picker/product-picker-multiple.jpg)

---

## Examples

### Product picker

When you ask for products, the `onSelection` callback is called with an object that has a `selection` key, which will have an array of objects detailing the selected products (even if `allowMultiple` is set to `false`).

```jsx
<ResourcePicker
  resourceType="Product"
  open={this.state.open}
  onSelection={({selection}) => {
    console.log('Selected products: ', selection);
    this.setState({open: false});
  }}
  onCancel={() => this.setState({open: false})}
/>
```
