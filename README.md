# Polaris
[![CircleCI](https://circleci.com/gh/Shopify/polaris-react.svg?style=svg&circle-token=c8498f3af1d113fe3974c8881c4ce32ef09423c2)](https://circleci.com/gh/Shopify/polaris-react)

A UI component library written in our modern FED tech stack (TypeScript, React)

This is the internal version of the [Polaris repository](https://github.com/Shopify/polaris). All changes and issues should be made here, and the changes will be applied to the public version when we release a new version.

## Development

We’ve created a simple, hot-reloading playground for development on these components. You can edit the `playground/Playground.tsx` file to import the components you are working on, and run `yarn dev` in order to start the development server. Please do not commit your work on the playground so that it is pristine for other developers to work on.

### Testing on mobile or a virtual machine

1. Run `yarn dev:host`
1. Visit http://YOUR_IP_ADDRESS:ASSIGNED_PORT in a browser window from within your [virtual machine](https://vault.shopify.com/IE-Testing#steps-to-get-started) or mobile device on the same network

### Testing in a consuming project

- Run `yarn run build-consumer PROJECT_DIRECTORY`

`PROJECT_DIRECTORY` is where the build will be copied, which must be a sibling of the `polaris-react` directory.

Example: `yarn run build-consumer polaris-styleguide`

----
See [Neutron Technical Brief: Outside Admin](https://docs.google.com/document/d/1d5ZnRvNYWB2Z7_60Rr6V8_ujXB5S2wPQ4BlqvPxeLjE/edit#heading=h.m7ed1jg4h8vu) for more details.
