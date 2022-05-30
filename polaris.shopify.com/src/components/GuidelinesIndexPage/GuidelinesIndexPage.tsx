import Head from "next/head";
import { navItems } from "../../data/navItems";
import { getTitleTagValue, slugify } from "../../utils/various";

import styles from "./GuidelinesIndexPage.module.scss";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import Link from "next/link";

interface Props {}

function GuidelinesIndexPage({}: Props) {
  return (
    <div className={styles.GuidelinesIndexPage}>
      <Head>
        <title>{getTitleTagValue("Guidelines")}</title>
      </Head>

      <MaxPageWidthDiv>
        <div className={styles.Categories}>
          {navItems.map((category) => (
            <div key={category.title} className={styles.Category}>
              <div className={styles.Text}>
                <h2>{category.title}</h2>

                <ul>
                  {category.children &&
                    category.children.map((page) => (
                      <li key={page.title}>
                        <Link href={page.url || ""}>{page.title}</Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </MaxPageWidthDiv>
    </div>
  );
}

export default GuidelinesIndexPage;
