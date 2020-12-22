import React from 'react';
import {mountWithAppContext} from 'tests/modern';
import {Popover, TextField} from '@shopify/polaris';
import {noop} from '@web-utilities/other';

import {ComboBox} from '../ComboBox';
import {ListBox} from '../../ListBox';
import {
  ComboBoxTextFieldContext,
  ComboBoxListBoxContext,
} from '../utilities/combo-box';

describe('<ComboBox />', () => {
  const activator = <TextField onChange={noop} label="" value="" />;
  const listBox = (
    <ListBox>
      <ListBox.Option accessibilityLabel="Option 1" value="option1" />
    </ListBox>
  );

  it('renders a Popover in the providers', async () => {
    const combobox = await mountWithAppContext(
      <ComboBox activator={activator}>{listBox}</ComboBox>,
    );

    expect(combobox).toContainReactComponent(Popover, {
      active: false,
      onClose: expect.any(Function),
      preventAutofocus: true,
      fullWidth: true,
      preferInputActivator: false,
    });
  });

  it('renders the activator in ComboBoxTextFieldContext provider', async () => {
    const combobox = await mountWithAppContext(
      <ComboBox activator={activator}>{listBox}</ComboBox>,
    );

    expect(combobox.find(ComboBoxTextFieldContext.Provider)).toHaveReactProps({
      children: activator,
    });
  });

  it('renders the popover children in a ComboBoxListBoxContext provider', async () => {
    const combobox = await mountWithAppContext(
      <ComboBox activator={activator}>{listBox}</ComboBox>,
    );

    triggerFocus(combobox);

    expect(
      combobox.find(ComboBoxListBoxContext.Provider),
    ).toContainReactComponent(ListBox);
  });

  it('does not open Popover when the ComboBoxTextFieldContext onTextFieldFocus and there are no children', async () => {
    const combobox = await mountWithAppContext(
      <ComboBox activator={activator} />,
    );

    triggerFocus(combobox);

    expect(combobox).toContainReactComponent(Popover, {
      active: false,
    });
  });

  it('renders an active Popover when the activator is focused and there are children', async () => {
    const combobox = await mountWithAppContext(
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

  it('closes the Popover when onOptionSelected is triggered and allowMultiple is false', async () => {
    const combobox = await mountWithAppContext(
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

  it('does not close the Popover when onOptionSelected is triggered and allowMultiple is true and there are children', async () => {
    const combobox = await mountWithAppContext(
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

  it('calls the onScrolledToBottom when the Popovers onScrolledToBottom is triggered', async () => {
    const onScrolledToBottomSpy = jest.fn();
    const combobox = await mountWithAppContext(
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

  describe('Context', () => {
    it('sets expanded to true on the ComboBoxTextFieldContext when the popover is active', async () => {
      const combobox = await mountWithAppContext(
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
      ).toBeTrue();
    });

    it('sets expanded to false on the ComboBoxTextFieldContext when the popover is not active', async () => {
      const combobox = await mountWithAppContext(
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
      ).toBeFalse();
    });

    it('sets the activeOptionId on the ComboBoxTextFieldContext to undefined the popover is not closed', async () => {
      const combobox = await mountWithAppContext(
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
