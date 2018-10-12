import {autobind} from '@shopify/javascript-utilities/decorators';

import {Bar, Messenger, Modal, ResourcePicker} from '../../embedded/easdk';

export interface Options {
  /** The API key for your application from the Partner dashboard */
  apiKey: string;
  /** The current shop’s origin, provided in the session from the Shopify API */
  shopOrigin: string;
  /** Forces a redirect to the relative admin path when not rendered in an iframe */
  forceRedirect?: boolean;
  /**  Metadata for the embedded app */
  metadata?: object;
  /** Prints logs of each message passed through the EASDK */
  debug?: boolean;
}

export interface User {
  name: string;
  accountAccess: 'Account owner' | 'Full access' | 'Limited access';
}

export enum Message {
  Initialize = 'Shopify.API.initialize',
  LoadingOn = 'Shopify.API.Bar.loading.on',
  LoadingOff = 'Shopify.API.Bar.loading.off',
  CloseDropdown = 'Shopify.API.Bar.closeDropdown',
  FlashNotice = 'Shopify.API.flash.notice',
  FlashError = 'Shopify.API.flash.error',
  ModalOpen = 'Shopify.API.Modal.open',
  ModalConfirm = 'Shopify.API.Modal.confirm',
  ModalAlert = 'Shopify.API.Modal.alert',
  ModalClose = 'Shopify.API.Modal.close',
  ModalCollectionPicker = 'Shopify.API.Modal.collectionPicker',
  ModalProductPicker = 'Shopify.API.Modal.productPicker',
  PushState = 'Shopify.API.pushState',
  Redirect = 'Shopify.API.redirect',
  SetWindowLocation = 'Shopify.API.setWindowLocation',
}

interface InitData {
  User?: {
    current: User;
  };
}

interface ModalOnClose {
  result: boolean;
  data?: object;
}

export default class EASDK {
  currentUser?: User;
  Bar: Bar;
  Modal: Modal;
  ResourcePicker: ResourcePicker;

  private messenger: Messenger;

  constructor(
    {apiKey, shopOrigin, debug, forceRedirect}: Options,
    metadata: object,
  ) {
    checkFrameRedirect(apiKey, shopOrigin, forceRedirect);

    this.messenger = new Messenger(
      window.parent,
      {
        'Shopify.API.initialize': (data: InitData) => {
          if (data && data.User && data.User.current) {
            this.currentUser = data.User.current;
          }
        },
        'Shopify.API.Modal.close': ({result, data}: ModalOnClose) => {
          this.Modal.callCloseCallback(result, data);
        },
      },
      {
        name: 'iframe',
        targetOrigin: shopOrigin,
        debug,
      },
    );

    this.Bar = new Bar(this.messenger);
    this.Modal = new Modal(this.messenger);
    this.ResourcePicker = new ResourcePicker(this.messenger, this.Modal);

    this.messenger.send(Message.Initialize, {
      apiKey,
      shopOrigin,
      metadata,
      debug,
      forceRedirect,
    });
  }

  @autobind
  startLoading() {
    this.messenger.send(Message.LoadingOn);
  }

  @autobind
  stopLoading() {
    this.messenger.send(Message.LoadingOff);
  }

  @autobind
  showFlashNotice(message: string, options: {error?: boolean} = {}) {
    const {error = false} = options;
    const type = error ? Message.FlashError : Message.FlashNotice;
    this.messenger.send(type, {message});
  }

  @autobind
  pushState(location: string) {
    this.messenger.send(Message.PushState, {location});
  }

  @autobind
  redirect(location: string) {
    this.messenger.send(Message.Redirect, {location});
  }
}

function checkFrameRedirect(
  apiKey: Options['apiKey'],
  shopOrigin: Options['shopOrigin'] = 'https://myshopify.com',
  forceRedirect: Options['forceRedirect'],
) {
  if (window !== window.parent) {
    return;
  }

  let redirectUrl = `${shopOrigin}/admin/apps/`;
  if (apiKey) {
    redirectUrl = `${redirectUrl}${apiKey}${window.location.pathname}${
      window.location.search
    }`;
  }

  if (forceRedirect) {
    window.location.assign(redirectUrl);
  } else {
    // eslint-disable-next-line no-console
    console.warn(
      `Embedded app was not loaded in an iframe and redirecting is disabled. Set forceRedirect to true and this page will redirect to: ${redirectUrl}`,
    );
  }
}
