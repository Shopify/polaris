import Image from 'next/image';
import {className} from '../../utils/various';
import styles from './PatternThumbnailPreview.module.scss';
const Preview = ({src, alt = ''}: {src?: string; alt?: string}) => {
  return (
    <div className={className([styles.Preview, styles.NoInner])}>
      {src ? <Image alt={alt} fill src={src} /> : null}
    </div>
  );
};

export default Preview;
