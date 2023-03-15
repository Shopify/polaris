import {useMemo, useState, useCallback, ContextType} from 'react';

import {FocusManagerContext} from '../../utilities/focus-manager';

interface Props {
  children?: React.ReactNode;
}

type Context = NonNullable<ContextType<typeof FocusManagerContext>>;

export function FocusManager({children}: Props) {
  const [trapFocusList, setTrapFocusList] = useState<string[]>([]);

  const add = useCallback<Context['add']>((id) => {
    setTrapFocusList((list) => [...list, id]);
  }, []);
  const remove = useCallback<Context['remove']>((id) => {
    let removed = true;
    setTrapFocusList((list) => {
      const clone = [...list];
      const index = clone.indexOf(id);
      if (index === -1) {
        removed = false;
      } else {
        clone.splice(index, 1);
      }
      return clone;
    });
    return removed;
  }, []);

  const value = useMemo(
    () => ({trapFocusList, add, remove}),
    [add, trapFocusList, remove],
  );

  return (
    <FocusManagerContext.Provider value={value}>
      {children}
    </FocusManagerContext.Provider>
  );
}
