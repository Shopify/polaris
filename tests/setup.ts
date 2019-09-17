import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'mutationobserver-shim';

configure({adapter: new Adapter()});

// Mocks for scrolling
window.scroll = () => {};

const IGNORE_ERROR_REGEXES = [
  /React does not recognize the `%s` prop on a DOM element/,
  /Accessing PropTypes via the main React package is deprecated/,
  /ReactTestUtils has been moved to react-dom\/test-utils/,
  /Shallow renderer has been moved to react-test-renderer\/shallow/,
  /React\.createClass is deprecated and will be removed in version 16/,
];

const IGNORE_WARN_REGEXES = [
  /Deprecation: Using `apiKey` and `shopOrigin` on `AppProvider` to initialize the Shopify App Bridge is deprecated. Support for this will be removed in v5\.0\./,
  /Deprecation: Using `Loading` in an embedded app is deprecated and will be removed in v5\.0\./,
  /Deprecation: Using `Modal` in an embedded app is deprecated and will be removed in v5\.0\./,
  /Deprecation: Using `Page` to render an embedded app title bar is deprecated and will be removed in v5\.0\./,
  /Deprecation: Using `Toast` in an embedded app is deprecated and will be removed in v5\.0\./,
  /Deprecation: `ResourcePicker` is deprecated and will be removed in v5\.0\./,
];

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
