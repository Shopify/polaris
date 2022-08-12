import React from 'react';
import {mount} from 'tests/utilities';
import {mountWithListboxProvider} from 'tests/utilities/listbox';

import type {ListboxContext} from '../../../../../utilities/listbox';
import {Option} from '../Option';
import {TextOption} from '../../TextOption';
import {MappedActionContext} from '../../../../../utilities/autocomplete';
import {UnstyledLink} from '../../../../UnstyledLink';

const defaultProps = {
  accessibilityLabel: 'label',
  value: 'value',
};

const defaultContext: React.ContextType<typeof ListboxContext> = {
  onOptionSelect: noop,
  setLoading: noop,
};

describe('Option', () => {
  it("throws when the Option does not have 'ListboxContext'", () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const attemptMount = () => {
      mount(<Option accessibilityLabel="label" value="value" />);
    };

    // eslint-disable-next-line jest/require-to-throw-message
    expect(attemptMount).toThrow();

    consoleErrorSpy.mockRestore();
  });

  it('renders a li with a the necessary attributes', () => {
    const expectedProps = {
      id: expect.any(String),
      role: 'option',
      'data-listbox-option-value': defaultProps.value,
      onMouseDown: expect.any(Function),
      onClick: expect.any(Function),
    };

    const option = mountWithListboxProvider(<Option {...defaultProps} />, {
      ...defaultContext,
    });

    expect(option).toContainReactComponent('li', {
      ...expectedProps,
    });
  });

  it('calls the `onOptionSelect` on context with the DOM ID, value and option div Ref when the option div is clicked', () => {
    const onOptionSelectSpy = jest.fn();
    const context: React.ContextType<typeof ListboxContext> = {
      ...defaultContext,
      onOptionSelect: onOptionSelectSpy,
    };

    const option = mountWithListboxProvider(<Option {...defaultProps} />, {
      ...context,
    });

    const optionElement = option.find('li', {
      role: 'option',
    });
    const domId = optionElement?.prop('id');

    optionElement!.trigger('onClick', {
      preventDefault: () => {},
      stopPropagation: () => {},
    });

    expect(onOptionSelectSpy).toHaveBeenCalledTimes(1);
    expect(onOptionSelectSpy).toHaveBeenCalledWith({
      domId,
      value: defaultProps.value,
      element: expect.any(Object),
      disabled: false,
    });

    onOptionSelectSpy.mockRestore();
  });

  it('renders its children inside the option div', () => {
    function Children() {
      return <div>child</div>;
    }

    const option = mountWithListboxProvider(
      <Option {...defaultProps}>
        <Children />
      </Option>,
      {
        ...defaultContext,
      },
    );

    expect(option.find('li', {role: 'option'})).toContainReactComponent(
      Children,
    );
  });

  it('renders a TextOption with children when it is a string', () => {
    const option = mountWithListboxProvider(
      <Option {...defaultProps}>{defaultProps.accessibilityLabel}</Option>,
      {
        ...defaultContext,
      },
    );

    const optionDiv = option.find('li', {role: 'option'});

    expect(optionDiv).toContainReactComponent(TextOption, {
      children: defaultProps.accessibilityLabel,
    });
  });

  it('renders children in TextOption when it is a string', () => {
    const children = 'Children';
    const option = mountWithListboxProvider(
      <Option {...defaultProps}>{children}</Option>,
      {
        ...defaultContext,
      },
    );

    expect(option).toContainReactComponent(TextOption, {
      children,
    });
  });

  it('prevents default on mouse down', () => {
    const preventDefaultSpy = jest.fn();
    const option = mountWithListboxProvider(
      <Option {...defaultProps}>{defaultProps.accessibilityLabel}</Option>,
      {
        ...defaultContext,
      },
    );

    option.find('li', {role: 'option'})!.trigger('onMouseDown', {
      preventDefault: preventDefaultSpy,
      stopPropagation: () => {},
    });

    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
  });

  describe('selected', () => {
    it('is passed to the aria-selected prop of the option div if true', () => {
      const option = mountWithListboxProvider(
        <Option {...defaultProps} selected />,
        {
          ...defaultContext,
        },
      );

      expect(option).toContainReactComponent('li', {
        role: 'option',
        'aria-selected': true,
      });
    });

    it('is not passed to the aria-selected prop of the option div if not defined', () => {
      const option = mountWithListboxProvider(<Option {...defaultProps} />, {
        ...defaultContext,
      });

      expect(option).toContainReactComponent('li', {
        role: 'option',
        'aria-selected': undefined,
      });
    });

    it('is passed to the TextOption selected prop when children is a string', () => {
      const option = mountWithListboxProvider(
        <Option {...defaultProps} selected>
          Child
        </Option>,
        {
          ...defaultContext,
        },
      );

      expect(option).toContainReactComponent(TextOption, {
        selected: true,
      });
    });
  });

  describe('disabled', () => {
    it('disables the onClick of the option div if true', () => {
      const option = mountWithListboxProvider(
        <Option {...defaultProps} disabled />,
        {
          ...defaultContext,
        },
      );

      expect(option).toContainReactComponent('li', {
        role: 'option',
        onClick: undefined,
      });
    });

    it('is passed to the TextOption disabled prop when there children is a string', () => {
      const option = mountWithListboxProvider(
        <Option {...defaultProps} disabled>
          Child
        </Option>,
        {
          ...defaultContext,
        },
      );

      expect(option).toContainReactComponent(TextOption, {
        disabled: true,
      });
    });
  });

  describe('label', () => {
    it('is passed to the aria-label prop of option div', () => {
      const option = mountWithListboxProvider(<Option {...defaultProps} />, {
        ...defaultContext,
      });

      expect(option).toContainReactComponent('li', {
        role: 'option',
        'aria-label': defaultProps.accessibilityLabel,
      });
    });
  });

  describe('role', () => {
    it('defaults to option', () => {
      const option = mountWithListboxProvider(<Option {...defaultProps} />, {
        ...defaultContext,
      });

      expect(option).toContainReactComponent('li', {
        role: 'option',
      });
    });
  });

  describe('MappedAction', () => {
    it('uses the role provided from MappedAction', () => {
      const role = 'button';
      const option = mountWithListboxProvider(
        <MappedActionContext.Provider
          value={{
            role,
          }}
        >
          <Option {...defaultProps} />
        </MappedActionContext.Provider>,
        {
          ...defaultContext,
        },
      );

      expect(option).toContainReactComponent('li', {
        role,
      });
    });

    it('renders an UnstyledLink when url is supplied', () => {
      const option = mountWithListboxProvider(
        <MappedActionContext.Provider
          value={{
            url: 'google.com',
          }}
        >
          <Option {...defaultProps} />
        </MappedActionContext.Provider>,
        {
          ...defaultContext,
        },
      );

      expect(option).toContainReactComponent(UnstyledLink);
    });

    it('passes external to UnstyledLink', () => {
      const option = mountWithListboxProvider(
        <MappedActionContext.Provider
          value={{
            url: 'google.com',
            external: true,
          }}
        >
          <Option {...defaultProps} />
        </MappedActionContext.Provider>,
        {
          ...defaultContext,
        },
      );

      expect(option).toContainReactComponent(UnstyledLink, {external: true});
    });

    it('calls onAction when option clicked', () => {
      const onActionSpy = jest.fn();
      const option = mountWithListboxProvider(
        <MappedActionContext.Provider
          value={{
            onAction: onActionSpy,
          }}
        >
          <Option {...defaultProps} />
        </MappedActionContext.Provider>,
        {
          ...defaultContext,
        },
      );

      option
        .find('li', {
          role: 'option',
        })!
        .trigger('onClick', {
          preventDefault: () => {},
          stopPropagation: () => {},
        });

      expect(onActionSpy).toHaveBeenCalled();
    });

    it('does not invoke onOptionSelect during click events', () => {
      const onOptionSelectSpy = jest.fn();
      const option = mountWithListboxProvider(
        <MappedActionContext.Provider
          value={{
            onAction: () => {},
          }}
        >
          <Option {...defaultProps} />
        </MappedActionContext.Provider>,
        {
          ...defaultContext,
          onOptionSelect: onOptionSelectSpy,
        },
      );

      option
        .find('li', {
          role: 'option',
        })!
        .trigger('onClick', {
          preventDefault: () => {},
          stopPropagation: () => {},
        });

      expect(onOptionSelectSpy).not.toHaveBeenCalled();
    });
  });

  describe('divider', () => {
    it('renders an underline on the Option', () => {
      const option = mountWithListboxProvider(
        <Option {...defaultProps} divider />,
        {
          ...defaultContext,
        },
      );

      expect(option).toContainReactComponent('li', {
        role: 'option',
        className: 'Option divider',
      });
    });
  });
});

function noop() {}
