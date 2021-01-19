import React, {useState} from 'react';
import {mountWithApp} from 'test-utilities';
import {animationFrame} from '@shopify/jest-dom-mocks';
import {KeypressListener, Button, Scrollable, VisuallyHidden} from 'components';
import {Key} from 'types';

import {ListBox} from '../ListBox';
import {ListBoxContext} from '../utilities/context/list-box';

import {
  mountWithComboBoxListContext,
  mountWithListBoxProvider,
} from './utilities';

const MockComponent = ({enableKeyboardControl = true, ...props}: any) => {
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
      <ListBox
        onSelect={() => {}}
        enableKeyboardControl={enableKeyboardControl}
        {...props}
      >
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
  const defaultLoadingProps = {accessibilityLabel: 'accessibility label'};

  describe('ul', () => {
    it('renders with tab index in order', () => {
      const listBox = mountWithApp(<ListBox>Child</ListBox>);

      expect(listBox).toContainReactComponent('ul', {tabIndex: 0});
    });

    it('renders with role="listbox"', () => {
      const listBox = mountWithApp(<ListBox>Child</ListBox>);

      expect(listBox).toContainReactComponent('ul', {role: 'listbox'});
    });

    it('renders with the accessibilityLabel prop as the aria label if not inside a combobox', () => {
      const a11yLabel = 'some-label';
      const listBox = mountWithApp(
        <ListBox accessibilityLabel={a11yLabel}>Child</ListBox>,
      );

      expect(listBox).toContainReactComponentTimes('ul', 1, {
        'aria-label': a11yLabel,
      });
    });

    it('renders without aria label if inside a combobox', () => {
      const accessibilityLabel = 'some-label';
      const listBox = mountWithComboBoxListContext(
        <ListBox accessibilityLabel={accessibilityLabel}>Child</ListBox>,
      );

      expect(listBox).toContainReactComponent('ul', {
        'aria-label': undefined,
      });
    });

    it('renders with aria labelledby with text field label id as the value when in a combobox', () => {
      const textFieldLabelId = 'some-id';
      const listBox = mountWithComboBoxListContext(<ListBox>Child</ListBox>, {
        textFieldLabelId,
      });

      expect(listBox).toContainReactComponent('ul', {
        'aria-labelledby': textFieldLabelId,
      });
    });

    it('renders with aria busy equalling the loading status', () => {
      const listBox = mountWithApp(
        <ListBox>
          <ListBox.Loading {...defaultLoadingProps} />
        </ListBox>,
      );

      expect(listBox).toContainReactComponent('ul', {
        'aria-busy': true,
      });
    });

    it('renders with aria activedescendant with an id when an option is active', () => {
      const listBox = mountWithApp(
        <ListBox enableKeyboardControl>
          <ListBox.Option {...defaultOptionProps}>Option 1</ListBox.Option>
        </ListBox>,
      );

      triggerDown(listBox);

      expect(listBox).toContainReactComponent('ul', {
        'aria-activedescendant': expect.any(String),
      });
    });

    it('renders with aria activedescendant with a value of false when an option is not active', () => {
      const listBox = mountWithApp(
        <ListBox enableKeyboardControl>
          <ListBox.Option {...defaultOptionProps}>Option 1</ListBox.Option>
        </ListBox>,
      );

      expect(listBox).toContainReactComponentTimes('ul', 1, {
        'aria-activedescendant': undefined,
      });
    });

    it('renders with id', () => {
      const listBox = mountWithApp(<ListBox>Child</ListBox>);

      expect(listBox).toContainReactComponent('ul', {
        id: expect.any(String),
      });
    });

    describe('focus', () => {
      it('renders with onFocus when not inside a combobox', () => {
        const listBox = mountWithApp(<ListBox>Child</ListBox>);

        expect(listBox).toContainReactComponentTimes('ul', 1, {
          onFocus: expect.any(Function),
        });
      });

      it('renders without onFocus when inside a combobox', () => {
        const listBox = mountWithComboBoxListContext(<ListBox>Child</ListBox>, {
          setActiveOptionId: () => {},
        });

        expect(listBox).toContainReactComponent('ul', {
          onFocus: undefined,
        });
      });

      it('keeps keyboard events enable while focusing and keyboard events are already enabled', () => {
        const listBox = mountWithApp(
          <ListBox enableKeyboardControl>Child</ListBox>,
        );

        listBox.find('ul')!.trigger('onFocus');

        expect(listBox).toContainReactComponentTimes(KeypressListener, 3);
      });
    });

    describe('blur', () => {
      it('renders with onblur when not inside a combobox', () => {
        const listBox = mountWithApp(<ListBox>Child</ListBox>);

        expect(listBox).toContainReactComponentTimes('ul', 1, {
          onBlur: expect.any(Function),
        });
      });

      it('renders without onblur when inside a combobox', () => {
        const listBox = mountWithComboBoxListContext(<ListBox>Child</ListBox>, {
          setActiveOptionId: () => {},
        });

        expect(listBox).toContainReactComponent('ul', {
          onBlur: undefined,
        });
      });

      it('resets current active option on blur if keyboard events are enabled outside a combobox', () => {
        const listBox = mountWithApp(
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

    it('render a visually hidden container', () => {
      const listBox = mountWithApp(<ListBox>Child</ListBox>);

      expect(listBox).toContainReactComponentTimes(VisuallyHidden, 1);
    });

    it('render an aria-live="polite" container', () => {
      const listBox = mountWithApp(<ListBox>Child</ListBox>);

      expect(listBox.find(VisuallyHidden)).toContainReactComponent('div', {
        'aria-live': 'polite',
      });
    });

    it('renders an empty loading container by default', () => {
      const listBox = mountWithApp(<ListBox>Child</ListBox>);

      expect(listBox.find(VisuallyHidden)).not.toContainReactText(
        loadingMessage,
      );
    });

    it('renders a loading message when loading is true', () => {
      const listBox = mountWithApp(
        <ListBox>
          <ListBox.Loading accessibilityLabel={loadingMessage} />
        </ListBox>,
      );

      expect(listBox.find(VisuallyHidden)).toContainReactText(loadingMessage);
    });
  });

  describe('listbox context', () => {
    it('renders listBox provider', () => {
      const listBox = mountWithApp(<ListBox>Child</ListBox>);

      expect(listBox).toContainReactComponent(ListBoxContext.Provider);
    });
  });

  it('calls setListBoxId on the combobox context with the list id', () => {
    const setListBoxIdSpy = jest.fn();
    mountWithComboBoxListContext(<ListBox>Child</ListBox>, {
      setListBoxId: setListBoxIdSpy,
    });

    expect(setListBoxIdSpy).toHaveBeenCalledWith(expect.any(String));
  });

  it('passes `accessibilityLabel` to the lists aria-label attribute', () => {
    const wrapper = mountWithApp(<MockComponent accessibilityLabel="test" />);

    expect(wrapper).toContainReactComponent('ul', {'aria-label': 'test'});
  });

  it('renders children', () => {
    const wrapper = mountWithApp(<MockComponent />);

    expect(wrapper).toContainReactComponent(ListBox.Option);
  });

  it('does not render a ul when children are null', () => {
    const listBox = mountWithApp(
      <ListBox enableKeyboardControl>{null}</ListBox>,
    );

    expect(listBox).not.toContainReactComponent('ul');
  });

  it('scrolls selected option into view when outside scrollable view', () => {
    animationFrame.mock();
    const scrollIntoSpy = jest.fn();
    const wrapper = mountWithApp(<MockComponent />);
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
      it('renders the KeypressListenners when enableKeyboardControl is true', () => {
        const listBox = mountWithApp(
          <ListBox enableKeyboardControl>Child</ListBox>,
        );

        const listenners = listBox.findAll(KeypressListener);

        expect(listenners).toHaveLength(3);
        expect(listenners[0]).toHaveReactProps({keyCode: Key.DownArrow});
        expect(listenners[1]).toHaveReactProps({keyCode: Key.UpArrow});
        expect(listenners[2]).toHaveReactProps({keyCode: Key.Enter});
      });

      it('does not render the KeypressListenners when enableKeyboardControl is false', () => {
        const listBox = mountWithApp(
          <ListBox enableKeyboardControl={false}>Child</ListBox>,
        );

        expect(listBox).not.toContainReactComponent(KeypressListener);
      });
    });

    describe('combobox textfield focused', () => {
      it('renders the KeypressListenners when the combobox textfield is focused', () => {
        const listBox = mountWithComboBoxListContext(<ListBox>Child</ListBox>, {
          textFieldFocused: true,
        });

        const listenners = listBox.findAll(KeypressListener);

        expect(listenners).toHaveLength(3);
        expect(listenners[0]).toHaveReactProps({keyCode: Key.DownArrow});
        expect(listenners[1]).toHaveReactProps({keyCode: Key.UpArrow});
        expect(listenners[2]).toHaveReactProps({keyCode: Key.Enter});
      });

      it('does not render the KeypressListenners when the combobox textfield is no focused', () => {
        const listbox = mountWithComboBoxListContext(<ListBox>Child</ListBox>);

        expect(listbox).not.toContainReactComponent(KeypressListener);
      });
    });

    describe('focusing the list', () => {
      it('renders the KeypressListenners onFocus', () => {
        const wrapper = mountWithApp(
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
      it('removes the KeypressListenners onBlur', () => {
        const wrapper = mountWithApp(
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

      it('does not remove the KeypressListenners onBlur if enableKeyboardControl is true', () => {
        const wrapper = mountWithApp(<MockComponent enableKeyboardControl />);

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
      it('move the data-focused attribute to true of the selected list item', () => {
        const wrapper = mountWithApp(<MockComponent />);

        const options = wrapper.findAll(ListBox.Option);

        expect(options[0].domNode!.getAttribute('data-focused')).toBeNull();

        triggerDown(wrapper);

        expect(options[0].domNode!.getAttribute('data-focused')).toBe('true');

        triggerDown(wrapper);

        expect(options[0].domNode!.getAttribute('data-focused')).toBeNull();
        expect(options[1].domNode!.getAttribute('data-focused')).toBe('true');
      });

      it('set the active-descendant attribute of the list to the id of the focused element', () => {
        const wrapper = mountWithApp(<MockComponent />);
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

      it('move the focus back to the first option when the bottom of the list is reached', () => {
        const wrapper = mountWithApp(<MockComponent />);
        const options = wrapper.findAll(ListBox.Option);

        expect(options[0].domNode!.getAttribute('data-focused')).toBeNull();

        triggerDown(wrapper);
        triggerDown(wrapper);
        triggerDown(wrapper);
        triggerDown(wrapper);

        expect(options[0].domNode!.getAttribute('data-focused')).toBe('true');
      });

      it('skips disabled options', () => {
        const wrapper = mountWithApp(<MockComponent />);
        const options = wrapper.findAll(ListBox.Option);

        wrapper.find(Button)!.trigger('onClick');

        triggerDown(wrapper);

        expect(options[0].domNode!.getAttribute('data-focused')).toBe('true');

        triggerDown(wrapper);

        expect(options[0].domNode!.getAttribute('data-focused')).toBeNull();
        expect(options[2].domNode!.getAttribute('data-focused')).toBe('true');
      });

      it('does not focus a disabled element when all elements are disabled', () => {
        const setActiveOptionIdSpy = jest.fn();
        const listbox = mountWithComboBoxListContext(
          <ListBox enableKeyboardControl>
            <ListBox.Option disabled value="valueOne" />
            <ListBox.Option disabled value="valueTwo" />
          </ListBox>,
          {
            setActiveOptionId: setActiveOptionIdSpy,
          },
        );

        triggerDown(listbox);

        expect(setActiveOptionIdSpy).not.toHaveBeenCalled();
      });
    });

    describe('up arrow', () => {
      it('move the data-focused attribute to true of the selected list item', () => {
        const wrapper = mountWithApp(<MockComponent />);

        const options = wrapper.findAll(ListBox.Option);

        expect(options[2].domNode!.getAttribute('data-focused')).toBeNull();

        triggerUp(wrapper);

        expect(options[2].domNode!.getAttribute('data-focused')).toBe('true');

        triggerUp(wrapper);

        expect(options[2].domNode!.getAttribute('data-focused')).toBeNull();
        expect(options[1].domNode!.getAttribute('data-focused')).toBe('true');
      });

      it('set the active-descendant attribute of the list to the id of the focused element', () => {
        const wrapper = mountWithApp(<MockComponent />);
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

      it('move the focus back to the last option when the top of the list is reached', () => {
        const wrapper = mountWithApp(<MockComponent />);
        const options = wrapper.findAll(ListBox.Option);

        expect(options[2].domNode!.getAttribute('data-focused')).toBeNull();

        triggerUp(wrapper);
        triggerUp(wrapper);
        triggerUp(wrapper);
        triggerUp(wrapper);

        expect(options[2].domNode!.getAttribute('data-focused')).toBe('true');
      });

      it('skips disabled options', () => {
        const wrapper = mountWithApp(<MockComponent />);
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
      it('calls onOptionSelect with the data-listbox-option-value when enter is pressed', () => {
        const onSelect = jest.fn();
        const wrapper = mountWithApp(<MockComponent onSelect={onSelect} />);
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
    it('calls setActiveOptionId on the combobox context with the option id when an option is focused', () => {
      const setActiveOptionIdSpy = jest.fn();
      const wrapper = mountWithComboBoxListContext(<MockComponent />, {
        setActiveOptionId: setActiveOptionIdSpy,
      });
      const option = wrapper.find(ListBox.Option);
      triggerDown(wrapper);

      expect(setActiveOptionIdSpy).toHaveBeenCalledWith(option!.domNode!.id);
    });

    it('calls onOptionSelected on the combobox context when an option is focused and enter is pressed', () => {
      const onOptionSelectedSpy = jest.fn();
      const wrapper = mountWithComboBoxListContext(<MockComponent />, {
        onOptionSelected: onOptionSelectedSpy,
      });

      triggerDown(wrapper);
      triggerEnter(wrapper);

      expect(onOptionSelectedSpy).toHaveBeenCalled();
    });

    it('calls onKeyToBottom on the combobox when the last item is focused', () => {
      const onKeyToBottomSpy = jest.fn();
      const wrapper = mountWithComboBoxListContext(<MockComponent />, {
        onKeyToBottom: onKeyToBottomSpy,
      });
      triggerUp(wrapper);

      expect(onKeyToBottomSpy).toHaveBeenCalled();
    });

    it('enables keyboard controls when enableKeyboardControl prop changed from false to true', () => {
      const listBox = mountWithListBoxProvider(
        <ListBox onSelect={() => {}} enableKeyboardControl={false}>
          <div>Empty state</div>
        </ListBox>,
      );

      listBox.setProps({enableKeyboardControl: true});

      expect(listBox).toContainReactComponent(KeypressListener);
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
