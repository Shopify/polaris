import {destroyAll} from '@shopify/react-testing';
import '@shopify/react-testing/matchers';

afterEach(() => {
  destroyAll();
});
