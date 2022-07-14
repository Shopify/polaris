import { Status } from "../../types";
import styles from "./StatusBadge.module.scss";

interface Props {
  status: Status;
}
function StatusBadge({ status }: Props) {
  return (
    <div className={styles.StatusBadge} data-value={status.value}>
      {status.message}
    </div>
  );
}

export default StatusBadge;
