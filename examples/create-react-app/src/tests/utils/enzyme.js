import {PolarisTestProvider} from '@shopify/polaris';
import {mount} from 'enzyme';

export function mountWithAppProvider(node, context) {
  return mount(node, {
    wrappingComponent: PolarisTestProvider,
    wrappingComponentProps: context,
  });
}
