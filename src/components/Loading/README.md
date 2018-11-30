---
name: Loading
category: Feedback indicators
keywords:
  - spinner
  - loader
  - loading
  - loading bar
---

# Loading

The loading component is used to indicate to merchants that a page is loading or an upload is processing.

---

## Examples

### Default loading

Use to indicate that the page is loading.

```jsx
<div style={{height: '100px'}}>
  <Frame>
    <Loading />
  </Frame>
</div>
```

---

## Required components

The loading component must be wrapped in the [frame](/components/structure/frame) component or used in an embedded application.

---

## Use in an embedded application

Passing an API key to the [app provider component](https://polaris.shopify.com/components/structure/app-provider#section-initializing-the-shopify-app-bridge) causes the loading component to delegate to the [Shopify App Bridge](https://help.shopify.com/en/api/embedded-apps/app-bridge) instead of rendering as it would in a stand-alone application.

```jsx
class EmbeddedAppLoadingExample extends React.Component {
  state = {
    loading: false,
  };

  render() {
    const loadingMarkup = this.state.loading && <Loading />;

    return <AppProvider apiKey="YOUR_API_KEY">{loadingMarkup}</AppProvider>;
  }
}
```

---

## Best practices

The loading component should:

- Indicate that the page requested is loading.
- Indicate that an upload has started and the action will soon complete.
- Be used to give feedback for an entire page load or a page mutation like saving a product.
- Be used alongside a component or page element that contains `aria-busy` to represent what is loading.

---

## Content guidelines

### Accessibility label

The loading accessibility label should:

- Accurately explain the state of the requested action. For example, “Loading your search results”.
- Use as few words as possible to describe the state.

---

## Related components

- To indicate that an action has been received, use the [Spinner](/components/feedback-indicators/spinner)
- To improve user experience and reduce the appearance of long loading times, use the [Progress bar](/components/feedback-indicators/progress-bar) component.
- To better represent loading content, use [Skeleton page](/components/feedback-indicators/skeleton-page) along with [Skeleton body text](/components/feedback-indicators/skeleton-body-text) and [Skeleton display text](/components/feedback-indicators/skeleton-display-text) components.
