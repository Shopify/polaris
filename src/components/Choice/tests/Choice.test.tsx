import * as React from 'react';
import {shallow} from 'enzyme';
import Choice from '..';

describe('<Choice />', () => {
  it('uses the id as the for attribute of a label', () => {
    const element = shallow(<Choice id="MyChoice" label="Label" />);
    const label = element.find('label');

    expect(label.prop('htmlFor')).toBe('MyChoice');
    expect(label.text()).toBe('Label');
  });

  // We want the entire choice to be clickable, including the space
  // between the choice and the visual appearance of the label.
  it('renders the content as a child of the label', () => {
    function MyComponent() {
      return <div />;
    }

    const element = shallow(
      <Choice id="MyChoice" label="Label">
        <MyComponent />
      </Choice>,
    );
    const label = element.find('label');

    expect(label.containsMatchingElement(<MyComponent />)).toBe(true);
  });

  it('does not render block-level elements in the label', () => {
    const blockLevelElements = [
      'p',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ol',
      'ul',
      'pre',
      'address',
      'blockquote',
      'dl',
      'div',
      'fieldset',
      'form',
      'hr',
      'table',
    ];
    const element = shallow(<Choice id="MyChoice" label="Label" />);
    const label = element.find('label');
    for (let i = 0; i < blockLevelElements.length; i++) {
      expect(label.find(blockLevelElements[i])).toHaveLength(0);
    }
  });
});
