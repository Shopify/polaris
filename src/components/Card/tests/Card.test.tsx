import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import {Card, Badge, Button} from 'components';
import {contentContextTypes} from '../../../types';

describe('<Card />', () => {
  it('has a child with contentContext', () => {
    const Child: React.SFC<{}> = (_props, context) =>
      context.withinContentContainer ? <div /> : null;
    Child.contextTypes = contentContextTypes;

    const containedChild = mountWithAppProvider(
      <Card>
        <Child />
      </Card>,
    );

    const div = containedChild
      .find(Child)
      .find('div')
      .first();
    expect(div.exists()).toBe(true);
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
});
