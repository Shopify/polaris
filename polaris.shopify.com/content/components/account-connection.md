---
title: Account connection
description: The account connection component is used so merchants can connect or disconnect their store to various accounts. For example, if merchants want to use the Facebook sales channel, they need to connect their Facebook account to their Shopify store.
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
examples:
  - fileName: account-connection-default.tsx
    title: Default
    description: Use to let merchants connect or disconnect their store to their third-party accounts, like Facebook.
---

## Best practices

The account component should:

- Be placed at the top of the Account page for the relevant sales channel
- Identify the name of the platform or service merchants can connect to
- Show whether the account is connected or disconnected so that merchants can easily connect or disconnect an account
- Include a link to the relevant sales channel or platform terms and conditions, including information about any charges or fees that merchants may incur by using the channel or platform
- Link to terms and conditions, which should open up on the sales channel developer’s website in a new browser window

---

## Content guidelines

### Title

The account connection title should be the name of the platform or service that merchants can connect to, followed by the word “account”. Write account connection titles in sentence case (capitalize the first word and proper nouns only).

#### For example:

- Facebook account
- Mailchimp account
- Instagram account

<!-- dodont -->

#### Do

- Facebook account
- Instagram account

#### Don’t

- Connect your Account
- Instagram Account

<!-- end -->

### Terms and conditions

Clearly link to your terms and conditions and let merchants know about any additional costs of your service.

<!-- dodont -->

#### Do

- By clicking Connect, you agree to accept Sample’s terms and conditions.
- You’ll pay a commission rate of 15% on sales made through Sample.

#### Don’t

Learn about terms, conditions, and payment details.

<!-- end -->

### Connect button

Always use the verb Connect in the button of the account connection component. When merchants click or tap “Connect” it should open up your platform or service’s authorization page in a new browser window.

<!-- dodont -->

#### Do

Connect

#### Don’t

Connect to app

<!-- end -->

---

## Accessibility

See accessibility guidance for the [setting toggle component](https://polaris.shopify.com/components/setting-toggle) to turn connections on and off.
