import React, {
  useState,
  useCallback,
  useRef,
  useContext,
  useEffect,
} from 'react';
import {Key} from '../../types';
import {classNames} from '../../utilities/css';
import {KeypressListener} from '../KeypressListener';
import {Popover} from '../Popover';
import {useUniqueId} from '../../utilities/unique-id';
import styles from './Autocomplete.scss';

export interface AutocompleteProps {
  id?: string;
  children: React.ReactNode;
  onSelect?(active: string): void;
}

interface AutocompleteContextType {
  addOption?(label: string, value: string): void;
  removeOption?(label: string, value: string): void;
  options?: OptionDescriptor[];
}

type OptionDescriptor = {
  label: string;
  value: string;
};

const AutocompleteContext = React.createContext<AutocompleteContextType>({});

export function Autocomplete({children, onSelect}: AutocompleteProps) {
  const [options, setOptions] = useState([] as OptionDescriptor[]);
  const [popoverActive, setPopoverActive] = useState(false);
  const [active, setActive] = useState();
  const [navigableOptions, setNavigableOptions] = useState([] as string[]);
  const totalOptions = useRef<number>(navigableOptions.length);
  const comboBoxId = useUniqueId('comboBox');
  const listBoxId = useUniqueId('listBox');
  const refOptions = useRef<OptionDescriptor[]>();

  useEffect(() => {
    const updatedNavigableOptions = options.map((option) => option.value);
    setNavigableOptions(updatedNavigableOptions);
    totalOptions.current = updatedNavigableOptions.length;
    setActive(null);
  }, [options]);

  /** context */
  const addOption = useCallback((value: string, label: string) => {
    const currentOptions =
      refOptions && refOptions.current ? refOptions.current : [];
    refOptions.current = [...currentOptions, {value, label}];
    setOptions(refOptions.current);
  }, []);

  const removeOption = useCallback((value: string, label: string) => {
    const currentOptions =
      refOptions && refOptions.current ? refOptions.current : [];
    refOptions.current = currentOptions.filter(
      (option) => option.value !== value && option.label !== label,
    );
    setOptions(refOptions.current);
  }, []);

  const contextValue = {
    addOption,
    removeOption,
  };
  /** /context */

  const handleFocus = () => {
    setPopoverActive(true);
  };

  const handleBlur = () => {
    setPopoverActive(false);
  };

  const handleClick = (value: string) => {
    setActive(value);
    onSelect && onSelect(value);
  };

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

  const handleEnter = (evt: KeyboardEvent) => {
    evt.preventDefault();
    onSelect && onSelect(active);
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
      {children}
    </div>
  );

  const optionMarkup = options.map((option) => {
    const optionClassName = classNames(
      styles.Option,
      // selected && styles.selected,
      active === option.value && styles.focused,
    );
    return (
      <li
        className={optionClassName}
        key={option.value}
        onClick={() => handleClick(option.value)}
      >
        {option.label}
      </li>
    );
  });

  const listMarkup = (
    <React.Fragment>
      <KeypressListener keyCode={Key.DownArrow} handler={handleDownArrow} />
      <KeypressListener keyCode={Key.UpArrow} handler={handleUpArrow} />
      <KeypressListener
        keyCode={Key.Enter}
        handler={handleEnter}
        keyEventName="keyup"
      />
      <ul className={classNames(styles.ListBox)}>{optionMarkup}</ul>
    </React.Fragment>
  );

  const popover = (
    <Popover
      active={popoverActive}
      onClose={() => null}
      activator={textfieldMarkup}
      preventAutofocus
      fullWidth
    >
      {listMarkup}
    </Popover>
  );

  return (
    <AutocompleteContext.Provider value={contextValue}>
      {popover}
    </AutocompleteContext.Provider>
  );
}

type OptionProps = {
  value: string;
  children: string;
};

function Option({value, children}: OptionProps) {
  const {addOption, removeOption} = useContext(AutocompleteContext);
  useEffect(() => {
    addOption && addOption(value, children);
    return () => {
      removeOption && removeOption(value, children);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

Autocomplete.Option = Option;
