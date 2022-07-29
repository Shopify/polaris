## Make commerce better for _everyone!_

At Shopify, we want to create inclusive experiences for all our users. We don’t want to limit who can use our product, and who can access our merchant’s products. We should set a high standard for usability.

**Looking for a testing checklist before you submit a pull request? See our [accessibility testing guide](https://github.com/Shopify/polaris/blob/main/documentation/Accessibility%20testing.md)**.

Did you know that:

- ~3–10% of people worldwide have vision problems (low vision, no vision)
- ~4.5% of people worldwide have one form of colorblindness
- 8% have some mobility problems (for example may not be able to use a mouse or keyboard)
- 6% have cognitive disabilities (for example require clear instructions and well-ordered content)
- In Canada, vision loss is expected to increase nearly 30% by 2024

Overall:

- About 1 in 7 Canadians have a disability of some kind
- About 1 in 5 Americans have a disability of some kind
- About 1 in 7 people worldwide have a disability of some kind

Sources: [Summary Health Statistics for U.S.Adults: National Health Interview Survey, 2011 (PDF)](https://www.cdc.gov/nchs/data/series/sr_10/sr10_256.pdf), [Colour Blindness Awareness](http://www.colourblindawareness.org/colour-blindness/), [CDC: 53 million adults in the US live with a disability](https://www.cdc.gov/media/releases/2015/p0730-US-disability.html), [Accessible Canada - Creating new federal accessibility legislation: What we learned from Canadians](https://www.canada.ca/en/employment-social-development/programs/planned-accessibility-legislation/reports/consultations-what-we-learned.html#h2.2), [World Bank Disability Inclusion](https://www.worldbank.org/en/topic/disability)

## Accessibility 101

For those looking to skip ahead, check out our own **[best practices](#implementation-best-practices)**.

The technical standards for accessibility come from the Web Content Accessibility Guidelines (WCAG). For a number of years we’ve been working with [WCAG 2.0](https://www.w3.org/TR/WCAG20/), but as of June 2018, [WCAG 2.1](https://www.w3.org/TR/WCAG21/) is the new recommendation. WCAG is an ISO standard, too!

WCAG includes recommendations around how users, especially those with disabilities, expect to interact with websites, including complex web apps. These standards are designed to make websites work correctly with a wide variety of assistive technologies, such as screen readers, high contrast and magnification tools, speech recognition software, custom input devices. They also help to support users who have trouble with memory, attention, reading, color, information processing, and other similar issues.

If you work on mobile apps, you might want to take a look at the [Mobile Accessibility](https://www.w3.org/TR/mobile-accessibility-mapping/) guidelines related to WCAG. Vendor guidelines for Apple and Android apps also include accessibility recommendations and requirements.

There are a ton of resources to learn about accessibility in general. The following is a curated list of
the ones that are most readable, up-to-date, and relevant.

- [WebAIM Articles](https://webaim.org/articles/)
- [University of Washington Accessible Technology](https://www.washington.edu/accessibility/web/)
- [A11y Project](https://a11yproject.com/)

It’s also important to think about accessibility as a design and usability issue, not just a technical issue. [We Are the Original Lifehackers](https://www.nytimes.com/2018/05/30/opinion/disability-design-lifehacks.html) outlines how design is improved when people with disabilities participate.

## Implementation best practices

- Color contrast should be sufficient
  - light text on light backgrounds can be very difficult to read (for example outside on a sunny day, on a glossy monitor, after staring at a screen all day)
  - check contrast [with Tanaguru Contract-Finder](http://contrast-finder.tanaguru.com/) or a similar tool and aim for a ratio as close as possible to **4.5** — this includes **copy**, **headings**, and **form fields**
  - all should **stand out** from the background — be especially careful when setting text against a noisy background image
- HTML is valid and semantically correct
  - heading levels follow hierarchy (`<h1>` > `<h2>` > `<h3>`)
  - all form inputs have a valid label — `<label for="INPUT_ID">` or fallback
  - if not pointing to a URL, use a `<button type="button">` element for your interactive controls
    - see [this article on buttons versus links for more context](https://ux.shopify.com/semantic-html-the-unbearable-rightness-of-being-9b3c493e1791)
- Strive to make features work with a keyboard alone
  - keep focus outlines on links and toggles, without these, it is **impossible** for keyboard users to navigate — the outline can be customized if the default style isn’t preferred, though keep in mind that the default comes for free!
  - update focus as new content is revealed (for example auto-scrolling to new page section, updating filtered results, opening a modal window)
  - bind <kbd>esc</kbd> to quickly cancel modals, popups, and similar interactions
  - put your mouse away, what happens? At the very least, the site must be navigable, forms can be manipulated and submitted
  - whatever happens on **hover**, should also happen on **focus** — this includes styles and JavaScript functionality
- Don’t make users guess what to do next when it comes to forms — have clear, informative error states that detail next steps
- Icon-only buttons should have screen reader friendly titles so they make sense

  ```html
  <button class="icon icon-close" type="button">
    <span class="visuallyhidden">Close Menu</span>
  </button>
  ```

- Meaningful content isn’t hidden inside `<img>`, or `:before` `:after` elements which are unavailable to screen readers
- Any ARIA roles **must** be tested on [Voiceover](https://gist.github.com/mpiotrowicz/f1cb5e2288386f19f51d) & [NVDA](https://gist.github.com/svinkle/a4efd704837e90adc928) before shipping
  - if not tested, we don’t know if they’re helpful or not
  - if unsure, ask for help or **leave it out**, ARIA that’s untested can make things worse
  - you should automatically check for issues using a tool like [WAVE](https://wave.webaim.org/) in order to validate the WCAG compliance
  - tips on NVDA with VMWare [1](http://www.paciellogroup.com/blog/2013/08/insert-key-usage-in-windows-on-a-mac/), [2](https://www.marcozehe.de/2015/06/07/how-to-map-your-macs-capslock-key-to-a-nvda-or-jaws-key-in-a-windows-virtual-machine/)
- **All of the above** counts for **mobile** as well — iOS and macOS have VoiceOver built in, and there are many [awesome apps](http://www.bemyeyes.org/) that create new possibilities for the blind
  - for more on accessibility and mobile, see the [WebAIM screen reader survey on mobile](http://webaim.org/projects/screenreadersurvey5/#mobile)

## Testing

Curious about testing yourself? The best thing is to manually test your pages with a keyboard only and fire up a screen reader to test for yourself. Automated tools can be useful but are usually for catching trends and low-hanging fruit like missing alt attributes. Here are a few recommended testing frameworks:

- [tota11y](https://khan.github.io/tota11y/)
- [Tenon.io](https://tenon.io)
- [WAVE](https://wave.webaim.org/toolbar/)
- [pa11y](https://github.com/pa11y)

## Tools and resources

### Test tools

- Introduction to using [Voice Over (built-in screen reader on MacOS and iOS)](https://help.apple.com/voiceover/info/guide/10.12/#/vo7e30a848e8)
- Introduction to using [NVDA (free screen reader for Windows)](https://gist.github.com/svinkle/a4efd704837e90adc928)
- Recommended color contrast tools:
  - [Accessible Color Palette](http://colorsafe.co/)
  - [Contrast Ratio Checker](http://leaverou.github.io/contrast-ratio/)
- [More screen reader intros and other related tools](http://a11yproject.com/resources.html)

### Patterns and design systems

- [Design considerations](http://webaim.org/resources/designers/)
- [Common UI patterns, built with accessibility](https://a11yproject.com/patterns)

### Books and online courses

- [_Apps For All: Coding Accessible Web Applications_ by Heydon Pickering](https://shop.smashingmagazine.com/products/apps-for-all)
- [_A Web for Everyone_ by Sarah Horton and Whitney Quesenbery](http://rosenfeldmedia.com/books/a-web-for-everyone/)
- [_A Pocket Guide to Colour Accessibility_ by Geri Coady](http://www.fivesimplesteps.com/products/colour-accessibility)
- [_Design for Real Life_ by Eric Meyer and Sara Wachter-Boettcher](https://abookapart.com/products/accessibility-for-everyone)
- [UX Foundations: Accessibility](https://www.lynda.com/Accessibility-tutorials/Foundations-UX-Accessibility/435008-2.html) on Lynda.com
- [Accessibility for Web Design](https://www.lynda.com/Web-Design-tutorials/Accessibility-Web-Design/606090-2.html) on Lynda.com
- [Bookmarklet for testing accessibility requirements](http://squizlabs.github.io/HTML_CodeSniffer/)

### Mobile resources

- [Human Interface Guidelines: iOS: Accessibility](https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/accessibility/)
- [Accessibility Programing Guide for iOS](https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/iPhoneAccessibility/Introduction/Introduction.html)
- [Material Design (for Android and iOS): Accessibility](https://material.io/design/usability/accessibility.html)
- [Basic Android Accessibility : making sure everyone can use what you create!](https://codelabs.developers.google.com/codelabs/basic-android-accessibility/index.html?index=..%2F..%2Findex#0)

## Legal

For regulations around the world. These are long documents often written in legal-ese, not recommended as a place to learn about accessibility, but valuable for anyone interested in regulation and how it can be used and abused.

- [AODA](https://www.ontario.ca/page/accessibility-laws) - Ontario’s legal requirement for accessibility for all public websites
- [ADA](https://www.ada.gov/) - The US’s Americans with Disabilities Act
- [Section 508](http://www.section508.gov/) - US regulation for accessibility for technologies used in government
- [Intro to WCAG](http://www.w3.org/WAI/intro/wcag) - Global W3C checklist for accessibility (if you’re very curious!)
- [Compliance Isn’t Enough](http://www.karlgroves.com/2015/01/06/to-hell-with-compliance/) - Article putting legal requirements in perspective
- Some litigation examples and articles:
  - [List of Web Accessibility-Related Litigation and Settlements](http://www.karlgroves.com/2011/11/15/list-of-web-accessibility-related-litigation-and-settlements/)
  - [Disability Lawsuits Against Small Businesses Soar](http://www.wsj.com/articles/disabled-access-new-legal-push-1413411545)
  - [U.S. Aims To Speed Up The Internet For The Disabled](http://www.npr.org/2015/03/07/391435879/u-s-aims-to-speed-up-the-internet-for-the-disabled)
  - [DOJ affirms “longstanding position that the #ADA applies to websites of public accommodations”](https://twitter.com/LFLegal/status/614231627040821248)
