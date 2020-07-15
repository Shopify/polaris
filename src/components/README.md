---
name: Get started
slug: get-started
icon: ~
categoryName: ~
categorySlug: ~
order: ~
---

# Components

Our components are a collection of interface elements that can be reused across the Shopify system.

Components can be combined to help anyone building products for Shopify to efficiently design consistent experiences for merchants.

This frees us up to focus on solving unique merchant challenges, rather than reinventing interface elements that are already in use.

---

## Getting started

The component library was designed to help developers quickly create the best experience for Shopify merchants.

Each component includes information to help you implement them, such as:

- Explanations of the merchant problem it solves in the interface
- Interactive examples so you can see the component in action
- Best practices and guidelines to use the component correctly

Learn more about developing apps and themes for Shopify on our [developer hub](https://developers.shopify.com/).

---

## Installing and implementing

There are two options for installing and implementing our components, React or CSS.

### React components (Recommended)

Use React components in most cases, especially if you’re building a highly interactive experience. This can be done with or without a build system.

- [Implementation instructions](https://github.com/Shopify/polaris-react#using-the-react-components) (requires HTML, React, a JS build tool)

- Have a look at the [React component examples](https://github.com/Shopify/polaris-react/tree/master/examples) to see how it’s done

### CSS components

Use CSS components if you don’t have or want a build system for your project.

- [Implementation instructions](https://github.com/Shopify/polaris-react#using-the-css-components)

- Have a look at the [CSS examples](https://github.com/Shopify/polaris-react/tree/master/examples/cdn-styles) to see how it’s done

---

## Using components

You can find comprehensive [instructions](https://github.com/Shopify/polaris-react) on how to use components in the Polaris GitHub repo. There are also [example applications](https://github.com/Shopify/polaris-react/tree/master/examples) to explore.

Here are some basic instructions to help you get started for both React and CSS-only:

### React components (Recommended)

Include the CSS in your HTML. We suggest copying the styles file into your own project, but you may also use it directly:

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@shopify/polaris@4.27.0/styles.min.css"
/>
```

First, import the translations and the component into your project:

```js
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Button} from '@shopify/polaris';
```

Create an element using the Polaris React `AppProvider` component. The `AppProvider` component must wrap your entire app because Polaris React components will not function without it:

```js
const app = (
  <AppProvider i18n={enTranslations}>
    <Button onClick={() => alert('Button clicked!')}>Example button</Button>
  </AppProvider>
);
```

Tell React to render that element in the DOM:

```js
ReactDOM.render(app, domContainerNode);
```

### CSS components

Include the CSS stylesheet in your HTML. We suggest copying the styles file into your own project, but you may also use it directly:

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@shopify/polaris@4.27.0/styles.min.css"
/>
```

Add the appropriate classes to your HTML elements:

```html
<button class="Polaris-Button">Example button</button>
```

Note if you’re using CSS-only you’ll need to provide your own JavaScript.

---

## Learning resources

These resources have information on getting started with React and how to develop apps and themes for Shopify.

### React

If you’re new to React, start with the official [React Getting Started documentation](https://facebook.github.io/react/docs/hello-world.html). As you read through the topics, follow along using the [React Hello World CodePen](http://codepen.io/gaearon/pen/ZpvBNJ?editors=0010) example.

Here are some additional resources:

- Online training at [reacttraining.com](https://reacttraining.com/), [buildwithreact.com](http://buildwithreact.com), and [reactforbeginners.com](https://reactforbeginners.com)
- Community resources in [Awesome React](https://github.com/enaqx/awesome-react)
- Answers in the various [React support communities](https://facebook.github.io/react/community/support.html)

### Shopify’s developer hub

Learn more about developing apps and themes for Shopify on our [developer hub](https://developers.shopify.com/).

---

## Component methodology

We make our components flexible enough to meet diverse needs. Our components are set up to be restructured based on the information passed in. No matter what type of experience you’re creating, you can use components as the building blocks of your product or feature.

Each of our components has a well-documented public interface (API) with guidelines and well-defined conventions. This way, developers don’t need to worry about the underlying implementation. Instead, they can focus on creating great merchant experiences.

We ensure that our components are made for everyone. They meet accessibility standards and are responsive to any screen or device. We also put a lot of effort into optimizing the performance of the components, so everyone can build inclusive experiences that work.

---

## Feedback

Issues or feature requests can be created on the [Polaris GitHub page](https://github.com/Shopify/polaris-react/issues).
