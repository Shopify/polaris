import React, {useState, useRef, useContext, useEffect} from 'react';
import {useUniqueId} from '../../utilities/unique-id';
import {elementChildren, isElementOfType} from '../../utilities/components';
import {Key} from '../../types';
import {classNames} from '../../utilities/css';

import {KeypressListener} from '../KeypressListener';
import {TextFieldProps} from '../TextField';
import {Popover} from '../Popover';
import styles from './Autocomplete.scss';

export interface AutocompleteProps {
  id?: string;
  children: React.ReactNode;
  textfield: React.ReactElement<TextFieldProps>;
}

export function Autocomplete({children, textfield}: AutocompleteProps) {
  const [popoverActive, setPopoverActive] = useState(false);
  const comboBoxId = useUniqueId('comboBox');
  const listBoxId = useUniqueId('listBox');

  const handleFocus = () => {
    setPopoverActive(true);
  };

  const handleBlur = () => {
    setPopoverActive(false);
  };

  const textfieldMarkup = (
    <div
      role="combobox"
      aria-expanded={popoverActive}
      aria-owns={listBoxId}
      aria-haspopup="listbox"
      aria-controls={listBoxId}
      id={comboBoxId}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {textfield}
    </div>
  );

  const listBoxMarkup =
    React.Children.toArray(children).length > 0 ? (
      <div id={listBoxId}>{children}</div>
    ) : null;

  const popover = (
    <Popover
      active={popoverActive}
      onClose={() => null}
      activator={textfieldMarkup}
      preventAutofocus
      fullWidth
    >
      {listBoxMarkup}
    </Popover>
  );

  return <React.Fragment>{popover}</React.Fragment>;
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

  const handleEnter = (evt: KeyboardEvent) => {
    evt.preventDefault();
    onSelect && onSelect(keyboardFocusedOption);
  };

  // const handleClick = ({target}: React.MouseEvent<HTMLUListElement>) => {
  //   const value = (target as HTMLElement).dataset.value;
  //   value && onSelect && onSelect(value);
  // };

  return (
    <React.Fragment>
      <KeypressListener keyCode={Key.DownArrow} handler={handleDownArrow} />
      <KeypressListener keyCode={Key.UpArrow} handler={handleUpArrow} />
      <KeypressListener
        keyCode={Key.Enter}
        handler={handleEnter}
        keyEventName="keyup"
      />
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
      data-value={value}
      onClick={handleItemClick}
    >
      {children}
    </li>
  );
}

Autocomplete.Option = Option;
Autocomplete.ListBox = ListBox;
