# Polaris
[![CircleCI](https://circleci.com/gh/Shopify/polaris-react.svg?style=svg&circle-token=c8498f3af1d113fe3974c8881c4ce32ef09423c2)](https://circleci.com/gh/Shopify/polaris-react)

A UI component library written in our modern FED tech stack (TypeScript, React)

This is the internal version of the [Polaris repository](https://github.com/Shopify/polaris). All changes and issues should be made here, and the changes will be applied to the public version when we release a new version.

## Development

We’ve created a simple, hot-reloading playground for development on these components. You can edit the `playground/Playground.tsx` file to import the components you are working on, and run `yarn dev` in order to start the development server. Please do not commit your work on the playground so that it is pristine for other developers to work on.

### Using a proxy server for testing on mobile or a virtual machine

To access the playground from a virtual machine or mobile phone:
1. Follow steps to setup your VM and proxy service [here](https://vault.shopify.com/IE-Testing#steps-to-get-started).
1. Run `yarn dev:host`
1. Find your local IP address in simple proxy and visit http://YOUR_IP_ADDRESS:8888 in a browser window from within your VM or device (assuming 8888 was the port you used in simple proxy).

![image](https://screenshot.click/Monosnap_2017-08-09_16-22-13.png)

----
See [Neutron Technical Brief: Outside Admin](https://docs.google.com/document/d/1d5ZnRvNYWB2Z7_60Rr6V8_ujXB5S2wPQ4BlqvPxeLjE/edit#heading=h.m7ed1jg4h8vu) for more details.
