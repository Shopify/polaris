import Image from 'next/image';
import {Box} from '../Box';
import styles from './ThumbnailPreview.module.scss';
const Preview = ({
  src,
  alt = '',
  className,
  width,
  height,
  style,
}: {
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}) => {
  return (
    <Box className={[styles.ThumbnailPreview, className]}>
      {src ? (
        <Image
          alt={alt}
          src={src}
          width={width}
          height={height}
          style={style}
        />
      ) : null}
    </Box>
  );
};

export default Preview;
