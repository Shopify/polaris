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

## Best practices

The account component should:

- Be placed at the top of the Account page for the relevant sales channel
- Identify the name of the platform or service merchants can connect to
- Show whether the account is connected or disconnected so that merchants can easily connect or disconnect an account
- Include a link to the relevant sales channel or platform terms and conditions,
  including information about any charges or fees that merchants may incur by
  using the channel or platform
- Link to terms and conditions, which should open up on the sales channel
  developer’s website in a new browser window

---

## Content guidelines

### Heading

The account connection heading should state the name of the platform or service
merchants will connect to, followed by the word “account”.

#### For example:

- Facebook account
- Mailchimp account
- Instagram account

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

- By clicking Connect, you agree to accept Sample’s terms and conditions.
- You’ll pay a commission rate of 15% on sales made through Sample.

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

---

## Examples

### Default account connection

Use to let merchants connect or disconnect their store to their third-party accounts (e.g. Facebook).

```jsx
class AccountConnectionExample extends React.Component {
  state = {
    connected: false,
    accountName: '',
  };

  render() {
    const {accountName, connected} = this.state;
    const buttonText = connected ? 'Disconnect' : 'Connect';
    const details = connected ? 'Account connected' : 'No account connected';
    const terms = connected ? null : (
      <p>
        By clicking <strong>Connect</strong>, you agree to accept Sample App’s{' '}
        <Link url="Example App">terms and conditions</Link>. You’ll pay a
        commission rate of 15% on sales made through Sample App.
      </p>
    );

    return (
      <AccountConnection
        accountName={accountName}
        connected={connected}
        title="Example App"
        action={{
          content: buttonText,
          onAction: this.handleAction,
        }}
        details={details}
        termsOfService={terms}
      />
    );
  }

  handleAction = () => {
    this.setState((state) => {
      const connected = !state.connected;
      const accountName = connected ? 'Jane Appleseed' : '';

      return {
        connected,
        accountName,
      };
    });
  };
}
```

---

## Accessibility

<!-- content-for: web -->

See accessibility guidance for the [setting toggle component](/components/actions/setting-toggle) to turn connections on and off.

<!-- /content-for-->
