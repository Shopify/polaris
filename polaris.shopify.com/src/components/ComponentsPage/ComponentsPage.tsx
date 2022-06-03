import Head from "next/head";
import components from "../../data/components.json";
import {
  getComponentCategories,
  stripMarkdownLinks,
  slugify,
} from "../../utils/various";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import styles from "./ComponentsPage.module.scss";
import { getTitleTagValue } from "../../utils/various";
import ComponentGrid from "../ComponentGrid";

const componentCategories = getComponentCategories();

interface Props {}

export default function ComponentsPage({}: Props) {
  return (
    <MaxPageWidthDiv className={styles.ComponentsPage}>
      <Head>
        <title>{getTitleTagValue("Components")}</title>
      </Head>
      <h1>Components</h1>
      <article className={styles.Post}>
        {componentCategories.map((category) => {
          return (
            <div key={category} className={styles.Category}>
              <h2 className={styles.CategoryName}>{category}</h2>
              <ComponentGrid>
                {components
                  .filter(
                    (component) => component.frontMatter.category === category
                  )
                  .map(({ frontMatter, intro }) => {
                    const { name } = frontMatter;
                    const url = `/components/${slugify(name.toLowerCase())}`;
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
            </div>
          );
        })}
      </article>
    </MaxPageWidthDiv>
  );
}
