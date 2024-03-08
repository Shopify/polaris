import {destroyAll} from '@shopify/react-testing';
import '@shopify/react-testing/matchers';
import './matchers';

// eslint-disable-next-line jest/require-top-level-describe
afterEach(() => {
  destroyAll();
});

export const setMatchMedia = () => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener() {},
        removeListener() {},
      };
    };
};
