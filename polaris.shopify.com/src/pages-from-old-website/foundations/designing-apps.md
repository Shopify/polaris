---
name: Foundations/Crafting user interfaces/Designing apps for Shopify
slug: designing-apps
icon: IconDesigningApps
keywords:
  - apps
  - app communication
  - app design principles
  - app navigation
  - app permissions
  - embedded apps
  - ux principles
  - user experience principles
  - shopify apps
  - shopify approaches
  - shopify app design principles
  - shopify ux principles
  - shopify principles
  - merchant experience
  - merchant first
  - merchant-first
---

# Designing apps for Shopify

Polaris is designed to make it easy to build Shopify apps that merchants trust
and understand how to use right from the start.<br /><br />However, it takes
more than Polaris components to create successful features and flows. This guide
will help you design better Shopify apps.

---

## Decide when Polaris is right for your app

Shopify apps can either be embedded within the Shopify admin or operate outside
of it. There are ways to use Polaris for both types of apps.

Embedded apps exist in the Shopify admin as just another destination like orders
or products. Embedded apps:

- are encouraged to use Polaris to ensure a seamless merchant experience
- are presented alongside Shopify’s other main sections and resources
- open natively within the Shopify Mobile and POS apps
- have access to the [Shopify App Bridge](https://shopify.dev/tools/app-bridge) (formerly EASDK) through a set of [React components](https://shopify.dev/tools/app-bridge/react-components).

Apps don’t have to be embedded. Non-embedded apps exist as a separate website
from the admin.

---

## Create a consistent experience

To maintain a consistent experience, don’t combine Polaris with other user
interface (UI) styles or components with a different look and feel. This
includes the style you might use on your marketing website.

Don’t use Polaris on some pages of your app, but not on others.

<!-- usageblock -->

#### Do

Use Polaris components and styles to display a pricing page.

#### Don’t

Load the pricing page from your marketing site within an embedded app.

<!-- end -->

Don’t use illustrations from the Shopify admin.

<!-- usageblock -->

#### Do

Use provided empty state illustrations if needed.

#### Don’t

Copy Shopify’s illustration style for your own illustrations.

<!-- end -->

When building your own components:

- Avoid [bold or dark background colors](/design/colors#color-combinations).
  Polaris uses light text on a dark background only for calling attention to
  very important parts of the interface, such as primary buttons and the global
  top bar.
- Use icons only at the standard 20px size. This promotes consistency and avoids
  blurry icons.
- Follow the other [design guidelines](/design/typography) when building your
  own components.
- Use [familiar page layouts](/patterns-and-guides/layout).
- Use illustration sparingly. Learn more about
  [when to use illustration](/design/illustrations#section-when-to-use-illustration).

---

## Be clear about where your app starts and ends

Polaris apps create a seamless experience for merchants, but it’s important they
understand what part of their experience belongs to your app and what doesn’t.

Within the admin, always identify yourself as an app when communicating with
merchants. This is especially true when there might be uncertainty. For example,
a live chat experience should repeat the app or developer name. Support staff
responding to questions should mention the app name again.

<!-- usageblock -->

#### Do

Heading: “Chat with {developer name}”<br />Support person: “Hi, this is
{developer name}. How can we help?”

#### Don’t

Heading: “Live chat”<br />Support person: “Hi, how can we help?”

<!-- end -->

Be transparent when you‘re re-displaying content that originates in the Shopify
admin. For example, when displaying merchants’ products, clearly
distinguish it from the data needed to produce a product listing for your app.

---

## Make your stand-alone app visually distinct

Polaris can be used to build stand-alone apps for merchants, but it’s important
they know when they are using your app and when they are using Shopify.
We should never confuse merchants. This also helps your app establish its
own brand and helps merchants understand who to contact for support.

<!-- usageblock -->

#### Do

Use a top bar color with a color difference greater than 100 (calculated using
the [Euclidean distance](https://en.wikipedia.org/wiki/Color_difference#Euclidean))
from the Shopify admin top bar.

#### Don’t

Use a top bar color similar to the Shopify admin top bar.

<!-- end -->

<!-- usageblock -->

#### Do

Use your own logo.

#### Don’t

Use the Shopify logo.

<!-- end -->

<!-- usageblock -->

#### Do

Clearly show your app’s name in your main navigation.

#### Don’t

Have similar navigation to Shopify admin.

<!-- end -->

<!-- usageblock -->

#### Do

Provide top-level navigation which returns the merchant to their Shopify admin.

#### Don’t

Omit a return link to the merchant’s Shopify admin.

<!-- end -->

---

## Keep your experience focused on merchants’ businesses

Don’t promote your other apps within merchants’ workflows, which distracts from
their focus. Instead clearly identify sections where merchants can learn about
other apps you offer that could help them.

<!-- usageblock -->

#### Do

Keep any upsell or promotional content separate from the main merchant tasks or
areas.

#### Don’t

Use title bar action buttons to link to your other apps or promotional
materials.

<!-- end -->

---

## Only ask for the permissions you need

It can be tempting to ask for permission to access merchant information you’ll
eventually need for unreleased features. However, doing so will likely reduce
merchants’ trust in your product. It also makes you responsible for the
management, storage, and eventual deletion of more merchant data. Therefore,
only ask for what your app needs to accomplish its current tasks.

<!-- usageblock -->

#### Do

Request the minimum amount of data needed to give value to merchants.

#### Don’t

Request access to information your app doesn’t need. Be especially conservative
about personally identifiable information such as customer names and emails.

<!-- end -->

---

## Clearly define your navigation

When structuring your app’s navigation, build around merchant needs and their
mental models.

Menu items should:

- represent what your app does with the fewest possible categories
- each be short and scannable
- use nouns

<!-- usageblock -->

#### Do

Orders

#### Don’t

Fulfill your orders

<!-- end -->

---

## Make it work on mobile

More and more merchants use Shopify on their phones. Many are signing up as new
merchants on a mobile device, which means the first time they experience your
app might be on a smartphone.

Even if they primarily use a computer, merchants tend to use Shopify on their
phones during evenings and weekends. Merchants’ businesses are always on,
full-time, and your app needs to deliver a great experience on every device.

Using Polaris components ensures that your app supports multiple screen sizes.
You should build any custom components to work the same way. Be especially
cautious with full-width tables, pages that display a lot of text or data, and
placement of buttons. Test your app on at least one iOS device and one Android
device during development.

<!-- usageblock -->

#### Do

Group related row items and allow large tables to scale or scroll.

#### Don’t

Cut off information using fixed-width tables without giving merchants some
indication to scroll.

<!-- end -->

---

## Don’t forget about the words

Words can make or break the user experience of an app. Polaris has practical
guidelines that take the guesswork out of communicating with merchants. Check
out the [product content overview](/content/product-content), including sections
on:

- [Grammar and mechanics](/content/grammar-and-mechanics), with instructions on
  how to write button labels, headings, dates and times, and more.
- [Vocabulary](/content/vocabulary), including terms like “fulfillment” and
  “channel” and the difference between “log in” and “login.”
- Content guidelines within many of the individual
  [component pages](/components/get-started). These give you specific
  instructions on how to structure and format your content for that component,
  along with advice on terminology to use.
- [Help documentation guidelines](/content/help-documentation) to assist you
  with writing documentation that helps merchants understand your app.
