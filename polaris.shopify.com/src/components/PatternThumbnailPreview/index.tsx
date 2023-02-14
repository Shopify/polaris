import Image from 'next/image';
import {className} from '../../utils/various';
import styles from './PatternThumbnailPreview.module.scss';
const Preview = ({
  src,
  alt = '',
  renderInner = true,
}: {
  src?: string;
  alt?: string;
  renderInner?: boolean;
}) => {
  return (
    <div
      className={className([styles.Preview, !renderInner && styles.NoInner])}
    >
      {renderInner ? (
        <div className={className(styles.PreviewInner)}>
          {src ? <Image alt={alt} fill src={src} /> : null}
        </div>
      ) : src ? (
        <Image alt={alt} fill src={src} />
      ) : null}
    </div>
  );
};

export default Preview;
