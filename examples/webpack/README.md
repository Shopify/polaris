# Example app using webpack
This example app demonstrates Polaris integrated into the React project using `webpack` and `webpack-dev-server` with minimal setup and configuration.

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

### Build
You can bundle up your application using the preconfigured webpack build.

**With Yarn**

```bash
yarn build
```

**With npm**

```bash
npm build
```

This will generate a `./build` directory with an `index.html` and `bundle.js` file. The `index.html` loads all the Polaris styles through the Polaris CDN and references `bundle.js` file for all the JavaScripts your applications requires.

