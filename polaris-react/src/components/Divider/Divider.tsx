import styles from './Divider.scss';

export type BorderTokenAlias =
  | 'base'
  | 'dark'
  | 'divider'
  | 'divider-on-dark'
  | 'transparent';

export interface DividerProps {
  /** Divider border style */
  borderStyle?: BorderTokenAlias;
}

export const Divider = ({borderStyle = 'divider'}: DividerProps) => {
  const style = {
    '--pc-divider-border-style': borderStyle
      ? `var(--p-border-${borderStyle})`
      : undefined,
  } as React.CSSProperties;

  return <hr className={styles.Divider} style={style} />;
};
