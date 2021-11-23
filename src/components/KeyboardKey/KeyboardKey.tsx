import styles from './KeyboardKey.scss';

export interface KeyboardKeyProps {
  /** The content to display inside the key */
  children?: string;
}

export function KeyboardKey({children}: KeyboardKeyProps) {
  let key = children || '';
  key = key.length > 1 ? key.toLowerCase() : key.toUpperCase();

  return <kbd className={styles.KeyboardKey}>{key}</kbd>;
}
