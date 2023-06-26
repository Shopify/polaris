---
'@shopify/polaris': minor
---

Refactored SecondaryNavigation and changed how recursive nav items are rendered. New props were added to the
Item component to control the arrow indicators. The props `showVerticalLine`, `showVerticalHoverLine`, and
`showVerticalHoverPointer` are responsible for styling the items with the vertical lines for the selected and hover
states, and `onMouseEnter` and `onMouseLeave` are used to track user interactions and set the expected props.
