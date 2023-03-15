import styles from './SkeletonBodyText.scss';

export interface SkeletonBodyTextProps {
  /**
   * Number of lines to display
   * @default 3
   */
  lines?: number;
}

export function SkeletonBodyText({lines = 3}: SkeletonBodyTextProps) {
  const bodyTextLines = [];

  for (let i = 0; i < lines; i++) {
    bodyTextLines.push(<div className={styles.SkeletonBodyText} key={i} />);
  }

  return <>{bodyTextLines}</>;
}
