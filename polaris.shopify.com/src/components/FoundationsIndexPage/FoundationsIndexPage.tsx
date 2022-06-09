import Head from "next/head";
import { navItems } from "../../data/navItems";
import { getTitleTagValue } from "../../utils/various";
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
        <p className={styles.Intro}>
          Polaris is a collection of ideas and best practices.
        </p>
        <div className={styles.Categories}>
          {navItems.map((category) => {
            const url = category.children && category.children[0].url;
            if (!url) return null;
            return (
              <Link key={category.title} href={url}>
                <a className={styles.Category}>
                  <div className={styles.Text}>
                    <h2>{category.title}</h2>
                    <p>
                      Lorem ipsum dolor et amet consecteur lorem ipsum dolor et
                      amet. Lorem ipsum dolor et amet consecteur lorem ipsum.
                    </p>
                  </div>
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
