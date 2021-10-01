import React, {useState} from 'react';
import {mountWithApp} from 'test-utilities';
import {animationFrame, timer} from '@shopify/jest-dom-mocks';
import {Key} from 'types';
import {
  mountWithComboboxListContext,
  mountWithListboxProvider,
} from 'test-utilities/listbox';

import {Button} from '../../Button';
import {KeypressListener} from '../../KeypressListener';
import {Scrollable} from '../../Scrollable';
import {VisuallyHidden} from '../../VisuallyHidden';
import {Listbox} from '../Listbox';
import {ListboxContext} from '../../../utilities/listbox';

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
      <Listbox
        onSelect={() => {}}
        enableKeyboardControl={enableKeyboardControl}
        {...props}
      >
        <Listbox.Option value="value 1" accessibilityLabel="one" selected>
          Option 1
        </Listbox.Option>
        <Listbox.Option
          value="value 2"
          accessibilityLabel="two"
          disabled={optionState}
        >
          Option 2
        </Listbox.Option>
        <Listbox.Option value="value 3" accessibilityLabel="three">
          Option 3
        </Listbox.Option>
      </Listbox>
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

describe('<Listbox>', () => {
  const defaultOptionProps = {value: 'value 1', accessibilityLabel: 'one'};
  const defaultLoadingProps = {accessibilityLabel: 'accessibility label'};

  beforeEach(() => {
    timer.mock();
  });

  afterEach(() => {
    timer.restore();
  });

  describe('ul', () => {
    it('renders with tab index in order', () => {
      const listbox = mountWithApp(<Listbox>Child</Listbox>);

      expect(listbox).toContainReactComponent('ul', {tabIndex: 0});
    });

    it('renders with role="listbox"', () => {
      const listbox = mountWithApp(<Listbox>Child</Listbox>);

      expect(listbox).toContainReactComponent('ul', {role: 'listbox'});
    });

    it('renders with the accessibilityLabel prop as the aria label if not inside a combobox', () => {
      const a11yLabel = 'some-label';
      const listbox = mountWithApp(
        <Listbox accessibilityLabel={a11yLabel}>Child</Listbox>,
      );

      expect(listbox).toContainReactComponentTimes('ul', 1, {
        'aria-label': a11yLabel,
      });
    });

    it('renders without aria label if inside a combobox', () => {
      const accessibilityLabel = 'some-label';
      const listbox = mountWithComboboxListContext(
        <Listbox accessibilityLabel={accessibilityLabel}>Child</Listbox>,
      );

      expect(listbox).toContainReactComponent('ul', {
        'aria-label': undefined,
      });
    });

    it('renders with aria labelledby with text field label id as the value when in a combobox', () => {
      const textFieldLabelId = 'some-id';
      const listbox = mountWithComboboxListContext(<Listbox>Child</Listbox>, {
        textFieldLabelId,
      });

      expect(listbox).toContainReactComponent('ul', {
        'aria-labelledby': textFieldLabelId,
      });
    });

    it('renders with aria busy equalling the loading status', () => {
      const listbox = mountWithApp(
        <Listbox>
          <Listbox.Loading {...defaultLoadingProps} />
        </Listbox>,
      );

      expect(listbox).toContainReactComponent('ul', {
        'aria-busy': true,
      });
    });

    it('renders with aria activedescendant with an id when an option is active', () => {
      const listbox = mountWithApp(
        <Listbox enableKeyboardControl>
          <Listbox.Option {...defaultOptionProps}>Option 1</Listbox.Option>
        </Listbox>,
      );

      triggerDown(listbox);

      expect(listbox).toContainReactComponent('ul', {
        'aria-activedescendant': expect.any(String),
      });
    });

    it('renders with aria activedescendant with a value of false when an option is not active', () => {
      const listbox = mountWithApp(
        <Listbox enableKeyboardControl>
          <Listbox.Option {...defaultOptionProps}>Option 1</Listbox.Option>
        </Listbox>,
      );

      expect(listbox).toContainReactComponentTimes('ul', 1, {
        'aria-activedescendant': undefined,
      });
    });

    it('renders with id', () => {
      const listbox = mountWithApp(<Listbox>Child</Listbox>);

      expect(listbox).toContainReactComponent('ul', {
        id: expect.any(String),
      });
    });

    describe('focus', () => {
      it('renders with onFocus when not inside a combobox', () => {
        const listbox = mountWithApp(<Listbox>Child</Listbox>);

        expect(listbox).toContainReactComponentTimes('ul', 1, {
          onFocus: expect.any(Function),
        });
      });

      it('renders without onFocus when inside a combobox', () => {
        const listbox = mountWithComboboxListContext(<Listbox>Child</Listbox>, {
          setActiveOptionId: () => {},
        });

        expect(listbox).toContainReactComponent('ul', {
          onFocus: undefined,
        });
      });

      it('keeps keyboard events enable while focusing and keyboard events are already enabled', () => {
        const listbox = mountWithApp(
          <Listbox enableKeyboardControl>Child</Listbox>,
        );

        listbox.find('ul')!.trigger('onFocus');

        expect(listbox).toContainReactComponentTimes(KeypressListener, 3);
      });
    });

    describe('blur', () => {
      it('renders with onblur when not inside a combobox', () => {
        const listbox = mountWithApp(<Listbox>Child</Listbox>);

        expect(listbox).toContainReactComponentTimes('ul', 1, {
          onBlur: expect.any(Function),
        });
      });

      it('renders without onblur when inside a combobox', () => {
        const listbox = mountWithComboboxListContext(<Listbox>Child</Listbox>, {
          setActiveOptionId: () => {},
        });

        expect(listbox).toContainReactComponent('ul', {
          onBlur: undefined,
        });
      });

      it('resets current active option on blur if keyboard events are enabled outside a combobox', () => {
        const listbox = mountWithApp(
          <Listbox enableKeyboardControl>
            <Listbox.Option {...defaultOptionProps}>Option 1</Listbox.Option>
          </Listbox>,
        );

        triggerDown(listbox);

        listbox.find('ul')!.trigger('onBlur', {stopPropagation: () => {}});

        expect(listbox).toContainReactComponentTimes('ul', 1, {
          'aria-activedescendant': undefined,
        });
      });
    });
  });

  describe('loading', () => {
    const loadingMessage = 'items are loading';

    it('render a visually hidden container', () => {
      const listbox = mountWithApp(<Listbox>Child</Listbox>);

      expect(listbox).toContainReactComponentTimes(VisuallyHidden, 1);
    });

    it('render an aria-live="polite" container', () => {
      const listbox = mountWithApp(<Listbox>Child</Listbox>);

      expect(listbox.find(VisuallyHidden)).toContainReactComponent('div', {
        'aria-live': 'polite',
      });
    });

    it('renders an empty loading container by default', () => {
      const listbox = mountWithApp(<Listbox>Child</Listbox>);

      expect(listbox.find(VisuallyHidden)).not.toContainReactText(
        loadingMessage,
      );
    });

    it('renders a loading message when loading is true', () => {
      const listbox = mountWithApp(
        <Listbox>
          <Listbox.Loading accessibilityLabel={loadingMessage} />
        </Listbox>,
      );

      expect(listbox.find(VisuallyHidden)).toContainReactText(loadingMessage);
    });
  });

  describe('listbox context', () => {
    it('renders listbox provider', () => {
      const listbox = mountWithApp(<Listbox>Child</Listbox>);

      expect(listbox).toContainReactComponent(ListboxContext.Provider);
    });
  });

  it('calls setListboxId on the combobox context with the list id', () => {
    const setListboxIdSpy = jest.fn();
    mountWithComboboxListContext(<Listbox>Child</Listbox>, {
      setListboxId: setListboxIdSpy,
    });

    expect(setListboxIdSpy).toHaveBeenCalledWith(expect.any(String));
  });

  it('passes `accessibilityLabel` to the lists aria-label attribute', () => {
    const wrapper = mountWithApp(<MockComponent accessibilityLabel="test" />);

    expect(wrapper).toContainReactComponent('ul', {'aria-label': 'test'});
  });

  it('renders children', () => {
    const wrapper = mountWithApp(<MockComponent />);

    expect(wrapper).toContainReactComponent(Listbox.Option);
  });

  it('does not render a ul when children are null', () => {
    const listbox = mountWithApp(
      <Listbox enableKeyboardControl>{null}</Listbox>,
    );

    expect(listbox).not.toContainReactComponent('ul');
  });

  it('scrolls selected option into view when outside scrollable view', () => {
    animationFrame.mock();
    const scrollBySpy = jest.fn();
    const wrapper = mountWithApp(<MockComponent />);
    const option3 = wrapper.findAll(Listbox.Option)[2]!;

    const scrollable = option3.domNode?.closest('[data-polaris-scrollable]')!;
    scrollable.scrollBy = scrollBySpy;

    triggerUp(wrapper);

    expect(option3.domNode!.getAttribute('data-focused')).toBe('true');

    timer.runAllTimers();

    animationFrame.runFrame();

    expect(scrollBySpy).toHaveBeenCalled();

    animationFrame.restore();
  });

  describe('KeypressListenner', () => {
    describe('keyboardEventsEnabled prop', () => {
      it('renders the KeypressListenners when enableKeyboardControl is true', () => {
        const listbox = mountWithApp(
          <Listbox enableKeyboardControl>Child</Listbox>,
        );

        const listenners = listbox.findAll(KeypressListener);

        expect(listenners).toHaveLength(3);
        expect(listenners[0]).toHaveReactProps({keyCode: Key.DownArrow});
        expect(listenners[1]).toHaveReactProps({keyCode: Key.UpArrow});
        expect(listenners[2]).toHaveReactProps({keyCode: Key.Enter});
      });

      it('does not render the KeypressListenners when enableKeyboardControl is false', () => {
        const listbox = mountWithApp(
          <Listbox enableKeyboardControl={false}>Child</Listbox>,
        );

        expect(listbox).not.toContainReactComponent(KeypressListener);
      });
    });

    describe('combobox textfield focused', () => {
      it('renders the KeypressListenners when the combobox textfield is focused', () => {
        const listbox = mountWithComboboxListContext(<Listbox>Child</Listbox>, {
          textFieldFocused: true,
        });

        const listenners = listbox.findAll(KeypressListener);

        expect(listenners).toHaveLength(3);
        expect(listenners[0]).toHaveReactProps({keyCode: Key.DownArrow});
        expect(listenners[1]).toHaveReactProps({keyCode: Key.UpArrow});
        expect(listenners[2]).toHaveReactProps({keyCode: Key.Enter});
      });

      it('does not render the KeypressListenners when the combobox textfield is no focused', () => {
        const listbox = mountWithComboboxListContext(<Listbox>Child</Listbox>);

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

        const options = wrapper.findAll(Listbox.Option);

        expect(options[0].domNode!.getAttribute('data-focused')).toBeNull();

        triggerDown(wrapper);

        expect(options[0].domNode!.getAttribute('data-focused')).toBe('true');

        triggerDown(wrapper);

        expect(options[0].domNode!.getAttribute('data-focused')).toBeNull();
        expect(options[1].domNode!.getAttribute('data-focused')).toBe('true');
      });

      it('set the active-descendant attribute of the list to the id of the focused element', () => {
        const wrapper = mountWithApp(<MockComponent />);
        const listbox = wrapper.find('ul', {role: 'listbox'})!;
        const options = wrapper.findAll(Listbox.Option);

        expect(
          listbox.domNode!.getAttribute('aria-activedescendant'),
        ).toBeNull();

        triggerDown(wrapper);

        expect(listbox.domNode!.getAttribute('aria-activedescendant')).toBe(
          options[0].domNode!.id,
        );

        triggerDown(wrapper);

        expect(listbox.domNode!.getAttribute('aria-activedescendant')).toBe(
          options[1].domNode!.id,
        );
      });

      it('move the focus back to the first option when the bottom of the list is reached', () => {
        const wrapper = mountWithApp(<MockComponent />);
        const options = wrapper.findAll(Listbox.Option);

        expect(options[0].domNode!.getAttribute('data-focused')).toBeNull();

        triggerDown(wrapper);
        triggerDown(wrapper);
        triggerDown(wrapper);
        triggerDown(wrapper);

        expect(options[0].domNode!.getAttribute('data-focused')).toBe('true');
      });

      it('skips disabled options', () => {
        const wrapper = mountWithApp(<MockComponent />);
        const options = wrapper.findAll(Listbox.Option);

        wrapper.find(Button)!.trigger('onClick');

        triggerDown(wrapper);

        expect(options[0].domNode!.getAttribute('data-focused')).toBe('true');

        triggerDown(wrapper);

        expect(options[0].domNode!.getAttribute('data-focused')).toBeNull();
        expect(options[2].domNode!.getAttribute('data-focused')).toBe('true');
      });

      it('does not focus a disabled element when all elements are disabled', () => {
        const setActiveOptionIdSpy = jest.fn();
        const listbox = mountWithComboboxListContext(
          <Listbox enableKeyboardControl>
            <Listbox.Option disabled value="valueOne" />
            <Listbox.Option disabled value="valueTwo" />
          </Listbox>,
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

        const options = wrapper.findAll(Listbox.Option);

        expect(options[2].domNode!.getAttribute('data-focused')).toBeNull();

        triggerUp(wrapper);

        expect(options[2].domNode!.getAttribute('data-focused')).toBe('true');

        triggerUp(wrapper);

        expect(options[2].domNode!.getAttribute('data-focused')).toBeNull();
        expect(options[1].domNode!.getAttribute('data-focused')).toBe('true');
      });

      it('set the active-descendant attribute of the list to the id of the focused element', () => {
        const wrapper = mountWithApp(<MockComponent />);
        const listbox = wrapper.find('ul', {role: 'listbox'})!;
        const options = wrapper.findAll(Listbox.Option);

        expect(
          listbox.domNode!.getAttribute('aria-activedescendant'),
        ).toBeNull();

        triggerUp(wrapper);

        expect(listbox.domNode!.getAttribute('aria-activedescendant')).toBe(
          options[2].domNode!.id,
        );

        triggerUp(wrapper);

        expect(listbox.domNode!.getAttribute('aria-activedescendant')).toBe(
          options[1].domNode!.id,
        );
      });

      it('move the focus back to the last option when the top of the list is reached', () => {
        const wrapper = mountWithApp(<MockComponent />);
        const options = wrapper.findAll(Listbox.Option);

        expect(options[2].domNode!.getAttribute('data-focused')).toBeNull();

        triggerUp(wrapper);
        triggerUp(wrapper);
        triggerUp(wrapper);
        triggerUp(wrapper);

        expect(options[2].domNode!.getAttribute('data-focused')).toBe('true');
      });

      it('skips disabled options', () => {
        const wrapper = mountWithApp(<MockComponent />);
        const options = wrapper.findAll(Listbox.Option);

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
        const option = wrapper.find(Listbox.Option);
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
      const wrapper = mountWithComboboxListContext(<MockComponent />, {
        setActiveOptionId: setActiveOptionIdSpy,
      });
      const option = wrapper.find(Listbox.Option);
      triggerDown(wrapper);

      expect(setActiveOptionIdSpy).toHaveBeenCalledWith(option!.domNode!.id);
    });

    it('calls onOptionSelected on the combobox context when an option is focused and enter is pressed', () => {
      const onOptionSelectedSpy = jest.fn();
      const wrapper = mountWithComboboxListContext(<MockComponent />, {
        onOptionSelected: onOptionSelectedSpy,
      });

      triggerDown(wrapper);
      triggerEnter(wrapper);

      expect(onOptionSelectedSpy).toHaveBeenCalled();
    });

    it('calls onKeyToBottom on the combobox when the last item is focused', () => {
      const onKeyToBottomSpy = jest.fn();
      const wrapper = mountWithComboboxListContext(<MockComponent />, {
        onKeyToBottom: onKeyToBottomSpy,
      });
      triggerUp(wrapper);

      expect(onKeyToBottomSpy).toHaveBeenCalled();
    });

    it('enables keyboard controls when enableKeyboardControl prop changed from false to true', () => {
      const listbox = mountWithListboxProvider(
        <Listbox onSelect={() => {}} enableKeyboardControl={false}>
          <div>Empty state</div>
        </Listbox>,
      );

      listbox.setProps({enableKeyboardControl: true});

      expect(listbox).toContainReactComponent(KeypressListener);
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
