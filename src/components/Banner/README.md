---
name: Banner
category: Feedback indicators
platforms:
  - android
  - ios
  - web
keywords:
  - inform
  - update
  - changes
  - conditions
  - dismissible banners
  - banner with footer call-to-action
  - banner with footer button
  - banner with button
  - informational banners
  - success banners
  - warning banners
  - critical banners
  - banner width
  - banner headings
  - banner content
  - banner buttons
  - banner links
  - banner body content
  - banner text
  - banner body text
  - full-width alert
---

# Banner

Informs merchants about important changes or persistent conditions. Use this component if you need to communicate to merchants in a prominent way. Banners are placed at the top of the page or section they apply to, and below the page or section header.

---

## Best practices

Banners should:

- Be placed in the appropriate context:
  - Banners relevant to an entire page should be placed at the top of that page, below the page header. They should occupy the full width of the content area.
  - Banners related to a section of a page (like a card,
    popover, or modal) should be placed inside that section, below any section heading.
  - Banners related to an element more specific that a section should be placed immediately above or below that element.
- Focus on a single theme, piece of information, or required action to avoid
  overwhelming merchants.
- Be dismissible unless they contain critical information or an important step merchants need to take.
- Be concise and scannable—merchants shouldn’t need to spend a lot of time
  figuring out what they need to know and do.
- Be limited to a few important calls to action with no more than one primary
  action.
- Be used thoughtfully and sparingly for only the most important information.
- Not be used as the primary entry point to information or
  actions merchants need on a regular basis.
- Not be used for marketing information or upsell—[use callout cards](/components/structure/callout-card) instead.
- Use the default icon for `success`, `info`, `warning` and `critical` statuses. If the icon is changed, use only [major, duotone icons](/design/icons#using-icons-in-your-designs).

---

## Content guidelines

### Headings

Banner headings should be:

- Descriptive: help merchants understand what they’ll find in the card.
  - Communicate when a situation is serious enough to warrant using a critical or
    warning banner. People who are unable to see the color of the banner need to
    clearly understand the importance of the situation without the benefit of
    seeing the color of the banner. Learn more about [accessibility](/patterns-and-guides/accessibility).

<!-- usagelist -->

#### Do

You’ve received a chargeback

#### Don’t

Have a look at this

<!-- end -->

- Concise and scannable:

  - Use simple, clear language that can be read at a glance
  - Keep headings to a single sentence and avoid using punctuation such as
    periods, commas, or semicolons
  - Where possible, avoid articles (the, a, an) to keep content short and
    actionable
  - Avoid unnecessary terms, for example don’t use “successfully” in banners that confirm an action

- Informative:
  - Label the type of information in the body content
  - Sentence case: capitalize only the first word in the heading and proper
    nouns

<!-- usagelist -->

#### Do

Online store is password protected

#### Don’t

Your Online Store is now Password Protected

<!-- end -->

### Body content

Body content should:

- Be concise: keep content to 1 to 2 sentences where possible
- Clarify the benefit of the main task
- Be written in sentence case and use appropriate punctuation
- Avoid repeating the heading
- Explain how to resolve the issue, particularly for warning and critical
  banners

<!-- usagelist -->

#### Do

Your online store has a maximum of 20 themes. Delete unused themes to add more.

#### Don’t

You have reached your theme limit. Your online store has reached its maximum
of 20 themes. To add more themes, delete themes you’re no longer using.

<!-- end -->

### Button and links

Buttons and links should be:

- Clear and predictable: merchants should be able to anticipate what will
  happen when they click a button. Never deceive merchants by mislabeling a
  button.

<!-- usagelist -->

#### Do

Buy shipping label

#### Don’t

Buy

<!-- end -->

- Action-led: buttons should always lead with a strong verb that encourages
  action. To provide enough context to merchants use the {verb}+{noun} format on
  buttons except in the case of common actions like Save, Close, Cancel, or OK.

<!-- usagelist -->

#### Do

Activate Apple Pay

#### Don’t

Try Apple Pay

<!-- end -->

- Scannable: avoid unnecessary words and articles such as the, an, or a.

<!-- usagelist -->

#### Do

Add menu item

#### Don’t

Add a menu item

<!-- end -->

Link text should:

- Set the expectation of where merchants will be taken

<!-- usagelist -->

#### Do

Order #001

#### Don’t

Order

<!-- end -->

- Use consistent content to label navigation. For example, if a navigational
  link leads to a page called Orders, label the link Orders.

<!-- usagelist -->

#### Do

Payments

#### Don’t

Finance section

<!-- end -->

### Secondary body content

Body content should be:

- Actionable: start sentences with imperative verbs when telling merchants
  what actions are available to them (especially something new). Don’t use
  permissive language like “you can”.

<!-- usagelist -->

#### Do

Get performance data for all your sales channels.

#### Don’t

Now you can get performance data for all your sales channels.

<!-- end -->

- Structured for merchant success: always put the most critical information
  first.
- Clear: use the verb “need” to help merchants understand when they’re required
  to do something.

<!-- usagelist -->

#### Do

To buy a shipping label, you need to enter the total weight of your shipment,
including packaging.

#### Don’t

To buy a shipping label, you must enter the total weight of your shipment,
including packaging.

<!-- end -->

---

## Examples

### Default banners

- Use to convey general information or actions that aren’t critical. For example, you might show a banner that asks for merchant feedback.
- Default banners contain lower priority information and should always be dismissible.

```jsx
<Banner title="Order archived" onDismiss={() => {}}>
  <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
</Banner>
```

<!-- content-for: android -->

![Default banner for Android](components/Banner/android/default.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Default banner for iOS](components/Banner/ios/default.png)

<!-- /content-for -->

### Dismissible banner

<!-- example-for: web -->

Make all banners dismissible, unless they contain critical information or an important action that merchants are required to take.

```jsx
<Banner onDismiss={() => {}}>
  <p>
    Use your finance report to get detailed information about your business.{' '}
    <Link url="">Let us know what you think.</Link>
  </p>
</Banner>
```

### Banner with footer call-to-action

Use when you want merchants to take an action after reading the banner.

```jsx
<Banner
  title="Some of your product variants are missing weights"
  status="warning"
  action={{content: 'Edit variant weights'}}
  onDismiss={() => {}}
>
  <p>
    Add weights to show accurate rates at checkout and when buying shipping
    labels in Shopify.
  </p>
</Banner>
```

<!-- content-for: android -->

![Banner with footer call-to-action for Android](components/Banner/android/footer-action.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Banner with footer call-to-action for iOS](components/Banner/ios/footer-action.png)

<!-- /content-for -->

### Informational banners

Use to update merchants about a change or give them advice.

```jsx
<Banner
  title="USPS has updated their rates"
  action={{content: 'Learn more'}}
  status="info"
  onDismiss={() => {}}
>
  <p>Make sure you know how these changes affect your store.</p>
</Banner>
```

<!-- content-for: android -->

![Informational banner for Android](components/Banner/android/informational.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Informational banner for iOS](components/Banner/ios/informational.png)

<!-- /content-for -->

### Success banner

- Default to using toasts for success messages, unless the feedback is delayed, persistent, or has a call to action
- Include next steps if applicable

```jsx
<Banner
  title="Your shipping label is ready to print."
  status="success"
  action={{content: 'Print label'}}
  onDismiss={() => {}}
/>
```

<!-- content-for: android -->

![Success banner for Android](components/Banner/android/success.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Success banner for iOS](components/Banner/ios/success.png)

<!-- /content-for -->

### Warning banners

- Use to display information that needs attention or that merchants need to take action on
- Seeing these banners can be stressful for merchants so be cautious about using them

```jsx
<Banner
  title="Before you can purchase a shipping label, this change needs to be made:"
  action={{content: 'Edit address'}}
  status="warning"
>
  <List>
    <List.Item>
      The name of the city you’re shipping to has characters that aren’t
      allowed. City name can only include spaces and hyphens.
    </List.Item>
  </List>
</Banner>
```

<!-- content-for: android -->

![Warning banner for Android](components/Banner/android/warning.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Warning banner for iOS](components/Banner/ios/warning.png)

<!-- /content-for -->

### Critical banners

- Use to communicate problems that have to be resolved immediately for merchants to complete a task
- For example, you will show this banner for orders with high fraud risk
- Seeing these banners can be stressful for merchants so be cautious about using them

```jsx
<Banner
  title="High risk of fraud detected"
  action={{content: 'Review risk analysis'}}
  status="critical"
>
  <p>
    Before fulfilling this order or capturing payment, please{' '}
    <Link url="">review the Risk Analysis</Link> and determine if this order is
    fraudulent.
  </p>
</Banner>
```

<!-- content-for: android -->

![Critical banner for Android](components/Banner/android/critical.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Critical banner for iOS](components/Banner/ios/critical.png)

<!-- /content-for -->

### Banner in a modal

<!-- example-for: web -->

Banners inside of modals render with less spacing and a pared-back design to fit within a content context.

```jsx
class ModalExample extends React.Component {
  state = {
    active: false,
  };

  render() {
    const {active} = this.state;

    return (
      <div style={{height: '500px'}}>
        <Button onClick={this.handleChange}>Open</Button>
        <Modal
          open={active}
          onClose={this.handleChange}
          title="Reach more shoppers with Instagram product tags"
          primaryAction={{
            content: 'Add Instagram',
            onAction: this.handleChange,
          }}
          secondaryActions={[
            {
              content: 'Learn more',
              onAction: this.handleChange,
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              <Banner action={{content: 'Connect account'}} status="warning">
                <p>
                  Connect your instagram account to your shop before proceeding.
                </p>
              </Banner>
              <p>
                Use Instagram posts to share your products with millions of
                people. Let shoppers buy from your store without leaving
                Instagram.
              </p>
            </TextContainer>
          </Modal.Section>
        </Modal>
      </div>
    );
  }

  handleChange = () => {
    this.setState(({active}) => ({active: !active}));
  };
}
```

### Banner in a card

<!-- example-for: web -->

Banners inside of cards render with less spacing and a pared-back design to fit within a content context.

```jsx
<Card title="Online store dashboard" sectioned>
  <TextContainer>
    <Banner onDismiss={() => {}}>
      <p>
        Use your finance report to get detailed information about your business.{' '}
        <Link url="">Let us know what you think.</Link>
      </p>
    </Banner>

    <p>View a summary of your online store’s performance.</p>
  </TextContainer>
</Card>
```

---

## Related components

- To inform merchants about a new feature or opportunity, [use callout cards](/components/structure/callout-card)
- To group similar concepts together in the interface, [use a card](/components/structure/card)
