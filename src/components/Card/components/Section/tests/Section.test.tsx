import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import {Badge, Subheading, ButtonGroup, Button} from 'components';
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

    const section = mountWithAppProvider(<Section title={titleMarkup} />);
    const headerMarkup = section.find('h2');

    expect(headerMarkup.text()).toContain(titleString);
    expect(headerMarkup.find('Badge').text()).toBe(badgeString);
  });

  it('wraps plain string titles in a <Subheading />', () => {
    const titleString = 'Online store';

    const card = mountWithAppProvider(<Section title={titleString} />);
    const headerMarkup = card.find(Subheading);

    expect(headerMarkup.exists()).toBeTruthy();
    expect(headerMarkup.text()).toStrictEqual(titleString);
  });

  describe('actions', () => {
    const mockActions = [{content: 'Preview'}, {content: 'Open'}];

    it('renders a button group when defined', () => {
      const section = mountWithAppProvider(<Section actions={mockActions} />);
      expect(section.find(ButtonGroup).exists()).toBeTruthy();
    });

    it('renders buttons for each action', () => {
      const section = mountWithAppProvider(<Section actions={mockActions} />);
      expect(section.find(Button)).toHaveLength(2);
    });

    it('does not render a button group when not defined', () => {
      const section = mountWithAppProvider(<Section />);
      expect(section.find(ButtonGroup).exists()).toBeFalsy();
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
      const section = mountWithAppProvider(
        <Section actions={mockActions} title={titleMarkup} />,
      );
      expect(section.find(Button)).toHaveLength(2);
      expect(section.text()).toContain(titleString);
      expect(section.find('Badge').text()).toBe(badgeString);
    });
  });
});
