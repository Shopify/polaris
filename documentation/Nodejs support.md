# NodeJS support

`@shopify/polaris` supports node's current [active long term suppport (LTS) versions](https://nodejs.org/en/about/releases/). We should also ensure support for critical repositories at Shopify like `shopify/web`, 1st party applications and `shopify/cli`.

## Local development

We use the latest long term support version of nodejs for local development.

## Continuous Integration

We install dependencies, build the library and run tests across the two supported NodeJS versions.

## Where do we put Node.js versions?

The `package.json` engines. This should match the `.github/workflows/ci.yml` and list all supported versions.

```json
"engines": {
  "node": ">=20.11.1"
},
```

The GitHub actions `.github/workflows/ci.yml` file. This should match the `package.json` and list all supported versions.

```yml
node-version: ['20.11.1']
```

The `dev.yml` file which creates a local development environment. This should match the `.nvmrc` file.

```yml
version: v20.11.1
```

The `.nvmrc` file for local development. This should match the `dev.yml` file.

```
v20.11.1
```

The `shipit.yml` files. This should point towards the GitHub Actions the packages require to pass before publishing.

```yml
ci:
  require:
    - 'Validate with Node v20.11.1'

merge:
  require:
    - 'Validate with Node v20.11.1'
```

The `rollup.config.mjs` for some monorepo packages. This should match the minimum supported version.
