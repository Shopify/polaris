import React from 'react';
import {PlusMinor, CaretDownMinor} from '@shopify/polaris-icons';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {UnstyledLink, Icon, Spinner, ActionList, Popover} from 'components';

import {Button} from '../Button';
import en from '../../../../locales/en.json';

describe('<Button />', () => {
  describe('url', () => {
    const mockUrl = 'http://google.com';

    it('renders a link when present', () => {
      const button = mountWithAppProvider(<Button url={mockUrl} />);
      expect(button.find(UnstyledLink).exists()).toBeTruthy();
    });

    it('gets passed into the link', () => {
      const button = mountWithAppProvider(<Button url={mockUrl} />);
      expect(button.find(UnstyledLink).prop('url')).toBe(mockUrl);
    });

    it('renders a button when not present', () => {
      const button = mountWithAppProvider(<Button />);
      expect(button.find('button').exists()).toBeTruthy();
    });
  });

  describe('children', () => {
    it('renders the given children into the button', () => {
      const label = 'Click me!';
      const button = mountWithAppProvider(<Button>{label}</Button>);
      expect(button.text()).toContain(label);
    });

    it('renders the given children into the link', () => {
      const label = 'Click me!';
      const button = mountWithAppProvider(
        <Button url="http://google.com">{label}</Button>,
      );
      expect(button.text()).toContain(label);
    });
  });

  describe('id', () => {
    it('is passed into the button', () => {
      const id = 'MyID';
      const button = mountWithAppProvider(<Button id={id} />);
      expect(button.find('button').prop('id')).toBe(id);
    });

    it('is passed into the link', () => {
      const id = 'MyID';
      const button = mountWithAppProvider(
        <Button url="https://shopify.com" id={id} />,
      );
      expect(button.find(UnstyledLink).prop('id')).toBe(id);
    });
  });

  describe('disabled', () => {
    it('disable without a url renders <button disabled>', () => {
      const button = mountWithAppProvider(<Button disabled />);
      expect(button.find('button').prop('disabled')).toBeTruthy();
    });

    it('disable with a url renders <a> without an href (as <a disabled> is invalid HTML)>', () => {
      const button = mountWithAppProvider(
        <Button disabled url="http://google.com" />,
      );
      expect(button.find('a').prop('href')).toBeFalsy();
    });
  });

  describe('loading', () => {
    it('loading without a url renders <button disabled>', () => {
      const button = mountWithAppProvider(<Button loading />);
      expect(button.find('button').prop('disabled')).toBe(true);
    });

    it('loading with a url renders <a> without an href (as <a disabled> is invalid HTML)', () => {
      const button = mountWithAppProvider(
        <Button loading url="http://google.com" />,
      );
      expect(button.find('a').prop('href')).toBeFalsy();
    });

    it('renders a spinner into the button', () => {
      const button = mountWithAppProvider(<Button loading />);
      expect(button.find(Spinner).exists()).toBeTruthy();
    });
    it('renders a spinner into the link', () => {
      const button = mountWithAppProvider(
        <Button loading url="http://google.com">
          Click me!
        </Button>,
      );
      expect(button.find(Spinner).exists()).toBeTruthy();
    });

    it('sets aria-busy on the button', () => {
      const button = mountWithAppProvider(<Button loading />);
      expect(button.find('button').prop('aria-busy')).toBeTruthy();
    });
  });

  describe('submit', () => {
    it('sets a submit type on the button when present', () => {
      const button = mountWithAppProvider(<Button submit />);
      expect(button.find('button').prop('type')).toBe('submit');
    });

    it('sets a button type on the button when not present', () => {
      const button = mountWithAppProvider(<Button />);
      expect(button.find('button').prop('type')).toBe('button');
    });
  });

  describe('external', () => {
    it('gets passed into the link', () => {
      const button = mountWithAppProvider(
        <Button url="http://google.com" external />,
      );
      expect(button.find(UnstyledLink).prop('external')).toBeTruthy();
    });

    it('is false when not set', () => {
      const button = mountWithAppProvider(<Button url="http://google.com" />);
      expect(button.find(UnstyledLink).prop('external')).toBeFalsy();
    });
  });

  describe('download', () => {
    it('gets passed into the link as a boolean', () => {
      const button = mountWithAppProvider(<Button url="/foo" download />);
      expect(button.find(UnstyledLink).prop('download')).toBe(true);
    });

    it('gets passed into the link as a string', () => {
      const button = mountWithAppProvider(
        <Button url="/foo" download="file.txt" />,
      );
      expect(button.find(UnstyledLink).prop('download')).toBe('file.txt');
    });

    it('is false when not set', () => {
      const button = mountWithAppProvider(<Button url="http://google.com" />);
      expect(button.find(UnstyledLink).prop('download')).toBeFalsy();
    });
  });

  describe('icon', () => {
    it('renders an icon if it’s a component', () => {
      const button = mountWithAppProvider(<Button icon={PlusMinor} />);
      expect(button.find(Icon).prop('source')).toBe(PlusMinor);
    });

    it('renders a react node if it is one', () => {
      const Icon = () => <div>Hi there!</div>;
      const button = mountWithAppProvider(<Button icon={<Icon />} />);
      expect(button.find(Icon).exists()).toBeTruthy();
    });

    it('does not render the markup for the icon if none is provided', () => {
      const button = mountWithAppProvider(<Button />);
      expect(button.find(Icon).exists()).toBe(false);
    });
  });

  describe('accessibilityLabel', () => {
    it('sets an aria-label on the button', () => {
      const label = 'This deletes a thing';
      const button = mountWithAppProvider(
        <Button accessibilityLabel={label} />,
      );
      expect(button.find('button').prop('aria-label')).toBe(label);
    });

    it('sets an aria-label on the link', () => {
      const label = 'This deletes a thing';
      const button = mountWithAppProvider(
        <Button accessibilityLabel={label} url="http://google.com" />,
      );
      expect(button.find(UnstyledLink).prop('aria-label')).toBe(label);
    });
  });

  describe('ariaControls', () => {
    it('sets an aria-controls on the button', () => {
      const id = 'panel1';
      const button = mountWithAppProvider(<Button ariaControls={id} />);
      expect(button.find('button').prop('aria-controls')).toBe(id);
    });
  });

  describe('ariaExpanded', () => {
    it('sets an aria-expended on the button', () => {
      const button = mountWithAppProvider(<Button ariaExpanded />);
      expect(button.find('button').prop('aria-expanded')).toBeTruthy();
    });
  });

  describe('ariaPressed', () => {
    it('sets an aria-pressed on the button', () => {
      const warningSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});

      const button = mountWithAppProvider(<Button ariaPressed />);
      expect(button.find('button').prop('aria-pressed')).toBeTruthy();

      warningSpy.mockRestore();
    });
  });

  describe('connectedDisclosure', () => {
    it('connects a disclosure icon button to the button', () => {
      const disclosure = {
        actions: [
          {
            content: 'Save and mark as ordered',
          },
        ],
      };

      const button = mountWithAppProvider(
        <Button connectedDisclosure={disclosure} />,
      );

      expect(button.find('button')).toHaveLength(2);

      const disclosureButton = button.find('button').at(1);

      expect(disclosureButton.find(Icon).props().source).toBe(CaretDownMinor);
    });

    it('sets a custom aria-label on the disclosure button when accessibilityLabel is provided', () => {
      const connectedDisclosureLabel = 'More save actions';
      const disclosure = {
        accessibilityLabel: connectedDisclosureLabel,
        actions: [
          {
            content: 'Save and mark as ordered',
          },
        ],
      };

      const button = mountWithAppProvider(
        <Button connectedDisclosure={disclosure} />,
      );

      const disclosureButton = button.find('button').at(1);
      const disclosureButtonProps = disclosureButton.props();

      expect(disclosureButtonProps['aria-label']).toBe(
        connectedDisclosureLabel,
      );
    });

    it('sets a default aria-label on the disclosure button when accessibilityLabel is not provided', () => {
      const connectedDisclosureLabel =
        en.Polaris.Button.connectedDisclosureAccessibilityLabel;

      const disclosure = {
        actions: [
          {
            content: 'Save and mark as ordered',
          },
        ],
      };

      const button = mountWithAppProvider(
        <Button connectedDisclosure={disclosure} />,
      );

      const disclosureButton = button.find('button').at(1);
      const disclosureButtonProps = disclosureButton.props();

      expect(disclosureButtonProps['aria-label']).toBe(
        connectedDisclosureLabel,
      );
    });

    it('disables the disclosure button when disabled is true', () => {
      const disclosure = {
        disabled: true,
        actions: [
          {
            content: 'Save and mark as ordered',
          },
        ],
      };

      const button = mountWithAppProvider(
        <Button connectedDisclosure={disclosure} />,
      );

      const disclosureButton = button.find('button').at(1);

      expect(disclosureButton.props().disabled).toBe(true);
    });

    it('renders an ActionList with the actions set', () => {
      const actions = [
        {
          content: 'Save and mark as ordered',
        },
      ];

      const disclosure = {actions};

      const button = mountWithAppProvider(
        <Button connectedDisclosure={disclosure} />,
      );

      const disclosureButton = button.find('button').at(1);
      disclosureButton.simulate('click');

      const actionList = button.find(Popover).find(ActionList);

      expect(actionList.prop('items')).toStrictEqual(
        expect.arrayContaining(actions),
      );
    });
  });

  describe('onClick()', () => {
    it('is called when the button is clicked', () => {
      const onClickSpy = jest.fn();
      const button = mountWithAppProvider(<Button onClick={onClickSpy} />);
      trigger(button.find('button'), 'onClick');
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when the link is clicked', () => {
      const onClickSpy = jest.fn();
      const button = mountWithAppProvider(
        <Button onClick={onClickSpy} url="http://google.com" />,
      );
      trigger(button.find(UnstyledLink), 'onClick');
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onMouseEnter()', () => {
    it('is called when the mouse enters button', () => {
      const onMouseEnterSpy = jest.fn();
      const button = mountWithAppProvider(
        <Button onMouseEnter={onMouseEnterSpy} />,
      );
      trigger(button.find('button'), 'onMouseEnter');
      expect(onMouseEnterSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when the mouse enters link', () => {
      const onMouseEnterSpy = jest.fn();
      const button = mountWithAppProvider(
        <Button onMouseEnter={onMouseEnterSpy} url="http://google.com" />,
      );
      trigger(button.find(UnstyledLink), 'onMouseEnter');
      expect(onMouseEnterSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onTouchEnter()', () => {
    it('is called when button is pressed', () => {
      const onTouchStartSpy = jest.fn();
      const button = mountWithAppProvider(
        <Button onTouchStart={onTouchStartSpy} />,
      );
      trigger(button.find('button'), 'onTouchStart');
      expect(onTouchStartSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when link is pressed', () => {
      const onTouchStartSpy = jest.fn();
      const button = mountWithAppProvider(
        <Button onTouchStart={onTouchStartSpy} url="http://google.com" />,
      );
      trigger(button.find(UnstyledLink), 'onTouchStart');
      expect(onTouchStartSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onFocus()', () => {
    it('is called when the button is focussed', () => {
      const onFocusSpy = jest.fn();
      const button = mountWithAppProvider(<Button onFocus={onFocusSpy} />);
      trigger(button.find('button'), 'onFocus');
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when the link is focussed', () => {
      const onFocusSpy = jest.fn();
      const button = mountWithAppProvider(
        <Button onFocus={onFocusSpy} url="http://google.com" />,
      );
      trigger(button.find(UnstyledLink), 'onFocus');
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onBlur()', () => {
    it('is called when the button is blurred', () => {
      const onBlurSpy = jest.fn();
      const button = mountWithAppProvider(<Button onBlur={onBlurSpy} />);
      trigger(button.find('button'), 'onBlur');
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when the link is blurred', () => {
      const onBlurSpy = jest.fn();
      const button = mountWithAppProvider(
        <Button onBlur={onBlurSpy} url="http://google.com" />,
      );
      trigger(button.find(UnstyledLink), 'onBlur');
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onKeyPress()', () => {
    it('is called when a keypress event is registered on the button', () => {
      const spy = jest.fn();
      const button = mountWithAppProvider(
        <Button onKeyPress={spy}>Test</Button>,
      ).find('button');
      trigger(button, 'onKeyPress');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onKeyUp()', () => {
    it('is called when a keyup event is registered on the button', () => {
      const spy = jest.fn();
      const button = mountWithAppProvider(
        <Button onKeyUp={spy}>Test</Button>,
      ).find('button');
      trigger(button, 'onKeyUp');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onKeyDown()', () => {
    it('is called when a keydown event is registered on the button', () => {
      const spy = jest.fn();
      const button = mountWithAppProvider(
        <Button onKeyDown={spy}>Test</Button>,
      ).find('button');
      trigger(button, 'onKeyDown');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('pressed', () => {
    const buttonPressedClasses = 'Button pressed';

    it('outputs a pressed button', () => {
      const button = mountWithApp(<Button pressed />);
      expect(button).toContainReactComponent('button', {
        className: buttonPressedClasses,
      });
    });

    it("doesn't output a pressed button when disabled", () => {
      const button = mountWithApp(<Button pressed disabled />);
      expect(button).not.toContainReactComponent('button', {
        className: buttonPressedClasses,
      });
    });

    it("doesn't output a pressed button when a url is present", () => {
      const button = mountWithApp(<Button pressed url="/" />);
      expect(button).not.toContainReactComponent('button', {
        className: buttonPressedClasses,
      });
    });
  });

  describe('disclosure', () => {
    it('assumes "down" if set to true', () => {
      const button = mountWithAppProvider(<Button disclosure />);
      const disclosureIcon = button.find('.DisclosureIcon');
      expect(disclosureIcon!.hasClass('DisclosureIconFacingUp')).toBe(false);
    });

    it('is facing down if set to "down"', () => {
      const button = mountWithAppProvider(<Button disclosure="down" />);
      const disclosureIcon = button.find('.DisclosureIcon');
      expect(disclosureIcon!.hasClass('DisclosureIconFacingUp')).toBe(false);
    });

    it('is facing up if set to "up"', () => {
      const button = mountWithAppProvider(<Button disclosure="up" />);
      const disclosureIcon = button.find('.DisclosureIcon');
      expect(disclosureIcon!.hasClass('DisclosureIconFacingUp')).toBe(true);
    });
  });

  describe('deprecations', () => {
    it('warns the ariaPressed prop has been replaced', () => {
      const warningSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});
      mountWithApp(<Button ariaPressed />);

      expect(warningSpy).toHaveBeenCalledWith(
        'Deprecation: The ariaPressed prop has been replaced with pressed',
      );
      warningSpy.mockRestore();
    });
  });

  describe('newDesignLanguage', () => {
    it('adds a newDesignLanguage class when newDesignLanguage is enabled', () => {
      const button = mountWithApp(<Button />, {
        features: {newDesignLanguage: true},
      });
      expect(button).toContainReactComponent('button', {
        className: 'Button newDesignLanguage',
      });
    });

    it('does not add a newDesignLanguage class when newDesignLanguage is disabled', () => {
      const button = mountWithApp(<Button />, {
        features: {newDesignLanguage: false},
      });
      expect(button).not.toContainReactComponent('button', {
        className: 'Button newDesignLanguage',
      });
    });
  });
});
