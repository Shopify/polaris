# NodeJS support

`@shopify/polaris` supports node's long term suppport (LTS) versions that are in the active or maintenance stages of their [lifecycle](https://nodejs.org/en/about/releases/). We should also ensure support for critical repositories at Shopify like `shopify/web`, 1st party applications and `shopify/cli`.

## Local development

We use the latest long term support version of nodejs for local development.

## Continuous Integration

We install dependencies, build the library and run tests across the two supported NodeJS versions.

## Where do we put Node.js versions?

The `package.json` engines. This should match the `.github/workflows/ci.yml` and list all supported versions.

```json
"engines": {
  "node": "^14.18.0 || ^16.13.0"
},
```

The GitHub actions `.github/workflows/ci.yml` file. This should match the `package.json` and list all supported versions.

```yml
node-version: ['14.18.0', '16.13.0']
```

The `dev.yml` file which creates a local development environment. This should match the `.nvmrc` file.

```yml
version: v16.13.0
```

The `.nvmrc` file for local development. This should match the `dev.yml` file.

```
v16.13.0
```

The `shipit.yml` files. This should point towards the GitHub Actions the packages require to pass before publishing.

```yml
ci:
  require:
    - 'Validate with Node v14.18.0'
    - 'Validate with Node v16.13.0'

merge:
  require:
    - 'Validate with Node v14.18.0'
    - 'Validate with Node v16.13.0'
```
