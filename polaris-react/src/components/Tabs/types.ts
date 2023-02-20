import type {ReactNode} from 'react';
import type {ActionListItemDescriptor} from '@shopify/polaris';

const VIEW_BUTTON_ACTION_TYPES = [
  'rename',
  'edit',
  'edit-columns',
  'duplicate',
  'delete',
] as const;
type TabActions = typeof VIEW_BUTTON_ACTION_TYPES[number];
interface TabOptions extends Partial<ActionListItemDescriptor> {
  type: TabActions;
}

export function isSimpleOption(
  tabOptions: TabActions | TabOptions,
): tabOptions is TabActions {
  return (
    typeof tabOptions === 'string' &&
    VIEW_BUTTON_ACTION_TYPES.includes(tabOptions)
  );
}

export type TabOptionsList = (TabActions | TabOptions)[];

export interface TabProps {
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
  /** If true, will give it an active state, and if the permissions prop exists, will
   * indicate that a merchant can click it to open the Popover containing the ActionList */
  isActive?: boolean;
  /** If true, will remove the ability to edit/rename/delete the view. */
  isLocked?: boolean;
  /** Whether the Tab is disabled */
  disabled?: boolean;
  /** Optional callback invoked when a merchant clicks on a Tab when it is active */
  onActiveAction?(): void;
  /** A list of permissions which map to actions that a merchant can take with this  */
  permissions?: TabOptionsList;
  /** Optional callback invoked when a Tab with the 'rename' permission has that ActionList item clicked */
  onClickRenameView?(id: string): void;
  /** Optional callback invoked when the RenameViewModal has been saved */
  onSaveRenameViewModal?(value: string, id: string): Promise<void | boolean>;
  /** Optional callback invoked when a Tab with the 'duplicate' permission has that ActionList item clicked */
  onClickDuplicateView?(id: string): Promise<void | boolean>;
  /** Optional callback invoked when the duplicate view modal is saved */
  onConfirmDuplicateView?(value: string): Promise<void | boolean>;
  /** Optional callback invoked when a Tab with the 'edit' permission has that ActionList item clicked */
  onClickEditView?(id: string): void;
  /** Optional callback invoked when a Tab with the 'delete' permission has that ActionList item clicked */
  onClickDeleteView?(id: string): void;
  /** Optional callback invoked when a view is to be deleted. */
  onConfirmDeleteView?(id: string): Promise<void | boolean>;
  /** Optional array that has a list of names of currently existing views. Used to check if a view name is unique. */
  viewNames?: string[];
  /** If true, the primary button in the currently open Modal will show a loading state */
  isModalLoading?: boolean;
  focused?: boolean;
  siblingTabHasFocus?: boolean;
  selected?: boolean;
  measuring?: boolean;
  /** Callback to let the Tabs know that a Popover is open inside of a Tab. Used to control focus. */
  onTogglePopover: (value: boolean) => void;
  /** Callback to let the Tabs know that a Modal is open inside of a Tab. Used to control focus. */
  onToggleModal: (value: boolean) => void;
  /** Overrides the tabIndex calculated by the Tabs component */
  tabIndexOverride?: 0 | -1;
  /** Callback to toggle the IndexFiltering mode to EditingColumns */
  onSetStateToEditingColumns?: () => void;
  /** Callback to toggle the IndexFiltering mode to Filtering */
  onSetStateToFiltering?: () => void;
  /** Ooptional callback invoked when the Tabs component is focused */
  onFocus?(): void;
  /** Boolean to determine whether we want to show the focus ring */
  showFocusRing?: boolean;
}

export interface TabMeasurements {
  containerWidth: number;
  disclosureWidth: number;
  hiddenTabWidths: number[];
}
