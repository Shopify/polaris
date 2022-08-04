import { useEffect } from "react";
import Head from "next/head";
import useDarkMode from "use-dark-mode";
import styles from "./Page.module.scss";

interface Props {
  title?: string;
  description?: string;
  keywords?: string[];
  children: React.ReactNode;
}

function Page({ title, description, keywords, children }: Props) {
  let siteTitle = "Shopify Polaris";
  if (title) {
    siteTitle = `${title} — ${siteTitle}`;
  }
  const darkMode = useDarkMode(false);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "color-scheme",
      darkMode.value ? "dark" : "light"
    );
  }, [darkMode.value]);

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        {description ? <meta name="description" content={description} /> : null}
        {keywords ? (
          <meta name="keywords" content={keywords.join(", ")} />
        ) : null}
      </Head>
      <div className={styles.Reset}>
        <div>nav goes here</div>
        <div>{children}</div>
        <div>footer goes here</div>
      </div>
    </>
  );
}

export default Page;
