import styles from './Icon.module.scss';

interface Props {
  source: React.ElementType;
  width?: number;
  height?: number;
}

function Icon({source, height = 20, width = 20}: Props) {
  const SourceComponent = source;
  return <SourceComponent className={styles.Icon} style={{width, height}} />;
}

export default Icon;
