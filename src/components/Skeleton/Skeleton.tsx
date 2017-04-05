import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import * as styles from './Skeleton.scss';

export type Content = 'displayText';

export interface Props {
  children?: React.ReactNode,
  visible?: boolean,
  content?: Content,
}

export default function Skeleton({children, visible, content}: Props) {
  const className = classNames(
    styles.Skeleton,
    visible && styles.visible,
    content && styles[variationName('content', content)],
  );

  return (
    <div className={className}>
      <div className={styles.Content}>
        {children}
      </div>
      <div className={styles.Shimmers}>
        <div className={styles.Shimmer} />
      </div>
    </div>
  );
}
