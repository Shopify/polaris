export interface UnstyledLinkProps extends React.HTMLProps<HTMLAnchorElement> {
  /** A destination to link to */
  url: string;
  /** Forces url to open in a new tab */
  external?: boolean;
  /** Tells the browser to download the url instead of opening it. Provides a hint for the downloaded filename if it is a string value. */
  download?: string | boolean;
  /**	Content to display inside the link */
  children?: React.ReactNode;
  [key: string]: any;
}

export type LinkLikeComponent =
  | React.ComponentType<UnstyledLinkProps>
  | undefined;
