import {destroyAll} from '@shopify/react-testing';
import '@shopify/react-testing/matchers';
import './matchers';

afterEach(() => {
  destroyAll();
});
