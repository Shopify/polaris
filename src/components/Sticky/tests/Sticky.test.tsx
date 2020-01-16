import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {Sticky} from '../Sticky';

describe('<Sticky />', () => {
  it('renders children component', () => {
    const element = mountWithAppProvider(
      <Sticky>
        <FunctionalComponent />
      </Sticky>,
    );
    expect(element.find('h1').exists()).toBe(true);
  });

  it('renders a function as child component with a boolean argument set to false by default', () => {
    const element = mountWithAppProvider(<Sticky>{functionItem}</Sticky>);
    expect(element.find('h1').exists()).toBe(true);
    expect(element.find('h2').exists()).toBe(false);
  });

  describe('lifecycle', () => {
    it('unmounts safely', () => {
      const sticky = mountWithAppProvider(
        <Sticky>
          <p>Child content</p>
        </Sticky>,
      );

      expect(() => {
        sticky.unmount();
      }).not.toThrow();
    });
  });
});

function FunctionalComponent() {
  return <h1>Hello</h1>;
}

function functionItem(isSticky: boolean) {
  if (isSticky === false) {
    return <h1>it worked!</h1>;
  } else {
    return <h2>it didn’t work</h2>;
  }
}
