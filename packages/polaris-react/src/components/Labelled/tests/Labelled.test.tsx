import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Button} from '../../Button';
import {InlineError} from '../../InlineError';
import {Label} from '../../Label';
import {Labelled} from '..';

describe('<Labelled />', () => {
  it('passes relevant props along to the label', () => {
    const action = {content: 'Do something'};
    const element = mountWithApp(
      <Labelled id="my-label" action={action} label="Label" />,
    );

    expect(element).toContainReactComponent(Label, {
      id: 'my-label',
      children: 'Label',
    });
  });

  it('passes required indicator prop along to the label', () => {
    const element = mountWithApp(
      <Labelled id="my-label" label="Label" requiredIndicator />,
    );

    expect(element).toContainReactComponent(Label, {requiredIndicator: true});
  });

  describe('error', () => {
    it('renders error markup when provided with a value', () => {
      const label = mountWithApp(
        <Labelled id="MyLabelled" label="Label" error="Error message" />,
      );

      expect(label).toContainReactComponentTimes(InlineError, 1);
      expect(label).toContainReactText('Error message');
    });

    it('renders no error markup when provided with a boolean value', () => {
      const label = mountWithApp(
        <Labelled
          id="MyLabelled"
          label="Label"
          error={Boolean('Error message')}
        />,
      );

      expect(label).not.toContainReactComponent(InlineError);
    });
  });

  it('renders the content as a child outside of the label', () => {
    function MyComponent() {
      return <div />;
    }

    const element = mountWithApp(
      <Labelled id="MyLabelled" label="Label">
        <MyComponent />
      </Labelled>,
    );
    expect(element).toContainReactComponent(MyComponent);
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

      const label = mountWithApp(
        <Labelled id="MyLabelled" label="Label" action={action} />,
      );

      expect(label).toContainReactComponent(Button, {variant: 'plain'});
    });

    it('does not render any block-level elements in the label element', () => {
      const label = mountWithApp(
        <Labelled
          id="MyThing"
          action={{content: 'My action'}}
          label="My thing"
        />,
      );
      expect(label.find('label')).not.toContainReactComponent('div');
    });
  });
});
