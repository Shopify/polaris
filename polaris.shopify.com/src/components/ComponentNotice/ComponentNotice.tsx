import { ComponentNotice as ComponentNoticeType } from "../../types";
import styles from "./ComponentNotice.module.scss";

interface Props {
  notice: ComponentNoticeType;
}

function ComponentNotice({ notice }: Props) {
  return (
    <div className={styles.ComponentNotice} data-status={notice.status}>
      <h2>{notice.status}</h2>
      <p>{notice.message}</p>
    </div>
  );
}

export default ComponentNotice;
