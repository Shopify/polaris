# @shopify/polaris-icons

[![npm version](https://img.shields.io/npm/v/@shopify/polaris-icons.svg?style=flat)](https://www.npmjs.com/package/@shopify/polaris-icons)

> This package exports a JavaScript file containing the Polaris icons partners can use to build on the Shopify platform, and contains SVG files in the [`/dist/svg` directory](https://unpkg.com/@shopify/polaris-icons/dist/svg/) ([SVG usage instructions](#svg-files)).

Browse and search Polaris icons: <https://polaris-icons.shopify.com>.

## Getting started

Although it’s possible to use this package directly, we recommend using the icons in this package through [Polaris React](https://github.com/Shopify/polaris-react) in combination with the [`Icon`](https://polaris.shopify.com/components/images-and-icons/icon) component.

## Installation

1. Install Polaris React ([instructions](https://polaris.shopify.com/components/get-started)) if you haven’t already
2. Polaris icons as a dependency:

   Using [npm](https://www.npmjs.com/):

   ```
   npm install @shopify/polaris-icons --save
   ```

   Or, using [Yarn](https://yarnpkg.com/en/):

   ```
   yarn add @shopify/polaris-icons
   ```

## Usage

Import the [`Icon`](https://polaris.shopify.com/components/images-and-icons/icon) component from Polaris React and any icon from Polaris icons into your project.

1. Import the icon component from Polaris React:

   ```tsx
   import {Icon} from '@shopify/polaris';
   ```

2. Import an icon from Polaris icons:

   ```tsx
   import {PlusIcon} from '@shopify/polaris-icons';
   ```

3. Pass the imported Polaris icon to the `source` prop of the `Icon` component:

   ```tsx
   <Icon source={PlusIcon} />
   ```

### SVG files

For projects that don’t use React, icons are also available as `*.svg` files in the `dist/svg` folder.

[Browse the list of SVG files](https://unpkg.com/@shopify/polaris-icons/dist/svg/), hosted on the unpkg CDN (Content Delivery Network).

Suggested CSS and markup for projects that aren’t using the Polaris HTML and CSS components:

```css
.Custom-Polaris-Icon {
  display: block;
  height: 2rem; /* or value equivalent to 20px */
  width: 2rem; /* or value equivalent to 20px */
  max-height: 100%;
  max-width: 100%;
  margin: auto;
}

.Custom-Polaris-Icon__Svg {
  position: relative;
  display: block;
  width: 100%;
  max-width: 100%;
  max-height: 100%;

  /* Icon color */
  fill: #000;
}
```

```html
<span class="Custom-Polaris-Icon">
  <svg
    viewBox="0 0 20 20"
    class="Custom-Polaris-Icon__Svg"
    focusable="false"
    aria-hidden="true"
  >
    <path fill="currentColor" d="M7 13h6v6H7z" />
    <path
      d="M19.664 8.252l-9-8a1 1 0 0 0-1.328 0L8 1.44V1a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5.773L.336 8.252a1.001 1.001 0 0 0 1.328 1.496L2 9.449V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.449l.336.299a.997.997 0 0 0 1.411-.083 1.001 1.001 0 0 0-.083-1.413zM16 18h-2v-5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v5H4V7.671l6-5.333 6 5.333V18zm-8 0v-4h4v4H8zM4 2h2v1.218L4 4.996V2z"
      fill-rule="evenodd"
    />
  </svg>
</span>
```

## Contributing 🙌

To add, remove, or rename icons, follow the [contributing guide](https://github.com/Shopify/polaris/blob/main/polaris-icons/CONTRIBUTING.md).

## Licenses 📝

- Source code is under a [custom license](https://unpkg.com/browse/@shopify/polaris-icons/LICENSE.md) based on MIT. The license restricts Polaris icons usage to applications that integrate or interoperate with Shopify software or services, with additional restrictions for external, stand-alone applications.
- All icons and images are licensed under the [Polaris Design Guidelines License Agreement](https://polaris.shopify.com/legal/license).
