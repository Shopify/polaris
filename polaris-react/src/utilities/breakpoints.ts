const Breakpoints = {
  navigationBarCollapsed: '767.95px',
  stackedContent: '1039.95px',
};

const noWindowMatches: MediaQueryList = {
  media: '',
  addListener: noop,
  removeListener: noop,
  matches: false,
  onchange: noop,
  addEventListener: noop,
  removeEventListener: noop,
  dispatchEvent: (_: Event) => true,
};

function noop() {}

export function navigationBarCollapsed() {
  return typeof window === 'undefined'
    ? noWindowMatches
    : window.matchMedia(`(max-width: ${Breakpoints.navigationBarCollapsed})`);
}

export function stackedContent() {
  return typeof window === 'undefined'
    ? noWindowMatches
    : window.matchMedia(`(max-width: ${Breakpoints.stackedContent})`);
}
