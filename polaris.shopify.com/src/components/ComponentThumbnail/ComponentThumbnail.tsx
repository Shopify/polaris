import style from './ComponentThumbnail.module.scss';
import ThumbnailPreview from '../ThumbnailPreview';
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
    <ThumbnailPreview
      src={imageSrc}
      className={style.ComponentThumbnail}
      alt={`Screenshot of the ${title} component`}
    />
  );
}

export default ComponentThumbnail;
