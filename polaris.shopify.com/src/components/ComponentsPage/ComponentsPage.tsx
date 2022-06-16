import Head from "next/head";

import ComponentGrid from "../ComponentGrid";
import Layout from "../Layout";

import components from "../../data/components.json";
import {
  getComponentCategories,
  stripMarkdownLinks,
  slugify,
  getComponentNav,
} from "../../utils/various";
import styles from "./ComponentsPage.module.scss";
import { getTitleTagValue } from "../../utils/various";

const componentCategories = getComponentCategories();
const componentNav = getComponentNav();

interface Props {}

export default function ComponentsPage({}: Props) {
  return (
    <div className={styles.ComponentsPage}>
      <Head>
        <title>{getTitleTagValue("Components")}</title>
      </Head>

      <Layout navItems={componentNav} showTOC={false}>
        <h1>Components</h1>

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
      </Layout>
    </div>
  );
}
