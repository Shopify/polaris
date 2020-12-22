import React, {useState} from 'react';
import {mountWithAppContext} from 'tests/modern';
import {animationFrame} from '@shopify/jest-dom-mocks';
import {
  Key,
  KeypressListener,
  Button,
  Scrollable,
  VisuallyHidden,
} from '@shopify/polaris';

import {ListBox} from '../ListBox';
import {ListBoxContext} from '../utilities/context/list-box';

import {mountWithComboBoxListContext} from './utilities';

const MockComponent = (props: any) => {
  const [optionState, setOptionState] = useState(false);
  return (
    <Scrollable>
      <Button
        onClick={() => {
          setOptionState((optionState) => !optionState);
        }}
      >
        Toggle
      </Button>
      <ListBox onSelect={() => {}} enableKeyboardControl {...props}>
        <ListBox.Option value="value 1" accessibilityLabel="one" selected>
          Option 1
        </ListBox.Option>
        <ListBox.Option
          value="value 2"
          accessibilityLabel="two"
          disabled={optionState}
        >
          Option 2
        </ListBox.Option>
        <ListBox.Option value="value 3" accessibilityLabel="three">
          Option 3
        </ListBox.Option>
      </ListBox>
    </Scrollable>
  );
};

const keyDown = new KeyboardEvent('keydown', {
  key: 'ArrowDown',
  bubbles: true,
});
const keyUp = new KeyboardEvent('keydown', {
  key: 'ArrowUp',
  bubbles: true,
});
const keyEnter = new KeyboardEvent('keydown', {
  key: 'Enter',
  bubbles: true,
});

describe('<ListBox>', () => {
  const defaultOptionProps = {value: 'value 1', accessibilityLabel: 'one'};

  describe('ul', () => {
    it('renders with tab index in order', async () => {
      const listBox = await mountWithAppContext(<ListBox>Child</ListBox>);

      expect(listBox).toContainReactComponent('ul', {tabIndex: 0});
    });

    it('renders with role="listbox"', async () => {
      const listBox = await mountWithAppContext(<ListBox>Child</ListBox>);

      expect(listBox).toContainReactComponent('ul', {role: 'listbox'});
    });

    it('renders with the accessibilityLabel prop as the aria label if not inside a combobox', async () => {
      const a11yLabel = 'some-label';
      const listBox = await mountWithAppContext(
        <ListBox accessibilityLabel={a11yLabel}>Child</ListBox>,
      );

      expect(listBox).toContainReactComponentTimes('ul', 1, {
        'aria-label': a11yLabel,
      });
    });

    it('renders without aria label if inside a combobox', async () => {
      const accessibilityLabel = 'some-label';
      const listBox = await mountWithComboBoxListContext(
        <ListBox accessibilityLabel={accessibilityLabel}>Child</ListBox>,
      );

      expect(listBox).toContainReactComponent('ul', {
        'aria-label': undefined,
      });
    });

    it('renders with aria labelledby with text field label id as the value when in a combobox', async () => {
      const textFieldLabelId = 'some-id';
      const listBox = await mountWithComboBoxListContext(
        <ListBox>Child</ListBox>,
        {textFieldLabelId},
      );

      expect(listBox).toContainReactComponent('ul', {
        'aria-labelledby': textFieldLabelId,
      });
    });

    it('renders with aria busy equalling the loading status', async () => {
      const listBox = await mountWithAppContext(
        <ListBox>
          <ListBox.Loading />
        </ListBox>,
      );

      expect(listBox).toContainReactComponent('ul', {
        'aria-busy': true,
      });
    });

    it('renders with aria activedescendant with an id when an option is active', async () => {
      const listBox = await mountWithAppContext(
        <ListBox enableKeyboardControl>
          <ListBox.Option {...defaultOptionProps}>Option 1</ListBox.Option>
        </ListBox>,
      );

      triggerDown(listBox);

      expect(listBox).toContainReactComponent('ul', {
        'aria-activedescendant': expect.any(String),
      });
    });

    it('renders with aria activedescendant with a value of false when an option is not active', async () => {
      const listBox = await mountWithAppContext(
        <ListBox enableKeyboardControl>
          <ListBox.Option {...defaultOptionProps}>Option 1</ListBox.Option>
        </ListBox>,
      );

      expect(listBox).toContainReactComponentTimes('ul', 1, {
        'aria-activedescendant': undefined,
      });
    });

    it('renders with id', async () => {
      const listBox = await mountWithAppContext(<ListBox>Child</ListBox>);

      expect(listBox).toContainReactComponent('ul', {
        id: expect.any(String),
      });
    });

    describe('focus', () => {
      it('renders with onFocus when not inside a combobox', async () => {
        const listBox = await mountWithAppContext(<ListBox>Child</ListBox>);

        expect(listBox).toContainReactComponentTimes('ul', 1, {
          onFocus: expect.any(Function),
        });
      });

      it('renders without onFocus when inside a combobox', async () => {
        const listBox = await mountWithComboBoxListContext(
          <ListBox>Child</ListBox>,
          {setActiveOptionId: () => {}},
        );

        expect(listBox).toContainReactComponent('ul', {
          onFocus: undefined,
        });
      });
    });

    describe('blur', () => {
      it('renders with onblur when not inside a combobox', async () => {
        const listBox = await mountWithAppContext(<ListBox>Child</ListBox>);

        expect(listBox).toContainReactComponentTimes('ul', 1, {
          onBlur: expect.any(Function),
        });
      });

      it('renders without onblur when inside a combobox', async () => {
        const listBox = await mountWithComboBoxListContext(
          <ListBox>Child</ListBox>,
          {setActiveOptionId: () => {}},
        );

        expect(listBox).toContainReactComponent('ul', {
          onBlur: undefined,
        });
      });

      it('resets current active option on blur if keyboard events are enabled outside a combobox', async () => {
        const listBox = await mountWithAppContext(
          <ListBox enableKeyboardControl>
            <ListBox.Option {...defaultOptionProps}>Option 1</ListBox.Option>
          </ListBox>,
        );

        triggerDown(listBox);

        listBox.find('ul')!.trigger('onBlur', {stopPropagation: () => {}});

        expect(listBox).toContainReactComponentTimes('ul', 1, {
          'aria-activedescendant': undefined,
        });
      });
    });
  });

  describe('loading', () => {
    const loadingMessage = 'items are loading';

    it('render a visually hidden container', async () => {
      const listBox = await mountWithAppContext(<ListBox>Child</ListBox>);

      expect(listBox).toContainReactComponentTimes(VisuallyHidden, 1);
    });

    it('render an aria-live="polite" container', async () => {
      const listBox = await mountWithAppContext(<ListBox>Child</ListBox>);

      expect(listBox.find(VisuallyHidden)).toContainReactComponent('div', {
        'aria-live': 'polite',
      });
    });

    it('renders an empty loading container by default', async () => {
      const listBox = await mountWithAppContext(<ListBox>Child</ListBox>);

      expect(listBox.find(VisuallyHidden)).not.toContainReactText(
        loadingMessage,
      );
    });

    it('renders a loading message when loading is true', async () => {
      const listBox = await mountWithAppContext(
        <ListBox>
          <ListBox.Loading />
        </ListBox>,
      );

      expect(listBox.find(VisuallyHidden)).toContainReactText(loadingMessage);
    });
  });

  describe('listbox context', () => {
    it('renders listBox provider', async () => {
      const listBox = await mountWithAppContext(<ListBox>Child</ListBox>);

      expect(listBox).toContainReactComponent(ListBoxContext.Provider);
    });
  });

  it('calls setListBoxId on the combobox context with the list id', async () => {
    const setListBoxIdSpy = jest.fn();
    await mountWithComboBoxListContext(<ListBox>Child</ListBox>, {
      setListBoxId: setListBoxIdSpy,
    });

    expect(setListBoxIdSpy).toHaveBeenCalledWith(expect.any(String));
  });

  it('passes `accessibilityLabel` to the lists aria-label attribute', async () => {
    const wrapper = await mountWithAppContext(
      <MockComponent accessibilityLabel="test" />,
    );

    expect(wrapper).toContainReactComponent('ul', {'aria-label': 'test'});
  });

  it('renders children', async () => {
    const wrapper = await mountWithAppContext(<MockComponent />);

    expect(wrapper).toContainReactComponent(ListBox.Option);
  });

  it('scrolls selected option into view when outside scrollable view', async () => {
    animationFrame.mock();
    const scrollIntoSpy = jest.fn();
    const wrapper = await mountWithAppContext(<MockComponent />);
    const option3 = wrapper.findAll(ListBox.Option)[2]!;

    option3.domNode!.scrollIntoView = scrollIntoSpy;
    const scrollable = option3.domNode?.closest('[data-polaris-scrollable]')!;

    scrollable.scrollTop = -2;

    triggerUp(wrapper);

    expect(option3.domNode!.getAttribute('data-focused')).toBe('true');

    animationFrame.runFrame();

    expect(scrollIntoSpy).toHaveBeenCalled();

    animationFrame.restore();
  });

  describe('KeypressListenner', () => {
    describe('keyboardEventsEnabled prop', () => {
      it('renders the KeypressListenners when enableKeyboardControl is true', async () => {
        const listBox = await mountWithAppContext(
          <ListBox enableKeyboardControl>Child</ListBox>,
        );

        const listenners = listBox.findAll(KeypressListener);

        expect(listenners).toHaveLength(3);
        expect(listenners[0]).toHaveReactProps({keyCode: Key.DownArrow});
        expect(listenners[1]).toHaveReactProps({keyCode: Key.UpArrow});
        expect(listenners[2]).toHaveReactProps({keyCode: Key.Enter});
      });

      it('does not render the KeypressListenners when enableKeyboardControl is false', async () => {
        const listBox = await mountWithAppContext(
          <ListBox enableKeyboardControl={false}>Child</ListBox>,
        );

        expect(listBox).not.toContainReactComponent(KeypressListener);
      });
    });

    describe('combobox textfield focused', () => {
      it('renders the KeypressListenners when the combobox textfield is focused', async () => {
        const listBox = await mountWithComboBoxListContext(
          <ListBox>Child</ListBox>,
          {textFieldFocused: true},
        );

        const listenners = listBox.findAll(KeypressListener);

        expect(listenners).toHaveLength(3);
        expect(listenners[0]).toHaveReactProps({keyCode: Key.DownArrow});
        expect(listenners[1]).toHaveReactProps({keyCode: Key.UpArrow});
        expect(listenners[2]).toHaveReactProps({keyCode: Key.Enter});
      });

      it('does not render the KeypressListenners when the combobox textfield is no focused', async () => {
        const listbox = await mountWithComboBoxListContext(
          <ListBox>Child</ListBox>,
        );

        expect(listbox).not.toContainReactComponent(KeypressListener);
      });
    });

    describe('focusing the list', () => {
      it('renders the KeypressListenners onFocus', async () => {
        const wrapper = await mountWithAppContext(
          <MockComponent enableKeyboardControl={false} />,
        );

        expect(wrapper).not.toContainReactComponent(KeypressListener);

        wrapper.find('ul', {role: 'listbox'})!.trigger('onFocus');

        const listenners = wrapper.findAll(KeypressListener);

        expect(listenners).toHaveLength(3);
        expect(listenners[0]).toHaveReactProps({keyCode: Key.DownArrow});
        expect(listenners[1]).toHaveReactProps({keyCode: Key.UpArrow});
        expect(listenners[2]).toHaveReactProps({keyCode: Key.Enter});
      });
    });

    describe('blurring the list', () => {
      it('removes the KeypressListenners onBlur', async () => {
        const wrapper = await mountWithAppContext(
          <MockComponent enableKeyboardControl={false} />,
        );

        expect(wrapper).not.toContainReactComponent(KeypressListener);

        wrapper.find('ul', {role: 'listbox'})!.trigger('onFocus');

        const listenners = wrapper.findAll(KeypressListener);

        expect(listenners).toHaveLength(3);

        wrapper
          .find('ul', {role: 'listbox'})!
          .trigger('onBlur', {stopPropagation: () => {}});

        expect(wrapper).not.toContainReactComponent(KeypressListener);
      });

      it('does not remove the KeypressListenners onBlur if enableKeyboardControl is true', async () => {
        const wrapper = await mountWithAppContext(
          <MockComponent enableKeyboardControl />,
        );

        expect(wrapper.findAll(KeypressListener)).toHaveLength(3);

        wrapper
          .find('ul', {role: 'listbox'})!
          .trigger('onBlur', {stopPropagation: () => {}});

        expect(wrapper.findAll(KeypressListener)).toHaveLength(3);
      });
    });
  });

  describe('Keyboard control', () => {
    describe('down arrow', () => {
      it('move the data-focused attribute to true of the selected list item', async () => {
        const wrapper = await mountWithAppContext(<MockComponent />);

        const options = wrapper.findAll(ListBox.Option);

        expect(options[0].domNode!.getAttribute('data-focused')).toBeNull();

        triggerDown(wrapper);

        expect(options[0].domNode!.getAttribute('data-focused')).toBe('true');

        triggerDown(wrapper);

        expect(options[0].domNode!.getAttribute('data-focused')).toBeNull();
        expect(options[1].domNode!.getAttribute('data-focused')).toBe('true');
      });

      it('set the active-descendant attribute of the list to the id of the focused element', async () => {
        const wrapper = await mountWithAppContext(<MockComponent />);
        const listBox = wrapper.find('ul', {role: 'listbox'})!;
        const options = wrapper.findAll(ListBox.Option);

        expect(
          listBox.domNode!.getAttribute('aria-activedescendant'),
        ).toBeNull();

        triggerDown(wrapper);

        expect(listBox.domNode!.getAttribute('aria-activedescendant')).toBe(
          options[0].domNode!.id,
        );

        triggerDown(wrapper);

        expect(listBox.domNode!.getAttribute('aria-activedescendant')).toBe(
          options[1].domNode!.id,
        );
      });

      it('move the focus back to the first option when the bottom of the list is reached', async () => {
        const wrapper = await mountWithAppContext(<MockComponent />);
        const options = wrapper.findAll(ListBox.Option);

        expect(options[0].domNode!.getAttribute('data-focused')).toBeNull();

        triggerDown(wrapper);
        triggerDown(wrapper);
        triggerDown(wrapper);
        triggerDown(wrapper);

        expect(options[0].domNode!.getAttribute('data-focused')).toBe('true');
      });

      it('skips disabled options', async () => {
        const wrapper = await mountWithAppContext(<MockComponent />);
        const options = wrapper.findAll(ListBox.Option);

        wrapper.find(Button)!.trigger('onClick');

        triggerDown(wrapper);

        expect(options[0].domNode!.getAttribute('data-focused')).toBe('true');

        triggerDown(wrapper);

        expect(options[0].domNode!.getAttribute('data-focused')).toBeNull();
        expect(options[2].domNode!.getAttribute('data-focused')).toBe('true');
      });
    });

    describe('up arrow', () => {
      it('move the data-focused attribute to true of the selected list item', async () => {
        const wrapper = await mountWithAppContext(<MockComponent />);

        const options = wrapper.findAll(ListBox.Option);

        expect(options[2].domNode!.getAttribute('data-focused')).toBeNull();

        triggerUp(wrapper);

        expect(options[2].domNode!.getAttribute('data-focused')).toBe('true');

        triggerUp(wrapper);

        expect(options[2].domNode!.getAttribute('data-focused')).toBeNull();
        expect(options[1].domNode!.getAttribute('data-focused')).toBe('true');
      });

      it('set the active-descendant attribute of the list to the id of the focused element', async () => {
        const wrapper = await mountWithAppContext(<MockComponent />);
        const listBox = wrapper.find('ul', {role: 'listbox'})!;
        const options = wrapper.findAll(ListBox.Option);

        expect(
          listBox.domNode!.getAttribute('aria-activedescendant'),
        ).toBeNull();

        triggerUp(wrapper);

        expect(listBox.domNode!.getAttribute('aria-activedescendant')).toBe(
          options[2].domNode!.id,
        );

        triggerUp(wrapper);

        expect(listBox.domNode!.getAttribute('aria-activedescendant')).toBe(
          options[1].domNode!.id,
        );
      });

      it('move the focus back to the last option when the top of the list is reached', async () => {
        const wrapper = await mountWithAppContext(<MockComponent />);
        const options = wrapper.findAll(ListBox.Option);

        expect(options[2].domNode!.getAttribute('data-focused')).toBeNull();

        triggerUp(wrapper);
        triggerUp(wrapper);
        triggerUp(wrapper);
        triggerUp(wrapper);

        expect(options[2].domNode!.getAttribute('data-focused')).toBe('true');
      });

      it('skips disabled options', async () => {
        const wrapper = await mountWithAppContext(<MockComponent />);
        const options = wrapper.findAll(ListBox.Option);

        wrapper.find(Button)!.trigger('onClick');

        triggerUp(wrapper);

        expect(options[2].domNode!.getAttribute('data-focused')).toBe('true');

        triggerUp(wrapper);

        expect(options[0].domNode!.getAttribute('data-focused')).toBe('true');
        expect(options[2].domNode!.getAttribute('data-focused')).toBeNull();
      });
    });

    describe('enter', () => {
      it('calls onOptionSelect with the data-listbox-option-value when enter is pressed', async () => {
        const onSelect = jest.fn();
        const wrapper = await mountWithAppContext(
          <MockComponent onSelect={onSelect} />,
        );
        const option = wrapper.find(ListBox.Option);
        triggerDown(wrapper);

        triggerEnter(wrapper);

        expect(onSelect).toHaveBeenCalledWith(
          option!.domNode!.getAttribute('data-listbox-option-value'),
        );
      });
    });
  });

  describe('Keyboard control in combobox', () => {
    it('calls setActiveOptionId on the combobox context with the option id when an option is focused', async () => {
      const setActiveOptionIdSpy = jest.fn();
      const wrapper = await mountWithComboBoxListContext(<MockComponent />, {
        setActiveOptionId: setActiveOptionIdSpy,
      });
      const option = wrapper.find(ListBox.Option);
      triggerDown(wrapper);

      expect(setActiveOptionIdSpy).toHaveBeenCalledWith(option!.domNode!.id);
    });

    it('calls onOptionSelected on the combobox context when an option is focused and enter is pressed', async () => {
      const onOptionSelectedSpy = jest.fn();
      const wrapper = await mountWithComboBoxListContext(<MockComponent />, {
        onOptionSelected: onOptionSelectedSpy,
      });

      triggerDown(wrapper);
      triggerEnter(wrapper);

      expect(onOptionSelectedSpy).toHaveBeenCalled();
    });

    it('calls onKeyToBottom on the combobox when the last item is focused', async () => {
      const onKeyToBottomSpy = jest.fn();
      const wrapper = await mountWithComboBoxListContext(<MockComponent />, {
        onKeyToBottom: onKeyToBottomSpy,
      });
      triggerUp(wrapper);

      expect(onKeyToBottomSpy).toHaveBeenCalled();
    });
  });
});

function triggerDown(component: any) {
  component
    .find(KeypressListener, {keyCode: Key.DownArrow})!
    .trigger('handler', keyDown);
}

function triggerUp(component: any) {
  component
    .find(KeypressListener, {keyCode: Key.UpArrow})!
    .trigger('handler', keyUp);
}

function triggerEnter(component: any) {
  component
    .find(KeypressListener, {keyCode: Key.Enter})!
    .trigger('handler', keyEnter);
}
