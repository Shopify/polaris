import React from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  SelectIcon,
} from '@shopify/polaris-icons';
import {mountWithApp} from 'tests/utilities';

import {Icon} from '../../Icon';
import {Spinner} from '../../Spinner';
import {UnstyledButton} from '../../UnstyledButton';
import {Button} from '../Button';

describe('<Button />', () => {
  let warnSpy: jest.SpyInstance | null = null;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => warnSpy?.mockRestore());

  describe('children', () => {
    it('passes prop', () => {
      const mockChildren = 'mock children';
      const button = mountWithApp(<Button>{mockChildren}</Button>);
      expect(button.find(UnstyledButton)).toContainReactText(mockChildren);
    });
  });

  describe('id', () => {
    it('passes prop', () => {
      const id = 'MockId';
      const button = mountWithApp(<Button id={id} />);
      expect(button).toContainReactComponent(UnstyledButton, {id});
    });
  });

  describe('url', () => {
    it('passes prop', () => {
      const mockUrl = 'https://google.com';
      const button = mountWithApp(<Button url={mockUrl} />);
      expect(button).toContainReactComponent(UnstyledButton, {url: mockUrl});
    });
  });

  describe('external', () => {
    it('passes prop', () => {
      const button = mountWithApp(<Button external />);
      expect(button).toContainReactComponent(UnstyledButton, {external: true});
    });
  });

  describe('download', () => {
    it('gets passed as a boolean', () => {
      const button = mountWithApp(<Button download />);
      expect(button).toContainReactComponent(UnstyledButton, {download: true});
    });

    it('gets passed as a string', () => {
      const mockDownload = 'file.txt';
      const mockUrl = 'https://google.com';

      const button = mountWithApp(
        <Button url={mockUrl} download={mockDownload} />,
      );
      expect(button).toContainReactComponent(UnstyledButton, {
        download: mockDownload,
      });
    });
  });

  describe('target', () => {
    it('passes prop', () => {
      const button = mountWithApp(<Button target="_top" />);
      expect(button).toContainReactComponent(UnstyledButton, {target: '_top'});
    });
  });

  describe('disabled', () => {
    it('renders <UnstyledButton /> when url is not passed', () => {
      const button = mountWithApp(<Button disabled />);
      expect(button).toContainReactComponent(UnstyledButton, {disabled: true});
    });

    it('renders <a> without an href when url is passed', () => {
      const button = mountWithApp(<Button disabled url="https://google.com" />);

      expect(button).toContainReactComponent('a', {href: undefined});
    });

    it('prevents default for onClick event when disabled', () => {
      const onClick = jest.fn();
      const button = mountWithApp(<Button disabled onClick={onClick} />);

      const mockEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      };

      button.find('button')!.trigger('onClick', mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
      expect(mockEvent.stopPropagation).toHaveBeenCalledTimes(1);
    });
  });

  describe('loading', () => {
    it('passes prop', () => {
      const button = mountWithApp(<Button loading />);
      expect(button).toContainReactComponent(UnstyledButton, {loading: true});
    });

    it('renders a spinner into the button', () => {
      const button = mountWithApp(<Button loading />);
      expect(button).toContainReactComponent(Spinner);
    });

    it('renders a spinner into the link', () => {
      const button = mountWithApp(
        <Button loading url="https://google.com">
          Click me!
        </Button>,
      );
      expect(button).toContainReactComponent(Spinner);
    });

    it.todo('renders a placeholder disclosure icon');

    it.todo('renders a placeholder inner icon');
  });

  describe('submit', () => {
    it('passes prop', () => {
      const button = mountWithApp(<Button submit />);
      expect(button).toContainReactComponent(UnstyledButton, {submit: true});
    });
  });

  describe('icon', () => {
    it('renders an icon if it’s a component', () => {
      const button = mountWithApp(<Button icon={PlusIcon} />);
      expect(button).toContainReactComponent(Icon, {source: PlusIcon});
    });

    it('renders a react node if it is one', () => {
      const Icon = () => <div>Hi there!</div>;
      const button = mountWithApp(<Button icon={<Icon />} />);
      expect(button).toContainReactComponent(Icon);
    });

    it('does not render the markup for the icon if none is provided', () => {
      const button = mountWithApp(<Button />);
      expect(button).not.toContainReactComponent(Icon);
    });
  });

  describe('accessibilityLabel', () => {
    it('passes prop', () => {
      const mockAccessibilityLabel = 'mock accessibility label';
      const button = mountWithApp(
        <Button accessibilityLabel={mockAccessibilityLabel} />,
      );

      expect(button).toContainReactComponent(UnstyledButton, {
        accessibilityLabel: mockAccessibilityLabel,
      });
    });
  });

  describe('role', () => {
    it('passes prop', () => {
      const mockRole = 'menuitem';
      const button = mountWithApp(<Button role={mockRole} />);
      expect(button).toContainReactComponent(UnstyledButton, {role: mockRole});
    });
  });

  describe('ariaControls', () => {
    it('passes prop', () => {
      const id = 'mockId';
      const button = mountWithApp(<Button ariaControls={id} />);
      expect(button).toContainReactComponent(UnstyledButton, {
        ariaControls: id,
      });
    });
  });

  describe('ariaExpanded', () => {
    it('passes prop', () => {
      const button = mountWithApp(<Button ariaExpanded />);
      expect(button).toContainReactComponent(UnstyledButton, {
        ariaExpanded: true,
      });
    });
  });

  describe('ariaDescribedBy', () => {
    it('passes prop', () => {
      const id = 'mockId';
      const button = mountWithApp(<Button ariaDescribedBy={id} />);
      expect(button).toContainReactComponent(UnstyledButton, {
        ariaDescribedBy: id,
      });
    });
  });

  describe('onClick()', () => {
    it('is called when the button is clicked', () => {
      const onClickSpy = jest.fn();
      const button = mountWithApp(<Button onClick={onClickSpy} />);
      button.find(UnstyledButton)!.trigger('onClick');
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onPointerDown()', () => {
    it('is called when the pointer is down', () => {
      const onPointerDownSpy = jest.fn();
      const button = mountWithApp(<Button onPointerDown={onPointerDownSpy} />);
      button.find(UnstyledButton)!.trigger('onPointerDown');
      expect(onPointerDownSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onMouseEnter()', () => {
    it('is called when the mouse enters button', () => {
      const onMouseEnterSpy = jest.fn();
      const button = mountWithApp(<Button onMouseEnter={onMouseEnterSpy} />);
      button.find(UnstyledButton)!.trigger('onMouseEnter');
      expect(onMouseEnterSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onTouchEnter()', () => {
    it('is called when button is pressed', () => {
      const onTouchStartSpy = jest.fn();
      const button = mountWithApp(<Button onTouchStart={onTouchStartSpy} />);
      button.find(UnstyledButton)!.trigger('onTouchStart');
      expect(onTouchStartSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onFocus()', () => {
    it('is called when the button is focused', () => {
      const onFocusSpy = jest.fn();
      const button = mountWithApp(<Button onFocus={onFocusSpy} />);
      button.find(UnstyledButton)!.trigger('onFocus');
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onBlur()', () => {
    it('is called when the button is blurred', () => {
      const onBlurSpy = jest.fn();
      const button = mountWithApp(<Button onBlur={onBlurSpy} />);
      button.find(UnstyledButton)!.trigger('onBlur');
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onKeyPress()', () => {
    it('is called when a keypress event is registered on the button', () => {
      const spy = jest.fn();
      const button = mountWithApp(<Button onKeyPress={spy}>Test</Button>).find(
        UnstyledButton,
      );
      button!.trigger('onKeyPress');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onKeyUp()', () => {
    it('is called when a keyup event is registered on the button', () => {
      const spy = jest.fn();
      const button = mountWithApp(<Button onKeyUp={spy}>Test</Button>).find(
        UnstyledButton,
      );
      button!.trigger('onKeyUp');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onKeyDown()', () => {
    it('is called when a keydown event is registered on the button', () => {
      const spy = jest.fn();
      const button = mountWithApp(<Button onKeyDown={spy}>Test</Button>).find(
        UnstyledButton,
      );
      button!.trigger('onKeyDown');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('pressed', () => {
    const buttonPressedClasses =
      'Button pressable variantSecondary sizeMedium textAlignCenter pressed';

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
      const button = mountWithApp(<Button disclosure />);
      const disclosureIcon = button.find(Icon);
      expect(disclosureIcon).toHaveReactProps({source: ChevronDownIcon});
    });

    it('is facing down if set to "down"', () => {
      const button = mountWithApp(<Button disclosure="down" />);
      const disclosureIcon = button.find(Icon);
      expect(disclosureIcon).toHaveReactProps({source: ChevronDownIcon});
    });

    it('is facing up if set to "up"', () => {
      const button = mountWithApp(<Button disclosure="up" />);
      const disclosureIcon = button.find(Icon);
      expect(disclosureIcon).toHaveReactProps({source: ChevronUpIcon});
    });

    it('is double-arrow if set to "select"', () => {
      const button = mountWithApp(<Button disclosure="select" />);
      const disclosureIcon = button.find(Icon);
      expect(disclosureIcon).toHaveReactProps({source: SelectIcon});
    });
  });

  describe('removeUnderline', () => {
    it('passes prop to <UnstyledButton/> className', () => {
      const button = mountWithApp(<Button removeUnderline />);

      expect(button.find(UnstyledButton)!.props.className).toContain(
        'removeUnderline',
      );
      expect(button).toContainReactComponent(UnstyledButton, {
        className: expect.stringContaining('removeUnderline'),
      });
    });

    it('passes prop to <span/> className', () => {
      const children = 'Sample children';
      const button = mountWithApp(<Button removeUnderline>{children}</Button>);
      const childrenSpan = button.find('span', {children})!;
      expect(childrenSpan).toHaveReactProps({
        className: expect.stringContaining('removeUnderline'),
      });
    });
  });

  describe('dataPrimaryLink', () => {
    it('adds data-primary-link attribute to the link', () => {
      const link = mountWithApp(
        <Button url="https://examp.le" dataPrimaryLink>
          Test
        </Button>,
      );

      const selector: any = {
        'data-primary-link': true,
      };
      expect(link).toContainReactComponent('a', selector);
    });

    it('adds data-primary-link attribute to the button', () => {
      const link = mountWithApp(<Button dataPrimaryLink>Test</Button>);

      const selector: any = {
        'data-primary-link': true,
      };
      expect(link).toContainReactComponent('button', selector);
    });
  });
});
