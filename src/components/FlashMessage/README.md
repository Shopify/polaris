---
name: FlashMessage
tags:
  -
category:
---

# Flash

Flash messages provide quick, at-a-glance feedback on the outcome of an action.

## Problem

Merchants may be unsure whether an action they’ve taken has been successful.

## Solution

Flash message appears at the bottom of the interface to quickly and contextually confirm the status of an action to merchants.

## API
| Prop  | Type  | Required |
| --- | --- | ---|
| children | React.ReactNode | No |
| dismissable | boolean | No |
| duration | number | Yes |
| error | boolean | No |
| onDismiss | function | No |

### Basic example

```tsx
<FlashMessage
  dismissible={dismissible}
  error={error}
  duration={flashDuration}
  onDismiss={this.handleDismissal}
>
  {children}
</FlashMessage>
```
