import {useContext} from 'react';

import {ListBoxContext} from './context';

export function useListBox() {
  const listBox = useContext(ListBoxContext);

  if (!listBox) {
    throw new Error(
      'No ListBox was provided. ListBox components must be wrapped in a Listbox',
    );
  }

  return listBox;
}
