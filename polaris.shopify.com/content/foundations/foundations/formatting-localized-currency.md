---
title: Formatting localized currency
description: Currencies are formatted differently in different countries and languages.
keywords:
  - internationalization
  - localization
  - currency
  - currencies
  - money
  - euro
  - dollar
  - formatting
  - short format
  - explicit format
  - internationalizing
  - localizing
  - locale
  - overseas
  - international
  - global
  - japan
---

There’s a currency formatting framework to:

- Help more merchants sell globally
- Localize currency formatting for merchants and customers everywhere
- Unify the display of mixed currencies to help merchants manage multiple currency stores
- Implement the formatting through APIs

---

## Definitions

A store can have more than one type of currency and currency format.

### Store currency

The main currency of the store and the Shopify default. All sales and reports are shown in the store currency.

### Non-store currency

Any other type of currency is called “non-store currency”. Types of non-store currency include:

- Presentment currency: The type of currency that is presented to buyers in a merchant’s store. For multi-currency stores, it can be different from store currency.
- Payout currency: The type of currency used to pay merchants for their sales. For multi-currency stores, it can be different from store currency.
- Billing currency: The type of currency used to bill merchants for themes, app purchases, and monthly subscriptions. Billing currency is in USD only, but might include local currencies for tax purposes.

### Short format

Includes the currency symbol and currency value. This format is used for currency that merchants are familiar with.

Examples: \$12.50; 12,50 €

### Explicit format

Includes the currency symbol, currency value, and ISO code (for example, “USD” and “CAD”). Best used for currency that merchants aren’t familiar with and don’t expect to see.

Examples: \$12.50 CAD; 12,50 € EUR

---

## Aligning with global standards

Shopify uses [Common Locale Database Repository (CLDR)](http://cldr.unicode.org/) for localization formatting for currency, date, time, and amount.

- It’s the recognized international standard
- It automatically formats numbers and currency based on the merchant’s locale
- The repository is maintained by a third party

CLDR determines:

- Whether the currency symbol appears before or after the amount (for example, $250, 250 USD, 250 $)
- Whether decimals are used (for example, there are no “cents” in Japanese yen)
- Whether the decimal sign is a period or a comma (for example, 37,50 or 37.50)
- How to group numbers (for example, 10,000 or 1,0000, or using spaces)

CLDR doesn’t determine the appropriate level of detail shown in different contexts. For example, it can’t determine when to show the currency symbol and value ([short format](#short-format)), or the currency symbol, value, and ISO code ([explicit format](#explicit-format)).

Though short format is more efficient, it’s important to provide clarity for merchants who deal with unfamiliar currencies in multi-currency stores. In those cases, use explicit format.

---

## Design guidelines

Because CLDR formatting is limited, these guidelines will help you choose the appropriate level of currency detail to display in a multi-currency context.

### Merchants

#### Store currency

<!-- dodont -->

#### Do

Default to [short format](#short-format).

![Short format in today’s sales card](/images/foundations/foundations/internationalization/do-use-short-format@2x.png)

#### Don’t

Use [explicit format](#explicit-format) except when presenting store currency within in a mixed-currency context.

![Incorrect explicit format in today’s sales card](/images/foundations/foundations/internationalization/dont-use-explicit-format@2x.png)

<!-- end -->

#### Non-store currency

- Use explicit format when showing total amounts, an amount within a button, or in a paragraph
- Use short format when showing non-total amounts with total amounts

![](/images/foundations/foundations/internationalization/paid-status-explicit@2x.png)

This example shows a scenario where the presentment currency is in USD, which is different than the store currency. The non-total amounts in the paid status card are in short format, and the total amounts are in explicit format.

![](/images/foundations/foundations/internationalization/refund-non-store-currency@2x.png)

This example shows a scenario refunding an order that’s in a non-store currency.

![](/images/foundations/foundations/internationalization/short-format-non-total@2x.png)

This example illustrates the use of short format for non-total amounts and explicit format for total amounts in a data table.

#### Negative amount display

Always place the negative symbol before the currency and amount in either format.

<!-- dodont -->

#### Do

- \-\$4.20
- -12,50 €

#### Don’t

- \$-4.20
- 12,50 €-

<!-- end -->

### Customers

- Default to explicit format whenever prices are customer-facing. Use short format for unit prices, itemized prices, and installment prices.
- If there are enough indicators to let customers know which currency they’re looking at, short format may be sufficient. When using short format, make sure to always use explicit format for cart total, checkout total, and notification totals.

![](/images/foundations/foundations/internationalization/short-format-installment-prices@2x.png)

This example shows the use of short format for installment prices.

![](/images/foundations/foundations/internationalization/short-format-unit-prices@2x.png)

This example shows the use of short format for unit prices.

![](/images/foundations/foundations/internationalization/short-format-itemized-prices@2x.png)

This example shows the use of short format for itemized prices.

---

## Guiding questions when making design decisions

Use the following questions to guide you when making decisions about currency formatting.

**Does the merchant know which currency they’re looking at?**

- Which currency do they expect to see?
- Do they know which currency their orders are in if they have a multi-currency store?

**Does the currency format support the merchant’s main task?**

- Is the main task scanning, comparing and analyzing, or taking an action (for example, a refund)?

**Are there enough details to make an informed decision?**

- For example, do they know the currency of their non-store currency order refund?
- Can they distinguish between the sales report and payout summary if the store currency and payout currency are different?

**Can the UI be simplified without creating confusion?**

We don’t want to show [explicit format](#explicit-format) everywhere and for every task.

- How can we make currency formatting both simple and accurate?

---

## Design tips

Mock up a scenario where the store, presentment, payout, and billing currencies are different. This scenario is becoming more common as more merchants start selling globally.

### Use currencies that share the same symbol to test for clarity

USD, CAD, AUD, HKD, SGD are just a few of the many currencies that share the same symbol “\$”.

### Use Japanese Yen (JPY) amount to test currency length and space constraints

1 USD is approximately 100 JPY. If there is enough space for the JPY amount, it should work for most other major currencies.

### When in doubt, let the guiding questions help you make a decision

The guiding questions are meant to help make merchant-focused decisions about which format to use when the use case is unclear.

---

## Major currencies in their local formats

This table shows commonly-used currencies in short and explicit formats.

| Currency                        | Locale       | Short format | Explicit format |
| ------------------------------- | ------------ | ------------ | --------------- |
| **US Dollar ($, USD)**          | en-US        | $12.50       | $12.50 USD      |
| **Canadian Dollar ($, CAD)**    | en-CA        | $12.50       | $12.50 CAD      |
|                                 | fr-CA        | 12,50 $      | 12,50 $ CAD     |
| **Australian Dollar ($, AUD)**  | en-AU        | $12.50       | $12.50 AUD      |
| **Euro (€, EUR)**               | de-DE, fr-FR | 12,50 €      | 12,50 € EUR     |
|                                 | en-IE        | €12.50       | €12.50 EUR      |
|                                 | nl-NL        | €12,50       | €12,50 EUR      |
| **British Pounds (£, GBP)**     | en-GB        | £12.50       | £12.50 GBP      |
| **Japanese Yen (¥, JPY)**       | ja-JP        | ¥1250        | ¥1250 JPY       |
| **New Zealand Dollar ($, NZD)** | en-NZ        | $12.50       | $12.50 NZD      |
| **Hong Kong Dollar ($, HKD)**   | zh-HK        | $12.50       | $12.50 HKD      |
| **Singapore Dollar ($, SGD)**   | zh-SG        | $12.50       | $12.50 SGD      |
| **Danish Krone (Kr, DKK)**      | da-DK        | 12,50 kr.    | 12,50 kr. DKK   |

---

## Implementation

To format currency in a React component, use the [`Shopify/react-i18n`](https://github.com/Shopify/quilt/tree/master/packages/react-i18n) library’s `formatCurrency` method. You can select either `short` or `explicit` formatting by setting the `form` option as shown in the code example below.

```jsx
import { useI18n } from "@shopify/react-i18n";

const [i18n] = useI18n();

i18n.locale = "de-AT";

const eurDeAt = i18n.formatCurrency(price, {
  currency: "EUR",
  form: "short",
});

const eurDeAtExp = i18n.formatCurrency(price, {
  currency: "EUR",
  form: "explicit",
});
```
