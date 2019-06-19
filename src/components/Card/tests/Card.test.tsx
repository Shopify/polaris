import * as React from 'react';
import {mountWithAppProvider, trigger, findByTestID} from 'test-utilities';
import {Card, Badge, Button, Popover, ActionList} from 'components';
import {Section} from '../components';
import {contentContextTypes} from '../../../types';

describe('<Card />', () => {
  it('has a child with contentContext', () => {
    const Child: React.SFC = (_props, context) => {
      // eslint-disable-next-line shopify/jest/no-if
      return context.withinContentContainer ? <div /> : null;
    };
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

  describe('secondaryFooterActions', () => {
    it('renders a single secondary footer action button when only 1 is supplied', () => {
      const card = mountWithAppProvider(
        <Card secondaryFooterActions={[{content: 'test action'}]}>
          <p>Some card content.</p>
        </Card>,
      );

      const secondaryAction = card.find(Button).first();
      expect(secondaryAction).toHaveLength(1);
      expect(secondaryAction.text()).toBe('test action');
      expect(card.find(Popover).first()).toHaveLength(0);
    });

    it('renders popover when >1 are supplied', () => {
      const card = mountWithAppProvider(
        <Card
          secondaryFooterActions={[
            {content: 'Most important action'},
            {content: 'Second most important action'},
          ]}
        >
          <p>Some card content.</p>
        </Card>,
      );

      const disclosureButton = card.find(Button).first();
      expect(disclosureButton).toHaveLength(1);
      expect(disclosureButton.text()).toBe('More');

      const popover = card.find(Popover).first();
      expect(popover).toHaveLength(1);
    });

    it('activates popover when disclosure button is clicked', () => {
      const footerActions = [
        {content: 'Most important action'},
        {content: 'Second most important action'},
      ];
      const card = mountWithAppProvider(
        <Card secondaryFooterActions={footerActions}>
          <p>Some card content.</p>
        </Card>,
      );

      const disclosureButton = card.find(Button).first();
      expect(disclosureButton).toHaveLength(1);
      expect(disclosureButton.text()).toBe('More');

      const popover = card.find(Popover).first();
      expect(popover).toHaveLength(1);
      expect(popover.prop('active')).toBe(false);

      trigger(disclosureButton, 'onClick');

      expect(
        card
          .find(Popover)
          .first()
          .prop('active'),
      ).toBe(true);

      const overlay = findByTestID(card, 'popoverOverlay');
      expect(overlay).toHaveLength(1);

      const actionList = overlay.find(ActionList).first();
      expect(actionList).toHaveLength(1);
      expect(actionList.prop('items')).toBe(footerActions);
    });

    it('sets the disclosure button content to the value set on secondaryFooterActionsDisclosureText', () => {
      const card = mountWithAppProvider(
        <Card
          secondaryFooterActions={[
            {content: 'Most important action'},
            {content: 'Second most important action'},
          ]}
          secondaryFooterActionsDisclosureText="Show more"
        >
          <p>Some card content.</p>
        </Card>,
      );

      const disclosureButton = card.find(Button).first();
      expect(disclosureButton).toHaveLength(1);
      expect(disclosureButton.text()).toBe('Show more');
    });

    it('will prefer secondaryFooterActions to secondaryFooterAction if both are provided', () => {
      const card = mountWithAppProvider(
        <Card
          secondaryFooterActions={[{content: 'a'}]}
          secondaryFooterAction={{content: 'b'}}
        >
          <p>Some card content.</p>
        </Card>,
      );

      const button = card.find(Button).first();
      expect(button).toHaveLength(1);
      expect(button.text()).toBe('a');
    });
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
