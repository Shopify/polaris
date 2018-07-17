# Polaris React

[![CircleCI](https://circleci.com/gh/Shopify/polaris-react.svg?style=svg&circle-token=c8498f3af1d113fe3974c8881c4ce32ef09423c2)](https://circleci.com/gh/Shopify/polaris-react)

The reference implementation of [Polaris](https://polaris.shopify.com), written in React and TypeScript.

This is the internal version of the [Polaris repository](https://github.com/Shopify/polaris). All changes and issues should be made here, and the changes will be applied to the public version when we release a new version.

## Development

We’ve created a simple, hot-reloading playground for development on these components. You can edit the `playground/Playground.tsx` file to import the components you are working on, and run `yarn dev` in order to start the development server. Please do not commit your work on the playground so that it is pristine for other developers to work on.

### Testing on mobile or a virtual machine

1.  Run `yarn dev:host`
1.  Visit http://YOUR_IP_ADDRESS:ASSIGNED_PORT in a browser window from within your [virtual machine](https://vault.shopify.com/IE-Testing#steps-to-get-started) or mobile device on the same network

### Testing in a consuming project

- Run `yarn run build-consumer PROJECT_DIRECTORY`

`PROJECT_DIRECTORY` is where the build will be copied, which must be a sibling of the `polaris-react` directory.

```sh
# Example
yarn run build-consumer polaris-styleguide
```

In the example above, the build is copied to `polaris-styleguide/node_modules/@shopify/polaris`. And in this case, a rebuild of `polaris-styleguide` is required after copying the `polaris-react` build, but may not be the case for all consuming projects.

```sh
# Example
dev cd polaris-styleguide
yarn run build:development
```

Also, when running `yarn install` (which often happens as part of `dev up`), copied builds will be overwritten and will require running `yarn run build-consumer PROJECT_DIRECTORY` again.

---

## Visual regression testing

[Percy](https://percy.io/) runs for every pull request. Percy is a tool that compares screenshots for every single component we have in the library.

Percy is not always 100% accurate. Since it uses screenshot comparison, even browser subpixel rendering differences can cause Percy to ask for user confirmation of whether a change was intended or not. In cases like that, use your best judgement to determine whether you need to address it or not. This is why the choice to approve something or not is always left to the contributor.

Percy is a tool that’s supposed to help you and give you more confidence, not some checker that you need to appease. The final call lies with you as a contributor.

### Running visual regression tests locally

1.  Build and start the component examples server:
    ```
    yarn run tophat
    ```
2.  In a separate terminal session, run:
    ```
    PERCY_TOKEN=aaaabbbbcccc \
    PERCY_PROJECT=Shopify/polaris-react \
    PERCY_BRANCH=local \
    yarn run test:percy
    ```
    Where `aaaabbbbcccc` is the API key available in the
    [Percy project settings page for polaris-react](https://percy.io/Shopify/polaris-react/settings).
3.  Check tests results: <https://percy.io/Shopify/polaris-react> (can’t
    view the results? [Ask for access on Slack](https://shopify.slack.com/messages/C4Y8N30KD))

---

See [Neutron Technical Brief: Outside Admin](https://docs.google.com/document/d/1d5ZnRvNYWB2Z7_60Rr6V8_ujXB5S2wPQ4BlqvPxeLjE/edit#heading=h.m7ed1jg4h8vu) for more details.
