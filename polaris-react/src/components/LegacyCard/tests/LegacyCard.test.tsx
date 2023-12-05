import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Badge} from '../../Badge';
import {Button} from '../../Button';
import {Popover} from '../../Popover';
import {ActionList} from '../../ActionList';
import {WithinContentContext} from '../../../utilities/within-content-context';
// eslint-disable-next-line import/no-deprecated
import {LegacyCard} from '../LegacyCard';
import {Section} from '../components';

describe('<LegacyCard />', () => {
  it('has a child with prop withinContentContainer set to true', () => {
    function TestComponent(_: {withinContentContainer: any}) {
      return null;
    }

    const legacyCard = mountWithApp(
      <LegacyCard>
        <WithinContentContext.Consumer>
          {(withinContentContext) => {
            return (
              <TestComponent withinContentContainer={withinContentContext} />
            );
          }}
        </WithinContentContext.Consumer>
      </LegacyCard>,
    );
    expect(legacyCard).toContainReactComponent(TestComponent, {
      withinContentContainer: true,
    });
  });

  it('has a header tag when the title is a string', () => {
    const title = 'Online store';
    const legacyCard = mountWithApp(<LegacyCard title={title} />);
    expect(legacyCard.find('h2')).toContainReactText(title);
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

    const legacyCard = mountWithApp(<LegacyCard title={titleMarkup} />);
    const headerMarkup = legacyCard.find('h2')!;

    expect(headerMarkup).toContainReactText(titleString);
    expect(headerMarkup.find(Badge)).toContainReactText(badgeString);
  });

  it('exposes the header component', () => {
    const legacyCard = mountWithApp(
      <LegacyCard>
        <LegacyCard.Header />
      </LegacyCard>,
    );
    // eslint-disable-next-line import/no-deprecated
    expect(legacyCard).toContainReactComponent(LegacyCard.Header);
  });

  it('renders a <Header /> component with actions and no title', () => {
    const legacyCard = mountWithApp(
      <LegacyCard actions={[{content: 'test action'}]}>
        <p>Some card content.</p>
      </LegacyCard>,
    );

    expect(legacyCard).toContainReactComponent(Button);
    // eslint-disable-next-line import/no-deprecated
    expect(legacyCard).toContainReactComponent(LegacyCard.Header);
  });

  describe('footerActionAlignment prop', () => {
    it('renders right-aligned if not supplied', () => {
      const legacyCard = mountWithApp(
        <LegacyCard
          primaryFooterAction={{content: 'primary action'}}
          secondaryFooterActions={[{content: 'secondary action'}]}
        >
          <p>Some card content.</p>
        </LegacyCard>,
      );

      const buttons = legacyCard.findAll(Button);
      expect(buttons[0].prop('children')).toBe('secondary action');
      expect(buttons[1].prop('children')).toBe('primary action');
    });

    it('renders right-aligned if set to "right"', () => {
      const legacyCard = mountWithApp(
        <LegacyCard
          primaryFooterAction={{content: 'primary action'}}
          secondaryFooterActions={[{content: 'secondary action'}]}
          footerActionAlignment="right"
        >
          <p>Some card content.</p>
        </LegacyCard>,
      );

      const buttons = legacyCard.findAll(Button);
      expect(buttons[0].prop('children')).toBe('secondary action');
      expect(buttons[1].prop('children')).toBe('primary action');
    });

    it('renders left-aligned if set to "left"', () => {
      const legacyCard = mountWithApp(
        <LegacyCard
          primaryFooterAction={{content: 'primary action'}}
          secondaryFooterActions={[{content: 'secondary action'}]}
          footerActionAlignment="left"
        >
          <p>Some card content.</p>
        </LegacyCard>,
      );

      const buttons = legacyCard.findAll(Button);
      expect(buttons[0].prop('children')).toBe('primary action');
      expect(buttons[1].prop('children')).toBe('secondary action');
    });
  });

  describe('hideWhenPrinting prop', () => {
    it('renders the classname "LegacyCard hideOnPrint" when passed', () => {
      const legacyCard = mountWithApp(
        <LegacyCard hideOnPrint>
          <p>Some card content.</p>
        </LegacyCard>,
      );

      expect(legacyCard).toContainReactComponent('div', {
        className: 'LegacyCard hideOnPrint',
      });
    });

    it('does not render the classname "LegacyCard hideOnPrint" when prop is not passed', () => {
      const legacyCard = mountWithApp(
        <LegacyCard>
          <p>Some card content.</p>
        </LegacyCard>,
      );

      expect(legacyCard).not.toContainReactComponent('div', {
        className: 'LegacyCard hideOnPrint',
      });
    });
  });

  it('renders a primary footer action', () => {
    const legacyCard = mountWithApp(
      <LegacyCard primaryFooterAction={{content: 'test action'}}>
        <p>Some card content.</p>
      </LegacyCard>,
    );
    expect(legacyCard).toContainReactComponent(Button, {
      children: 'test action',
    });
  });

  describe('secondaryFooterActions', () => {
    it('renders a single secondary footer action button when only 1 is supplied', () => {
      const legacyCard = mountWithApp(
        <LegacyCard secondaryFooterActions={[{content: 'test action'}]}>
          <p>Some card content.</p>
        </LegacyCard>,
      );

      expect(legacyCard).toContainReactComponent(Button, {
        children: 'test action',
      });
      expect(legacyCard).not.toContainReactComponent(Popover);
    });

    it('renders popover when >1 are supplied', () => {
      const legacyCard = mountWithApp(
        <LegacyCard
          secondaryFooterActions={[
            {content: 'Most important action'},
            {content: 'Second most important action'},
          ]}
        >
          <p>Some card content.</p>
        </LegacyCard>,
      );

      expect(legacyCard).toContainReactComponent(Button, {
        children: 'More',
      });
      expect(legacyCard).toContainReactComponent(Popover);
    });

    it('activates popover when disclosure button is clicked', () => {
      const footerActions = [
        {content: 'Most important action'},
        {content: 'Second most important action'},
      ];
      const legacyCard = mountWithApp(
        <LegacyCard secondaryFooterActions={footerActions}>
          <p>Some card content.</p>
        </LegacyCard>,
      );

      const disclosureButton = legacyCard.findAll(Button)[0];
      expect(disclosureButton).toContainReactText('More');

      expect(legacyCard).toContainReactComponent(Popover, {
        active: false,
      });

      disclosureButton.trigger('onClick');

      expect(legacyCard).toContainReactComponent(Popover, {
        active: true,
      });

      expect(legacyCard).toContainReactComponent(ActionList, {
        items: footerActions,
      });
    });

    it('sets the disclosure button content to the value set on secondaryFooterActionsDisclosureText', () => {
      const legacyCard = mountWithApp(
        <LegacyCard
          secondaryFooterActions={[
            {content: 'Most important action'},
            {content: 'Second most important action'},
          ]}
          secondaryFooterActionsDisclosureText="Show more"
        >
          <p>Some card content.</p>
        </LegacyCard>,
      );

      expect(legacyCard).toContainReactComponent(Button, {
        children: 'Show more',
      });
    });
  });

  it('renders a section when sectioned', () => {
    const legacyCard = mountWithApp(
      <LegacyCard sectioned>
        <p>Some card content.</p>
      </LegacyCard>,
    );

    expect(legacyCard.find(Section)).toContainReactText('Some card content.');
  });

  describe('useLegacyCardPaddingObserverRef', () => {
    it('adds padding class to header and last section', () => {
      mountWithApp(
        <LegacyCard title="My heading">
          <LegacyCard.Section title="Section 1 heading">
            Section 1 content
          </LegacyCard.Section>
          <LegacyCard.Section title="Section 2 heading">
            Section 2 content
          </LegacyCard.Section>
        </LegacyCard>,
      );

      const firstSection = document.querySelectorAll('.FirstSectionPadding');
      const lastSection = document.querySelectorAll('.LastSectionPadding');

      expect(firstSection).toHaveLength(1);
      expect(lastSection).toHaveLength(1);
      expect(firstSection[0].classList).toContain('Header');
      expect(lastSection[0].classList).toContain('Section');
      expect(lastSection[0].innerHTML).toContain('Section 2 content');
    });

    it('does not add first section class if the first child is custom', () => {
      mountWithApp(
        <LegacyCard>
          <p>hello world</p>
          <LegacyCard.Section title="Section 2 heading">
            Section 2 content
          </LegacyCard.Section>
        </LegacyCard>,
      );

      const firstSection = document.querySelectorAll('.FirstSectionPadding');
      const lastSection = document.querySelectorAll('.LastSectionPadding');

      expect(firstSection).toHaveLength(0);
      expect(lastSection).toHaveLength(1);
      expect(lastSection[0].classList).toContain('Section');
      expect(lastSection[0].innerHTML).toContain('Section 2 content');
    });

    it('does not add any classes if there are no subcomponent children', () => {
      mountWithApp(
        <LegacyCard>
          <h2>hello world</h2>
          <p>hello world</p>
        </LegacyCard>,
      );

      const firstSection = document.querySelectorAll('.FirstSectionPadding');
      const lastSection = document.querySelectorAll('.LastSectionPadding');

      expect(firstSection).toHaveLength(0);
      expect(lastSection).toHaveLength(0);
    });

    it('adds padding classes when sections are nested', () => {
      mountWithApp(
        <LegacyCard>
          <div>
            <div>
              <LegacyCard.Header>Header</LegacyCard.Header>
            </div>
            <LegacyCard.Section title="Section 1 heading">
              Section 1 content
            </LegacyCard.Section>
          </div>
          <LegacyCard.Section title="Section 2 heading">
            Section 2 content
          </LegacyCard.Section>
        </LegacyCard>,
      );

      const firstSection = document.querySelectorAll('.FirstSectionPadding');
      const lastSection = document.querySelectorAll('.LastSectionPadding');

      expect(firstSection).toHaveLength(1);
      expect(lastSection).toHaveLength(1);
      expect(firstSection[0].classList).toContain('Header');
      expect(lastSection[0].classList).toContain('Section');
      expect(lastSection[0].innerHTML).toContain('Section 2 content');
    });
  });
});
