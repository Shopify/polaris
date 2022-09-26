import React from 'react';

import {classNames} from '../../utilities/css';

import styles from './ContentBlock.scss';

type Width = 'md' | 'lg';

export interface ContentBlockProps {
  /** Elements to display inside container */
  children?: React.ReactNode;
  /** Adjust maximum width of container */
  width: Width;
}

export const ContentBlock = ({children, width}: ContentBlockProps) => {
  const className = classNames(styles.ContentBlock, styles[width]);

  return <div className={className}>{children}</div>;
};
