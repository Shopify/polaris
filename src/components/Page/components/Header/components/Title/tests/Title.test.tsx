import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {Badge, DisplayText, Avatar} from 'components';

import {Title} from '../Title';

describe('<Title />', () => {
  const mockProps = {
    title: 'Test',
  };

  describe('title', () => {
    it('renders an h1 with the title', () => {
      const pageTitle = mountWithAppProvider(<Title {...mockProps} />);
      expect(pageTitle.find('h1').text()).toBe(mockProps.title);
    });

    it('does not render a title when not defined', () => {
      const pageTitle = mountWithAppProvider(<Title />);
      expect(pageTitle.find(DisplayText).exists()).toBe(false);
    });
  });

  describe('subtitle', () => {
    const propsWithSubtitle = {
      ...mockProps,
      subtitle: 'Subtitle',
    };

    it('renders a paragaph when defined', () => {
      const pageTitle = mountWithAppProvider(<Title {...propsWithSubtitle} />);
      expect(pageTitle.find('p').text()).toBe(propsWithSubtitle.subtitle);
    });

    it('does not render a paragraph when not defined', () => {
      const pageTitle = mountWithAppProvider(<Title {...mockProps} />);
      expect(pageTitle.find('p').exists()).toBe(false);
    });
  });

  describe('titleMetadata', () => {
    const propsWithMetadata = {
      ...mockProps,
      titleMetadata: <Badge>Sold</Badge>,
    };
    it('renders the titleMetadata when defined', () => {
      const pageTitle = mountWithAppProvider(<Title {...propsWithMetadata} />);
      expect(pageTitle.find(Badge).exists()).toBe(true);
    });
  });

  describe('thumbail', () => {
    const propsWithThumbail = {
      ...mockProps,
      thumbnail: <Avatar customer />,
    };

    it('renders the thumbnail when defined', () => {
      const pageTitle = mountWithAppProvider(<Title {...propsWithThumbail} />);
      expect(pageTitle.find(Avatar).exists()).toBe(true);
    });
  });
});
