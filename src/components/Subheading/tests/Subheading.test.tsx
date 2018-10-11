import * as React from 'react';
import {mountWithAppProvider} from 'tests/utilities';
import {Button} from 'components';
import Subheading from '../Subheading';

describe('<Subheading />', () => {
  describe('children', () => {
    it('renders its children', () => {
      const subheading = mountWithAppProvider(<Subheading>Title</Subheading>);
      expect(subheading.text()).toBe('Title');
    });

    it('sets aria-label as children if it is a string', () => {
      const subheading = mountWithAppProvider(<Subheading>Title</Subheading>);
      expect(subheading.find('h3').prop('aria-label')).toBe('Title');
    });

    it('does not set aria-label if children is a React component', () => {
      const subheading = mountWithAppProvider(
        <Subheading>
          <Button>Button</Button>
        </Subheading>,
      );
      expect(subheading.find('h3').prop('aria-label')).toBeUndefined();
    });
  });

  describe('element', () => {
    it('renders provided element', () => {
      const subheading = mountWithAppProvider(
        <Subheading element="h2">Title</Subheading>,
      );
      expect(subheading.find('h2')).toHaveLength(1);
    });

    it('defaults to h3 if element is not provided', () => {
      const subheading = mountWithAppProvider(<Subheading>Title</Subheading>);
      expect(subheading.find('h3')).toHaveLength(1);
    });
  });
});
