# Accessibility testing for Polaris

We want Polaris and Shopify’s platform to be accessible for people with disabilities and impairments. A large part of this is making sure that Polaris components meet Level A and Level AA success criteria of the [Web Content Accessibility Guidelines (WCAG 2.1)](https://www.w3.org/TR/WCAG21/).

**Looking for more information about accessibility?** See our [accessibility overview](https://github.com/Shopify/polaris/blob/main/documentation/Accessibility.md).

## Automated testing

Running an automated tool like [Pa11y](https://github.com/pa11y/pa11y) locally before you submit your pull request is recommended.

## Manual testing

Many accessibility tests can’t be automated, so you’ll want to do some manual testing on Playground or Storybook content as well. This checklist includes items that will likely not be caught by Pa11y, but doesn’t include items reliant on specific content or language.

Refer to the full [WCAG 2.1](https://www.w3.org/TR/WCAG21/) recommendation (and any other guidelines required for your particular product) for all considerations that may impact your project.

The [Polaris style guide](https://polaris.shopify.com/) also provides guidelines for usability and consistency that should be considered.

### When to test

You don’t need to test everything all the time. Use this guide to decide what to test based on the changes or new features you’ve developed.

- If you’ve added content, see the [**Structure** section](#structure) and the [**Visuals** section](#visuals).
- If you have added interactive elements, see the [**Keyboard actions** section](#keyboard-actions).
- If you have added dynamic content or controls, see the [**Dynamic content** section](#dynamic-content).
- If you’re developing for mobile web, see the [**Touch and motion inputs** section](#touch-and-motion-inputs) and the [**Mobile layout** section](#mobile-layout).
- If you have added images, video, or audio, see the [**Media support** section](#media-support).

### Manual testing checklist

#### Structure

- Content is marked up appropriately. ([1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships))
  - Content that users should access is in HTML.
  - Content that should be available to users does not have `hidden`, `aria-hidden="true"`, `visibility: hidden`, or `display: none` applied.
  - Semantic HTML elements (`<header>`, `<nav>`, etc.) are used if appropriate.
  - Content is in a logical order to understand and use the feature.
  - Links are used for navigation and buttons are used to submit data.
  - HTML tables mark up tabular data.
  - Headings are in a logical order for the page section (`<h1>`, `<h2>`, etc.).

#### Visuals

- Color alone is not used to distinguish features or convey information. ([1.4.1 Use of Color](https://www.w3.org/TR/WCAG21/#use-of-color))
  - Features use text or icons in addition to color to convey meaning.
  - User interface components and states that rely on background color or border color have visual indicator visible to [Windows High Contrast](https://support.microsoft.com/en-us/help/13862/windows-use-high-contrast-mode) users.
- Informative content has a color contrast of 4.5:1 against backgrounds, including gradients and images. ([1.4.3 Contrast (Minimum)](https://www.w3.org/TR/WCAG21/#use-of-color))
  - Disabled control text is exempt.
- Text alone can be resized by 200% in the browser. ([1.4.4 Resize text](https://www.w3.org/TR/WCAG21/#resize-text))
- Interface components (like form field borders) and informative icons have a color contrast of 3:1 against backgrounds, including gradients and images. ([1.4.11 Non-text Contrast](https://www.w3.org/TR/WCAG21/#non-text-contrast))
  - Logos and decorative images are exempt.
  - Disabled controls are exempt.

#### Keyboard actions

- Interactive features can get focus and be be used with the keyboard. ([2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard))
  - Native interactive features get [standard keyboard focus and inputs](https://webaim.org/techniques/keyboard/), with and without a screen reader running.
  - Custom, ARIA-based features can be used with the keystrokes recommended in the [ARIA authoring guidelines](https://www.w3.org/TR/wai-aria-practices-1.1/) or those defined in the [Polaris style guide](https://polaris.shopify.com/), with or without a screen reader running.
- Keyboard focus does not become trapped with no way to exit or close features, with or without a screen reader running. ([2.1.2 No Keyboard Trap](https://www.w3.org/TR/WCAG21/#no-keyboard-trap))
  - Features like modals that capture focus on purpose can be dismissed with the keyboard (ideally with the <key>Escape</key> key as well as a visible, labeled, keyboard-accessible control) and manage focus to a logical place when they close.
  - Embedded content like iframes don’t trap focus.
- Custom keyboard shortcuts using single letter keys can be turned off or remapped, and are only active when the relavant feature has focus. ([2.1.4 Character Key Shortcuts](https://www.w3.org/TR/WCAG21/#character-key-shortcuts))
- Keyboard focus moves in a logical path. ([2.4.3 Focus Order](https://www.w3.org/TR/WCAG21/#focus-order))
  - Focus follows the reading order.
  - Focus doesn’t go off-screen to content that isn’t meant to be accessed.
  - Focus isn’t set with positive `tabindex` values.
  - Focus can move forward using <key>Tab</key> and backwards using <key>Shift</key> + <key>Tab</key>.
- When an element has keyboard focus, the focus indicator is visible ([2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible))
- Moving focus to an element does not cause a [change of context](https://www.w3.org/TR/WCAG21/#dfn-change-of-context). ([3.2.1 On Focus](https://www.w3.org/TR/WCAG21/#on-focus))
  - Inline content doesn’t display or hide.
  - Navigation doesn’t happen.
  - Control settings don’t change.

#### Dynamic content

- Features that are shown on hover/focus are persistent until hover/focus is removed or otherwise dismissed by the user. ([1.4.13 Content on Hover or Focus](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus))
- Features that are shown on hover are not hidden if the mouse pointer is moved to the feature itself. ([1.4.13 Content on Hover or Focus](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus))
- Features that automatically update or animate can be paused, stopped, or hidden by users. ([2.2.2 Pause, Stop, Hide](https://www.w3.org/TR/WCAG21/#pause-stop-hide))
  - Looping or autoplaying videos have an accessible button to pause or stop the video.
  - The `prefers-reduced-motion` query is supported for features that use CSS for animations.
- Activating a control doesn’t cause a [change of context](https://www.w3.org/TR/WCAG21/#dfn-change-of-context) unless users are warned beforehand. ([3.2.2 On Input](https://www.w3.org/TR/WCAG21/#on-input))
  - Links that open new windows are conveyed with an icon that has a text alternative.
- Accessible names, roles, states, and properties are conveyed clearly to assistive technologies. ([4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value))
  - Controls that have different states, properties, or values convey them programmatically.
  - Complex features that rely on ARIA are built according to the [ARIA 1.1 recommendation](https://www.w3.org/TR/wai-aria-1.1/) and the [ARIA 1.1 authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/), or guidelines provided in the [Polaris style guide](https://polaris.shopify.com/).
  - Complex features have been tested with assistive technologies. Support for the following should be considered:
    - VoiceOver with Safari on macOS and iOS
    - NVDA with Firefox on Windows 10
    - TalkBack with Chrome on Android

#### Touch and motion inputs

- Multi-point and path-based gestures are avoided unless they are essential to the feature. ([2.5.1 Pointer Gestures](https://www.w3.org/TR/WCAG21/#pointer-gestures))
  - Native gestures are used following specifications.
  - If you are designing custom gestures, keep it simple.
- When tapping a control, you should be able to hold, press, and drag your finger away without triggering the interaction. ([2.5.2 Pointer Cancellation](https://www.w3.org/TR/WCAG21/#pointer-cancellation))
- Features that are activated through motion can also be used with an interface, and can be turned off. ([2.5.4 Motion Actuation](https://www.w3.org/TR/WCAG21/#motion-actuation))

#### Mobile layout

- Content can be accessed in portrait and landscape, unless the feature isn’t valid in more than one orientation. ([1.3.4 Orientation](https://www.w3.org/TR/WCAG21/#orientation))
- Content can be resized to smaller breakpoints without triggering horizontal scrolling. ([1.4.10 Reflow](https://www.w3.org/TR/WCAG21/#reflow))
  - Content that can’t be resized without losing context, like tables, large images, or similar features, are exempt.

#### Media support

- Image-based content supports text alternatives. ([1.1.1 Non-text Content](https://www.w3.org/TR/WCAG21/#non-text-content))
  - Decorative images have `alt=""`.
  - Informative images have an `alt` value supplied.
  - SVGs rely on separate text equivalents, since they aren’t consistently conveyed by assistive tech.
  - In cases where an icon is used to convey the purpose of a control, the icon has a text equivalent that describes its purpose.
- Audio features support a text alternative. ([1.2.1 Audio-only and Video-only (Prerecorded)](https://www.w3.org/TR/WCAG21/#audio-only-and-video-only-prerecorded))
- Video features support text alternatives like an audio track or audio description. ([1.2.1 Audio-only and Video-only (Prerecorded)](https://www.w3.org/TR/WCAG21/#audio-only-and-video-only-prerecorded), [1.2.3 Audio Description or Media Alternative (Prerecorded)](https://www.w3.org/TR/WCAG21/#audio-description-or-media-alternative-prerecorded), [1.2.5 Audio Description (Prerecorded)](https://www.w3.org/TR/WCAG21/#audio-description-prerecorded))
- Captions are supported. ([1.2.2 Captions (Prerecorded)](https://www.w3.org/TR/WCAG21/#captions-prerecorded), [1.2.4 Captions (Live)](https://www.w3.org/TR/WCAG21/#captions-live))

## Found an issue?

If you’ve found an accessibility issue in an existing component, check the [**Accessibility** label](https://github.com/Shopify/polaris/issues?q=label%3AAccessibility) to make sure an issue has not already been logged. If you don’t find it, submit an issue.
