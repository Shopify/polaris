import {themeDefault, getMediaConditions} from '@shopify/polaris-tokens';
import type {BreakpointsTokenName} from '@shopify/polaris-tokens';

const mediaConditions = getMediaConditions(themeDefault.breakpoints);

export function setMediaWidth(breakpointsTokenName: BreakpointsTokenName) {
  const aliasDirectionConditions = Object.values(
    mediaConditions[breakpointsTokenName],
  );

  jest.spyOn(window, 'matchMedia').mockImplementation((query) => ({
    matches: aliasDirectionConditions.includes(query),
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}
