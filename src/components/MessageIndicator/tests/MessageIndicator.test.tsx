import {mountWithApp} from 'tests/utilities';

import {MessageIndicator} from '../MessageIndicator';

describe('<Indicator />', () => {
  it('mounts', () => {
    const indicator = mountWithApp(<MessageIndicator />);
    expect(indicator).not.toBeNull();
  });

  it('renders its children', () => {
    const indicator = mountWithApp(
      <MessageIndicator>
        <div>Hello Polaris</div>
      </MessageIndicator>,
    );

    expect(indicator).toContainReactText('Hello Polaris');
  });

  it('renders indicator markup when active is true', () => {
    const indicator = mountWithApp(
      <MessageIndicator active>
        <div>Hello Polaris</div>
      </MessageIndicator>,
    );
    expect(indicator).toContainReactComponent('div', {
      className: 'MessageIndicator',
    });
  });
});
