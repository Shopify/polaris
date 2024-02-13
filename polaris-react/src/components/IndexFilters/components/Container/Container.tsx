import React from 'react';
import type {ReactNode} from 'react';

import styles from './Container.module.scss';

export interface ContainerProps {
  children: ReactNode;
}

export const Container = ({children}: ContainerProps) => {
  return <div className={styles.Container}>{children}</div>;
};
