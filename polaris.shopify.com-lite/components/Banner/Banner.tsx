import styles from './Banner.module.scss';
import Markdown from '@/components/Markdown';
import {toPascalCase} from '@/utils';

interface Props {
  title: string;
  markdownContent: string;
}

function Banner({title, markdownContent}: Props) {
  const dataStyle = toPascalCase(title);
  return (
    <div className={styles.Banner} data-style={dataStyle}>
      <h2>{title}</h2>
      <Markdown>{markdownContent}</Markdown>
    </div>
  );
}

export default Banner;
