import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useReducer,
} from 'react';
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
  allowMultiple: boolean;
  autoFill: boolean;
  highlightMatches: boolean;
}

interface AutocompleteContextType {
  activeDescendant?: string;
  allowMultiple?: boolean;
  dispatchAction(action: Actions): void;
  highlightMatches?: boolean;
  textfieldId?: string;
  textFieldValue?: string;
  listBoxId?: string;
}

enum AutoCompleteAction {
  TextFieldValueChange = 'TEXTFIELD_VALUE_CHANGE',
  SetTextFieldId = 'SET_TEXTFIELD_ID',
  SetActiveDescendant = 'SET_ACTIVE_DESCENDANT',
}

type Actions =
  | {type: AutoCompleteAction.TextFieldValueChange; value: string}
  | {type: AutoCompleteAction.SetTextFieldId; id: string}
  | {type: AutoCompleteAction.SetActiveDescendant; value: string};

const AutocompleteContext = React.createContext<AutocompleteContextType | null>(
  null,
);

function autoCompleteReducer(state: AutocompleteContextType, action: Actions) {
  switch (action.type) {
    case AutoCompleteAction.TextFieldValueChange: {
      return {...state, textFieldValue: action.value};
    }
    case AutoCompleteAction.SetActiveDescendant: {
      return {...state, activeDescendant: action.value};
    }
    case AutoCompleteAction.SetTextFieldId: {
      return {...state, textfieldId: action.id};
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

// const AutocompleteContextProvider = ({children}: any) => {
//   const [state, dispatchAction] = useReducer(autoCompleteReducer, {
//     textFieldValue: '',
//   });
//   const value = {state, dispatchAction};
//   return (
//     <AutocompleteContext.Provider value={value}>
//       {children}
//     </AutocompleteContext.Provider>
//   );
// };

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
  const initialContextValue = {
    activeDescendant: '',
    allowMultiple,
    highlightMatches,
    textfieldId: useUniqueId('textfieldId'),
    textFieldValue: '',
    listBoxId,
  };

  const [reducerState, dispatchAction] = useReducer(autoCompleteReducer, {
    ...initialContextValue,
    dispatchAction: () => null,
  });

  const handleFocus = () => {
    // TODO: If there's a LISTBox as child
    setPopoverActive(true);
  };

  const handleBlur = () => {
    // TODO: if not clicking on the popover () (clicking scrollbar blurs)
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

  const value = {reducerState, dispatchAction};
  return (
    <AutocompleteContext.Provider value={value}>
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
  const autoCompleteContext = useAutocompleteContext();

  if (keyboardFocusedOption) {
    autoCompleteContext &&
      autoCompleteContext.dispatchAction({
        type: AutoCompleteAction.SetActiveDescendant,
        value: keyboardFocusedOption,
      });
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
    <li className={optionClassName} id={value} onClick={handleItemClick}>
      {children}
    </li>
  );
}

Autocomplete.Option = Option;
Autocomplete.ListBox = ListBox;
