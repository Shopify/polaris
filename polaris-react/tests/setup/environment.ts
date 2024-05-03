export {};

if (typeof window !== 'undefined') {
  // Mocks for scrolling
  window.scroll = () => {};

  window.open = (
    _url?: string,
    _target?: string,
    _features?: string,
    _replace?: boolean,
  ) => null;
}

const IGNORE_ERROR_REGEXES = [
  /React does not recognize the `%s` prop on a DOM element/,
];

const IGNORE_WARN_REGEXES: RegExp[] = [/Deprecation:.*/];

// eslint-disable-next-line no-console
const originalConsoleError = console.error.bind(console);
// eslint-disable-next-line no-console
console.error = (...args: any[]) => {
  const [firstArgument] = args;
  if (
    typeof firstArgument === 'string' &&
    IGNORE_ERROR_REGEXES.some((regex) => regex.test(firstArgument))
  ) {
    return;
  }

  originalConsoleError(...args);
};

// eslint-disable-next-line no-console
const originalConsoleWarn = console.warn.bind(console);
// eslint-disable-next-line no-console
console.warn = (...args: any[]) => {
  const [firstArgument] = args;
  if (
    typeof firstArgument === 'string' &&
    IGNORE_WARN_REGEXES.some((regex) => regex.test(firstArgument))
  ) {
    return;
  }

  originalConsoleWarn(...args);
};
