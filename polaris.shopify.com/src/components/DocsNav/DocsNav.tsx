import Link from "next/link";
import styles from "./DocsNav.module.scss";

type Nav = {
  title: string;
  groups: Group[];
};

type Group = {
  label: string;
  items: Item[];
};

type Item = {
  label: string;
  url: string;
};

export const nav: { [key: string]: Nav } = {};

nav.foundations = {
  title: "Foundations",
  groups: [
    {
      label: "Experience values",
      items: [
        {
          label: "Shopify experience values",
          url: "/docs/foundations/experience-values",
        },
      ],
    },

    {
      label: "Key considerations",
      items: [
        {
          label: "Accessibility",
          url: "/docs/foundations/accessibility",
        },
        {
          label: "Internationalization",
          url: "/docs/foundations/internationalization",
        },
        {
          label: "Information architecture",
          url: "/docs/foundations/information-architecture",
        },
        {
          label: "Mobile",
          url: "/docs/foundations/mobile",
        },
      ],
    },

    {
      label: "Crafting user interfaces",
      items: [
        {
          label: "Designing apps for Shopify",
          url: "/docs/foundations/experience-values",
        },
        {
          label: "Designing onboarding flows",
          url: "/docs/foundations/experience-values",
        },
      ],
    },

    {
      label: "Patterns",
      items: [
        {
          label: "Formatting localized currency",
          url: "/docs/foundations/formatting-localized-currency",
        },
      ],
    },
  ],
};

nav.content = {
  title: "Content",
  groups: [
    {
      label: "Content guidelines",
      items: [
        {
          label: "Voice and tone",
          url: "/docs/content/voice-and-tone",
        },
        {
          label: "Accessible and inclusive language",
          url: "/docs/content/accessible-and-inclusive-language",
        },
        {
          label: "Grammar and mechanics",
          url: "/docs/content/grammar-and-mechanics",
        },
        {
          label: "Naming",
          url: "/docs/content/naming",
        },
        {
          label: "Actionable language",
          url: "/docs/content/actionable-language",
        },
        {
          label: "Product content",
          url: "/docs/content/product-content",
        },
        {
          label: "Help documentation",
          url: "/docs/content/help-documentation",
        },
        {
          label: "Merchant-to-customer content",
          url: "/docs/content/merchant-to-customer",
        },
        {
          label: "App release notes",
          url: "/docs/content/release-notes",
        },
        {
          label: "Vocabulary",
          url: "/docs/content/vocabulary",
        },
        {
          label: "Alternative text",
          url: "/docs/content/alternative-text",
        },
      ],
    },
  ],
};

nav.design = {
  title: "Design",
  groups: [
    {
      label: "Design guidelines",
      items: [
        {
          label: "Design",
          url: "/docs/design/design",
        },
        {
          label: "Colors",
          url: "/docs/design/colors",
        },
        {
          label: "Typography",
          url: "/docs/design/typography",
        },
        {
          label: "Illustrations",
          url: "/docs/design/illustrations",
        },
        {
          label: "Sounds",
          url: "/docs/design/sounds",
        },
        {
          label: "Icons",
          url: "/docs/design/icons",
        },
        {
          label: "Interaction states",
          url: "/docs/design/interaction-states",
        },
        {
          label: "Spacing",
          url: "/docs/design/spacing",
        },
        {
          label: "Data visualizations",
          url: "/docs/design/data-visualizations",
        },
      ],
    },
  ],
};

interface Props {
  id: string;
}

function DocsNav({ id }: Props) {
  return (
    <div className={styles.Wrapper}>
      {Object.entries(nav).map(([key, currentNav]) => (
        <>
          <h3>{currentNav.title}</h3>
          {currentNav.groups.map((section) => (
            <div key={section.label}>
              <h4>{section.label}</h4>
              <ul className={styles.NavItems}>
                {section.items.map((item) => (
                  <li>
                    <Link href={item.url}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      ))}
    </div>
  );
}

export default DocsNav;
