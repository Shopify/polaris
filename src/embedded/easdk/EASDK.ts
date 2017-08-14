import {autobind} from '@shopify/javascript-utilities/decorators';

import Messenger from './Messenger';
import Bar from './components/Bar';
import Modal from './components/Modal';
import ResourcePicker from './components/ResourcePicker';

export interface Options {
  apiKey: string,
  shopOrigin: string,
  forceRedirect?: boolean,
  metadata?: object,
  debug?: boolean,
}

export interface User {
  name: string,
  accountAccess: 'Account owner' | 'Full access' | 'Limited access',
}

interface InitData {
  User?: {
    current: User,
  },
}

interface ModalOnClose {
  result: boolean,
  data?: object,
}

export default class EASDK {
  currentUser?: User;
  Bar: Bar;
  Modal: Modal;
  ResourcePicker: ResourcePicker;

  private messenger: Messenger;

  constructor({apiKey, shopOrigin, debug, forceRedirect}: Options, metadata: object) {
    checkFrameRedirect(apiKey, shopOrigin, forceRedirect);

    this.messenger = new Messenger(window.parent, {
      'Shopify.API.initialize': (data: InitData) => {
        if (data && data.User && data.User.current) {
          this.currentUser = data.User.current;
        }
      },
      'Shopify.API.Modal.close': ({result, data}: ModalOnClose) => {
        this.Modal.callCloseCallback(result, data);
      },
    }, {
      name: 'iframe',
      targetOrigin: shopOrigin,
      debug,
    });

    this.Bar = new Bar(this.messenger);
    this.Modal = new Modal(this.messenger);
    this.ResourcePicker = new ResourcePicker(this.messenger, this.Modal);

    this.messenger.send('Shopify.API.initialize', {apiKey, shopOrigin, metadata, debug, forceRedirect});
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
  showFlashNotice(message: string, options: {error?: boolean} = {}) {
    const {error = false} = options;
    const type = error ? 'Shopify.API.flash.error' : 'Shopify.API.flash.notice';
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
    redirectUrl = `${redirectUrl}${apiKey}${window.location.pathname}${window.location.search}`;
  }

  if (forceRedirect) {
    window.location.assign(redirectUrl);
  } else {
    // tslint:disable-next-line no-console
    console.error(`Embedded app was not loaded in an iframe and redirecting is disabled. Set forceRedirect to true and this page will redirect to: ${redirectUrl}`);
  }
}
