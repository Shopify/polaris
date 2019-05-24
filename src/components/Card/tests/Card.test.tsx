import React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import {Card, Badge, Button} from 'components';

import WithinContentContext, {
  WithinContentContextType,
} from '../../WithinContentContext';
import {Section} from '../components';

describe('<Card />', () => {
  it('has a child with prop withinContentContainer set to true', () => {
    function TestComponent(_: WithinContentContextType) {
      return null;
    }

    const component = mountWithAppProvider(
      <Card>
        <WithinContentContext.Consumer>
          {(props) => {
            return <TestComponent {...props} />;
          }}
        </WithinContentContext.Consumer>
      </Card>,
    );

    expect(component.find(TestComponent).prop('withinContentContainer')).toBe(
      true,
    );
  });

  it('has a header tag when the title is a string', () => {
    const title = 'Online store';
    const card = mountWithAppProvider(<Card title="Online store" />);
    expect(card.find('h2').text()).toBe(title);
  });

  it('can have any valid react element as the title', () => {
    const titleString = 'Online store';
    const badgeString = 'I am a badge';
    const titleMarkup = (
      <h2>
        {titleString}
        <Badge>{badgeString}</Badge>
      </h2>
    );

    const card = mountWithAppProvider(<Card title={titleMarkup} />);
    const headerMarkup = card.find('h2');

    expect(headerMarkup.text()).toContain(titleString);
    expect(headerMarkup.find('Badge').text()).toBe(badgeString);
  });

  it('exposes the header component', () => {
    const card = mountWithAppProvider(
      <Card>
        <Card.Header />
      </Card>,
    );
    expect(card.find(Card.Header).exists()).toBeTruthy();
  });

  it('renders a <Header /> component with actions and no title', () => {
    const card = mountWithAppProvider(
      <Card actions={[{content: 'test action'}]}>
        <p>Some card content.</p>
      </Card>,
    );

    expect(card.find(Button)).toHaveLength(1);
    expect(card.find(Card.Header)).toHaveLength(1);
  });

  it('renders a primary footer action', () => {
    const card = mountWithAppProvider(
      <Card primaryFooterAction={{content: 'test action'}}>
        <p>Some card content.</p>
      </Card>,
    );

    const primaryAction = card.find(Button).first();

    expect(primaryAction).toHaveLength(1);
    expect(primaryAction.text()).toBe('test action');
  });

  it('renders a secondary footer action', () => {
    const card = mountWithAppProvider(
      <Card secondaryFooterAction={{content: 'test action'}}>
        <p>Some card content.</p>
      </Card>,
    );

    const secondaryAction = card.find(Button).first();

    expect(secondaryAction).toHaveLength(1);
    expect(secondaryAction.text()).toBe('test action');
  });

  it('renders a section when sectioned', () => {
    const card = mountWithAppProvider(
      <Card sectioned>
        <p>Some card content.</p>
      </Card>,
    );

    const section = card.find(Section).first();

    expect(section).toHaveLength(1);
    expect(section.text()).toBe('Some card content.');
  });
});
