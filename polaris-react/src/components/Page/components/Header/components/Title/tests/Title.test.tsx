import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Badge} from '../../../../../../Badge';
// eslint-disable-next-line import/no-deprecated
import {DisplayText} from '../../../../../../DisplayText';
import {Title} from '../Title';

describe('<Title />', () => {
  const mockProps = {
    title: 'Test',
  };

  describe('title', () => {
    it('renders an h1 with the title', () => {
      const pageTitle = mountWithApp(<Title {...mockProps} />);
      expect(pageTitle).toContainReactComponent('h1', {
        children: mockProps.title,
      });
    });

    it('does not render a title when not defined', () => {
      const pageTitle = mountWithApp(<Title />);
      // eslint-disable-next-line import/no-deprecated
      expect(pageTitle).not.toContainReactComponent(DisplayText);
    });
  });

  describe('subtitle', () => {
    const propsWithSubtitle = {
      ...mockProps,
      subtitle: 'Subtitle',
    };

    it('renders a paragaph when defined', () => {
      const pageTitle = mountWithApp(<Title {...propsWithSubtitle} />);
      expect(pageTitle).toContainReactComponent('p', {
        children: propsWithSubtitle.subtitle,
      });
    });

    it('does not render a paragraph when not defined', () => {
      const pageTitle = mountWithApp(<Title {...mockProps} />);
      expect(pageTitle).not.toContainReactComponent('p');
    });

    it('renders styles when compactTitle prop is defined', () => {
      const pageTitle = mountWithApp(
        <Title {...propsWithSubtitle} compactTitle />,
      );
      expect(pageTitle).toContainReactComponent('div', {
        className: expect.stringContaining('SubtitleCompact'),
      });
    });
  });

  describe('titleMetadata', () => {
    const propsWithMetadata = {
      ...mockProps,
      titleMetadata: <Badge>Sold</Badge>,
    };

    it('renders the titleMetadata when defined', () => {
      const pageTitle = mountWithApp(<Title {...propsWithMetadata} />);
      expect(pageTitle).toContainReactComponent(Badge);
    });
  });
});
