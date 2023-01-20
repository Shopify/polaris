import {createContext} from 'react';

export type EphemeralPresenceKey = 'tooltip';

export interface EphemeralPresenceManagerContextType {
  presenceList: {
    [key in EphemeralPresenceKey]: boolean;
  };
  addPresence: (key: EphemeralPresenceKey) => void;
  removePresence: (key: EphemeralPresenceKey) => void;
}

export const EphemeralPresenceManagerContext = createContext<
  EphemeralPresenceManagerContextType | undefined
>(undefined);
