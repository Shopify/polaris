import React, {useState, useRef, useContext, useEffect} from 'react';
import {useUniqueId} from '../../utilities/unique-id';
import {elementChildren, isElementOfType} from '../../utilities/components';
import {Key} from '../../types';
import {scrollable} from '../shared';
import {classNames} from '../../utilities/css';

import {KeypressListener} from '../KeypressListener';
import {TextFieldProps} from '../TextField';
import {Popover} from '../Popover';
import {EventListener} from '../EventListener';
import styles from './ComboBox.scss';

export interface ComboBoxProps {
  id?: string;
  children: React.ReactNode;
  textfield: React.ReactElement<TextFieldProps>;
  allowMultiple?: boolean;
  inline?: boolean;
  highlightMatches?: boolean;
}

interface ComboBoxContextType {
  activeDescendant: string;
  setActiveDescendant(id: string): void;
  firstOptionLabel?: string;
  setFirstOptionLabel?(label: React.ReactNode): void;
  textfieldId: string;
  setTextFieldId(id: string): void;
  textfieldValue?: string;
  setTextfieldValue?(value: string): void;
  listBoxId: string;
  onSelect(): void;
}

const ComboBoxContext = React.createContext<ComboBoxContextType | null>(null);

function useComboBoxContext() {
  const context = React.useContext(ComboBoxContext);
  if (!context) {
    throw new Error(
      'useComboBoxContext must be used within the ComboBoxContextProvider',
    );
  }
  return context;
}

export function ComboBox({
  children,
  textfield,
  allowMultiple,
  highlightMatches,
  inline,
}: ComboBoxProps) {
  const [popoverActive, setPopoverActive] = useState(false);
  const listBoxId = useUniqueId('listBox');
  const [activeDescendant, setActiveDescendant] = useState('');
  const [textfieldValue, setTextfieldValue] = useState('');
  const [firstOptionLabel, setFirstOptionLabel] = useState('');
  const [textfieldId, setTextFieldId] = useState(useUniqueId('textfieldId'));
  const textFieldWrapperRef = useRef<HTMLDivElement>(null);

  const handleSelect = () => {
    focusInput();
    if (allowMultiple) return;
    setPopoverActive(false);
  };

  const contextValue: ComboBoxContextType = {
    firstOptionLabel: inline ? firstOptionLabel : undefined,
    setFirstOptionLabel: inline ? setFirstOptionLabel : undefined,
    // a11y on text field
    activeDescendant,
    setActiveDescendant,
    textfieldValue: highlightMatches ? textfieldValue : undefined,
    setTextfieldValue: highlightMatches ? setTextfieldValue : undefined,
    // a11y for ul
    textfieldId,
    setTextFieldId,
    // a11y so this can set the id here since the listBox id will change
    listBoxId,
    // onSelect lives on the ListBox, this one controls whether to popover should close or not
    onSelect: handleSelect,
  };

  const hasChildren = React.Children.toArray(children).length > 0;

  const handleFocus = () => {
    if (hasChildren && !popoverActive) {
      setPopoverActive(true);
    }
  };

  const handleKeyUp = () => {
    if (hasChildren && !popoverActive) {
      setPopoverActive(true);
    }
  };

  const handleClose = () => {
    setPopoverActive(false);
  };

  const textfieldMarkup = (
    <div
      role="combobox"
      aria-expanded={popoverActive}
      aria-owns={listBoxId}
      aria-haspopup="listbox"
      aria-controls={listBoxId}
      onFocus={handleFocus}
      onKeyUp={handleKeyUp}
      ref={textFieldWrapperRef}
      tabIndex={0}
    >
      {textfield}
    </div>
  );

  const focusInput = () => {
    const input =
      textFieldWrapperRef &&
      textFieldWrapperRef.current &&
      textFieldWrapperRef.current.querySelector('input');

    if (input) input.focus();
  };

  const handleStopScroll = ({target}: MouseEvent) => {
    if ((target as HTMLElement).matches(scrollable.selector)) {
      focusInput();
    }
  };

  const listBoxMarkup =
    React.Children.toArray(children).length > 0 ? (
      <div id={listBoxId}>{children}</div>
    ) : null;

  const popover = (
    <Popover
      active={popoverActive}
      onClose={handleClose}
      activator={textfieldMarkup}
      preventAutofocus
      fullWidth
    >
      <EventListener event="mouseup" handler={handleStopScroll} />
      {listBoxMarkup}
    </Popover>
  );

  return (
    <ComboBoxContext.Provider value={contextValue}>
      {popover}
    </ComboBoxContext.Provider>
  );
}

type ListBoxProps = {
  children: React.ReactNode;
  onSelect?(value: string): void;
};

const ListBoxtContext = React.createContext<ListBoxContextType>({});

interface ListBoxContextType {
  // setKeyboardFocusedOption?(id: string): void;
  keyboardFocusedOption?: string;
  onItemClick?(value: string): void;
}

export function ListBox({children, onSelect}: ListBoxProps) {
  const listBoxClassName = classNames(styles.ListBox);
  const [keyboardFocusedOption, setKeyboardFocusedOption] = useState();
  const [navigableOptions, setNavigableOptions] = useState([] as string[]);
  const {
    setActiveDescendant,
    setFirstOptionLabel,
    firstOptionLabel,
    onSelect: contextOnSelect,
  } = useComboBoxContext();

  if (keyboardFocusedOption) {
    setActiveDescendant(keyboardFocusedOption);
  }

  const totalOptions = useRef<number>(navigableOptions.length);

  // this will need to be recursive
  useEffect(() => {
    const updatedNavigableOptions = elementChildren(children).map(
      (child: React.ReactElement<OptionProps>) => {
        if (
          child &&
          isElementOfType(child, Option) &&
          !child.props.disabled &&
          child.props.value
        ) {
          setFirstOptionLabel &&
            !firstOptionLabel &&
            setFirstOptionLabel(child.props.children);
          return child.props.value;
        }
      },
    );
    setNavigableOptions(updatedNavigableOptions as string[]);
    totalOptions.current = updatedNavigableOptions.length;
  }, [children, firstOptionLabel, setFirstOptionLabel]);

  const onItemClick = (value: string) => {
    onSelect && onSelect(value);
    contextOnSelect && contextOnSelect();
  };

  const handleEnter = (evt: KeyboardEvent) => {
    evt.preventDefault();
    onSelect && onSelect(keyboardFocusedOption);
    contextOnSelect && contextOnSelect();
  };

  const listBoxContext = {
    keyboardFocusedOption,
    onItemClick,
  };

  /** key interactions */
  const handleDownArrow = () => {
    if (!navigableOptions) return;
    keyboardFocusedOption == null
      ? setKeyboardFocusedOption(navigableOptions[0])
      : handleNextPosition(navigableOptions.indexOf(keyboardFocusedOption) + 1);
  };

  const handleUpArrow = () => {
    if (!navigableOptions || !totalOptions.current) return;
    keyboardFocusedOption == null
      ? setKeyboardFocusedOption(navigableOptions[totalOptions.current - 1])
      : handleNextPosition(navigableOptions.indexOf(keyboardFocusedOption) - 1);
  };

  const handleNextPosition = (nextPosition: number) => {
    switch (nextPosition) {
      case -1:
        setKeyboardFocusedOption(navigableOptions[totalOptions.current - 1]);
        break;
      case totalOptions.current:
        setKeyboardFocusedOption(navigableOptions[0]);
        break;
      default:
        setKeyboardFocusedOption(navigableOptions[nextPosition]);
    }
  };

  // const handleClick = ({target}: React.MouseEvent<HTMLUListElement>) => {
  //   const value = (target as HTMLElement).dataset.value;
  //   value && onSelect && onSelect(value);
  // };

  return (
    <React.Fragment>
      <KeypressListener keyCode={Key.DownArrow} handler={handleDownArrow} />
      <KeypressListener keyCode={Key.UpArrow} handler={handleUpArrow} />
      <KeypressListener keyCode={Key.Enter} handler={handleEnter} />
      <ListBoxtContext.Provider value={listBoxContext}>
        <ul className={listBoxClassName}>{children}</ul>
      </ListBoxtContext.Provider>
    </React.Fragment>
  );
}

type OptionProps = {
  value: string;
  children: string | React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
};

function OptionNoMemoized({value, children, selected}: OptionProps) {
  const {keyboardFocusedOption, onItemClick} = useContext(ListBoxtContext);
  // const listItemRef = useRef<HTMLLIElement>(null);
  const optionClassName = classNames(
    styles.Option,
    selected && styles.selected,
    keyboardFocusedOption === value && styles.focused,
  );

  const handleItemClick = () => {
    onItemClick && onItemClick(value);
  };

  return (
    <li
      className={optionClassName}
      id={value}
      // ref={listItemRef}
      onClick={handleItemClick}
    >
      {children}
    </li>
  );
}

const Option = React.memo(OptionNoMemoized);

ComboBox.Option = Option;
ComboBox.ListBox = ListBox;
