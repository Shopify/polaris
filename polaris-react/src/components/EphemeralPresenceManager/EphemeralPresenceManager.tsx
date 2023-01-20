import React, {useMemo, useState, useCallback, ContextType} from 'react';

import {EphemeralPresenceManagerContext} from '../../utilities/ephemeral-presence-manager';
import type {EphemeralPresenceKey} from '../../utilities/ephemeral-presence-manager';

export interface EphemeralPresenceManagerProps {
  children?: React.ReactNode;
}

type Context = NonNullable<ContextType<typeof EphemeralPresenceManagerContext>>;

type PresenceList = {
  [key in EphemeralPresenceKey]: number;
};

const defaultState = {
  tooltip: 0,
};

export function EphemeralPresenceManager({
  children,
}: EphemeralPresenceManagerProps) {
  const [presenceList, setPresenceList] = useState<PresenceList>(defaultState);

  const addPresence = useCallback<Context['addPresence']>(
    (key: EphemeralPresenceKey) => {
      setPresenceList((prevList) => ({
        ...prevList,
        [key]: prevList[key] + 1,
      }));
    },
    [],
  );

  const removePresence = useCallback<Context['removePresence']>(
    (key: EphemeralPresenceKey) => {
      setPresenceList((prevList) => ({
        ...prevList,
        [key]: prevList[key] - 1,
      }));
    },
    [],
  );

  const value = useMemo(
    () => ({presenceList, addPresence, removePresence}),
    [presenceList, addPresence, removePresence],
  );

  return (
    <EphemeralPresenceManagerContext.Provider value={value}>
      {children}
    </EphemeralPresenceManagerContext.Provider>
  );
}
