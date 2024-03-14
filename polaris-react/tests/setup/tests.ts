import {destroyAll} from '@shopify/react-testing';
import {matchMedia} from '@shopify/jest-dom-mocks';
import '@shopify/react-testing/matchers';
import './matchers';

// eslint-disable-next-line jest/require-top-level-describe
beforeEach(() => {
  if (typeof window !== 'undefined') {
    matchMedia.mock();
  }
});

// eslint-disable-next-line jest/require-top-level-describe
afterEach(() => {
  if (typeof window !== 'undefined') {
    matchMedia.restore();
  }
  destroyAll();
});
