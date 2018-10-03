import * as React from 'react';
import Intl from '../../Intl';
import {StickyManager} from '../../withSticky';
import Link from '../../Link';
import createPolarisContext from '../createPolarisContext';

describe('createPolarisContext()', () => {
  it('returns the right context without properties', () => {
    const context = createPolarisContext();
    const mockContext = {
      polaris: {
        intl: new Intl(undefined),
        link: new Link(),
        stickyManager: new StickyManager(),
      },
      easdk: undefined,
    };

    expect(context).toEqual(mockContext);
  });

  it('returns the right context with properties', () => {
    const i18n = {
      Polaris: {
        Common: {
          undo: 'Custom Undo',
        },
      },
    };
    const CustomLinkComponent = () => {
      return <a href="test">Custom Link Component</a>;
    };
    const stickyManager = new StickyManager();
    const context = createPolarisContext({
      i18n,
      linkComponent: CustomLinkComponent,
      stickyManager,
    });
    const mockContext = {
      polaris: {
        intl: new Intl(i18n),
        link: new Link(CustomLinkComponent),
        stickyManager,
      },
    };

    expect(context).toEqual(mockContext);
  });
});
