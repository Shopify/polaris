import React, {useState, useRef} from 'react';
import {useUniqueId} from '../../utilities/unique-id';
import {useMediaQuery} from '../../utilities/media-query';
import {ComboBoxContext, ComboBoxContextType} from '../../utilities/combo-box';
import {scrollable} from '../shared';
import {TextFieldProps} from '../TextField';
import {Popover} from '../Popover';
import {EventListener} from '../EventListener';
import {
  ListBox,
  Option,
  OptionProps,
  InlinePopover,
  Section,
  SectionProps,
} from './components';

export type ComboBoxChildrenType = React.ReactElement<
  OptionProps | SectionProps
>;

export interface ComboBoxProps {
  id?: string;
  children?: ComboBoxChildrenType | ComboBoxChildrenType[];
  activator: React.ReactElement<TextFieldProps>;
  allowMultiple?: boolean;
  labelledBy?: string;
  inlineSuggest?: boolean;
  onOptionSelected(id: string): void;
}

export function ComboBox({
  children,
  activator,
  allowMultiple,
  onOptionSelected,
  labelledBy,
}: ComboBoxProps) {
  const [popoverActive, setPopoverActive] = useState(false);
  const listBoxId = useUniqueId('listBox');
  const [activeDescendant, setActiveDescendant] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [textfieldId, setTextFieldId] = useState(useUniqueId('textfieldId'));
  const [labelId, setLabelId] = useState(labelledBy);
  const listBoxWrapper = useRef<HTMLDivElement>(null);
  const {isNavigationCollapsed} = useMediaQuery();

  const handleSelectOption = (id: string) => {
    focusInput();
    onOptionSelected(id);
    if (allowMultiple) return;
    setPopoverActive(false);
  };

  const contextValue: ComboBoxContextType = {
    activeDescendant,
    setActiveDescendant,
    suggestion,
    setSuggestion,
    textfieldId,
    setTextFieldId,
    labelId,
    setLabelId,
    onOptionSelected: handleSelectOption,
  };

  const handleFocus = () => {
    if (!popoverActive && children) {
      setPopoverActive(true);
    } else if (popoverActive && !children) {
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
      aria-owns={popoverActive ? listBoxId : undefined}
      aria-haspopup="listbox"
      aria-controls={listBoxId}
      onFocus={handleFocus}
      onKeyUp={handleKeyUp}
      tabIndex={-1}
    >
      {activator}
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

  const listBoxMarkup = children ? (
    <div
      ref={listBoxWrapper}
      role="listbox"
      arial-labelleby={labelId}
      id={listBoxId}
    >
      <ListBox>{children}</ListBox>
    </div>
  ) : null;

  const popover = isNavigationCollapsed ? (
    <InlinePopover
      active={popoverActive}
      activator={textfieldMarkup}
      onClose={handleClose}
    >
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
      {listBoxMarkup}
    </Popover>
  );

  return (
    <ComboBoxContext.Provider value={contextValue}>
      {popover}
      <EventListener event="mouseup" handler={handleStopScroll} />
    </ComboBoxContext.Provider>
  );
}

// function findOptions(children: any) {
//   const childrenArray = React.Children.toArray(children);
//   let foundOption = false;
//   childrenArray.forEach((child) => {
//     if (
//       isListBox(child) &&
//       child.props.children
//       // child.props.children.length > 0
//     ) {
//       foundOption = true;
//     } else if (child.props.children && child.props.children.length > 0) {
//       findOptions(child.props.children);
//     }
//   });
//   return foundOption;
// }

// function isListBox(
//   listBox: React.ReactElement,
// ): listBox is React.ReactElement<ListBoxProps> {
//   return isElementOfType(listBox, ListBox);
// }

ComboBox.Option = Option;
ComboBox.Section = Section;
// ComboBox.ListBox = ListBox;
