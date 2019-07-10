import * as React from 'react';

import styles from './Theme.scss';

import {createColorRange, createSurfaceRange} from './utils';
import rootTheme from './theme';

export interface Props {
  /** The content to display */
  children?: React.ReactNode;
}

export default function InterimTheme(props: Props) {
  return (
    <div
      className={styles.Root}
      style={{
        ...rootTheme,
        ...createSurfaceRange('#ffffff', 'surface'),
        ...createColorRange('#5C6AC4', 'brand', {
          opacify: true,
          stops: 9,
          increment: 5,
        }),
        ...createColorRange('#007ACE', 'interactive', {opacify: true}),
        ...createColorRange('#47C1BF', 'timely'),
        ...createColorRange('#50B83C', 'positive'),
        ...createColorRange('#EEC200', 'attention'),
        ...createColorRange('#F49342', 'warning'),
        ...createColorRange('#DE3618', 'negative', {
          opacify: true,
          stops: 9,
          increment: 5,
        }),
        ...createColorRange('#9C6ADE', 'accent'),
      }}
    >
      {React.Children.only(props.children)}
    </div>
  );
}
