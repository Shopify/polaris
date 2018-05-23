import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';
import Card from '../../Card';
import Badge from '../../Badge/Badge';
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

  it('card with a title of type string has a header tag', () => {
    const title = 'Online store';
    const card = mountWithAppProvider(<Card title="Online store" />);
    expect(card.find('h2').text()).toBe(title);
  });

  it('card can have a badge for a title', () => {
    const titleText = 'I am a badge';
    const title = <Badge>{titleText}</Badge>;
    const card = mountWithAppProvider(<Card title={title} />);
    expect(card.find('Badge').text()).toBe(titleText);
  });

  it('card can have both a badge and a string for a title', () => {
    const titleString = 'Online store'
    const badgeString = 'I am a badge'
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
