import {noop} from '@shopify/javascript-utilities/other';

const Breakpoints = {
  navigationBarCollapsed: '769px',
  stackedContent: '1043px',
};

const noWindowMatches = {
  media: '',
  addListener: noop,
  removeListener: noop,
  matches: false,
};

export function navigationBarCollapsed(): MediaQueryList {
  return typeof window === 'undefined'
    ? noWindowMatches
    : window.matchMedia(`(max-width: ${Breakpoints.navigationBarCollapsed})`);
}

export function stackedContent(): MediaQueryList {
  return typeof window === 'undefined'
    ? noWindowMatches
    : window.matchMedia(`(max-width: ${Breakpoints.stackedContent})`);
}
