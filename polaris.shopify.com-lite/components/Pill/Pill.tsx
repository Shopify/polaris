import styles from './Pill.module.scss';

interface Props {
  label: string;
}

function Pill({label}: Props) {
  return <span className={styles.Pill}>{label}</span>;
}

export default Pill;
