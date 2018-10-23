import * as React from 'react';
import isEqual from 'lodash/isEqual';
import {ResourcePicker as AppBridgeResourcePicker} from '@shopify/app-bridge/actions';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../components/AppProvider';

export interface SelectPayload {
  /** The selected resources
   * @see {@link https://github.com/Shopify/app-bridge/tree/master/packages/app-bridge/src/actions/ResourcePicker|resource picker documentation} for more information
   */
  selection: AppBridgeResourcePicker.ResourceSelection[];
}

export interface Props {
  /** Whether the picker is open or not */
  open: boolean;
  /** The type of resource you want to pick */
  resourceType: 'Product' | 'ProductVariant' | 'Collection';
  /** GraphQL initial search query for filtering resources available in the picker
   * @see {@link https://help.shopify.com/en/api/getting-started/search-syntax|search syntax} for more information
   */
  initialQuery?: string;
  /** Whether to show hidden products or not
   * @default false
   */
  showHidden?: boolean;
  /** Whether to allow selection of multiple items
   * @default true
   */
  allowMultiple?: boolean;
  /** Whether to show product variants or not. Only applies to the product resource type picker
   * @default true
   */
  showVariants?: boolean;
  /** Callback when a selection has been made */
  onSelection?(selectPayload: SelectPayload): void;
  /** Callback when the picker is closed without selection */
  onCancel?(): void;
}

export type CombinedProps = Props & WithAppProviderProps;

export class ResourcePicker extends React.PureComponent<CombinedProps, never> {
  private focusReturnPoint: HTMLElement | null = null;
  private appBridgeResourcePicker:
    | AppBridgeResourcePicker.ResourcePicker
    | undefined;

  componentDidMount() {
    if (this.props.polaris.appBridge == null) {
      return;
    }

    const {
      open,
      resourceType,
      initialQuery,
      showHidden = false,
      allowMultiple = true,
      showVariants = true,
      onSelection,
      onCancel,
    } = this.props;
    const {appBridge} = this.props.polaris;

    this.appBridgeResourcePicker = AppBridgeResourcePicker.create(appBridge, {
      resourceType: AppBridgeResourcePicker.ResourceType[resourceType],
      options: {
        initialQuery,
        showHidden,
        selectMultiple: allowMultiple,
        showVariants,
      },
    });

    if (onSelection != null) {
      this.appBridgeResourcePicker.subscribe(
        AppBridgeResourcePicker.Action.SELECT,
        ({selection}) => {
          onSelection({selection});
        },
      );
    }

    if (onCancel != null) {
      this.appBridgeResourcePicker.subscribe(
        AppBridgeResourcePicker.Action.CANCEL,
        onCancel,
      );
    }

    if (open) {
      this.focusReturnPoint = document.activeElement as HTMLElement;
      this.appBridgeResourcePicker.dispatch(
        AppBridgeResourcePicker.Action.OPEN,
      );
    }
  }

  componentDidUpdate(prevProps: CombinedProps) {
    if (this.appBridgeResourcePicker == null) {
      return;
    }

    const {
      open,
      initialQuery,
      showHidden = false,
      allowMultiple = true,
      showVariants = true,
    } = this.props;
    const wasOpen = prevProps.open;

    if (!isEqual(prevProps, this.props)) {
      this.appBridgeResourcePicker.set({
        initialQuery,
        showHidden,
        selectMultiple: allowMultiple,
        showVariants,
      });
    }

    if (wasOpen !== open) {
      if (open) {
        this.appBridgeResourcePicker.dispatch(
          AppBridgeResourcePicker.Action.OPEN,
        );
      } else {
        this.appBridgeResourcePicker.dispatch(
          AppBridgeResourcePicker.Action.CLOSE,
        );
      }
    }

    if (!wasOpen && open) {
      this.focusReturnPoint = document.activeElement as HTMLElement;
    } else if (
      wasOpen &&
      !open &&
      this.focusReturnPoint != null &&
      document.contains(this.focusReturnPoint)
    ) {
      this.focusReturnPoint.focus();
      this.focusReturnPoint = null;
    }
  }

  componentWillUnmount() {
    if (this.appBridgeResourcePicker == null) {
      return;
    }

    this.appBridgeResourcePicker.unsubscribe();
  }

  render() {
    return null;
  }
}

export default withAppProvider<Props>()(ResourcePicker);
