import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {Card, Badge, Button, Popover, ActionList} from 'components';

import {WithinContentContext} from '../../../utilities/within-content-context';
import {Section} from '../components';

describe('<Card />', () => {
  it('has a child with prop withinContentContainer set to true', () => {
    function TestComponent(_: {withinContentContainer: any}) {
      return null;
    }

    const component = mountWithAppProvider(
      <Card>
        <WithinContentContext.Consumer>
          {(withinContentContext) => {
            return (
              <TestComponent withinContentContainer={withinContentContext} />
            );
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

  describe('footerActionAlignment prop', () => {
    it('renders right-aligned if not supplied', () => {
      const card = mountWithApp(
        <Card
          primaryFooterAction={{content: 'primary action'}}
          secondaryFooterActions={[{content: 'secondary action'}]}
        >
          <p>Some card content.</p>
        </Card>,
      );

      const buttons = card.findAll(Button);
      expect(buttons[0].prop('children')).toBe('secondary action');
      expect(buttons[1].prop('children')).toBe('primary action');
    });

    it('renders right-aligned if set to "right"', () => {
      const card = mountWithApp(
        <Card
          primaryFooterAction={{content: 'primary action'}}
          secondaryFooterActions={[{content: 'secondary action'}]}
          footerActionAlignment="right"
        >
          <p>Some card content.</p>
        </Card>,
      );

      const buttons = card.findAll(Button);
      expect(buttons[0].prop('children')).toBe('secondary action');
      expect(buttons[1].prop('children')).toBe('primary action');
    });

    it('renders left-aligned if set to "left"', () => {
      const card = mountWithApp(
        <Card
          primaryFooterAction={{content: 'primary action'}}
          secondaryFooterActions={[{content: 'secondary action'}]}
          footerActionAlignment="left"
        >
          <p>Some card content.</p>
        </Card>,
      );

      const buttons = card.findAll(Button);
      expect(buttons[0].prop('children')).toBe('primary action');
      expect(buttons[1].prop('children')).toBe('secondary action');
    });
  });

  describe('hideWhenPrinting prop', () => {
    it('renders the classname "Card hideOnPrint" when passed', () => {
      const card = mountWithApp(
        <Card hideOnPrint>
          <p>Some card content.</p>
        </Card>,
      );

      expect(card).toContainReactComponent('div', {
        className: 'Card hideOnPrint',
      });
    });

    it('does not render the classname "Card hideOnPrint" when prop is not passed', () => {
      const card = mountWithApp(
        <Card>
          <p>Some card content.</p>
        </Card>,
      );

      expect(card).not.toContainReactComponent('div', {
        className: 'Card hideOnPrint',
      });
    });
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
      const card = mountWithApp(
        <Card secondaryFooterActions={footerActions}>
          <p>Some card content.</p>
        </Card>,
      );

      const disclosureButton = card.findAll(Button)[0];
      expect(disclosureButton).toContainReactText('More');

      expect(card).toContainReactComponent(Popover, {
        active: false,
      });

      disclosureButton.trigger('onClick');

      expect(card).toContainReactComponent(Popover, {
        active: true,
      });

      expect(card).toContainReactComponent(ActionList, {
        items: footerActions,
      });
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
