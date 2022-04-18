import React from 'react';

import type {ColorScheme} from '../../tokens';
import {classNames} from '../../utilities/css';

import {styles as styleSheet} from './styles';
import styles from './CustomProperty.scss';

export const DEFAULT_COLOR_SCHEME: ColorScheme = 'light';

export interface CustomPropertiesProps {
  /** Determines what color scheme is applied to child content. */
  colorScheme?: ColorScheme;
  /** The content to display. */
  children?: React.ReactNode;
  /** Class name applied to the root element. */
  className?: string;
  /** Inline styles applied to the root element. */
  style?: React.CSSProperties;
  /** Element used for the root node. */
  as?: React.ElementType;
}

export function CustomProperties(props: CustomPropertiesProps) {
  const {
    as: Component = 'div',
    children,
    className,
    colorScheme = DEFAULT_COLOR_SCHEME,
    style,
  } = props;

  return (
    <>
      <style
        // Convenience attribute for locating the stylesheet in the DOM.
        data-polaris-custom-properties=""
        dangerouslySetInnerHTML={{__html: styleSheet}}
      />
      <Component
        p-color-scheme={colorScheme}
        className={classNames(styles.root, className)}
        style={style}
      >
        {children}
      </Component>
    </>
  );
}
