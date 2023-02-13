---
title: Loading
description: Navigating the Shopify admin should be fast, meaningful, and focused. Intentional loading states deliver a continuous flow for merchants.
icon: RefreshMajor
keywords:
  - page loading
  - loading
  - load
  - performance
  - web performance
  - speed
  - focus
  - guidelines
  - principles
---

### Join the conversation!

Do you have ideas or feedback on how we can make these guidelines more empowering and useful? Please share your thoughts in the [GitHub discussion](https://github.com/Shopify/polaris/discussions/5976).

---

## Principles

- **Make it fast.** Plan and prioritize the loading to make it as short as possible.
- **Make good use of time.** Give merchants useful structure and content.
- **Focus on the job.** Put merchants' attention on what's important.

---

## Make it fast

We can speed up loading by planning how much data we load and when we load it. Figure out what content merchants will need first, and make it available as soon as possible.

### Cache commonly needed data

Caching data eliminates the loading time the next time it's needed. Consider caching data that is reused throughout an experience, such as the name and image of an item, and use that to show essential content while other content loads.

### Prefetch relevant data

Prefetching data can save valuable loading time. Start prefetching when merchants show intent to need the data, such as when hovering over an interactive element.

### Prioritize viewport content

The content that is visible in the viewport is the content that merchants will likely need first. Make sure that such content isn't delayed by content that merchants won't need until after an interaction, such as scrolling or clicking a popover.

### Limit page content

Pages with a lot of content take longer to load. By limiting the page to meaningful content that merchants will need, we can speed up the loading and declutter the page. Use progressive disclosure to give merchants more content when they need it, and use [pagination](/components/navigation/pagination) to limit long lists. Remember to prefetch the data so that it's readily available.

## Make good use of time

Merchants use the Shopify admin to get work done. Showing the right context, real page structure, and meaningful content will keep them engaged and prepare them for what’s to come.

### Switch to the next view quickly

People expect to get the result of their interaction right away. When merchants navigate to a new page or view, it’s typically best to move toward that context immediately, rather than load first and switch later. Sometimes that means reverting to the previous view in case of errors, but it’s often a reasonable tradeoff when success is the most common outcome.

### Use highly accurate loading layouts

The page layout during loading should allow merchants to scan and understand the page structure. Matching layouts set clear expectations and make merchants proactive. Mismatched layouts confuse merchants and waste their time. Test skeleton content with different breakpoints and make sure both the content and the layout represents the final state.

### Show real content

Showing static content, such as section labels, icons, text, and imagery, gives merchants a head start in understanding the page. A small thing like a labeled card can enable them to anticipate what they need almost immediately. It’s important that we make an effort to show as much real content as possible.

### Show active controls

Ideally, controls are rendered active so merchants can take action before the page is done loading. For example, when a primary action like "Add product" is the same everywhere, then you could include it in the loading state.

Controls can often be rendered active even when the data behind it hasn’t finished loading. Many times it will be done by the time the merchant interacts with it, and if not, show that it needs to finish loading then. Render it inactive only if it mustn’t be interacted with, but use that as a last resort.

### Give hints with recognizable placeholders

Placeholders let merchants anticipate content type and location. Use placeholders for visually distinct elements, such as lists, images, controls, text, and data visualizations. This is the most important job [skeleton content](/components/feedback-indicators/skeleton-body-text) can do. Don’t use placeholders for content that could be rendered.

Avoid details in the placeholder that may not appear. We don't want to draw attention to it and set false expectations.

## Focus on the job

The task and the content must always be the focus. Confusion and visual noise will distract merchants and waste their time.

### Give clear feedback on the interaction

Loading is typically a consequence of merchants navigating to a new page or view. If it's unclear that their initializing interaction worked, then the experience will start with doubt and confusion.

When the interaction feedback is clear, then the interaction is a thing of the past and they can make better use of their time. Make sure that the feedback is noticeable within 100 milliseconds and that it's clear what happened.

### Show real loading progress

The best way to inform people that the system is working is to show real progress. Real progress puts people’s attention on the content while providing something useful to work with.

Progress within 1 second is perceived as natural and continuous, which keeps people engaged in the task. When actual progress can be shown within 1 second intervals, merchants typically don't need any other loading indicators.

### Make the layout visually stable

It's very important that the layout doesn't unexpectedly change during the loading process. Merchants will engage with visible content, and unexpected change can confuse or cause them to misclick. Pay attention to layout shifts throughout loading, find out what causes them, and make an effort to remove them. Sometimes we can wait to render some layout until it’s certain it will stay put. Learn more about layout shift and visual stability on [web.dev](https://web.dev/cls/).

### Minimize visual noise

Merchants get distracted by things changing on the screen. Pay attention to anything that changes during loading. Categorize the change as signal or noise, and use the following tips to address it.

- **Remove avoidable visual noise.** For example, fix poorly matching placeholders or plan for unexpectedly appearing content.
- **Subdue visual noise that is unavoidable.** This includes using transitions to make state changes less sudden such as fading in an image that might render late. When an element’s size is unknown, such as a product index with a variable number of items, then it's typically better to add too many placeholder items than too few. It's less jarring when elements suddenly shrink than when they suddenly expand.
- **Emphasize the visual change that matters.** Animate items in a list or the most important information on the screen. Emphasizing important content will guide merchants' attention to what they want, while also increasing tolerance for other visual changes.

### Use spinners when real progress isn't enough

Use spinners when it’s not clear that the system is working, but only when it will improve the user experience. Excessive use of loading indicators isn’t informative. Rather, it can be overwhelming and make the system appear slow.

### Avoid using spinners as placeholders

Default to using more meaningful content where possible. If spinners are needed, place them where it’s easy for merchants to understand what is loading. This helps drawing attention to the content that is about to appear and not to the spinner itself.

### Avoid empty views with spinners

It's important to provide useful content during loading. Being in the right visual context, seeing progress, or getting a glimpse of what's ahead can go a long way. Empty views with spinners provide low value and cause merchants to become passive and disengage.

### Be honest about lengthy loading times

People are likely to be frustrated and abandon their tasks if loading times exceed 10 seconds. In such cases, it's better to set clear expectations and empower merchants to make an informed decision to wait. Put their attention on the value ahead to increase the likelihood that they stay engaged in the task.
