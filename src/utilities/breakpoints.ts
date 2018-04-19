import {noop} from '@shopify/javascript-utilities/other';

const Breakpoints = {
  navBarCollapsed: '769px',
};

export function navBarCollapsed(): MediaQueryList {
  if (typeof window === 'undefined') {
    return {media: '', addListener: noop, removeListener: noop, matches: false};
  }

  return window.matchMedia(`(max-width: ${Breakpoints.navBarCollapsed})`);
}
