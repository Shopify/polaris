# Example app using Browserify

Demonstrates [Polaris](https://polaris.shopify.com) inside a [React](https://facebook.github.io/react/) app bundled via [Browserify](http://browserify.org/).

## Dependencies

- [yarn](https://github.com/yarnpkg/yarn/) or [npm](https://www.npmjs.com/)

## Getting started

### Installation

Clone this project and install all the project dependencies.

**With Yarn**

```bash
yarn install
```

**With npm**

```bash
npm install
```

### Development

Start your development server.

**With Yarn**

```bash
yarn start
```

**With npm**

```bash
npm start
```

This will generate a `./build` directory with an `index.html` and `bundle.js` file. Open the `./build/index.html` file into a web browser to see the example application.

`./build/index.html` loads all the Polaris styles via the Polaris CDN and scripts via `./build/bundle.js`.

The `start` npm script uses `watchify` to recompile `./build/bundle.js` with changes you’ve made in the `./src` directory. Reload the `./build/index.html` page in your browser to see the updated changes.
