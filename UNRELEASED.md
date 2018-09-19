# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### New components

We've released a suite of new components that, when combined, form the application frame of a standalone (or non-embedded) Polaris app.

#### [Frame](https://polaris.shopify.com/components/structure/frame)

The frame component, while not visible in the user interface itself, provides the structure for any non-embedded application. It wraps the main elements and houses the primary [navigation](https://polaris.shopify.com/components/navigation/navigation), [top bar](https://polaris.shopify.com/components/structure/topbar), [toast](https://polaris.shopify.com/components/structure/toast), [loading](https://polaris.shopify.com/components/structure/loading), and [contextual save bar](https://polaris.shopify.com/components/structure/contextual-save-bar) components.

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

### Enhancements

- Changed `Form` to default the `method` to `post` in order to prevent accidental leaking of form details ([#2066](https://github.com/Shopify/polaris-react/pull/2066))
- Added support for boolean type on Choice error prop ([#2085](https://github.com/shopify/polaris-react/pull/2085))
- Changed the esnext folder to contain individual, minimally transpiled JavaScript component files, as well as raw style and image assets ([#2226](https://github.com/Shopify/polaris-react/pull/2226))

## Bug fixes

- Fixed `Portal` rendering by using `componentDidMount` lifecycle hook as opposed to `componentWillMount` ([#2243](https://github.com/Shopify/polaris-react/pull/2243));
- Fixed console error and used new ref syntax in `DataTable` ([#2196](https://github.com/Shopify/polaris-react/pull/2196)) (thanks to ([@duythien0912](https://github.com/duythien0912)) for the ([original issue](https://github.com/Shopify/polaris/issues/403)))

## Breaking changes

- Added padding top and bottom on `Card.Section` when set to full width ([#2280](https://github.com/Shopify/polaris-react/pull/2280))

### Documentation

- Updated banner guidelines to make it clearer when success banners should be used vs success toasts. ([#2046](https://github.com/Shopify/polaris-react/pull/2046))
- Added examples for iOS and Android section header ([#1918](https://github.com/Shopify/polaris-react/pull/1918))
- Added examples for iOS and Android thumbnail ([#1962](https://github.com/Shopify/polaris-react/pull/1962))
- Added examples for iOS and Android empty state ([#2021](https://github.com/Shopify/polaris-react/pull/2021))
- Added examples for iOS and Android text field ([#1893](https://github.com/Shopify/polaris-react/pull/1893))
- Added examples for iOS and Android select ([#2041](https://github.com/Shopify/polaris-react/pull/2041))
- Added examples for iOS and Android keyboard accessories ([#2033](https://github.com/Shopify/polaris-react/pull/2033))
- Added examples for iOS and Android collapsible ([#2031](https://github.com/Shopify/polaris-react/pull/2031))
- Added examples for iOS and Android list ([#2030](https://github.com/Shopify/polaris-react/pull/2030))
