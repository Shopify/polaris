# NodeJS support

`@shopify/polaris` supports the [last two long term support (LTS) versions](https://nodejs.org/en/about/releases/) of NodeJS. This matches our approach for the [Shopify CLI](https://github.com/Shopify/shopify-cli) a tool used by developers to quickly create applications that uses Polaris.

## Local development

We use the latest long term support version of nodejs for local development.

## Continuous Integration

We install dependencies, build the library and run tests across the two supported NodeJS versions.

## Where do we put Node.js versions?

The `package.json` engines.

```json
"engines": {
  "node": "^14.17.0 || ^16.13.0"
},
```

The `dev.yml` file which creates a local development environment.

```yml
version: v16.13.0
```

The GitHub actions `.github/workflows/ci.yml` file:

```yml
node_version: ['14.17.0', '16']
```

The `.nvmrc` file:
```
v16.13.0
```
