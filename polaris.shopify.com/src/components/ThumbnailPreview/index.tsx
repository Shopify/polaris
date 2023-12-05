import Image from 'next/image';
import {Box} from '../Box';
import styles from './ThumbnailPreview.module.scss';
const Preview = ({
  src,
  alt = '',
  aspectRatio,
  className,
}: {
  src?: string;
  alt?: string;
  aspectRatio?: '1:1' | '3:1' | '4:3' | '16:9';
  className?: string;
}) => {
  const aspectRatios = {
    ['1:1']: {
      width: 900,
      height: 900,
    },
    ['3:1']: {
      width: 900,
      height: 300,
    },
    ['4:3']: {
      width: 900,
      height: 675,
    },
    ['16:9']: {
      width: 900,
      height: 506,
    },
  };

  return (
    <Box className={[styles.ThumbnailPreview, className]}>
      {src ? (
        <Image
          alt={alt}
          src={src}
          fill={!aspectRatio}
          {...(aspectRatio && aspectRatios[aspectRatio])}
          style={{
            objectFit: aspectRatio ? 'contain' : 'cover',
            width: '100%',
            height: '100%',
          }}
        />
      ) : null}
    </Box>
  );
};

export default Preview;
