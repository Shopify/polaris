import React from 'react';
import {CSSTransition} from '@material-ui/react-transition-group';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {Backdrop} from 'components/Backdrop';
import {Sheet} from '../Sheet';

describe('<Sheet />', () => {
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
    const sheet = mountWithAppProvider(
      <Sheet {...mockProps}>
        <div>Content</div>
      </Sheet>,
      {mediaQuery: {isNavigationCollapsed: true}},
    );

    expect(sheet.find(CSSTransition).props().classNames).toStrictEqual({
      enter: 'Bottom enterBottom',
      enterActive: 'Bottom enterBottomActive',
      exit: 'Bottom exitBottom',
      exitActive: 'Bottom exitBottomActive',
    });
  });

  it('renders a css transition component with right class names at desktop sizes', () => {
    const sheet = mountWithAppProvider(
      <Sheet {...mockProps}>
        <div>Content</div>
      </Sheet>,
    );

    expect(sheet.find(CSSTransition).props().classNames).toStrictEqual({
      enter: 'Right enterRight',
      enterActive: 'Right enterRightActive',
      exit: 'Right exitRight',
      exitActive: 'Right exitRightActive',
    });
  });
});

function noop() {}
