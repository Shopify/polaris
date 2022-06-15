import Head from "next/head";
import { foundationsNavItems } from "../../data/navItems";
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

      <Layout
        title="Foundations"
        navItems={foundationsNavItems}
        showTOC={false}
      >
        <div className={styles.Categories}>
          {foundationsNavItems.map((category) => {
            const url = category.children && category.children[0].url;
            if (!url) return null;
            return (
              <div key={category.title} className={styles.Category}>
                <div className={styles.Text}>
                  <h2>{category.title}</h2>
                  <ul>
                    {category.children?.map((child) => {
                      if (!child.url) return null;
                      return (
                        <li key={child.title}>
                          <Link href={child.url} passHref>
                            <a>
                              <div className={styles.Icon}>{child.icon}</div>
                              <h4>{child.title}</h4>
                              <p>
                                Lorem ipsum dolor et amet consecteur lorem ipsum
                                dolor et amet lorem ipsum dolor consecteur et.
                              </p>
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </Layout>
    </div>
  );
}

export default FoundationsIndexPage;
