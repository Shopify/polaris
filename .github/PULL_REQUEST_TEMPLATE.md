<!--
  ☝️How to write a good PR title:
  - Prefix it with [ComponentName] (if applicable), for example: [Button]
  - Start with a verb, for example: Add, Delete, Improve, Fix…
  - Give as much context as necessary and as little as possible
  - Prefix it with [WIP] while it’s a work in progress
-->

### WHY are these changes introduced?

<!--
  Context about the problem that’s being addressed.
  OR: if a GitHub issue exists, link to it below.
-->

### WHAT is this pull request doing?

<!--
  Summary of the changes committed.
  Before / after screenshots appreciated for UI changes.
-->

## <!-- ℹ️ Delete the following for small / trivial changes -->

### How to 🎩

🖥 [Local development instructions](https://github.com/Shopify/polaris-react/blob/master/README.md#development)
🗒 [General tophatting guidelines](https://vault.shopify.com/developers/Tophatting)

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

* [ ] Tested on mobile
* [ ] Tested on multiple browsers
* [ ] Tested for [accessibility](https://vault.shopify.com/Accessibility#implementation-best-practices)
* [ ] Updated [CHANGELOG.md](https://github.com/Shopify/polaris-react/blob/master/CHANGELOG.md)

<!--
A note about Percy: if you are submitting a PR from another team and don't have access to Percy, a Polaris team member will tophat Percy as part of your PR review.
-->
