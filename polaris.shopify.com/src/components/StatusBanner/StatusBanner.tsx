import { ComponentNotice } from "../../types";
import styles from "./StatusBanner.module.scss";

interface Props {
  notice: ComponentNotice;
}

function StatusBanner({ notice }: Props) {
  return (
    <div className={styles.StatusBanner} data-status={notice.status}>
      <h2>{notice.status}</h2>
      <p>{notice.message}</p>
    </div>
  );
}

export default StatusBanner;
