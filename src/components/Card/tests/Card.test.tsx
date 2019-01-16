import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import {Card, Badge} from 'components';

import {Consumer, WithinContentContext} from '../../WithinContentContext';

describe('<Card />', () => {
  it('has a child with prop withinContentContainer set to true', () => {
    function TestComponent(_: WithinContentContext) {
      return null;
    }

    const component = mountWithAppProvider(
      <Card>
        <Consumer>
          {(props) => {
            return <TestComponent {...props} />;
          }}
        </Consumer>
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

    expect(headerMarkup.text().includes(titleString)).toBe(true);
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
});
