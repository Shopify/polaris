import React, {useState, useRef, useEffect} from 'react';
import {useUniqueId} from '../../utilities/unique-id';
import {elementChildren, isElementOfType} from '../../utilities/components';
import {Key} from '../../types';
import {classNames} from '../../utilities/css';

import {KeypressListener} from '../KeypressListener';
import {TextField, TextFieldProps} from '../TextField';
import {Popover} from '../Popover';
import styles from './Autocomplete.scss';

export interface AutocompleteProps {
  id?: string;
  children: React.ReactNode;
}

function isListBox(
  listBox: React.ReactElement,
): listBox is React.ReactElement<ListBoxProps> {
  return isElementOfType(listBox, ListBox);
}

function isOption(
  option: React.ReactElement,
): option is React.ReactElement<OptionProps> {
  return isElementOfType(option, Option);
}

function isTextField(
  textField: React.ReactElement,
): textField is React.ReactElement<TextFieldProps> {
  return isElementOfType(textField, TextField);
}

export function Autocomplete({children}: AutocompleteProps) {
  const [popoverActive, setPopoverActive] = useState(false);
  const comboBoxId = useUniqueId('comboBox');
  const listBoxId = useUniqueId('listBox');

  const handleFocus = () => {
    setPopoverActive(true);
  };

  const handleBlur = () => {
    setPopoverActive(false);
  };

  let listBox;
  let textField;

  const updatedChildren = elementChildren(children).map((child) => {
    if (child && isTextField(child)) {
      textField = React.cloneElement(child);
    } else if (child && isListBox(child)) {
      listBox = React.cloneElement(child);
    } else {
      return child;
    }
  });

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
      {textField}
    </div>
  );

  const popover = textField ? (
    <Popover
      active={popoverActive}
      onClose={() => null}
      activator={textfieldMarkup}
      preventAutofocus
      fullWidth
    >
      {listBox}
    </Popover>
  ) : null;

  return (
    <React.Fragment>
      {popover}
      {updatedChildren}
    </React.Fragment>
  );
}

type ListBoxProps = {
  children: React.ReactNode;
  onSelect?(active: string): void;
};

export function ListBox({children}: ListBoxProps) {
  const listBoxClassName = classNames(styles.ListBox);
  const [active, setActive] = useState();
  const [navigableOptions, setNavigableOptions] = useState([] as string[]);
  const [options, setOptions] = useState();

  const totalOptions = useRef<number>(navigableOptions.length);

  const handleClick = (onClick?: (value: string) => void) => {
    return (value: string) => {
      if (onClick) {
        onClick(value);
      }
      setActive(value);
    };
  };

  useEffect(() => {
    let updatedNavigableOptions = [] as string[];

    const currentChildren = elementChildren(children).map((child) => {
      if (child && isOption(child)) {
        updatedNavigableOptions = [
          ...updatedNavigableOptions,
          child.props.value,
        ];

        const clickHandler = child.props.onClick;

        return React.cloneElement(child, {
          ...child.props,
          onClick: handleClick(clickHandler),
          active: active === child.props.value,
        });
      }
    });

    setOptions(currentChildren);
    setNavigableOptions(updatedNavigableOptions as string[]);
    totalOptions.current = updatedNavigableOptions.length;
  }, [active, children]);

  /** key interactions */
  const handleDownArrow = () => {
    if (!navigableOptions) return;
    active == null
      ? setActive(navigableOptions[0])
      : handleNextPosition(navigableOptions.indexOf(active) + 1);
  };

  const handleUpArrow = () => {
    if (!navigableOptions || !totalOptions.current) return;
    active == null
      ? setActive(navigableOptions[totalOptions.current - 1])
      : handleNextPosition(navigableOptions.indexOf(active) - 1);
  };

  const handleNextPosition = (nextPosition: number) => {
    switch (nextPosition) {
      case -1:
        setActive(navigableOptions[totalOptions.current - 1]);
        break;
      case totalOptions.current:
        setActive(navigableOptions[0]);
        break;
      default:
        setActive(navigableOptions[nextPosition]);
    }
  };

  return (
    <React.Fragment>
      <KeypressListener keyCode={Key.DownArrow} handler={handleDownArrow} />
      <KeypressListener keyCode={Key.UpArrow} handler={handleUpArrow} />
      <ul className={listBoxClassName}>{options}</ul>
    </React.Fragment>
  );
}

type OptionProps = {
  value: string;
  children: string | React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  active?: boolean;
  onClick?(value: string): void;
};

export function Option({
  value,
  children,
  selected,
  onClick,
  active,
}: OptionProps) {
  const optionClassName = classNames(
    styles.Option,
    selected && styles.selected,
    selected && styles.selected,
    active && styles.focused,
  );

  const handleClick = onClick && onClick.bind(null, value);

  const handleEnter = (evt: KeyboardEvent) => {
    evt.preventDefault();
    handleClick && handleClick();
  };

  const listener = active ? (
    <KeypressListener
      keyCode={Key.Enter}
      handler={handleEnter}
      keyEventName="keyup"
    />
  ) : null;

  return (
    <React.Fragment>
      <li className={optionClassName} data-value={value} onClick={handleClick}>
        {listener}
        {children}
      </li>
    </React.Fragment>
  );
}

Autocomplete.Option = Option;
Autocomplete.ListBox = ListBox;
