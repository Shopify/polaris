import Head from "next/head";
import components from "../../data/components.json";
import {
  getComponentCategories,
  stripMarkdownLinks,
  slugify,
  getComponentNav,
} from "../../utils/various";
import styles from "./ComponentsPage.module.scss";
import { getTitleTagValue } from "../../utils/various";
import ComponentGrid from "../ComponentGrid";
import Layout from "../Layout";

const componentCategories = getComponentCategories();
const componentNav = getComponentNav();

interface Props {}

export default function ComponentsPage({}: Props) {
  return (
    <div className={styles.ComponentsPage}>
      <Head>
        <title>{getTitleTagValue("Components")}</title>
      </Head>

      <Layout navItems={componentNav} showTOC={false} title="Components">
        {componentCategories.map((category) => {
          return (
            <div key={category} className={styles.Category}>
              <h2 className={styles.CategoryName}>
                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="currentColor"
                    d="M9.37 8.07l10 4a1 1 0 01.08 1.82l-3.7 1.86-1.85 3.7a1 1 0 01-.9.55h-.04a1 1 0 01-.89-.63l-4-10a1 1 0 011.3-1.3zM9.707 4.707A1 1 0 018 4V1a1 1 0 012 0v3a1 1 0 01-.293.707zM4.707 8.293A1 1 0 014 10H1a1 1 0 010-2h3a1 1 0 01.707.293zM3.707 2.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414-1.414l-2-2zM15.707 2.293a1 1 0 00-1.414 0l-2 2a1 1 0 001.414 1.414l2-2a1 1 0 000-1.414zM2.293 14.293l2-2a1 1 0 011.414 1.414l-2 2a1 1 0 01-1.414-1.414z"
                  />
                </svg>{" "}
                {category}
              </h2>
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
