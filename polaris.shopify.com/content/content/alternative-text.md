---
title: Alternative text
description: Alternative text (alt text) helps provide an inclusive experience for merchants who use screen readers.
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
  - blind
---

Alt text is a text replacement for an image. Generally, it is represented by the alt HTML element attribute `alt="alt text"`.

Often used by people with low or loss of vision, screen readers announce alt text to explain images. Alt text also displays if images fail to download (for example, there’s an unstable or low-bandwidth network connection).

Alt text should:

- Help visitors navigate the site
- Provide an inclusive experience
- Be as short and specific as possible
- Be contextual to the intended message

---

## Alt text for images

Use alt text when the image conveys valuable information, such as the ability to play a demo video. Even if an image isn’t conveying meaningful information, don’t leave an `<img>` tag without an alt text element. The screen reader may try to read the filename and create a negative experience. Instead, let the screen reader know to ignore the image by setting the alt to an empty string.

All `<img>` tags need an alt text attribute, even if it’s empty. For example, set an empty alt text attribute using `<img alt="" />`.

<!-- dodont -->

#### Do

```jsx
<VideoThumbnail accessibilityLabel="Watch how-to video on Shopify reports." />

<Thumbnail alt="Black choker necklace" />

<Icon accessibilityLabel="" />
```

#### Don’t

```jsx
<VideoThumbnail accessibilityLabel="Screenshot 2022-11-07 at 3.05.55 PM" />

<Thumbnail alt="Sneaker.png" />

<Icon accessibilityLabel="IMG_1206.heic" />
```

<!-- end -->

---

## Writing alt text

Always write alt text in plain text. The average rate of listening to a screen reader is 3x slower than that of an average visual reader. Many screen reader users listen at fast speeds to make up time. When writing alt text, be as brief as possible.

- Be concise. Think about how to write for a small amount of space or a character limit.
- Use simple words. If you’re stuck on how to replace a complicated word, check this [A-Z list of alternative words](https://www.plainenglish.co.uk/the-a-z-of-alternative-words.html) or these [plain language tips](/content/product-content#write-for-a-7-grade-reading-level). Another good resource is the [Hemingway editor](https://hemingwayapp.com/).
- Avoid needless words. If a phrase is still understandable without a specific word, remove it.
- Remove articles like "a, an, one of," etc. whenever possible. Alt text has different grammatical rules. "Filler words" that assist understanding in speech can get in the way in alt text.
- Avoid using "image of" or "photograph" unless the type of image is relevant to the context. Screenreaders already announce images with use of the `<img>` attribute.
- Avoid punctuation like `!!` and emoji like 🥰. Screen readers will announce these as "exclamation point, exclamation point" and "smiling face with three hearts."
- Only use acronyms you are confident your audience will understand. If using an acronym, write it with spaces in-between, like "Y M C A." Otherwise, most screen readers will try to read the acronym as a word.
- Write in the [active voice](/content/grammar-and-mechanics#basics) when possible.

---

## Alt text in context

It can be tricky to decide whether an image needs alt text or should be ignored by screen readers. Ask yourself:

- Is it interactive?
- Does this image convey information that isn’t given elsewhere?
- Does the context of the image communicate anything?

The same image may have different alt text depending on what it conveys.

For example, if you’re using a photo of sneakers purely decoratively as the hero image for a blog, tell screen readers to skip it.

If you’re using the photo as an example of a certain type of sneaker mentioned in the blog, then convey relevant information about the image. For example, "High-top sneaker with gum soles."

But if you’re using this image in a product listing, ensure shoppers know the important details of what they are buying, such as "Converse Chuck Taylor All Star Classic Black."

### Situations that need alt text

#### Icons

[Icons](/components/images-and-icons/icon) that could be misinterpreted need an explanation, so use the Polaris `accessibilityLabel` prop or the `aria-label` HTML attribute. For interactive icons, don’t describe the image ("magnifying glass"). Instead, describe the action ("search").

```jsx
<Button accessibilityLabel="search" onClick={() => search()}>
  <Icon source={SearchMajor} accessibilityLabel="" />
</Button>
```

#### Actions

Write [clear and predictable](https://polaris.shopify.com/content/actionable-language#links) link text. If space constraints require you to write calls to action that are unclear where they take you (like "Learn more" and "Apply now"), give further indication of where merchants will be sent after they select.

```jsx
<Link
  url="https://www.shopify.com/protect"
  accessibilityLabel="Learn more about Fraud Protect"
>
  Learn more
</Link>
```

#### Complex images

Images with more complexity need some consideration. For example, groups of image elements can be described by a single text, rather than announcing each individual element.

```jsx
<div role="img" aria-labelledby="star_id">
  <Stack>
    <Icon source={StarFilledMinor} alt="">
    <Icon source={StarFilledMinor} alt="">
    <Icon source={StarFilledMinor} alt="">
    <Icon source={StarOutlineMinor} alt="">
    <Icon source={StarOutlineMinor} alt="">
  </Stack>
</div>
<div id="star_id">3 of 5 stars</div>
```

For more guidance, visit the W3C page on [complex images](https://www.w3.org/WAI/tutorials/images/complex/).

### Situations that don’t need alt text

Websites can sometimes be noisy for a screen reader user. While alt text is vital for an equal experience, the briefer you are, the happier your screen reader users will be. Avoid repetition and unnecessary announcements by setting `alt=""` in the scenarios that don’t need it.

#### Progress bars

Progress bars often present visual information that can also be found in the text, such as "Loading 53%." Continuously announcing that change is generally considered annoying.

#### Decorative elements

This is a broad category covering elements that are purely for aesthetic reasons, such as empty state illustrations, dividers, or hero images. If you’re unsure whether valuable information is lost, consider testing with people who regularly use a screen reader.

#### Images with adequate captions

Avoid adding repetitive alt text if an image has a caption that accurately reflects the information in the image, for example a photo of George Washington that is captioned "George Washington." If the image is presenting information that isn’t in the caption, consider adding it to the caption text. Only if this isn’t possible or appropriate should you add that information as alt text.

If the image has a longer description in the caption or following paragraph text, you can associate this description with the `aria-describedby` attribute.

#### Tracking images

Images that would not be visible to a sighted user should not be announced to screen-readers.

---

## Pronunciation and translation

Not only do we strive to make interactions with our products pleasant, but we want the listening experience for merchants to be positive, too. Always state the language of the page content with the HTML lang attribute. This will ensure pronunciation and translation tools will know what rules to use. If certain phrases are in a different language than the main content, you can also use the lang attribute in a `<p>` tag or similar.

Here’s a
[standard list of language attributes](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) that you can use in your document.

<!-- dodont -->

#### Do

```html
<html lang="en"></html>
<html lang="de"></html>
<html lang="pt-BR"></html>
```

#### Don’t

```html
<html></html>
```

<!-- end -->

---

## SEO

Besides screen readers, search engines also read alt text. Alt text helps increase image ranking results and site searchability outside of Shopify’s admin.

When accounting for SEO in your alt text:

- Use logical keywords (the words that people search for).
- Include relevant listing details, like if it is a limited edition or unique colorway.
- Describe the image, not what you want your audience to think.
- Don’t repeat your site name or brand name. Search engines will already associate your site with your images.
- Avoid reducing the relevance or clarity of the alt text just to insert a keyword.
- Never include unassociated lists of key words in the alt text. Instead, place those in your [meta description](https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page).

<!-- dodont -->

#### Do

```jsx
<Thumbnail alt="1460 Boot Limited Edition Oxblood Women's" />
```

#### Don’t

```jsx
<Thumbnail alt="shoes sneakers womens footwear girls sizes soles heels boots" />

<Thumbnail alt="Cool shoes for a night out or hot date" />
```

<!-- end -->

## Resources

For more information on coding and alt text standards, visit the
[Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/intro/wcag.php) or [WebAIM Alternative Text Guidelines](https://webaim.org/techniques/alttext/).

## Related components

The following Polaris components come props to set alt text or aria labels, along with specific guidance for their use:

- [Avatar](https://polaris.shopify.com/components/images-and-icons/avatar)
- [Button](/components/actions/button)
- [Icon](/components/images-and-icons/icon)
- [Link](https://polaris.shopify.com/components/navigation/link)
- [Thumbnail](https://polaris.shopify.com/components/images-and-icons/thumbnail)
- [Video Thumbnail](https://polaris.shopify.com/components/images-and-icons/video-thumbnail)
