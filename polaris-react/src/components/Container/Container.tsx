import React from 'react';

import type breakpoints from '../../tokens/token-groups/breakpoints.json';
import {classNames} from '../../utilities/css';

import styles from './Container.scss';

type Breakpoints =
  keyof typeof breakpoints extends `breakpoints-${infer Breakpoint}`
    ? Breakpoint
    : never;

export interface ContainerProps {
  className?: string;
  /** The main content */
  children?: React.ReactNode;
  /**
   * Determine the max-width of the container. The container width grows with
   * the size of the screen. Set to false to disable maxWidth.
   * @default 'lg'
   */
  maxWidth?: Breakpoints | false;
  /**
   * If true, the left and right padding is removed.
   * @default false
   */
  disableGutters?: boolean;
}

export function Container(props: ContainerProps) {
  const {
    className,
    maxWidth = 'lg',
    disableGutters = false,
    ...restProps
  } = props;

  return (
    <div
      className={classNames(
        styles.root,
        !disableGutters && styles.gutters,
        maxWidth && styles[`max-width-${maxWidth}`],
        className,
      )}
      {...restProps}
    />
  );
}
