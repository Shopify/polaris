import { Status } from "../../types";
import styles from "./StatusBanner.module.scss";

const bannerTitles: { [key in Status["value"]]: string } = {
  deprecated: "Deprecated",
  alpha: "Alpha",
  information: "Information",
  warning: "Warning",
};

interface Props {
  status: Status;
}

function StatusBanner({ status }: Props) {
  return (
    <div className={styles.StatusBanner} data-value={status.value}>
      <h2>{bannerTitles[status.value]}</h2>
      <p>{status.message}</p>
    </div>
  );
}

export default StatusBanner;
