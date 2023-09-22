import Image from 'next/image';
import {Box} from '../Box';
import styles from './ThumbnailPreview.module.scss';
const Preview = ({
  src,
  alt = '',
  className,
}: {
  src?: string;
  alt?: string;
  className?: string;
}) => {
  return (
    <Box className={[styles.ThumbnailPreview, className]}>
      {src ? (
        <Image alt={alt} src={src} fill style={{objectFit: 'cover'}} />
      ) : null}
    </Box>
  );
};

export default Preview;
