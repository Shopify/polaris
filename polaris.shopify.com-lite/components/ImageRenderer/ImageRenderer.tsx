'use client';

import {useMedia} from '@/hooks';
import {Image as ImageType} from '@/types';
import {className, getImageDimensions} from '@/utils';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import styles from './ImageRenderer.module.scss';

// Requirements:
//
// 1. Render the right image variant based on the user's preference
// 2. Work without JavaScript (for a11y)
//
// Current drawback: With JavaScript disabled, both dark and light mode images
// are fetched (but not rendered). This is an acceptable tradeoff for now.

function ImageRenderer({image, width}: {image: ImageType; width: number}) {
  const prefersDarkMode = useMedia(
    ['(prefers-color-scheme: dark)'],
    [true],
    false,
  );
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  const canSafelySkipRenderingOfLightModeImage =
    !isInitialLoad && prefersDarkMode && image.variants['dark'];

  return (
    <>
      {image.variants['dark'] && (
        <Image
          src={`/uploads/${image.variants['dark'].fileName}`}
          alt={image.alt}
          {...getImageDimensions(
            {
              width: image.variants['dark'].width,
              height: image.variants['dark'].height,
            },
            width,
          )}
          className={styles.DarkModeImage}
        />
      )}

      {!canSafelySkipRenderingOfLightModeImage && (
        <Image
          src={`/uploads/${image.variants['light'].fileName}`}
          alt={image.alt}
          {...getImageDimensions(
            {
              width: image.variants['light'].width,
              height: image.variants['light'].height,
            },
            width,
          )}
          className={className(
            styles.LightModeImage,
            image.variants['dark'] && styles.darkModeImageAvailable,
          )}
        />
      )}
    </>
  );
}

export default ImageRenderer;
