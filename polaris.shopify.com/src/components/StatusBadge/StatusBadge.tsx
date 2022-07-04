import { ComponentNotice } from "../../types";
import styles from "./StatusBadge.module.scss";

interface Props {
  notice: ComponentNotice;
}
function StatusBadge({ notice }: Props) {
  return (
    <div className={styles.StatusBadge} data-status={notice.status}>
      {notice.status}
    </div>
  );
}

export default StatusBadge;
