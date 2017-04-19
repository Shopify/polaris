# Polaris
[![CircleCI](https://circleci.com/gh/Shopify/polaris-internal.svg?style=svg&circle-token=c8498f3af1d113fe3974c8881c4ce32ef09423c2)](https://circleci.com/gh/Shopify/polaris-internal)

#### Polaris is a React component library designed to help developers create the best experience for merchants who use Shopify. Visit the [Polaris style guide](https://polaris.shopify.com) to learn more.

## Getting started
The component library was designed to help developers work quickly to create the best experience for merchants who use Shopify.

The components are extensively documented in the [Polaris style guide](https://polaris.shopify.com).

## Using the React components
In most cases, and especially if you’re building a highly interactive experience, you should use the React components.

### Installation:
With NPM:

```bash
npm install @shopify/polaris --save
```

Or with Yarn:

```bash
yarn add @shopify/polaris
```

### Usage:
1. Include the CSS in your HTML:

```html
 <link rel="stylesheet" href="https://sdks.shopifycdn.com/polaris/1.0.0/polaris.css">
 ```

> Note: you can import the CSS directly into your project if your bundler supports it:
>
> ```javascript
> import '@shopify/polaris/styles.css';
> ```

2. Include the component in your project:

```javascript
import { Button } from '@shopify/polaris';
```

3. Tell React to render the element in the DOM:

```javascript
ReactDOM.render(<Button onClick={() => alert('Button clicked!')}>Example button</Button>, domContainerNode);
```

## Using the CSS components
We have bundled our component CSS and are making it available via our CDN. The CSS distribution is intended to be used when React components are not the best choice.

### Usage
1. Include the CSS in your HTML:

```html
<link rel="stylesheet" href="https://sdks.shopifycdn.com/polaris/1.0.0/polaris.css">
```

2. Include the markup and associated classes in your HTML document:

```html
<button class="Polaris-Button">Example Button</button>
```

## Examples
We have created example applications to document the various ways a consumer could implement Polaris. Each of these examples includes further documentation:

- [create-react-app example](https://github.com/Shopify/polaris/tree/sample-apps/examples/create-react-app)
- [Webpack example](https://github.com/Shopify/polaris/tree/sample-apps/examples/webpack)
- [Browserify example](https://github.com/Shopify/polaris/tree/sample-apps/examples/browserify)
- [CSS-only example](https://github.com/Shopify/polaris/tree/sample-apps/examples/cdn-css-only)

## Methodology
We set out to make our components easy to use. Each of our components has a well-documented public interface (API) with guidelines and well-defined conventions. This way, developers don’t need to worry about the underlying implementation. Instead, they can focus on creating amazing merchant experiences.

We ensure that our components are made for everyone. They meet accessibility standards and are responsive to any screen or device. We also put a lot of effort into optimizing the performance of the components, so everyone can build inclusive experiences that work.

We make our components flexible enough to meet diverse needs. Our components are set up to be restructured based on the information passed in. No matter what type of experience you're creating, you can use components as the building blocks of your product or feature.

## Learning resources
If you are new to React, we recommend you start with the [official React Getting Started documentation](https://facebook.github.io/react/docs/hello-world.html). As you read through the topics we suggest you follow along using their [React Hello World CodePen example](http://codepen.io/gaearon/pen/ZpvBNJ?editors=0010).

Additional resources:
- Online training courses at [reacttraining.com](http://reacttraining.com), [buildwithreact.com](http://buildwithreact.com), and [reactforbeginners.com](http://reactforbeginners.com).
- The community resources in [Awesome React](https://github.com/enaqx/awesome-react).
- As questions and find answers in the various [React support communities](https://facebook.github.io/react/community/support.html).

## Feedback
[Create an issue or feature request](https://github.com/Shopify/polaris/issues/new).

At this point in time we’re not accepting pull requests. This is something we’ll support in the future. Stay tuned.