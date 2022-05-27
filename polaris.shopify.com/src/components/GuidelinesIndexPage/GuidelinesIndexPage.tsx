import Head from "next/head";
import { navItems } from "../../data/navItems";
import NavContentTOCLayout from "../NavContentTOCLayout";
import { getTitleTagValue } from "../../utils/various";

import styles from "./GuidelinesIndexPage.module.scss";

interface Props {}

function GuidelinesIndexPage({}: Props) {
  return (
    <div className={styles.GuidelinesIndexPage}>
      <Head>
        <title>{getTitleTagValue("Guidelines")}</title>
      </Head>
      <NavContentTOCLayout
        navItems={navItems}
        showTOC={false}
        title="Guidelines"
        content={
          <>
            <div className={styles.Features}>
              <div className={styles.Feature}>
                <div className={styles.Text}>
                  <h2>Foundations</h2>
                  <p>
                    Learn the foundational concepts that underpin everything we
                    do.
                  </p>
                </div>
              </div>
              <div className={styles.Feature}>
                <div className={styles.Text}>
                  <h2>Design</h2>
                  <p>Lorem ipsum dolor et amet consecteur.</p>
                </div>
              </div>
              <div className={styles.Feature}>
                <div className={styles.Text}>
                  <h2>Content</h2>
                  <p>
                    <p>Lorem ipsum dolor et amet consecteur.</p>
                  </p>
                </div>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}

export default GuidelinesIndexPage;
