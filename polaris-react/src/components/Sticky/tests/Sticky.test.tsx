import {mountWithApp} from 'tests/utilities';

import {Sticky} from '../Sticky';

describe('<Sticky />', () => {
  it('renders children component', () => {
    const element = mountWithApp(
      <Sticky>
        <FunctionalComponent />
      </Sticky>,
    );
    expect(element).toContainReactComponent('h1');
  });

  it('renders a function as child component with a boolean argument set to false by default', () => {
    const element = mountWithApp(<Sticky>{functionItem}</Sticky>);
    expect(element).toContainReactComponent('h1');
    expect(element).not.toContainReactComponent('h2');
  });

  describe('lifecycle', () => {
    it('unmounts safely', () => {
      const sticky = mountWithApp(
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
