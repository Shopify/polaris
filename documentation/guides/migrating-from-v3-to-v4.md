# Migrating from v3 to v4

Polaris v4.0.0 ([full release notes](https://github.com/Shopify/polaris/releases/tag/v4.0.0)) removes most features deprecated in v3.x.x releases. This file describes all code updates required to stay up to date.

## Table of contents

- [Testing](#polaris-testing)
- [Component API Changes](#polaris-component-api-changes)
  - [AppProvider](#polaris-appprovider)
  - [Autocomplete](#polaris-autocomplete)
  - [Card](#polaris-card)
  - [ChoiceList](#polaris-choicelist)
  - [Icon](#polaris-icon)
  - [Modal](#polaris-modal)
  - [Navigation](#polaris-navigation)
  - [Select](#polaris-select)
  - [Tabs](#polaris-tabs)
- [Removed Exports](#polaris-removed-exports)
  - [WithContext](#polaris-withcontext)
  - [WithRef](#polaris-withref)
  - [LinkLikeComponent](#polaris-linklikecomponent)
- [Dependencies](#polaris-dependencies)
- [TypeScript](#polaris-typescript)
- [CDN Usage](#polaris-cdn)

## Testing <a name="polaris-testing"></a>

Polaris React was migrated to [React’s new context API](https://reactjs.org/docs/context.html) while restructuring its entire context structure. Polaris React now exposes all internal contexts required for testing within a single `PolarisTestProvider` component.

**Note:** These examples use [Enzyme](https://airbnb.io/enzyme/). Other testing libraries can also be used.

In v3, you could hook into Polaris React’s legacy contexts using `createPolarisContext` and `polarisContextTypes`.

```jsx
// old
import {mount} from 'enzyme';
import {createPolarisContext, polarisContextTypes} from '@shopify/polaris';

export function mountWithAppProvider(node) {
  return mount(node, {
    context: createPolarisContext(),
    childContextTypes: polarisContextTypes,
  });
}
```

In v4, wrap your code in the `PolarisTestProvider` which
will provide all required contexts.

```jsx
// new
import {mount} from 'enzyme';
import {PolarisTestProvider} from '@shopify/polaris';
import translations from '../../locales/en.json';

export function mountWithPolaris(node, context = {}) {
  return mount(node, {
    wrappingComponent: PolarisTestProvider,
    wrappingComponentProps: {i18n: translations, ...context},
  });
}
```

## Component API changes <a name="polaris-component-api-changes"></a>

### AppProvider <a name="polaris-appprovider"></a>

Polaris now supports multiple languages and ships with [many translations](https://github.com/Shopify/polaris/blob/main/polaris-react/locales) to support internationalization. The `i18n` prop is now required to specify the translations you wish to use.

```jsx
// old
<AppProvider />

// new
import translations from '@shopify/polaris/locales/en.json';
<AppProvider i18n={translations}>
```

If you use [`@shopify/react-i18n`](https://github.com/Shopify/quilt/tree/main/packages/react-i18n) and want to dynamically load translations based on a provided locale, see the [AppProvider README](https://github.com/Shopify/polaris/blob/main/polaris-react/src/components/AppProvider/README.md#using-translations) for more information.

### Autocomplete <a name="polaris-autocomplete"></a>

The `Autocomplete.ComboBox.TextField` and `Autocomplete.ComboBox.OptionList` subcomponents have been removed. Use `Autocomplete.TextField` and `OptionList` instead.

```jsx
// old
<Autocomplete.ComboBox.TextField label="Example" />
<Autocomplete.ComboBox.OptionList onChange={() => {}} selected={[]} />

// new
<Autocomplete.TextField label="Example" />
<OptionList onChange={() => {}} selected={[]} />
```

### Card <a name="polaris-card"></a>

The `secondaryFooterAction` prop has been removed. Pass an array of actions into `secondaryFooterActions` instead.

```jsx
// old
<Card secondaryFooterAction={{content: 'Dismiss'}}>Polaris</Card>

// new
<Card secondaryFooterActions={[{content: 'Dismiss'}]}>Polaris</Card>
```

### ChoiceList <a name="polaris-choicelist"></a>

The `title` prop is now required. If you want the title to be visually hidden, set a `title` for screen-readers and set `titleHidden` to hide it from view.

```jsx
// old
<ChoiceList
  choices={[
    {label: 'Choice One', value: 'one'},
    {label: 'Choice Two', value: 'two'},
  ]}
  selected={['one']}
/>


// new
<ChoiceList
  title={'Meaningful title'}
  titleHidden
  choices={[
    {label: 'Choice One', value: 'one'},
    {label: 'Choice Two', value: 'two'},
  ]}
  selected={['one']}
/>
```

### Icon <a name="polaris-icon"></a>

The `source` prop no longer accepts a string that refers to a bundled icon name. Pass in a React component, such as the icons from `@shopify/polaris-icons` or icons processed through [SVGR](https://www.smooth-code.com/open-source/svgr/), into the `source` prop instead.

Applications using sewing-kit must update to at least version v0.82.0 if they wish to load icon files from their own codebase (which uses SVGR under-the-hood to import SVG files as React components).

```jsx
// old
<Icon source="add" />;

// new
import {PlusMinor} from '@shopify/polaris-icons';

<Icon source={PlusMinor} />;
```

The `untrusted` prop has been removed. Passing a string into the `source` prop now automatically implies an untrusted icon.

```jsx
// old
<Icon
  untrusted
  source="<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0' /></svg>"
/>;

// new
<Icon source="<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0' /></svg>" />;
```

### Modal <a name="polaris-modal"></a>

The `Modal.Dialog` subcomponent has been removed. This was an undocumented subcomponent for private usage only that was never intended to be public.

### Navigation <a name="polaris-navigation"></a>

The `Navigation.UserMenu` subcomponent has been removed. Pass a `TopBar.UserMenu` into `TopBar`’s `userMenu` prop instead.

The `iconBody` prop has been removed from the `Navigation.Item` subcomponent. Pass a string or React Component into the `icon` prop instead.

```jsx
// old
<Navigation.Section
  items={[
    {
      url: '/path/to/place',
      label: 'Item',
      iconBody:
        "<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0' /></svg>",
    },
  ]}
/>;

// new
<Navigation.Section
  items={[
    {
      url: '/path/to/place',
      label: 'Item',
      icon: "<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0' /></svg>",
    },
  ]}
/>;
```

### Select <a name="polaris-select"></a>

The `groups` prop has been removed. Pass an array of groups into the `options` prop instead, which can now accept an array of groups or options.

```jsx
// old
<Select
  groups={[
    {
      title: 'Group',
      options: [
        {label: 'Today', value: 'today'},
        {label: 'Yesterday', value: 'yesterday'},
        {label: 'Last 7 days', value: 'lastWeek'},
      ],
    },
  ]}
/>;

// new
<Select
  options={[
    {
      title: 'Group',
      options: [
        {label: 'Today', value: 'today'},
        {label: 'Yesterday', value: 'yesterday'},
        {label: 'Last 7 days', value: 'lastWeek'},
      ],
    },
  ]}
/>;
```

### Tabs <a name="polaris-tabs"></a>

The `Tabs.Panel` subcomponent has been removed. This was an undocumented subcomponent for private usage only that was never intended to be public.

## Removed Exports <a name="polaris-removed-exports"></a>

### WithContext <a name="polaris-withcontext"></a>

The `WithContext` component has been removed. It was used as a utility to handle [legacy contexts](https://reactjs.org/docs/legacy-context.html) in class based components and multiple contexts at once. Use [modern contexts](https://reactjs.org/docs/context.html#api) and access them using providers, hooks, or `Class.contextType` instead.

```jsx
// old
function Test({context}) {
  console.log(context);
  return null;
}

const TestWithContext = withContext(Consumer)(Test);

// new with hooks
const TestContext1 = React.createContext('Polaris');

function Test() {
  const testContext = React.useContext(TestContext1);
  return <h1>{testContext}</h1>;
}

// new with contextType
const TestContext2 = React.createContext('Polaris');

class Test extends React.Component {
  static contextType = TestContext2;

  render() {
    return <h1>{this.context}</h1>;
  }
}
```

### WithRef <a name="polaris-withref"></a>

The `WithRef` component has been removed. It was used as a utility to place refs on components wrapped in higher-order components. Use functional components instead.

### LinkLikeComponent <a name="polaris-linklikecomponent"></a>

The `LinkLikeComponent` type that describes argument you pass into `AppProvider`’s `link` prop has been removed. Use `AppProviderProps['linkComponent']` instead.

```jsx
// old
import {LinkLikeComponent} from '@shopify/polaris-react';

type Link = LinkLikeComponent;

// new
import {AppProviderProps} from '@shopify/polaris-react';

type Link = AppProviderProps['linkComponent'];
```

## Dependencies <a name="polaris-dependencies"></a>

The peer dependencies on `react` and `react-dom` have been increased to 16.8.6 to allow us to use hooks internally. Use `yarn` or `npm` to install a recent version of React.

```bash
# pnpm
pnpm add react react-dom

# npm
npm install react react-dom
```

## TypeScript <a name="polaris-typescript"></a>

Polaris now uses default imports for React. Because of this, consuming applications that use TypeScript must set the [esModuleInterop](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#support-for-import-d-from-cjs-from-commonjs-modules-with---esmoduleinterop) compiler option to `true` in their `tsconfig.json`. The TypeScript team recommends enabling this option for all new projects.

```js
// tsconfig.json
{
  "compilerOptions": {
    "esModuleInterop": true,
  }
}
```

## CDN Usage <a name="polaris-cdn"></a>

Polaris now uses [`unpkg.com`](https://unpkg.com) for hosting its static styles for CSS-only usage instead of using `sdks.shopifycdn.com`. Update any stylesheet imports to use the new URL.

```html
<!-- old -->
<link
  rel="stylesheet"
  href="https://sdks.shopifycdn.com/polaris/3.21.1/polaris.min.css"
/>

<!-- new -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@shopify/polaris@4.0.0/styles.min.css"
/>
```
