import * as React from 'react';

export interface WithinContentContext {
  withinContentContainer: boolean;
}

const {Provider, Consumer} = React.createContext<WithinContentContext>({
  withinContentContainer: false,
});

export {Provider, Consumer};
