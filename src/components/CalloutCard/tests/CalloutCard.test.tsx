import * as React from 'react';
import {mountWithAppProvider} from 'tests/utilities';
import CalloutCard from '../CalloutCard';

describe('<CalloutCard />', () => {
  const illustration =
    'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg';
  const calloutCard = mountWithAppProvider(
    <CalloutCard
      title="Title"
      illustration={illustration}
      primaryAction={{
        content: 'Customize checkout',
        url: 'https://www.shopify.com',
      }}
    >
      <p>Content</p>
    </CalloutCard>,
  );

  it('renders its children', () => {
    expect(calloutCard.contains('<p>Content</p>'));
  });

  it('renders the title as an h2 element', () => {
    expect(
      calloutCard
        .find('h2')
        .first()
        .contains('Title'),
    ).toBe(true);
  });

  it('renders the illustration', () => {
    expect(calloutCard.find('img').prop('src')).toBe(illustration);
  });

  it('renders the primaryAction as an a tag with the given url', () => {
    expect(calloutCard.find('a').prop('href')).toBe('https://www.shopify.com');
  });

  it('renders the primaryAction as an a tag with the given content', () => {
    expect(calloutCard.find('a').contains('Customize checkout')).toBe(true);
  });
});
