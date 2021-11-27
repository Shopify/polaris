import type {ReactNode} from 'react';

export interface TabDescriptor {
  /** A unique identifier for the tab */
  id: string;
  /** A destination to link to */
  url?: string;
  /** Content for the tab */
  content: ReactNode;
  /** A unique identifier for the panel */
  panelID?: string;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
}
