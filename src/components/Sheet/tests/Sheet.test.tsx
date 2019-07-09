import React from 'react';
import {mount} from 'enzyme';
import {CSSTransition} from '@material-ui/react-transition-group';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {mountWithAppProvider} from 'test-utilities/legacy';

import Backdrop from 'components/Backdrop';
import AppProvider from '../../AppProvider';
import Sheet, {BOTTOM_CLASS_NAMES, RIGHT_CLASS_NAMES} from '../Sheet';
import en from '../../../../locales/en.json';

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

    const {sheet} = mountWithContext(<Sheet {...mockProps}>{children}</Sheet>);

    expect(sheet.find(children)).not.toBeNull();
  });

  it('renders a Backdrop when open', () => {
    const children = <div>Content</div>;

    const {sheet} = mountWithContext(<Sheet {...mockProps}>{children}</Sheet>);
    const backdrop = sheet.find(Backdrop);
    expect(backdrop).not.toBeNull();
    expect(backdrop.props().onClick).toBe(mockProps.onClose);
  });

  it('renders a css transition component with bottom class names at mobile sizes', () => {
    matchMedia.setMedia(() => ({matches: true}));

    const {sheet} = mountWithContext(
      <Sheet {...mockProps}>
        <div>Content</div>
      </Sheet>,
    );

    expect(sheet.find(CSSTransition).props().classNames).toStrictEqual(
      BOTTOM_CLASS_NAMES,
    );
  });

  it('renders a css transition component with right class names at desktop sizes', () => {
    const {sheet} = mountWithContext(
      <Sheet {...mockProps}>
        <div>Content</div>
      </Sheet>,
    );

    expect(sheet.find(CSSTransition).props().classNames).toStrictEqual(
      RIGHT_CLASS_NAMES,
    );
  });

  it('warns when not mounted inside of the Frame component', () => {
    const warnSpy = jest.spyOn(console, 'warn');
    warnSpy.mockImplementation(() => {});
    mount(
      <AppProvider i18n={en}>
        <Sheet {...mockProps}>
          <div>Content</div>
        </Sheet>
      </AppProvider>,
    );

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      'The Sheet component must be used within the Frame component.',
    );
    warnSpy.mockRestore();
  });
});

function noop() {}

function mountWithContext(element: React.ReactElement<any>) {
  const frame = {};
  const sheet = mountWithAppProvider(element, {
    context: {frame},
  });

  return {sheet, frame};
}
