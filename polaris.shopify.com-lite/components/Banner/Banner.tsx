import styles from './Banner.module.scss';
import Markdown from '@/components/Markdown';

interface Props {
  title: string;
  markdownContent: string;
}

function Banner({title, markdownContent}: Props) {
  return (
    <div className={styles.Banner} data-value={''}>
      <h2>{title}</h2>
      <Markdown>{markdownContent}</Markdown>
    </div>
  );
}

export default Banner;
