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

**For use with embedded apps only.** The resource picker component provides a search-based interface to help merchants find and select one or more products or collections, and communicate selected resources through callbacks the component accepts.

---

## Use in an embedded application

Enable the resource picker component to delegate to the [Shopify App Bridge](https://help.shopify.com/en/api/embedded-apps/app-bridge) by passing an API key to the [app provider component](https://polaris.shopify.com/components/structure/app-provider#section-initializing-the-shopify-app-bridge).

Use of the resource picker component is only supported in an embedded application—it will not render in a stand-alone application. To help visualize the resource picker component in an embedded application, we've provided the following screenshot.

![Screenshot product picker - multiple product selection component](embedded/resource-picker/product-picker-multiple.jpg)

---

## Examples

### Product picker

When you ask for products, the `onSelection` callback is called with an object that has a `selection` key, which will have an array of objects detailing the selected products (even if `allowMultiple` is set to `false`).

```jsx
class EmbeddedAppResourcePickerExample extends React.Component {
  state = {
    resourcePickerOpen: false,
  };

  render() {
    return (
      <AppProvider apiKey="YOUR_API_KEY">
        <ResourcePicker
          resourceType="Product"
          open={this.state.resourcePickerOpen}
          onSelection={({selection}) => {
            console.log('Selected products: ', selection);
            this.setState({resourcePickerOpen: false});
          }}
          onCancel={() => this.setState({resourcePickerOpen: false})}
        />
      </AppProvider>
    );
  }
}
```
