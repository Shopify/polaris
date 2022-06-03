import Head from "next/head";
import { navItems } from "../../data/navItems";
import { getTitleTagValue, slugify } from "../../utils/various";
import styles from "./GuidelinesIndexPage.module.scss";
import Link from "next/link";
import NavContentTOCLayout from "../NavContentTOCLayout";

interface Props {}

function GuidelinesIndexPage({}: Props) {
  return (
    <div className={styles.GuidelinesIndexPage}>
      <Head>
        <title>{getTitleTagValue("Guidelines")}</title>
      </Head>

      <NavContentTOCLayout
        title="Guidelines"
        navItems={navItems}
        showTOC={false}
        content={
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
        }
      />
    </div>
  );
}

export default GuidelinesIndexPage;
