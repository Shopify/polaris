import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import {Badge, Subheading} from 'components';
import Section from '../Section';

describe('<Card.Section />', () => {
  it('can have any valid react element as the card section title', () => {
    const titleString = 'Online store';
    const badgeString = 'I am a badge';
    const titleMarkup = (
      <h2>
        {titleString}
        <Badge>{badgeString}</Badge>
      </h2>
    );

    const card = mountWithAppProvider(<Section title={titleMarkup} />);
    const headerMarkup = card.find('h2');

    expect(headerMarkup.text().includes(titleString)).toBe(true);
    expect(headerMarkup.find('Badge').text()).toBe(badgeString);
  });

  it('wraps plain string titles in a <Subheading />', () => {
    const titleString = 'Online store';

    const card = mountWithAppProvider(<Section title={titleString} />);
    const headerMarkup = card.find(Subheading);

    expect(headerMarkup.exists()).toBeTruthy();
    expect(headerMarkup.text()).toEqual(titleString);
  });
});
