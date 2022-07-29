import type {HTMLProps, ReactNode, ComponentType} from 'react';

export interface LinkLikeComponentProps extends HTMLProps<HTMLAnchorElement> {
  /** The url to link to */
  url: string;
  /**	The content to display inside the link */
  children?: ReactNode;
  /** Makes the link open in a new tab */
  external?: boolean;
  /** Makes the browser download the url instead of opening it. Provides a hint for the downloaded filename if it is a string value. */
  download?: string | boolean;
  [key: string]: any;
}

export type LinkLikeComponent = ComponentType<LinkLikeComponentProps>;
