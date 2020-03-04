import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {Tag} from '../Tag';

describe('<Tag />', () => {
  it('calls onRemove when remove button is clicked', () => {
    const spy = jest.fn();
    const tag = mountWithAppProvider(<Tag onRemove={spy} />);
    tag.find('button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  describe('newDesignLanguage', () => {
    it('adds a newDesignLanguage class when newDesignLanguage is enabled', () => {
      const tag = mountWithApp(<Tag />, {
        features: {newDesignLanguage: true},
      });
      expect(tag).toContainReactComponent('button', {
        className: 'Button newDesignLanguage',
      });
    });

    it('does not add a newDesignLanguage class when newDesignLanguage is disabled', () => {
      const tag = mountWithApp(<Tag />, {
        features: {newDesignLanguage: false},
      });
      expect(tag).not.toContainReactComponent('button', {
        className: 'Button newDesignLanguage',
      });
    });
  });
});
