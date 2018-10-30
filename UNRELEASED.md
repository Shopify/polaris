# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### New components

We've released a suite of new components that, when combined, form the application frame of a standalone (or non-embedded) Polaris app.

#### [Frame](https://polaris.shopify.com/components/structure/frame)

The frame component, while not visible in the user interface itself, provides the structure for any non-embedded application. It wraps the main elements and houses the primary [navigation](https://polaris.shopify.com/components/navigation/navigation), [top bar](https://polaris.shopify.com/components/structure/top-bar), [toast](https://polaris.shopify.com/components/structure/toast), [loading](https://polaris.shopify.com/components/structure/loading), and [contextual save bar](https://polaris.shopify.com/components/structure/contextual-save-bar) components.

#### [Navigation](https://polaris.shopify.com/components/navigation/navigation)

The navigation component is used to display the primary navigation in the sidebar of the [frame](https://polaris.shopify.com/components/structure/frame/components/structure/frame) of any non-embedded application. Navigation includes a list of links that merchants use to move between sections of the application.

#### [TopBar](https://polaris.shopify.com/components/structure/top-bar)

The top bar component is always visible at the top of a non-embedded application. Its logo and color can be customized using the [app provider](/components/structure/app-provider) component to reflect an application’s brand. Merchants can use it to search an application, access menus, and navigate by clicking on the logo.

#### [Toast](https://polaris.shopify.com/components/feedback-indicators/toast)

The toast component is a non-disruptive message that appears at the bottom of the interface to provide quick, at-a-glance feedback on the outcome of an action.

#### [Loading](https://polaris.shopify.com/components/feedback-indicators/loading)

The loading component is used to indicate to merchants that a page is loading or an upload is processing.

#### [ContextualSaveBar](https://polaris.shopify.com/components/forms/contextual-save-bar)

The contextual save bar tells merchants their options once they have made changes to a form on the page. This component is also shown while creating a new object like a product or customer. Merchants can use this component to save or discard their work.

#### [Autocomplete](https://polaris.shopify.com/components/forms/autocomplete)

The autocomplete component is an input field that provides selectable suggestions as a merchant types into it. It allows merchants to quickly search through and select from large collections of options.

### Enhancements

- Changed `Form` to default the `method` to `post` in order to prevent accidental leaking of form details
- Added support for boolean type on Choice error prop
- Changed the esnext folder to contain individual, minimally transpiled JavaScript component files, as well as raw style and image assets
- Added `onPortalCreated` prop to `Portal`
- Improved consistency of `Badge` styling
- Explicitly specifying `list-style` on `List`

### Bug fixes

- Fixed console error and used new ref syntax in `DataTable` (thanks to ([@duythien0912](https://github.com/duythien0912)) for the ([original issue](https://github.com/Shopify/polaris-react/issues/403)))
- Fixed the ability to upload multiple files even when `allowedMultiple` prop is false
- Fixed `Datatable` so it resizes with new content (thanks [@andrewpye](https://github.com/andrewpye) for the [original issue](https://github.com/Shopify/polaris-react/issues/387))
- Fixed `RangeSlider` linear-gradient so it doesn't break the css build (thanks [@Ankitjasoliya](https://github.com/Ankitjasoliya) and [@nerfologist](https://github.com/nerfologist) for the [original issue](https://github.com/Shopify/polaris-react/issues/441))
- Fixed issue in `Page`, where styling wasn't being applied correctly to Page Actions
- Removed unnecessary bindings on `Modal`s `onClose` prop. [original issue](https://github.com/Shopify/polaris-react/issues/441))

### Breaking changes

- Added padding top and bottom on `Card.Section` when set to full width
- Fixed `Portal` rendering by using `componentDidMount` lifecycle hook as opposed to `componentWillMount`;
- Fixed an issue where clicking a `Link` without a `url` in a form would implicitly submit the form. `Link` can no longer submit forms. Use `<Button submit>` instead.
- Renamed the `Keys` enum to align with Shopify naming standards. It is now singular and the properties are in PascalCase. Replace `import {Keys} from '@shopify/polaris'` with `import {Key} from '@shopify/polaris'` and change the casing of the properties, e.g. replace `Keys.DOWN_ARROW` with `Key.DownArrow`

#### Embedded apps

- Upgraded to the Shopify App Bridge and removed the EASDK
- Removed `easdk` from React context and added `appBridge` which accessible via `this.context.polaris.appBridge`
- Updated `shopOrigin` prop on `AppProvider` to optional as we provide it by default. Note that if you provide a `shopOrigin` it now needs to be provided without the `'https://'` per the Shopify App Bridge API
- Removed `debug` prop from `AppProvider` as it no longer supported by the Shopify App Bridge, use Redux DevTools instead
- Removed the embedded bundle so imports from `'@shopify/polaris/embedded'` will no longer work, use `'@shopify/polaris'` instead
- Removed the `Alert` component as it no longer supported by the Shopify App Bridge, use `Modal` instead
- Moved `ResourcePicker` to main bundle, import from `'@shopify/polaris'`
- Updated `target` prop type related to embedded apps, use `'APP'`, `'ADMIN_PATH'`, or `'REMOTE'`
- Added `target` prop to all actions which get passed to the Shopify App Bridge
- Removed `width` and `height` props from `Modal` as they are no longer supported by the Shopify App Bridge
- Added new `size` and `message` props to `Modal` which aligns with the Shopify App Bridge API
- Removed `title` prop from `ResourcePicker`
- Removed `products` and `collections` props from `ResourcePicker`, use new `resourceType` prop instead
- Added new `resourceType`, `initialQuery`, and `showVariants` props to `ResourcePicker` which aligns with the Shopify App Bridge API
- Added Shopify App Bridge support to new components `Toast` and `Loading`

#### License

- Updated the license from MIT to a custom license based on MIT. The new license restricts Polaris usage to applications that integrate or interoperate with Shopify software or services, with additional restrictions for external, stand-alone applications.

### Documentation

- Updated banner guidelines to make it clearer when success banners should be used vs success toasts.
- Added examples for iOS and Android section header
- Added examples for iOS and Android thumbnail
- Added examples for iOS and Android empty state
- Added examples for iOS and Android text field
- Added examples for iOS and Android select
- Added examples for iOS and Android keyboard accessories
- Added examples for iOS and Android collapsible
- Added examples for iOS and Android list
- Clarified placement and usage of `Banner`
- Added an explanation to `Modal` about why it can't be closed by clicking outside the modal and should only be closed by clicking `X` or `Cancel`

### Development workflow

- Moved sub-sub-components within `ResourceList` into components folders
- Removed empty state from `ResourceList` if there are no items and `loading` is true
- Move to use sewing-kit for test running, updating to Jest 23 in the process. This gives us working sourcemaps for code coverage
- Improved accessibility testing checklist

#### Open development

- Added [contribution guidelines](https://github.com/Shopify/polaris-react/blob/master/.github/CONTRIBUTING.md)
- Added [tophatting documentation](https://github.com/Shopify/polaris-react/blob/master/documentation/Tophatting.md)
- Updated the project README
- Moved active development to the public repository
