import { Status } from "../../types";
import styles from "./StatusBanner.module.scss";

interface Props {
  status: Status;
}

function StatusBanner({ status }: Props) {
  return (
    <div className={styles.StatusBanner} data-value={status.value}>
      <h2>{status.value}</h2>
      <p>{status.message}</p>
    </div>
  );
}

export default StatusBanner;
