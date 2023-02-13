import Image from 'next/image';
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
    <div
      style={{
        filter: 'brightness(97%)',
      }}
    >
      <Image
        src={imageSrc}
        style={{width: '100%', height: 'auto'}}
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
