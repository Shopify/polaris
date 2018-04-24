import * as React from 'react';
import {shallow} from 'enzyme';
import Labelled from '..';
import Label from '../../Label';
import {buttonFrom} from '../../Button';

describe('<Labelled />', () => {
  it('passes relevant props along to the label', () => {
    const action = {content: 'Do something'};
    const element = shallow(
      <Labelled id="my-label" action={action} label="Label" />,
    );
    const label = element.find(Label);

    expect(label.prop('id')).toBe('my-label');
    expect(label.prop('children')).toBe('Label');
  });

  it('renders error markup when provided with a value', () => {
    const label = shallow(
      <Labelled id="MyLabelled" label="Label" error="Error message" />,
    );

    expect(label.find('#MyLabelledError').text()).toContain('Error message');
  });

  it('renders the content as a child outside of the label', () => {
    function MyComponent() {
      return <div />;
    }

    const element = shallow(
      <Labelled id="MyLabelled" label="Label">
        <MyComponent />
      </Labelled>,
    );
    expect(element.find(MyComponent).exists()).toBe(true);
  });

  describe('action', () => {
    it('renders a plain button with the specified attributes', () => {
      const action = {
        content: 'My action',
        onAction() {
          return true;
        },
        accessibilityLabel: 'My action with more description',
      };

      const label = shallow(
        <Labelled id="MyLabelled" label="Label" action={action} />,
      );
      const button = buttonFrom(action, {plain: true});
      expect(label.containsMatchingElement(button)).toBe(true);
    });

    it('does not render any block-level elements in the label element', () => {
      const label = shallow(
        <Labelled
          id="MyThing"
          action={{content: 'My action'}}
          label="My thing"
        />,
      );
      expect(label.find('label').find('div')).toHaveLength(0);
    });
  });
});
