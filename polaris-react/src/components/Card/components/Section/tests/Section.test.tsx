import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Badge} from '../../../../Badge';
import {Button} from '../../../../Button';
import {ButtonGroup} from '../../../../ButtonGroup';
import {Text} from '../../../../Text';
import {Section} from '../Section';

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

    const section = mountWithApp(<Section title={titleMarkup} />);
    const headerMarkup = section.find('h2')!;

    expect(headerMarkup).toContainReactText(titleString);
    expect(headerMarkup.find(Badge)).toContainReactText(badgeString);
  });

  it('wraps plain string titles in a <Text />', () => {
    const titleString = 'Online store';
    const card = mountWithApp(<Section title={titleString} />);
    expect(
      card.find(Text, {variant: 'headingXs', as: 'h3'}),
    ).toContainReactText(titleString);
  });

  describe('hideWhenPrinting prop', () => {
    it('renders classname "Section Section-hideOnPrint" when prop is passed', () => {
      const card = mountWithApp(<Section hideOnPrint />);

      expect(card).toContainReactComponent('div', {
        className: 'Section Section-hideOnPrint',
      });
    });

    it('does not render classname "Section Section-hideOnPrint" when prop is not passed', () => {
      const card = mountWithApp(<Section />);

      expect(card).not.toContainReactComponent('div', {
        className: 'Section Section-hideOnPrint',
      });
    });
  });

  describe('actions', () => {
    const mockActions = [{content: 'Preview'}, {content: 'Open'}];

    it('renders a button group when defined', () => {
      const section = mountWithApp(<Section actions={mockActions} />);
      expect(section).toContainReactComponent(ButtonGroup);
    });

    it('renders buttons for each action', () => {
      const section = mountWithApp(<Section actions={mockActions} />);
      expect(section).toContainReactComponentTimes(Button, 2);
    });

    it('does not render a button group when not defined', () => {
      const section = mountWithApp(<Section />);
      expect(section).not.toContainReactComponent(ButtonGroup);
    });

    it('renders both custom title markup and actions', () => {
      const titleString = 'Online store';
      const badgeString = 'I am a badge';
      const titleMarkup = (
        <h2>
          {titleString}
          <Badge>{badgeString}</Badge>
        </h2>
      );
      const section = mountWithApp(
        <Section actions={mockActions} title={titleMarkup} />,
      );
      expect(section).toContainReactComponentTimes(Button, 2);
      expect(section).toContainReactText(titleString);
      expect(section.find(Badge)).toContainReactText(badgeString);
    });
  });
});
