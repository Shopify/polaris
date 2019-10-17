import React, {useState, useRef, useEffect} from 'react';
import {useUniqueId} from '../../utilities/unique-id';
import {useMediaQuery} from '../../utilities/media-query';
import {ComboBoxContext} from '../../utilities/combo-box';
import {isElementOfType} from '../../utilities/components';
import {scrollable} from '../shared';
import {TextFieldProps} from '../TextField';
import {Popover} from '../Popover';
import {EventListener} from '../EventListener';
import {ListBox, ListBoxProps, Option, InlinePopover} from './components';

export interface ComboBoxProps {
  id?: string;
  children: React.ReactNode;
  textfield: React.ReactElement<TextFieldProps>;
  allowMultiple?: boolean;
  inline?: boolean;
  highlightMatches?: boolean;
  onOptionSelected(id: string): void;
}

export function ComboBox({
  children,
  textfield,
  allowMultiple,
  highlightMatches,
  inline,
  onOptionSelected,
}: ComboBoxProps) {
  const [popoverActive, setPopoverActive] = useState(false);
  const listBoxId = useUniqueId('listBox');
  const [activeDescendant, setActiveDescendant] = useState('');
  const [textfieldValue, setTextfieldValue] = useState('');
  const [firstOptionLabel, setFirstOptionLabel] = useState('');
  const [textfieldId, setTextFieldId] = useState(useUniqueId('textfieldId'));
  const listBoxWrapper = useRef<HTMLDivElement>(null);
  const {isNavigationCollapsed} = useMediaQuery();
  const [hasOptions, setHasOptions] = useState(false);

  useEffect(() => {
    setHasOptions(findOptions(children));
  }, [children]);

  const handleSelectOption = (id: string) => {
    focusInput();
    onOptionSelected(id);
    if (allowMultiple) return;
    setPopoverActive(false);
  };

  const contextValue = {
    firstOptionLabel: inline ? firstOptionLabel : undefined,
    setFirstOptionLabel: inline ? setFirstOptionLabel : undefined,
    activeDescendant,
    setActiveDescendant,
    textfieldValue: highlightMatches ? textfieldValue : undefined,
    setTextfieldValue: highlightMatches ? setTextfieldValue : undefined,
    textfieldId,
    setTextFieldId,
    listBoxId,
    onOptionSelected: handleSelectOption,
  };

  const handleFocus = () => {
    if (!popoverActive && hasOptions) {
      setPopoverActive(true);
    } else if (popoverActive && !hasOptions) {
      setPopoverActive(false);
    }
  };

  const handleKeyUp = () => {
    handleFocus();
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
      tabIndex={0}
    >
      {textfield}
    </div>
  );

  const focusInput = () => {
    const input = textfieldId && document.getElementById(textfieldId);
    if (input) input.focus();
  };

  const handleStopScroll = ({target}: MouseEvent) => {
    if ((target as HTMLElement).matches(scrollable.selector)) {
      focusInput();
    }
  };

  const listBoxMarkup = hasOptions ? (
    <div ref={listBoxWrapper} id={listBoxId}>
      {children}
    </div>
  ) : null;

  const popover = isNavigationCollapsed ? (
    <InlinePopover
      active={popoverActive}
      activator={textfieldMarkup}
      onClose={handleClose}
    >
      <EventListener event="mouseup" handler={handleStopScroll} />
      {listBoxMarkup}
    </InlinePopover>
  ) : (
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

function findOptions(children: any) {
  const childrenArray = React.Children.toArray(children);
  let foundOption = false;
  childrenArray.forEach((child) => {
    if (
      isListBox(child) &&
      child.props.children &&
      child.props.children.length > 0
    ) {
      foundOption = true;
    } else if (child.props.children && child.props.children.length > 0) {
      findOptions(child.props.children);
    }
  });
  return foundOption;
}

function isListBox(
  listBox: React.ReactElement,
): listBox is React.ReactElement<ListBoxProps> {
  return isElementOfType(listBox, ListBox);
}

ComboBox.Option = Option;
ComboBox.ListBox = ListBox;
