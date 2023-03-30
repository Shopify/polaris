import {State} from '@/types';

/*
  Automatically generated file (created by /api/editor.tsx).
  Do not edit by hand.
*/

const pages: State['pages'] = [
  {
    id: 'SIC6mp1SHvcUtS98_DTHb',
    title: 'Home',
    excerpt: '',
    slug: '',
    parentId: null,
    order: 0,
    layout: 'blocks',
    blocks: [],
    allowChildren: false,
    hideInNav: true,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'pJaIuMuWnC43w1avzXpTG',
    title: "What's new",
    excerpt: '',
    slug: 'whats-new',
    parentId: null,
    order: 0,
    layout: 'listing',
    blocks: [],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['news', 'update', 'changelog', 'releases'],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'JFmb4W5A_VgdjE0jdRbfI',
    title: 'Version 10 Typography',
    excerpt: 'Learn about what changes are coming to Polaris typography.',
    slug: 'version-10-typography',
    parentId: 'pJaIuMuWnC43w1avzXpTG',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'TuurGT0Yr-U-aIat6B_-Y',
        blockType: 'Markdown',
        content:
          "![Screen showing the new type styles](/images/type-updates-feature@2x.png)\n\n---\n\nThis is an Alpha release of the new type system. That means we’re making the new Text component and Figma text styles available but there could still be significant developments made. Our goal is to share the work so that you can: **understand what’s changing**, **start using the typography updates**, and **provide feedback to help us improve.**\n\n**_🚧 Please note: Since significant changes could still be made, please work with your team and the Polaris team to determine what's best for your situation._**\n\nWant more details? Let’s dive in!\n\n## Why are we making changes?\n\nAs more merchants use the Shopify admin to run their businesses, we need to evolve it to feel less like a website and more like a power tool. To do this, we need to establish a strong foundation at the center of our design system and typography plays an important role.\n\nEarlier this year, we invested a lot of time in [building up our design tokens](https://ux.shopify.com/putting-the-system-back-in-our-design-system-b2c55a392dea) as a first step in strengthening the foundation and increasing Polaris token coverage. After that release, we saw that there was still only ~8% coverage of typography in custom components in `shopify/web`. We discovered that teams were creating new components or hard coding css values for type to work around the system.\n\nHere are key reasons for this divergence:\n\n- A lack of flexibility in our 6 typography components (DisplayText, Heading, Subheading, Caption, TextStyle, and VisuallyHidden)\n- Little guidance on how to design with typography\n- A lack of range in font weights and sizes\n\nSimplifying our type components and improving our foundation will add the flexibility that will help product teams quickly make significant changes across Shopify’s admin.\n\n## What's changing\n\n### Type styles\n\nPolaris typography is getting a refresh. Currently, there are **4 Display**, **1 Heading**, **1 Subheading**, **1 Button**, **1 Body**, and **1 Caption** variants.\n\nThe updates will simplify type into two categories: **Heading** and **Body**. Each has a default set of variants along with a set of options to allow for flexibility and a wide range of applications within the UI.\n\n![Screen showing the differences between the new type styles and the old type styles](/images/type-new-to-old@2x.png)\n\n## Type scale\n\nWe’ve updated the type scale and we’re moving from two scales to one for both desktop and mobile web. Some values have been removed and others added to cover a wide range of uses in the UI.\n\nAll font sizes have a ratio of 1.2, known as the major third type scale. This means that each size is multiplied or divided by 1.2 from the previous size, starting with the base size, and rounded to a multiple of 4px. For example, if I take my base value of 14px and multiply it by 1.2, I get a value of 16px as the next increment in the scale.\n\n| New scale | Old scale |      |\n| --------- | --------- | ---- |\n| 12px      | 12px      | 13px |\n| 14px      | 14px      | 15px |\n| 16px      | 16px      | 16px |\n| 20px      | 20px      | 17px |\n| 24px      | 26px      | 21px |\n| 28px      | 28px      | 24px |\n| 32px      | 42px      | 27px |\n| 40px      | -         | -    |\n\n### Why were values changed or removed?\n\nThe smaller sizes in the scale have largely stayed the same with the majority of the changes made to the larger values.\n\n**Changing values**\nThe first change we made was updating the values of both size and line-height to be multiples of 4 with the exception of the 14px base size. This helps us be critical about the size values we use for other elements in the UI. This is important because it affects the rhythm of the page.\n\n**Adding values**\nWe added `32px` to have an extra step at the larger end of the scale. We made this decision after looking at what font sizes are being used across the different pages in the Shopify admin. Pages that are geared towards learning or celebrating key moments often use the larger sizes. We also found that additional sizes were being added or adjusted to fill in the gaps.\n\nWe considered those common values that we were noticing being added and adjusted the scale to work for those different pages.\n\n### Why one type scale?\n\nWe looked at how type changes between the different screen sizes and found that it’s often a difference of 1px. While 1px can make a visual difference, after talking to designers and developers, we came to the conclusion that the added complexity of having two distinct scales and two sets of text styles just wasn’t worth it. They often didn’t even realize a change in size happened or expected the size to actually decrease instead of increase as it does now.\n\nHowever, for the larger sizes in the scale, we believe, in most cases, it makes sense for those sizes to adjust automatically so the sizes look appropriate for the screen size they’re being displayed on. This behavior hasn’t been added yet but, in the next release, we’ll update the larger styles to respond automatically at certain breakpoints with all other sizes staying the same unless specified otherwise.\n\n![Screen showing how type styles adapt at different screen sizes](/images/type-responsive-styles@2x.png)\n\n## Typography components\n\nWe’re moving from 6 components (DisplayText, Heading, Subheading, Caption, VisuallyHidden, TextStyle) to a singular Text component.\n\n## Why one component?\n\nTo start, the team prototyped both a singular and multiple component approach. We then tested these prototypes with developers and the response was overwhelmingly in favor of the singular Text component.\n\nOverall, developers perceived the singular component as easier to use and understand. They could type in a property and see all the possible options right from their code editor. They didn’t have to import 6+ components and figure out the right one to use.\n\nOther benefits of the singular component:\n\n- One component to learn and read documentation on\n- Autocompleting props helps developers to learn the different typography options quickly\n- Less complexity in code which results in improved performance\n- Decouples layout from type\n- Easier to make sweeping changes to type\n- Provides us with a more flexible way to control type within components\n- Sets us up for future style override work to provide even more flexibility\n- Provides one way to control typography\n- There is low usage of a lot of the old typography components\n\n## Typography tokens\n\nWe have updated and streamlined token values, and updated token names to reflect a token naming convention that makes tokens easier to use and understand.\n\n### Font-size tokens\n\nWe updated the size tokens to use increments of 100 for the variants. This allows us to set `--p-font-size-100` as the base and go lower (` --p-font-size-75` ) or higher (`--p-font-size-200`) as needed numerically.\n\n| New token         | Old token        | px value | rem value |\n| ----------------- | ---------------- | -------- | --------- |\n| --p-font-size-75  | --p-font-size-1  | 12       | 0.75      |\n| -                 | --p-font-size-2  | 13       | 0.8125    |\n| --p-font-size-100 | --p-font-size-3  | 14       | 0.875     |\n| -                 | --p-font-size-4  | 15       | 0.9375    |\n| --p-font-size-200 | --p-font-size-5  | 16       | 1         |\n| -                 | --p-font-size-6  | 17       | 1.0625    |\n| --p-font-size-300 | --p-font-size-7  | 20       | 1.25      |\n| -                 | --p-font-size-8  | 21       | 1.3125    |\n| --p-font-size-400 | --p-font-size-9  | 24       | 1.50      |\n| -                 | --p-font-size-10 | 26       | 1.625     |\n| -                 | --p-font-size-11 | 27       | 1.6875    |\n| --p-font-size-600 | --p-font-size-12 | 28       | 1.75      |\n| --p-font-size-500 | -                | 32       | 2         |\n| --p-font-size-700 | -                | 40       | 2.5       |\n\n### Line-height tokens\n\n| New token         | Value | Old token              | Value |\n| ----------------- | ----- | ---------------------- | ----- |\n| --p-line-height-1 | 16    | --p-font-line-height-1 | 16    |\n| --p-line-height-2 | 20    | --p-font-line-height-2 | 20    |\n| --p-line-height-3 | 24    | --p-font-line-height-3 | 24    |\n| --p-line-height-4 | 28    | --p-font-line-height-4 | 28    |\n| --p-line-height-5 | 32    | --p-font-line-height-5 | 32    |\n| --p-line-height-6 | 40    | --p-font-line-height-6 | 36    |\n| --p-line-height-7 | 48    | --p-font-line-height-7 | 44    |\n\n## Using the typography updates\n\nThe new `Text` component and Figma text styles are available in alpha. You can start using the new component and styles now but be aware they’re still in development and there could be breaking changes. The existing type components will continue to be available for use until the new `Text` component is finalized.\n\nAs you start to use the new component, please share feedback with the Polaris team to help us continuously improve the type system.\n\n## What’s next?\n\nNext, we’ll be releasing the beta version of the component. The beta release will include:\n\n- Updating Polaris components to use the new `Text` component\n- Adding a deprecation warning to the old type components\n- Adding responsive styles\n- Updating components in the Figma UI Kit to use the new text styles\n- Updating design and API documentation\n\nDon’t worry, we’ll also provide a timeline and guidance for migration.\n\n## Resources\n\n- [Text component](http://polaris.shopify.com/components/typography/text)\n- [Figma text styles](https://www.figma.com/file/tbm3yEIZsOuHS7xJu9zy6Q/text-styles?node-id=5457%3A5710)\n- [Figma guides](https://www.figma.com/file/tbm3yEIZsOuHS7xJu9zy6Q/text-styles?node-id=5523%3A51)",
      },
    ],
    allowChildren: false,
    hideInNav: true,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['typography', 'type', 'fonts', 'text', 'type styles'],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'TMuy-j4fhMovb5NxzFw6G',
    title: 'Components',
    excerpt: '',
    slug: 'components',
    parentId: null,
    order: 6,
    layout: 'listing',
    blocks: [],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'hzgbKAYr90rWlqPM753iY',
    title: 'Actions',
    excerpt: '',
    slug: 'actions',
    parentId: 'TMuy-j4fhMovb5NxzFw6G',
    order: 1,
    layout: 'listing',
    blocks: [],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: '3fhnwplnRutrCUHW4hmof',
    title: 'Account connection',
    excerpt:
      'The account connection component is used so merchants can connect or disconnect their store to various accounts. For example, if merchants want to use the Facebook sales channel, they need to connect their Facebook account to their Shopify store.',
    slug: 'account-connection',
    parentId: 'hzgbKAYr90rWlqPM753iY',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'LyvLQU5P_47FsndAtZUJr',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nThe account component should:\n\n- Be placed at the top of the Account page for the relevant sales channel\n- Identify the name of the platform or service merchants can connect to\n- Show whether the account is connected or disconnected so that merchants can easily connect or disconnect an account\n- Include a link to the relevant sales channel or platform terms and conditions, including information about any charges or fees that merchants may incur by using the channel or platform\n- Link to terms and conditions, which should open up on the sales channel developer’s website in a new browser window\n\n---\n\n## Content guidelines\n\n### Title\n\nThe account connection title should be the name of the platform or service that merchants can connect to, followed by the word “account”. Write account connection titles in sentence case (capitalize the first word and proper nouns only).\n\n#### For example:\n\n- Facebook account\n- Mailchimp account\n- Instagram account\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Facebook account\n- Instagram account\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Connect your Account\n- Instagram Account\n\n</div></div>\n\n### Terms and conditions\n\nClearly link to your terms and conditions and let merchants know about any additional costs of your service.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- By clicking Connect, you agree to accept Sample’s terms and conditions.\n- You’ll pay a commission rate of 15% on sales made through Sample.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nLearn about terms, conditions, and payment details.\n\n</div></div>\n\n### Connect button\n\nAlways use the verb Connect in the button of the account connection component. When merchants click or tap “Connect” it should open up your platform or service’s authorization page in a new browser window.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nConnect\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nConnect to app\n\n</div></div>\n\n---\n\n## Accessibility\n\nSee accessibility guidance for the [setting toggle component](https://polaris.shopify.com/components/setting-toggle) to turn connections on and off.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'AccountConnection',
      'connect',
      'account',
      'sign-up',
      'default account connection',
      'disconnection',
      'authorize',
      'third-party accounts',
      'integrate',
      'facebook',
      'social media',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'account-connection-default.tsx',
          title: 'Default',
          description:
            'Use to let merchants connect or disconnect their store to their third-party accounts, like Facebook.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'account-connection.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Account connection component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'hijP1qAt83FBqD9KXPWka',
    title: 'Button group',
    excerpt:
      'Button group displays multiple related actions stacked or in a horizontal row to help with arrangement and spacing.',
    slug: 'button-group',
    parentId: 'hzgbKAYr90rWlqPM753iY',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'G4KvlINzdwPDXnJjCgvmt',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nButton groups should:\n\n- Only use buttons that follow the\n  [best practices outlined in the button component](https://polaris.shopify.com/components/actions/button#best-practices)\n- Group together calls to action that have a relationship\n- Be used with consideration that too many calls to action can cause merchants to be unsure of what to do next\n- Be thoughtful about how multiple buttons will look and work on small screens\n- Only be used in groups of up to six buttons if the buttons contain an icon with no text\n\n---\n\n## Content guidelines\n\nButton groups should follow the [content guidelines](https://polaris.shopify.com/content/actionable-language#buttons) for buttons.\n\n---\n\n## Related components\n\n- To learn how to use individual buttons, [use the button component](https://polaris.shopify.com/components/actions/button)\n- To embed an action or navigation into a line of text, [use the link component](https://polaris.shopify.com/components/link)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'ButtonGroup',
      'choices',
      'decision',
      'call-to-action',
      'CTA',
      'segmented buttons',
      'divided buttons',
      'grouped actions',
      'multiple horizontal buttons',
      'multiple buttons',
      'set of buttons',
      'set of actions',
      'horizontal arrangement of buttons',
      'stacked',
      'segmented control',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'button-group-default.tsx',
          title: 'Default',
          description:
            'Use when you have multiple buttons to space them out evenly.',
        },
        {
          fileName: 'button-group-with-segmented-buttons.tsx',
          title: 'With segmented buttons',
          description:
            'Use to emphasize several buttons as a thematically-related set among other controls.',
        },
        {
          fileName: 'button-group-outline-with-segmented-buttons.tsx',
          title: 'Outline with segmented buttons',
          description:
            'Use to emphasize several buttons as a thematically-related set among other controls.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'button-group.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Button group component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: '26_KFyuHZNnCL7rVCylkY',
    title: 'Button',
    excerpt:
      'Buttons are used primarily for actions, such as “Add”, “Close”, “Cancel”, or “Save”. Plain buttons, which look similar to links, are used for less important or less commonly used actions, such as “view shipping settings”.',
    slug: 'button',
    parentId: 'hzgbKAYr90rWlqPM753iY',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'RQr2sz2gZGFxtPyLFMCj3',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nButtons should:\n\n- Be clearly and accurately labeled.\n- Lead with a strong, actionable verb.\n- Use established button colors appropriately. For example, only use a red button for an action that’s difficult or impossible to undo.\n- Prioritize the most important actions. Too many calls to action can cause confusion and make merchants unsure of what to do next.\n- Be positioned in consistent locations in the interface.\n\n### Buttons versus links\n\nButtons are used primarily for actions, such as “Add”, “Close”, “Cancel”, or “Save”. Plain buttons, which look similar to links, are used for less important or less commonly used actions, such as “view shipping settings”.\n\nLinks are used primarily for navigation, and usually appear within or directly following a sentence.\n\nThe HTML that renders for the `Button` and `Link` components carries meaning. Using these components intentionally and consistently results in:\n\n- a more inclusive experience for assistive technology users\n- a more cohesive visual experience for sighted users\n- products that are easier to maintain at scale\n\n---\n\n## Content guidelines\n\nButtons should follow the content guidelines for [buttons](https://polaris.shopify.com/content/actionable-language#buttons).\n\n---\n\n## Related components\n\n- To combine or lay out multiple buttons, [use the button group component](https://polaris.shopify.com/components/actions/button-group)\n- For navigational actions that appear within or directly following a sentence, use the [link component](https://polaris.shopify.com/components/link)\n\n---\n\n## Accessibility\n\nButtons can have different states that are visually and programmatically conveyed to merchants.\n\n- Use the `ariaControls` prop to add an `aria-controls` attribute to the button. Use the attribute to point to the unique `id` of the content that the button manages.\n- If a button expands or collapses adjacent content, then use the `ariaExpanded` prop to add the `aria-expanded` attribute to the button. Set the value to convey the current expanded (`true`) or collapsed (`false`) state of the content.\n- Use the `disabled` prop to set the `disabled` state of the button. This prevents merchants from being able to interact with the button, and conveys its inactive state to assistive technologies.\n- Use the `pressed` prop to add an `aria-pressed` attribute to the button.\n\n#### Navigation\n\nMerchants generally expect buttons to submit data or take action, and for links to navigate. If navigation is required for the button component, use the `url` prop. The control will output an anchor styled as a button, instead of a button in HTML, to help convey this difference.\n\nFor more information on making accessible links, see the [link component](https://polaris.shopify.com/components/link).\n\n### Labeling\n\nThe `accessibilityLabel` prop adds an `aria-label` attribute to the button, which can be accessed by assistive technologies like screen readers. Typically, this label text replaces the visible text on the button for merchants who use assistive technology.\n\nUse `accessibilityLabel` for a button if:\n\n- The button’s visible text doesn’t adequately convey the purpose of the button to non-visual merchants\n- The button has no text and relies on an icon alone to convey its purpose\n\nTo help support merchants who use speech activation software as well as sighted screen reader users, make sure that the `aria-label` text includes any button text that’s visible. Mismatches between visible and programmatic labeling can cause confusion, and might prevent voice recognition commands from working.\n\nWhen possible, give the button visible text that clearly conveys its purpose without the use of `accessibilityLabel`. When no additional content is needed, duplicating the button text with `accessibilityLabel` isn’t necessary.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n```jsx\n<Button>Edit shipping address</Button>\n```\n\n```jsx\n<Heading>Shipping address</Heading>\n<Button accessibilityLabel="Edit shipping address">Edit</Button>\n```\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n```jsx\n<Button accessibilityLabel="Change your shipping address">Edit</Button>\n```\n\n```jsx\n<Button accessibilityLabel="Edit">Edit</Button>\n```\n\n</div></div>\n\n#### External links\n\nWhen you use the button component to create a link to an external resource:\n\n- Use the `external` prop to make the link open in a new tab (or window, depending on the merchant’s browser settings)\n- Use the `icon` prop to add the `external` icon to the button\n- Use the `accessibilityLabel` prop to include the warning about opening a new tab in the button text for non-visual screen reader users\n\nFor more information on making accessible links, see the [link component](https://polaris.shopify.com/components/link).\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n```jsx\n<Button\n  accessibilityLabel="Terms and conditions (opens a new window)"\n  icon={ExternalMinor}\n  url="http://example.com"\n  external\n>\n  Terms and conditions\n</Button>\n```\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n```jsx\n<Button url="http://example.com" external>Terms and conditions</Button>\n<Button url="http://example.com" external>\n  Terms and conditions\n</Button>\n```\n\n</div></div>\n\n### Keyboard support\n\nButtons use browser defaults for keyboard interactions.\n\n- Give buttons keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)\n- Activate buttons with the <kbd>enter</kbd>/<kbd>return</kbd> key or the <kbd>space</kbd> key\n\n#### Custom key events\n\nUse the `onKeyDown`, `onKeyPress`, and `onKeyUp` props to create custom events for buttons. With these props, you can use buttons to create complex, custom interactions like drag-and-drop interfaces.\n\nSince these props introduce non-standard features to buttons, make sure to include accessible instructions so that merchants can understand how to use these features.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'CTA',
      'call to action',
      'call-to-action',
      'primary',
      'action',
      'basic button',
      'outline',
      'plain',
      'destructive',
      'slim',
      'large',
      'full-width',
      'disabled state',
      'disabled',
      'button',
      'link',
      'click',
      'submit',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'button-default.tsx',
          title: 'Default',
          description:
            'Used most in the interface. Only use another style if a button requires more or less visual weight.',
        },
        {
          fileName: 'button-outline.tsx',
          title: 'Outline',
          description:
            'Use against shaded or colorful backgrounds. An outline button will maintain the appropriate visual weight and won’t clash with the background color.',
        },
        {
          fileName: 'button-outline-monochrome.tsx',
          title: 'Outline monochrome',
          description:
            'Use against shaded or colorful backgrounds where matching the current text colors is more appropriate than the current outline theme.',
        },
        {
          fileName: 'button-plain.tsx',
          title: 'Plain',
          description:
            'Use for less important or less commonly used actions since they’re less prominent. For example, plain buttons are used as actions in cards.',
        },
        {
          fileName: 'button-plain-monochrome.tsx',
          title: 'Plain monochrome',
          description:
            'Use for less important or less commonly used actions where matching the current text color is desired. For example in the InlineError component.',
        },
        {
          fileName: 'button-plain-destructive.tsx',
          title: 'Plain destructive',
          description:
            'Use for actions that will delete merchant data or be otherwise difficult to recover from. Since they’re less prominent, use for less important or less commonly used destructive actions. For example, plain buttons are used as actions in cards.',
        },
        {
          fileName: 'button-primary.tsx',
          title: 'Primary',
          description:
            'Use to highlight the most important actions in any experience. Don’t use more than one primary button in a section or screen to avoid overwhelming merchants.',
        },
        {
          fileName: 'button-destructive.tsx',
          title: 'Destructive',
          description:
            'Use when the action will delete merchant data or be otherwise difficult to recover from. Destructive buttons should trigger a confirmation dialog before the action is completed. Be thoughtful about using destructive buttons because they can feel stressful for merchants.',
        },
        {
          fileName: 'button-slim.tsx',
          title: 'Slim',
          description:
            'Use when a table or list has a set of actions on each item to avoid making items taller than they need to be. Don’t use slim buttons for primary actions.',
        },
        {
          fileName: 'button-large.tsx',
          title: 'Large',
          description:
            'Use for the main call to action in empty states or for calls to action shown with large illustrations.',
        },
        {
          fileName: 'button-full-width.tsx',
          title: 'Full-width',
          description:
            'Use for buttons placed in a narrow column (especially when stacking multiple buttons) or for creating a set of buttons of equal width. Full-width buttons should rarely exceed 320 px wide.',
        },
        {
          fileName: 'button-text-aligned.tsx',
          title: 'Text-aligned',
          description:
            'Use for plain or monochrome buttons that could have a long length and should be aligned when they potentially overflow onto the next line.',
        },
        {
          fileName: 'button-pressed.tsx',
          title: 'Pressed',
          description:
            'Buttons are sometimes used as a toggle for other parts of the user interface.',
        },
        {
          fileName: 'button-plain-disclosure.tsx',
          title: 'Plain disclosure',
          description:
            'Use to indicate that more content can be disclosed on click, like text in a collapsible.',
        },
        {
          fileName: 'button-right-aligned-disclosure.tsx',
          title: 'Right-aligned disclosure',
          description:
            'When working with `fullWidth + textAlign="left"`, the `disclosure` will align itself to the far right.',
        },
        {
          fileName: 'button-select-disclosure.tsx',
          title: 'Select disclosure',
          description:
            'Use to indicate that multiple options are available from this control, similar to a `<select />` HTML element.',
        },
        {
          fileName: 'button-split.tsx',
          title: 'Split',
          description:
            'Use when there is only one primary action but other related actions can be taken.',
        },
        {
          fileName: 'button-disabled-state.tsx',
          title: 'Disabled state',
          description:
            'Use for actions that aren’t currently available. The surrounding interface should make it clear why the button is disabled and what needs to be done to enable it.',
        },
        {
          fileName: 'button-loading-state.tsx',
          title: 'Loading state',
          description:
            'Use when a button has been pressed and the associated action is in progress.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'button.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Button component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'L477aNjYRfUsMUmFUxLFe',
    title: 'Page actions',
    excerpt:
      'Page actions let merchants take key actions at the bottom of specific pages in the interface. This is important because sometimes the primary call to action is hard to access when merchants are at the bottom of a page.',
    slug: 'page-actions',
    parentId: 'hzgbKAYr90rWlqPM753iY',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'Fqr_BYwA4AvgfdhWK2w5i',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nPage actions should:\n\n- Include a single primary action on the right. It should be the same as the primary action that shows in the title bar at the top of the page.\n- Include a maximum of two secondary actions, but doesn’t have to include any secondary actions.\n\n---\n\n## Content guidelines\n\n### Call to action buttons\n\nButtons should be:\n\n- Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive merchants by mislabeling a button.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Create order\n- Buy shipping label\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- New order\n- Buy\n\n</div></div>\n\n- Action-led: buttons should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on buttons except in the case of common actions like Save, Close, Cancel, or OK.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Activate Apple Pay\n- View shipping settings\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Try Apple Pay\n- View your settings\n\n</div></div>\n\n- Scannable: avoid unnecessary words and articles such as the, an, or a.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Add menu item\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Add a menu item\n\n</div></div>\n\n---\n\n## Related components\n\n- To add actions to the top of a page, see the [page component’s](https://polaris.shopify.com/components/layout-and-structure/page) action props\n- To create a call to action within the context of other page content, use the [button component](https://polaris.shopify.com/components/actions/button)\n- To let merchants move through a collection of items that spans multiple pages, see the [pagination component](https://polaris.shopify.com/components/navigation/pagination)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'PageActions',
      'bottom of page actions',
      'bottom page actions',
      'primary action',
      'primary page actions',
      'default page actions',
      'save delete actions',
      'save actions',
      'delete actions',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'page-actions-default.tsx',
          title: 'Default',
          description:
            'Used on a resource page (such as an individual order or product page) to let merchants take key actions at the bottom of the page. Usually, the primary action is Save and the secondary action is Delete.',
        },
        {
          fileName: 'page-actions-primary-action-only.tsx',
          title: 'Primary action only',
          description: 'Not all page actions require a secondary action.',
        },
        {
          fileName: 'page-actions-with-custom-primary-action.tsx',
          title: 'With custom primary action',
          description: 'Use to create a custom primary action.',
        },
        {
          fileName: 'page-actions-with-custom-secondary-action.tsx',
          title: 'With custom secondary action',
          description: 'Use to create a custom secondary action.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'page-actions.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Page actions component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: '1XVM4BCyCDfxj40D-a-sx',
    title: 'Setting toggle',
    excerpt:
      'Use to give merchants control over a feature or option that can be turned on or off.',
    slug: 'setting-toggle',
    parentId: 'hzgbKAYr90rWlqPM753iY',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'Hlgg8XaagWS0VhzemBUE6',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nSettings toggles should:\n\n- Include different body content for the activated and deactivated states.\n- Clearly indicate whether the setting is activated or deactivated and explain the implications of the state of the setting to merchants. (“Automatic messages are deactivated. Your customers won’t receive automatic shipping updates.”)\n- Clearly state when a setting or feature is not available and why. Provide actionable steps for merchants to unlock the functionality.\n\n---\n\n## Content guidelines\n\n### Toggle description\n\nToggle descriptions should:\n\n- Clearly indicate whether the setting is activated or deactivated\n- Explain the implications of the state of the setting to merchants (“Automatic messages are deactivated. Your customers won’t receive automatic shipping updates.”)\n\n### Primary button\n\nThe primary buttons for the setting toggle should always say either “Activate” or “Deactivate” depending on whether the setting can be turned on or off.\n\nFor example, if the setting toggle is on, the button should say “Deactivate” to allow merchants to turn it off. If the setting toggle is off, the button should say “Activate” to allow merchants to turn it on.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Activate\n- Deactivate\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Enable\n- Disable\n- Turn on\n- Turn off\n\n</div></div>\n\n---\n\n## Related components\n\n- To let merchants connect or disconnect third-party services and apps, [use the account connection component](https://polaris.shopify.com/components/account-connection)\n\n---\n\n## Accessibility\n\nThe setting toggle component is implemented as an HTML `<button>` with the `switch` [ARIA role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/switch_role).\nThe components passed as children will automatically be wrapped in a label element describing the `<button>`. Enabling and disabling the SettingToggle with update the `aria-checked` attribute to `"true"` or `"false"`.\n\nTo learn more about button accessibility, see the [button component](https://polaris.shopify.com/components/actions/button).',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'SettingToggle',
      'settings buttons',
      'setting buttons',
      'enable buttons',
      'disable buttons',
      'setting switches',
      'turn on button',
      'turn off button',
      'option button',
      'on off',
      'switch',
      'adjuster',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'setting-toggle-default.tsx',
          title: 'Default',
          description:
            'Use on settings pages to allow merchants to toggle a setting that has an activated or a deactivated state.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'setting-toggle.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Setting toggle component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'yQzAqLeOp6GsdBR6nxscu',
    title: 'Deprecated',
    excerpt:
      'Deprecated components will be removed in future major versions of Polaris. These components could be deprecated for a [number of reasons](https://polaris.shopify.com/getting-started/components-lifecycle#requirements-for-deprecation) and should be avoided. These components will show warnings in the component file and provide details for alternative usage. For more information, check out the [component lifecycles](https://polaris.shopify.com/getting-started/components-lifecycle#deprecated).',
    slug: 'deprecated',
    parentId: 'TMuy-j4fhMovb5NxzFw6G',
    order: 12,
    layout: 'listing',
    blocks: [],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'ocQEawhJynCtur0PsC6n_',
    title: 'Caption',
    excerpt:
      'Caption text size is smaller than the recommended size for general reading. On web, it should be used only in a graph or as a timestamp for a list item. On Android and iOS, it can also be used as help text or as other kinds of secondary text for list items.',
    slug: 'caption',
    parentId: 'yQzAqLeOp6GsdBR6nxscu',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'iL5mGZoyclSfhi7SAM2sP',
        blockType: 'Markdown',
        content:
          '## Mapping to the Text component\n\n```diff\n- <Caption>Received April 21, 2017</Caption>\n+ <Text variant="bodySm" as="p">Received April 21, 2017</Text>\n```\n\n---\n\n## Best practices\n\n- Use for secondary labels in graphs and charts\n- May be used for timestamps in lists of content\n- Don’t use this component for other cases\n- Don’t use this component for text longer than a few words\n- Don’t use this component for aesthetic effect or to break from the standard text size\n\n---\n\n## Content guidelines\n\n### Captions\n\nCaptions are primarily used in [data visualizations](https://polaris.shopify.com/design/data-visualizations). Stick to a few words and don’t use this component for complete sentences or longer content.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Use caption for labelling data visualizations\n  ![Diagram of using captions to label graphs and other data content](/images/do-use-caption-for-labeling-data-visualizations@2x.png)\n- Received April 21, 2017\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Order #1001 was received on April 21, 2017\n- This is your recent activity\n\n</div></div>\n\n---\n\n## Accessibility\n\nFollow best practices for [data visualizations](https://polaris.shopify.com/design/data-visualizations) to ensure that the purpose of captions is clear to all merchants, including those with issues related to seeing or understanding data and complex information.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'labels',
      'text',
      'microcopy',
      'typographic',
      'graph',
      'timestamp',
      'smaller text',
      'smallest text',
      'smaller than reading size text',
      'time text',
      'compact text',
      'small text',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [],
      lifeCyclePhase: 'Deprecated',
      lifeCycleNotice:
        'This component is no longer supported. Please use the Text component instead.',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'caption.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Caption component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'EBz80WVCC6AAB0iSwV3Dw',
    title: 'Card',
    excerpt:
      'Cards are used to group similar concepts and tasks together to make Shopify easier for merchants to scan, read, and get things done.',
    slug: 'card',
    parentId: 'yQzAqLeOp6GsdBR6nxscu',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'BKkZ2etszXK_gxDTF4_NM',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nCards should:\n\n- Use headings that set clear expectations about the card’s purpose\n- Prioritize information so the content merchants most need to know comes first\n- Stick to single user flows or break more complicated flows into multiple sections\n- Avoid too many call-to-action buttons or links and only one primary call to action per card\n- Use calls to action on the bottom of the card for next steps and use the space in the upper right corner of the card for persistent, optional actions (such as an Edit link)\n\n---\n\n## Content guidelines\n\n### Title\n\nCard titles should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings).\n\n### Body content\n\nBody content should be:\n\n- Actionable: start sentences with imperative verbs when telling merchants what actions are available to them (especially something new). Don’t use permissive language like “you can”.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nGet performance for all your sales channels.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nNow you can get performance data for all your sales channels.\n\n</div></div>\n\n- Structured for merchant success: always put the most critical information first.\n- Clear: use the verb “need” to help merchants understand when they’re required to do something.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nTo buy a shipping label, you need to enter the total weight of your shipment, including packaging.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nTo buy a shipping label, you must enter the total weight of your shipment, including packaging.\n\n</div></div>\n\n### Call-to-action button\n\nButtons should be:\n\n- Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive merchants by mislabeling a button.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Create order\n- Buy shipping label\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- New order\n- Buy\n\n</div></div>\n\nAction-led: buttons should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on buttons except in the case of common actions like Save, Close, Cancel, or OK.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Activate Apple Pay\n- View shipping settings\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Try Apple Pay\n- View your settings\n\n</div></div>\n\nScannable: Avoid unnecessary words and articles such as the, an, or a.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nAdd menu item\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nAdd a menu item\n\n</div></div>\n\n### Section titles\n\nSection titles should be:\n\n- Informative: they should label the type of content grouped in the body content below\n- Like headings: follow the same content guidelines as when you’re writing headings\n\n### Action links\n\nLinks should be:\n\n- Used for secondary or persistent actions: links should be used to represent lower priority actions than buttons, or persistent actions that merchants may take at any time (such as a persistent Edit link).\n- Clearly labeled: merchants should not need to guess where they’ll end up if they click on an action link. Never use “click here” as a link because it doesn’t set expectations about what’s next.\n- Similar to buttons: Follow the same content guidelines as when you’re writing text for buttons.\n\n---\n\n## Related components\n\n- To create page-level layout, [use the layout component](https://polaris.shopify.com/components/layout-and-structure/layout)\n- To highlight a Shopify feature, [use the callout card component](https://polaris.shopify.com/components/callout-card)\n\n---\n\n## Accessibility\n\nThe `title` prop gives the card a level 2 heading (`<h2>`). This helps with readability and provides structure to screen reader users.\n\nIf you use the `subdued` prop on a card or section, make sure that the card or section `title` conveys the reason for using `subdued`. This ensures that merchants with low vision, including those who use screen readers, can identify that the content is inactive or less important.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n```\n<Card title="Deactivated staff accounts" sectioned subdued>\n  <List>\n    <List.Item>Felix Crafford</List.Item>\n    <List.Item>Ezequiel Manno</List.Item>\n  </List>\n</Card>\n```\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n```\n<Card title="Staff accounts" sectioned subdued>\n  <List>\n    <List.Item>Felix Crafford</List.Item>\n    <List.Item>Ezequiel Manno</List.Item>\n  </List>\n</Card>\n```\n\n</div></div>',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'layout',
      'container',
      'box',
      'grid',
      'panel',
      'card with call to action in the footer',
      'card with call to action in the heading',
      'card with call to action in a section',
      'card with button in the footer',
      'card with button in the heading',
      'card with multiple sections',
      'card with subsections',
      'sectioned card',
      'card with a subdued section',
      'subdued card for secondary content',
      'callout',
      'call out',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'deprecated-card-default.tsx',
          title: 'Default',
          description:
            'Use when you have a simple message to communicate to merchants that doesn’t require any secondary steps.',
        },
        {
          fileName: 'deprecated-card-with-header-actions.tsx',
          title: 'With header actions',
          description:
            'Use for less important card actions, or actions merchants may do before reviewing the contents of the card. For example, merchants may want to add items to a card containing a long list, or enter a customer’s new address.',
        },
        {
          fileName: 'deprecated-card-with-footer-actions.tsx',
          title: 'With footer actions',
          description:
            'Use footer actions for a card’s most important actions, or actions merchants should do after reviewing the contents of the card. For example, merchants should review the contents of a shipment before an important action like adding tracking information. Footer actions can be left or right aligned with the `footerActionAlignment` prop.',
        },
        {
          fileName: 'deprecated-card-with-multiple-footer-actions.tsx',
          title: 'With multiple footer actions',
          description:
            'When multiple secondary footer actions are provided, they will render in an action list popover activated by a disclosure button. The disclosure button text can be customized with the `secondaryFooterActionsDisclosureText` prop.',
        },
        {
          fileName: 'deprecated-card-with-custom-footer-actions.tsx',
          title: 'With custom footer actions',
          description:
            'Use to present actionable content that is optional or not the primary purpose of the page.',
        },
        {
          fileName: 'deprecated-card-with-destructive-footer-action.tsx',
          title: 'With destructive footer action',
          description:
            'Use when a card action will delete merchant data or be otherwise difficult to recover from.',
        },
        {
          fileName: 'deprecated-card-with-multiple-sections.tsx',
          title: 'With multiple sections',
          description:
            'Use when you have two related but distinct pieces of information to communicate to merchants. Multiple sections can help break up complicated concepts to make them easier to scan and understand.',
        },
        {
          fileName: 'deprecated-card-with-multiple-titled-sections.tsx',
          title: 'With multiple titled sections',
          description:
            'Use when you have two related but distinct pieces of information to communicate to merchants that are complex enough to require a title to introduce them.',
        },
        {
          fileName: 'deprecated-card-with-sections-and-actions.tsx',
          title: 'With sections and actions',
          description:
            'Use when your card section has actions that apply only to that section.',
        },
        {
          fileName: 'deprecated-card-with-subsection.tsx',
          title: 'With subsection',
          description:
            'Use when your card sections need further categorization.',
        },
        {
          fileName: 'deprecated-card-with-destructive-action.tsx',
          title: 'With destructive action',
          description:
            'Use when a card action applies only to one section and will delete merchant data or be otherwise difficult to recover from.',
        },
        {
          fileName: 'deprecated-card-with-a-subdued-section.tsx',
          title: 'With a subdued section',
          description:
            'Use to indicate when one of the sections in your card contains inactive or disabled content.',
        },
        {
          fileName: 'deprecated-card-with-subdued-for-secondary-content.tsx',
          title: 'With subdued for secondary content',
          description:
            'Use for content that you want to deprioritize. Subdued cards don’t stand out as much as cards with white backgrounds so don’t use them for information or actions that are critical to merchants.',
        },
        {
          fileName: 'deprecated-card-with-separate-header.tsx',
          title: 'With separate header',
          description:
            'Use to be able to use custom React elements as header content.',
        },
        {
          fileName: 'deprecated-card-with-custom-react-node-title.tsx',
          title: 'With custom React Node title',
          description:
            'Use to render custom content such as icons, links, or buttons in a card section’s header.',
        },
        {
          fileName: 'deprecated-card-with-all-elements.tsx',
          title: 'With all elements',
          description:
            'Use as a broad example that includes most props available to card.',
        },
        {
          fileName: 'deprecated-card-with-flushed-sections.tsx',
          title: 'With flushed sections',
          description:
            'Use when you need further control over the spacing of your card sections.',
        },
      ],
      lifeCyclePhase: 'Deprecated',
      lifeCycleNotice:
        'Card was built prior to layout primitives like box, inline, and alpha stack. The new layout primitives can be used in combination to achieve similar results to card, or the existing legacy card.',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'card.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Card component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'rwcc_kekE4iF3jFYZ6Y4N',
    title: 'Display text',
    excerpt:
      'Display styles make a bold visual statement. Use them to create impact when the main goal is visual storytelling. For example, use display text to convince or reassure merchants such as in marketing content or to capture attention during onboarding.',
    slug: 'display-text',
    parentId: 'yQzAqLeOp6GsdBR6nxscu',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'beNd3nbrk5_i5mLdQXutd',
        blockType: 'Markdown',
        content:
          '## Mapping to the Text component\n\n### Small\n\n```diff\n- <DisplayText size="small">Sales this year</DisplayText>\n+ <Text variant="headingLg" as="p">Sales this year</Text>\n```\n\n### Medium\n\n```diff\n- <DisplayText size="medium">Sales this year</DisplayText>\n+ <Text variant="headingXl" as="p">Sales this year</Text>\n```\n\n### Large\n\n```diff\n- <DisplayText size="large">Sales this year</DisplayText>\n+ <Text variant="heading2xl" as="p">Sales this year</Text>\n```\n\n### Extra large\n\n```diff\n- <DisplayText size="extraLarge">Sales this year</DisplayText>\n+ <Text variant="heading4xl" as="p">Sales this year</Text>\n```\n\n---\n\n## Best practices\n\n- Use when the primary goal of the page is communication rather than interaction.\n- Use larger display text sizes when a page is focused around a single message. In these cases it may be paired with an illustration.\n- Use smaller display text to pair with larger text, or alone as part of more complex data displays such as dashboards.\n\n---\n\n## Content guidelines\n\n### Display text\n\nDisplay text should be:\n\n- Benefits-driven and focused on information that is most important to merchants\n- Concise and scannable:\n  - Use simple, clear language that can be read at a glance\n  - Keep display text content to a short sentence that’s just a few words in length\n  - Avoid using punctuation such as periods, commas, or semicolons\n  - Avoid using exclamation marks—display text already makes enough of a statement without an exclamation mark\n  - Write in sentence case\n\n---\n\n## Accessibility\n\nAlthough display text creates an interesting visual experience, it doesn’t replace the semantic structure provided by HTML headings.\n\nBy default, the display text component outputs text in an HTML paragraph (`<p>`). If a heading tag is needed for display text, use the `element` prop to set the heading level.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nUse display text to create visual interest along with a meaningful heading structure.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nUse display text in place of standard headings. Use the [heading component](https://polaris.shopify.com/components/heading) and [subheading component](https://polaris.shopify.com/components/subheading) to provide structure.\n\n</div></div>',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'DisplayText',
      'announcement text',
      'greeting text',
      'marketing text',
      'title text',
      'biggest text',
      'bigger text',
      'big text',
      'large text',
      'larger text',
      'largest text',
      'strong text',
      'bold text',
      'bold statements',
      'extra large display text',
      'medium and large display text',
      'small display text',
      'visual story telling',
      'visual storytelling',
      'visual statements',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [],
      lifeCyclePhase: 'Deprecated',
      lifeCycleNotice:
        'This component is no longer supported. Please use the Text component instead.',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'display-text.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Display text component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'jLigcNxWKy_Q_cVhWG8BZ',
    title: 'Grid',
    excerpt:
      'Create complex layouts based on [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid).',
    slug: 'grid',
    parentId: 'yQzAqLeOp6GsdBR6nxscu',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: '02q-uGGElDgnkc9-OrESH',
        blockType: 'Markdown',
        content:
          '## Related components\n\n- To lay out a set of smaller components in a row, [use the stack component](https://polaris.shopify.com/components/layout-and-structure/alpha-stack)\n- To lay out form fields, [use the form layout component](https://polaris.shopify.com/components/form-layout)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'one column',
      'two column',
      'three column',
      'column',
      'row',
      'column layouts',
      'grid layouts',
      'containers',
      'full width containers',
      'css grid',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'grid-two-column.tsx',
          title: 'Two column',
          description:
            'Use to create a two column layout that wraps at a breakpoint and aligns to a twelve column grid.',
        },
        {
          fileName: 'grid-two-thirds-and-one-third-column.tsx',
          title: 'Two-thirds and one-third column',
          description:
            'Use to create a two-thirds, one-third column layout that wraps at a breakpoint and aligns to a twelve column grid.',
        },
        {
          fileName: 'grid-three-one-third-column.tsx',
          title: 'Three one-third column',
          description:
            'Use to create a three column layout that wrap at a breakpoint and aligns to a twelve column grid.',
        },
        {
          fileName: 'grid-custom-layout.tsx',
          title: 'Custom layout',
          description:
            'Use to create a layout that can be customized at specific breakpoints.',
        },
      ],
      lifeCyclePhase: 'Deprecated',
      lifeCycleNotice:
        'Grid was built prior to layout primitives like columns, inline, and alpha stack. Comparatively, grid is difficult to learn, document, and understand its usage in a codebase. The new layout primitives should be used in combination to achieve similar results to grid.',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'grid.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Grid component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'O51AAEc8P8VPxICvMrxTV',
    title: 'Heading',
    excerpt:
      'Headings are used as the titles of each major section of a page in the interface. For example, [card components](https://polaris.shopify.com/components/layout-and-structure/alpha-card) generally use headings as their title.',
    slug: 'heading',
    parentId: 'yQzAqLeOp6GsdBR6nxscu',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'WqOcsNfMOUcEiolKInHCh',
        blockType: 'Markdown',
        content:
          '## Mapping to the Text component\n\n```diff\n- <Heading>Online store dashboard</Heading>\n+ <Text variant="headingMd" as="h2">Online store dashboard</Text>\n```\n\n---\n\n## Best practices\n\nHeadings should:\n\n- Clearly describe the section of interface they refer to\n- Highlight the most important concept or piece of information merchants need to know\n- Sit at the top of the section of interface they’re referring to\n\n---\n\n## Content guidelines\n\nHeadings should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings).\n\n---\n\n## Related components\n\n- To break up a section with a heading into sub-sections, [use the subheading component](https://polaris.shopify.com/components/subheading)\n\n---\n\n## Accessibility\n\nA clear and consistent heading structure helps merchants who have difficulty with reading or language. It also helps screen reader users to navigate the page using keystrokes that are custom to their screen reader.\n\nUse the `element` prop to determine the specific HTML element that’s output for the heading. The component defaults to a level 2 heading (`<h2>`). Use a different value for the `element` prop if a different heading fits the context better.\n\nLearn more about writing helpful [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings).\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nUse headings to support the hierarchy and structure of the page.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nUse headings for style alone.\n\n</div></div>',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'titles',
      'text',
      'microcopy',
      'conversational',
      'typographic',
      'card headings',
      'card titles',
      'section titles',
      'section headings',
      'heading text',
      'heading font',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [],
      lifeCyclePhase: 'Deprecated',
      lifeCycleNotice:
        'This component is no longer supported. Please use the Text component instead.',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'heading.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Heading component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'QX4WpOh437GzPZV1ShFUX',
    title: 'Sheet',
    excerpt:
      'A sheet is a large container that enters from the edge of the screen when triggered by the merchant. It’s used to provide merchants with actions and information contextual to the page. It doesn’t interrupt their flow like a modal.',
    slug: 'sheet',
    parentId: 'yQzAqLeOp6GsdBR6nxscu',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'FdFCJQic-E-0m4RbiExe0',
        blockType: 'Markdown',
        content:
          '## Accessibility\n\nSheets provide an opportunity to let merchants dig into more detail on their current task, or access information for their current task in a different way. Although merchants may be able to see content in the sheet and the main page content at the same time, they should only be expected to interact with one or the other at any given time.\n\n### Keyboard support\n\n- Use the `onClose` prop so that the sheet can be closed with the <kbd>esc</kbd> key as well as with button-based controls\n- Use a button to open the sheet\n- When the sheet opens, focus moves to it so merchants who rely on the keyboard and screen readers can access it\n- Focus is kept in the sheet until it is dismissed\n- When the sheet closes, focus moves back to the button that launched it\n\n---\n\n## Responsive behavior\n\nAt small screen sizes, the sheet component enters the page from the bottom of the screen. At larger screen sizes, the sheet component enters the page from the right side of the scren.\n\n---\n\n## Best practices\n\nThe sheet component should:\n\n- Include a heading that summarizes the actions and information in the sheet, for example, More filters\n- Be openable through clear actions, like a link or button\n- Be close-able through clear actions, like Done, the [X] button, and the esc key\n- Include information and actions contextual to the current task\n- Not block merchants from completing their task, like a modal would\n- Not open from within another sheet (only one sheet can be open at a time)\n- Preserve its state—the settings and actions won’t reset when it’s closed\n\nThe sheet component is best used in cases where the merchant needs to see elements behind it, and for that reason it uses a transparent backdrop. The backdrop is a full screen overlay which closes its parent component when pressed.\n\n---\n\n## Related components\n\n- To offer an action before merchants can go to the next step in the flow, use the [modal component](https://polaris.shopify.com/components/overlays/modal)\n- To present a small amount of content or a menu of actions in a non-blocking overlay, use the [popover component](https://polaris.shopify.com/components/overlays/popover)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'sheet',
      'modal',
      'open',
      'title',
      'overlay',
      'drawer',
      'dialog',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'sheet-default.tsx',
          title: 'Default',
          description: 'Use as the default option for a sheet.',
        },
        {
          fileName: 'sheet-with-searchable-listbox.tsx',
          title: 'With searchable listbox',
          description:
            'Use to help merchants browse, filter, and choose from a list of options.',
        },
      ],
      lifeCyclePhase: 'Deprecated',
      lifeCycleNotice:
        'The sheet component encourages designers to create a new layer on top of the page instead of improving the existing user interface. It also blocks other parts of the UI, forces users to switch context, and adds complexity to otherwise simple interactions.',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'sheet.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Sheet component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'Nwl0NnZ9iHg1wMlFIJyY6',
    title: 'Stack',
    excerpt:
      'Use to lay out a horizontal row of components or to achieve no-fuss vertical centering. A stack is made of flexible items that wrap each of the stack’s children. Options provide control of the wrapping, spacing, and relative size of the items in the stack.',
    slug: 'stack',
    parentId: 'yQzAqLeOp6GsdBR6nxscu',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'vxmcVnp3E81G1HNOq3U7p',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nStacks should:\n\n- Be used for small-scale layout tasks when you want a row of components that should wrap on small screen widths\n- Be used to vertically center two elements\n- Not be used for complex or unique arrangements of components\n- Not be used for large-scale page layout\n\n---\n\n## Stack item\n\nThe stack component will treat multiple elements wrapped in a stack item component as one item. By default, each individual element is treated as one stack item. Use the fill prop on a single stack item component to make it fill the rest of the available horizontal space. See the “Stack where a single item fills the remaining space” example.\n\n### Stack item properties\n\n| Prop     | Type    | Description                                                    | Default |\n| -------- | ------- | -------------------------------------------------------------- | ------- |\n| fill     | boolean | Fill the available horizontal space in the stack with the item | false   |\n| children | any     | Elements to display inside stack item                          |         |\n\n---\n\n## Related components\n\n- To create the large-scale structure of pages, [use the layout component](https://polaris.shopify.com/components/layout-and-structure/layout)\n\n---\n\n## Accessibility\n\nThe stack component is for alignment only and doesn’t provide any structural information for assistive technologies. To convey relationships between specific items, consider using the [list component](https://polaris.shopify.com/components/lists/list).',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'rows',
      'vertical centering',
      'horizontal row of components',
      'flexible items',
      'flexbox',
      'row of components',
      'stack spacing',
      'vertical centering',
      'fill available space',
      'fill space',
      'equal width',
      'right-aligned stack',
      'stack layout',
      'layout',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'stack-default.tsx',
          title: 'Default',
          description:
            'Use to quickly lay out a horizontal row of components and maintain their relative sizes. On small screens, children rows wrap down to additional rows as needed.',
        },
        {
          fileName: 'stack-non-wrapping.tsx',
          title: 'Non-wrapping',
          description:
            'Use to create a stack where the children will not wrap to new rows on small screens. As noted above, the wrap option defaults to true. This means you must explicitly set it to false to turn it off.',
        },
        {
          fileName: 'stack-spacing.tsx',
          title: 'Spacing',
          description:
            'Use to control spacing of items in a stack in standard increments. Use tight for less spacing, loose for more spacing, or none to remove normal spacing altogether.',
        },
        {
          fileName: 'stack-vertical-centering.tsx',
          title: 'Vertical centering',
          description:
            'Use to vertically center a set of items that have different heights.',
        },
        {
          fileName: 'stack-fill-available-space-proportionally.tsx',
          title: 'Fill available space proportionally',
          description:
            'Use to have the stack’s items fill the horizontal space in the container but maintain their relative proportions.',
        },
        {
          fileName: 'stack-where-items-fill-space-evenly.tsx',
          title: 'Where items fill space evenly',
          description:
            'Use to have the stack’s items fill the horizontal space in the container and be equal widths, regardless of their content.',
        },
        {
          fileName: 'stack-where-a-single-item-fills-the-remaining-space.tsx',
          title: 'Where a single item fills the remaining space',
          description:
            'Use for aligning buttons or secondary content to the right edge of another element, allowing it to wrap below on small screens.',
        },
      ],
      lifeCyclePhase: 'Deprecated',
      lifeCycleNotice:
        'Stack was built prior to layout primitives like box, inline, and alpha stack. The new layout primitives can be used in combination to achieve similar results to stack, or the existing legacy stack.',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'stack.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Stack component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'q_njS-SX4tPwRcHxG2c9w',
    title: 'Subheading',
    excerpt:
      'Subheadings are used for the title of any sub-sections in top-level page sections.',
    slug: 'subheading',
    parentId: 'yQzAqLeOp6GsdBR6nxscu',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: '6FMQF3Cb3Ds5KzsKDXGac',
        blockType: 'Markdown',
        content:
          '## Mapping to the Text component\n\n```diff\n- <Subheading>Accounts</Subheading>\n+ <Text variant="headingXs" as="h3">Accounts</Text>\n```\n\n---\n\n## Best practices\n\nSubheadings should:\n\n- Be used to explain and clearly label logical groups in existing sections of a page\n- Not be used without a parent heading\n- Not be used in tables or list items, such as for the primary content in a [resource list](https://polaris.shopify.com/components/resource-list)\n\n---\n\n## Content guidelines\n\nSubheadings should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings).\n\n---\n\n## Related components\n\n- To break up major sections of a page with a title, [use the heading component](https://polaris.shopify.com/components/heading)\n\n---\n\n## Accessibility\n\nA clear and consistent heading structure helps merchants who have difficulty with reading or language. It also helps screen reader users to navigate the page using keystrokes that are custom to their screen reader.\n\nUse the `element` prop to determine the specific HTML element that’s output for the subheading. The component defaults to a level 3 heading (`<h3>`). Use a different value for the `element` prop if a different subheading fits the context better.\n\nLearn more about writing helpful [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings).\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nUse subheadings to support the hierarchy and structure of the page.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Use subheadings for style alone.\n- Use subheadings for major sections of the page.\n\n</div></div>',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'title bar',
      'top-level',
      'description',
      'sub-section titles',
      'titles of sub-sections',
      'subsection titles',
      'titles of subsections',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [],
      lifeCyclePhase: 'Deprecated',
      lifeCycleNotice:
        'This component is no longer supported. Please use the Text component instead.',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'subheading.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Subheading component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'T0yWHeZ4TuvFbJvKWUEXk',
    title: 'Text container',
    excerpt:
      'A text container is used to wrap text elements such as paragraphs, headings, and lists to give them vertical spacing.',
    slug: 'text-container',
    parentId: 'yQzAqLeOp6GsdBR6nxscu',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'zx2Is_8nguDi8qZv2E_0x',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nThe closer the spacing, the closer the relationship between content topics. The closeness visually represents the relationship.\n\n- Use tight spacing to relate content topics to each other\n- Use loose spacing to separate concepts that are independent of each other\n\n---\n\n## Related components\n\n- For more layout variations, or if you’re looking to vertically space components other than text, use [Stack](https://polaris.shopify.com/components/layout-and-structure/alpha-stack).',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'spacing',
      'heading',
      'list',
      'layout',
      'vertical',
      'margin',
      'padding',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'text-container-default.tsx',
          title: 'Default',
          description: 'Use this component for default vertical spacing.',
        },
        {
          fileName: 'text-container-tight.tsx',
          title: 'Tight',
          description:
            'Use the tight spacing option to relate content topics to each other.',
        },
        {
          fileName: 'text-container-loose.tsx',
          title: 'Loose',
          description:
            'Use the loose spacing option to separate concepts that are independent of each other.',
        },
      ],
      lifeCyclePhase: 'Deprecated',
      lifeCycleNotice:
        'The TextContainer is a simple layout component which was made redundant by the AlphaStack component. Use AlphaStack with `gap` values of 2, 4, and 5 to replicate layouts.',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'text-container.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Text container component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: '1vL2feL70BzqDhWkq3NSx',
    title: 'Text style',
    excerpt:
      'Text style enhances text with additional visual meaning. For example, using subdued text to de-emphasize it from its surrounding text.',
    slug: 'text-style',
    parentId: 'yQzAqLeOp6GsdBR6nxscu',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'TpSg9-7A2WmFavAz3xHeW',
        blockType: 'Markdown',
        content:
          '## Mapping to the Text component\n\n### Subdued\n\n```diff\n- <TextStyle variation="subdued">No supplier listed</TextStyle>\n+ <Text as="span" color="subdued">No supplier listed</Text>\n```\n\n### Strong\n\n```diff\n- <TextStyle variation="strong">No supplier listed</TextStyle>\n+ <Text as="span" fontWeight="semibold">No supplier listed</Text>\n```\n\n### Positive\n\n```diff\n- <TextStyle variation="positive">No supplier listed</TextStyle>\n+ <Text as="span" color="success">No supplier listed</Text>\n```\n\n### Negative\n\n```diff\n- <TextStyle variation="negative">No supplier listed</TextStyle>\n+ <Text as="span" color="critical">No supplier listed</Text>\n```\n\n### Warning\n\n```diff\n- <TextStyle variation="warning">No supplier listed</TextStyle>\n+ <Text as="span" color="warning">No supplier listed</Text>\n```\n\n### Code\n\n```diff\n- <TextStyle variation="code">No supplier listed</TextStyle>\n+ <Text as="span"><InlineCode>No supplier listed</InlineCode></Text>\n```\n\n---\n\n## Best practices\n\nText style should be:\n\n- Used when enhancing the text to help merchants understand its meaning\n- Subdued if the text is less important than its surrounding text\n- Warning if the text denotes something that needs attention, or that merchants need to take action on.\n- Strong for input fields, or for a row total in a price table\n- Paired with symbols, like an arrow or dollar sign, when using positive or negative styles\n\n---\n\n## Accessibility\n\nDon’t rely on text style alone to convey information to merchants. Ensure that text styles are used to enhance the information provided in text.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n```\n<TextStyle variation="positive">Orders increased</TextStyle>\n```\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n```\n<TextStyle variation="positive">Orders</TextStyle>\n```\n\n</div></div>',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'TextStyle',
      'typographic',
      'subdued',
      'strong',
      'negative',
      'warning',
      'positive',
      'cues',
      'enhancements',
      'type',
      'bold',
      'dollar',
      'increase',
      'decrease',
      'input',
      'fields',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [],
      lifeCyclePhase: 'Deprecated',
      lifeCycleNotice:
        'This component is no longer supported. Please use the Text component instead.',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'text-style.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Text style component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'OBQ4ZLTmuRXgimnB-3DCz',
    title: 'Visually hidden',
    excerpt:
      'Use when an element needs to be available to assistive technology (for example, a screen reader) but otherwise hidden.',
    slug: 'visually-hidden',
    parentId: 'yQzAqLeOp6GsdBR6nxscu',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: '4rCF4pkiJ7NmdpY_j8c1l',
        blockType: 'Markdown',
        content:
          '## Mapping to the Text component\n\n```diff\n- <VisuallyHidden>\n-   <Heading>Title and description</Heading>\n- </VisuallyHidden>\n+ <Text visuallyHidden variant="headingMd" as="h2">Title and description</Text>\n```\n\n---\n\n## Best practices\n\nVisually hidden should:\n\n- Not be used if semantic markup can make content understandable to people using assistive technology\n- Be used to provide extra context when semantic markup isn’t enough\n- Be used on any content that is normally present but is being omitted\n- Make sense in context when used with a screen reader\n\n---\n\n## Accessibility\n\nThe visually hidden component styles text so that it’s not visible, but it is available to assistive technologies like screen readers and other text to speech programs.\n\nThe component shouldn’t be used to hide interactive content.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'VisuallyHidden',
      'screen readers',
      'hidden but available for screen readers',
      'visually hidden headings',
      'hide',
      'hidden headings',
      'hidden text',
      'visually hidden table headers',
      'visually hidden headers',
      'hidden table headers',
      'hidden table headings',
      'accessibility',
      'a11y',
      'assistive technology',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [],
      lifeCyclePhase: 'Deprecated',
      lifeCycleNotice:
        'This component is no longer supported. Please use the Text component instead.',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'visually-hidden.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Visually hidden component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'pL5n5_woeKitbzYWkJHhd',
    title: 'Feedback indicators',
    excerpt: '',
    slug: 'feedback-indicators',
    parentId: 'TMuy-j4fhMovb5NxzFw6G',
    order: 5,
    layout: 'listing',
    blocks: [],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'WXD3GeiEshI7YNY4vPyvP',
    title: 'Badge',
    excerpt:
      'Badges are used to inform merchants of the status of an object or of an action that’s been taken.',
    slug: 'badge',
    parentId: 'pL5n5_woeKitbzYWkJHhd',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'PqsYn2l8GoR2n371H1Pqx',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nBadges benefit merchants by:\n\n- Using established color patterns so that merchants can quickly identify their status or importance level\n- Being clearly labeled with short, scannable text\n- Being positioned to clearly identify the object they’re informing or labelling\n\n---\n\n## Content guidelines\n\n### Badge label\n\nBadge labels should:\n\n- Use a single word to describe the status of an object.\n- Only use two words if you need to describe a complex state. For example, “Partially refunded” and “Partially fulfilled”.\n- Always describe the status in the past tense. For example, refunded not refund.\n\nThe available badges for financial status are:\n\n- Authorized\n- Pending\n- Paid\n- Unpaid\n- Pending\n- Voided\n- Partially paid\n- Partially refunded\n- Refunded\n\nThe available badges for fulfillment status are:\n\n- Fulfilled\n- Complete\n- Partial\n- Unfulfilled\n- Restocked\n\n<div class="dodont"><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nDon’t use alternatives to existing badge options. Only create a new badge option if there aren’t any existing options to communicate the status you need.\n\n</div></div>\n\n---\n\n## Related components\n\n- To represent an interactive list of categories provided by merchants, [use tags](https://polaris.shopify.com/components/tag)\n\n---\n\n## Accessibility\n\nBadges that convey information with icons or color include text provided by the [visually hidden component](https://polaris.shopify.com/components/visually-hidden#navigation). This text is read out by assistive technologies like screen readers so that merchants with vision issues can access the meaning of the badge in context.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'pills',
      'status indicators',
      'color-coded indicators',
      'informational badge',
      'success badge',
      'attention badge',
      'warning badge',
      'critical badge',
      'object status',
      'status',
      'alert',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'badge-default.tsx',
          title: 'Default',
          description:
            'Use to give a non-critical status update on a piece of information or action.',
        },
        {
          fileName: 'badge-small.tsx',
          title: 'Small',
          description:
            'Use in layouts with minimal space, like inside of an `IndexTable` cell.',
        },
        {
          fileName: 'badge-informational.tsx',
          title: 'Informational',
          description:
            'Use to call out an object or action as having an important attribute. For example, marking an option as “Recommended” or marking a theme as “Published”.',
        },
        {
          fileName: 'badge-success.tsx',
          title: 'Success',
          description:
            'Use to indicate a successful, completed, or desirable state when it’s important to provide positive reinforcement to merchants. For example, when merchants successfully dispute a chargeback, a success badge shows that says “Funds recovered”.',
        },
        {
          fileName: 'badge-attention.tsx',
          title: 'Attention',
          description:
            'Use when something requires merchants’ attention but the issue isn’t critical. For example, this badge would show next to an order that needs to be reviewed by merchants.',
        },
        {
          fileName: 'badge-warning.tsx',
          title: 'Warning',
          description:
            'Use for warnings and time-sensitive issues that require merchants’ attention and potential action. Warning events are often reversible. Keep in mind that seeing this badge can feel stressful for merchants so it should only be used when absolutely necessary.',
        },
        {
          fileName: 'badge-critical.tsx',
          title: 'Critical',
          description:
            'Use for critical and irreversible issues that require merchants’ attention and potential action. Keep in mind that seeing this badge can feel stressful for merchants so it should only be used when absolutely necessary.',
        },
        {
          fileName: 'badge-incomplete.tsx',
          title: 'Incomplete',
          description:
            'Use to indicate when a given task has not yet been completed. For example, when merchants haven’t fulfilled an order.',
        },
        {
          fileName: 'badge-partially-complete.tsx',
          title: 'Partially complete',
          description:
            'Use to indicate when a given task has been partially completed. For example, when merchants have partially fulfilled an order.',
        },
        {
          fileName: 'badge-complete.tsx',
          title: 'Complete',
          description:
            'Use to indicate when a given task has been completed. For example, when merchants have fulfilled an order.',
        },
        {
          fileName: 'badge-with-status-and-progress-label-override.tsx',
          title: 'With statusAndProgressLabelOverride',
          description:
            'Use when the status and progress accessibilityLabels are not appropriate to a given context.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'badge.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Badge component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'RhfgIfiyaEpt003DYr-E3',
    title: 'Banner',
    excerpt:
      'Informs merchants about important changes or persistent conditions. Use this component if you need to communicate to merchants in a prominent way. Banners are placed at the top of the page or section they apply to, and below the page or section header.',
    slug: 'banner',
    parentId: 'pL5n5_woeKitbzYWkJHhd',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: '1TB7sSLUnMkk_rOWlm5-M',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nBanners should:\n\n- Be used thoughtfully and sparingly for only the most important information.\n- Not be used to call attention to what a merchant needs to do in the UI instead of making the action clear in the UI itself.\n- Not be the primary entry point to information or actions merchants need on a regular basis.\n- Be dismissible unless they contain critical information or an important step merchants need to take.\n- Use the default icon for `success`, `info`, `warning` and `critical` statuses. If the status icon is changed, use only [major icons](https://polaris.shopify.com/design/icons#major-icons-20-20).\n- Remove the status icon only in scenarios where it takes up too much space, such as very small breakpoints or in side navigation cards.\n\n### Placement\n\nBanners should be placed in the appropriate context:\n\n- Banners relevant to an entire page should be placed at the top of that page, below the page header. They should occupy the full width of the content area.\n- Banners related to a section of a page (like a card, popover, or modal) should be placed inside that section, below any section heading. These banners have less spacing and a pared-back design to fit within a content context.\n- Banners related to an element more specific that a section should be placed immediately above or below that element.\n\n---\n\n## Content guidelines\n\nBanners should:\n\n- Focus on a single theme, piece of information, or required action to avoid overwhelming merchants.\n- Be concise and scannable—merchants shouldn’t need to spend a lot of time figuring out what they need to know and do.\n- Be limited to a few important calls to action with no more than one primary action.\n- Not be used for marketing information or upsell—[use callout cards](https://polaris.shopify.com/components/callout-card) instead.\n\nTo learn about writing helpful and accessible error message text, see the guidelines for [error messages](https://polaris.shopify.com/patterns/error-messages).\n\n### Title\n\nBanner titles should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings).\n\n### Body content\n\nBody content should:\n\n- Be concise: keep content to 1 to 2 sentences where possible\n- Clarify the benefit of the main task\n- Be written in sentence case and use appropriate punctuation\n- Avoid repeating the heading\n- Explain how to resolve the issue, particularly for warning and critical banners\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nYour online store has a maximum of 20 themes. Delete unused themes to add more.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nYou have reached your theme limit. Your online store has reached its maximum of 20 themes. To add more themes, delete themes you’re no longer using.\n\n</div></div>\n\n### Button and links\n\nButtons and links should be:\n\n- Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive merchants by mislabeling a button.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nBuy shipping label\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nBuy\n\n</div></div>\n\n- Action-led: buttons should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on buttons except in the case of common actions like Save, Close, Cancel, or OK.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nActivate Apple Pay\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nTry Apple Pay\n\n</div></div>\n\n- Scannable: avoid unnecessary words and articles such as the, an, or a.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nAdd menu item\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nAdd a menu item\n\n</div></div>\n\nLink text should:\n\n- Set the expectation of where merchants will be taken\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nOrder #001\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nOrder\n\n</div></div>\n\n- Use consistent content to label navigation. For example, if a navigational link leads to a page called Orders, label the link Orders.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nPayments\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nFinance section\n\n</div></div>\n\n### Secondary body content\n\nBody content should be:\n\n- Actionable: start sentences with imperative verbs when telling merchants what actions are available to them (especially something new). Don’t use permissive language like “you can”.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nGet performance data for all your sales channels.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nNow you can get performance data for all your sales channels.\n\n</div></div>\n\n- Structured for merchant success: always put the most critical information first.\n- Clear: use the verb “need” to help merchants understand when they’re required to do something.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nTo buy a shipping label, you need to enter the total weight of your shipment, including packaging.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nTo buy a shipping label, you must enter the total weight of your shipment, including packaging.\n\n</div></div>\n\n---\n\n## Related components\n\n- To inform merchants about a new feature or opportunity, [use callout cards](https://polaris.shopify.com/components/callout-card)\n- To group similar concepts together in the interface, [use a card](https://polaris.shopify.com/components/layout-and-structure/alpha-card)\n\n---\n\n## Accessibility\n\nBanners provide context and assist workflows for merchants with disabilities.\n\n- Critical and warning banners have a `role=”alert”` and are announced by assistive technologies when they appear.\n- All other banners have a `role=”status”` and are read after any critical announcements.\n- All banners have an `aria-live` attribute and are announced by assistive technologies when their content is updated. These announcements can be disabled by using the prop `stopAnnouncements`.\n- Banners use `aria-describedby` to describe their purpose to assistive technologies when they’re announced or receive focus. If a banner has a `title`, then the title content is used for the `aria-describedby`. If the banner doesn’t have a `title`, then all of the banner content is used for the `aria-describedby`.\n- Banner containers have a `tabindex=”0”` and display a visible keyboard focus indicator. Because of this, merchants can discover banners while tabbing through forms or other interactions, and developers can programmatically move focus to banners.\n- Banners use a combination of [icons](https://polaris.shopify.com/design/icons) and [colors](https://polaris.shopify.com/design/colors) to show their meaning and level of importance to merchants.\n\n### Error notifications in forms\n\n#### Critical banners\n\nWhen merchants submit long or complex forms with errors, use a critical banner to summarize what went wrong. Place the banner at the top of the form and move focus to the banner when the form is submitted. This allows all merchants to move through the form in a logical order to correct the issues.\n\n#### Inline errors\n\nAlways include [inline error](https://polaris.shopify.com/components/inline-error) messages for specific form fields so that merchants know what to do in context as they correct their mistakes.\n\nTo learn about creating helpful and accessible error message text, see the guidelines for [error messages](https://polaris.shopify.com/patterns/error-messages).\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Put banners close in context to the problem they’re referring to\n- Give banners with a lot of information a clear title that summarizes their content\n- Move focus to banners if they’re relevant to the merchant’s current workflow and need to be addressed immediately\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Move focus to banners if they appear on page load, or outside the merchant’s current workflow\n- Use warning or critical (`role=”alert”`) banners to convey information that the merchant doesn’t need to address immediately\n\n</div></div>',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'inform',
      'update',
      'changes',
      'conditions',
      'dismissible banners',
      'banner with footer call-to-action',
      'banner with footer button',
      'banner with button',
      'informational banners',
      'success banners',
      'warning banners',
      'critical banners',
      'banner width',
      'banner headings',
      'banner content',
      'banner buttons',
      'banner links',
      'banner body content',
      'banner text',
      'banner body text',
      'full-width alert',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'banner-default.tsx',
          title: 'Default',
          description:
            'Use to convey general information or actions that aren’t critical. For example, you might show a banner that asks for merchant feedback. Default banners contain lower priority information and should always be dismissible.',
        },
        {
          fileName: 'banner-dismissible.tsx',
          title: 'Dismissible',
          description:
            'Make all banners dismissible, unless they contain critical information or an important action that merchants are required to take.',
        },
        {
          fileName: 'banner-with-footer-call-to-action.tsx',
          title: 'With footer call-to-action',
          description:
            'Use when you want merchants to take an action after reading the banner.',
        },
        {
          fileName: 'banner-informational.tsx',
          title: 'Informational',
          description:
            'Use to update merchants about a change or give them advice.',
        },
        {
          fileName: 'banner-success.tsx',
          title: 'Success',
          description:
            'Default to using toasts for success messages, unless the feedback is delayed, persistent, or has a call to action. Include next steps if applicable.',
        },
        {
          fileName: 'banner-warning.tsx',
          title: 'Warning',
          description:
            'Use to display information that needs attention or that merchants need to take action on. Seeing these banners can be stressful for merchants so be cautious about using them.',
        },
        {
          fileName: 'banner-critical.tsx',
          title: 'Critical',
          description:
            'Use to communicate problems that have to be resolved immediately for merchants to complete a task. For example, you will show this banner for orders with high fraud risk. Seeing these banners can be stressful for merchants so be cautious about using them.',
        },
        {
          fileName: 'banner-in-a-modal.tsx',
          title: 'In a modal',
          description:
            'Banners inside of modals render with less spacing and a pared-back design to fit within a content context.',
        },
        {
          fileName: 'banner-with-focus.tsx',
          title: 'With focus',
          description:
            'Banner can programmatically receive focus. Use this functionality to draw the merchant’s attention to the banner.',
        },
        {
          fileName: 'banner-in-a-card.tsx',
          title: 'In a card',
          description:
            'Banners inside of cards render with less spacing and a pared-back design to fit within a content context.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'banner.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Banner component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'wBftZWgGxXTgk9vuNrIPD',
    title: 'Exception list',
    excerpt:
      'Use exception lists to help merchants notice important, standout information that adds extra context to a task. Exception lists often consist of a title and description. Each item in the list either has a bullet or icon at the front.',
    slug: 'exception-list',
    parentId: 'pL5n5_woeKitbzYWkJHhd',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'ujH_bCJLOv2-YBqp_2S8W',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nThe exception list component should:\n\n- Be attached to another component\n- Inform merchants about extra context that will help them make better decisions\n- Only surface noteworthy, actionable content, like a high risk order or out of stock item\n- Used sparingly, so that it has more impact and doesn’t add clutter\n- Only use an icon if it adds clarity to the content or helps merchants visualize the meaning\n\n---\n\n## Content guidelines\n\nException lists should:\n\n- Highlight an exceptional state that helps merchants make a decision\n- Use the appropriate [color](https://polaris.shopify.com/design/colors) to suit the tone of the message\n- Have a description (a title is optional)\n- Be concise\n\nFor error states, exception lists should:\n\n- Either tell merchants how to solve the problem or be attached to an item that lets merchants fix the problem\n\nIf placed next to an item in a [resource list](https://polaris.shopify.com/components/resource-list), exceptions lists should:\n\n- Make the entire list item clickable because the exception list itself isn’t clickable\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- ![Exception list being used inside a resource list item](/images/do-exception-list@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- ![Exception list being used in place of a banner](/images/dont-exception-list@2x.png)\n\n</div></div>\n\n---\n\n## Related components\n\n- To display an error at the top of a page, or to indicate multiple errors in a form, use the [banner](https://polaris.shopify.com/components/feedback-indicators/banner) component\n- Exceptions lists are often used in the [resource list](https://polaris.shopify.com/components/resource-list) component to display conditional content\n\n---\n\n## Accessibility\n\nItems in an exception list are organized as list items (`<li>`) in an unordered list wrapper (`<ul>`), so they’re conveyed as a group of related elements to assistive technology users.\n\nIcons displayed with exception list items are meant to visually reinforce the adjacent information, not to convey information on their own. They are skipped by screen readers using `aria-hidden="true"`.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['exception list', 'exceptions', 'list', 'list exceptions'],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'exception-list-default.tsx',
          title: 'Default',
          description:
            'Use icons to add clarity or assist in visualizing the meaning',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'exception-list.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Exception list component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: '1l82Mgz09ZwXJqF4zlgka',
    title: 'Loading',
    excerpt:
      'The loading component is used to indicate to merchants that a page is loading or an upload is processing.',
    slug: 'loading',
    parentId: 'pL5n5_woeKitbzYWkJHhd',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'SOCkmDgelKi-47sPbiq5q',
        blockType: 'Markdown',
        content:
          '## Required components\n\nThe loading component must be wrapped in the [frame](https://polaris.shopify.com/components/frame) component.\n\n---\n\n## Best practices\n\nThe loading component should:\n\n- Indicate that the page requested is loading.\n- Indicate that an upload has started and the action will soon complete.\n- Be used to give feedback for an entire page load or a page mutation like saving a product.\n- Be used alongside a component or page element that contains `aria-busy` to represent what is loading.\n\n---\n\n## Related components\n\n- To indicate that an action has been received, use the [Spinner](https://polaris.shopify.com/components/spinner)\n- To improve user experience and reduce the appearance of long loading times, use the [Progress bar](https://polaris.shopify.com/components/progress-bar) component.\n- To better represent loading content, use [Skeleton page](https://polaris.shopify.com/components/skeleton-page) along with [Skeleton body text](https://polaris.shopify.com/components/feedback-indicators/skeleton-body-text) and [Skeleton display text](https://polaris.shopify.com/components/skeleton-display-text) components.\n\n---\n\n## Accessibility\n\nThe loading component is implemented using the [ARIA 1.1 progressbar pattern](https://www.w3.org/TR/wai-aria-1.1/#progressbar). It outputs an ARIA `role="progressbar"` and uses `aria-valuemin`, `aria-value-max`, and `aria-valuenow` to convey the loaded percentage to screen reader users.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['spinner', 'loader', 'loading', 'loading bar'],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'loading-default.tsx',
          title: 'Default',
          description: 'Use to indicate that the page is loading.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'loading.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Loading component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'gcfZU85z4GnZUjiwQ1RLZ',
    title: 'Progress bar',
    excerpt:
      'The progress bar component is used to visually represent the completion of a task or operation. It shows how much of the task has been completed and how much is still left.',
    slug: 'progress-bar',
    parentId: 'pL5n5_woeKitbzYWkJHhd',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'fZR-MZ5T9XprqM7xt5PiT',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nProgress bar components should:\n\n- Give merchants an indication of how much of the task has completed and how much is left.\n- Not be used for entire page loads. In this case, use the [Skeleton page](https://polaris.shopify.com/components/skeleton-page) component.\n\n---\n\n## Related components\n\n- For tasks with a short load time, use the [Spinner](https://polaris.shopify.com/components/spinner) component\n- For full page loads, use the [Skeleton page](https://polaris.shopify.com/components/skeleton-page) component',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['ProgressBar', 'progress indicator', 'progress bar', 'loading'],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'progress-bar-default.tsx',
          title: 'Default',
          description:
            'Use this component to visually represent the completion of a task or operation.',
        },
        {
          fileName: 'progress-bar-small.tsx',
          title: 'Small',
          description:
            'Use the size option when you need to increase or decrease the visual weight of the progress bar.',
        },
        {
          fileName: 'progress-bar-colored.tsx',
          title: 'Colored',
          description:
            'Use the color option when you need to blend the progress bar in a context that calls for it, such as a progress toward success or where it’s the primary focus.',
        },
        {
          fileName: 'progress-bar-non-animated.tsx',
          title: 'Non-animated',
          description:
            'Use the animated prop when you want to show a static progress bar.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'progress-bar.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Progress bar component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'lEWIipFtt9z3YOeM4LBOV',
    title: 'Skeleton body text',
    excerpt:
      'Skeleton body text is used to provide a low fidelity representation of content before it appears on the page, and improves load times perceived by merchants. Can be used for content in or outside of a card.',
    slug: 'skeleton-body-text',
    parentId: 'pL5n5_woeKitbzYWkJHhd',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'GFoHFILy3NxVEpxKTK1hF',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nSkeleton body text component should:\n\n- Be used with [Skeleton page](https://polaris.shopify.com/components/skeleton-page) when page content loads all at once. Together, these components give merchants an indication of what the page layout will be once loaded.\n- Be used on its own, inside any content container component (like a [card](https://polaris.shopify.com/components/layout-and-structure/alpha-card)), and when content loads after the main page load.\n- Try to match the number of lines to the content being loaded so it gives an accurate representation.\n\n---\n\n## Content guidelines\n\n### Skeleton body text\n\nShow static content that never changes on a page and use skeleton loading for dynamic content. Skeleton body text can sometimes be used to represent non-typographic content such as forms. Don’t use placeholder content that will change when the page fully loads.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nUse skeleton body text for dynamic content.\n![Image showing skeleton body text for dynamic content](/images/do-use-skeleton-body-for-dynamic-content@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nUse skeleton body text for static content or use placeholder content for dynamic content.\n![Image showing skeleton body text for static content](/images/dont-use-skeleton-body-for-static-or-placeholder-for-dynamic-text@2x.png)\n\n</div></div>\n\n---\n\n## Related components\n\n- Use this component with [Skeleton page](https://polaris.shopify.com/components/skeleton-page) and [Skeleton display text](https://polaris.shopify.com/components/skeleton-display-text) to represent the content of a page while it’s loading.\n- When giving feedback for in-context operations, use [Progress bar](https://polaris.shopify.com/components/progress-bar) or [Spinner](https://polaris.shopify.com/components/spinner) component.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['SkeletonBodyText', 'skeleton', 'loading', 'page'],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'skeleton-body-text-default.tsx',
          title: 'Default',
          description:
            'Use this component to represent a block of content being loaded. For example, you could use it to represent an entire product description card on the product page.',
        },
        {
          fileName: 'skeleton-body-text-single-line-content.tsx',
          title: 'Single line content',
          description:
            'Use this component to represent a short, single line of text, like a timestamp.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'skeleton-body-text.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Skeleton body text component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: '6MYMo6Q3EqKWvIg2hIu28',
    title: 'Skeleton display text',
    excerpt:
      'Skeleton display text is used to provide a low fidelity representation of content before it appears on the page, and improves load times perceived by merchants. Can be used for content in or outside of a card.',
    slug: 'skeleton-display-text',
    parentId: 'pL5n5_woeKitbzYWkJHhd',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'gqHlAYmsmP6cqbHGN5bok',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nSkeleton display text component should:\n\n- Give merchants an indication of what the page content will be once loaded\n- Use real content for display text that never changes\n\n---\n\n## Content guidelines\n\n### Skeleton display text\n\nShow static display text that that never changes on a page. For example, keep page titles, such as Products on the product list page, but use skeleton loading for page titles that change on the product details page.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nShow actual display text for static content and use skeleton display text for dynamic content.\n![Image showing skeleton display text for dynamic content](/images/do-show-display-text-for-static-content@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nUse skeleton display text for static content or placeholder content for dynamic content.\n![Image showing skeleton display text for static content and placeholder text for dynamic content](/images/dont-use-skeleton-for-static-or-placeholder-content-for-dynamic@2x.png)\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nShow skeleton display text for dynamic page titles.\n\n![Image showing skeleton display text for dynamic page title](/images/do-use-skeleton-for-dynamic-page-titles@2x.png)\n\n</div></div>\n\n---\n\n## Related components\n\n- Use this component with [Skeleton page](https://polaris.shopify.com/components/skeleton-page) and [Skeleton body text](https://polaris.shopify.com/components/feedback-indicators/skeleton-body-text) to represent the content of a page before it’s loaded.\n- When giving feedback for in-context operations, use [Progress bar](https://polaris.shopify.com/components/progress-bar) or [Spinner](https://polaris.shopify.com/components/spinner) component.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['SkeletonDisplayText', 'skeleton', 'loading', 'page'],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'skeleton-display-text-medium-and-large.tsx',
          title: 'Medium and large',
          description:
            'Use this component to represent medium and large display text such as large metrics on the reports list page, or for page titles.',
        },
        {
          fileName: 'skeleton-display-text-extra-large.tsx',
          title: 'Extra large',
          description:
            'Use this component to represent extra large display text.',
        },
        {
          fileName: 'skeleton-display-text-small.tsx',
          title: 'Small',
          description:
            'Use this component to represent small display text such as content headings.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'skeleton-display-text.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Skeleton display text component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'AP7na2qhOSenDVUqZUb5s',
    title: 'Skeleton page',
    excerpt:
      'Skeleton page is used with other skeleton loading components to provide a low fidelity representation of the user interface (UI) before content appears on the page. It improves load times perceived by merchants.',
    slug: 'skeleton-page',
    parentId: 'pL5n5_woeKitbzYWkJHhd',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'yRHm_FS_vkKjTN_9sTPRW',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nSkeleton page component should:\n\n- Be used for pages where all content loads at the same time.\n- Give merchants an indication of what the page layout will be once loaded. Do this by mimicking its layout similarly to the state that will be loaded.\n\n---\n\n## Content guidelines\n\nShow page titles that never change for a page. For example, keep the title “Products” on the product list page, but use skeleton loading for titles that change on the product details page. Don’t use placeholder content for titles that will change when the page fully loads.\n\nSecondary actions are always represented with skeleton content. You can change the number of skeleton actions that best represent the number of actions once loaded.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nUse skeleton loading for dynamic content, and use actual content for content that doesn’t change.\n\n![Image showing skeleton loading for changing content](/images/do-use-skeleton-for-changing-content@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nUse placeholder content that will change when the page fully loads. This will confuse merchants and create a jumpy loading experience.\n\n![Image showing placeholder content that will change](/images/dont-use-placeholder-content-that-will-change@2x.png)\n\n</div></div>\n\n---\n\n## Related components\n\n- Use the [Skeleton body text](https://polaris.shopify.com/components/feedback-indicators/skeleton-body-text) and [Skeleton display text](https://polaris.shopify.com/components/skeleton-display-text) components to represent blocks of content.\n- When giving feedback for in-context operations, use [Progress bar](https://polaris.shopify.com/components/progress-bar) or [Spinner](https://polaris.shopify.com/components/spinner) component.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['SkeletonPage', 'skeleton', 'loading', 'page'],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'skeleton-page-with-dynamic-content.tsx',
          title: 'With dynamic content',
          description:
            'Use this component to compose a loading version of a page where the page title and header content are dynamic, meaning, the content changes.',
        },
        {
          fileName: 'skeleton-page-with-static-content.tsx',
          title: 'With static content',
          description:
            'Use this component to compose a loading version of a page where the page title and header content are known and stay the same.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'skeleton-page.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Skeleton page component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'DgDfud9XCHk827CWXiKcC',
    title: 'Skeleton tabs',
    excerpt:
      'Skeleton tabs are used to provide a low fidelity representation of content before it appears on the page, and improves load times perceived by merchants. Can be used for content in or outside of a card.',
    slug: 'skeleton-tabs',
    parentId: 'pL5n5_woeKitbzYWkJHhd',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'OF2z6-qguwORliuKBg27V',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nSkeleton tabs component should:\n\n- Give merchants an indication of what the page content will be once loaded\n\n---\n\n## Related components\n\n- Use this component with [Skeleton page](https://polaris.shopify.com/components/skeleton-page) and [Skeleton body text](https://polaris.shopify.com/components/feedback-indicators/skeleton-body-text) to represent the content of a page before it’s loaded.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['SkeletonTabs', 'skeleton', 'loading', 'page'],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'skeleton-tabs-default.tsx',
          title: 'Default',
          description: '',
        },
        {
          fileName: 'skeleton-tabs-with-a-custom-count.tsx',
          title: 'With a custom count',
          description: '',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'skeleton-tabs.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Skeleton tabs component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'NtLO0ZtilBuZW01HwFXyV',
    title: 'Skeleton thumbnail',
    excerpt:
      'Skeleton thumbnail is used to provide a low fidelity representation of an image before it appears on the page, and improves load times perceived by merchants. Use for thumbnails in or outside of a card.',
    slug: 'skeleton-thumbnail',
    parentId: 'pL5n5_woeKitbzYWkJHhd',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'v7re_GcoIxUZHIcYE_L22',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nSkeleton thumbnail component should:\n\n- Try to match the size of the thumbnail to the content being loaded so it gives an accurate representation.\n\n---\n\n## Related components\n\n- Use this component with [Skeleton display text](https://polaris.shopify.com/components/skeleton-display-text) to represent the content of a card while it’s loading.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['SkeletonThumbnail', 'skeleton', 'loading', 'page'],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'skeleton-thumbnail-medium.tsx',
          title: 'Medium',
          description: 'Use this component to represent medium thumbnails.',
        },
        {
          fileName: 'skeleton-thumbnail-large.tsx',
          title: 'Large',
          description: 'Use this component to represent large thumbnails.',
        },
        {
          fileName: 'skeleton-thumbnail-small.tsx',
          title: 'Small',
          description: 'Use this component to represent small thumbnails.',
        },
        {
          fileName: 'skeleton-thumbnail-extra-small.tsx',
          title: 'Extra small',
          description:
            'Use this component to represent extra small thumbnails.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'skeleton-thumbnail.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Skeleton thumbnail component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: '2FknM3MzEKEjumjri3wqK',
    title: 'Spinner',
    excerpt:
      'Spinners are used to notify merchants that their action is being processed. For loading states, spinners should only be used for content that can’t be represented with skeleton loading components, like for data charts.',
    slug: 'spinner',
    parentId: 'pL5n5_woeKitbzYWkJHhd',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'q_I1eBaVbZL63dtY4AhiT',
        blockType: 'Markdown',
        content:
          '## Accessibility\n\nSVGs are often conveyed inconsistently to assistive technologies. The `Spinner` component’s accessibility is also highly contextual. When the parent component is focusable, you’ll need to set the `hasFocusableParent` prop for the appropriate `role` attribute to be applied.\n\nFor optimal user experience, use the `accessibilityLabel` prop to let assistive technology users know the purpose of the spinner.\n\n---\n\n## Best practices\n\nThe spinner component should:\n\n- Notify merchants that their request has been received and the action will soon complete.\n- Not be used to give feedback for an entire page load.\n- White can only be used with small spinners on actionable components like buttons.\n- On web, be used in conjunction with skeleton loading to represent non-typographic content. For example, line graphs on the Merchant analytics dashboard.\n\n---\n\n## Content guidelines\n\n### Accessibility label\n\nSpinner accessibility label should:\n\n- Accurately explain the state of the requested action. For example, “Loading”, “Submitting”, “Processing”.\n- Use as few words to describe the state as possible.\n\n---\n\n## Related components\n\n- To improve user experience and reduce the appearance of long loading times, use the [Progress bar](https://polaris.shopify.com/components/progress-bar) component.\n- To better represent loading content, use [Skeleton page](https://polaris.shopify.com/components/skeleton-page) along with [Skeleton body text](https://polaris.shopify.com/components/feedback-indicators/skeleton-body-text) and [Skeleton display text](https://polaris.shopify.com/components/skeleton-display-text) components.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['spinner', 'loader', 'loading', 'progress indicator'],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'spinner-default.tsx',
          title: 'Default',
          description:
            'Use to notify merchants that their requested action is being processed.',
        },
        {
          fileName: 'spinner-small.tsx',
          title: 'Small',
          description: 'Smaller than the default spinner.',
        },
        {
          fileName: 'spinner-with-focus-management.tsx',
          title: 'With focus management',
          description:
            'Use to direct the focus state from the control to the spinner, to the content.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'spinner.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Spinner component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'y3yDa6WkUci3STuiAAxhs',
    title: 'Toast',
    excerpt:
      'The toast component is a non-disruptive message that appears at the bottom of the interface to provide quick, at-a-glance feedback on the outcome of an action.',
    slug: 'toast',
    parentId: 'pL5n5_woeKitbzYWkJHhd',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'HhVOdYHNiHl03_ENC2iRg',
        blockType: 'Markdown',
        content:
          '## Required components\n\nThe toast component must be wrapped in the [frame](https://polaris.shopify.com/components/frame) component.\n\n---\n\n## Best practices\n\nToast should:\n\n- Be used for short messages to confirm an action\n- Not go over 3 words\n- Rarely be used for error messages\n\nWhen to use:\n\n- For success messages\n- Only for non-critical errors that are relevant in the moment and can be explained in 3 words. For example, if there’s an internet connection issue, the toast would say, Internet disconnected.\n\nWhen not to use:\n\n- Avoid using toast for error messages. Always try to use a banner to prominently inform merchants about persistent errors.\n\n---\n\n## Content guidelines\n\n### Message\n\nToast messages should be:\n\n- Short and affirmative\n- Written in the pattern of: noun + verb\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Product updated\n- Collection added\n- Customer updated\n- Internet disconnected\n- Connection timed out\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- No internet connection\n- Can’t charge negative tax rates\n- Your online store has a maximum of 20 themes. Delete unused themes to add more.\n- Your product has been successfully updated\n- We were unable to save the customer\n- Your Order was Archived Today\n- Discount: Saved successfully\n\n</div></div>\n\n### Toast with action\n\nOnly include an action in toast if the same action is available elsewhere on the page. For example:\n\n- If merchants need to reload a section, offer the call to action [Reload] in the toast. If they miss the toast message, they can also refresh the entire page.\n- If merchants delete an image, offer the option to [Undo] the deletion. If they miss it in the toast message, they can still retrieve it from somewhere else.\n\nAction should:\n\n- Keep the action label short, preferably 1 verb.\n- Not have actions, like [Cancel], for dismissing toast. The [X] to dismiss is already included in the component.\n- Be used with a duration of at least 10,000 milliseconds for accessibility.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Undo\n- Change\n- Edit\n- View\n- Retry\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- OK\n- Got it\n- Cancel product\n- Continue to collection\n- Dismiss\n\n</div></div>\n\n---\n\n## Related components\n\n- To present a small amount of content or a menu of actions in a non-blocking overlay, [use the popover component](https://polaris.shopify.com/components/overlays/popover)\n- To communicate a change or condition that needs the merchant’s attention within the context of a page, [use the banner component](https://polaris.shopify.com/components/feedback-indicators/banner)\n\n---\n\n## Accessibility\n\nThe content of the toast component is implemented as an ARIA live region using `aria-live="polite"`. When the toast appears, screen readers should announce the toast text after any other more pressing announcements.\n\nAvoid using toast for critical information that merchants need to act on immediately. Toast might be difficult for merchants with low vision or low dexterity to access because it:\n\n- Disappears automatically\n- Can’t be easily accessed with the keyboard\n- Might appear outside the proximity of the merchant’s current focus\n\n### Toast with action\n\nMake sure that merchants can also accomplish the action in the toast another way, since the toast action may be difficult to access for some merchants. If the toast action is not available somewhere else on the page, for example a retry action that reloads a section, it should have a fallback action, for example a browser refresh.\n\nToast with action should persist for at least 10,000 milliseconds to give the merchant enough time to act on it.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'toast',
      'flash message',
      'snackbar',
      'notification bar',
      'temporary feedback',
      'timed feedback',
      'message',
      'overlay',
      'popup',
      'iframe',
      'duration',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'toast-default.tsx',
          title: 'Default',
          description:
            'Use to convey general confirmation or actions that aren’t critical. For example, you might show a toast message to inform the merchant that their recent action was successful.',
        },
        {
          fileName: 'toast-multiple-messages.tsx',
          title: 'Multiple messages',
          description:
            'Use multiple toast messages to inform the merchant about distinct actions.',
        },
        {
          fileName: 'toast-with-custom-duration.tsx',
          title: 'With custom duration',
          description:
            'Use to shorten or lengthen the default duration of 5000 milliseconds.',
        },
        {
          fileName: 'toast-with-action.tsx',
          title: 'With action',
          description:
            'Use when a merchant has the ability to act on the message. For example, to undo a change or retry an action.',
        },
        {
          fileName: 'toast-error.tsx',
          title: 'Error',
          description:
            'Although error toast is still available and used in the system, we discourage its use. Reserve it for errors not caused by merchants, like a connection issue. Error toast should convey what went wrong in plain language and should not go over 3 words. For all other error message types, follow the [error message guidelines](https://polaris.shopify.com/patterns/error-messages).',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'toast.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Toast component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'I9ZH_I4VB3jrYZmtopiva',
    title: 'Images and icons',
    excerpt: '',
    slug: 'images-and-icons',
    parentId: 'TMuy-j4fhMovb5NxzFw6G',
    order: 4,
    layout: 'listing',
    blocks: [],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'X8Vm7URKBcDSHB4hSLPSP',
    title: 'Avatar',
    excerpt:
      'Avatars are used to show a thumbnail representation of an individual or business in the interface.',
    slug: 'avatar',
    parentId: 'I9ZH_I4VB3jrYZmtopiva',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'Iq6MoAtFdwh02kcFjQWjC',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nAvatars should be one of 4 sizes:\n\n- Extra small (24 x 24 px): use in tightly condensed layouts\n- Small (32 × 32 px): use when the medium size is too big for the layout, or when the avatar has less importance\n- Medium (40 × 40 px): use as the default size\n- Large (60 × 60 px): use when an avatar is a focal point, such as on a single customer card\n\n---\n\n## Content guidelines\n\nAny time you use an image to communicate a concept on Shopify, it’s important to use descriptive [alt text](https://polaris.shopify.com/content/alternative-text). Doing this is important for [accessibility](https://polaris.shopify.com/foundations/accessibility) because it allows screen readers to describe what’s in the image to people who may not be able to see it.\n\nFor avatars, we recommend using a format that describes what will show in the image:\n\n- `alt="Person’s name"` if the avatar represents a person\n- `alt="Business’s name"` if the avatar represents a business\n- `alt=""` if the name of the person/business appears next to the avatar as text\n\n---\n\n## Related components\n\n- To show a thumbnail for an object rather than a person or business, [use the thumbnail component](https://polaris.shopify.com/components/thumbnail)\n\n---\n\n## Accessibility\n\n### Structure\n\nThe avatar component uses a generated scalable vector graphics (SVG) file, which can cause challenges for merchants that use assistive technologies. To create a standard experience, the `<img>` is hidden from assistive technologies by using an empty `alt` attribute, and replaced with a `<span>` that has `role=”img”`.\n\n### Labeling\n\nThe avatar component represents content, and should have a text equivalent for merchants using assistive technologies. By default, the value of the `name` prop is used for the alternative text. If different text would be more accurate, use the `accessibilityLabel` prop to replace the value provided by `name`.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'photo',
      'profile',
      'picture',
      'thumbnail',
      'default face',
      'face picture',
      'customer avatar',
      'customer face',
      'customer picture',
      'business face',
      'business picture',
      'customer avatar',
      'business avatar',
      'customer thumbnail',
      'business thumbnail',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'avatar-default.tsx',
          title: 'Default',
          description:
            'Use to present an avatar for a merchant, customer, or business.',
        },
        {
          fileName: 'avatar-extra-small.tsx',
          title: 'Extra small',
          description:
            'Use to present an avatar in a condensed layout, such as a data table cell or an action list item.',
        },
        {
          fileName: 'avatar-square.tsx',
          title: 'Square',
          description:
            'Use a `square` shape when the avatar represents a non-person entity like an app, channel, or store.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'avatar.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Avatar component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'aEiEiZ6e9xLJ9exKE0NT3',
    title: 'Icon',
    excerpt:
      'Icons are used to visually communicate core parts of the product and available actions. They can act as wayfinding tools to help merchants more easily understand where they are in the product, and common interaction patterns that are available.',
    slug: 'icon',
    parentId: 'I9ZH_I4VB3jrYZmtopiva',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'gTeyrzC3t7P0_Ns9G3KEG',
        blockType: 'Markdown',
        content:
          '## Accessibility\n\nUsing icons can be a great help to merchants who have difficulties with reading, language, attention, and low vision.\n\nIf the icon appears without text, then use the `accessibilityLabel` prop to give the icon a text alternative. This adds an `aria-label` that’s conveyed to screen reader users.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Pair text and icons for clarity\n- Give the icon a text equivalent if its purpose isn’t conveyed in another way\n- Review our [alternative text](https://polaris.shopify.com/content/alternative-text) guidelines to make sure your use of icon works for all merchants\n\n```jsx\n<Icon source={OrdersMajor} />\n<p>No orders yet</p>\n```\n\n```jsx\n<Button icon={CirclePlusMinor}>Add a product</Button>\n```\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Describe what the icon looks like\n- Include “icon” in the text equivalent\n- Duplicate adjacent text in the alternative text\n- Duplicate information provided programmatically\n\n```jsx\n<Icon source={CirclePlusMinor} accessibilityLabel="Circle plus icon" />\n```\n\n</div></div>\n\n---\n\n## Related guidelines\n\n- To learn about implementing Polaris icons with [Polaris React](https://github.com/Shopify/polaris-react) in your projects, see the [`@shopify/polaris-icons` documentation](https://www.npmjs.com/package/@shopify/polaris-icons)\n- To learn about the best practices for designing and using icons in your projects, see the [icon design guidelines](https://polaris.shopify.com/design/icons)\n- To learn how to name icons, see the [icon naming guidelines](https://polaris.shopify.com/content/naming#icons)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'iconography',
      'visual indicator',
      'svg',
      'icon background',
      'icon backdrop',
      'accessible icons',
      'icon alternative text',
      'alt text',
      'alternative text',
      'wayfinding',
      'alert',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'icon-default.tsx',
          title: 'Default',
          description:
            'Use to visually communicate core parts of the product and available actions.',
        },
        {
          fileName: 'icon-colored.tsx',
          title: 'Colored',
          description: 'Apply a color to the icon.',
        },
        {
          fileName: 'icon-with-backdrop.tsx',
          title: 'With backdrop',
          description: 'Apply a backdrop to the icon.',
        },
        {
          fileName: 'icon-with-custom-svg.tsx',
          title: 'With custom SVG',
          description:
            'Specify an SVG as a string to render it in an image tag, instead of an inline SVG to prevent script injection.',
        },
        {
          fileName: 'icon-with-custom-svg-and-color.tsx',
          title: 'With custom SVG and color',
          description:
            'When using changing color of an svg and it uses currentColor, the white color is applied.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'icon.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Icon component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'ZxISkb08nxCEYjpkizpiD',
    title: 'Keyboard key',
    excerpt:
      'Keyboard key is used to educate merchants about keyboard shortcuts.',
    slug: 'keyboard-key',
    parentId: 'I9ZH_I4VB3jrYZmtopiva',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'SvlIWQHBkSi87wAxziY_V',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nThe keyboard key component should:\n\n- Include a heading to introduce and explain the shortcuts being described when more than one shortcut is listed\n- Include an action label to describe what will happen if merchants use the key combination\n\n---\n\n## Content guidelines\n\n### Heading\n\nHeadings above the keyboard key should:\n\n- Label the type of keyboard shortcuts being presented\n- Follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings)\n\n### Shortcut description\n\nThe shortcut description should describe what action is taken when merchants tap certain keys. When a hotkey combination takes merchants to a location in the interface, the format should be:\n\n| Properties | Type   | Description                           |\n| ---------- | ------ | ------------------------------------- |\n| children   | string | The content to display inside the key |\n\n---\n\n## Related components\n\n- To add a tooltip for a button with an associated keyboard shortcut, [use the tooltip component](https://polaris.shopify.com/components/tooltip)\n\n---\n\n## Accessibility\n\nThe text of the keyboard key component is read by screen readers, but the visual formatting isn’t conveyed. Ensure that merchants are able to understand information about keyboard shortcuts without relying on the visual style of the component.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Pair lists of keyboard shortcut information with a heading that describes the section (“Keyboard shortcuts”).\n- Provide inline keyboard instructions with context.\n\n```JSX\nPress the <KeyboardKey>Ctrl</KeyboardKey> key.\n```\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don\'t\n\n- Use the keyboard key component alone to convey keyboard instructions.\n\n```JSX\nUse <KeyboardKey>Ctrl</KeyboardKey>\n```\n\n</div></div>',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'KeyboardKey',
      'shortcuts',
      'hotkey',
      'hot key',
      'keyboard shortcuts',
      'keyboard letter',
      'hotkey combinations',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'keyboard-key-default.tsx',
          title: 'Default',
          description: 'Use to list a related set of keyboard shortcuts.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'keyboard-key.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Keyboard key component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'xFVq7W9K0Pi5PRCytb3GO',
    title: 'Thumbnail',
    excerpt:
      'Use thumbnails as a visual anchor and identifier for an object. They should be used along with text to provide context.',
    slug: 'thumbnail',
    parentId: 'I9ZH_I4VB3jrYZmtopiva',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'ANRy6NWwf1SIKrX6YBt4_',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nOn web, thumbnails should:\n\n- Be one of 4 sizes:\n  - Extra small (24 x 24 px): use in tightly condensed layouts\n  - Small (40 × 40 px): use when the medium size is too large for the layout, or when the thumbnail has less importance.\n  - Medium (60 × 60 px): use as the default size.\n  - Large (80 × 80 px): use when an thumbnail is a major focal point. Avoid this size in lists of like items.\n\nOn Android and iOS, thumbnails should:\n\n- Be one of 2 sizes:\n  - Default (40 × 40): use as the default size.\n  - Large (72 × 72): use when an thumbnail is a major focal point. Avoid this size in lists of like items.\n\n---\n\n## Content guidelines\n\nAny time you use an image to communicate a concept on Shopify, it’s important to use descriptive [alt text](https://polaris.shopify.com/content/alternative-text). Doing this is important for [accessibility](https://polaris.shopify.com/foundations/internationalization) because it allows screen readers to describe what’s in the image to people who may not be able to see it.\n\nFor thumbnails, we recommend using a format that describes what will show in the image:\n\n- On web, `alt="Photo of {product}"`. For example, “Photo of black t-shirt with cartoon tiger”.\n- On web, an empty `alt=""` attribute ignores the image in assistive technologies such as screen readers, and may be used on decorative thumbnails.\n- On iOS, `imageView.accessibilityLabel = "Photo of {product}"`. For example, “Photo of black t-shirt with cartoon tiger”.\n- On Android, `android:contentDescription="Photo of {product}"`. For example, “Photo of black t-shirt with cartoon tiger”.\n\n---\n\n## Related components\n\n- To present a thumbnail representation of an individual or business in the interface, [use the avatar component](https://polaris.shopify.com/components/avatar)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'photo',
      'picture',
      'image',
      'small thumbnail',
      'medium thumbnail',
      'large thumbnail',
      'image preview',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'thumbnail-default.tsx',
          title: 'Default',
          description: 'Use as the default size.',
        },
        {
          fileName: 'thumbnail-extra-small.tsx',
          title: 'Extra small',
          description:
            'Use to present a thumbnail in a condensed layout, such as a data table cell or an action list item.',
        },
        {
          fileName: 'thumbnail-small.tsx',
          title: 'Small',
          description:
            'Use when the default size is too large for the layout, or when the thumbnail has less importance.',
        },
        {
          fileName: 'thumbnail-large.tsx',
          title: 'Large',
          description:
            'Use when a thumbnail is a major focal point. Avoid this size in lists of like items.',
        },
        {
          fileName: 'thumbnail-with-component-source.tsx',
          title: 'With component source',
          description: 'Use to render an icon inside of thumbnail.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'thumbnail.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Thumbnail component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'zOjHwo-CPYqzlmKa7eNEK',
    title: 'Video thumbnail',
    excerpt:
      'Video thumbnails are a clickable placeholder image. When clicked, it opens a video player within a modal or full screen.',
    slug: 'video-thumbnail',
    parentId: 'I9ZH_I4VB3jrYZmtopiva',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: '50tXmG-urEslj3acv1s5V',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nVideo thumbnails should:\n\n- Be used with a media card\n- Use an image that communicates the subject of the video\n- Include a video timestamp\n- Capture an image from the video to give a preview of the video content\n- Be cropped to a 16:9 aspect ratio\n- Be centered on the subject and avoid cropping of important details, like a person’s head\n\n---\n\n## Required components\n\n- The video thumbnail should be wrapped in the [media card](https://polaris.shopify.com/components/media-card) component.\n\n---\n\n## Related components\n\n- To present a small visual anchor for an object, [use the thumbnail component](https://polaris.shopify.com/components/thumbnail)\n\n---\n\n## Accessibility\n\nImages included in video thumbnails are implemented as decorative background images so that they’re skipped by screen readers.\n\nThe play button is keyboard accessible and the `aria-label` includes a timestamp when the `videoLength` prop is set. For example, an 80 second video reads as “Play video of length 1 minute and 20 seconds”. If no `videoLength` prop is provided, the default label reads “Play video”.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'video',
      'VideoThumbnail',
      'updates',
      'new features',
      'video thumbnail',
      'feature thumbnail',
      'education',
      'contextual learning system',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'video-thumbnail-default.tsx',
          title: 'Default',
          description:
            'Use as a play button for a video player within a media card.',
        },
        {
          fileName: 'video-thumbnail-with-progress.tsx',
          title: 'With progress',
          description:
            'Use to indicate the video’s play progress in relation to its duration.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'video-thumbnail.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Video thumbnail component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'vjK_ztDtdLP1lKP8zpUsW',
    title: 'Layout and structure',
    excerpt:
      'Layout is the arrangement of elements on a page. A good layout helps merchants understand and find information to complete their goals. Learn how to use Polaris layout primitives to build a wide range of layouts.',
    slug: 'layout-and-structure',
    parentId: 'TMuy-j4fhMovb5NxzFw6G',
    order: 2,
    layout: 'listing',
    blocks: [],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'FNge2xa01u31SVJI8ouqf',
    title: 'Alpha card',
    excerpt:
      'Cards are used to group similar concepts and tasks together for merchants to scan, read, and get things done. It displays content in a familiar and recognizable style.',
    slug: 'alpha-card',
    parentId: 'vjK_ztDtdLP1lKP8zpUsW',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'AJa6quuYZlNal8CgcpDf2',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nCards should:\n\n- Group related information\n- Display information in a way that prioritizes what the merchant needs to know most first\n- Use headings that set clear expectations about the card’s purpose\n- Stick to single user flows or break more complicated flows into multiple sections\n- Avoid too many call-to-action buttons or links and only one primary call to action per card\n- Use calls to action on the bottom of the card for next steps and use the space in the upper right corner of the card for persistent, optional actions (such as Edit)\n\n---\n\n## Related components\n\n- For more flexibility on styling, [use the Box component](https://polaris.shopify.com/components/layout-and-structure/box)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'layout',
      'card',
      'responsive',
      'container',
      'box',
      'grid',
      'panel',
      'card with call to action in the footer',
      'card with call to action in the heading',
      'card with call to action in a section',
      'card with button in the footer',
      'card with button in the heading',
      'card with multiple sections',
      'card with subsections',
      'sectioned card',
      'card with a subdued section',
      'subdued card for secondary content',
      'callout',
      'call out',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'alpha-card-default.tsx',
          title: 'Default',
          description:
            'By default, cards have an 8px border radius and uses `--p-surface` as the background and `--p-shadow-md` as the shadow. There is padding of `space-5` (20px) around children and `space-4` (16px) for small screens.',
        },
        {
          fileName: 'alpha-card-with-subdued-background.tsx',
          title: 'With subdued background',
          description:
            'Use for content that you want to deprioritize. Subdued cards don’t stand out as much as cards with white backgrounds so don’t use them for information or actions that are critical to merchants.',
        },
        {
          fileName: 'alpha-card-with-varying-padding.tsx',
          title: 'With varying padding',
          description:
            'Use the `padding` property to adjust the spacing of content within a card. The `padding` prop supports responsive spacing with the [Breakpoints tokens](https://polaris.shopify.com/tokens/breakpoints).',
        },
        {
          fileName: 'alpha-card-with-rounded-corners.tsx',
          title: 'Rounded corners',
          description:
            'Cards can have a border radius applied responsively with the `roundedAbove` prop.',
        },
      ],
      lifeCyclePhase: 'Alpha',
      lifeCycleNotice:
        'This component is a work in progress and ready for exploratory usage, with breaking changes expected in minor version updates. Please use with caution. Learn more about our [component lifecycles](/getting-started/components-lifecycle).',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'alpha-card.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Alpha card component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'rh8wPcGlV2FLj5Z0Woqei',
    title: 'Alpha stack',
    excerpt:
      'Use to display children vertically with full width by default. Based on CSS Flexbox.',
    slug: 'alpha-stack',
    parentId: 'vjK_ztDtdLP1lKP8zpUsW',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'VM97qtj6-Z7cZbX_Kz0Su',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nStacks should:\n\n- Not be used for complex or unique arrangements of components\n- Not be used for large-scale page layout\n\n---\n\n## Related components\n\n- To display elements horizontally, [use the Inline component](https://polaris.shopify.com/components/inline)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'layout',
      'stack spacing',
      'vertical centering',
      'fill available space',
      'fill space',
      'equal width',
      'right-aligned stack',
      'stack layout',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'alpha-stack-with-gap.tsx',
          title: 'Gap',
          description:
            'Control the vertical space between children using the `gap` prop.',
        },
        {
          fileName: 'alpha-stack-with-align.tsx',
          title: 'Align',
          description:
            'Control the horizontal alignment of children using the `align` prop.',
        },
      ],
      lifeCyclePhase: 'Alpha',
      lifeCycleNotice:
        'This component is a work in progress and ready for exploratory usage, with breaking changes expected in minor version updates. Please use with caution. Learn more about our [component lifecycles](/getting-started/components-lifecycle).',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'alpha-stack.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Alpha stack component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'NvbxtrToRZOIMQ1nCweNR',
    title: 'Bleed',
    excerpt:
      'Applies negative margin to allow content to bleed out into the surrounding layout.',
    slug: 'bleed',
    parentId: 'vjK_ztDtdLP1lKP8zpUsW',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'aCHz38irco5FtfD_w7q1v',
        blockType: 'Markdown',
        content:
          '## Bleed values\n\nContent should never go beyond the edges of the parent container. Choose a bleed value that works within the containing layout.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['layout'],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'bleed-horizontal.tsx',
          title: 'Horizontal',
          description:
            'Content will bleed horizontally into the surrounding layout using the `marginInline` prop.',
        },
        {
          fileName: 'bleed-vertical.tsx',
          title: 'Vertical',
          description:
            'Content will bleed vertically into the surrounding layout using the `marginBlock` prop.',
        },
        {
          fileName: 'bleed-specific-direction.tsx',
          title: 'Specific direction',
          description:
            'Negative margins can be added in a specific direction using the [Spacing tokens](https://polaris.shopify.com/tokens/spacing).',
        },
      ],
      lifeCyclePhase: 'Alpha',
      lifeCycleNotice:
        'This component is a work in progress and ready for exploratory usage, with breaking changes expected in minor version updates. Please use with caution. Learn more about our [component lifecycles](/getting-started/components-lifecycle).',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'bleed.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Bleed component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'WOolfTNAENL4wvvBnFwjy',
    title: 'Box',
    excerpt:
      'Box is the most primitive layout component. It’s a way to access Polaris design tokens.',
    slug: 'box',
    parentId: 'vjK_ztDtdLP1lKP8zpUsW',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'pkZ9xrK4DmEKaeWE3ZS--',
        blockType: 'Markdown',
        content:
          '## Related components\n\n- For more specific use cases, [use the Card component](https://polaris.shopify.com/components/layout-and-structure/alpha-card)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['layout', 'box', 'responsive', 'tokens'],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'box-with-color.tsx',
          title: 'Color',
          description:
            'Background color of box and text color inside a box can be adjusted using the [Color tokens](https://polaris.shopify.com/tokens/colors).',
        },
        {
          fileName: 'box-with-border.tsx',
          title: 'Border width',
          description:
            'Border width can be adjusted using the [Shape tokens](https://polaris.shopify.com/tokens/shape), and a subset of tokens allows different types of border.',
        },
        {
          fileName: 'box-with-border-radius.tsx',
          title: 'Border radius',
          description:
            'Border radius can be adjusted using the [Shape tokens](https://polaris.shopify.com/tokens/shape).',
        },
        {
          fileName: 'box-with-padding.tsx',
          title: 'Padding',
          description:
            'Padding can be added to either all sides, left, right, top, and bottom, using the [Spacing tokens](https://polaris.shopify.com/tokens/spacing). The `padding` prop supports responsive spacing with the [Breakpoints tokens](https://polaris.shopify.com/tokens/breakpoints).',
        },
        {
          fileName: 'box-with-shadow.tsx',
          title: 'Shadow',
          description:
            'Shadow can be applied using the [Shadow tokens](https://polaris.shopify.com/tokens/shadow).',
        },
      ],
      lifeCyclePhase: 'Alpha',
      lifeCycleNotice:
        'This component is a work in progress and ready for exploratory usage, with breaking changes expected in minor version updates. Please use with caution. Learn more about our [component lifecycles](/getting-started/components-lifecycle).',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'box.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Box component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'MUfLMoo0uzz522TdFHnxQ',
    title: 'Callout card',
    excerpt:
      'Callout cards are used to encourage merchants to take an action related to a new feature or opportunity. They are most commonly displayed in the sales channels section of Shopify.',
    slug: 'callout-card',
    parentId: 'vjK_ztDtdLP1lKP8zpUsW',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'iO5tjOZ_dxTS3jIEUcG84',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nCallout cards should:\n\n- Clearly articulate the benefit of the feature and what it does\n- Provide merchants with a clear call to action\n- Be targeted to merchants who will most benefit from the feature\n- Be dismissable so merchants can get rid of cards about features they’re not interested in\n- Use an illustration that helps to communicate the subject or merchant benefit\n\n---\n\n## Content guidelines\n\n### Title\n\nCallout card titles should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings).\n\n### Body content\n\nBody content should be:\n\n- Actionable: start sentences with imperative verbs when telling merchants what actions are available to them (especially something new). Don’t use permissive language like “you can”.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nGet performance data for all your sales channels.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nNow you can get performance data for all your sales channels.\n\n</div></div>\n\n- Structured for merchant success: always put the most critical information first\n- Clear: use the verb “need” to help merchants understand when they’re required to do something\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nTo buy a shipping label, you need to enter the total weight of your shipment, including packaging.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nTo buy a shipping label, you must enter the total weight of your shipment, including packaging.\n\n</div></div>\n\n### Call to action\n\nButtons should be:\n\nClear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive merchants by mislabeling a button.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nBuy shipping label\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nBuy\n\n</div></div>\n\n- Action-led: buttons should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on buttons except in the case of common actions like Save, Close, Cancel, or OK.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nView shipping settings\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nView your settings\n\n</div></div>\n\n- Scannable: avoid unnecessary words and articles such as the, an, or a.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nAdd menu item\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nAdd a menu item\n\n</div></div>\n\n---\n\n## Related components\n\n- To group similar concepts and tasks together, [use the card component](https://polaris.shopify.com/components/layout-and-structure/alpha-card)\n- To create page-level layout, [use the layout component](https://polaris.shopify.com/components/layout-and-structure/layout)\n- To explain a feature that merchants haven’t tried yet, [use the empty state component](https://polaris.shopify.com/components/layout-and-structure/empty-state)\n\n---\n\n## Accessibility\n\nThe required `title` prop gives the callout card a level 2 heading (`<h2>`). This helps with readability and provides structure to screen reader users.\n\nIllustrations included in callout cards are implemented as decorative images with empty `alt` attributes (`alt=""` ) so that they’re skipped by screen readers.\n\nUse [actionable language](https://polaris.shopify.com/content/actionable-language#navigation) to ensure that the purpose of the callout card is clear to all merchants, including those with issues related to reading and language.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'CalloutCard',
      'actionable',
      'updates',
      'new features',
      'call out card',
      'sales channel card',
      'feature card',
      'callout card heading',
      'callout card body content',
      'callout card text',
      'callout card cta',
      'callout card call to action',
      'callout card button',
      'callout card with secondary cta',
      'callout card with secondary button',
      'dismissible callout card',
      'card with illustration',
      'card with image',
      'illustration card',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'callout-card-default.tsx',
          title: 'Default',
          description:
            'Use to let merchants know about a feature or opportunity where there is a clear, single action they need to take to move to the next step.',
        },
        {
          fileName: 'callout-card-with-secondary-action.tsx',
          title: 'With secondary action',
          description:
            'Use to let merchants know about a feature or opportunity where there are two distinct actions they can take on the information.',
        },
        {
          fileName: 'callout-card-dismissable.tsx',
          title: 'Dismissable',
          description:
            'Make all callout cards dismissible so merchants can get rid of cards about features they’re not interested in.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'callout-card.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Callout card component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: '51BLyz0DWOmgInPN9RqFX',
    title: 'Columns',
    excerpt:
      'Use to lay out children horizontally with equal gap between columns. Based on [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid).',
    slug: 'columns',
    parentId: 'vjK_ztDtdLP1lKP8zpUsW',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'N98HRAYInhA0HYt0LEbEO',
        blockType: 'Markdown',
        content:
          '## Related components\n\n- For more control over padding and widths, [use the Box component](https://polaris.shopify.com/components/box)\n- To lay out a set of smaller components horizontally, [use the Inline component](https://polaris.shopify.com/components/inline)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['layout', 'columns', 'grid', 'responsive'],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'columns-with-varying-gap.tsx',
          title: 'Gap',
          description:
            'Use the `gap` prop to set the amount of space between columns. The `gap` prop supports responsive spacing with the [Breakpoints tokens](https://polaris.shopify.com/tokens/breakpoints).',
        },
        {
          fileName: 'columns-with-fixed-widths.tsx',
          title: 'Column width',
          description:
            'The `columns` property accepts CSS column shorthand syntax, or an array of strings mapping to common widths in the admin such as `oneThird`, `oneHalf`, and `twoThirds`. For responsive columns, use the same syntax passed into an object with the breakpoints.',
        },
        {
          fileName: 'columns-with-set-number.tsx',
          title: 'Number of columns',
          description:
            'Control the number of columns using the `columns` prop. Column numbers can be responsively set using the [Breakpoints tokens](https://polaris.shopify.com/tokens/breakpoints).',
        },
      ],
      lifeCyclePhase: 'Alpha',
      lifeCycleNotice:
        'This component is a work in progress and ready for exploratory usage, with breaking changes expected in minor version updates. Please use with caution. Learn more about our [component lifecycles](/getting-started/components-lifecycle).',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'columns.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Columns component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'CWHPqUB3k_PcvTsn2_AWI',
    title: 'Divider',
    excerpt: 'Use to separate or group content.',
    slug: 'divider',
    parentId: 'vjK_ztDtdLP1lKP8zpUsW',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'aFX4ox7cPovp1HNrr_s00',
        blockType: 'Markdown',
        content: '',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['layout', 'divider', 'border'],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'divider-with-border-styles.tsx',
          title: 'Style',
          description:
            'Divider border style can be adjusted using the [Shape tokens](https://polaris.shopify.com/tokens/shape).',
        },
      ],
      lifeCyclePhase: 'Alpha',
      lifeCycleNotice:
        'This component is a work in progress and ready for exploratory usage, with breaking changes expected in minor version updates. Please use with caution. Learn more about our [component lifecycles](/getting-started/components-lifecycle).',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'divider.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Divider component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'g54yldCsgXjvaf0g-Okxe',
    title: 'Empty state',
    excerpt:
      'Empty states are used when a list, table, or chart has no items or data to show. This is an opportunity to provide explanation or guidance to help merchants progress. The empty state component is intended for use when a full page in the admin is empty, and not for individual elements or areas in the interface.',
    slug: 'empty-state',
    parentId: 'vjK_ztDtdLP1lKP8zpUsW',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'U32nTZA2xS9ANk4T7n8ne',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nEmpty states should:\n\n- Orient merchants by clearly explaining the benefit and utility of a product or feature\n- Simplify a complicated experience by focusing on a few key features and benefits\n- Use simple and clear language that empowers merchants to move their business forward\n- Be encouraging and never make merchants feel unsuccessful or guilty because they haven’t used a product or feature\n- Explain the steps merchants need to take to activate a product or feature\n- Use illustrations thoughtfully as outlined in our [illustration guidelines](https://polaris.shopify.com/design/illustrations)\n- Use only one primary call-to-action button\n- Provide extra spacing at the bottom of an empty state that is within content (card, modal, or navigation) to match the image that was passed into the component with a white space above it of 40px\n\n---\n\n## Content guidelines\n\n### Title\n\nEmpty state titles should:\n\n- Be action-oriented: encourage merchants to take the step required to activate the product or feature\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Create orders and send invoices\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Orders and invoices\n\n</div></div>\n\n- Follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings)\n\n### Subtitle\n\nEmpty state subtitles act like body content. They should:\n\n- Describe or explain what’s in the empty state title or item title\n- Be conversational: include articles such as the, a, and an\n\n### Primary action\n\nButtons are used for the most important actions you want merchants to take.\nThey should be:\n\n- Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive merchants by using misleading titles.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Create order\n- Buy shipping label\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- New order\n- Buy\n\n</div></div>\n\n- Action-led: buttons should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on buttons except in the case of common actions like Save, Close, Cancel, or OK.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Activate Apple Pay\n- View shipping settings\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Try Apple Pay\n- View your settings\n\n</div></div>\n\n- Scannable: avoid unnecessary words and articles such as the, an, or a.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Add menu item\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Add a menu item\n\n</div></div>\n\n### Secondary action\n\nSecondary actions are used for less important actions such as “Learn more” or “Close” buttons. They should follow all the other content rules outlined for primary buttons.\n\n---\n\n## Related components\n\n- To learn more about illustrations for empty states, [read the illustration guidelines](https://polaris.shopify.com/design/illustrations)\n- To create page-level layout, [use the layout component](https://polaris.shopify.com/components/layout-and-structure/layout)\n- To highlight a Shopify feature, [use the callout card component](https://polaris.shopify.com/components/callout-card)\n\n---\n\n## Accessibility\n\nEmpty state illustrations are implemented as decorative images, so they use an empty `alt` attribute and are skipped by technologies like screen readers.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'EmptyState',
      'lander',
      'welcome',
      'explain features',
      'describe features',
      'educate about features',
      'merchant education',
      'educational opportunity',
      'educational opportunities',
      'illustration on pages',
      'empty layouts',
      'empty states',
      'starting pages',
      'starting layouts',
      'educating',
      'teaching',
      'landing pages',
      'landing layouts',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'empty-state-default.tsx',
          title: 'Default',
          description:
            'Use to explain a single feature before merchants have used it.',
        },
        {
          fileName: 'empty-state-with-subdued-footer-context.tsx',
          title: 'With subdued footer context',
          description:
            'Use to provide additional but non-critical context for a new product or feature. Can also be used to include a subdued call to action for secondary or tertiary actions.',
        },
        {
          fileName: 'empty-state-with-full-width-layout.tsx',
          title: 'With full width layout',
          description: '',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'empty-state.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Empty state component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: '94-8sh0HOIMfZMJZ3ojfC',
    title: 'Form layout',
    excerpt:
      'Use form layout to arrange fields within a form using standard spacing. By default it stacks fields vertically but also supports horizontal groups of fields.',
    slug: 'form-layout',
    parentId: 'vjK_ztDtdLP1lKP8zpUsW',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: '37u8UlJtmPgqFFJlbg4RW',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nForms should:\n\n- Be considerate of merchants’ time and privacy by only asking for information that’s required\n- Group related tasks under section titles to provide more context and make the interface easier to scan\n- Follow a logical, predictable order—for example, always ask for first name first, and last name second on forms\n\n---\n\n## Content guidelines\n\n### Form section title\n\nForm section titles should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings).\n\n### Field label\n\nA label is a short description of a field. Labels are not help text, and they shouldn’t be used to provide instruction, but they should be meaningful and clearly indicate what is expected. Labels should be:\n\n- Placed above or beside the form field\n- Short and succinct (1–3 words)\n- Written in sentence case (the first word capitalized, the rest lowercase)\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Email address\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- What is your email address?\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Phone number\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- My phone number is:\n\n</div></div>\n\n### Help text\n\nHelp text provides extra guidance to people filling out a form field. This text is easy for people to ignore, so merchants should not need to depend on it to fill out a form. As with all forms, help text should be succinct and easy to read.\n\n---\n\n## Related components\n\n- To arrange the largest sections of a page, [use the layout component](https://polaris.shopify.com/components/layout-and-structure/layout)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'FormLayout',
      'Group',
      'responsive',
      'no grid',
      'stack fields',
      'vertical',
      'vertically',
      'arrange fields',
      'form spacing',
      'field layouts',
      'form field layouts',
      'field stacking',
      'stack fields',
      'vertical form stacking',
      'stack form fields vertically',
      'form layout group',
      'field group',
      'multiple fields in a row',
      'condensed field groups',
      'short inputs',
      'short input fields',
      'short text fields',
      'layout forms',
      'layout input fields',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'form-layout-default.tsx',
          title: 'Default',
          description:
            'Use to stack form fields vertically, which makes them easier to scan and complete.',
        },
        {
          fileName: 'form-layout-field-group.tsx',
          title: 'Field group',
          description:
            'Use field groups to arrange multiple fields in a row. Works best for familiar layouts such as a row of city, state, and zip code fields. Use caution when arranging unrelated fields next to each other as this makes fields easier to miss. Field groups will wrap automatically on smaller screens.',
        },
        {
          fileName: 'form-layout-condensed-field-group.tsx',
          title: 'Condensed field group',
          description:
            'For very short inputs, the width of the inputs may be reduced in order to fit more fields in the row.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'form-layout.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Form layout component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'T7Dmo4tP1xcW0_JjaRTMc',
    title: 'Inline',
    excerpt:
      'Use to display children horizontally in a row. Based on CSS Flexbox.',
    slug: 'inline',
    parentId: 'vjK_ztDtdLP1lKP8zpUsW',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'SyPIY4fxuzrqxFvWZ0fnd',
        blockType: 'Markdown',
        content:
          '## Related components\n\n- To create the large-scale structure of pages, [use the Columns component](https://polaris.shopify.com/components/layout-and-structure/columns)\n- To display elements vertically, [use the AlphaStack component](https://polaris.shopify.com/components/alphastack)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'layout',
      'inline',
      'flexbox',
      'flex',
      'responsive',
      'flexible items',
      'row of components',
      'rows',
      'vertical centering',
      'horizontal row of components',
      'stack',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'inline-with-non-wrapping.tsx',
          title: 'Non-wrapping',
          description:
            'The default wrapping behavior of children can be overridden using the `wrap` prop.',
        },
        {
          fileName: 'inline-with-gap.tsx',
          title: 'Gap',
          description:
            'Control the horizontal and vertical space between children using the `gap` prop. The `gap` prop supports responsive spacing with the [Breakpoints tokens](https://polaris.shopify.com/tokens/breakpoints).',
        },
        {
          fileName: 'inline-with-block-align.tsx',
          title: 'Block align',
          description:
            'Control the vertical alignment of children using the `blockAlign` prop.',
        },
        {
          fileName: 'inline-with-align.tsx',
          title: 'Align',
          description:
            'Control the horizontal alignment of children using the `align` prop.',
        },
      ],
      lifeCyclePhase: 'Alpha',
      lifeCycleNotice:
        'This component is a work in progress and ready for exploratory usage, with breaking changes expected in minor version updates. Please use with caution. Learn more about our [component lifecycles](/getting-started/components-lifecycle).',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'inline.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Inline component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'Gx03RJYH3ZugUgfWSPdoG',
    title: 'Layout',
    excerpt:
      'The layout component is used to create the main layout on a page. Layouts sections come in three main configurations. one-column, two-column, and annotated. One and two column layouts can be combined in the same page. Annotated layouts should be used on their own and only on settings pages.',
    slug: 'layout',
    parentId: 'vjK_ztDtdLP1lKP8zpUsW',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'sZQsmkNnbwQ39W-5GlwM5',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nThe layout component should:\n\n- Use sections with white backgrounds for primary content and sections with grey backgrounds for secondary content that is less important\n- Center cards on the background when there is no secondary card on the page to stop the content from becoming too wide\n- Group similar concepts and actions together in cards\n- Separate different cards using a full-width divider\n- Structure primary/secondary, two-column layouts so the primary ⅔ section is used for main information and the secondary ⅓ section is used for information that might not be used as often but remains helpful for context or secondary tasks\n- Use equal-width layouts with two or more columns when each layout section has the same importance\n\n---\n\n## Content guidelines\n\nThe content that appears in the layout component comes from cards and annotated sections.\n\n### Cards\n\nContent from cards should follow the content guidelines for [cards](https://polaris.shopify.com/components/layout-and-structure/alpha-card#content-guidelines).\n\n### Annotated section titles\n\nAnnotated section titles should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings).\n\n### Annotated section descriptions\n\nAnnotated section descriptions should:\n\n- Be used if the explanation or purpose of the associated cards isn’t clear\n- Provide instructions for any choices merchants need to make, or explain the purpose of the section\n- Be short, no more than 1–3 sentences\n- Direct merchants to more content in the Help Center with “Learn more” links\n- Not repeat the section title\n- Use complete sentences and regular punctuation\n\n---\n\n## Related components\n\n- To visually group content in a layout section, [use the card component](https://polaris.shopify.com/components/layout-and-structure/alpha-card)\n- To lay out a set of smaller components in a row, [use the stack component](https://polaris.shopify.com/components/layout-and-structure/alpha-stack)\n- To lay out form fields, [use the form layout component](https://polaris.shopify.com/components/form-layout)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'one column',
      'two column',
      'three column',
      'column',
      'annotated',
      'page',
      'column layouts',
      'containers',
      'full width containers',
      'secondary sections',
      'setting page',
      'grouped sections',
      'annotated sections',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'layout-one-column.tsx',
          title: 'One-column',
          description:
            'Use to have a single section on its own in a full-width container. Use for simple pages and as a container for banners and other full-width content.',
        },
        {
          fileName: 'layout-two-columns-with-primary-and-secondary-widths.tsx',
          title: 'Two columns with primary and secondary widths',
          description:
            'Use to follow a normal section with a secondary section to create a 2/3 + 1/3 layout on detail pages (such as individual product or order pages). Can also be used on any page that needs to structure a lot of content. This layout stacks the columns on small screens.',
        },
        {
          fileName: 'layout-two-columns-with-equal-width.tsx',
          title: 'Two columns with equal width',
          description:
            'Use to create a ½ + ½ layout. Can be used to display content of equal importance. This layout will stack the columns on small screens.',
        },
        {
          fileName: 'layout-three-columns-with-equal-width.tsx',
          title: 'Three columns with equal width',
          description:
            'Use to create a ⅓ + ⅓ + ⅓ layout. Can be used to display content of equal importance. This layout will stack the columns on small screens.',
        },
        {
          fileName: 'layout-annotated.tsx',
          title: 'Annotated',
          description:
            'Use for settings pages. When settings are grouped thematically in annotated sections, the title and description on each section helps merchants quickly find the setting they’re looking for.',
        },
        {
          fileName: 'layout-annotated-with-sections.tsx',
          title: 'Annotated with sections',
          description:
            'Use for settings pages. When settings are grouped thematically in annotated sections, the title and description on each section helps merchants quickly find the setting they’re looking for.',
        },
        {
          fileName: 'layout-annotated-with-banner-at-the-top.tsx',
          title: 'Annotated with Banner at the top',
          description:
            'Use for settings pages that need a banner or other content at the top.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'layout.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Layout component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'dYZpy8dPuirSp7fA5y7_u',
    title: 'Legacy card',
    excerpt:
      'This is the legacy version of the Card component which is in the process of being updated to a more flexible and composable API. Cards are used to group similar concepts and tasks together to make Shopify easier for merchants to scan, read, and get things done.',
    slug: 'legacy-card',
    parentId: 'vjK_ztDtdLP1lKP8zpUsW',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'pChLJM_sOkdvg1CZ3C1uk',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nCards should:\n\n- Use headings that set clear expectations about the card’s purpose\n- Prioritize information so the content merchants most need to know comes first\n- Stick to single user flows or break more complicated flows into multiple sections\n- Avoid too many call-to-action buttons or links and only one primary call to action per card\n- Use calls to action on the bottom of the card for next steps and use the space in the upper right corner of the card for persistent, optional actions (such as an Edit link)\n\n---\n\n## Content guidelines\n\n### Title\n\nCard titles should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings).\n\n### Body content\n\nBody content should be:\n\n- Actionable: start sentences with imperative verbs when telling merchants what actions are available to them (especially something new). Don’t use permissive language like “you can”.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nGet performance for all your sales channels.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nNow you can get performance data for all your sales channels.\n\n</div></div>\n\n- Structured for merchant success: always put the most critical information first.\n- Clear: use the verb “need” to help merchants understand when they’re required to do something.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nTo buy a shipping label, you need to enter the total weight of your shipment, including packaging.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nTo buy a shipping label, you must enter the total weight of your shipment, including packaging.\n\n</div></div>\n\n### Call-to-action button\n\nButtons should be:\n\n- Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive merchants by mislabeling a button.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Create order\n- Buy shipping label\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- New order\n- Buy\n\n</div></div>\n\nAction-led: buttons should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on buttons except in the case of common actions like Save, Close, Cancel, or OK.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Activate Apple Pay\n- View shipping settings\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Try Apple Pay\n- View your settings\n\n</div></div>\n\nScannable: Avoid unnecessary words and articles such as the, an, or a.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nAdd menu item\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nAdd a menu item\n\n</div></div>\n\n### Section titles\n\nSection titles should be:\n\n- Informative: they should label the type of content grouped in the body content below\n- Like headings: follow the same content guidelines as when you’re writing headings\n\n### Action links\n\nLinks should be:\n\n- Used for secondary or persistent actions: links should be used to represent lower priority actions than buttons, or persistent actions that merchants may take at any time (such as a persistent Edit link).\n- Clearly labeled: merchants should not need to guess where they’ll end up if they click on an action link. Never use “click here” as a link because it doesn’t set expectations about what’s next.\n- Similar to buttons: Follow the same content guidelines as when you’re writing text for buttons.\n\n---\n\n## Related components\n\n- To create page-level layout, [use the layout component](https://polaris.shopify.com/components/layout)\n- To highlight a Shopify feature, [use the callout card component](https://polaris.shopify.com/components/callout-card)\n\n---\n\n## Accessibility\n\nThe required `title` prop gives the card a level 2 heading (`<h2>`). This helps with readability and provides structure to screen reader users.\n\nIf you use the `subdued` prop on a card or section, make sure that the card or section `title` conveys the reason for using `subdued`. This ensures that merchants with low vision, including those who use screen readers, can identify that the content is inactive or less important.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n```\n<LegacyCard title="Deactivated staff accounts" sectioned subdued>\n  <List>\n    <List.Item>Felix Crafford</List.Item>\n    <List.Item>Ezequiel Manno</List.Item>\n  </List>\n</LegacyCard>\n```\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n```\n<LegacyCard title="Staff accounts" sectioned subdued>\n  <List>\n    <List.Item>Felix Crafford</List.Item>\n    <List.Item>Ezequiel Manno</List.Item>\n  </List>\n</LegacyCard>\n```\n\n</div></div>',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'layout',
      'container',
      'box',
      'grid',
      'panel',
      'card with call to action in the footer',
      'card with call to action in the heading',
      'card with call to action in a section',
      'card with button in the footer',
      'card with button in the heading',
      'card with multiple sections',
      'card with subsections',
      'sectioned card',
      'card with a subdued section',
      'subdued card for secondary content',
      'callout',
      'call out',
      'legacy card',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'legacy-card-default.tsx',
          title: 'Default',
          description:
            'Use when you have a simple message to communicate to merchants that doesn’t require any secondary steps.',
        },
        {
          fileName: 'legacy-card-with-header-actions.tsx',
          title: 'With header actions',
          description:
            'Use for less important card actions, or actions merchants may do before reviewing the contents of the card. For example, merchants may want to add items to a card containing a long list, or enter a customer’s new address.',
        },
        {
          fileName: 'legacy-card-with-footer-actions.tsx',
          title: 'With footer actions',
          description:
            'Use footer actions for a card’s most important actions, or actions merchants should do after reviewing the contents of the card. For example, merchants should review the contents of a shipment before an important action like adding tracking information. Footer actions can be left or right aligned with the `footerActionAlignment` prop.',
        },
        {
          fileName: 'legacy-card-with-multiple-footer-actions.tsx',
          title: 'With multiple footer actions',
          description:
            'When multiple secondary footer actions are provided, they will render in an action list popover activated by a disclosure button. The disclosure button text can be customized with the `secondaryFooterActionsDisclosureText` prop.',
        },
        {
          fileName: 'legacy-card-with-custom-footer-actions.tsx',
          title: 'With custom footer actions',
          description:
            'Use to present actionable content that is optional or not the primary purpose of the page.',
        },
        {
          fileName: 'legacy-card-with-destructive-footer-action.tsx',
          title: 'With destructive footer action',
          description:
            'Use when a card action will delete merchant data or be otherwise difficult to recover from.',
        },
        {
          fileName: 'legacy-card-with-multiple-sections.tsx',
          title: 'With multiple sections',
          description:
            'Use when you have two related but distinct pieces of information to communicate to merchants. Multiple sections can help break up complicated concepts to make them easier to scan and understand.',
        },
        {
          fileName: 'legacy-card-with-multiple-titled-sections.tsx',
          title: 'With multiple titled sections',
          description:
            'Use when you have two related but distinct pieces of information to communicate to merchants that are complex enough to require a title to introduce them.',
        },
        {
          fileName: 'legacy-card-with-sections-and-actions.tsx',
          title: 'With sections and actions',
          description:
            'Use when your card section has actions that apply only to that section.',
        },
        {
          fileName: 'legacy-card-with-subsection.tsx',
          title: 'With subsection',
          description:
            'Use when your card sections need further categorization.',
        },
        {
          fileName: 'legacy-card-with-destructive-action.tsx',
          title: 'With destructive action',
          description:
            'Use when a card action applies only to one section and will delete merchant data or be otherwise difficult to recover from.',
        },
        {
          fileName: 'legacy-card-with-a-subdued-section.tsx',
          title: 'With a subdued section',
          description:
            'Use to indicate when one of the sections in your card contains inactive or disabled content.',
        },
        {
          fileName: 'legacy-card-with-subdued-for-secondary-content.tsx',
          title: 'With subdued for secondary content',
          description:
            'Use for content that you want to deprioritize. Subdued cards don’t stand out as much as cards with white backgrounds so don’t use them for information or actions that are critical to merchants.',
        },
        {
          fileName: 'legacy-card-with-separate-header.tsx',
          title: 'With separate header',
          description:
            'Use to be able to use custom React elements as header content.',
        },
        {
          fileName: 'legacy-card-with-custom-react-node-title.tsx',
          title: 'With custom React Node title',
          description:
            'Use to render custom content such as icons, links, or buttons in a card section’s header.',
        },
        {
          fileName: 'legacy-card-with-all-elements.tsx',
          title: 'With all elements',
          description:
            'Use as a broad example that includes most props available to card.',
        },
        {
          fileName: 'legacy-card-with-flushed-sections.tsx',
          title: 'With flushed sections',
          description:
            'Use when you need further control over the spacing of your card sections.',
        },
      ],
      lifeCyclePhase: 'Legacy',
      lifeCycleNotice:
        'This is a legacy component and will be deprecated. The new [AlphaCard component](/components/layout-and-structure/alpha-card) can be used in combination with the new layout primitives to achieve similar results to LegacyCard. Learn more about our [component lifecycles](/getting-started/components-lifecycle).',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'legacy-card.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Legacy card component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'eCNODPC93fDonSAbg48Tr',
    title: 'Legacy stack',
    excerpt:
      'This is the legacy version of the Stack component which is in the process of being updated to a more flexible and composable API. Use to lay out a horizontal row of components or to achieve no-fuss vertical centering. A stack is made of flexible items that wrap each of the stack’s children. Options provide control of the wrapping, spacing, and relative size of the items in the stack.',
    slug: 'legacy-stack',
    parentId: 'vjK_ztDtdLP1lKP8zpUsW',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'dJNHtvKevp3D-pV1sXn4S',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nStacks should:\n\n- Be used for small-scale layout tasks when you want a row of components that should wrap on small screen widths\n- Be used to vertically center two elements\n- Not be used for complex or unique arrangements of components\n- Not be used for large-scale page layout\n\n---\n\n## Stack item\n\nThe stack component will treat multiple elements wrapped in a stack item component as one item. By default, each individual element is treated as one stack item. Use the fill prop on a single stack item component to make it fill the rest of the available horizontal space. See the “Stack where a single item fills the remaining space” example.\n\n### Stack item properties\n\n| Prop     | Type    | Description                                                    | Default |\n| -------- | ------- | -------------------------------------------------------------- | ------- |\n| fill     | boolean | Fill the available horizontal space in the stack with the item | false   |\n| children | any     | Elements to display inside stack item                          |         |\n\n---\n\n## Related components\n\n- To create the large-scale structure of pages, [use the layout component](https://polaris.shopify.com/components/layout)\n\n---\n\n## Accessibility\n\nThe stack component is for alignment only and doesn’t provide any structural information for assistive technologies. To convey relationships between specific items, consider using the [list component](https://polaris.shopify.com/components/list).',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'rows',
      'vertical centering',
      'horizontal row of components',
      'flexible items',
      'flexbox',
      'row of components',
      'stack spacing',
      'vertical centering',
      'fill available space',
      'fill space',
      'equal width',
      'right-aligned stack',
      'stack layout',
      'layout',
      'legacy stack',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'legacy-stack-default.tsx',
          title: 'Default',
          description:
            'Use to quickly lay out a horizontal row of components and maintain their relative sizes. On small screens, children rows wrap down to additional rows as needed.',
        },
        {
          fileName: 'legacy-stack-non-wrapping.tsx',
          title: 'Non-wrapping',
          description:
            'Use to create a stack where the children will not wrap to new rows on small screens. As noted above, the wrap option defaults to true. This means you must explicitly set it to false to turn it off.',
        },
        {
          fileName: 'legacy-stack-spacing.tsx',
          title: 'Spacing',
          description:
            'Use to control spacing of items in a stack in standard increments. Use tight for less spacing, loose for more spacing, or none to remove normal spacing altogether.',
        },
        {
          fileName: 'legacy-stack-vertical-centering.tsx',
          title: 'Vertical centering',
          description:
            'Use to vertically center a set of items that have different heights.',
        },
        {
          fileName: 'legacy-stack-fill-available-space-proportionally.tsx',
          title: 'Fill available space proportionally',
          description:
            'Use to have the stack’s items fill the horizontal space in the container but maintain their relative proportions.',
        },
        {
          fileName: 'legacy-stack-where-items-fill-space-evenly.tsx',
          title: 'Where items fill space evenly',
          description:
            'Use to have the stack’s items fill the horizontal space in the container and be equal widths, regardless of their content.',
        },
        {
          fileName:
            'legacy-stack-where-a-single-item-fills-the-remaining-space.tsx',
          title: 'Where a single item fills the remaining space',
          description:
            'Use for aligning buttons or secondary content to the right edge of another element, allowing it to wrap below on small screens.',
        },
      ],
      lifeCyclePhase: 'Legacy',
      lifeCycleNotice:
        'This is a legacy component and will be deprecated. The new [AlphaStack component](/components/layout-and-structure/alpha-stack) can be used in combination with the new layout primitives to achieve similar results to LegacyStack. Learn more about our [component lifecycles](/getting-started/components-lifecycle).',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'legacy-stack.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Legacy stack component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'S6YBKLb0St9WKdkawhLT5',
    title: 'Media card',
    excerpt:
      "Media cards provide a consistent layout to present visual information to merchants. Visual media is used to provide additional context to the written information it's paired with.",
    slug: 'media-card',
    parentId: 'vjK_ztDtdLP1lKP8zpUsW',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'PHm1UJPAhf96D1jXXofmF',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nMedia cards should:\n\n- Provide merchants with a clear call to action.\n- Always pair text with a visual component, for example, body text paired with an image, video, etc.\n- Use media to enhance the written content. The written content should be able to stand alone without an explanation from the paired media.\n- Show targeted content toward specific audiences to maximize relevance.\n- Be dismissable.\n\n---\n\n## Content guidelines\n\n- Don’t use media cards as advertisements for your feature. Instead they should educate the merchant about how to accomplish tasks related to the section they’re in.\n\n### Title\n\nMedia card titles should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings).\n\n### Body content\n\nBody content should be:\n\n- Actionable: start sentences with imperative verbs when telling merchants what actions are available to them, especially something new. Don’t use permissive language like “you can”.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nGet performance data for all of your sales channels.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nNow you can get performance data for all of your sales channels.\n\n</div></div>\n\n- Structured for merchant success: always put the most critical information first\n- Clear: use the verb “need” to help merchants understand when they’re required to do something\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nTo buy a shipping label, you need to enter the total weight of your shipment, including packaging.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nTo buy a shipping label, you must enter the total weight of your shipment, including packaging.\n\n</div></div>\n\n### Call to action\n\nButtons should be:\n\nClear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive merchants by mislabeling a button.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nBuy shipping label\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nBuy\n\n</div></div>\n\n- Action-led: buttons should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on buttons except in the case of common actions like Save, Close, Cancel, or OK.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nView shipping settings\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nView your settings\n\n</div></div>\n\n- Scannable: avoid unnecessary words and articles such as the, an, or a.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nAdd menu item\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nAdd a menu item\n\n</div></div>\n\n---\n\n## Related components\n\n- To create a video card, [use the video thumbnail component](https://polaris.shopify.com/components/video-thumbnail)\n- To group similar concepts and tasks together, [use the card component](https://polaris.shopify.com/components/layout-and-structure/alpha-card)\n- To create page-level layout, [use the layout component](https://polaris.shopify.com/components/layout-and-structure/layout)\n- To explain a feature that merchants haven’t tried yet, [use the empty state component](https://polaris.shopify.com/components/layout-and-structure/empty-state)\n\n---\n\n## Accessibility\n\nThe required `title` prop gives the media card a level 2 heading (`<h2>`). This helps with readability and provides structure to screen reader users. It can also accept a ReactNode.\n\nUse [actionable language](https://polaris.shopify.com/content/actionable-language#navigation) to ensure that the purpose of the media card is clear to all merchants, including those with issues related to reading and language.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'MediaCard',
      'actionable',
      'updates',
      'new features',
      'Media card',
      'image card',
      'feature card',
      'card with thumbnail',
      'thumbnail card',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'media-card-default.tsx',
          title: 'Default',
          description:
            'Use to surface educational information about a feature or opportunity.',
        },
        {
          fileName: 'media-card-with-small-visual.tsx',
          title: 'With small visual',
          description:
            'Use when there are limited vertical space, or when the card should be less prominent.',
        },
        {
          fileName: 'media-card-with-secondary-action.tsx',
          title: 'With secondary action',
          description:
            'Use when there are two distinct actions merchants can take on the information in the card.',
        },
        {
          fileName: 'media-card-with-no-actions.tsx',
          title: 'With no actions',
          description: 'Use when media card does not require any actions.',
        },
        {
          fileName: 'media-card-video-card.tsx',
          title: 'Video card',
          description:
            'Use to provide a consistent layout for contextual learning content. Use to wrap thumbnails of educational videos about Shopify features in context.',
        },
        {
          fileName: 'media-card-portrait-video-card.tsx',
          title: 'Portrait video card',
          description:
            'Use when vertical screen space is not limited or when the video card is the page’s primary content. For example, in an empty state.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'media-card.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Media card component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'yAZdsY9K6j54_H_LkLpwZ',
    title: 'Page',
    excerpt:
      'Use to build the outer wrapper of a page, including the page title and associated actions.',
    slug: 'page',
    parentId: 'vjK_ztDtdLP1lKP8zpUsW',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'wglR0DG7vrRKngsK9seww',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nThe page component should:\n\n- Always provide a title for the page header.\n- Always provide breadcrumbs when a page has a parent page.\n- Be organized around a primary activity. If that primary activity is a single action, provide it as a primary button in the page header.\n- Provide other page-level actions as secondary actions in the page header.\n- When the page represents an object of a certain type, provide pagination links to the previous and next object of the same type.\n\n---\n\n## Content guidelines\n\n### Title\n\nTitles should:\n\n- Describe the page in as few words as possible.\n- Be the name of the object type (pluralized) when the page is a list of objects. For a list of orders, the page title should be “Orders”.\n- Not be truncated.\n\n### App icon\n\nApp icons should:\n\n- Provide their app icon\n- Only be provided for pages that are part of a Shopify app\n\n### Breadcrumbs\n\nThe content of each breadcrumb link should be the title of the page to which it links.\n\n### Page header actions\n\nPage header action labels should be:\n\n- Clear and predictable: merchants should be able to anticipate what will happen when they click a page action. Never deceive merchants by mislabeling an action.\n\n- Action-led: they should always lead with a strong verb that encourages action. To provide enough context to merchants, use the {verb}+{noun} format.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Create order\n- View in Postmates\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Create\n- Postmates deliveries\n\n</div></div>\n\n- Short: for secondary actions, when the noun represents the same object as the page itself, a verb alone may be used. If there is ambiguity (such as with the verb “Cancel”), always use the {verb}+{noun} format.\n\n  In the context of the orders list page:\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Import\n- Export\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Import orders\n- Export orders\n\n</div></div>\n\n- Scannable: avoid unnecessary words and articles such as the, an, or a.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nAdd menu item\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nAdd a menu item\n\n</div></div>\n\n---\n\n## Related components\n\n- To lay out the content within a page, use the [layout component](https://polaris.shopify.com/components/layout-and-structure/layout)\n- To add pagination within the context of a list or other page content, use the [pagination component](https://polaris.shopify.com/components/navigation/pagination)\n- To add primary and secondary calls to action at the bottom of a page, see the [page actions component](https://polaris.shopify.com/components/actions/page-actions)\n\n## Related patterns\n\n- [App settings layout](/patterns/app-settings-layout)\n- [Resource details layout](/patterns/resource-details-layout)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'page',
      'breadcrumbs',
      'view',
      'title',
      'titlebar',
      'breadcrumbs',
      'pagination',
      'page with all header elements',
      'page without primary action in header',
      'page without pagination',
      'full-width page',
      'narrow-width page',
      'page with action groups',
      'outer wrapper',
      'page actions',
      'page layouts',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'page-default.tsx',
          title: 'Default',
          description:
            'Use for detail pages, which should have pagination and breadcrumbs, and also often have several actions.',
        },
        {
          fileName: 'page-with-custom-primary-action.tsx',
          title: 'With custom primary action',
          description: 'Use to create a custom primary action.',
        },
        {
          fileName: 'page-without-primary-action-in-header.tsx',
          title: 'Without primary action in header',
          description:
            'Use when a primary action functions better as part of the page content instead of in the page header.',
        },
        {
          fileName: 'page-with-destructive-secondary-action.tsx',
          title: 'With destructive secondary action',
          description:
            'Used to visually indicate that the secondary page action is destructive.',
        },
        {
          fileName: 'page-with-custom-secondary-action.tsx',
          title: 'With custom secondary action',
          description: 'Use to create a custom secondary action.',
        },
        {
          fileName: 'page-with-tooltip-action.tsx',
          title: 'With tooltip action',
          description:
            'Use when merchants or their staff will benefit from context on why a page action is disabled.',
        },
        {
          fileName: 'page-with-subtitle.tsx',
          title: 'With subtitle',
          description:
            'Use when the page title benefits from secondary content.',
        },
        {
          fileName: 'page-with-external-link.tsx',
          title: 'With external link',
          description:
            'Use when a secondary action links to another website. Actions marked external open in a new browser tab.',
        },
        {
          fileName: 'page-without-pagination.tsx',
          title: 'Without pagination',
          description:
            'Use when the page doesn’t represent a list of objects or a detail view for an object.',
        },
        {
          fileName: 'page-full-width.tsx',
          title: 'Full-width',
          description:
            'Use for layouts that benefit from more screen width, such as wide tables or lists.',
        },
        {
          fileName: 'page-narrow-width.tsx',
          title: 'Narrow width',
          description:
            'Use a narrow width layout if the page supports a single unified task. When merchants must review the entire page contents to complete their goal, this layout helps focus their attention in a single path from top to bottom.',
        },
        {
          fileName: 'page-with-action-groups.tsx',
          title: 'With action groups',
          description:
            'Use action groups for sets of actions that relate to one another, particularly when there are too many to display as secondary actions. Note that these groups will be further rolled up into a single action for smaller displays so that actions do not wrap or overflow the page bounds.',
        },
        {
          fileName: 'page-with-content-after-title.tsx',
          title: 'With content after title',
          description:
            'Title metadata appears immediately after the page’s title. Use it to communicate brief, important and non-interactive status information about an entire page.',
        },
        {
          fileName: 'page-with-divider.tsx',
          title: 'With divider',
          description:
            'Use when the page needs visual separation between the page header and the content.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'page.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Page component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'KRtEDfdrgqlQwpF0Oo8Hr',
    title: 'Lists',
    excerpt: '',
    slug: 'lists',
    parentId: 'TMuy-j4fhMovb5NxzFw6G',
    order: 8,
    layout: 'listing',
    blocks: [],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'f3Wn9ZZmxNnfFtluG-PqO',
    title: 'Action list',
    excerpt:
      'Action lists render a list of actions or selectable options. This component is usually placed inside a [popover container](https://polaris.shopify.com/components/overlays/popover) to create a dropdown menu or to let merchants select from a list of options.',
    slug: 'action-list',
    parentId: 'KRtEDfdrgqlQwpF0Oo8Hr',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'c2unHbz6xCBbEiD4vgR61',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nActions lists should:\n\n- Be used for secondary or less important information and actions since they’re hidden until merchants expose them by opening a popover\n- Contain actions that are related to each other\n\n---\n\n## Content guidelines\n\n### Action lists\n\nEach item in an action list should be clear and predictable. Merchants should be able to anticipate what will happen when they click on an action item.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nBuy shipping label\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nBuy\n\n</div></div>\n\nEach item in an action list should always lead with a strong verb that encourages action. To provide enough context use the {verb}+{noun} format unless the action is clear with a single verb.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Rename\n- Edit HTML\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- File name changes\n- HTML editing options\n\n</div></div>\n\nEach item in an action list should be scannable avoiding unnecessary words and articles such as the, an, or a.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Add menu item\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Add a menu item\n\n</div></div>\n\n---\n\n## Related components\n\n- To combine more than one button in a single layout, [use the button group component](https://polaris.shopify.com/components/actions/button-group)\n- To display a list of related content, [use the list component](https://polaris.shopify.com/components/lists/list)\n\n---\n\n## Accessibility\n\nItems in an action list are organized as list items (`<li>`) in an unordered list (`<ul>`) and are conveyed as a group of related elements to assistive technology users. Each item is implemented as a [button](https://polaris.shopify.com/components/actions/button).\n\n### Keyboard support\n\n- Give the action list items keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)\n- When action list items have a role of `menuitem`, navigate through the list with <kbd>down arrow</kbd> (<kbd>up arrow</kbd> to move backwards)\n- Activate buttons with the <kbd>enter</kbd>/<kbd>return</kbd> key or the <kbd>space</kbd> key\n\n### High contrast support\n\n- Each item is clearly discernible in high contrast mode\n- Each item that is focused and hovered is clearly discernible in high contrast mode',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'ActionList',
      'dropdown',
      'drop down',
      'popover',
      'pop over',
      'menu',
      'drop-down',
      'select',
      'options',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'action-list-in-a-popover.tsx',
          title: 'In a popover',
          description:
            'Use for the least important actions so merchants aren’t distracted by secondary tasks. Can also be used for a set of actions that won’t fit in the available screen space.',
        },
        {
          fileName: 'action-list-with-icons-or-image.tsx',
          title: 'With icons or image',
          description:
            'Use when the items benefit from an associated action or image, such as a list of products.',
        },
        {
          fileName: 'action-list-with-an-icon-and-a-suffix.tsx',
          title: 'With an icon and a suffix',
          description:
            'Use when the items benefit from an associated action or image, such as a list of products.',
        },
        {
          fileName: 'action-list-with-sections.tsx',
          title: 'With sections',
          description:
            'Use when the items benefit from sections to help differentiate actions.',
        },
        {
          fileName: 'action-list-with-destructive-item.tsx',
          title: 'With destructive item',
          description:
            'Use to visually indicate that an action list item is destructive.',
        },
        {
          fileName: 'action-list-with-help-text.tsx',
          title: 'With help text',
          description:
            'Use help text when the normal Verb noun syntax for the actions does not provide sufficient context for the merchant.',
        },
        {
          fileName: 'action-list-with-a-prefix-and-a-suffix.tsx',
          title: 'With a prefix and a suffix',
          description:
            'Use help text when the normal Verb noun syntax for the actions does not provide sufficient context for the merchant.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'action-list.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Action list component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'C3gvvPxhhRNtwZXrvgAbi',
    title: 'Description list',
    excerpt:
      'Description lists are a way to organize and explain related information. They’re particularly useful when you need to list and define terms such as in a glossary.',
    slug: 'description-list',
    parentId: 'KRtEDfdrgqlQwpF0Oo8Hr',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'x51Lm6X0j3GWzFtp61xPj',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nDescription lists should:\n\n- Contain terms and associated explanations, or descriptions for each term.\n- Provide information that isn’t action-oriented.\n- Not be an excuse for using unnecessarily complicated or jargon-filled language. Generally, if merchants need a description list to understand the language in Shopify, we should look for opportunities to simplify the language.\n- Not be used to upsell merchants on a feature or service.\n\n---\n\n## Content guidelines\n\n### Terms\n\nTerms should be:\n\n- Written in sentence case (the first word capitalized, the rest lowercase)\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Discount code\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Discount Code\n\n</div></div>\n\n### Term description\n\nTerms descriptions should be:\n\n- Directly related to the term they’re describing\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Discount code: A series of numbers and/or letters that an online shopper may enter at checkout to get a discount or special offer.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Discount code: Having a sale on your store is a great way to sell products quickly.\n\n</div></div>\n\n- Written to describe the merchant benefit or utility\n- No more than one or two short sentences in length\n- Written in sentence case with all appropriate punctuation, including ending each sentence with a period\n- Conversational by using articles (the, a, an)\n- Written using plain language\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Abandoned checkout: The details of a checkout that was started but not completed, including the products added and the customer’s details.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Abandoned checkout: Details of products added to checkout but not purchased\n\n</div></div>\n\n---\n\n## Related components\n\n- To create a list of actions or navigation, [use the action list component](https://polaris.shopify.com/components/action-list).\n\n---\n\n## Accessibility\n\nThe description list component produces a description list wrapper (`<dl>`), terms (`<dt>`), and definitions (`<dd>`) to convey the relationships between the list items to assistive technology users.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'DescriptionList',
      'glossary',
      'description',
      'list terms',
      'list and define terms',
      'item lists',
      'text lists',
      'list of terms',
      'term explaination',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'description-list-default.tsx',
          title: 'Default',
          description:
            'Use when you need to present merchants with a list of items or terms alongside descriptions and explanations.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'description-list.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Description list component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'dbRZLlP0alwKDnPPgfbGx',
    title: 'List',
    excerpt:
      'Lists display a set of related text-only content. Each list item begins with a bullet or a number.',
    slug: 'list',
    parentId: 'KRtEDfdrgqlQwpF0Oo8Hr',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'DLWPhcgrrJGMRGHkNfvEm',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nLists should:\n\n- Break up chunks of related content to make the information easier for merchants to scan\n- Be phrased consistently (try to start each item with a noun or a verb and be consistent with each item)\n- Not be used for lists where the entire item represents an action\n\n---\n\n## Content guidelines\n\n### List items\n\nEvery item in a list should:\n\n- Start with a capital letter\n- Not use commas or semicolons at the end of each line\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Red\n- Yellow\n- Blue\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Red;\n- Yellow;\n- Blue.\n\n</div></div>\n\n- Be written in sentence case\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Item one\n- Item two\n- Item three\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Item One\n- Item Two\n- Item Three\n\n</div></div>\n\n---\n\n## Related components\n\n- To create a list of checkboxes or radio buttons, [use the choice list component](https://polaris.shopify.com/components/choice-list)\n- To present a collection of objects of the same type such as customers, products, or orders, [use the resource list component](https://polaris.shopify.com/components/resource-list)\n- When text labels for each item are useful for describing the content, [use the Description List component](https://polaris.shopify.com/components/description-list)\n\n---\n\n## Accessibility\n\nThe list component outputs list items (`<li>`) inside a list wrapper (`<ul>` for bullet lists or `<ol>` for numbered lists). By default, list items are conveyed as a group of related elements to assistive technology users.\n\nTo group items for layout only, consider using the [stack component](https://polaris.shopify.com/components/layout-and-structure/alpha-stack).',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'bulleted lists',
      'numbered lists',
      'icon lists',
      'list items',
      'text lists',
      'text-only lists',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'list-bulleted.tsx',
          title: 'Bulleted',
          description:
            'Use for a text-only list of related items that don’t need to be in a specific order and don’t require an icon or other indicator.',
        },
        {
          fileName: 'list-numbered.tsx',
          title: 'Numbered',
          description:
            'Use for a text-only list of related items when an inherent order, priority, or sequence needs to be communicated.',
        },
        {
          fileName: 'list-extra-tight.tsx',
          title: 'Extra Tight',
          description:
            'Use when there is limited space for a text-only list of related items when an inherent order, priority, or sequence needs to be communicated.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'list.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the List component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'bunpCuM_SlPu3oeoEaxvp',
    title: 'Listbox',
    excerpt:
      'A Listbox is a vertical list of interactive options, with room for icons, descriptions, and other elements.',
    slug: 'listbox',
    parentId: 'KRtEDfdrgqlQwpF0Oo8Hr',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'z-dASNBFYwHfEgRrJSrAs',
        blockType: 'Markdown',
        content:
          '## Anatomy\n\n![A diagram of the Listbox component showing the smaller primitive components it can be composed of.](/images/listbox-anatomy.png)\n\nA listbox can be composed of:\n\n1. **Options:** The individual options inside the Listbox that merchants can select or deselect.\n2. **Dividers:** Placed between items and are useful in complex lists when there’s a lot of information for the merchant to parse.\n3. **Section headers:** Used at the begining of a section when it’s necessary to call out the content being displayed. In most cases, the surrounding context should be enough for the merchant to understand the information in the list.\n\n---\n\n## Best practices\n\nListboxes should:\n\n- Be clearly labeled so it’s noticeable to the merchant what type of options will be available\n- Limit the number of options displayed at once\n- Indicate a loading state to the merchant while option data is being populated\n\n---\n\n## Content guidelines\n\n### Option lists\n\nEach item in a `Listbox` should be clear and descriptive.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Traffic referrer source\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Source\n\n</div></div>\n\n## Patterns that use `Listbox`\n\nLocation picker\n\n---\n\n## Related components\n\n- For a text field and popover container, [use the combobox component](https://polaris.shopify.com/components/combobox)\n- [Autocomplete](https://polaris.shopify.com/components/autocomplete) can be used as a convenience wrapper in lieu of Combobox and Listbox.\n\n---\n\n## Accessibility\n\n### Structure\n\nThe `Listbox` component is based on the [Aria 1.2 Listbox pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox).\n\nIt is important to not present interactive elements inside of list box options as they can interfere with navigation for assistive technology users.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Use labels\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Use interactive elements inside the list\n\n</div></div>\n\n### Keyboard support\n\n- Access the list of options with the up and down arrow keys\n- Select an option that has focus with the <kbd>enter</kbd>/<kbd>return</kbd> key',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['list', 'listbox', 'list box', 'interactive list'],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'listbox-default.tsx',
          title: 'Default',
          description:
            'Basic implementation of a control element used to let merchants select options',
        },
        {
          fileName: 'listbox-with-loading.tsx',
          title: 'With Loading',
          description:
            'Implementation of a control element showing a loading indicator to let merchants know more options are being loaded',
        },
        {
          fileName: 'listbox-with-action.tsx',
          title: 'With Action',
          description:
            'Implementation of a control element used to let merchants take an action',
        },
        {
          fileName: 'listbox-with-custom-element.tsx',
          title: 'With custom element',
          description:
            'Implementation of a control with custom rendering of options',
        },
        {
          fileName: 'listbox-with-search.tsx',
          title: 'With search',
          description:
            'Use to help merchants browse, filter, and choose from a list of options.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'listbox.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Listbox component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'rq18dLuHZsf-eISza30OQ',
    title: 'Option list',
    excerpt:
      'The option list component lets you create a list of grouped items that merchants can pick from. This can include single selection or multiple selection of options. Option list usually appears in a popover, and sometimes in a modal or a sidebar. Option lists are styled differently than [choice lists](https://polaris.shopify.com/components/choice-list) and should not be used within a form, but as a standalone menu.',
    slug: 'option-list',
    parentId: 'KRtEDfdrgqlQwpF0Oo8Hr',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'xZINIM22YSm-TLAVyiYsK',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nThe option list component should:\n\n- Be placed on its own inside a container. Usually the container behaves like a menu, as it does with [popover](https://polaris.shopify.com/components/overlays/popover). Don’t place other components within the same container.\n- Not be used when a [select component](https://polaris.shopify.com/components/select) will do.\n\n---\n\n## Content guidelines\n\n### Option lists\n\nEach item in an option list should be clear and descriptive.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Traffic referrer source\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Source\n\n</div></div>\n\n---\n\n## Related components\n\n- To render a list of actions,\n  [use the action list component](https://polaris.shopify.com/components/action-list)\n- To create a list of grouped radio buttons or checkboxes,\n  [use the choice list component](https://polaris.shopify.com/components/choice-list)\n- For a basic version of option list as a single choice menu,\n  [use the select component](https://polaris.shopify.com/components/select)\n\n---\n\n## Accessibility\n\nItems in an option list are organized as list items (`<li>`) in an unordered list (`<ul>`) and are conveyed as a group of related elements to assistive technology users.\n\nControls in simple option lists are [buttons](https://polaris.shopify.com/components/actions/button), and controls in multiple option lists are [checkboxes](https://polaris.shopify.com/components/checkbox).\n\nIf you customize the option list, you can provide ARIA roles that fit the context. These roles must be valid according to the [W3C ARIA specification](https://www.w3.org/TR/wai-aria-1.1/) to be conveyed correctly to screen reader users.\n\n- The `role` prop adds an ARIA role to the option list wrapper\n- The `optionRole` prop adds an ARIA role to the option list items',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'option list',
      'choices',
      'decision',
      'list',
      'list of tags',
      'list of collections',
      'collections lists',
      'collection lists',
      'list selection',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'option-list-default.tsx',
          title: 'Default',
          description:
            'Use for a group of similar selectable items when only one should be selectable at once.',
        },
        {
          fileName: 'option-list-multiple.tsx',
          title: 'Multiple',
          description:
            'Use when you have a group of similar selectable items and more than one item can be selected at once.',
        },
        {
          fileName: 'option-list-with-sections.tsx',
          title: 'With sections',
          description:
            'Use sections when you have multiple groups of similar selectable items.',
        },
        {
          fileName: 'option-list-in-a-popover.tsx',
          title: 'In a popover',
          description:
            'Use when a set of selections won’t fit in the available screen space.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'option-list.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Option list component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'kcqgJ3UcAt7JkPiFikA5C',
    title: 'Resource item',
    excerpt:
      'Resource items represent specific objects within a collection, such as products or orders. They provide contextual information on the resource type and link to the object’s detail page.',
    slug: 'resource-item',
    parentId: 'KRtEDfdrgqlQwpF0Oo8Hr',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'YMWXUwkABlCsHR7sHtc92',
        blockType: 'Markdown',
        content:
          '## Required components\n\nThe resource item component must be wrapped in the [resource list](https://polaris.shopify.com/components/resource-list) component.\n\n---\n\n## Accessibility\n\nResource items function as links to the full-page representations of the items. Each item should have a unique `name` prop. For each `ResourceItem`, the `accessibilityLabel` prop should be used to give the link a unique `aria-label` value. The `aria-label` value should convey the link’s purpose, using the `name` value. Merchants who use screen readers or other text to speech tools should be able to easily distinguish each link from the others.\n\nWhen adding custom content to resource items, ensure that all text is available to all users and that all custom controls have a unique accessible name to help users understand what will happen when the control is activated.\n\n### Keyboard\n\nLinks can be activated with the <kbd>enter</kbd>/<kbd>return</kbd> key by default.\n\nIf you add custom controls to resource items, then make sure that the controls:\n\n- Can be used with the keyboard\n- Receive keyboard focus in a logical order\n- Display a visible focus indicator\n\n---\n\n## Best practices\n\nResource items should:\n\n- Be tailored to the specific type of context being displayed.\n- Perform an action when clicked. The action should navigate to the resource’s details page or provide more detail about the item.\n\nResource items can optionally:\n\n- Provide [shortcut actions](https://polaris.shopify.com/components/resource-list#study-custom-item-shortcut-actions) for quick access to frequent actions from the resource’s details page.\n\n---\n\n## Content guidelines\n\nResource items should:\n\n- Present the information that merchants need to find the items that they’re looking for.\n- Support merchant tasks for the particular type of resource.\n- Avoid colons.\n- [Shortcut actions](https://polaris.shopify.com/components/resource-list#study-custom-item-shortcut-actions) don’t need to follow the full verb + noun formula for buttons.\n\n---\n\n## Related components\n\nTo display a simple list of related content, [use the list component](https://polaris.shopify.com/components/lists/list).',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'ResourceItem',
      'resource item',
      'collections',
      'items',
      'objects',
      'list of products',
      'list of orders',
      'product lists',
      'order lists',
      'collections lists',
      'collection lists',
      'list of collections',
      'product listings list',
      'channel lists',
      'resource list attributes',
      'list attributes',
      'exceptions list',
      'list secondary actions',
      'secondary actions in a list',
      'list of resources',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'resource-item-default.tsx',
          title: 'Default',
          description:
            'A basic resource item with its details filled in at the point of use.',
        },
        {
          fileName: 'resource-item-with-media.tsx',
          title: 'With media',
          description:
            'The media element can hold an [avatar](https://polaris.shopify.com/components/avatar), [thumbnail](https://polaris.shopify.com/components/thumbnail), or other small-format graphic.',
        },
        {
          fileName: 'resource-item-with-shortcut-actions.tsx',
          title: 'With shortcut actions',
          description:
            'Shortcut actions present popular actions from the resource’s details page for easy access. A shortcut action should be available on every item in the list.',
        },
        {
          fileName: 'resource-item-with-vertical-alignment.tsx',
          title: 'With vertical alignment',
          description: 'Use to adjust the vertical alignment of item content.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'resource-item.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Resource item component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'Rt-s1XzSHhShlLxXri4p6',
    title: 'Resource list',
    excerpt:
      'A resource list displays a collection of objects of the same type, like products or customers. The main job of a resource list is to help merchants find an object and navigate to a full-page representation of it.',
    slug: 'resource-list',
    parentId: 'KRtEDfdrgqlQwpF0Oo8Hr',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'GvpGv0cME4kbjbvKH2LTO',
        blockType: 'Markdown',
        content:
          'Resource lists can also:\n\n- Support [customized list items](https://polaris.shopify.com/components/resource-item)\n- Include bulk actions so merchants can act on multiple objects at once\n- Support sorting and [filtering](https://polaris.shopify.com/components/filters) of long lists\n- Be paired with pagination to make long lists digestible\n\n---\n\n## Build\n\nUsing a resource list in a project involves combining the following components and subcomponents:\n\n- ResourceList\n- [ResourceItem](https://polaris.shopify.com/components/resource-item) or a customized list item\n- [Filters](https://polaris.shopify.com/components/filters) (optional)\n- Pagination component (optional)\n\nThe resource list component provides the UI elements for list sorting, filtering, and pagination, but doesn’t provide the logic for these operations. When a sort option is changed, filter added, or second page requested, you’ll need to handle that event (including any network requests) and then update the component with new props.\n\n---\n\n## Purpose\n\nShopify is organized around objects that represent merchants businesses, like customers, products, and orders. Each individual order, for example, is given a dedicated page that can be linked to. In Shopify, we call these types of objects _resources_, and we call the object’s dedicated page its _details page_.\n\n### Problem\n\nTake orders as an example. Merchants may have a lot of them. They need a way to scan their orders, see what state they’re in and find out which ones need action first. In other words, they need a way find an individual order, call up more information about it, and take action on it.\n\n### Solution\n\nResource lists function as:\n\n- A content format, presenting a set of individual resources in a compact form\n- A system for taking action on one or more individual resources\n- A way to navigate to an individual resource’s details page\n\nBecause a details page displays all the content and actions for an individual resource, you can think of a resource list as a summary of these details pages. In this way resource lists bridge a middle level in Shopify’s navigation hierarchy.\n\n![Schematic showing content from a details page being surfaced on a resource list](/images/list-surfacing-show@2x.png)\n\n#### A resource list isn’t a data table\n\nOn wide screens, a resource list often looks like a table, especially if some content is aligned in columns. Despite this, resource lists and data tables have different purposes.\n\nA data table is a form of data visualization. It works best to present highly structured data for comparison and analysis.\n\nIf your use case is more about visualizing or analyzing data, use the [data table component](https://polaris.shopify.com/components/data-table). If your use case is more about finding and taking action on objects, use a resource list.\n\n---\n\n## Best practices\n\nResource lists can live in many places in Shopify. You could include a short resource list in a card summarizing recent marketing activities. You could also dedicate an entire page to a resource list like Shopify’s main products list.\n\nResource lists should:\n\n- Have items that perform an action when clicked. The action should navigate to the resource’s details page or otherwise provide more detail about the item.\n- [Customize the content and layout](https://polaris.shopify.com/components/resource-item) of their list items to support merchants’ needs.\n- Support sorting if the list can be long, and especially if different merchant tasks benefit from different sort orders.\n- Support [filtering](https://polaris.shopify.com/components/filters) if the list can be long.\n- Paginate when the current list contains more than 50 items.\n- Use the [skeleton page](https://polaris.shopify.com/components/skeleton-page) component on initial page load for the rest of the page if the loading prop is true and items are processing.\n\nResource lists can optionally:\n\n- Provide bulk actions for tasks that are often applied to many list items at once. For example, merchants may want to add the same tag to a large number of products.\n\n---\n\n## Content guidelines\n\nResource lists should:\n\n- Identify the type of resource, usually with a heading\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Products\n- Showing 50 products\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- _No heading_\n\n</div></div>\n\n- Indicate when not all members of a resource are being shown. For a card summarizing and linking to recently purchased products:\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Popular products this week\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Products\n\n</div></div>\n\n- Follow the verb + noun formula for bulk actions\n\n- Follow the [content guidelines for filter options and applied filters](https://polaris.shopify.com/components/filters#content-guidelines)\n\n---\n\n## Related components\n\n- To present structured data for comparison and analysis, like when helping merchants to gain insights or review analytics, use the [data table component](https://polaris.shopify.com/components/data-table)\n- To display a simple list of related content, [use the list component](https://polaris.shopify.com/components/lists/list)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'ResourceList',
      'collections',
      'items',
      'objects',
      'list of products',
      'list of orders',
      'product lists',
      'order lists',
      'collections lists',
      'collection lists',
      'list of collections',
      'product listings list',
      'channel lists',
      'resource list attributes',
      'list attributes',
      'exceptions list',
      'list secondary actions',
      'secondary actions in a list',
      'list of resources',
      'filter',
      'sort',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'resource-list-default.tsx',
          title: 'Default',
          description:
            'A resource list with simple items and no bulk actions, sorting, or filtering.',
        },
        {
          fileName: 'resource-list-with-empty-state.tsx',
          title: 'With empty state',
          description:
            'Use to explain the purpose of a list of resources when no resources exist yet. This allows a smooth transition from a list in a loading state to a list where zero, one, or many resources exist.',
        },
        {
          fileName: 'resource-list-with-selection-and-no-bulk-actions.tsx',
          title: 'With selection and no bulk actions',
          description: 'A resource list with simple items and selection.',
        },
        {
          fileName: 'resource-list-with-bulk-actions.tsx',
          title: 'With bulk actions',
          description:
            'Allows merchants to select items and perform an action on the selection.',
        },
        {
          fileName: 'resource-list-with-loading-state.tsx',
          title: 'With loading state',
          description:
            'Notifies merchants that list items are being processed.',
        },
        {
          fileName: 'resource-list-with-total-count.tsx',
          title: 'With total count',
          description:
            'Use to indicate that the number of resources shown is a subset of the total number of resources in the list.',
        },
        {
          fileName: 'resource-list-with-sorting.tsx',
          title: 'With sorting',
          description:
            'Allows merchants to change the way the list is sorted by selecting one of several options from a [Select](https://polaris.shopify.com/components/select) control.',
        },
        {
          fileName: 'resource-list-with-alternate-tool.tsx',
          title: 'With alternate tool',
          description:
            'Allows merchants to add an alternate tool in the current sort option location when sort may not be the most relevant action for the current list.',
        },
        {
          fileName: 'resource-list-with-filtering.tsx',
          title: 'With filtering',
          description:
            'Allows merchants to narrow the resource list to a subset of the original items.',
        },
        {
          fileName: 'resource-list-with-a-custom-empty-search-result-state.tsx',
          title: 'With a custom empty search result state',
          description:
            'Allows merchants to narrow the resource list to a subset of the original items. If the filters or search applied return no results, then display a custom empty search state.',
        },
        {
          fileName: 'resource-list-with-item-shortcut-actions.tsx',
          title: 'With item shortcut actions',
          description:
            'Shortcut actions are intended to provide quick access to popular actions from the resource’s details page. They are shown when the mouse is hovered over the list item, and are not shown on small screen devices, so the action must also be accessible in another way.',
        },
        {
          fileName: 'resource-list-with-persistent-item-shortcut-actions.tsx',
          title: 'With persistent item shortcut actions',
          description:
            'Use persistent shortcut actions in rare cases when the action cannot be made available on the item’s details page. Persistent shortcut actions roll up into an overflow menu on small screens.',
        },
        {
          fileName: 'resource-list-with-multiselect.tsx',
          title: 'With multiselect',
          description:
            'Allows merchants to select or deselect multiple items at once.',
        },
        {
          fileName: 'resource-list-with-all-of-its-elements.tsx',
          title: 'With all of its elements',
          description:
            'Use as a broad example that includes most props available to resource list.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'resource-list.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Resource list component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'Ryz0xrReP2hHH-ZZ51z6L',
    title: 'Navigation',
    excerpt: '',
    slug: 'navigation',
    parentId: 'TMuy-j4fhMovb5NxzFw6G',
    order: 9,
    layout: 'listing',
    blocks: [],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'V4iDUxV6UjizRWW8W4QjW',
    title: 'Footer help',
    excerpt:
      'Footer help is used to refer merchants to more information related to the product or feature they’re using.',
    slug: 'footer-help',
    parentId: 'Ryz0xrReP2hHH-ZZ51z6L',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'ETZBnSAiY9uHl7Jbx5MV1',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nFooter help should:\n\n- Be positioned at the bottom of the interface\n- Provide links to help that’s related to the experience on the screen\n- Not be used to promote features or provide explanations for how something works\n- Never link to information designed to upsell to merchants\n- In rare cases, link to blog posts when there isn’t any help documentation to help merchants with the most logical next step in the workflow\n\nIt’s recommended to link your footer help component to [help documentation](https://polaris.shopify.com/content/help-documentation). Linking directly to your contact information might result in receiving a higher number of emails or calls.\n\n---\n\n## Content guidelines\n\n### Footer help\n\nBy default, footer help should link to information in the Shopify Help Center and should follow this content pattern:\n\n- Learn more about {X}\n\nLinks should be:\n\nClearly labeled: Merchants shouldn’t need to guess where they’ll end up if they click on an action link. Never use “click here” as a link because it doesn’t set expectations about what’s next.\n\nLinks should not be:\n\nMarked as external: Do not set the `external` prop on the `Link` component to force open a new tab.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Learn more about [shipping zones]\n- [Contact us] about email marketing\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Go to [docs] to learn about zones.\n- Find out about [themes].\n\n</div></div>\n\n---\n\n## Related components and documentation\n\n- To learn how to embed a link in a piece of text, [use the link component](https://polaris.shopify.com/components/link)\n- To learn how to provide support for an app, [use the guide on supporting your app](https://help.shopify.com/en/api/app-store/being-successful-in-the-app-store/supporting-your-app)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'FooterHelp',
      'learn more about',
      'help documentation links',
      'links to help documentation',
      'link to help documentation',
      'footer help boxes',
      'educate about features',
      'merchant education',
      'educational opportunity',
      'educating',
      'teaching',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'footer-help-default.tsx',
          title: 'Default',
          description:
            'Use to direct merchants to more information related to the product or feature they’re working on.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'footer-help.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Footer help component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: '1TzUmA4qSx7zYlaKwkzzP',
    title: 'Fullscreen bar',
    excerpt:
      'The Fullscreen bar is a header component that should be presented at the top of an app when it is in fullscreen mode. This is designed to ensure a uniform placement for a button to exit that mode. The Fullscreen bar can be customized by adding `children`.',
    slug: 'fullscreen-bar',
    parentId: 'Ryz0xrReP2hHH-ZZ51z6L',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'tm0IYZZeh4IjbvvPolJkD',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nThe Fullscreen bar component should:\n\n- Be presented when an App is in fullscreen mode as a means of exiting that mode.\n- Fire an action to exit fullscreen mode.\n\n---\n\n## Related components\n\n- To provide quick, at-a-glance feedback on the outcome of an action, use the [toast](https://polaris.shopify.com/components/feedback-indicators/toast) component.\n- To indicate to merchants that a page is loading or an upload is processing, use the [loading](https://polaris.shopify.com/components/loading) component.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['topbar', 'top bar', 'header', 'bar', 'app'],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'fullscreen-bar-with-children.tsx',
          title: 'With children',
          description:
            'Use to provide structure for the top of an application while in fullscreen mode.',
        },
        {
          fileName: 'fullscreen-bar-no-children.tsx',
          title: 'No children',
          description: 'Use this default to show ONLY the Back button.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'fullscreen-bar.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Fullscreen bar component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: '0ggPCJ-kPPwaG_kd77bFU',
    title: 'Link',
    excerpt:
      'Links take users to another place, and usually appear within or directly following a sentence.',
    slug: 'link',
    parentId: 'Ryz0xrReP2hHH-ZZ51z6L',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'yieGvMh42BbmfBs5c13K_',
        blockType: 'Markdown',
        content:
          '## Best practices\n\n### Buttons versus links\n\nLinks are used primarily for navigation, and usually appear within or directly following a sentence.\n\nButtons are used primarily for actions, such as “Add”, “Close”, “Cancel”, or “Save”. Plain buttons, which look similar to links, are used for less important or less commonly used actions, such as “view shipping settings”.\n\nThe HTML that renders for the `Button` and `Link` components carries meaning. Using these components intentionally and consistently results in:\n\n- a more inclusive experience for assistive technology users\n- a more cohesive visual experience for sighted users\n- products that are easier to maintain at scale\n\n### Open a new tab only when necessary\n\nUse default links whenever possible to avoid disorienting merchants and causing accessibility problems by opening a new tab.\n\nExternal links should be used when merchants are:\n\n- Performing a task or workflow, like creating a product\n- Navigating to a page outside of the Shopify admin\n\n### No icon\n\nAvoid using the [external icon](/icons?icon=ExternalMinor&q=external), as it can add unnecessary visual load inside a sentence or when accompanied by other content. Instead, add clarity to external links through clear link text and predictable placement of the link in a merchant’s workflow.\n\nEdge cases: External icons should not be used to indicate a new tab or window is being opened. However, they may be used sparingly in features where symbols help merchants scan and pick from a list of several kinds of navigation options, like the admin\'s global search results.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nUse as a standalone, identifying icon only\n\n![Shopify admin search search results with an example of the external link icon being used as a decorative element](/images/external-link-icon-decorative@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nAvoid using the icon beside link text\n\n![Shopify admin page with an example of an external link to the Shopify help center with no icon](/images/external-link-dont-example@2x.png)\n\n</div></div>\n\n### Unstyled links\n\nIf the existing link styles don’t meet the needs of your project, then use the `UnstyledLink` component to create a custom link style.\n\n---\n\n## Content guidelines\n\nThe link component should follow the content guidelines for [links](https://polaris.shopify.com/content/actionable-language#links).\n\n---\n\n## Related components\n\n- For actions that don’t appear within or directly following a sentence, use the [button component](https://polaris.shopify.com/components/actions/button)\n\n---\n\n## Accessibility\n\nUse the `url` prop to give the link component a valid `href` value. This allows the element to be identified as a link to assistive technologies and gives it default keyboard support.\n\nThe Link component is underlined to give interactive elements a shape. This allows links to not rely on color from being the only way users can tell if an element is interactive.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Remove the link underline when link is repeated in a list or navigation\n- Use underlines for links when used inline content\n\n```jsx\n<p>\n  Learn more about <Link>Fraud Protect</Link>.\n</p>\n```\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Remove underlines when the user cannot determine it\'s interactivity\n\n```jsx\n<Link removeUnderline>Learn more about Fraud Protect.</Link>\n```\n\n</div></div>\n\n### Submitting data\n\nMerchants generally expect links to navigate, and not to submit data or take action. If you need a component that doesn’t have a URL associated with it, then use the [button component](https://polaris.shopify.com/components/actions/button) instead.\n\n### Labeling\n\nGive links text that clearly describes their purpose.\n\nThe `accessibilityLabel` prop adds an `aria-label` attribute to the link, which can be accessed by assistive technologies like screen readers. Typically, this label text replaces the visible text on the link for merchants who use assistive technology.\n\nTo provide consistency and clarity:\n\n- Use the same text for links that navigate to the same content\n- Use different text for links that navigate to different content\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n```jsx\n<Link url="https://help.shopify.com/manual">fulfilling orders</Link>\n```\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n```jsx\n<Link>fulfilling orders</Link>\n```\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n```jsx\n/* Somewhere in the code: */\n<Link url="https://help.shopify.com/manual">fulfilling orders</Link>\n\n/* Elsewhere in the code: */\n<Link url="https://help.shopify.com/manual">fulfilling orders</Link>\n```\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n```jsx\n/* Somewhere in the code: */\n<Link url="https://help.shopify.com/manual">fulfilling orders</Link>\n\n/* Elsewhere in the code: */\n<Link url="https://help.shopify.com/manual">order fulfillment section</Link>\n```\n\n</div></div>\n\n### Keyboard support\n\nLinks use browser defaults for keyboard interaction.\n\n- Give links keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)\n- Activate links with the <kbd>enter</kbd>/<kbd>return</kbd> key',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'URL',
      'linklist',
      'link list',
      'embed',
      'actions',
      'pathways',
      'deep link',
      'text link',
      'plain button',
      'plain call to action',
      'plain cta',
      'embeddd action',
      'action in text',
      'hyperlink',
      'secondary actions',
      'secondary cta',
      'secondary call to action',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'link-default.tsx',
          title: 'Default links',
          description:
            'Use for text links inside a paragraph or for standalone text. Default links open in the same browser tab.',
        },
        {
          fileName: 'link-monochrome.tsx',
          title: 'Monochrome',
          description:
            'Use for text links that are the same color as the surrounding text.',
        },
        {
          fileName: 'link-monochrome-in-a-banner.tsx',
          title: 'Monochrome in a banner',
          description:
            'Monochrome styles will be applied to links rendered within a `Banner`.',
        },
        {
          fileName: 'link-external.tsx',
          title: 'External link',
          description:
            'Use for text links that should open in a new browser tab (or window, depending on the merchant’s browser settings). Use this only when a default link might disrupt the merchant’s workflow.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'link.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Link component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'Eumx5Q0xDSspbFYDO3iMZ',
    title: 'Navigation',
    excerpt:
      'The navigation component is used to display the primary navigation in the sidebar of the [frame](https://polaris.shopify.com/components/frame) of an application. Navigation includes a list of links that merchants use to move between sections of the application.',
    slug: 'navigation',
    parentId: 'Ryz0xrReP2hHH-ZZ51z6L',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'pFJD9_bP2GJuiNa1D-bLW',
        blockType: 'Markdown',
        content:
          '## Required components\n\nThe navigation component must be passed to the [frame](https://polaris.shopify.com/components/frame) component. The mobile version of the navigation component appears in the [top bar](https://polaris.shopify.com/components/top-bar) component.\n\n---\n\n## Best practices\n\nThe navigation component should:\n\n- Contain primary navigation items that perform an action when clicked. Each action should navigate to a URL or trigger another action like a modal overlay.\n- Only use secondary actions for supplementary actions to the primary actions.\n- Provide a non-primary link or action as a secondary action to a section or an item.\n- Group navigation items into sections based on related categories.\n- Use a section title to clarify the category of a section.\n- Use a major icon for item actions.\n- Use a minor icon for secondary actions.\n- Use the provided navigation section component to group navigation items.\n- Not add additional components, like [badge](/components/feedback-indicators/badge), in navigation items. Example: Don‘t add the [New badge](/patterns-legacy/new-badge).\n\n---\n\n## Content guidelines\n\nNavigation should:\n\n- Use sentence case for primary and secondary navigation items\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Online store\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Online Store\n\n</div></div>\n\n- Use as few words as possible to describe each item label\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Products\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Products in your store\n\n</div></div>\n\n- Use all caps for section labels\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- SALES CHANNELS\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Sales channels\n\n</div></div>\n\n---\n\n## Navigation section\n\nA navigation section groups together related navigation items. Navigation sections can be clarified by a heading. Merchants can use a section to easily find navigation items within a specific category.\n\n### Section properties\n\n| Prop      | Type                   | Description                                                                                   |\n| --------- | ---------------------- | --------------------------------------------------------------------------------------------- |\n| items     | [Item[]](#type-item)   | A collection of navigation items to be rendered inside the section                            |\n| icon      | IconProps[\'source\']    | An icon to be displayed next to the section title                                             |\n| title     | string                 | A string property providing a title for the navigation section                                |\n| fill      | boolean                | A boolean property indicating whether the section should take up all vertical space available |\n| rollup    | [Rollup](#type-rollup) | An object determining the collapsing behavior of the navigation section                       |\n| action    | [Action](#type-action) | Renders an icon-only action as a supplementary action next to the section title               |\n| separator | boolean                | A boolean property indicating whether the section should have a visual separator              |\n\n### Navigation section item\n\nThe content of the navigation component consists of navigation items. Each item is a link or action a merchant can take.\n\n#### Item properties\n\n| Prop                  | Type                                        | Description                                                                                                                                             |\n| --------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| url                   | string                                      | A location for the navigation item to navigate to when clicked                                                                                          |\n| matches               | boolean                                     | A boolean property indicating whether the navigation item should respond to a closely matching location property                                        |\n| exactMatch            | boolean                                     | A boolean property indicating whether the navigation item should respond to an exactly matching location property                                       |\n| matchPaths            | string[]                                    | A string property providing a collection of additional paths for the navigation item to respond to                                                      |\n| excludePaths          | string[]                                    | A string property providing an explicit collection of paths the navigation item should not respond to                                                   |\n| icon                  | IconProps[\'source\']                         | An icon to be displayed next to the navigation. Please prefer minor icons here. If a major icon has to be used, set the `shouldResizeIcon` prop to true |\n| badge                 | string \\| null                              | A string property allowing content to be displayed in a badge next to the navigation item                                                               |\n| label                 | string                                      | A string property allowing content to be displayed as link text in the navigation item                                                                  |\n| disabled              | boolean                                     | A boolean property indicating whether the navigation item is disabled                                                                                   |\n| new                   | boolean                                     | Indicate whether the navigation item is new by adding an indicator dot to the parent and badge to the item (overwritten by the badge prop)              |\n| accessibilityLabel    | string                                      | A visually hidden label for screen readers to understand the content of a navigation item                                                               |\n| selected              | boolean                                     | A boolean property indicating whether the navigation item is the currently-selected item                                                                |\n| shouldResizeIcon      | boolean                                     | Will allow for major icons to be displayed at the same size as minor icons                                                                              |\n| subNavigationItems    | [SubNavigationItem[]](#sub-navigation-item) | A collection of navigation items rendered as nested secondary navigation items                                                                          |\n| secondaryAction       | [SecondaryAction](#secondary-action)        | Renders an icon-only action as a supplementary action next to a navigation item                                                                         |\n| secondaryActions      | [SecondaryAction[]](#secondary-action)      | Renders one or two icon-only actions as supplementary actions next to a navigation item                                                                 |\n| onClick()             | function                                    | A callback function to handle clicking on a navigation item                                                                                             |\n| truncateText          | boolean                                     | A boolean property to allow text that exceeds the width of the navigation item to be truncated with ellipsis                                            |\n| displayActionsOnHover | boolean                                     | A boolean to only display secondary actions when being the nabigation item is hovered (Only on desktop)                                                 |\n\n### SubNavigationItem\n\n#### Properties\n\n| Prop         | Type     | Description                                                                                                                                |\n| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |\n| url          | string   | A location for the navigation item to navigate to when clicked                                                                             |\n| matches      | boolean  | A boolean property indicating whether the navigation item should respond to a closely matching location property                           |\n| exactMatch   | boolean  | A boolean property indicating whether the navigation item should respond to an exactly matching location property                          |\n| matchPaths   | string[] | A string property providing a collection of additional paths for the navigation item to respond to                                         |\n| excludePaths | string[] | A string property providing an explicit collection of paths the navigation item should not respond to                                      |\n| external     | boolean  | Indicates whether this is an external link. If it is, an external link icon will be shown next to the label                                |\n| label        | string   | A string property allowing content to be displayed as link text in the navigation item                                                     |\n| disabled     | boolean  | A boolean property indicating whether the navigation item is disabled                                                                      |\n| new          | boolean  | Indicate whether the navigation item is new by adding an indicator dot to the parent and badge to the item (overwritten by the badge prop) |\n| onClick()    | function | A callback function to handle clicking on a navigation item                                                                                |\n\n### SecondaryAction\n\n#### Properties\n\n| Prop               | Type                                                                      | Description                                                                                                                                             |\n| ------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| url                | string                                                                    | A location for the navigation item to navigate to when clicked                                                                                          |\n| accessibilityLabel | string                                                                    | A visually hidden label for screen readers to understand the content of a navigation item                                                               |\n| icon               | IconProps[\'source\']                                                       | An icon to be displayed next to the navigation. Please prefer minor icons here. If a major icon has to be used, set the `shouldResizeIcon` prop to true |\n| onClick()          | function                                                                  | A callback function to handle clicking on a navigation item                                                                                             |\n| tooltip            | [TooltipProps](https://polaris.shopify.com/components/tooltip#navigation) | Options for displaying a tooltip when you hover over the action button                                                                                  |\n\n### Navigation section rollup\n\nRollup allows items in a navigation section to roll up and be revealed when they are of use to the merchant.\n\n#### Rollup properties\n\n| Prop       | Type   | Description                                                              |\n| ---------- | ------ | ------------------------------------------------------------------------ |\n| after      | number | A number of items after which the navigation section should be collapsed |\n| view       | string | A string property providing content for the section view action          |\n| hide       | string | A string property providing content for the section hide action          |\n| activePath | string | A string property representing the current URL of your application       |\n\n### Navigation section action\n\nAction allows a complementary icon-only action to render next to the section title.\n\n#### Action properties\n\n| Prop               | Type                                                                      | Description                                                                        |\n| ------------------ | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |\n| icon               | IconProps[\'source\']                                                       | An icon to be displayed as the content of the action                               |\n| accessibilityLabel | string                                                                    | A visually hidden label for screen readers to understand the content of the action |\n| onClick()          | function                                                                  | A callback function to handle clicking on the action                               |\n| tooltip            | [TooltipProps](https://polaris.shopify.com/components/tooltip#navigation) | Options for displaying a tooltip when you hover over the action button             |\n\n---\n\n## Related components\n\n- To provide the structure for the navigation component, including the left sidebar and the top bar use the [frame](https://polaris.shopify.com/components/frame) component.\n- To display the navigation component on small screens, to provide search and a user menu, or to theme the [frame](https://polaris.shopify.com/components/frame) component to reflect an application’s brand, use the [top bar](https://polaris.shopify.com/components/top-bar) component.\n- To tell merchants their options once they have made changes to a form on the page use the [contextual save bar](https://polaris.shopify.com/components/contextual-save-bar) component.\n- To provide quick, at-a-glance feedback on the outcome of an action, use the [toast](https://polaris.shopify.com/components/feedback-indicators/toast) component.\n- To indicate to merchants that a page is loading or an upload is processing use the [loading](https://polaris.shopify.com/components/loading) component.\n- To alternate among related views within the same context, use the [tabs](https://polaris.shopify.com/components/tabs) component.\n- To embed a single action or link within a larger span of text, use the [link](https://polaris.shopify.com/components/link) component.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'navigation',
      'nav',
      'links',
      'primary navigation',
      'main navigation',
      'frame',
      'sidebar',
      'side bar',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'navigation-default.tsx',
          title: 'Default',
          description:
            'Use to present a navigation menu in the [frame](https://polaris.shopify.com/components/frame).',
        },
        {
          fileName: 'navigation-with-multiple-secondary-navigations.tsx',
          title: 'With multiple secondary navigations',
          description:
            'Use to present a secondary action, related to a section and to title the section.',
        },
        {
          fileName:
            'navigation-with-an-active-root-item-with-secondary-navigation-items.tsx',
          title: 'With an active root item with secondary navigation items',
          description:
            'Use to present a secondary action, related to a section and to title the section.',
        },
        {
          fileName:
            'navigation-with-a-secondary-action-for-a-section-and-a-section-title.tsx',
          title: 'With a secondary action for a section and a section title',
          description:
            'Use to present a secondary action, related to a section and to title the section.',
        },
        {
          fileName: 'navigation-with-a-secondary-action-for-an-item.tsx',
          title: 'With a secondary action for an item',
          description:
            'Use to add a different action for an item than the main action, like to view or add something.',
        },
        {
          fileName: 'navigation-with-multiple-secondary-actions.tsx',
          title: 'With multiple secondary actions',
          description:
            'Used to add one or two secondary actions to the navigation item.',
        },
        {
          fileName: 'navigation-with-section-rollup.tsx',
          title: 'With section rollup',
          description:
            'Use to show a limited number of items in a section with an option to expand the remaining items.',
        },
        {
          fileName: 'navigation-with-section-separator.tsx',
          title: 'With section separator',
          description: 'Use to add a horizontal line below the section.',
        },
        {
          fileName: 'navigation-with-various-states-and-secondary-elements.tsx',
          title: 'With various states and secondary elements',
          description:
            'This example showcases the many elements that can compose a navigation, especially useful for testing purposes.',
        },
        {
          fileName: 'navigation-with-truncation-for-various-states.tsx',
          title: 'With truncation active for various states',
          description:
            'This example showcases how elements are displayed with the truncateText prop as true for various states.',
        },
        {
          fileName: 'navigation-with-aria-labelledby.tsx',
          title: 'With aria-labelledby',
          description:
            'This example shows how to add an aria-labelledby to add a hidden label to the `nav` element.',
        },
        {
          fileName: 'navigation-using-major-icons.tsx',
          title: 'Using Major icons',
          description:
            'This example shows how to use the shouldResizeIcon prop when using Major icons',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'navigation.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Navigation component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'VIFrf6Pu6eBxPU4i_j_rP',
    title: 'Pagination',
    excerpt:
      'Use pagination to let merchants move through an ordered collection of items that has been split into pages. On the web, pagination uses buttons to move back and forth between pages. On iOS and Android, pagination uses infinite scrolling.',
    slug: 'pagination',
    parentId: 'Ryz0xrReP2hHH-ZZ51z6L',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'AaraRXNEC3jHQ5FnJDHCP',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nOn all platforms, pagination should:\n\n- Only be used for lists with more than 25 items\n\nWeb pagination should:\n\n- Be placed at the bottom of a long list that has been split up into pages\n- Pagination should navigate to the previous and next set of items in the paged list\n- Hint when merchants are at the first or the last page by disabling the corresponding button\n\niOS and Android pagination should:\n\n- Start loading items when merchants are close to the bottom, roughly 5 items from the end\n- Show [a spinner](https://polaris.shopify.com/components/spinner) below the list to indicate that items have been requested\n\n---\n\n## Related components\n\n- To see how pagination is used on a page, see the [page component](https://polaris.shopify.com/components/layout-and-structure/page)\n- To add primary and secondary calls to action at the bottom of a page, see the [page actions component](https://polaris.shopify.com/components/actions/page-actions)\n- The [resource list component](https://polaris.shopify.com/components/resource-list) is often combined with pagination to handle long lists of resources such as orders or customers\n- To create stand-alone navigational links or calls to action, use the [button component](https://polaris.shopify.com/components/actions/button)\n- To embed actions or pathways to more information within a sentence, use the [link component](https://polaris.shopify.com/components/link)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'lists',
      'detail',
      'page',
      'label',
      'pager',
      'previous',
      'next',
      'navigation between pages',
      'page arrows',
      'list navigation',
      'list arrows',
      'list pagination',
      'list pages',
      'previous next buttons',
      'previous buttons',
      'next buttons',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'pagination-default.tsx',
          title: 'Default',
          description: 'Use for pagination at the bottom of lists.',
        },
        {
          fileName: 'pagination-with-keyboard-navigation.tsx',
          title: 'With keyboard navigation',
          description:
            'Attach standard keyboard shortcuts to important pagination controls.',
        },
        {
          fileName: 'pagination-with-label.tsx',
          title: 'With label',
          description:
            'Add a label between navigation buttons to provide more context of the content being viewed by the user.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'pagination.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Pagination component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 't3NUodReWvjJXEVMa2PwG',
    title: 'Tabs',
    excerpt: 'Use to alternate among related views within the same context.',
    slug: 'tabs',
    parentId: 'Ryz0xrReP2hHH-ZZ51z6L',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'EgLO6Up3ztHjkKtFkDjVa',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nTabs should:\n\n- Represent the same kind of content, such as a list-view with different filters applied. Don’t use tabs to group content that is dissimilar.\n- Only be active one at a time.\n- Not force merchants to jump back and forth to do a single task. Merchants should be able to complete their work and find what they need under each tab.\n- Not be used for primary navigation.\n\n---\n\n## Content guidelines\n\n### Tabs\n\nTabs should:\n\n- Be clearly labeled to help differentiate the different sections beneath them.\n- Have short and scannable labels, generally kept to single word.\n- Relate to the section of Shopify they’re on. Imagine the page section title is an invisible noun after the tab. For example, the tabs for the orders section are:\n\n  - All\n  - Open\n  - Unfulfilled\n  - Unpaid\n\nThe tabs for the gift cards section are:\n\n- All\n- New\n- Partially used\n- Used\n- Disabled\n\nAnd for the customers section, the tabs are:\n\n- All\n- New\n- Returning\n- Abandoned checkouts\n- Email subscribers\n\nWhere possible, follow this pattern when writing tabs.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'layout',
      'navigate',
      'organize',
      'list views',
      'list filters',
      'fitted tabs',
      'segmented controls',
      'scrollable',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'tabs-default.tsx',
          title: 'Default',
          description:
            'Use for most cases, especially when the number of tabs may be more than three.',
        },
        {
          fileName: 'tabs-fitted.tsx',
          title: 'Fitted',
          description:
            'Use when tabs contain a few (2 or 3) items within a narrow column.',
        },
        {
          fileName: 'tabs-with-badge-content.tsx',
          title: 'With badge content',
          description: 'Use to inform a piece of information about the tabs.',
        },
        {
          fileName: 'tabs-with-custom-disclosure.tsx',
          title: 'With custom disclosure',
          description: 'Use to provide information about the popover contents',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'tabs.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Tabs component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'piJDggLVWW9mKSvwk-Ztq',
    title: 'Top bar',
    excerpt:
      'The top bar is a header component that allows merchants to search, access menus, and navigate by clicking on the logo. It’s always visible at the top of interfaces like Shopify or Shopify Plus. Third-party apps that use the top bar can customize the color to match their brand using the [app provider](https://polaris.shopify.com/components/app-provider) component and are required to use their own logo.',
    slug: 'top-bar',
    parentId: 'Ryz0xrReP2hHH-ZZ51z6L',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'c6kYnSsagsv2O_ETJKOmU',
        blockType: 'Markdown',
        content:
          '## Required components\n\nThe top bar component must be passed to the [frame](https://polaris.shopify.com/components/frame) component.\n\n---\n\n## Best practices\n\nThe top bar component should:\n\n- Not provide global navigation for an application\n  - Use the [navigation component](https://polaris.shopify.com/components/navigation) instead\n- Include search to help merchants find resources and navigate an application\n- Include a user menu component to indicate the logged-in merchant and provide them with global actions\n- Provide a color through the [app provider](https://polaris.shopify.com/components/app-provider) component to style the background\n- The global menu text should contrast with the rest of the top bar and pass the minimum contrast ratio of the WCAG 2.0 guidelines\n- Use an SVG file for the logo\n- Use a logo that passes the minimum contrast ratio of the WCAG 2.0 guidelines when compared to the top bar background color\n- Show the navigation toggle so it appears on small screen\n\n---\n\n## Content guidelines\n\n### Placeholder content\n\nThe placeholder content for the search field should:\n\n- Always say "Search"\n- Never include an ellipsis\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Search\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- search...\n\n</div></div>\n\n---\n\n## Top bar menu\n\nA component that composes together an activator and a popover containing an action list to create a dropdown menu.\n\n### Menu properties\n\n| Prop             | Type                          | Description                                                                                        |\n| ---------------- | ----------------------------- | -------------------------------------------------------------------------------------------------- |\n| activatorContent | React.ReactNode               | Accepts an activator component that renders inside of a button that opens the menu                 |\n| actions          | ActionListProps[\'sections\']   | An array of action objects that are rendered inside of a popover triggered by this menu            |\n| message          | [MessageProps](#type-message) | Accepts a message that facilitates direct, urgent communication with the merchant through the menu |\n| open             | boolean                       | A boolean property indicating whether the menu is currently open                                   |\n| onOpen()         | function                      | A callback function to handle opening the menu popover                                             |\n| onClose()        | function                      | A callback function to handle closing the menu popover                                             |\n\n## Top bar user menu\n\nA specialized menu component that is activated by a user avatar.\n\n### Menu properties\n\n| Prop       | Type                          | Description                                                                                             |\n| ---------- | ----------------------------- | ------------------------------------------------------------------------------------------------------- |\n| actions    | {items: IconableAction[]}[]   | An array of action objects that are rendered inside of a popover triggered by this menu                 |\n| message    | [MessageProps](#type-message) | Accepts a message that facilitates direct, urgent communication with the merchant through the user menu |\n| name       | string                        | A string detailing the merchant’s full name to be displayed in the user menu                            |\n| detail     | string                        | A string allowing further details on the merchant’s name displayed in the user menu                     |\n| initials   | AvatarProps[\'initials\']       | The merchant’s initials, rendered in place of an avatar image when not provided                         |\n| avatar     | AvatarProps[\'source\']         | An avatar image representing the merchant                                                               |\n| open       | boolean                       | A boolean property indicating whether the user menu is currently open                                   |\n| onToggle() | function                      | A callback function to handle opening and closing the user menu                                         |\n\n### Top bar menu message\n\n#### Message properties\n\n| Prop        | Type                                            | Description                               |\n| ----------- | ----------------------------------------------- | ----------------------------------------- |\n| title       | string                                          | A title for the message                   |\n| description | string                                          | A description for the message             |\n| action      | {onClick(): void; content: string}              | An action to render near the message      |\n| link        | {to: string; content: string}                   | A link to view the content of the message |\n| badge       | {content: string; status: BadgeProps[\'status\']} | A badge to render near the message        |\n\n---\n\n## Top bar search field\n\nA text field component that is tailor-made for a search use-case.\n\n### Search field properties\n\n| Prop                    | Type     | Description                                                                      |\n| ----------------------- | -------- | -------------------------------------------------------------------------------- |\n| value                   | string   | Initial value for the input                                                      |\n| placeholder             | string   | Hint text to display                                                             |\n| focused                 | boolean  | Force the focus state on the input                                               |\n| active                  | boolean  | Force a state where search is active but the text field component is not focused |\n| onChange(value: string) | function | Callback when value is changed                                                   |\n| onFocus()               | function | Callback when input is focused                                                   |\n| onBlur()                | function | Callback when focus is removed                                                   |\n\n---\n\n## Related components\n\n- To provide the structure for the top bar component, as well as the primary navigation use the [frame](https://polaris.shopify.com/components/frame) component.\n- To display the primary navigation within the frame of an application, use the [navigation](https://polaris.shopify.com/components/navigation) component.\n- To tell merchants their options once they have made changes to a form on the page use the [contextual save bar](https://polaris.shopify.com/components/contextual-save-bar) component.\n- To provide quick, at-a-glance feedback on the outcome of an action, use the [toast](https://polaris.shopify.com/components/feedback-indicators/toast) component.\n- To indicate to merchants that a page is loading or an upload is processing use the [loading](https://polaris.shopify.com/components/loading) component.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'global chrome',
      'global features',
      'topbar',
      'top bar',
      'header',
      'nav bar',
      'bar',
      'navbar',
      'brand',
      'search',
      'user',
      'menu',
      'logo',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'top-bar-default.tsx',
          title: 'Default',
          description:
            'Use to provide structure for the top of an application. Style the top bar component using the app provider component with a theme. Providing just the `background` key for the top bar component theme will result in intelligent defaults being set for complementary colors with contrasting text.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'top-bar.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Top bar component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'QTaaNDFYMHaCxqaAmCs2I',
    title: 'Overlays',
    excerpt: '',
    slug: 'overlays',
    parentId: 'TMuy-j4fhMovb5NxzFw6G',
    order: 10,
    layout: 'listing',
    blocks: [],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: '1Ny6M0IM6HdU8JtsOB_cB',
    title: 'Modal',
    excerpt:
      'Modals are overlays that require merchants to take an action before they can continue interacting with the rest of Shopify. They can be disruptive and should be used thoughtfully and sparingly.',
    slug: 'modal',
    parentId: 'QTaaNDFYMHaCxqaAmCs2I',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'gLrR3FIA0gxDeIynqnKQr',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nUse modals for confirmations and conditional changes. They should be thought of as temporary and not be used for information or actions that need to live on in the UI in a persistent way. Don’t use modals to display complex forms or large amounts of information.\n\nModals should:\n\n- Require that merchants take an action.\n- Close when merchants press the `X` button, the `Cancel` button, the <kbd>Esc</kbd> key, or when merchants click or tap the area outside the modal.\n- Not have more than two buttons (primary and secondary) at the bottom. This prevents unclear action hierarchy and crowding on mobile screens. Since modals are for focused tasks, they should have focused actions. In some cases however, a [tertiary action](#tertiary-actions) may be appropriate.\n\n---\n\n## Content guidelines\n\n### Title\n\nModal titles should:\n\n- Use a clear {verb}+{noun} question or statement\n- Follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings)\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Edit email address\n- Delete customer?\n- Discard unsaved changes?\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Edit the email address for this order\n- Are you sure you want to delete customer?\n- Discard?\n\n</div></div>\n\n### Body content\n\nBody content should be:\n\n- Actionable: start sentences with imperative verbs when telling a merchant what actions are available to them (especially something new). Don’t use permissive language like "you can".\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Notification emails will be sent to this address.\n- This can’t be undone.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- You can edit the email address where emails will be sent.\n- Are you sure you want to delete the variant Dark Blue Tee/Small/Silk? You cannot reverse this.\n\n</div></div>\n\n- Structured for merchant success: always put the most critical information first.\n- Clear: use the verb “need” to help merchants understand when they’re required to do something.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- To buy a shipping label, you need to enter the total weight of your shipment, including packaging.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- To buy a shipping label, you must enter the total weight of your shipment, including packaging.\n\n</div></div>\n\n### Primary and secondary actions\n\nActions should be:\n\n- Clear and predictable: merchants should be able to anticipate what will happen when they click a button. Never deceive a merchant by mislabeling an action.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Create order\n- Buy shipping label\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- New order\n- Buy\n\n</div></div>\n\n- Action-led: actions should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on actions except in the case of common actions like Save, Close, Cancel, or OK.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Activate Apple Pay\n- View shipping settings\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Try Apple Pay\n- View your settings\n\n</div></div>\n\n- Scannable: avoid unnecessary words and articles such as the, an, or a.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Add menu item\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Add a menu item\n\n</div></div>\n\n### Tertiary actions\n\nTertiary actions should:\n\n- Only be used when the action requires the context of the content in the modal\n- Never be used to dismiss the modal\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Use a plain button for a tertiary action if needed\n  ![Screenshot of modal with a plain button as a tertiary action](/images/do-use-plain-button-for-tertiary-action@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Use a tertiary action for a destructive action\n  ![Screenshot of modal with a destructive button as a tertiary action](/images/dont-use-destructive-tertiary-action@2x.png)\n\n</div></div>\n\n### Footer\n\nBody content should be:\n\n- Actionable: start sentences with imperative verbs when telling a merchant what actions are available to them (especially something new). Don’t use permissive language like "you can".\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Notification emails will be sent to this address.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- You can edit the email address where emails will be sent.\n\n</div></div>\n\n- Structured for merchant success: always put the most critical information first.\n- Clear: use the verb “need” to help merchants understand when they’re required to do something.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- To buy a shipping label, you need to enter the total weight of your shipment, including packaging.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- To buy a shipping label, you must enter the total weight of your shipment, including packaging.\n\n</div></div>\n\n---\n\n## Related components\n\n- To present large amounts of additional information or actions that don’t require confirmation, [use the collapsible component](https://polaris.shopify.com/components/collapsible) to expand content in place within the page\n- To present a small amount of content or a menu of actions in a non-blocking overlay, [use the popover component](https://polaris.shopify.com/components/overlays/popover)\n- To communicate a change or condition that needs the merchant’s attention within the context of a page, [use the banner component](https://polaris.shopify.com/components/feedback-indicators/banner)\n\n---\n\n## Accessibility\n\n- Modals use ARIA `role=”dialog”` to convey to screen reader users that they work like native dialog windows.\n- If you set the `title` prop to give the modal component a heading, then the `title` is used to label the dialog element with `aria-labelledby`. This helps to convey the purpose of the modal to screen reader users when it displays.\n- After a modal is closed, in order to return focus to the button that launched it, pass the button to the modal as an `activator`.\n\n### Keyboard support\n\n- When a modal opens, focus moves automatically to the modal container so it can be accessed by keyboard users\n- While the modal is open, keyboard focus shouldn’t leave the modal\n- Merchants can dismiss the modal with the keyboard by activating the `X` button, the `Cancel` button if one is provided, or by pressing the <kbd>Esc</kbd> key\n- After a modal is closed, focus returns to the button that launched it',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'modal',
      'src',
      'open',
      'title',
      'width',
      'height',
      'primary action',
      'secondary action',
      'tertiary action',
      'destructive action',
      'footer',
      'instant',
      'sectioned',
      'large',
      'small',
      'limit height',
      'loading',
      'outer wrapper',
      'iframe',
      'overlay',
      'dialog',
      'alert',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'modal-default.tsx',
          title: 'Default',
          description: 'Use as the default option for a modal.',
        },
        {
          fileName: 'modal-with-primary-action.tsx',
          title: 'With primary action',
          description: 'Use to let merchants take a key action.',
        },
        {
          fileName: 'modal-with-primary-and-secondary-actions.tsx',
          title: 'With primary and secondary actions',
          description:
            'Use to let merchants take key actions at the bottom of the modal.',
        },
        {
          fileName: 'modal-large.tsx',
          title: 'Large',
          description: 'Use when you need to increase the width of your modal.',
        },
        {
          fileName: 'modal-small.tsx',
          title: 'Small',
          description: 'Use when you need to decrease the width of your modal.',
        },
        {
          fileName: 'modal-without-a-title.tsx',
          title: 'Without a title',
          description:
            'A title is required for accessibility, but you may hide it.',
        },
        {
          fileName: 'modal-with-scroll-listener.tsx',
          title: 'With scroll listener',
          description: 'Use to implement infinite scroll of modal content.',
        },
        {
          fileName: 'modal-with-activator-ref.tsx',
          title: 'With activator ref',
          description:
            'Provide an activator ref when it’s more convenient than providing an element. This ensures proper focus management when closing the modal. See the [accessibility features of a modal](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) for more information regarding focus.',
        },
        {
          fileName: 'modal-without-an-activator-prop.tsx',
          title: 'Without an activator prop',
          description:
            'Use an external activator when technical limitations prevent you from passing the activator as an element or a ref. Make sure to focus the activator on close when choosing this approach. See the [accessibility features of a modal](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) for more information regarding focus.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'modal.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Modal component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'NEDo_EF2Zj9V1i8F4oQEY',
    title: 'Popover',
    excerpt:
      'Popovers are small overlays that open on demand. They let merchants access additional content and actions without cluttering the page.',
    slug: 'popover',
    parentId: 'QTaaNDFYMHaCxqaAmCs2I',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'm8AbumnLgwK_MzbyyeH1G',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nPopovers should:\n\n- Always be positioned next to the button or other interface element that triggers them\n- Be used for secondary or less important information and actions since they’re hidden until merchants hit the trigger\n- Contain navigation or actions that share a relationships to each other\n- Be triggered by a clearly labeled button\n\n---\n\n## Content guidelines\n\n### Popover content\n\nIf a popover contains actions, they should:\n\n- Be clear and predictable: merchants should be able to anticipate what will happen when they click on an action item. Never deceive merchants by mislabeling an action.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Create order\n- Buy shipping label\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- New order\n- Buy\n\n</div></div>\n\n- Be action-led: buttons should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on buttons except in the case of common actions like Save, Close, Cancel, or OK.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Rename\n- Edit HTML\n- Duplicate\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- HTML editing options\n- File name changes\n- Duplicate this order so that you can make edits, updates, or changes\n\n</div></div>\n\n- Be scannable, especially when the popover contains a list of actions or options. Avoid unnecessary words and articles such as “the”, “an”, or “a”.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Add menu item\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Add a menu item\n\n</div></div>\n\nIf the popover includes a series of navigational links, each item should:\n\n- Be concise but still give merchants enough information so they can easily find and accurately navigate to the path they want.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Online store\n- Messenger\n- Facebook\n- Buy Button\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Sales channel\n\n</div></div>\n\n---\n\n## Related components\n\n- To put a list of actions in a popover, [use the action list component](https://polaris.shopify.com/components/action-list)\n- To let merchants select simple options from a list, [use the select component](https://polaris.shopify.com/components/select)\n\n---\n\n## Accessibility\n\nPopovers usually contain an [option list](https://polaris.shopify.com/components/option-list) or an [action list](https://polaris.shopify.com/components/action-list), but can also contain other controls or content.\n\nTo assist screen readers with sending focus to an [action list](https://polaris.shopify.com/components/action-list), pass `autofocusTarget=\'first-node\'` to `Popover`. This will avoid known issues a screen reader may have with keyboard support once focus is moved off the activator.\n\nWeb browsers assign a default value of \'menu\' to the `aria-haspopup` role. You can use the prop `ariaHaspopup` to specify a value. Screen readers may fail to send focus to the `Popover` content when they expect the content to be adjacent to the element with `aria-haspopup` in the DOM tree. In this scenario, it is recommended not to provide the `ariaHaspopup` prop.\n\n### Keyboard support\n\n- When a popover opens, focus moves to the first focusable element or to the popover container\n- Once focus is in the popover, merchants can access controls in the popover using the <kbd>tab</kbd> key (and <kbd>shift</kbd> + <kbd>tab</kbd> backwards) and standard keystrokes for interacting\n- Merchants can dismiss the popover by tabbing out of it, pressing the <kbd>esc</kbd> key, or clicking outside of it\n- When the popover is closed, focus returns to the element that launched it',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'interactive',
      'container',
      'dropdown',
      'drop down',
      'drop-down',
      'popover',
      'pop over',
      'menu',
      'fly out',
      'select',
      'action list',
      'menu',
      'context menu',
      'popover with form components',
      'popover with action list',
      'popover with content and actions',
      'action sheet',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'popover-with-action-list.tsx',
          title: 'With action list',
          description:
            'Use when presenting a set of actions in a disclosable menu.',
        },
        {
          fileName: 'popover-with-content-and-actions.tsx',
          title: 'With content and actions',
          description:
            'Use to present a combination of content, instructions, and actions in a panel for tasks that are of low or secondary importance to the current page. When used this way, popovers provide useful entry points to related features without overwhelming merchants.',
        },
        {
          fileName: 'popover-with-form-components.tsx',
          title: 'With form components',
          description: 'Use to present secondary input tasks on demand.',
        },
        {
          fileName: 'popover-with-lazy-loaded-list.tsx',
          title: 'With lazy loaded list',
          description:
            'Use to present merchants with a list that dynamically loads more items on scroll or arrow down.',
        },
        {
          fileName: 'popover-with-searchable-listbox.tsx',
          title: 'With searchable listbox',
          description:
            'Use to help merchants browse, filter, and choose from a list of options.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'popover.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Popover component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'gsSosrVmMvyIdsS7NMKUU',
    title: 'Tooltip',
    excerpt:
      'Tooltips are floating labels that briefly explain the function of a user interface element. They can be triggered when merchants hover, focus, tap, or click.',
    slug: 'tooltip',
    parentId: 'QTaaNDFYMHaCxqaAmCs2I',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'hvGMREfHNx0lPO3dGK2V6',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nTooltips should:\n\n- Provide useful, additional information or clarification.\n- Succinctly describe or expand on the element they point to.\n- Be provided for icon-only buttons or a button with an associated keyboard shortcut.\n- Not be used to communicate critical information, including errors in forms or other interaction feedback.\n- Not contain any links or buttons.\n- Be used sparingly. If you’re building something that requires a lot of tooltips, work on clarifying the design and the language in the experience.\n\n---\n\n## Content guidelines\n\n### Basic tooltips\n\nTooltips should:\n\n- Be written in sentence case\n- Be concise and scannable\n- Not be used to communicate error messages or important account information\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nPost reach is the number of people who have seen your post in their News Feed.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nTo continue using Shopify, this amount must be paid immediately.\n\n</div></div>\n\n---\n\n## Related components\n\n- To make helpful content more visible to merchants, use the help text portions of form components such as [text fields](https://polaris.shopify.com/components/selection-and-input/text-field), [footer help](https://polaris.shopify.com/components/navigation/footer-help), or [an inline link to help](https://polaris.shopify.com/components/link)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'info',
      'help',
      'popover',
      'infotip',
      'hint',
      'small popover',
      'hover',
      'tap',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'tooltip-default.tsx',
          title: 'Default',
          description:
            'Use only when necessary to provide an explanation for an interface element.',
        },
        {
          fileName: 'tooltip-visible-only-with-child-interaction.tsx',
          title: 'Visible only with child interaction',
          description:
            "Use when the tooltip overlays interactive elements when active, for example a form input. The `dismissOnMouseOut` prop prevents the tooltip from remaining active when mouse hover or focus leaves its `children` and enters the tooltip's content.",
        },
        {
          fileName: 'tooltip-with-suffix.tsx',
          title: 'With suffix',
          description:
            'Use when merchants benefit from information supplemental to the tooltip content. For example, to present a keyboard shortcut beside the content of a tooltip that describes an icon button.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'tooltip.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Tooltip component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'r51qs5Q4LeKPsVIRaAYW8',
    title: 'Selection and input',
    excerpt: '',
    slug: 'selection-and-input',
    parentId: 'TMuy-j4fhMovb5NxzFw6G',
    order: 3,
    layout: 'listing',
    blocks: [],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'YOmJ6lMb4vSWkBGx6MozW',
    title: 'Autocomplete',
    excerpt:
      "The autocomplete component is an input field that provides selectable suggestions as a merchant types into it. It allows merchants to quickly search through and select from large collections of options. It's a convenience wrapper around the `Combobox` and `Listbox` components with minor UI differences.",
    slug: 'autocomplete',
    parentId: 'r51qs5Q4LeKPsVIRaAYW8',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'z2N3ShJDmGfkmxizfPeXu',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nThe autocomplete component should:\n\n- Be clearly labeled so it’s obvious to the merchant what type of options will be available\n- Limit the number of options displayed at once\n- Not be used within a popover\n- Indicate a loading state to the merchant while option data is being populated\n\n---\n\n## Content guidelines\n\nThe input field for autocomplete should follow the [content guidelines](https://polaris.shopify.com/components/selection-and-input/text-field) for text fields.\n\n---\n\n## Related components\n\n- For an input field without suggested options, [use the text field component](https://polaris.shopify.com/components/selection-and-input/text-field)\n- For a list of selectable options not linked to an input field, [use the option list component](https://polaris.shopify.com/components/option-list)\n- For a text field that triggers a popover, [use the combo box component](https://polaris.shopify.com/components/combobox)\n\n---\n\n## Accessibility\n\n### Structure\n\nThe autocomplete component is based on the [ARIA 1.2 combobox pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#combobox) and the [Aria 1.2 Listbox pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox).\n\nThe autocomplete list displays below the text field or other control by default so it is easy for merchants to discover and use. However, you can change the position with the `preferredPosition` prop.\n\nAutocomplete features can be challenging for merchants with visual, motor, and cognitive disabilities. Even when they’re built using best practices, these features can be difficult to use with some assistive technologies. Merchants should always be able to search, enter data, or perform other activities without relying on the autocomplete.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nUse autocomplete as progressive enhancement to make the interface easier to use for most merchants.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nRequire that merchants make a selection from the autocomplete to complete a task.\n\n</div></div>\n\n### Keyboard support\n\n- Give the autocomplete text input keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)\n- Access the list of options with the up and down arrow keys\n- Select an option that has focus with the <kbd>enter</kbd>/<kbd>return</kbd> key',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'autocomplete',
      'searchable',
      'typeahead',
      'combobox',
      'listbox',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'autocomplete-default.tsx',
          title: 'Default',
          description:
            'Use to help merchants complete text input quickly from a list of options.',
        },
        {
          fileName: 'autocomplete-with-multiple-tags.tsx',
          title: 'With multiple tags',
          description:
            'Use to help merchants select multiple options from a list curated by the text input.',
        },
        {
          fileName: 'autocomplete-with-multiple-sections.tsx',
          title: 'With multiple sections',
          description:
            'Use to help merchants complete text input quickly from a multiple sections list of options.',
        },
        {
          fileName: 'autocomplete-with-loading.tsx',
          title: 'With loading',
          description:
            'Use to indicate loading state to merchants while option data is processing.',
        },
        {
          fileName: 'autocomplete-with-lazy-loading.tsx',
          title: 'With lazy loading',
          description: '',
        },
        {
          fileName: 'autocomplete-with-empty-state.tsx',
          title: 'With empty state',
          description: 'Use to indicate there are no search results.',
        },
        {
          fileName: 'autocomplete-with-action.tsx',
          title: 'With action',
          description: 'Use to help merchants complete an action quickly.',
        },
        {
          fileName: 'autocomplete-with-wrapping-action.tsx',
          title: 'With wrapping action',
          description:
            'Use to help merchants complete an action quickly with wrapping lines of text.',
        },
        {
          fileName: 'autocomplete-with-destructive-action.tsx',
          title: 'With destructive action',
          description:
            'Use to help merchants complete a destructive action quickly.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'autocomplete.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Autocomplete component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'M9EpOSeK3rNmREczaNVKz',
    title: 'Checkbox',
    excerpt:
      'Checkboxes are most commonly used to give merchants a way to make a range of selections (zero, one, or multiple). They may also be used as a way to have merchants indicate they agree to specific terms and services.',
    slug: 'checkbox',
    parentId: 'r51qs5Q4LeKPsVIRaAYW8',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'yj5ewgnT4COKLanRlq3sk',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nCheckboxes should:\n\n- Work independently from each other: selecting one checkbox shouldn’t change the selection status of another checkbox in the list. The exception is when a checkbox is used to make a bulk selection of multiple items.\n- Be framed positively: for example, `Turn on notifications` instead of `Turn off notifications`\n- Always have a label when being used to toggling a setting on or off\n- Be listed according to a logical order, whether it’s alphabetical, numerical, time-based, or some other clear system.\n- Link to more information or include a subtitle as required to provide more explanation. Don’t rely on tooltips to explain a checkbox.\n\n---\n\n## Content guidelines\n\n### Lists with checkboxes\n\nLists that use checkboxes should:\n\n- Start with a capital letter\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Option 1\n- Option 2\n- Option 3\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- option 1\n- option 2\n- option 3\n\n</div></div>\n\n- Not use commas or semicolons at the end of each line\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Red\n- Yellow\n- Blue\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Red;\n- Yellow;\n- Blue.\n\n</div></div>\n\n- In the rare case where the checkbox is asking merchants to agree to terms or service, use the first person\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nI agree to the Terms of Service.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nYou agree to the Terms of Service\n\n</div></div>\n\n---\n\n## Related components\n\n- To present a list of options where merchants can only make a single choice, [use the radio button component](https://polaris.shopify.com/components/radio-button)\n- To display a list of related content, [use the choice list component](https://polaris.shopify.com/components/choice-list)\n- To create an ungrouped list, [use the content list component](https://polaris.shopify.com/components/lists/list)\n\n---\n\n## Accessibility\n\nScreen readers convey the state of the checkbox automatically.\n\n- Use the `disabled` prop to apply the HTML `disabled` attribute to the checkbox `<input>`. This prevents merchants from being able to interact with the checkbox, and conveys its inactive state to assistive technologies.\n- Use the `id` prop to provide a unique `id` attribute value for the checkbox. If an `id` isn’t provided, then the component generates one. All checkboxes must have unique `id` values to work correctly with assistive technologies.\n- Setting `checked="indeterminate"` conveys the state of the checkbox using `aria-checked="mixed"`.\n- Setting the `ariaControls` prop conveys the ID of the element whose contents or presence are controlled by the checkbox to screen reader users with the `aria-controls` attribute.\n\n### Labeling\n\n- The required `label` prop conveys the purpose of the checkbox to all merchants\n- Use the `labelHidden` prop to visually hide the label but make it available to assistive technologies\n- When you provide help text via the `helpText` prop or an inline error message via the `error` prop, the help or error content is conveyed to screen reader users with the `aria-describedby` attribute\n\n### Keyboard support\n\n- Move focus to each checkbox using the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)\n- To interact with the checkbox when it has keyboard focus, press the <kbd>space</kbd> key',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'accept',
      'decline',
      'terms',
      'input',
      'multiple choice lists',
      'terms and services',
      'checkboxes',
      'check boxes',
      'multiple selections',
      'form selections',
      'multi-choice lists',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'checkbox-default.tsx',
          title: 'Default',
          description:
            'Use in forms to toggle the state of something on or off. Default checkboxes can appear as selected and disabled, or unselected.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'checkbox.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Checkbox component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'b5bhhOAYkl87GdUbAThq0',
    title: 'Choice list',
    excerpt:
      'A choice list lets you create a list of grouped radio buttons or checkboxes. Use this component if you need to group together a related list of interactive choices.',
    slug: 'choice-list',
    parentId: 'r51qs5Q4LeKPsVIRaAYW8',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'ezzitJ6yrLLxmKFkwN5fj',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nChoice lists should:\n\n- Include a title that tells merchants what to do or explains the available options\n- Label options clearly based on what the option will do\n- Avoid mutually exclusive options when allowing multiple selection\n\n---\n\n## Content guidelines\n\n### List titles\n\nList titles should:\n\n- Help merchants understand how the items in the list are grouped together, or should explain what kind of choice merchants are making\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nPick a shipping method\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nPick one\n\n</div></div>\n\n### Be concise and scannable\n\n- Use simple, clear language that can be read at a glance\n- Keep list titles to a single sentence\n- It the title introduces the list, it should end with a colon\n- Should be written in sentence case\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nShipping options\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nShipping Options\n\n</div></div>\n\n### Not use colons\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nIf the customer abandons their checkout, send them an email reminder to complete their order:\n\n- Option a\n- Option b\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nIf the customer abandons their checkout, send them an email reminder to complete their order\n\n- Option a\n- Option b\n\n</div></div>\n\n### List choices\n\nEvery item in a choice list should:\n\n- Start with a capital letter\n- Not use commas or semicolons at the end of each line\n- Be written in sentence case (the first word capitalized, the rest lowercase)\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Option 1\n- Yellow\n- Item three\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- option 1\n- Yellow;\n- Item Three\n\n</div></div>\n\n### Helper text and descriptions\n\nIf your list contains helper text, only the description below the list item should contain punctuation.\n\n---\n\n## Related components\n\n- To present a long list of radio buttons or when space is constrained, [use the select component](https://polaris.shopify.com/components/select)\n- To build a group of radio buttons or checkboxes with a custom layout, use the [radio button component](https://polaris.shopify.com/components/radio-button) or [checkbox component](https://polaris.shopify.com/components/checkbox)\n- To display a simple, non-interactive list of related content, [use the list component](https://polaris.shopify.com/components/lists/list)\n\n---\n\n## Accessibility\n\nThe choice list component uses the accessibility features of the [checkbox](https://polaris.shopify.com/components/checkbox) and [radio button](https://polaris.shopify.com/components/radio-button) components.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'ChoiceList',
      'form',
      'input',
      'choices',
      'select',
      'group of radio buttons',
      'radio button group',
      'group of checkboxes',
      'group of check boxes',
      'list of choices',
      'list of radio buttons',
      'list of checkboxes',
      'list of check boxes',
      'multi-choice list',
      'single-choice list',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'choice-list-default.tsx',
          title: 'Default',
          description:
            'Allows merchants to select one option from a list. Make sure all options are an either/or choice.',
        },
        {
          fileName: 'choice-list-with-error.tsx',
          title: 'With error',
          description:
            'Allows for accessible error handling by connecting the error message to the field with the error.',
        },
        {
          fileName: 'choice-list-with-multi-choice.tsx',
          title: 'With multi-choice',
          description:
            'Allows merchants to select multiple options from a list. Avoid options that are an either/or choice.',
        },
        {
          fileName: 'choice-list-with-children-content.tsx',
          title: 'With children content',
          description:
            'Use when you need merchants to view and/or interact with additional content under a choice. The content will always be rendered.',
        },
        {
          fileName: 'choice-list-with-dynamic-children-content.tsx',
          title: 'With dynamic children content',
          description:
            'Use when you need merchants to view and/or interact with additional content under a choice. The content is only rendered when the choice is selected. Works for both single-choice and multi-choice list.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'choice-list.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Choice list component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'MTkdFmU6L0TbwVGwvS9A7',
    title: 'Color picker',
    excerpt:
      'The color picker is used to let merchants select a color visually. For example, merchants use the color picker to customize the accent color of the email templates for their shop.',
    slug: 'color-picker',
    parentId: 'r51qs5Q4LeKPsVIRaAYW8',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'R3U28MAEFBvhDRhA-xlVQ',
        blockType: 'Markdown',
        content:
          '## Best practices\n\n- Use the alpha slider if you want to allow merchants to be able to select a transparent color',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'ColorPicker',
      'HuePicker',
      'AlphaPicker',
      'Slidable',
      'Choose color',
      'Select color',
      'Pick color',
      'color selector with transparent value',
      'colorpicker with transparent value',
      'alpha value picker',
      'alpha value selector',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'color-picker-default.tsx',
          title: 'Default',
          description:
            'Use when merchants need to select a color to make the selection a visual task rather than a technical one.',
        },
        {
          fileName: 'color-picker-with-transparent-value.tsx',
          title: 'With transparent value',
          description:
            'Use when attached to a visual builder to allow the designated object to have a transparent background that allows underlying objects to show through.',
        },
        {
          fileName: 'color-picker-with-transparent-value-full-width.tsx',
          title: 'With transparent value full width',
          description:
            'Use when attached to a visual builder to allow the designated object to have a transparent background that allows underlying objects to show through.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'color-picker.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Color picker component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: '5q9BUu8RRBV0vLBf3YXlJ',
    title: 'Combobox',
    excerpt:
      'Combobox is an accessible autocomplete input that enables merchants to filter a list of options and select one or more values.',
    slug: 'combobox',
    parentId: 'r51qs5Q4LeKPsVIRaAYW8',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'OokNVjE47lyca-L-CEoWG',
        blockType: 'Markdown',
        content:
          '## Anatomy\n\n![A diagram of the Combobox component showing the smaller primitive components it is composed of.](/images/combobox-anatomy.png)\n\nA combobox is made up of the following:\n\n1. **TextField**: A text input that activates a popover displaying a list of options. As merchants type in the text field, the list of options is filtered by the input value. Options replace or add to the input value when selected.\n2. **Popover**: An overlay containing a list of options.\n3. **Listbox**: A list of options to filter and select or deselect.\n4. **Listbox.Option**: The individual options to select or deselect. Check out the [listbox component documentation](https://polaris.shopify.com/components/lists/listbox) to learn how to compose it with various content.\n\n---\n\n## Best practices\n\nThe `Combobox` component should:\n\n- Be clearly labeled so the merchant knows what kind of options will be available\n- Not be used within a popover\n- Indicate a loading state to the merchant while option data is being populated\n- Order items in an intentional way so it’s easy for the merchant to find a specific value\n\n---\n\n## Content guidelines\n\nThe input field for `Combobox` should follow the [content guidelines](https://polaris.shopify.com/components/selection-and-input/text-field) for text fields.\n\n---\n\n## Sorting and filtering\n\n### Sorting\n\nItem order should be intentional. Order them so it’s easy for the merchant to find a specific value. Some ways you can do this:\n\n- Sort options in alphabetical order\n- Display options based on how frequently the merchant selects an option\n\nIf multiple options can be selected, move selected items to the top of the list. If this doesn’t work for your context, you can override this behavior.\n\n### Filtering\n\n- By default, menu items are filtered based on whether or not they match the value of the textfield.\n- Filters are **not** case-sensitive by default.\n- You can apply custom filtering logic if the default behavior doesn’t make sense for your use case.\n\n---\n\n## Patterns\n\n### Tags autocomplete\n\nThe tag multi-select input enables merchants to efficiently add or remove tags from a resource, like a product or an order. It uses the inline autocomplete combobox pattern to present merchants with an editable list of tags to browse and select from.\n\n---\n\n## Related components\n\n- For an input field without suggested options, [use the text field component](https://polaris.shopify.com/components/selection-and-input/text-field)\n- For a list of selectable options not linked to an input field, [use the list box component](https://polaris.shopify.com/components/lists/listbox)\n\n---\n\n## Accessibility\n\n### Structure\n\nThe `Combobox` component is based on the [ARIA 1.2 combobox pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#combobox). It is a combination of a single-line `TextField` and a `Popover`. The current implementation expects a [`Listbox`](https://polaris.shopify.com/components/lists/listbox) component to be used.\n\nThe `Combobox` popover displays below the text field or other control by default so it is easy for merchants to discover and use. However, you can change the position with the `preferredPosition` prop.\n\n`Combobox` features can be challenging for merchants with visual, motor, and cognitive disabilities. Even when they’re built using best practices, these features can be difficult to use with some assistive technologies. Merchants should always be able to search, enter data, or perform other activities without relying on the combobox.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Use combobox as progressive enhancement to make the interface easier to use for most merchants.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Require that merchants make a selection from the combobox to complete a task.\n\n</div></div>\n\n### Keyboard support\n\n- Give the combobox\'s text input keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'autocomplete',
      'searchable',
      'typeahead',
      'combobox',
      'combo box',
      'listbox',
      'list box',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'combobox-default.tsx',
          title: 'Default',
          description:
            'Use when merchants can select one option from a predefined or editable list.',
        },
        {
          fileName: 'combobox-with-manual-selection.tsx',
          title: 'With manual selection',
          description:
            'Use when merchants can select one option from a predefined or editable list.',
        },
        {
          fileName: 'combobox-with-multi-select.tsx',
          title: 'With multi-select',
          description:
            'Use when merchants can select one or more options from a predefined or editable list.',
        },
        {
          fileName: 'combobox-with-multi-select-and-manual-selection.tsx',
          title: 'With multi-select and manual selection',
          description:
            'Use when merchants can select one or more options from a predefined or editable list.',
        },
        {
          fileName: 'combobox-with-multi-select-and-vertical-content.tsx',
          title: 'With multi-select and vertical content',
          description: 'Use to display selected options above the input value.',
        },
        {
          fileName: 'combobox-with-loading.tsx',
          title: 'With loading',
          description:
            'Use to indicate to merchants that the list data is being fetched.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'combobox.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Combobox component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: '12RO7d-y8z8DBAogIpHpv',
    title: 'Contextual save bar',
    excerpt:
      'The contextual save bar tells merchants their options once they have made changes to a form on the page. This component is also shown while creating a new object like a product or customer. Merchants can use this component to save or discard their work.',
    slug: 'contextual-save-bar',
    parentId: 'r51qs5Q4LeKPsVIRaAYW8',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: '6Gx09JmK4kWhZ-lpskiEo',
        blockType: 'Markdown',
        content:
          '## Required components\n\nThe contextual save bar component must be wrapped in the [frame](https://polaris.shopify.com/components/frame) component.\n\n---\n\n## Best practices\n\nThe contextual save bar component should:\n\n- Become visible when a form on the page has unsaved changes\n- Be used to save or discard in-progress changes\n- Provide brief and helpful context on the nature of in-progress changes\n- Save all changes on the page. Avoid scenarios where multiple forms on a single page can be edited at the same time. If specific sections of a page need to be independently editable, use an Edit button to launch a [modal dialog](https://polaris.shopify.com/components/overlays/modal) for each section where changes can be made and saved.\n\n---\n\n## Content guidelines\n\nMessages in the contextual save bar component should be informative, clear, and concise. They should follow the {adjective}+{noun} pattern. Don’t use full sentences.\n\nThe standard message content is\n\n- “Unsaved changes” when editing existing content\n- “Unsaved {resource name}” when creating a new object\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Unsaved changes\n- Unsaved product\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- You have unsaved changes\n- Red and white striped shirt not yet saved\n\n</div></div>\n\nActions in the contextual save bar component should consist of a strong verb that encourages action. They should not include a noun.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Save\n- Discard\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Save changes\n- Discard changes\n\n</div></div>\n\n---\n\n## Related components\n\n- To wrap your entire application, [use the frame component](https://polaris.shopify.com/components/frame)\n- To build the outer wrapper of a page, including page title and associated actions, [use the page component](https://polaris.shopify.com/components/layout-and-structure/page)\n- To wrap form elements and handle the submission of a form, [use the form component](https://polaris.shopify.com/components/form)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['form', 'forms', 'action', 'actions', 'save', 'cancel', 'logo'],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'contextual-save-bar-default.tsx',
          title: 'Default',
          description:
            'Use the save action to provide an opportunity to save changes. Use the discard action to allow merchants the option to discard their changes. Use the message to provide helpful context on the nature of those changes.',
        },
        {
          fileName: 'contextual-save-bar-with-flush-contents.tsx',
          title: 'With flush contents',
          description:
            'Use the alignContentFlush flag when you want to omit the logo from the contextual save bar and repurpose that space to extend the message contents fully to the left side of the container.',
        },
        {
          fileName: 'contextual-save-bar-with-full-width.tsx',
          title: 'With full width',
          description:
            'Use the fullWidth flag when you want to remove the default max-width set on the contextual save bar.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'contextual-save-bar.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Contextual save bar component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'DZukoGj8bQMxhRTKgJcXv',
    title: 'Date picker',
    excerpt:
      'Date pickers let merchants choose dates from a visual calendar that’s consistently applied wherever dates need to be selected across Shopify.',
    slug: 'date-picker',
    parentId: 'r51qs5Q4LeKPsVIRaAYW8',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'EwUUXqvtStfZgYCbJN5Lj',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nDate pickers should:\n\n- Use smart defaults and highlight common selections\n- Close after a single date is selected unless a range with a start and end date is required\n- Set the start date on first click or tap and the end date on second click or tap if a range is required\n- Not be used to enter a date that is many years in the future or the past\n- Follow [date format guidelines](https://polaris.shopify.com/content/grammar-and-mechanics#dates--numbers--and-measurements)\n\n---\n\n## Accessibility\n\nSome users might find interacting with date pickers to be challenging. When you use the date picker component, always give users the option to enter the date using a text field component as well.\n\nIf you use the date picker within a [popover component](/components/overlays/popover), then use a button to trigger the popover instead of displaying the popover when the text input gets focus. This gives users more control over their experience.\n\n### Keyboard support\n\n- Press the <kbd>tab</kbd> key to move forward and <kbd>shift</kbd> + <kbd>tab</kbd> to move backward through the previous button, next button, and the calendar\n- When focus is in the calendar, move keyboard focus between the dates using the arrow keys\n- To select a date that has focus, press the <kbd>enter</kbd>/<kbd>return</kbd> key\n\n## Related patterns\n\n- [Date picking](/patterns/date-picking)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'DatePicker',
      'month',
      'day',
      'year',
      'weekday',
      'choose date',
      'pick date',
      'pick time',
      'date picker',
      'calendar',
      'date selector',
      'date range picker',
      'date range selector',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'date-picker-default.tsx',
          title: 'Default',
          description:
            'Use when merchants need to select a single day close to today (today is the default starting position for the date picker).',
        },
        {
          fileName: 'date-picker-ranged.tsx',
          title: 'Ranged',
          description:
            'Use when merchants need to select a range of days close to today (today is the default starting position for the date picker).',
        },
        {
          fileName: 'date-picker-multi-month-ranged.tsx',
          title: 'Multi-month ranged',
          description: 'Use multi-month mode to show two months at a time.',
        },
        {
          fileName: 'date-picker-with-disabled-date-ranges.tsx',
          title: 'With disabled date ranges',
          description:
            'Date ranges may be disabed if you do not want them to be selectable',
        },
        {
          fileName: 'date-picker-with-specific-disabled-dates.tsx',
          title: 'With specific disabled dates',
          description:
            'Dates may be disabed if you do not want them to be selectable',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'date-picker.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Date picker component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: '9eCtKYFjjuwdiBQG7Lvmy',
    title: 'Drop zone',
    excerpt:
      'The drop zone component lets users upload files by dragging and dropping the files into an area on a page, or activating a button.',
    slug: 'drop-zone',
    parentId: 'r51qs5Q4LeKPsVIRaAYW8',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'bijRKBtCpTAZDG7lU7Gl9',
        blockType: 'Markdown',
        content:
          "## Best practices\n\n### Drop zone\n\nDrop zones should:\n\n- Inform merchants when the file(s) can’t be uploaded:\n  - When possible, use validation errors on drag to detect and explain things like file size limits or file types accepted.\n  - Use the [banner component](https://polaris.shopify.com/components/feedback-indicators/banner) with a critical status to communicate errors that happen on the server.\n- Provide feedback once the file(s) have been dropped and uploading begins.\n- For convenience, allow files to be dropped anywhere on the page by enabling `dropOnPage`.\n- Provide a file upload button to allow merchants to select files for upload in a traditional way. Do this by using the `DropZone.FileUpload` subcomponent.\n\n### Validation errors\n\nThe drop zone component validates file type by default. File types you wish to accept can be defined by editing the `accept` property. This component also accepts custom validations using the `customValidator` property. When validation fails, the component sets itself to error mode.\n\n---\n\n## Content guidelines\n\n### Client-side validation error messages\n\nClient-side validation errors give instant feedback.\n\nValidation error messages should be:\n\n- Explicit: help merchants understand why their file can’t be uploaded and what they should change to successfully upload their file\n- In sentence case: capitalize only the first word in the message\n- Concise: use simple, clear language that can be read at a glance. For example:\n\n`File size must be less than 20MB`\n\n`File type must be .gif, .jpg, .png or .svg`\n\n### Server-side upload error messages\n\nServer-side upload errors give feedback after file submission.\n\nUpload error messages should:\n\n- Be displayed as a [banner](https://polaris.shopify.com/components/feedback-indicators/banner) with a critical status\n- Show the name of the file(s) that were not uploaded successfully\n- Describe why the file(s) couldn’t be uploaded and what merchants should change to upload their file successfully, as seen below\n\n```\nThe following images couldn’t be uploaded:\n\n* “keep-it-real.png” is too large. Try a file size less than 20MB.\n* “realer-than-real.zip” is not supported. File type must be .gif, .jpg, .png or .svg.\n* “so-so-real.png” was interrupted due to weak network connection, [retry upload](#)\n```\n\n---\n\n## Drop zone file upload\n\nUse file upload with the drop zone component to let merchants select files for upload in a traditional way.\n\n### File upload properties\n\n| Prop        | Type   | Description                        | Default                   |\n| ----------- | ------ | ---------------------------------- | ------------------------- |\n| actionTitle | string | String that appears in file upload | 'Add file'                |\n| actionHint  | string | String that appears in file upload | 'or drop files to upload' |\n\n---\n\n## Related components\n\n- To provide context to upload errors when they occur, use the [banner component](https://polaris.shopify.com/components/feedback-indicators/banner)\n- To provide feedback during file upload, use the [spinner component](https://polaris.shopify.com/components/spinner)\n\n---\n\n## Accessibility\n\nThe drop zone component builds on the native HTML `<input type=\"upload\">` element. It includes a visual`<button>` as well as a drag and drop area that can receive keyboard focus.\n\n### Keyboard support\n\nTo upload a file with the keyboard, merchants can interact with the drag-and-drop region.\n\n- To give the input keyboard focus, use the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)\n- To activate the input, use the <kbd>enter</kbd>/<kbd>return</kbd> or <kbd>space</kbd> keys",
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'upload',
      'image upload',
      'file upload',
      'drag',
      'drop',
      'area',
      'drop area',
      'file dialog',
      'upload placeholder',
      'drop placeholder',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'drop-zone-default.tsx',
          title: 'Default',
          description:
            'Use to allow merchants to upload files. They can drag and drop files into the dashed area, or upload traditionally by clicking the “Add file” button or anywhere inside the dashed area.',
        },
        {
          fileName: 'drop-zone-with-a-label.tsx',
          title: 'With a label',
          description: 'Use to pair with a label for better accessibility.',
        },
        {
          fileName: 'drop-zone-with-image-file-upload.tsx',
          title: 'With image file upload',
          description: 'Use for cases that accept image file formats.',
        },
        {
          fileName: 'drop-zone-with-single-file-upload.tsx',
          title: 'With single file upload',
          description: 'Use to accept only one file.',
        },
        {
          fileName: 'drop-zone-with-drop-on-page.tsx',
          title: 'With drop on page',
          description:
            'Use to accept files for upload when dropped anywhere on the page.',
        },
        {
          fileName: 'drop-zone-accepts-only-svg-files.tsx',
          title: 'Accepts only SVG files',
          description: 'Use to accept only SVG files.',
        },
        {
          fileName: 'drop-zone-nested.tsx',
          title: 'Nested',
          description:
            'Use to allow merchants to upload files in a wider area than the visible drop zone.',
        },
        {
          fileName: 'drop-zone-medium-sized.tsx',
          title: 'Medium-sized',
          description:
            'Use for cases with limited space. To improve usability, nest medium-sized drop zone in a larger drop zone with no outline. See the nested dropzone example.',
        },
        {
          fileName: 'drop-zone-small-sized.tsx',
          title: 'Small-sized',
          description:
            'Use for cases with tight space constraints, such as variant thumbnails on the Product details page. To improve usability, nest small-sized drop zone in a larger drop zone with no outline. See the nested dropzone example.',
        },
        {
          fileName: 'drop-zone-with-custom-file-upload-text.tsx',
          title: 'With custom FileUpload text',
          description:
            'Use for cases where you want the child contents of the dropzone to determine its height.',
        },
        {
          fileName: 'drop-zone-with-custom-file-dialog-trigger.tsx',
          title: 'With custom file dialog trigger',
          description:
            'Use to trigger the file dialog from an action somewhere else on the page.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'drop-zone.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Drop zone component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'af3kcZx8LqAdxxND5Q1bm',
    title: 'Filters',
    excerpt:
      'Filters is a composite component that filters the items of a list or table.',
    slug: 'filters',
    parentId: 'r51qs5Q4LeKPsVIRaAYW8',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'H2UK6rJOpIwJnGW223Drt',
        blockType: 'Markdown',
        content:
          'Merchants use filters to:\n\n- view different subsets of items in a list or table\n- filter by typing into a text field\n- filter by selecting filters or promoted filters\n\nThe way that merchants interact with filters depends on the components that you decide to incorporate. In its simplest form, filters includes a text field and a set of filters, which can be displayed in different ways. For example, you could show promoted filters and a More button that opens a [sheet](https://polaris.shopify.com/components/deprecated/sheet) containing more filters. What the filters are and how they’re exposed to merchants is flexible.\n\n---\n\n## Accessibility\n\nThe filters component relies on the accessibility features of multiple other components:\n\n- [Text field](https://polaris.shopify.com/components/selection-and-input/text-field)\n- [Button](https://polaris.shopify.com/components/actions/button)\n- [Popover](https://polaris.shopify.com/components/overlays/popover)\n- [Sheet](https://polaris.shopify.com/components/deprecated/sheet)\n- [Collapsible](https://polaris.shopify.com/components/collapsible)\n\n### Maintain accessibility with custom features\n\nSince custom HTML can be passed to the component for additional actions, ensure that the filtering system you build is accessible as a whole.\n\nAll merchants must:\n\n- be able to identify and understand labels for all controls\n- be notified of state changes\n- be able to complete all actions with the keyboard\n\n---\n\n## Best practices\n\nThe filters component should:\n\n- help reduce merchant effort by promoting the filtering categories that are most commonly used\n- include no more than 2 or 3 promoted filters\n- consider small screen sizes when designing the interface for each filter and the total number filters to include\n- use children only for content that’s related or relevant to filtering\n\n---\n\n## Content guidelines\n\n### Text field\n\nThe text field should be clearly labeled so it’s obvious to merchants what they should enter into the field.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Filter orders\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Enter text here\n\n</div></div>\n\n### Filter badges\n\nUse the name of the filter if the purpose of the name is clear on its own. For example, when you see a filter badge that reads **Fulfilled**, it’s intuitive that it falls under the Fulfillment status category.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Fulfilled, Unfulfilled\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Fulfillment: Fulfilled, Unfulfilled\n\n</div></div>\n\nIf the filter name is ambiguous on its own, add a descriptive word related to the status. For example, **Low** doesn’t make sense out of context. Add the word “risk” so that merchants know it’s from the Risk category.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- High risk, Low risk\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- High, Low\n\n</div></div>\n\nGroup tags from the same category together.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- (Unfulfilled, Fulfilled)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- (Unfulfilled) (fulfilled)\n\n</div></div>\n\nIf all tag pills selected: truncate in the middle\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Paid, par… unpaid\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- All payment status filters selected, Paid, unpa…\n\n</div></div>',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'filters',
      'filtering',
      'filter control',
      'resource list',
      'index',
      'list filter',
      'table',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'filters-with-a-resource-list.tsx',
          title: 'With a resource list',
          description: '',
        },
        {
          fileName: 'filters-with-a-data-table.tsx',
          title: 'With a data table',
          description: '',
        },
        {
          fileName: 'filters-with-children-content.tsx',
          title: 'With children content',
          description: '',
        },
        {
          fileName: 'filters-disabled.tsx',
          title: 'Disabled',
          description: '',
        },
        {
          fileName: 'filters-some-disabled.tsx',
          title: 'Some disabled',
          description: '',
        },
        {
          fileName: 'filters-without-clear-button.tsx',
          title: 'Without clear button',
          description: '',
        },
        {
          fileName: 'filters-with-help-text.tsx',
          title: 'With help text',
          description: '',
        },
        {
          fileName: 'filters-with-query-field-hidden.tsx',
          title: 'With query field hidden',
          description: '',
        },
        {
          fileName: 'filters-with-query-field-disabled.tsx',
          title: 'With query field disabled',
          description: '',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'filters.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Filters component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'drFYuzHHQx9XrD7BOLFfY',
    title: 'Form',
    excerpt: 'A wrapper component that handles the submission of forms.',
    slug: 'form',
    parentId: 'r51qs5Q4LeKPsVIRaAYW8',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'LHURh92wj6brzwCZQBJ4B',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nThe form component should be used to:\n\n- Wrap around all form input elements\n- Emulate the native HTML `form` element behavior with a custom `onSubmit` callback\n\n---\n\n## Related components\n\n- To arrange fields within a form using standard spacing, [use the form layout component](https://polaris.shopify.com/components/form-layout)\n- To see all of the components that make up a form, [visit the form section](https://polaris.shopify.com/components/checkbox#navigation) of the component library\n\n---\n\n## Accessibility\n\nThe form component wraps content in an HTML `<form>` element. This helps to support assistive technologies that use different interaction and browse modes.\n\nForms can have only one submit button and it must be at the end of the form. By default, buttons added to the form are given a `type` attribute set to `button` to avoid conflicts. To make a button the submit button instead (`type="submit"`), set the `submit` prop on the button.\n\n### Keyboard support\n\nBy default, the `implicitSubmit` prop is set to `true`. This allows merchants to submit the form with the <kbd>enter</kbd>/<kbd>return</kbd> key when focus is in any text field inside the form. This provides a shortcut for keyboard users. If this behavior doesn’t fit the form, then set the prop to `false`.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'form',
      'forms',
      'input',
      'checkbox',
      'check box',
      'textfield',
      'text field',
      'post',
      'get',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'form-custom-on-submit.tsx',
          title: 'Custom onSubmit',
          description:
            'Use onSubmit as a callback for when your form is submitted.',
        },
        {
          fileName: 'form-without-native-validation.tsx',
          title: 'Without native validation',
          description: 'Use in forms to toggle native form validation.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'form.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Form component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'LCAOCzzCOWiGbasLODSV3',
    title: 'Inline error',
    excerpt:
      'Inline errors are brief, in-context messages that tell merchants something went wrong with a single or group of inputs in a form. Use inline errors to help merchants understand why a form input may not be valid and how to fix it.',
    slug: 'inline-error',
    parentId: 'r51qs5Q4LeKPsVIRaAYW8',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'Keaf0eVEoFSNzd14IOV3g',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nInline errors should:\n\n- Be brief\n- Be written in sentence case\n- Be visible immediately upon a form input that is not valid\n- Be removed as soon as the input is valid so merchants can immediately tell they fixed the issue\n- Describe specific solutions so merchants can successfully complete their task in the form\n- Not be placed out of context of the input or group of inputs they describe\n\n[Learn more about error message patterns](https://polaris.shopify.com/patterns/error-messages#form-validation)\n\n---\n\n## Content guidelines\n\n### Inline error messages\n\nSince the error message is directly below the source of the problem, the copy only needs to explain why the error happened. Optionally, the message can clarify what to do next or offer a one-click fix.\n\nInline error messages should:\n\n- Clearly explain what went wrong, give a next step, or offer a one-click fix\n- Be short and concise, no more than a single sentence\n- Use [passive voice](https://polaris.shopify.com/content/grammar-and-mechanics) so merchants don’t feel like they’re being blamed for the error\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Store name is required\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- You didn’t enter a store name.\n\n</div></div>\n\n---\n\n## Related components\n\n- To create a list of exceptions that describe a resource, [use the exception list component](https://polaris.shopify.com/components/feedback-indicators/exception-list)\n\n---\n\n## Accessibility\n\n- Use the required `fieldID` prop to give the inline error a unique `id`. This ties the error to a form field using `aria-describedby` so that it\'s conveyed to screen reader users.\n- Use the required `message` prop to provide the text that describes the error.\n- The inline error [icon](https://polaris.shopify.com/design/icons) helps visually identify the error message for merchants who have difficulty seeing [colors](https://polaris.shopify.com/design/colors) or who use settings that remove color from the page.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'InlineError',
      'error message',
      'form error',
      'invalid input',
      'form group',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'inline-error-default.tsx',
          title: 'Default',
          description:
            'Use when the merchant has entered information that is not valid into multiple fields inside of a form, or needs to be displayed in a non-standard position in the form layout.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'inline-error.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Inline error component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'FhI8EexWoKwZtbouYm-I3',
    title: 'Radio button',
    excerpt:
      'Use radio buttons to present each item in a list of options where merchants must make a single selection.',
    slug: 'radio-button',
    parentId: 'r51qs5Q4LeKPsVIRaAYW8',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'zzLedNe7YmDjy8TpbI36G',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nRadio buttons should:\n\n- Always be used with an associated label component.\n- Be part of a list of radio buttons that:\n  - Include at least two or more choices.\n  - Are used to have merchants select only one option.\n  - Include mutually exclusive options—this means that each option must be\n    independent from every other option in the list. For example: Red, blue, and\n    yellow are mutually exclusive. Red, blue, yellow, red/blue are not mutually\n    exclusive.\n  - List options in a rational order that makes logical sense.\n  - Have a default option selected whenever possible.\n\n---\n\n## Content guidelines\n\n### Radio button labels\n\nRadio button labels should:\n\n- Be introduced with a colon or a heading\n- Start with a capital letter\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Option 1\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- option 1\n\n</div></div>\n\n- Not end in punctuation if it’s a single sentence, word, or a fragment\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Red\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Red;\n\n</div></div>\n\n### Toggle (Android and iOS only)\n\nToggle labels should:\n\n- Be clear what merchants are enabling or disabling\n- Start with a capital letter\n\nToggle values should:\n\n- Never be labeled\n\n---\n\n## Related components\n\n- To make simple lists of radio buttons easier to build, [use the choice list component](https://polaris.shopify.com/components/choice-list)\n- For long lists of options, [consider the select component](https://polaris.shopify.com/components/select) to avoid overwhelming merchants\n- To present merchants with a list of checkboxes, [use the choice list component](https://polaris.shopify.com/components/choice-list) with the “allow multiple” option\n- To display non-interactive list of related content, [use the content list component](https://polaris.shopify.com/components/lists/list)\n\n---\n\n## Accessibility\n\nScreen readers convey the state of the radio button automatically.\n\n- Use the `disabled` prop to apply the HTML `disabled` attribute to the radio button `<input>`. This prevents merchants from being able to interact with the radio button, and conveys its inactive state to assistive technologies.\n- Use the `id` prop to provide a unique `id` attribute value for the radio button. If an `id` isn’t provided, then the component generates one. All radio buttons must have unique `id` values to work correctly with assistive technologies.\n\n### Labeling\n\n- The required `label` prop conveys the purpose of the radio button to all merchants\n- Use the `labelHidden` prop to visually hide the label but make it available to assistive technologies\n- When you provide help text via the `helpText` prop or an inline error message via the `error` prop, the help or error content is conveyed to screen reader users with the `aria-describedby` attribute\n\n### Keyboard support\n\n- Move focus to the radio button group using the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)\n- Use the up and down arrow keys to change which radio button is selected',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'RadioButton',
      'selection',
      'choices',
      'options',
      'pick',
      'single selection form',
      'choice form',
      'option button',
      'radio button form',
      'toggle',
      'switch',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'radio-button-default.tsx',
          title: 'Default',
          description:
            'Use radio buttons where merchants must make a single selection.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'radio-button.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Radio button component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'tFVR2tO98lzMpueGn3SCX',
    title: 'Range slider',
    excerpt:
      'A range slider is an input field that merchants can use to select a numeric value within a given range (minimum and maximum values).',
    slug: 'range-slider',
    parentId: 'r51qs5Q4LeKPsVIRaAYW8',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: '-panp6_U3_4nhK2EXbpgi',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nRange sliders should:\n\n- Always be used with a label, even if that label is `hidden`.\n- When a label is visible, it should clearly communicate the purpose of the range input and its values (min, max, step, value)\n- Be labeled as “Optional” when you need to request input that’s not required\n- Validate input as soon as merchants have finished interacting with a field (but not before)\n- Always be used with two text field components when range slider has dual thumbs, to provide accessible alternatives to both the lower and upper thumbs\n\n---\n\n## Content guidelines\n\n### Range label\n\nA label is a short description of the requested input. Labels are not instructional text but they should be meaningful and clearly indicate what is expected. Labels should be:\n\n- Placed above the form field\n- Short and succinct (1–3 words)\n- Written in sentence case (the first word capitalized, the rest lowercase)\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Saturation percentage\n- Banner width\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- What is the saturation value?\n- The banner width is:\n\n</div></div>\n\n### Designating optional fields\n\nTry to only ask for information that’s required. If you need to ask merchants to provide optional information, mark the field optional by placing the text “(optional)” at the end of the field’s label. Don’t mark required fields with asterisks.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Banner width (optional)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Banner width\n\n</div></div>\n\n### Help text\n\nHelp text provides extra guidance or instruction to people filling out a form field. It can also be used to clarify how the information will be used. As with all form content, help text should be succinct and easy to read.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Video duration is calculated in seconds\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Example: 134 seconds\n\n</div></div>\n\n### Validation error messages\n\nError messages should:\n\n- Clearly explain what went wrong and how to fix it\n- Be short and concise, no more than a single sentence\n- Use [passive voice](https://polaris.shopify.com/content/grammar-and-mechanics) so merchants don’t feel like they’re being blamed for the error\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Video duration is required\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- You didn’t enter a duration\n\n</div></div>\n\n---\n\n## Related components\n\n- To collect a number value as a text input, [use the text field component](https://polaris.shopify.com/components/selection-and-input/text-field)\n\n---\n\n## Accessibility\n\nThe range slider provides a large click and tap target for the slider thumbs. Merchants can also tap or click on the slider track to move the closest slider thumb.\n\n### Single-thumb slider\n\nThe default range slider component uses the [ARIA 1.1 slider pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#slider) to build upon the default HTML `<input type="range">`. The required `label` prop provides a label for the field that’s conveyed to assistive technologies when it receives focus. When the slider is used, the `value` prop should update visually and programmatically to reflect the current value.\n\nTo consistently provide the current value to assistive technologies, use the `min` and `max` props to provide the minimum and maximum values for the slider.\n\n### Dual-thumb slider\n\nThe dual-thumb range slider component uses the [ARIA 1.1 slider (multi-thumb) pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#slidertwothumb). However, the pattern isn’t consistently supported by screen readers, especially on mobile devices. Because of this, it’s best to pair the dual-thumb slider with a set of text fields for each value, or to provide another accessible method for entering information.\n\n### Keyboard\n\n- To move focus to a slider thumb, press the <kbd>tab</kbd> key to move forward and or <kbd>shift</kbd> + <kbd>tab</kbd> to move backward\n- When a thumb has focus, use the up and down or left and right arrow keys to move the thumb and update the associated value.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'RangeSlider',
      'input',
      'range',
      'slider',
      'percent',
      'number',
      'range form',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'range-slider-default.tsx',
          title: 'Default',
          description:
            'Use when a single value between `0 and 100` needs to be selected.',
        },
        {
          fileName: 'range-slider-with-min-and-max.tsx',
          title: 'With min and max',
          description:
            'Use when a single value needs to be selected from a number range with a specific minimum and maximum.',
        },
        {
          fileName: 'range-slider-with-steps.tsx',
          title: 'With steps',
          description:
            'Use when a single value of a specific increment needs to be selected from a range of numbers.',
        },
        {
          fileName: 'range-slider-with-prefix-and-suffix.tsx',
          title: 'With prefix and suffix',
          description:
            'Use when the start or end of the range input benefits from additional content. The height of the range slider component varies based on the presence or absence of props like `label` and `helpText`. Setting a React element on the `prefix` and `suffix` props is supported to enable control of spacing and alignment.',
        },
        {
          fileName: 'range-slider-with-dual-thumb.tsx',
          title: 'With dual thumb',
          description:
            'Use when two values need to be selected from a range of numbers.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'range-slider.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Range slider component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: '4h6yEWyNW6Wej4nW9wfaE',
    title: 'Select',
    excerpt:
      'Select lets merchants choose one option from an options menu. Consider select when you have 4 or more options, to avoid cluttering the interface.',
    slug: 'select',
    parentId: 'r51qs5Q4LeKPsVIRaAYW8',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: '0cWZ-zqk1nPeXY6pQR8SA',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nThe select component should:\n\n- Be used for selecting between 4 or more pre-defined options\n- Have a default option selected whenever possible\n- Use “Select” as a placeholder option only if there’s no logical default option\n\n---\n\n## Content guidelines\n\n### Select label\n\nLabels should:\n\n- Give a short description (1–3 words) of the requested input.\n- Be written in sentence case (the first word capitalized, the rest lowercase).\n- Avoid punctuation and articles (“the”, “an”, “a”).\n- Be independent sentences. To support [internationalization](https://polaris.shopify.com/foundations/internationalization), they should not act as the first part of a sentence that is finished by the component’s options.\n- Be descriptive, not instructional. If the selection needs more explanation, use help text below the field.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Email address\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- What is your email address?\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Phone number\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- My phone number is:\n\n</div></div>\n\n### Select options\n\nOptions should:\n\n- Start with “Select” as a placeholder if there isn’t a default option\n- Be listed alphabetically or in another logical order so merchants can easily find the option they need\n- Be written in sentence case (the first word capitalized, the rest lowercase) and avoid using commas or semicolons at the end of each option\n- Be clearly labelled based on what the option will do\n\n---\n\n## Related components\n\n- To let merchants select one option from a list with less than 4 options, use [the choice list component](https://polaris.shopify.com/components/choice-list)\n- To create a select where merchants can make multiple selections, or to allow advanced formatting of option text, use an [option list](https://polaris.shopify.com/components/option-list) inside a [popover](https://polaris.shopify.com/components/overlays/popover)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'on off',
      'switch',
      'adjuster',
      'dropdown menu',
      'drop-down menu',
      'menu',
      'form',
      'combobox',
      'combo box',
      'choice list',
      'choicelist',
      'list',
      'disabled select',
      'field label',
      'long list of options',
      'long option list',
      'separate error message',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'select-default.tsx',
          title: 'Default',
          description:
            'Presents a classic dropdown menu or equivalent picker as determined by merchants’ browsers.',
        },
        {
          fileName: 'select-with-inline-label.tsx',
          title: 'With inline label',
          description:
            'Use only for cases where the select must fit on a single line, such as in a toolbar.',
        },
        {
          fileName: 'select-disabled.tsx',
          title: 'Disabled',
          description:
            'Use for selections that aren’t currently available. The surrounding interface should make it clear why the select box is disabled and how to activate it.',
        },
        {
          fileName: 'select-with-prefix.tsx',
          title: 'With prefix',
          description:
            'Renders any React element to the left of individual select options. Does not show in the dropdown.',
        },
        {
          fileName: 'select-with-validation-error.tsx',
          title: 'With validation error',
          description:
            'Use to let merchants know if there’s a problem with their selection. For selects, a selection is typically invalid only when using a placeholder option (“Select”) and no other selection has been made.',
        },
        {
          fileName: 'select-with-separate-validation-error.tsx',
          title: 'With separate validation error',
          description:
            'Use to let merchants know when their select input is invalid in the context of a group of form inputs that the select depends on.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'select.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Select component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'pxzxdj8ozOqC3nrRFY5e6',
    title: 'Tag',
    excerpt:
      'Tags represent a set of interactive, merchant-supplied keywords that help label, organize, and categorize objects. Tags can be added or removed from an object by merchants.',
    slug: 'tag',
    parentId: 'r51qs5Q4LeKPsVIRaAYW8',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'ApGa3a7J_YjiCUp2TphSS',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nTags should:\n\n- Be presented close to or within the input control that allows merchants to add and remove tags\n\n---\n\n## Related components\n\n- To show the status of an object, [use the badge component](https://polaris.shopify.com/components/feedback-indicators/badge)\n- To add and remove tags, [use the text field component](https://polaris.shopify.com/components/selection-and-input/text-field)\n\n---\n\n## Accessibility\n\n### Labeling\n\nThe button to remove a tag is automatically given a label using `aria-label` so that screen reader users can distinguish which tag will be removed.\n\n### Keyboard support\n\nThe control to remove a tag is implemented as a button with standard keyboard support.\n\n- Give buttons keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)\n- To activate a button, press the <kbd>enter</kbd>/<kbd>return</kbd> or <kbd>space</kbd> key\n\nWhen a merchant uses the button to remove a tag, it is important to make sure that keyboard focus is managed. Moving focus to the next element in the page is recommended.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'indicator',
      'label',
      'label objects',
      'organize objects',
      'categorize objects',
      'categories',
      'keywords',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'tag-default.tsx',
          title: 'Default',
          description: 'Use to signify the attributes of an object.',
        },
        {
          fileName: 'tag-removable.tsx',
          title: 'Removable',
          description:
            'Use to allow merchants to remove attributes from an object.',
        },
        {
          fileName: 'tag-clickable.tsx',
          title: 'Clickable',
          description: 'Use to allow merchants to add attributes to an object.',
        },
        {
          fileName: 'tag-with-link.tsx',
          title: 'With link',
          description:
            'Use to allow merchants to navigate to a resource. For example a customer segment or a smart collection',
        },
        {
          fileName: 'tag-with-custom-content.tsx',
          title: 'With custom content',
          description:
            "Use when a tag needs to be visually distinguished from others, like when it's added automatically.",
        },
        {
          fileName: 'tag-removable-with-link.tsx',
          title: 'Removable with link',
          description:
            'A removable attribute to an object that allows merchants to navigate to a resource.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'tag.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Tag component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'bcrs5P2Mve8Jmab-mBipT',
    title: 'Text field',
    excerpt:
      'A text field is an input field that merchants can type into. It has a range of options and supports several text formats including numbers.',
    slug: 'text-field',
    parentId: 'r51qs5Q4LeKPsVIRaAYW8',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'eZ2QgZ_njinNNScrhi5pa',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nText fields should:\n\n- Be clearly labeled so it’s obvious to merchants what they should enter into the field\n- Be labeled as “Optional” when you need to request input that’s not required\n- Only ask for information that’s really needed\n- Validate input as soon as merchants have finished interacting with a field (but not before)\n\n### Autocomplete\n\nThe autocomplete attribute in an `input` field controls two types of browser behavior:\n\n1. **Browser autofill**: a feature that automatically populates form fields with previously-saved information, such as passwords, addresses, and credit card data.\n\n- Autofill is an important feature for our users. Google has found that ["users complete forms up to 30% faster"](https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill?hl=en) when using autofill.\n- The WHATWG has a list of supported autofill values for the `autocomplete` attribute. [Review the section "4.10.18.7 Autofill"](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill) for all the input types and their corresponding autocomplete attribute values.\n\n2. **Browser autocomplete** - a feature that displays previously submitted values for that field.\n\n- When this is on for a field, a user is presented a list with previously submitted values for the input\n\n**Recommendation**\n\n> Always add an autocomplete attribute and value to inputs if the type is: color, date, datetime-local, email, month, number, password, range, search, tel, text, time, url, or week.\n\n#### Turning autofill/autocomplete off\n\nEven if you do not want the browser to autofill a user\'s information, it is recommended you still have an autocomplete attribute with the value off or nope.\n\nUnfortunately, [not all browsers support](https://caniuse.com/input-autocomplete-onoff) or respect autocomplete="off". This makes things challenging. Chrome, for example, [has a long outstanding bug](https://bugs.chromium.org/p/chromium/issues/detail?id=468153) and won\'t add support for off for now.\n\n| Browser | Support for `autocomplete="off"` | Details                                                                                                                                                             |\n| ------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| Chrome  | Partial                          | Intentionally ignores `off` value when the user uses the browser\'s autofill functionality. [See bug](https://bugs.chromium.org/p/chromium/issues/detail?id=468153). |\n| Safari  | Partial                          | Ignores `off` value for `username`, `email` and `password` fields.                                                                                                  |\n| Firefox | Partial                          | Ignores `off` value for login forms. [See bug](https://bugzilla.mozilla.org/show_bug.cgi?id=956906).                                                                |\n| Edge    | Partial                          | Intentionally ignores `off` value when the user uses the browser\'s autofill functionality.                                                                          |\n\nChrome does seem to turn autocomplete off when using the value nope (or any non valid string). However, we have seen some inconsistencies even with that support.\n\n**Recommendation (Chrome only)**\n\n- Turning off both **autofill** and **browser autocomplete** (previously submitted values) in Chrome\n  - Use `autocomplete=nope` and also **must have a `name` attribute**.\n- Turning off **browser autocomplete** (previously submitted values) in Chrome\n  - If you don\'t have `name` attribute and the field is not a typical autofill input (address, email, etc), use `autocomplete=off`.\n\n### Virtual keyboard\n\n![Examples of different number keyboards set with inputMode](/images/virtual-keyboards.png)\n\nThe `inputMode` property should be set to select the appropriate virtual keyboard for the type of data expected to be entered by the user. Above are examples of different number keyboards set with `inputMode`.\n\n---\n\n## Content guidelines\n\nFor text field content guidelines, reference the [text fields experience](https://polaris.shopify.com/patterns/text-fields) page.\n\n---\n\n## Related components\n\n- To lay out the elements in a responsive form, [use the form layout component](https://polaris.shopify.com/components/form-layout)\n- To describe an invalid form input with a separate validation error, [use the inline error component](https://polaris.shopify.com/components/inline-error)\n- It’s common to [use a select component](https://polaris.shopify.com/components/select) connected to the left or right of a text field.\n\n---\n\n## Accessibility\n\n### Structure\n\nScreen readers convey information about text fields automatically through native HTML.\n\n- Use the `disabled` prop to add the HTML `disabled` attribute to the text field.\n- Use the `readOnly` prop to add the HTML `readonly` attribute to the text field.\n- If you use the `type` prop, then some assistive technologies adapt the software keyboard to the current task. This helps merchants with mobility, vision, and cognitive issues to enter information more easily.\n\nUse the `id` prop to provide a unique `id` attribute value for the text field. If you don\'t provide an `id`, then the component generates one automatically. All text fields need to have unique `id` values.\n\n### Labeling\n\nThe `label` prop is required to convey the purpose of the checkbox to all merchants.\n\nIf there are separate visual cues that convey the purpose of the text field to sighted merchants, then the label can be visually hidden with the `labelHidden` prop.\n\nWhen you provide help text via the `helpText` prop or an inline error message via the `error` prop, the help or error content is conveyed to screen reader users with the `aria-describedby` attribute. This attribute causes the content to be read along with the label, either immediately or after a short delay.\n\nUse the `placeholder` prop to provide additional instructions. However, don’t rely on placeholders alone since the content isn’t always conveyed to all merchants.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Use the label to provide instructions critical to using the text field\n- Use help text and placeholder text to provide additional, non-critical instructions\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nUse the placeholder to provide information that’s required to use the text field.\n\n</div></div>\n\n### Keyboard support\n\nText fields have standard keyboard support.\n\n- Merchants who rely on the keyboard expect to move focus to each text field using the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)\n- If the `type` is set to `number`, then merchants can use the up and down arrow keys to adjust the value typed into the field when hovering over or focusing the field to make the arrows appear\n- Using the `disabled` prop will prevent the text field from receive keyboard focus or inputs\n- The `readOnly` prop allows focus on the text field but prevents input or editing\n- The `inputMode` prop can be used to bring up a relevant keyboard for merchants on mobile; it’s passed down to the input as an [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode)\n\n#### Automatically focusing\n\nAlthough you can use the `autoFocus` prop to automatically move focus to the text field, it’s generally best to avoid focusing on fields automatically. The `autoFocus` prop is set to `false` by default and should only be used in cases where it won’t force focus to skip other controls or content of equal or greater importance.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'TextField',
      'input',
      'textarea',
      'type',
      'add info',
      'form field',
      'input forms',
      'form input',
      'field',
      'active state',
      'input active state',
      'input state',
      'input focus',
      'focus',
      'textbar',
      'text bar',
      'forms',
      'form inputs',
      'form text input',
      'placeholder text',
      'field placeholder text',
      'optional fields',
      'field help text',
      'validation error messages',
      'field labels',
      'number fields',
      'email fields',
      'multiline',
      'hidden label',
      'label action',
      'placeholder text',
      'help text',
      'prefix or suffix',
      'connected fields',
      'label actions',
      'hidden labels',
      'separate error message',
      'icon action',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'text-field-default.tsx',
          title: 'Default',
          description:
            'Use to allow merchants to provide text input when the expected input is short. For longer input, use the auto grow or multiline options.',
        },
        {
          fileName: 'text-field-number.tsx',
          title: 'Number',
          description: 'Use when input text should be a number.',
        },
        {
          fileName: 'text-field-email.tsx',
          title: 'Email',
          description: 'Use when the text input should be an email address.',
        },
        {
          fileName: 'text-field-multiline.tsx',
          title: 'Multiline',
          description:
            'Use when the expected input could be more than one line. The field will automatically grow to accommodate additional text.',
        },
        {
          fileName: 'text-field-with-hidden-label.tsx',
          title: 'With hidden label',
          description:
            'Use to visually hide the label when the text field’s purpose is clear from context. The label will remain available to screen readers. Use this option with care. In almost all cases, show the label.',
        },
        {
          fileName: 'text-field-with-label-action.tsx',
          title: 'With label action',
          description:
            'Use when an optional, secondary action is closely associated with a text field. For example, on a field for entering a customs tariff code, a label action might be to look up the appropriate code from a table.',
        },
        {
          fileName: 'text-field-with-right-aligned-text.tsx',
          title: 'With right aligned text',
          description: 'Use when input text should be aligned right.',
        },
        {
          fileName: 'text-field-with-placeholder-text.tsx',
          title: 'With placeholder text',
          description:
            'Use to provide a short, non-essential hint about the expected input. Placeholder text is low-contrast, so don’t rely on it for important information.',
        },
        {
          fileName: 'text-field-with-help-text.tsx',
          title: 'With help text',
          description:
            'Use to show short instructional content below the text field. Help text works to help merchants understand how to fix errors that result from incorrect formatting (such as dates or passwords with specific character requirements). If more explanation is needed, link to the Shopify Help Center.',
        },
        {
          fileName: 'text-field-with-prefix-or-suffix.tsx',
          title: 'With prefix or suffix',
          description:
            'Use as a special form of help text that works best inline. Use a prefix for things like currency symbols (“\\$”, “¥”, “£”). Use suffix for things like units of measure (“in”, “cm”).',
        },
        {
          fileName: 'text-field-with-vertical-content.tsx',
          title: 'With vertical content',
          description:
            'Use to include custom vertical content above the input value, like selected tags.',
        },
        {
          fileName: 'text-field-with-connected-fields.tsx',
          title: 'With connected fields',
          description:
            'Use when a text field and several related fields make up a logical unit. If inputting weight as a number and a separate unit of measurement, use a text field with a [select dropdown menu](https://polaris.shopify.com/components/select) (for example “kg”, “lb”) as a connected field.',
        },
        {
          fileName: 'text-field-with-validation-error.tsx',
          title: 'With validation error',
          description:
            'Use to let merchants know if their input is valid or if there’s an error. Whenever possible, validate input as soon as merchants have finished interacting with a field (but not before). If a field already has an error, validate and remove errors as merchants type so they can immediately see when an error has been fixed.',
        },
        {
          fileName: 'text-field-with-separate-validation-error.tsx',
          title: 'With separate validation error',
          description:
            'Use to let merchants know when their text field input is invalid in the context of a group of form inputs that the text field depends on.',
        },
        {
          fileName: 'text-field-disabled.tsx',
          title: 'Disabled',
          description:
            'Use to show that a textfield is not available for interaction. Most often used in forms when information is required only in a particular state. For example, the text field next to Other in a choice list when Other is not selected.',
        },
        {
          fileName: 'text-field-with-character-count.tsx',
          title: 'With character count',
          description:
            'Use to display the current number of characters in a text field. Use in conjunction with max length to display the current remaining number of characters in the text field.',
        },
        {
          fileName: 'text-field-with-clear-button.tsx',
          title: 'With clear button',
          description:
            'Use to allow merchants to clear the content from a text field.',
        },
        {
          fileName: 'text-field-with-monospaced-font.tsx',
          title: 'With monospaced font',
          description: 'Use to apply a monospaced font to the TextField',
        },
        {
          fileName: 'text-field-with-value-selected-on-focus.tsx',
          title: 'With value selected on focus',
          description: 'Use to select all text inside TextField on focus.',
        },
        {
          fileName: 'text-field-with-inline-suggestion.tsx',
          title: 'With inline suggestion',
          description:
            "Use to provide an autocomplete suggestion inline with the input value. See the combobox component's tag multi-select example for full implementation of the inline autocomplete pattern.",
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'text-field.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Text field component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'lQ6pOpbEaCocBzfOe4jOd',
    title: 'Tables',
    excerpt: '',
    slug: 'tables',
    parentId: 'TMuy-j4fhMovb5NxzFw6G',
    order: 7,
    layout: 'listing',
    blocks: [],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'CHREG_bt5S8pGmYkrmhuc',
    title: 'Data table',
    excerpt:
      'Data tables are used to organize and display all information from a data set. While a data visualization represents part of data set, a data table lets merchants view details from the entire set. This helps merchants compare and analyze the data.',
    slug: 'data-table',
    parentId: 'lQ6pOpbEaCocBzfOe4jOd',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: '5k91UhGvGNvg0Dv1dq3tC',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nData tables should:\n\n- Show values across multiple categories and measures.\n- Allow for filtering and ordering when comparison is not a priority.\n- Help merchants visualize and scan many values from an entire data set.\n- Help merchants find other values in the data hierarchy through use of links.\n- Minimize clutter by only including values that supports the data’s purpose.\n- Include a summary row to surface the column totals.\n- Not include calculations within the summary row.\n- Wrap instead of truncate content. This is because if row titles start with the same word, they’ll all appear the same when truncated.\n- Not to be used for an actionable list of items that link to details pages. For this functionality, use the [resource list component](https://polaris.shopify.com/components/resource-list).\n\n### Alignment\n\nColumn content types are built into the component props so the following alignment rules are followed:\n\n- Numerical = Right aligned\n- Textual data = Left aligned\n- Align headers with their related data\n- Don’t center align\n\n---\n\n## Content guidelines\n\nHeaders should:\n\n- Be informative and descriptive\n- Concise and scannable\n- Include units of measurement symbols so they aren’t repeated throughout the columns\n- Use sentence case (first word capitalized, rest lowercase)\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nTemperature °C\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nTemperature\n\n</div></div>\n\nColumn content should:\n\n- Be concise and scannable\n- Not include units of measurement symbols (put those symbols in the headers)\n- Use sentence case (first word capitalized, rest lowercase)\n\n### Decimals\n\nKeep decimals consistent. For example, don’t use 3 decimals in one row and 2 in others.\n\n---\n\n## Related components\n\n- To create an actionable list of related items that link to details pages, such as a list of customers, use the [resource list component](https://polaris.shopify.com/components/resource-list).\n\n---\n\n## Accessibility\n\n### Structure\n\nNative HTML tables provide a large amount of structural information to screen reader users. Merchants who rely on screen readers can navigate tables and identify relationships between data cells (`<td>`) and headers (`<th>`) using keys specific to their screen reader.\n\nSortable tables use the `aria-sort` attribute to convey which columns are sortable (and in what direction). They also use `aria-label` on sorting buttons to convey what activating the button will do.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nUse tables for tabular data.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nUse tables for layout. For a table-like layout that doesn’t use table HTML elements, use the [resource list component](https://polaris.shopify.com/components/resource-list).\n\n</div></div>\n\n### Keyboard support\n\nSorting controls for the data table component are implemented with native HTML buttons.\n\n- Give buttons keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)\n- Activate buttons with the <kbd>enter</kbd>/<kbd>return</kbd> and <kbd>space</kbd> keys',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['DataTable', 'data', 'table', 'tabular', 'index'],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'data-table-default.tsx',
          title: 'Default',
          description:
            'Use to present small amounts of data for merchants to view statically.',
        },
        {
          fileName: 'data-table-sortable.tsx',
          title: 'Sortable',
          description:
            'Use when clarity of the table’s content is needed. For example, to note the number of rows currently shown in a data table with pagination.',
        },
        {
          fileName: 'data-table-with-footer.tsx',
          title: 'With footer',
          description:
            'Use when clarity of the table’s content is needed. For example, to note the number of rows currently shown in a data table with pagination.',
        },
        {
          fileName: 'data-table-with-custom-totals-heading.tsx',
          title: 'With custom totals heading',
          description: 'Use to provide a custom heading for the totals row.',
        },
        {
          fileName: 'data-table-with-totals-in-footer.tsx',
          title: 'With totals in footer',
          description:
            'Use to reposition the totals row in a more appropriate location based on the data stored in the table for merchants to better understand its meaning.',
        },
        {
          fileName: 'data-table-with-row-heading-links.tsx',
          title: 'With row heading links',
          description:
            'Use to help merchants find relevant, finer grained data sets.',
        },
        {
          fileName: 'data-table-with-all-of-its-elements.tsx',
          title: 'With all of its elements',
          description:
            'Use as a broad example that includes most props available to data table.',
        },
        {
          fileName: 'data-table-with-fixed-first-columns.tsx',
          title: 'With fixed first columns',
          description:
            'Use when the table contains many columns and it would benefit the merchant to see a set number of columns when scrolling to the right. For example, the first column in the "Sales by Product" report table is fixed because the product names are important to reference while analyzing the sales data in other columns.\n\nWhen fixing multiple columns, ensure other data within the table is visible and not limited on smaller screens.',
        },
        {
          fileName: 'data-table-with-increased-density-and-zebra-striping.tsx',
          title: 'With increased density and zebra striping',
          description:
            'Use as a broad example that includes most props available to data table.',
        },
        {
          fileName: 'data-table-with-sticky-header-enabled.tsx',
          title: 'With sticky header enabled',
          description:
            'Use as a broad example that includes most props available to data table.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'data-table.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Data table component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'xL8TbvOOhqRQ3QW1BCqw1',
    title: 'Index table',
    excerpt:
      'An index table displays a collection of objects of the same type, like orders or products. The main job of an index table is to help merchants get an at-a-glance of the objects to perform actions or navigate to a full-page representation of it.',
    slug: 'index-table',
    parentId: 'lQ6pOpbEaCocBzfOe4jOd',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'vy5sTr4hulNsBAtkSyOu4',
        blockType: 'Markdown',
        content:
          'Index tables can also:\n\n- Support [customized index rows and columns](https://polaris.shopify.com/components/resource-item)\n- Include bulk actions so merchants can act on multiple objects at once\n- Support sorting and [filtering](https://polaris.shopify.com/components/filters) of long lists\n- Be paired with pagination to make long lists digestible\n\n---\n\n## Build\n\nUsing an index table in a project involves combining the following components and subcomponents:\n\n- IndexTable\n- [IndexTableRow](#index-table-row)\n- [IndexTableCell](#index-table-cell)\n- [Filters](https://polaris.shopify.com/components/filters) (optional)\n- Pagination component (optional)\n\nThe index table component provides the UI elements for list sorting, filtering, and pagination, but doesn’t provide the logic for these operations. When a sort option is changed, filter added, or second page requested, you’ll need to handle that event (including any network requests) and then update the component with new props.\n\n---\n\n## Purpose\n\nShopify is organized around objects that represent merchants businesses, like customers, products, and orders. Each individual order, for example, is given a dedicated page that can be linked to. In Shopify, we call these types of objects _resources_, and we call the object’s dedicated page its _details page_.\n\n### Problem\n\nTake orders as an example. Merchants may have a lot of them. They need a way to scan their orders, view the different attributes on each order, and find out which ones need action first. In other words, they need a way find an individual order, call up more information about it, and take action on it.\n\n### Solution\n\nIndex tables function as:\n\n- A content format, presenting a set of individual resources with multiple columns of information for each\n- A system for taking action on one or more individual resources\n- A way to navigate to an individual resource’s details page\n\nBecause a details page displays all the content and actions for an individual resource, you can think of a resource list as a summary of these details pages. In this way resource lists bridge a middle level in Shopify’s navigation hierarchy.\n\n---\n\n## Best practices\n\nIndex tables should:\n\n- Have items that perform an action when clicked. The action should navigate to the resource’s details page or otherwise provide more detail about the item.\n- [Customize the content and layout](https://polaris.shopify.com/components/resource-item) of their items rows to surface information to support merchants’ needs.\n- Support sorting if the list can be long, and especially if different merchant tasks benefit from different sort orders.\n- Support [filtering](https://polaris.shopify.com/components/filters) if the list can be long.\n- Paginate when the current list contains more than 50 items.\n- Use the [skeleton page](https://polaris.shopify.com/components/skeleton-page) component on initial page load for the rest of the page if the loading prop is true and items are processing.\n- Numeric cells and titles should be right aligned with the [Text](https://polaris.shopify.com/components/text) component\n- Numeric cells should use the numeric style with the [Text](https://polaris.shopify.com/components/text) component\n\nIndex tables can optionally:\n\n- Provide bulk actions for tasks that are often applied to many list items at once. For example, merchants may want to add the same tag to a large number of products.\n\n---\n\n## Content guidelines\n\nIndex tables should:\n\n- Identify the type of resource, usually with a heading\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Products\n- Showing 50 products\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- _No heading_\n\n</div></div>\n\n- Indicate when not all members of a resource are being shown. For a card summarizing and linking to recently purchased products:\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Popular products this week\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Products\n\n</div></div>\n\n- Follow the verb + noun formula for bulk actions\n\n- Follow the [content guidelines for filter options and applied filters](https://polaris.shopify.com/components/filters#content-guidelines)\n\n---\n\n## IndexTableRow\n\nAn `IndexTableRow` is used to render a row representing an item within an `IndexTable`\n\n### IndexTableRow properties\n\n| Prop     | Type       | Description                                                      |\n| -------- | ---------- | ---------------------------------------------------------------- |\n| id       | string     | A unique identifier for the row                                  |\n| selected | boolean    | A boolean property indicating whether the row is selected        |\n| position | number     | The index position of the row                                    |\n| subdued  | boolean    | A boolean property indicating whether the row should be subdued  |\n| status   | RowStatus  | A property indicating whether the row should have a status       |\n| disabled | boolean    | A boolean property indicating whether the row should be disabled |\n| onClick  | () => void | A function which overrides the default click behaviour           |\n\n## IndexTableCell\n\nAn `IndexTableCell` is used to render a single cell within an `IndexTableRow`\n\n### IndexTableCell properties\n\n| Prop      | Type    | Description                                                                      |\n| --------- | ------- | -------------------------------------------------------------------------------- |\n| flush     | boolean | A boolean property indicating whether the cell should remove the default padding |\n| className | string  | Adds a class to the cell, used for setting widths of a cell                      |\n\n---\n\n## Related components\n\n- To create an actionable list of related items that link to details pages, such as a list of customers, use the [resource list component](https://polaris.shopify.com/components/resource-list)\n- To present structured data for comparison and analysis, like when helping merchants to gain insights or review analytics, use the [data table component](https://polaris.shopify.com/components/data-table)\n- To display a simple list of related content, [use the list component](https://polaris.shopify.com/components/lists/list)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'ResourceList',
      'index',
      'table',
      'list',
      'collections',
      'items',
      'objects',
      'list of products',
      'list of orders',
      'product lists',
      'order lists',
      'collections lists',
      'collection lists',
      'list of collections',
      'product listings list',
      'channel lists',
      'resource list attributes',
      'list attributes',
      'exceptions list',
      'list secondary actions',
      'secondary actions in a list',
      'list of resources',
      'filter',
      'sort',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'index-table-default.tsx',
          title: 'Default',
          description:
            'A index table with simple items and no bulk actions, sorting, or filtering.',
        },
        {
          fileName: 'index-table-flush.tsx',
          title: 'Flush',
          description:
            'A index table with simple items and no bulk actions, sorting, or filtering.',
        },
        {
          fileName: 'index-table-small-screen.tsx',
          title: 'Small screen',
          description:
            'A small screen index table with simple items and no bulk actions, sorting, or filtering.',
        },
        {
          fileName: 'index-table-with-empty-state.tsx',
          title: 'With empty state',
          description:
            'Use to explain the purpose of a index table when no resources exist yet. This allows a smooth transition from a list in a loading state to a list where zero, one, or many resources exist.',
        },
        {
          fileName: 'index-table-with-bulk-actions.tsx',
          title: 'With bulk actions',
          description:
            'Allows merchants to select items and perform an action on the selection.',
        },
        {
          fileName: 'index-table-with-multiple-promoted-bulk-actions.tsx',
          title: 'With multiple promoted bulk actions',
          description:
            'Allows merchants to select items and perform different actions on the selection.',
        },
        {
          fileName:
            'index-table-with-bulk-actions-and-selection-across-pages.tsx',
          title: 'With bulk actions and selection across pages',
          description:
            'Allows merchants to select items, perform an action on the selection and select resources across pages.',
        },
        {
          fileName: 'index-table-with-loading-state.tsx',
          title: 'With loading state',
          description:
            'Notifies merchants that index table items are being processed.',
        },
        {
          fileName: 'index-table-with-filtering.tsx',
          title: 'With filtering',
          description:
            'Allows merchants to narrow the index table to a subset of the original items.',
        },
        {
          fileName: 'index-table-with-row-status.tsx',
          title: 'With row status',
          description: 'An index table with rows differentiated by status.',
        },
        {
          fileName: 'index-table-with-sticky-last-column.tsx',
          title: 'With sticky last column',
          description:
            'An index table with a sticky last column that stays visible on scroll. The last heading will also be sticky if not hidden.',
        },
        {
          fileName: 'index-table-with-row-navigation-link.tsx',
          title: 'With row navigation link',
          description:
            "Use when clicking the row should navigate merchants to another page, like the row item's detail page. When a row contains a `Link` with the `dataPrimaryLink` prop set to `true`, clicking the row will trigger navigation to the link's `url` instead of selecting the row as well as trigger the callback set on the `IndexTable` `onNavigation` prop if provided.",
        },
        {
          fileName: 'index-table-with-clickable-button-column.tsx',
          title: 'With clickable button column',
          description:
            "Use when clicking the row should navigate merchants to another page, like the row item's detail page. When a row contains a `Button` with the `dataPrimaryLink` prop set to `true`, clicking the row will navigate to the `Button` `url` if set instead of selecting the row as well as trigger the callback set on the `IndexTable` `onNavigation` prop if provided.",
        },
        {
          fileName: 'index-table-without-checkboxes.tsx',
          title: 'Without checkboxes',
          description: 'An index table without checkboxes and bulk actions.',
        },
        {
          fileName: 'index-table-with-all-of-its-elements.tsx',
          title: 'With all of its elements',
          description:
            'Use as a broad example that includes most of the elements and props available to index table.',
        },
        {
          fileName: 'index-table-small-screen-with-all-of-its-elements.tsx',
          title: 'Small screen with all of its elements',
          description:
            'Use as a broad example that includes most of the elements and props available to index table.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'index-table.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Index table component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'IFwJlRi_Ve090vnXf3yFA',
    title: 'Typography',
    excerpt: 'Typography components',
    slug: 'typography',
    parentId: 'TMuy-j4fhMovb5NxzFw6G',
    order: 6,
    layout: 'listing',
    blocks: [],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'wEDZZl0Iybsq-ubwnQS4n',
    title: 'Text',
    excerpt:
      'Typography helps establish hierarchy and communicate important content by creating clear visual patterns.',
    slug: 'text',
    parentId: 'IFwJlRi_Ve090vnXf3yFA',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'q51CHVgSEv73UmyCFDJA3',
        blockType: 'Markdown',
        content:
          '## Variant tokens\n\nEach variant uses a predetermined combination of the [font tokens](/tokens/font) to set the font size and line height. Heading variants have a set font weight but can be overridden by using the `fontWeight` prop.\n\n| Variant      | Font size token     | px value | rem value | Font line height token | Font weight token          | Reponsive |\n| ------------ | ------------------- | -------- | --------- | ---------------------- | -------------------------- | --------- |\n| `heading4Xl` | `--p-font-size-700` | 40       | 2.5       | `--p-line-height-7`    | `--p-font-weight-bold`     | Yes       |\n| `heading3Xl` | `--p-font-size-600` | 32       | 2         | `--p-line-height-6`    | `--p-font-weight-semibold` | Yes       |\n| `heading2Xl` | `--p-font-size-500` | 28       | 1.75      | `--p-line-height-5`    | `--p-font-weight-semibold` | Yes       |\n| `headingXl`  | `--p-font-size-400` | 24       | 1.5       | `--p-line-height-4`    | `--p-font-weight-semibold` | Yes       |\n| `headingLg`  | `--p-font-size-300` | 20       | 1.25      | `--p-line-height-3`    | `--p-font-weight-semibold` | Yes       |\n| `headingMd`  | `--p-font-size-200` | 16       | 1         | `--p-line-height-3`    | `--p-font-weight-semibold` | No        |\n| `headingSm`  | `--p-font-size-100` | 14       | 0.875     | `--p-line-height-2`    | `--p-font-weight-semibold` | No        |\n| `headingXs`  | `--p-font-size-75`  | 12       | 0.75      | `--p-line-height-1`    | `--p-font-weight-semibold` | No        |\n| `bodyLg`     | `--p-font-size-200` | 16       | 1         | `--p-line-height-2`    | `--p-font-weight-regular`  | No        |\n| `bodyMd`     | `--p-font-size-100` | 14       | 0.875     | `--p-line-height-2`    | `--p-font-weight-regular`  | No        |\n| `bodySm`     | `--p-font-size-75`  | 12       | 0.75      | `--p-line-height-1`    | `--p-font-weight-regular`  | No        |\n\n---\n\n## Mapping from previous type components\n\nThese are suggested replacements for existing text style components, but ultimately the best replacement should be evaluated based on the context of the usage. The `Text` component also requires setting the semantically appropriate html element through the `as` prop.\n\n### DisplayText\n\n#### Small\n\n```diff\n- <DisplayText size="small">Sales this year</DisplayText>\n+ <Text variant="headingLg" as="p">Sales this year</Text>\n```\n\n#### Medium\n\n```diff\n- <DisplayText size="medium">Sales this year</DisplayText>\n+ <Text variant="headingXl" as="p">Sales this year</Text>\n```\n\n#### Large\n\n```diff\n- <DisplayText size="large">Sales this year</DisplayText>\n+ <Text variant="heading2xl" as="p">Sales this year</Text>\n```\n\n#### Extra large\n\n```diff\n- <DisplayText size="extraLarge">Sales this year</DisplayText>\n+ <Text variant="heading4xl" as="p">Sales this year</Text>\n```\n\n### Heading\n\n```diff\n- <Heading>Online store dashboard</Heading>\n+ <Text variant="headingMd" as="h2">Online store dashboard</Text>\n```\n\n### Subheading\n\n```diff\n- <Subheading>Accounts</Subheading>\n+ <Text variant="headingXs" as="h3">Accounts</Text>\n```\n\n### Caption\n\n```diff\n- <Caption>Received April 21, 2017</Caption>\n+ <Text variant="bodySm" as="p">Received April 21, 2017</Text>\n```\n\n### TextStyle\n\n#### Subdued\n\n```diff\n- <TextStyle variation="subdued">No supplier listed</TextStyle>\n+ <Text as="span" color="subdued">No supplier listed</Text>\n```\n\n#### Strong\n\n```diff\n- <TextStyle variation="strong">No supplier listed</TextStyle>\n+ <Text as="span" fontWeight="semibold" >No supplier listed</Text>\n```\n\n#### Positive\n\n```diff\n- <TextStyle variation="positive">No supplier listed</TextStyle>\n+ <Text as="span" color="success">No supplier listed</Text>\n```\n\n#### Negative\n\n```diff\n- <TextStyle variation="negative">No supplier listed</TextStyle>\n+ <Text as="span" color="critical">No supplier listed</Text>\n```\n\n#### Warning\n\n```diff\n- <TextStyle variation="warning">No supplier listed</TextStyle>\n+ <Text as="span" color="warning">No supplier listed</Text>\n```\n\n#### Code\n\n```diff\n- <TextStyle variation="code">No supplier listed</TextStyle>\n+ <Text as="span"><InlineCode>No supplier listed</InlineCode></Text>\n```\n\n### VisuallyHidden\n\n```diff\n- <VisuallyHidden>\n-   <Heading>Title and description</Heading>\n- </VisuallyHidden>\n+ <Text visuallyHidden as="h2">Title and description</Text>\n```\n\n---\n\n## Best practices\n\n### Headings\n\nHeadings use all the variants with `heading` in the name, such as `headingMd`. Headings should:\n\n- Clearly describe the section of interface they refer to\n- Highlight the most important concept or piece of information merchants need to know\n- Sit at the top of the section of interface they’re referring to\n\n### Captions\n\nCaptions use the `bodySm` Text variant.\n\n- Use for secondary labels in graphs and charts\n- May be used for timestamps in lists of content\n- Don’t use this variant for other cases\n- Don’t use this variant for text longer than a few words\n- Don’t use this variant for aesthetic effect or to break from the standard text size\n\n### Text styles\n\nText styles should be:\n\n- Used when enhancing the text to help merchants understand its meaning\n- Subdued if the text is less important than its surrounding text\n- Warning if the text denotes something that needs attention, or that merchants need to take action on.\n- Semibold for input fields, or for a row total in a price table\n- Paired with symbols, like an arrow or dollar sign, when using success or critical styles\n\n### Visually hidden\n\nVisually hidden text should:\n\n- Not be used if semantic markup can make content understandable to people using assistive technology\n- Be used to provide extra context when semantic markup isn’t enough\n- Be used on any content that is normally present but is being omitted\n- Make sense in context when used with a screen reader\n\n---',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'titles',
      'text',
      'typographic',
      'spacing',
      'display',
      'heading',
      'body',
      'success',
      'critical',
      'warning',
      'subdued',
      'regular',
      'medium',
      'semibold',
      'bold',
      'list',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'text-heading.tsx',
          title: 'Heading',
          description: 'Use to create various levels of hierarchy on the page.',
        },
        {
          fileName: 'text-body.tsx',
          title: 'Body',
          description:
            'Use to create a range of body text. These styles are primarily used within components and blocks of text.',
        },
        {
          fileName: 'text-align.tsx',
          title: 'Align',
          description: 'Use to set text alignment.',
        },
        {
          fileName: 'text-weight.tsx',
          title: 'Weight',
          description: 'Use to give text a range of font weights.',
        },
        {
          fileName: 'text-color.tsx',
          title: 'Color',
          description: 'Use to set text color.',
        },
      ],
      lifeCyclePhase: 'Beta',
      lifeCycleNotice:
        'This component is ready for wider adoption, usage is encouraged for most cases. Breaking changes are possible in minor version updates. To learn more please read about our [component lifecycles](/getting-started/components-lifecycle)',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'text.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Text component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: '0R5XTKDUE-qKeFkIpdNh1',
    title: 'Utilities',
    excerpt: '',
    slug: 'utilities',
    parentId: 'TMuy-j4fhMovb5NxzFw6G',
    order: 11,
    layout: 'listing',
    blocks: [],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'Z_DfkVOSwP79naiK73hqd',
    title: 'App provider',
    excerpt:
      'App provider is a required component that enables sharing global settings throughout the hierarchy of your application.',
    slug: 'app-provider',
    parentId: '0R5XTKDUE-qKeFkIpdNh1',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'MTmfoPSBs_lpng6dCKM5N',
        blockType: 'Markdown',
        content:
          "## Best practices\n\nThe app provider component is required to use Polaris. Without it, the components in your application will not function correctly. You must wrap the root (the top) of your application in the app provider component.\n\n---\n\n## Using translations\n\nTranslations are provided in the locales folder. When using Polaris, you are able to import translations from all languages supported by the core Shopify product and consume them through the `i18n` prop.\n\nIf a project has only one locale, then you can pass the JSON content from the locale file into `AppProvider`.\n\n```jsx\nimport {AppProvider} from '@shopify/polaris';\n// en.json is English. Replace with fr.json for French, etc\nimport translations from '@shopify/polaris/locales/en.json';\n\nfunction App() {\n  return <AppProvider i18n={translations}>{/* App content */}</AppProvider>;\n}\n```\n\nIf a project supports multiple locales, then load them dynamically using [`@shopify/react-i18n`](https://github.com/Shopify/quilt/tree/master/packages/react-i18n#translation). This ensures that you load only the translations you need.\n\n```jsx\nimport {AppProvider} from '@shopify/polaris';\n// en.json is English. Replace with fr.json for French, etc\nimport translations from '@shopify/polaris/locales/en.json';\nimport {useI18n} from '@shopify/react-i18n';\n\nfunction App() {\n  const [i18n] = useI18n({\n    id: 'Polaris',\n    fallback: translations,\n    translations(locale) {\n      return import(\n        /* webpackChunkName: \"Polaris-i18n\", webpackMode: \"lazy-once\" */ `@shopify/polaris/locales/${locale}.json`\n      ).then((dictionary) => dictionary && dictionary.default);\n    },\n  });\n\n  // i18n.translations is an array of translation dictionaries, where the first\n  // dictionary is the desired language, and the second is the fallback.\n  return (\n    <AppProvider i18n={i18n.translations}>{/* App content */}</AppProvider>\n  );\n}\n```\n\n---\n\n## Using linkComponent\n\nBy default Polaris renders `<Link>` elements (and action objects) as `<a>` tags. That works well for simple one-page demos. However for more complex multi-page applications that use a router such as [`react-router`](https://reacttraining.com/react-router/web) you will want links to use the components provided by your router. If you don't then every link will be an `<a>` tag and thus trigger a whole page refresh instead of navigating client-side.\n\nThe `linkComponent` prop allows you to customise how links behave within Polaris by allowing you to inject your router's own Link component. The following example demonstrates using react-router's `Link` component.\n\n```jsx\nimport {BrowserRouter, Link as ReactRouterLink} from 'react-router-dom';\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <AppProvider linkComponent={Link}>\n        {/* App content including your <Route> components */}\n      </AppProvider>\n    </BrowserRouter>\n  );\n}\n\nconst IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\\d+.-]*:|\\/\\/)/;\n\nfunction Link({children, url = '', external, ref, ...rest}) {\n  // react-router only supports links to pages it can handle itself. It does not\n  // support arbirary links, so anything that is not a path-based link should\n  // use a reglar old `a` tag\n  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {\n    rest.target = '_blank';\n    rest.rel = 'noopener noreferrer';\n    return (\n      <a href={url} {...rest}>\n        {children}\n      </a>\n    );\n  }\n\n  return (\n    <ReactRouterLink to={url} {...rest}>\n      {children}\n    </ReactRouterLink>\n  );\n}\n```\n\n---\n\n## Testing components\n\nYou must include Polaris context in your tests when you use Polaris components.\n\nTo make this easier for you, we’ve provided:\n\n- a PolarisTestProvider component to provide the Polaris contexts for you",
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'app',
      'provider',
      'appprovider',
      'internationalization',
      'i18n',
      'localization',
      'context',
      'translate',
      'translation',
      'application wrapper',
      'wrapper',
      'sdk',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'app-provider-default.tsx',
          title: 'Default',
          description:
            'AppProvider works by default without any additional options passed to it.',
        },
        {
          fileName: 'app-provider-with-i18n.tsx',
          title: 'With i18n',
          description:
            'With an `i18n`, `AppProvider` will provide these translations to polaris components. See [using translations](https://polaris.shopify.com/components/app-provider#using-translations)',
        },
        {
          fileName: 'app-provider-with-link-component.tsx',
          title: 'With linkComponent',
          description:
            'With a `linkComponent`, the app provider component will override the links used in other components. For example you may want to use the `Link` component provided by `react-router` throughout your application instead of the default `a` tag.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'app-provider.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the App provider component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: '4x623VK5LJb5SQOJOO1jJ',
    title: 'Collapsible',
    excerpt:
      'The collapsible component is used to put long sections of information under a block that merchants can expand or collapse.',
    slug: 'collapsible',
    parentId: '0R5XTKDUE-qKeFkIpdNh1',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'obL2DZuspSZfhXgvYmde4',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nThe collapsible component should:\n\n- Be used for information that is lower priority or that merchants don’t need to see all the time\n- Not be used to hide error messages or other critical information that requires an immediate action\n\n---\n\n## Content guidelines\n\nCollapsible containers are cards with expandable and collapsible functionality, and should follow the content guidelines for [cards](https://polaris.shopify.com/components/layout-and-structure/alpha-card#content-guidelines).\n\n---\n\n## Related components\n\n- To control a collapsible component, use the [button](https://polaris.shopify.com/components/actions/button) component\n- To put long sections of information in a container that allows for scrolling, [use the scrollable component](https://polaris.shopify.com/components/scrollable)\n\n---\n\n## Accessibility\n\nUse the collapsible component in conjunction with a [button](https://polaris.shopify.com/components/actions/button). Place the collapsible content immediately after the button that controls it, so merchants with vision or attention issues can easily discover what content is being affected.\n\n- Use the required `id` prop of the collapsible component to give the content a unique `id` value\n- Use the `ariaExpanded` prop on the button component to add an `aria-expanded` attribute, which conveys the expanded or collapsed state to screen reader users\n- Use the `ariaControls` prop on the button component, and set its value to the `id` value of the collapsible component',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'hide',
      'show',
      'low priority',
      'less important',
      'disclosure',
      'accordion',
      'accordian',
      'expand content',
      'toggle',
      'toggleable',
      'reveal',
      'show more',
      'show all button',
      'show hide',
      'expanding view',
      'collapse',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'collapsible-default.tsx',
          title: 'Default',
          description:
            'Use for a basic “show more” interaction when you need to display more content.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'collapsible.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Collapsible component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'vAz-5AgG65iUfHdeVXX1P',
    title: 'Frame',
    excerpt:
      'The frame component, while not visible in the user interface itself, provides the structure for an application. It wraps the main elements and houses the primary [navigation](https://polaris.shopify.com/components/navigation), [top bar](https://polaris.shopify.com/components/top-bar), [toast](https://polaris.shopify.com/components/feedback-indicators/toast), and [contextual save bar](https://polaris.shopify.com/components/contextual-save-bar) components.',
    slug: 'frame',
    parentId: '0R5XTKDUE-qKeFkIpdNh1',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'AsUXriJ0csFJ_xnymg0wF',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nFor the best experience when creating an application frame, use the following components:\n\n- [Top bar](https://polaris.shopify.com/components/top-bar)\n- [Navigation](https://polaris.shopify.com/components/navigation)\n- [Contextual save bar](https://polaris.shopify.com/components/contextual-save-bar)\n- [Toast](https://polaris.shopify.com/components/feedback-indicators/toast)\n- [Loading](https://polaris.shopify.com/components/loading)\n\n---\n\n## Related components\n\n- To display the navigation component on small screens, to provide search and a user menu, or to style the [frame](https://polaris.shopify.com/components/frame) component to reflect an application’s brand, use the [top bar](https://polaris.shopify.com/components/top-bar) component.\n- To display the primary navigation within the frame of an application, use the [navigation](https://polaris.shopify.com/components/navigation) component.\n- To tell merchants their options once they have made changes to a form on the page use the [contextual save bar](https://polaris.shopify.com/components/contextual-save-bar) component.\n- To provide quick, at-a-glance feedback on the outcome of an action, use the [toast](https://polaris.shopify.com/components/feedback-indicators/toast) component.\n- To indicate to merchants that a page is loading or an upload is processing use the [loading](https://polaris.shopify.com/components/loading) component.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'navigation',
      'nav',
      'links',
      'primary navigation',
      'main navigation',
      'global',
      'frame',
      'sidebar',
      'side bar',
      'loading',
      'top bar',
      'menu',
      'toast',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'frame-in-an-application.tsx',
          title: 'In an application',
          description:
            'Use to present the frame structure and all of its elements.',
        },
        {
          fileName: 'frame-with-an-offset.tsx',
          title: 'With an offset',
          description:
            'Use to present the frame structure and all of its elements with an offset provided to the theme.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'frame.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Frame component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: '8Ou4QckTldsJik_xNyBzm',
    title: 'Scrollable',
    excerpt:
      'The scrollable component is a container for long form content, such as terms of service, that allows for scrolling so merchants can expose more text as they read.',
    slug: 'scrollable',
    parentId: '0R5XTKDUE-qKeFkIpdNh1',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'MY4A_KvzX0MKnBCHVglXZ',
        blockType: 'Markdown',
        content:
          '## Best practices\n\nScrollable containers should:\n\n- Be used when it’s helpful to provide an extra visual cue to let merchants know that content exists below or above the fold\n- Only be used for length text such as terms of service or other legal disclaimers and never for instructional or action-oriented text\n\n---\n\n## Content guidelines\n\nScrollable containers are cards with scrolling functionality, and should follow the [content guidelines](https://polaris.shopify.com/components/layout-and-structure/alpha-card#content-guidelines) for cards.\n\n---\n\n## Related components\n\n- To put long sections of information under a block that merchants can expand or collapse, [use the collapsible component](https://polaris.shopify.com/components/collapsible)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'long form',
      'text container',
      'terms of service',
      'long form container',
      'scrolling',
      'independently scrollable',
      'modal scrolling',
      'pane scrolling',
      'scrolling in panes',
      'below the fold',
      'above the fold',
    ],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      examples: [
        {
          fileName: 'scrollable-default.tsx',
          title: 'Default',
          description:
            'Use when you need to make a region within the page independently scrollable. It’s often used in modals and other panes where it’s helpful to provide an extra visual cue that content exists below or above the fold.',
        },
        {
          fileName: 'scrollable-to-child-component.tsx',
          title: 'To child component',
          description:
            'Use when you need to programmatically scroll a child component into view in the scrollable container.',
        },
      ],
      lifeCyclePhase: 'Stable',
      lifeCycleNotice: '',
    },
    hasSeparatorInNav: false,
    thumbnailImage: {
      lightModeFilename: 'scrollable.png',
      darkModeFilename: '',
      alt: 'Thumbnail for the Scrollable component',
      width: 1575,
      height: 900,
    },
  },

  {
    id: 'OSvcyqaeKPbV9fowD9Zgi',
    title: 'Patterns',
    excerpt:
      'Design patterns help ensure consistent behavior across the Shopify admin.',
    slug: 'patterns',
    parentId: null,
    order: 5,
    layout: 'listing',
    blocks: [],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: true,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'IuDQUb9eZ2fu4qUvsRnSP',
    title: 'App settings layout',
    excerpt: 'Scan and find groups of settings in apps',
    slug: 'app-settings-layout',
    parentId: 'OSvcyqaeKPbV9fowD9Zgi',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'vuuTl9oKCOkgPBqTcIy20',
        blockType: 'Markdown',
        content:
          '<div as="Variants"></div>\n\n<div as="Stack" gap="4">\n\n## Related resources\n\n* See another two-column layout in use in the [Resource detail layout](/patterns/resource-details-layout) pattern.\n* See a single-column layout in use in the [Resource index layout](/patterns/resource-index-layout) pattern.\n* Learn more about [Layout](https://shopify.dev/apps/design-guidelines/layout) in the app design guidelines.\n* Check out the Polaris [Spacing](/design/space) guidelines to understand Polaris grid and spacing scale.\n\n</div>',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'ZcjzmY1zbIF2h66TKNoMk',
    title: 'Date picking',
    excerpt: 'Select a date or a date range',
    slug: 'date-picking',
    parentId: 'OSvcyqaeKPbV9fowD9Zgi',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'fasuue1fUOop_3ev1i9VT',
        blockType: 'Markdown',
        content:
          '<div as="Variants"></div>\n\n<div as="Stack" gap="4">\n\n## Related resources\n\n* Programming timezones can be finicky. Get great tips in the article [UTC is for everyone right](https://zachholman.com/talk/utc-is-enough-for-everyone-right)?\n* Learn about date formatting in the [Grammar and mechanics](/content/grammar-and-mechanics#date) guidelines.\n* See how to craft effective button labels in the [Actionable language](/content/actionable-language) guidelines.\n\n</div>',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'YO2HUBkhyzP_8IVPaIBUd',
    title: 'Resource details layout',
    excerpt: 'Create, view, and edit resource objects',
    slug: 'resource-details-layout',
    parentId: 'OSvcyqaeKPbV9fowD9Zgi',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: '3ZBtZ5gx87bc1J-nb4-bS',
        blockType: 'Markdown',
        content:
          '<div as="Variants"></div>\n\n<div as="Stack" gap="4">\n\n## Related resources\n\n* The [Resource index layout](/patterns/resource-index-layout) pattern is a complement to the resource detail layout pattern.\n* Learn about the meaning of “resources” on the [Resource list](/components/lists/resource-list) component page\n* Learn more about [Layout](https://shopify.dev/apps/design-guidelines/layout) in the app design guidelines.\n* Check out the Polaris [Spacing](/design/space) guidelines to understand Polaris grid and spacing scale.\n\n</div>',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'mRrSTyfBrejlUELj6YZeH',
    title: 'Resource index layout',
    excerpt: 'Organize and take action on resource objects',
    slug: 'resource-index-layout',
    parentId: 'OSvcyqaeKPbV9fowD9Zgi',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'xOv8AOsMnSri6-SUxi3Is',
        blockType: 'Markdown',
        content:
          '<div as="Variants"></div>\n\n<div as="Stack" gap="4">\n\n## Related resources\n\n- The [Resource detail layout](/patterns/resource-details-layout) pattern is a complement to the resource index layout pattern.\n- Use the [Empty state component](/components/layout-and-structure/empty-state) when the resource index is empty.\n- Learn about the meaning of “resources” on the [Resource list](/components/lists/resource-list) component page\n- Learn more about [Layout](https://shopify.dev/apps/design-guidelines/layout) in the app design guidelines.\n- Check out the Polaris [Spacing](/design/space) guidelines to understand Polaris grid and spacing scale.\n\n</div>',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'AzmHY1ZHqh6iF0nC5TReK',
    title: 'Content',
    excerpt:
      'Thoughtful, consistent interface content is a core element of a well-designed user experience.',
    slug: 'content',
    parentId: null,
    order: 4,
    layout: 'listing',
    blocks: [],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'Dc_Llr0SQ8tK70Huf72Wh',
    title: 'Accessible and inclusive language',
    excerpt:
      'Our mission is to make commerce better for _everyone_. Building products for everyone means creating inclusive content.',
    slug: 'accessible-and-inclusive-language',
    parentId: 'AzmHY1ZHqh6iF0nC5TReK',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'Wx53HYPC-d_iYOrxQXpmD',
        blockType: 'Markdown',
        content:
          'The words we use have power. Writing for everyone, everywhere means that we don’t exclude or harm any of our merchants, even if these words have been normalized.\n\nWrite for more than one perspective, and limit assumptions or biases. For example, don’t assume that your audience is white, has a binary gender, or is nondisabled. Keep in mind that our merchants have intersectional identities, which means they can be from more than one historically-excluded group.\n\nTry to write what you mean without metaphors so your content is easy to understand and localize. If you can’t think of an alternate term, then find another way to write what you want to say.\n\nTest your content with a diverse audience by recruiting merchants from a variety of backgrounds, including historically-excluded groups, and create intersectionality-informed research objectives. Building inclusive experiences starts with involving diverse perspectives early on in the process.\n\n---\n\n## Accessible content\n\nUsing anti-ableist language is just one part of making accessible content at Shopify. Ableist language is content that holds bias towards the nondisabled experience, or discriminates against the disabled community.\n\nAbleism can show up in language directly, as well as in metaphors and euphemisms. For example, “don’t let your marketing efforts fall on deaf ears”. Write what you mean, instead of using analogies, metaphors, or euphemisms.\n\nWrite content that centers around the person, not their disability.\n\n### Words and phrases to avoid\n\nAvoid the following words and phrases.\n\n#### Inspire, inspirational\n\nThis language and narrative around people with disabilities can be othering and reductive. It can also center an abled perception of those with disabilities (For example, “my life’s not that bad, look at them!”).\n\n#### Enable, disable\n\nImplies that disability is a less-desired or negative state.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nAccounts are deactivated.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nAccounts are disabled.\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Turned on, turned off\n- Active, inactive\n- Activate, deactivate\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Enable, enabled\n- Disable, disabled\n\n</div></div>\n\n_Note: Because `disabled` is a valid state for HTML elements, usage of “disabled” is appropriate when talking about specific element states, just not overall feature functionality._\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nThe checkbox is disabled.\n\n</div></div>\n\n#### Normal, abnormal\n\nThis language can imply that there’s something wrong with anyone outside of the majority.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Typical\n- Atypical\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Normal\n- Abnormal\n\n</div></div>\n\n#### Deaf\n\nThis language is often used to equate deafness or hearing impairment with ignorance or insensitivity, rather than refer to deafness itself or the Deaf community. Make sure to only use it when referencing actual deafness or the Deaf community, and not as a metaphor.\n\n#### Blind\n\nAs a metaphor, this can equate lack of vision to ignorance. Only use the term when referencing the disability itself.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Unaware\n- Gap\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Blind\n- Blind spot\n\n</div></div>\n\n#### Insane, crazy\n\nThis language can stigmatize people with mental disabilities by using these words as modifiers for “unbelievable” or in a negative context.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Wild\n- Unbelievable\n- Outrageous\n- Intense\n- Silly\n- Strange\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Insane\n- Crazy\n\n</div></div>\n\n#### Handicap, handicapped\n\nHandicap implies that the person is the issue, rather than the environment.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Disability\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Handicap\n- Handicapped\n\n</div></div>\n\n#### Wheelchair-bound\n\nThis term can reduce a person’s primary identity to using a wheelchair.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Person who uses a wheelchair\n- Person who uses an accessibility device\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Wheelchair-bound\n\n</div></div>\n\n#### Suffers from...\n\nThis phrasing implies that having a disability equates to suffering.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Experiences vision impairment\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Suffers from vision impairment\n\n</div></div>\n\n#### Just, only\n\nWhen we write a task is “only a few steps”, or this should “just take a minute”, it implies the task is easy, quick, or takes a minimal amount of effort. This can discourage people who might struggle with the task, or might take extra time to complete it.\n\n---\n\n## Anti-racist content\n\nRacist language expresses bias towards or against a particular race, or expresses the belief that some races are inferior to others. Always prioritize our merchants, partners, and buyers experience over perceived barriers to using anti-racist language.\n\n**Tips:**\n\n- Treat non-white or non-Western perspectives the same as white and Western perspectives. Non-Western ideals aren’t “exotic” or “strange”.\n- Write what you mean instead of using an analogy or a metaphor. If you need a metaphor, then don’t use one that denotes “black” or “dark” as bad or negative, versus “white” or “light” as good or positive.\n- Use terms in an appropriate context.\n  - For example, while we typically avoid the use of the term “powwow”, in the following context, it’s appropriate: “Bear Witness is a co-founder of A Tribe Called Red, a Canadian DJ collective that blends hip-hop and EDM with traditional powwow drums and vocals” (from [Vanguard: How A Tribe Called Red Brought Activism to the Dance Floor](https://www.shopify.com/blog/vanguard-a-tribe-called-red)).\n\n<br>\n\n### Words and phrases to avoid\n\nAvoid the following words and phrases.\n\n#### Exotic\n\nConsider why you need to frame someone or something this way. What is “foreign” or “exotic” to you is familiar for someone else.\n\n#### Grandfather in, grandfather clause\n\nThese phrases come from laws meant to circumvent or disenfranchise Black people’s rights. These laws, or “grandfather clauses” originated in the Reconstruction era in the American South.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Legacy, legacied\n- Exempt\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Grandfather in, grandfathered in\n- Grandfather clause\n\n</div></div>\n\n#### Powwow\n\nA powwow is a celebration of heritage, art, and community held by Indigenous people, and should only be used to refer to actual powwows. Use other terms to refer to meetings and events that aren’t powwows.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Meet, meeting\n- Gather, get together\n- Assemble, assembly\n- Regroup\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Powwow\n\n</div></div>\n\n#### Spirit animal\n\nIndigenous communities use spirit animals as totems and guides. A spirit animal has deep spiritual and cultural meaning, and should only be used in that context. Don’t say spirit animal to mean the animal a non-Indigenous person might identify with the most.\n\n#### Black hat, white hat (hacking)\n\nThese terms imply that “white is good” and “black is bad”.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Unethical hacking\n- Ethical hacking\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Black hat\n- White hat\n\n</div></div>\n\n#### Blacklist, whitelist\n\nThese terms enforce the “white is good” and “black is bad” paradigm.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Denylist, blocklist\n- Allowlist\n- Permit, permitted\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Blacklist\n- Whitelist\n- Graylist\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nLearn how to secure a compromised account and reset blocked credentials.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nLearn how to secure a compromised account and reset blacklisted credentials.\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nAdd no-reply[at]shopify.com to your email provider’s allowlist.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nAdd no-reply[at]shopify.com to your email provider’s whitelist.\n\n</div></div>\n\n#### Cakewalk\n\nThis term originates from a dance contest where enslaved Black people competed for cake.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nYou can easily file your your taxes with our latest features.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nIt’s a cakewalk to file your taxes with our latest features.\n\n</div></div>\n\n#### Whitespace\n\nThis term refers to communities and places that are predominantly white and that might make non-white people feel restricted or isolated. Avoid using this term except when referring to the named property in CSS.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- New market opportunity/new market space\n- Unmet need/unexplored opportunity\n- Emptyspace\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Whitespace\n\n</div></div>\n\n#### Long time no see\n\nThis phrase was used to stereotype Indigenous peoples as unintelligent, and shouldn’t be used due to its racist origins.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nIt’s been a while\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nLong time no see\n\n</div></div>\n\n#### Low-hanging fruit\n\nThis metaphor refers to the lynching of Black people, and shouldn’t be used.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Prepare to launch your store by adding a new product.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Take care of low-hanging fruit on your task list by adding a new product.\n\n</div></div>\n\n---\n\n## Ungendered content\n\nGendered language is language biased towards a particular sex or gender. Language that relies on stereotypes, or makes broad assumptions about its audiences’ sex or gender identities is likely gendered.\n\nUngendered content doesn’t mean avoiding gendered terms—it means being intentional about how you use gendered terms.\n\n**Tips:**\n\n- When a subject is unknown, use “they”, “you”, or “we”.\n- Be conscious of perpetuating stereotypes, like assuming that a merchant might only have a “men’s collection” or a “women’s collection”.\n- Avoid asking for pronouns or gender unless they’re required (or offered).\n- Don’t associate specific qualities with a specific gender, like linking positions of power with men. For example, judge, doctor, lawyer.\n\nAt Shopify, we believe ungendered language expands and improves the ways we talk—it makes us more accurate, more precise, and more inclusive.\n\n### Internationalization\n\nMany languages lack gender-inclusive options, like the pronoun “they” in English. Try to avoid gendered language whenever possible by writing what you want to say in a different way, even if it’s longer. If gender-neutral language isn’t possible, then choose the expression that’s most understandable.\n\nWhen possible, don’t use gendered pronouns. Use the “you” pronoun instead of the third person “she/he”. Find alternatives to gendered adjectives, like indefinite adjectives, substantives, or objects.\n\n### Words and phrases to avoid\n\nAvoid the following words and phrases.\n\n#### Female or male adapter or female or male connector\n\nThese terms reinforce the idea that gender is binary.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Socket\n- Input\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Female adaptor\n- Female connector\n\n</div></div>\n\n#### Businessman\n\nThis term can exclude people who aren’t men and reinforce the idea that positions of power are only for men. Use a word that’s gender-neutral and inclusive of all people.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Businessperson\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Businessman\n\n</div></div>\n\n#### Manned\n\nThis term excludes people who aren’t men. Use a word that’s gender-neutral and inclusive of all people.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Staffed\n- Managed\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Manned\n\n</div></div>\n\n#### Man-made\n\nThis word can exclude people who aren’t men. Use a word that’s gender-neutral and inclusive of all people.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Artificial\n- Synthetic\n- Manufactured\n- Fabricated\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Man-made\n\n</div></div>\n\n#### Manpower\n\nThis word can also exclude people who aren’t men.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Workforce\n- Labor force\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Manpower\n\n</div></div>\n\n#### Man, woman\n\nThese terms assume a binary gender which might not be the case. Consider how you use these terms and if they’re necessary in that particular context. If you’re listing genders, make sure to include all genders.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Person\n- Individual\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Man\n- Woman\n\n</div></div>\n\n#### He/him/his, she/her/hers\n\nThese terms assume a binary gender which might not be the case. Consider how you use these terms and if they’re necessary in that particular context.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- They/them/theirs\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- He/him/his\n- She/her/hers\n\n</div></div>',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'copy instructions',
      'copy rules',
      'copy guidelines',
      'content instructions',
      'content rules',
      'word list',
      'language',
      'race',
      'racial',
      'racist',
      'racism',
      'a11y',
      'accessible',
      'accessibility',
      'disability',
      'ableist',
      'ableism',
      'gender',
      'gendered',
      'ungendered',
      'gender binary',
      'sex',
      'gender identity',
      'gender-neutral',
      'pronoun',
      'inclusive content',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'pFyT82n2mMFdNTfKREBmB',
    title: 'Actionable language',
    excerpt:
      'Merchants use Shopify to get things done. Content should be written and structured to help them understand and take the most important actions.',
    slug: 'actionable-language',
    parentId: 'AzmHY1ZHqh6iF0nC5TReK',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'FGQVntOyUY3vCTFyMHXKc',
        blockType: 'TabbedContent',
        tabs: [
          {
            id: 'LoPoCHY7wXEiuWXBfic_8',
            label: 'New tab',
            blocks: [],
          },
          {
            id: '-KTbFzaQxJ727dBn9ge33',
            label: 'New tab',
            blocks: [],
          },
          {
            id: 'xZVtG5SuU8mhr5G_RQC3p',
            label: 'New tab',
            blocks: [],
          },
        ],
      },
      {
        id: 'hKBYuM-gzYAISAqHO_CLG',
        blockType: 'TextImage',
        content: '',
        image: {
          lightModeFilename: '',
          darkModeFilename: '',
          height: 0,
          width: 0,
          alt: '',
        },
      },
      {
        id: 'w63Ym5zkJCAU9xz3bl6wp',
        blockType: 'Code',
        snippets: [
          {
            id: 'w0_6R2QeORTDWV7jgstMt',
            label: 'New tabzzz',
            language: 'typescript',
            code: '',
          },
          {
            id: 'SpsR583rZDzr3Q8gQGNyy',
            label: 'New tab',
            code: '',
            language: 'typescript',
          },
          {
            id: '6ejftF41Sjmomp6zypccW',
            label: 'New tab',
            code: '',
            language: 'typescript',
          },
        ],
      },
      {
        id: 'kgvsJzIsnp_dxsvoeKsG6',
        blockType: 'Markdown',
        content:
          '## Headings and subheadings\n\nHeadings and subheadings are titles and subtitles that refer to sections of the interface.\n\n### Basic structure\n\nHeadings and subheadings should be:\n\n**Informative and descriptive:**\n\n- Highlight the most important concept or piece of information for merchants\n- Help merchants understand what they’ll find in the section below\n\n**Concise and scannable:**\n\n- Use simple, clear language\n- Keep headings to a single sentence\n- Avoid using punctuation such as periods, commas, or semicolons\n- Write in sentence case (capitalize the first word and proper nouns only)\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Online store dashboard\n- Custom reports\n- Sell your products in person\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- This is your online store dashboard\n- Custom Reports\n- Sell your products in person!\n\n</div></div>\n\n### Articles\n\nWhether or not to use articles (“the,” “a,” “an”) in headings and subheadings depends on the type of message.\n\n#### Conversational headings\n\nFor more conversational areas of the product, like Home cards, sell pages, and empty states, use articles. It makes the language more approachable and helps people to understand new, complex concepts.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Secure your account with two-step authentication\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Two-step authentication\n\n</div></div>\n\n#### Microcopy headings\n\nFor labels, titles, and microcopy, avoid articles to keep content short and actionable. This increases readability and encourages immediate action.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Create collection\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Create a collection\n\n</div></div>\n\n---\n\n## Sentences\n\nStart sentences with imperative verbs when telling merchants what actions they can take (especially when introducing something new).\n\nWhen a merchant reads a sentence that starts with an imperative verb it should sound like they’re being instructed what to do. Don’t use permissive language like “you can.”\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nAdd your first product and see how it looks in your store.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Products appear in your store after you add them.\n\n- Add your first product so you can see how it looks in your store.\n\n</div></div>\n\n---\n\n## Buttons\n\n<!--- keywords: buttons, button copy, button text, button content, links, actions, calls to action, call to actions, action-led, action led, scannable, articles, choose , select, choose vs select, select vs choose, need, must, need vs must, must vs need -->\n\nButtons need to be clear and predictable. Merchants should be able to anticipate what will happen when they select a button. Never mislead someone by mislabeling a button.\n\nButtons should always lead with a strong verb that encourages action. To provide enough context to merchants, use the {verb} + {noun} content formula on buttons except in the case of common actions like “Done,” “Close,” “Cancel,” or “OK.”\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Activate Apple Pay\n- Explore free themes\n- View shipping settings\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Try Apple Pay\n- Free themes\n- Settings\n\n</div></div>\n\nAlways write button text in sentence case, which means the first word is capitalized and the rest are lowercase (unless a term is a proper noun).\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Buy new domain\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Buy New Domain\n\n</div></div>\n\nAvoid unnecessary words and articles such as “the,” “an,” or “a.”\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nAdd menu item\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nAdd a menu item\n\n</div></div>\n\n---\n\n## Links\n\nLinks need to be clear and predictable. Merchants should be able to anticipate what will happen when they select a link. Never mislead someone by mislabeling a link.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Get started with the\n  [Ultimate Guide to Dropshipping](https://www.shopify.com/guides/dropshipping).\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Want to learn more about dropshipping?\n  [Click here](https://www.youtube.com/watch?v=dQw4w9WgXcQ).\n\n</div></div>\n\nLinks should never use “click here” or “here” as link text.\n\n### Links in a sentence\n\nLinks in full sentences shouldn’t link the entire sentence, only the text that describes where merchants go when they select the link.\n\nIt’s better for [internationalization](/foundations/internationalization) to have only single terms or small parts of phrases linked. Linking a full phrase is problematic because the word order might change, which would break the link into two parts.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Learn more about [Fraud Protect](https://www.shopify.com/fraud-protect).\n- Manage the [channels](/) you use to sell products and services.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- [Learn more about Fraud Protect](https://www.youtube.com/watch?v=dQw4w9WgXcQ).\n- [Manage the channels](/) you use to sell products and services.\n\n</div></div>\n\n### Links outside of a sentence\n\nLinks that aren’t in full sentences should use the {verb + noun} pattern and not be punctuated, with the exception of question marks.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- [Learn more](/)\n- [Forgot password?](/)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- [Learn more.](https://www.youtube.com/watch?v=dQw4w9WgXcQ)\n- [Forgot password](/)\n\n</div></div>\n\n---\n\n## Confirmations\n\nConfirmations are presented for actions that can’t be undone or are difficult to undo.\n\nConfirmation messages should:\n\n- Always give merchants the option to either confirm or cancel their action\n- Be used for a single, primary task\n- Keep body content to one line of text and not use more than two calls to action\n\nConfirmation titles should:\n\n- Ask if merchants want to continue, using a concise {verb}+{noun} question\n- Be one sentence and avoid using punctuation, with the exception of question marks\n- Avoid articles (the, a, an) to keep content short and actionable\n- Be written in sentence case (the first word is capitalized, and the rest is lowercase)\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Discard unsaved changes?\n- Delete 2 collections?\n- Delete Dark Blue Tee?\n- Leave page with unsaved changes?\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Discard?\n- Are you sure you want to delete?\n- Are you sure you want to delete Dark Blue Tee?\n- This page has unsaved changes are you sure you want to leave?\n\n</div></div>\n\nConfirmation body content should:\n\n- Clearly explain if the action is irreversible or difficult to undo, using [plain language](https://polaris.shopify.com/content/product-content#write-for-a-grade-7-reading-level).\n- Be concise: use only one line of text. Don’t start the sentence with “Are you sure?”\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- This can’t be undone.\n- This will delete all edits since you last saved.\n- Leaving this page will delete all unsaved changes.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Are you sure you want to delete the variant Dark Blue Tee/Small/Silk? This action cannot be reversed.\n- If you discard changes, you’ll delete any edits you made since you last saved.\n- If you leave this page, all unsaved changes will be lost. Are you sure you want to leave this page?\n\n</div></div>\n\nConfirmation primary and secondary actions should:\n\n- Be clear and predictable: merchants should be able to anticipate what will happen when they click a button\n- Scannable: avoid unnecessary words and articles such as “the,” “an,” or “a”\n\nSince confirmation messages are placed in modals, the call to action in the title is in close context to the buttons. Because of this, the call to action text on the buttons doesn’t have to follow the {verb}+{noun} pattern. Instead, one word calls to action can be used, for example, [Cancel] \\[Delete].\n\n**Deletions**\n\nBefore merchants can delete objects like collections, transfers, products, and variants, we present them with a confirmation message that has two calls to action, one to [Cancel] and one to [Delete]. We keep it short and don’t use {verb}+{noun} button copy.\n\nPrimary action:\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Delete\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Remove\n- Erase\n- Discard\n\n</div></div>\n\nSecondary action:\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Cancel\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Discard\n\n</div></div>\n\n**Discarding changes while on a page**\n\nPrimary action:\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Discard\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Cancel\n\n</div></div>\n\nSecondary action:\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Keep editing\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Go back\n- Cancel\n\n</div></div>\n\n**Leaving a page with unsaved changes**\n\nPrimary action:\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Leave page\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Exit\n- Delete changes\n\n</div></div>\n\nSecondary action:\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Stay\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Go back\n- Cancel\n- Discard\n- Keep editing\n\n</div></div>\n\n---\n\n## Directional language\n\nIn the same way that links should never say “click here,” avoid using directional language such as “above/below” or “right/left.”\n\nDirectional language is confusing and unhelpful when spoken aloud by a screen reader. It creates challenges for internationalization (for example, right to left languages) and can conflict with mobile design patterns.\n\nDirectional language often indicates a lack of visual or content hierarchy. Whenever possible, keep instructional copy and related actions close together so that directional language isn’t needed.\n\n---\n\n## Save vs. done\n\nUse “Save” when a change is saved immediately to a database and “Done” for [deferred saves](#deferred-saves).\n\n### Saving immediately to a database\n\nUse “Save” as the default for any action that saves immediately to a database.\n\n#### Saving using the context bar component\n\nWhen merchants make changes on a page they’re sometimes presented with a context bar at the top. This context bar displays a status message on the left to indicate the state of the changes, like “Unsaved discount.” Since the status message provides context around the action being taken, the button doesn’t need to follow the common {verb} + {noun} content formula. For example, [Save] instead of [Save product]. In the context bar component, use the verb “Save”.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nUse the verb “Save” in the context bar\n\n![web context bar](/images/web-context-bar@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Done\n- Apply\n- Save discount\n\n</div></div>\n\nStatus messages in the context bar should be descriptive and follow the {adjective} + {noun} content formula.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Unsaved discount\n- Unsaved product\n- Unsaved customer\n- Unsaved shipping zone\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Unsaved changes\n\n</div></div>\n\n#### Saving in modals and sheets\n\nUse the verb “Save” in modals and sheets when saving directly to the database.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nUse the verb “Save” in modals and sheets\n\n![web save modal in edit state](/images/web-edit-save@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Edit\n- Done\n- Apply\n\n</div></div>\n\n#### Saving at the bottom of a page\n\nUse the {Save} + {noun} content formula when a save action doesn’t have the surrounding context of a modal or context bar. This applies to the save action at the bottom of pages.\n\nFor example, the action at the bottom of the Create discount page uses [Save discount]:\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n![web save page action](/images/web-page-actions@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Create discount\n- Save\n- Done\n- Apply\n\n</div></div>\n\n### Deferred saves\n\nSometimes, when merchants confirm a set of changes inside a modal or sheet, these changes are applied as unsaved changes to the current page. In other words, the changes made weren’t immediately saved to the database. When this happens, don’t use the verb “Save” as the call to action because it would be misleading.\n\nUse the adjective “Done” for deferred saves. When the modal or sheet closes, then merchants can save all of the changes they made.\n\nMost deferred saves happen when confirming changes in Add, Edit, Manage, and Select modals and sheets.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n![deferred save modal with done button](/images/add-done@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Add\n- Edit\n- Manage\n- Select\n- Apply\n- Save\n\n</div></div>\n\n### Datepickers\n\nUse the adjective “Done” for datepickers.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n![datepicker with done button](/images/datepicker@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Apply\n- Select\n- Save\n\n</div></div>\n\n---\n\n## Close vs. accept\n\nUse the verb “Close” when merchants need to confirm they’ve read something, but aren’t required to legally accept terms of service before continuing. For example, use “Close” when presenting a security notification in a modal or sheet.\n\nDon\'t use "OK". "OK" is an exclamation, not an action. When merchants click the "Close" button, they’re not saying “OK”, they’re doing a specific action.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n![modal with Close button](/images/modal-with-close@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- OK\n- Ok\n- O.k.\n- Okay\n- Done\n- Accept\n- Continue\n\n</div></div>\n\nUse the verb “Accept” when terms of service require legal confirmation before merchants can continue.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nAccept\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Ok\n- Done\n- Close\n- Continue\n\n</div></div>\n\n---\n\n## Close vs. cancel\n\nUse the back arrow button as the call to action for modals and screens when:\n\n- the content is in a view-only state\n\nDon’t use “Close” as the call to action when there’s the option for merchants to:\n\n- make any changes to the modal or screen\n- confirm they’ve read something or accept terms of service (see [OK vs. accept](#OK-accept))\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n![web modal with close button](/images/web-close@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Cancel\n- Exit\n- OK\n\n</div></div>\n\nUse “Cancel” as the option for merchants to back out of any changes made on a page, modal, or sheet. When the cancel button is pressed, changes automatically get discarded. “Cancel” is often paired with “Save” and “Done” actions (and is always placed to the left).\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nUse the verb “Cancel” as the action for merchants to back out of changes\n\n![web save modal in edit state](/images/web-edit-save@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Exit\n- Close\n- Done\n\n</div></div>\n\n---\n\n## Select vs. choose\n\nUse the verb “select”:\n\n- When telling merchants to pick something from a limited number of options of the same kind\n- When merchants need to make an easy or obvious decision that doesn’t require deep reflection or analysis\n- For defined lists and dropdown menus\n- When merchants are given the option to pick from a list of already existing objects, like products\n\nPair Select modals and screens with the “Done” call to action.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Select your country of residence\n- Select image\n- Select countries\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Select a pricing plan.\n- Choose countries\n\n</div></div>\n\nUse the verb “choose” when:\n\n- Encouraging merchants to make a decision that is more subjective, strategic, emotional, or open-ended\n- Merchants have to pick from a large inventory of items, like themes, or options that require strategic decision making, like pricing plans\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Choose a theme\n- Choose a pricing plan.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Select a theme\n- Select a pricing plan\n- Choose a province.\n- Pick a province.\n- Pick a pricing plan.\n\n</div></div>\n\n---\n\n## Edit vs. manage\n\nUse the verb “edit” when you can change the input of a field (letters, numbers, properties). Place as link text next to the field or area that is being edited. There’s no need for a noun unless it’s unclear what’s being edited.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- In this example, “Edit” is the correct call to action because it opens a modal where merchants update customer contact information ![modal where merchants can edit contact information](/images/edit-do@2x.png)\n  Here are the editing actions that become available after the “Edit” button is selected ![modal where merchants can edit customer information](/images/edit-do2@2x.png)\n- Edit an individual blog post\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Use “Edit” if multiple actions can be taken after. “Manage” is more suitable.\n- Modify\n\n</div></div>\n\nUse the verb “manage” at a higher level to convey that multiple actions can be done, or sections and settings can be updated. Pair this verb with a noun if it’s in a button or if it’s unclear what is being managed.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- In this example, “Manage” is the correct call to action because it opens a modal where merchants can select channels to display their products ![manage button on the product page in the product availability section](/images/manage-do@2x.png)\n  Here are the options that become available after the “Manage” button is selected ![modal where merchants can select sales channels](/images/manage-do2@2x.png)\n- Manage multiple blog posts and comments\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Edit\n- Modify\n\n</div></div>\n\n---\n\n## Change vs. switch\n\nUse the verb “change” when merchants can replace an option, but not edit it. For example, they can change an image or theme, but the action doesn’t include editing its properties. Place as link text next to the field or area that is being changed. There’s no need for a noun unless it’s unclear what is being changed.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Change image ![change button at the bottom of the image display on the slideshow page of the theme editor](/images/change-do@2x.png)\n  Here are the options that become available after the “Change” button is selected ![images library with an upload drop zone](/images/change-do2@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Use the verb “change” if a selection must be made between only two options\n\n</div></div>\n\nUse the verb “switch” when it’s important for merchants to know what they’re switching between, like users, accounts, locations, or modes. When the switch happens, the previous option is turned off, logged out, or deactivated. Always pair with a noun to prevent confusion.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- ![Title that says, switch from your third party provider to shopify payments, with a card below that says, payment processing rate of 2.4% plus 0.25 euros”](/images/switch-do@2x.png)\n- ![Modal that says, switch locations to ‘new space’? You will only be able to sell inventory set to this location. Tax rates may also change. At the bottom there are two buttons. One says, cancel and one says, switch.](/images/switch-do2@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Switch images\n\n</div></div>\n\n---\n\n## Create vs. add\n\nUse the verb “create” when you’re encouraging merchants to generate something from scratch, like a collection.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Create order\n- Create collection\n- Create discount\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Add order\n- Add collection\n- Add discount\n\n</div></div>\n\nUse the verb “add” when you’re encouraging merchants to bring something that already exists into Shopify, like a product.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Add product\n- Add customer\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Create product\n- Create customer\n\n</div></div>\n\n---\n\n## View vs. see\n\nUse the verb “view” when you’re encouraging merchants to go to a specific page or section for more details, or to reveal more information. Use “view” in buttons, calls to action, and link text.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- View invoices\n- View all {x}\n- View details\n- View report\n- Try clearing your filters to view all results.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- See invoices\n- See all {x}\n- See details\n- See report\n\n</div></div>\n\nUse the verb “see” in more general, conversational descriptions without a specific call to action.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Add your first product and see how it looks on your store.\n- Customers will see this name at checkout.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Add your first product and view how it looks on your store.\n- Customers will view this name at checkout.\n\n</div></div>\n\n---\n\n## Need vs. must\n\nUse the verb “need” when you’re telling merchants something they’re required to do or should do.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nTo buy a shipping label, you need to enter the total weight of your shipment, including packaging.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nTo buy a shipping label, you must enter the total weight of your shipment, including packaging.\n\n</div></div>\n\n---\n\n## Export vs. download\n\nUse “export” as the call to action when merchants needs to transfer data from Shopify and convert it into a different format.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Export CSV file\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Download CSV file\n\n</div></div>\n\nUse “download” as the call to action when merchants need to copy data (of the same format) from Shopify to a computer system.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Download shipping label\n- Download PDF\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Export shipping label\n- Export PDF\n\n</div></div>\n\n---\n\n## Import vs. upload\n\nUse “import” as the call to action when merchants need to transfer data and convert it into a different format so it can be used in Shopify.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Import CSV file\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Download CSV file\n\n</div></div>\n\nUse “upload” as the call to action when merchants need to copy data of the same format from a computer system into Shopify.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Upload image\n- Upload file\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Upload CSV file\n\n</div></div>',
      },
      {
        id: 'JwoV-lvxtD7gZvjSGOLcW',
        blockType: 'Code',
        snippets: [
          {
            id: 'w1yCs1rcXbQTn7VlptAXy',
            label: 'New tab',
            language: 'typescript',
            code: '',
          },
        ],
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'button content',
      'button copy',
      'button terminology',
      'writing for buttons',
      'link content',
      'link copy',
      'link terminology',
      'writing for links',
      'action words',
      'calls to action',
      'calls-to-action',
      'CTA',
      'verbs',
      'copy instructions',
      'copy rules',
      'copy guidelines',
      'content instructions',
      'content rules',
      'save',
      'done',
      'ok',
      'okay',
      'o.k.',
      'accept',
      'close',
      'select',
      'choose',
      'edit',
      'manage',
      'change',
      'switch',
      'create',
      'add',
      'view',
      'see',
      'need',
      'must',
      'export',
      'download',
      'import',
      'upload',
      'confirmation modals',
      'disruptive',
      'delete',
      'deletions',
      'cancel',
      'leave page',
      'stay',
      'discard',
      'dangerous actions',
      'risky actions',
      'irreversible actions',
      'confirmation alerts',
      'warnings',
      'confirmation messaging',
      'headings',
      'subheadings',
      'titles',
      'directional language',
      'directionality',
      'above',
      'below',
      'right',
      'left',
      'up',
      'down',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'FE9xNwvA-DR2aHSaYOca8',
    title: 'Alternative text',
    excerpt:
      'Alternative text (alt text) helps provide an inclusive experience for merchants who use screen readers.',
    slug: 'alternative-text',
    parentId: 'AzmHY1ZHqh6iF0nC5TReK',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: '76fPWELsnnUquzgrwvcoo',
        blockType: 'Markdown',
        content:
          'Alt text is a text replacement for an image. Generally, it is represented by the alt HTML element attribute `alt="alt text"`.\n\nOften used by people who are blind or have low vision, screen readers announce alt text to explain images. Alt text will also display when images fail to download (for example, there’s an unstable or low-bandwidth network connection).\n\nAlt text should:\n\n- Help visitors navigate the site\n- Provide an inclusive experience\n- Be as short and specific as possible\n- Be contextual to the intended message\n\n---\n\n## Alt text for images\n\nUse alt text when the image conveys valuable information, such as the ability to play a demo video. Even if an image isn’t conveying meaningful information, don’t leave an `<img>` tag without an alt text element. The screen reader may try to read the filename and create a negative experience. Instead, let the screen reader know to ignore the image by setting the alt to an empty string.\n\nAll `<img>` tags need an alt text attribute, even if it’s empty. For example, set an empty alt text attribute using `<img alt="" />`.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n```jsx\n<VideoThumbnail accessibilityLabel="Watch how-to video on Shopify reports." />\n\n<Thumbnail alt="Black choker necklace" />\n\n<Icon accessibilityLabel="" />\n```\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n```jsx\n<VideoThumbnail accessibilityLabel="Screenshot 2022-11-07 at 3.05.55 PM" />\n\n<Thumbnail alt="Sneaker.png" />\n\n<Icon accessibilityLabel="IMG_1206.heic" />\n```\n\n</div></div>\n\n---\n\n## Writing alt text\n\nAlways write alt text in plain text. The average rate of listening to a screen reader is 3x slower than that of an average visual reader. Many screen reader users listen at fast speeds to make up time. When writing alt text, be as brief as possible.\n\n- Be concise. Think about how to write for a small amount of space or a character limit.\n- Use simple words. If you’re stuck on how to replace a complicated word, check this [A-Z list of alternative words](https://www.plainenglish.co.uk/the-a-z-of-alternative-words.html) or these [plain language tips](/content/product-content#write-for-a-7-grade-reading-level). Another good resource is the [Hemingway editor](https://hemingwayapp.com/).\n- Avoid needless words. If a phrase is still understandable without a specific word, remove it.\n- Remove articles like "a, an, one of," etc. whenever possible. Alt text has different grammatical rules. "Filler words" that assist understanding in speech can get in the way in alt text.\n- Avoid using "image of" or "photograph" unless the type of image is relevant to the context. Screenreaders already announce images with use of the `<img>` attribute.\n- Avoid punctuation like `!!` and emoji like 🥰. Screen readers will announce these as "exclamation point, exclamation point" and "smiling face with three hearts."\n- Only use acronyms you are confident your audience will understand. If using an acronym, write it with spaces in-between, like "Y M C A." Otherwise, most screen readers will try to read the acronym as a word.\n- Write in the [active voice](/content/grammar-and-mechanics#basics) when possible.\n\n---\n\n## Alt text in context\n\nIt can be tricky to decide whether an image needs alt text or should be ignored by screen readers. Ask yourself:\n\n- Is it interactive?\n- Does this image convey information that isn’t given elsewhere?\n- Does the context of the image communicate anything?\n\nThe same image may have different alt text depending on what it conveys.\n\nFor example, if you’re using a photo of sneakers purely decoratively as the hero image for a blog, tell screen readers to skip it.\n\nIf you’re using the photo as an example of a certain type of sneaker mentioned in the blog, then convey relevant information about the image. For example, "High-top sneaker with gum soles."\n\nBut if you’re using this image in a product listing, ensure shoppers know the important details of what they are buying, such as "Converse Chuck Taylor All Star Classic Black."\n\n### Situations that need alt text\n\n#### Icons\n\n[Icons](/components/images-and-icons/icon) that could be misinterpreted need an explanation, so use the Polaris `accessibilityLabel` prop or the `aria-label` HTML attribute. For interactive icons, don’t describe the image ("magnifying glass"). Instead, describe the action ("search").\n\n```jsx\n<Button accessibilityLabel="search" onClick={() => search()}>\n  <Icon source={SearchMajor} accessibilityLabel="" />\n</Button>\n```\n\n#### Actions\n\nWrite [clear and predictable](https://polaris.shopify.com/content/actionable-language#links) link text. If space constraints require you to write calls to action that are unclear where they take you (like "Learn more" and "Apply now"), give further indication of where merchants will be sent after they select.\n\n```jsx\n<Link\n  url="https://www.shopify.com/protect"\n  accessibilityLabel="Learn more about Fraud Protect"\n>\n  Learn more\n</Link>\n```\n\n#### Complex images\n\nImages with more complexity need some consideration. For example, groups of image elements can be described by a single text, rather than announcing each individual element.\n\n```jsx\n<div role="img" aria-labelledby="star_id">\n  <LegacyStack>\n    <Icon source={StarFilledMinor} alt="">\n    <Icon source={StarFilledMinor} alt="">\n    <Icon source={StarFilledMinor} alt="">\n    <Icon source={StarOutlineMinor} alt="">\n    <Icon source={StarOutlineMinor} alt="">\n  </LegacyStack>\n</div>\n<div id="star_id">3 of 5 stars</div>\n```\n\nFor more guidance, visit the W3C page on [complex images](https://www.w3.org/WAI/tutorials/images/complex/).\n\n### Situations that don’t need alt text\n\nWebsites can sometimes be noisy for a screen reader user. While alt text is vital for an equal experience, the briefer you are, the happier your screen reader users will be. Avoid repetition and unnecessary announcements by setting `alt=""` in the scenarios that don’t need it.\n\n#### Progress bars\n\nProgress bars often present visual information that can also be found in the text, such as "Loading 53%." Continuously announcing that change is generally considered annoying.\n\n#### Decorative elements\n\nThis is a broad category covering elements that are purely for aesthetic reasons, such as empty state illustrations, dividers, or hero images. If you’re unsure whether valuable information is lost, consider testing with people who regularly use a screen reader.\n\n#### Images with adequate captions\n\nAvoid adding repetitive alt text if an image has a caption that accurately reflects the information in the image, for example a photo of George Washington that is captioned "George Washington." If the image is presenting information that isn’t in the caption, consider adding it to the caption text. Only if this isn’t possible or appropriate should you add that information as alt text.\n\nIf the image has a longer description in the caption or following paragraph text, you can associate this description with the `aria-describedby` attribute.\n\n#### Tracking images\n\nImages that would not be visible to a sighted user should not be announced to screen-readers.\n\n---\n\n## Pronunciation and translation\n\nNot only do we strive to make interactions with our products pleasant, but we want the listening experience for merchants to be positive, too. Always state the language of the page content with the HTML lang attribute. This will ensure pronunciation and translation tools will know what rules to use. If certain phrases are in a different language than the main content, you can also use the lang attribute in a `<p>` tag or similar.\n\nHere’s a\n[standard list of language attributes](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) that you can use in your document.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n```html\n<html lang="en"></html>\n<html lang="de"></html>\n<html lang="pt-BR"></html>\n```\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n```html\n<html></html>\n```\n\n</div></div>\n\n---\n\n## SEO\n\nBesides screen readers, search engines also read alt text. Alt text helps increase image ranking results and site searchability outside of Shopify’s admin.\n\nWhen accounting for SEO in your alt text:\n\n- Use logical keywords (the words that people search for).\n- Include relevant listing details, like if it is a limited edition or unique colorway.\n- Describe the image, not what you want your audience to think.\n- Don’t repeat your site name or brand name. Search engines will already associate your site with your images.\n- Avoid reducing the relevance or clarity of the alt text just to insert a keyword.\n- Never include unassociated lists of key words in the alt text. Instead, place those in your [meta description](https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords#edit-the-title-and-meta-description-for-a-page).\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n```jsx\n<Thumbnail alt="1460 Boot Limited Edition Oxblood Women\'s" />\n```\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n```jsx\n<Thumbnail alt="shoes sneakers womens footwear girls sizes soles heels boots" />\n\n<Thumbnail alt="Cool shoes for a night out or hot date" />\n```\n\n</div></div>\n\n## Resources\n\nFor more information on coding and alt text standards, visit the\n[Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/intro/wcag.php) or [WebAIM Alternative Text Guidelines](https://webaim.org/techniques/alttext/).\n\n## Related components\n\nThe following Polaris components include props to set alt text or aria labels, along with specific guidance for their use:\n\n- [Avatar](https://polaris.shopify.com/components/images-and-icons/avatar)\n- [Button](/components/actions/button)\n- [Icon](/components/images-and-icons/icon)\n- [Link](https://polaris.shopify.com/components/navigation/link)\n- [Thumbnail](https://polaris.shopify.com/components/images-and-icons/thumbnail)\n- [Video Thumbnail](https://polaris.shopify.com/components/images-and-icons/video-thumbnail)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'speech synthesis',
      'alt HTML element attribute',
      'alt text attribute',
      'screen reader',
      'a11y',
      'universal design',
      'inclusivity',
      'disability',
      'disabilities',
      'people with disabilities',
      'persons with disabilities',
      'accessible markup',
      'accessible mark up',
      'accessible code',
      'diversity',
      'diverse',
      'vision trouble',
      'visual impairments',
      'color blind',
      'hearing trouble',
      'physical disabilities',
      'physical functioning difficulty',
      'cognitive disabilities',
      'limited vision',
      'loss of vision',
      'low vision',
      'inclusive experiences',
      'alternative text',
      'alt text',
      'accessibility feedback',
      'accessible components',
      'blind',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'axPk968Xj8vK71DjxGMkx',
    title: 'Error messages',
    excerpt:
      'Error messages can be scary. Make errors visible to merchants, easy to understand, and helpful.',
    slug: 'error-messages',
    parentId: 'AzmHY1ZHqh6iF0nC5TReK',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'j_jM4mVvRKwZwGlXHD9gi',
        blockType: 'Markdown',
        content:
          'Error messages should:\n\n- Tell merchants what happened. If there’s a solution, explain it. If possible, offer a one-click fix with a button. If there’s\n  [no solution](#errors-without-solutions), give troubleshooting instructions.\n- Be placed close to the source of the problem.\n- Communicate severity using the appropriate [color](#colors) and\n  [tone of voice](#voice-and-tone).\n- Use\n  [plain language](/content/product-content#respond-to-merchant-needs).\n- Be specific. For example, use precise\n  [numbers and dates](/content/grammar-and-mechanics#dates--numbers--and-measurements).\n- Be brief.\n\nGood design can reduce the need for error messages by preventing them in the first place.\n\n---\n\n## Error message types\n\nThink about the scope of the error when selecting a message type. Is something wrong with the entire application, with the entire current screen, or with a specific element on the screen?\n\nIf the cause of the error is visible and the error just happened, show the error message immediately and as close to the source of the problem as possible.\n\n### [Text field validation error](#form-validation)\n\nUse when:\n\n- An error applies to a text field and feedback can be provided while merchants are typing\n\n![Text field validation](/images/text-field-validation-error@2x.png)\n\n### [Settings warning](#settings-warning)\n\nUse when:\n\n- The form input is valid, but you want to warn merchants of a consequence they might not expect\n\n![Settings warning error](/images/settings-warning@2x.png)\n\n### [Page-level banner: critical or warning](#page-level-banners)\n\nUse when:\n\n- An error applies to the entire page\n- The error is far down the page and it’s critical merchants see the message\n- Multiple validation errors on the page need to be summarized\n- The error was delayed and it’s okay to inform merchants of the problem when they return to the page\n\n![Yellow page level banner](/images/page-level-warning-banner@2x.png)\n\n![Red page level banner](/images/page-level-critical-banner@2x.png)\n\n### [Banner in a card or modal: critical or warning](#banners-in-cards-modals)\n\nUse when:\n\n- An error applies to a single card within the page, a single section within a card, or a modal\n- You need to direct merchants to a page with multiple sections and you want to visually call out the section with the error\n\n![Yellow section level banner](/images/section-level-warning@2x.png)\n![Yellow field level banner](/images/field-level-warning-02@2x.png)\n\n### [Exception list: critical or warning](#exception-list-errors)\n\nUse when:\n\n- A message placed within or next to a component can help merchants make better decisions about routine tasks\n\n![Warning exception list error](/images/exception-list-warning@2x.png)\n\n![Critical exception list error](/images/high-risk-fraud@2x.png)\n\n### [Home notification: critical or warning](#home-notifications)\n\nNote: Home notifications should rarely be used for errors. Always attempt to display an error close to the source of the problem.\n\nUse when:\n\n- A high-priority task must be completed immediately to continue using Shopify or avoid losing money\n- A feature doesn’t have a dedicated details page\n\n![Yellow home notification](/images/home-notification-warning@2x.png)\n\n![Red home notification](/images/home-notification-critical@2x.png)\n\n### [Admin unavailable](#admin-unavailable-errors)\n\nUse when:\n\n- A server error is preventing an entire page from being displayed, like with 400 or 500-series server errors\n- Account permissions are preventing someone from accessing Shopify\n\n![Admin page not found error](/images/page-not-found@2x.png)\n\n![Admin page load error](/images/admin-error@2x.png)\n\n---\n\n## Error colors\n\nRed is the scariest error color. Only use red for critical messages that merchants need to deal with immediately to avoid harm to their business. For example, if merchants don’t act on the message right away, they might lose money or their store might be suspended.\n\nYellow error messages still demand attention, but are more appropriate for messages that are part of a daily workflow.\n\n### Red (critical)\n\nUse critical messages to:\n\n- Bring attention to urgent tasks. If not dealt with immediately, merchants\' businesses will be noticeably impacted, like an account being suspended or money being lost.\n\nExamples of critical message types:\n\n- Update a payment method expiry date\n- Unsuspend an account\n- Review an order for fraud\n- Fix a problem that’s preventing payment from being processed\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n![Red banner with high fraud risk message](/images/red-banner@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n![Yellow banner with high fraud risk message](/images/yellow-banner@2x.png)\n\n</div></div>\n\nThe one exception to using red is in form validation errors because this is a standard convention merchants are used to seeing outside of Shopify.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n![Form validation with red banner](/images/validation-banner-red@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n![Form validation with yellow banner](/images/validation-banner-yellow@2x.png)\n\n</div></div>\n\n### Yellow (warning)\n\nUse warning messages to:\n\n- Help merchants fix issues so they can complete a common workflow or continue to the next step\n- Notify merchants about upcoming expirations or pending requests that, if not dealt with soon, could lead to problems in the future\n\nExamples of warning message types:\n\n- Fix a problem before proceeding to the next step.\n- Fix a problem at some point in a common workflow.\n- There’s a pending request.\n- There’s an upcoming expiration.\n- Changing a setting might have unintended consequences. See\n  [settings warning](#settings-warning).\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n![Yellow banner with warning message](/images/yellow-do@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n![Red banner with warning message](/images/yellow-dont@2x.png)\n\n</div></div>\n\n---\n\n## Anti-patterns\n\n### Avoid using toast for error messages\n\nAlthough error toast is still available, we discourage its use. Toast messages are too short to adequately explain what went wrong and how to fix the problem. Because the toast component appears at the bottom of the screen and disappears after 3 seconds, it can easily be missed. Reserve toast for errors not caused by merchants, like a connection issue. Always try to use a banner to inform merchants about persistent errors.\n\n<div class="dodont"><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n![Toast error message](/images/dont-toast-error@2x.png)\n\n### Don’t use modals for errors\n\nModal dialogs are a good way to ask merchants to confirm a destructive action, but not to tell them an error has occurred.\nModals block merchants until a decision is made, which is likely to make merchants feel pressured. Most errors don’t need to block access to the rest of the feature.\n\n<!-- dodont -->\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n![Modal error message](/images/dont-modals-for-errors@2x.png)\n\n### Avoid using [home notifications](#home-notifications) for errors\n\nHome notification errors are for high-priority tasks that merchants must complete immediately to continue using Shopify or prevent\na negative impact to their business, like losing money.\nOne exception is errors for features that don‘t have a dedicated details page.\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n![Home notification error message](/images/dont-home-notification@2x.png)\n\n</div></div>\n\n---\n\n## Form validation\n\n### Text field validation\n\nUse when:\n\n- A text field has formatting requirements. Use this pattern to enhance\n  [validation on form submission](#validate-on-submit).\n\nDon’t use when:\n\n- It takes\n  [more than a full second](https://developers.google.com/web/fundamentals/performance/rail#ux) to validate input and display a message. If there’s a lag before a validation message appears, merchants might shift their attention and miss the error.\n  Either find a way to improve the validation speed, or rely on the\n  [validation after form submission](#validate-on-submit).\n- The field is empty. Merchants might tab through a form before filling it out, and errors on empty fields can cause confusion and frustration.\n\n### Component\n\n- [Text field](/components/selection-and-input/text-field)\n\n### Content\n\n- Use two or three words to explain what’s wrong or what’s needed to fix the problem.\n- Avoid using the word "invalid" to define an error. When appropriate, use "not valid" instead.\n- Since the message is directly below the text field, the copy only needs to explain why the error happened. Optionally, the message can clarify what to do next or offer a one-click fix.\n\n![Text field validation error](/images/text-field-validation-error-no-cursor@2x.png)\n\n**Usage**\n\nDo an initial validation check as soon as merchants finish typing in the field.\n\nMerchants can be considered to be finished typing only when keyboard focus moves away from the field and there is at least one character in the field. This helps avoid marking the field as not valid before merchants are really done typing.\n\n![Initial validation check with purple border](/images/text-field-validation-purple-incorrect-input@2x.png)\n\nIf the validation check fails, show an error message below the field.\n\n![Text field turns red](/images/text-field-validation-error-no-cursor@2x.png)\n\nOnce a field has an error, complete validation checks after each keystroke.\n\n![Text field validation with cursor by incorrect semi colon](/images/text-field-validation-cursor@2x.png)\n\nRemove the error message as soon as the input becomes valid so merchants can immediately tell they fixed the issue.\n\n![Text field validation with purple border](/images/text-field-validation-purple-border-cursor@2x.png)\n\nIf the validation process is less than a second but not instant, show a spinner on the field to indicate validation progress.\n\n![Text field validation in loading state with spinner](/images/text-field-validation-loading@2x.png)\n\n---\n\n## Validate on submit\n\nValidate on submit is triggered when merchants press the form’s submit button. The submit button is often \\[Save\\], but can be another call to action.\n\nUse when:\n\n- Not all fields can be validated while merchants are typing. When a form is used for saving data, always validate on submit and validate text fields while typing. For example, if merchants never interact with a required text field, there’s no change to mark it as not valid until they press the submit button. The same applies to form controls other than text fields, such as radio buttons, and selects.\n\nDon’t use when:\n\n- A form doesn’t have specific validation requirements, or the form doesn’t save data. For example, a search form that returns no results should display an empty state, rather than a validation error.\n\n### Component\n\n- [Banner](/components/feedback-indicators/banner#navigation)\n\nAnd one or more of the following:\n\n- [Text field]\n- [Select]\n- [Choice list]\n- [Checkbox]\n- [Radio button]\n\n### Content\n\nBanner heading\n\n- Use a colon to introduce the list.\n- Make the heading instructional. Don’t just call out that there are {x} number of errors.\n\nBanner body text\n\n- Use the [list component](/components/lists/list#navigation) to itemize the errors\n- Start each list item with the label of the field that isn\'t valid, and describe the action needed to fix it\n\nIndividual field error messages:\n\n- See content guidelines for [validation while typing](#validate-while-typing)\n\n![Red form validation banner](/images/validation-banner-red@2x.png)\n\nRather than pointing out that there are {x} number of errors, be more descriptive. Explain that in order to save or continue, {x} number of fields need to be changed. For the bullet point instructions, see if you can word them to be more actionable, for example, “Add a discount code,“ instead of “Discount can’t be blank.“\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n![Instructional validation banner](/images/validation-banner-content-do@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n![Validation banner that only points out that there is an error](/images/validation-banner-content-dont@2x.png)\n\n</div></div>\n\n**Usage**\n\nAlways indicate submission progress. If the fields aren\'t valid, don’t clear or alter them on behalf of merchants during validation.\n\n![Spinner displaying on save](/images/submission-progress@2x.png)\n\nIf the form submission has a single error:\n\n- Move scroll position to the field that is not valid\n- Focus the field\n- Show an error message below the field\n\n![Validation error for a price entry field](/images/input-validation@2x.png)\n\nIf the form submission has multiple errors:\n\n- Move scroll position to the top of the screen\n- Use a banner to display a summary of all the errors\n- Show an error message below each field that is not valid so merchants can scroll through and make corrections\n\n![Red form validation banner](/images/validation-banner-red@2x.png)\n\n---\n\n## Settings warning\n\nUse:\n\n- To help merchants prevent potential mistakes\n- When form input is valid, but you want to warn merchants of a consequence they might not be expecting\n\nDon’t use:\n\n- For actual error states\n\nTip: Explore ways to prevent the warning message from showing at all. Look for opportunities to add help text or other contextual information to surface or highlight potential risks or consequences of taking, or not taking, the action.\n\n### Component\n\n- [Banner](/components/feedback-indicators/banner) without title\n\n### Content\n\n- Since the warning message is in close context to the action that triggered the warning, it should be short\n- Explain the risks or consequences of an action that’s just been taken\n- These messages don’t have to start with actionable language, like, “Change currency.” Here are some options\n  - Start with the word “This” and explain the consequence, for example, “This will affect inventory prices”\n  - Start by noting the action, then explain the consequence, “Changing {x} will affect {y}”\n- If available, link to a resource where merchants can learn more\n\n![In line warning banner below a drop down](/images/settings-warning@2x.png)\n\n---\n\n## Banners\n\n### Page-level banners\n\nUse when:\n\n- An error applies to the entire screen\n- The error is far down the page and it’s critical that they see the message\n- [A form was submitted with fields that are not valid](#form-validation)\n- If the error was delayed, for example, an action was taken and the error doesn’t immediately appear in context\n\nDon’t use when:\n\n- It’s possible to place the banner [in context] because the source of the error is in view and the event that triggered the action just happened\n\nFor multiple error guidelines, see [validate on submit](#validate-on-submit)\n\nPage-level banner errors should explain:\n\n- Where the error happened\n- What happened\n- Why it happened\n- What to do next\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n![Error message with arrows pointing at different parts of the message](/images/banner-breakdown@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Unable to process payment for checkout with negative taxes.\n\n</div></div>\n\n### Component\n\n- [Banner](/components/feedback-indicators/banner)\n\n### Content\n\nHeadings should:\n\n- Clearly state the problem\n- Not use punctuation\n\nBody content should:\n\n- Explain how to solve the problem.\n- Use actionable language like “do x.” Don‘t use permissive language, like “you can x.” Be concise: no longer than 2 sentences.\n- Use periods.\n\nCalls to action should:\n\n- Be action-led (verb+noun format)\n- Aim for a one-click fix. If the error can be fixed via a single button or menu, offer that action directly in the error message.\n- Open a dedicated error-correction view for more complex problems such as reviewing a risky order or editing an unverified customer address.\n- Provide a link to documentation for information that may be valuable but can’t fit in a brief error message.\n\n![Page level warning banner](/images/page-level-warning-banner@2x.png)\n\n### Banners in cards and modals\n\nUse when:\n\n- Merchants are engaged in a task flow and you want to warn them about potential issues with the task at hand, or inform them something has gone wrong\n- Directing merchants to a page with multiple sections and you want to visibly call out the section with the error\n\nDon’t use when:\n\n- An error applies to the entire screen.\n- The error is far down the page and it’s critical that merchants see the message.\n- If the error was delayed. For example, an action was taken and the error doesn’t immediately appear in context. In these cases, use the\n  [page-level banner](#page-level-banners)\n\n### Component\n\n- [Banner](/components/feedback-indicators/banner#navigation)\n\n### Variant\n\n- Without title\n\n### Content\n\n- The more contextual the message, the less you need to say, so go straight to explaining what happened and how to fix\n- Keep to one sentence\n- Contextual banners don’t have titles\n- Try to add a next step, whether in a button or link\n- Use when there is more than one call to action\n\n## ![Warning banner at the top of a card below the card title](/images/section-level-warning@2x.png)\n\n## Exception lists\n\nUse when:\n\n- Items in a list are in a noteworthy state that you want to make merchants aware of, like a status, or piece of information (like a high risk order) that’s directly relevant to the information it’s connected to\n\nExample:\n\n- High risk order\n\nDon’t use when:\n\n- The source of the problem is an entire card or page\n\n### Component\n\n- [Exception list](/components/feedback-indicators/exception-list)\n\nVariant\n\n- Status: critical or warning\n\n### Content\n\nContent should:\n\n- Highlight an exceptional state that encourages clicking on the list item\n- Pair content with a warning or error icon\n- Always lead with what went wrong\n- A description is required\n- A title is optional\n- Links are optional but not common because the list item is actionable\n- Be concise\n\n![Exception list warning](/images/exception-list-warning@2x.png)\n\n![Exception list error](/images/high-risk-fraud@2x.png)\n\n---\n\n## Home notifications\n\nHome notifications are primarily used to prevent merchants from losing money or help them continue using Shopify if they don’t act on the error message instructions immediately.\n\nUse for:\n\n- High-priority tasks that must be completed immediately to continue using\n  Shopify or avoid losing money.\n- Important enough tasks that we wouldn’t want merchants to navigate to another place in Shopify to find it, or stumble upon while completing another task.\n- Errors for features that don’t have a dedicated details page. For example, before\n  Shopify Capital had a details page, related status messages were temporarily surfaced in Home.\n\nDon’t use for:\n\n- Tips or advice\n- Positive feedback\n- Confirmation messages\n- New feature announcements\n- Status messages, other than those for Shopify Capital\n- Messages that can be displayed in context\n- Error messages that should be displayed in context\n- Task-related errors like a problem with saving a page\n\n![Structure of home notification with a header, body content, and button](/images/home-notification-anatomy@2x.png)\n\n### Warning home notifications\n\nWarning home notifications are pre-emptive. They let merchants know that their finances will be impacted if action isn’t taken in a couple days or more, or that an action can be taken to make money sooner.\n\n- Financing request is pending\n- Warn about upcoming expiration\n- Pending status, like with Shopify Capital application status\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n![Warning home notification with credit card expiry message](/images/home-notification-warning@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n![Warning home notification with chargeback message](/images/dont-home-notification@2x.png)\n\n</div></div>\n\n### Critical home notifications\n\nCritical home notifications inform merchants of issues that:\n\n- Currently impact their finances\n- Will have an impact on their finances if action isn’t taken immediately\n- Prevent the normal operation of their business or account\n\nCritical home notifications can be used for these message types:\n\n- Trial expired\n- Domain expired\n- Credit card expired\n- Account is suspended\n- Shopify Payment payouts on hold\n- Payment processing issues\n- Payment authorizations expiring that day\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n![Critical home notification with account on hold message](/images/home-notification-critical@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n![Critical home notification with out of stock message](/images/dont-home-notification-02@2x.png)\n\n</div></div>\n\n---\n\n## Admin unavailable errors\n\nSometimes the admin can’t be displayed due to a network issue, browser limitation, connection problem, or server issue. 400 and 500 series errors fall in this category. In these cases, always explain what went wrong and provide merchants with a troubleshooting step, like refreshing the page.\n\nUse when:\n\n- A page or the entire admin can’t be displayed\n\nDon’t use when:\n\n- The error can be placed in context, close to the source of the problem\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n![Page not found error with internet connection message](/images/page-not-found-02@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n![Page not found error with oops, something went wrong message](/images/dont-page-not-found@2x.png)\n\n</div></div>\n\nDon’t use internal language in error messages and avoid using question formats.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n![Problem loading page error with troubleshooting tips](/images/admin-error@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n![Problem loading page error with content that talks about operational engineers](/images/dont-admin-error@2x.png)\n\n</div></div>\n\n### Component:\n\n- [Empty state](/components/layout-and-structure/empty-state)\n\n### Content\n\nHeadings should:\n\n- Heading should explain what went wrong\n- Body should help merchants troubleshoot the problem\n- Call to action should provide the most probable fix, like reloading the page, or going to the previous page or Shopify Home\n\n![Page not found error](/images/page-not-found@2x.png)\n\n---\n\n## Errors without solutions\n\nWhen a service issue occurs in Shopify or is caused by a third party, we don’t always have a solution to offer to merchants. In these cases, always explain what went wrong so they can attempt to troubleshoot. If available, provide them with a troubleshooting step, like refreshing the page or returning at a later time.\n\nUse when:\n\n- Merchants are being denied access to a page or the entire admin\n  [See admin unavailable errors](#admin-unavailable-errors)\n- A third party issue is causing a disruption to merchants’ workflows\n\nDon’t use when:\n\n- There’s literally any solution we can offer to merchants\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n![Carrier may not be able to pick up package error message](/images/warning-no-solution@2x.png)\n![Carrier may not be able to pick up package error message](/images/warning-no-solution-2@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Don’t use the “Something went wrong. Please try again in a few minutes.” message when there’s any option to offer more context.\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- This error message is a last resort: "Something went wrong. Please try again in\n  a few minutes."\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- An error occurred\n- 1 error\n- Invalid\n\n</div></div>\n\n---\n\n## Voice and tone\n\nThese content guidelines are based on common copy mistakes. Avoid sounding overly apologetic, too technical, or hyperbolic. Keep Shopify out of the conversation unless Shopify was the cause of the error. Don’t downplay the error by telling merchants not to worry or by adding humor to a negative situation.\n\nAvoid the word “please” so it’s not overused throughout the admin. Don’t downplay serious problems.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Some of today’s sales data isn’t updated yet. This will be fixed soon. Your data is safe, and your actual sales are not affected.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Today’s sales data **might** not be accurate, but **please don’t worry—it’s just temporary**.\n\n</div></div>\n\nDon’t use scary, technical words in error messages.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Product weight can’t be negative. Change the product weight to be 0 or higher and try again.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- **Error** **Line items grams** must be greater than or equal to 0.\n\n</div></div>\n\nError messages are not the place for hyperbole or injecting personality.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- High risk of fraud detected\n\nBefore fulfilling this order or capturing payment, review the Risk Analysis and determine if this order is fraudulent.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- **Uh oh! High risk of fraud detected**\n\nLooks like there’s a high fraud risk with this order. Better review the Risk\nAnalysis to make sure the order is safe!\n\n</div></div>\n\nDon’t use internal Shopify terms. Only include the information merchants need.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- There’s a problem loading this page\n\nThere’s a technical problem with Shopify that has prevented this page from loading. Try reloading this page or going to another page in Shopify. If that doesn’t work, visit our status page for updates and try again later.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- There’s a technical problem with Shopify that has prevented this page from loading. **Our operation engineers are aware of this problem and are working hard to get it solved**.\n\n</div></div>\n\nKeep Shopify out of the conversation. Focus on the information merchants need to complete their task efficiently.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Before you can view earnings from your store, you need to complete your account setup. [Complete account setup]\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Before **we** can provide you with earnings from your store, **we** need some additional information. [Complete account setup]\n\n</div></div>',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['error states', 'invalid', '500', '400', '404', 'error pages'],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'fQ99ysKEWWVMrTbN60YBb',
    title: 'Grammar and mechanics',
    excerpt:
      'This guide is to help designers, developers, recruiters, UX-ers, product managers, support advisors, or anyone who writes public-facing text for Shopify.',
    slug: 'grammar-and-mechanics',
    parentId: 'AzmHY1ZHqh6iF0nC5TReK',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'rth0YhVZ2LohcHnwH3xKy',
        blockType: 'Markdown',
        content:
          '## Basics\n\n### Active voice\n\nYou should (almost) always write in the active voice:\n\n- Subject (person/thing acting) verb (the action) object (receives the action)\n\nUse the active voice if merchants need to do something. It should be clear that the subject is the one doing the action.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nAdd details to the product\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nDetails were added to the product\n\n</div></div>\n\n### Passive voice\n\nTo tell if you’re using the passive voice, look out for:\n\n- When the object comes before the subject (“the item was purchased by the customer”)\n- Past tense verbs (“was added,” “was created,” and so on)\n- Forms of the verb “to be” (“was,” “is,” “were,” and so on)\n\nYou should almost always write in the active voice, but here’s when to use the passive voice:\n\n- To avoid referring to yourself or Shopify\n- To make it clear that you didn’t personally take an action or make a decision\n- If the object (thing being done) is more important than the subject (person doing the thing)\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nInvoices are created monthly and emailed to\n[marki.yeung@nomail.com](mailto:Marki.Yeung@nomail.com)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nShopify creates and emails your invoices monthly to\n[simran.robichaud@nomail.com](mailto:Simran.Robichaud@nomail.com)\n\n</div></div>\n\n### Contractions\n\nContractions are abbreviated words. We use them to set a light and casual tone in the interface. The goal is to sound human, so avoid contracting verbs that sound awkward when you say them out loud, or have been phased out of modern day speech.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- You can’t have products with negative weights\n- Your products don’t have weights\n- You’re all set up\n- This product doesn’t require shipping\n- The customer name shouldn’t contain numbers\n- It’s a good time to plan your Black Friday sale\n- An error occurred and your changes couldn’t be saved\n- I’m Kit, your digital marketing assistant\n- This transfer hasn’t been received\n- You haven’t connected your account\n- You’ve exceeded 10 password attempts\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- That’ll make sure you are all set up\n- It would’ve been possible if you’d installed the latest updates\n- The set up was not complete, but this’ll do\n- There’re 10 products in this collection\n- Your product mustn’t be more than 20kgs\n- This product needn’t be shipped\n- There are 3 visitors who’ve viewed this product\n- You gotta set up Shopify Payments to use Shopify Capital\n- It’d be a good idea to place an ad this weekend\n\n</div></div>\n\n### Plain language\n\nUse words and language that our merchants use. Avoid jargon or technical terminology. Make sure each sentence has a single focus and keep them short. Aim for a Grade 7 reading level.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- We’ve made some changes to improve your store’s security\n- These products aren’t getting a lot of views, but visitors are adding them to their carts\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Your SSL certificates were activated\n- These are your less popular products with the highest add-to-cart conversion\n\n</div></div>\n\n---\n\n## Capitalization\n\n### Headings\n\nUse sentence case for all headings:\n\n- Capitalize the first word of a heading\n- Capitalize proper or trademarked nouns (names of products, countries, or people)\n- Lowercase for everything else\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nCreate purchase order\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nCreate Purchase Order\n\n</div></div>\n\n### Product and feature names\n\nIn general, if a feature or product isn’t unique to Shopify, don’t capitalize it (such as blogs, navigation, pages). If it’s unique to Shopify and marketable as its own product, capitalize it (such as Shopify Payments, or Frenzy).\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- blogs\n- navigation\n- Shopify Payments\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Blogs\n- Navigation\n- shopify payments\n\n</div></div>\n\n### Trademarks\n\nRespect the usage guidelines of any third-party intellectual property. For example, in US communications, Apple Pay requires you to include the trademark symbol (™) the first time Apple Pay appears in body copy.\n\nReview the third party’s brand usage guidelines to make sure you are using the company’s name and logo correctly.\n\n### Job titles\n\nJob titles should be capitalized when they come before or after a person’s name. When referring to a job title without referencing a name, don’t capitalize the job title.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Content Strategist Jane Smith\n- Jane Smith, Content Strategist\n- Jane Smith is a content strategist.\n- The content strategist designed the information architecture.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- content strategist Jane Smith\n- Jane Smith, content strategist\n- Jane Smith is a Content Strategist\n- The Content Strategist redesigned the information architecture.\n\n</div></div>\n\n### Letters following slashes\n\nThe first letter following a slash shouldn’t be capitalized.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nZIP/postal code required\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nZIP/Postal code required\n\n</div></div>\n\n---\n\n## Headings and subheadings\n\nSee the content guidelines for [headings and subheadings](/content/actionable-language#headings-and-subheadings) in the actionable language section.\n\n---\n\n## Lists\n\n### Bulleted\n\nUse a bulleted list when items are related but sequence or priority doesn’t matter.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nUse Shopify Payments to:\n\n- Avoid the hassle of setting up a third-party payment gateway\n- Track your payout schedule from the Shopify admin\n- Minimize lost sales from chargebacks\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nUse Shopify payments to\n\n- avoid the hassle of setting up a gateway,\n- track pending payout schedule,\n- minimize lost sales from chargebacks. And eliminate PCI fees\n\n</div></div>\n\n### Numbered\n\nUse a numbered list when item sequence or priority does matter, such as step-by-step instructions.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nTo set up Shopify Payments:\n\n1.  Go to Settings from Shopify admin\n2.  Select Shopify Payments\n3.  Select Setup\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nTo set up Shopify Payments:\n\n1.  Go to Settings from Shopify admin Then select Shopify Payments\n2.  Select Setup\n\n</div></div>\n\n### Dropdown menus\n\n#### Actions in a menu\n\nMenu lists give users a horizontal set of actions when space is limited. The order of actions is often based on logic such as most popular actions.\n\nActions in a menu follow a {verb}+{noun} pattern. If there’s enough context, only a verb might be required.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Rename\n- Edit\n- HTML\n- Duplicate\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- HTML\n- editing options\n- File name changes\n- Duplicate this order so that you can make edits, updates, or changes\n\n</div></div>\n\n#### Nouns in a menu\n\nMenu lists give users a horizontal set of nouns when space is limited. The order of nouns is often based on logic such as most recent orders.\n\nNouns in a menu should be concise but still give the user enough information so they can easily find and accurately select the item they want.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nSelect filter\n\n- Today\n- Yesterday\n- This week\n- This month\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Filter visibility\n- Filter product type\n- Filter product vendor\n- Filter tagged with\n\n</div></div>\n\n### Capitalization\n\n- List items always start with a capital letter.\n- Capitalization and punctuation rules apply to both bulleted and numbered lists.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nCompany name\n\n- Hidden\n- Optional\n- Required\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nCompany name\n\n- hidden\n- optional\n- required\n\n</div></div>\n\n### Punctuation\n\n- Introduce bulleted lists with a colon or a heading.\n- Don’t use commas at the end of list items (for bulleted or numbered lists).\n- If any list item contains two or more sentences, punctuate all list items.\n- If all list items are one sentence or fragments, don’t punctuate.\n- Never put a comma or semicolon at the end of a bulleted or numbered list item.\n  Treat each list item as a self-contained piece of information.\n\n---\n\n## Dates, numbers, and measurements\n\nDates, numbers, and measurements are often formatted automatically according users’ local preferences, and they may be formatted differently in other languages. You can use [helpers](https://github.com/Shopify/quilt) to ensure they are localized automatically. These guidelines are for manually formatting in American English, which we use as a base before translating to other languages.\n\n### Date\n\nWhen possible, use the month’s full name. If there are space constraints, use 3-letter abbreviations. Don’t write dates with numerals only.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Thursday, October 15, 2015\n- October 15, 2015\n- Oct 15, 2015\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Thur, October 15\n- October 15, ’15\n- 10/15/15\n\n</div></div>\n\nDon’t use ordinal indicators, which are words representing position or rank in a sequential order (1st, 2nd, 3rd, and so on).\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nJanuary 23–April 1\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nJanuary 23rd–April 1st\n\n</div></div>\n\n### Time\n\nFor all translations, the time format is automatically localized by the `Intl.DateTimeFormat` JavaScript object. When time must be formatted manually, follow these guidelines:\n\n- Use the 12-hour clock, followed by am or pm.\n- Include a space after the last number. For example, “Your package will arrive at 12:35 pm.” Adding the space helps with formatting for English-speaking markets outside of North America, so we use it for North American usage as well.\n- Use the browser time of the logged in user.\n- To show a time range, use an en dash and include the am/pm after both times, for example, 3:00 pm–4:00 pm.\n- If indicating both the date and time, separate them with the word “at” instead of a comma.\n\n#### Time zones\n\n- Include a time zone only if it’s necessary, such as for an event listing.\n- Use the time zone’s abbreviation following the am or pm, for example, 4:00 pm NZT.\n- If your audience is in a single time zone, then don’t include an S (for Standard) or D (for Daylight). For example, 3:00 pm PT.\n- If your audience is in a combination of time zones, then include the S (for Standard) or D (for Daylight) to avoid confusion. For example, 3:00 pm PDT.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nThursday, October 15, 2015 at 2:00 pm EDT\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n2015-10-15, CDT 2:00P.M.\n\n</div></div>\n\nUse consistent timestamp formats by following these examples:\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Less than 1 min: `Just now`\n- 1 min to 60 min: `13 minutes ago`\n- Today: `10:30 am`\n- Yesterday: `Yesterday at 10:30 am`\n- In the last 7 days: `Friday at 10:30 am`\n- 7 days to 1 year: `Aug 14 at 10:30 am`\n- More than 1 year: `Aug 14, 2016`\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Less than 1 min: `10:30am`\n- 1 min to 60 min: `10:30am`\n- Today: `Today, 10:30am`\n- Yesterday: `Friday, 10:30am`\n- In the last 7 days: `Friday, 10:30am`\n- 7 days to 1 year: `10:30am, Oct 15, 2015`\n- More than 1 year: `Last year`\n\n</div></div>\n\n### Currency\n\nWhen including currency with a price, the currency comes after the dollar amount. Learn more about [formatting localized currency](/foundations/formatting-localized-currency).\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- \\$10,000 USD\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- USD\\$10,000\n- \\$10KUSD\n- \\$10,000USD\n\n</div></div>\n\n### Numbers\n\nIn general, use numerals. If the number is below 10 and not integral to the sentence, spell it out in full.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- 9\n- 100\n- 1\n- Here are 2 marketing campaigns you can use.\n- You have 3 orders to fulfill.\n- You no longer need to track shipments in two places.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- nine\n- one hundred\n- one\n- Here are two marketing campaigns you can use.\n- You have three orders to fulfill.\n\n</div></div>\n\nUse commas for numbers with four or more digits. Whenever possible, don’t truncate numbers:\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- 12,000\n- 9,344\n- 1,800,887\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- 12 k\n- 9344\n- 1.8 m\n\n</div></div>\n\nUse hyphens when writing phone numbers. Don’t use brackets, spaces, periods, or plus signs:\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- 613-555-1234\n- 1-514-555-1234\n- 33-55-416-123\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- 613.555.1234\n- 1-(514)-555-1234\n- +33 55 416 123\n\n</div></div>\n\nUse an en dash without a space on either side for number ranges:\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- 5–10 products\n- October 15–31\n- 2005–2015\n- 25–100 lb\n- \\$0.00–\\$49.99\n- 2:00 pm–3:00 pm\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- 5 – 10 products\n- October 15 – 31\n- 2005 – 2015\n- 25 – 100 lb\n- \\$0.00 – \\$49.99\n- 2:00 pm – 3:00 pm\n\n</div></div>\n\nUse “to” instead of an en dash if a number range is preceded by “from” in a phrase. Use “and” if a range is preceded by “between.”\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- You have a delivery scheduled from 10:00 am to 2:00 pm on Monday, July 18.\n- Active from August 15 to August 30\n- Free shipping for products between \\$10.00 and \\$40.00\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- You have a delivery scheduled from 10:00 am–2:00 pm on Monday, July 18.\n- Active from August 15–August 30\n- Free shipping for products between \\$10.00–\\$40.00\n\n</div></div>\n\nFor undefined upward ranges, use “and up” or “or more.”\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- \\$50.00 and up\n- 100 or more\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- \\$50.00+\n- \\>100\n\n</div></div>\n\nFor downward ranges, be specific.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n$0.00–$49.99\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n\\$50.00 or less\n\n</div></div>\n\n### Units of measurement\n\nIn all cases, include a space between the number and the unit.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- 3.4 lb\n- 2 kg\n- 1 cm\n- 11.875 × 3.375 × 13.625 cm\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- 3.4lb\n- 2kg\n- 1.875 × 3.375 × 13.625cm\n\n</div></div>\n\nNever pluralize unit of measurement abbreviations.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- 4 lb\n- 11 ml\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- 4 lbs\n- 11 mls\n\n</div></div>\n\nWhen listing out multiple measurements in a row, put the unit of measurement at the end instead of after each number (and include a space).\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- 11.875 × 3.375 × 13.625 cm\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- 1.875 cm × 3.375 cm × 13.625 cm\n\n</div></div>\n\nFor pricing by measurement, don’t add a space before or after a slash.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- \\$100/m\n- \\$5/100 g\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- \\$100/ m\n- \\$5/ 100g\n\n</div></div>\n\nFor units of measurement, use decimals instead of fractions:\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- 2.375 lb\n- 11.875 × 3.375 × 13.625 cm\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- 2-3/8 lb\n- 11-7/8 × 3-3/8 × 13-5/8 cm\n\n</div></div>\n\n#### Unit of measurement abbreviations\n\nThis table shows the standard abbreviations for commonly-used units of measurement.\n\nUse the imperial system for the United States, Liberia, and Myanmar, and use the metric system for all other countries.\n\n| Measurement          | System    | Unit            | Abbreviation |\n| -------------------- | --------- | --------------- | ------------ |\n| **Area**             | Metric    | square meters   | m²           |\n|                      | Imperial  | square feet     | sq ft        |\n| **Distance**         | Metric    | kilometers      | km           |\n|                      | Imperial  | miles           | mi           |\n| **Image resolution** | Universal | pixels          | px           |\n|                      | Universal | megapixels      | MP           |\n|                      | Universal | pixels per inch | ppi          |\n|                      | Universal | dots per inch   | dpi          |\n| **Length**           | Metric    | centimeters     | cm           |\n|                      | Metric    | meters          | m            |\n|                      | Imperial  | inches          | in           |\n|                      | Imperial  | feet            | ft           |\n|                      | Imperial  | yards           | yd           |\n| **Storage size**     | Universal | kilobytes       | KB           |\n|                      | Universal | gigabytes       | GB           |\n|                      | Universal | terabytes       | TB           |\n| **Volume**           | Metric    | milliliters     | ml           |\n|                      | Metric    | liters          | L            |\n|                      | Imperial  | fluid ounces    | fl oz        |\n|                      | Imperial  | gallons         | gal          |\n| **Weight**           | Metric    | grams           | g            |\n|                      | Metric    | kilograms       | kg           |\n|                      | Imperial  | ounces          | oz           |\n|                      | Imperial  | pounds          | lb           |\n\n---\n\n## Addresses and places\n\n### Address\n\nLay out address forms in the following format:\n\n```\nFirst name             Last name\nAddress\nApartment, suite, etc. (optional)\nCity\nCountry            Province           Postal code\n```\n\nPlease note, “optional” in `Apartment, suite, etc. (optional)` means that the field is optional for customers to complete, but we should always include it in the form.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Use locale-specific alternatives for province and postal code, for example, the US uses State and ZIP code\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Add extra fields\n- Change the placeholder text\n\n</div></div>\n\n### Country, province, and state names\n\nUse a nation’s proper name when referring to it as a noun.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nYour store must be located in the United States.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nYour store must be located in the US.\n\n</div></div>\n\nWhen using a country as an adjective (such as when referring to currency), use the abbreviated form without punctuation.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nPinterest requires your store to use US currency.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nU.S. currency\n\n</div></div>\n\nThings to watch out for:\n\n- Don’t use colloquial forms of a nation or state name, for example, America instead of the United States\n- Search online to see whether nations commonly use “the” before their name, for example, the Philippines or the Falkland Islands\n\n---\n\n## Punctuation\n\n### Ampersands\n\nDon’t use ampersands (&). They attract attention to the least important part of the sentence. Spell out the word “and.”\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nZones and rates\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nZones & rates\n\n</div></div>\n\n### Apostrophes\n\nUse apostrophes to represent omitted letters or numbers:\n\n- Omitted numbers (’40s)\n- Omitted letters (don’t, can’t, won’t)\n- Verb contractions (it’s, you’re, we’re)\n\nUse apostrophes to form possessives:\n\n- Singular nouns: add _’s_, even if they end in _s_ (merchant’s, bus’s)\n- Plural nouns that don’t end in s: add _’s_ (women’s, men’s)\n- Plural nouns that end in s: add an apostrophe (boxes’, customers’)\n\nDon’t use apostrophes to form possessive pronouns such as hers or his.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Merchant’s store\n- Women’s clothing\n- Customers’ credit cards\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Merchants store\n- Womens clothing\n- Customers credit cards\n\n</div></div>\n\nAlways use apostrophes, not vertical (straight) quotes.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- <span style="font-size: 5rem; line-height: 0; vertical-align: bottom">’</span> <kbd>option</kbd> + <kbd>shift</kbd> + <kbd>]</kbd>\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- <span style="font-size: 5rem; line-height: 0; vertical-align: bottom">\'</span>\n\n</div></div>\n\n### Colons\n\nAvoid using colons in sentences. If you need to use one, don’t capitalize the first word after the colon unless it’s a proper noun.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nYour store accepts payments with GoCoin and Shopify Payments.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nYour store accepts payments with: GoCoin and Shopify Payments. Merchants store, womens clothing, customers credit cards\n\n</div></div>\n\nDon’t use colons to introduce radio buttons or checkboxes.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nIf the customer abandons their checkout, send them an email reminder to complete their order\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nIf the customer abandons their checkout, send them an email reminder to complete their order:\n\n</div></div>\n\nIntroduce bulleted lists with a colon.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nCorrect the following payment information to continue:\n\n- The credit card verification value (CVV) doesn’t match the credit card\n- The billing address street doesn’t match the street for the credit card\n- The billing address ZIP or postal code doesn’t match the credit card address\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nCorrect the following payment information to continue.\n\n- The credit card verification value (CVV) doesn’t match the credit card\n- The billing address street doesn’t match the street for the credit card\n- The billing address ZIP or postal code doesn’t match the credit card address\n\n</div></div>\n\n### Commas\n\nUse the oxford comma (also known as the serial comma) in sentences. There should be a comma after every list of 3 or more items (unless you’re using a bulleted or numbered list).\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nKit is an app that handles your online advertising, email marketing, and social media.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nKit is an app that handles your online advertising, email marketing and social media.\n\n</div></div>\n\nDon’t use commas to separate bulleted or numbered list items.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- The credit card verification value (CVV) doesn’t match the credit card\n- The billing address street doesn’t match the street for the credit card\n- The billing address ZIP or postal code doesn’t match the credit card address\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- The credit card verification value (CVV) doesn’t match the credit card,\n- The billing address street doesn’t match the street for the credit card,\n- The billing address ZIP or postal code doesn’t match the credit card address.\n\n</div></div>\n\n### Ellipses\n\nThe ellipses (…) can be used in place of a missing piece of text (most commonly to show the deletion of words from a direct quotation). Avoid using ellipses in text.\n\nUse ellipses for:\n\n- Truncation in the center of a title bar\n\nDon’t use ellipses for:\n\n- Placeholder copy\n- Trailing off a sentence\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nSearch files\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nStart typing to search for files…\n\n</div></div>\n\nAlways use the ellipsis character, not three periods.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n<code style="font-size: 5rem; line-height: 0; background-color: transparent">…</code> <kbd>option</kbd> + <kbd>;</kbd>\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n<code style="font-size: 5rem; line-height: 0; background-color: transparent">...</code>\n\n</div></div>\n\n#### Truncation\n\nConsider constraints of the space in the interface when deciding to use truncation. Think about what part of the string merchants needs most. It’s usually the beginning or end, which means you might have to truncate the middle of the string.\n\n#### Ellipses button component\n\nA button with an ellipsis icon (not the same as text) is used to expand more actions. It’s typically used in cards, or for horizontal sets of actions when space is limited.\n\n### En-dashes and em-dashes\n\nUse an en dash with no spaces in between (–) for a fixed range of numbers\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n2006–2013\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n2006 – 2013\n\n</div></div>\n\nUse an em dash only if you can’t make your message clearer by splitting it into two sentences. Use an em dash without a space on either side (—).\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nChoose your theme’s colors, typography, and pictures—all in one place.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nChoose your theme’s design—colors, typography, and pictures—all in one place.\n\n</div></div>\n\nDepending on the font or appearance, you may want to include a hair space on either side of the en or em dash. HTML entity code for hair space is `&hairsp;` or `&#8202;`.\n\nTip: On Mac the keyboard shortcuts are option - for en dash and shift option - for em dash.\n\n### Exclamation marks\n\nAvoid exclamation marks—only use them for really really exciting things. If you absolutely have to, limit yourself to one exclamation mark per page.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nYou’ve launched your first online store!\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nYou’ve updated your product title!\n\n</div></div>\n\n### Hyphens\n\nUse hyphens to:\n\n- Form compound modifiers: two words that combine to modify or describe the noun that follows\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Start your free, no-risk, 14-day trial.\n- This is a high-risk order.\n- This order is high risk.\n- Add weight-based shipping rates.\n- Add rates based on the weight of an order.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Start your free, no risk, 14 day trial.\n- This is a high risk order.\n- This order is high-risk.\n- Add weight based shipping rates.\n\n</div></div>\n\n- Join prefixes and suffixes only if there are two vowels beside each other. Never use hyphens in the words ecommerce and email.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Re-order\n- Resend\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Reorder\n- Reenable\n- Re-send\n\n</div></div>\n\n### Periods\n\nPeriods often end up in places they shouldn’t, and are omitted at strange times. In general, don’t use periods in interface copy unless it’s a full sentence description.\n\nWhen to use periods:\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Complete sentences\n- Body text, descriptions, and subtitles\n- Help text under text boxes (form fields)\n- Timeline events\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Sentence fragments\n- Top-level headings and titles\n- Buttons\n- Notifications\n- Toast messages\n- Placeholder copy\n- Navigation menu items\n- Hover/tooltip text\n- Footer help box text\n- Radio button and checkbox text\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Description example: Add this product to a collection so it’s easy to find in your store.\n- Placeholder example: Search products\n- Timeline example: \\$50.41 USD was authorized.\n- Footer help box example: Learn more about [products](https://help.shopify.com/manual/products)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Button example: Add product.\n- Placeholder example: Search…\n- Heading example: I’m Kit, your virtual employee.\n- Notification example: 6 orders have payments that need to be captured.\n\n</div></div>\n\n#### Periods for bulleted, numbered, and lists of links\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Use when a list item has two or more full sentences, then also add periods to the whole list\n- Use for the description or helper text below a bulleted or numbered list item\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Don’t use periods when a list has only single sentences or fragments\n- Don’t use periods for lists of links\n\n</div></div>\n\n### Question marks\n\nAvoid question marks wherever possible. Reword into affirmative statements wherever you can, but there are exceptions:\n\nIt’s okay to use question marks if you don’t know the result of the question:\n\n- “Did you forget your password?”\n- “Do you need to add a shipping rate?”\n\nDon’t use question marks if:\n\n- It’s the only option available: “Reset password”\n- It’s an on/off option: “Show quantity box”\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Forgot?\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Reset password?\n\n</div></div>\n\n### Quotation marks\n\nUse quotation marks to:\n\n- Define words (“growth-hacking”)\n- Quote text\n\nWhen it’s helpful to the merchant, use quotation marks to indicate input that the merchant has provided, such as a product title or file name. Use this indication only when the input appears in running text.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Are you sure you want to delete “cat shirt”?\n- “Nike Air Max 90.png” failed to upload\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Are you sure you want to delete **cat shirt**?\n- Nike Air Max 90.png failed to upload\n\n</div></div>\n\nIn general, place commas and periods inside quotation marks. When working with literal strings like typed commands or merchant inputs, place punctuation outside the quotation marks.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- “I see this all the time,” said Mary.\n- Avoid general words like “all,” “every,” or “most.”\n- To remove this item, type “DELETE”.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- “I don’t understand why”, said Mitch.\n- We call it a “store”, not a “shop”.\n- There was an error with the file “cat_shirt.png.”\n\n</div></div>\n\nAlways use smart (curly) quotes, not vertical (straight) quotes.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- <span style="font-size: 5rem; line-height: 0; vertical-align: bottom">‘</span>\n  <kbd>option</kbd> + <kbd>]</kbd>\n- <span style="font-size: 5rem; line-height: 0; vertical-align: bottom">’</span>\n  <kbd>option</kbd> + <kbd>shift</kbd> + <kbd>]</kbd>\n- <span style="font-size: 5rem; line-height: 0; vertical-align: bottom">“</span>\n  <kbd>option</kbd> + <kbd>[</kbd>\n- <span style="font-size: 5rem; line-height: 0; vertical-align: bottom">”</span>\n  <kbd>option</kbd> + <kbd>shift</kbd> + <kbd>[</kbd>\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- <span style="font-size: 5rem; line-height: 0; vertical-align: bottom">"</span> or <span style="font-size: 5rem; line-height: 0; vertical-align: bottom">\'</span>\n\n</div></div>\n\n### Semicolons\n\nAvoid semicolons if possible. If you really need them, use semicolons to:\n\n- Connect two closely related ideas, as long as they are both independent clauses (full sentences that could stand on their own).\n- Replace a comma or the word “and” between two closely related ideas.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nMy friends made me banana pancakes on my birthday; I’ve never been happier.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nThe unicorn was hungry; the grass was brown.\n\n</div></div>\n\n---\n\n## Spelling and formatting\n\n### American spelling\n\nUse American spelling for all external-facing Shopify content. When in doubt, check the [Merriam-Webster dictionary](https://www.merriam-webster.com/) for the preferred spelling of specific terms.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Color\n- Center\n- Canceled\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Colour\n- Centre\n- Cancelled\n\n</div></div>\n\nTip: it’s easy to miss Canadian spelling. Switch your laptop language settings to American English and turn spell check on. It will highlight any Canadianisms you might have missed.\n\n### Bold\n\nWhen in doubt, don’t bold.\n\nUse bold sparingly and only where strong emphasis is required. Don’t use bold to create a heading or emphasize:\n\n- Proper nouns\n- Merchant input\n- Checkbox titles\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nAfter your first sale, PayPal will email you at **merchant&#64;email.com** with instructions.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nAre you sure you want to delete **Sunset T-shirt**?\n\n</div></div>\n\n---\n\n## You, we, and other personal pronouns\n\n### Addressing merchants\n\nAlways refer to merchants as “you.” Don’t speak for merchants with phrases that use “I” or “my.”\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nChange your email address in your Profile.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nChange your email address in My Profile.\n\n</div></div>\n\nIn some cases (such as getting merchant consent or granting permissions) you should refer to merchants as “I.”\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n<p><label><input type="checkbox"> I agree to the terms and conditions</label></p>\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n<p><label><input type="checkbox"> You agree the terms and conditions</label></p>\n </div></div>\n\n### Referring to Shopify\n\nAlways refer to Shopify as “we,” but avoid inserting Shopify into the content as much as possible (except when a human is taking action, such as reviewing a request).\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nPinterest Buyable Pins will be available in the coming weeks.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nWe’re making Pinterest Buyable Pins available in the coming weeks.\n\n</div></div>',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'writing instructions',
      'writing rules',
      'writing guidelines',
      'copy instructions',
      'copy rules',
      'copy guidelines',
      'content instructions',
      'content rules',
      'content guidelines',
      'writing public-facing text',
      'public-facing text',
      'writing public-facing copy',
      'public-facing copy',
      'writing public-facing content',
      'public-facing content',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'ii5kDFAaGDeUiWeY9Kguv',
    title: 'Help content',
    excerpt:
      'Help content is educational text that describes interactive elements or offers information about concepts in the UI.',
    slug: 'help-content',
    parentId: 'AzmHY1ZHqh6iF0nC5TReK',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'cx5GV2Yv9ImYGBjX_yOVV',
        blockType: 'Markdown',
        content:
          'The goal of help content is to teach merchants:\n\n- How to complete a task or make a good decision for their business\n- Important information related to the current workflow\n- How to optimize the way they use Shopify\n\n---\n\n## When to use less, when to use more\n\n​\nThe choice of whether or not to use help content depends on the kind of experience you’re designing.\n\n### Productivity areas\n\n​\nProductivity areas include tasks that merchants do regularly, like adding products and fulfilling orders. These pages are used often and become familiar quickly.\n\nWhen designing productivity experiences, prioritize experienced merchants. This is their space to get work done and we can keep out of their way by offering a clean, streamlined UI. This means minimal help content.\n​\n\n### Educational areas\n\n​\nEducational areas include tasks that merchants do infrequently, like adjusting tax or payments settings. Most of these settings aren’t changed very often, so merchants doing these tasks are often seeing them for the first time.\n\nWhen designing for educational experiences, prioritize merchants who are unfamiliar with the task or workflow. Offer context and guidance to help them make the right decisions for their business. This means making use of help content.\n\n---\n\n## Place help where it’s needed\n\n​\nHelp content belongs as close as possible to the part of the UI it references. If it’s teaching merchants about the purpose of a card, put it at the top of the card as a description. If it’s teaching merchants about a particular field, put it beneath the field as help text.\n\nThe following is an example of help content that was originally a card description, but felt easier to parse after moving closer to the upload actions it helps with.\n\n#### Before\n\n![Before: help text as a card description](/images/before.png)\n\n#### After\n\n![After: help text close to the upload action](/images/after.png)\n\n---\n\n## Avoid a marketing tone\n\n​\nUsing help content to promote new features can erode trust with merchants. Not every feature is the best choice for every merchant at every point in time, and we shouldn’t assume that they want or need it.\n\nThere are times when our motivations and our merchants’ are highly aligned, and encouraging a certain action through help content might be appropriate. An example of this is discounted annual billing. It’s good for Shopify because of the long-term merchant commitment and up-front payment. It’s good for merchants who are long-term committed to Shopify and can pay up front.\n\nThis example also illustrates that there’s still only a subset of merchants that are at the right place to adopt it. Keep this in mind when suggesting how a feature might help someone’s business.\n\n---\n\n## “Learn more” links\n\n​\n“Learn more” links take merchants to the Shopify Help Center for more detailed information than we can offer in the UI.\n\nMake sure “learn more” links go to a Help Center page or heading that’s specific to the topic.\n\nThe Help Center is a rich resource, but for a merchant it’s not always a convenient time to read documentation. Landing on a dense page of information without knowing where to start is frustrating and disorienting. If there isn’t a page or heading specific to the topic you’re providing help for, work with the documentation team to create the right content.\n\n### “Learn more” badges for settings\n\n​\n“Learn more” badges show an information icon that takes you to the Help Center. These are different from tooltips. On large screens, they expand on hover to reveal a “Learn more” link.\n\n![“Learn more” badge interaction pattern](/images/learn-more-badges.png)\n\nUse “learn more” badges:\n​\n\n- Only in settings experiences, and only in card headers\n- When the linked Help Center topic is relevant to the entire card\n\nBest practices:\n\n- Use regular “learn more” links for help topics specific to only a part of a card\n- Some cards benefit from a “learn more” badge in the heading in combination with “learn more” links or other help content in the card body',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['help text', 'learn more', 'help center', 'help'],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: '6Lew3KnU_GIP-jjNpjT8f',
    title: 'Help documentation',
    excerpt:
      'After you build an app or other integration, writing help documentation will show merchants how to use it.',
    slug: 'help-documentation',
    parentId: 'AzmHY1ZHqh6iF0nC5TReK',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'CzfOMuPpZWjgWEBw9E5na',
        blockType: 'Markdown',
        content:
          'These guidelines are based on our experience writing help documentation for the\n[Shopify Help Center](https://help.shopify.com/). They’re all intended to serve the same goal: to educate and empower Shopify merchants.\n\nTo include a link to help documentation in your app or channel, use the\n[Footer help](/components/navigation/footer-help) component.\n\n---\n\n## Plan for your audience\n\nThe way you write your help documentation should change depending on the type of audience and their expectations. Take some time to plan for your audience.\n\n### Audience types\n\nWrite help documentation for its intended audience. For any given document, we can expect a wide spectrum of Shopify users as an audience:\n\n#### Prospective users\n\n- Not signed up yet, possibly on a free trial\n\n#### Novice users\n\n- Signed up but might not have sold online before\n- Possibly not very computer-literate\n- New to Shopify concepts and workflows\n\n#### Experienced, confident users\n\n- Have been using Shopify for some time\n- Familiar with the basic concepts and workflows\n- Confident with computers\n- Able to try some customizations with guidance\n\n#### Highly technical users\n\n- Experienced and confident\n- Extensive computing experience\n- Happy to experiment and take risks\n- Experienced problem-solvers\n- Self serve through forums and help documentation\n\n### Audience expectations\n\nEach of these different users will likely have different expectations for the same document. Let’s take a look at how that might play out:\n\n#### Prospective users\n\n- A quick-start guide\n- Conceptual overviews\n\n#### Novice users\n\n- Lots of hand-holding\n- Clear step-by-step instructions\n- Conceptual overviews\n- Definitions of terms\n- Tutorials\n- Context-sensitive help\n\n#### Experienced, confident users\n\n- Clear step-by-step instructions\n- Conceptual overviews\n- Definitions of terms\n- More challenging tutorials\n- Context-sensitive help\n\n#### Highly technical users\n\n- Procedural instructions (can be to-the-point)\n- Code fragments\n- Pointers to information sources\n\nThis is just one way to imagine the variety of users that fit into our audience.\nHowever we imagine their skill level, our aim for documentation remains the same: to accommodate a wide range of users and their objectives. We can do this by presenting information in a way that’s inclusive of different skill levels, different learning styles, and different workflows.\n\n---\n\n## Use headings to organize your document\n\nReaders come to help documentation with different expectations and in different usage settings. For example:\n\n- One might be working through a long, multi-stage setup process to connect a third-party app into her admin\n- Another might be using her tablet to check out the details of Shopify POS and see if it could be used at her cafe\n- Another might be trying to make a quick edit to his storefront in the half hour he has left before going to pick up his kids from school\n\nIn all these different cases, the reader needs documentation that’s findable, usable, and relevant—in short, organized.\n\n### Effective headings\n\nEffective headings make it clear to readers which sections of a document are most relevant to their current tasks (findability). Headings also provide them with a good sense of progress while they move from one task to the next\n(usability).\n\n### Low-level headings\n\nAs a general rule, the lower a heading is in the doc’s hierarchy, the more flexible you can be with its tone. For example, low-level headings can be longer and more specific, or less formal.\n\n### Heading hierarchy\n\nMaintain the heading hierarchy throughout the doc, and don’t skip heading levels. For example, go directly from H1 to H2, then to H3, and so on. This helps the readers know where they are in the document, whether they’re going through a specific workflow or just scanning.\n\n### Tips\n\nFor page or topic-level headings, use short, gerund (ing-word) based statements.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Creating products from your admin\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Create products from your admin\n\n</div></div>\n\nFor task-based headings within the document, use verb stems / imperatives.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Add a customer\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Adding a customer\n\n</div></div>\n\nAvoid pronouns and articles in headings to keep them short.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Connecting Facebook accounts\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Connecting a Facebook account\n- Connecting your Facebook account\n\n</div></div>\n\nAvoid long strings of nouns in a heading.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Posting products\n- Creating posts\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Creating product posts\n- Creating product post pages\n\n</div></div>\n\nKeep the key descriptors close to the front of a heading so it’s easier to scan quickly. For example, avoid starting the heading with “How to” or “To.”\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Add a product\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- How to add a product\n\n</div></div>\n\nTry to keep parallel grammatical structure between headings of the same level.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Boost a post, Choose an audience, Fulfill an order\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Boost a post, Choosing your audience, How to fulfill your orders\n\n</div></div>\n\nIn most cases, headings should be statements rather than questions. Save question-style headings for FAQs or low-level headings that address specific functions.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Add a product\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- How do I add a product?\n\n</div></div>\n\nUse sentence case for all headings, but no periods at the end. Format and capitalize interface elements or buttons in the way they appear in the Shopify admin.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Adding products to your store\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Adding Products To Your Store.\n\n</div></div>\n\nUse parallel structure in lists, headings, and pretty much everywhere else to encourage comprehension and recall.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Adding products to your store, Deleting products from your store, Editing products in your store\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Add products to your store, How to delete products from your store, Edit a product in your store\n\n</div></div>\n\n---\n\n## Document tasks\n\n### Be task-oriented\n\nMost help documentation is task-oriented: it’s designed to guide readers through the steps they need to follow to complete a task. The best documentation will save readers time by helping them complete their tasks quickly. The way that you present information has a big impact on how useful it will be to your readers.\n\n### Use introductions\n\nIn most cases, a document shouldn’t start with a set of instructions. Instead, offer context with an introductory comment or define a key concept about the topic. Decide what information readers need before they scan the instructions.\nThis is also true for the document’s subsections.\n\n### Use numbered steps\n\nDivide up the instructions in a way that reflects how the reader might think of the task. Use numbered steps for each part of the task. This helps to hold your reader’s attention, and makes it easier for them to switch between a help document and Shopify to complete the task.\n\n### Start at the beginning of a workflow\n\nMake sure that the instructions for major tasks in a longer document can stand alone. If the instructions for a task pick up abruptly where an earlier task left off, then the readers who begin at that point might struggle to figure out the workflow. Start documenting each task at the beginning of the workflow required to complete it.\n\n### Use short lists\n\nIn general, use short lists (either numbered steps or bullets), which are easier to read than long lists. If you have a task or a list that needs more than ten items, then break it up into two or more lists, each with their own subheading.\n\n### Make tasks actionable\n\nTell the user what they can do with your product, not what it can do. This means structuring documentation around user actions rather than product features.\nReaders aren’t there to read a spec: they want to keep their businesses up and running.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Use this feature to keep track of key updates and promotions.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- This feature notifies you about key updates and promotions.\n\n</div></div>\n\nIn general, avoid grouping multiple actions together in a single numbered step.\nEach step should include only one or two user actions.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n1.  From your Shopify admin, click **Products**.\n2.  Click **Add a product**.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n1.  From your Shopify admin, click **Products**, click **Add a product**, and\n    then enter your product information.\n\n</div></div>\n\nAvoid telling the user to “find” or “locate” something in a task.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- In the Pinterest section, click **Remove channel**.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Find the Pinterest section, then click **Remove channel**.\n\n</div></div>\n\nUse the action word “select” when you’re telling the reader to pick something from a set number of choices (like from a list or dropdown menu), and use\n“choose” when you’re telling the reader to make a choice that’s more open-ended\n(like “Choose what kind of store you want to open”).\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- From the **Products** drop-down menu, select the one you want to discount.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- From the **Products** drop-down menu, choose the one you want to discount.\n\n</div></div>\n\nUse consistent phrasing when referring to the reader’s choice. Use the most direct “If you want to” instead of more formal options such as “If you would like to” or “If you wish to.”\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- If you want to add a product, click **Add product**.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- If you’d like to add a product, click **Add product**.\n\n</div></div>\n\nAvoid using “desired” in place of the more direct “want.”\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Select the item you want to add to the order.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Select the desired item to add to the order.\n\n</div></div>\n\n---\n\n## Structure conditional statements\n\nFor conditional cases, start the step with “if” so the reader doesn’t have to read the whole sentence only to find out that the condition does not apply to them. It often helps to add a “then” to help the reader identify the condition and the outcome.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- If you need Z, then click A, B, and C.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Click A, B, and C if you need Z.\n\n</div></div>\n\n---\n\n## Clarify results of actions\n\nShow results of actions in the same step as the task and be clear about where in the flow the reader is.\n\n### Put actions and results in the same step\n\nIf you need to mention the results of a user action, then do it in the same numbered step that describes that action (don’t use a separate numbered step).\nIn general, omit results statements unless the result is surprising or unexpected.\n\n### Mention earlier steps to reinforce order of tasks\n\nYou can refer to an earlier step to reinforce the order of the steps.\n\nFor progress within a series of steps, use the phrase “When you’ve” or “After you’ve.” Avoid using “Once you’ve.”\n\nFor progress between tasks, begin a section with “Now that you’ve” or “After you’ve” (referring back to the previous action or step).\n\n### Use “make sure” and “confirm” for important tasks\n\nWhen asking the reader to confirm something, use:\n\n- “Make sure” in cases where there’s still a related important task (instead of\n  “check that” or “verify that”).\n- “Confirm” in cases where the reader has already been told to do something, and you’re now reminding them.\n\n### Tips\n\nFor instructions, use the command form of the verb.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Click **Refresh** to show your new orders.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Clicking **Refresh** will show your new orders.\n\n</div></div>\n\nLimit the future tense to cases that actually refer to the future.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Choose an end date. After this date, the boosted post will revert to a regular post.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Click **Save**. The price will change when the discount is applied.\n\n</div></div>\n\n---\n\n## Use screenshots for clarity\n\nScreenshots help visual learners understand complex tasks and add context to the tasks you’re documenting. Use them wisely.\n\n### Use screenshots for complex tasks\n\nIn general, don’t use a screenshot to illustrate every step in a task. Instead, save screenshots for places where the interface is complicated.\n\n### Make screenshots with equal margins\n\nWhen highlighting an area of a screenshot, try to show an equal amount of space around the area that you want the reader to focus on.\n\n### Use consistent images in a workflow\n\nTell a story by being consistent with details in screenshots within a document.\nFor example, you could follow a single order and keep the details the same from one screenshot to the next.\n\n---\n\n## Teach through documentation\n\nDocumentation is an opportunity for education. Building context, making instructions clear, and encouraging learning are key.\n\n### Link to next steps\n\nOffer links to the next steps. Choose the next steps based on reader profiles and feedback.\n\n### Encourage learning\n\nEncourage the reader to learn more. Explain the benefits of the feature in the introduction of your document.\n\n### Make the first tasks easier\n\nWhere you can, give the readers “early wins.” Make the first step or two of the task short and easy.\n\n### Build context\n\nConnect the current task to readers’ wider knowledge: other parts of Shopify, the store-building process, and even the business-building process.\n\n### Try not to repeat information on the same page\n\nIn most cases, avoid repeating information on a page. You might need to repeat important points to make sure the reader notices them. For example, you might repeat a warning from the document’s introduction within a set of instructions.\n\n---\n\n## Use the right tone\n\nThink of the context that the reader is in and what they might be feeling and thinking while they’re reading your documentation. This perspective will help you pick what type of tone to apply.\n\n### Instructional tone\n\nMost people don’t want to spend time reading documentation. They want to learn what they need to know, and then move on. The language in documentation needs to be short, to the point, and task-oriented. That doesn’t mean your writing needs to be terse or dry.\n\n### Lighter tone\n\nIn general, you can begin a document using a lighter tone.\n\n### Informal tone\n\nWhen you introduce a task, an informal tone can help draw the reader in, offer context, and encourage the reader to keep going. You can also use a more informal tone when introducing sub-tasks, to give the reader a break from the instructions.\n\n### Direct tone\n\nFor actions and tasks, aim for a much more direct tone. Keep your tone approachable by using contractions (for example _can’t_, _it’s_) to link directions and results.\n\n### Tips\n\nUse contractions.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- After you’ve set up your product, click **Save**.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- After you have set up your product, click **Save**.\n\n</div></div>\n\nAddress the reader or user as “you.”\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- You can add products from the Products page in your Shopify admin.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Products can be added from the Products page in your Shopify admin.\n\n</div></div>\n\nKeep tone in check by avoiding the following:\n\n- Sounding patronizing, chummy, cheery, childish, or otherwise inappropriate in an attempt to seem informal and relatable.\n- Colloquialisms, jokes, sarcasm, jargon, and slang. Avoid anything that’s too culturally specific.\n- Anything that causes the user to pause or hesitate, unless you explicitly want them to.\n\n---\n\n## Use the active voice\n\nUse the active voice as much as possible, which generally sounds less formal than the passive voice. This means writing what merchants do, instead of what is being done by merchants. But in cases where the passive voice sounds more natural than the active voice, use passive voice (like with verbs such as “publish” or “assign” and with nouns like “discount”).\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- After you’ve added a product, click **Save**.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- After the product has been added, **Save** must be clicked.\n\n</div></div>\n\n---\n\n## Improve readability\n\nIt’s important that the sentences you put together flow. Changing things up and knowing when things should be combined or separated will improve prose. Reading sentences that flow helps reader comprehension.\n\n### Avoid choppy writing\n\nUse linking adverbs, conjunctions, and prepositions liberally to avoid choppy writing.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Click the button to open the window.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Click the button. The window opens.\n\n</div></div>\n\n### Change up sentence structures\n\nVary your sentence structure, especially in longer paragraphs. Try not to use more than two phrases with a “To x, do y” structure in a row—this gets repetitive and can cause the reader to lose interest. To break it up, add a short declarative sentence, if possible.\n\n### Break up complicated chunks\n\nUse conjunctions (a word that joins words or groups of words) to break up complicated passages.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'writing instructions',
      'writing guides',
      'writing tutorials',
      "writing how-to's",
      "writing how to's",
      'writing how to',
      'writing step-by-steps',
      'writing step by steps',
      'writing technical documentation',
      'technical documentation',
      'linking to help documentation',
      'linking to technical documentation',
      'educating',
      'teaching',
      'explain apps',
      'describe apps',
      'educate about apps',
      'merchant education',
      'educational opportunity',
      'educational opportunities',
      'explain features',
      'describe feature',
      'educate about features',
      'merchant education',
      'educational opportunity',
      'educational opportunities',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'G9oWGPpYpu6yn1_ODOaIs',
    title: 'Merchant-to-customer content',
    excerpt:
      'Shopify creates content for different audiences. One of those audiences is merchants’ customers. A customer is a person or organization who interacts with a Shopify merchant or a merchant’s sales channel.',
    slug: 'merchant-to-customer',
    parentId: 'AzmHY1ZHqh6iF0nC5TReK',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'izJs5R5EOw-IoZXDOHObJ',
        blockType: 'Markdown',
        content:
          'Merchant-to-customer content represents the merchant, not Shopify, and should optimize the customers’ online or retail store experience.\n\nEvery UX discipline is encouraged to create content at Shopify. Use this guide when you’re writing content that a customer will see on a Shopify store or receive from a merchant.\n\nYou’ll find merchant-to-customer content in places such as:\n\n- Online store checkout pages\n- Shipping update emails\n- Return labels and emails\n- Point of Sale (POS) screens, such as digital receipts and payment errors\n\n---\n\n## What it isn’t\n\nIf you write for multiple audiences, it’s important to note that merchant-to-customer content isn’t:\n\n- Shopify-to-buyer content, such as Shopify Pay or Arrive\n- Shopify-to-merchant content, such as the Shopify admin\n- Shopify-to-world content, such as shopify.com or blog posts\n\n---\n\n## Experience values for customers\n\nShopify has a set of [experience values](https://polaris.shopify.com/foundations/experience-values). The ones to focus on when creating merchant-to-customer content are:\n\n### Considerate\n\nWherever and however a customer uses a Shopify experience (even if they don’t know it’s Shopify), we want it to work for them. The best Shopify experiences work on every screen, on every platform, in every language, and in every country.\n\n### Efficient\n\nShopify experiences help customers achieve goals faster, more accurately, and with less effort. We break complex tasks down into simple steps, use friction to highlight important decisions, and always set expectations about what will happen next.\n\n### Trustworthy\n\nShopify experiences are genuine, always honest, and transparent. We show customers that merchants act in the customer’s best interest. We create communication that strengthens the trust customers have in merchants.\n\n---\n\n## Merchant voice and tone\n\nMerchant voice and tone is customer-focused.\n\nShopify merchants sell everything from physical products, such as eco-sneakers, to digital products, like music downloads. The language they use is very different from store to store. This means that when writing from a merchant perspective, we use a voice that’s appropriate on any store, and for any type of customer. Merchant-to-customer content shouldn’t sound out of place coming from any merchant.\n\n### Human, but not individual\n\nToo much personality is inappropriate for some stores. Customers aren’t going through the purchase experience to admire the witty content. Research shows that the majority of people want content that’s easy to understand and communicates concepts efficiently. Not robotic. Not full of personality. Just clear and straightforward to help them complete their task.\n\nKeep in mind that some content, such as emails, can be personalized by merchants. You’re providing a default for them to work from.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Your payment details couldn’t be verified. Check your card details and try again.\n- All transactions are secure and encrypted.\n- Select the address that matches your card or payment method.\n- Thanks!\n\n  This example is when the customer finishes checkout in person (all other examples are from online checkout).\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- A fatal error occurred.\n\nWhoops! Houston, we have a problem!\n\n- Don’t worry, your details are safe with us!\n- Address must correspond with that held by your payment provider.\n- Thanks for stopping by! or See you again soon!\n\n</div></div>\n\n### Shopping, not ecommerce: use shopper terms\n\nAvoid technical or ecommerce terms. Customers are interested in their order and their delivery, not in inventory and fulfillment. They might want to sign up for news and exclusive offers, but not marketing emails.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Enter your name exactly as it’s written on your card.\n- You’ll get shipping and delivery updates by email.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- There was a server verification error with your payment provider.\n- We’ll inform you when we’ve fulfilled your order.\n\n</div></div>\n\n### Concise, but not short\n\nIt’s important that any purchase flow is efficient. Use short, easy-to-understand words and phrases. For example:\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Use “to”\n- Use “go to”\n- There was a problem with our payments\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Don’t use “in order to”\n- Don’t use “proceed to”\n- No payment gateway is currently configured\n\n</div></div>\n\nBut remember that clear beats short. Don’t use content that can be interpreted in different ways. For example, does “bi-weekly” mean twice a week or every two weeks? It’s clearer to say “Every 2 weeks.” Using more words is okay if it provides clarity.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Every two weeks\n- Getting available shipping rates\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Bi-weekly\n- Loading\n\n</div></div>\n\nNo matter who the audience is, all Shopify content follows the same [grammar and mechanics](https://polaris.shopify.com/content/grammar-and-mechanics) and [product content guidelines](https://polaris.shopify.com/content/product-content).\n\nRead our general [voice and tone guidelines](https://polaris.shopify.com/content/voice-and-tone) to compare how Shopify talks to merchants.\n\n---\n\n## Vocabulary considerations\n\n“Buyer” and “customer” are similar so it’s easy to confuse the use of these terms.\n\nA “buyer” interacts with multiple Shopify stores or has a direct relationship with Shopify, such as through Shopify Pay.\n\nIn contrast, a “customer” is a person or organization who interacts with a Shopify merchant or a merchant’s sales channel.\n\nIn the Shopify admin and Point-of-Sale (POS), a customer appears on the Customers page when they engage with a merchant in an identifiable way. This could be because they:\n\n- were added or imported by the merchant\n- started a purchase but abandoned it at checkout\n- made a purchase\n- create a customer account\n- subscribed to the merchant\'s mailing list\n\nWord usage to use/avoid:\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Use the store name in place of “merchant”\n- Be direct and use “you”\n- Focus on the merchant-to-customer relationship\n- Use “text message” or “message” when writing for North American audiences\n- Use noun + verb phrases for success messages, for example, ”payment sent”\n- There was a problem with our payments\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Merchant (in place of store name)\n- Customer or customer (in place of “you”)\n- Shopify (keep Shopify out of the conversation)\n- SMS\n- Oh happy day! (don’t be over-congratulatory)\n- Wrong, fail, failure, error (avoid sounding robotic or negative)\n\n</div></div>\n\n### Common terms\n\nUse the following terms to refer to common concepts and actions within the merchant-to-customer experience.\n\nNote: all of these terms should be lowercase, unless they\'re a proper noun or the first word in a sentence.\n\n#### cart\n\nThe page that displays an order summary. Customers see this page before they proceed to checkout.\n\n#### checkout\n\nThe customer experience for paying for items and completing an order.\n\n#### delivery\n\nHow an order reaches the customer. Delivery covers more than just shipping. For example, customers can choose whether the order is shipped to their delivery address or picked up in-store.\n\n#### discount code\n\nA dollar amount, percentage, or code that dictates how much a product will be reduced in price.\n\n#### duties\n\nAdditional costs that may be incurred on orders that are delivered internationally. Duties may be incorporated into the shipping cost.\n\n#### gift card\n\nA type of product with monetary value that merchants can either sell to customers or issue to them as a gift, reward, or incentive.\n\n#### item\n\nOne unit of a product on an order.\n\n#### login\n\nThe credentials that a customer uses to access their account.\n\n#### order\n\nThe term for a purchase. Don’t say package, or add unnecessary words like sales order.\n\n#### payment\n\nDescribes a specific way a customer can pay such as Visa, MasterCard, or Apple Pay.\n\n#### pay now\n\nThis text is displayed on Call To Action (CTA) buttons that trigger a payment. On free orders, this is replaced with “Complete order”.\n\n#### pickup\n\nA delivery option where customers physically collect an order.\n\n#### return\n\nA transaction where a customer sends a product back to the store for an exchange or refund. A refund is part of a return.\n\n#### refund\n\nThe funds that a customer receives from a merchant, for example, when returning an item.\n\n#### shipping\n\nHow a merchant sends an order to a customer. Also known as the shipping method.\n\n#### subtotal\n\nThe cost of the items on an order before additional charges, such as tax and shipping.\n\n#### total\n\nThe cost of the items on an order after additional charges such as tax and shipping.\n\n#### you\n\nA way of referring to the customer that\'s checking out. Use you, or use the name that the customer has provided.\n\n#### we\n\nA way of referring to the store name. Most of the time, refer to the store by name. However, you can use “we” when using the store name would sound overly wordy or insincere.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'merchant to buyer',
      'buyer',
      'shopper',
      'buyer voice and tone',
      'customer voice and tone',
      'writing for checkout',
      'checkout',
      'check out',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'rQmpLhvk68ghch5hgCs2E',
    title: 'Naming',
    excerpt:
      'The names we give our products and features teach merchants how to use Shopify and how to find the things they need to run their business.',
    slug: 'naming',
    parentId: 'AzmHY1ZHqh6iF0nC5TReK',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'TTPGH-yJZO0dUcmLLzujO',
        blockType: 'Markdown',
        content:
          '## Thoughtful naming\n\nNames influence how merchants and other audiences perceive and understand\nShopify. A well-chosen name will:\n\n- Put clarity above creativity\n- Help establish a mental model for our audiences\n- Enhance people’s perception of our brand\n- Increase adoption of the product or feature\n- Differentiate Shopify from other products\n- Clarify where a product or feature fits into our brand system\n\nThe naming process involves collaboration. Include different disciplines and people with different subject matter expertise in the creation of a name.\n\n---\n\n## Does it need a branded name?\n\nMost features don’t need an official, branded name. For example, order entry is\na feature that’s referred to descriptively and so doesn’t need to be capitalized. When choosing what to call a feature, pick words that describe what the feature does or represents. If there’s room, add extra context for merchants by describing the feature instead of using only the feature name.\n\nAvoid capitalizing descriptive feature names.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Order entry\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Order Entry\n\n</div></div>\n\nIf there‘s room, describe the feature instead of defaulting to only using the name.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Display carrier calculated shipping rates to your customers at checkout.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Display carrier calculated shipping rates.\n\n</div></div>\n\n### Using “Shopify”\n\nOnly Shopify can use the word “Shopify” in a name. The word “Shopify” can’t be used to name third-party products.\n\nIt’s important we use the word “Shopify” consistently, and sparingly. Don’t use\n“Shopify” in a name unless there’s a lack of surrounding context and we want its target audience to know it’s associated with Shopify.\n\nAdding “Shopify” doesn’t add clarity in the context of other Shopify products and features. For example, merchants often confuse Shopify Shipping with the other shipping features, like shipping settings, carrier calculated shipping rates, shipping labels, and shipping zones. Our support staff have to refer to the Shopify Plan by its cost because the general name doesn’t distinguish it from the other plans.\n\nUse “Shopify” in front of a name when a product:\n\n- Is or will become a separate product or platform and we need to associate it with Shopify\n- Should be differentiated from other, similar products in the industry\n- Doesn’t justify an [evocative name](/content/naming#descriptive-vs-evocative-names), but still needs to associated with Shopify\n\nDon’t use “Shopify” in a name for built in functionality features, like fraud analysis or importing products.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Shopify Payments\n- Shopify App Store\n- Shopify Theme Store\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Shopify Analytics\n- Shopify Discounts\n- Shopify Account\n\n</div></div>\n\nShopify makes apps that merchants can add to their Shopify admin. It’s okay to say “Built by Shopify” or “Made by Shopify” after the app name. Once you’ve picked the format that works for the design, use it consistently.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- _Shopify_ Product Reviews\n- _Shopify_ Order Printer\n- _Shopify_ Shopcodes\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Product Reviews\n- Order Printer\n- Shopcodes\n\n</div></div>\n\nApps that aren’t built by Shopify should not use the word “Shopify” in their name or say “for Shopify” after the name.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- AdSpace\n- Email Marketing\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- AdSpace for Shopify\n- Email Marketing for Shopify\n\n</div></div>\n\n---\n\n## Descriptive vs evocative names\n\nThere are two types of approaches to naming, the descriptive approach, or the evocative approach. Descriptive names are concrete, while evocative can be more abstract. Descriptive names are merchant friendly, and the most common. Features should always have descriptive names. Standalone products that require independent branding can use evocative names. Third-party apps and channels should have their own branded names and should never use the word “Shopify” in the name.\n\nIf you’re a Shopify employee and are looking to trademark an evocative name, ask the legal department for help.\n\n### Descriptive names\n\nFeatures and products connected to Shopify’s main product offering should have names that reveal something about their purpose. Avoid jargon and make sure the name you pick won’t get confused with similar names or terms.\n\nReserve evocative naming conventions for standalone products like Kit, and Frenzy.\n\nDescriptive names should:\n\n- Describe the experiences they represent\n- Fit into the information architecture of the product\n- Use merchant-friendly terms, not industry standard terms\n- Make sense in marketing materials\n- Align with brand\n\nIf it’s a default feature (merchants don’t have to sign up or opt in to use it), don’t [capitalize](/content/naming#general-guidelines) it.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Shopify Capital\n- fraud analysis\n- Use analytics to review your store’s transactions\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Shopify capital\n- Fraud Analysis\n- Use Analytics to review your store’s transactions\n\n</div></div>\n\nAvoid jargon and give merchants a hint about the actions they’ll be able to take when they interact with the product or feature.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Shopify Help Center\n- Shopify Theme Store\n- discounts\n- Logo maker\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Shopify Help Documentation\n- Configuration app\n- Shipity-do-dah\n\n</div></div>\n\n### Evocative names\n\nStandalone products use evocative names to position us in the industry. These unique and bold naming conventions can help with branding or recall, but don’t always help people understand the experience. They’re better for standalone products, and not for experiences that are part of Shopify’s main product offering.\n\nSometimes Shopify acquires a product or service that already has a unique, branded name. Even though it may become more tied to Shopify, it can keep its name to maintain its brand identity. This also helps maintain the context audiences already have about the product, like in the case of Kit.\n\nCertain standalone names use the word “Shopify” because it differentiates the product from similar ones in the industry, like Shopify Pay in comparison to\nApple Pay, or Android Pay. For more details, see the\n[guidelines for using “Shopify” in a name](/content/naming#does-it-need-a-branded-name-).\n\nEvocative names should:\n\n- Have a strong, independent brand identity\n- Help with branding or recall\n- Reflect the concept it represents\n- Make sense when used in marketing materials\n\nIf you work at Shopify and want to trademark a name, talk to the legal department. It’s easier to trademark unique or made-up name. These names have stronger identities, but it’s not always clear what they do.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Frenzy\n- Kit\n- Oberlo\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Flash sales app\n- The Marketing Bot\n- Drop Shipping app\n\n</div></div>\n\nSome evocative names can be more descriptive, although they’re harder to trademark if they use common terminology. Not all evocative names need to be trademarked.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Burst\n- Shop Class\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Free Stock Photography\n- Learn about Shopify event\n\n</div></div>\n\nIf you’re creating a website or product for an existing brand, maintain its brand identity and keep “Shopify” out of the name.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Kylie Jenner Pop-up Shop\n- Kylie _Powered by Shopify_\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Shopify Pop-up, featuring Kylie Jenner\n\n</div></div>\n\n---\n\n## Shopify products and features\n\nAn off-brand and unclear name can confuse your audience. It can also feel disconnected from the rest of Shopify.\n\nA good product or feature name should:\n\n- Help merchants understand what the experience represents\n- Fit into the information architecture of the product or website in which it belongs\n- Make sense when compared to other products, features, websites, or events in the same market\n- Avoid any negative or weird connotations\n\nThere are two types of approaches to naming, the\n[descriptive approach, or the evocative approach](/content/naming#descriptive-vs-evocative-names).\n\n### Referring to Shopify and areas in the admin\n\nUse consistent and easy to understand descriptions when referring to locations in product, especially in [help documentation](/content/help-documentation#navigation). Descriptive feature names aren’t [capitalized](/content/naming#general-guidelines), but when providing steps in a workflow, it’s okay to capitalize the page name, for example, “Go to the Products page”. Note that the page name is capitalized, but “page” isn’t.\n\nWhen referring to Shopify’s main product offering, use “Shopify”. The only exception is when you need to differentiate it from another product, like the mobile app, or explain a task specific to the admin. In these cases, you can use “Shopify admin”.\n\nA good description can:\n\n- Help establish a mental model for merchants\n- Clarify where the area fits into the product system\n- Help support staff and merchants understand each other when communicating\n\nA good description should:\n\n- Avoid jargon\n- Be used consistently\n- Describe the area it represents\n- Prioritize terminology used by merchants over industry standards\n\nUse consistent descriptions when referring to areas in the Shopify admin.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- The customer list is found on the Customers page.\n- When a new customer places an order with your store, their name and information are automatically added to your customer list.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Manage customers in Customers.\n- Customer information is automatically added to Customers in the Shopify admin.\n\n</div></div>\n\nMerchants call our main product offering “Shopify”, so we use that same terminology. terminology\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Use “Shopify” when talking about our main product offering\n- Use “Shopify admin” if you need to differentiate it from the mobile app\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Don’t use “admin” or “Shopify admin” if “Shopify” will do\n\n</div></div>\n\nTop-level marketing content is created for audiences who have little context about Shopify. Since they may not know about specific Shopify products, we use\n“Shopify” here too.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Run your business using Shopify\n- Print shipping labels directly through Shopify\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Use our ecommerce platform\n- Print shipping labels directly through Shopify’s admin\n\n</div></div>\n\n### Using “app” and “channel”\n\nFor app names in areas with surrounding context, like in the app store or on the\nApps page in the Shopify admin, don’t add the word “app” to the end of the name.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Oberlo\n- Script Editor\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Oberlo app\n- Script Editor app\n\n</div></div>\n\nFor app names without surrounding context, like in search in the Shopify admin, or on a home card, add “app” so merchants know what it is.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Bulk Account Order app\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Bulk Account Order\n\n</div></div>\n\nWhen writing about channels, make it clear to merchants that they are interacting with\na channel through Shopify, and not through the other company.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- The Amazon channel now supports electronics listings\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Amazon now supports electronics listings\n\n</div></div>\n\nIf “channel” is used somewhere in surrounding content, it’s okay to drop it for titles and button copy. titles\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Add Amazon\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Add Amazon channel\n\n</div></div>\n\nNot every channel is a sales channel. For example, BuzzFeed is a marketing outreach channel and Facebook is a sales and marketing channel. Clarify channel types when you have room, otherwise default to channel. If there’s surrounding context, you can drop channel altogether.\n\nIf there’s surrounding context, drop the word channel from the name.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Google Shopping\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Google Shopping channel\n\n</div></div>\n\nIf there’s room for a description, explain the channel type.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Use BuzzFeed’s marketing outreach channel to get more customers.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Use the BuzzFeed channel to get more customers.\n\n</div></div>\n\n---\n\n## General guidelines\n\nIn general, capitalize evocative names and don’t capitalize feature names. Avoid acronyms, and think about how your audience will interpret a name.\n\n### Capitalization\n\nDon’t capitalize default features. Default features are built into Shopify and merchants don’t have to sign up, add, or opt in to use them. Analytics and discounts are examples of default features.\n\nCapitalizing names should only happen:\n\n- For independently branded,\n  [evocative names](/content/naming#descriptive-vs-evocative-names)\n- When we want to try and claim specific words (think Tweet or Pin)\n- For names listed in top level navigation, like Products\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Shopify Hardware Store\n- Shopify Theme Store\n- Black Friday Cyber Monday (BFCM)\n- Retail Package\n- Buy Button\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Shopify hardware store\n- Shopify theme store\n- Black friday cyber monday (bfcm)\n- Retail package\n- Buy button\n\n</div></div>\n\nNames shouldn’t be capitalized if they:\n\n- Are [descriptive](/content/naming#descriptive-vs-evocative-names)\n- Include common, familiar words\n- Are default features\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- analytics\n- fraud analysis\n- online store\n- themes\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Shopify Analytics\n- Fraud Analysis\n- Online Store\n- Themes\n\n</div></div>\n\n### Acronyms and abbreviations\n\nAn acronym is a word formed from parts of an existing compound term. For example, “rich text editor” could be written as “RTE”. An abbreviation is a shortened form of a written word or phrase used in place of the whole word or phrase. “Amt” is an abbreviation for “amount”.\n\nOur stance on acronyms:\n\n- Avoid creating acronyms.\n- Acronyms take longer to understand and might reduce adoption of a product, feature, or concept.\n- Acronyms are like inside jokes—people who understand the acronym feel included in the meaning, but people who don’t feel left out and confused.\n- If you have to use an acronym, spell it out the first time you use it and follow with the acronym in brackets.\n- Internationally understood acronyms and abbreviations are acceptable, like the word “app” or “SEO”.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Rich text editor\n- Multi label printing\n- Merchant Success Manager\n- Virtual reality\n- Build a Bigger Business\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- RTE\n- MLP\n- MSM\n- VR\n- BABB\n\n</div></div>\n\nAvoid using Internet slang acronyms in Shopify products and when creating new, branded names. These acronyms are exclusive to certain online communities and branded approachable for everyday merchants.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Shop Class\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Shopify IRL\n\n</div></div>\n\nInternationally understood acronyms and abbreviations are acceptable. Some of these include time zone, tax, barcode, weight, and size abbreviations.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- SEO\n- NZDT\n- SMS\n- QR codes\n- HST\n- CVV\n- SKU\n- ISBN\n- UPC\n- GTIN\n- USD\n- 1 kg\n- 2 lbs\n- App\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Search engine optimization\n- New Zealand Daylight Time\n- Short messaging service\n- Quick response codes\n- Harmonized sales tax\n- Card verification value\n- Stock keeping unit\n- International standard book number\n- Universal product code\n- Global trade item number\n- United States Dollar\n- Kilogram\n- 2 pounds\n- Application\n\n</div></div>\n\nWhen using a country as an adjective (such as when referring to currency), you may use an abbreviated form without punctuation.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Pinterest requires your store to use US currency.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Pinterest requires your store to use United States currency.\n\n</div></div>\n\n### Similar names\n\nBeing an ecommerce platform has its naming challenges. For example, a lot of feature names could include the word “shipping” or “pay”. Think merchant-first and be descriptive to differentiate the name. Picture what it’s like to have conversations with merchants about similar names like Shopify Payments and conversationsor around our pricing plans to identify names that might be confusing. confusingming a new product or feature:\n\n- Conduct an audit of existing names to narrow down your naming choices\n- Ask the support team to see if they think it’ll conflict with another name\n- Draft a test conversation around similar sounding names\n\n### Localization and translation\n\nNames may not translate directly to other languages. Identify if you need to create a separate name, or if a direct translation will do.\n\nBefore confirming a name, check with people who work in translation and localization to find out if:\n\n- There are cultural considerations\n- A different name for a different location would have a positive impact for brand\n\nSome already existing names are different depending where you’re from. For example, in North America, people say, “I’ll send you a text.” In India and Nordic countries, people say, “I’ll SMS you.” Do your research and find out what people call things in everyday conversations.\n\nUse “text message” when writing for North American audiences.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- text message\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- SMS\n\n</div></div>\n\nUse SMS when writing for Indian and Nordic audiences.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- SMS\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- text message\n\n</div></div>\n\n### Initials\n\nIn languages that use logographic characters, like Japanese, name initials can have different meanings. For example, in Japanese a name like Chikako (周子) Ishikawa (石川) means “neighborhood stone” (周石) in initials. Check with the localization and translation team before writing something in short form in another language.\n\n#### Avoiding negative connotations\n\nSome words or terms have unintended negative connotations for some audiences. Do some research to avoid associating offensive words or phrases with your product or feature name.\n\nStart by:\n\n- Getting people outside of your team to look at the name with a new perspective\n- Doing a Google search to see if it surfaces with another meaning\n\n---\n\n## Components\n\nBe strategic and consistent when naming [components](/components). It makes it easier to create and build products and features for Shopify when people can switch between implementations and see the same names represented throughout. For example, we should use the same name across Rails, React, and Figma. It’s okay if each implementation has its own spelling convention. For example, “Account connection” in documentation and in Figma layer names, but “ui_account_connection” in Rails, and “AccountConnection” in React.\n\nA good component name can:\n\n- Increase adoption of a component\n- Clarify where a component fits into our system\n- Help establish a mental model for people using the components\n\nComponent names in documentation should:\n\n- Describe the functionality they represent\n- Avoid jargon so different disciplines understand its function\n- Be written in singular, not plural, format\n\nIn documentation we write out the name without any punctuation and use sentence case, meaning, the first word is capitalized and the rest is lowercase.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Type scale\n- Empty state\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- TypeScale\n- EmptyState\n\n</div></div>\n\nIn code, we use the same name as the documentation, but can alter the spelling convention to suit the implementation.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- TypeScale\n- EmptyState\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Type scale\n- Empty state\n\n</div></div>\n\nFor subcomponents, the same rules apply. In documentation, write out the name with a space between words, and use sentence case. with\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Layout section\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Layout.Section\n\n</div></div>\n\nFor subcomponents in the code, use a period in place of the space.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Layout.Section\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Layout section\n\n</div></div>\n\nFor all components, use American spelling:\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Layout.Center\n- Palette.Color\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Layout.Centre\n- Palette.Colour\n\n</div></div>\n\nThere is an exception: the Labelled component uses the British spelling, following the `aria-labelledby` attribute as per the [ARIA specification](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby) itself.\n\n---\n\n## Icons\n\nIcons should be named consistently so they’re easy to find and implement across\nShopify.\n\nOverall, icon names should:\n\n- Represent the intended function of the icon\n- Avoid jargon so different disciplines understand its function\n\nProduct area icons should:\n\n- Only be used to symbolize their specific product area or function\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Home\n- Orders\n- Products\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- House\n- Invoice\n- Price tag\n\n</div></div>\n\nFunctional icons not tied to product areas should represent a clear action.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Add image\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Image\n\n</div></div>\n\nIcons with more than one function should be named to:\n\n- Represent their purpose\n- Describe how they look\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Circle alert\n- Camera\n- Clock\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Alert\n- Photography\n- Time\n\n</div></div>',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'names',
      'caps',
      'capitalizations',
      'capitalizing',
      'how to name',
      'naming at Shopify',
      'naming guidelines',
      'picking a name',
      'product naming',
      'feature naming',
      'website naming',
      'event naming',
      'trademarked names',
      'trademarks',
      'branded names',
      'capitalized names',
      'abbreviation',
      'acronym',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'hlARb01FayU1wOC_XNVI2',
    title: 'Product content',
    excerpt:
      'Thoughtful, consistent interface content is a core element of a well-designed user experience.',
    slug: 'product-content',
    parentId: 'AzmHY1ZHqh6iF0nC5TReK',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'pYg0GvzF8PuqEvt847D3n',
        blockType: 'Markdown',
        content:
          'Our content standards will help you understand how to think strategically about the language in your products and apps. They’ll also give you clear, tactical suggestions designed to help you use language to craft better experiences.\n\n[Each component](/components) also includes content guidelines about how to write for specific interface elements.\n\n## Respond to merchant needs\n\nNot everyone is a confident writer, but everyone can improve their content by making sure it responds to the needs of their audience. Keep in mind that real people rely on Shopify every day to run their businesses. The product, feature, or app you’re building can make a big difference to the people using it. Take some time to learn about who they are, what they need, and the language they use.\n\n- Only use industry-standard terminology when you have reason to believe it will improve understanding. Spend time researching what words people use, rather than defaulting to what corporations call things.\n- Edit unnecessary or repeated words.\n- Write for small screens first. Constraints can help you focus on the most important message.\n- Read your content out loud. If you get tripped up or it doesn’t sound like something a human would say, your content needs to be edited.\n\n---\n\n## Encourage action\n\nPeople use Shopify to get things done, whether they’re managing a store, or making a purchase. Content should be written and structured to help the reader understand and take the most important actions.\n\n### Tips\n\n- Calls to action on buttons and links should start with a strong verb that describes the action a person will take when they click.\n- Always prioritize the most important information and task — don’t make people dig to find what they care about. toBreak down complicated tasks into steps that help people focus on one thing at a time.\n- Use the [active voice](/content/grammar-and-mechanics#basics) to clarify the subject and the action.\n\n---\n\n## Be consistent\n\nTo help your audience understand key concepts and actions they can take, use consistent nouns (words used to identify people, places, or things) and verbs\n(action words) wherever possible.\n\n### Tips\n\n- Get in the habit of making a list of all the most important verbs and nouns in the experience you’re building.\n- Look at your word list. Does each word clearly describe the object or action it represents in the simplest way possible?\n- Does your language reflect how people think and the words they use?\n- Identify synonyms (a word or phrase that means exactly or nearly the same as another word or phrase in the same language), and eliminate them. Each important object and action should have a single word to represent it.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'content standards',
      'content guidelines',
      'content strategy practices',
      'interface content',
      'strategic language',
      'edit content',
      'editing content',
      'reading level',
      'writes',
      'writing',
      'writing tips',
      'language tips',
      'content tips',
      'designing',
      'strategic designing',
      'action',
      'consistency',
      'consistent',
      'writing public-facing text',
      'public-facing text',
      'writing public-facing copy',
      'public-facing copy',
      'writing public-facing content',
      'public-facing content',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'TwfVYMBZ_m-4voRd25935',
    title: 'Voice and tone',
    excerpt:
      'Learn how to apply Shopify’s voice and choose the right tone, no matter what product, feature, or app you’re building.',
    slug: 'voice-and-tone',
    parentId: 'AzmHY1ZHqh6iF0nC5TReK',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'kcW6pfjR0qSWSeBrhZLmg',
        blockType: 'Markdown',
        content:
          '## What are voice and tone?\n\nShopify’s voice is a reflection of who we are. We should always sound like\nShopify.\n\nAt the same time, some aspects of our personality might be more or less apparent, depending on the audience and their context. That’s tone.\n\n---\n\n## Shopify’s voice\n\nOur voice is a reflection of who we are. So who are we?\n\n**Simply put, we’re a company, built by real people who understand this business and care about helping others succeed.**\n\n**That should be clear every time someone uses our products or services.**\n\nMost often, we show this through well-crafted tools that help people get their jobs done efficiently. But there are times when our personalities and perspectives should be more apparent. In those times, we should adapt our tone to respond to people in an appropriate and meaningful way.\n\nYou\'ll find more specific guidelines on how to adapt your tone to different situations in this guide.\n\n---\n\n## Voice guidelines\n\nAs Shopify’s voice, we should always:\n\n### Be real, but not too tough or overly familiar\n\n- Use business casual language—be plain-spoken, not pretentious or overly playful\n- Be upfront and honest with merchants, even if we make a mistake\n- Communicate with clarity and empathy—be direct, not insensitive\n\n### Be proactive, but not needy or pushy\n\n- Offer merchants sincere encouragement and practical advice\n- Clearly explain how merchants are impacted when something goes wrong, but don’t overexplain with redundant content\n\n### Be dynamic, but not scattered or impulsive\n\n- Communicate in a way that respects merchant emotion and context\n- Avoid words that generalize success like “every,” “all,” and “most”\n- Use language that supports action, movement, and progress\n\n### Guide, but don’t handhold or prescribe\n\n- Use expertise to help merchants succeed; don’t talk down to them\n- Be specific when explaining benefits without making things sound better than they are\n- Teach people the “why” and “how” behind actions—don’t just tell them to do something\n\n---\n\n## Adapting tone by situation\n\nOur tone adapts to the context. We’ll use certain voice attributes more or less based on the situation.\n\nOften people frame tone guidance around adapting to the emotional state of the audience. The reality is we never know a person’s emotional state. Even when things seem the most positive, we can’t be sure.\n\nWhile it’s helpful to consider how your audience is likely to feel, don’t assume or tell them how to feel. Instead, focus on the specifics of the situation and less on the emotions. Here are some of the most common situations to consider.\n\n### Everyday tasks and activities\n\nWhen everything is working as it should, our goal is to give people what they need to get work done, without getting in the way or drawing attention to ourselves. We want the audience to know what something is or that something has happened as expected.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nLook for the simplest way to communicate information—words aren’t always necessary.\n\n![Images showing icons of an eye representing a “view” action, a picture frame representing the concept of "images" and a spyglass representing the action of "search".](/images/view-icon@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nUse overly complicated or intimidating language.\n\n![Image showing a toggle switch on a card labeled “Use Biometrics for Authentication”](/images/biometrics-toggle-card@2x.png)\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nBe consistent for identical actions or destinations when possible.\n\n- _Delete product_\n- _Delete collection_\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nAdd extra text just to fill space.\n\n![Image showing a text field for notes labeled “Add a note” followed by an ellipsis](/images/add-note-field@2x.png)\n\n</div></div>\n\n### Learning and education\n\nSometimes it helps to give more explanation or education. In these situations, we want to make sure people feel confident in their actions and in our capabilities.\n\nSome people will want to be guided step-by-step through the process, while others may just want to try it out and learn on their own. Look for ways to give them both options.\n\nRemember, they may have sought this out specifically or we may have recommended it to them, so don’t assume that they want or need to use it.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nHelp people understand why they should do something, not just how.\n\n![A home card suggesting to add a shipping policy to your store to build trust with customers](/images/shipping-policy-card@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nOversell or overpromise.\n\n_Create a new campaign and you could double your sales this holiday season._\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nBreak down complicated tasks into steps that help people focus on one thing at a time.\n\n![A home card with separate tabs for adding a product, customizing a theme, and adding a domain](/images/onboarding-tasks@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nBe overly prescriptive about how someone should use a feature.\n\n_You need to add at least 10 products before opening your store._\n\n</div></div>\n\n### Simple errors\n\nWhile we do our best to be proactive and protect against unexpected events, they still happen. These are often simple mistakes or roadblocks to action that can easily be fixed. Although they aren’t necessarily errors or problems, they can feel that way at first.\n\nIn this case, our job is to help people understand what happened so that they can get back to work as quickly as possible\n\nRead the [error message guidelines](https://polaris.shopify.com/patterns/error-messages) for more detailed guidance.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nClearly explain the situation and how it can be resolved.\n\n_Product weight needs to be positive. Change the product weight to be greater than or equal to 0 and try again._\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nUse overly dramatic or scary words for simple errors.\n\n_Bad request, forbidden, fatal, expectation failed, unresolved, invalid_\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nLook for ways to help people resolve problems automatically.\n\n![An email input form element with a typo in the inputted email address and a hint text underneath it guiding the user to fix the typo.](/images/email-error-message@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nUse error numbers or code unless they’re easily recognizable by people and help them solve the problem.\n\n![Error modal with a confusing error code stating “200 OK”](/images/channel-not-found-error@2x.png)\n\n</div></div>\n\n### Acknowledging effort, progress, or completion\n\nThere are situations where we want to acknowledge that someone completed a complex activity or difficult task.\n\nWhile we don’t need to celebrate the accomplishment, we should recognize that they put in the time and effort. Depending on the level of effort, these may be simple confirmations or more active recognition that they completed something difficult.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nIf this is a task people do regularly, make it clear that the step is complete in a simple and non-intrusive way, like a [toast](/components/feedback-indicators/toast). Consider ways to confirm completion without words or messaging.\n\n_Product saved_\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nAssume people are excited or celebrating. They may be annoyed if it was a particularly long process or if the immediate benefits aren’t clear.\n\n_Congrats! You set up your single login for Shopify._\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nIf the task was something we initiated or required, thank them for their time.\n\n_Thanks for taking the time to share your feedback._\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nRefer to simple actions or completed steps as “successes.”\n\n_You successfully added a product._\n\n</div></div>\n\n### Motivate or encourage action\n\nThese are situations when we want to keep people moving along a desired path. In most cases, we do that with direct information and clear steps to encourage action.\n\nWe don’t want to be too overzealous or action-driven here—it’s more about helping people understand the next step and giving them the context they need to take it.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nHelp people understand what the next steps are and why they should take them.\n\n_Your email address is connected to 8 accounts. Set up a single login to switch between stores faster and log in less often._\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nAssume the next step or outcome is guaranteed.\n\n_You’re just a few steps away from receiving your first order._\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nProvide guidance to help people understand if the decision is right for them.\n\n_Based on your type of business, this is the POS hardware we recommend:._\n\n</div></div>\n\n### Serious problems or errors\n\nThere are times when we need to share bad news. This might be an outage or an error, or it may be a product that we’re no longer supporting. These are hopefully rare situations, but they will happen.\n\nIn this case, there’s a serious risk of damaging trust and hurting our relationship with the audience, so we should be very careful about how we communicate.\n\nRead the [error message guidelines](https://polaris.shopify.com/patterns/error-messages) for more detailed guidance.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nExplain the impact on their business clearly, without using confusing or scary language.\n\n_Some of today’s sales data hasn’t been updated yet. This will be fixed shortly. Your data is safe, and your sales are not affected._\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nAsk merchants to trust us without providing data or context.\n\n_Today’s sales data might not be accurate, but don’t worry—it’s just temporary._\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nApologize and empathize when we’re at fault, but within reason.\n\n_All systems are now fully operational. We recognize and apologize for the stress, concern, and impact this outage had on your business. In the coming days we will be working to fully understand how this widespread internet infrastructure failure affected our platform._\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nProvide clear steps to resolve issues. If there’s no solution, be direct about what that means for the merchant and what we’re doing about it.\n\n_Your Shopify Payments account is on hold. Please attach your State Tax Exemption Certificate for review._\n\n</div></div>\n\n### Announcing new features and updates\n\nIt’s exciting to launch a new feature or update, but always consider the audience’s perspective first. While we may be excited about the benefits and capabilities, change can be intimidating or annoying for users.\n\nWhen you’re announcing something new, focus on educating and explaining what it is, what it’s used for, and what the user can expect.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nPitch our product by explaining the specific merchant benefits.\n\n_**Introducing the new Buy Button**_\n\n_Make it your own with custom fonts, colors, and styles. It also loads 50% faster so your visitors won’t miss it._\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nJust talk about ourselves and assume the experience for merchants will be easy.\n\n_**Get Shopify’s new Buy Button**_\n\n_It’s never been easier to customize the fonts, colors, and styles of Buy Buttons. It’s also twice as fast._\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nIf possible, let users dismiss announcements or postpone changes until they’re ready.\n\n![A modal with a secondary button option to “remind me later” for a “single login” feature.](/images/remind-later-button@2x.png)\n\n</div></div>\n\n### Celebrations and congratulations\n\nThere are occasionally times when we want to celebrate an event or milestone, or to congratulate someone for an important accomplishment. In reality, this should be one of the least common situations we encounter.\n\nLet audiences know that we understand that it’s an important moment and we’re excited for them, but be careful not to take credit for it. Even if we played a role in their success, this isn’t about us.\n\nRemember, this is about celebrating their accomplishments, not ours. Launching something new? You probably don’t need to celebrate with them. Read our guidance around [announcing new features and updates](#announcing-features).\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nOnly celebrate truly important or monumental situations when the audience likely feels proud, excited, or satisfied.\n\n_Your store is 1 year old today! Here’s to many more._\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nCelebrate completing tasks or processes that people don’t actually want to celebrate. Did they finish something difficult or do something for us? You may want to acknowledge their effort instead.\n\n_You set up your payment providers, congrats!_\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nExpress genuine happiness for merchants. Recognize their accomplishment and congratulate them on a job well done.\n\n_You launched your store! Nice work._\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nTake credit for merchants’ successes or presume to know what they need.\n\n_We did it! Congrats on your first sale._\n\n</div></div>',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'sound like Shopify',
      'personality of Shopify',
      'brand personality',
      'empathy',
      'merchant feelings',
      'merchant emotions',
      'merchant context',
      'content voice',
      'content tone',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'uTmCRDruRrPhRC5znYacy',
    title: 'Contributing to Polaris',
    excerpt:
      'Polaris exists to make a product worked on by many, feel like it was created by one person. The design system needs to stay in sync with new solutions so merchants always have a seamless experience. This is why Polaris thrives on contribution and community support.',
    slug: 'contributing',
    parentId: null,
    order: 9,
    layout: 'blocks',
    blocks: [
      {
        id: 'gsgSWJYJRMHY0BZqlMIcL',
        blockType: 'Markdown',
        content:
          'Anyone, regardless of discipline, is encouraged to contribute. No contribution is too small. We welcome everything from bug fixes or new components, to new UX guidelines. So if you find something to contribute, we hope you feel empowered to go for it. The Polaris team is here to help you along the way.\n\n## Who can contribute\n\nContribution to Polaris looks different depending on whether you work at Shopify. Shopify employees can contribute to any Polaris project, including the Figma UI Kit. Open source contributions are welcome for [Polaris React components](/contributing/components) and their [documentation](/contributing/documentation).\n\n## When to contribute\n\nContributions can seem intimidating, but they don’t have to be! Here are some common scenarios for deciding when to contribute:\n\n| Use the system                                                               | Extend the system                                                                       | Build a custom solution                                                                         |     |     |\n| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | --- | --- |\n| _When available resources can solve a design problem_                        | _When a change or addition can solve a shared problem_                                  | _When a unique problem requires a unique solution_                                              |     |     |\n| Read [ Designing with a system ](/contributing/designing-with-a-system)      | Read [ When to contribute new patterns ](/contributing/when-to-contribute-new-patterns) | Share ideas in [ #admin-ux ](https://shopify.slack.com/archives/C039ZAKQ5AA)(Shopify employees) |     |     |\n| [ Review App Design Guidelines ](https://shopify.dev/apps/design-guidelines) | [ Create GitHub issue ](https://github.com/Shopify/polaris/issues/new/choose)           | Build with Polaris [ tokens ](https://polaris.shopify.com/tokens/colors)                        |     |     |\n\n## What makes a good contribution\n\nBy sticking to a few principles, we can ensure that all contributions made to Polaris are of high quality, meaningful work for Shopify teams and contributors, and valuable to merchants.\n\n| Preparing contributions                                                                                                                                                                                                                                                                                            | Submitting contributions                                                                                                                                                                                                                                                                                                                                                                                                                                 |\n| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| **🧠 Keep the merchant in mind** <br>Polaris is for building merchant admin experiences. If the value to merchants isn’t clear, reconsider the contribution.                                                                                                                                                       | **💡 Provide solutions** <br>Contributions should both identify a problem and provide a solution. If you found a bug, have a question, or want to open a discussion, you can submit those via [GitHub](https://github.com/Shopify/polaris/discussions/6750).                                                                                                                                                                                             |\n| **🤝 Collaborate with other disciplines** <br>A good contribution addresses the needs and perspectives of design, content, and code. Consult a diverse group of disciplines when drafting your contribution.                                                                                                       | **🪟 Work in the open** <br>Public discussion is crucial for contribution visibility and feedback. Submit contributions using [GitHub](https://github.com/Shopify/polaris/discussions/6750). Shopify employees can request assistance via the #polaris Slack channel.                                                                                                                                                                                    |\n| **📅 Include contribution in project cycles** <br>Contributing close to a project deadline creates blockers. Include contribution in project retros, or involve Polaris early in a project cycle. Read [Working with Polaris](/contributing/working-with-the-polaris-team).                                        | **🔍 Check your work** <br>Double check your contribution to make sure it meets standards for things like accessibility and performance. Following the guidance for each contribution type is also a great way to meet quality standards.                                                                                                                                                                                                                |\n| **🏗️ Consider the impact on the system** <br>Contributions to Polaris should apply to multiple admin surfaces. They should not be unique solutions with only one use case. Read [Designing with a system](/contributing/designing-with-a-system), and reach out to the Polaris team for system advice or guidance. | **🔬 Be clear and detailed** <br>Submit a short summary of your contribution, along with relevant links, artifacts, and context. State your expectations, understanding that we must prioritize certain business and system needs. If you can ship in collaboration with another product team, tag them and let the Polaris team know. Capture contribution details with [GitHub issue templates](https://github.com/Shopify/polaris/issues/new/choose). |\n\n## Where to get help\n\nIf you get stuck or want help strategizing a larger contribution, bring it up in [GitHub discussions](https://github.com/Shopify/polaris/discussions/new). The Polaris team and other members of the systems community will help you out. If you see a discussion where you could guide another member of the community, we welcome you to join the conversation.',
      },
    ],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['how to contribute to polaris', 'contribution'],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: true,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'nguey32Nt5unAbeA6jCch',
    title: 'Code of Conduct',
    excerpt: '',
    slug: 'code-of-conduct',
    parentId: 'uTmCRDruRrPhRC5znYacy',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'MRehyXNxgLpw1Sz4w2taa',
        blockType: 'Markdown',
        content:
          '## Our pledge\n\nIn the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, ability, ethnicity, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.\n\n## Our standards\n\nExamples of behavior that contributes to creating a positive environment include:\n\n- Using welcoming and inclusive language\n- Being respectful of differing viewpoints and experiences\n- Gracefully accepting constructive criticism\n- Focusing on what is best for the community\n- Showing empathy towards other community members\n\nExamples of unacceptable behavior by participants include:\n\n- The use of sexualized language or imagery and unwelcome sexual attention or advances\n- Trolling, insulting/derogatory comments, and personal or political attacks\n- Public or private harassment\n- Publishing others’ private information, such as a physical or electronic address, without explicit permission\n- Other conduct which could reasonably be considered inappropriate in a professional setting\n\n## Our responsibilities\n\nProject maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.\n\nProject maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or permanently any contributor for other behaviors that they deem inappropriate, threatening, offensive, or harmful.\n\n## Scope\n\nThis Code of Conduct applies both within project spaces and in public spaces when an individual is representing the project or its community. Examples of representing a project or community include using an official project e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event. Representation of a project may be further defined and clarified by project maintainers.\n\n## Enforcement\n\nInstances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at polaris@shopify.com. All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances. The project team is obligated to maintain confidentiality with regard to the reporter of an incident. Further details of specific enforcement policies may be posted separately.\n\nProject maintainers who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the project’s leadership.\n\n## Attribution\n\nThis Code of Conduct is adapted from the [Contributor Covenant](https://www.contributor-covenant.org/), version 1.4, available at <https://www.contributor-covenant.org/version/1/4/code-of-conduct.html>',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['open source'],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'QXm3CVCbjaZgDBUAWivbA',
    title: 'Contributing to Polaris React',
    excerpt:
      'Anyone is welcome to contribute to Polaris React components. There are several types of component contributions, but they typically fall under three categories; bug fix, enhancement, or new pattern.',
    slug: 'components',
    parentId: 'uTmCRDruRrPhRC5znYacy',
    order: 2,
    layout: 'blocks',
    blocks: [
      {
        id: 'n0XbZCXz0Rz_qcPEt7l8F',
        blockType: 'Markdown',
        content:
          'Bug fixes can be as simple as removing a typo, or as complex as refactoring a component to address a performance or accessibility issue. Enhancements usually add to or update the props of an existing component to extend its functionality or presentation. New patterns can be contributed by simply adding a new example to an existing component’s documentation, or by adding new components or utilities. Often component contributions are a mix of these.\n\nStart planning your contribution as early as possible to account for the scope in your timeline. To get help with the strategy for your contribution early on, start a [discussion](https://github.com/Shopify/polaris/discussions/new) with the Polaris community. If you have a smaller question, reach out in #polaris if you work at Shopify, or the [Shopify Partners Slack](http://shopifypartners.slack.com) if you’re an open source contributor. Once you’ve decided on the best way to solve the problem, submit a [feature proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) or [bug report](https://github.com/Shopify/polaris/issues/new?assignees=&labels=%F0%9F%90%9BBug&template=ISSUE.md) issue. Then contribute the change by shipping a pull request.\n\nOften the changes you make to a component’s code impact the [documentation](/contributing/documentation) and [Figma UI Kit](/contributing/figma-ui-kit). If you work at Shopify, component contributions should be a team effort across disciplines. If you’re an open source contributor, we’ll work with you to update the Figma UI Kit once you [create an issue](https://github.com/Shopify/polaris/issues/new/choose) or [open a pull request](/contributing/shipping-your-contribution#open-your-first-pr) in the `Shopify/polaris` repo.\n\n## Update props\n\n### Considerations\n\nThere are many ways to make a Polaris component more flexible. Updating or adding props is the most common way to add flexibility to the way a component looks or works. Sometimes refactoring the component is [a better path](#add-or-improve-a-component).\n\nComponents should be performant, accessible, and maintainable. When contributing a new prop or updating the types of an existing prop, ask yourself how your change might:\n\n- Be backwards compatible\n- Increase or maintain performance\n- Improve or maintain accessibility\n- Address a pain point in the merchant experience\n- Reduce complexity of the source code\n\nIf a component isn’t flexible enough to meet your project’s requirements, or you’re unsure whether a component is right for your use case, submit an [issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) or [open a pull request](/contributing/shipping-your-contribution#open-your-first-pr) outlining the problem and the approach you’re thinking about. We’re happy to collaborate to find a solution.\n\n### How to contribute\n\nTo add or update a prop:\n\n1. Explore and align on whether to add a new prop or update the types of an existing prop\n2. Submit or assign yourself to an existing [feature proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md)\n3. [Prepare your development environment](/contributing/shipping-your-contribution#setting-up-your-local-developement-environment)\n4. Add your change to the props interface\n5. Include or update the description comment\n6. Update the `@default` value if relevant in the props interface and in the props deconstruction at the start of the component’s definition\n7. Add tests to cover the changes\n8. Add examples to the component’s documentation\n9. Commit your changes and [open a pull request](/contributing/shipping-your-contribution#open-your-first-pr)\n\n---\n\n## Fix a bug\n\n### Considerations\n\nBug fixes are high impact contributions that ensure we deliver a reliable, crafted experience to merchants. Whether you’re a seasoned contributor or looking to make your first pull request, there’s a bug report open for every level of experience.\n\nIf you’re just getting started with contributing to Polaris React, look for issues that are:\n\n- Labeled as a [good first issue](https://github.com/Shopify/polaris/issues?q=is%3Aopen+is%3Aissue+label%3A%22Good+first+issue%22)\n- Not yet assigned to someone\n- Haven’t been updated in two or more weeks\n\n### How to contribute\n\n1. Submit or assign yourself to a [bug report](https://github.com/Shopify/polaris/issues/new?assignees=&labels=%F0%9F%90%9BBug&template=ISSUE.md).\n2. [Prepare your development environment](/contributing/shipping-your-contribution#setting-up-your-local-developement-environment).\n3. Assess the time and difficulty of finding and fixing the problem code.\n4. If you discover that fixing the bug is too complex or will take longer than you’re able to commit, that’s okay! Your findings will help the next developer move the needle on shipping a fix.\n   <br /> - Update the issue with a comment detailing your findings. Describe the problem code and share permalinks to the lines involved.\n   <br /> - If you have a potential fix locally, commit and push your changes and open a draft pull request that links to the bug report.\n   <br /> - Add or update the issue’s labels to indicate level of difficulty.\n   <br /> - Unassign yourself from the issue.\n5. If after investigating you arrive at a solution to the issue:\n   <br /> - Update the issue so everyone knows a fix is on the way.\n   <br /> - Commit your changes and [open a pull request](/contributing/shipping-your-contribution#open-your-first-pr).\n\n---\n\n## Add or improve a component\n\n### Considerations\n\nFrom perceived performance and accessibility enhancements, to the evolution of our design language, contributing UX improvements to Polaris components empowers teams to make sweeping changes effectively with minimal technical debt upstream.\n\nWhen exploring the potential for improving the look, feel, and or experience of a component:\n\n- Prioritize accessibility\n- Check [W3C](https://www.w3.org/WAI/ARIA/apg/patterns/) for examples of the pattern the component implements\n- Consider whether the existing component could be replaced entirely if it were broken up into smaller components\n\n### Case study\n\nIn the years since Polaris launched in 2017, we’ve learned a lot from the Shopify and design system communities. As the system’s matured, we’ve found that many of the components should evolve toward [composition over configuration](https://maecapozzi.com/blog/composition-vs-configuration/). Many props is a signal that a component is solving too many problems or is too opinionated. When that’s the case, there’s an opportunity to refactor the component or build a new component to better meet merchant needs.\n\nFor example, `Autocomplete` implements [the combobox with list pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/). When the Deliver team looked into fixing bugs in the component, they decided it would benefit from being broken down into two new components. They contributed `Combobox` and `Listbox` and refactored `Autocomplete` to use them. This reduced complexity and made `Autocomplete` easier to maintain.\n\nThe Deliver team partnered with the Polaris team to improve the UX of tag autocomplete inputs in a follow-up project. To accomplish this, we refactored `Combobox` and `Listbox` to support [the combobox with both list and inline autocomplete pattern](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-both.html) with automatic selection. Every `Autocomplete` in the Shopify Admin benefited from those improvements without any code changes needed upstream in the app.\n\n### How to contribute\n\n1. Submit or assign yourself to an existing [feature proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) or [new component proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=&template=NEW_COMPONENT.md)\n2. [Prepare your development environment](/contributing/shipping-your-contribution#setting-up-your-local-developement-environment)\n3. Prototype and iterate on your proposal, testing with merchants as you iterate if possible\n4. Commit your changes and [open a pull request](/contributing/shipping-your-contribution#open-your-first-pr)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'components',
      'contributing to polaris react',
      'how to add a prop',
      'how to add a prop type',
      'how to add a new component',
      'bug fix',
      'ux improvement',
      'improve component',
      'improve ux',
      'improve accessibility',
      'open source',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: '7wjrpdraoXFaH_b0A2SK8',
    title: 'Designing with a system',
    excerpt: '',
    slug: 'designing-with-a-system',
    parentId: 'uTmCRDruRrPhRC5znYacy',
    order: 7,
    layout: 'blocks',
    blocks: [
      {
        id: 'ev8_dt1H9ovtBpwIvuhIu',
        blockType: 'Markdown',
        content:
          '![Illustration of dozens of chairs of the same kind and a single chair of a diverent kind.](/images/01.png)\n\nAt Shopify, we often say, “Polaris is the floor, not the ceiling.” The design system provides you with building blocks, and it’s up to you to construct them in a way that best meets your user’s needs. The idea behind Polaris not being a ceiling is that you shouldn’t limit your ideas to fit into existing system pieces too early. Zoom out, figure out the best design solution to the problem, and then see if Polaris has all the pieces for you to design that solution. If there’s a gap, then [contribute](https://polaris.shopify.com/contributing) to the system to make it better.\n\n## Zoom out\n\nNo matter what problem you’re solving, zooming out allows you to get a better understanding of the problem, and its sphere of influence. A problem rarely exists in isolation, so understanding context and contributing factors is key before getting into solutions. Practically speaking, this means that you should understand the product as a whole, not just the product area you’re working on.\n\nFor instance, if you work on Orders, you should have a holistic understanding of the Shopify admin so you can leverage existing patterns and mental models. You can also gain context and empathy for merchants through research.\n\nMerchants don’t care about Shopify’s internal organization. They use the admin as a whole, so we must design with the whole experience in mind.\n\n![Illustration of three tag autocomplete inputs implementing the same pattern, but using different components.](/images/02.png)\n\nThe Deliver team identified a need to consolidate 6 different tag components with varying UX that were doing the same job in different sections of the admin. The redundancy in components was causing a fractured user experience.\n\n## Explore freely\n\nWhen you understand the product as a whole, you should be well equipped to explore without constraints. That means don’t start from our UI kit, component library, or patterns you see in the product---start with a blank sheet of paper instead. Solve the problem, preferably in more than one way, before you start worrying about consistency.\n\n![Illustration of three different ways to improve the design and experience of the tag autocomplete input.](/images/03.png)\n\nAs the Deliver team was working on consolidating the 6 components, they also identified an opportunity to improve the overall usability for adding tags. The team explored several different ideas and approaches to understand which approach would best solve the problem.\n\n## Calibrate\n\nOnce you understand the problem and potential solutions, you can start aligning more closely with the design system.\n\n![Illustration of before and after improving the design of the tag autocomplete.](/images/04.png)\n\nThe team made updates to the Polaris foundational pieces like the tag, icon, and interactions so that they could use those pieces to build a more opinionated component.\n\nIf you have initial questions about contribution, reach out in #polaris if you work at Shopify, or the Shopify Partners Slack if you’re an open source contributor. To get help with the strategy for a larger contribution, start a GitHub discussion with the system community.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'systems thinking',
      'contribution guide',
      'designing with a system',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 't7Kwa6i_sxgfLO4xIPAd4',
    title: 'Documenting in Polaris',
    excerpt: '',
    slug: 'documentation',
    parentId: 'uTmCRDruRrPhRC5znYacy',
    order: 5,
    layout: 'blocks',
    blocks: [
      {
        id: '_gsCLAAAyoK5m3lemmhau',
        blockType: 'Markdown',
        content:
          "Shopify teams create documentation for polaris.shopify.com, but open source contributors are welcome to make copy edits as well as update or add examples to [component documentation](/contributing/components).\n\nTo write effectively as a Shopify employee, use a cross-discipline lens. Make sure your content meets both UX and development needs. Before starting, check out our [style guide to the style guide](https://docs.google.com/document/d/1zVDsHIWhoir2svRjdtSdRbD_ruTz3K1nAJcQLGPVQwM/edit#heading=h.ni67tdntu9cr).\n\nMost documentation about the design system is meant for polaris.shopify.com. However, there may be a reason for the content to live elsewhere. If you’re not sure if something should live on this site, the Polaris team can help you figure that out.\n\n## Making copy edits\n\nEdits related to spelling, grammar, punctuation, or other typos should happen quickly and often. Both Shopify employees and open source contributors are welcome to submit copy edits.\n\nTo fix any copy issues on polaris.shopify.com, [open a pull request](/contributing/shipping-your-contribution#open-your-first-pr) in the [Shopify/polaris repo](https://github.com/Shopify/polaris) GitHub repo.\n\nNote: If you find copy issues in other Polaris resources, follow the steps for that resource’s contribution guidelines.\n\n## Updating documentation\n\nTo expand or edit existing documentation:\n\n1. Draft your proposed changes in Google Docs for easy collaboration. We recommend writing in [Markdown](https://www.markdownguide.org/cheat-sheet/), or converting your file to Markdown when finished.\n2. Get feedback from subject matter experts or someone with high context around your changes, like a team member or your lead.\n3. Reach out to the Polaris team to review your changes for style guide alignment.\n4. [Open a pull request](/contributing/shipping-your-contribution#open-your-first-pr) in the [Shopify/polaris repo](https://github.com/Shopify/polaris) GitHub repo.\n\n## Adding new documentation\n\nNew documentation in Polaris can range from component documentation, to content guidelines, to pattern guidance.\n\nTo create new documentation:\n\n1. Reach out to the Polaris team. We can help find a home for your documentation, offer templates, provide asynchronous feedback, and—if you're really stuck—participate in pair writing sessions.\n\n2. Draft the content in Google docs for easy collaboration. We recommend writing in [Markdown](https://www.markdownguide.org/cheat-sheet/), or converting your file to Markdown when finished.\n3. Get feedback from subject matter experts, or someone with high context around your changes (team member, manager, etc.).\n4. [Open a pull request](/contributing/shipping-your-contribution#open-your-first-pr) in the [Shopify/polaris repo](https://github.com/Shopify/polaris) GitHub repo.\n\n## Removing documentation\n\nIt’s important that inaccurate or outdated information be removed as soon as possible. This helps maintain high trust in Polaris as a source of truth for design system guidance.\n\nTo remove documentation:\n\n1. Reach out to subject matter experts, or someone with high context around the existing content, to confirm its relevance and accuracy\n2. [Open a pull request](/contributing/shipping-your-contribution#open-your-first-pr) in the [Shopify/polaris repo](https://github.com/Shopify/polaris) GitHub repo",
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'how to contribute to polaris documentation',
      'how to contribute to the style guide',
      'documenting in polaris',
      'documentation guidelines',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: '96PhHeCY86ga_TfgTtkoL',
    title: 'Contributing to the Figma UI Kit',
    excerpt: '',
    slug: 'figma-ui-kit',
    parentId: 'uTmCRDruRrPhRC5znYacy',
    order: 3,
    layout: 'blocks',
    blocks: [
      {
        id: 'i6Rcf4YdckZXxIi3w3s5z',
        blockType: 'Markdown',
        content:
          'Any designer that works at Shopify can contribute to the Figma UI Kit. If you find a bug to fix or your team is contributing new patterns or variants to Polaris React components, we want you to feel empowered to contribute.\n\nComponents, features, or patterns shouldn’t be added to the Figma UI Kit if they are not part of Polaris React, as our goal is to keep Figma in sync with the code base. Only contributing changes to the Figma UI Kit when there’s a counterpart in Polaris React prevents confusion and keeps tooling in sync across resources.\n\n1. Submit an issue in the [Shopify/polaris](https://github.com/Shopify/polaris/issues/new) GitHub repo, or assign yourself to [an existing issue](https://github.com/Shopify/polaris/labels/Figma%20UI%20Kit). Make sure to:\n   1. Assign yourself to the issue so it’s clear who is doing the work.\n   2. Add the "Figma UI Kit" label so we can easily find the issue.\n   3. Use a descriptive title.\n   4. Describe the change you’re making in the issue itself.\n2. Create a branch in the Polaris Components Figma library.\n   <br /> - Give your branch a descriptive name, ideally using the GitHub issue number so it’s easy to track.\n   <br /> - For example, "[4963] Navigation design changes"\n3. Make the necessary changes in the new branch.\n4. Document all changes in the “Release Notes” page within the UI kit.\n5. Add a design reviewer from the Polaris team to review the changes on your branch. If you aren’t sure who to add, share the link to your Figma branch and ask for review in the #polaris Slack channel.\n6. Once reviewed and approved, the Polaris designer will merge your changes into the main branch and publish the updates.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'ui kit',
      'figma',
      'how to contribute to polaris ui kit',
      'how to fix a figma component',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'galQJZwKfw4NBBO0UaBU0',
    title: 'Contributing to Polaris Icons',
    excerpt: '',
    slug: 'icons',
    parentId: 'uTmCRDruRrPhRC5znYacy',
    order: 1,
    layout: 'blocks',
    blocks: [
      {
        id: 'Yu14cCu85iFDMw2_BebXZ',
        blockType: 'Markdown',
        content:
          'Polaris Icons are important visual aids that help merchants understand actions and concepts across the Shopify Admin. Whether your team needs to add, modify, or deprectate an icon, all designers and developers that work at Shopify are welcome to contribute.\n\nBefore proposing a new icon, search the [icon explorer](https://polaris.shopify.com/icons). If the icon you’re looking for isn’t included, create a proposal for the new icon and work with your team to add it. Any additions or changes should also be reflected in the [Figma UI Kit](/contributing/figma-ui-kit).\n\nTo learn about best practices for designing and using Polaris icons, read the [icon design guidelines](https://polaris.shopify.com/design/icons). If you have initial questions or need help, reach out in the [#polaris](https://shopify.slack.com/archives/C4Y8N30KD) Slack channel. If you want to start a more in-depth conversation with the system community before opening an issue, start a [GitHub discussion](https://github.com/Shopify/polaris/discussions/new).\n\n## Design a new icon\n\n1. Submit an [icon proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md).\n2. Review design specs in the Polaris Icons library in Figma.\n3. If you are designing a new icon:\n   <br /> - Draft the new icon following the design language guidance in the Polaris Icon Library in Figma.\n   <br /> - Request feedback from a Polaris designer.\n4. If you need assistance designing the new icon:\n   <br /> - Reach out in the #polaris Slack channel requesting a new icon.\n   <br /> - A designer will reach out to get context and information around what you need, deadlines and other relevant information.\n   <br /> - A designer will work with you to design an icon that meets your team’s needs with your feedback along the way.\n5. Once alignment on the design is reached, follow the instructions below for adding the icon.\n\n## Add or edit an icon\n\n1. Submit an [icon proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md)\n2. [Set up your development environment](/contributing/shipping-your-contribution#get-set-up)\n3. If you are adding an icon:\n   <br /> - Copy and rename the icon template files\n   <br /> - Add the exported icon SVG to the `.svg` file\n   <br /> - Add the icon metadata to the `.yml` file\n4. If you are editing an existing icon:\n   <br /> - Replace the existing icon SVG in the `.svg` file\n   <br /> - Update the relevant metadata in the `.yml` file\n5. Run `yarn changeset` to add an entry to the change log and release notes\n6. Commit your changes and [open a pull request](/contributing/shipping-your-contribution#open-your-first-pr) in the Shopify/polaris GitHub repo\n7. Update the Polaris Icon Library in Figma\n\n## Deprecate an icon\n\n1. Submit an [icon proposal](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md).\n2. [Set up your development environment](/contributing/shipping-your-contribution#get-set-up).\n3. If you are deprecating an icon without replacement:\n   <br /> - Add `deprecated: true` to the icon’s `.yml` file.\n4. If you are deprecating an icon with replacement:\n   <br /> - Rename the icon’s `.svg` and `.yml` files.\n   <br /> - Add `deprecated_aliases` to the `.yml` file.\n   <br /> - List each of the icon’s previous names. For example, if you were to rename `OldMajor` to `NewMajor`, you would add these lines to `NewMajor.yml`:\n   <br />\n\n   ```yml\n   deprecated_aliases:\n     - OldMajor\n   ```\n\n5. Run `yarn changeset` to add an entry to the change log and release notes.\n6. Commit your changes and [open a pull request](/contributing/shipping-your-contribution#open-your-first-pr) in the Shopify/polaris GitHub repo.\n7. Update the Polaris Icon Library in Figma.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'icons',
      'add a new icon',
      'deprecate an icon',
      'update an icon',
      'how to contribute to polaris icons',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'uWcAWij1pJxyg_znCgFeh',
    title: 'Adding new illustrations',
    excerpt: '',
    slug: 'illustrations',
    parentId: 'uTmCRDruRrPhRC5znYacy',
    order: 4,
    layout: 'blocks',
    blocks: [
      {
        id: 'vgGqTMpLft5LsGM6BA2Po',
        blockType: 'Markdown',
        content:
          'Reusing illustrations should be avoided in product. New illustration contributions are welcome from any designer working at Shopify. They can be submitted for feedback to the #illustration-guild on Slack. Polaris only supports illustrations within the Shopify admin product and not marketing assets.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['illustration', 'image', 'photo', 'contribute', 'add'],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'bV5rpBI_WeqzjniAS--x3',
    title: 'Shipping your contribution',
    excerpt:
      'Contributions to this documentation site and code-related resources in the Polaris design system are made in the [Shopify/polaris GitHub repository](https://github.com/Shopify/polaris). We manage work in progress in our [team backlog](https://github.com/orgs/Shopify/projects/2250), and use GitHub discussions, issues, and pull requests to work in the open.',
    slug: 'shipping-your-contribution',
    parentId: 'uTmCRDruRrPhRC5znYacy',
    order: 6,
    layout: 'blocks',
    blocks: [
      {
        id: 'kgns9Pl0a0Ra38Ps5dClN',
        blockType: 'Markdown',
        content:
          '## Project details\n\n### How it’s structured\n\nThe Shopify/polaris GitHub repository is structured as a monorepo, which means it’s a single repository with multiple projects. The monorepo includes:\n\n<!-- prettier-ignore -->\n| `polaris` |     |\n| ---------- | --- |\n|`/polaris-for-vscode` |VS Code extension for Polaris Design Token autocompletion|\n|`/polaris-icons` |npm SVG icon library `@shopify/polaris-icons`|\n|`/polaris-react` |npm React component library `@shopify/polaris`|\n|`/polaris-tokens` |npm Design Token library `@shopify/polaris-tokens`|\n|`/polaris.shopify.com` |The style guide to the Polaris Design System|\n|`/stylelint-polaris` |Linting rules for using Polaris Design Tokens through CSS custom properties|\n\n### Technologies we use\n\nTo manage our monorepo, we use:\n\n- Yarn for package management\n- Turborepo and Yarn workspaces for monorepo workflows\n- Changesets for managing release notes and change logs\n\nEvery Polaris project is a little different, but in general we build with JavaScript, TypeScript, and Sass. This documentation site is built using React and Next.js.\n\n## Get set up\n\nTo contribute to Polaris components, icons, or documentation, you’ll need to use your preferred `git` interface to commit and push up your changes. Whether that’s the command line in your favorite terminal, or in GitHub Desktop is entirely up to you. For this guide, we’ll illustrate the steps with terminal commands.\n\n### 1. Download the repo\n\n#### Shopifolk\n\nClone the polaris repo\n\n```bash\ngit clone <https://github.com/Shopify/polaris.git>\n```\n\n#### Open Source Contributors\n\n[Fork](https://github.com/Shopify/polaris/fork) the polaris repo\n\n### 2. Install and build\n\n```bash\nyarn && yarn build\n```\n\n### 3. Create a new branch\n\n```bash\ngit checkout -b new-branch-name\n```\n\n## Open your first PR\n\n### 1. Test your changes\n\nAs you work, commit and test your changes:\n\nIf your changes affect Polaris React components, you’ll need to test the examples and documentation of affected components. For more thorough testing edit the sandbox files found in the `/polaris-react/playground` directory.\n\n```bash\nyarn turbo run dev --filter=@shopify/polaris\n\n# Open https://localhost:3000 to test documentation\n# Open https://localhost:6006 to test Storybook examples and Playground sandboxes\n```\n\nIf you are adding or editing documentation, ensure your content displays as expected on the style guide website:\n\n```bash\nyarn turbo run dev --filter=polaris.shopify.com\n```\n\n### 2. Commit your changes\n\nSave the changes you’ve made to your branch.\n\n```bash\ngit commit -m “descriptive message”\n```\n\nPush up your branch to GitHub\n\n```bash\ngit push origin new-branch-name\n```\n\n### 3. Create a pull request\n\nUse the "New pull request" button from the [your branch](https://github.com/Shopify/polaris/branches/yours) list to create a pull request for your changes.\n\nIn your PR’s description, be specific with what you’ve tested as well as what reviewers should focus on when testing your changes, for example:\n\n- Keyboard and screen reader accessibility\n- Interaction state changes\n- UI changes\n- Small screen vs large screen UX\n- Other considerations or feedback you’re seeking regarding how you’ve implemented your changes\n\nAdd a [changeset](https://github.com/Shopify/polaris/blob/main/.changeset/README.md#changesets) if your PR includes any changes that will require a package version bump and release. Otherwise, add the `🤖 Skip Changelog` label to your PR.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'contributing to polaris',
      'github',
      'pull request',
      'fork',
      'clone',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'QvxtggW3ZV9j4xb45IMnS',
    title: 'When to contribute new patterns',
    excerpt:
      'There will likely be times where the system and its components fall short of your preferred solution. You have a decision to make — should you stay consistent with what exists, or go with the best possible solution, regardless of consistency?',
    slug: 'when-to-contribute-new-patterns',
    parentId: 'uTmCRDruRrPhRC5znYacy',
    order: 8,
    layout: 'blocks',
    blocks: [
      {
        id: 'q78pd8Wy9FjRqA05UjzRH',
        blockType: 'Markdown',
        content:
          'To help you figure this out, start by plotting out where each solution fits in this “perfect vs consistent” framework. Rate the solutions according to:\n\n- Consistency with the rest of the product (x axis)\n- How appropriate the solution is for your specific situation (y axis)\n\n![Illustration of a graph with "Perfect for situation" on the y-axis and "Consistent" on the x-axis.](/images/01.png)\n\nTo practice this framework, let’s imagine some possible scenarios. Consider the more obvious directions:\n\n![Illustration of a graph with "Perfect for situation" on the y-axis and "Consistent" on the x-axis.](/images/02.png)\n\nWhen deciding between A or B, go with A. It’s the better solution to the problem, assuming all options are inconsistent.\nA or C? Obviously C. Of two equal solutions, choose the one that is more consistent with the rest of the experience.\nA or D? D is consistent, but A is a much better solution to the problem. In that situation, it is likely that you can [contribute the new pattern to the system](https://polaris.shopify.com/contributing/documentation), so others can leverage it in the future.\n\nNow let’s look at the less obvious directions:\n\n![Illustration of a graph with "Perfect for situation" on the y-axis and "Consistent" on the x-axis.](/images/03.png)\n\nGo with A if it’s the perfect solution and has the potential to scale to the rest of the system\n\nDeciding between A or E is trickier. If A is clearly better than E, but E is much more consistent, go with A. This is because A has potential to become a system pattern and eventually get closer to E, and maybe even surpass it, in terms of consistency.\n\n![Illustration of a graph with "Perfect for situation" on the y-axis and "Consistent" on the x-axis.](/images/04.png)\n\nGo with E when consistency trumps perfection\n\nGo with E if A seems like a snowflake solution. Building a snowflake solution will make it difficult for other teams to adopt it. Breaking consistency is also costly because new, custom solutions add complexity to the experience and are hard to learn, so its benefits should significantly outweigh the cost of inconsistency.\n\nWhen both are appropriate and there’s not a massive difference in value, consistency trumps perfection.\n\nThe key here is to zoom out. When we’re [designing for scale](https://polaris.shopify.com/contributing/designing-with-a-system), we need to think broader and look at our specific problem area as a small part of a larger system. So spend some time figuring out if your solution is unique, or if it has potential to solve other problems. This is why it’s important to have good awareness of the whole experience before you start, and why it’s important to contribute back to the system if you land on a solution that would benefit others.\n\nFor initial questions about contribution, reach out in [#polaris](https://shopify.slack.com/archives/C4Y8N30KD) if you work at Shopify, or the [Shopify Partners Slack](http://shopifypartners.slack.com) if you’re an open source contributor. To get help with the strategy for a larger contribution, start a [GitHub discussion](https://github.com/Shopify/polaris/discussions/new) with the system community.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'when to contribute to polaris',
      'when to evolve the system',
      'when to contribute new patterns',
      'contribution guide',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'bYUBMCIz5MfWycCx3aLBt',
    title: 'Working with the Polaris team',
    excerpt:
      'When you contribute to Polaris, you help the Shopify community create better experiences for merchants, faster. Contribution takes thoughtful planning.',
    slug: 'working-with-the-polaris-team',
    parentId: 'uTmCRDruRrPhRC5znYacy',
    order: 9,
    layout: 'blocks',
    blocks: [
      {
        id: 'c6mqeSFQjzQ-vwAac-i7L',
        blockType: 'Markdown',
        content:
          'Through supporting teams, we’ve learned what works well, and not so well. We’ve outlined these things so that you can create a successful plan. This guide goes into detail, but here are the highlights.\n\n## Tl;dr\n\nThink about your system needs in the prototype phase of your project so your team can plan for [quality](/contributing#what-makes-a-good-contribution) systems [contributions](/contributing) ahead of the build phase. The Polaris team is here to help you with planning, but we can’t be pulled in last minute to unblock.\n\nThe best way to get help is through our support channels:\n\n- [GitHub discussions](https://github.com/Shopify/polaris/discussions/6750) to talk to the community about anything from patterns, to potential contributions\n- #polaris in Slack if you work at Shopify and have a general inquiry\n\nAs you’re building you may need custom styles. In those cases, always use Polaris [tokens](/tokens).\n\n## Product team tips\n\nWith some early planning and intentional systems thinking, the build stage will go a lot smoother.\n\n### Plan for systems changes ahead of time\n\nThe Polaris team should never be pulled in to unblock a team from shipping something quickly—we’re here to support and guide teams when they’re planning their strategic system changes ahead of time. Teams at Shopify should start working on their system needs early in the design and build process and are expected to make [quality system contributions](/contributing#what-makes-a-good-contribution) ahead of their ship dates.\n\n### Aim to systematize your custom solutions\n\nThings don’t always go according to plan. If a team is still learning how to plan for system changes and finds themselves under pressure to quickly ship something custom, they’re responsible for owning any custom components they ship. The components should use [Polaris tokens](https://polaris.shopify.com/tokens/colors) and the team should make an effort to systematize the custom solution down the road. When product-wide changes happen in the future, the product team will be responsible for updating their custom components.\n\n## Collaborations for system contributions\n\nWhen an opportunity for a collaboration related to a system contribution comes up, we’ll add it to our [backlog](https://github.com/orgs/Shopify/projects/2250/views/5) for triaging. Collaboration opportunities can be worked on through cross-product team pairings and don’t always have to be with Polaris.\n\n### Triaging considerations\n\nDuring our triaging process, teams can expect that the Polaris team will help:\n\n- figure out how a component can be composed and/or how a pattern can be systematized\n- see if and where the contribution should be added to the system\n- identify system dependencies for making the contribution\n- identify other teams that could join the collaboration (and determine if the Polaris team needs to be involved)\n\nThe Polaris team will prioritize collaborating on contributions that:\n\n- have the highest number of community upvotes in Github discussions\n- help other teams solve similar problems so that we make the best possible impact on the merchant experience, like through pattern documentation\n- align with ongoing system improvement projects, for example, a team wants to make layout improvements while the Polaris team improves the layout foundations\n- break down large and complex composite components into primitive, foundational components\n- improve foundational components\n\n### Polaris support during collaborations\n\nIf the Polaris team is the main collaborator on a system contribution, the Polaris team will:\n\n- pair with the contributor(s) asynchronously, or when it’s more efficient, through ad hoc video calls\n- direct internal contributors to the #admin-ux community if extra feedback is needed on the solution being explored\n- offer systems coaching to the subject matter experts with the most context on the merchant problem that’s being solved\n- help the contributor with any systems tooling related to shipping the solution\n\n## Polaris on-call support\n\nThe Polaris team rotation schedule assigns one UXer and one developer to cover system inquiries and collaboration requests. Coverage is during their distributed working hours, Monday to Friday. The pair on rotation will:\n\n- direct internal #polaris Slack questions to a resolution\n- direct large requests for collaboration to @polaris-enablement for triaging\n- review, clean up, or close GitHub issues\n- provide PR reviews where necessary\n- participate in GitHub discussions where necessary\n\nIf an issue doesn’t get resolved by the end of their work day, it’s passed along to the next scheduled support pair.\n\nIf a Polaris team member is messaged directly, they’ll forward the inquiry/request to the internal #polaris channel for the pair on call to respond.\n\nAdmin pattern questions should be posted in the #admin-ux channel and if a question relates to #polaris, it should be forwarded to the #polaris channel.\n\n### Response time goals\n\nThese response time goals are for GitHub and our internal #polaris Slack channel.\n\n| Request type                                                                                                                                 | Initial response time                                                                         | Time to resolve                                                                                                                                                                                 |\n| -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| Production grade bug in shopify/web and shopify/polaris                                                                                      | @here in the internal #polaris channel and the support person on call will respond.           | As soon as possible                                                                                                                                                                             |\n| **System inquiry**<br/> A response would help move things along but the problem can continue to be solved without the response               | 24 hours                                                                                      | 48 hours                                                                                                                                                                                        |\n| **Collaboration request**<br/> An opportunity has been identified for an individual or team to collaborate with Polaris to evolve the system | 72 hours: [Github discussion](https://github.com/Shopify/polaris/discussions/6750) is started | 1 week: Discussions identified for a larger Polaris team collaboration have an issue added to the [Polaris backlog](https://github.com/orgs/Shopify/projects/2250/views/5) for project triaging |\n\n### Third party developer response times\n\nPolaris is an open source project used by Shopify employees, and Shopify Partners building apps. We value all feedback, feature requests, issues, and pull requests from our open source community. However, we aren’t able to accommodate every request and take longer than we’d like to respond to everyone. We review every request and prioritize them against our product roadmap based on user needs. Below is the process for every open source contribution:\n\n| Contribution type                                                                | Team response                                                                                                                                                                                                                                | How you can help                                                                                                                                                                                                                                                                                       |\n| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |\n| Bug report                                                                       | Prioritized against our backlog and roadmap. If there’s a clear or urgent need for a fix we’ll add it to our backlog.                                                                                                                        | Leave comments with additional information on how to reproduce the bug and how it’s affecting your use case.<br/><br/> If you’re interested in a fix, [upvote](https://github.com/Shopify/polaris/issues/new?assignees=&labels=%F0%9F%90%9BBug&template=ISSUE.md) the bug report to let the team know. |\n| Feature request                                                                  | For now, feature requests will be closed and reviewed against our existing backlog and roadmap. We’ll evaluate interest in the request and prioritize it for development if there is enough interest and alignment with our product roadmap. | If you’re interested in the feature please upvote the request in [GitHub](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to let the team know.                                                                                           |\n| Pull request                                                                     | Will review [PRs](https://github.com/Shopify/polaris/pulls) for system alignment, user need, and contribution quality.                                                                                                                       | Leave comments for code review.<br/><br/> Upvote the request in [GitHub](https://github.com/Shopify/polaris/discussions/6750) to express interest and let the team know you want this feature.                                                                                                         |\n| Start a [GitHub discussion](https://github.com/Shopify/polaris/discussions/6750) | Review discussions and close or respond as needed                                                                                                                                                                                            | Participate in a discussion to express interest or share your opinion.                                                                                                                                                                                                                                 |',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'service level agreement',
      'SLA',
      'contributing to polaris',
      'open source',
      'contribution guide',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'VfBqBP-1yKN4MnUdae1YR',
    title: 'Contributing to the website',
    excerpt: 'Info about how the website works',
    slug: 'website',
    parentId: 'uTmCRDruRrPhRC5znYacy',
    order: 99,
    layout: 'blocks',
    blocks: [
      {
        id: 'Zn8jtk2Lzz7vxmLcNcpzR',
        blockType: 'Markdown',
        content:
          '## The content structure\n\n### The Page object\n\nEach page is represented by a Typescript object that contains all the information about the page.',
      },
      {
        id: '3f67h7MDYwvoRHoYTAZfU',
        blockType: 'Markdown',
        content:
          '### Blocks\n\nEvery page can contain blocks. There are many types of blocks to choose from:\n\n- Markdown block\n- Image block\n- Youtube embed block\n- Sandbox embed block\n\nAnd more. A block is defined in Typescript using a simple object. Every object has an `id` and a `blockType`:',
      },
      {
        id: '8IZchJG6-k7F27BvaT2ay',
        blockType: 'Markdown',
        content:
          'You can add more fields to each block. The available fields depend on which `blockType` you use. For instance, the Youtube block accepts a URL field:',
      },
      {
        id: 'bBmDBbwLADywIhJwDDpcE',
        blockType: 'Markdown',
        content:
          'Blocks are added to the `Page` on the `blocks` property. The property is an array that takes `Block` objects:',
      },
      {
        id: 'AnGTB6rJHT-R5MtLGtDYC',
        blockType: 'DoDont',
        doMarkdown:
          '- Use the existing blocks to create new pages. We have enough primitives to communicate any type of content. Use the existing primitives instead of creating new ones.\n- ',
        dontMarkdown: '',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['website', 'site'],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'hiD70qGHVIevP_bXSrhu-',
    title: 'Design',
    excerpt:
      'These are the principles that shape how we design all the experiences across the Shopify admin.',
    slug: 'design',
    parentId: null,
    order: 3,
    layout: 'listing',
    blocks: [],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'rNBxRQvHc1g0L7e8FDASU',
    title: 'Colors',
    excerpt:
      'Our color system builds on the recognition of the Shopify brand colors to make the admin interface more usable.',
    slug: 'colors',
    parentId: 'hiD70qGHVIevP_bXSrhu-',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: '3H-dnF050z2eR59xEELot',
        blockType: 'Markdown',
        content:
          '![Diagram showcasing layers of color of various hues](/images/color-intro@2x.png)\n\n---\n\n## Principles\n\n### Communication is key\n\nAlthough we value an aesthetically pleasing use of color, we place a higher value on clear communication. Color supports the purpose of the content, communicating things like hierarchy of information, interactive states, and the difference between distinct elements.\n\n### Colors have meaning\n\nColors have assigned roles, which hold a specific meaning based on how they function within the interface. Defined color roles make things easy to modify and customize later. They also extend the color system so it works across any touchpoint at Shopify.\n\n### Colors follow accessibility guidelines\n\nThe color system is designed within the HSLuv color space to generate themes that meet WCAG 2.1 compliant contrast ratios. This makes things easier to find, identify, and interact with. It also makes the whole experience more accessible for merchants who are color blind or who have low vision. However you should never convey information using color alone.\n\n---\n\n## Color roles\n\n![Diagram of colors representing the new Polaris color system](/images/color-roles@2x.png)\n\nWe define colors based on the role they play in the interface. There are 10 color roles, which we use to generate the values of all the color variants in the palette.\n\n![Diagram presenting color variants in a user interface](/images/color-variants@2x.png)\n\n### Color variants\n\nColor variants are variables that apply color to the UI, and their values are generated from the color roles. Color variants are available as tokens.\n\n![Diagram presenting a color naming pattern for the color token Border Success Subdued](/images/color-variant-naming@2x.png)\n\nVariants share a naming pattern that references their color role, the interaction state they define, and any UI elements they’re linked to.\n\n---\n\n## The color system in action\n\nHow the color roles relate to the variants, and how they’re applied across the interface.\n\n### Surface\n\nSurface colors affect surfaces of components, such as page, card, sheet, and popover.\n\n![Diagram presenting the surface color role, with mainly white and gray colors](/images/color-role-surface@2x.png)\n\n### On surface\n\nApply on-surface colors to elements that appear on neutral surfaces, usually borders, secondary icons, and text elements.\n\n![Diagram presenting the on surface color role, with mainly black and darker gray colors](/images/color-role-onsurface@2x.png)\n\n### Primary\n\nUse primary colors for primary actions like buttons, icons and text on navigation and tabs, and for the background in navigation and tab interactive states.\n\n![Diagram presenting the primary color role, with mainly green colors](/images/color-role-primary@2x.png)\n\n### Secondary\n\nUse secondary colors for secondary and tertiary buttons and the background of form elements.\n\n![Diagram presenting the secondary color role, with mainly white and gray colors](/images/color-role-secondary@2x.png)\n\n### Interactive\n\nUse interactive colors for things like links, focus indicators, and selected interactive states.\n\n![Diagram presenting the interactive color role, with mainly blue colors](/images/color-role-interactive@2x.png)\n\n### Success\n\nSuccess colors indicate something positive, like the success of a merchant action or to illustrate growth.\n\n![Diagram presenting the success color role, with mainly green colors](/images/color-role-success@2x.png)\n\n### Warning\n\nWarning colors let the merchant know they need to take action, and are applied to badges, banners, and exception lists.\n\n![Diagram presenting the warning color role, with mainly yellow and orange colors](/images/color-role-warning@2x.png)\n\n### Critical\n\nCritical colors are for destructive interactive elements, errors, and critical events that require immediate action.\n\n![Diagram presenting the critical color role, with mainly red colors](/images/color-role-critical@2x.png)\n\n### Highlight\n\nHighlight colors indicate important elements that don’t require immediate action. They’re used with informational banners and badges, indicators that draw attention to new information, loading or progress bars, and data visualization.\n\n![Diagram presenting the highlight color role, with mainly cyan and teal colors](/images/color-role-highlight@2x.png)\n\n### Decorative\n\nDecorative colors are for expressive communications that assert the Shopify brand presence.\n\n![Diagram presenting the decorative color role, with a variety of colors like yellow, turquoise and rose](/images/color-role-decorative@2x.png)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['visual patterns', 'color strategy', 'color use'],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'eWRS3ajfFtrIK5IlNnhac',
    title: 'This is awesome mate! Great work there!',
    excerpt:
      'Visualizations surface patterns in data, and provide immediate answers to a single, specific question.',
    slug: 'data-visualizations-are-awesomesg',
    parentId: 'hiD70qGHVIevP_bXSrhu-',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: '7oIgla8z6VLyARhIw3lUx',
        blockType: 'DoDont',
        doMarkdown: '',
        dontMarkdown: '',
      },
      {
        id: 'j6BkwVc7YDYSHfj5sTWci',
        blockType: 'ProgressiveDisclosure',
        title: '',
        blocks: [
          {
            id: 'D6Rcl7rTNoBZz1baMoTHr',
            blockType: 'Image',
            image: {
              lightModeFilename: '',
              darkModeFilename: '',
              height: 0,
              width: 0,
              alt: '',
            },
          },
        ],
      },
      {
        id: 'urwS2vxv2izVgX_Bw-0Re',
        blockType: 'TabbedContent',
        tabs: [
          {
            id: 'D-VxCpkZDrz4AgD9RNNIM',
            label: 'New tab',
            blocks: [],
          },
          {
            id: 'JeN2POxMa1uvqnJIkxqk9',
            label: 'New tab',
            blocks: [],
          },
        ],
      },
      {
        id: 'hHEeNFa8e8Lobu-yyS-Bn',
        blockType: 'Markdown',
        content:
          'This section outlines data visualization practices at Shopify and how to leverage them.\n\n---\n\n## Data visualizations at Shopify\n\nThe data visualization process always begins with a set of data, a question, and analysis of the data to find the answer. Each visualization should focus on answering a single question about the dataset. For example, “What are my sales over time?”\n\nBy maintaining consistent styles and formats for our data visualizations, we ensure that data is presented in a truthful and accurate manner to maintain integrity with merchants.\n\n---\n\n## Guidelines\n\nData visualization should be approached by:\n\n### Solving a problem\n\nHave a clear question that needs to be answered. If multiple answers to multiple questions are illustrated in a visualization, it will become over complicated and hard to understand.\n\n### Testing with real data\n\nTesting with real data will reveal the effectiveness of the visualization. Also test when there are a few data points (one or two) or many data points (100 or more).\n\n### Scaling by number of datapoints\n\nThink about how the visualization will scale with more or fewer data points. Look out for cases where data is sparse (mostly zero) or spiky (some values are much\nlarger than others).\n\n---\n\n## Five core traits\n\nAn effective data visualization strikes the right balance between the five core traits: accuracy, intuitiveness, engagement, focus, and data granularity. It’s important to be intentional about which of these you focus on, and which are less important, in order to answer your specific question in the best way for your target audience. Understanding these traits help you choose between the many ways to visualize data by giving you a language for evaluating a visualization\'s effectiveness.\n\n### Accuracy\n\nAccuracy is about how faithfully the visualization matches the original data set. How much accuracy is needed to send your message across? A high level of accuracy may not always be needed to convey a trend or a pattern.\n\n### Intuitiveness\n\nIntuitiveness is about the ease of interpreting the visualization. Will merchants immediately understand what’s being represented, or will they need instructions? More intuitive is usually better, but sometimes it comes at the cost of flexibility.\n\n### Engagement\n\nEngagement is about how much attention the visualization attracts at a glance. Is it the star of the show, or does it sit in the background? More engagement is not always better—sometimes the best visualization is one that plays a supporting role.\n\n### Focus\n\nFocus is about how merchants’ attention is directed. Is one pattern or trend surfaced more prominently than others, or are there several trends that are given equal weight? Highly focused visualizations decrease cognitive overload, but restrict the breadth of the message you are able to convey.\n\n### Data Granularity\n\nData granularity is about the level of detail of the data set presented in the visualization. More granular means more data points, and possibly more cognitive processing, but less granular is less detailed. The right level of data granularity depends entirely on the specific question you’re trying to answer and the audience you’re communicating to.\n\n---\n\n## Axis and labelling conventions\n\nAll standard charts that show quantitative data have 2 axes that should be labeled for clarity.\n\n- Labelling should be outside and separate from the data area. This ensures the user understands the range of the data without taking focus away from the data.\n- Ensure that all labels are clear and accurate in what they represent. Use simple and short language.\n\n---\n\n## Granular guidelines\n\n### Axis lines\n\nAxis lines should be used as a guideline to show quantitative data, yet be unobtrusive.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nEnsure axis lines only appear where the data appears.\n\n![A light grey chart with axis lines](/images/ensure-axis-lines-only-appear-where-data-appears@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nUse bleeding axis lines to the edge of the screen.\n\n![A chart with axis lines filling the screen](/images/use-bleeding-axis-lines-to-the-edge-of-the-screen@2x.png)\n\n</div></div>\n\n### Skipping labels\n\nLabelling the tick marks on both the y-axis and x-axis helps the visualization become more clear in what it represents.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nSkip labels in regular intervals.\n\n![A bar chart plotting time using 12am, 8am, 12pm, and 8pm](/images/skip-labels-in-regular-intervals@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nTry to squeeze all labels together.\n\n![A chart plotting time with too many axis labels](/images/squeeze-all-labels-together@2x.png)\n\n</div></div>\n\n### X-axis Abbreviations\n\nShopify uses standard abbreviations for months and weekdays in order to reduce clutter in visualizations.\n\n- Use 12 hour format for time, with lowercase letters (12am, 6pm)\n- Use the first three letters for days of the week (Sun, Mon)\n- Use the first three letters for months (Feb, Mar)\n- For specific days, use the format ‘day + month’ (10 Apr, 11 Apr)\n- For specific months, use the format month + year (Apr 2011, May 2017)\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nUse standard abbreviations for labeling.\n\n![A chart showing the days of the week abbreviated to Mon, Tues, and so on](/images/use-standard-abbreviations-for-labeling2@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nSlant labels to make them fit.\n\n![A chart with labels slanted at a 45 degree angle](/images/slant-labels-to-make-them-fit2@2x.png)\n\n</div></div>\n\n### Y-Axis Abbreviations\n\nShopify uses standard monetary abbreviations for the y-axis to reduce clutter.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nAbbreviate using ‘k’ for thousand, ‘b’ for billion.\n\n![A chart with a y-axis representing a thousand dollars as “$1.0k”](/images/abbreviate-using-k-for-thousand-b-for-billion-and-include-the-unit@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nGo over 3 numeric characters, 1 decimal, or 1 letter.\n\n![A chart with a y-axis that represents the value of a thousand and one dollars as “$1.001k”](/images/go-over-3-numeric-characters-1-decimal-and-1-single-letter@2x.png)\n\n</div></div>\n\n### X-axis Labelling conventions\n\nLabels should be clear and concise.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nCenter all labels on the bar and the tick mark.\n\n![A bar chart with the abbreviated days of the week centered on the ticks which are centered on the bars that they represent](/images/center-all-labels-with-the-bar-and-tick2@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nUse decimals on the x-axis labels.\n\n![A bar chart plotting numbers with decimals on the x-axis](/images/use-decimals-on-x-axis-labels2@2x.png)\n\n</div></div>\n\n### Y-axis Labelling conventions\n\nLabels should be clear and concise.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nLeft align labels and keep them above y-axis lines.\n\n![A chart with a dollar value on the y-axis that’s aligned to the left and raised slightly from the grey axis](/images/left-align-labels-and-keep-them-slightly-above-the-y-axis-lines@2x.png)\n\n</div></div>\n\n---\n\n## Color palettes\n\nColor in data visualization has a very specific meaning. The data visualization color palette provides specific colors that can be used alone or in a group, depending on the intent.\n\n### Single data series\n\nUse when there is a single data series. For example, a bar chart, column chart, or a single line chart.\n\n![A line graph with y-axis and x-axis labels and a single purple line plotting data](/images/single-data-series@2x.png)\n\n![A line chart with 2 different colors comparing current values to a past value](/images/single-comparison-to-past@2x.png)\n\n### Single comparison to past\n\nThis is used when the data set is being compared to to its past values. For example, total sales by month, this year, compared to last year. In this case, the current value will be purple and the past value will be grey.\n\n### Multiseries data\n\nUsed when there are multiple data sets to compare. For example, a multiseries line chart. Go down the list as the number of datasets increase.\n\n![A line chart with multiple data points represented by different colors](/images/multiseries-data@2x.png)\n\n![One example of an upward trend in percentage sales represented in gren and another example of a downward trend in](/images/biased-charts@2x.png)\n\n### Biased\n\nUsed when certain data need is displayed in a negative or positive light. For example, showing positive or negative change relative to a reference value.\n\n---\n\n## Horizontal bar charts\n\nBar charts are used for comparing discrete categories. Use a bar chart when there is a constraint to the number of data points that can appear on the visualization, otherwise it becomes hard to scale.\n\n### Best used for\n\nShowing discrete categories of data, like {products} vs {sales}.\n\n### Don’t use\n\nWhen the number of data points can exceed 6. In this case, use a table.\n\n### Bar chart labels\n\nLabel each bar with what it’s displaying, as well as the value. For more best practices, visit axis and label conventions.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nInclude a label on each bar. If the bar is too small, include it outside of the bar.\n\n![A horizontal bar chart with 2 dollar values within the bar and the lowest value outside of the bar to the right](/images/include-a-label-on-each-bar-if-the-bar-is-too-small-include-it-outside-of-the-bar@2x.png)\n\n</div><div class="dodont-part" data-type="do">\n\n#### Do\n\nInclude a label on top of each bar to display what data it’s showing.\n\n![A horizontal bar chart displaying the country represented by each bar](/images/include-a-label-on-top-of-each-bar-to-display-what-data-it-is-showing@2x.png)\n\n</div></div>\n\n### Color\n\nUse one color for all bars.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nGive negative bars 60% opacity.\n\n![A horizontal bar chart with solid purple positive bars and purple negative bars set to 60% opacity](/images/give-negative-bars-60-opacity@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nUse multiple colors for the bars.\n\n![A horizontal bar chart using a different color for each bar](/images/use-multiple-colors-for-the-bars@2x.png)\n\n</div></div>\n\n### Bar positioning\n\nMake sure the bars are proportional in width, roughly twice the size of the space between the bars.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nMake the width of each bar about twice as wide as the space between them.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nMake the bars too skinny.\n\n</div></div>\n\n---\n\n## Vertical column charts\n\nColumn charts are used to show change over time, trends, and individual data points. Use column charts for when the number of data points is fewer than 30, or else use a line chart.\n\n### Best used for\n\n- Showing continuous data like sales per hour, or orders per month\n- Showing smaller granularities of time (hourly, daily, weekly, and monthly)\n\n### Don’t use\n\nWhen the number of data points can exceed 31. In this case, use a [line chart](/design/data-visualizations#line-charts).\n\n### Color\n\nAll bars should be the same color.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nUse one color for all bars.\n\n![A bar chart showing a data trend with the same bar color](/images/use-one-color-for-all-bars@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nUse multiple colors for the bars.\n\n![A bar chart showing the same data point with different colors](/images/use-multiple-colors-for-the-bars2@2x.png)\n\n</div></div>\n\n### Bar positioning\n\nMake sure the bars are proportional in width, roughly twice the size of the space between the bars.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nMake the width of each bar about twice as wide as the space between them.\n\n![A bar chart properly formatted with spaces half the size of each bar](/images/make-the-width-of-each-bar-about-twice-the-space-between-them@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nMake the bars too skinny.\n\n![A bar chart with spaces 4 times larger than the bar itself](/images/make-the-bars-too-skinny@2x.png)\n\n</div></div>\n\n### Interactivity\n\nInclude some interactivity on the bars upon hover since users will be looking at individual data points. The top line of the tooltip should follow x-axis abbreviation and labelling guidelines, while the bottom line tooltip should follow y-axis abbreviation and labelling guidelines.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nInclude tooltips for x-axis and y-axis values.\n\n![A bar chart with a tool tip on a bar displaying the date axis point and the dollar value axis point](/images/include-tooltips-with-both-the-x-axis-value-and-y-axis-value@2x.png)\n\n</div></div>\n\n---\n\n## Line charts\n\nA line chart is created by connecting a series of data points together with a line. Line charts are good to show change over time, comparisons, and trends. Use line charts when the number of data points is more than 30.\n\n### Best used for\n\n- Showing continuous data like sales or orders over time\n- Showing larger granularities of time (yearly, or quarterly)\n- Spotting overall trends and shapes of data\n\n### Axis and labelling\n\nSet up the chart area using the [axis and labelling guidelines](/design/data-visualizations#axis-and-labelling-conventions)\n\n---\n\n## Multiline charts\n\nLine graphs work well when multiple datasets need to be compared. Use the [color palette](/design/colors#color-palette) to select colors.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nUse contrasting color and include a legend.\n\n![A line chart with 2 lines using purple and teal to represent the years 2015 and 2016](/images/use-contrasting-colors-and-include-a-legend@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nUse more than 4 lines.\n\n![A line chart with 4 lines of different colors](/images/use-more-than-4-lines-try-to-stick-to-2-lines@2x.png)\n\n</div></div>\n\n---\n\n## Display metrics\n\nA display metric is a quantifiable measure that is used to track and display the status of a specific process. Examples include a sum, an average, or a movement in a positive or negative direction.\n\n### Best used for\n\nShowing a single value with a base unit.\n\n### Units\n\nMetrics should be paired with their base unit in close proximity to the number. Use concise and clear language for metrics.\n\n### Scope\n\nMetrics should be scoped to indicate the timeline of the data.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nInclude a dimension of time to scope the value.\n\n![Diagram showing “sales this week” with a numeric dollar value](/images/include-a-dimension-of-time-to-scope-the-value@2x.png)\n\n</div></div>\n\n### Movement\n\nIf needed, consider including a comparison indicator, such as comparison to the previous time or average.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nUse green for positive movement.\n\n![Diagram of green being used to signify an upward trend in data](/images/use-green-to-signify-positive-movement@2x.png)\n\nUse red for negative movement.\n\n![Diagram of red being used to signify a downward trend in data](/images/use-red-to-signify-negative-movement@2x.png)\n\n</div></div>\n\n---\n\n## Tables\n\nA table is a good way to showcase a large amount of information which has a variety of columns and data to show for each entity. A table should be used when multiple metrics and categories need to be presented together, and accurate lookup of the data values is more important that showing patterns in the data.\n\n### Best used for\n\n- Showing large amounts of discrete data with many variables\n- Showing values across multiple categories and measures\n- Allowing for filtering and ordering when comparison is not a priority\n\n### Alignment\n\nConsistent vertical alignment is essential for fast visual comparison between values in a table.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nLeft align non-numeric values and right align numeric values.\n\n![A table showing product inventory with product names aligned to the left and numbers aligned to the right](/images/left-align-non-numeric-values-and-right-align-numeric-values@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nCenter column headers.\n\n![A table showing product inventory data with headers, numbers, and titles centered](/images/center-align-columns@2x.png)\n\n</div></div>\n\n### Separation\n\nIn order to reduce clutter and non-data ink, we prefer to subtly separate each row.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nUse light lines to indicate separation between rows.\n\n![A table with three rows separated by light grey lines](/images/separate-rows-with-dividing-lines@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nHighlight every other row to indicate separation.\n\n![A table with a white background and grey lines using a darker grey every other row](/images/separate-rows-by-highlighting-every-other-row@2x.png)\n\n</div></div>\n\n### Totals\n\nTotals allow merchants to understand the data holistically and should be easy to find.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nPlace totals as the first row beneath the headers, and bold the text.\n\n![A diagram showing individual product sales underneath the total sales in bold type](/images/place-bold-totals-in-the-first-row@2x.png)\n\n</div></div>\n\n---\n\n## Accessibility\n\nAn important part of designing clear visualizations is making data accessible to everyone.\n\n### Provide options\n\nMerchants with vision issues might have trouble understanding visual presentations of data, even with assistive software.\n\nMerchants with dexterity or motor issues might have trouble using interactive visualizations that depend on fine motor control.\n\nOthers might simply have trouble understanding data presented in a chart or graph.\n\nTo support the needs of different merchants, always provide multiple formats for data visualizations.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nLet merchants access their data in multiple formats. For charts and graphs, it’s often helpful to offer the same content in a data table that’s either on the same page or on a related page that’s easy to discover.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nProvide data visualizations in only one format.\n\n</div></div>\n\n### Use of color\n\nColor is critical for visualization, but can cause issues for merchants with color blindness and low vision. Color should be used in a way that supports the interpretation of visual information for all merchants, including those with visual issues.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nEnsure that text, line, bar, and other colors have sufficient contrast against their background.\n\n</div><div class="dodont-part" data-type="do">\n\n#### Do\n\nUse colors that can be distinguished from each other to support merchants with different forms of [color blindness](https://webaim.org/articles/visual/colorblind).\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nRequire that merchants are able to see color to understand the information provided in the chart or graph.\n\n</div></div>\n\nTo learn more, see guidance about [accessible colors in Polaris](https://polaris.shopify.com/design/colors#colors-follow-accessibility-guidelines).\n\n### Scalable vector graphics (SVGs)\n\n`<svg>` and `<canvas>` elements are excellent tools for creating engaging, dynamic visualizations in HTML. However, they are frequently difficult to access using assistive technologies. Assistive technology users may not be able to access content in the correct order, find text equivalents for visual information, or access interactions with the keyboard.\n\nIn general, hide `<svg>` elements from screen readers using `aria-hidden="true"` and provide a separate text equivalent for the graph or chart. Although different visualizations may benefit from different treatments, try to prioritize creating a consistent experience.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['data viz'],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: '3xNhxG6nIfptO9KtnHFl8',
    title: 'Design',
    excerpt:
      'These are the principles that shape how we design all the experiences across the Shopify admin.',
    slug: 'design',
    parentId: 'hiD70qGHVIevP_bXSrhu-',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'Slp1tMN0Ga_LhnojGudbf',
        blockType: 'Markdown',
        content:
          '![Design of Polaris for Admin, showcasing an admin interface and a mobile view](/images/design-intro@2x.png)\n\n### Fresh visual style\n\nA clean, simple style makes things feel approachable and&nbsp;efficient.\n\n### Faster performance\n\nElegant code and lightweight assets means pages load&nbsp;more&nbsp;quickly.\n\n### Future-friendliness\n\nBuilt for flexibility, design tokens and new infrastructure let us iterate easily across&nbsp;experiences.\n\n### Purposeful brand presence\n\nBeing intentional about when the Shopify brand comes forward, and when it takes a backseat, directs the focus to where it&nbsp;matters&nbsp;most.\n\n### Familiarity across experiences\n\nDefined patterns and guidelines help us design a wide variety of experiences that still always feel&nbsp;like&nbsp;Shopify.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['visual design', 'design language', 'design'],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'yeiO2CFwSTJXTu-1lw87W',
    title: 'Icons',
    excerpt:
      'Icons in the Shopify admin act as visual aids to help merchants complete tasks. They’re simple, informative, and build on the visual language of the design system.',
    slug: 'icons',
    parentId: 'hiD70qGHVIevP_bXSrhu-',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'omLCjJQFo8SZZLTSTcH2J',
        blockType: 'Markdown',
        content:
          '![A collection of various icons used in the Shopify Admin.](/images/icons-intro@2x.png)\n\n---\n\n## Principles\n\n### Simple over detailed\n\nDetailed icons increase cognitive load. Focus on simplicity to help merchants understand the concept the icon represents and recognize icons on smaller screens.\n\n### Literally literal\n\nLiteral symbols are easier to understand than abstract symbols. When possible, use symbols that represent the most basic idea or concept instead of a metaphorical one. If the concept can’t be conveyed literally (an activity like gardening, a profession like doctor), pick a logically related symbol (shovel, stethoscope).\n\n### Stay professional\n\nThe design of an icon communicates tone, much like the content it’s paired with. Focus on the effectiveness of the message instead of its ability to delight. In other words, prioritize representing the function, rather than how nice it looks.\n\n---\n\n## Creating icons\n\n![Five icons in order: a trash can to represent a delete action, a cogwheel to represent settings, a spyglass to represent search, a pin to represent location and a bell to represent notifications.](/images/icons-established@2x.png)\n\n### Use established icons\n\nIcons that have been used for a long time worldwide have a higher chance of being recognized and understood quickly. Don’t reinvent an icon that’s already been accepted as the convention. There are global, established conventions for concepts like “delete,” “settings,” and “search.” These symbols are effective, and don’t need to be redefined.\n\n![An icon of a cogwheel that represents Store, Product, and global settings.](/images/icons-limit-variations@2x.png)\n\n### Limit variations\n\nUse a single icon to represent variations of the same concept. Shipping settings, store settings, account settings, and any new settings should use the cog icon. Don’t create a custom icon for each of these concepts—it bloats the icon library and makes it difficult for merchants to create strong connections around a concept.\n\n![Various icons paired with text, notably the icon of a house with the word "Home", the icon of a computer with the word "Desktop" and an icon of an arrow pointing up and another pointing down with the word "Sort".](/images/icons-pairing@2x.png)\n\n### Pair icons with text\n\nThe purpose of an icon is to clarify the content by providing a visual cue and improve legibility and scannability of the user interface. In general, icons should be placed near a label or title. Never use an icon to replace a name of a product or feature—the rare exception being an icon that’s a universally understood action, like the trash can icon that represents deletions.\n\n![Five icons representing the currency of different countries: a dollar, a euro, a british pound, an indian rupee and a japanese yen.](/images/icons-internationalization@2x.png)\n\n### Keep internationalization in mind\n\nWhenever possible, use a universally recognized icon. However, there will be times where only a locally understood icon will work to communicate a concept. When deciding what symbol should be used, check that it will be understood at a glance by people from different cultures and backgrounds.\n\n---\n\n## When to use icons\n\nIcons are powerful visual helpers and should be used with care. Overuse quickly results in user interfaces that are visually overwhelming or distracting.\nIcons are commonly used:\n\n- In primary navigation\n- In page headers and section titles\n- In banners to bring attention to a specific theme, such as an announcement or an error\n- Inline with text to add clarity\n- To direct attention to something the merchant can take action on\n\nTo browse all available icons, visit the [Icons library](https://polaris.shopify.com/icons).\n\n## System icons\n\nSystem icons help merchants find their way around and shouldn’t be ornamental. They’re smaller than spot icons because they’re always applied in product experiences where it’s important that they complement the user experience and not overpower it. They should represent a specific action, object, or concept.\n\n![Icons in a navigation menu.](/images/icons-system-20@2x.png)\n\n### Major icons—20×20\n\nMajor system icons are:\n\n- Primarily used in navigation to support wayfinding\n- Used to help promote, reinforce, or draw special attention to a specific area or metaphor\n- 20×20 in size\n- Within a 20×20 bounding box\n\n![Smaller icons in a drop-down menu](/images/icons-system-16@2x.png)\n\n### Minor icons—16×16\n\nMinor system icons are:\n\n- Used inline to add clarity to an action\n- Used in form elements (`<input>`, `<button>`, etc.)\n- 16×16 in size\n- Within a 20×20 bounding box\n\n---\n\n## Spot icons\n\n![Larger, spot icons of a spyglass for a "results not found" error, an upwards arrow for a file upload card, and an exclamation point for a "page not found" error.](/images/icons-spot@2x.png)\n\nSpot icons reinforce messaging in product experiences that are seen more than once. Spot&nbsp;icons&nbsp;are:\n\n- Bigger than system icons and have a stronger stroke weight to add visual balance to the layout\n- 60×60 in size\n- Within a 60×60 bounding box',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'shopify icons',
      'icon sets',
      'icon designs',
      'icon guidelines',
      'icon standards',
      'iconography',
      'visual helpers',
      'minor icons',
      'major icons',
      'inline icons',
      'in-line icons',
      'main navigation icons',
      'main nav icons',
      'icons in nav',
      'icons in main nav',
      'icon colors',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'WvSJD2mcWz5Q325AP0wPz',
    title: 'Illustrations',
    excerpt:
      'The Shopify admin uses a precise illustration style to help merchants quickly and clearly understand how things work across every experience.',
    slug: 'illustrations',
    parentId: 'hiD70qGHVIevP_bXSrhu-',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'NQEOmaftys4VETa36bqww',
        blockType: 'Markdown',
        content:
          '![The illustration of a chair, in simples straight lines, followed by a version with curves and some color, followed by a final version with filled shapes and shadows.](/images/illustrations-intro@2x.png)\n\n---\n\n## Principles\n\n### Always be useful\n\nIllustration adds information. It provides context, adds clarity, or leads to the next step. It gives merchants a deeper understanding of what they’re working on.\n\n### Keep it in the family\n\nIllustrations are all part of the same visual family. Inconsistencies lower the overall quality of the experience, and can distract merchants or make them feel like they’re in the wrong place.\n\n### Be considerate\n\nIllustration should understand and support the merchant’s experience. Each illustration needs to feel appropriate for whatever situation it shows up in.\n\n### Stay focused\n\nEach illustration conveys one thing. The story is easy to understand, so merchants intuitively know how to accomplish whatever they came here to do.\n\n---\n\n## Elements of style\n\n![A color palette and illustrations using the color palette](/images/illustrations-color@2x.png)\n\n### Color\n\nIllustrations use a special set of colors designed to work well in the places where they show up. The palette is limited: individual illustrations use whites, grays, and two or three colors each. Colors are also less saturated than the surrounding UI, so they don’t distract from core interactions.\n\n![Illustrations of a flag, a teapot, a leaf, and various profiles of people of different ethnicities.](/images/illustrations-shape@2x.png)\n\n### Shape\n\nObjects have realistic proportions so they’re easy to recognize. Simple geometric shapes with rounded corners build images that are clear and approachable. Representations of people use more organic shapes.\n\n![An illustration of a laptop and an illustration of shipping boxes separated on a white background](/images/illustrations-space@2x.png)\n\n### Space\n\nThe perspective is flat and two-dimensional so the entire area of the illustration is of equal importance. Drop shadows give things subtle depth when necessary. An additional side of an object can be added if things aren’t easily recognizable from a single side.\n\nEach illustration has negative space around it so it feels balanced in the place it lives, and so its visual weight is the same as other illustrations that live in the same places.\n\n![An stylized illustration of a chair with red lines defining its angles, next to an illustration of the profile of a person, with red lines to emphasize where curves are used.](/images/illustrations-line@2x.png)\n\n### Line\n\nLine makes and arranges shapes in the space. All illustrations have smooth lines without texture. Smaller objects have straighter lines, while larger objects can have more detailed, curved lines.\n\nIntersecting and continuous lines are a key element of the admin illustration style, but they aren’t forced. They make a simple illustration feel elegant and visually interesting without being distracting.\n\n![An intricate illustration of a shipping label, followed by an illustration of a sheet with a list of users, followed by a very simple illustration of an URL address bar.](/images/illustrations-detail@2x.png)\n\n### Detail\n\nIllustrations need some detail to make sense, but too much can be noisy. They have the minimum amount of detail necessary to make them feel realistic but still simple. Fine details are rarely smaller than 4px in height or width.\n\n---\n\n## Where illustrations live\n\nThere are places where illustrations always appear, and places where they’re used only sometimes.\n\n![An illustration of scissors cutting a coupon to indicate a page for discount code administration that has no discount codes saved.](/images/illustrations-empty-states@2x.png)\n\n### Empty states\n\nMerchants see an empty state illustration the first time they access a new part of the experience, before they’ve had the chance to do anything there yet. It introduces what they can do here, and sets expectations for what’s ahead.\n\n![An admin homecard with a small illustration next to some text describing how to customize a theme.](/images/illustrations-onboarding@2x.png)\n\n### Onboarding\n\nOnboarding tasks help new merchants set up their store. Illustrations frame what each task is for. And by changing in appearance, they reinforce when a task is complete.\n\n![An illustration celebrating a store anniversary.](/images/illustrations-announcements@2x.png)\n\n### Announcements\n\nAnnouncements let merchants know about something that might help their business. When the announcement celebrates a major merchant milestone or introduces an important product, illustration helps make it special or noticeable.\n\n![An illustration next to a card talking about Shopify Payments.](/images/illustrations-spot@2x.png)\n\n### Spot illustrations\n\nIn some rare instances, unique spot illustrations can be used to achieve a specific goal, like to draw attention to something important on a busy page, or to explain a technical concept.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['drawings', 'pictures'],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'NZKeUPyj8AURPUBkAA5VC',
    title: 'Interaction states',
    excerpt:
      'Interaction states communicate the status of an element in the interface, establish confidence once an action is taken, and suggest the ability (or inability) to interact with the element.',
    slug: 'interaction-states',
    parentId: 'hiD70qGHVIevP_bXSrhu-',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'xFTGaZGr6RsPAvAqIRMji',
        blockType: 'Markdown',
        content:
          '![A collection of buttons in different states](/images/interaction-states-intro@2x.png)\n\n---\n\n## Principles\n\n### Be subtle, but clear\n\nSuccessful interaction feedback is informative, not decorative. Avoid elaborate transitions that create visual noise or intense color changes. Distracting animation can create disturbance and make an interface unpleasant to use.\n\n### Keep things consistent\n\nConsistent treatments for interaction feedback create recognizable patterns. If an interaction produces different feedback across the Shopify admin, it deteriorates the integrity of the pattern and risks confusing merchants.\n\n---\n\n## Designing interaction states\n\nKeep in mind that merchants interact with interfaces differently depending which input device they’re using. Devices they may be using include:\n\n### Input devices to consider\n\n- Mouse\n- Touch screen\n- Keyboard\n- Voice\n- Game controller\n- Refreshable braille display\n\nTo learn more, check out the [accessibility guidelines](/foundations/accessibility).\n\n### Use signifiers\n\nProvide merchants with cues as to what the interface will do if they interact with it. By using signifiers we set expectations about what components can do, which creates a more intuitive interface that’s easier to use. The types of signifiers include:\n\n![A "sort" button in a default state.](/images/interaction-states-explicit@2x.png)\n\n**Explicit**, where content directs merchants to do the intended action, such as “Sort” or “Save.”\n\n![An "edit" button with its underline appearing when the mouse hovers above it.](/images/interaction-states-hidden@2x.png)\n\n**Hidden**, where the clue isn’t revealed until the merchant interacts with it, such as hovering or using tab navigation to see if a button is clickable.\n\n![A "print packing slip" button that is grayed out and inactive.](/images/interaction-states-negative@2x.png)\n\n**Negative**, where the action appears inactive (like the button is grayed out and doesn’t respond to hover) because it isn’t available for the merchant to use.\n\n![A toast component, a button with a spinner component and a text field component with an error message.](/images/interaction-states-behavior@2x.png)\n\n### Behavior\n\n**Use feedback indicators** like the [progress bar](https://polaris.shopify.com/components/progress-bar) component or the [spinner](https://polaris.shopify.com/components/spinner) component to let them know that the interface received their request. If appropriate, you can also provide added information about what or how long it will take to complete.\n\n**For non-disruptive feedback** on the outcome of an action, use the [toast](https://polaris.shopify.com/components/feedback-indicators/toast) component.\n\n**For an unsuccessful completion** that requires the merchant to take action, provide information about what prevented the action from completing successfully and what the merchant can do to fix the problem. For example, use the validation error state of the [text field](https://polaris.shopify.com/components/selection-and-input/text-field) component.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'visual patterns',
      'color strategy',
      'interaction states',
      'hover',
      'focus',
      'active',
      'selected',
      'disabled',
      'subdued',
      'state',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'iFM26nE5Lk77jeJp5frnb',
    title: 'Sounds',
    excerpt:
      'We use sound to communicate information and to enhance how merchants experience the Shopify admin. Sound patterns make interactions easier and more predictable.',
    slug: 'sounds',
    parentId: 'hiD70qGHVIevP_bXSrhu-',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'KmzjN9JCp8dvelC2yi-Ry',
        blockType: 'Markdown',
        content:
          '![Visual representation of sound waves as concentric circles](/images/sound-intro@2x.png)\n\n---\n\n## Principles\n\n### Selectively urgent\n\nThe duration, volume, and character of a sound should all be dictated by the level of urgency of an event. For example, an alert indicating that a customer is struggling to complete checkout requires more urgent attention and immediate action. An alert indicating that a customer has arrived at a storefront is informative, but doesn’t require immediate action. The sounds used during these events should be customized to reflect the differences in urgency.\n\n### Avoid annoying repetition\n\nSome sounds occur many times per day. While appealing on first listen, a sound may become irritating after ten, and unbearable after a hundred. Merchants that hear a sound repeatedly may quickly grow tired of it. **Our sounds should be informative and not annoying.** When possible, use data to determine how often a sound is triggered.\n\n### Distinct and succinct\n\nMerchants are likely to hear our sounds in a variety of contexts. Clean, focused, and succinct sounds convey information better than muffled or distorted sounds.\n\n### Test across devices\n\nWhile you may be testing your designs using headphones or loudspeakers that reveal the audible frequency spectrum clearly, a smartphone speaker will affect the quality of the sound. Smaller speakers are more susceptible to distortion. Sounds on mobile devices should be played at lower levels than on a desktop computer or laptop. Test sounds on a variety of devices and volume&nbsp;levels.\n\n### Think beyond sound\n\nSome people can’t rely on sound to receive cues or notifications. Merchants may have a disability that affects hearing or auditory processing. Depending on the merchant’s preferences and technologies, they may receive sound cues through haptic or visual feedback, but don’t assume that they’ll be able to perceive sound. Always include an alternative method to convey information, like text-based notifications or visual changes in the interface.\n\n---\n\n## When to use sound\n\nSounds in our product help convey information. There’s an important balance between having too many sounds and not enough. Useful and well-planned sounds will help with merchant understanding. Unnecessary sounds will reduce the perceived quality of our product.\n\nEven though merchants might miss important information if they turn off their sound, we should always provide the option for them to do so.\n\n### Common sound events\n\n- For an event that requires a merchant’s immediate attention, use an alert to encourage them to pause their workflow and take care of things.\n- For something that’s useful for a merchant to do, but not necessarily immediately, use a notification.\n- To confirm success, use feedback for a successful action.\n- For statement of failure, use feedback for unsuccessful action.\n\n---\n\n## How to approach sound design\n\nBe creative and intentional with your sound design. And remember:\n\n- Short sounds should be no longer than 250ms, long sounds no longer than 1 second.\n- Sounds should be in the same “family.” If you introduce a new note, key, or timbre, make sure there’s a good reason.\n- Create two versions of every sound:\n  - A louder version for desktop applications.\n  - A quieter version for mobile applications where the speakers are smaller and may distort more easily.\n\nDesign sounds with as much intentionality as other design aspects of Shopify’s products.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['audio', 'sonic', 'noise'],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'LJZ5nyi8uAZSXN2VofW-3',
    title: 'Space',
    excerpt:
      'Space is the distance between objects in your design. It should be used to complement the purpose of a page, by creating hierarchy and helping  the content become more useful and understandable.',
    slug: 'space',
    parentId: 'hiD70qGHVIevP_bXSrhu-',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'tUlwtl2M8UwazzhTTiVhI',
        blockType: 'Markdown',
        content:
          '<!-- inline css styling for html video and images -->\n<style>\n.space-hero {\n  margin: 40px -30px 40px -30px;\n}\n\n.punit-img {\n  display: block;\n  margin: 40px auto 40px auto;\n  width: 75%;\n}\n</style>\n\n---\n\n<div class="space-hero">\n  <img src="/images/spacing-polaris-size-units.svg" alt="A visual example of a polaris unit">\n</div>\n\n---\n\n## Spacing must...\n\n![Illustrations of blocks representing each principle](/images/principles@2x.png)\n\n### 1. Create visual groupings\n\nThe more items are related, the closer they should be to each other.\n\n### 2. Complement function\n\nUse tighter spacing for large amounts of information, use looser spacing for more focused content.\n\n### 3. Be harmonious\n\nUse Polaris space tokens in a way that is consistent with the rest of the experience.\n\n---\n\n## Spacing tools\n\n### Polaris space units\n\nAll measurements used across the experience (space, width, height, etc) must reference Polaris space units to guarantee visual consistency and balance.\n\n<div class="punit-img">\n  <img src="/images/spacing-polaris-units@2x.png" alt="A visual example of a polaris unit">\n</div>\n\n### Space scale\n\n| Value        | Space         | px value | rem value |\n| ------------ | ------------- | -------- | --------- |\n| 0            | --p-space-0   | 0        | 0         |\n| 0.25         | --p-space-025 | 1        | 0.0625    |\n| 0.5          | --p-space-05  | 2        | 0.125     |\n| **1 (base)** | --p-space-1   | 4        | 0.25      |\n| 2            | --p-space-2   | 8        | 0.5       |\n| 3            | --p-space-3   | 12       | 0.75      |\n| 4            | --p-space-4   | 16       | 1         |\n| 5            | --p-space-5   | 20       | 1.25      |\n| 6            | --p-space-6   | 24       | 1.5       |\n| 8            | --p-space-8   | 32       | 2         |\n| 10           | --p-space-10  | 40       | 2.5       |\n| 12           | --p-space-12  | 48       | 3         |\n| 16           | --p-space-16  | 64       | 4         |\n| 20           | --p-space-20  | 80       | 5         |\n| 24           | --p-space-24  | 96       | 6         |\n| 28           | --p-space-28  | 112      | 7         |\n| 32           | --p-space-32  | 128      | 8         |\n\nPolaris units are more dense at a small scale, and less so as dimensions increase.\nThis is intentional to provide a good range to work with, but you must be deliberate in the units you decide to pair. We encourage designing with rhythm and contrast to achieve clear visual hierarchy. This often means skipping at least one unit in the scale when you’re pairing different spaces.\n\n![Examples of different variations of spacing](/images/spacing-scale-examples@2x.png)\n\nRepeating the same amount of spacing (left) and using more variation (right).\n\n<br/>\n\n### Column grid\n\nThe column grid is meant to give teams agency for page layouts, while still providing low level constraints that ensure consistent pages across the experience. This means teams should feel empowered to experiment with layout, as long as they use the column grid as a grounding element.\n\n<video width="100%" height="auto" controls autoplay muted loop>\n  <source src="/images/column.mp4" type="video/mp4">\n</video>\n\n<br/>\n\n### Breakpoints\n\n<video width="100%" height="auto" controls autoplay muted loop>\n  <source src="/images/breakpoints.mp4" type="video/mp4">\n</video>\n\nThe grid adapts to the viewport width. The amount of columns will change depending on how much space there is. This is a recommendation for how much should be displayed horizontally. Less columns means less content.\n\n<br/>\n\n| Screen size                              | Columns | Margin | Gutter | Navigation |\n| ---------------------------------------- | ------- | ------ | ------ | ---------- |\n| **XS** <br/> 0-489 <br/> Phones          | 6       | 16     | 16     | Collapsed  |\n| **SM** <br/> 490-767 <br/> Small tablets | 6       | 16     | 16     | Collapsed  |\n| **MD** <br/> 768-1039 <br/> Tablets      | 6       | 24     | 16     | Visible    |\n| **LG** <br/> 1040-1399 <br/> Laptops     | 12      | 24     | 16     | Visible    |\n| **XL** <br/> 1440+ <br/> Desktops        | 12      | 32     | 16     | Visible    |\n\nThe grid is meant to serve as a point of reference for page level design and alignment, but this doesn’t need to apply to component level layouts.\n\n---\n\n## Essentials for designing with space\n\n### Gestalt principles\n\nThe perception of any given page goes beyond the individual elements presented, and the space between them. People’s perception is heavily influenced by their own expectations and motivations.\nWhen designing, it’s key to consider that people look for patterns, and will always perceive things in their simplest form. For instance, a bunch of similar items stacked on top of each other will likely read as a list.\n\n![Different types of list items, such as menus, popovers, and dropdowns](/images/spacing-principles@2x.png)\n\n<br/>\n\nPeople look for patterns instinctively, and they lean of visual cues like:\n\n#### Similarity\n\nGrouping things based on physical appearance (shape, color, size, orientation).\n\n![Index table](/images/spacing-similarity@2x.png)\n\n<br/>\n\n#### Proximity\n\nGrouping things based on distance between objects.\n\n![Customers and orders page](/images/spacing-proximity@2x.png)\n\n<br/>\n\n#### Continuity\n\nGrouping things based on the way they are arranged.\n\n![Tag multiselect popover and media card](/images/spacing-continuity@2x.png)\n\nShadows inside popovers act as visual cues to indicate additional content when scrolled (left). Cards placed horizontally in a media carousel communicates related topics (right).\n\n<br/>\n\n#### Closure\n\nGrouping things that are implicitly enclosed by a larger object.\n\n![Order details page](/images/spacing-closure@2x.png)\n\n<br/>\n\n#### Common fate\n\nGrouping things based on how they move.\n\n<video width="100%" height="auto" controls autoplay muted loop>\n  <source src="/images/common-fate.mp4" type="video/mp4">\n</video>\n\n<br/>\n\n#### Common Region\n\nGrouping things that are explicitly enclosed by a larger object.\n\n![Customer details card](/images/spacing-common-region@2x.png)\n\nBecause people perceive these instinctively, we can use them as tools to create hierarchy, visual rhythm, and guide the user\'s eye to what’s important.\n\n---\n\n<br/>\n\n### Rhythm\n\nAlternating between objects and space creates a pattern. Repeated patterns create visual rhythm, which can be used to effectively direct the viewer’s attention.\nAnything can establish rhythm: space, typography, icons, color, shape, and size.\n\nLike in music, different types of rhythm serve a different purpose, in design there’s three worth highlighting:\n\n<br/>\n\n![Example of data table](/images/spacing-regular-rhythm@2x.png)\n\n**Regular rhythm** is predictable, which makes it a useful way to organize large sets of objects that have the same level of importance.\n\n<br/>\n\n![Location profile page](/images/spacing-flowing-rhythm@2x.png)\n\n**Flowing rhythm** is organic, and it can bring a high level of scannability to something that would be otherwise a random collection of objects.\n\n<br/>\n\n![Home page with progressive disclosure card](/images/spacing-progressive-rhythm@2x.png)\n\n**Progressive rhythm** is a gradual progression, and is very effective in giving the eye a path to follow, along the progression. This is great to establish hierarchy and aid the user through a series of steps.\n\nRhythm plays another job in designs, it’s the norm that enables the introduction of variation and points of attention, otherwise known as contrast.\n\n---\n\n<br/>\n\n### Density\n\nThe overall perception people get from the space between information as a whole is density. It can range from tight to loose, and there is a very different purpose for each end of the spectrum.\n\n![Examples showign tigher versus looser spacing](/images/spacing-density@2x.png)\n\nTighter spacing (left) makes it easier to scan and comprehend large sets of data, like lists and tables. It also naturally enables one to fit more elements in a given page.\nLooser space (right) can help attract the user attention and make a layout feel more user-friendly.\n\n---\n\n<br/>\n\n### Contrast\n\nContrast is meant to create sticking points that help make content easy to scan, highlight important pieces of information, or just to give viewers a moment to breathe.\n\n![Marketing page and empty state](/images/spacing-contrast@2x.png)\n\n**Highlights (left)**: Callout cards are used to encourage merchants to take an action related to a new feature or opportunity.\n\n**Breather moment (right)**: Empty states provide explanation or guidance to help merchants progress.\n\nContrast can play a role at very different levels, but it must be used sparingly, otherwise its effect gets diluted.\n\n![Examples on the analytics page to show contrast](/images/spacing-analytics@2x.png)\n\nHome feed overview (left) and location profile analytics (right).\n\n---\n\n<br/>\n\n### Optical adjustment\n\nSometimes software will say two objects are aligned, or that they have the same size, but visually they don’t feel like that. This happens because computers aren’t great at perceiving visual weight or simultaneous color contrast, so we can’t fully rely on them to create balanced compositions.\n\nThat means designers must make optical corrections, using Polaris units until the space feels balanced. Some things to keep an eye out for:\n\n<br/>\n\n#### Visual weight ≠ Size\n\nTwo things can have the same size, but feel unbalanced.\n\n![Before and after comparison of optical adjustment applied to a button](/images/spacing-weight-buttons@2x.png)\n\nWithout optical adjustment, the disclosure icon appears too far from the right edge of the button. After optical correction, the perceived spacing is more balanced.\n\n![Before and after comparison of optical adjustment applied to an icon](/images/spacing-weight-icon@2x.png)\n\nThe square icon seems larger compared to the circle icon without optical adjustment, however, they in fact have the same size and diameter. The shapes look visually closer to each other after decreasing the size of the square.\n\n<br/>\n\n#### Colors affect each other\n\nTwo things can have the same colour, but feel unbalanced.\n\n![Before and after comparison of applying the same colour versus slightly different colours to a banner component](/images/spacing-colour@2x.png)',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'spacing',
      'space',
      'layout',
      'grid',
      'position',
      'margin',
      'padding',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'RNQp6alPIICwpYxg7HnrV',
    title: 'Typography',
    excerpt:
      'Typography helps establish hierarchy and communicate important content by creating clear visual patterns.',
    slug: 'typography',
    parentId: 'hiD70qGHVIevP_bXSrhu-',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'OwqshElAcoUMYKaTH3HEf',
        blockType: 'Markdown',
        content:
          '![An illustration of letters constructed from lego blocks](/images/text-featured@2x.png)\n\n## Working with typography\n\n![A series of three illustrations representing the principles make it readable, make it adaptable, reinforce the message](/images/text-principles@2x.png)\n\n### 1. Make it scannable\n\nKeep related text aligned and closer together to create visual groupings. For most languages, the the majority of text should be left-aligned.\n\n### 2. Adjust text based on device size and distance from the merchant\n\nBecause small screens are often at an arm\'s distance, we can decrease the size of larger headings and increase the size of important body text.\n\n### 3. Create visual hierarchy\n\nPair font weight, size, and color together to create hierarchy. Use a lighter color or font-size to de-emphasize secondary content.\n\n---\n\n## Essentials for designing with type\n\nWhen designing with type, we can use a combination of font size, weight, color, and space to ensure a strong hierarchy and scannability of a page. By understanding the fundamentals, you’ll be able to better apply type to the UI.\n\n### Using the bounding box\n\nThe bounding box is the vertical height of the text and is defined by the text’s line-height. The value of the line-height is critical to make sure text aligns to the 4px grid. Refer to individual type styles for specified heights.\n\n![An image showing how the bounding box applies to text elements](/images/text-bounding-box@2x.png)\n\n### Using the baseline\n\nThe baseline is the imaginary line that letters rest on. Align text horizontally to the baseline for a simple clean look.\n\n![An image showing the baseline and how it applies to text elements](/images/text-align-baseline@2x.png)\n\nThere are situations where it makes sense to have multiple text sizes on a single line to establish hierarchy of elements. Aligning to the text’s baseline instead of center gives a more harmonious look.\n\n![An example of aligning text elements to the baseline](/images/text-center-baseline@2x.png)\n\n### Line length\n\nLine length describes the width of the content. For longer body text, the recommended line length is between 40 to 60 characters.\n\n![A diagram showing the ideal line length for text](/images/text-line-length@2x.png)\n\n### Color\n\nColor can be used to add contrast and reinforce the hierarchy between text.\n\nFor example, one way to distinguish between a title and a subtitle is to apply `--p-text-color` to the title, and `--p-text-subdued` to the subtitle. Using a lighter color for secondary information provides contrast between the text and helps reinforce hierarchy even when the text is the same size and weight.\n\n![An image showing how you can use color to add hierarchy within text elements](/images/text-color-different@2x.png)\n\n### Space\n\nWe can help merchants navigate the UI by grouping related information together. One way to do this is to use space to create relationships between elements on a page.\n\nAmbiguous spacing can cause confusion and make it hard to understand the content.\n\n![An image of showing how to use space to create hierachy and relationships between text elements](/images/text-spacing-adjustments@2x.png)\n\n---\n\n## Font sizes\n\nAll font sizes have a ratio of 1.2, known as the major third type scale. This means that each size is multiplied or divided by 1.2 from the previous size, starting with the base size, and rounded to a multiple of 4px.\n\n| Token             | px value | rem value |\n| ----------------- | -------- | --------- |\n| `p-font-size-700` | 40       | 2.5       |\n| `p-font-size-600` | 32       | 2         |\n| `p-font-size-500` | 28       | 1.75      |\n| `p-font-size-400` | 24       | 1.5       |\n| `p-font-size-300` | 20       | 1.25      |\n| `p-font-size-200` | 16       | 1         |\n| `p-font-size-100` | 14       | 0.875     |\n| `p-font-size-75`  | 12       | 0.75      |\n\n---\n\n## Type styles\n\nPolaris type styles are grouped into two categories: heading and body. Each has a default set of variants along with a set of options to allow for flexibility and a wide range of applications within the user interface. They use one scale, so they can be applied to any screen size.\n\n### Body styles\n\nBody styles are used within components and blocks of text.\n\n![An image showing how body styles are applied](/images/text-body-example-01@2x.png)\n\n### Heading styles\n\nHeading styles are used to create various levels of hierarchy on the page. These styles range in size and weight. Using a blend of the two can help distinguish content and guide merchants through the page.\n\n`headingXl` - `heading4xl` styles are typically used for numerals and key moments in the merchant’s journey. As the largest text on the screen, use these styles sparingly within a single page. These styles should draw the merchant’s attention to important key pieces of information.\n\n![An image showing how heading styles are applied](/images/text-heading-example-01@2x.png)\n\n`headingXs` - `headingLg` styles are most commonly used for card, section, or page titles.\n\n![An image showing how large heading styles are applied](/images/text-heading-example-02@2x.png)\n\n### Responsive styles\n\nLarge heading styles, `headingLg` - `heading4xl`, are responsive and will change size at different breakpoints.\n\nSmall heading styles, `headingXs` - `headingMd`, and body styles will remain the same size regardless of breakpoint unless specified. You can choose to adjust the size of these styles at specific breakpoints when needed. For instance, you may need to increase the size of important body text on smaller screens.\n\n<video width="100%" height="auto" controls autoplay muted loop>\n  <source src="/images/text-responsive.mp4" type="video/mp4">\n</video>\n\n![An image showing how heading styles change based on breakpoint](/images/type-responsive-styles@2x.png)\n\n### Uppercase styles\n\nThe design language no longer supports uppercase typography. We recommend using the [Text component](/components/typography/text) to apply visual hierarchy. Work with your team to determine a type style that works best for your use case.\n\n---\n\n## Font stack\n\nWe use a font stack that adapts to the operating system it runs on, like macOS, iOS, Windows, Android or Linux distributions.\n\n![A diagram showing a selection of default iOS, Mac, Windows, Android and Linux fonts](/images/type-fontstack@2x.png)\n\n- Apple devices will display [San Francisco](https://developer.apple.com/fonts/)\n- Android devices will display\n  [Roboto](https://material.io/guidelines/resources/roboto-noto-fonts.html)\n- Devices running Windows will display\n  [Segoe UI](https://en.wikipedia.org/wiki/Segoe#Segoe_UI)\n- Machines running Linux will display the default sans-serif font for any running distribution\n\nThis font-stack makes sure all browsers can load platform-specific fonts:\n\n```\n-apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif\n```\n\nAdd this to your CSS to preload system fonts and set up browsers for legibility:\n\n```css\nhtml {\n  /* Load system fonts */\n  font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI,\n    Roboto, Helvetica Neue, sans-serif;\n\n  /* Make type rendering look crisper */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n\n  /* Deactivate auto-enlargement of small text in Safari */\n  text-size-adjust: 100%;\n\n  /* Enable kerning and optional ligatures */\n  text-rendering: optimizeLegibility;\n}\n\n/**\n * Form elements render using OS defaults,\n * so font-family inheritance must be specifically declared\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit;\n}\n```\n\n---\n\n## Mobile considerations\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Refer to the platform’s native font scales when designing experiences for native apps\n- Refer to the small-screen scale when designing experiences for mobile browsers\n- Use the platform-specific component library\n\n</div><div class="dodont-part" data-type="do">\n\n#### Do\n\n- Use the native font scale\n- Keep in mind that all UI elements containing text will be affected\n- Explore additional content height, width, truncation, and line wraps\n\n</div></div>',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['type styles', 'font sizes', 'fonts'],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'gU54j1srj3fRu6DSLEVGC',
    title: 'Foundations',
    excerpt:
      'Polaris is the design system for the Shopify admin. It’s the shared language that guides how we build high-quality merchant experiences.',
    slug: 'foundations',
    parentId: null,
    order: 2,
    layout: 'listing',
    blocks: [],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: true,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'BxY370qGKRP1tSeAPUHS1',
    title: 'Accessibility',
    excerpt:
      'Making commerce better for everyone means caring deeply about making quality products. A quality product should have a fantastic user experience (UX).',
    slug: 'accessibility',
    parentId: 'gU54j1srj3fRu6DSLEVGC',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'Um_jY13b21QaW2l8PN1o6',
        blockType: 'Markdown',
        content:
          'This includes:\n\n- A beautiful and functional design\n- Consistent and useful [copy](/content/product-content)\n- Principles of\n  [universal design](https://en.wikipedia.org/wiki/Universal_design) and inclusivity\n\n---\n\n## Usable for everyone\n\nIt’s important that Shopify products—and [Partner](https://www.shopify.ca/partners) products—are usable and useful to everyone.\n\nEveryone is a pretty big group. It includes our merchants, their customers, our developer partners, our employees, and the greater tech community at large. That also includes all members of our community who have disabilities.\n\nDisabilities may affect how people move, see, hear, communicate, learn, understand, and process information.\nAs a result, it’s important to consider how to design and develop your product to support a wide range of needs and experiences.\n\nIn the United States, as many as 1 in 4 adults has at least 1 disability [Source: [CDC](https://www.cdc.gov/media/releases/2018/p0816-disability.html)]. In Canada, the estimate is 22%, and elsewhere in the world the estimate is closer to 1 in 7 [Source: [Statistics Canada](https://www150.statcan.gc.ca/n1/pub/11-627-m/11-627-m2018035-eng.htm), [World Bank](https://www.worldbank.org/en/topic/disability)].\n\n---\n\n## Building inclusive experiences\n\nUsing our [components](/components) is a way to improve accessibility and consistency when building products for Shopify.\n\n- The component library in this style guide includes code we can use across applications\n- This component code includes accessible markup\n- Since the code exists in a single component that gets reused, it’s easier to update and fix any bugs\n\nThe build-it-once, use-it-everywhere model means the accessibility knowledge of the designers and developers who build these components is available to all of Shopify and our partners. Because of this, merchants get a consistent experience that can be leveraged into accessible products.\n\nMany accessibility features come free in the components. But, it’s important to make sure that components are integrated in a way that doesn\'t create unforeseen accessibility barriers. Depending how components are used, there may be more design and implementation considerations. Be sure to test user task flows post integration.\n\n### Managing focus to support merchant workflows\n\nDon’t programmatically move focus to new content without merchant input. Polaris components that use controls to display overlays, such as modals and popovers, manage focus automatically.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- When a merchant activates a link that goes elsewhere in the page, move focus to that content\n- When a merchant must access an overlay, move focus to it\n- When a merchant submits a form that results in an error, move focus to the error message\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- Move focus when content updates in the background\n- Move focus when the user is actively working elsewhere on the page\n\n</div></div>\n\nThe only case where focus should be managed without the merchant’s okay is when the merchant needs to be interrupted because they cannot continue their current workflow.\n\n### Limiting non-standard interactions\n\nMerchants will expect to interact with controls and content in ways that follow the defaults for their browser, platform, and assistive technologies. Introducing non-standard features can give merchants better ways of accomplishing tasks, but they can also create barriers.\n\nFor example, merchants who rely on the keyboard will expect that buttons can be activated with the <kbd>enter</kbd>/<kbd>return</kbd> key or the <kbd>space</kbd> key. If buttons are programmed to be used with different keys, merchants will need to be instructed on how to use them.\n\nBefore designing or building custom features that use non-standard controls or interactions, first consider whether the goal can be met using native features.\n\nIf non-standard interactions _are_ required:\n\n- Carefully follow guidelines and best practices for designing, building, and testing custom features on your platform\n- Give merchants clear instructions for using the custom feature\n- Provide an additional, standard way to accomplish the task\n\n### Assistive technology support\n\nOur components are tested for accessibility with automated and manual techniques. Merchants should expect to be able to access features built with our components using modern assistive technologies. These include native and third-party tools like:\n\n- Screen readers\n- Speech recognition programs\n- Supports for low vision and color blindness\n- Alternative keyboards\n- Switch devices\n- Tools for readability\n\n### Coding standards\n\nPolaris components start with web standards for HTML, CSS, and JavaScript. Features from the Accessible Rich Internet Applications (WAI-ARIA or ARIA) specification are used to build functionality that is not available in native HTML.\n\n### Alternative text\n\nTo help people who rely on assistive technologies, such as a screen reader or other text to speech programs, our components use [alternative text](/content/alternative-text) for icons and images used to convey information and actions (like buttons and links).\n\n### Meeting the Web Content Accessibility Guidelines (WCAG)\n\nPolaris targets WCAG 2.1 Level A and Level AA success criteria, and seeks to provide a highly usable experience for everyone.\n\nFor more information, see the following resources:\n\n- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)\n- [ARIA 1.1](https://www.w3.org/TR/wai-aria-1.1/)\n- [Shopify\'s statement of commitment to accessibility](https://www.shopify.com/accessibility)\n\n### Feedback\n\nSometimes, building accessible and inclusive experiences can be difficult. If we’ve made any mistakes in this style guide, please\n[reach out by creating a GitHub issue](https://github.com/Shopify/polaris-react/issues) and help us make it better.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'a11y',
      'universal design',
      'inclusive',
      'inclusivity',
      'disability',
      'disabilities',
      'people with disabilities',
      'persons with disabilities',
      'accessible markup',
      'accessible mark up',
      'accessible code',
      'accessible',
      'diversity',
      'diverse',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: '0SCJoz385tVPB1gSR40IN',
    title: 'Shopify experience values',
    excerpt:
      'At Shopify, we empower commerce at a global scale. We build products, tools, and services for people to start, manage, and scale their businesses. We manage enormous complexity for commerce giants, and give new entrepreneurs the best chance to succeed.',
    slug: 'experience-values',
    parentId: 'gU54j1srj3fRu6DSLEVGC',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'kJkcaAqOAuF071qf9ULUZ',
        blockType: 'Markdown',
        content:
          'These values are at the heart of how we build experiences at Shopify. They’re important whether you work at Shopify or you’re developing third-party apps or themes.\n\n---\n\n## Our approach\n\nThe best part of this shared set of values is the conversations they enable. They are fantastic lenses through which to view, critique, and improve our work.\n\nWe always aspire for Shopify experiences to feel:\n\n### Considerate\n\nAbove all else, we show care for the people who use our tools and products. We’re here to make their day-to-day and long-term work better — no matter who they are, where they are, or what platform they’re using.\n\n- Build experiences that work on every screen, on every platform, in every language, and in every country.\n- Take time to understand where we can build for a general audience, and where we should offer different paths for different needs.\n- Respect the reality of this work – don’t assume the perfect situation, preparation, or usage.\n\n### Empowering\n\nWe want people to feel like they can accomplish whatever they’re trying to do. Our experiences should give people confidence that they’re capable of achieving their goals, no matter their level of experience.\n\n- Help users complete their tasks, without taking away decisions or independence.\n- Optimize for the most important tasks without blocking people from doing the rest.\n- Hide complexity where you can, but give people access to more sophistication if they need it.\n\n### Crafted\n\nShopify experiences should feel like they were created with the highest level of craftsmanship. Through thoughtful details and small touches, we combine the power of professional tools with the simplicity of consumer products.\n\n- Work to understand the complex problems users face, then find clear and approachable solutions to those problems.\n- Delight people with how powerful and effective an experience is, not with extra decoration or flair.\n- Look for meaningful ways to make experiences more natural, friendly, and thoughtful.\n\n### Efficient\n\nShopify experiences should help people achieve their goals quickly, accurately, and with less effort. We value speed and simplicity, but we value productivity even more.\n\n- Break complex tasks down into simple steps, and remove repetitive tasks whenever you can.\n- Use friction to highlight important decisions, then let users get back to work.\n- Give users the ability to reduce and optimize their workloads through automation and bulk actions.\n\n### Trustworthy\n\nWe constantly work to earn trust with our users. We pay attention to detail. We’re genuine and transparent because it shows we’re acting in users’ best interests.\n\n- Fix small mistakes and inconsistencies that erode trust.\n- Be transparent about what features and tools can or can’t do.\n- Make safe and positive actions frictionless. If they’re risky, give clear instructions and greater control. Make it easy to recover from mistakes.\n\n### Familiar\n\nWe want people to feel comfortable using our products, whether it’s their first time using them or their hundredth. Our experiences should embody the same principles, act the same way, and fit together seamlessly.\n\n- Think bigger than any individual task or product. Understand the context users are working in.\n- Use familiar patterns to make experiences intuitive and recognizable.\n- Evolve experiences seamlessly. They should keep getting better with time and information.',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'mission',
      'approaches',
      'design principles',
      'design values',
      'ux principles',
      'ux values',
      'user experience principles',
      'user experience values',
      'shopify mission',
      'shopify approaches',
      'shopify design principles',
      'shopify ux principles',
      'shopify principles',
      'merchant first',
      'merchant-first',
      'empower',
      'considerate',
      'empowering',
      'crafted',
      'efficient',
      'trustworthy',
      'familiar',
      'don’t overwhelm',
      'cohesive experiences',
      'polished',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'Ms75HlbUsAEWfa4JDHO9J',
    title: 'Formatting localized currency',
    excerpt:
      'Currencies are formatted differently in different countries and languages.',
    slug: 'formatting-localized-currency',
    parentId: 'gU54j1srj3fRu6DSLEVGC',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'L8fmJRSWgjVHEZd8bRTkU',
        blockType: 'Markdown',
        content:
          'There’s a currency formatting framework to:\n\n- Help more merchants sell globally\n- Localize currency formatting for merchants and customers everywhere\n- Unify the display of mixed currencies to help merchants manage multiple currency stores\n- Implement the formatting through APIs\n\n---\n\n## Definitions\n\nA store can have more than one type of currency and currency format.\n\n### Store currency\n\nThe main currency of the store and the Shopify default. All sales and reports are shown in the store currency.\n\n### Non-store currency\n\nAny other type of currency is called “non-store currency”. Types of non-store currency include:\n\n- Presentment currency: The type of currency that is presented to buyers in a merchant’s store. For multi-currency stores, it can be different from store currency.\n- Payout currency: The type of currency used to pay merchants for their sales. For multi-currency stores, it can be different from store currency.\n- Billing currency: The type of currency used to bill merchants for themes, app purchases, and monthly subscriptions. Billing currency is in USD only, but might include local currencies for tax purposes.\n\n### Short format\n\nIncludes the currency symbol and currency value. This format is used for currency that merchants are familiar with.\n\nExamples: \\$12.50; 12,50 €\n\n### Explicit format\n\nIncludes the currency symbol, currency value, and ISO code (for example, “USD” and “CAD”). Best used for currency that merchants aren’t familiar with and don’t expect to see.\n\nExamples: \\$12.50 CAD; 12,50 € EUR\n\n---\n\n## Aligning with global standards\n\nShopify uses [Common Locale Database Repository (CLDR)](http://cldr.unicode.org/) for localization formatting for currency, date, time, and amount.\n\n- It’s the recognized international standard\n- It automatically formats numbers and currency based on the merchant’s locale\n- The repository is maintained by a third party\n\nCLDR determines:\n\n- Whether the currency symbol appears before or after the amount (for example, $250, 250 USD, 250 $)\n- Whether decimals are used (for example, there are no “cents” in Japanese yen)\n- Whether the decimal sign is a period or a comma (for example, 37,50 or 37.50)\n- How to group numbers (for example, 10,000 or 1,0000, or using spaces)\n\nCLDR doesn’t determine the appropriate level of detail shown in different contexts. For example, it can’t determine when to show the currency symbol and value ([short format](#short-format)), or the currency symbol, value, and ISO code ([explicit format](#explicit-format)).\n\nThough short format is more efficient, it’s important to provide clarity for merchants who deal with unfamiliar currencies in multi-currency stores. In those cases, use explicit format.\n\n---\n\n## Design guidelines\n\nBecause CLDR formatting is limited, these guidelines will help you choose the appropriate level of currency detail to display in a multi-currency context.\n\n### Merchants\n\n#### Store currency\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\nDefault to [short format](#short-format).\n\n![Short format in today’s sales card](/images/do-use-short-format@2x.png)\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\nUse [explicit format](#explicit-format) except when presenting store currency within in a mixed-currency context.\n\n![Incorrect explicit format in today’s sales card](/images/dont-use-explicit-format@2x.png)\n\n</div></div>\n\n#### Non-store currency\n\n- Use explicit format when showing total amounts, an amount within a button, or in a paragraph\n- Use short format when showing non-total amounts with total amounts\n\n![](/images/paid-status-explicit@2x.png)\n\nThis example shows a scenario where the presentment currency is in USD, which is different than the store currency. The non-total amounts in the paid status card are in short format, and the total amounts are in explicit format.\n\n![](/images/refund-non-store-currency@2x.png)\n\nThis example shows a scenario refunding an order that’s in a non-store currency.\n\n![](/images/short-format-non-total@2x.png)\n\nThis example illustrates the use of short format for non-total amounts and explicit format for total amounts in a data table.\n\n#### Negative amount display\n\nAlways place the negative symbol before the currency and amount in either format.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n- \\-\\$4.20\n- -12,50 €\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n- \\$-4.20\n- 12,50 €-\n\n</div></div>\n\n### Customers\n\n- Default to explicit format whenever prices are customer-facing. Use short format for unit prices, itemized prices, and installment prices.\n- If there are enough indicators to let customers know which currency they’re looking at, short format may be sufficient. When using short format, make sure to always use explicit format for cart total, checkout total, and notification totals.\n\n![](/images/short-format-installment-prices@2x.png)\n\nThis example shows the use of short format for installment prices.\n\n![](/images/short-format-unit-prices@2x.png)\n\nThis example shows the use of short format for unit prices.\n\n![](/images/short-format-itemized-prices@2x.png)\n\nThis example shows the use of short format for itemized prices.\n\n---\n\n## Guiding questions when making design decisions\n\nUse the following questions to guide you when making decisions about currency formatting.\n\n**Does the merchant know which currency they’re looking at?**\n\n- Which currency do they expect to see?\n- Do they know which currency their orders are in if they have a multi-currency store?\n\n**Does the currency format support the merchant’s main task?**\n\n- Is the main task scanning, comparing and analyzing, or taking an action (for example, a refund)?\n\n**Are there enough details to make an informed decision?**\n\n- For example, do they know the currency of their non-store currency order refund?\n- Can they distinguish between the sales report and payout summary if the store currency and payout currency are different?\n\n**Can the UI be simplified without creating confusion?**\n\nWe don’t want to show [explicit format](#explicit-format) everywhere and for every task.\n\n- How can we make currency formatting both simple and accurate?\n\n---\n\n## Design tips\n\nMock up a scenario where the store, presentment, payout, and billing currencies are different. This scenario is becoming more common as more merchants start selling globally.\n\n### Use currencies that share the same symbol to test for clarity\n\nUSD, CAD, AUD, HKD, SGD are just a few of the many currencies that share the same symbol “\\$”.\n\n### Use Japanese Yen (JPY) amount to test currency length and space constraints\n\n1 USD is approximately 100 JPY. If there is enough space for the JPY amount, it should work for most other major currencies.\n\n### When in doubt, let the guiding questions help you make a decision\n\nThe guiding questions are meant to help make merchant-focused decisions about which format to use when the use case is unclear.\n\n---\n\n## Major currencies in their local formats\n\nThis table shows commonly-used currencies in short and explicit formats.\n\n| Currency                        | Locale       | Short format | Explicit format |\n| ------------------------------- | ------------ | ------------ | --------------- |\n| **US Dollar ($, USD)**          | en-US        | $12.50       | $12.50 USD      |\n| **Canadian Dollar ($, CAD)**    | en-CA        | $12.50       | $12.50 CAD      |\n|                                 | fr-CA        | 12,50 $      | 12,50 $ CAD     |\n| **Australian Dollar ($, AUD)**  | en-AU        | $12.50       | $12.50 AUD      |\n| **Euro (€, EUR)**               | de-DE, fr-FR | 12,50 €      | 12,50 € EUR     |\n|                                 | en-IE        | €12.50       | €12.50 EUR      |\n|                                 | nl-NL        | €12,50       | €12,50 EUR      |\n| **British Pounds (£, GBP)**     | en-GB        | £12.50       | £12.50 GBP      |\n| **Japanese Yen (¥, JPY)**       | ja-JP        | ¥1250        | ¥1250 JPY       |\n| **New Zealand Dollar ($, NZD)** | en-NZ        | $12.50       | $12.50 NZD      |\n| **Hong Kong Dollar ($, HKD)**   | zh-HK        | $12.50       | $12.50 HKD      |\n| **Singapore Dollar ($, SGD)**   | zh-SG        | $12.50       | $12.50 SGD      |\n| **Danish Krone (Kr, DKK)**      | da-DK        | 12,50 kr.    | 12,50 kr. DKK   |\n\n---\n\n## Implementation\n\nTo format currency in a React component, use the [`Shopify/react-i18n`](https://github.com/Shopify/quilt/tree/master/packages/react-i18n) library’s `formatCurrency` method. You can select either `short` or `explicit` formatting by setting the `form` option as shown in the code example below.\n\n```jsx\nimport {useI18n} from \'@shopify/react-i18n\';\n\nconst [i18n] = useI18n();\n\ni18n.locale = \'de-AT\';\n\nconst eurDeAt = i18n.formatCurrency(price, {\n  currency: \'EUR\',\n  form: \'short\',\n});\n\nconst eurDeAtExp = i18n.formatCurrency(price, {\n  currency: \'EUR\',\n  form: \'explicit\',\n});\n```',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'internationalization',
      'localization',
      'currency',
      'currencies',
      'money',
      'euro',
      'dollar',
      'formatting',
      'short format',
      'explicit format',
      'internationalizing',
      'localizing',
      'locale',
      'overseas',
      'international',
      'global',
      'japan',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'xc0tREoIQ_lHVeUbBY6zR',
    title: 'Information architecture',
    excerpt:
      'Everything we create at Shopify has an underlying foundation of information architecture. If you’re a designer, a content strategist, or a UX developer, you’re already doing IA work.',
    slug: 'information-architecture',
    parentId: 'gU54j1srj3fRu6DSLEVGC',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'x3L0DqJn-5OPwAAu9TLfr',
        blockType: 'Markdown',
        content:
          '## Defining IA\n\nInformation architecture is the practice of organizing, structuring, and labeling content in an effective and sustainable way. Whether you’re creating an app, part of the Shopify admin, a new feature, or an editorial page, these IA principles are here to help you make content usable and findable.\n\n---\n\n## Why we do IA\n\n1. Simplify complexity: Information should be structured and managed in the simplest way possible.\n2. Support scalability: Good IA practices will help us avoid overhauling our previous work whenever the product grows or changes.\n3. Create familiarity: Regardless of how our merchants access Shopify, it should feel like the same product. Creating a common experience goes beyond design and extends to how we structure Shopify’s content.\n\n---\n\n## Our IA principles\n\nThese principles will help you make good IA decisions no matter what you’re working on.\n\n### Show your audience where they are\n\nSuccessful wayfinding happens when your audience can make navigation decisions that fulfill their goal. For navigation to enable wayfinding:\n\n- Establish multiple navigation schemes\n- Use task-based navigation\n- Integrate secondary navigational support (like breadcrumbs)\n\nNavigation is a tool that serves a number of wayfinding purposes.\nGood navigation allows our merchants to explore a topic in depth, switch tasks easily, and filter information.\n\nIn the Shopify admin, merchants can find their way using multiple navigation schemes:\n\n- Structural: main navigation, local navigation, breadcrumbs\n- Associative: contextual links to other features or help documentation\n- Utility: linked avatars to access your account, search\n\nIn the Shopify admin, merchants can find their way to the blog posts page using the side navigation (nav) and search. They can use the breadcrumb to go up to the main level in the Online Store section of the nav. They can also access related help documentation through the contextual “learn more” footer at the bottom of the page.\n\n![Blog posts page breadcrumbs and left side navigation](/images/blogposts-breadcrumb-nav@2x.png)\n\n### Give content one home and many doors\n\nAll people are unique and have different information-seeking behaviors. For example, one person might start their experience from various points in a product or shift their focus midway through a task. They might also begin a task on one device and finish it on another. To facilitate these behaviors, all screens should have meaningful navigation and bridge content to other parts of the product.\n\nThe content on the Shopify Help Center’s shipping page only lives in the Help Center—we don’t duplicate it in the Shopify admin or on our marketing pages. But even though it only lives in one place, we give merchants access to it when it’s likely that they’ll need more context on shipping (like through a link on our shipping settings page in the Shopify admin).\n\n![shipping labels settings with link to docs](/images/shippinglabels-link@2x.png)\n\n### Avoid information overload\n\nAlthough we want to give our merchants all the information they need to complete a task, we need to avoid overloading them with information. Don’t over-simplify, but don’t burden your user with choice. To do this in design, we use progressive disclosure, but this principle also applies to information architecture. To practice progressive disclosure in IA:\n\n- Gradually reveal information as it’s requested\n- Provide multiple access points to information\n- Eliminate redundant content\n\nThe content on the [Shopify Capital page](https://www.shopify.com/capital) on Shopify.com summarizes the benefits of receiving capital from Shopify at a high level. After scanning the summary, merchants have the option to access more information about the program with a link to the [docs on the Shopify Help Center](https://help.shopify.com/en/manual/your-account/shopify-capital?itcat=capital&itterm=capital-resources-help-docs). By progressively disclosing information in this way, we help merchants reach decisions faster and avoid the frustration and disorientation of front-loading with too much detail.\n\n![capital page landing page](/images/capitalpage-hero@2x.jpg)\n\n### Plan for growth and change\n\nInformation architecture, like design, is not set in stone. It should change with your product. As such, the IA decisions you make need to leave room for growth while also continuing to promote consistency across the experience.\n\nThe [Shopify.com homepage](https://www.shopify.com/) takes a scalable approach to page architecture—the structure was designed to adapt as Shopify expands to different locations. This was done by taking a modular approach.\n\nEach locale can customize the homepage to meet their needs. For example, for 2 stories, they can use 2 banners. For 3, they can use 1 banner and 2 tiles.\n\n![Three content components Denmark page](/images/de-component@2x.png)\n\n![2 content components India page](/images/india-component@2x.jpg)\n\nTo make sure your IA decisions are scalable:\n\n- Communicate early and often, within and outside of your team.\n  Open the lines of communication when doing IA work and make sure your work aligns with the work of other areas of the product.\n- Think about the future and how the work you’re doing will intersect with other projects.\n- Create content groups that are flexible enough to accommodate growth, while being meaningful to the user.\n- Consider how your IA will adapt to multiple environments and their existing patterns (for instance, iOS, Android, desktop browsers, chat bots, retail products like Point of Sale).',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'IA principles',
      'info architecture',
      'wayfinding',
      'way finding',
      'navigation',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: '6rh4Fsf9ocnhRPDQcOAgq',
    title: 'Internationalization',
    excerpt:
      'Make commerce better for everyone by building interfaces that work everywhere. These guidelines will help you design, write, and build products that can be used in every part of the world.',
    slug: 'internationalization',
    parentId: 'gU54j1srj3fRu6DSLEVGC',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'ZF3bYKqeQjPYagdT8b0gC',
        blockType: 'Markdown',
        content:
          'We want our merchants to experience Shopify in a way that’s appropriate and meaningful to them, no matter where they are in the world.\n\nWe aim to build one experience that works for all merchants in all of our markets. However, when a certain experience doesn’t fit a specific market, we should tailor it.\n\n---\n\n## Definitions\n\n### Internationalization\n\nBuilding your product and interface so they can be used in different locales. This includes creating flexible interfaces that allow for text expansion and changes to word order.\n\n### Localization\n\nAdapting your product and interface for different locales to make them a good cultural fit. This includes adapting features, changing visuals, and translating text.\n\n### Translation\n\nConverting text from one language to another. Not to be confused with localization, translation is just one part of localizing a product.\n\n### Locale\n\nA linguistic region defined by both its language and country. Examples:\nFrench-France (fr-FR); French-Canada (fr-CA); Portuguese-Brazil (pt-BR). Note that languages and countries won’t always have a 1:1 mapping.\n\n---\n\n## Plan for text expansion\n\nWhen interfaces are localized, the content will often expand in length. In most languages, text is up to 50% longer on average than English. Some non-Latin languages, such as Japanese, take up more vertical space. For character-based languages, text wrapping and line breaking can’t always rely on spaces to separate words. Your interface needs to be flexible enough to accommodate language-specific formatting and text expansion without changing its context of use.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n![Good example of flexible layouts with text expansion](/images/info-hierarchy-do@2x.png)\n\nLay out your elements in a way where text expansion doesn’t hinder your information hierarchy.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n![Bad example of flexible layouts with text expansion](/images/info-hierarchy-dont@2x.png)\n\nDon’t rely on responsive stacking alone. It can often change the hierarchy of information of the layout. In this case, the text expansion causes the line break at the wrong spot, placing the button in the middle of the heading and content of this card.\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n![Good example of narrow columns with text expansion](/images/narrow-columns-do@2x.png)\n\nUse single columns to stack elements flexibly to accomodate for text expansion.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n![Bad example of narrow columns with text expansion](/images/narrow-columns-dont@2x.png)\n\nAvoid using narrow columns in smaller components. Ensure the right amount of padding for a clean interface.\n\n</div></div>\n\n### Tips\n\n- Always assume the worst-case scenario for text length, especially on mobile and in layouts such as tables and columns. Avoid using narrow columns.\n- Pay particular attention to content elements that only have a few words. In English, labels and buttons [exclude words such as “a” or “the”](/content/actionable-language#buttons), but many other languages need to include them. Overall these small pieces of text may expand up to 300%.\n- Our components are designed to be expandable, but you should still test them in your designs and builds. Check the CSS layout to make sure text doesn’t overflow when the screen size is reduced.\n- Work with linguistic experts to review line breaks and word wrapping for character-based languages, like Chinese or Japanese, to ensure they don’t break sentences.\n\n---\n\n## Plan for changes in word order\n\nWord order can change dramatically in translation. If the layout and functionality of your interface is dependent on a certain word order, it’s likely to break when localized.\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n![Good example of avoiding sentence-based UI](/images/sentence-based-ui-do@2x.png)\n\nIf content elements need to stay in a certain position on the page, implement them as separate labels, outside of sentences.\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n![Bad example of sentence-based UI](/images/sentence-based-ui-dont@2x.png)\n\nDon’t place elements with a fixed position inside a sentence. The order of this sentence would often need to change in translation, which is impossible to do if the interface is built this way.\n\n</div></div>\n\n<div class="dodont"><div class="dodont-part" data-type="do">\n\n#### Do\n\n![Good example of hyperlinking text](/images/hyperlink-text-do@2x.png)\n\nWhen including links in body text, only use a single and descriptive term or a small part of a phrase as the link. Find out more about [links](/content/actionable-language#links).\n\n</div><div class="dodont-part" data-type="dont">\n\n#### Don’t\n\n![Bad example of link within sentence](/images/hyperlink-text-dont@2x.png)\n\nDon’t use full phrases as links. Word order changes might break the link into several parts when translated.\n\n</div></div>\n\n### Tips\n\n- Assume the word order of every sentence in your interface will change when translated.\n- Avoid using UI components to build sentences.\n- Avoid splitting one sentence into several strings, known as concatenated strings. If you use concatenated strings, translators won’t be able to change the word order and their translations won’t make sense.\n- Avoid using variables in your strings as it will translate differently.\n\n---\n\n## Plan for cultural differences\n\nMerchants in each locale have different cultural sensibilities. Use visuals, content, and interface formats that are useful and meaningful to merchants in all parts of the world.\n\n![Good example of icon usage](/images/icons-meaning@2x.png)\n\nWhen possible, use universally known icons. Be mindful of when you use country-specific icons and where they are surfaced. Find out more about [icons](/design/icons).\n\n![Bad example of text fields](/images/colors-cultural-context@2x.png)\n\nBe mindful of using colors to represent meaning. Colors can hold discrete connotations in different cultures. For example, in North America, green is used to indicate success and red for failure, as opposed to China, where red symbolizes prosperity and good fortune.\n\n### Tips\n\n- When using photos, illustrations, icons, or emojis, make sure the visuals you’re using are not offensive or culturally insensitive. If you’re unsure about a visual you’re using, research it or ask someone with local knowledge.\n- When naming features, be mindful of connotations in other cultures, especially for evocative names and acronyms. Find out more about [naming](/content/naming).\n- Avoid colloquial words, idioms, and references to popular culture. It’s difficult to translate them in a meaningful way.\n- In some cultures, a person’s given name comes first, whereas in other cultures the family name comes first. Let merchants choose how they want to enter, read, and sort names, especially in text fields and lists.\n- Many types of information, such as addresses, dates, numbers, and currencies, are shown in different formats in different locales. For example, some locales display currency symbols before the number, others display them after. Make sure these can be translated appropriately. Find out more about [formatting localized currency](/foundations/formatting-localized-currency#navigation).\n- Some cultures expect more guidelines and instructions when filling in long or critical forms. Consider using asterisks to mark mandatory fields in a form to match that expectation.\n- Work with people that have local knowledge if possible.\n\n---\n\n## Internationalize Polaris components\n\n- When designing with a Polaris component, test the localized versions to make sure it still works with the rest of your interface.\n  If you need a certain component to adapt, but it hasn’t yet been internationalized in Polaris, you can open a feature request in [GitHub](https://github.com/Shopify/polaris-react/issues/).',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'internationalization',
      'localization',
      'translation',
      'internationalizing',
      'localizing',
      'translating',
      'locale',
      'overseas',
      'international',
      'global',
      'globalization',
      'japan',
      'germany',
      'france',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'YJ9-FKn-_4iDhozggnnan',
    title: 'Getting Started',
    excerpt:
      'Polaris is the design system for the Shopify admin. If you’re just starting out with Polaris, here’s a list of recommended resources and guidance to get you started.',
    slug: 'getting-started',
    parentId: null,
    order: 1,
    layout: 'listing',
    blocks: [],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'about',
      'polaris',
      'design system',
      'system',
      'getting started',
      'get started',
      'downloads',
      'begin',
      'figma',
      'ui kits',
      'plugins',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'IhT_el1PjMRksESVxK9_j',
    title: 'Component lifecycle',
    excerpt:
      'Polaris components move through a series of stages throughout their lifecycle. Within each stage, a component must meet a set of requirements.',
    slug: 'components-lifecycle',
    parentId: 'YJ9-FKn-_4iDhozggnnan',
    order: 1,
    layout: 'blocks',
    blocks: [
      {
        id: 'yYTL-0J1ayifRG70ftUfe',
        blockType: 'Markdown',
        content:
          '### Feedback and suggestions\n\nHave feedback, a question, or suggestion? [Create an issue](https://github.com/Shopify/polaris/issues/new) during any stage of a component’s lifecycle.\n\n---\n\n## Alpha\n\nThe component is a work in progress and ready for exploratory usage, with breaking changes expected. During this stage, we’re being critical about understanding the purpose of the component and what problem it’s trying to solve. If the purpose is unclear, we may decide not to move forward with the component and it could be removed without warning.\n\n### Requirements for alpha\n\n- Has a clear purpose and rationale for why it belongs in Polaris\n- Uses Polaris [tokens](https://polaris.shopify.com/tokens) with no references to any hard-coded static values\n- Designed with responsiveness in mind and can adapt across [breakpoints](https://polaris.shopify.com/tokens/breakpoints)\n- Meets known [accessibility](https://polaris.shopify.com/foundations/accessibility) requirements like: contrast, interactive states, touch target size, etc.\n- In progress documentation exists that includes the list of props with some examples\n- Documentation includes examples in Storybook\n- The component has 100% test coverage\n\n### What to expect during alpha\n\n- Usage is being evaluated, and may not progress to beta. Evaluation includes any necessary research and data that supports why the component belongs in Polaris.\n- Components could be changed completely, or removed from the system\n- Feedback is highly recommended and encouraged, [Create an issue](https://github.com/Shopify/polaris/issues/new)\n\n---\n\n## Beta\n\nThe component moves to beta once there’s a clear understanding of the problem and we’re confident in the solution. The focus of this stage is all about testing in enough environments to make sure the component is bug free.\n\nReady for wider adoption, encouraged for most cases. Breaking changes are possible in minor version updates.\n\n### Requirements for beta\n\n- Used multiple times in production (Shopify admin)\n- Meets all [accessibility](https://polaris.shopify.com/foundations/accessibility) requirements for our use cases\n- Usage guidelines and documentation covers common use cases\n- Reviewed and tested in production by designers and developers\n- Figma components available in the Polaris Components file\n\n### What to expect during beta\n\n- Work is being done to move to Stable\n- Manual and automated migration guidance is being worked on\n\n## Stable\n\nThe component is bug free and works in most, if not all, environments. It’s ready for full adoption, with long-term support expected.\n\n### Requirements for stable\n\n- The API is stable, with no breaking changes until the next major release (if necessary)\n- Usability testing and feedback has been gathered on UX and DX\n- Documentation exists for component props, variants, accessibility guidelines, and usage\n- Manual and automated migration documentation exists\n\n---\n\n## Legacy\n\nThe component will be deprecated and should be avoided.\n\n### Requirements for legacy components\n\n- Documentation exists for the legacy component and includes any alternative components\n- The deprecation date has been announced and is at least one month away from the release date of the package that deprecated the component\n- Manual and automated migration paths are documented and have been available for at least one month\n\n---\n\n## Deprecated\n\nThe component will be removed and should be avoided.\n\n### Requirements for deprecation\n\n- Documentation exists for the deprecation and includes any alternative components\n- The component includes deprecation warnings when used\n- The removal date has been announced and is at least one month away from the release date of the package that removes the component\n- Manual and automated migration paths are documented and have been available for at least one month',
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [
      'components',
      'component lifecycle',
      'component stages',
      'alpha',
      'beta',
      'stable',
      'legacy',
      'deprecated',
    ],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'RcL0vGdq3vHWp1ik_fSKm',
    title: 'Polaris 101',
    excerpt:
      'The Polaris design system is used by designers and developers to build world-class Shopify admin experiences.',
    slug: 'polaris-101',
    parentId: 'YJ9-FKn-_4iDhozggnnan',
    order: 0,
    layout: 'blocks',
    blocks: [
      {
        id: 'C3AbXqkctLoCfHp5_ZKht',
        blockType: 'Markdown',
        content:
          "## What’s the Shopify admin?\n\nMerchants set up their store, configure settings, and manage their business using the admin. It includes core aspects of the merchant’s business, including orders, products, and customers.\n\n![Partial screenshots of the admin in mobile and web](/images/mobile-web-admin@2x.png)\n\n## What is Polaris?\n\nPolaris is the design system for the Shopify admin. It’s the shared language that guides how we build high-quality merchant experiences.\n\nThe design system is made up of design guidance, code libraries, development opinions, and API documentation on how to build merchant experiences for the Shopify admin.\n\n## Who is Polaris for?\n\nPolaris is used both internally at Shopify and externally by app developers and designers.\n\n## What are Shopify apps?\n\nThe admin includes installable apps that are distributed through the Shopify App Store. They enable merchants to add functionality to their stores without leaving the familiar environment of the admin.\n\nBy building with Polaris and [App Bridge](https://shopify.dev/apps/tools/app-bridge) and following the [App Design Guidelines](https://shopify.dev/apps/design-guidelines), you'll create a streamlined experience with the rest of the Shopify admin.",
      },
    ],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['polaris', 'shopify admin'],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'NDozcn4bPkPFKVJNCsYd2',
    title: 'Tools',
    excerpt: 'Extensions, plugins, and other tools to help build with Polaris.',
    slug: 'tools',
    parentId: null,
    order: 10,
    layout: 'listing',
    blocks: [],
    allowChildren: true,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: '4IqZXcBxc2Kkcj2p-czli',
    title: 'Icons',
    excerpt: '',
    slug: 'icons',
    parentId: null,
    order: 8,
    layout: 'blocks',
    blocks: [],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'RQme7c7UJMuFNtbwuh9j6',
    title: 'Icons in Figma',
    excerpt: '',
    slug: 'icons-in-figma',
    parentId: '4IqZXcBxc2Kkcj2p-czli',
    order: 0,
    layout: 'blocks',
    blocks: [],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['icon', 'icons', 'figma', 'ui kit'],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'OmA122Tp1HOe4Eurrws5J',
    title: 'Icons in React',
    excerpt: '',
    slug: 'icons-in-react',
    parentId: '4IqZXcBxc2Kkcj2p-czli',
    order: 1,
    layout: 'blocks',
    blocks: [],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: ['icon', 'icons', 'figma', 'ui kit'],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: '9J8USAdbmdd2ai5innKN4',
    title: 'Tokens',
    excerpt: '',
    slug: 'tokens',
    parentId: null,
    order: 7,
    layout: 'listing',
    blocks: [],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'u6zE99HadhpCrmUlMHMJf',
    title: 'Colors',
    excerpt: '',
    slug: 'colors',
    parentId: '9J8USAdbmdd2ai5innKN4',
    order: 0,
    layout: 'blocks',
    blocks: [],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: '094hPJwe_hKGb2VCEiuGL',
    title: 'Fonts',
    excerpt: '',
    slug: 'font',
    parentId: '9J8USAdbmdd2ai5innKN4',
    order: 1,
    layout: 'blocks',
    blocks: [],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'gxDnHAGCjpbTMav3b6KZq',
    title: 'Shape',
    excerpt: '',
    slug: 'shape',
    parentId: '9J8USAdbmdd2ai5innKN4',
    order: 2,
    layout: 'blocks',
    blocks: [],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'GnFEHAxYdAnjb5I1qb9zT',
    title: 'Spacing',
    excerpt: '',
    slug: 'spacing',
    parentId: '9J8USAdbmdd2ai5innKN4',
    order: 3,
    layout: 'blocks',
    blocks: [],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'yY2XO-1xg4-EFZuETbY4z',
    title: 'Depth',
    excerpt: '',
    slug: 'depth',
    parentId: '9J8USAdbmdd2ai5innKN4',
    order: 5,
    layout: 'blocks',
    blocks: [],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'VA-O3kirXgtJDc1DMXj6w',
    title: 'Motion',
    excerpt: '',
    slug: 'motion',
    parentId: '9J8USAdbmdd2ai5innKN4',
    order: 6,
    layout: 'blocks',
    blocks: [],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: 'OaA97jMdYLKtg6WmeBZy-',
    title: 'Breakpoints',
    excerpt: '',
    slug: 'breakpoints',
    parentId: '9J8USAdbmdd2ai5innKN4',
    order: 7,
    layout: 'blocks',
    blocks: [],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },

  {
    id: '9yannGyO2LjWV-D02FtCL',
    title: 'Z-index',
    excerpt: '',
    slug: 'zIndex',
    parentId: '9J8USAdbmdd2ai5innKN4',
    order: 8,
    layout: 'blocks',
    blocks: [],
    allowChildren: false,
    hideInNav: false,
    hasNewBadge: false,
    noIndex: false,
    keywords: [],
    childPageMetaType: null,
    pageMeta: null,
    hasSeparatorInNav: false,
    thumbnailImage: {
      alt: '',
      width: 0,
      height: 0,
      lightModeFilename: '',
      darkModeFilename: '',
    },
  },
];
export const content: State = {pages};
