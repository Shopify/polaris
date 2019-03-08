import merge from 'lodash/merge';
import {shallow} from 'enzyme';
import {createPolarisContext, polarisContextTypes} from '@shopify/polaris';

function mergeAppProviderOptions(options: any) {
  const context = createPolarisContext();

  return merge(
    {},
    {
      context,
      childContextTypes: polarisContextTypes,
    },
    options,
  );
}

export function shallowWithAppProvider(node: any, options?: any) {
  return shallow(node, mergeAppProviderOptions(options)).dive(options);
}
