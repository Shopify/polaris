import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import components from "../../data/components.json";
import {
  getComponentCategories,
  stripMarkdownLinks,
  slugify,
} from "../../utils/various";
import { LinkButton } from "../Button/Button";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import TextField from "../TextField";
import styles from "./ComponentsPage.module.scss";
import { getTitleTagValue } from "../../utils/various";
import ComponentGrid from "../ComponentGrid";

const componentCategories = getComponentCategories();

interface Props {
  category: string;
}

function ComponentsPage({ category }: Props) {
  const router = useRouter();

  let searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams("");

  const q = searchParams.get("q");
  const [filterText, setFilterText] = useState(q || "");

  useEffect(() => {
    if (q) {
      setFilterText(q);
    }
  }, [q]);

  function getUrl(category: string, filter: string | null): string {
    const queryParam = filter ? `?q=${filter}` : "";
    if (category === "all") {
      return `/components${queryParam}`;
    } else {
      return `/components/${slugify(category)}${queryParam}`;
    }
  }

  const filteredComponents = components
    .filter(({ frontMatter }) => {
      if (category === "all") {
        return true;
      }
      return frontMatter.category === category;
    })
    .filter(({ frontMatter }) =>
      frontMatter.name.toLowerCase().includes(filterText.toLowerCase())
    );

  return (
    <MaxPageWidthDiv className={styles.ComponentsPage}>
      <Head>
        <title>{getTitleTagValue("Components")}</title>
      </Head>

      <div className={styles.Filters}>
        <h1>Components</h1>

        <div className={styles.TextField}>
          <TextField
            type="text"
            value={filterText}
            onChange={(value) => {
              setFilterText(value);
              router.replace(getUrl(category, value));
            }}
            placeholder="Filter components"
          />
        </div>

        <LinkButton
          pill
          href={`/components`}
          aria-current={category === "all"}
          small
        >
          All
        </LinkButton>

        {componentCategories.map((thisCategory) => (
          <LinkButton
            key={thisCategory}
            pill
            href={`/components/${slugify(thisCategory)}`}
            aria-current={category === thisCategory}
            small
          >
            {thisCategory.replace("Titles and text", "Text")}
          </LinkButton>
        ))}
      </div>

      <ComponentGrid>
        {filteredComponents.map(({ frontMatter, intro }) => {
          const { name, category } = frontMatter;
          const url = `/components/${slugify(category)}/${slugify(
            name.toLowerCase()
          )}`;
          return (
            <ComponentGrid.Item
              key={name}
              name={name}
              description={stripMarkdownLinks(intro)}
              url={url}
            />
          );
        })}
      </ComponentGrid>
    </MaxPageWidthDiv>
  );
}

export default ComponentsPage;
