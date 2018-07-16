<!--
  ☝️How to write a good PR title:
  - Prefix it with [ComponentName] (if applicable), for example: [Button]
  - Start with a verb, for example: Add, Delete, Improve, Fix…
  - Give as much context as necessary and as little as possible
  - Prefix it with [WIP] while it’s a work in progress
-->

### WHY are these changes introduced?

Resolves #0000 <!-- link to issue if one exists -->

<!--
  Context about the problem that’s being addressed.
-->

### WHAT is this pull request doing?

<!--
  Summary of the changes committed.
  Before / after screenshots appreciated for UI changes.
-->

## <!-- ℹ️ Delete the following for small / trivial changes -->

### How to 🎩

🖥 [Local development instructions](https://github.com/Shopify/polaris-react/blob/master/README.md#development)
🗒 [General tophatting guidelines](https://github.com/Shopify/polaris-react/blob/master/documentation/Tophatting.md)

<!--
  Give as much information as needed to experiment with the component
  in the playground.
-->

<details>
<summary>Copy-paste this code in <code>playground/Playground.tsx</code>:</summary>

```jsx
/* eslint-disable */

import * as React from 'react';
import {Page, AppProvider} from '@shopify/polaris';

interface State {}

export default class Playground extends React.Component<never, State> {
  render() {
    return (
      <AppProvider>
        <Page title="Playground" />
      </AppProvider>
    );
  }
}

/* eslint-enable */
```

</details>

### 🎩 checklist

* [ ] Tested on [mobile](https://github.com/Shopify/polaris-react/blob/master/documentation/Tophatting.md#cross-browser-testing)
* [ ] Tested on [multiple browsers](https://help.shopify.com/en/manual/intro-to-shopify/shopify-admin/supported-browsers)
* [ ] Tested for [accessibility](https://github.com/Shopify/polaris-react/blob/master/documentation/Accessibility.md#implementation-best-practices)
