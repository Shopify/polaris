import Head from "next/head";
import { getTitleTagValue } from "../../utils/various";
import styles from "./PageMeta.module.scss";

interface Props {
  title: string;
  description?: string;
}

function PageMeta({ title, description }: Props) {
  return (
    <div className={styles.PageMeta}>
      <Head>
        <title>{getTitleTagValue(title)}</title>
        {description && <meta name="description" content={description} />}
      </Head>
    </div>
  );
}

export default PageMeta;
