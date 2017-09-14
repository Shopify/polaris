import Messenger from '../Messenger';
import Modal from './Modal';

export interface OpenOptions {
  title?: string,
  products?: boolean,
  collections?: boolean,
  allowMultiple?: boolean,
  showHidden?: boolean,
  onCancel?(): void,
  onSelection?(resources: object[]): void,
}

export default class ResourcePicker {
  constructor(private messenger: Messenger, private modal: Modal) {}

  close() {
    this.modal.close();
  }

  open({title, products, collections, allowMultiple = false, showHidden = true, onCancel, onSelection}: OpenOptions) {
    this.modal.storeCloseCallback((success: boolean, data: any) => {
      if (!success) {
        if (onCancel != null) { onCancel(); }
        return;
      }

      if (onSelection == null) { return; }
      onSelection(data);
    });

    const resources: string[] = [];
    if (products) { resources.push('products'); }
    if (collections) { resources.push('collections'); }

    if (collections) {
      this.messenger.send('Shopify.API.Modal.collectionPicker', {
        title,
        selectMultiple: allowMultiple,
        showHidden,
        selectable_resources: resources,
      });
    } else {
      this.messenger.send('Shopify.API.Modal.productPicker', {
        title,
        selectMultiple: allowMultiple,
        showHidden,
        selectable_resources: resources,
      });
    }
  }
}
