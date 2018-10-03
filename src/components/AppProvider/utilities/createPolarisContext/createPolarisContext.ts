import packageJSON from 'package.json';
import {CreatePolarisContext} from '../../types';
import Intl from '../Intl';
import Link from '../Link';
import {Context} from '../../AppProvider';
import EASDK from '../EASDK';
import StickyManager from '../StickyManager';

const METADATA = {
  interface: {
    name: packageJSON.name,
    version: packageJSON.version,
  },
};

export function createPolarisContext({
  i18n,
  linkComponent,
  apiKey,
  shopOrigin,
  forceRedirect,
  debug,
  stickyManager,
}: CreatePolarisContext = {}): Context {
  const intl = new Intl(i18n);
  const link = new Link(linkComponent);
  const easdk =
    apiKey && shopOrigin
      ? new EASDK(
          {
            apiKey,
            shopOrigin,
            forceRedirect,
            debug,
          },
          METADATA,
        )
      : undefined;

  return {
    polaris: {
      intl,
      link,
      stickyManager: stickyManager || new StickyManager(),
    },
    easdk,
  };
}
