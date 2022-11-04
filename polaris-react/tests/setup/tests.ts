import {destroyAll} from '@shopify/react-testing';
import '@shopify/react-testing/matchers';
import './matchers';

// eslint-disable-next-line jest/require-top-level-describe
afterEach(() => {
  destroyAll();
});

globalThis.requestAnimationFrame = (cb) => {
  cb(Date.now());
  return Math.random();
};
