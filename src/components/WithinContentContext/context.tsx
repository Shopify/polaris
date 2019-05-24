import React from 'react';

export interface WithinContentContextType {
  withinContentContainer: boolean;
}

const WithinContentContext = React.createContext<WithinContentContextType>({
  withinContentContainer: false,
});

export default WithinContentContext;
