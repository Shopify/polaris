---
name: Description list
category: Lists and tables
platforms:
  - android
  - ios
  - web
keywords:
  - DescriptionList
  - glossary
  - description
  - list terms
  - list and define terms
  - item lists
  - text lists
  - list of terms
  - term explaination
  - android
  - ios
---

# Description list

Description lists are a way to organize and explain related information.
They’re particularly useful when you need to list and define terms such as in a
glossary.

---

## Best practices

Description lists should:

- Contain terms and associated explanations, or descriptions for each term.
- Provide information that isn’t action-oriented.
- Not be an excuse for using unnecessarily complicated or jargon-filled
  language. Generally, if merchants need a description list to understand the
  language in Shopify, we should look for opportunities to simplify the language.
- Not be used to upsell merchants on a feature or service.

---

## Content guidelines

### Terms

Terms should be:

- Written in sentence case (the first word capitalized, the rest lowercase)

<!-- usagelist -->

#### Do

- Discount code

#### Don’t

- Discount Code

<!-- end -->

### Term description

Terms descriptions should be:

- Directly related to the term they’re describing

<!-- usagelist -->

#### Do

- Discount code: A series of numbers and/or letters that an online shopper may enter at checkout
  to get a discount or special offer.

#### Don’t

- Discount code: Having a sale on your store is a great way to sell products quickly.

<!-- end -->

- Written to describe the merchant benefit or utility
- No more than one or two short sentences in length
- Written in sentence case with all appropriate punctuation, including ending
  each sentence with a period
- Conversational by using articles (the, a, an)
- Written using plain language

<!-- usagelist -->

#### Do

- Abandoned checkout: The details of a checkout that was started but not completed, including the
  products added and the customer’s details.

#### Don’t

- Abandoned checkout: Details of products added to checkout but not purchased

<!-- end -->

---

## Examples

### Default description list

Use when you need to present merchants with a list of items or terms alongside descriptions and explanations.

```jsx
<DescriptionList
  items={[
    {
      term: 'Logistics',
      description:
        'The management of products or other resources as they travel between a point of origin and a destination.',
    },
    {
      term: 'Sole proprietorship',
      description:
        'A business structure where a single individual both owns and runs the company.',
    },
    {
      term: 'Discount code',
      description:
        'A series of numbers and/or letters that an online shopper may enter at checkout to get a discount or special offer.',
    },
  ]}
/>
```

<!-- content-for: android -->

![Description list for Android](/public_images/components/DescriptionList/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Description list for iOS](/public_images/components/DescriptionList/ios/default@2x.png)

<!-- /content-for -->

---

## Related components

- To create a list of actions or navigation, [use the action list component](https://polaris.shopify.com/components/actions/action-list).

---

## Accessibility

<!-- content-for: android -->

See Material Design and development documentation about accessibility for Android:

- [Accessible design on Android](https://material.io/design/usability/accessibility.html)
- [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility/)

<!-- /content-for -->

<!-- content-for: ios -->

See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

- [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/accessibility/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

<!-- /content-for -->

<!-- content-for: web -->

The description list component produces a description list wrapper (`<dl>`), terms (`<dt>`), and definitions (`<dd>`) to convey the relationships between the list items to assistive technology users.

<!-- /content-for -->
