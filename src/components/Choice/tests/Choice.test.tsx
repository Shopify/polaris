import {mountWithApp} from 'tests/utilities';

import {InlineError} from '../../InlineError';
import {Choice} from '../Choice';

describe('<Choice />', () => {
  it('calls the provided onClick when clicked', () => {
    const spy = jest.fn();
    const element = mountWithApp(
      <Choice id="MyChoice" label="Label" onClick={spy} />,
    );
    element.find('label')!.trigger('onClick');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('uses the id as the for attribute of a label', () => {
    const element = mountWithApp(<Choice id="MyChoice" label="Label" />);

    expect(element).toContainReactComponent('label', {
      htmlFor: 'MyChoice',
    });
    expect(element.find('label'))!.toContainReactText('Label');
  });

  it('renders error markup when provided with a value', () => {
    const element = mountWithApp(
      <Choice id="MyChoice" label="Label" error="Error message" />,
    );

    expect(element.find(InlineError)).toContainReactText('Error message');
  });

  it('avoids rendering error markup when the error is a boolean value', () => {
    const element = mountWithApp(
      <Choice id="MyChoice" label="Label" error={Boolean(true)} />,
    );

    expect(element).not.toContainReactComponent(InlineError);
  });

  // We want the entire choice to be clickable, including the space
  // between the choice and the visual appearance of the label.
  it('renders the content as a child of the label', () => {
    function MyComponent() {
      return <div />;
    }

    const element = mountWithApp(
      <Choice id="MyChoice" label="Label">
        <MyComponent />
      </Choice>,
    );

    expect(element.find('label')).toContainReactComponent(MyComponent);
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
    const element = mountWithApp(<Choice id="MyChoice" label="Label" />);
    for (const blockLevelElement of blockLevelElements) {
      expect(element.find('label')).not.toContainReactComponent(
        blockLevelElement,
      );
    }
  });
});
