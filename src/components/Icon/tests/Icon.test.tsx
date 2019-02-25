import * as React from 'react';
import {AddMinor} from '@shopify/polaris-icons';
import {shallowWithAppProvider, mountWithAppProvider} from 'test-utilities';
import Icon from '../Icon';
import Button from '../../Button';

describe('<Icon />', () => {
  describe('accessibilityLabel', () => {
    it('uses the label as the aria-label for the icon', () => {
      const element = shallowWithAppProvider(
        <Icon source="placeholder" accessibilityLabel="This is an icon" />,
      );
      expect(element.prop('aria-label')).toBe('This is an icon');
    });
  });
  describe('source', () => {
    it("renders a placeholder div when source is set to 'placeholder'", () => {
      const element = mountWithAppProvider(<Icon source="placeholder" />);
      expect(element.find('div')).toHaveLength(1);
    });

    it('renders an SVG when source is given a BundledIcon', () => {
      const element = shallowWithAppProvider(<Icon source="add" />);
      expect(element.find(AddMinor)).toHaveLength(1);
    });

    it('renders an SVG when source is given an SVG', () => {
      const svg = {
        body:
          "<path d='M17 9h-6V3a1 1 0 1 0-2 0v6H3a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2'  fill-rule='evenodd'/>",
        viewBox: '0 0 20 20',
      };
      const element = shallowWithAppProvider(<Icon source={svg} />);
      expect(element.find('svg')).toHaveLength(1);
    });

    it('renders a React Component when source is given a React Component', () => {
      const component = <Button>Icon</Button>;
      const element = shallowWithAppProvider(<Icon source={component} />);
      expect(element.find(Button)).toHaveLength(1);
    });

    it('renders an img when source is given an untrusted SVG', () => {
      const svg =
        "<svg><path d='M17 9h-6V3a1 1 0 1 0-2 0v6H3a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2'  fill-rule='evenodd'/></svg>";
      const element = shallowWithAppProvider(<Icon source={svg} untrusted />);
      expect(element.find('img')).toHaveLength(1);
    });

    it('renders nothing when source is given an svg string but untrusted is not true', () => {
      const svg =
        "<svg><path d='M17 9h-6V3a1 1 0 1 0-2 0v6H3a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2'  fill-rule='evenodd'/></svg>";
      const element = shallowWithAppProvider(<Icon source={svg} />);
      expect(element.find('img')).toHaveLength(0);
      expect(element.find('svg')).toHaveLength(0);
    });
  });
});
