import {autobind} from '@shopify/javascript-utilities/decorators';

import Messenger from '../../embedded/easdk/Messenger';
import Bar from '../../embedded/easdk/components/Bar';
import Modal from '../../embedded/easdk/components/Modal';
import ResourcePicker from '../../embedded/easdk/components/ResourcePicker';

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

    this.messenger.send('Shopify.API.initialize', {
      apiKey,
      shopOrigin,
      metadata,
      debug,
      forceRedirect,
    });
  }

  @autobind
  startLoading() {
    this.messenger.send('Shopify.API.Bar.loading.on');
  }

  @autobind
  stopLoading() {
    this.messenger.send('Shopify.API.Bar.loading.off');
  }

  @autobind
  showFlashNotice(message: string) {
    const type = 'Shopify.API.flash.notice';
    this.messenger.send(type, {message});
  }

  @autobind
  pushState(location: string) {
    this.messenger.send('Shopify.API.pushState', {location});
  }

  @autobind
  redirect(location: string) {
    this.messenger.send('Shopify.API.redirect', {location});
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
