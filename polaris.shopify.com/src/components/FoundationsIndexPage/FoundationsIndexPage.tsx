import Head from "next/head";
import { navItems } from "../../data/navItems";
import { getTitleTagValue, slugify } from "../../utils/various";
import styles from "./FoundationsIndexPage.module.scss";
import Link from "next/link";
import Layout from "../Layout";

interface Props {}

function FoundationsIndexPage({}: Props) {
  return (
    <div className={styles.FoundationsIndexPage}>
      <Head>
        <title>{getTitleTagValue("Foundations")}</title>
      </Head>

      <Layout title="Foundations" navItems={navItems} showTOC={false}>
        <div className={styles.Categories}>
          {navItems.map((category) => {
            const url = category.children && category.children[0].url;
            if (!url) return null;
            return (
              <Link key={category.title} href={url}>
                <a className={styles.Category}>
                  <h2>{category.title}</h2>
                </a>
              </Link>
            );
          })}
        </div>
      </Layout>
    </div>
  );
}

export default FoundationsIndexPage;
