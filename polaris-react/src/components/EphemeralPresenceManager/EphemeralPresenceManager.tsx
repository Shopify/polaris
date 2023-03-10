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

type PresenceCounter = {
  [key in EphemeralPresenceKey]: number;
};

const defaultState = {
  tooltip: 0,
};

export function EphemeralPresenceManager({
  children,
}: EphemeralPresenceManagerProps) {
  const [presenceCounter, setPresenceCounter] =
    useState<PresenceCounter>(defaultState);

  const addPresence = useCallback<Context['addPresence']>(
    (key: EphemeralPresenceKey) => {
      setPresenceCounter((prevList) => ({
        ...prevList,
        [key]: prevList[key] + 1,
      }));
    },
    [],
  );

  const removePresence = useCallback<Context['removePresence']>(
    (key: EphemeralPresenceKey) => {
      setPresenceCounter((prevList) => ({
        ...prevList,
        [key]: prevList[key] - 1,
      }));
    },
    [],
  );

  const value = useMemo(
    () => ({
      presenceList: Object.entries(presenceCounter).reduce(
        (previousValue, currentValue) => {
          const [key, value] = currentValue;
          return {
            ...previousValue,
            [key]: value >= 1,
          };
        },
        {} as PresenceList,
      ),
      presenceCounter,
      addPresence,
      removePresence,
    }),
    [addPresence, removePresence, presenceCounter],
  );

  return (
    <EphemeralPresenceManagerContext.Provider value={value}>
      {children}
    </EphemeralPresenceManagerContext.Provider>
  );
}
