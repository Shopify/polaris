import Image from 'next/image';
import styles from './ComponentThumbnail.module.scss';
import {slugify} from '../../utils/various';

interface Props {
  title: string;
  group?: string;
}

function ComponentThumbnail({title, group}: Props) {
  const imageSrc = group
    ? `/images/components/${group}/${slugify(title)}.png`
    : `/images/components/${slugify(title)}.png`;
  return (
    <div className={styles.ComponentThumbnail}>
      <Image
        src={imageSrc}
        className={styles.Image}
        width={266}
        height={140}
        quality={70}
        sizes="300px"
        alt={`Screenshot of the ${title} component`}
      />
    </div>
  );
}

export default ComponentThumbnail;
