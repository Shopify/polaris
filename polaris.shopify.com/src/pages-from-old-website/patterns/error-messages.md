---
name: Patterns/Error messages
slug: error-messages
icon: IconErrors
keywords:
  - error states
  - invalid
  - 500
  - 400
  - 404
  - error pages
---

# Error messages

Error messages can be scary. Make errors visible to merchants, easy to
understand, and helpful.

Error messages should:

- Tell merchants what happened. If there’s a solution, explain it. If possible,
  offer a one-click fix with a button. If there’s
  [no solution](#errors-without-solutions), give troubleshooting instructions.
- Be placed close to the source of the problem.
- Communicate severity using the appropriate [color](#colors) and
  [tone of voice](#voice-and-tone).
- Use
  [plain language](/content/product-content#section-write-for-a-grade-7-reading-level).
- Be specific. For example, use precise
  [numbers and dates](/content/grammar-and-mechanics#section-dates-numbers-and-addresses).
- Be brief.

Good design can reduce the need for error messages by preventing them in the
first place. [Learn more about preventing errors](/patterns-and-guides/crafting-admin)

---

## Error message types

Think about the scope of the error when selecting a message type. Is something
wrong with the entire application, with the entire current screen, or with a
specific element on the screen?

If the cause of the error is visible and the error just happened, show the error
message immediately and as close to the source of the problem as possible.

### [Text field validation error](#form-validation)

<div class="Annotated">
  <div class="Annotated__Text">
    <p>Use when:</p>
    <ul>
      <li>
        An error applies to a text field and feedback can
        be provided while merchants are typing
      </li>
    </ul>
  </div>
<div class="Annotated__Media">
<div class="Image Image--border">

![Text field validation](/public_images/errors-page/text-field-validation-error@2x.png)

</div>
</div>
</div>

### [Settings warning](#settings-warning)

<div class="Annotated">
  <div class="Annotated__Text">
    <p>Use when:</p>
    <ul>
      <li>
        The form input is valid, but you want to warn merchants
        of a consequence they might not expect
      </li>
    </ul>
  </div>
<div class="Annotated__Media">

<div class="Image Image--border">

![Settings warning error](/public_images/errors-page/settings-warning@2x.png)

</div>
</div>
</div>

### [Page-level banner: critical or warning](#page-level-banners)

<div class="Annotated">
  <div class="Annotated__Text">
    <p>Use when:</p>
    <ul>
      <li>An error applies to the entire page</li>
      <li>The error is far down the page and it’s critical merchants see the message</li>
      <li>Multiple validation errors on the page need to be summarized</li>
      <li>The error was delayed and it’s okay to inform merchants of the problem when they return to the page</li>
    </ul>
  </div>
<div class="Annotated__Media">
<div class="Image Image--border">

![Yellow page level banner](/public_images/errors-page/page-level-warning-banner@2x.png)

</div>
<div class="Image Image--border">

![Red page level banner](/public_images/errors-page/page-level-critical-banner@2x.png)

</div>
</div>
</div>

### [Banner in a card or modal: critical or warning](#banners-in-cards-modals)

<div class="Annotated">
  <div class="Annotated__Text">
    <p>Use when:</p>
    <ul>
      <li>An error applies to a single card within the page, a single section within a card, or a modal</li>
      <li>You need to direct merchants to a page with multiple sections and you want to visually call out the section with the error</li>
    </ul>
  </div>
  <div class="Annotated__Media">

![Yellow section level banner](/public_images/errors-page/section-level-warning@2x.png)
![Yellow field level banner](/public_images/errors-page/field-level-warning-02@2x.png)

  </div>
</div>

### [Exception list: critical or warning](#exception-list-errors)

<div class="Annotated">
  <div class="Annotated__Text">
    <p>Use when:</p>
    <ul>
      <li>A message placed within or next to a component can help merchants make better decisions about routine tasks</li>
    </ul>
  </div>
<div class="Annotated__Media">
<div class="Image">

![Warning exception list error](/public_images/errors-page/exception-list-warning@2x.png)

</div>
<div class="Image Image--border">

![Critical exception list error](/public_images/errors-page/high-risk-fraud@2x.png)

</div>
</div>
</div>

### [Home notification: critical or warning](#home-notifications)

<div class="Annotated">
  <div class="Annotated__Text">
    <p>Note: Home notifications should rarely be used for errors. Always attempt to display an error close to the source of the problem.<br />Use when:</p>
    <ul>
      <li>A high-priority task must be completed immediately to continue using Shopify or avoid losing money</li>
      <li>A feature doesn’t have a dedicated details page</li>
    </ul>
  </div>
<div class="Annotated__Media">
<div class="Image Image--border">

![Yellow home notification](/public_images/errors-page/home-notification-warning@2x.png)

</div>
<div class="Image Image--border">

![Red home notification](/public_images/errors-page/home-notification-critical@2x.png)

</div>
</div>
</div>

### [Admin unavailable](#admin-unavailable-errors)

<div class="Annotated">
  <div class="Annotated__Text">
    <p>Use when:</p>
    <ul>
      <li>A server error is preventing an entire page from being displayed, like with 400 or 500-series server errors</li>
      <li>Account permissions are preventing someone from accessing Shopify</li>
    </ul>
  </div>
<div class="Annotated__Media">
<div class="Image Image--border">

![Admin page not found error](/public_images/errors-page/page-not-found@2x.png)

</div>
<div class="Image Image--border">

![Admin page load error](/public_images/errors-page/admin-error@2x.png)

</div>
</div>
</div>

---

<a name="colors"></a>

## Error colors

Red is the scariest error color. Only use red for critical messages that
merchants need to deal with immediately to avoid harm to their business. For
example, if merchants don’t act on the message right away, they might lose
money or their store might be suspended.

Yellow error messages still demand attention, but are more appropriate for
messages that are part of a daily workflow.

<a name="colors-critical"></a>

### Red (critical)

Use critical messages to:

- Bring attention to urgent tasks. If not dealt with immediately, merchants'
  businesses will be noticeably impacted, like an account being suspended or
  money being lost.

Examples of critical message types:

- Update a payment method expiry date
- Unsuspend an account
- Review an order for fraud
- Fix a problem that’s preventing payment from being processed

<!-- usagelist -->

#### Do

![Red banner with high fraud risk message](/public_images/errors-page/red-banner@2x.png)

#### Don’t

![Yellow banner with high fraud risk message](/public_images/errors-page/yellow-banner@2x.png)

<!-- end -->

The one exception to using red is in form validation errors because this is a
standard convention merchants are used to seeing outside of Shopify.

<!-- usagelist -->

#### Do

![Form validation with red banner](/public_images/errors-page/validation-banner-red@2x.png)

#### Don’t

![Form validation with yellow banner](/public_images/errors-page/validation-banner-yellow@2x.png)

<!-- end -->

<a name="colors-warning"></a>

### Yellow (warning)

Use warning messages to:

- Help merchants fix issues so they can complete a common workflow or continue
  to the next step
- Notify merchants about upcoming expirations or pending requests that, if not
  dealt with soon, could lead to problems in the future

Examples of warning message types:

- Fix a problem before proceeding to the next step.
- Fix a problem at some point in a common workflow.
- There’s a pending request.
- There’s an upcoming expiration.
- Changing a setting might have unintended consequences. See
  [settings warning](#settings-warning).

<!-- usagelist -->

#### Do

![Yellow banner with warning message](/public_images/errors-page/yellow-do@2x.png)

#### Don’t

![Red banner with warning message](/public_images/errors-page/yellow-dont@2x.png)

<!-- end -->

---

<a name="anti-patterns"></a>

## Anti-patterns

### Avoid using toast for error messages

<div class="Annotated">
  <div class="Annotated__Text">
    <p>
      Although error toast is still available, we discourage its use. Toast messages are too short to adequately explain what went wrong and how to fix the problem. Because the toast component appears at the bottom of the screen and disappears after 3 seconds, it can easily be missed. Reserve toast for errors not caused by merchants, like a connection issue. Always try to use a banner to inform merchants about persistent errors.
    </p>
  </div>
<div class="Annotated__Media">
<!-- usageblock -->

#### Don’t

<div class="TypographyUsageBlockImg TypographyUsageBlockImgHeight">
<div class="Image Image--border">

![Toast error message](/public_images/errors-page/dont-toast-error@2x.png)

</div>
</div>

<!-- end -->

</div>
</div>

### Don’t use modals for errors

<div class="Annotated">
  <div class="Annotated__Text">
    <p>
      Modal dialogs are a good way to ask merchants to confirm a
      destructive action, but not to tell them an error has occurred.
      Modals block merchants until a decision is made, which is
      likely to make merchants feel pressured. Most errors don’t need
      to block access to the rest of the feature.
    </p>
  </div>
<div class="Annotated__Media">
<!-- usageblock -->

#### Don’t

<div class="TypographyUsageBlockImg TypographyUsageBlockImgHeight">
<div class="Image Image--border">

![Modal error message](/public_images/errors-page/dont-modals-for-errors@2x.png)

</div>
</div>

<!-- end -->

</div>
</div>

### Avoid using [home notifications](#home-notifications) for errors

<div class="Annotated">
  <div class="Annotated__Text">
    <p>
      Home notification errors are for high-priority tasks that merchants
      must complete immediately to continue using Shopify or prevent
      a negative impact to their business, like losing money.
      One exception is errors for features that don‘t have a
      dedicated details page.
    </p>
  </div>
<div class="Annotated__Media">
<!-- usageblock -->

#### Don’t

<div class="TypographyUsageBlockImg TypographyUsageBlockImgHeight">
<div class="Image Image--border">

![Home notification error message](/public_images/errors-page/dont-home-notification@2x.png)

</div>
</div>

<!-- end -->

</div>
</div>

---

<a name="form-validation"></a>

## Form validation

<a name="validate-while-typing"></a>

### Text field validation

Use when:

- A text field has formatting requirements. Use this pattern to enhance
  [validation on form submission](#validate-on-submit).

Don’t use when:

- It takes
  [more than a full second](https://developers.google.com/web/fundamentals/performance/rail#ux)
  to validate input and display a message. If there’s a lag before a validation
  message appears, merchants might shift their attention and miss the error.
  Either find a way to improve the validation speed, or rely on the
  [validation after form submission](#validate-on-submit).
- The field is empty. Merchants might tab through a form before filling it out, and errors on empty fields can cause confusion and frustration.

### Component:

<div class="Annotated">
  <div class="Annotated__Text">
    <ul>
      <li>
        <a href="/components/forms/text-field">Text field</a>
      </li>
    </ul>
    <h3>Content:</h3>
    <ul>
      <li>
        Use two or three words to explain what’s wrong or what’s
        needed to fix the problem.
      </li>
      <li>
        Avoid using the word "invalid" to define an error. When appropriate, use "not valid" instead.
      </li>
      <li>
        Since the message is directly below the text field, the copy only
        needs to explain why the error happened. Optionally, the message can
        clarify what to do next or offer a one-click fix.
      </li>
    </p>
  </div>
<div class="Annotated__Media">
<div class="Image Image--border">

![Text field validation error](/public_images/errors-page/text-field-validation-error-no-cursor@2x.png)

</div>

</div>
</div>

**Usage**

Do an initial validation check as soon as merchants finish typing in the
field.

Merchants can be considered to be finished typing only when keyboard focus
moves away from the field and there is at least one character in the field. This
helps avoid marking the field as not valid before merchants are really done typing.

<div class="Image">

![Initial validation check with purple border](/public_images/errors-page/text-field-validation-purple-incorrect-input@2x.png)

</div>

If the validation check fails, show an error message below the field.

<div class="Image">

![Text field turns red](/public_images/errors-page/text-field-validation-error-no-cursor@2x.png)

</div>

Once a field has an error, complete validation checks after each keystroke.

<div class="Image">

![Text field validation with cursor by incorrect semi colon](/public_images/errors-page/text-field-validation-cursor@2x.png)

</div>

Remove the error message as soon as the input becomes valid so merchants can
immediately tell they fixed the issue.

<div class="Image">

![Text field validation with purple border](/public_images/errors-page/text-field-validation-purple-border-cursor@2x.png)

</div>

If the validation process is less than a second but not instant, show a spinner
on the field to indicate validation progress.

<div class="Image">

![Text field validation in loading state with spinner](/public_images/errors-page/text-field-validation-loading@2x.png)

</div>

---

<a name="validate-on-submit"></a>

## Validate on submit

Validate on submit is triggered when merchants press the form’s submit

button. The submit button is often \[Save\], but can be another call to action.

Use when:

- Not all fields can be validated while merchants are typing. When a form is used
  for saving data, always validate on submit and validate text fields while
  typing. For example, if merchants never interact with a required text field,
  there’s no change to mark it as not valid until they press the submit button.
  The same applies to form controls other than text fields, such as radio
  buttons, and selects.

Don’t use when:

- A form doesn’t have specific validation requirements, or the form doesn’t save
  data. For example, a search form that returns no results should display an
  empty state, rather than a validation error.

### Component:

<div class="Annotated">
  <div class="Annotated__Text">
    <ul>
      <li>
        <a href="/components/feedback-indicators/banner#navigation">Banner</a>
      </li>
    </ul>
    <p>And one or more of the following:</p>
    <ul>
      <li>[Text field]</li>
      <li>[Select]</li>
      <li>[Choice list]</li>
      <li>[Checkbox]</li>
      <li>[Radio button]</li>
    </ul>
    <h3>Content:</h3>
    <p>Banner heading:</p>
    <ul>
      <li>Use a colon to introduce the list.</li>
      <li>
        Make the heading instructional. Don’t just call out that there
        are {x} number of errors.
      </li>
    </ul>
    <p>Banner body text:</p>
    <ul>
      <li>
        Use the <a href="/components/lists-and-tables/list#navigation">list component</a> to itemize the errors
      </li>
      <li>
        Start each list item with the label of the field that isn't valid,
        and describe the action needed to fix it
      </li>
    </ul>
    <p>Individual field error messages:<p>
    <ul>
      <li>
        See content guidelines for <a href="#validate-while-typing">validation while typing</a>
      </li>
    </ul>

  </div>
<div class="Annotated__Media">
<div class="Image Image--border">

![Red form validation banner](/public_images/errors-page/validation-banner-red@2x.png)

</div>
</div>
</div>

Rather than pointing out that there are {x} number of errors, be more
descriptive. Explain that in order to save or continue, {x} number of fields
need to be changed. For the bullet point instructions, see if you can word them
to be more actionable, for example, “Add a discount code,“ instead of “Discount
can’t be blank.“

<!-- usagelist -->

#### Do

![Instructional validation banner](/public_images/errors-page/validation-banner-content-do@2x.png)

#### Don’t

![Validation banner that only points out that there is an error](/public_images/errors-page/validation-banner-content-dont@2x.png)

<!-- end -->

**Usage**

Always indicate submission progress. If the fields aren't valid, don’t clear or alter them on behalf of merchants during validation.

<div class="Image Image--border">

![Spinner displaying on save](/public_images/errors-page/submission-progress@2x.png)

</div>

If the form submission has a single error:

- Move scroll position to the field that is not valid
- Focus the field
- Show an error message below the field

<div class="Image Image--border">

![Validation error for a price entry field](/public_images/errors-page/input-validation@2x.png)

</div>

If the form submission has multiple errors:

- Move scroll position to the top of the screen
- Use a banner to display a summary of all the errors
- Show an error message below each field that is not valid so merchants can scroll through and make corrections

<div class="Image Image--border">

![Red form validation banner](/public_images/errors-page/validation-banner-red@2x.png)

</div>

---

<a name="settings-warning"></a>

## Settings warning

Use:

- To help merchants prevent potential mistakes
- When form input is valid, but you want to warn merchants of a consequence
  they might not be expecting

Don’t use:

- For actual error states

Tip: Explore ways to prevent the warning message from showing at all. Look for
opportunities to add help text or other contextual information to surface or
highlight potential risks or consequences of taking, or not taking, the action.

### Component:

<div class="Annotated">
  <div class="Annotated__Text">
    <ul>
      <li>
        <a href="/components/feedback-indicators/banner#navigation">Banner</a>
        without title
      </li>
    </ul>
    <h3>Content:</h3>
    <ul>
      <li>
        Since the warning message is in close context to the action that
        triggered the warning, it should be short
      </li>
      <li>
        Explain the risks or consequences of an action that’s just been taken
      </li>
      <li>
        These messages don’t have to start with actionable language, like,
        “Change currency.” Here are some options:
        <ul>
          <li>
            Start with the word “This” and explain the consequence,
            for example, “This will affect inventory prices”
          </li>
          <li>
            Start by noting the action, then explain the consequence,
            “Changing {x} will affect {y}”
          </li>
        </ul>
      </li>
      <li>
        If available, link to a resource where merchants can learn more
      </li>
    </ul>

  </div>
<div class="Annotated__Media">
<div class="Image Image--border">

![In line warning banner below a drop down](/public_images/errors-page/settings-warning@2x.png)

</div>
</div>
</div>

---

<a name="banners"></a>

## Banners

<a name="page-level-banners"></a>

### Page-level banners

Use when:

- An error applies to the entire screen
- The error is far down the page and it’s critical that they see the message
- [A form was submitted with fields that are not valid](#form-validation)
- If the error was delayed, for example, an action was taken and the error
  doesn’t immediately appear in context

Don’t use when:

- It’s possible to place the banner [in context] because the source of the error
  is in view and the event that triggered the action just happened

For multiple error guidelines, see [validate on submit](#validate-on-submit)

Page-level banner errors should explain:

- Where the error happened
- What happened
- Why it happened
- What to do next

<!-- usagelist -->

#### Do

![Error message with arrows pointing at different parts of the message](/public_images/errors-page/banner-breakdown@2x.png)

#### Don’t

- Unable to process payment for checkout with negative taxes.

<!-- end -->

### Component:

<div class="Annotated">
  <div class="Annotated__Text">
    <ul>
      <li>
        <a href="/components/feedback-indicators/banner#navigation">Banner</a>
      </li>
    </ul>
    <h3>Content:</h3>
    <p>Headings should:</p>
    <ul>
      <li>Clearly state the problem</li>
      <li>Not use punctuation</li>
    </ul>
    <p>Body content should:</p>
    <ul>
      <li>Explain how to solve the problem.</li>
      <li>
        Use actionable language like “do x.” Don‘t use permissive language,
        like “you can x.” Be concise: no longer than 2 sentences.
      </li>
      <li>Use periods.</li>
    </ul>
    <p>Calls to action should:</p>
    <ul>
      <li>Be action-led (verb+noun format)</li>
      <li>
        Aim for a one-click fix. If the error can be fixed via a single
        button or menu, offer that action directly in the error message.
      </li>
      <li>
        Open a dedicated error-correction view for more complex problems
        such as reviewing a risky order or editing an unverified
        customer address.
      </li>
      <li>
        Provide a link to documentation for information that may be
        valuable but can’t fit in a brief error message.
      </li>
    </ul>

  </div>
<div class="Annotated__Media">
<div class="Image Image--border">

![Page level warning banner](/public_images/errors-page/page-level-warning-banner@2x.png)

</div>
</div>
</div>

<a name="banners-in-cards-modals"></a>

### Banners in cards and modals

Use when:

- Merchants are engaged in a task flow and you want to warn them about potential
  issues with the task at hand, or inform them something has gone wrong
- Directing merchants to a page with multiple sections and you want to visibly
  call out the section with the error

Don’t use when:

- An error applies to the entire screen.
- The error is far down the page and it’s critical that merchants see the
  message.
- If the error was delayed. For example, an action was taken and the error
  doesn’t immediately appear in context. In these cases, use the
  [page-level banner](#page-level-banners)

### Component:

<div class="Annotated">
  <div class="Annotated__Text">
    <ul>
      <li>
        <a href="/components/feedback-indicators/banner#navigation">Banner</a>
      </li>
    </ul>
    <p>Variant:</p>
    <ul>
      <li>Without title</li>
    </ul>
    <h3>Content:</h3>
    <ul>
      <li>
        The more contextual the message, the less you need to say,
        so go straight to explaining what happened and how to fix
      </li>
      <li>Keep to one sentence</li>
      <li>Contextual banners don’t have titles</li>
      <li>Try to add a next step, whether in a button or link</li>
      <li>Use when there is more than one call to action</li>
    </ul>

  </div>
<div class="Annotated__Media">

![Warning banner at the top of a card below the card title](/public_images/errors-page/section-level-warning@2x.png)
![Small warning banner in a section within a card](/public_images/errors-page/section-level-warning@2x.png)

</div>
</div>

---

<a name="exception-list-errors"></a>

## Exception lists

Use when:

- Items in a list are in a noteworthy state that you want to make merchants
  aware of, like a status, or piece of information (like a high risk order)
  that’s directly relevant to the information it’s connected to

Example:

- High risk order

Don’t use when:

- The source of the problem is an entire card or page

### Component:

<div class="Annotated">
  <div class="Annotated__Text">
    <ul>
      <li>        
        <a href="/components/lists-and-tables/exception-list#navigation">Exception list</a>
      </li>
    </ul>
    <p>Variant:</p>
    <ul>
      <li>Status: critical or warning</li>
    </ul>
    <h3>Content:</h3>
    <p>Content should:</p>
    <ul>
      <li>
        Highlight an exceptional state that encourages clicking on the list item
      </li>
      <li>Pair content with a warning or error icon</li>
      <li>Always lead with what went wrong</li>
      <li>A description is required</li>
      <li>A title is optional</li>
      <li>
        Links are optional but not common because the list item is actionable
      </li>
      <li>Be concise</li>
    </ul>
  </div>
<div class="Annotated__Media">
<div class="Image">

![Exception list warning](/public_images/errors-page/exception-list-warning@2x.png)

</div>
<div class="Image Image--border">

![Exception list error](/public_images/errors-page/high-risk-fraud@2x.png)

</div>
</div>
</div>

---

<a name="home-notifications"></a>

## Home notifications

Home notifications are primarily used to prevent merchants from losing money or
help them continue using Shopify if they don’t act on the error message
instructions immediately.

Use for:

- High-priority tasks that must be completed immediately to continue using
  Shopify or avoid losing money.
- Important enough tasks that we wouldn’t want merchants to navigate to another
  place in Shopify to find it, or stumble upon while completing another task.
- Errors for features that don’t have a dedicated details page. For example, before
  Shopify Capital had a details page, related status messages were temporarily
  surfaced in Home.

Don’t use for:

- Tips or advice
- Positive feedback
- Confirmation messages
- New feature announcements
- Status messages, other than those for Shopify Capital
- Messages that can be displayed in context
- Error messages that should be displayed in context
- Task-related errors like a problem with saving a page

![Structure of home notification with a header, body content, and button](/public_images/errors-page/home-notification-anatomy@2x.png)

<a name="warning-home-notifications"></a>

### Warning home notifications

Warning home notifications are pre-emptive. They let merchants know that their
finances will be impacted if action isn’t taken in a couple days or more, or
that an action can be taken to make money sooner.

- Financing request is pending
- Warn about upcoming expiration
- Pending status, like with Shopify Capital application status

<!-- usagelist -->

#### Do

![Warning home notification with credit card expiry message](/public_images/errors-page/home-notification-warning@2x.png)

#### Don’t

![Warning home notification with chargeback message](/public_images/errors-page/dont-home-notification@2x.png)

<!-- end -->

<a name="warning-home-notifications"></a>

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

<!-- usagelist -->

#### Do

![Critical home notification with account on hold message](/public_images/errors-page/home-notification-critical@2x.png)

#### Don’t

![Critical home notification with out of stock message](/public_images/errors-page/dont-home-notification-02@2x.png)

<!-- end -->

---

<a name="admin-unavailable-errors"></a>

## Admin unavailable errors

Sometimes the admin can’t be displayed due to a network issue, browser
limitation, connection problem, or server issue. 400 and 500 series errors fall
in this category. In these cases, always explain what went wrong and provide
merchants with a troubleshooting step, like refreshing the page.

Use when:

- A page or the entire admin can’t be displayed

Don’t use when:

- The error can be placed in context, close to the source of the problem

<!-- usagelist -->

#### Do

![Page not found error with internet connection message](/public_images/errors-page/page-not-found-02@2x.png)

#### Don’t

![Page not found error with oops, something went wrong message](/public_images/errors-page/dont-page-not-found@2x.png)

<!-- end -->

Don’t use internal language in error messages and avoid using question formats.

<!-- usagelist -->

#### Do

![Problem loading page error with troubleshooting tips](/public_images/errors-page/admin-error@2x.png)

#### Don’t

![Problem loading page error with content that talks about operational engineers](/public_images/errors-page/dont-admin-error@2x.png)

<!-- end -->

### Component:

<div class="Annotated">
  <div class="Annotated__Text">
    <ul>
      <li>
        <a href="/components/structure/empty-state#navigation">Empty state</a>
      </li>
    </ul>
    <p>
      Note: Use of the empty state component is temporary for admin
      unavailable errors. This is an opportunity for someone at Shopify to
      explore a new design and help with creating UX guidelines.
      If you have ideas,
      <a href="https://github.com/Shopify/polaris-ux/issues/new?template=Component_proposal.md">create an issue (private)</a>.
    </p>
    <h3>Content:</h3>
    <p>Headings should:</p>
    <ul>
      <li>Heading should explain what went wrong</li>
      <li>Body should help merchants troubleshoot the problem</li>
      <li>
        Call to action should provide the most probable fix,
        like reloading the page, or going to the previous page or Shopify Home
      </li>
    </ul>

  </div>
<div class="Annotated__Media">
<div class="Image Image--border">

![Page not found error](/public_images/errors-page/page-not-found@2x.png)

</div>
</div>
</div>

---

<a name="errors-without-solutions"></a>

## Errors without solutions

When a service issue occurs in Shopify or is caused by a third party, we don’t
always have a solution to offer to merchants. In these cases, always explain
what went wrong so they can attempt to troubleshoot. If available,
provide them with a troubleshooting step, like refreshing the page or
returning at a later time.

Use when:

- Merchants are being denied access to a page or the entire admin
  [See admin unavailable errors](#admin-unavailable-errors)
- A third party issue is causing a disruption to merchants’ workflows

Don’t use when:

- There’s literally any solution we can offer to merchants

<!-- usagelist -->

#### Do

![Carrier may not be able to pick up package error message](/public_images/errors-page/warning-no-solution@2x.png)
![Carrier may not be able to pick up package error message](/public_images/errors-page/warning-no-solution-2@2x.png)

#### Don’t

- Don’t use the “Something went wrong. Please try again in a few minutes.”
  message when there’s any option to offer more context.

<!-- end -->

<!-- usagelist -->

#### Do

- This error message is a last resort: "Something went wrong. Please try again in
  a few minutes."

#### Don’t

- An error occurred
- 1 error
- Invalid

<!-- end -->

---

<a name="voice-and-tone"></a>

## Voice and tone

<!-- keywords: please -->

These content guidelines are based on common copy mistakes. Avoid sounding
overly apologetic, too technical, or hyperbolic. Keep Shopify out of the
conversation unless Shopify was the cause of the error. Don’t downplay the error
by telling merchants not to worry or by adding humor to a negative situation.

Avoid the word “please” so it’s not overused throughout the admin. Don’t
downplay serious problems.

<!-- usagelist -->

#### Do

- Some of today’s sales data isn’t updated yet. This will be fixed soon. Your
  data is safe, and your actual sales are not affected.

#### Don’t

- Today’s sales data **might** not be accurate, but **please don’t worry—it’s
  just temporary**.

<!-- end -->

Don’t use scary, technical words in error messages.

<!-- usagelist -->

#### Do

- Product weight can’t be negative. Change the product weight to be 0 or higher
  and try again.

#### Don’t

- **Error** **Line items grams** must be greater than or equal to 0.

<!-- end -->

Error messages are not the place for hyperbole or injecting personality.

<!-- usagelist -->

#### Do

- High risk of fraud detected

Before fulfilling this order or capturing payment, review the Risk Analysis and
determine if this order is fraudulent.

#### Don’t

- **Uh oh! High risk of fraud detected**

Looks like there’s a high fraud risk with this order. Better review the Risk
Analysis to make sure the order is safe!

<!-- end -->

Don’t use internal Shopify terms. Only include the information merchants need.

<!-- usagelist -->

#### Do

- There’s a problem loading this page

There’s a technical problem with Shopify that has prevented this page from
loading. Try reloading this page or going to another page in Shopify. If that
doesn’t work, visit our status page for updates and try again later.

#### Don’t

- There’s a technical problem with Shopify that has prevented this page from
  loading. **Our operation engineers are aware of this problem and are working
  hard to get it solved**.

<!-- end -->

Keep Shopify out of the conversation. Focus on the information merchants need
to complete their task efficiently.

<!-- usagelist -->

#### Do

- Before you can view earnings from your store, you need to complete your
  account setup. [Complete account setup]

#### Don’t

- Before **we** can provide you with earnings from your store, **we** need some
  additional information. [Complete account setup]

<!-- end -->
