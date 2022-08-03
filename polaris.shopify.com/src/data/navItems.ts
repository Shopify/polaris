import type { NavItem } from "../components/Nav";

interface NavItemWithIconChild extends NavItem {
  icon: string;
  description: string;
}

interface NavItemWithIcon extends NavItem {
  children?: NavItemWithIconChild[];
}

export const foundationsNavItems: NavItemWithIcon[] = [
  {
    title: "Foundations",
    children: [
      {
        title: "Experience values",
        url: "/foundations/foundations/experience-values",
        icon: "HeartMajor",
        description:
          "At Shopify, we empower commerce at a global scale. We build products, tools, and services for people to start, manage, and scale their businesses. We manage enormous complexity for commerce giants, and give new entrepreneurs the best chance to succeed.",
      },
      {
        title: "Accessibility",
        url: "/foundations/foundations/accessibility",
        icon: "AccessibilityMajor",
        description:
          "Making commerce better for everyone means caring deeply about making quality products.",
      },
      {
        title: "Internationalization",
        url: "/foundations/foundations/internationalization",
        icon: "GlobeMajor",
        description:
          "Make commerce better for everyone by building interfaces that work everywhere. These guidelines will help you design, write, and build products that can be used in every part of the world.",
      },
      {
        title: "Information architecture",
        url: "/foundations/foundations/information-architecture",
        icon: "CategoriesMajor",
        description:
          "Everything we create at Shopify has an underlying foundation of information architecture.",
      },
      {
        icon: "CashYenMajor",
        url: "/foundations/foundations/formatting-localized-currency",
        title: "Currency",
        description:
          "Currencies are formatted differently in different countries and languages.",
      },
    ],
  },

  {
    title: "Design",
    children: [
      {
        title: "Design",
        url: "/foundations/design/design",
        icon: "PaintBrushMajor",
        description:
          "These are the principles that shape how we design all the experiences across the Shopify admin.",
      },
      {
        title: "Colors",
        url: "/foundations/design/colors",
        icon: "ColorsMajor",
        description:
          "Our color system builds on the recognition of the Shopify brand colors to make the admin interface more usable.",
      },
      {
        title: "Typography",
        url: "/foundations/design/typography",
        icon: "TypeMajor",
        description:
          "Shopify admin provides a constrained, purposeful set of typographic styles. These styles map to functional roles so you know when to use what.",
      },
      {
        title: "Illustrations",
        url: "/foundations/design/illustrations",
        icon: "IllustrationMajor",
        description:
          "The Shopify admin uses a precise illustration style to help merchants quickly and clearly understand how things work across every experience.",
      },
      {
        title: "Sounds",
        url: "/foundations/design/sounds",
        icon: "SoundMajor",
        description:
          "We use sound to communicate information and to enhance how merchants experience the Shopify admin. Sound patterns make interactions easier and more predictable.",
      },
      {
        title: "Icons",
        url: "/foundations/design/icons",
        icon: "IconsMajor",
        description:
          "Icons in the Shopify admin act as visual aids to help merchants complete tasks. They’re simple, informative, and build on the visual language of the design system.",
      },
      {
        title: "Interaction states",
        url: "/foundations/design/interaction-states",
        icon: "BuyButtonMajor",
        description:
          "Interaction states communicate the status of an element in the interface, establish confidence once an action is taken, and suggest the ability (or inability) to interact with the element.",
      },
      {
        title: "Spacing",
        url: "/foundations/design/spacing",
        icon: "Columns3Major",
        description:
          "Consistent spacing creates visual balance that makes the user interface (UI) easier for merchants to scan. Apply consistent spacing to improve the quality of the UI.",
      },
      {
        title: "Data visualizations",
        url: "/foundations/design/data-visualizations",
        icon: "AnalyticsMajor",
        description:
          "Visualizations surface patterns in data, and provide immediate answers to a single, specific question.",
      },
    ],
  },

  {
    title: "Content",
    children: [
      {
        title: "Voice and tone",
        url: "/foundations/content/voice-and-tone",
        icon: "ChatMajor",
        description:
          "Learn how to apply Shopify’s voice and choose the right tone, no matter what product, feature, or app you’re building.",
      },
      {
        title: "Accessible and inclusive language",
        url: "/foundations/content/accessible-and-inclusive-language",
        icon: "AccessibilityMajor",
        description:
          "Our mission is to make commerce better for everyone. Building products for everyone means creating inclusive content.",
      },
      {
        title: "Grammar and mechanics",
        url: "/foundations/content/grammar-and-mechanics",
        icon: "GrammarMajor",
        description:
          "This guide is to help designers, developers, recruiters, UX-ers, product managers, support advisors, or anyone who writes public-facing text for Shopify.",
      },
      {
        title: "Naming",
        url: "/foundations/content/naming",
        icon: "ProductsMajor",
        description:
          "The names we give our products and features teach merchants how to use Shopify and how to find the things they need to run their business.",
      },
      {
        title: "Actionable language",
        url: "/foundations/content/actionable-language",
        icon: "CircleRightMajor",
        description:
          "Merchants use Shopify to get things done. Content should be written and structured to help them understand and take the most important actions.",
      },
      {
        title: "Product content",
        url: "/foundations/content/product-content",
        icon: "ColumnWithTextMajor",
        description:
          "Thoughtful, consistent interface content is a core element of a well-designed user experience.",
      },
      {
        title: "Help documentation",
        url: "/foundations/content/help-documentation",
        icon: "QuestionMarkInverseMajor",
        description:
          "After you build an app or other integration, writing help documentation will show merchants how to use it.",
      },
      {
        title: "Merchant-to-customer content",
        url: "/foundations/content/merchant-to-customer",
        icon: "EmailNewsletterMajor",
        description:
          "Shopify creates content for different audiences. One of those audiences is merchants’ customers. A customer is a person or organization who interacts with a Shopify merchant or a merchant’s sale channel.",
      },
      {
        title: "Alternative text",
        url: "/foundations/content/alternative-text",
        icon: "ImageAltMajor",
        description:
          "Shopify aims to provide an inclusive experience. Alternative text (alt text) helps people with low or loss of vision use our products.",
      },
    ],
  },

  {
    title: "Patterns",
    children: [
      {
        title: "Loading",
        url: "/foundations/patterns/loading",
        icon: "RefreshMajor",
        description:
          "Navigating the Shopify admin should be fast, meaningful, and focused, but unintentional loading can get in the way and break a merchant's flow. To deliver a continuous experience, we need to consider loading states when planning and prototyping.",
      },
      {
        title: "Page layouts",
        url: "/foundations/patterns/page-layouts",
        icon: "ThemesMajor",
        description:
          "Polaris provides many layout patterns that help you create efficient and familiar interfaces.",
      },
      {
        title: "Home cards",
        url: "/foundations/patterns/home-cards",
        icon: "TextBlockMajor",
        description:
          "Home cards make actionable recommendations based on data from the merchant’s store, or give merchants feedback about their store’s performance.",
      },
      {
        title: "Error messages",
        url: "/foundations/patterns/error-messages",
        icon: "DiamondAlertMajor",
        description:
          "Error messages can be scary. Make errors visible to merchants, easy to understand, and helpful.",
      },
      {
        title: "Text fields",
        url: "/foundations/patterns/text-fields",
        icon: "FormsMajor",
        description:
          "Text fields are a combination of the field label (the title) and the input area. Inputs can be typed text, URLs, date pickers, and more.",
      },
      {
        title: "Help content",
        url: "/foundations/patterns/help-content",
        icon: "QuestionMarkInverseMajor",
        description:
          "​Help content is educational text that describes interactive elements or offers information about concepts in the UI.",
      },
      {
        title: "Pickers",
        url: "/foundations/patterns/pickers",
        icon: "LocationMajor",
        description:
          "Picking experiences present merchants with options to browse, find, and select from to perform an action. Pickers can help merchants navigate to a new page, filter an index table, or input one or more values in a form.",
      },
    ],
  },
];

export const contributingNavItems = [
  {
    title: "Contributing to Polaris",
    children: [
      {
        title: "Introduction",
        url: "/contributing",
      },
      {
        title: "Code of Conduct",
        url: "/contributing/code-of-conduct",
      },
      {
        title: "Components",
        url: "/contributing/components",
      },
      {
        title: "Figma UI Kit",
        url: "/contributing/figma-ui-kit",
      },
      {
        title: "Icons",
        url: "/contributing/icons",
      },
      // add illustrations back in when we have more helpful content
      // {
      //   title: "Illustrations",
      //   url: "/contributing/illustrations",
      // },
      {
        title: "Documentation",
        url: "/contributing/documentation",
      },
    ],
  },
  {
    title: "Guides",
    children: [
      {
        title: "Designing with a system",
        url: "/contributing/designing-with-a-system",
      },
      {
        title: "When to contribute new patterns",
        url: "/contributing/when-to-contribute-new-patterns",
      },
      {
        title: "Shipping your contribution",
        url: "/contributing/shipping-your-contribution",
      },
    ],
  },
];
