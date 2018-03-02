import * as React from 'react';
import Sticky from '../Sticky';
import {mountWithProvider} from '../../../../tests/utilities/enzyme';

describe('<Sticky />', () => {
  it('renders children component', () => {
    const element = mountWithProvider(
      <Sticky>
        <FunctionalComponent />
      </Sticky>,
    );
    expect(element.find('h1').exists()).toBe(true);
  });
  it('renders a function as child component with a boolean argument set to false by default', () => {
    const element = mountWithProvider(
      <Sticky>
        {(isSticky) => {
          if (isSticky === false) {
            return <h1>it worked!</h1>;
          } else {
            return <h2> {"it didn't"} </h2>;
          }
        }}
      </Sticky>,
    );
    expect(element.find('h1').exists()).toBe(true);
    expect(element.find('h2').exists()).toBe(false);
  });
});

function FunctionalComponent() {
  return <h1>Hello</h1>;
}
