import styles from './FooterHelp.scss';

export interface FooterHelpProps {
  /** The content to display inside the layout. */
  children?: React.ReactNode;
}

export function FooterHelp({children}: FooterHelpProps) {
  return (
    <div className={styles.FooterHelp}>
      <div className={styles.Text}>{children}</div>
    </div>
  );
}
