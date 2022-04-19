# NodeJS support

`@shopify/polaris` supports the [last two long term support (LTS) versions](https://nodejs.org/en/about/releases/) of NodeJS. This matches our approach for the [Shopify CLI](https://github.com/Shopify/shopify-cli) a tool used by developers to quickly create applications that uses Polaris.

## Local development

We use the latest long term support version of nodejs for local development.

## Continuous Integration

We install dependencies, build the library and run tests across the two supported NodeJS versions.

## Where do we put Node.js versions?

The `package.json` engines. This should match the `.github/workflows/ci.yml` and list all supported versions.

```json
"engines": {
  "node": "^14.17.0 || ^16.13.0"
},
```

The GitHub actions `.github/workflows/ci.yml` file. This should match the `package.json` and list all supported versions.

```yml
node_version: ['14.17.0', '16.13.0']
```

The `dev.yml` file which creates a local development environment. This should match the `.nvmrc` file.

```yml
version: v16.13.0
```

The `.nvmrc` file for local development. This should match the `dev.yml` file.

```
v16.13.0
```

The `shipit.yml` files. This should point towards the GitHub actions the packages require to pass before publishing.

```
ci:
  require:
    - 'Test with node v14.17.0'
    - 'Test with node v16.13.0'

merge:
  require:
    - 'Test with node v14.17.0'
    - 'Test with node v16.13.0'
```
