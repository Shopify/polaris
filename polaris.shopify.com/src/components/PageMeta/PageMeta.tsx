import { getTitleTagValue } from "../../utils/various";
import styles from "./PageMeta.module.scss";

interface Props {
  title: string;
  description?: string;
}

function PageMeta({ title, description }: Props) {
  return (
    <div className={styles.PageMeta}>
      <title>{getTitleTagValue(title)}</title>
      {description && <meta name="description" content={description} />}
    </div>
  );
}

export default PageMeta;
