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


<!-- ℹ️ Delete the following for small / trivial changes -->
---

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
// tslint:disable

import * as React from 'react';
import {Page} from '@shopify/polaris';

interface State {

}

export default class Playground extends React.Component<never, State> {
  render() {
    return (
      <Page title="Playground">
      </Page>
    );
  }
}

// tslint:enable
```
</details>

### 🎩 checklist

- [ ] Tested on mobile
- [ ] Tested on multiple browsers
- [ ] Tested for [accessibility](https://vault.shopify.com/Accessibility#implementation-best-practices)
- [ ] Updated [CHANGELOG.md](https://github.com/Shopify/polaris-react/blob/master/CHANGELOG.md)
