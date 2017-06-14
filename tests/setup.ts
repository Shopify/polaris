const IGNORE_ERROR_REGEXES = [
  /Accessing PropTypes via the main React package is deprecated/,
  /ReactTestUtils has been moved to react-dom\/test-utils/,
  /Shallow renderer has been moved to react-test-renderer\/shallow/,
  /React\.createClass is deprecated and will be removed in version 16/,
];

const originalConsoleError = console.error.bind(console);
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
