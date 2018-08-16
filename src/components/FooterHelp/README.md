---
name: Footer help
category: Navigation
keywords:
  - FooterHelp
  - learn more about
  - help documentation links
  - links to help documentation
  - link to help documentation
  - footer help boxes
  - educate about features
  - merchant education
  - educational opportunity
  - educating
  - teaching
---

# Footer help

Footer help is used to refer merchants to more information in the Shopify Help documentation that’s related to the product or feature they’re using.

---

## Best practices

Footer help should:

- Be positioned at the bottom of the interface
- Provide links to help that’s related to the experience on the screen
- Not be used to promote features or provide explanations for how something works
- Almost always provide a link to help documentation except in the rare case that a blog post or other type of content does a better job of walking the merchant through how to use the product or feature
- Never link to information designed to upsell the merchant

---

## Content guidelines

### Footer help

By default, footer help should link to information in the Shopify Help Center and should follow this content pattern:

- Learn more about {X}.

In the rare case that footer help links to a resource outside of the Shopify Help Center, it’s important to specify the destination by following this pattern:

- Learn more about {X} at the Shopify blog.

Links should be:

Clearly labeled: Merchants should not need to guess where they’ll end up if they click on an action link. Never use “click here” as a link because it doesn’t set expectations about what’s next.

<!-- usagelist -->

#### Do

- Learn more about [shipping zones].
- Learn more about [themes] on the Shopify blog.

#### Don’t

- Go to [docs] to learn about zones.
- Find out about [themes].

<!-- end -->

## Examples

### Footer help box

Use to direct merchants to more information related to the product or feature they’re working on.

```jsx
<FooterHelp>
  Learn more about{' '}
  <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
    fulfilling orders
  </Link>
  .
</FooterHelp>
```

---

## Related components

- To learn how to embed a link in a piece of text, [use the link component](/components/link)
- To learn how to write documentation for an app or theme, [use the the guide on how to write product documentation](/content/help-documentation)
