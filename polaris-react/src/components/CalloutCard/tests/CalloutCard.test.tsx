import {mountWithApp} from 'tests/utilities';

import {Badge} from '../../Badge';
import {Button} from '../../Button';
import {ButtonGroup} from '../../ButtonGroup';
import {CalloutCard} from '../CalloutCard';

describe('<CalloutCard />', () => {
  const illustration =
    'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg';
  const spy = jest.fn();

  function calloutCardMock() {
    return mountWithApp(
      <CalloutCard
        title="Title"
        illustration={illustration}
        primaryAction={{
          content: 'Customize checkout',
          url: 'https://www.shopify.com',
        }}
        secondaryAction={{content: 'Secondary action'}}
        onDismiss={spy}
      >
        <p>Content</p>
      </CalloutCard>,
    );
  }

  it('renders its children', () => {
    const calloutCard = calloutCardMock();
    expect(calloutCard.find('p')).toContainReactText('Content');
  });

  it('renders plain string title as an h2 element', () => {
    const calloutCard = calloutCardMock();
    expect(calloutCard.find('h2')).toContainReactText('Title');
  });

  it('renders any valid react element as title', () => {
    const titleContent = 'Checkout Settings';
    const badgeContent = 'Badge';
    const titleMarkup = (
      <>
        {titleContent}
        <Badge>{badgeContent}</Badge>
      </>
    );

    const calloutCard = mountWithApp(
      <CalloutCard
        title={titleMarkup}
        illustration={illustration}
        primaryAction={{
          content: 'Customize checkout',
          url: 'https://www.shopify.com',
        }}
      />,
    );

    expect(calloutCard).toContainReactText(titleContent);
    expect(calloutCard).toContainReactComponent(Badge, {
      children: badgeContent,
    });
  });

  it('renders the illustration', () => {
    const calloutCard = calloutCardMock();
    expect(calloutCard).toContainReactComponent('img', {
      src: illustration,
    });
  });

  it('renders the primaryAction as an a tag with the given url', () => {
    const calloutCard = calloutCardMock();
    expect(calloutCard).toContainReactComponent('a', {
      href: 'https://www.shopify.com',
    });
  });

  it('renders the primaryAction as an a tag with the given content', () => {
    const calloutCard = calloutCardMock();
    expect(calloutCard.find('a')).toContainReactText('Customize checkout');
  });

  it('renders a secondary action with the given content in a button group', () => {
    const calloutCard = calloutCardMock();
    expect(calloutCard).toContainReactComponentTimes(ButtonGroup, 1);
    expect(calloutCard).toContainReactComponent(Button, {
      children: 'Secondary action',
    });
  });

  it('is dismissed', () => {
    const calloutCard = calloutCardMock();
    expect(calloutCard).toContainReactComponentTimes(Button, 3);
    calloutCard.findAll(Button)[0].trigger('onClick');
    expect(spy).toHaveBeenCalled();
  });

  it('only renders one button when only a primary action is given', () => {
    const oneActionCalloutCard = mountWithApp(
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

    expect(oneActionCalloutCard).toContainReactComponent(Button);
  });
});
