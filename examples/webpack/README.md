# Example app using webpack
Demonstrates Polaris inside a React app served via `webpack` and `webpack-dev-server`.

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
Run the local `webpack` development server.

**With Yarn**

```bash
yarn start
```

**With npm**

```bash
npm start
```

Open http://localhost:8080 in your browser and you should see the Polaris example application.

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

This generates a `build` directory containing `index.html` and `bundle.js`.  The index loads all Polaris styles via the Polaris CDN and the application scripts via `bundle.js`
