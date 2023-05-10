/* eslint-disable jest/require-top-level-describe */
import {destroyAll} from '@shopify/react-testing';
import {matchMedia} from '@shopify/jest-dom-mocks';
import '@shopify/react-testing/matchers';
import './matchers';

beforeEach(() => {
  matchMedia.mock();
});

afterEach(() => {
  matchMedia.restore();
  destroyAll();
});
