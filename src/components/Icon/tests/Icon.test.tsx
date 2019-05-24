import React from 'react';
import {PlusMinor} from '@shopify/polaris-icons';
import {mountWithAppProvider} from 'test-utilities';
import Icon from '../Icon';
import Button from '../../Button';

describe('<Icon />', () => {
  describe('accessibilityLabel', () => {
    it('uses the label as the aria-label for the icon', () => {
      const element = mountWithAppProvider(
        <Icon source="placeholder" accessibilityLabel="This is an icon" />,
      ).find('span');

      expect(element.prop('aria-label')).toBe('This is an icon');
    });
  });
  describe('source', () => {
    it("renders a placeholder div when source is set to 'placeholder'", () => {
      const element = mountWithAppProvider(<Icon source="placeholder" />);
      expect(element.find('div')).toHaveLength(1);
    });

    it('renders an SVG when source is given a BundledIcon', () => {
      const element = mountWithAppProvider(<Icon source="add" />);
      expect(element.find(PlusMinor)).toHaveLength(1);
    });

    it('renders an SVG when source is given an SVG', () => {
      const svg = {
        body:
          "<path d='M17 9h-6V3a1 1 0 1 0-2 0v6H3a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2'  fill-rule='evenodd'/>",
        viewBox: '0 0 20 20',
      };
      const element = mountWithAppProvider(<Icon source={svg} />);
      expect(element.find('svg')).toHaveLength(1);
    });

    it('renders a React Element when source is given a React Element', () => {
      const element = <PlusMinor />;
      const iconElement = mountWithAppProvider(<Icon source={element} />);
      expect(iconElement.find(PlusMinor)).toHaveLength(1);
    });

    it('spits out a console warning when rendering a React Element', () => {
      const spy = jest.spyOn(global.console, 'warn');
      mountWithAppProvider(<Icon source={<PlusMinor />} />);
      expect(spy).toHaveBeenCalled();
    });

    it('renders a React Element when source is given a React Stateless Functional Component', () => {
      const element = mountWithAppProvider(<Icon source={PlusMinor} />);
      expect(element.find(PlusMinor)).toHaveLength(1);
    });

    it('renders a React Element when source is given a React Component', () => {
      const component = <Button>Icon</Button>;
      const element = mountWithAppProvider(<Icon source={component} />);
      expect(element.find(Button)).toHaveLength(1);
    });

    it('renders an img when source is given an untrusted SVG', () => {
      const svg =
        "<svg><path d='M17 9h-6V3a1 1 0 1 0-2 0v6H3a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2'  fill-rule='evenodd'/></svg>";
      const element = mountWithAppProvider(<Icon source={svg} untrusted />);
      expect(element.find('img')).toHaveLength(1);
    });

    it('spits out a console warning when passing in untrusted', () => {
      const spy = jest.spyOn(global.console, 'warn');
      const svg = "<svg><path d='M10 10'/></svg>";
      mountWithAppProvider(<Icon source={svg} untrusted />);
      expect(spy).toHaveBeenCalled();
    });
  });
});
