import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';
import Card from '../../Card';
import Badge from '../../Badge';
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

    expect(headerMarkup.text().includes(titleString)).toBe(true);
    expect(headerMarkup.find('Badge').text()).toBe(badgeString);
  });
});
