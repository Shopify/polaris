import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {InlineError} from 'components';

import {Choice} from '../Choice';

describe('<Choice />', () => {
  it('calls the provided onClick when clicked', () => {
    const spy = jest.fn();
    const element = mountWithAppProvider(
      <Choice id="MyChoice" label="Label" onClick={spy} />,
    );
    element.find('label').simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('uses the id as the for attribute of a label', () => {
    const element = mountWithAppProvider(
      <Choice id="MyChoice" label="Label" />,
    );
    const label = element.find('label');

    expect(label.prop('htmlFor')).toBe('MyChoice');
    expect(label.text()).toBe('Label');
  });

  it('renders error markup when provided with a value', () => {
    const element = mountWithAppProvider(
      <Choice id="MyChoice" label="Label" error="Error message" />,
    );

    expect(element.find('#MyChoiceError').text()).toContain('Error message');
  });

  it('avoids rendering error markup when the error is a boolean value', () => {
    const element = mountWithAppProvider(
      <Choice id="MyChoice" label="Label" error={Boolean(true)} />,
    );

    expect(element.find(InlineError)).toHaveLength(0);
  });

  // We want the entire choice to be clickable, including the space
  // between the choice and the visual appearance of the label.
  it('renders the content as a child of the label', () => {
    function MyComponent() {
      return <div />;
    }

    const element = mountWithAppProvider(
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
    const element = mountWithAppProvider(
      <Choice id="MyChoice" label="Label" />,
    );
    const label = element.find('label');
    for (const blockLevelElement of blockLevelElements) {
      expect(label.find(blockLevelElement)).toHaveLength(0);
    }
  });
});
