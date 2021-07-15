/* eslint-disable import/no-deprecated */
import React, {useRef} from 'react';
import {CSSTransition} from 'react-transition-group';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {Backdrop, Button} from 'components';
import {mountWithApp} from 'test-utilities';

import {Sheet} from '../Sheet';

describe('<Sheet />', () => {
  const mockProps = {
    open: true,
    onClose: noop,
    accessibilityLabel: 'More filters',
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

  it('renders an aria label', () => {
    const children = <div>Content</div>;

    const sheet = mountWithAppProvider(
      <Sheet {...mockProps}>{children}</Sheet>,
    );

    expect(sheet.find('div[role="dialog"]').prop('aria-label')).toBe(
      mockProps.accessibilityLabel,
    );
  });

  describe('activator', () => {
    let rafSpy: jest.SpyInstance;

    beforeEach(() => {
      rafSpy = jest.spyOn(window, 'requestAnimationFrame');
      rafSpy.mockImplementation((callback) => callback());
    });

    afterEach(() => {
      rafSpy.mockRestore();
    });

    it('renders the element if an element is passed in', () => {
      const sheet = mountWithAppProvider(
        <Sheet {...mockProps} activator={<Button />}>
          <div>Content</div>
        </Sheet>,
      );

      expect(sheet.find(Button).exists()).toBe(true);
    });

    it('does not render the element if a ref object is passed in', () => {
      const TestHarness = () => {
        const buttonRef = useRef<HTMLDivElement>(null);
        const button = (
          <div ref={buttonRef}>
            <Button />
          </div>
        );

        return (
          <div>
            {button}
            <Sheet {...mockProps} activator={buttonRef}>
              <div>Content</div>
            </Sheet>
          </div>
        );
      };

      const testHarness = mountWithApp(<TestHarness />);

      expect(testHarness.find(Sheet)).not.toContainReactComponent(Button);
    });

    it('does not throw an error when no activator is passed in', () => {
      const sheet = mountWithAppProvider(
        <Sheet {...mockProps}>
          <div>Content</div>
        </Sheet>,
      );

      expect(() => {
        sheet.setProps({open: false});
      }).not.toThrow();
    });

    it('focuses the activator when the activator is an element on close', () => {
      const id = 'activator-id';
      const sheet = mountWithApp(
        <Sheet {...mockProps} activator={<Button id={id} />}>
          <div>Content</div>
        </Sheet>,
      );

      sheet.find(Backdrop)!.trigger('onClick');
      const activator = sheet.find('button', {id})!.domNode;

      expect(document.activeElement).toBe(activator);
    });

    it('focuses the activator when the activator a ref on close', () => {
      const buttonId = 'buttonId';
      const TestHarness = () => {
        const buttonRef = useRef<HTMLDivElement>(null);

        const button = (
          <div ref={buttonRef}>
            <Button id={buttonId} />
          </div>
        );

        return (
          <div>
            {button}
            <Sheet {...mockProps} activator={buttonRef}>
              <div>Content</div>
            </Sheet>
          </div>
        );
      };

      const testHarness = mountWithApp(<TestHarness />);

      testHarness.find(Sheet)!.find(Backdrop)!.trigger('onClick');

      expect(document.activeElement).toBe(
        testHarness.findWhere(
          (wrap) => wrap.is('button') && wrap.prop('id') === buttonId,
        )!.domNode,
      );
    });
  });
});

function noop() {}
