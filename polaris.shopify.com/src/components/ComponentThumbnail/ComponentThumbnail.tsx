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
      }}
    >
      <Image
        src={`/images/components/${slugify(title)}.png`}
        layout="responsive"
        width={525}
        height={300}
        quality={70}
        sizes="300px"
        alt={`Screenshot of the ${title} component`}
        lazyBoundary="1000px"
      />
    </div>
  );
}

export default ComponentThumbnail;
