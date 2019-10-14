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
import styles from './Autocomplete.scss';

export interface AutocompleteProps {
  id?: string;
  children: React.ReactNode;
  textfield: React.ReactElement<TextFieldProps>;
  allowMultiple?: boolean;
  autoFill?: boolean;
  highlightMatches?: boolean;
}

interface AutocompleteContextType {
  allowMultiple?: boolean;
  highlightMatches?: boolean;
  autoFill?: boolean;
  activeDescendant: string;
  setActiveDescendant(id: string): void;
  textfieldId: string;
  setTextFieldId(id: string): void;
  textfieldValue: string;
  setTextFieldValue(value: string): void;
  listBoxId: string;
  onSelect(): void;
}

const AutocompleteContext = React.createContext<AutocompleteContextType | null>(
  null,
);

function useAutocompleteContext() {
  const context = React.useContext(AutocompleteContext);
  if (!context) {
    throw new Error(
      'useAutocompleteContext must be used within the AutocompleteContextProvider',
    );
  }
  return context;
}

export function Autocomplete({
  children,
  textfield,
  allowMultiple,
  highlightMatches,
}: AutocompleteProps) {
  const [popoverActive, setPopoverActive] = useState(false);
  const listBoxId = useUniqueId('listBox');
  const [activeDescendant, setActiveDescendant] = useState('');
  const [textfieldValue, setTextFieldValue] = useState('');
  const [textfieldId, setTextFieldId] = useState(useUniqueId('textfieldId'));
  const textFieldWrapperRef = useRef<HTMLDivElement>(null);

  const handleSelect = () => {
    focusInput();
    if (allowMultiple) return;
    setPopoverActive(false);
  };

  const contextValue: AutocompleteContextType = {
    activeDescendant,
    setActiveDescendant,
    textfieldValue,
    setTextFieldValue,
    textfieldId,
    setTextFieldId,
    allowMultiple,
    highlightMatches,
    listBoxId,
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
    <AutocompleteContext.Provider value={contextValue}>
      {popover}
    </AutocompleteContext.Provider>
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
    onSelect: contextOnSelect,
  } = useAutocompleteContext();

  if (keyboardFocusedOption) {
    setActiveDescendant(keyboardFocusedOption);
  }

  const totalOptions = useRef<number>(navigableOptions.length);

  useEffect(() => {
    const updatedNavigableOptions = elementChildren(children).map(
      (child: React.ReactElement<OptionProps>) => {
        if (
          child &&
          isElementOfType(child, Option) &&
          !child.props.disabled &&
          child.props.value
        ) {
          return child.props.value;
        }
      },
    );
    setNavigableOptions(updatedNavigableOptions as string[]);
    totalOptions.current = updatedNavigableOptions.length;
  }, [children]);

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

export function Option({value, children, selected}: OptionProps) {
  const {keyboardFocusedOption, onItemClick} = useContext(ListBoxtContext);
  const listItemRef = useRef<HTMLLIElement>(null);
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
      ref={listItemRef}
      onClick={handleItemClick}
    >
      {children}
    </li>
  );
}

Autocomplete.Option = Option;
Autocomplete.ListBox = ListBox;
