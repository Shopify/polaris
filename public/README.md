# Polaris
[![CircleCI](https://circleci.com/gh/Shopify/polaris-internal.svg?style=svg&circle-token=c8498f3af1d113fe3974c8881c4ce32ef09423c2)](https://circleci.com/gh/Shopify/polaris-internal)

#### Polaris is a React component library designed to help developers create the best experience for merchants who use Shopify. Visit the [Polaris style guide](https://polaris.shopify.com) to learn more.

## Using the React components
We strongly recommend using the React versions of our components. It is the version that we will be using internally, allows for rich, complex components like Tabs and Popovers, and will not have as many breaking changes as the CSS-only version.

### Installation:
Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install @shopify/polaris --save
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
yarn add @shopify/polaris
```

### Usage:
1. Include the CSS in your HTML:

```html
 <link rel="stylesheet" href="https://sdks.shopifycdn.com/polaris/1.0.0/polaris.min.css">
 ```

> Note: you can import the CSS directly into your project if your asset packager supports it:
>
> ```javascript
> import '@shopify/polaris/styles.css';
> ```

2. Include any of the provided components in your project:

```javascript
import {Page, Card, Button} from '@shopify/polaris';
```

3. Tell React to render the element in the DOM:

```javascript
ReactDOM.render(
  <Page title="Example app">
    <Card sectioned>
      <Button onClick={() => alert('Button clicked!')}>Example button</Button>
    </Card>
  </Page>,
  document.querySelector('#app')
);
```

## Using the CSS components
If React doesn’t make sense for your application, you can use a CSS-only version of our components. This includes all the styles you need for every component in the library, but you will be responsible for writing the correct markup and updating classes and DOM attributes in response to user events.

### Usage
1. Include the CSS in your HTML:

```html
<link rel="stylesheet" href="https://sdks.shopifycdn.com/polaris/1.0.0/polaris.min.css">
```

2. Include the markup and associated classes in your HTML document:

```html
<button class="Polaris-Button">Example button</button>
```

## Examples
We have created example applications to document some of the ways you could include Polaris in one of your own applications. Each of these examples includes further documentation on how to install dependencies and run the app:

- [create-react-app example](https://github.com/Shopify/polaris/tree/master/examples/create-react-app)
- [Webpack example](https://github.com/Shopify/polaris/tree/master/examples/webpack)
- [Browserify example](https://github.com/Shopify/polaris/tree/master/examples/browserify)
- [CSS-only example](https://github.com/Shopify/polaris/tree/master/examples/cdn-styles)

## Methodology
We set out to make our components easy to use. Each of our components has a well-documented (and fully typed) public interface with strong, consistently-applied conventions. This way, developers don’t need to worry about the underlying implementation. Instead, they can focus on creating amazing merchant experiences.

We ensure that our components are made for everyone. They meet accessibility standards and are responsive to any screen or device. We also put a lot of effort into optimizing the performance of the components, so everyone can build inclusive experiences that work.

We make our components flexible enough to meet diverse needs. They present the information you pass in and give you smart callbacks when something has changed, but they do not enforce any structure beyond that. No matter what type of experience you're creating, you can use components as the building blocks of your product or feature.

## Learning resources
If you are new to React, we recommend you start with the [official React Getting Started documentation](https://facebook.github.io/react/docs/hello-world.html). As you read through the topics we suggest you follow along using their [React Hello World CodePen example](http://codepen.io/gaearon/pen/ZpvBNJ?editors=0010).

Additional resources:
- Online training courses at [reacttraining.com](http://reacttraining.com), [buildwithreact.com](http://buildwithreact.com), and [reactforbeginners.com](http://reactforbeginners.com).
- The community resources in [Awesome React](https://github.com/enaqx/awesome-react).
- As questions and find answers in the various [React support communities](https://facebook.github.io/react/community/support.html).

## Licenses
* Source code is licensed under [MIT](https://opensource.org/licenses/MIT)
* All icons and images are licensed under [Creative Commons Attribution-NoDerivatives 4.0](http://creativecommons.org/licenses/by-nd/4.0/)

## Feedback
[Create an issue or feature request](https://github.com/Shopify/polaris/issues/new).

At this point in time we’re not accepting pull requests. This is something we’ll support in the future. Stay tuned.
