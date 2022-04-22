import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Page from "../../../components/Page";
import Longform from "../../../components/Longform";
import fs from "fs";
import path from "path";
import { parseMarkdown } from "../../../utils/markdown.mjs";
import Markdown from "../../../components/Markdown";
import { NavItem } from "../../../components/Nav/Nav";
import {
  getTitleForTitleTag,
  getUrlsFromNavItems,
} from "../../../utils/various";
import Nav from "../../../components/Nav";
import { MarkdownFile } from "../../../types";

export const navItems: NavItem[] = [
  {
    title: "Foundations",
    children: [
      {
        title: "Experience values",
        children: [
          {
            title: "Shopify experience values",
            url: "/docs/foundations/experience-values",
          },
        ],
      },

      {
        title: "Key considerations",
        children: [
          {
            title: "Accessibility",
            url: "/docs/foundations/accessibility",
          },
          {
            title: "Internationalization",
            url: "/docs/foundations/internationalization",
          },
          {
            title: "Information architecture",
            url: "/docs/foundations/information-architecture",
          },
          {
            title: "Mobile",
            url: "/docs/foundations/mobile",
          },
        ],
      },

      {
        title: "Crafting user interfaces",
        children: [
          {
            title: "Designing apps for Shopify",
            url: "/docs/foundations/designing-apps",
          },
          {
            title: "Designing onboarding flows",
            url: "/docs/foundations/designing-onboarding-flows",
          },
        ],
      },

      {
        title: "Patterns",
        children: [
          {
            title: "Formatting localized currency",
            url: "/docs/foundations/formatting-localized-currency",
          },
        ],
      },
    ],
  },

  {
    title: "Design guidelines",
    children: [
      {
        title: "Design",
        url: "/docs/design/design",
      },
      {
        title: "Colors",
        url: "/docs/design/colors",
      },
      {
        title: "Typography",
        url: "/docs/design/typography",
      },
      {
        title: "Illustrations",
        url: "/docs/design/illustrations",
      },
      {
        title: "Sounds",
        url: "/docs/design/sounds",
      },
      {
        title: "Icons",
        url: "/docs/design/icons",
      },
      {
        title: "Interaction states",
        url: "/docs/design/interaction-states",
      },
      {
        title: "Spacing",
        url: "/docs/design/spacing",
      },
      {
        title: "Data visualizations",
        url: "/docs/design/data-visualizations",
      },
    ],
  },

  {
    title: "Content guidelines",
    children: [
      {
        title: "Voice and tone",
        url: "/docs/content/voice-and-tone",
      },
      {
        title: "Accessible and inclusive language",
        url: "/docs/content/accessible-and-inclusive-language",
      },
      {
        title: "Grammar and mechanics",
        url: "/docs/content/grammar-and-mechanics",
      },
      {
        title: "Naming",
        url: "/docs/content/naming",
      },
      {
        title: "Actionable language",
        url: "/docs/content/actionable-language",
      },
      {
        title: "Product content",
        url: "/docs/content/product-content",
      },
      {
        title: "Help documentation",
        url: "/docs/content/help-documentation",
      },
      {
        title: "Merchant-to-customer content",
        url: "/docs/content/merchant-to-customer",
      },
      {
        title: "App release notes",
        url: "/docs/content/release-notes",
      },
      {
        title: "Vocabulary",
        url: "/docs/content/vocabulary",
      },
      {
        title: "Alternative text",
        url: "/docs/content/alternative-text",
      },
    ],
  },

  {
    title: "Patterns",
    children: [
      {
        title: "Page layouts",
        url: "/docs/patterns/layout",
      },
      {
        title: "Mobile patterns",
        url: "/docs/patterns/mobile-patterns",
      },
      {
        title: "Home cards",
        url: "/docs/patterns/home-card-guidelines",
      },
      {
        title: "Error messages",
        url: "/docs/patterns/error-messages",
      },
      {
        title: "Text fields",
        url: "/docs/patterns/text-fields",
      },
      {
        title: "Help content",
        url: "/docs/patterns/help-content",
      },
      {
        title: "Locations",
        url: "/docs/patterns/locations",
      },
    ],
  },
];
interface Props {
  category: string;
  markdown: MarkdownFile;
}

const Components: NextPage<Props> = ({ markdown: { readme, frontMatter } }) => {
  let title = frontMatter?.name || "";

  if (title.includes("/")) {
    const parts = title.split("/");
    title = parts[parts.length - 1];
  }

  return (
    <Page renderNav={() => <Nav navItems={navItems} />}>
      <Head>
        <title>{getTitleForTitleTag(title)}</title>
      </Head>

      <Longform>
        <Markdown text={readme} />
      </Longform>
    </Page>
  );
};

const postsDirectory = path.join(process.cwd(), "src/pages-from-old-website");

export const getStaticProps: GetStaticProps<
  Props,
  { category: string; doc: string }
> = async (context) => {
  // TODO: Sanitize params?
  const fullPath = path.join(
    postsDirectory,
    context.params?.category || "",
    `${context.params?.doc}.md`
  );

  let content = fs.readFileSync(fullPath, "utf-8");

  const markdown = parseMarkdown(content);

  if (content) {
    const props: Props = {
      category: context.params?.category || "",
      markdown,
    };

    return { props };
  }
  throw new Error(`Attempted to load this path but it was not found: ${path}`);
};

export const getStaticPaths: GetStaticPaths = async () => {
  let urls: string[] = getUrlsFromNavItems(navItems);

  const paths = urls.map((url) => {
    const parts = url.split("/");
    return { params: { category: parts[2], doc: parts[3] } };
  });

  return {
    paths,
    fallback: false,
  };
};

export default Components;
