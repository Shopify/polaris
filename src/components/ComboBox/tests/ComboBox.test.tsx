import React from 'react';
import {mountWithApp} from 'test-utilities';

import {TextField} from '../../TextField';
import {ComboBox} from '../ComboBox';
import {ListBox} from '../../ListBox';
import {Popover} from '../../Popover';
import {
  ComboBoxTextFieldContext,
  ComboBoxListBoxContext,
} from '../../../utilities/combo-box';
import {Key} from '../../../types';

describe('<ComboBox />', () => {
  const activator = <TextField onChange={noop} label="" value="" />;
  const listBox = (
    <ListBox>
      <ListBox.Option accessibilityLabel="Option 1" value="option1" />
    </ListBox>
  );

  it('renders a Popover in the providers', () => {
    const combobox = mountWithApp(
      <ComboBox activator={activator}>{listBox}</ComboBox>,
    );

    expect(combobox).toContainReactComponent(Popover, {
      active: false,
      onClose: expect.any(Function),
      autofocusTarget: 'none',
      fullWidth: true,
      preferInputActivator: false,
    });
  });

  it('renders the activator in ComboBoxTextFieldContext provider', () => {
    const combobox = mountWithApp(
      <ComboBox activator={activator}>{listBox}</ComboBox>,
    );

    expect(combobox.find(ComboBoxTextFieldContext.Provider)).toHaveReactProps({
      children: activator,
    });
  });

  it('renders the popover children in a ComboBoxListBoxContext provider', () => {
    const combobox = mountWithApp(
      <ComboBox activator={activator}>{listBox}</ComboBox>,
    );

    triggerFocus(combobox);

    expect(
      combobox.find(ComboBoxListBoxContext.Provider),
    ).toContainReactComponent(ListBox);
  });

  it('does not open Popover when the ComboBoxTextFieldContext onTextFieldFocus and there are no children', () => {
    const combobox = mountWithApp(<ComboBox activator={activator} />);

    triggerFocus(combobox);

    expect(combobox).toContainReactComponent(Popover, {
      active: false,
    });
  });

  it('renders an active Popover when the activator is focused and there are children', () => {
    const combobox = mountWithApp(
      <ComboBox activator={activator}>
        <ListBox>
          <ListBox.Option accessibilityLabel="Option 1" value="option1" />
        </ListBox>
      </ComboBox>,
    );

    triggerFocus(combobox);

    expect(combobox).toContainReactComponent(Popover, {
      active: true,
    });
  });

  it('closes the Popover when onOptionSelected is triggered and allowMultiple is false', () => {
    const combobox = mountWithApp(
      <ComboBox activator={activator}>
        <ListBox>
          <ListBox.Option accessibilityLabel="Option 1" value="option1" />
        </ListBox>
      </ComboBox>,
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
      <ComboBox activator={activator} allowMultiple>
        <ListBox>
          <ListBox.Option accessibilityLabel="Option 1" value="option1" />
        </ListBox>
      </ComboBox>,
    );

    triggerFocus(combobox);

    expect(combobox).toContainReactComponent(Popover, {
      active: true,
    });

    combobox
      .find(ComboBoxListBoxContext.Provider)!
      .triggerKeypath('value.onOptionSelected');

    expect(combobox).toContainReactComponent(Popover, {
      active: true,
    });
  });

  it('calls the onScrolledToBottom when the Popovers onScrolledToBottom is triggered', () => {
    const onScrolledToBottomSpy = jest.fn();
    const combobox = mountWithApp(
      <ComboBox
        onScrolledToBottom={onScrolledToBottomSpy}
        activator={activator}
        allowMultiple
      >
        <ListBox>
          <ListBox.Option accessibilityLabel="Option 1" value="option1" />
        </ListBox>
      </ComboBox>,
    );

    triggerFocus(combobox);

    combobox.find(Popover.Pane)!.trigger('onScrolledToBottom');

    expect(onScrolledToBottomSpy).toHaveBeenCalled();
  });

  it('closes the Popover when onClose is called', () => {
    const combobox = mountWithApp(
      <ComboBox activator={activator}>
        <ListBox>
          <ListBox.Option accessibilityLabel="Option 1" value="option1" />
        </ListBox>
      </ComboBox>,
    );

    triggerFocus(combobox);
    combobox.find(Popover)?.trigger('onClose');

    expect(combobox).toContainReactComponent(Popover, {
      active: false,
    });
  });

  it('opens the Popover when the TextField activator is changed', () => {
    const activator = <ComboBox.TextField onChange={noop} label="" value="" />;
    const combobox = mountWithApp(
      <ComboBox activator={activator}>
        <ListBox>
          <ListBox.Option accessibilityLabel="Option 1" value="option1" />
        </ListBox>
      </ComboBox>,
    );

    combobox.find(TextField)?.trigger('onChange');

    expect(combobox).toContainReactComponent(Popover, {
      active: true,
    });
  });

  it('closes the Popover when TextField is blurred', () => {
    const activator = <ComboBox.TextField onChange={noop} label="" value="" />;
    const combobox = mountWithApp(
      <ComboBox activator={activator}>
        <ListBox>
          <ListBox.Option accessibilityLabel="Option 1" value="option1" />
        </ListBox>
      </ComboBox>,
    );

    triggerFocus(combobox);
    combobox.find(TextField)?.trigger('onBlur');

    expect(combobox).toContainReactComponent(Popover, {
      active: false,
    });
  });

  describe('popover', () => {
    it('defaults active to false', () => {
      const combobox = mountWithApp(<ComboBox activator={activator} />);

      expect(combobox).toContainReactComponent(Popover, {
        active: false,
      });
    });

    it('has fullWidth', () => {
      const combobox = mountWithApp(<ComboBox activator={activator} />);

      expect(combobox).toContainReactComponent(Popover, {
        fullWidth: true,
      });
    });

    it('has autofocusTarget of none', () => {
      const combobox = mountWithApp(<ComboBox activator={activator} />);

      expect(combobox).toContainReactComponent(Popover, {
        autofocusTarget: 'none',
      });
    });

    it('sets active to false when escape is pressed', () => {
      const activator = (
        <ComboBox.TextField onChange={noop} label="" value="" />
      );
      const combobox = mountWithApp(
        <ComboBox activator={activator}>
          <ListBox>
            <ListBox.Option accessibilityLabel="Option 1" value="option1" />
          </ListBox>
        </ComboBox>,
      );

      triggerFocus(combobox);

      combobox.act(() => {
        dispatchKeyup(Key.Escape);
      });

      expect(combobox).toContainReactComponent(Popover, {
        active: false,
      });
    });

    it('passes the preferredPosition', () => {
      const preferredPosition = 'above';
      const combobox = mountWithApp(
        <ComboBox
          activator={activator}
          preferredPosition={preferredPosition}
        />,
      );

      expect(combobox).toContainReactComponent(Popover, {
        preferredPosition,
      });
    });
  });

  describe('Context', () => {
    it('sets expanded to true on the ComboBoxTextFieldContext when the popover is active', () => {
      const combobox = mountWithApp(
        <ComboBox activator={activator}>
          <ListBox>
            <ListBox.Option accessibilityLabel="Option 1" value="option1" />
          </ListBox>
        </ComboBox>,
      );

      triggerFocus(combobox);

      expect(
        combobox.find(ComboBoxTextFieldContext.Provider)!.prop('value')!
          .expanded,
      ).toBe(true);
    });

    it('sets expanded to false on the ComboBoxTextFieldContext when the popover is not active', () => {
      const combobox = mountWithApp(
        <ComboBox activator={activator}>
          <ListBox>
            <ListBox.Option accessibilityLabel="Option 1" value="option1" />
          </ListBox>
        </ComboBox>,
      );

      triggerFocus(combobox);

      combobox
        .find(ComboBoxListBoxContext.Provider)!
        .triggerKeypath('value.onOptionSelected');

      expect(
        combobox.find(ComboBoxTextFieldContext.Provider)!.prop('value')!
          .expanded,
      ).toBe(false);
    });

    it('sets the activeOptionId on the ComboBoxTextFieldContext to undefined the popover is not closed', () => {
      const combobox = mountWithApp(
        <ComboBox activator={activator}>
          <ListBox>
            <ListBox.Option accessibilityLabel="Option 1" value="option1" />
          </ListBox>
        </ComboBox>,
      );

      triggerFocus(combobox);

      combobox
        .find(ComboBoxListBoxContext.Provider)!
        .triggerKeypath('value.setActiveOptionId', 'id');

      expect(
        combobox.find(ComboBoxTextFieldContext.Provider)!.prop('value')!
          .activeOptionId,
      ).toBe('id');

      triggerOptionSelected(combobox);

      expect(
        combobox.find(ComboBoxTextFieldContext.Provider)!.prop('value')!
          .activeOptionId,
      ).toBeUndefined();
    });
  });
});

function triggerFocus(combobox: any) {
  combobox
    .find(ComboBoxTextFieldContext.Provider)!
    .triggerKeypath('value.onTextFieldFocus');
}

function triggerOptionSelected(combobox: any) {
  combobox
    .find(ComboBoxListBoxContext.Provider)!
    .triggerKeypath('value.onOptionSelected');
}

function noop() {}

function dispatchKeyup(key: Key) {
  const event: KeyboardEventInit & {keyCode: Key} = {keyCode: key};
  document.dispatchEvent(new KeyboardEvent('keyup', event));
}
