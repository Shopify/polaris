import Messenger from '../Messenger';
import Modal from './Modal';
import {Messages} from '../../../components/AppProvider/EASDK';

export interface SelectionResult {
  products?: object[];
  collections?: object[];
}
export interface OpenOptions {
  /** The title of the picker */
  title?: string;
  /** Whether to allow the merchant to select products */
  products?: boolean;
  /** Whether to allow the merchant to select collections */
  collections?: boolean;
  /** Whether multiple selections are allowed */
  allowMultiple?: boolean;
  /** Whether to display resources that are not published (hidden) in the context of a channel. Defaults to true. */
  showHidden?: boolean;
  /** Callback when the picker is closed without selection */
  onCancel?(): void;
  /** Callback after a selection was made */
  onSelection?(resources: SelectionResult): void;
}

export default class ResourcePicker {
  constructor(private messenger: Messenger, private modal: Modal) {}

  close() {
    this.modal.close();
  }

  open({
    title,
    products,
    collections,
    allowMultiple = false,
    showHidden = true,
    onCancel,
    onSelection,
  }: OpenOptions) {
    this.modal.storeCloseCallback((success: boolean, data: any) => {
      if (!success) {
        if (onCancel != null) {
          onCancel();
        }
        return;
      }

      if (onSelection == null) {
        return;
      }
      onSelection(data);
    });

    const resources: string[] = [];
    if (products) {
      resources.push('products');
    }
    if (collections) {
      resources.push('collections');
    }

    if (collections) {
      this.messenger.send(Messages.MODAL_COLLECTION_PICKER, {
        title,
        selectMultiple: allowMultiple,
        // eslint-disable-next-line camelcase
        show_hidden: showHidden,
        // eslint-disable-next-line camelcase
        selectable_resources: resources,
      });
    } else {
      this.messenger.send(Messages.MODAL_PRODUCT_PICKER, {
        title,
        selectMultiple: allowMultiple,
        // eslint-disable-next-line camelcase
        show_hidden: showHidden,
        // eslint-disable-next-line camelcase
        selectable_resources: resources,
      });
    }
  }
}
