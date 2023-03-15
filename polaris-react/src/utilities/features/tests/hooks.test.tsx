import {mount, mountWithApp} from 'tests/utilities';

import {useFeatures} from '../hooks';

function Component() {
  const features = useFeatures();
  // @ts-expect-error There are currently no valid features, so use a fake one for testing
  return features.foo ? <div /> : null;
}

describe('useFeatures', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('returns context', () => {
    const component = mountWithApp(<Component />, {
      features: {foo: true},
    });
    expect(component).toContainReactComponent('div');
  });

  it('throws an error if context is not set', () => {
    const attemptMount = () => mount(<Component />);
    expect(attemptMount).toThrow('No Features were provided.');
  });
});
