function noop() {}

export const Breakpoints = {
  condensedResourceList: '457px',
  condensedPage: '489px',
  mediumPage: '767px',
  singleColumnLayout: '1044px',
};

export const noopMediaQueryList: MediaQueryList = {
  media: '',
  onchange: noop,
  addListener: noop,
  addEventListener: noop,
  removeListener: noop,
  removeEventListener: noop,
  dispatchEvent: () => false,
  matches: false,
};

export function condensedPage(): MediaQueryList {
  if (typeof window === 'undefined') {
    return noopMediaQueryList;
  }

  return window.matchMedia(`(max-width: ${Breakpoints.condensedPage})`);
}

export function navBarCollapsed(): MediaQueryList {
  if (typeof window === 'undefined') {
    return noopMediaQueryList;
  }

  // $p-breakpoints-md-down
  // https://unpkg.com/browse/@shopify/polaris-tokens@5.5.0/dist/scss/media-queries.scss#L10
  return window.matchMedia(`(max-width: 47.9975em)`);
}

export function singleColumnLayout(): MediaQueryList {
  if (typeof window === 'undefined') {
    return noopMediaQueryList;
  }

  return window.matchMedia(`(max-width: ${Breakpoints.singleColumnLayout})`);
}

export function condensedResourceList(): MediaQueryList {
  if (typeof window === 'undefined') {
    return noopMediaQueryList;
  }

  return window.matchMedia(`(max-width: ${Breakpoints.condensedResourceList})`);
}

export function mediumPage(): MediaQueryList {
  if (typeof window === 'undefined') {
    return noopMediaQueryList;
  }
  return window.matchMedia(`(max-width: ${Breakpoints.mediumPage})`);
}
