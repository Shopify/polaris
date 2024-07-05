import React, {useState} from 'react';
import {mountWithApp} from 'tests/utilities';

import {TextField} from '../../TextField';
import {Combobox} from '../Combobox';
import {Listbox} from '../../Listbox';
import {Popover} from '../../Popover';
import type {PopoverPublicAPI} from '../../Popover';
import {
  ComboboxTextFieldContext,
  ComboboxListboxContext,
} from '../../../utilities/combobox';
import {Key} from '../../../types';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useImperativeHandle: jest.fn(),
}));

const mockUseImperativeHandle: jest.Mock =
  jest.requireMock('react').useImperativeHandle;

describe('<Combobox />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const activator = (
    <TextField onChange={noop} label="" value="" autoComplete="off" />
  );
  const listbox = (
    <Listbox>
      <Listbox.Option accessibilityLabel="Option 1" value="option1" />
    </Listbox>
  );

  it('renders a Popover in the providers', () => {
    const combobox = mountWithApp(
      <Combobox activator={activator}>{listbox}</Combobox>,
    );

    expect(combobox).toContainReactComponent(Popover, {
      active: false,
      onClose: expect.any(Function),
      autofocusTarget: 'none',
      fullWidth: true,
      preferInputActivator: false,
    });
  });

  it('renders the activator in ComboboxTextFieldContext provider', () => {
    const combobox = mountWithApp(
      <Combobox activator={activator}>{listbox}</Combobox>,
    );

    expect(combobox.find(ComboboxTextFieldContext.Provider)).toHaveReactProps({
      children: activator,
    });
  });

  it('renders the popover children in a ComboboxListboxContext provider', () => {
    const combobox = mountWithApp(
      <Combobox activator={activator}>{listbox}</Combobox>,
    );

    triggerFocus(combobox);

    expect(
      combobox.find(ComboboxListboxContext.Provider),
    ).toContainReactComponent(Listbox);
  });

  it('does not open Popover when the ComboboxTextFieldContext onTextFieldFocus and there are no children', () => {
    const combobox = mountWithApp(<Combobox activator={activator} />);

    triggerFocus(combobox);

    expect(combobox).toContainReactComponent(Popover, {
      active: false,
    });
  });

  it('renders an active Popover when the activator is focused and there are children', () => {
    const combobox = mountWithApp(
      <Combobox activator={activator}>
        <Listbox>
          <Listbox.Option accessibilityLabel="Option 1" value="option1" />
        </Listbox>
      </Combobox>,
    );

    triggerFocus(combobox);

    expect(combobox).toContainReactComponent(Popover, {
      active: true,
    });
  });

  it('renders an active Popover when the text input has content and children depends on that text input', () => {
    function ComboboxWithHandledChange() {
      const handleChange = (value: string) => {
        setInputValue(value);
      };

      const [inputValue, setInputValue] = useState('');

      return (
        <Combobox
          activator={
            <Combobox.TextField
              onChange={handleChange}
              label=""
              value=""
              autoComplete="off"
            />
          }
        >
          {inputValue.length > 0 ? (
            <Listbox>
              <Listbox.Option accessibilityLabel="Option 1" value="option1" />
            </Listbox>
          ) : null}
        </Combobox>
      );
    }

    const combobox = mountWithApp(<ComboboxWithHandledChange />);

    combobox.find(TextField)?.trigger('onChange', 'value');

    expect(combobox).toContainReactComponent(Popover, {
      active: true,
    });
  });

  it('closes the Popover when onOptionSelected is triggered and allowMultiple is false', () => {
    const combobox = mountWithApp(
      <Combobox activator={activator}>
        <Listbox>
          <Listbox.Option accessibilityLabel="Option 1" value="option1" />
        </Listbox>
      </Combobox>,
    );

    triggerFocus(combobox);

    expect(combobox).toContainReactComponent(Popover, {
      active: true,
    });

    triggerOptionSelected(combobox);

    expect(combobox).toContainReactComponent(Popover, {
      active: false,
    });
  });

  it('does not close the Popover when onOptionSelected is triggered and allowMultiple is true and there are children', () => {
    const combobox = mountWithApp(
      <Combobox activator={activator} allowMultiple>
        <Listbox>
          <Listbox.Option accessibilityLabel="Option 1" value="option1" />
        </Listbox>
      </Combobox>,
    );

    triggerFocus(combobox);

    expect(combobox).toContainReactComponent(Popover, {
      active: true,
    });

    combobox
      .find(ComboboxListboxContext.Provider)!
      .triggerKeypath('value.onOptionSelected');

    expect(combobox).toContainReactComponent(Popover, {
      active: true,
    });
  });

  it('calls Popover.forceUpdatePosition() when onOptionSelected is triggered and allowMultiple is true and there are children', () => {
    const mockForceUpdatePosition = jest.fn();
    mockUseImperativeHandle.mockImplementation(
      (ref: {current: Partial<PopoverPublicAPI>}) => {
        ref.current = {
          forceUpdatePosition: mockForceUpdatePosition,
        };
      },
    );
    const combobox = mountWithApp(
      <Combobox activator={activator} allowMultiple>
        <Listbox>
          <Listbox.Option accessibilityLabel="Option 1" value="option1" />
        </Listbox>
      </Combobox>,
    );

    triggerFocus(combobox);

    combobox
      .find(ComboboxListboxContext.Provider)!
      .triggerKeypath('value.onOptionSelected');

    expect(mockForceUpdatePosition).toHaveBeenCalled();
  });

  it('calls the onScrolledToBottom when the Popovers onScrolledToBottom is triggered', () => {
    const onScrolledToBottomSpy = jest.fn();
    const combobox = mountWithApp(
      <Combobox
        onScrolledToBottom={onScrolledToBottomSpy}
        activator={activator}
        allowMultiple
      >
        <Listbox>
          <Listbox.Option accessibilityLabel="Option 1" value="option1" />
        </Listbox>
      </Combobox>,
    );

    triggerFocus(combobox);

    combobox.find(Popover.Pane)!.trigger('onScrolledToBottom');

    expect(onScrolledToBottomSpy).toHaveBeenCalled();
  });

  it('closes the Popover when onClose is called', () => {
    const combobox = mountWithApp(
      <Combobox activator={activator}>
        <Listbox>
          <Listbox.Option accessibilityLabel="Option 1" value="option1" />
        </Listbox>
      </Combobox>,
    );

    triggerFocus(combobox);
    combobox.find(Popover)?.trigger('onClose');

    expect(combobox).toContainReactComponent(Popover, {
      active: false,
    });
  });

  it('opens the Popover when the TextField activator is changed', () => {
    const activator = (
      <Combobox.TextField
        onChange={noop}
        label=""
        value=""
        autoComplete="off"
      />
    );
    const combobox = mountWithApp(
      <Combobox activator={activator}>
        <Listbox>
          <Listbox.Option accessibilityLabel="Option 1" value="option1" />
        </Listbox>
      </Combobox>,
    );

    combobox.find(TextField)?.trigger('onChange');

    expect(combobox).toContainReactComponent(Popover, {
      active: true,
    });
  });

  it('closes the Popover when TextField is blurred', () => {
    const activator = (
      <Combobox.TextField
        onChange={noop}
        label=""
        value=""
        autoComplete="off"
      />
    );
    const combobox = mountWithApp(
      <Combobox activator={activator}>
        <Listbox>
          <Listbox.Option accessibilityLabel="Option 1" value="option1" />
        </Listbox>
      </Combobox>,
    );

    triggerFocus(combobox);
    combobox.find(TextField)?.trigger('onBlur');

    expect(combobox).toContainReactComponent(Popover, {
      active: false,
    });
  });

  describe('popover', () => {
    it('defaults active to false', () => {
      const combobox = mountWithApp(<Combobox activator={activator} />);

      expect(combobox).toContainReactComponent(Popover, {
        active: false,
      });
    });

    it('has fullWidth', () => {
      const combobox = mountWithApp(<Combobox activator={activator} />);

      expect(combobox).toContainReactComponent(Popover, {
        fullWidth: true,
      });
    });

    it('has autofocusTarget of none', () => {
      const combobox = mountWithApp(<Combobox activator={activator} />);

      expect(combobox).toContainReactComponent(Popover, {
        autofocusTarget: 'none',
      });
    });

    it('sets active to false when escape is pressed', () => {
      const activator = (
        <Combobox.TextField
          onChange={noop}
          label=""
          value=""
          autoComplete="off"
        />
      );
      const combobox = mountWithApp(
        <Combobox activator={activator}>
          <Listbox>
            <Listbox.Option accessibilityLabel="Option 1" value="option1" />
          </Listbox>
        </Combobox>,
      );

      triggerFocus(combobox);

      const target = combobox.find(TextField)!.find('input')!.domNode;
      const keyupEvent = new KeyboardEvent('keyup', {
        keyCode: Key.Escape,
        bubbles: true,
      });

      combobox.act(() => {
        target?.dispatchEvent(keyupEvent);
      });

      expect(combobox).toContainReactComponent(Popover, {
        active: false,
      });
    });

    it('passes the preferredPosition', () => {
      const preferredPosition = 'above';
      const combobox = mountWithApp(
        <Combobox
          activator={activator}
          preferredPosition={preferredPosition}
        />,
      );

      expect(combobox).toContainReactComponent(Popover, {
        preferredPosition,
      });
    });

    it('passes the maxHeight', () => {
      const height = '100px';

      const combobox = mountWithApp(
        <Combobox activator={activator} height={height}>
          {listbox}
        </Combobox>,
      );

      triggerFocus(combobox);

      expect(combobox).toContainReactComponent(Popover.Pane, {
        height,
      });
    });

    it('does not render the Popover.Pane if no children are passed in', () => {
      const combobox = mountWithApp(<Combobox activator={activator} />);

      triggerFocus(combobox);

      expect(combobox).toContainReactComponent(Popover);
      expect(combobox).not.toContainReactComponent(Popover.Pane);
    });
  });

  describe('Context', () => {
    it('sets expanded to true on the ComboboxTextFieldContext when the popover is active', () => {
      const combobox = mountWithApp(
        <Combobox activator={activator}>
          <Listbox>
            <Listbox.Option accessibilityLabel="Option 1" value="option1" />
          </Listbox>
        </Combobox>,
      );

      triggerFocus(combobox);

      expect(
        combobox.find(ComboboxTextFieldContext.Provider)!.prop('value')!
          .expanded,
      ).toBe(true);
    });

    it('sets expanded to false on the ComboboxTextFieldContext when the popover is not active', () => {
      const combobox = mountWithApp(
        <Combobox activator={activator}>
          <Listbox>
            <Listbox.Option accessibilityLabel="Option 1" value="option1" />
          </Listbox>
        </Combobox>,
      );

      triggerFocus(combobox);

      combobox
        .find(ComboboxListboxContext.Provider)!
        .triggerKeypath('value.onOptionSelected');

      expect(
        combobox.find(ComboboxTextFieldContext.Provider)!.prop('value')!
          .expanded,
      ).toBe(false);
    });

    it('sets the activeOptionId on the ComboboxTextFieldContext to undefined the popover is not closed', () => {
      const combobox = mountWithApp(
        <Combobox activator={activator}>
          <Listbox>
            <Listbox.Option accessibilityLabel="Option 1" value="option1" />
          </Listbox>
        </Combobox>,
      );

      triggerFocus(combobox);

      combobox
        .find(ComboboxListboxContext.Provider)!
        .triggerKeypath('value.setActiveOptionId', 'id');

      expect(
        combobox.find(ComboboxTextFieldContext.Provider)!.prop('value')!
          .activeOptionId,
      ).toBe('id');

      triggerOptionSelected(combobox);

      expect(
        combobox.find(ComboboxTextFieldContext.Provider)!.prop('value')!
          .activeOptionId,
      ).toBeUndefined();
    });
  });
});

function triggerFocus(combobox: any) {
  combobox
    .find(ComboboxTextFieldContext.Provider)!
    .triggerKeypath('value.onTextFieldFocus');
}

function triggerOptionSelected(combobox: any) {
  combobox
    .find(ComboboxListboxContext.Provider)!
    .triggerKeypath('value.onOptionSelected');
}

function noop() {}
