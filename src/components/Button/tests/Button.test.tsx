import React from 'react';
import {PlusMinor, CaretDownMinor} from '@shopify/polaris-icons';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {ActionList, Icon, Popover, Spinner, UnstyledButton} from 'components';

import {Button} from '../Button';
import en from '../../../../locales/en.json';

describe('<Button />', () => {
  describe('children', () => {
    const mockChildren = 'mock children';

    it('passes prop', () => {
      const button = mountWithAppProvider(<Button>{mockChildren}</Button>);
      expect(button.find(UnstyledButton).text()).toContain(mockChildren);
    });
  });

  describe('id', () => {
    it('passes prop', () => {
      const id = 'MockId';
      const button = mountWithAppProvider(<Button id={id} />);
      expect(button.find(UnstyledButton).prop('id')).toBe(id);
    });
  });

  describe('url', () => {
    const mockUrl = 'https://google.com';
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

    it('omits subset of props when provided a `url`', () => {
      const button = mountWithAppProvider(
        <Button url={mockUrl} {...mockUnpassedProps} />,
      );

      expect(button.find(UnstyledButton).prop('url')).toBe(mockUrl);

      expect(button.find(UnstyledButton).prop('submit')).toBeUndefined();
      expect(button.find(UnstyledButton).prop('ariaControls')).toBeUndefined();
      expect(button.find(UnstyledButton).prop('ariaExpanded')).toBeUndefined();
      expect(button.find(UnstyledButton).prop('onKeyDown')).toBeUndefined();
      expect(button.find(UnstyledButton).prop('onKeyUp')).toBeUndefined();
      expect(button.find(UnstyledButton).prop('onKeyPress')).toBeUndefined();
    });
  });

  describe('external', () => {
    const mockUrl = 'https://google.com';

    it('gets passed alongside url', () => {
      const button = mountWithAppProvider(<Button url={mockUrl} external />);
      expect(button.find(UnstyledButton).prop('external')).toBeTruthy();
    });

    it('is false by default', () => {
      const button = mountWithAppProvider(<Button url={mockUrl} />);
      expect(button.find(UnstyledButton).prop('external')).toBeFalsy();
    });

    it('is not passed when url is not provided', () => {
      const button = mountWithAppProvider(<Button external />);
      expect(button.find(UnstyledButton).prop('external')).toBeFalsy();
    });
  });

  describe('download', () => {
    const mockUrl = 'https://google.com';

    it('gets passed into the link as a boolean', () => {
      const button = mountWithAppProvider(<Button url={mockUrl} download />);
      expect(button.find(UnstyledButton).prop('download')).toBe(true);
    });

    it('gets passed into the link as a string', () => {
      const button = mountWithAppProvider(
        <Button url={mockUrl} download="file.txt" />,
      );
      expect(button.find(UnstyledButton).prop('download')).toBe('file.txt');
    });

    it('is false when not set', () => {
      const button = mountWithAppProvider(<Button url={mockUrl} />);
      expect(button.find(UnstyledButton).prop('download')).toBeUndefined();
    });

    it('is not passed when no `url` is provided', () => {
      const button = mountWithAppProvider(<Button download />);
      expect(button.find(UnstyledButton).prop('download')).toBeUndefined();
    });
  });

  describe('disabled', () => {
    it('renders <UnstyledButton /> when url is not passed', () => {
      const button = mountWithAppProvider(<Button disabled />);
      expect(button.find(UnstyledButton).prop('disabled')).toBe(true);
    });

    it('renders <a> without an href when url is passed', () => {
      const button = mountWithAppProvider(
        <Button disabled url="https://google.com" />,
      );
      expect(button.find('a').prop('href')).toBeFalsy();
    });
  });

  describe('loading', () => {
    it('renders <UnstyledButton /> when url is not passed', () => {
      const button = mountWithAppProvider(<Button loading />);
      expect(button.find(UnstyledButton).prop('disabled')).toBe(true);
      expect(button.find(UnstyledButton).prop('loading')).toBe(true);
    });

    it('renders <a> without an href when url is passed', () => {
      const button = mountWithAppProvider(
        <Button loading url="https://google.com" />,
      );
      expect(button.find('a').prop('href')).toBeFalsy();
    });

    it('renders a spinner into the button', () => {
      const button = mountWithAppProvider(<Button loading />);
      expect(button.find(Spinner).exists()).toBeTruthy();
    });

    it('renders a spinner into the link', () => {
      const button = mountWithAppProvider(
        <Button loading url="https://google.com">
          Click me!
        </Button>,
      );
      expect(button.find(Spinner).exists()).toBeTruthy();
    });

    it.todo('renders a placeholder disclosure icon');
    it.todo('renders a placeholder inner icon');
  });

  describe('submit', () => {
    it('is passed', () => {
      const button = mountWithAppProvider(<Button submit />);
      expect(button.find(UnstyledButton).prop('submit')).toBe(true);
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
    const mockAccessibilityLabel = 'mock accessibility label';
    const mockUrl = 'https://google.com';

    it('passes without `url`', () => {
      const button = mountWithAppProvider(
        <Button accessibilityLabel={mockAccessibilityLabel} />,
      );
      expect(button.find(UnstyledButton).prop('accessibilityLabel')).toBe(
        mockAccessibilityLabel,
      );
    });

    it('passes with `url`', () => {
      const button = mountWithAppProvider(
        <Button accessibilityLabel={mockAccessibilityLabel} url={mockUrl} />,
      );
      expect(button.find(UnstyledButton).prop('accessibilityLabel')).toBe(
        mockAccessibilityLabel,
      );
    });

    // Should also test for `loading`
    it('passes to `aria-label` when `url` and `disabled`', () => {
      const button = mountWithAppProvider(
        <Button
          accessibilityLabel={mockAccessibilityLabel}
          url={mockUrl}
          disabled
        />,
      );
      expect(button.find('a').prop('aria-label')).toBe(mockAccessibilityLabel);
    });
  });

  describe('ariaControls', () => {
    it('passes prop', () => {
      const id = 'mockId';
      const button = mountWithAppProvider(<Button ariaControls={id} />);
      expect(button.find(UnstyledButton).prop('ariaControls')).toBe(id);
    });
  });

  describe('ariaExpanded', () => {
    it('passes prop', () => {
      const button = mountWithAppProvider(<Button ariaExpanded />);
      expect(button.find(UnstyledButton).prop('ariaExpanded')).toBeTruthy();
    });
  });

  describe('ariaPressed', () => {
    it('passes prop', () => {
      const warningSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});

      const button = mountWithAppProvider(<Button ariaPressed />);
      expect(button.find(UnstyledButton).prop('ariaPressed')).toBeTruthy();

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
      trigger(button.find(UnstyledButton), 'onClick');
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when the link is clicked', () => {
      const onClickSpy = jest.fn();
      const button = mountWithAppProvider(
        <Button onClick={onClickSpy} url="https://google.com" />,
      );
      trigger(button.find(UnstyledButton), 'onClick');
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onMouseEnter()', () => {
    it('is called when the mouse enters button', () => {
      const onMouseEnterSpy = jest.fn();
      const button = mountWithAppProvider(
        <Button onMouseEnter={onMouseEnterSpy} />,
      );
      trigger(button.find(UnstyledButton), 'onMouseEnter');
      expect(onMouseEnterSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when the mouse enters link', () => {
      const onMouseEnterSpy = jest.fn();
      const button = mountWithAppProvider(
        <Button onMouseEnter={onMouseEnterSpy} url="https://google.com" />,
      );
      trigger(button.find(UnstyledButton), 'onMouseEnter');
      expect(onMouseEnterSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onTouchEnter()', () => {
    it('is called when button is pressed', () => {
      const onTouchStartSpy = jest.fn();
      const button = mountWithAppProvider(
        <Button onTouchStart={onTouchStartSpy} />,
      );
      trigger(button.find(UnstyledButton), 'onTouchStart');
      expect(onTouchStartSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when link is pressed', () => {
      const onTouchStartSpy = jest.fn();
      const button = mountWithAppProvider(
        <Button onTouchStart={onTouchStartSpy} url="https://google.com" />,
      );
      trigger(button.find(UnstyledButton), 'onTouchStart');
      expect(onTouchStartSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onFocus()', () => {
    it('is called when the button is focussed', () => {
      const onFocusSpy = jest.fn();
      const button = mountWithAppProvider(<Button onFocus={onFocusSpy} />);
      trigger(button.find(UnstyledButton), 'onFocus');
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when the link is focussed', () => {
      const onFocusSpy = jest.fn();
      const button = mountWithAppProvider(
        <Button onFocus={onFocusSpy} url="https://google.com" />,
      );
      trigger(button.find(UnstyledButton), 'onFocus');
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onBlur()', () => {
    it('is called when the button is blurred', () => {
      const onBlurSpy = jest.fn();
      const button = mountWithAppProvider(<Button onBlur={onBlurSpy} />);
      trigger(button.find(UnstyledButton), 'onBlur');
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when the link is blurred', () => {
      const onBlurSpy = jest.fn();
      const button = mountWithAppProvider(
        <Button onBlur={onBlurSpy} url="https://google.com" />,
      );
      trigger(button.find(UnstyledButton), 'onBlur');
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onKeyPress()', () => {
    it('is called when a keypress event is registered on the button', () => {
      const spy = jest.fn();
      const button = mountWithAppProvider(
        <Button onKeyPress={spy}>Test</Button>,
      ).find(UnstyledButton);
      trigger(button, 'onKeyPress');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onKeyUp()', () => {
    it('is called when a keyup event is registered on the button', () => {
      const spy = jest.fn();
      const button = mountWithAppProvider(
        <Button onKeyUp={spy}>Test</Button>,
      ).find(UnstyledButton);
      trigger(button, 'onKeyUp');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onKeyDown()', () => {
    it('is called when a keydown event is registered on the button', () => {
      const spy = jest.fn();
      const button = mountWithAppProvider(
        <Button onKeyDown={spy}>Test</Button>,
      ).find(UnstyledButton);
      trigger(button, 'onKeyDown');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('pressed', () => {
    const buttonPressedClasses = 'Button pressed';

    it('outputs a pressed button', () => {
      const button = mountWithApp(<Button pressed />);
      expect(button).toContainReactComponent(UnstyledButton, {
        className: buttonPressedClasses,
      });
    });

    it("doesn't output a pressed button when disabled", () => {
      const button = mountWithApp(<Button pressed disabled />);
      expect(button).not.toContainReactComponent(UnstyledButton, {
        className: buttonPressedClasses,
      });
    });

    it("doesn't output a pressed button when a url is present", () => {
      const button = mountWithApp(<Button pressed url="/" />);
      expect(button).not.toContainReactComponent(UnstyledButton, {
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
      expect(button).toContainReactComponent(UnstyledButton, {
        className: 'Button newDesignLanguage',
      });
    });

    it('does not add a newDesignLanguage class when newDesignLanguage is disabled', () => {
      const button = mountWithApp(<Button />, {
        features: {newDesignLanguage: false},
      });
      expect(button).not.toContainReactComponent(UnstyledButton, {
        className: 'Button newDesignLanguage',
      });
    });
  });
});

function noop() {}
