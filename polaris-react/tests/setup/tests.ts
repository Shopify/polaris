import {destroyAll} from '@shopify/react-testing';
import {matchMedia} from '@shopify/jest-dom-mocks';
import '@shopify/react-testing/matchers';
import './matchers';

// Mock once before test files are imported so uses of `window.matchMedia`
// outside of components still works.
if (typeof window !== 'undefined' && !matchMedia.isMocked()) {
  matchMedia.mock();
}

// eslint-disable-next-line jest/require-top-level-describe
beforeEach(() => {
  if (typeof window !== 'undefined' && !matchMedia.isMocked()) {
    matchMedia.mock();
  }
});

// eslint-disable-next-line jest/require-top-level-describe
afterEach(() => {
  if (typeof window !== 'undefined' && matchMedia.isMocked()) {
    matchMedia.restore();
  }
  destroyAll();
});
