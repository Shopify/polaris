export interface LinkLikeComponentProps
  extends React.HTMLProps<HTMLAnchorElement> {
  /** The url to link to */
  url: string;
  /**	The content to display inside the link */
  children?: React.ReactNode;
  /** Makes the link open in a new tab */
  external?: boolean;
  /** Makes the browser download the url instead of opening it. Provides a hint for the downloaded filename if it is a string value. */
  download?: string | boolean;
  [key: string]: any;
}

export type LinkLikeComponent = React.ComponentType<LinkLikeComponentProps>;
