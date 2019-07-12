import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'mutationobserver-shim';

configure({adapter: new Adapter()});

const IGNORE_ERROR_REGEXES = [
  /React does not recognize the `testID` prop on a DOM element/,
  /Accessing PropTypes via the main React package is deprecated/,
  /ReactTestUtils has been moved to react-dom\/test-utils/,
  /Shallow renderer has been moved to react-test-renderer\/shallow/,
  /React\.createClass is deprecated and will be removed in version 16/,
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
