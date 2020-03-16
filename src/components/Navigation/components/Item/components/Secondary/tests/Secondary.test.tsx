import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {Tokens} from '../../../../../../../utilities/theme';
import {Collapsible} from '../../../../../../Collapsible';

import {Secondary} from '../Secondary';

describe('Secondary()', () => {
  it('mounts', () => {
    const secondary = mountWithAppProvider(<Secondary expanded />);
    expect(secondary.exists()).toBe(true);
  });

  describe('newDesignLanguage', () => {
    it('passes null transition properties to collapsible when newDesignLanguage is false', () => {
      const secondary = mountWithApp(<Secondary expanded />, {
        features: {newDesignLanguage: false},
      });

      expect(secondary.find(Collapsible)).toHaveReactProps({
        transition: {duration: '0ms', timingFunction: 'none'},
      });
    });

    it('passes transition properties to collapsible when newDesignLanguage is true', () => {
      const secondary = mountWithApp(<Secondary expanded />, {
        features: {newDesignLanguage: true},
      });

      expect(secondary.find(Collapsible)).toHaveReactProps({
        transition: {duration: Tokens.duration150, timingFunction: Tokens.ease},
      });
    });
  });
});
