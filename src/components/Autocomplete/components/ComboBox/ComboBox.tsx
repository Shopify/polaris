import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';
import {autobind} from '@shopify/javascript-utilities/decorators';
import OptionList, {OptionDescriptor} from '../../../OptionList';
import ActionList from '../../../ActionList';
import Popover from '../../../Popover';
import {PreferredPosition} from '../../../PositionedOverlay';
import {ActionListItemDescriptor, Key} from '../../../../types';
import {contextTypes} from '../types';
import KeypressListener from '../../../KeypressListener';
import {TextField} from './components';

import * as styles from './ComboBox.scss';

const getUniqueId = createUniqueIDFactory('ComboBox');

export interface State {
  comboBoxId: string;
  selectedOption?: OptionDescriptor | ActionListItemDescriptor | undefined;
  selectedIndex: number;
  selectedOptions: string[];
  navigableOptions: (OptionDescriptor | ActionListItemDescriptor)[];
  popoverActive: boolean;
  popoverWasActive: boolean;
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
  /** Actions to be displayed before the list of options */
  actionsBefore?: ActionListItemDescriptor[];
  /** Actions to be displayed after the list of options */
  actionsAfter?: ActionListItemDescriptor[];
  /** Content to be displayed before the list of options */
  contentBefore?: React.ReactNode;
  /** Content to be displayed after the list of options */
  contentAfter?: React.ReactNode;
  /** Is rendered when there are no options */
  emptyState?: React.ReactNode;
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
    {
      options: nextOptions,
      selected: nextSelected,
      actionsBefore: nextActionsBefore,
      actionsAfter: nextActionsAfter,
    }: Props,
    {navigableOptions, selectedOptions, comboBoxId}: State,
  ) {
    const optionsChanged =
      filterForOptions(navigableOptions) &&
      nextOptions &&
      !optionsAreEqual(navigableOptions, nextOptions);

    let newNavigableOptions: (
      | OptionDescriptor
      | ActionListItemDescriptor)[] = [];
    if (nextActionsBefore) {
      newNavigableOptions = newNavigableOptions.concat(nextActionsBefore);
    }
    if (optionsChanged || nextActionsBefore) {
      newNavigableOptions = newNavigableOptions.concat(nextOptions);
    }
    if (nextActionsAfter) {
      newNavigableOptions = newNavigableOptions.concat(nextActionsAfter);
    }
    newNavigableOptions = assignOptionIds(newNavigableOptions, comboBoxId);

    if (optionsChanged && selectedOptions !== nextSelected) {
      return {
        navigableOptions: newNavigableOptions,
        selectedOptions: nextSelected,
      };
    } else if (optionsChanged) {
      return {
        navigableOptions: newNavigableOptions,
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
    popoverWasActive: false,
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
    const {options, actionsBefore, actionsAfter} = this.props;
    const comboBoxId = this.getComboBoxId();
    let navigableOptions: (OptionDescriptor | ActionListItemDescriptor)[] = [];

    if (actionsBefore) {
      navigableOptions = navigableOptions.concat(actionsBefore);
    }
    if (options) {
      navigableOptions = navigableOptions.concat(options);
    }
    if (actionsAfter) {
      navigableOptions = navigableOptions.concat(actionsAfter);
    }
    navigableOptions = assignOptionIds(navigableOptions, comboBoxId);

    this.setState({
      navigableOptions,
    });
  }

  componentDidUpdate(_: Props, prevState: State) {
    const {contentBefore, contentAfter, emptyState} = this.props;
    const {navigableOptions, popoverActive, popoverWasActive} = this.state;
    this.subscriptions.forEach((subscriberCallback) => subscriberCallback());

    const optionsChanged =
      navigableOptions &&
      prevState.navigableOptions &&
      !optionsAreEqual(navigableOptions, prevState.navigableOptions);

    const popoverChanged = popoverActive === prevState.popoverActive;

    if (optionsChanged) {
      this.updateIndexOfSelectedOption(navigableOptions);
    }

    if (
      navigableOptions &&
      navigableOptions.length === 0 &&
      !contentBefore &&
      !contentAfter &&
      !emptyState
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({popoverActive: false});
    } else if (
      popoverWasActive &&
      navigableOptions &&
      navigableOptions.length !== 0
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({popoverActive: true});
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
      actionsBefore,
      actionsAfter,
      contentBefore,
      contentAfter,
      onEndReached,
      emptyState,
    } = this.props;

    const actionsBeforeMarkup = actionsBefore &&
      actionsBefore.length > 0 && (
        <ActionList actionRole="option" items={actionsBefore} />
      );

    const actionsAfterMarkup = actionsAfter &&
      actionsAfter.length > 0 && (
        <ActionList actionRole="option" items={actionsAfter} />
      );

    const optionsMarkup = options.length > 0 && (
      <OptionList
        role="presentation"
        optionRole="option"
        options={filterForOptions(this.state.navigableOptions)}
        onChange={this.selectOptions}
        selected={this.state.selectedOptions}
        title={listTitle}
        allowMultiple={allowMultiple}
      />
    );

    const scrollListenerMarkup = onEndReached && (
      <div ref={this.popoverScrollContainer} />
    );

    const emptyStateMarkup = !actionsAfter &&
      !actionsBefore &&
      !contentAfter &&
      !contentBefore &&
      options.length === 0 &&
      emptyState && <div className={styles.EmptyState}>{emptyState}</div>;

    return (
      <div
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
        <KeypressListener
          keyValue={Key.ArrowDown}
          handler={this.handleDownArrow}
        />
        <KeypressListener keyValue={Key.ArrowUp} handler={this.handleUpArrow} />
        <KeypressListener keyValue={Key.Enter} handler={this.handleEnter} />
        <KeypressListener
          keyValue={Key.Escape}
          handler={this.handlePopoverClose}
        />
        <Popover
          activator={textField}
          active={this.state.popoverActive}
          onClose={this.handlePopoverClose}
          preferredPosition={preferredPosition}
          fullWidth
          preventAutofocus
        >
          <div
            id={this.state.comboBoxId}
            role="listbox"
            aria-multiselectable={allowMultiple}
          >
            {scrollListenerMarkup}
            {contentBefore}
            {actionsBeforeMarkup}
            {optionsMarkup}
            {actionsAfterMarkup}
            {contentAfter}
            {emptyStateMarkup}
          </div>
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
  private handleDownArrow() {
    const {selectedIndex, navigableOptions} = this.state;
    const {onEndReached} = this.props;

    if (
      navigableOptions &&
      selectedIndex === navigableOptions.length - 1 &&
      onEndReached
    ) {
      onEndReached();
    }
    this.selectNextOption();

    this.handlePopoverOpen;
  }

  @autobind
  private handleUpArrow() {
    this.selectPreviousOption();

    this.handlePopoverOpen;
  }

  @autobind
  private handleEnter() {
    const {selectedOption} = this.state;

    if (this.state.popoverActive && selectedOption) {
      if (isOption(selectedOption)) {
        this.handleSelection(selectedOption.value);
      } else {
        selectedOption.onAction && selectedOption.onAction();
      }
    }

    this.handlePopoverOpen;
  }

  @autobind
  private handleFocus() {
    this.setState({popoverActive: true, popoverWasActive: true});
  }

  @autobind
  private handleBlur() {
    this.setState({popoverActive: false, popoverWasActive: false}, () => {
      this.resetVisuallySelectedOptions();
    });
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
      this.setState({popoverActive: false, popoverWasActive: false});
    }
  }

  @autobind
  private updateIndexOfSelectedOption(
    newOptions: (OptionDescriptor | ActionListItemDescriptor)[],
  ) {
    const {selectedIndex, selectedOption} = this.state;
    if (selectedOption && newOptions.includes(selectedOption)) {
      this.selectOptionAtIndex(newOptions.indexOf(selectedOption));
    } else if (selectedIndex > newOptions.length - 1) {
      this.resetVisuallySelectedOptions();
    } else {
      this.selectOptionAtIndex(selectedIndex);
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
    this.setState({popoverActive: false, popoverWasActive: false});
  }

  @autobind
  private handlePopoverOpen() {
    const {popoverActive, navigableOptions} = this.state;

    !popoverActive &&
      navigableOptions &&
      navigableOptions.length > 0 &&
      this.setState({popoverActive: true, popoverWasActive: true});
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
    const {navigableOptions, selectedOption: oldSelectedOption} = this.state;
    if (!navigableOptions || navigableOptions.length === 0) {
      return;
    }
    const newSelectedOption = navigableOptions[newOptionIndex];

    this.setState(
      {
        selectedOption: newSelectedOption,
        selectedIndex: newOptionIndex,
      },
      () => {
        this.visuallyUpdateSelectedOption(newSelectedOption, oldSelectedOption);
      },
    );
  }

  @autobind
  private visuallyUpdateSelectedOption(
    newOption: OptionDescriptor | ActionListItemDescriptor,
    oldOption: OptionDescriptor | ActionListItemDescriptor | undefined,
  ) {
    if (oldOption) {
      oldOption.active = false;
    }
    if (newOption) {
      newOption.active = true;
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
  options: (OptionDescriptor | ActionListItemDescriptor)[],
  comboBoxId: string,
): OptionDescriptor[] | ActionListItemDescriptor[] {
  options.map(
    (
      option: OptionDescriptor | ActionListItemDescriptor,
      optionIndex: number,
    ) => {
      option.id = `${comboBoxId}-${optionIndex}`;
    },
  );
  return options;
}

function optionsAreEqual(
  firstOptions: (OptionDescriptor | ActionListItemDescriptor)[],
  secondOptions: (OptionDescriptor | ActionListItemDescriptor)[],
) {
  if (firstOptions.length !== secondOptions.length) {
    return false;
  }
  return firstOptions.every(
    (firstItem: OptionDescriptor | ActionListItemDescriptor, index: number) => {
      const secondItem = secondOptions[index];
      if (isOption(firstItem)) {
        if (isOption(secondItem)) {
          return firstItem.value === secondItem.value;
        }
        return false;
      } else {
        if (!isOption(secondItem)) {
          return firstItem.content === secondItem.content;
        }
        return false;
      }
    },
  );
}

function isOption(
  navigableOption: OptionDescriptor | ActionListItemDescriptor,
): navigableOption is OptionDescriptor {
  return (navigableOption as OptionDescriptor).value !== undefined;
}

function filterForOptions(
  mixedArray: (ActionListItemDescriptor | OptionDescriptor)[],
): OptionDescriptor[] {
  return mixedArray.filter((item) => isOption(item)) as OptionDescriptor[];
}
