<!--
  ☝️How to write a good PR title:
  - Prefix it with [ComponentName] (if applicable), for example: [Button]
  - Start with a verb, for example: Add, Delete, Improve, Fix…
  - Give as much context as necessary and as little as possible
  - Prefix it with [WIP] while it’s a work in progress
-->

### WHY are these changes introduced?

Fixes #0000 <!-- link to issue if one exists -->

<!--
  Context about the problem that’s being addressed.
-->

### WHAT is this pull request doing?

<!--
  Summary of the changes committed.

  Before / after screenshots are appreciated for UI changes. Make sure to include alt text that describes the screenshot.

  If you include an animated gif showing your change, wrapping it in a details tag is recommended. Gifs usually autoplay, which can cause accessibility issues for people reviewing your PR:

    <details>
      <summary>Summary of your gif(s)</summary>
      <img src="..." alt="Description of what the gif shows">
    </details>
-->

## <!-- ℹ️ Delete the following for small / trivial changes -->

### How to 🎩

🖥 [Local development instructions](https://github.com/Shopify/polaris-react/blob/master/README.md#development)
🗒 [General tophatting guidelines](https://github.com/Shopify/polaris-react/blob/master/documentation/Tophatting.md)
📄 [Changelog guidelines](https://github.com/Shopify/polaris-react/blob/master/documentation/Versioning%20and%20changelog.md)

<!--
  Give as much information as needed to experiment with the component
  in the playground.
-->

<details>
<summary>Copy-paste this code in <code>playground/Playground.tsx</code>:</summary>

```jsx
import React from 'react';
import {Page} from '../src';

export function Playground() {
  return (
    <Page title="Playground">
      {/* Add the code you want to test in here */}
    </Page>
  );
}
```

</details>

### 🎩 checklist

- [ ] Tested on [mobile](https://github.com/Shopify/polaris-react/blob/master/documentation/Tophatting.md#cross-browser-testing)
- [ ] Tested on [multiple browsers](https://help.shopify.com/en/manual/intro-to-shopify/shopify-admin/supported-browsers)
- [ ] Tested for [accessibility](https://github.com/Shopify/polaris-react/blob/master/documentation/Accessibility%20testing.md)
- [ ] Updated the component's `README.md` with documentation changes
- [ ] [Tophatted documentation](https://github.com/Shopify/polaris-react/blob/master/documentation/Tophatting%20documentation.md) changes in the style guide
- [ ] For visual design changes, pinged one of @ HYPD, @ mirualves, @ sarahill, or @ ry5n to update the Polaris UI kit

<!--
  When tophatting, please check the UNRELEASED entry for consistency, as per the [guidelines](https://github.com/Shopify/polaris-react/blob/master/documentation/Versioning%20and%20changelog.md).
-->

<!--
  If you don't have access to Percy, please request access in the #polaris Slack channel.
-->
