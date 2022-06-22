---
name: Interaction states
keywords:
  - visual patterns
  - color strategy
  - interaction states
  - hover
  - focus
  - active
  - selected
  - disabled
  - subdued
  - state
---

# Interaction states

Interaction states communicate the status of an element in the interface, establish confidence once an action is taken, and suggest the ability (or inability) to interact with the element.

<!-- showcasecontent -->

![A collection of buttons in different states](/public_images/design/interaction-states/interaction-states-intro@2x.png)

<!-- end -->

---

## Principles

<!-- keywords: interaction states guidelines, interaction states principles, be subtle but obvious, be consistent -->

### Be subtle, but clear

Successful interaction feedback is informative, not decorative. Avoid elaborate transitions that create visual noise or intense color changes. Distracting animation can create disturbance and make an interface unpleasant to use.

### Keep things consistent

Consistent treatments for interaction feedback create recognizable patterns. If an interaction produces different feedback across the Shopify admin, it deteriorates the integrity of the pattern and risks confusing merchants.

---

## Designing interaction states

<!-- keywords: interaction states use cases, where to use interaction states, signifiers, affordance, a11y, accessibility, behavior  -->

Keep in mind that merchants interact with interfaces differently depending which input device they’re using. Devices they may be using include:

### Input devices to consider

- Mouse
- Touch screen
- Keyboard
- Voice
- Game controller
- Refreshable braille display

To learn more, check out the [accessibility guidelines](/foundations/accessibility).

### Use signifiers

Provide merchants with cues as to what the interface will do if they interact with it. By using signifiers we set expectations about what components can do, which creates a more intuitive interface that’s easier to use. The types of signifiers include:

<!-- centeredcontent -->

![A "sort" button in a default state.](/public_images/design/interaction-states/interaction-states-explicit@2x.png)

**Explicit**, where content directs merchants to do the intended action, such as “Sort” or “Save.”

<!-- end -->

<!-- centeredcontent -->

![An "edit" button with its underline appearing when the mouse hovers above it.](/public_images/design/interaction-states/interaction-states-hidden@2x.png)

**Hidden**, where the clue isn’t revealed until the merchant interacts with it, such as hovering or using tab navigation to see if a button is clickable.

<!-- end -->

<!-- centeredcontent -->

![A "print packing slip" button that is grayed out and inactive.](/public_images/design/interaction-states/interaction-states-negative@2x.png)

**Negative**, where the action appears inactive (like the button is grayed out and doesn’t respond to hover) because it isn’t available for the merchant to use.

<!-- end -->

<!-- showcasecontent -->

![A toast component, a button with a spinner component and a text field component with an error message.](/public_images/design/interaction-states/interaction-states-behavior@2x.png)

### Behavior

**Use feedback indicators** like the [progress bar](https://polaris.shopify.com/components/feedback-indicators/progress-bar) component or the [spinner](https://polaris.shopify.com/components/feedback-indicators/spinner) component to let them know that the interface received their request. If appropriate, you can also provide added information about what or how long it will take to complete.

**For non-disruptive feedback** on the outcome of an action, use the [toast](https://polaris.shopify.com/components/feedback-indicators/toast) component.

**For an unsuccessful completion** that requires the merchant to take action, provide information about what prevented the action from completing successfully and what the merchant can do to fix the problem. For example, use the validation error state of the [text field](https://polaris.shopify.com/components/forms/text-field) component.

<!-- end -->

<div class="NextPage">
Next<br/>
<a href="/design/spacing#navigation">Spacing</a>
</div>
