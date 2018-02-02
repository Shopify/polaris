# Changelog

All notable changes to this project will be documented in this file.

The format is based on [these versioning and changelog guidelines][changelog-guidelines].

## Unreleased
### Bug fixes
* Fixed an issue with footer help links not expanding to full-width on mobile devices ([#759](https://github.com/Shopify/polaris-react/issues/759))
* Added max-width and auto margin to EmptyState ([#969](https://github.com/Shopify/polaris-react/pull/969))
* Fixed outline button disabled state styles ([#972](https://github.com/Shopify/polaris-react/pull/972))
* Fixed Tag so the onRemove function is not imporperly called (thanks [chaddjohnson](https://github.com/chaddjohnson) for the [original issue](https://github.com/Shopify/polaris/issues/235) ) ([#970](https://github.com/Shopify/polaris-react/pull/970))
* Fixed border on inputs disabled state ([#1007](https://github.com/Shopify/polaris-react/pull/1007))
* Fixed an issue in TextInput, when you increment or decrement with a float value, and the digits after the decimal point where wrong ([#833](https://github.com/Shopify/polaris-react/pull/898)) (thanks to [@cgidzinski](https://github.com/cgidzinski) for the [original issue](https://github.com/Shopify/polaris-react/issues/761))
* Added top alignment to FormLayout.Group [#876](https://github.com/Shopify/polaris-react/pull/876)

### Documentation
* Fixed capitalization of prop names in Pagination component’s documentation (thanks [donnguyen](https://github.com/donnguyen) for the [original issue](https://github.com/Shopify/polaris/issues/141)) ([#975](https://github.com/Shopify/polaris-react/pull/975))
* Exposed Option from the Select component ([#976](https://github.com/Shopify/polaris-react/pull/976))

## 1.10.2 - 2018-01-22
### Bug fixes
* Fixed the public repository’s build (which was missing the new CircleCI configuration files) ([#951](https://github.com/Shopify/polaris-react/pull/951))

## 1.10.1 - 2018-01-19
### Bug fixes
* Fixed CSS only checkbox (thanks [daddy88](https://github.com/daddy88) for the [original issue](https://github.com/Shopify/polaris/issues/252)) ([#932](https://github.com/Shopify/polaris-react/pull/932))

## 1.10.0 - 2018-01-17
* Restored the correct `latest` version to the CDN
* Fixed rgbToHsb function when red is the largest number and added tests (thanks [emcmanus](https://github.com/emcmanus) for the [original issue](https://github.com/Shopify/polaris/issues/251)) ([#877](https://github.com/Shopify/polaris-react/pull/877))
* Fixed an issue where a hard-coded path would cause the build to fail on Windows ([#833](https://github.com/Shopify/polaris-react/pull/833)) (thanks to [@Invader444](https://github.com/Invader444) for the [original issue](https://github.com/Shopify/polaris/issues/245) and [pull request](https://github.com/Shopify/polaris/pull/246))
* Added `onClick` to `UnstyledLink` ([#832](https://github.com/Shopify/polaris-react/pull/832))
* Added tests to `Link` ([#832](https://github.com/Shopify/polaris-react/pull/897))

## 1.9.1 - 2017-12-21
### Documentation
* Ammending changelog

## 1.9.0 - 2017-12-21
### Enhancements
* Added `onActionAnyItem` prop to action list and used to close page `actionGroups` on click or keypress of any item ([#792](https://github.com/Shopify/polaris-react/pull/792))
* Added `content` prop to tabs and deprecated use of `title` ([#808](https://github.com/Shopify/polaris-react/pull/808))
* Added text container component ([#757](https://github.com/Shopify/polaris-react/pull/757/))
* Added `idForItem` prop to resource list ([#799](https://github.com/Shopify/polaris-react/pull/799/))
* Added `fullWidth` prop to layout section ([#743](https://github.com/Shopify/polaris-react/pull/743/))
* Added `indeterminate` as option for checkbox `checked` prop value ([#748](https://github.com/Shopify/polaris-react/pull/748))
* Added `singleColumn` prop to page ([#763](https://github.com/Shopify/polaris-react/pull/763))
* Added `focused` prop to text field [813](https://github.com/Shopify/polaris-react/pull/813)

### Bug fixes
* Fixed positioned overlay not responding to scrollable container events
* Fixed first focusable item focus in popovers ([#764](https://github.com/Shopify/polaris-react/pull/764))
* Fixed typos in the select component documentation (thanks [mattchidley](https://github.com/mattchidley) for the [original issue](https://github.com/Shopify/polaris/issues/224)) ([#773](https://github.com/Shopify/polaris-react/pull/773))

## 1.8.3 - 2017-10-26
### Bug fixes
* Moved react-transition-group from a dev dependency to a dependency

## 1.8.2 - 2017-10-24
### Bug fixes
* Fixed stack not returning children

## 1.8.1 - 2017-10-24
### Bug fixes
* Added missing yarn config file which was causing the build to fail

## 1.8.0 - 2017-10-23
### Documentation
* Updated README to consistently use contractions (thanks [stefanmiodrag](https://github.com/stefanmiodrag) for the [original pull request](https://github.com/Shopify/polaris/pull/191)) ([#682](https://github.com/Shopify/polaris-react/pull/682))
* Improved example description for Layout component ([#683](https://github.com/Shopify/polaris-react/pull/683))
* Updated Spinner documentation ([#696](https://github.com/Shopify/polaris-react/pull/696))
* Improved component purpose documentation across components ([#717](https://github.com/Shopify/polaris-react/pull/717))
* Improved documentation for Text style component ([#720](https://github.com/Shopify/polaris-react/pull/720))

### Enhancements
* Added support for React 16 ([#699](https://github.com/Shopify/polaris-react/pull/699))
* Added an option to show or hide unpublished products from the resource picker ([#628](https://github.com/Shopify/polaris-react/pull/628))
* Changed Popover component to use `react-transition-group` instead of our deprecated custom version in `@shopify/react-utilities` ([#718](https://github.com/Shopify/polaris-react/pull/718))
* Added new Progress bar component ([#659](https://github.com/Shopify/polaris-react/pull/659))
* Changed today’s date to be tabbable and clearly indicated in DatePicker ([#651](https://github.com/Shopify/polaris-react/pull/651))
* Added support for disabled choices in Choice list component ([#726](https://github.com/Shopify/polaris-react/pull/726))
* Added support for disabled secondary Page actions ([#650](https://github.com/Shopify/polaris-react/pull/650))
* Changed TextField and Select to now focus on clicking only within the area from the input to the end of its label text ([#694](https://github.com/Shopify/polaris-react/pull/694))

### Bug fixes
* Fixed Layout component example description
* Fixed SkeletonPage header appearing in embedded apps (thanks [rkbhochalya](https://github.com/rkbhochalya) for the [original issue](https://github.com/Shopify/polaris/issues/202))) ([#714](https://github.com/Shopify/polaris-react/pull/714))
* Fixed border-radius on Action list component in Chrome ([#719](https://github.com/Shopify/polaris-react/pull/719))


## 1.7.0 - 2017-10-06
### Enhancements
* Added SkeletonPage, SkeletonBodyText and SkeletonDisplayText components ([#615](https://github.com/Shopify/polaris-react/pull/615))
* Added Spinner component ([#621](https://github.com/Shopify/polaris-react/pull/621))
* Added hint prop to Scrollable and use in Popover ([#619](https://github.com/Shopify/polaris-react/pull/619))
* Updated Button component to use new Spinner component ([#621](https://github.com/Shopify/polaris-react/pull/621))
* Added external link support for Page secondaryActions ([#664](https://github.com/Shopify/polaris-react/pull/664/))
* Enabled the primaryAction of PageActions to be loading ([#653](https://github.com/Shopify/polaris-react/pull/653/))
* Stack now supports non-wrapping layouts on small screens ([#638](https://github.com/shopify/polaris-react/pull/638))
* Updated text field min and max documentation ([#635](https://github.com/shopify/polaris-react/pull/635))
* Breadcrumbs now accept a callback through onAction (thanks [arypbatista](https://github.com/arypbatista) for the [original issue](https://github.com/Shopify/polaris/issues/188)) ([#663](https://github.com/Shopify/polaris-react/pull/663))

### Bug fixes
* Fixed issue with embedded app breadcrumb linking to Shopify settings page (thanks [cargix1](https://github.com/cargix1) for the [original issue](https://github.com/Shopify/polaris/issues/116))([#663](https://github.com/Shopify/polaris-react/pull/663))
* Fixed Avatar to display image and initials simultaneously ([#642](https://github.com/shopify/polaris-react/pull/642))
* Fixed various links to embedded components ([#643](https://github.com/shopify/polaris-react/pull/643))
* Fixed left and right ends of TextField not responding to clicks([#644](https://github.com/shopify/polaris-react/pull/644))
* RadioButton & Checkbox now focus on clicking only within the area from the input to the end of its label text ([#671](https://github.com/shopify/polaris-react/pull/671))
* Fixed plain and fullWidth Button alignment ([#645](https://github.com/shopify/polaris-react/pull/645))
* Add a minor delay to tooltip display ([#678](https://github.com/Shopify/polaris-react/pull/678))

## 1.6.0 - 2017-09-25
### Enhancements
* Documented disabled prop for Checkbox and RadioButton (thanks [LeoAref](https://github.com/LeoAref) for the [original issue](https://github.com/Shopify/polaris/issues/114)) ([#627](https://github.com/Shopify/polaris-react/pull/627/files))
* Documented progress prop for Badge (thanks [sp4cecat](https://github.com/sp4cecat) for the [original issue](https://github.com/Shopify/polaris/issues/172)) ([#625](https://github.com/Shopify/polaris-react/pull/625/files))
* Added loading prop to Button (thanks [bakura10](https://github.com/bakura10) for the [original issue](https://github.com/Shopify/polaris/issues/30)) ([#626](https://github.com/Shopify/polaris-react/pull/626/files))
* Documented complex Select option (thanks [sp4cecat](https://github.com/sp4cecat) for the [original issue](https://github.com/Shopify/polaris/issues/174)) ([#630](https://github.com/Shopify/polaris-react/pull/630/files))
* Documented TextStyle component ([#631](https://github.com/Shopify/polaris-react/pull/631))
* Improved avatar typography spacing ([#629](https://github.com/Shopify/polaris-react/pull/629))
* Added subtract icon ([#648](https://github.com/Shopify/polaris-react/pull/648))
* Improved acessibility for Pagination ([#639](https://github.com/Shopify/polaris-react/pull/639))

### Bug fixes
* Fixed failed dependency installation for unauthenticated GitHub users  (thanks [mikeyhew](https://github.com/mikeyhew) for the [original issue](https://github.com/Shopify/polaris/issues/184)) ([#623](https://github.com/Shopify/polaris-react/pull/623/files))
* Fixed Page header spacing ([#634](https://github.com/Shopify/polaris-react/pull/634))
* Fixed TextField focus ring transition ([#636](https://github.com/Shopify/polaris-react/pull/636))
* Fixed Popover not resizing on content updates ([#506](https://github.com/Shopify/polaris-react/pull/506))


## 1.5.2 - 2017-09-18
### Bug fixes
* Fixes alignment of page action links ([#589](https://github.com/Shopify/polaris-react/pull/589))

## 1.5.1 - 2017-08-30
### Bug fixes
* Fixed disabled buttons when using local class names ([#593](https://github.com/Shopify/polaris-react/pull/593))
* Fixed Scrollable resize listener not autobinding ([#592](https://github.com/Shopify/polaris-react/pull/592))

## 1.5.0 - 2017-08-30
### Enhancements
* Updated scrollable component to remember scroll position on re-render ([#583](https://github.com/Shopify/polaris-react/pull/583))
* Added checkmark icon to the `Icon` component ([#584](https://github.com/Shopify/polaris-react/pull/584))
* Added an example for a disabled `TextField`

### Bug fixes
* Fixed typo in `Icon` code example ([#581](https://github.com/Shopify/polaris-react/pull/581))

## 1.4.1 - 2017-08-24
Various documentation fixes.

## 1.4.0 - 2017-08-22
### Enhancements
* Updated import, export, and view icons ([#543](https://github.com/Shopify/polaris-react/pull/543))
* Improved documentation of various components
* Improved how ActionList handles images and groups ([#550](https://github.com/Shopify/polaris-react/pull/550))
* Exposed PopoverCloseSource from Popover component ([#562](https://github.com/Shopify/polaris-react/pull/562))

### Bug fixes
* Fixed PageActions spacing in IE11 ([#544](https://github.com/Shopify/polaris-react/pull/544))
* Fixed ID inconsistency on TextFields ([#553](https://github.com/Shopify/polaris-react/pull/553))
* Fixed spacing on Page component with no header (thanks [bakura10](https://github.com/bakura10) for the [original issue](https://github.com/Shopify/polaris/issues/160)) ([#563](https://github.com/Shopify/polaris-react/pull/563/files))
* Fixed disabled state on primary and destructive buttons ([#549](https://github.com/Shopify/polaris-react/pull/549/files))

### Chores
* Upgraded javascript-utilities to the latest version ([#542](https://github.com/Shopify/polaris-react/pull/542))

## 1.3.1 - 2017-08-10
### Bug fixes
* Fixed classnames in built *.scss files ([#537](https://github.com/Shopify/polaris-react/pull/537))
* Fixed broken link in description list README ([#534](https://github.com/Shopify/polaris-react/pull/534))

## 1.3.0 - 2017-08-09
### Enhancements
* Added an `esnext` build (allows production builds to perform class/method tree shaking) ([#491](https://github.com/Shopify/polaris-react/pull/491))
* Changed KeyboardKey component to use `kbd` tag ([#500](https://github.com/Shopify/polaris-react/pull/500))
* Added publishing `docs` folder to npm package ([#504](https://github.com/Shopify/polaris-react/pull/504))
* Added `fullWidth` option to Popover component ([#505](https://github.com/Shopify/polaris-react/pull/505))

### Bug fixes
* Updated Static HTML page examples to correct markup (thanks [bartcoppens](https://github.com/bartcoppens) for the [original issue](https://github.com/Shopify/polaris/issues/159)) ([#502](https://github.com/Shopify/polaris-react/pull/502))
* Hide increment and decrement buttons on number input when disabled (thanks [kguller](https://github.com/kguller) for the [original issue](https://github.com/Shopify/polaris/issues/163)) ([#524](https://github.com/Shopify/polaris-react/pull/524))
* Fixed link to product content documentation ([#528](https://github.com/Shopify/polaris-react/pull/528))
* Fixed documented type for error prop on Checkbox component ([#523](https://github.com/Shopify/polaris-react/pull/523))
* Fixed Popover reopening when clicking around during transition ([#531](https://github.com/Shopify/polaris-react/pull/531))
* Fixed Popover resizing on content updates ([#506](https://github.com/Shopify/polaris-react/pull/506))
* Fixed vertical alignment of Button content ([#525](https://github.com/Shopify/polaris-react/pull/525))

### Sketch UIKit
* Added Sketch color palette file

## 1.2.1 (July 27, 2017)
### Chores
* Fixed a repo issue that caused the public repo release not to happen

## 1.2.0 (July 27, 2017)
### Enhancements
* Added helpText to ChoiceList choices (thanks [cgenevier](https://github.com/cgenevier)  for the [original issue](https://github.com/Shopify/polaris/issues/103)) ([#409](https://github.com/Shopify/polaris-react/pull/409))
* Added save icon ([#433](https://github.com/Shopify/polaris-react/pull/433))
* Added accessibilityLabel to Tabs ([#439](https://github.com/Shopify/polaris-react/pull/439))
* Updated icons for Banner ([#441](https://github.com/Shopify/polaris-react/pull/441))
* Improved Page component by fixing up spacing, addin a prop to show a separator below the page title, and changing the secondary actions to roll up into a dropdown menu on small screens ([#421](https://github.com/Shopify/polaris-react/pull/421)) ([#465](https://github.com/Shopify/polaris-react/pull/465)) ([#481](https://github.com/Shopify/polaris-react/pull/481))
* Improved default stacking behavior for Tooltip and Popover (thanks [Taphood](https://github.com/Taphood)  for the [original issue](https://github.com/Shopify/polaris/issues/129)) ([#472](https://github.com/Shopify/polaris-react/pull/472))
* Added extraTight spacing option to Stack ([#474](https://github.com/Shopify/polaris-react/pull/474))
* Use default subheading type styles for ActionList ([#479](https://github.com/Shopify/polaris-react/pull/479))
* Improved large Button styles ([#442](https://github.com/Shopify/polaris-react/pull/442))
* Updated font-weight for text emphasis (thanks  [bakura10](https://github.com/bakura10)  for the  [original issue](https://github.com/Shopify/polaris/issues/156)) ([#494](https://github.com/Shopify/polaris-react/pull/494/files))

### Bug fixes
* Removed the focus state for Banner on click ([#363](https://github.com/Shopify/polaris-react/pull/363))
* Fixed disabled Pagination button looking active
* Fixed alignment on Button
* Fixed min-width on TextField (thanks [Asa](https://github.com/asacarter)  for the [original issue](https://github.com/Shopify/polaris/issues/96)) ([#440](https://github.com/Shopify/polaris-react/pull/440))
* Removed the border-top on EmptyState (thanks [Alex](https://github.com/alexdover)  for the [original issue](https://github.com/Shopify/polaris/issues/102)  [#408](https://github.com/Shopify/polaris-react/pull/408))
* Fixed Select placeholder value warnings (thanks [cgenevier](https://github.com/cgenevier)  for the [original issue](https://github.com/Shopify/polaris/issues/98))
* Fixed disabled text on iOS ([#448](https://github.com/Shopify/polaris-react/pull/448))
* Fixed type for onChange event (thanks [Michaël](https://github.com/bakura10)  for the original issue ([#461](https://github.com/Shopify/polaris-react/pull/461))

### Sketch UIKit
* Added color palette page to “Getting started”
* Button typography updated. More changes to come soon.
* Changed typeface from `San Francisco UI` to `San Francisco Pro`. You will need to download the updated typeface here. https://developer.apple.com/fonts/
* Updated to Sketch version 45.2
* Updated layer styles and fonts styles to take advantage of Sketch’s new organizational features.

### Documentation
* Fixed disabled Button documentation (thanks [Michael](https://github.com/michaelsunglee)  for the [original issue](https://github.com/Shopify/polaris/issues/113)) ([#422](https://github.com/Shopify/polaris-react/pull/422))
* Fixed project URL in CircleCI badge ([#423](https://github.com/Shopify/polaris-react/pull/423))
* Fixed Stack documentation (thanks [Marco](https://github.com/nerfologist)  for the [original issue](https://github.com/Shopify/polaris/issues/120) ) ([#438](https://github.com/Shopify/polaris-react/pull/438))
* Added embedded Alert documentation and updated other embedded documentation ([#446](https://github.com/Shopify/polaris-react/pull/446/files))

### Dependency updates
* Updated React TypeScript definitions ([#452](https://github.com/Shopify/polaris-react/pull/452))

### Chores
* Updated EASDK metadata structure for generic interfaces ([#435](https://github.com/Shopify/polaris-react/pull/435))
* Removed postinstall hook ([#444](https://github.com/Shopify/polaris-react/pull/444))

## 1.1.1 - 2017-06-19
### Chores
* Fixed a repo issue that caused the public repo release not to happen

## 1.1.0 - 2017-06-19
### Enhancements
* Added automatic inference of the `target` property of EASDK buttons in `Page`’s `primaryAction` and `secondaryActions` based on their URL (thanks [Dmitriy](https://github.com/jimmyn) for the [original issue](https://github.com/Shopify/polaris/issues/46)) ([#310](https://github.com/Shopify/polaris-react/pull/310))
* Added automatic inference of the `target` property of EASDK breadcrumbs in `Page`'s `breadcrumbs` prop based on the URL ([#396](https://github.com/Shopify/polaris-react/pull/396))
* `Select` option descriptors now accept a `diabled` attribute to disabled the generated `option` (thanks to [Hafiz](https://github.com/sogko) for the [original issue](https://github.com/Shopify/polaris/issues/68)) ([#349](https://github.com/Shopify/polaris-react/pull/349))
* `easdk.showFlashNotice` now accepts an optional options object as its second parameter. Passing `{error: true}` will cause the flash to appear as an error, matching the behaviour of  [`ShopifyApp.flashError`](https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/methods#shopifyapp-flasherror-message) ([#392](https://github.com/Shopify/polaris-react/pull/392))
* `Checkbox`, `RadioButton`, `ChoiceList`, `Select`, and `TextField` now pass the ID of the changed input as the second argument to their `onChange` callback (thanks to [Miika](https://github.com/milep) for the [original issue](https://github.com/Shopify/polaris/issues/83)) ([#391](https://github.com/Shopify/polaris-react/pull/391))
* `Popover` now respects the `z-index` of the activator if it exists ([#347](https://github.com/Shopify/polaris-react/pull/347/files))
* When putting content as children of `Tabs`, the default panel that is generated now respects the `panelID` of the selected tab, and uses a sensible default based on the tab’s `id` if no `panelID` exists ([#347](https://github.com/Shopify/polaris-react/pull/347))
* When selecting a tab in `Tabs`, the matching panel is now focused by default ([#347](https://github.com/Shopify/polaris-react/pull/347))
* `easdk` methods are bound to the object so they can be freely passed as callbacks ([#392](https://github.com/Shopify/polaris-react/pull/392))

### Changes
* Avatar now renders as a `span` instead of a `div`  ([#398](https://github.com/Shopify/polaris-react/pull/398))

### Bug fixes
* Fixed contents in `Layout.AnnotatedSection` breaking out of their container (thanks [Andrew](https://github.com/cargix1) for the [original issue](https://github.com/Shopify/polaris/issues/75)) ([#365](https://github.com/Shopify/polaris-react/pull/365))
* Fixed spacing above a primary action in `CalloutCard` when there is no secondary action ([#364](https://github.com/Shopify/polaris-react/pull/364))
* Aria attributes are now on the actionable elements of `Tabs` instead of in the list items ([#347](https://github.com/Shopify/polaris-react/pull/347))
* Exposed `Panel` as `Tabs.Panel` instead of `Tabs.panel` ([#347](https://github.com/Shopify/polaris-react/pull/347))
* Fixed the alignment of `prefix` and `suffix` content of `TextField` (thanks [bdillon3](https://github.com/bdillon3) for the [original issue](https://github.com/Shopify/polaris/issues/60)) ([#372](https://github.com/Shopify/polaris-react/pull/372))
* Fixed the disabled text colour in `TextField` ([#372](https://github.com/Shopify/polaris-react/pull/372))
* `Checkbox`s and `RadioButton`s no longer generate invalid HTML in their labels (thanks [Ernesto](https://github.com/ernestogutierrez) for the [original issue](https://github.com/Shopify/polaris/issues/88)) ([#391](https://github.com/Shopify/polaris-react/pull/391))
* `Tabs` no longer steals focus from contained elements (thanks [Alex](https://github.com/alexdover) for the  [original issue](https://github.com/Shopify/polaris/issues/74)) ([#347](https://github.com/Shopify/polaris-react/pull/347))

### Design updates
* Reduced horizontal padding on `Breadcrumbs` ([#334](https://github.com/Shopify/polaris-react/pull/334))
* Updated icon and internal padding of `FooterHelp` ([#357](https://github.com/Shopify/polaris-react/pull/357))
* Updated the `EmptyState` layout and typographic styles ([#376](https://github.com/Shopify/polaris-react/pull/376))

### Documentation
* Fixed the code examples o n the embedded app documentation ([#375](https://github.com/Shopify/polaris-react/pull/375))
* Added a simple embedded app example ([#308](https://github.com/Shopify/polaris-react/pull/308/files))
* Renamed the “Tables and lists” category to “Lists”
* A variety of other documentation updates (thanks to [Pablo](https://github.com/sebnun), [Asa](https://github.com/asacarter), and [David](https://github.com/resistorsoftware) for raising issues)

### Dependency updates
* Updated all dependencies ([#352](https://github.com/Shopify/polaris-react/pull/352))

### Chores
* Added a script to automatically match the published version number to the one referenced in the README ([#353](https://github.com/Shopify/polaris-react/pull/353))
* Added the correct viewport tag to the Playground ([#358](https://github.com/Shopify/polaris-react/pull/358))
* Hid deprecation errors during tests ([#391](https://github.com/Shopify/polaris-react/pull/391))

## 1.0.3 - 2017-05-11
### Big fixes
* Fixed an issue where the embedded components would not reload the page within the Shopify admin (thanks [Rich](https://github.com/buggy) for the [original issue](https://github.com/Shopify/polaris/issues/28)) ([#307](https://github.com/Shopify/polaris-react/pull/307))
* Fixed the `spacing="none"` variation on `Stack` not working correctly, and added the missing `extraLarge` enum value for `spacing` ([#320](https://github.com/Shopify/polaris-react/pull/320))
* Fixed `Banner`’s `onDismiss` callback not being called when the dismiss button was clicked (thanks to [Taylor](https://github.com/tlwirtz) for the [original issue](https://github.com/Shopify/polaris/issues/52)) ([76ce13f](https://github.com/Shopify/polaris-react/commit/76ce13f328c2446c316f3d7f1f2a3f007658b6f7))

### Design updates
* Updated Badge text colors ([#319](https://github.com/Shopify/polaris-react/pull/319))
* Updated line height for the small `DisplayText` variation ([#318](https://github.com/Shopify/polaris-react/pull/318))
* Updated the default icon for error `Banner`s (thanks to [Michael](https://github.com/heyneff) for the [original issue](https://github.com/Shopify/polaris/issues/42)) ([#317](https://github.com/Shopify/polaris-react/pull/317))

### Sketch UIKit
* Added app examples (thanks to [lukepxu](https://github.com/lukepxu) for the [original issue](https://github.com/Shopify/polaris/issues/17))
* Removed references to the Graphik typeface (thanks to [Adam](https://github.com/adamnel) for the [original issue](https://github.com/Shopify/polaris/issues/22))
* Left-aligned button text for better resizing
* Added Messenger link to navigation to better communicate that the channel nav collapses after 3 items
* Fixed alignment of table headers
* Minor updates to Dataviz and Reports examples
* Added indicators to Home notifications

### Documentation
* Synchronized component documentation with the style guide ([1e89559](https://github.com/Shopify/polaris-react/commit/1e895594afedb63787e6c05a167f5146901e88e6))

### Chores
* Fixed an issue that prevented the public CHANGELOG from being generated correctly ([#292](https://github.com/Shopify/polaris-react/pull/292))
* Added a hot-reloading Playground to easily try out different components ([#315](https://github.com/Shopify/polaris-react/pull/315))
* Removed the references to Babel presets from `package.json` (thanks to [Massimo](https://github.com/macs91) for digging into this with us) ([#322](https://github.com/Shopify/polaris-react/pull/322))
* Removed the `@import` statements at the top of source Sass files ([#312](https://github.com/Shopify/polaris-react/pull/312))
* Updated TSLint and related linting dependencies ([#316](https://github.com/Shopify/polaris-react/pull/316))

## 1.0.2 - 2017-04-25
### Bug fixes
* Fixed an issue where subcomponents with variations would use a single `-` instead of `--` (thanks [johnsonab](https://github.com/johnsonab) for the [original issue](https://github.com/Shopify/polaris/issues/9)) ([#278](https://github.com/Shopify/polaris-react/pull/278))
* Fixed a missing typing dependency and a missing `embedded` types entry point that were causing issues using this package with TypeScript (thanks to [Rich](https://github.com/buggy) for the [original](https://github.com/Shopify/polaris/issues/19) [issues](https://github.com/Shopify/polaris/issues/20)) ([#286](https://github.com/Shopify/polaris-react/pull/286))
* Fixed an issue where the anchor tag for `ResourceList.Item`s would not span the full width of the item (thanks to [Steven](https://github.com/sdn90) for the [original issue](https://github.com/Shopify/polaris/issues/14)) ([0c11498](https://github.com/Shopify/polaris-react/commit/0c11498406d90850f569824d0979c9a8f84d45c9))

### Dependency updates
* Started using the [`prop-types` package](https://github.com/reactjs/prop-types) instead of getting `PropTypes` from `react`, as the latter is deprecated as of React 15.5.0 ([#282](https://github.com/Shopify/polaris-react/pull/282))

### Documentation
* Corrected the name of `documentation/Embeddded apps.md` to `documentation/Embedded apps.md` (thanks to [Chris](https://github.com/chrispappas) for the [original issue](https://github.com/Shopify/polaris/issues/10)) ([#269](https://github.com/Shopify/polaris-react/pull/269))
* Fixed the `ColorPicker` documentation to show valid values for `saturation`, `brightness`, and `alpha` (thanks to [Allan](https://github.com/allanarmstrong) for the [original issue](https://github.com/Shopify/polaris/issues/13)) ([#284](https://github.com/Shopify/polaris-react/pull/284))

### Chores
* Added a description to `package.json` ([#281](https://github.com/Shopify/polaris-react/pull/281))
* Added license to `package.json` and to the root of the repo (thanks to [Daniel](https://github.com/d2s) for the [original issue](https://github.com/Shopify/polaris/issues/15)) ([#283](https://github.com/Shopify/polaris-react/pull/283))
* Fixed an issue where the Webpack example would complain about a missing dependency (thanks to [Rafael](https://github.com/rafaedez) for the [original issue](https://github.com/Shopify/polaris/issues/21)) ([#279](https://github.com/Shopify/polaris-react/pull/279))

## 1.0.1 - 2017-04-20
### Chores
* Switch repo to public access

## 1.0.0 - 2017-04-20
* Initial release

[changelog-guidelines]: https://github.com/Shopify/polaris/blob/master/documentation/Versioning%20and%20changelog.md
