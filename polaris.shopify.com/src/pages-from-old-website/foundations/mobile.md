---
name: Foundations/Key considerations/Mobile
slug: mobile
icon: IconMobile
keywords:
  - a11y
  - native mobile design
  - mobile design principles
  - mobile native design principles
  - polaris for mobile native
  - iOS design principles
  - android native design principles
  - iOS native design principles
  - android design principles
  - native mobile user experience
  - mobile user experience design
  - mobile experience design principles
  - mobile best practices
  - mobile native best practices
  - mobile app design principles
  - app design principles
  - native app design principles
---

# Mobile

Teams often design for the web and adapt to mobile. When this happens, mobile ends up being an adaptation of the web instead of higher quality, personalized experiences. We should approach web and mobile native at the same time.

---

## Designing cross platform experiences

<!-- keywords: web and mobile experience, cross platform experience, multi device experience -->

It can be tempting to think that merchants only rely on the Shopify desktop app to run their store, yet a majority of workflows requires multiple applications and devices. To design a great cross-platform experience we need to understand how and where these workflows and tasks start and finish.

Think about:

- How the information flows between web, mobile, and apps
- What merchants do on each platform
- If the experience remains consistent and feels crafted
- Any embedded technologies that can be leveraged, like password managers, notifications, or haptic feedback

---

## Mobile web and mobile native

<!-- keywords: mobile browser, native app, native components, mobile web components -->

There are many differences between using Shopify in a mobile browser compared to a native app.

Mobile web is equivalent to using Shopify in a small browser window: the experience relies on web based components adapted to small viewports. The emphasis is put on making the layout and user interface functional.

A native experience is usually augmented by the platform’s native capabilities. In native apps, organizational schemes, navigation, motion, native components, notifications, and authentication, all contribute to making the mobile experience feel snappier, more polished, more personal, and less “web.”

Today, there’s a huge difference between creating a usable experience (mobile web) and crafting a more efficient and customized one (mobile native) for our audiences.

<!-- usageblock -->

#### Do

- Design mobile native experiences using native components
- Leverage device and native app capabilities
- Think about how the information flows between platforms
- Use deep linking when possible (which makes the mobile app open instead of the mobile browser)

#### Don’t

- Use mobile web components
- Use webviews as default destinations
- Redirect audiences to Shopify on mobile browsers (always send them to the app)

<!-- end -->

---

## Managing effort, fatigue, and friction on mobile

<!-- keywords: mobile, effort, fatigue, friction, mobile workflows, task completion, mobile friction   -->

A great mobile experience should feel intuitive, reliable, and rewarding. Effort and friction tend to build up easily on mobile devices and people are more likely to defer a task to later if it feels daunting.

Minimize effort and avoid unnecessary interactions and transitions to prevent friction and fatigue.

<!-- usageblock -->

#### Do

- Assess how gestures, actions, and interactions feel once connected
- Consider how often a workflow has to be performed
- Think about how much effort is needed to complete a task

#### Don’t

- Design lengthy experiences
- Create new patterns if not absolutely necessary
- Send audiences outside of the app to complete a workflow

<!-- end -->

---

## Information density

Information density on mobile lives at the intersection of design and usability best pratices.

### Lowering the information density

<!-- keywords: mobile information density, mobile native spacing, mobile native layout, iOS touch target, Android touch target -->

Mobile screens offer a fraction of the real estate available on desktops and laptops and there is rarely enough space to display all the information available. Carefully selecting what is essential will lower the information density, improve focus, and help people accomplish their tasks faster.

<!-- usageblock -->

#### Do

- Build the experience around the critical information and actions first.
- Avoid lengthy descriptions, competing calls to actions, and crowded views.
- Look for opportunities to shorten calls to action when the action is obvious. For example, if there is surrounding context on the screen, you can use “Save” instead of “Save product.”
- Refer to the spacing guidelines and the recommended [touch target sizes](/design/spacing).

#### Don’t

- Use custom spacing between components
- Design cramped views
- Give audiences too many options

<!-- end -->
