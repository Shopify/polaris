import {destroyAll} from '@shopify/react-testing';
import '../src/test-utilities/matchers';

afterEach(() => {
  destroyAll();
});
