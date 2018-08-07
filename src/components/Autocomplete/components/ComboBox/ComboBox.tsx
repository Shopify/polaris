import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';
import {autobind} from '@shopify/javascript-utilities/decorators';

import TextField from './components/TextField';
import OptionList, {OptionDescriptor} from '../../../OptionList';
import Popover from '../../../Popover';
import {PreferredPosition} from '../../../PositionedOverlay';
import {contextTypes} from './types';

const getUniqueId = createUniqueIDFactory('ComboBox');

export interface State {
  comboBoxId: string;
  selectedOption?: OptionDescriptor | undefined;
  selectedIndex: number;
  selectedOptions: string[];
  navigableOptions?: OptionDescriptor[];
  popoverActive: boolean;
}

export interface Props {
  /** A unique identifier for the ComboBox */
  id?: string;
  /** Collection of options to be listed */
  options: OptionDescriptor[];
  /** The selected options */
  selected: string[];
  /** The text field component attached to the list of options */
  textField: React.ReactElement<any>;
  /** The preferred direction to open the popover */
  preferredPosition?: PreferredPosition;
  /** Title of the list of options */
  listTitle?: string;
  /** Allow more than one option to be selected */
  allowMultiple?: boolean;
  /** Content to be displayed before the list of options */
  contentBefore?: React.ReactNode;
  /** Content to be displayed after the list of options */
  contentAfter?: React.ReactNode;
  /** Callback when the selection of options is changed */
  onSelect(selected: string[]): void;
  /** Callback when the end of the list is reached */
  onEndReached?(): void;
}

export interface Context {
  comboBoxId: string;
  selectedOptionId?: string;
  subscribe(callback: () => void): void;
  unsubscribe(callback: () => void): void;
}

export default class ComboBox extends React.PureComponent<Props, State> {
  static TextField = TextField;
  static OptionList = OptionList;
  static childContextTypes = contextTypes;

  static getDerivedStateFromProps(
    {options: nextOptions, selected: nextSelected}: Props,
    {navigableOptions, selectedOptions, comboBoxId}: State,
  ) {
    const optionsChanged =
      navigableOptions &&
      nextOptions &&
      !optionsAreEqual(navigableOptions, nextOptions);

    if (optionsChanged && selectedOptions !== nextSelected) {
      return {
        navigableOptions: assignOptionIds(nextOptions, comboBoxId),
        selectedOptions: nextSelected,
      };
    } else if (optionsChanged) {
      return {
        navigableOptions: assignOptionIds(nextOptions, comboBoxId),
      };
    } else if (selectedOptions !== nextSelected) {
      return {selectedOptions: nextSelected};
    }
    return null;
  }

  state: State = {
    comboBoxId: this.getComboBoxId(),
    selectedOption: undefined,
    selectedIndex: -1,
    selectedOptions: this.props.selected,
    navigableOptions: [],
    popoverActive: false,
  };

  private subscriptions: {(): void}[] = [];
  private popoverScrollContainer: React.RefObject<
    HTMLDivElement
  > = React.createRef();

  getChildContext(): Context {
    return {
      comboBoxId: this.state.comboBoxId,
      selectedOptionId: this.getSelectedOptionId(),
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe,
    };
  }

  componentDidMount() {
    this.setState({
      navigableOptions: assignOptionIds(
        this.props.options,
        this.getComboBoxId(),
      ),
    });
  }

  componentDidUpdate(_: Props, nextState: State) {
    const {contentBefore, contentAfter} = this.props;
    const {navigableOptions, popoverActive} = this.state;
    this.subscriptions.forEach((subscriberCallback) => subscriberCallback());

    const optionsChanged =
      navigableOptions &&
      nextState.navigableOptions &&
      !optionsAreEqual(navigableOptions, nextState.navigableOptions);

    const popoverChanged = popoverActive === nextState.popoverActive;

    if (optionsChanged) {
      this.resetVisuallySelectedOptions();
    }

    if (
      navigableOptions &&
      navigableOptions.length === 0 &&
      !contentBefore &&
      !contentAfter
    ) {
      this.setState({popoverActive: false});
    }

    if (popoverChanged) {
      popoverActive ? this.addScrollListener() : this.removeScrollListener();
    }
  }

  getComboBoxId(): string {
    if (this.state && this.state.comboBoxId) {
      return this.state.comboBoxId;
    }
    return this.props.id || getUniqueId();
  }

  render() {
    const {
      options,
      textField,
      listTitle,
      allowMultiple,
      preferredPosition,
      contentBefore,
      contentAfter,
      onEndReached,
    } = this.props;

    const optionsMarkup = options.length > 0 && (
      <OptionList
        id={this.state.comboBoxId}
        role="listbox"
        optionRole="option"
        options={this.state.navigableOptions}
        onChange={this.selectOptions}
        selected={this.state.selectedOptions}
        title={listTitle}
        allowMultiple={allowMultiple}
      />
    );

    const scrollListenerMarkup = onEndReached && (
      <div ref={this.popoverScrollContainer} />
    );

    return (
      <div
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
        role="combobox"
        aria-expanded={this.state.popoverActive}
        aria-owns={this.state.comboBoxId}
        aria-controls={this.state.comboBoxId}
        aria-haspopup
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        tabIndex={0}
      >
        <Popover
          activator={textField}
          active={this.state.popoverActive}
          onClose={this.handlePopoverClose}
          preferredPosition={preferredPosition}
          fullWidth
          preventAutofocus
        >
          {scrollListenerMarkup}
          {contentBefore}
          {optionsMarkup}
          {contentAfter}
        </Popover>
      </div>
    );
  }

  @autobind
  subscribe(callback: () => void) {
    this.subscriptions.push(callback);
  }

  @autobind
  unsubscribe(callback: () => void) {
    this.subscriptions = this.subscriptions.filter(
      (subscription) => subscription !== callback,
    );
  }

  @autobind
  private handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    const {selectedIndex, navigableOptions} = this.state;
    const {onEndReached} = this.props;
    const {key} = event;

    if (key === 'ArrowDown') {
      if (
        navigableOptions &&
        selectedIndex === navigableOptions.length - 1 &&
        onEndReached
      ) {
        onEndReached();
      }
      this.selectNextOption();
      event.preventDefault();
    }
    if (key === 'ArrowUp') {
      event.preventDefault();
      this.selectPreviousOption();
    }
    if (key === 'Enter' && this.state.popoverActive) {
      this.state.selectedOption &&
        this.handleSelection(this.state.selectedOption.value);
    }

    this.openPopoverOnKeyDown(key);
  }

  @autobind
  private handleFocus() {
    this.setState({popoverActive: true});
  }

  @autobind
  private handleBlur() {
    this.setState({popoverActive: false});
  }

  @autobind
  private handleClick() {
    !this.state.popoverActive && this.setState({popoverActive: true});
  }

  @autobind
  private handleScroll() {
    const {onEndReached} = this.props;
    if (!onEndReached) {
      return;
    }

    if (this.popoverScrollContainer.current) {
      const scrollContainer = this.popoverScrollContainer.current.parentElement;
      if (
        scrollContainer &&
        scrollContainer.scrollTop >
          scrollContainer.scrollHeight - scrollContainer.offsetHeight - 1
      ) {
        onEndReached();
      }
    }
  }

  @autobind
  private handleSelection(newSelected: string) {
    const {selected, allowMultiple} = this.props;
    let newlySelectedOptions = selected;
    if (selected.includes(newSelected)) {
      newlySelectedOptions.splice(newlySelectedOptions.indexOf(newSelected), 1);
    } else if (allowMultiple) {
      newlySelectedOptions.push(newSelected);
    } else {
      newlySelectedOptions = [newSelected];
    }

    this.selectOptions(newlySelectedOptions);
  }

  @autobind
  private selectOptions(selected: string[]) {
    const {onSelect, allowMultiple} = this.props;
    selected && onSelect(selected);
    if (!allowMultiple) {
      this.resetVisuallySelectedOptions();
      this.setState({popoverActive: false});
    }
  }

  @autobind
  private resetVisuallySelectedOptions() {
    const {navigableOptions} = this.state;
    this.setState({
      selectedOption: undefined,
      selectedIndex: -1,
    });
    navigableOptions &&
      navigableOptions.forEach((option) => {
        option.active = false;
      });
  }

  @autobind
  private handlePopoverClose() {
    this.setState({popoverActive: false});
  }

  @autobind
  private openPopoverOnKeyDown(key: string) {
    const {popoverActive, navigableOptions} = this.state;

    !popoverActive &&
      key !== 'Escape' &&
      navigableOptions &&
      navigableOptions.length > 0 &&
      this.setState({popoverActive: true});
  }

  @autobind
  private selectNextOption() {
    const {selectedIndex, navigableOptions} = this.state;

    if (!navigableOptions || navigableOptions.length === 0) {
      return;
    }

    let newIndex = selectedIndex;

    if (selectedIndex + 1 >= navigableOptions.length) {
      newIndex = 0;
    } else {
      newIndex++;
    }

    this.selectOptionAtIndex(newIndex);
  }

  @autobind
  private selectPreviousOption() {
    const {selectedIndex, navigableOptions} = this.state;

    if (!navigableOptions || navigableOptions.length === 0) {
      return;
    }

    let newIndex = selectedIndex;

    if (selectedIndex <= 0) {
      newIndex = navigableOptions.length - 1;
    } else {
      newIndex--;
    }

    this.selectOptionAtIndex(newIndex);
  }

  @autobind
  private selectOptionAtIndex(newOptionIndex: number) {
    const {navigableOptions} = this.state;
    if (!navigableOptions || navigableOptions.length === 0) {
      return;
    }
    const newSelectedOption = navigableOptions[newOptionIndex];
    const oldSelectedOption = this.state.selectedOption;

    this.setState({
      selectedOption: newSelectedOption,
      selectedIndex: newOptionIndex,
    });

    this.visuallyUpdateSelectedOption(newSelectedOption, oldSelectedOption);
  }

  @autobind
  private visuallyUpdateSelectedOption(
    newOption: OptionDescriptor,
    oldOption: OptionDescriptor | undefined,
  ) {
    if (newOption) {
      newOption.active = true;
    }
    if (oldOption) {
      oldOption.active = false;
    }
  }

  @autobind
  private getSelectedOptionId(): string | undefined {
    const {selectedOption, selectedIndex, comboBoxId} = this.state;
    return selectedOption ? `${comboBoxId}-${selectedIndex}` : undefined;
  }

  @autobind
  private addScrollListener() {
    this.popoverScrollContainer.current &&
      this.popoverScrollContainer.current.parentElement &&
      addEventListener(
        this.popoverScrollContainer.current.parentElement,
        'scroll',
        this.handleScroll,
        {passive: true},
      );
  }

  @autobind
  private removeScrollListener() {
    this.popoverScrollContainer.current &&
      this.popoverScrollContainer.current.parentElement &&
      removeEventListener(
        this.popoverScrollContainer.current.parentElement,
        'scroll',
        this.handleScroll,
      );
  }
}

function assignOptionIds(
  options: OptionDescriptor[] | undefined,
  comboBoxId: string,
): OptionDescriptor[] | undefined {
  if (options) {
    options.map((option, optionIndex) => {
      option.id = `${comboBoxId}-${optionIndex}`;
    });
    return options;
  }
  return undefined;
}

function optionsAreEqual(
  firstOptions: OptionDescriptor[],
  secondOptions: OptionDescriptor[],
) {
  if (firstOptions.length !== secondOptions.length) {
    return false;
  }
  return firstOptions.every((firstItem, index) => {
    const secondItem = secondOptions[index];
    return firstItem.value === secondItem.value;
  });
}
