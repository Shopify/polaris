---
title: Alternative text
description: Shopify aims to provide an [inclusive experience](/foundations/accessibility). Alternative text (alt text) helps people with low or loss of vision use our products.
icon: ImageAltMajor
keywords:
  - speech synthesis
  - alt HTML element attribute
  - alt text attribute
  - screen reader
  - a11y
  - universal design
  - inclusivity
  - disability
  - disabilities
  - people with disabilities
  - persons with disabilities
  - accessible markup
  - accessible mark up
  - accessible code
  - diversity
  - diverse
  - vision trouble
  - visual impairments
  - color blind
  - hearing trouble
  - physical disabilities
  - physical functioning difficulty
  - cognitive disabilities
  - limited vision
  - loss of vision
  - low vision
  - inclusive experiences
  - alternative text
  - alt text
  - accessibility feedback
  - accessible components
---

Generally, alt text is text replacement for an image and is often represented by the alt HTML element attribute, `alt=""`, but is also used in other scenarios.

Screen readers announce alt text to explain images to people with low or loss of vision. Alt text is also displayed if images fail to download for some reason (for example, due to an unstable network connection).

Alt text should:

- Help visitors navigate the site
- Provide an inclusive experience
- Be as specific and concise as possible

---

## Alt text for images

All `<img>` tags need an alt text attribute, even if it’s empty. We need to let the screen reader know to ignore the image.

Empty alt text attribute for images: `<img alt="" />`

<!-- dodont -->

#### Do

Use alt text when the image conveys valuable information, such as the ability to play a demonstration video.

In this case, you would use:
`<img alt="Watch a video on how the Shopify reports section works." />`

#### Don’t

Use alt text when the image doesn’t add clarity to the task. In this case, leave the alt text attribute empty: `alt=""`

<!-- end -->

---

## Writing alt text

Alt text should always be written in plain text.

- Use the simplest words you can. Stuck on how to replace a complicated word? Check this [A-Z list of alternative words](https://www.plainenglish.co.uk/the-a-z-of-alternative-words.html) or these [plain language tips](/content/product-content#write-for-a-7-grade-reading-level).
- Avoid needless words. If you take out a word, is the phrase just as easy to understand? If yes, then cut that word.
- Write concisely. Thinking about how to write for a small amount of space is a good shortcut.
- Write in the [active voice](/content/grammar-and-mechanics#basics). Only use the passive voice if you want to hide who is doing the thing described.

---

## Situations that need alt text

### Icons

[Icons](/components/images-and-icons/icon) that could be misinterpreted need an explanation, so use the `aria-label` attribute.

```html
<button aria-label="Close" onclick="myDialog.close()">X</button>
```

### Actions

If space constraints require you to write calls to action without nouns, like “learn more” and “apply now”, give further indication of where merchants will be sent after they select.

```html
<a
  href="{cta-url}"
  aria-label="Learn more about opening an online store with Shopify"
  >Learn more</a
>
```

### Complex images

Images with a bit more complexity need more logic in the code.

```html
<div role="img" aria-labelledby="star_id">
  <img src="fullstar.png" alt="" />
  <img src="fullstar.png" alt="" />
  <img src="halfemptystar.png" alt="" />
</div>
<div id="star_id">3 of 5 stars</div>
```

---

## Pronunciation and translation

Not only are we striving to make interactions with our products pleasurable, we also want to try to make the listening experience for our merchants pleasant as well. The HTML lang attribute helps speech synthesis tools figure out pronunciation and translation tools figure out what rules to use.

<!-- dodont -->

#### Do

Indicate the language of the page. This example is for English.

```html
<html lang="en"></html>
```

#### Don’t

Fail to indicate the language of the page.

```html
<html></html>
```

<!-- end -->

Here’s a
[standard list of language attributes](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) that you can use in your document.

---

## SEO

Alt text is a good way to increase site searchability. This applies outside of Shopify’s admin.

- Use keywords (the words that people search for) logically
- Never reduce the relevance or clarity of the alt text just to insert a keyword

For a deeper dive into coding and alt text standards, visit the
[Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/intro/wcag.php).
