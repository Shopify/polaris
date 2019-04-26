import React from 'react';

interface Props {
  state: string;
  children: React.ReactNode;
}

export const UIStateContext = React.createContext('');

export function UIStateController({state, children}: Props) {
  return (
    <UIStateContext.Provider value={state}>{children}</UIStateContext.Provider>
  );
}

export function UIState({state: ifState, children}: Props) {
  return (
    <UIStateContext.Consumer>
      {(state) => (state === ifState ? children : null)}
    </UIStateContext.Consumer>
  );
}
