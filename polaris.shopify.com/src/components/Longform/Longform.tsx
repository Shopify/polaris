import { className } from "../../utils/various";
import styles from "./Longform.module.scss";

interface Props {
  children: React.ReactNode;
}

function Longform({ children }: Props) {
  return (
    <div className={className(styles.Longform)}>
      <div className={styles.Content}>{children}</div>
    </div>
  );
}

export default Longform;
