import React, {useMemo, useState, useCallback, ContextType} from 'react';

import {EphemeralPresenceManagerContext} from '../../utilities/ephemeral-presence-manager';
import type {EphemeralPresenceKey} from '../../utilities/ephemeral-presence-manager';

export interface EphemeralPresenceManagerProps {
  children?: React.ReactNode;
}

type Context = NonNullable<ContextType<typeof EphemeralPresenceManagerContext>>;

type PresenceList = {
  [key in EphemeralPresenceKey]: boolean;
};

const defaultState = {
  tooltip: false,
};

export function EphemeralPresenceManager({
  children,
}: EphemeralPresenceManagerProps) {
  const [presenceList, setPresenceList] = useState<PresenceList>(defaultState);

  const addPresence = useCallback<Context['addPresence']>(
    (key: EphemeralPresenceKey) => {
      console.log('adding presence', key);
      setPresenceList((prevList) => ({
        ...prevList,
        [key]: true,
      }));
    },
    [],
  );

  const removePresence = useCallback<Context['removePresence']>(
    (key: EphemeralPresenceKey) => {
      setPresenceList((prevList) => ({
        ...prevList,
        [key]: false,
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
