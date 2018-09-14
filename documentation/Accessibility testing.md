# Accessibility testing for Polaris

We want Polaris and Shopify to be as accessible as possible. A large part of this is making sure that Polaris components can meet Level A and Level AA success criteria of the [Web Content Accessibility Guidelines (WCAG 2.1)](https://www.w3.org/TR/WCAG21/).

**Looking for more information about accessibility? See our [accessibility overview](https://github.com/Shopify/polaris-react/blob/master/documentation/Accessibility.md)**.

## Automated testing

Pull requests to Polaris are reviewed using [Pa11y CI](https://github.com/pa11y/pa11y-ci) to identify simple-to-fix accessibility issues related to semantic markup, [Accessible Rich Internet Applications (ARIA)](https://www.w3.org/TR/wai-aria-1.1/), and styles. You can also run [Pa11y](https://github.com/pa11y/pa11y) locally before you submit your pull request.

## Manual testing

Many accessibility tests can’t be automated, so you’ll want to do some manual testing on Playground content as well. This checklist includes items that will likely not be caught by Pa11y, but doesn’t include items reliant on specific content or language.

Refer to the full [WCAG 2.1](https://www.w3.org/TR/WCAG21/) recommendation (and any other guidelines required) for all considerations that may impact your project.

The [Polaris style guide](https://polaris.shopify.com/) also provides guidelines for usability and consistency that should be considered.

### Manual testing checklist

#### Structure

- Content is marked up appropriately. ([1.3.1 Info and Relationships](https://www.w3.org/TR/WCAG21/#info-and-relationships))
  - Content that users should access is in HTML.
  - Content that should be available to users does not have `aria-hidden="true"`, `visibility: hidden`, or `display: none` applied.
  - Semantic elements (`<header>`, `<nav>`, etc.) are used if appropriate.
  - Links are used for navigation and buttons are used to submit data.
  - HTML tables mark up tabular data.
- Accessible names, roles, states, and properties are conveyed clearly to assistive technologies. ([4.1.2 Name, Role, Value](https://www.w3.org/TR/WCAG21/#name-role-value))
  - Controls that have different states, properties, or values convey them programmatically.
  - Complex features that rely on ARIA are built according to the [ARIA 1.1 recommendation](https://www.w3.org/TR/wai-aria-1.1/) and the [ARIA 1.1 authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/).
  - Complex features have been tested with assistive technologies. Support for the following should be considered:
    - VoiceOver with Safari on macOS and iOS
    - NVDA with Firefox on Windows 10
    - TalkBack with Chrome on Android

#### Visuals

- Color alone is not used to distinguish features or convey information. ([1.4.1 Use of Color](https://www.w3.org/TR/WCAG21/#use-of-color))
  - Features use text or icons in addition to color to convey meaning.
  - User interface components and states that rely on background color or border color have visual indicator visible to [Windows High Contrast](https://support.microsoft.com/en-us/help/13862/windows-use-high-contrast-mode) users.
- Text has a color contrast of 4.5:1 against backgrounds, including gradients and images. ([1.4.3 Contrast (Minimum)](https://www.w3.org/TR/WCAG21/#use-of-color))
- Text can be resized by 200%. ([1.4.4 Resize text](https://www.w3.org/TR/WCAG21/#resize-text))
- Interface components (like form field borders) and informative icons have a color contrast of 3:1 against backgrounds, including gradients and images. ([1.4.11 Non-text Contrast](https://www.w3.org/TR/WCAG21/#non-text-contrast))

#### Keyboard actions

- Interactive features can get focus and be be used with the keyboard. ([2.1.1 Keyboard](https://www.w3.org/TR/WCAG21/#keyboard))
  - Native features get [standard keyboard focus and inputs](https://webaim.org/techniques/keyboard/), with and without a screen reader running.
  - Custom, ARIA-based features can be used with the keystrokes recommended in the [ARIA authoring guidelines](https://www.w3.org/TR/wai-aria-practices-1.1/) with or without a screen reader running.
- Keyboard focus does not become trapped with no way to exit or close features, with or without a screen reader running. ([2.1.2 No Keyboard Trap](https://www.w3.org/TR/WCAG21/#no-keyboard-trap))
- Custom keyboard shortcuts using single letter keys can be turned off, remapped, and are only active when the relavant feature has focus. ([2.1.4 Character Key Shortcuts](https://www.w3.org/TR/WCAG21/#character-key-shortcuts))
- Keyboard focus moves in a logical path. ([2.4.3 Focus Order](https://www.w3.org/TR/WCAG21/#focus-order))
  - Focus follows the reading order.
  - Focus doesn’t go to off-screen content or disappear.
  - Focus isn’t set with positive `tabindex` values.
- Keyboard focus is visible and doesn’t move to content that remains hidden ([2.4.7 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible))
- Moving focus to an element does not cause a [change of context](https://www.w3.org/TR/WCAG21/#dfn-change-of-context). ([3.2.1 On Focus](https://www.w3.org/TR/WCAG21/#on-focus))

#### Dynamic content

- Features that are shown on hover/focus are persistent until hover/focus is removed or otherwise dismissed by the user. ([1.4.13 Content on Hover or Focus](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus))
- Features that are shown on hover are not hidden if the mouse pointer is moved to the feature itself. ([1.4.13 Content on Hover or Focus](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus))
- Features that automatically update or animate can be paused, stopped, or hidden by users. ([2.2.2 Pause, Stop, Hide](https://www.w3.org/TR/WCAG21/#pause-stop-hide))

#### Touch, mouse, and motion inputs

- Multi-point and path-based gestures are avoided unless they are essential to the feature. ([2.5.1 Pointer Gestures](https://www.w3.org/TR/WCAG21/#pointer-gestures))
- Down-events are not used to execute functions unless they can be aborted or undone before completion, or up-events reverse down-events. ([2.5.2 Pointer Cancellation](https://www.w3.org/TR/WCAG21/#pointer-cancellation))
- Features that are activated through motion can also be used with an interface, and can be turned off. ([2.5.4 Motion Actuation](https://www.w3.org/TR/WCAG21/#motion-actuation))
- Activating a control doesn’t cause a [change of context](https://www.w3.org/TR/WCAG21/#dfn-change-of-context) unless users are warned beforehand. ([3.2.2 On Input](https://www.w3.org/TR/WCAG21/#on-input))
  - Links that open new windows are conveyed with an icon that has a text alternative.

#### Interoperability

- Content can be accessed in portrait and landscape, unless the feature isn’t valid in more than one orientation. ([1.3.4 Orientation](https://www.w3.org/TR/WCAG21/#orientation))
- Content can reflow without two-direction scrolling. ([1.4.10 Reflow](https://www.w3.org/TR/WCAG21/#reflow))

#### Media support

- Image-based content supports text alternatives. ([1.1.1 Non-text Content](https://www.w3.org/TR/WCAG21/#non-text-content))
- Audio features support a text alternative. ([1.2.1 Audio-only and Video-only (Prerecorded)](https://www.w3.org/TR/WCAG21/#audio-only-and-video-only-prerecorded))
- Video features support text alternatives like an audio track or audio description. ([1.2.1 Audio-only and Video-only (Prerecorded)](https://www.w3.org/TR/WCAG21/#audio-only-and-video-only-prerecorded), [1.2.3 Audio Description or Media Alternative (Prerecorded)](https://www.w3.org/TR/WCAG21/#audio-description-or-media-alternative-prerecorded), [1.2.5 Audio Description (Prerecorded)](https://www.w3.org/TR/WCAG21/#audio-description-prerecorded))
- Captions are supported. ([1.2.2 Captions (Prerecorded)](https://www.w3.org/TR/WCAG21/#captions-prerecorded), [1.2.4 Captions (Live)](https://www.w3.org/TR/WCAG21/#captions-live))

## Found an issue?

If you’ve found an accessibility issue in an existing component, check the [**Accessibility** label](https://github.com/Shopify/polaris-react/issues?q=label%3AAccessibility) to make sure an issue has not already been logged. If you don’t find it, submit an issue.
