import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {animationFrame, timer} from '@shopify/jest-dom-mocks';
import {
  mountWithComboboxListContext,
  mountWithListboxProvider,
} from 'tests/utilities/listbox';

import {Key} from '../../../types';
import {KeypressListener} from '../../KeypressListener';
import {Scrollable} from '../../Scrollable';
import {Text} from '../../Text';
import {Listbox, AutoSelection} from '../Listbox';
import {ListboxContext} from '../../../utilities/listbox';

const MockComponent = ({
  optionCount = 3,
  enableKeyboardControl = true,
  ...props
}: any) => {
  return (
    <Scrollable>
      <Listbox
        onSelect={() => {}}
        enableKeyboardControl={enableKeyboardControl}
        {...props}
      >
        {[...Array(optionCount)].map((_, index) => {
          return (
            <Listbox.Option
              key={`listbox-option-${index}`}
              value={`value ${index}`}
              accessibilityLabel={`${index}`}
            >
              {`Option ${index}`}
            </Listbox.Option>
          );
        })}
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

    it('renders with aria-activedescendant with an id when an option is active', () => {
      const listbox = mountWithApp(
        <Listbox enableKeyboardControl>
          <Listbox.Option {...defaultOptionProps}>Option 1</Listbox.Option>
        </Listbox>,
      );

      expect(listbox).toContainReactComponent('ul', {
        'aria-activedescendant': expect.any(String),
      });
    });

    it('renders with aria-activedescendant undefined when an option is not active', () => {
      const listbox = mountWithApp(
        <Listbox enableKeyboardControl>
          <Listbox.Option disabled {...defaultOptionProps}>
            Option 1
          </Listbox.Option>
        </Listbox>,
      );

      expect(listbox).toContainReactComponentTimes('ul', 1, {
        'aria-activedescendant': undefined,
      });
    });

    it('renders with passed id', () => {
      const listbox = mountWithApp(
        <Listbox customListId="some-custom-id">Child</Listbox>,
      );

      expect(listbox).toContainReactComponent('ul', {
        id: 'some-custom-id',
      });
    });

    it('renders with fallback id when none is passed', () => {
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

        listbox.find('ul')?.trigger('onFocus');

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

      it('resets current active option on blur if keyboard events are enabled outside a combobox', async () => {
        const wrapper = mountWithApp(<MockComponent optionCount={50} />);
        const listbox = wrapper.find('ul', {role: 'listbox'})!;
        const options = wrapper.findAll('li', {role: 'option'});

        expect(listbox.domNode?.getAttribute('aria-activedescendant')).toBe(
          options[0].domNode?.id,
        );

        await wrapper.act(async () => {
          await Promise.resolve(triggerDown(wrapper));
        });

        expect(listbox.domNode?.getAttribute('aria-activedescendant')).toBe(
          options[1].domNode?.id,
        );

        await wrapper.act(async () => {
          await Promise.resolve(
            wrapper
              .find('ul', {role: 'listbox'})!
              .trigger('onBlur', {stopPropagation: () => {}}),
          );
        });

        expect(listbox.domNode?.getAttribute('aria-activedescendant')).toBe(
          options[0].domNode?.id,
        );
      });
    });
  });

  describe('loading', () => {
    const loadingMessage = 'items are loading';

    it('render a visually hidden container', () => {
      const listbox = mountWithApp(<Listbox>Child</Listbox>);

      expect(listbox).toContainReactComponentTimes(Text, 1, {
        visuallyHidden: true,
      });
    });

    it('render an aria-live="polite" container', () => {
      const listbox = mountWithApp(<Listbox>Child</Listbox>);

      expect(
        listbox.find(Text, {visuallyHidden: true}),
      ).toContainReactComponent('div', {
        'aria-live': 'polite',
      });
    });

    it('renders an empty loading container by default', () => {
      const listbox = mountWithApp(<Listbox>Child</Listbox>);

      expect(listbox.find(Text, {visuallyHidden: true})).not.toContainReactText(
        loadingMessage,
      );
    });

    it('renders a loading message when loading is true', () => {
      const listbox = mountWithApp(
        <Listbox>
          <Listbox.Loading accessibilityLabel={loadingMessage} />
        </Listbox>,
      );

      expect(listbox.find(Text, {visuallyHidden: true})).toContainReactText(
        loadingMessage,
      );
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

  it("passes `accessibilityLabel` to the list's aria-label attribute", () => {
    const wrapper = mountWithApp(<MockComponent accessibilityLabel="test" />);

    expect(wrapper).toContainReactComponent('ul', {'aria-label': 'test'});
  });

  describe('KeypressListener', () => {
    describe('keyboardEventsEnabled prop', () => {
      it('renders the KeypressListeners when enableKeyboardControl is true', () => {
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
      it('renders the KeypressListeners when the combobox textfield is focused', () => {
        const listbox = mountWithComboboxListContext(<Listbox>Child</Listbox>, {
          textFieldFocused: true,
        });

        const listenners = listbox.findAll(KeypressListener);

        expect(listenners).toHaveLength(3);
        expect(listenners[0]).toHaveReactProps({keyCode: Key.DownArrow});
        expect(listenners[1]).toHaveReactProps({keyCode: Key.UpArrow});
        expect(listenners[2]).toHaveReactProps({keyCode: Key.Enter});
      });

      it('does not render the KeypressListeners when the combobox textfield is no focused', () => {
        const listbox = mountWithComboboxListContext(<Listbox>Child</Listbox>);

        expect(listbox).not.toContainReactComponent(KeypressListener);
      });
    });

    describe('focusing the list', () => {
      it('renders the KeypressListeners onFocus', () => {
        const wrapper = mountWithApp(
          <MockComponent enableKeyboardControl={false} />,
        );

        expect(wrapper).not.toContainReactComponent(KeypressListener);

        wrapper.find('ul', {role: 'listbox'})?.trigger('onFocus');

        const listenners = wrapper.findAll(KeypressListener);

        expect(listenners).toHaveLength(3);
        expect(listenners[0]).toHaveReactProps({keyCode: Key.DownArrow});
        expect(listenners[1]).toHaveReactProps({keyCode: Key.UpArrow});
        expect(listenners[2]).toHaveReactProps({keyCode: Key.Enter});
      });
    });

    describe('blurring the list', () => {
      it('removes the KeypressListeners onBlur', () => {
        const wrapper = mountWithApp(
          <MockComponent enableKeyboardControl={false} />,
        );

        expect(wrapper).not.toContainReactComponent(KeypressListener);

        wrapper.find('ul', {role: 'listbox'})?.trigger('onFocus');

        const listenners = wrapper.findAll(KeypressListener);

        expect(listenners).toHaveLength(3);

        wrapper
          .find('ul', {role: 'listbox'})!
          .trigger('onBlur', {stopPropagation: () => {}});

        expect(wrapper).not.toContainReactComponent(KeypressListener);
      });

      it('does not remove the KeypressListeners onBlur if enableKeyboardControl is true', () => {
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
      it('sets the aria-activedescendant attribute to the id of the active option', async () => {
        const wrapper = mountWithApp(<MockComponent />);
        const listbox = wrapper.find('ul', {role: 'listbox'})!;
        const options = wrapper.findAll(Listbox.Option);

        expect(listbox.domNode?.getAttribute('aria-activedescendant')).toBe(
          options[0].domNode?.id,
        );

        await wrapper.act(async () => {
          await Promise.resolve(triggerDown(wrapper));
        });

        expect(listbox.domNode?.getAttribute('aria-activedescendant')).toBe(
          options[1].domNode?.id,
        );
      });

      it('moves the data-focused attribute to true on the active option', async () => {
        const wrapper = mountWithApp(<MockComponent />);

        const options = wrapper.findAll(Listbox.Option);

        expect(options[0].domNode?.getAttribute('data-focused')).toBe('true');

        await wrapper.act(async () => {
          await Promise.resolve(triggerDown(wrapper));
        });

        expect(options[0].domNode?.getAttribute('data-focused')).toBeNull();
        expect(options[1].domNode?.getAttribute('data-focused')).toBe('true');
      });

      it('moves the focus back to the first option when the bottom of the list is reached', async () => {
        const wrapper = mountWithApp(<MockComponent />);
        const options = wrapper.findAll(Listbox.Option);

        expect(options[0].domNode?.getAttribute('data-focused')).toBe('true');

        await wrapper.act(async () => {
          await Promise.resolve(triggerDown(wrapper));
        });

        expect(options[1].domNode?.getAttribute('data-focused')).toBe('true');

        await wrapper.act(async () => {
          await Promise.resolve(triggerDown(wrapper));
        });

        expect(options[2].domNode?.getAttribute('data-focused')).toBe('true');

        await wrapper.act(async () => {
          await Promise.resolve(triggerDown(wrapper));
        });

        expect(options[0].domNode?.getAttribute('data-focused')).toBe('true');
      });

      it('skips disabled options', async () => {
        const wrapper = mountWithApp(
          <Listbox enableKeyboardControl>
            <Listbox.Option value="valueOne" />
            <Listbox.Option disabled value="valueTwo" />
            <Listbox.Option value="valueThree" />
          </Listbox>,
        );

        const options = wrapper.findAll(Listbox.Option);

        expect(options[0].domNode?.getAttribute('data-focused')).toBe('true');

        await wrapper.act(async () => {
          await Promise.resolve(triggerDown(wrapper));
          await Promise.resolve(triggerEnter(wrapper));
        });

        expect(options[1].domNode?.getAttribute('data-focused')).toBeNull();
        expect(options[2].domNode?.getAttribute('data-focused')).toBe('true');
      });

      it('passes value and domId to onActiveOptionChange', async () => {
        const spy = jest.fn();
        const wrapper = mountWithApp(
          <Listbox enableKeyboardControl onActiveOptionChange={spy}>
            <Listbox.Option value="valueOne" />
            <Listbox.Option value="valueTwo" />
            <Listbox.Option value="valueThree" />
          </Listbox>,
        );

        const options = wrapper.findAll(Listbox.Option);

        expect(spy).toHaveBeenCalledWith('valueOne', options[0].domNode?.id);

        await wrapper.act(async () => {
          await Promise.resolve(triggerDown(wrapper));
        });

        expect(spy).toHaveBeenCalledWith('valueTwo', options[1].domNode?.id);
      });

      it('does not focus any element when all elements are disabled', async () => {
        const setActiveOptionIdSpy = jest.fn();
        const wrapper = mountWithComboboxListContext(
          <Listbox enableKeyboardControl>
            <Listbox.Option disabled value="valueOne" />
            <Listbox.Option disabled value="valueTwo" />
          </Listbox>,
          {
            setActiveOptionId: setActiveOptionIdSpy,
          },
        );

        await wrapper.act(async () => {
          await Promise.resolve(triggerDown(wrapper));
        });

        expect(setActiveOptionIdSpy).not.toHaveBeenCalled();
      });
    });

    describe('up arrow', () => {
      it('scrolls selected option into view when outside scrollable view', async () => {
        animationFrame.mock();
        const scrollSpy = jest.fn();
        const wrapper = mountWithApp(<MockComponent optionCount={50} />);
        const listbox = wrapper.find('ul', {role: 'listbox'})!;
        const options = wrapper.findAll('li', {role: 'option'});
        const lastOption = options[options.length - 1].domNode;

        expect(options[0].domNode?.getAttribute('data-focused')).toBe('true');

        window.HTMLElement.prototype.scrollBy = scrollSpy;

        await wrapper.act(async () => {
          await Promise.resolve(triggerUp(wrapper));
        });

        timer.runAllTimers();

        animationFrame.runFrame();

        expect(scrollSpy).toHaveBeenCalled();

        expect(listbox.domNode?.getAttribute('aria-activedescendant')).toBe(
          lastOption?.id,
        );

        animationFrame.restore();
      });

      it('moves the data-focused attribute to true of the selected list item', async () => {
        const wrapper = mountWithApp(<MockComponent />);

        const options = wrapper.findAll(Listbox.Option);

        expect(options[2].domNode?.getAttribute('data-focused')).toBeNull();

        await wrapper.act(async () => {
          await Promise.resolve(triggerUp(wrapper));
        });

        expect(options[2].domNode?.getAttribute('data-focused')).toBe('true');

        await wrapper.act(async () => {
          await Promise.resolve(triggerUp(wrapper));
        });

        expect(options[2].domNode?.getAttribute('data-focused')).toBeNull();
        expect(options[1].domNode?.getAttribute('data-focused')).toBe('true');
      });

      it('sets the aria-activedescendant attribute to the id of the focused element', async () => {
        const wrapper = mountWithApp(<MockComponent />);
        const listbox = wrapper.find('ul', {role: 'listbox'})!;
        const options = wrapper.findAll(Listbox.Option);

        await wrapper.act(async () => {
          await Promise.resolve(triggerUp(wrapper));
        });

        expect(listbox.domNode?.getAttribute('aria-activedescendant')).toBe(
          options[2].domNode?.id,
        );

        await wrapper.act(async () => {
          await Promise.resolve(triggerUp(wrapper));
        });

        expect(listbox.domNode?.getAttribute('aria-activedescendant')).toBe(
          options[1].domNode?.id,
        );
      });

      it('moves the focus back to the last option when the top of the list is reached', async () => {
        const wrapper = mountWithApp(<MockComponent />);
        const options = wrapper.findAll(Listbox.Option);

        expect(options[2].domNode?.getAttribute('data-focused')).toBeNull();

        await wrapper.act(async () => {
          await Promise.resolve(triggerUp(wrapper));
          await Promise.resolve(triggerUp(wrapper));
          await Promise.resolve(triggerUp(wrapper));
          await Promise.resolve(triggerUp(wrapper));
        });

        expect(options[2].domNode?.getAttribute('data-focused')).toBe('true');
      });

      it('skips disabled options', async () => {
        const wrapper = mountWithApp(
          <Listbox enableKeyboardControl>
            <Listbox.Option value="valueOne" />
            <Listbox.Option disabled value="valueTwo" />
            <Listbox.Option value="valueThree" />
          </Listbox>,
        );

        const options = wrapper.findAll(Listbox.Option);

        await wrapper.act(async () => {
          await Promise.resolve(triggerUp(wrapper));
        });

        expect(options[2].domNode?.getAttribute('data-focused')).toBe('true');

        await wrapper.act(async () => {
          await Promise.resolve(triggerUp(wrapper));
        });

        expect(options[1].domNode?.getAttribute('data-focused')).toBeNull();
      });

      it('passes value and domId to onActiveOptionChange', async () => {
        const spy = jest.fn();
        const wrapper = mountWithApp(
          <Listbox enableKeyboardControl onActiveOptionChange={spy}>
            <Listbox.Option value="valueOne" />
            <Listbox.Option value="valueTwo" />
            <Listbox.Option value="valueThree" />
          </Listbox>,
        );

        const options = wrapper.findAll(Listbox.Option);

        expect(spy).toHaveBeenCalledWith('valueOne', options[0].domNode?.id);

        await wrapper.act(async () => {
          await Promise.resolve(triggerUp(wrapper));
        });

        expect(spy).toHaveBeenCalledWith('valueThree', options[2].domNode?.id);
      });
    });

    describe('enter', () => {
      it('calls onOptionSelect with the data-listbox-option-value when enter is pressed', async () => {
        const onSelect = jest.fn();
        const wrapper = mountWithApp(<MockComponent onSelect={onSelect} />);
        const options = wrapper.findAll(Listbox.Option);

        await wrapper.act(async () => {
          await Promise.resolve(triggerEnter(wrapper));
        });

        expect(onSelect).toHaveBeenCalledWith(
          options[0]?.domNode?.getAttribute('data-listbox-option-value'),
        );
      });
    });
  });

  describe('Keyboard control in combobox', () => {
    it('calls setActiveOptionId on the combobox context with the option id when an option is focused', async () => {
      const setActiveOptionIdSpy = jest.fn();
      const wrapper = mountWithComboboxListContext(<MockComponent />, {
        setActiveOptionId: setActiveOptionIdSpy,
      });

      const option = wrapper.find(Listbox.Option);
      await wrapper.act(async () => {
        await Promise.resolve(triggerDown(wrapper));
      });

      expect(setActiveOptionIdSpy).toHaveBeenCalledWith(option?.domNode?.id);
    });

    it('calls onOptionSelected on the combobox context when an option is focused and enter is pressed', async () => {
      const onOptionSelectedSpy = jest.fn();
      const wrapper = mountWithComboboxListContext(<MockComponent />, {
        onOptionSelected: onOptionSelectedSpy,
      });

      await wrapper.act(async () => {
        await Promise.resolve(triggerEnter(wrapper));
      });

      expect(onOptionSelectedSpy).toHaveBeenCalled();
    });

    it('calls onKeyToBottom when the last item is focused', async () => {
      const onKeyToBottomSpy = jest.fn();
      const wrapper = mountWithComboboxListContext(
        <MockComponent optionCount={50} />,
        {
          willLoadMoreOptions: true,
          onKeyToBottom: onKeyToBottomSpy,
        },
      );

      const options = wrapper.findAll(Listbox.Option);

      expect(options[0].domNode?.getAttribute('data-focused')).toBe('true');

      await wrapper.act(async () => {
        await Promise.resolve(triggerUp(wrapper));
      });

      expect(onKeyToBottomSpy).toHaveBeenCalled();
    });

    it('enables keyboard controls when enableKeyboardControl prop changes from false to true', () => {
      const listbox = mountWithListboxProvider(
        <Listbox onSelect={() => {}} enableKeyboardControl={false}>
          <div>Empty state</div>
        </Listbox>,
      );

      listbox.setProps({enableKeyboardControl: true});

      expect(listbox).toContainReactComponent(KeypressListener);
    });
  });

  describe('auto-selection', () => {
    describe('manual selection', () => {
      it('does not set an initial active option', () => {
        const selectedListbox = (
          <Listbox enableKeyboardControl autoSelection={AutoSelection.None}>
            <Listbox.Option value="one" selected={false}>
              one
            </Listbox.Option>
            <Listbox.Option value="two" selected={false}>
              two
            </Listbox.Option>
            <Listbox.Option value="three" selected>
              three
            </Listbox.Option>
          </Listbox>
        );
        const wrapper = mountWithApp(selectedListbox);
        const listbox = wrapper.find('ul', {role: 'listbox'})!;

        expect(
          listbox.domNode?.getAttribute('aria-activedescendant'),
        ).toBeNull();
      });

      it('sets the initial active option to the first option on arrow down', async () => {
        const selectedListbox = (
          <Listbox enableKeyboardControl autoSelection={AutoSelection.None}>
            <Listbox.Option value="one" selected={false}>
              one
            </Listbox.Option>
            <Listbox.Option value="two" selected={false}>
              two
            </Listbox.Option>
            <Listbox.Option value="three" selected>
              three
            </Listbox.Option>
          </Listbox>
        );
        const wrapper = mountWithApp(selectedListbox);
        const listbox = wrapper.find('ul', {role: 'listbox'})!;
        const options = wrapper.findAll('li', {role: 'option'});

        expect(
          listbox.domNode?.getAttribute('aria-activedescendant'),
        ).toBeNull();

        await wrapper.act(async () => {
          await Promise.resolve(triggerDown(wrapper));
        });

        expect(listbox.domNode?.getAttribute('aria-activedescendant')).toBe(
          options[0].domNode?.id,
        );
      });
    });

    describe('when list has selected options', () => {
      it('sets the initial active option to the first selected option', () => {
        const selectedListbox = (
          <Listbox>
            <Listbox.Option value="one" selected={false}>
              one
            </Listbox.Option>
            <Listbox.Option value="two" selected={false}>
              two
            </Listbox.Option>
            <Listbox.Option value="three" selected>
              three
            </Listbox.Option>
          </Listbox>
        );
        const wrapper = mountWithApp(selectedListbox);
        const listbox = wrapper.find('ul', {role: 'listbox'})!;
        const options = wrapper.findAll('li', {role: 'option'});

        expect(listbox.domNode?.getAttribute('aria-activedescendant')).toBe(
          options[2].domNode?.id,
        );
      });

      it('sets the initial active option to the first option when autoSelection is AutoSelection.First', () => {
        const selectedListbox = (
          <Listbox autoSelection={AutoSelection.First}>
            <Listbox.Option value="one" selected={false}>
              one
            </Listbox.Option>
            <Listbox.Option value="two" selected={false}>
              two
            </Listbox.Option>
            <Listbox.Option value="three" selected>
              three
            </Listbox.Option>
          </Listbox>
        );
        const wrapper = mountWithApp(selectedListbox);
        const listbox = wrapper.find('ul', {role: 'listbox'})!;
        const options = wrapper.findAll('li', {role: 'option'});

        expect(listbox.domNode?.getAttribute('aria-activedescendant')).toBe(
          options[0].domNode?.id,
        );
      });
    });

    describe('when list has no selected options', () => {
      it('sets the initial active option to the first option by default', () => {
        const unselectedListbox = (
          <Listbox>
            <Listbox.Option value="one" selected={false}>
              one
            </Listbox.Option>
            <Listbox.Option value="two" selected={false}>
              two
            </Listbox.Option>
            <Listbox.Option value="three" selected={false}>
              three
            </Listbox.Option>
          </Listbox>
        );
        const wrapper = mountWithApp(unselectedListbox);
        const listbox = wrapper.find('ul', {role: 'listbox'})!;
        const options = wrapper.findAll('li', {role: 'option'});

        expect(listbox.domNode?.getAttribute('aria-activedescendant')).toBe(
          options[0].domNode?.id,
        );
      });

      it('sets the initial active option to the first option when autoSelection is AutoSelection.First', () => {
        const unselectedListbox = (
          <Listbox autoSelection={AutoSelection.First}>
            <Listbox.Option value="one" selected={false}>
              one
            </Listbox.Option>
            <Listbox.Option value="two" selected={false}>
              two
            </Listbox.Option>
            <Listbox.Option value="three" selected={false}>
              three
            </Listbox.Option>
          </Listbox>
        );
        const wrapper = mountWithApp(unselectedListbox);
        const listbox = wrapper.find('ul', {role: 'listbox'})!;
        const options = wrapper.findAll('li', {role: 'option'});

        expect(listbox.domNode?.getAttribute('aria-activedescendant')).toBe(
          options[0].domNode?.id,
        );
      });
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
