import React, {useState, useRef, useEffect} from 'react';

import {useComboBox} from '../../../../utilities/combo-box';
import {
  elementChildren,
  isElementOfType,
} from '../../../../utilities/components';
import {Key} from '../../../../types';
import {classNames} from '../../../../utilities/css';
import {KeypressListener} from '../../../KeypressListener';
import {Option, OptionProps} from './components';
import {ListBoxContext} from './context/list-box';
import styles from './ListBox.scss';

export type ListBoxProps = {
  children?: React.ReactNode[];
};

export function ListBox({children}: ListBoxProps) {
  const listBoxClassName = classNames(styles.ListBox);
  const [keyboardFocusedOption, setKeyboardFocusedOption] = useState();
  const [navigableOptions, setNavigableOptions] = useState([] as string[]);
  const combobox = useComboBox();

  if (!combobox) {
    throw new Error('ListBox must be used inside a Combobox');
  }

  const {
    setActiveDescendant,
    setFirstOptionLabel,
    firstOptionLabel,
    onOptionSelected,
  } = combobox;

  if (keyboardFocusedOption) {
    setActiveDescendant(keyboardFocusedOption);
  }

  const totalOptions = useRef<number>(navigableOptions.length);

  // TODO: recursive when we add sections
  useEffect(() => {
    const updatedNavigableOptions = elementChildren(children).map(
      (child: React.ReactElement<OptionProps>) => {
        if (
          child &&
          isElementOfType(child, Option) &&
          !child.props.disabled &&
          child.props.id
        ) {
          setFirstOptionLabel &&
            !firstOptionLabel &&
            setFirstOptionLabel(child.props.label);
          return child.props.id;
        }
      },
    );
    setNavigableOptions(updatedNavigableOptions as string[]);
    totalOptions.current = updatedNavigableOptions.length;
  }, [children, firstOptionLabel, setFirstOptionLabel]);

  const onItemClick = (value: string) => {
    onOptionSelected(value);
  };

  const handleEnter = (evt: KeyboardEvent) => {
    evt.preventDefault();
    onOptionSelected(keyboardFocusedOption);
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

  // this check doesn't work
  return React.Children.toArray(children).length > 0 ? (
    <React.Fragment>
      <KeypressListener keyCode={Key.DownArrow} handler={handleDownArrow} />
      <KeypressListener keyCode={Key.UpArrow} handler={handleUpArrow} />
      <KeypressListener keyCode={Key.Enter} handler={handleEnter} />
      <ListBoxContext.Provider value={listBoxContext}>
        <ul className={listBoxClassName}>{children}</ul>
      </ListBoxContext.Provider>
    </React.Fragment>
  ) : null;
}
