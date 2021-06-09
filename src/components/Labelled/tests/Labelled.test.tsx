import React from 'react';
import {InlineError, Label, buttonFrom, Labelled} from 'components';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

describe('<Labelled />', () => {
  it('passes relevant props along to the label', () => {
    const action = {content: 'Do something'};
    const element = mountWithAppProvider(
      <Labelled id="my-label" action={action} label="Label" />,
    );
    const label = element.find(Label);

    expect(label.prop('id')).toBe('my-label');
    expect(label.prop('children')).toBe('Label');
  });

  it('passes required indicator prop along to the label', () => {
    const element = mountWithAppProvider(
      <Labelled id="my-label" label="Label" requiredIndicator />,
    );
    const label = element.find(Label);

    expect(label.prop('requiredIndicator')).toBe(true);
  });

  describe('error', () => {
    it('renders error markup when provided with a value', () => {
      const label = mountWithAppProvider(
        <Labelled id="MyLabelled" label="Label" error="Error message" />,
      );

      const error = label.find(InlineError);
      expect(error).toHaveLength(1);
      expect(error.text()).toContain('Error message');
    });

    it('renders no error markup when provided with a boolean value', () => {
      const label = mountWithAppProvider(
        <Labelled
          id="MyLabelled"
          label="Label"
          error={Boolean('Error message')}
        />,
      );

      expect(label.find(InlineError)).toHaveLength(0);
    });
  });

  it('renders the content as a child outside of the label', () => {
    function MyComponent() {
      return <div />;
    }

    const element = mountWithAppProvider(
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

      const label = mountWithAppProvider(
        <Labelled id="MyLabelled" label="Label" action={action} />,
      );
      const button = buttonFrom(action, {plain: true});
      expect(label.containsMatchingElement(button)).toBe(true);
    });

    it('does not render any block-level elements in the label element', () => {
      const label = mountWithAppProvider(
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
