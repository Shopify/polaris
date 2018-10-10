import {ValidationMap} from 'react';
import PropTypes from 'prop-types';
import packageJSON from '../../../../../package.json';
import Intl from '../Intl';
import Link from '../Link';
import {Context, Props as AppProviderProps} from '../../AppProvider';
import EASDK from '../EASDK';
import {StickyManager} from '../withSticky';

const METADATA = {
  interface: {
    name: packageJSON.name,
    version: packageJSON.version,
  },
};

export interface CreatePolarisContext extends AppProviderProps {
  stickyManager?: StickyManager;
}

export const polarisAppProviderContextTypes: ValidationMap<any> = {
  polaris: PropTypes.any,
  easdk: PropTypes.any,
};

export default function createPolarisContext({
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
