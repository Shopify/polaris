import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {UnstyledLink} from '../../UnstyledLink';
import {UnstyledButton} from '../UnstyledButton';

describe('<Button />', () => {
  describe('children', () => {
    const mockChildren = 'mock children';
    const mockUrl = 'https://google.com';

    it('renders the given children into the button', () => {
      const button = mountWithApp(
        <UnstyledButton>{mockChildren}</UnstyledButton>,
      );
      expect(button.find('button')).toContainReactText(mockChildren);
    });

    it('renders the given children into the UnstyledLink', () => {
      const button = mountWithApp(
        <UnstyledButton url={mockUrl}>{mockChildren}</UnstyledButton>,
      );
      expect(button.find(UnstyledLink)).toContainReactText(mockChildren);
    });

    it('renders the given children into the link when disabled', () => {
      const button = mountWithApp(
        <UnstyledButton url={mockUrl} disabled>
          {mockChildren}
        </UnstyledButton>,
      );

      expect(button).toContainReactComponent('a', {
        href: undefined,
        children: mockChildren,
      });
      expect(button).toContainReactComponentTimes('a', 1);
    });
  });

  describe('id', () => {
    const mockId = 'MockId';

    it('is passed into the button', () => {
      const button = mountWithApp(<UnstyledButton id={mockId} />);
      expect(button).toContainReactComponent('button', {
        id: mockId,
      });
    });

    it('is passed into the UnstyledLink', () => {
      const button = mountWithApp(
        <UnstyledButton id={mockId} url="https://shopify.com" />,
      );
      expect(button).toContainReactComponent(UnstyledLink, {
        id: mockId,
      });
    });

    it('is passed into the link when disabled', () => {
      const button = mountWithApp(
        <UnstyledButton id={mockId} url="https://shopify.com" disabled />,
      );

      expect(button).toContainReactComponent('a', {
        href: undefined,
        id: mockId,
      });
    });
  });

  describe('url', () => {
    const mockUrl = 'https://google.com';

    it('renders a link without an `href` when `disabled`', () => {
      const button = mountWithApp(<UnstyledButton url={mockUrl} disabled />);
      expect(button).toContainReactComponent('a', {
        href: undefined,
      });
    });

    it('renders a button when not present', () => {
      const button = mountWithApp(<UnstyledButton />);
      expect(button).toContainReactComponent('button');
    });

    it('omits subset of props when provided a `url`', () => {
      // Not including `disabled` or `loading`,
      // as that leads to a different code path.
      const mockUnpassedProps = {
        submit: true,
        ariaControls: 'mock aria controls',
        ariaExpanded: true,
        onKeyDown: noop,
        onKeyUp: noop,
        onKeyPress: noop,
      };
      const button = mountWithApp(
        <UnstyledButton url={mockUrl} {...mockUnpassedProps} />,
      );

      expect(button).toContainReactComponent(UnstyledLink, {
        url: mockUrl,
        submit: undefined,
        ariaControls: undefined,
        ariaExpanded: undefined,
        onKeyDown: undefined,
        onKeyUp: undefined,
        onKeyPress: undefined,
      });
    });
  });

  describe('external', () => {
    const mockUrl = 'https://google.com';

    it('gets passed into the UnstyledLink', () => {
      const button = mountWithApp(<UnstyledButton url={mockUrl} external />);
      expect(button).toContainReactComponent(UnstyledLink, {
        external: true,
      });
    });

    it('is false when not set', () => {
      const button = mountWithApp(<UnstyledButton url="https://google.com" />);
      expect(button).toContainReactComponent(UnstyledLink, {
        external: undefined,
      });
    });

    it('is not passed when `url` is missing', () => {
      const button = mountWithApp(<UnstyledButton external />);
      expect(button).toContainReactComponent('button');
    });

    it('is not passed when `url + disabled`', () => {
      const button = mountWithApp(
        <UnstyledButton url={mockUrl} external disabled />,
      );
      expect(button).toContainReactComponent('a');
      expect(button).not.toContainReactComponent(UnstyledLink, {
        external: undefined,
      });
    });
  });

  describe('download', () => {
    const mockUrl = 'https://google.com';

    it('gets passed into the link as a boolean', () => {
      const button = mountWithApp(<UnstyledButton url="/foo" download />);
      expect(button).toContainReactComponent(UnstyledLink, {
        download: true,
      });
    });

    it('gets passed into the link as a string', () => {
      const button = mountWithApp(
        <UnstyledButton url="/foo" download="file.txt" />,
      );
      expect(button).toContainReactComponent(UnstyledLink, {
        download: 'file.txt',
      });
    });

    it('is false when not set', () => {
      const button = mountWithApp(<UnstyledButton url={mockUrl} />);
      expect(button).toContainReactComponent(UnstyledLink, {
        download: undefined,
      });
    });

    it('is not passed when `url` is missing', () => {
      const button = mountWithApp(<UnstyledButton download />);

      expect(button).toContainReactComponent('button');
      expect(button).not.toContainReactComponent(UnstyledLink, {
        download: undefined,
      });
    });

    it('is not passed when `url + disabled`', () => {
      const button = mountWithApp(
        <UnstyledButton url={mockUrl} download disabled />,
      );
      expect(button).toContainReactComponent('a', {
        download: undefined,
      });
    });
  });

  describe('submit', () => {
    it('sets a submit type on the button when present', () => {
      const button = mountWithApp(<UnstyledButton submit />);

      expect(button).toContainReactComponent('button', {
        type: 'submit',
      });
    });

    it('sets a button type on the button when not present', () => {
      const button = mountWithApp(<UnstyledButton />);
      expect(button).toContainReactComponent('button', {
        type: 'button',
      });
    });
  });

  describe('disabled', () => {
    const mockUrl = 'https://google.com';

    it('passes to `button`', () => {
      const button = mountWithApp(<UnstyledButton disabled />);
      expect(button).toContainReactComponent('button', {
        'aria-disabled': true,
      });
    });

    it('does not pass to link', () => {
      const button = mountWithApp(<UnstyledButton url={mockUrl} disabled />);
      expect(button).toContainReactComponent('a');
      expect(button).not.toContainReactComponent('button', {
        'aria-disabled': true,
      });
    });
  });

  describe('loading', () => {
    it('sets aria-busy on the button', () => {
      const button = mountWithApp(<UnstyledButton loading />);
      expect(button).toContainReactComponent('button', {
        'aria-busy': true,
      });
    });

    it('does not set aria-busy when `url`', () => {
      const button = mountWithApp(
        <UnstyledButton url="https://google.com" loading />,
      );
      expect(button).toContainReactComponent(UnstyledLink, {
        'aria-busy': undefined,
      });
    });
  });

  describe('accessibilityLabel', () => {
    const accessibilityLabel = 'mock accessibility label';

    it('sets an aria-label on the button', () => {
      const button = mountWithApp(
        <UnstyledButton accessibilityLabel={accessibilityLabel} />,
      );

      expect(button).toContainReactComponent('button', {
        'aria-label': accessibilityLabel,
      });
    });

    it('sets an aria-label on the UnstyledLink', () => {
      const button = mountWithApp(
        <UnstyledButton
          accessibilityLabel={accessibilityLabel}
          url="https://google.com"
        />,
      );

      expect(button).toContainReactComponent(UnstyledLink, {
        'aria-label': accessibilityLabel,
      });
    });

    it('sets an aria-label on the link', () => {
      const button = mountWithApp(
        <UnstyledButton
          accessibilityLabel={accessibilityLabel}
          url="https://google.com"
          disabled
        />,
      );
      expect(button).toContainReactComponent('a', {
        href: undefined,
        'aria-label': accessibilityLabel,
      });
    });
  });

  describe('role', () => {
    const mockRole = 'menuitem';

    it('is `undefined` by default', () => {
      const button = mountWithApp(<UnstyledButton />);
      expect(button).toContainReactComponent('button', {
        role: undefined,
      });
    });

    it('passes to button', () => {
      const button = mountWithApp(<UnstyledButton role={mockRole} />);
      expect(button).toContainReactComponent('button', {
        role: mockRole,
      });
    });

    it('passes to link', () => {
      const button = mountWithApp(
        <UnstyledButton role={mockRole} url="https://google.com" />,
      );
      expect(button).toContainReactComponent(UnstyledLink, {
        role: mockRole,
      });
    });
  });

  describe('ariaControls', () => {
    it('sets an aria-controls on the button', () => {
      const mockId = 'MockId';
      const button = mountWithApp(<UnstyledButton ariaControls={mockId} />);
      expect(button).toContainReactComponent('button', {
        'aria-controls': mockId,
      });
    });
  });

  describe('ariaExpanded', () => {
    it('sets an aria-expended on the button', () => {
      const button = mountWithApp(<UnstyledButton ariaExpanded />);
      expect(button).toContainReactComponent('button', {
        'aria-expanded': true,
      });
    });
  });

  describe('pressed', () => {
    it('sets an aria-pressed on the button', () => {
      const warningSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});

      const button = mountWithApp(<UnstyledButton pressed />);
      expect(button).toContainReactComponent('button', {
        'aria-pressed': true,
      });

      warningSpy.mockRestore();
    });
  });

  describe('onClick()', () => {
    it('is called when the button is clicked', () => {
      const onClickSpy = jest.fn();
      const unstyledButton = mountWithApp(
        <UnstyledButton onClick={onClickSpy} />,
      );
      unstyledButton.find('button')!.trigger('onClick');
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when the link is clicked', () => {
      const onClickSpy = jest.fn();
      const unstyledButton = mountWithApp(
        <UnstyledButton onClick={onClickSpy} url="https://google.com" />,
      );
      unstyledButton.find(UnstyledLink)!.trigger('onClick');
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });

    it('prevents default when disabled is true', () => {
      const onClickSpy = jest.fn();
      const unstyledButton = mountWithApp(
        <UnstyledButton onClick={onClickSpy} disabled />,
      );
      const mockEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      };
      unstyledButton.find('button')!.trigger('onClick', mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    });
  });

  describe('onMouseEnter()', () => {
    it('is called when the mouse enters button', () => {
      const onMouseEnterSpy = jest.fn();
      const unstyledButton = mountWithApp(
        <UnstyledButton onMouseEnter={onMouseEnterSpy} />,
      );
      unstyledButton.find('button')!.trigger('onMouseEnter');
      expect(onMouseEnterSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when the mouse enters link', () => {
      const onMouseEnterSpy = jest.fn();
      const unstyledButton = mountWithApp(
        <UnstyledButton
          onMouseEnter={onMouseEnterSpy}
          url="https://google.com"
        />,
      );
      unstyledButton.find(UnstyledLink)!.trigger('onMouseEnter');
      expect(onMouseEnterSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onTouchEnter()', () => {
    it('is called when button is pressed', () => {
      const onTouchStartSpy = jest.fn();
      const unstyledButton = mountWithApp(
        <UnstyledButton onTouchStart={onTouchStartSpy} />,
      );
      unstyledButton.find('button')!.trigger('onTouchStart');
      expect(onTouchStartSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when link is pressed', () => {
      const onTouchStartSpy = jest.fn();
      const unstyledButton = mountWithApp(
        <UnstyledButton
          onTouchStart={onTouchStartSpy}
          url="https://google.com"
        />,
      );

      unstyledButton.find(UnstyledLink)!.trigger('onTouchStart');
      expect(onTouchStartSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onFocus()', () => {
    it('is called when the button is focussed', () => {
      const onFocusSpy = jest.fn();
      const unstyledButton = mountWithApp(
        <UnstyledButton onFocus={onFocusSpy} />,
      );

      unstyledButton.find('button')!.trigger('onFocus');
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when the link is focussed', () => {
      const onFocusSpy = jest.fn();
      const unstyledButton = mountWithApp(
        <UnstyledButton onFocus={onFocusSpy} url="https://google.com" />,
      );

      unstyledButton.find(UnstyledLink)!.trigger('onFocus');
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onBlur()', () => {
    it('is called when the button is blurred', () => {
      const onBlurSpy = jest.fn();
      const unstyledButton = mountWithApp(
        <UnstyledButton onBlur={onBlurSpy} />,
      );
      unstyledButton.find('button')!.trigger('onBlur');
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when the link is blurred', () => {
      const onBlurSpy = jest.fn();
      const unstyledButton = mountWithApp(
        <UnstyledButton onBlur={onBlurSpy} url="https://google.com" />,
      );

      unstyledButton.find(UnstyledLink)!.trigger('onBlur');
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onKeyPress()', () => {
    it('is called when a keypress event is registered on the button', () => {
      const spy = jest.fn();
      const unstyledButton = mountWithApp(
        <UnstyledButton onKeyPress={spy}>Test</UnstyledButton>,
      );

      unstyledButton.find('button')!.trigger('onKeyPress');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onKeyUp()', () => {
    it('is called when a keyup event is registered on the button', () => {
      const spy = jest.fn();
      const unstyledButton = mountWithApp(
        <UnstyledButton onKeyUp={spy}>Test</UnstyledButton>,
      );
      unstyledButton.find('button')!.trigger('onKeyUp');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('tabIndex', () => {
    it('sets tabIndex to -1 when disabled is true', () => {
      const unstyledButton = mountWithApp(
        <UnstyledButton disabled>Test</UnstyledButton>,
      );
      expect(unstyledButton.find('button')!.prop('tabIndex')).toBe(-1);
    });

    it('sets tabIndex to undefined by default', () => {
      const unstyledButton = mountWithApp(
        <UnstyledButton>Test</UnstyledButton>,
      );
      expect(unstyledButton.find('button')!.prop('tabIndex')).toBeUndefined();
    });
  });

  describe('onKeyDown()', () => {
    it('is called when a keydown event is registered on the button', () => {
      const spy = jest.fn();
      const unstyledButton = mountWithApp(
        <UnstyledButton onKeyDown={spy}>Test</UnstyledButton>,
      );
      const mockEvent = {
        key: 'Enter',
      };
      unstyledButton.find('button')!.trigger('onKeyDown', mockEvent);
      expect(spy).toHaveBeenCalled();
    });
  });
});

function noop() {}
