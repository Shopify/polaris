import React from 'react';

export type WithinContentContextType = boolean;

const WithinContentContext = React.createContext<WithinContentContextType>(
  false,
);

export default WithinContentContext;
