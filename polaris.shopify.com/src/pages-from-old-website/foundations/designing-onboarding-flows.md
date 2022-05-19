---
name: Foundations/Crafting user interfaces/Designing onboarding flows
slug: designing-onboarding-flows
icon: IconOnboarding
keywords:
  - adoption
  - funnel
  - benefit
  - sequence
  - sequencing
  - tooltips
  - trust
  - onboarding education
  - education
  - offboarding
---

# Designing onboarding flows

Well-designed onboarding flows increase engagement with a product or feature. They’re efficient and they gradually
introduce merchants to tasks that have a clearly defined goal and benefit.

This guide will help you create better onboarding flows.

---

## Make a good first impression

<!-- keywords: vision trouble, visual impairments, color blind, hearing trouble, physical disabilities, physical functioning difficulty, cognitive disabilities, people with disabilities, persons with disabilities, limited vision, loss of vision, low vision, disability, disabilities, diverse, diversity, inclusivity, inclusive experiences, deaf, deafness, blind, blindness, dexterity, mobility, cognitive, learning disability, learning disabilities, speech -->

Making a good first impression means:

- delivering on the promises of your motivational prompts and value propositions
- following through on what the [empty state](/components/structure/empty-state) says the product or feature will do
- getting out of the way as soon as possible

![HolidayMail listing in the Shopify App Store](/public_images/onboarding-page/app-store-listing@2x.png)
_(HolidayMail is a fictional app created for these guidelines.)_

---

## Create an efficient sequence

Sequence tasks in a logical way to increase onboarding success.
Clearly define when merchants have started and successfully completed your onboarding flow.

Aim to onboard merchants in as few steps as possible. Start by writing out a list of all the steps and define
success for each task. If appropriate, treat onboarding as a story or journey, with a:

- beginning (merchants discover the product or feature)
- middle (merchants learn about and complete tasks in the flow)
- end (merchants are able to use the product or feature successfully)

For the HolidayMail app, we wrote out the steps for the app setup portion of onboarding.
At this stage of their journey, merchants need to connect their email account and import
existing customer lists and billing information.

Success in this setup flow occurs when merchants:

- connect their email account
- import their customer list and code snippet
- enter their billing information

### Combine or eliminate steps when possible

Once you’ve mapped out the different paths in an onboarding flow, find ways to combine or eliminate steps or tasks
across the flow.

When combining or eliminating steps, ask yourself: will this step help merchants be more successful right now?
If so, it’s okay to include it. Remember that onboarding is also about teaching foundational knowledge.

Find out if any tasks can be automated. For example, form fields can be auto-filled so merchants don’t have to
manually enter existing information. Reducing the friction of onboarding through automation will increase the chances that merchants
complete a longer flow.

For the HolidayMail app, we listed the automated, partially automated, and fully manual paths.

#### Automated path (2 steps):

1. Merchant connects existing email account with HolidayMail
2. HolidayMail automatically detects and imports existing billing account, customer list, and code snippet

#### Partially automated path (4 steps):

1. Merchant connects existing email account
2. HolidayMail automatically inserts code snippet and imports existing billing account
3. Merchant uploads customer list manually
4. HolidayMail sends test email to confirm customer list import

#### Manual onboarding path (7 steps):

1. Merchant creates new email account to use with HolidayMail
2. Merchant connects email account to HolidayMail
3. Merchant manually inserts code snippet
4. Merchant sets up new billing account with HolidayMail
5. Merchant uploads customer list manually
6. Merchant fixes errors in email customer list
7. HolidayMail sends test email to confirm customer list import

### Be clear about external tasks

Timing is more difficult to control if merchants need to leave Shopify to complete an onboarding flow. For example,
in the HolidayMail app, merchants might have to leave the app to retrieve their customer list file.

Make it clear to merchants when they’re leaving Shopify. Provide clear instructions and encourage merchants to
return as soon as possible to minimize drop-off. Consider reinforcing or repeating key messages when merchants
return to the flow, especially when onboarding is unlikely to be completed in one continuous session.

---

## Onboarding is a trust exercise

Merchants’ time is valuable. They’re choosing to invest their time into something unknown. Make merchants feel
supported during their onboarding journey so they feel guided and confident.

### Build trust by being transparent

Explain why we’re collecting personal information.

![HolidayMail address form explaining it will be used as a billing address](/public_images/onboarding-page/address-form@2x.png)

<a name="build-trust"></a>

### Build trust by communicating value

Focus on the core benefit of the product or feature throughout the flow. Don’t overwhelm merchants with information that isn’t relevant to their immediate task. Provide encouragement across the entire flow by restating or focusing on the benefits that onboarding will unlock.

In this example from HolidayMail app onboarding, key messages are restated clearly and simplified during every step of the flow.

Start by introducing the information in more detail but avoid overwhelming merchants:

<!-- usagelist -->

#### Do

“Send emails throughout the year to customers who celebrate different holidays with the HolidayMail app.”

#### Don’t

“Use the HolidayMail app to reach customers who celebrate different holidays throughout the year, no matter where they live around the world.”

<!-- end -->

Offer a short, gentle reminder:

<!-- usagelist -->

#### Do

“Reach a more diverse customer base with automated HolidayMail campaigns.”

#### Don’t

“HolidayMail campaigns make it easier to reach customers who celebrate different holidays around the world.”

<!-- end -->

Provide a concise, final reinforcement of the core benefit:

<!-- usagelist -->

#### Do

“Promote your products to every corner of the globe with HolidayMail.”

#### Don’t

“Use the HolidayMail app to find new holidays so you can promote your products to customers around the world.”

<!-- end -->

### Maintain trust through contextual education

Merchants are in beginner mode when presented with a new experience. Onboarding flows should support first-hand
learning and provide lessons in-context. Aim for a gradual build of knowledge and skills. Be as approachable as possible to inspire confidence and prevent merchants from giving up.

Educational content should:

- inform, but not overwhelm.
- incorporate feedback at every step, whether successful or not, so merchants know the effect of their actions.
- use [plain language](https://polaris.shopify.com/content/product-content#section-write-for-a-grade-7-reading-level).
- use consistent terms about the core benefit across the flow. Clarify confusing or unfamiliar terms with [tooltips](#tooltips).
- always offer a next step. Use step terminology such as “next, first, then.”
- explain why new tasks need to be completed.
- [reinforce and repeat key concepts](#build-trust). Start with detailed explanations and steadily simplify for subsequent steps in the flow.

When guiding a merchant through an onboarding flow, always offer a next step.

![HolidayMail offering options to connect existing account or create new account](/public_images/onboarding-page/offer-next-step@2x.png)

Explain why new tasks need to be completed.

<!-- usagelist -->

#### Do

- By connecting your email account with HolidayMail, your customer lists will be automatically imported,
  and you’ll be able to launch campaigns right from the app.
- HolidayMail will import your customer lists automatically.

#### Don’t

Don’t offer a call to action without explaining what will happen.

- Connect account

<!-- end -->

<a name="tooltips"></a>

### Use tooltips for definitions

Use tooltips to educate merchants about new, technical, or industry-specific terminology that they wouldn't
have come across before interacting with the product or feature. Pro tip: At Shopify, we don’t default to using
industry-specific terminology if the term isn’t globally understood and a more plain language option is available.

<!-- usagelist -->

#### Do

![Tooltip that defines the term code snippet](/public_images/onboarding-page/tooltip@2x.png)

#### Don’t

Don’t use tooltips for:

- merchant actions
- instructional content
- detailed explanations
- explanation for personal information requirements

<!-- end -->

---

## Plan for final impressions

Some products or features (especially apps) get deprecated or sunsetted by developers. Merchants might also decide
to uninstall an app or stop using a product of feature. Create a positive final impression by building off-boarding
into your experience.

![Remove app modal with options to remove or pause subscription](/public_images/onboarding-page/remove-app@2x.png)

Good offboarding experiences:

- put the cancel subscription call to action in a logical, easy to find location, like on an account or billing page
- clearly confirm cancelation
- give alternatives to canceling, like the option to downgrade a plan or pause the subscription
- let merchants know what information they might lose if they cancel or downgrade
- make feedback requests quick and frictionless (only request feedback if relevant)
