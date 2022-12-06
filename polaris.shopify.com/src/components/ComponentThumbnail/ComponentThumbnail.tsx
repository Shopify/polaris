import Image from 'next/image';
import {slugify} from '../../utils/various';

interface Props {
  title: string;
}

function ComponentThumbnail({title}: Props) {
  return (
    <div
      style={{
        filter: 'brightness(97%)',
        borderRadius: 'var(--border-radius-600)',
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        overflow: 'hidden',
      }}
    >
      <Image
        src={`/images/components/${slugify(title)}.png`}
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
