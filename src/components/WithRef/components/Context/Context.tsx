import * as React from 'react';

export interface WithRef<T = any> {
  forwardedRef: React.RefObject<T> | null;
}

const {Provider, Consumer} = React.createContext<WithRef>({
  forwardedRef: null,
});

export {Provider, Consumer};
