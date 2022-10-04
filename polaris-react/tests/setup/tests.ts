import {destroyAll} from '@shopify/react-testing';
import {matchMedia} from '@shopify/jest-dom-mocks';
import '@shopify/react-testing/matchers';
import './matchers';
import {setMediaWidth} from 'tests/utilities/breakpoints';

// eslint-disable-next-line jest/require-top-level-describe
beforeAll(() => {
  matchMedia.mock();
  setMediaWidth('breakpoints-md');
});

// eslint-disable-next-line jest/require-top-level-describe
afterAll(() => {
  matchMedia.restore();
});

// eslint-disable-next-line jest/require-top-level-describe
afterEach(() => {
  destroyAll();
});
