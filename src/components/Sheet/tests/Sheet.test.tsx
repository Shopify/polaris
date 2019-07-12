import * as React from 'react';

import {CSSTransition} from 'react-transition-group';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {mountWithAppProvider} from 'test-utilities';

import Backdrop from 'components/Backdrop';
import Sheet, {BOTTOM_CLASS_NAMES, RIGHT_CLASS_NAMES} from '../Sheet';

describe('<Sheet />', () => {
  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
  });

  const mockProps = {
    open: true,
    onClose: noop,
  };

  it('renders its children', () => {
    const children = <div>Content</div>;

    const sheet = mountWithAppProvider(
      <Sheet {...mockProps}>{children}</Sheet>,
    );

    expect(sheet.find(children)).not.toBeNull();
  });

  it('renders a Backdrop when open', () => {
    const children = <div>Content</div>;

    const sheet = mountWithAppProvider(
      <Sheet {...mockProps}>{children}</Sheet>,
    );
    const backdrop = sheet.find(Backdrop);
    expect(backdrop).not.toBeNull();
    expect(backdrop.props().onClick).toBe(mockProps.onClose);
  });

  it('renders a css transition component with bottom class names at mobile sizes', () => {
    matchMedia.setMedia(() => ({matches: true}));

    const sheet = mountWithAppProvider(
      <Sheet {...mockProps}>
        <div>Content</div>
      </Sheet>,
    );

    expect(sheet.find(CSSTransition).props().classNames).toStrictEqual(
      BOTTOM_CLASS_NAMES,
    );
  });

  it('renders a css transition component with right class names at desktop sizes', () => {
    const sheet = mountWithAppProvider(
      <Sheet {...mockProps}>
        <div>Content</div>
      </Sheet>,
    );

    expect(sheet.find(CSSTransition).props().classNames).toStrictEqual(
      RIGHT_CLASS_NAMES,
    );
  });
});

function noop() {}
