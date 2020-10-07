import React from 'react';

// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {UnstyledLink} from 'components';

import {UnstyledButton} from '../UnstyledButton';

describe('<Button />', () => {
  describe('url', () => {
    const mockUrl = 'http://google.com';

    it('renders a link when present', () => {
      const button = mountWithAppProvider(<UnstyledButton url={mockUrl} />);
      expect(button.find(UnstyledLink).exists()).toBeTruthy();
    });

    it('gets passed into the link', () => {
      const button = mountWithAppProvider(<UnstyledButton url={mockUrl} />);
      expect(button.find(UnstyledLink).prop('url')).toBe(mockUrl);
    });

    it('renders a button when not present', () => {
      const button = mountWithAppProvider(<UnstyledButton />);
      expect(button.find('button').exists()).toBeTruthy();
    });
  });

  describe('children', () => {
    it('renders the given children into the button', () => {
      const label = 'Click me!';
      const button = mountWithAppProvider(
        <UnstyledButton>{label}</UnstyledButton>,
      );
      expect(button.text()).toContain(label);
    });

    it('renders the given children into the link', () => {
      const label = 'Click me!';
      const button = mountWithAppProvider(
        <UnstyledButton url="http://google.com">{label}</UnstyledButton>,
      );
      expect(button.text()).toContain(label);
    });
  });

  describe('id', () => {
    it('is passed into the button', () => {
      const id = 'MyID';
      const button = mountWithAppProvider(<UnstyledButton id={id} />);
      expect(button.find('button').prop('id')).toBe(id);
    });

    it('is passed into the link', () => {
      const id = 'MyID';
      const button = mountWithAppProvider(
        <UnstyledButton url="https://shopify.com" id={id} />,
      );
      expect(button.find(UnstyledLink).prop('id')).toBe(id);
    });
  });

  describe('disabled', () => {
    it('disable without a url renders <button disabled>', () => {
      const button = mountWithAppProvider(<UnstyledButton disabled />);
      expect(button.find('button').prop('disabled')).toBeTruthy();
    });

    it('disable with a url renders <a> without an href (as <a disabled> is invalid HTML)>', () => {
      const button = mountWithAppProvider(
        <UnstyledButton disabled url="http://google.com" />,
      );
      expect(button.find('a').prop('href')).toBeFalsy();
    });
  });

  describe('submit', () => {
    it('sets a submit type on the button when present', () => {
      const button = mountWithAppProvider(<UnstyledButton submit />);
      expect(button.find('button').prop('type')).toBe('submit');
    });

    it('sets a button type on the button when not present', () => {
      const button = mountWithAppProvider(<UnstyledButton />);
      expect(button.find('button').prop('type')).toBe('button');
    });
  });

  describe('external', () => {
    it('gets passed into the link', () => {
      const button = mountWithAppProvider(
        <UnstyledButton url="http://google.com" external />,
      );
      expect(button.find(UnstyledLink).prop('external')).toBeTruthy();
    });

    it('is false when not set', () => {
      const button = mountWithAppProvider(
        <UnstyledButton url="http://google.com" />,
      );
      expect(button.find(UnstyledLink).prop('external')).toBeFalsy();
    });
  });

  describe('download', () => {
    it('gets passed into the link as a boolean', () => {
      const button = mountWithAppProvider(
        <UnstyledButton url="/foo" download />,
      );
      expect(button.find(UnstyledLink).prop('download')).toBe(true);
    });

    it('gets passed into the link as a string', () => {
      const button = mountWithAppProvider(
        <UnstyledButton url="/foo" download="file.txt" />,
      );
      expect(button.find(UnstyledLink).prop('download')).toBe('file.txt');
    });

    it('is false when not set', () => {
      const button = mountWithAppProvider(
        <UnstyledButton url="http://google.com" />,
      );
      expect(button.find(UnstyledLink).prop('download')).toBeFalsy();
    });
  });

  describe('accessibilityLabel', () => {
    it('sets an aria-label on the button', () => {
      const label = 'This deletes a thing';
      const button = mountWithAppProvider(
        <UnstyledButton accessibilityLabel={label} />,
      );
      expect(button.find('button').prop('aria-label')).toBe(label);
    });

    it('sets an aria-label on the link', () => {
      const label = 'This deletes a thing';
      const button = mountWithAppProvider(
        <UnstyledButton accessibilityLabel={label} url="http://google.com" />,
      );
      expect(button.find(UnstyledLink).prop('aria-label')).toBe(label);
    });
  });

  describe('ariaControls', () => {
    it('sets an aria-controls on the button', () => {
      const id = 'panel1';
      const button = mountWithAppProvider(<UnstyledButton ariaControls={id} />);
      expect(button.find('button').prop('aria-controls')).toBe(id);
    });
  });

  describe('ariaExpanded', () => {
    it('sets an aria-expended on the button', () => {
      const button = mountWithAppProvider(<UnstyledButton ariaExpanded />);
      expect(button.find('button').prop('aria-expanded')).toBeTruthy();
    });
  });

  describe('ariaPressed', () => {
    it('sets an aria-pressed on the button', () => {
      const warningSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});

      const button = mountWithAppProvider(<UnstyledButton ariaPressed />);
      expect(button.find('button').prop('aria-pressed')).toBeTruthy();

      warningSpy.mockRestore();
    });
  });

  describe('onClick()', () => {
    it('is called when the button is clicked', () => {
      const onClickSpy = jest.fn();
      const button = mountWithAppProvider(
        <UnstyledButton onClick={onClickSpy} />,
      );
      trigger(button.find('button'), 'onClick');
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when the link is clicked', () => {
      const onClickSpy = jest.fn();
      const button = mountWithAppProvider(
        <UnstyledButton onClick={onClickSpy} url="http://google.com" />,
      );
      trigger(button.find(UnstyledLink), 'onClick');
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onMouseEnter()', () => {
    it('is called when the mouse enters button', () => {
      const onMouseEnterSpy = jest.fn();
      const button = mountWithAppProvider(
        <UnstyledButton onMouseEnter={onMouseEnterSpy} />,
      );
      trigger(button.find('button'), 'onMouseEnter');
      expect(onMouseEnterSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when the mouse enters link', () => {
      const onMouseEnterSpy = jest.fn();
      const button = mountWithAppProvider(
        <UnstyledButton
          onMouseEnter={onMouseEnterSpy}
          url="http://google.com"
        />,
      );
      trigger(button.find(UnstyledLink), 'onMouseEnter');
      expect(onMouseEnterSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onTouchEnter()', () => {
    it('is called when button is pressed', () => {
      const onTouchStartSpy = jest.fn();
      const button = mountWithAppProvider(
        <UnstyledButton onTouchStart={onTouchStartSpy} />,
      );
      trigger(button.find('button'), 'onTouchStart');
      expect(onTouchStartSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when link is pressed', () => {
      const onTouchStartSpy = jest.fn();
      const button = mountWithAppProvider(
        <UnstyledButton
          onTouchStart={onTouchStartSpy}
          url="http://google.com"
        />,
      );
      trigger(button.find(UnstyledLink), 'onTouchStart');
      expect(onTouchStartSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onFocus()', () => {
    it('is called when the button is focussed', () => {
      const onFocusSpy = jest.fn();
      const button = mountWithAppProvider(
        <UnstyledButton onFocus={onFocusSpy} />,
      );
      trigger(button.find('button'), 'onFocus');
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when the link is focussed', () => {
      const onFocusSpy = jest.fn();
      const button = mountWithAppProvider(
        <UnstyledButton onFocus={onFocusSpy} url="http://google.com" />,
      );
      trigger(button.find(UnstyledLink), 'onFocus');
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onBlur()', () => {
    it('is called when the button is blurred', () => {
      const onBlurSpy = jest.fn();
      const button = mountWithAppProvider(
        <UnstyledButton onBlur={onBlurSpy} />,
      );
      trigger(button.find('button'), 'onBlur');
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when the link is blurred', () => {
      const onBlurSpy = jest.fn();
      const button = mountWithAppProvider(
        <UnstyledButton onBlur={onBlurSpy} url="http://google.com" />,
      );
      trigger(button.find(UnstyledLink), 'onBlur');
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onKeyPress()', () => {
    it('is called when a keypress event is registered on the button', () => {
      const spy = jest.fn();
      const button = mountWithAppProvider(
        <UnstyledButton onKeyPress={spy}>Test</UnstyledButton>,
      ).find('button');
      trigger(button, 'onKeyPress');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onKeyUp()', () => {
    it('is called when a keyup event is registered on the button', () => {
      const spy = jest.fn();
      const button = mountWithAppProvider(
        <UnstyledButton onKeyUp={spy}>Test</UnstyledButton>,
      ).find('button');
      trigger(button, 'onKeyUp');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onKeyDown()', () => {
    it('is called when a keydown event is registered on the button', () => {
      const spy = jest.fn();
      const button = mountWithAppProvider(
        <UnstyledButton onKeyDown={spy}>Test</UnstyledButton>,
      ).find('button');
      trigger(button, 'onKeyDown');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('deprecations', () => {
    it('warns the ariaPressed prop has been replaced', () => {
      const warningSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});
      mountWithApp(<UnstyledButton ariaPressed />);

      expect(warningSpy).toHaveBeenCalledWith(
        'Deprecation: The ariaPressed prop has been replaced with pressed',
      );
      warningSpy.mockRestore();
    });
  });
});
