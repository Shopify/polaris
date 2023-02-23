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
      {src ? <Image alt={alt} fill src={src} /> : null}
    </Box>
  );
};

export default Preview;
