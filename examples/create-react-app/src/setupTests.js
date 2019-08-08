import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

window.matchMedia =
  window.matchMedia ||
  jest.fn().mockImplementation((query) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  });

Enzyme.configure({adapter: new Adapter()});
