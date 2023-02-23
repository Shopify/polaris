---
title: Error messages
description: Error messages can be scary. Make errors visible to merchants, easy to understand, and helpful.
icon: DiamondAlertMajor
keywords:
  - error states
  - invalid
  - 500
  - 400
  - 404
  - error pages
---

Error messages should:

- Tell merchants what happened. If there’s a solution, explain it. If possible, offer a one-click fix with a button. If there’s
  [no solution](#errors-without-solutions), give troubleshooting instructions.
- Be placed close to the source of the problem.
- Communicate severity using the appropriate [color](#colors) and
  [tone of voice](#voice-and-tone).
- Use
  [plain language](/content/product-content#respond-to-merchant-needs).
- Be specific. For example, use precise
  [numbers and dates](/content/grammar-and-mechanics#dates--numbers--and-measurements).
- Be brief.

Good design can reduce the need for error messages by preventing them in the first place.

---

## Error message types

Think about the scope of the error when selecting a message type. Is something wrong with the entire application, with the entire current screen, or with a specific element on the screen?

If the cause of the error is visible and the error just happened, show the error message immediately and as close to the source of the problem as possible.

### [Text field validation error](#form-validation)

Use when:

- An error applies to a text field and feedback can be provided while merchants are typing

![Text field validation](/images/foundations/patterns/error-messages/text-field-validation-error@2x.png)

### [Settings warning](#settings-warning)

Use when:

- The form input is valid, but you want to warn merchants of a consequence they might not expect

![Settings warning error](/images/foundations/patterns/error-messages/settings-warning@2x.png)

### [Page-level banner: critical or warning](#page-level-banners)

Use when:

- An error applies to the entire page
- The error is far down the page and it’s critical merchants see the message
- Multiple validation errors on the page need to be summarized
- The error was delayed and it’s okay to inform merchants of the problem when they return to the page

![Yellow page level banner](/images/foundations/patterns/error-messages/page-level-warning-banner@2x.png)

![Red page level banner](/images/foundations/patterns/error-messages/page-level-critical-banner@2x.png)

### [Banner in a card or modal: critical or warning](#banners-in-cards-modals)

Use when:

- An error applies to a single card within the page, a single section within a card, or a modal
- You need to direct merchants to a page with multiple sections and you want to visually call out the section with the error

![Yellow section level banner](/images/foundations/patterns/error-messages/section-level-warning@2x.png)
![Yellow field level banner](/images/foundations/patterns/error-messages/field-level-warning-02@2x.png)

### [Exception list: critical or warning](#exception-list-errors)

Use when:

- A message placed within or next to a component can help merchants make better decisions about routine tasks

![Warning exception list error](/images/foundations/patterns/error-messages/exception-list-warning@2x.png)

![Critical exception list error](/images/foundations/patterns/error-messages/high-risk-fraud@2x.png)

### [Home notification: critical or warning](#home-notifications)

Note: Home notifications should rarely be used for errors. Always attempt to display an error close to the source of the problem.

Use when:

- A high-priority task must be completed immediately to continue using Shopify or avoid losing money
- A feature doesn’t have a dedicated details page

![Yellow home notification](/images/foundations/patterns/error-messages/home-notification-warning@2x.png)

![Red home notification](/images/foundations/patterns/error-messages/home-notification-critical@2x.png)

### [Admin unavailable](#admin-unavailable-errors)

Use when:

- A server error is preventing an entire page from being displayed, like with 400 or 500-series server errors
- Account permissions are preventing someone from accessing Shopify

![Admin page not found error](/images/foundations/patterns/error-messages/page-not-found@2x.png)

![Admin page load error](/images/foundations/patterns/error-messages/admin-error@2x.png)

---

## Error colors

Red is the scariest error color. Only use red for critical messages that merchants need to deal with immediately to avoid harm to their business. For example, if merchants don’t act on the message right away, they might lose money or their store might be suspended.

Yellow error messages still demand attention, but are more appropriate for messages that are part of a daily workflow.

### Red (critical)

Use critical messages to:

- Bring attention to urgent tasks. If not dealt with immediately, merchants' businesses will be noticeably impacted, like an account being suspended or money being lost.

Examples of critical message types:

- Update a payment method expiry date
- Unsuspend an account
- Review an order for fraud
- Fix a problem that’s preventing payment from being processed

<!-- dodont -->

#### Do

![Red banner with high fraud risk message](/images/foundations/patterns/error-messages/red-banner@2x.png)

#### Don’t

![Yellow banner with high fraud risk message](/images/foundations/patterns/error-messages/yellow-banner@2x.png)

<!-- end -->

The one exception to using red is in form validation errors because this is a standard convention merchants are used to seeing outside of Shopify.

<!-- dodont -->

#### Do

![Form validation with red banner](/images/foundations/patterns/error-messages/validation-banner-red@2x.png)

#### Don’t

![Form validation with yellow banner](/images/foundations/patterns/error-messages/validation-banner-yellow@2x.png)

<!-- end -->

### Yellow (warning)

Use warning messages to:

- Help merchants fix issues so they can complete a common workflow or continue to the next step
- Notify merchants about upcoming expirations or pending requests that, if not dealt with soon, could lead to problems in the future

Examples of warning message types:

- Fix a problem before proceeding to the next step.
- Fix a problem at some point in a common workflow.
- There’s a pending request.
- There’s an upcoming expiration.
- Changing a setting might have unintended consequences. See
  [settings warning](#settings-warning).

<!-- dodont -->

#### Do

![Yellow banner with warning message](/images/foundations/patterns/error-messages/yellow-do@2x.png)

#### Don’t

![Red banner with warning message](/images/foundations/patterns/error-messages/yellow-dont@2x.png)

<!-- end -->

---

## Anti-patterns

### Avoid using toast for error messages

Although error toast is still available, we discourage its use. Toast messages are too short to adequately explain what went wrong and how to fix the problem. Because the toast component appears at the bottom of the screen and disappears after 3 seconds, it can easily be missed. Reserve toast for errors not caused by merchants, like a connection issue. Always try to use a banner to inform merchants about persistent errors.

<!-- dodont -->

#### Don’t

![Toast error message](/images/foundations/patterns/error-messages/dont-toast-error@2x.png)

### Don’t use modals for errors

Modal dialogs are a good way to ask merchants to confirm a destructive action, but not to tell them an error has occurred.
Modals block merchants until a decision is made, which is likely to make merchants feel pressured. Most errors don’t need to block access to the rest of the feature.

<!-- dodont -->

#### Don’t

![Modal error message](/images/foundations/patterns/error-messages/dont-modals-for-errors@2x.png)

### Avoid using [home notifications](#home-notifications) for errors

Home notification errors are for high-priority tasks that merchants must complete immediately to continue using Shopify or prevent
a negative impact to their business, like losing money.
One exception is errors for features that don‘t have a dedicated details page.

<!-- end -->

<!-- dodont -->

#### Don’t

![Home notification error message](/images/foundations/patterns/error-messages/dont-home-notification@2x.png)

<!-- end -->

---

## Form validation

### Text field validation

Use when:

- A text field has formatting requirements. Use this pattern to enhance
  [validation on form submission](#validate-on-submit).

Don’t use when:

- It takes
  [more than a full second](https://developers.google.com/web/fundamentals/performance/rail#ux) to validate input and display a message. If there’s a lag before a validation message appears, merchants might shift their attention and miss the error.
  Either find a way to improve the validation speed, or rely on the
  [validation after form submission](#validate-on-submit).
- The field is empty. Merchants might tab through a form before filling it out, and errors on empty fields can cause confusion and frustration.

### Component

- [Text field](/components/selection-and-input/text-field)

### Content

- Use two or three words to explain what’s wrong or what’s needed to fix the problem.
- Avoid using the word "invalid" to define an error. When appropriate, use "not valid" instead.
- Since the message is directly below the text field, the copy only needs to explain why the error happened. Optionally, the message can clarify what to do next or offer a one-click fix.

![Text field validation error](/images/foundations/patterns/error-messages/text-field-validation-error-no-cursor@2x.png)

**Usage**

Do an initial validation check as soon as merchants finish typing in the field.

Merchants can be considered to be finished typing only when keyboard focus moves away from the field and there is at least one character in the field. This helps avoid marking the field as not valid before merchants are really done typing.

![Initial validation check with purple border](/images/foundations/patterns/error-messages/text-field-validation-purple-incorrect-input@2x.png)

If the validation check fails, show an error message below the field.

![Text field turns red](/images/foundations/patterns/error-messages/text-field-validation-error-no-cursor@2x.png)

Once a field has an error, complete validation checks after each keystroke.

![Text field validation with cursor by incorrect semi colon](/images/foundations/patterns/error-messages/text-field-validation-cursor@2x.png)

Remove the error message as soon as the input becomes valid so merchants can immediately tell they fixed the issue.

![Text field validation with purple border](/images/foundations/patterns/error-messages/text-field-validation-purple-border-cursor@2x.png)

If the validation process is less than a second but not instant, show a spinner on the field to indicate validation progress.

![Text field validation in loading state with spinner](/images/foundations/patterns/error-messages/text-field-validation-loading@2x.png)

---

## Validate on submit

Validate on submit is triggered when merchants press the form’s submit button. The submit button is often \[Save\], but can be another call to action.

Use when:

- Not all fields can be validated while merchants are typing. When a form is used for saving data, always validate on submit and validate text fields while typing. For example, if merchants never interact with a required text field, there’s no change to mark it as not valid until they press the submit button. The same applies to form controls other than text fields, such as radio buttons, and selects.

Don’t use when:

- A form doesn’t have specific validation requirements, or the form doesn’t save data. For example, a search form that returns no results should display an empty state, rather than a validation error.

### Component

- [Banner](/components/feedback-indicators/banner#navigation)

And one or more of the following:

- [Text field]
- [Select]
- [Choice list]
- [Checkbox]
- [Radio button]

### Content

Banner heading

- Use a colon to introduce the list.
- Make the heading instructional. Don’t just call out that there are {x} number of errors.

Banner body text

- Use the [list component](/components/lists/list#navigation) to itemize the errors
- Start each list item with the label of the field that isn't valid, and describe the action needed to fix it

Individual field error messages:

- See content guidelines for [validation while typing](#validate-while-typing)

![Red form validation banner](/images/foundations/patterns/error-messages/validation-banner-red@2x.png)

Rather than pointing out that there are {x} number of errors, be more descriptive. Explain that in order to save or continue, {x} number of fields need to be changed. For the bullet point instructions, see if you can word them to be more actionable, for example, “Add a discount code,“ instead of “Discount can’t be blank.“

<!-- dodont -->

#### Do

![Instructional validation banner](/images/foundations/patterns/error-messages/validation-banner-content-do@2x.png)

#### Don’t

![Validation banner that only points out that there is an error](/images/foundations/patterns/error-messages/validation-banner-content-dont@2x.png)

<!-- end -->

**Usage**

Always indicate submission progress. If the fields aren't valid, don’t clear or alter them on behalf of merchants during validation.

![Spinner displaying on save](/images/foundations/patterns/error-messages/submission-progress@2x.png)

If the form submission has a single error:

- Move scroll position to the field that is not valid
- Focus the field
- Show an error message below the field

![Validation error for a price entry field](/images/foundations/patterns/error-messages/input-validation@2x.png)

If the form submission has multiple errors:

- Move scroll position to the top of the screen
- Use a banner to display a summary of all the errors
- Show an error message below each field that is not valid so merchants can scroll through and make corrections

![Red form validation banner](/images/foundations/patterns/error-messages/validation-banner-red@2x.png)

---

## Settings warning

Use:

- To help merchants prevent potential mistakes
- When form input is valid, but you want to warn merchants of a consequence they might not be expecting

Don’t use:

- For actual error states

Tip: Explore ways to prevent the warning message from showing at all. Look for opportunities to add help text or other contextual information to surface or highlight potential risks or consequences of taking, or not taking, the action.

### Component

- [Banner](/components/feedback-indicators/banner) without title

### Content

- Since the warning message is in close context to the action that triggered the warning, it should be short
- Explain the risks or consequences of an action that’s just been taken
- These messages don’t have to start with actionable language, like, “Change currency.” Here are some options
  - Start with the word “This” and explain the consequence, for example, “This will affect inventory prices”
  - Start by noting the action, then explain the consequence, “Changing {x} will affect {y}”
- If available, link to a resource where merchants can learn more

![In line warning banner below a drop down](/images/foundations/patterns/error-messages/settings-warning@2x.png)

---

## Banners

### Page-level banners

Use when:

- An error applies to the entire screen
- The error is far down the page and it’s critical that they see the message
- [A form was submitted with fields that are not valid](#form-validation)
- If the error was delayed, for example, an action was taken and the error doesn’t immediately appear in context

Don’t use when:

- It’s possible to place the banner [in context] because the source of the error is in view and the event that triggered the action just happened

For multiple error guidelines, see [validate on submit](#validate-on-submit)

Page-level banner errors should explain:

- Where the error happened
- What happened
- Why it happened
- What to do next

<!-- dodont -->

#### Do

![Error message with arrows pointing at different parts of the message](/images/foundations/patterns/error-messages/banner-breakdown@2x.png)

#### Don’t

- Unable to process payment for checkout with negative taxes.

<!-- end -->

### Component

- [Banner](/components/feedback-indicators/banner)

### Content

Headings should:

- Clearly state the problem
- Not use punctuation

Body content should:

- Explain how to solve the problem.
- Use actionable language like “do x.” Don‘t use permissive language, like “you can x.” Be concise: no longer than 2 sentences.
- Use periods.

Calls to action should:

- Be action-led (verb+noun format)
- Aim for a one-click fix. If the error can be fixed via a single button or menu, offer that action directly in the error message.
- Open a dedicated error-correction view for more complex problems such as reviewing a risky order or editing an unverified customer address.
- Provide a link to documentation for information that may be valuable but can’t fit in a brief error message.

![Page level warning banner](/images/foundations/patterns/error-messages/page-level-warning-banner@2x.png)

### Banners in cards and modals

Use when:

- Merchants are engaged in a task flow and you want to warn them about potential issues with the task at hand, or inform them something has gone wrong
- Directing merchants to a page with multiple sections and you want to visibly call out the section with the error

Don’t use when:

- An error applies to the entire screen.
- The error is far down the page and it’s critical that merchants see the message.
- If the error was delayed. For example, an action was taken and the error doesn’t immediately appear in context. In these cases, use the
  [page-level banner](#page-level-banners)

### Component

- [Banner](/components/feedback-indicators/banner#navigation)

### Variant

- Without title

### Content

- The more contextual the message, the less you need to say, so go straight to explaining what happened and how to fix
- Keep to one sentence
- Contextual banners don’t have titles
- Try to add a next step, whether in a button or link
- Use when there is more than one call to action

## ![Warning banner at the top of a card below the card title](/images/foundations/patterns/error-messages/section-level-warning@2x.png)

## Exception lists

Use when:

- Items in a list are in a noteworthy state that you want to make merchants aware of, like a status, or piece of information (like a high risk order) that’s directly relevant to the information it’s connected to

Example:

- High risk order

Don’t use when:

- The source of the problem is an entire card or page

### Component

- [Exception list](/components/feedback-indicators/exception-list)

Variant

- Status: critical or warning

### Content

Content should:

- Highlight an exceptional state that encourages clicking on the list item
- Pair content with a warning or error icon
- Always lead with what went wrong
- A description is required
- A title is optional
- Links are optional but not common because the list item is actionable
- Be concise

![Exception list warning](/images/foundations/patterns/error-messages/exception-list-warning@2x.png)

![Exception list error](/images/foundations/patterns/error-messages/high-risk-fraud@2x.png)

---

## Home notifications

Home notifications are primarily used to prevent merchants from losing money or help them continue using Shopify if they don’t act on the error message instructions immediately.

Use for:

- High-priority tasks that must be completed immediately to continue using
  Shopify or avoid losing money.
- Important enough tasks that we wouldn’t want merchants to navigate to another place in Shopify to find it, or stumble upon while completing another task.
- Errors for features that don’t have a dedicated details page. For example, before
  Shopify Capital had a details page, related status messages were temporarily surfaced in Home.

Don’t use for:

- Tips or advice
- Positive feedback
- Confirmation messages
- New feature announcements
- Status messages, other than those for Shopify Capital
- Messages that can be displayed in context
- Error messages that should be displayed in context
- Task-related errors like a problem with saving a page

![Structure of home notification with a header, body content, and button](/images/foundations/patterns/error-messages/home-notification-anatomy@2x.png)

### Warning home notifications

Warning home notifications are pre-emptive. They let merchants know that their finances will be impacted if action isn’t taken in a couple days or more, or that an action can be taken to make money sooner.

- Financing request is pending
- Warn about upcoming expiration
- Pending status, like with Shopify Capital application status

<!-- dodont -->

#### Do

![Warning home notification with credit card expiry message](/images/foundations/patterns/error-messages/home-notification-warning@2x.png)

#### Don’t

![Warning home notification with chargeback message](/images/foundations/patterns/error-messages/dont-home-notification@2x.png)

<!-- end -->

### Critical home notifications

Critical home notifications inform merchants of issues that:

- Currently impact their finances
- Will have an impact on their finances if action isn’t taken immediately
- Prevent the normal operation of their business or account

Critical home notifications can be used for these message types:

- Trial expired
- Domain expired
- Credit card expired
- Account is suspended
- Shopify Payment payouts on hold
- Payment processing issues
- Payment authorizations expiring that day

<!-- dodont -->

#### Do

![Critical home notification with account on hold message](/images/foundations/patterns/error-messages/home-notification-critical@2x.png)

#### Don’t

![Critical home notification with out of stock message](/images/foundations/patterns/error-messages/dont-home-notification-02@2x.png)

<!-- end -->

---

## Admin unavailable errors

Sometimes the admin can’t be displayed due to a network issue, browser limitation, connection problem, or server issue. 400 and 500 series errors fall in this category. In these cases, always explain what went wrong and provide merchants with a troubleshooting step, like refreshing the page.

Use when:

- A page or the entire admin can’t be displayed

Don’t use when:

- The error can be placed in context, close to the source of the problem

<!-- dodont -->

#### Do

![Page not found error with internet connection message](/images/foundations/patterns/error-messages/page-not-found-02@2x.png)

#### Don’t

![Page not found error with oops, something went wrong message](/images/foundations/patterns/error-messages/dont-page-not-found@2x.png)

<!-- end -->

Don’t use internal language in error messages and avoid using question formats.

<!-- dodont -->

#### Do

![Problem loading page error with troubleshooting tips](/images/foundations/patterns/error-messages/admin-error@2x.png)

#### Don’t

![Problem loading page error with content that talks about operational engineers](/images/foundations/patterns/error-messages/dont-admin-error@2x.png)

<!-- end -->

### Component:

- [Empty state](/components/layout-and-structure/empty-state)

### Content

Headings should:

- Heading should explain what went wrong
- Body should help merchants troubleshoot the problem
- Call to action should provide the most probable fix, like reloading the page, or going to the previous page or Shopify Home

![Page not found error](/images/foundations/patterns/error-messages/page-not-found@2x.png)

---

## Errors without solutions

When a service issue occurs in Shopify or is caused by a third party, we don’t always have a solution to offer to merchants. In these cases, always explain what went wrong so they can attempt to troubleshoot. If available, provide them with a troubleshooting step, like refreshing the page or returning at a later time.

Use when:

- Merchants are being denied access to a page or the entire admin
  [See admin unavailable errors](#admin-unavailable-errors)
- A third party issue is causing a disruption to merchants’ workflows

Don’t use when:

- There’s literally any solution we can offer to merchants

<!-- dodont -->

#### Do

![Carrier may not be able to pick up package error message](/images/foundations/patterns/error-messages/warning-no-solution@2x.png)
![Carrier may not be able to pick up package error message](/images/foundations/patterns/error-messages/warning-no-solution-2@2x.png)

#### Don’t

- Don’t use the “Something went wrong. Please try again in a few minutes.” message when there’s any option to offer more context.

<!-- end -->

<!-- dodont -->

#### Do

- This error message is a last resort: "Something went wrong. Please try again in
  a few minutes."

#### Don’t

- An error occurred
- 1 error
- Invalid

<!-- end -->

---

## Voice and tone

These content guidelines are based on common copy mistakes. Avoid sounding overly apologetic, too technical, or hyperbolic. Keep Shopify out of the conversation unless Shopify was the cause of the error. Don’t downplay the error by telling merchants not to worry or by adding humor to a negative situation.

Avoid the word “please” so it’s not overused throughout the admin. Don’t downplay serious problems.

<!-- dodont -->

#### Do

- Some of today’s sales data isn’t updated yet. This will be fixed soon. Your data is safe, and your actual sales are not affected.

#### Don’t

- Today’s sales data **might** not be accurate, but **please don’t worry—it’s just temporary**.

<!-- end -->

Don’t use scary, technical words in error messages.

<!-- dodont -->

#### Do

- Product weight can’t be negative. Change the product weight to be 0 or higher and try again.

#### Don’t

- **Error** **Line items grams** must be greater than or equal to 0.

<!-- end -->

Error messages are not the place for hyperbole or injecting personality.

<!-- dodont -->

#### Do

- High risk of fraud detected

Before fulfilling this order or capturing payment, review the Risk Analysis and determine if this order is fraudulent.

#### Don’t

- **Uh oh! High risk of fraud detected**

Looks like there’s a high fraud risk with this order. Better review the Risk
Analysis to make sure the order is safe!

<!-- end -->

Don’t use internal Shopify terms. Only include the information merchants need.

<!-- dodont -->

#### Do

- There’s a problem loading this page

There’s a technical problem with Shopify that has prevented this page from loading. Try reloading this page or going to another page in Shopify. If that doesn’t work, visit our status page for updates and try again later.

#### Don’t

- There’s a technical problem with Shopify that has prevented this page from loading. **Our operation engineers are aware of this problem and are working hard to get it solved**.

<!-- end -->

Keep Shopify out of the conversation. Focus on the information merchants need to complete their task efficiently.

<!-- dodont -->

#### Do

- Before you can view earnings from your store, you need to complete your account setup. [Complete account setup]

#### Don’t

- Before **we** can provide you with earnings from your store, **we** need some additional information. [Complete account setup]

<!-- end -->
