import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Button} from '../../Button';
// eslint-disable-next-line import/no-deprecated
import {Subheading} from '../Subheading';

describe('<Subheading />', () => {
  describe('children', () => {
    it('renders its children', () => {
      const subheading = mountWithApp(<Subheading>Title</Subheading>);
      expect(subheading).toContainReactText('Title');
      expect(subheading).toHaveReactProps({children: 'Title'});
    });

    it('sets aria-label as children if it is a string', () => {
      const subheading = mountWithApp(<Subheading>Title</Subheading>);
      expect(subheading).toContainReactComponent('h3', {'aria-label': 'Title'});
    });

    it('does not set aria-label if children is a React component', () => {
      const subheading = mountWithApp(
        <Subheading>
          <Button>Button</Button>
        </Subheading>,
      );
      expect(subheading).toContainReactComponent('h3', {
        'aria-label': undefined,
      });
    });
  });

  describe('element', () => {
    it('renders provided element', () => {
      const subheading = mountWithApp(
        <Subheading element="h2">Title</Subheading>,
      );
      expect(subheading).toContainReactComponentTimes('h2', 1);
    });

    it('defaults to h3 if element is not provided', () => {
      const subheading = mountWithApp(<Subheading>Title</Subheading>);
      expect(subheading).toContainReactComponentTimes('h3', 1);
    });
  });
});
