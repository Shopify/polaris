# Quilt

Experimental (read: don't use!) version of Shopify's core components, written in React.

## Development

Don't bother trying to lint the styles, it doesn't work right now. Important commands:

- `yarn` installs all the dependencies.
- `yarn run lint:scripts` runs ESLint.
- `yarn run lint:flow` runs flow.
- `yarn run demo` opens a hot-reloading demo (located in `/demo`) that lets you see how things are working.
- `yarn run build:node` just transpiles the JavaScript down into something browsers can understand. It doesn't currently do anything about the styles, which are using CSS modules — still need to figure that piece out.
- `yarn run build:lib` creates a library bundle and a combined CSS file in `/build`.
