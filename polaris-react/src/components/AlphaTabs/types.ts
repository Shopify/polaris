import type {ReactNode} from 'react';

import type {ActionListItemDescriptor} from '../../types';

export type AlphaTabAction =
  | 'rename'
  | 'edit'
  | 'edit-columns'
  | 'duplicate'
  | 'delete';

interface AlphaTabActionDescriptor
  extends Omit<ActionListItemDescriptor, 'onAction'> {
  type: AlphaTabAction;
  onAction?: (name: string) => void;
  onPrimaryAction?: (name: string) => Promise<boolean>;
}

export interface AlphaTabProps {
  /** Optional callback invoked when a merchant clicks on a Tab when it is not active */
  onAction?(): void;
  /** The unique identifier for the Tab */
  id: string;
  /** The name of the Tab */
  content: string;
  /** A unique identifier for the panel */
  panelID?: string;
  /** The accessible label for the Tab, if the name alone does not give enough context */
  accessibilityLabel?: string;
  /** A badge to render next to the view name */
  badge?: string;
  /** An icon to render in place of a view name. Please pass the full Icon component, rather
   * than a reference to the particular icon source. */
  icon?: ReactNode;
  /** Optional URL if the Tab points to a location */
  url?: string;
  /** If true, will remove the ability to edit/rename/delete the view. */
  isLocked?: boolean;
  /** Whether the Tab is disabled */
  disabled?: boolean;
  /** A list of actions which map to actions that a merchant can take with this  */
  actions?: AlphaTabActionDescriptor[];
  /** Optional array that has a list of names of currently existing views. Used to check if a view name is unique. */
  viewNames?: string[];
  /** If true, the primary button in the currently open Modal will show a loading state */
  isModalLoading?: boolean;
  /** If the Tab is currently focused */
  focused?: boolean;
  /** If a sibling Tab currently has focus */
  siblingTabHasFocus?: boolean;
  /** If the Tab is selected */
  selected?: boolean;
  /** If the Tab is currently being measured */
  measuring?: boolean;
  /** Overrides the tabIndex calculated by the Tabs component */
  tabIndexOverride?: 0 | -1;
  /** Optional callback invoked when the Tabs component is focused */
  onFocus?(): void;
}

export interface AlphaTabPropsWithAddedMethods extends AlphaTabProps {
  /** Callback to let the Tabs know that a Popover is open inside of a Tab. Used to control focus. */
  onTogglePopover: (value: boolean) => void;
  /** Callback to let the Tabs know that a Modal is open inside of a Tab. Used to control focus. */
  onToggleModal: (value: boolean) => void;
}

export interface AlphaTabMeasurements {
  containerWidth: number;
  disclosureWidth: number;
  hiddenTabWidths: number[];
}
