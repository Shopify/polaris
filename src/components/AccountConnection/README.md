---
name: Account connection
category: Actions
keywords:
  - AccountConnection
  - connect
  - account
  - sign-up
  - default account connection
  - disconnection
  - authorize
  - third-party accounts
  - integrate
  - facebook
  - social media
---

# Account connection

The account connection component is used so merchants can connect or disconnect
their store to various accounts. For example, if merchants want to use the
Facebook sales channel, they need to connect their Facebook
account to their Shopify store.

---

## Purpose

Put the merchant first by identifying the problem they face and the component that helps them solve it.

### Problem

Merchants need a way to authorize their third-party accounts to integrate with their Shopify store.

### Solution

The account component gives merchants a consistent and secure way to authorize their accounts and control permissions.

---

## Best practices

The account component should:

* Be placed at the top of the Account page for the relevant sales channel
* Identify the name of the platform or service the merchant can connect to
* Show whether the account is connected or disconnected so that merchants can easily connect or disconnect an account
* Include a link to the relevant sales channel or platform terms and conditions,
including information about any charges or fees that a merchant may incur by
using the channel or platform
* Link to terms and conditions, which should open up on the sales channel
developer’s website in a new browser window

---

## Content guidelines

### Heading

The account connection heading should state the name of the platform or service
merchants will connect to, followed by the word “account”.

#### For example:

* Facebook account
* Mailchimp account
* Instagram account

<!-- usagelist -->

#### Do
Facebook account

#### Don’t
Connect your Account

<!-- end -->

Headings should be written in sentence case.

<!-- usagelist -->

#### Do
Instagram account

#### Don’t
Instagram Account

<!-- end -->

### Terms and conditions

Clearly link to your terms and conditions and let merchants know about any additional costs of your service.

<!-- usagelist -->

#### Do
By clicking Connect, you agree to accept Sample’s terms and conditions.
You’ll pay a commission rate of 15% on sales made through Sample.

#### Don’t
Learn about terms, conditions, and payment details.

<!-- end -->

### Connect button

Always use the verb Connect in the button of the account connection component. When merchants click or tap “Connect” it should open up your platform or service’s authorization page in a new browser window.

<!-- usagelist -->

#### Do
Connect

#### Don’t
Connect to app

<!-- end -->

| Prop | Type | Description |
| ---- | ---- | ----------- |
| title | React.ReactNode | Element containing title |
| details | React.ReactNode | Element containing details |
| termsOfService | React.ReactNode | Element containing terms of service |
| accountName | string | The name of the service |
| avatarUrl | string | URL for the user’s avatar image |
| connected | boolean | Set if the account is connected |
| action | Action | Action for account connection |

## Examples

### Default account connection component

Use to let merchants connect or disconnect their store to their third-party accounts (e.g. Facebook).

```jsx
<AccountConnection
  title="Example App"
  action={{
    content: 'Connect'
  }}
  details="No account connected"
  termsOfService={<p>By clicking <strong>Connect</strong>, you agree to accept Sample App’s <Link url="Example App">terms and conditions</Link>. You’ll pay a commission rate of 15% on sales made through Sample App.</p>}
/>
```
