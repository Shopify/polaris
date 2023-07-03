---
'@shopify/polaris': patch
---

- [Choice][checkbox][RadioButton] Use CSS-native `:hover` styling

  By using CSS-native hover styling, and pulling it up to the wrapping `<label>`
  it avoids an issue where the browser would briefly detect hover with the
  :hover pseudo selector setting `cursor: pointer`, but then get overwritten
  with the JS onMouseOver styles 100ms later to `cursor: default`, resulting in
  a flash of a pointy-hand for the cursor on disabled Checkbox.
