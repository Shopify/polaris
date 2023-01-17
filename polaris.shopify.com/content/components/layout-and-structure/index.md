---
title: Layout and structure
description: >-
  Layout is the arrangement of elements on a page. A good layout helps merchants understand and find information to complete their goals. Learn how to use Polaris layout primitives to build a wide range of layouts.
---

All layouts and spacing should be handled using layout primitives. This keeps our components simple, flexible and composable.

Polaris provides a set of flexible layout primitives: `Box`, `Card`, `Inline`, `Stack`, `Columns`, `Tiles`, and `Bleed`. When paired together, the primitives can be used to create a wide range of layouts that vary in complexity. Understanding these components is an essential part of building with Polaris.

<div class="components-grid">
  <div>
    <img src="/images/components/layout-and-structure/box.png" alt="" />
    <p>Box</p>
    <p>Use for custom layouts and containers.</p>
  </div>
  <div>
    <img src="/images/components/layout-and-structure/stack.png" alt="" />
    <p>Stack</p>
    <p>Use to display children vertically. Based on css flexbox.</p>
  </div>
  <div>
    <img src="/images/components/layout-and-structure/inline.png" alt="" />
    <p>Inline</p>
    <p>Use to display children horizontally in a row. Based on css flexbox.</p>
  </div>
  <div>
    <img src="/images/components/layout-and-structure/columns.png" alt="" />
    <p>Columns</p>
    <p>Use to layout content horizontally across a specified number of columns. Based on css grid.</p>
  </div>
  <div>
    <img src="/images/components/layout-and-structure/bleed.png" alt="" />
    <p>Bleed</p>
    <p>Use to apply negative margin to children to pull them into the surrounding layout.</p>
  </div>
</div>

<!-- tip -->

Layout primitives allow you to specify values for different screen sizes. Check out the layout primitives for information on how responsive props apply to each component.

<!-- end -->

#### Responsive design

The layout primitives allow you to specify values for different screen sizes.
For example, if you were using the `Columns` component, you may want to set a single column on `xs` and `sm` breakpoints and three columns at `md` and above.
Check out the layout primitives for information on how responsive props apply to each component.

### Layout compositions

Layout compositions are built with layout primitives. Use these components to build common layouts in the admin with the help of sensible defaults.

<div class="components-grid">
  <div>
    <img src="/images/components/layout-and-structure/card.png" alt="" />
    <p>Card</p>
    <p>Use to display items in a container with pre-defined styles applied.</p>
  </div>
  <div>
    <img src="/images/components/layout-and-structure/callout-card.png" alt="" />
    <p>Callout card</p>
    <p>Use to encourage merchants to take an action related to a new feature or opportunity.</p>
  </div>
  <div>
    <img src="/images/components/layout-and-structure/media-card.png" alt="" />
    <p>Media card</p>
    <p>Use to present visual information to merchants in a consistent way.</p>
  </div>
  <div>
    <img src="/images/components/layout-and-structure/empty-state.png" alt="" />
    <p>Empty state</p>
    <p>Use to provide guidance to merchants when a list, table, or chart has no items to show.</p>
  </div>
  <div>
    <img src="/images/components/layout-and-structure/page.png" alt="" />
    <p>Page</p>
    <p>Use to build the outer wrapper of a page, including the page title and associated actions.</p>
  </div>
</div>

### Resources

**Layout patterns** are designed with merchant goals in mind. If we understand what the merchant is trying to do, we can arrange content in a way that helps them do that. Are they comparing sets of data to learn about their store’s performance? Or editing the details of a product? Each experience may need a different layout.

<!-- TODO: Get link -->

[Learn about layout patterns ->]()

**Space** is the distance between objects in your design. It should be used to complement the purpose of a page, by creating hierarchy and helping the content become more useful and understandable.

<!-- TODO: Get link -->

[Learn about designing with space ->]()
