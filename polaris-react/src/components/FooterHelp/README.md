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

Footer help is used to refer merchants to more information related to the product or feature they’re using.

---

## Best practices

Footer help should:

- Be positioned at the bottom of the interface
- Provide links to help that’s related to the experience on the screen
- Not be used to promote features or provide explanations for how something works
- Never link to information designed to upsell to merchants
- In rare cases, link to blog posts when there isn’t any help documentation to help merchants with the most logical next step in the workflow

It’s recommended to link your footer help component to [help documentation](https://polaris.shopify.com/content/help-documentation). Linking directly to your contact information might result in receiving a higher number of emails or calls.

---

## Content guidelines

### Footer help

By default, footer help should link to information in the Shopify Help Center and should follow this content pattern:

- Learn more about {X}

Links should be:

Clearly labeled: Merchants shouldn’t need to guess where they’ll end up if they click on an action link. Never use “click here” as a link because it doesn’t set expectations about what’s next.

Links should not be:

Marked as external: Do not set the `external` prop on the `Link` component to force open a new tab.

<!-- dodont -->

#### Do

- Learn more about [shipping zones]
- [Contact us] about email marketing

#### Don’t

- Go to [docs] to learn about zones.
- Find out about [themes].

<!-- end -->

---

## Examples

### Default

Use to direct merchants to more information related to the product or feature they’re working on.

```jsx
<FooterHelp>
  Learn more about{' '}
  <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
    fulfilling orders
  </Link>
</FooterHelp>
```

---

## Related components and documentation

- To learn how to embed a link in a piece of text, [use the link component](https://polaris.shopify.com/components/link)
- To learn how to provide support for an app, [use the guide on supporting your app](https://help.shopify.com/en/api/app-store/being-successful-in-the-app-store/supporting-your-app)
