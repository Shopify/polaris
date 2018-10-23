/* eslint-disable no-console */
const originalConsoleError = console.error.bind(console);
const originalConsoleWarn = console.warn.bind(console);

const IGNORE_ERROR_REGEXES = [
  /React does not recognize the `testID` prop on a DOM element/,
];

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

console.warn = (...args: any[]) => {
  const [firstArgument] = args;
  if (
    typeof firstArgument === 'string' &&
    IGNORE_ERROR_REGEXES.some((regex) => regex.test(firstArgument))
  ) {
    return;
  }

  originalConsoleWarn(...args);
};
