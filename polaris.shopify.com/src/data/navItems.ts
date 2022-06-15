import { NavItem } from "../components/Nav/Nav";
import * as Icons from "./foundationsIcons";

interface NavItemWithIconChild extends NavItem {
  icon: JSX.Element;
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
        icon: Icons.ExperienceValuesIcon,
      },
      {
        title: "Accessibility",
        url: "/foundations/foundations/accessibility",
        icon: Icons.AcessibilityIcon,
      },
      {
        title: "Internationalization",
        url: "/foundations/foundations/internationalization",
        icon: Icons.InternationalizationIcon,
      },
      {
        title: "Information architecture",
        url: "/foundations/foundations/information-architecture",
        icon: Icons.InformationArchitectureIcon,
      },
      {
        title: "Mobile",
        url: "/foundations/foundations/mobile",
        icon: Icons.MobileIcon,
      },
      // {
      //   title: "Designing apps for Shopify",
      //   url: "/foundations/foundations/designing-apps",
      // },
      // {
      //   title: "Onboarding flows",
      //   url: "/foundations/foundations/designing-onboarding-flows",
      // },
      // {
      //   title: "Currency",
      //   url: "/foundations/foundations/formatting-localized-currency",
      // },
    ],
  },

  {
    title: "Design",
    children: [
      {
        title: "Design",
        url: "/foundations/design/design",
        icon: Icons.DesignIcon,
      },
      {
        title: "Colors",
        url: "/foundations/design/colors",
        icon: Icons.ColorsIcon,
      },
      {
        title: "Typography",
        url: "/foundations/design/typography",
        icon: Icons.TypographyIcon,
      },
      {
        title: "Illustrations",
        url: "/foundations/design/illustrations",
        icon: Icons.IllustrationsIcon,
      },
      {
        title: "Sounds",
        url: "/foundations/design/sounds",
        icon: Icons.SoundsIcon,
      },
      {
        title: "Icons",
        url: "/foundations/design/icons",
        icon: Icons.IconsIcon,
      },
      {
        title: "Interaction states",
        url: "/foundations/design/interaction-states",
        icon: Icons.InteractionStatesIcon,
      },
      {
        title: "Spacing",
        url: "/foundations/design/spacing",
        icon: Icons.SpacingIcon,
      },
      {
        title: "Data visualizations",
        url: "/foundations/design/data-visualizations",
        icon: Icons.DataVisualizationsIcon,
      },
    ],
  },

  {
    title: "Content",
    children: [
      {
        title: "Voice and tone",
        url: "/foundations/content/voice-and-tone",
        icon: Icons.VoiceAndToneIcon,
      },
      {
        title: "Accessible and inclusive language",
        url: "/foundations/content/accessible-and-inclusive-language",
        icon: Icons.AccessibleAndInclusiveLanguageIcon,
      },
      {
        title: "Grammar and mechanics",
        url: "/foundations/content/grammar-and-mechanics",
        icon: Icons.GrammarAndMechanicsIcon,
      },
      {
        title: "Naming",
        url: "/foundations/content/naming",
        icon: Icons.NamingIcon,
      },
      {
        title: "Actionable language",
        url: "/foundations/content/actionable-language",
        icon: Icons.ActionableLanguageIcon,
      },
      {
        title: "Product content",
        url: "/foundations/content/product-content",
        icon: Icons.ProductContentIcon,
      },
      {
        title: "Help documentation",
        url: "/foundations/content/help-documentation",
        icon: Icons.HelpDocumentationIcon,
      },
      {
        title: "Merchant-to-customer content",
        url: "/foundations/content/merchant-to-customer",
        icon: Icons.MerchantToCustomerContentIcon,
      },
      // {
      //   title: "App release notes",
      //   url: "/foundations/content/release-notes",
      // },
      {
        title: "Vocabulary",
        url: "/foundations/content/vocabulary",
        icon: Icons.VocabularyIcon,
      },
      {
        title: "Alternative text",
        url: "/foundations/content/alternative-text",
        icon: Icons.AlternativeTextIcon,
      },
    ],
  },

  {
    title: "Patterns",
    children: [
      {
        title: "Loading",
        url: "/foundations/patterns/loading",
        icon: Icons.LoadingIcon,
      },
      {
        title: "Page layouts",
        url: "/foundations/patterns/layout",
        icon: Icons.PageLayouts,
      },
      {
        title: "Mobile patterns",
        url: "/foundations/patterns/mobile-patterns",
        icon: Icons.MobilePatternsIcon,
      },
      {
        title: "Home cards",
        url: "/foundations/patterns/home-card-guidelines",
        icon: Icons.HomeCardsIcon,
      },
      {
        title: "Error messages",
        url: "/foundations/patterns/error-messages",
        icon: Icons.ErrorMessagesIcon,
      },
      {
        title: "Text fields",
        url: "/foundations/patterns/text-fields",
        icon: Icons.TextFieldsIcon,
      },
      {
        title: "Help content",
        url: "/foundations/patterns/help-content",
        icon: Icons.HelpContentIcon,
      },
      {
        title: "Locations",
        url: "/foundations/patterns/locations",
        icon: Icons.LocationsIcon,
      },
    ],
  },
];

export const contributingNavItems = [
  {
    title: "Contributing to Polaris",
    url: "/contributing",
    children: [
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
      {
        title: "Documentation",
        url: "/contributing/documention",
      },
    ],
  },
  {
    title: "Guides",
    children: [
      {
        title: "Thinking in systems",
        url: "/contributing/thinking-in-systems",
      },
      {
        title: "When to evolve the system",
        url: "/contributing/when-to-evolve-the-system",
      },
    ],
  },
];
