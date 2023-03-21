'use client';

import {useMedia} from '@/hooks';
import {Image as ImageType} from '@/types';
import {getImageDimensions} from '@/utils';
import Image from 'next/image';

function ImageRenderer({image, width}: {image: ImageType; width: number}) {
  const inDarkMode = useMedia(['(prefers-color-scheme: dark)'], [true], false);

  return (
    <>
      {inDarkMode && image.variants['dark'] ? (
        <Image
          src={`/uploads/${image.variants['dark'].fileName}`}
          alt={image.alt.light}
          {...getImageDimensions(
            {
              width: image.variants['dark'].width,
              height: image.variants['dark'].height,
            },
            width,
          )}
        />
      ) : (
        <Image
          src={`/uploads/${image.variants['light'].fileName}`}
          alt={image.alt.light}
          {...getImageDimensions(
            {
              width: image.variants['light'].width,
              height: image.variants['light'].height,
            },
            width,
          )}
        />
      )}
    </>
  );
}

export default ImageRenderer;
