import styles from "./Longform.module.scss";

interface Props {
  children: React.ReactNode;
}

function Longform({ children }: Props) {
  return <div className={styles.Longform}>{children}</div>;
}

export default Longform;
