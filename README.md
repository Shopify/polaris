# Polaris

Introductory things.

## Initial setup (One time)

1. Initialize the repository by installing external dependencies and symlinking internal packages.

```sh
yarn initialize
```

2. Build every package in the monorepo.

```sh
yarn build
```

> Note: Run the following command if you add/remove any internal packages to ensure all symlinks are up to date.

```sh
yarn refresh
```

## Local development

Simply run `yarn dev:<package-name>`

Develop the `polaris` package in watch mode:

```sh
yarn dev:polaris
```

Run the `Next.js App` in watch mode:

```sh
yarn dev:site
```
