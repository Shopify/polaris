import {createContext} from 'react';

export interface ActionRefsTrackerContextType {
  id: string | undefined;
  actionRef: React.RefObject<HTMLElement> | null;
}

export const ActionRefsTrackerContext = createContext<
  ActionRefsTrackerContextType[]
>([]);
